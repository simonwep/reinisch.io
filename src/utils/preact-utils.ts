/**
 * Utility to create a single class-name based on an object or array.
 * @param values
 */
export function cn(...values: Array<string | undefined | {[key: string]: boolean}>): string {
    const classNames: Array<string> = [];

    for (const item of values) {
        switch (typeof item) {
            case 'object': {
                for (const [key, val] of Object.entries(item)) {
                    if (val) {
                        classNames.push(key);
                    }
                }

                break;
            }
            case 'string': {
                classNames.push(item);
            }
        }
    }

    return classNames.join(' ');
}
