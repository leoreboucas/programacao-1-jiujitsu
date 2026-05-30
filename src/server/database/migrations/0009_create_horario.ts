import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.horario, table => {
      table.bigIncrements('id').primary().index();
      table.text('dia').notNullable();
      table.text('hora').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.horario}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.horario)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.horario}`);
    });
}

