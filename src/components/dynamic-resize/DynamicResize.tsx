import { c, ClassNames } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './DynamicResize.module.scss';

interface Props {
  is?: keyof JSX.IntrinsicElements;
  className?: ClassNames;
}

const applySize = (element: HTMLElement | null, width: string, height: string) => {
  element?.style.setProperty('width', width);
  element?.style.setProperty('height', height);
};

export const DynamicResize: FunctionalComponent<Props> = (props) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const transitioning = useRef(false);
  const observer = useRef<ResizeObserver>();
  const Tag = (props.is ?? 'div') as 'div';

  useEffect(() => {
    observer.current?.disconnect();

    if (element) {
      let size: DOMRect | undefined;

      const instance = new ResizeObserver(() => {
        if (transitioning.current) return;

        if (size) {
          transitioning.current = true;
          const newSize = element.getBoundingClientRect();
          applySize(element, `${size.width}px`, `${size.height}px`);

          requestAnimationFrame(() => {
            applySize(element, `${newSize.width}px`, `${newSize.height}px`);
            size = newSize;
          });
        } else {
          size = element.getBoundingClientRect();
        }
      });

      instance.observe(element);
      observer.current = instance;
      transitioning.current = false;
    }
  }, [element]);

  const transitionEnd = () => {
    applySize(element, 'auto', 'auto');
    transitioning.current = false;
  };

  return (
    <Tag ref={setElement} onTransitionEnd={transitionEnd} class={c(styles.dynamicResize, props.className)}>
      {props.children}
    </Tag>
  );
};
