import React, {createContext, type ReactNode, useContext, useEffect, useState,} from 'react';
import {setupAxiosClient, type UserRole} from "../../../api/authentication/setupAxiosClient.ts";

interface RoleContextType {
    role: UserRole;
    setRole: (newRole: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = 'parqueen-user-role';

type RoleProviderProps = {
    initialRole?: UserRole;
    children: ReactNode;
};

export const RoleProvider: React.FC<RoleProviderProps> = ({
                                                              initialRole = 'user',
                                                              children,
                                                          }) => {
    const [role, setRoleState] = useState<UserRole>(() => {
        const savedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null;
        console.log(savedRole);
        return savedRole || initialRole;
    });

    useEffect(() => {
        setupAxiosClient(role);
    }, [role]);

    useEffect(() => {
        localStorage.setItem(ROLE_STORAGE_KEY, role);
    }, [role]);

    const setRole = (newRole: UserRole) => {
        setRoleState(newRole);
    };

    return (
        <RoleContext.Provider value={{role, setRole}}>
            {children}
        </RoleContext.Provider>
    );
};

export function useRole() {
    const ctx = useContext(RoleContext);
    if (!ctx) {
        throw new Error('useRole must be used inside a <RoleProvider>');
    }
    return ctx;
}