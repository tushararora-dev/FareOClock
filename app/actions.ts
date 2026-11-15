"use server";

import { Resend } from "resend";
import { z } from "zod";
import type { ContactState } from "@/lib/contact";
import { site } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please share your name."),
  email: z.email("Enter a valid email address."),
  service: z.string().trim().max(60).optional(),
  destination: z.string().trim().max(120, "That's a little too long.").optional(),
  budget: z.string().trim().max(40).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — at least 10 characters.")
    .max(2000, "Please keep it under 2000 characters."),
});

export async function submitEnquiry(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill hidden fields, humans never see them.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks — message received." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    service: formData.get("service") ?? "",
    destination: formData.get("destination") ?? "",
    budget: formData.get("budget") ?? "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) {
        errors[key] = issue.message;
      }
    }

    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  const { name, email, service, destination, budget, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? `${site.legalName} <onboarding@resend.dev>`;

  const text = [
    `New enquiry from ${site.domain}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    service ? `Service: ${service}` : null,
    destination ? `Destination: ${destination}` : null,
    budget ? `Budget: ${budget}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY missing — enquiry logged:", text);
      return {
        status: "success",
        message:
          "Thanks — your enquiry is in. (Demo mode: add RESEND_API_KEY to receive real emails.)",
      };
    }

    return {
      status: "error",
      message: "The form isn't configured yet. Please email me instead.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New ${service || "travel"} enquiry — ${name}`,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: `Something went wrong on my end. Please email ${site.email}.`,
      };
    }
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return {
      status: "error",
      message: `Something went wrong on my end. Please email ${site.email}.`,
    };
  }

  return {
    status: "success",
    message: "Thanks — I'll reply within one working day with the next steps.",
  };
}
