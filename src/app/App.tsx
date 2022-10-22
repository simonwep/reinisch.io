import { PageSegment, Scrollbar } from '@components';
import { FunctionalComponent } from 'preact';
import styles from './App.module.scss';
import { LandingPage } from './modules';
import { Fixtures } from './modules/fixtures/Fixtures';

interface Section {
  component: FunctionalComponent;
  length: number;
}

const sections: Section[] = [{ length: 0.5, component: LandingPage }];

const totalLength = (sections: Section[]) => sections.reduce((total, v) => total + v.length, 0);

export const App: FunctionalComponent = () => {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <Fixtures />
        <LandingPage />
        <div style="height: 200vh" />
      </div>

      <Scrollbar />
    </div>
  );
};
