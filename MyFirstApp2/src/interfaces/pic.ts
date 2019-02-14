export interface Pic {
  file_id: string;
  filename: string;
  title: string;
  description: string;
  user_id: string;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnails;
}

export interface Thumbnails {
  w160: string;
  w320: string;
  w640: string;
}

export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface CheckUsername {
  username: string;
  available: boolean;
}

export interface MediaFile {
  title: string;
  description: string;
  file: File;
}

export interface Modify {
  title?: string;
  description?: string;
}
