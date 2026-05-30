import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
 
export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.telefone)
            .delete()
            .where({ id });
 
        if (result > 0) {
            return;
        }
 
        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar o registro');
    }
};
 