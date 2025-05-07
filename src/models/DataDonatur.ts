export interface ListDataDonatur {
  id: string;
  name: string;
  email: string;
  mobile: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface DataDonatur {
  pageCount: number;
  pageSize: number;
  page: number;
  data: ListDataDonatur[];
}
