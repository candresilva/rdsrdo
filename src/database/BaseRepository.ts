import { PrismaClient, Prisma } from '@prisma/client'; 

export class BaseRepository<T extends { findMany: Function; findUnique: Function; create: Function; update: Function; delete: Function }> {
  protected model: T;

  constructor(model: T) {
    this.model = model;
  }

  // Operações CRUD genéricas
  async findAll() {
    return this.model.findMany();
  }

  async findById(id: string) {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.model.create({ data });
  }

  async update(id: string, data: any) {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.model.delete({ where: { id } });
  }
}

