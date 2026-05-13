import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTermo } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../17_usuario_termo.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuarioTermos: IUsuarioTermo[] = [];

    if (fileData.trim() !== '') {
      usuarioTermos = JSON.parse(fileData);
    }

    const index = usuarioTermos.findIndex((usuarioTermo: IUsuarioTermo) => Number(usuarioTermo.id) === Number(id));

    if (index !== -1) {
      usuarioTermos.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(usuarioTermos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
