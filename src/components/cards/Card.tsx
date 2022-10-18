import { c, ClassNames, Styles } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useContext } from 'preact/compat';
import { useLayoutEffect, useState } from 'preact/hooks';
import { useAnimationSteps } from '@hooks';
import { CardsContext } from './context';
import styles from './Card.module.scss';

interface Props {
  styles?: Styles;
  className?: ClassNames;
  containerClassName?: ClassNames;
}

export const Card: FunctionalComponent<Props> = (props) => {
  const [root, setRoot] = useState<HTMLDivElement | null>();
  const { step, start, stop } = useAnimationSteps([450, 450]);
  const { visibleCardIndex, nextCard } = useContext(CardsContext);

  const cardsElementList = Array.from(root?.parentElement?.children ?? []);
  const cardsCount = cardsElementList.length;
  const cardIndex = root ? cardsElementList.indexOf(root) : -1;
  const isShuffled = cardsCount - cardIndex <= visibleCardIndex;

  /* eslint-disable react-hooks/exhaustive-deps */
  useLayoutEffect(() => (isShuffled ? start() : stop()), [isShuffled]);

  return (
    <div
      ref={setRoot}
      onClick={nextCard}
      class={c(styles.card, props.containerClassName)}
      style={{
        '--z-index': step === 0 ? cardsCount : (cardIndex + visibleCardIndex) % cardsCount,
        ...props.styles,
      }}
    >
      <div
        class={c(styles.content, props.className, { [styles.shuffleOut]: isShuffled && step === 0 })}
        style={{ '--distance': (((cardIndex + visibleCardIndex) % cardsCount) + 1) / cardsCount }}
      >
        {props.children}
      </div>
    </div>
  );
};
