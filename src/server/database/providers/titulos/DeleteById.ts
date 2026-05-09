import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITitulo } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_titulos.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let titulos: ITitulo[] = [];

    if (fileData.trim() !== '') {
      titulos = JSON.parse(fileData);
    }

    const index = titulos.findIndex((titulo: ITitulo) => Number(titulo.id) === Number(id));

    if (index !== -1) {
      titulos.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(titulos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
