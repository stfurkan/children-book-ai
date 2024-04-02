import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";

export async function uploadRemoteImageToR2(remoteImageUrl: string, bucketName: string, fileName: string) {
  const response = await fetch(remoteImageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch remote image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: imageBuffer,
    ContentType: response.headers.get("Content-Type") || undefined,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Upload Success", data);
    return data;
  } catch (err) {
    console.error("Upload Error", err);
    throw new Error("Failed to upload remote image to Cloudflare R2.");
  }
}
