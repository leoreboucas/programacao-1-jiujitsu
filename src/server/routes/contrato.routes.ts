import { Router } from "express";
import { contratos } from '../controllers';

const router = Router();

router.get('/', contratos.Controller.getAllValidation, contratos.Controller.getAll);
router.get('/:id', contratos.Controller.getByIdValidation, contratos.Controller.getById);
router.post('/', contratos.Controller.createValidation, contratos.Controller.create);
router.put('/:id', contratos.Controller.updateByIdValidation, contratos.Controller.updateById);
router.delete('/:id', contratos.Controller.deleteByIdValidation, contratos.Controller.deleteById);

export default router;
