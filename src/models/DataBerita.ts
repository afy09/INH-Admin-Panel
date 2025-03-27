export interface ListDataBerita {
  id: number;
  image: string;
  title: string;
  deskripsi: string;
  author: string;
  created_at: string;
  update_at: string;
}

export interface DataBerita {
  data: ListDataBerita[];
  current_page: number;
  last_page: number;
  per_page: number;
}
