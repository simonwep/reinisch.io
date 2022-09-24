import { calculateScrollProgress } from '@utils/scroll-progress';
import { StateUpdater, useEffect, useState } from 'preact/hooks';

export interface Section {
    hideNavigationItem?: boolean;
    title: string;
    id: string;
}

export type ScrollOffset = [number, number];

const globalScrollOffset: ScrollOffset = [0, 0];
const globalSections: Section[] = [];

const sectionUpdate: Set<StateUpdater<Section[]>> = new Set();
const scrollOffsetUpdater: Set<StateUpdater<ScrollOffset>> = new Set();

const updateScrollOffset = () => {
    const offset = calculateScrollProgress(globalSections.slice(1).map((v) => v.id));
    scrollOffsetUpdater.forEach((update) => update(offset));
};

window.addEventListener('scroll', updateScrollOffset);

const addSection = (section: Section) => {
    globalSections.push(section);
    sectionUpdate.forEach((update) => update([...globalSections]));
    updateScrollOffset();
};

export const useStore = () => {
    const [sections, setSections] = useState<Section[]>(globalSections);
    const [scrollOffset, setScrollOffset] = useState<ScrollOffset>(globalScrollOffset);

    useEffect(() => {
        sectionUpdate.add(setSections);
        scrollOffsetUpdater.add(setScrollOffset);

        return () => {
            scrollOffsetUpdater.delete(setScrollOffset);
            sectionUpdate.delete(setSections);
        };
    }, []);

    return { sections, scrollOffset, addSection };
};
