function getImagesBaseURL() {
  const baseUrl = process.env.NEXT_PUBLIC_CMS_URL;
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  return `${baseUrl}/images/${projectId}`;
}

export { getImagesBaseURL };
