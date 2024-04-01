import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";

export async function deleteImageFromR2(bucketName: string, objectKey: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  try {
    await s3Client.send(command);
    console.log(`Successfully deleted ${objectKey} from ${bucketName}`);
  } catch (error) {
    console.error("Error deleting object:", error);
    throw error;
  }
}
