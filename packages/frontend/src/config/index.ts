const env = process.env.NODE_ENV;

const baseUrl = env === "development" ? "http://localhost:4000" : "";

const baseSiteUrl = env === "development" ? "http://localhost:3000" : "";

export { baseUrl, baseSiteUrl };
