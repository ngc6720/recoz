const getUrl = () => {
  if (process.env.VERCEL === "1") {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  } else {
    return `${process.env.HOST}${
      process.env.PORT !== "443" ? ":" + process.env.PORT : ""
    }`;
  }
};

export const url = getUrl();
