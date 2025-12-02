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
        return {
            useComponentContext,
            useNavigate,
            useLocation
        };
    }
    // Add other platform utilities as needed
};

export type PlatformAPI = typeof platformApi;
