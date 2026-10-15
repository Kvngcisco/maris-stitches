interface SectionNumeralProps {
  numeral: string;
}

export default function SectionNumeral({ numeral }: SectionNumeralProps) {
  return (
    <span
      aria-hidden="true"
      className="absolute top-4 right-4 font-heading text-[8rem] leading-none font-light text-aubergine opacity-10 select-none pointer-events-none z-0 hidden md:block"
    >
      {numeral}
    </span>
  );
}
