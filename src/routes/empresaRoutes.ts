import express from 'express';
import {EmpresaController} from '../controllers/empresaController';  // Importando a instância do controlador

const router = express.Router();
const empresacontroller = EmpresaController.getInstance();
console.log('EmpresaController foi instanciado:', empresacontroller);


// Rotas para empresas
router.get('/v1/listar/empresas', empresacontroller.getAll.bind(empresacontroller));  // Rota para listar todas as empresas
router.get('/v1/listar/empresas/:id', empresacontroller.getById.bind(empresacontroller));  // Rota para buscar uma empresa por ID
router.post('/v1/criar/empresas', empresacontroller.create.bind(empresacontroller));  // Rota para criar uma nova empresa
router.put('/v1/editar/empresas/:id', empresacontroller.update.bind(empresacontroller));  // Rota para atualizar uma empresa
router.delete('/v1/excluir/empresas/:id', empresacontroller.delete.bind(empresacontroller));  // Rota para excluir uma empresa

export default router;
