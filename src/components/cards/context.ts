import { createContext } from 'preact';

export interface CardsData {
  visibleCardIndex: number;

  nextCard(): void;
}

export const CardsContext = createContext<CardsData>({
  visibleCardIndex: 0,
  nextCard: () => void 0,
});
