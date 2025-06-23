// custom.d.ts or src/types/express/index.d.ts

import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string; // or number or whatever type you expect
  }
}
