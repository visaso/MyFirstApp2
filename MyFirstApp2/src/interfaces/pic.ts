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
