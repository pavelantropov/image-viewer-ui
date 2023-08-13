export interface Image {
  id: number;
  name?: string;
  description?: string;
  uploadDate?: Date;
  // uploadedBy?: User;
  content?: string | Blob;
}

export interface FetchImagesResponse {
  images: Image[];
  imagesCount: number;
}

export interface UploadImageRequest {
  form: FormData;
}

// TODO
export interface UploadImageResponse {}

export interface DeleteImageRequest {
  id: number;
}

export interface DeleteImageResponse {}
