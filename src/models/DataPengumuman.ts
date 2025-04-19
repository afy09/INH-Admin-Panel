export interface DataAktivitas {
  id: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface DataPengumuman {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ListDataPamplet {
  id: number;
  image: string;
  link_banner: string;
  valid: boolean;
  created_at: string;
  updated_at: string;
}

export interface DataPamplet {
  data: ListDataPamplet[];
  total_pengumuman: number;
  current_page: number;
  last_page: number;
  per_page: number;
}
