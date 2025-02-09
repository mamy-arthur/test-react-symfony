import { useCallback } from "react";
import { useTokenStore } from "./store";
import { fetchApiConnect } from "../utils/fetchApi";

export enum AuthStatus {
    Unknown = 0,
    Authenticated = 1,
    Guest = 2,
};

export function useAuth() {
    const {token, setToken} = useTokenStore();
    let status;
    switch(token) {
        case null:
            status = AuthStatus.Guest;
            break;
        case undefined:
            status = AuthStatus.Unknown;
            break;
        default:
            status = AuthStatus.Authenticated;
            break;
    }

    const login = useCallback((email: string, password: string) => {
        fetchApiConnect({email, password}).then(response => setToken(response.token));
    }, []);
    return {
        token,
        status,
        login
    }
}