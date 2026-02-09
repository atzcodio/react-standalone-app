import React from 'react';
import { ElementTypes } from '../elements_types';
import { BaseComponent, getDefaultProps } from '../baseComponent';
import executeFlow from '../FlowExecution';
import { useNavigate, useLocation } from 'react-router-dom';
import { THEME } from '../props';
import * as AntdComponents from 'antd';
import * as AntdIcons from '@ant-design/icons';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as SimpleLineIcons from "react-icons/sl"
import * as MuiMaterialIcons from '@mui/icons-material';
import * as RiIcon from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi2";
import * as PiIcons from "react-icons/pi"; 
import * as LucideReact from 'lucide-react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';



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
    getDefaultProps,
    ElementTypes,
    UI: {},
    THEME: THEME,
    executeFlow: executeFlow,
    // Runtime dependencies for components
    antd: AntdComponents,
    icons: AntdIcons,
    AiIcons: AiIcons,
    FaIcons: FaIcons,
    SimpleLineIcons: SimpleLineIcons,
    MuiMaterialIcons: MuiMaterialIcons,
    RiIcon: RiIcon,
    BsIcons: BsIcons,
    HiIcons: HiIcons,
    PiIcons: PiIcons,
    LucideReact: LucideReact,
    TableList: FixedSizeList,
    AutoSizer: AutoSizer,
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
            useExecuteFlow,
            evaluateFormula: (context: any) => context.evaluateFormula
        };
    }
    // Add other platform utilities as needed
};

export type PlatformAPI = typeof platformApi;
