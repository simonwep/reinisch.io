import {BehaviorSubject, Subject} from 'rxjs';

export interface Section {
    hideNavItem?: boolean;
    title: string;
    id: string;
}

const list: Section[] = [];
export const sectionsContainer = new BehaviorSubject<Section[]>([]);
const sync = (s: Section) => {
    const existing = list.find(v => v.id === s.id);
    existing ? Object.assign(existing, s) : list.push(s);
    sectionsContainer.next(list);
};

export const sections = new Subject<Section>();
sections.subscribe(sync);
