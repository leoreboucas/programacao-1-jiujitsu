import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ICategoria } from '../../models';

export const getById = async (id: number): Promise<ICategoria | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../15_categoria.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let categorias: ICategoria[] = [];

    if (fileData.trim() !== '') {
      categorias = JSON.parse(fileData);
    }

    const result = categorias.find((categoria: ICategoria) => Number(categoria.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at),
      } as ICategoria;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
