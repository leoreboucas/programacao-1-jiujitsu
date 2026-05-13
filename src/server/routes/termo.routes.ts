import { Router } from "express";
import { termos } from '../controllers';

const router = Router();

router.get('/', termos.Controller.getAllValidation, termos.Controller.getAll);
router.get('/:id', termos.Controller.getByIdValidation, termos.Controller.getById);
router.post('/', termos.Controller.createValidation, termos.Controller.create);
router.put('/:id', termos.Controller.updateByIdValidation, termos.Controller.updateById);
router.delete('/:id', termos.Controller.deleteByIdValidation, termos.Controller.deleteById);

export default router;
