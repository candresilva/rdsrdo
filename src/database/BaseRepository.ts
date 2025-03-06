import { PrismaClient, Prisma } from '@prisma/client'; 

export class BaseRepository<T> {
  protected model: T;

  constructor(model: T) {
    this.model = model;
  }

  // Operações CRUD genéricas
  async findAll() {
    return (this.model as any).findMany();
  }

  async findById(id: string) {
    return (this.model as any).findUnique({ where: { id } });
  }

  async create(data: any) {
    return (this.model as any).create({ data });
  }

  async update(id: string, data: any) {
    return (this.model as any).update({ where: { id }, data });
  }

  async delete(id: string) {
    return (this.model as any).delete({ where: { id } });
  }
}

