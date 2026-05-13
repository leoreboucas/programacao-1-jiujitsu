export interface IPlano {
  id: number;
  periodo: string;
  titulo: string;
  descricao: string;
  valor: number;
  data_atualizacao: Date;

  created_at: Date;
  updated_at: Date;
};
