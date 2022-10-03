import { PageSegment } from '@components';
import { FunctionalComponent } from 'preact';
import { DynamicBackground, BackToTopButton, CreativeCorner, Greeting } from './components';
import styles from './LandingPage.module.scss';

export const LandingPage: FunctionalComponent = () => {
  return (
    <section class={styles.landingPage}>
      <PageSegment offset={0} length={0.5}>
        <DynamicBackground />
        <CreativeCorner />
        <BackToTopButton />
        <Greeting />
      </PageSegment>
    </section>
  );
};
