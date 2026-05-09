import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITitulo } from '../../models';

export const updateById = async (id: number, titulo: Omit<ITitulo, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_titulos.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let titulos: ITitulo[] = [];

    if (fileData.trim() !== '') {
      titulos = JSON.parse(fileData);
    }

    const index = titulos.findIndex((item: ITitulo) => Number(item.id) === Number(id));

    if (index !== -1) {
      titulos[index] = {
        ...titulos[index],
        ...titulo,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(titulos, null, 2), 'utf-8');

      return;
    }

      return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
