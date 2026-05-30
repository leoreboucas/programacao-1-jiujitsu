import {
  IPessoa,
  IUsuario,
  ICategoria,
  IContrato,
  IHistoricoCategoria,
  IHistoricoPagamento,
  IFichaMedica,
  IFilial,
  IGraduacao,
  IHorario,
  IInstrutorTurma,
  IObservacao,
  ITurma,
  IPerfil,
  IPlano,
  ITelefone,
  ITermo,
  ITitulo,
  ITurmaHorario,
  IUsuarioTermo,
  IUsuarioTurma
} from "../../models";

declare module 'knex/types/table' {
  interface Tables {
    pessoa: IPessoa
    usuario: IUsuario
    categoria: ICategoria
    contrato: IContrato
    historico_categoria: IHistoricoCategoria
    historico_pagamento: IHistoricoPagamento
    ficha_medica: IFichaMedica
    filial: IFilial
    graduacao: IGraduacao
    horario: IHorario
    instrutor_turma: IInstrutorTurma
    observacao: IObservacao
    turma: ITurma
    perfil: IPerfil
    plano: IPlano
    telefone: ITelefone
    termo: ITermo
    titulo: ITitulo
    turma_horario: ITurmaHorario
    usuario_termo: IUsuarioTermo
    usuario_turma: IUsuarioTurma
  }
}
