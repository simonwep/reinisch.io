import { createEvent, createStore } from 'effector';

export interface Section {
    hideNavigationItem?: boolean;
    title: string;
    id: string;
}

const sync = createEvent<Section>('sync');
const store = createStore<Section[]>([]).on(sync, (state, payload) => {
    const index = state.findIndex((v) => v.id === payload.id);
    return ~index ? state.splice(index, 1, payload) : [...state, payload];
});

export const sections = {
    store,
    sync,
};
