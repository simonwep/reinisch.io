import { step } from '@utils/math';
import { FunctionalComponent } from 'preact';
import { usePageSegmentOffset } from '@hooks';
import styles from './BackToTopButton.module.scss';

export const BackToTopButton: FunctionalComponent = () => {
  const offset = usePageSegmentOffset();

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
        '--step-1': step(offset, 0, 0.25),
        '--step-2': step(offset, 0.5, 0.75),
        '--step-3': step(offset, 0.75),
      }}
    >
      <div class={styles.line} />
      <a
        class={styles.link}
        href="src/app/modules/landing-page/components/back-to-top-button/BackToTopButton#top"
        onClick={backToTop}
      >
        <span class={styles.text}>BACK</span>
      </a>
    </div>
  );
};
