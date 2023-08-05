import { DefaultFiles } from "./testData";
import {
  Image,
  UploadFileRequest,
  UploadFileResponse,
  FetchFilesResponse,
} from "./types";

export async function fetchFile(
  fileId: string
): Promise<Image | undefined> {
  // if (process.env.NODE_ENV === "test") {
    return new Promise<Image | undefined>((resolve) => {
      let file;

      DefaultFiles.forEach((f) => {
        if (f.id === fileId) file = f;
      });

      resolve(file);
    });
  // } else {
  //   return await fetch(`${process.env.REACT_APP_API_URL}/api/files/${blogPostId}`, {
  //     method: "GET",
  //     headers: { Accept: "application/json" },
  //   }).then((res) => res.json());
  // }
}

export async function fetchFiles(): Promise<FetchFilesResponse> {
  // if (process.env.NODE_ENV === "test") {
    return new Promise<FetchFilesResponse>((resolve) => {
      resolve({
        files: DefaultFiles,
      } as FetchFilesResponse);
    });
  // } else {
  //   return await fetch(`${process.env.REACT_APP_API_URL}/api/files`, {
  //     method: "GET",
  //     headers: { Accept: "application/json" },
  //   }).then((res) => res.json());
  // }
}

export async function uploadImage(
  params: UploadFileRequest
): Promise<UploadFileResponse> {
  if (process.env.NODE_ENV === "test") {
    return new Promise<UploadFileResponse>((resolve) => {
      resolve({} as UploadFileResponse);
    });
  } else {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/files`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
  }
}
