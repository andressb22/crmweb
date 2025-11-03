export const getMediaType = (mimeType: string) => {
  if (!mimeType) return null;

  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";

  return null;
};
