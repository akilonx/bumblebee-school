const isProduction = process.env.NODE_ENV === "production";

const devApiConfig = {
  baseUrl: "http://localhost:5000",
};

const prodApiConfig = {
  baseUrl: "https://bumblebeeapi.blackforestsoftware.com",
};

const apiConfig = isProduction ? prodApiConfig : devApiConfig;

export { apiConfig };
