import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFilial } from '../../models';

export const updateById = async (
  id: number,
  filial: Omit<IFilial, 'id' | 'created_at' | 'updated_at'>
): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../06_filial.json');

    if (!existsSync(filePath)) {
      return new Error('Arquivo de dados não existe');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let filiais: IFilial[] = [];

    if (fileData.trim() !== '') {
      filiais = JSON.parse(fileData);
    }

    const index = filiais.findIndex((item: IFilial) => Number(item.id) === Number(id));

    if (index !== -1) {
      filiais[index] = { ...filiais[index], ...filial, updated_at: new Date() };
      writeFileSync(filePath, JSON.stringify(filiais, null, 2), 'utf-8');
      return;
    }

    return new Error('Filial com o ID especificado não encontrada');

  } catch (error) {
    console.error('Erro detalhado:', error);
    return new Error('Erro interno ao atualizar o registro');
  }
};

