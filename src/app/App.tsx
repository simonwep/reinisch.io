import { PageSegment } from '@components';
import { FunctionalComponent } from 'preact';
import styles from './App.module.scss';
import { LandingPage } from './modules';
import { Portfolio } from './modules';

interface Section {
  component: FunctionalComponent;
  length: number;
}

const sections: Section[] = [
  { length: 0.5, component: LandingPage },
  { length: 0.5, component: Portfolio },
];

const totalLength = (sections: Section[]) => sections.reduce((total, v) => total + v.length, 0);

export const App: FunctionalComponent = () => {
  return (
    <div className={styles.app} style={`height: ${(totalLength(sections) + 1) * 100}vh`}>
      {sections
        .filter((v) => v.component)
        .map((value, index) => {
          const nextSection = sections[index + 1];
          const offset = totalLength(sections.slice(0, index));

          return (
            <PageSegment
              length={value.length}
              offset={offset}
              next={nextSection ? offset + value.length + nextSection.length : undefined}
              key={offset}
              component={value.component as FunctionalComponent}
            />
          );
        })}
    </div>
  );
};
