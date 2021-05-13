export const pluralize = (word: string, value: number): string => {
    return `${word}${Math.abs(value) !== 1 ? 's' : ''}`;
};
