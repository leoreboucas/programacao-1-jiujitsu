import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.plano, table => {
      table.bigIncrements('id').primary().index();
      table.text('periodo').notNullable();
      table.text('titulo').notNullable();
      table.text('descricao').notNullable();
      table.decimal('valor', 10, 2).notNullable();
      table.timestamp('data_atualizacao').defaultTo(knex.fn.now());
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.plano}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.plano)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.plano}`);
    });
}
