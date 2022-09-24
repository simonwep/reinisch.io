import { useEffect, useState } from 'preact/hooks';

export interface Section {
    hideNavigationItem?: boolean;
    title: string;
    id: string;
}

const sections: Section[] = [];
const hooks: Set<(data: Section[]) => void> = new Set();

const register = (section: Section) => {
    sections.push(section);
    hooks.forEach((set) => set([...sections]));
};

export const useSections = (section?: Section) => {
    const [data, trigger] = useState<Section[]>(sections);

    useEffect(() => {
        hooks.add(trigger);
        section && register(section);
        return () => hooks.delete(trigger);
    }, []);

    return { data, register };
};
