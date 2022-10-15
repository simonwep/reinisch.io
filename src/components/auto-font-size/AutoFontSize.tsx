import { useResizeObserver } from '@hooks';
import { resolveFittingFontSize } from '@utils/elements';
import { c, ClassNames } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';

interface Props {
  is?: keyof JSX.IntrinsicElements;
  className?: ClassNames;
  maxFontSize?: number;
}

export const AutoFontSize: FunctionalComponent<Props> = (props) => {
  const [container, setContainer] = useState<HTMLElement | null>();
  const Tag = (props.is ?? 'div') as unknown as 'div';
  const rawFontSize = container ? resolveFittingFontSize(container) ?? 16 : 16;
  const fontSize = Math.min(rawFontSize, props.maxFontSize ?? Infinity);
  useResizeObserver(container);

  return (
    <Tag className={c(props.className)} style={{ fontSize: `${fontSize}px` }} ref={setContainer}>
      {props.children}
    </Tag>
  );
};
