export const isValidMediaUrl = (value: string): boolean =>
    /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value);