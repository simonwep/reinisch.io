import { useResizeObserver } from '@hooks';
import { c, ClassNames } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';

interface Props {
  is?: keyof JSX.IntrinsicElements;
  class?: ClassNames;
  maxFontSize?: number;
  factor: number;
}

export const AutoFontSize: FunctionalComponent<Props> = (props) => {
  const [fontSize, setFontSize] = useState(16);
  const [container, setContainer] = useState<HTMLElement | null>();
  const elementSize = useResizeObserver(container);
  const Tag = (props.is ?? 'div') as unknown as 'div';

  useEffect(() => {
    if (container && elementSize) {
      const textLength = container.innerText.length;
      const target = (elementSize.width / textLength) * props.factor;
      setFontSize(Math.min(target, props.maxFontSize ?? Infinity));
    }
  }, [props.children, props.maxFontSize, props.factor, container, elementSize]);

  return (
    <Tag className={c(props.class)} style={{ fontSize: `${fontSize}px` }} ref={setContainer}>
      {props.children}
    </Tag>
  );
};
