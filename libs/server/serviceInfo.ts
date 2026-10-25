export const serviceInfo = {
    user: {
        name: "user-service",
        local: {
            port: 3000,
            rpcPort: 5000,
        },
        api: "/api/user-service",
    },
    content: {
        name: "content-service",
        local: {
            port: 3001,
            rpcPort: 5001,
        },
        api: "/api/content-service",
    },
} as const;
