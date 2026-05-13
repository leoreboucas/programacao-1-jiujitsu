import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IContrato } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../13_contrato.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let contratos: IContrato[] = [];

    if (fileData.trim() !== '') {
      contratos = JSON.parse(fileData);
    }

    const index = contratos.findIndex((contrato: IContrato) => Number(contrato.id) === Number(id));

    if (index !== -1) {
      contratos.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(contratos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
