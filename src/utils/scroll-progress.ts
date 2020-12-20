/**
 * Calculates the amount of sections fully visible and the percentage of the next one.
 * @param ids Element ids
 */
export const calculateScrollProgress = (ids: string[]): [number, number] => {
    const {scrollHeight, scrollTop} = document.scrollingElement || document.documentElement;
    const {innerHeight} = window;
    let index = 0;

    for (const id of ids) {
        const rect = (document.getElementById(id) as HTMLElement).getBoundingClientRect();

        if (rect.top <= 0) {
            index++;
            continue;
        }

        const base = scrollTop + rect.top;
        let raw = 1 - (rect.top / innerHeight);

        // Some elements might not start at the very top, take that into account
        if (base > 0 && base < innerHeight) {
            raw = (base - rect.top) / (innerHeight - base);
        }

        // Check if element will never be on top (for example a footer)
        if ((base + innerHeight) > scrollHeight) {
            raw = 1 - (scrollHeight - innerHeight - scrollTop) / rect.height;
        }

        if (raw >= 1) {
            index++;
            continue;
        }

        if (raw >= 0) {
            index += Math.min(raw, 1);
            break;
        }
    }

    return [Math.floor(index), index % 1];
};
