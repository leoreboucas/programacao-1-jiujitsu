import { readFileSync } from 'fs';
import path from 'path';
import { IPlano } from '../../models';

export const count = async (titulo = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../12_plano.json');

    const fileData = readFileSync(filePath, 'utf-8');
    const planos: IPlano[] = JSON.parse(fileData);

    const registrosFiltrados = planos.filter((plano: IPlano) =>
      plano.titulo.toLowerCase().includes(titulo.toLowerCase())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
