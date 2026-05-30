import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.perfil, table => {
      table.bigIncrements('id').primary().index();
      table.text('titulo').notNullable();
      table.text('autor').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.perfil}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.perfil)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.perfil}`);
    });
}
