import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IObservacao } from '../../models';

export const getById = async (id: number): Promise<IObservacao | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../02_observacao.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let observacoes: IObservacao[] = [];

    if (fileData.trim() !== '') {
      observacoes = JSON.parse(fileData);
    }

    const result = observacoes.find((observacao: IObservacao) => Number(observacao.id) === Number(id));

    if (result) {
      return {
        ...result,
        createdAt: new Date(result.createdAt),
        updatedAt: new Date(result.updatedAt)
      } as IObservacao;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};