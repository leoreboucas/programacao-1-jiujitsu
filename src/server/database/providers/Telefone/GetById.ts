import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITelefone } from '../../models';

export const getById = async (id: number): Promise<ITelefone | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_telefones.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let telefones: ITelefone[] = [];

    if (fileData.trim() !== '') {
      telefones = JSON.parse(fileData);
    }

    const result = telefones.find((telefone: ITelefone) => Number(telefone.id) === Number(id));

    if (result) {
      return {
        ...result,
        createdAt: new Date(result.createdAt),
        updatedAt: new Date(result.updatedAt)
      } as ITelefone;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
