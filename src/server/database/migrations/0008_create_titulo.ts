import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.titulo, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('idUsuario').notNullable().references('id').inTable(ETableNames.usuario);
      table.text('titulo').notNullable();
      table.timestamp('dataVencimento').notNullable();
      table.timestamp('dataTitulo').notNullable();
      table.text('tipo').notNullable();
      table.text('status').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.titulo}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.titulo)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.titulo}`);
    });
}
