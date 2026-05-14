import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IPessoa } from '../../models';

export const getById = async (id: number): Promise<IPessoa | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_pessoa.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let pessoas: IPessoa[] = [];

    if (fileData.trim() !== '') {
      pessoas = JSON.parse(fileData);
    }

    const result = pessoas.find((pessoa: IPessoa) => Number(pessoa.id) === Number(id));

    if (result) {
      return {
        ...result,
        createdAt: new Date(result.createdAt),
        updatedAt: new Date(result.updatedAt)
      } as IPessoa;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};