import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";
import { errorException } from "./errors";
import { PayloadType } from "./withAuthApi";

export const prisma = new PrismaClient();

export type Pagination = {
  pageSize: number;
  page: number;
  counts?: number;
  lastPage?: number;
};

export class ApiHandler {
  protected readonly prisma: PrismaClient;
  protected readonly res: NextApiResponse;
  protected readonly req: NextApiRequest;
  protected readonly payload?: PayloadType;
  protected readonly pagination?: Pagination;
  constructor(
    req: NextApiRequest,
    res: NextApiResponse,
    payload?: PayloadType
  ) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
    this.payload = payload;

    if (this.req.method!.toLocaleLowerCase() === "get") {
      const query = req.query;
      const pageSize = Math.abs(+(query.pageSize || 10) || 1);
      const page = Math.abs(+(query.page || 1) || 1);
      this.pagination = { page, pageSize };
    }
  }

  // Get Method
  async get() {
    await this.default();
  }
  // Post Method
  async post() {
    await this.default();
  }
  // Put method
  async put() {
    await this.default();
  }
  // Patch method
  async patch() {
    await this.default();
  }
  // Delete method
  async delete() {
    await this.default();
  }
  // Option method
  async option() {
    await this.default();
  }
  // Default method
  async default() {
    throw errorException("method");
  }
}
