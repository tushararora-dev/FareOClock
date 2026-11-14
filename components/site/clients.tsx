import { clients } from "@/lib/site";

export function Clients() {
  return (
    <section aria-label="Selected clients" className="border-y border-line">
      <div className="shell py-7">
        <p className="mb-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted">
          Trusted by teams at
        </p>
        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-14">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex items-center gap-14"
                aria-hidden={copy === 1}
              >
                {clients.map((client) => (
                  <li
                    key={`${copy}-${client}`}
                    className="whitespace-nowrap text-lg font-medium tracking-tight text-fog/45 transition-colors hover:text-fog"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
