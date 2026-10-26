/** Логотип кодом: круг ivory с золотой окантовкой, ORX с засечками, beauty вразрядку. */
export function Logo({ size = 44 }: { size?: number }) {
  const orx = Math.round(size * 0.34);
  const beauty = Math.max(5, Math.round(size * 0.13));
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 flex-col items-center justify-center rounded-full border border-gold bg-ivory shadow-soft"
      style={{ width: size, height: size }}
    >
      <span
        className="font-serif font-semibold leading-none text-navy"
        style={{ fontSize: orx, marginTop: beauty * 0.4 }}
      >
        ORX
      </span>
      <span
        className="font-sans uppercase leading-none text-navy"
        style={{
          fontSize: beauty,
          letterSpacing: "0.28em",
          marginLeft: "0.28em",
          marginTop: beauty * 0.45,
        }}
      >
        beauty
      </span>
    </span>
  );
}
