export interface ListDataTransaksi {
  id: string;
  credit: number;
  status: string;
  paymentMethod: string;
  customerId: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    mobile: string;
  };
  paymentLink: {
    id: string;
    name: string;
  };
}

export interface DataTransaksi {
  pageCount: number;
  pageSize: number;
  page: number;
  data: ListDataTransaksi[];
}

export interface ListDataTransaksiUnpaid {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  customerId: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    mobile: string;
  };
  paymentLink: {
    id: string;
    name: string;
  };
}

export interface DataTransaksiUnpaid {
  pageCount: number;
  pageSize: number;
  page: number;
  data: ListDataTransaksi[];
}
