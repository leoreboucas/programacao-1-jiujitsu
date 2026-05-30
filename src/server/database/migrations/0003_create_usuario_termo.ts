import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.usuarioTermo, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_usuario').notNullable().references('id').inTable(ETableNames.usuario);
      table.timestamp('data_assinatura').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.usuarioTermo}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.usuarioTermo)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.usuarioTermo}`);
    });
}
