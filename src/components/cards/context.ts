import { createContext } from 'preact';

export interface CardsData {
  visibleCardIndex: number;
  closed: boolean;

  nextCard(): void;
}

export const CardsContext = createContext<CardsData>({
  visibleCardIndex: 0,
  closed: false,
  nextCard: () => void 0,
});
