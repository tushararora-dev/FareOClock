"use server";

import { Resend } from "resend";
import { z } from "zod";
import type { ContactState } from "@/lib/contact";
import { site } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please share your name."),
  email: z.email("Enter a valid email address."),
  company: z.string().trim().max(120, "That's a little too long.").optional(),
  budget: z.string().trim().max(40).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
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
    company: formData.get("company") ?? "",
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

  const { name, email, company, budget, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? `${site.legalName} <onboarding@resend.dev>`;

  const text = [
    `New enquiry from ${site.domain}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
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
          "Thanks — your message is in. (Demo mode: add RESEND_API_KEY to receive real emails.)",
      };
    }

    return {
      status: "error",
      message: "The contact form isn't configured yet. Please email us instead.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New project enquiry — ${name}${company ? ` (${company})` : ""}`,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: `Something went wrong on our end. Please email ${site.email}.`,
      };
    }
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return {
      status: "error",
      message: `Something went wrong on our end. Please email ${site.email}.`,
    };
  }

  return {
    status: "success",
    message: "Thanks — we'll reply within one business day.",
  };
}
