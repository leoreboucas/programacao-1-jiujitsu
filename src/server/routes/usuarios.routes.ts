import { Router } from "express";
import { usuarios } from '../controllers';

const router = Router();

router.get('/:id', usuarios.Controller.getByIdValidation, usuarios.Controller.getById);
router.get('/email/:email',  usuarios.Controller.getByEmailValidation, usuarios.Controller.getByEmail);
router.post('/', usuarios.Controller.createValidation, usuarios.Controller.create);
router.put('/:id', usuarios.Controller.updateByIdValidation, usuarios.Controller.updateById);
router.delete('/:id', usuarios.Controller.deleteByIdValidation, usuarios.Controller.deleteById);

export default router;
