import { S3 } from "aws-sdk";
import * as fileType from "file-type";
import { v4 as uuid } from "uuid";

export interface UploadBody {
  fileData: string;
  mime: string;
  name: string;
}

export const uploadToS3 = async (bodyData: UploadBody) => {
  const s3 = new S3();
  const bucket = process.env.uploadBucketName;

  if (!bodyData || !bodyData.fileData || !bodyData.mime) {
    throw new Error("incorrect body on request");
  }

  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (!allowedMimes.includes(bodyData.mime)) {
    throw new Error("mime is not allowed");
  }

  let fileData = bodyData.fileData;

  if (bodyData.fileData.substr(0, 7) === "base64,") {
    fileData = bodyData.fileData.substr(7, bodyData.fileData.length);
  }

  const buffer = Buffer.from(fileData, "base64");
  const fileInfo = await fileType.fromBuffer(buffer);
  const detectedExt = fileInfo.ext;
  const detectedMime = fileInfo.mime;

  if (detectedMime !== bodyData.mime) {
    throw new Error("mime types dont match");
  }

  const name = uuid();
  const key = `upload/${name}.${detectedExt}`;

  console.log(`writing file to bucket called ${key}`);

  await s3
    .putObject({
      Body: buffer,
      Key: key,
      Bucket: bucket,
    })
    .promise();

  return {
    key,
    uploadUrl: `https://${bucket}.s3.amazonaws.com/${key}`,
  };
};
