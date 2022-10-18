import { AutoFontSize, Cards, DynamicText } from '@components';
import { usePageSegmentOffset } from '@hooks';
import { clamp } from '@utils/math';
import { c } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { useAnimationSteps } from '@hooks';
import { CurtainText, ProjectCard } from './components';
import { portfolio } from './data';
import styles from './Portfolio.module.scss';

type View = keyof typeof portfolio;

export const Portfolio: FunctionalComponent = () => {
  const [view, setView] = useState<View>('active');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { start, active, step } = useAnimationSteps([450]);
  const offset = usePageSegmentOffset();

  const cardCount = (view === 'active' ? portfolio.active : portfolio.archived).length;

  const toggleView = () => {
    if (!active) {
      setView((view) => (view === 'active' ? 'archived' : 'active'));
      start();
    }
  };

  const introduction =
    view === 'active'
      ? "This is a curated list of projects I'm currently working on and / or still actively maintaining." +
        "I've been actively working on FOSS software since 2015, and over the course of the years I started over 30 (public) projects!"
      : 'Although all of these projects are retired, I once a great amount of time developing them and gained a lot of experience through them.';

  return (
    <div
      className={styles.projects}
      style={{ '--visibility': offset, '--percentage': (cardCount - activeCardIndex - 1) / cardCount }}
    >
      <AutoFontSize className={styles.backgroundText} maxFontSize={225}>
        PROJECTS
      </AutoFontSize>
      <div class={styles.sideBar}>
        <CurtainText className={styles.introduction} text={introduction} />

        <button class={styles.switchButton} onClick={toggleView}>
          <DynamicText
            text={
              view === 'active'
                ? `Show me the archive (${portfolio.archived.length} Projects)`
                : `Switch to latest (${portfolio.active.length} Projects)`
            }
          />
        </button>
      </div>

      <div class={styles.cards}>
        <Cards
          onCardChange={setActiveCardIndex}
          className={c(styles.list, { [styles.hidden]: step === 1 || view === 'archived' })}
        >
          {portfolio.active.map((value, index, list) => (
            <ProjectCard
              className={styles.card}
              styles={{
                '--visibility': clamp(offset + (offset ? 1 : 0) * (index / list.length), 0, 1),
                '--percentage': index / list.length,
              }}
              key={index}
              project={value}
            />
          ))}
        </Cards>
        <Cards
          onCardChange={setActiveCardIndex}
          className={c(styles.list, { [styles.hidden]: step === 1 || view === 'active' })}
        >
          {portfolio.archived.map((value, index, list) => (
            <ProjectCard
              className={styles.card}
              styles={{
                '--visibility': clamp(offset + (offset ? 1 : 0) * (index / list.length), 0, 1),
                '--percentage': index / list.length,
              }}
              key={index}
              project={value}
            />
          ))}
        </Cards>
      </div>
    </div>
  );
};
