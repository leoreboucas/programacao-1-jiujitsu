import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IPessoa } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_pessoa.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let pessoas: IPessoa[] = [];

    if (fileData.trim() !== '') {
      pessoas = JSON.parse(fileData);
    }

    const index = pessoas.findIndex((pessoa: IPessoa) => Number(pessoa.id) === Number(id));

    if (index !== -1) {
      pessoas.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(pessoas, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};