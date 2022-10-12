import { createContext } from 'preact';

export interface PageSegmentData {
  offset: number;
  length: number;
  next: number | undefined;
}

export const PageSegmentContext = createContext<PageSegmentData>({
  offset: 0,
  length: 0,
  next: undefined,
});
