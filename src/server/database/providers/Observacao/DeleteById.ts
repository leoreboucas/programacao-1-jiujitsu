import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IObservacao } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../02_observacao.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let observacoes: IObservacao[] = [];

    if (fileData.trim() !== '') {
      observacoes = JSON.parse(fileData);
    }

    const index = observacoes.findIndex((observacao: IObservacao) => Number(observacao.id) === Number(id));

    if (index !== -1) {
      observacoes.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(observacoes, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};