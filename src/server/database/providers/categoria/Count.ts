import { readFileSync } from 'fs';
import path from 'path';
import { ICategoria } from '../../models';

export const count = async (nome = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../15_categoria.json');

    const fileData = readFileSync(filePath, 'utf-8');
    const categorias: ICategoria[] = JSON.parse(fileData);

    const registrosFiltrados = categorias.filter((categoria: ICategoria) =>
      categoria.nome.toLowerCase().includes(nome.toLowerCase())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
