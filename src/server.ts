import express from 'express';
import atividadeRoutes from './routes/atividadeRoutes';  // Importando as rotas de atividade
import dotenv from 'dotenv';
import servicoRoutes from './routes/servicoRoutes';
import maodeobraRoutes from './routes/maodeobraRoutes';
import motivodepausaRoutes from './routes/motivodepausaRoutes';
import contratoRoutes from './routes/contratoRoutes';
import empresaRoutes from './routes/empresaRoutes';
import RDOSRoutes from './routes/RDOSRoutes';
import encarregadoRoutes from './routes/encarregadoRoutes';
import equipamentoRoutes from './routes/equipamentoRoutes';
dotenv.config();


const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Definindo o caminho base para as rotas de atividades
app.use('/api', atividadeRoutes);  // As rotas de atividades estarão disponíveis em /api/atividades
// Definindo o caminho base para as rotas de serviços
app.use('/api', servicoRoutes);  // As rotas de serviços estarão disponíveis em /api/servicos
// Definindo o caminho base para as rotas de mãos de obra
app.use('/api', maodeobraRoutes);  // As rotas de mãos de obra estarão disponíveis em /api/maos-de-obra
// Definindo o caminho base para as rotas de motivos de pausa
app.use('/api', motivodepausaRoutes);  // As rotas de motivos de pausa estarão disponíveis em /api/motivos-de-pausa
// Definindo o caminho base para as rotas de contratos
app.use('/api', contratoRoutes);  // As rotas de contratos estarão disponíveis em /api/contratos
// Definindo o caminho base para as rotas de empresas
app.use('/api', empresaRoutes);  // As rotas de empresas estarão disponíveis em /api/empresas
// Definindo o caminho base para as rotas de RDOS
app.use('/api', RDOSRoutes);  // As rotas de RDOS estarão disponíveis em /api/rdos
// Definindo o caminho base para as rotas de encarregados
app.use('/api', encarregadoRoutes);  // As rotas de encarregados estarão disponíveis em /api/encarregados
// Definindo o caminho base para as rotas de equipamentos
app.use('/api', equipamentoRoutes);  // As rotas de equipamentos estarão disponíveis em /api/equipamentos

// Configuração de porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
