import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.categoria, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').notNullable();
      table.string('faixa_etaria').notNullable();
      table.string('faixa_peso').notNullable();
      table.string('faixa').notNullable();
      table.string('descricao').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.categoria}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.categoria)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.categoria}`);
    });
}
