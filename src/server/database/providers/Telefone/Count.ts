import { readFileSync } from 'fs';
import path from 'path';
import { ITelefone } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_telefones.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const telefones = JSON.parse(fileData);

    const registrosFiltrados = telefones.filter((telefone: ITelefone) =>
      telefone.id.toString().includes(id)
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
