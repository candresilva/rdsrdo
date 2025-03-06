import { Request, Response } from 'express';
import RDSService from '../services/RDSService';

class RDSController {
    async listar(req: Request, res: Response) {
        try {
          const rds = await RDSService.listarTodas();
          return res.json(rds);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Erro ao listar RDS' });
        }
      }

  async buscar(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const rds = await RDSService.buscarPorId(id);
        if (!rds) {
          return res.status(404).json({ message: 'RDS não encontrado' });
        }
        return res.json(rds);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar RDS' });
      }
    }
  }

export default new RDSController();
