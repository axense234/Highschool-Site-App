const env = process.env.NODE_ENV;

const baseUrl =
  env === "development" || env === "test"
    ? "http://localhost:4000"
    : "https://highschool-site-app-server-ca.onrender.com";

const baseSiteUrl =
  env === "development" || env === "test"
    ? "http://localhost:3000"
    : process.env.CLIENT_URL

export { baseUrl, baseSiteUrl };
