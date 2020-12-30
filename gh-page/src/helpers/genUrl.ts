const ROOT = '/codepedia';

export const genUrl = (subPath: string) => {
  return `${ROOT}/${subPath}`;
};

export const getMapUrl = () => {
  return `${ROOT}/codepedia/entries/map.json`;
}