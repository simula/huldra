const caseFolderpath = "/gallery/cases/";

const getCaseFolderUrl = (rootDirectory, uuid) => {
  return `${rootDirectory}${caseFolderpath}${uuid}`;
};
const getCaseJsonFile = (rootDirectory, uuid) => {
  return `${getCaseFolderUrl(rootDirectory, uuid)}/${uuid}.json`;
};
export { getCaseFolderUrl, getCaseJsonFile };
