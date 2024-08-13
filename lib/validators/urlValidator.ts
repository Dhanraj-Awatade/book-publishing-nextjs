export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return url;
  } catch (error) {
    console.log(error);
    return false;
  }
};
