import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTurma } from '../../models';

export const create = async (usuarioTurma: Omit<IUsuarioTurma, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../08_usuario_turma.json');
    let usuariosTurmas: IUsuarioTurma[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        usuariosTurmas = JSON.parse(fileData);
      }
    }

    const novoId = usuariosTurmas.length > 0
      ? Math.max(...usuariosTurmas.map((item) => Number(item.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: IUsuarioTurma = {
      ...usuarioTurma,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    };

    usuariosTurmas.push(novoRegistro);
    writeFileSync(filePath, JSON.stringify(usuariosTurmas, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
