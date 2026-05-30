import { Knex } from '../../knex';
import { IPlano } from '../../models';
import { ETableNames } from '../../ETableNames';
 
export const updateById = async (id: number, plano: Partial<Omit<IPlano, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.plano)
            .update(plano)
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
 