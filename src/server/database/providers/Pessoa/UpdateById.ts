import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IPessoa } from '../../models';

export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id' | 'createdAt' | 'updatedAt'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_pessoa.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let pessoas: IPessoa[] = [];

    if (fileData.trim() !== '') {
      pessoas = JSON.parse(fileData);
    }

    const index = pessoas.findIndex((item: IPessoa) => Number(item.id) === Number(id));

    if (index !== -1) {
      pessoas[index] = {
        ...pessoas[index],
        ...pessoa,
        updatedAt: new Date()
      };

      writeFileSync(filePath, JSON.stringify(pessoas, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};