import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTurma } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../08_usuario_turma.json');

    if (!existsSync(filePath)) {
      return 0;
    }

    const fileData = readFileSync(filePath, 'utf-8');
    const usuariosTurmas: IUsuarioTurma[] = fileData.trim() !== '' ? JSON.parse(fileData) : [];

    return usuariosTurmas.filter((item) => item.id.toString().includes(id.toString())).length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
