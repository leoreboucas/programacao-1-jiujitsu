import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IPlano } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../12_plano.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let planos: IPlano[] = [];

    if (fileData.trim() !== '') {
      planos = JSON.parse(fileData);
    }

    const index = planos.findIndex((plano: IPlano) => Number(plano.id) === Number(id));

    if (index !== -1) {
      planos.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(planos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
