import { readFileSync } from 'fs';
import path from 'path';
import { IContrato } from '../../models';

export const count = async (id_usuario = 0): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../13_contrato.json');

    const fileData = readFileSync(filePath, 'utf-8');
    const contratos: IContrato[] = JSON.parse(fileData);

    const registrosFiltrados = contratos.filter((contrato: IContrato) =>
      Number(id_usuario) > 0 ? Number(contrato.id_usuario) === Number(id_usuario) : true
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
