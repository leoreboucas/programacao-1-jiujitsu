import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTermo } from '../../models';

export const getById = async (id: number): Promise<IUsuarioTermo | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../17_usuario_termo.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuarioTermos: IUsuarioTermo[] = [];

    if (fileData.trim() !== '') {
      usuarioTermos = JSON.parse(fileData);
    }

    const result = usuarioTermos.find((usuarioTermo: IUsuarioTermo) => Number(usuarioTermo.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at),
      } as IUsuarioTermo;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
