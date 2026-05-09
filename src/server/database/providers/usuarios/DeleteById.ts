import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuario } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_usuarios.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuarios: IUsuario[] = [];

    if (fileData.trim() !== '') {
      usuarios = JSON.parse(fileData);
    }

    const index = usuarios.findIndex((usuario: IUsuario) => Number(usuario.id) === Number(id));

    if (index !== -1) {
      usuarios.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
