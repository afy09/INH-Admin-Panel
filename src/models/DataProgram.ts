export interface ListDataDistribusiProgram {
  id: number;
  title: string;
  deskripsi: string;
  image: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface DataDistribusiProgram {
  data: ListDataDistribusiProgram;
  current_page: number;
  last_page: number;
  per_page: number;
}
