import { Router } from "express";
import { categorias } from '../controllers';

const router = Router();

router.get('/', categorias.Controller.getAllValidation, categorias.Controller.getAll);
router.get('/:id', categorias.Controller.getByIdValidation, categorias.Controller.getById);
router.post('/', categorias.Controller.createValidation, categorias.Controller.create);
router.put('/:id', categorias.Controller.updateByIdValidation, categorias.Controller.updateById);
router.delete('/:id', categorias.Controller.deleteByIdValidation, categorias.Controller.deleteById);

export default router;
