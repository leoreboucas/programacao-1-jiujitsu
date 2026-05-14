import { readFileSync } from 'fs';
import path from 'path';
import { IPessoa } from '../../models';
 
export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_pessoa.json');
 
    const fileData = await readFileSync(filePath, 'utf-8');
 
    const pessoas = JSON.parse(fileData);
 
    const registrosFiltrados = pessoas.filter((pessoa: IPessoa) =>
      pessoa.id.toString().includes(id)
    );
 
    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};