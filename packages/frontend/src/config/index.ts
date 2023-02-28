const env = process.env.NODE_ENV;

const baseUrl = env === "development" ? "http://localhost:4000" : "";

export { baseUrl };
