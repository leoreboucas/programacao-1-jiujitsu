import { Router } from "express";
import { instrutoresTurmas } from '../controllers';

const router = Router();

router.get('/', instrutoresTurmas.Controller.getAllValidation, instrutoresTurmas.Controller.getAll);
router.get('/:id', instrutoresTurmas.Controller.getByIdValidation, instrutoresTurmas.Controller.getById);
router.post('/', instrutoresTurmas.Controller.createValidation, instrutoresTurmas.Controller.create);
router.put('/:id', instrutoresTurmas.Controller.updateByIdValidation, instrutoresTurmas.Controller.updateById);
router.delete('/:id', instrutoresTurmas.Controller.deleteByIdValidation, instrutoresTurmas.Controller.deleteById);

export default router;
