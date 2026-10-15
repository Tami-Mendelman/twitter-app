import "dotenv/config";

const { MONGODB_URI } = process.env;

export const config = {
    db: {
        mongoUri: MONGODB_URI,
    },
};
