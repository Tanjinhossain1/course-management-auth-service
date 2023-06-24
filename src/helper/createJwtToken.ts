import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const createToken = (
  payload: object,
  secret: Secret,
  expireIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireIn,
  });
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  console.log('first', jwt.verify(token, secret) as JwtPayload);
  return jwt.verify(token, secret) as JwtPayload;
};
