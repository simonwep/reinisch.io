import { c, ClassNames, Styles } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import styles from './Link.module.scss';

interface Props {
  onClick?: (e: MouseEvent) => void;
  className?: ClassNames;
  style?: Styles;
  label?: string;
  href: string;
}

export const Link: FunctionalComponent<Props> = (props, ref) => {
  const handleHashLink = (e: MouseEvent) => {
    history.pushState(null, document.title, props.href);
    document.getElementById(props.href.slice(1))?.scrollIntoView({
      behavior: 'smooth',
    });

    e.preventDefault();
  };

  const onClick = (e: MouseEvent): void => {
    e.stopPropagation();
    props.onClick?.(e);

    if (props.href.startsWith('#')) {
      handleHashLink(e);
    }
  };

  return (
    <a
      className={c(props.className, styles.link)}
      data-cursor-focus={true}
      style={props.style}
      rel="noopener noreferrer"
      target="_blank"
      ref={ref}
      href={props.href}
      aria-label={props.label}
      onClick={onClick}
    >
      {props.children}
    </a>
  );
};
