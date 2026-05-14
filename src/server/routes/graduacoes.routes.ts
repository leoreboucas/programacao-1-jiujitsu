import { Router } from "express";
import { graduacoes } from '../controllers';

const router = Router();

router.get('/',  graduacoes.Controller.getAllValidation, graduacoes.Controller.getAll);
router.get('/:id',  graduacoes.Controller.getByIdValidation, graduacoes.Controller.getById);
router.post('/',  graduacoes.Controller.createValidation, graduacoes.Controller.create);
router.put('/:id',  graduacoes.Controller.updateByIdValidation, graduacoes.Controller.updateById);
router.delete('/:id',  graduacoes.Controller.deleteByIdValidation, graduacoes.Controller.deleteById);

export default router;
