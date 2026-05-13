import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IContrato } from '../../models';

export const updateById = async (id: number, contrato: Omit<IContrato, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../13_contrato.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let contratos: IContrato[] = [];

    if (fileData.trim() !== '') {
      contratos = JSON.parse(fileData);
    }

    const index = contratos.findIndex((item: IContrato) => Number(item.id) === Number(id));

    if (index !== -1) {
      contratos[index] = {
        ...contratos[index],
        ...contrato,
        updated_at: new Date(),
      };

      writeFileSync(filePath, JSON.stringify(contratos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
