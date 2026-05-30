

export interface IFichaMedica {
  id: number;
  id_pessoa: number;
  data_atual_ficha: Date;
  prescricao_medica: string;
  outros: string;
  created_at: Date;
  updated_at: Date;
};
