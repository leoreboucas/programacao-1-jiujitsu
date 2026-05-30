import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.fichaMedica, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_pessoa').notNullable().references('id').inTable(ETableNames.pessoa);
      table.date('data_atual_ficha').notNullable();
      table.text('prescricao_medica').notNullable();
      table.text('outros').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.fichaMedica}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.fichaMedica)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.fichaMedica}`);
    });
}

