import {fromEvent, Subject} from 'rxjs';

export const rx = {
    scrollProgress: new Subject<[number, number]>(),
    windowResize: fromEvent(window, 'resize'),
    windowScroll: fromEvent(window, 'scroll')
};
