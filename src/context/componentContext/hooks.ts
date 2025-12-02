import { useContext } from 'react';
import { ComponentContext } from './context';
import { Context } from './types';

export const useComponentContext = (): Context => {
    const context = useContext(ComponentContext);
    if (context) {
        return context;
    } else {
        throw new Error("Context not supported");
    }
};
