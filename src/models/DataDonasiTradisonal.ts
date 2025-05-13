export interface ListDataDonasiTradisonal {
  id: number;
  name: string;
  nominal: number;
  no_hp: string;
  tujuan_donasi: string;
  tanggal: string;
  created_at: string;
  updated_at: string;
}

export interface DataDonasiTradisonal {
  total_donasi: number;
  current_page: number;
  last_page: number;
  limit: number;
  data: ListDataDonasiTradisonal[];
}
