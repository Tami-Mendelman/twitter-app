export const throwNotFoundError = (missingItem: string): never => {
    const error = new Error(`${missingItem} not found`);
    Object.assign(error, { status: 404 });
    throw error;
};
