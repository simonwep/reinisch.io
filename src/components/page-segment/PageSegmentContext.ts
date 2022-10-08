import { createContext } from 'preact';

export interface PageSegmentData {
  offset: number;
  length: number;
}

export const PageSegmentContext = createContext<PageSegmentData>({
  offset: 0,
  length: 0,
});
