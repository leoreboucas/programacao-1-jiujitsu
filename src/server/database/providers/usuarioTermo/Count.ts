import { readFileSync } from 'fs';
import path from 'path';
import { IUsuarioTermo } from '../../models';

export const count = async (id_usuario = 0): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../17_usuario_termo.json');

    const fileData = readFileSync(filePath, 'utf-8');
    const usuarioTermos: IUsuarioTermo[] = JSON.parse(fileData);

    const registrosFiltrados = usuarioTermos.filter((usuarioTermo: IUsuarioTermo) =>
      Number(id_usuario) > 0 ? Number(usuarioTermo.id_usuario) === Number(id_usuario) : true
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
