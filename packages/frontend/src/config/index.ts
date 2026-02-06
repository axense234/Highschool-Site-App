const env = process.env.NODE_ENV;

const baseUrl =
  env === "development" || env === "test"
    ? "http://localhost:4000"
    : "https://highschool-site-app-server-ca.onrender.com";

const baseSiteUrl = window.location.origin

export { baseUrl, baseSiteUrl };
