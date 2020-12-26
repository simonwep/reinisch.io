/**
 * Calculates the amount of sections fully visible and the percentage of the next one.
 * @param ids Element ids
 */
export const calculateScrollProgress = (ids: string[]): [number, number] => {
    const {scrollHeight, scrollTop} = document.scrollingElement || document.documentElement;
    const {innerHeight} = window;
    let offset = 0;
    let index = 0;

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const rect = (document.getElementById(id) as HTMLElement).getBoundingClientRect();
        const topOffset = rect.top + scrollTop;

        // The element was already seen or is currently "visible"
        if (rect.top <= 0) {
            index++;

            // The element itself might be higher than the window
            const clipping = rect.height > innerHeight ? rect.height % innerHeight : 0;

            // offset it the fixed bottom position of the last visited element
            offset = topOffset + clipping;

            // Element is clipped, the next transition shouldn't start
            if (rect.bottom > innerHeight) {
                break;
            }

            continue;
        }

        // Element will never reach the top, use bottom as reference
        if ((scrollHeight - scrollTop - rect.top) < innerHeight) {
            index += Math.min(1, 1 - ((rect.bottom - innerHeight) / rect.height));
            break;
        }

        // Element is entering focus
        index += (scrollTop - offset) / (topOffset - offset);
        break;
    }

    return [Math.floor(index), index % 1];
};
