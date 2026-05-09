import { readFileSync } from 'fs';
import path from 'path';
import { IUsuario } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_usuarios.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const usuarios = JSON.parse(fileData);

    const registrosFiltrados = usuarios.filter((usuario: IUsuario) =>
      usuario.id.toString().includes(id.toString())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
