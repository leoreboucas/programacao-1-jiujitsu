import { Router } from "express";
import { observacoes } from '../controllers';

const router = Router();

router.get('/',  observacoes.Controller.getAllValidation, observacoes.Controller.getAll);
router.get('/:id',  observacoes.Controller.getByIdValidation, observacoes.Controller.getById);
router.post('/',  observacoes.Controller.createValidation, observacoes.Controller.create);
router.put('/:id',  observacoes.Controller.updateByIdValidation, observacoes.Controller.updateById);
router.delete('/:id',  observacoes.Controller.deleteByIdValidation, observacoes.Controller.deleteById);

export default router;
