import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuario } from '../../models';

export const updateById = async (id: number, usuario: Omit<IUsuario, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_usuarios.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuarios: IUsuario[] = [];

    if (fileData.trim() !== '') {
      usuarios = JSON.parse(fileData);
    }

    const index = usuarios.findIndex((item: IUsuario) => Number(item.id) === Number(id));

    if (index !== -1) {
      usuarios[index] = {
        ...usuarios[index],
        ...usuario,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');

      return;
    }

      return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
