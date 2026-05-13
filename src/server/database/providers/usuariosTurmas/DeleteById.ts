import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTurma } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../08_usuario_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuariosTurmas: IUsuarioTurma[] = [];

    if (fileData.trim() !== '') {
      usuariosTurmas = JSON.parse(fileData);
    }

    const index = usuariosTurmas.findIndex((item) => Number(item.id) === Number(id));

    if (index !== -1) {
      usuariosTurmas.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(usuariosTurmas, null, 2), 'utf-8');
      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
