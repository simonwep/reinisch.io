import { step } from '@utils/math';
import { FunctionalComponent } from 'preact';
import { useScrollOffset } from '../../../hooks/useScrollOffset';
import styles from './BackToTopButton.module.scss';

export const BackToTopButton: FunctionalComponent = () => {
  const scrollOffset = useScrollOffset({ factor: 2 });

  const backToTop = (evt: MouseEvent) => {
    evt.preventDefault();
    document.scrollingElement?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      class={styles.backToTopButton}
      style={{
        '--step-1': step(scrollOffset, 0, 0.25),
        '--step-2': step(scrollOffset, 0.25, 0.5),
        '--step-3': step(scrollOffset, 0.5, 0.75),
      }}
    >
      <div class={styles.line} />
      <a class={styles.link} href="#top" onClick={backToTop}>
        <span class={styles.text}>BACK</span>
      </a>
    </div>
  );
};
