export interface Image {
  id: string;
  name?: string;
  description?: string;
  uri?: string;
  uploadDate?: Date;
  // uploadedBy?: User;
}

export interface FetchFilesResponse {
  files: Image[];
}

export interface UploadFileRequest {
  name: string;
  description: string;
  uri: string;
}

export interface UploadFileResponse {}
