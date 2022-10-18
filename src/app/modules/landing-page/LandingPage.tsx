import { FunctionalComponent } from 'preact';
import { Greeting } from './components';
import styles from './LandingPage.module.scss';

export const LandingPage: FunctionalComponent = () => {
  return (
    <section class={styles.landingPage}>
      <Greeting />
    </section>
  );
};
