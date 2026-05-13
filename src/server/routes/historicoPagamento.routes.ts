import { Router } from "express";
import { historicoPagamento } from '../controllers';

const router = Router();

router.get('/',  historicoPagamento.Controller.getAllValidation, historicoPagamento.Controller.getAll);
router.get('/:id',  historicoPagamento.Controller.getByIdValidation, historicoPagamento.Controller.getById);
router.post('/',  historicoPagamento.Controller.createValidation, historicoPagamento.Controller.create);
router.put('/:id',  historicoPagamento.Controller.updateByIdValidation, historicoPagamento.Controller.updateById);
router.delete('/:id',  historicoPagamento.Controller.deleteByIdValidation, historicoPagamento.Controller.deleteById);

export default router;
