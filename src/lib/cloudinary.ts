import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: string,
  folder: string = "inkverse"
): Promise<string> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });
  return result.secure_url;
}

export async function uploadMangaPages(
  files: string[],
  mangaId: string,
  chapterNum: number
): Promise<string[]> {
  const folder = `inkverse/manga/${mangaId}/chapter-${chapterNum}`;
  const uploads = await Promise.all(
    files.map((f) => uploadImage(f, folder))
  );
  return uploads;
}

export { cloudinary };