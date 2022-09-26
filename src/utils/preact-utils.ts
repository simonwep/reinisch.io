type ClassRecord = Record<string, unknown>;

export type ClassNames = string | undefined | ClassRecord | (string | undefined | boolean | ClassRecord | ClassNames)[];

export const c = (...values: ClassNames[]): string =>
    values
        .flat(20) // https://github.com/microsoft/TypeScript/issues/36554#ref-issue-573235851
        .filter(Boolean)
        .flatMap((value) => {
            return typeof value === 'object'
                ? Object.entries(value)
                      .filter(([, value]) => value)
                      .map(([key]) => String(key))
                : String(value);
        })
        .join(' ');
