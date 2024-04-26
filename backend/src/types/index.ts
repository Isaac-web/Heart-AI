import { NextFunction, Request, Response } from 'express';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  userType: string;
}

export interface AppRequest extends Request {
  user?: User;
}

export interface AppResponse extends Response {}

export interface AppNextFunction extends NextFunction {}

export interface JwtAuthPayload {
  _id: string;
}
