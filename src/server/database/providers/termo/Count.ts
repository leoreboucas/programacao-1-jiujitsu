import { readFileSync } from 'fs';
import path from 'path';
import { ITermo } from '../../models';

export const count = async (titulo = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../16_termo.json');

    const fileData = readFileSync(filePath, 'utf-8');
    const termos: ITermo[] = JSON.parse(fileData);

    const registrosFiltrados = termos.filter((termo: ITermo) =>
      termo.titulo.toLowerCase().includes(titulo.toLowerCase())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
