export interface DataPerusahaanList {
  _id: string;
  nama_perusahaan: string;
  status: string;
  kode_perusahaan: string;
  id_user_entreprise: {
    email_perusahaan: string;
  };
}

export interface DataPerusahaan {
  _id: string;
  id_user_entreprise: {
    email_perusahaan: string;
    phone_perusahaan: string;
    photo_profile: string;
  };
  id_kategori_perusahaan: {
    nama_kategori: string;
  };
  nama_perusahaan: string;
  phone_perusahaan: string;
  nama_aplikasi: string;
  logo_aplikasi: string;
  link_aplikasi: string;
  file_npwp_perusahaan: string;
  alamat: string;
  status: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
  kode_perusahaan: string;
}

export interface DokumenDirektur {
  _id: string;
  id_entreprise: string;
  nama_direktur: string;
  nama_penanggung_jawab: string;
  email_direktur: string;
  phone_direktur: string;
  is_verified: boolean;
}
export interface PerusahaanDetail {
  dataDokumenPimpinanDirektur: DokumenDirektur;
  dataDokumenPerusahaan: DataPerusahaan;
  dataDokumenLegalitas: {
    _id: string;
    id_entreprise: string;
    nama_legalitas: string;
    file_legalitas: string;
    createdAt: string;
    updatedAt: string;
    is_verified: boolean;
  };
  dataRekening: {
    status: string;
    _id: string;
    id_entreprise: string;
    nama_bank: string;
    no_rekening: string;
    createdAt: string;
    updatedAt: string;
    is_verified: boolean;
  };
}
