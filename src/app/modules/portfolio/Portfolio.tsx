import { Cards } from '@components';
import { usePageSegmentOffset } from '@hooks';
import { clamp } from '@utils/math';
import { c } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { useAnimationSteps } from '../../../hooks/useAnimationSteps';
import { ProjectCard } from './components';
import { portfolio } from './data';
import styles from './Portfolio.module.scss';

type View = keyof typeof portfolio;

export const Portfolio: FunctionalComponent = () => {
  const [view, setView] = useState<View>('active');
  const { start, active, step } = useAnimationSteps([450]);
  const offset = usePageSegmentOffset();

  const toggleView = () => {
    if (!active) {
      setView((view) => (view === 'active' ? 'archived' : 'active'));
      start();
    }
  };

  return (
    <div className={styles.projects} style={{ '--visibility': offset }}>
      <div class={styles.sideBar}>
        <article className={styles.introduction}>
          This is a curated list of projects I&apos;m currently working on and / or still maintaining.
          <br /> I&apos;ve been actively working on FOSS software since 2015, and over the course of the years I started
          over 20 projects - some of them I&apos;m maintaining up to today!
        </article>

        <button class={styles.switchButton} onClick={toggleView}>
          {view === 'active' ? 'Show me more' : 'Show me the latest'}
        </button>
      </div>

      <div class={styles.cards}>
        <Cards className={c(styles.list, { [styles.hidden]: step === 1 || view === 'archived' })} closed={step === 0}>
          {portfolio.active.map((value, index, list) => (
            <ProjectCard
              className={styles.card}
              styles={{ '--visibility': clamp(offset + (offset ? 1 : 0) * (index / list.length), 0, 1) }}
              key={index}
              project={value}
            />
          ))}
        </Cards>
        <Cards
          className={c(styles.list, { [styles.hidden]: step === 1 || (view === 'active' && step < 1) })}
          closed={step === 0}
        >
          {portfolio.archived.map((value, index, list) => (
            <ProjectCard
              className={styles.card}
              styles={{ '--visibility': clamp(offset + (offset ? 1 : 0) * (index / list.length), 0, 1) }}
              key={index}
              project={value}
            />
          ))}
        </Cards>
      </div>
    </div>
  );
};
