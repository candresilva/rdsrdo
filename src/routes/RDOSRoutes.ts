import express from 'express';
import {RDOSController} from '../controllers/RDOSController';  // Importando a instância do controlador

const router = express.Router();
const rdoscontroller = RDOSController.getInstance();
console.log('RDOSController foi instanciado:', rdoscontroller);


// Rotas para rdoss
router.get('/v1/listar/rdos', rdoscontroller.getAll.bind(rdoscontroller));  // Rota para listar todas as RDOS's
router.get('/v1/listar/rdos/:id', rdoscontroller.getById.bind(rdoscontroller));  // Rota para buscar uma RDOS por ID
router.post('/v1/criar/rdos', rdoscontroller.create.bind(rdoscontroller));  // Rota para criar uma nova RDOS
router.put('/v1/editar/rdos/:id', rdoscontroller.update.bind(rdoscontroller));  // Rota para atualizar uma RDOS
router.delete('/v1/excluir/rdos/:id', rdoscontroller.delete.bind(rdoscontroller));  // Rota para excluir uma RDOS

export default router;
