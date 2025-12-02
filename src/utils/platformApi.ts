import React from 'react';
import { ElementTypes } from '../elements_types';
import { BaseComponent } from '../baseComponent';
import executeFlow from '../FlowExecution';
import { useNavigate, useLocation } from 'react-router-dom';

// Platform API that will be injected into components
export const platformApi = {
    React: {
        ...React,
        CSSProperties: {} as any
    },
    ReactRouter: {
        useNavigate,
        useLocation
    },
    BaseComponent,
    ElementTypes,
    UI: {},
    executeFlow: executeFlow,
    // Provide a function to get hooks instead of the hooks themselves
    getPlatformHooks: () => {
        //Import hooks dynamically to avoid circular dependency issues
        const { useComponentContext } = require('../context/componentContext/hooks');
        const executeFlow = require('../FlowExecution').default;

        const useExecuteFlow = () => {
            const context = useComponentContext();
            const navigate = useNavigate();

            return (nodes: any[], nodeId?: string, extraOptions?: any) => {
                const options = {
                    ...context,
                    navigate,
                    ...extraOptions
                };
                return executeFlow(nodes, nodeId, options);
            };
        };

        return {
            useComponentContext,
            useNavigate,
            useLocation,
            useExecuteFlow
        };
    }
    // Add other platform utilities as needed
};

export type PlatformAPI = typeof platformApi;
