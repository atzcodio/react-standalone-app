import { createContext } from 'react';
import { Context } from './types';

export const ComponentContext = createContext<Context | null>(null);
