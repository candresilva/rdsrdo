import express from 'express';
import {ContratoController} from '../controllers/contratoController';  // Importando a instância do controlador

const router = express.Router();
const contratocontroller = ContratoController.getInstance();
console.log('ContratoController foi instanciado:', contratocontroller);


// Rotas para contratos
router.get('/v1/listar/contratos', contratocontroller.getAll.bind(contratocontroller));  // Rota para listar todos os contratos
router.get('/v1/listar/contratos/:id', contratocontroller.getById.bind(contratocontroller));  // Rota para buscar um contrato por ID
router.post('/v1/criar/contratos', contratocontroller.create.bind(contratocontroller));  // Rota para criar um novo contrato
router.put('/v1/editar/contratos/:id', contratocontroller.update.bind(contratocontroller));  // Rota para atualizar um contrato
router.delete('/v1/excluir/contratos/:id', contratocontroller.delete.bind(contratocontroller));  // Rota para excluir um contrato

export default router;
