import { useNavigate, useLocation } from "react-router-dom";
import { useComponentContext } from "../context/componentContext";

export function getPlatformHooks() {
    return {
        useNavigate,
        useLocation,
        useComponentContext
    };
}