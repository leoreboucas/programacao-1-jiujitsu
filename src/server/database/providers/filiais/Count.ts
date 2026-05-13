import { readFileSync } from 'fs';
import path from 'path';
import { IFilial } from '../../models';

export const count = async (id = -1): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../06_filial.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const filiais = JSON.parse(fileData);

    const registrosFiltrados = filiais.filter((filial: IFilial) =>
      filial.id.toString().includes(id.toString())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
