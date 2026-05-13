import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFilial } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../06_filiais.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let filiais: IFilial[] = [];

    if (fileData.trim() !== '') {
      filiais = JSON.parse(fileData);
    }

    const index = filiais.findIndex((filial: IFilial) => Number(filial.id) === Number(id));

    if (index !== -1) {
      filiais.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(filiais, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
