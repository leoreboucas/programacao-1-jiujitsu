import { Router } from "express";
import { filiais } from '../controllers';

const router = Router();

router.get('/',  filiais.Controller.getAllValidation, filiais.Controller.getAll);
router.get('/:id', filiais.Controller.getByIdValidation, filiais.Controller.getById);
router.post('/', filiais.Controller.createValidation, filiais.Controller.create);
router.put('/:id', filiais.Controller.updateByIdValidation, filiais.Controller.updateById);
router.delete('/:id', filiais.Controller.deleteByIdValidation, filiais.Controller.deleteById);

export default router;
