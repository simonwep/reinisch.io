import { PageSegment } from '@components';
import { FunctionalComponent } from 'preact';
import styles from './App.module.scss';
import { LandingPage } from './modules';
import { Portfolio } from './modules';

interface Section {
  component?: FunctionalComponent;
  offset: number;
}

const sections: Section[] = [
  { offset: 0, component: LandingPage },
  { offset: 0.5, component: Portfolio },
  { offset: 1 },
];

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const App: FunctionalComponent = () => (
  <div className={styles.app} style={`height: ${(sections.at(-1)!.offset + 1) * 100}vh`} id="top">
    {sections
      .filter((v) => v.component)
      .map((value, index) => {
        const length = sections[index + 1]!.offset - value.offset;
        return (
          <PageSegment
            offset={value.offset}
            length={length}
            key={value.offset}
            component={value.component as FunctionalComponent}
          />
        );
      })}
  </div>
);
