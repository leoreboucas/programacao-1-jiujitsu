import { readFileSync } from 'fs';
import path from 'path';
import { IObservacao } from '../../models';
 
export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../02_observacao.json');
 
    const fileData = await readFileSync(filePath, 'utf-8');
 
    const observacoes = JSON.parse(fileData);
 
    const registrosFiltrados = observacoes.filter((observacao: IObservacao) =>
      observacao.id.toString().includes(id)
    );
 
    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
 