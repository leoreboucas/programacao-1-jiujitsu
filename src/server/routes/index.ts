import { Router } from "express";
import usuariosRoutes from "./usuarios.routes";
import categoriasRoutes from "./categoria.routes";
import planosRoutes from "./plano.routes";
import usuarioTermosRoutes from "./usuarioTermo.routes";
import filiaisRoutes from './filiais.routes';
import turmasRoutes from './turmas.routes';
import horariosRoutes from './horarios.routes';
import graduacoes from "./graduacoes.routes";
import telefones from "./telefones.routes";
import pessoas from "./pessoas.routes";


const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/planos', planosRoutes);
router.use('/usuario-termos', usuarioTermosRoutes);
router.use('/filiais', filiaisRoutes);
router.use('/turmas', turmasRoutes);
router.use('/horarios', horariosRoutes);
router.use('/graduacoes', graduacoes);
router.use('/telefones', telefones);
router.use('/pessoas', pessoas);

export { router };
