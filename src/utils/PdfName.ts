export const extractFileName = (url: string): string => {
  return url.substring(url.lastIndexOf("/") + 1);
};
