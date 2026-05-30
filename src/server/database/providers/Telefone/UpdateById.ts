import { Knex } from '../../knex';
import { ITelefone } from '../../models';
import { ETableNames } from '../../ETableNames';
 
export const updateById = async (id: number, telefone: Partial<Omit<ITelefone, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.telefone)
            .update(telefone)
            .where({ id });
 
        if (result > 0) {
            return;
        }
 
        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};
 