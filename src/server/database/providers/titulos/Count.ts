import { readFileSync } from 'fs';
import path from 'path';
import { ITitulo } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_titulos.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const titulos = JSON.parse(fileData);

    const registrosFiltrados = titulos.filter((usuario: ITitulo) =>
      usuario.id.toString().includes(id.toString())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
