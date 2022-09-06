import { BehaviorSubject } from 'rxjs';

/**
 * Used to track the current scroll-position on the page.
 * First value is the section-index the user is currently looking at,
 * the second one is the visibilty of the next section.
 */
export const scp = new BehaviorSubject<[number, number]>([0, 0]);
