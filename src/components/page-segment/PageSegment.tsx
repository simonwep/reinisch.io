import { FunctionalComponent } from 'preact';
import { useContext } from 'preact/compat';
import { PageSegmentRange, PageSegmentRangeData } from './PageSegmentRange';

export const PageSegment: FunctionalComponent<PageSegmentRangeData> = (props) => {
  const parent = useContext(PageSegmentRange);

  return (
    <PageSegmentRange.Provider
      value={{
        offset: parent.offset + parent.length + props.offset,
        length: props.length,
      }}
    >
      {props.children}
    </PageSegmentRange.Provider>
  );
};
