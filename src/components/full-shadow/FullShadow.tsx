import { c, ClassNames } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import styles from './FullShadow.module.scss';

interface Props {
  is?: keyof JSX.IntrinsicElements;
  className?: ClassNames;
}

export const FullShadow: FunctionalComponent<Props> = (props) => {
  const Tag = props.is ?? 'div';

  return (
    <Tag className={c(props.className, styles.container)}>
      {props.children}
      <div className={styles.shadow}>{props.children}</div>
    </Tag>
  );
};
