import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

export const authFilter = (req: Request, res: Response, next: NextFunction) => {
  if (req && req.headers && req.headers.authorization) {
    const authHeader = req.headers.authorization
    if (!authHeader.includes('Bearer')) {
      return res.status(401).json({ message: 'Authentication failed [E0004]' })
    }
    const token = req.headers.authorization.split(' ').pop()
    if (token) {
      try {
        jwt.verify(token, `${process.env.SECRET_KEY}`)
        const json: jwt.JwtPayload = jwt.decode(token) as jwt.JwtPayload
        if (json && json?.email) {
          req.headers['x-user-id'] = crypto.createHash('md5').update(json.email).digest('hex')
        } else {
          return res.status(401).json({ message: 'Authentication failed [E0005]' })
        }
        next()
      } catch (e) {
        if (e instanceof JsonWebTokenError) {
          return res.status(401).json({ message: 'Authentication failed [E0001]' })
        }
      }
    } else {
      return res.status(401).json({ message: 'Authentication failed [E0002]' })
    }
  } else {
    return res.status(401).json({ message: 'Authentication failed [E0003]' })
  }
}

export const getV1Path = (path: string) => {
  return `/api/v1/${path}`
}

