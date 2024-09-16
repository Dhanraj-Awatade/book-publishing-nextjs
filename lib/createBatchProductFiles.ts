import fs from "fs";
import { getPayloadClient } from "@/lib/get-payload";
import { Media, ProductFile, User } from "@/payload-types";

interface createBatchProductFilesProps {
  user: User;
  directory: string; //relative to root of Project Source Code e.g. app/about/PDF
}

export const createBatchProductFiles = async ({
  user,
  directory,
}: createBatchProductFilesProps) => {
  const payload = await getPayloadClient();

  let createdProducts: ProductFile[] = [];

  try {
    const createNewProductFiles = async ({
      fileName,
      filePath,
    }: {
      filePath: string;
      fileName: string;
    }) => {
      const createdProductFile = await payload.create({
        collection: "product_files",
        filePath: filePath,
        data: {
          filename: fileName,
          user: user,
        },
      });

      console.log("created:", createdProductFile);

      createdProducts.push(createdProductFile);
    };

    if (user) {
      const files = fs
        .readdirSync("./" + directory + "/", { withFileTypes: true })
        .map(({ name, isFile, parentPath }) => {
          return { name, isFile, parentPath };
        });

      files.forEach(({ name, parentPath }) => {
        createNewProductFiles({
          fileName: name,
          filePath: parentPath + name,
        });
      });
      console.log("final Array:", createdProducts);
    }
  } catch (error) {
    console.log("error:", error);
  }
};

export const createBatchMedia = async ({
  user,
  directory,
}: createBatchProductFilesProps) => {
  const payload = await getPayloadClient();

  let createdMediaFiles: Media[] = [];

  try {
    const createNewMedia = async ({
      fileName,
      filePath,
    }: {
      filePath: string;
      fileName: string;
    }) => {
      const createdMedia = await payload.create({
        collection: "media",
        filePath: filePath,
        data: {
          filename: fileName,
          user: user,
        },
      });

      console.log("created:", createdMedia);

      createdMediaFiles.push(createdMedia);
    };

    if (user) {
      const files = fs
        .readdirSync("./" + directory + "/", { withFileTypes: true })
        .map(({ name, isFile, parentPath }) => {
          return { name, isFile, parentPath };
        });

      files.forEach(({ name, parentPath }) => {
        createNewMedia({
          fileName: name,
          filePath: parentPath + name,
        });
      });
      console.log("final Array:", createdMediaFiles);
    }
  } catch (error) {
    console.log("error creating media:", error);
  }
};
