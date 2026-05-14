import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITelefone } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_telefones.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let telefones: ITelefone[] = [];

    if (fileData.trim() !== '') {
      telefones = JSON.parse(fileData);
    }

    const index = telefones.findIndex((telefone: ITelefone) => Number(telefone.id) === Number(id));

    if (index !== -1) {
      telefones.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(telefones, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
