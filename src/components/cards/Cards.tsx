import { c, ClassNames } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './Cards.module.scss';
import { CardsContext } from './context';

interface Props {
  className?: ClassNames;
  closed?: boolean;

  onCardChange?: (index: number) => void;
}

export const Cards: FunctionalComponent<Props> = (props) => {
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  const [root, setRoot] = useState<HTMLDivElement | null>();

  const closed = props.closed ?? false;
  const cardsCount = root?.childElementCount ?? 0;

  const nextCard = () => {
    setVisibleCardIndex((index) => (index + 1 > cardsCount ? 0 : index + 1));
  };

  useEffect(() => {
    props.onCardChange?.(visibleCardIndex);
  }, [props, visibleCardIndex]);

  return (
    <CardsContext.Provider value={{ nextCard, visibleCardIndex, closed }}>
      <div ref={setRoot} class={c(styles.cards, props.className)}>
        {props.children}
      </div>
    </CardsContext.Provider>
  );
};
