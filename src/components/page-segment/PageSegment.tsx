import { FunctionalComponent } from 'preact';
import { useContext } from 'preact/compat';
import { PageSegmentContext, PageSegmentData } from './PageSegmentContext';
import styles from './PageSegment.module.scss';

interface Props extends PageSegmentData {
  component: FunctionalComponent;
}

export const PageSegment: FunctionalComponent<Props> = (props) => {
  const parent = useContext(PageSegmentContext);

  return (
    <PageSegmentContext.Provider
      value={{
        offset: parent.offset + parent.length + props.offset,
        length: props.length,
        next: props.next,
      }}
    >
      <div class={styles.pageSegment}>
        <props.component />
      </div>
    </PageSegmentContext.Provider>
  );
};
