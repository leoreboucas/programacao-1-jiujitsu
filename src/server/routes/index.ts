import { Router } from "express";
import titulosRouters from './titulos.routes';
import usuariosRoutes from "./usuarios.routes";
import historicoPagamento from "./historicoPagamento.routes";
import livrosRoutes from './livros.routes';
import favoritosRoutes from "./favoritos.routes";
import categoriasRoutes from "./categoria.routes";
import contratosRoutes from "./contrato.routes";
import historicoCategoriaRoutes from "./historicoCategoria.routes";
import planosRoutes from "./plano.routes";
import termosRoutes from "./termo.routes";
import usuarioTermosRoutes from "./usuarioTermo.routes";
import filiaisRoutes from './filiais.routes'
import turmasRoutes from './turmas.routes'
import horariosRoutes from './horarios.routes'
import usuariosTurmasRoutes from './usuariosTurmas.routes'
import instrutoresTurmasRoutes from './instrutoresTurmas.routes'
import turmasHorariosRoutes from './turmasHorarios.routes'


const router = Router();

router.use('/titulos', titulosRouters);
router.use('/usuarios', usuariosRoutes);
router.use('/historico_pagamento', historicoPagamento);
router.use('/livros', livrosRoutes);
router.use('/favoritos', favoritosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/contratos', contratosRoutes);
router.use('/historico-categorias', historicoCategoriaRoutes);
router.use('/planos', planosRoutes);
router.use('/termos', termosRoutes);
router.use('/usuario-termos', usuarioTermosRoutes);
router.use('/filiais', filiaisRoutes)
router.use('/turmas', turmasRoutes)
router.use('/horarios', horariosRoutes)
router.use('/usuarios-turmas', usuariosTurmasRoutes)
router.use('/instrutores-turmas', instrutoresTurmasRoutes)
router.use('/turmas-horarios', turmasHorariosRoutes)

export { router };
