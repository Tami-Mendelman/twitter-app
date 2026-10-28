export type User = {
    _id: string;
    username: string;
    displayName: string;
};

export type CreateUserPayload = Omit<User, "_id">;
