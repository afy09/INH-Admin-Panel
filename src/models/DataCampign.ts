export interface ListDataCampign {
  id: number;
  image: string;
  title: string;
  deskripsi: string;
  kategori: string;
  total: string;
  created_at: string;
}

export interface DataCampign {
  data: ListDataCampign[];
  current_page: number;
  last_page: number;
  per_page: number;
}
