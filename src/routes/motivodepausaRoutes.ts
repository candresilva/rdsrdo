import express from 'express';
import {MotivoDePausaController} from '../controllers/motivodepausaController';  // Importando a instância do controlador

const router = express.Router();
const motivodepausacontroller = MotivoDePausaController.getInstance();
console.log('MotivoDePausaController foi instanciado:', motivodepausacontroller);


// Rotas para motivos de pausa
router.get('/v1/listar/motivos-de-pausa', motivodepausacontroller.getAll.bind(motivodepausacontroller));  // Rota para listar todos os motivos de pausa
router.get('/v1/listar/motivos-de-pausa/:id', motivodepausacontroller.getById.bind(motivodepausacontroller));  // Rota para buscar um motivo de pausa por ID
router.post('/v1/criar/motivos-de-pausa', motivodepausacontroller.create.bind(motivodepausacontroller));  // Rota para criar um novo motivo de pausa
router.put('/v1/editar/motivos-de-pausa/:id', motivodepausacontroller.update.bind(motivodepausacontroller));  // Rota para atualizar um motivo de pausa
router.delete('/v1/excluir/motivos-de-pausa/:id', motivodepausacontroller.delete.bind(motivodepausacontroller));  // Rota para excluir um motivo de pausa

export default router;
