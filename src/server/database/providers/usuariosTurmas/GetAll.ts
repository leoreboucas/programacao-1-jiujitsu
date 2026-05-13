import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTurma } from '../../models';

export const getAll = async (page: number, limit: number, id = 0, idUsuario = 0, idTurma = 0): Promise<IUsuarioTurma[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../08_usuario_turma.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuariosTurmas: IUsuarioTurma[] = [];

    if (fileData.trim() !== '') {
      usuariosTurmas = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchIdUsuario = Number(idUsuario);
    const searchIdTurma = Number(idTurma);
    const hasFilter = searchId > 0 || searchIdUsuario > 0 || searchIdTurma > 0;

    const filteredResult = hasFilter
      ? usuariosTurmas.filter((item) => (
        (searchId > 0 && Number(item.id) === searchId) ||
        (searchIdUsuario > 0 && Number(item.id_usuario) === searchIdUsuario) ||
        (searchIdTurma > 0 && Number(item.id_turma) === searchIdTurma)
      ))
      : usuariosTurmas;

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);

    return filteredResult.slice(startIndex, endIndex).map((item) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    }));
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
