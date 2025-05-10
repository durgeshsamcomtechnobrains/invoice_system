import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
export const CONFIG = yaml.load(readFileSync('config.yml', 'utf8')) as any;

export const DB_CORE = 'CORE';
export const JWT_SECRET = CONFIG?.jwt_secret;
