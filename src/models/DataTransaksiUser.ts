export interface ListDataTransaksi {
  id: number;
  external_id: string;
  status: string;
  payment_method: string;
  balance_history_type: string;
  credit: string;
  customer_name: string;
  customer_email: string;
  customer_mobile: string;
  payment_link_name: string;
  created_at_api: string;
  created_at: string;
  updated_at: string;
}

export interface DataTransaksiUser {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  data: ListDataTransaksi[];
}
