export type Breakpoint = 'phone' | 'tablet' | 'desktop';

const BREAKPOINT_WIDTHS: Record<Breakpoint, number> = {
  phone: 600,
  tablet: 768,
  desktop: 1024,
};

const getBreakpointWidth = (breakpoint: Breakpoint): number =>
  BREAKPOINT_WIDTHS[breakpoint];

export const up = (breakpoint: Breakpoint): string =>
  `@media (min-width: ${getBreakpointWidth(breakpoint)}px)`;

export const down = (breakpoint: Breakpoint): string =>
  `@media (max-width: ${getBreakpointWidth(breakpoint) - 1}px)`;
