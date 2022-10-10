import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { DynamicResize } from '../dynamic-resize/DynamicResize';
import styles from './DynamicText.module.scss';

interface Props {
  text: string;
}

const Letters: FunctionalComponent<Props> = (props) => (
  <>
    {[...props.text].map((character, index) => (
      <span key={index} className={styles.letter} style={{ '--offset': index / props.text.length }}>
        {character}
      </span>
    ))}
  </>
);

export const DynamicText: FunctionalComponent<Props> = (props) => {
  const [texts, setTexts] = useState<[string, string]>([props.text, props.text]);

  useEffect(() => {
    setTexts((texts) => [texts[1], props.text]);
  }, [props.text]);

  return (
    <DynamicResize is="span" className={styles.dynamicText}>
      <span key={texts}>
        <span class={styles.oldText}>
          <Letters text={texts[0]} />
        </span>
        <span class={styles.newText}>
          <Letters text={texts[1]} />
        </span>
      </span>
    </DynamicResize>
  );
};
