import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.telefone, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('idPessoa').notNullable().references('id').inTable(ETableNames.pessoa);
      table.text('numero').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.telefone}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.telefone)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.telefone}`);
    });
}
