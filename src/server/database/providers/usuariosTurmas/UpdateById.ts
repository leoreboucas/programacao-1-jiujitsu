import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTurma } from '../../models';

export const updateById = async (id: number, usuarioTurma: Omit<IUsuarioTurma, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../08_usuario_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuariosTurmas: IUsuarioTurma[] = [];

    if (fileData.trim() !== '') {
      usuariosTurmas = JSON.parse(fileData);
    }

    const index = usuariosTurmas.findIndex((item) => Number(item.id) === Number(id));

    if (index !== -1) {
      usuariosTurmas[index] = {
        ...usuariosTurmas[index],
        ...usuarioTurma,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(usuariosTurmas, null, 2), 'utf-8');
      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
