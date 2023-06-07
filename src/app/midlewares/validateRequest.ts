import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const ValidationRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      })
      return next()
    } catch (err) {
      next(err)
    }
  }
