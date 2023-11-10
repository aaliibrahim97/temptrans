export interface AtlpRichClassicTableBreakpointListener {
  breakpoint: string;
  countSlice?: number;
}

export const atlpRichClassicTableBreakpointsListenerDefault: AtlpRichClassicTableBreakpointListener[] =
  [
    { breakpoint: '(max-width: 599.98px)', countSlice: 3 },
    {
      breakpoint: '(min-width: 600px) and (max-width: 767.98px)',
      countSlice: 4,
    },
    {
      breakpoint: '(min-width: 768px) and (max-width: 1023.98px)',
      countSlice: 5,
    },
    { breakpoint: '(min-width: 1024px)' },
  ];
