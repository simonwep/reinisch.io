import { c, ClassNames } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './CurtainText.module.scss';

interface Props {
  className?: ClassNames;
  text: string;
}

export const CurtainText: FunctionalComponent<Props> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState(props.text);

  const onTransitionEnd = () => {
    console.log('end', collapsed);
    if (collapsed) {
      console.log('reset');
      setContent(props.text);
      setCollapsed(false);
    }
  };

  useEffect(() => {
    if (props.text !== content) {
      setCollapsed(true);
      console.log('start');
    }
  }, [props.text, content]);

  return (
    <article
      onTransitionEnd={onTransitionEnd}
      className={c(styles.curtainText, props.className, {
        [styles.collapsed]: collapsed,
      })}
    >
      {content}
    </article>
  );
};
