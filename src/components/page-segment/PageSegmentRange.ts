import { createContext } from 'preact';

export interface PageSegmentRangeData {
  offset: number;
  length: number;
}

export const PageSegmentRange = createContext<PageSegmentRangeData>({
  offset: 0,
  length: 0,
});
