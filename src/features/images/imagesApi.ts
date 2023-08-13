import { DefaultImages } from "./testData";
import {
  Image,
  UploadImageRequest,
  UploadImageResponse,
  FetchImagesResponse,
  DeleteImageResponse,
  DeleteImageRequest,
} from "./types";

const IMAGES_CONTROLLER_ROUTE = "images";

export async function fetchImages(): Promise<FetchImagesResponse> {
  if (process.env.NODE_ENV === "test") {
    return new Promise<FetchImagesResponse>((resolve) => {
      resolve({
        images: DefaultImages,
        imagesCount: DefaultImages ? DefaultImages.length : 0
      } as FetchImagesResponse);
    });
  } else {
    return await fetch(`${process.env.REACT_APP_API_URL}/${IMAGES_CONTROLLER_ROUTE}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    }).then((res) => res.json());
  }
}

export async function uploadImage(
  params: UploadImageRequest
): Promise<Image> {
  if (process.env.NODE_ENV === "test") {
    return new Promise<Image>((resolve) => {
      resolve({} as Image);
    });
  } else {
    return await fetch(`${process.env.REACT_APP_API_URL}/${IMAGES_CONTROLLER_ROUTE}`, {
      method: "POST",
      body: params.form,
    }).then((res) => res.json());
  }
}

export async function deleteImage(
  params: DeleteImageRequest
): Promise<DeleteImageResponse> {
  if (process.env.NODE_ENV === "test") {
    return new Promise<DeleteImageResponse>((resolve) => {
      resolve({} as DeleteImageResponse);
    });
  } else {
    return await fetch(`${process.env.REACT_APP_API_URL}/${IMAGES_CONTROLLER_ROUTE}/${params.id}`, {
      method: "DELETE",
    });
  }
}
