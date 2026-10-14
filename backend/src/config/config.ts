import "dotenv/config";

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
    throw new Error("MONGODB_URI is not defined");
}

export const config = {
    mongodbUri,
};
