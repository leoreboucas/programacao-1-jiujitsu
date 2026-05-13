import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoCategoria } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../14_historico_categoria.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let historicos: IHistoricoCategoria[] = [];

    if (fileData.trim() !== '') {
      historicos = JSON.parse(fileData);
    }

    const index = historicos.findIndex((historico: IHistoricoCategoria) => Number(historico.id) === Number(id));

    if (index !== -1) {
      historicos.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(historicos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
