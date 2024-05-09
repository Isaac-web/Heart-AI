import { NextFunction, Request, Response } from 'express';

export interface BaseUser {
  _id: string;
  email: string;
  password: string;
  imageUrl?: string;
}

export interface User extends BaseUser {}

export interface Doctor {
  _id: string;
  email: string;
  password: string;
  imageUrl?: string;
}

export interface AppRequest extends Request {
  user?: BaseUser;
}

export interface AuthAppRequest<T extends BaseUser> extends Request {
  user: T;
}

export interface AppResponse extends Response {}

export interface AppNextFunction extends NextFunction {}

export interface JwtAuthPayload {
  _id: string;
}
