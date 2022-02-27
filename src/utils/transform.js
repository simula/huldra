const generateBlobFromJson = (json) => {
  return new Blob([json], { type: "application/json" });
};
export { generateBlobFromJson };
