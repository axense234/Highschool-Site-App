const env = process.env.NODE_ENV;

const baseUrl =
  env === "development"
    ? "http://localhost:4000"
    : "https://highschool-site-app-server-ca.onrender.com";

const baseSiteUrl =
  env === "development"
    ? "http://localhost:3000"
    : "https://highschool-site-app-ca.netlify.app/";

export { baseUrl, baseSiteUrl };
