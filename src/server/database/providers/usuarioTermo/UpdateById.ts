import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTermo } from '../../models';

export const updateById = async (id: number, usuarioTermo: Omit<IUsuarioTermo, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../17_usuario_termo.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuarioTermos: IUsuarioTermo[] = [];

    if (fileData.trim() !== '') {
      usuarioTermos = JSON.parse(fileData);
    }

    const index = usuarioTermos.findIndex((item: IUsuarioTermo) => Number(item.id) === Number(id));

    if (index !== -1) {
      usuarioTermos[index] = {
        ...usuarioTermos[index],
        ...usuarioTermo,
        updated_at: new Date(),
      };

      writeFileSync(filePath, JSON.stringify(usuarioTermos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
