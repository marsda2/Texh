import type { SVGProps } from "react";
import {
  LETTER_C,
  LETTER_E,
  LETTER_H,
  LETTER_O,
  LETTER_T,
  LETTER_X,
  LOGO_BOX,
} from "./logo-paths";

type LogoProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Fill for t-e-h-c-o. */
  ink?: string;
  /** Fill for the x mark. */
  accent?: string;
  /**
   * Horizontal shift per letter (t, e, x, h, c, o) in logo units. The hero
   * watermark uses it to open a gap for the device mockup without distorting
   * the glyphs. Must be non-decreasing; the last value widens the viewBox.
   */
  offsets?: readonly [number, number, number, number, number, number];
  title?: string;
};

export function TexhcoLogo({
  ink = "var(--ink)",
  accent = "var(--lime)",
  offsets,
  title = "Texh Co",
  ...props
}: LogoProps) {
  const width = LOGO_BOX.w + (offsets?.[5] ?? 0);
  const shift = (i: number) =>
    offsets?.[i] ? { transform: `translate(${offsets[i]} 0)` } : {};

  return (
    <svg
      viewBox={`${LOGO_BOX.x} ${LOGO_BOX.y} ${width} ${LOGO_BOX.h}`}
      role="img"
      aria-label={title}
      {...props}
    >
      <g fill={ink} fillRule="evenodd">
        <path d={LETTER_T} {...shift(0)} />
        <path d={LETTER_E} {...shift(1)} />
        <path d={LETTER_H} {...shift(3)} />
        <path d={LETTER_C} {...shift(4)} />
        <path d={LETTER_O} {...shift(5)} />
      </g>
      <g fill={accent} {...shift(2)}>
        {LETTER_X.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Just the x mark (same artwork as public/brand/texhco-x.svg). */
export function TexhcoX({
  fill = "var(--lime)",
  ...props
}: Omit<SVGProps<SVGSVGElement>, "children"> & { fill?: string }) {
  return (
    <svg viewBox="491 243 270 213" aria-hidden {...props}>
      <g fill={fill}>
        {LETTER_X.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
