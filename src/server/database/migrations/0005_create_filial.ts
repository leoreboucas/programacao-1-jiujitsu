import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.filial, table => {
      table.bigIncrements('id').primary().index();
      table.text('logradouro').notNullable();
      table.text('bairro').notNullable();
      table.text('numero').notNullable();
      table.text('cep').notNullable();
      table.text('cidade').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.filial}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.filial)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.filial}`);
    });
}

