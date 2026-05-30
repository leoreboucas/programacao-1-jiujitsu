import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
 
export const count = async (id = -1): Promise<number | Error> => {
    try {
       
        const [{ count }] = await Knex(ETableNames.telefone)
      .where('id','like', `%${id}%`)
      .count<[{ count: number }]>('* as count');

    if(Number.isInteger(Number(count))) return Number(count);

    return new Error('Erro ao consultar a quantidade total de registros');
        
    } catch (error) {
        console.log(error);
        return new Error('Erro ao contabilizar os registros');
    }
};
 