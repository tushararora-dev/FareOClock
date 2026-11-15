import { destinations } from "@/lib/site";

export function Destinations() {
  return (
    <section
      aria-label="Destinations covered by the plans"
      className="border-y border-line bg-surface/45"
    >
      <div className="shell py-7">
        <p className="mb-5 text-center text-[10px] uppercase tracking-[0.22em] text-muted">
          A few of the places your plan can cover
        </p>
        <div className="mask-fade-x overflow-hidden">
          <div className="group animate-marquee flex w-max items-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex items-center"
                aria-hidden={copy === 1}
              >
                {destinations.map((place) => (
                  <li
                    key={`${copy}-${place}`}
                    className="flex items-center whitespace-nowrap px-5 text-base font-medium tracking-tight text-muted transition-colors hover:text-ink sm:text-lg"
                  >
                    {place}
                    <span
                      aria-hidden
                      className="ml-5 inline-block size-1 rounded-full bg-accent"
                    />
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
