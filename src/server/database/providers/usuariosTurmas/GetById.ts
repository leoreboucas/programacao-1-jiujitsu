import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTurma } from '../../models';

export const getById = async (id: number): Promise<IUsuarioTurma | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../08_usuario_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Registro nao encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuariosTurmas: IUsuarioTurma[] = [];

    if (fileData.trim() !== '') {
      usuariosTurmas = JSON.parse(fileData);
    }

    const result = usuariosTurmas.find((item) => Number(item.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      };
    }

    return new Error('Registro nao encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
