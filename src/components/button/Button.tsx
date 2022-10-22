import { c, ClassNames } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import styles from './Button.module.scss';

interface Props {
  className?: ClassNames;
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
  title?: string;
}

export const Button: FunctionalComponent<Props> = (props) => {
  return (
    <button data-cursor="pointer" title={props.title} onClick={props.onClick} class={c(styles.button, props.className)}>
      {props.children}
    </button>
  );
};
