import { Router } from "express";
import { planos } from '../controllers';

const router = Router();

router.get('/', planos.Controller.getAllValidation, planos.Controller.getAll);
router.get('/:id', planos.Controller.getByIdValidation, planos.Controller.getById);
router.post('/', planos.Controller.createValidation, planos.Controller.create);
router.put('/:id', planos.Controller.updateByIdValidation, planos.Controller.updateById);
router.delete('/:id', planos.Controller.deleteByIdValidation, planos.Controller.deleteById);

export default router;
