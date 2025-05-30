import React, {createContext, type ReactNode, useContext, useEffect, useState,} from 'react';
import {setupAxiosClient, type UserRole} from "../../../api/setupAxiosClient.ts";

interface RoleContextType {
    role: UserRole;
    setRole: (newRole: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

type RoleProviderProps = {
    initialRole?: UserRole;
    children: ReactNode;
};

export const RoleProvider: React.FC<RoleProviderProps> = ({
                                                              initialRole = 'user',
                                                              children,
                                                          }) => {
    const [role, setRoleState] = useState<UserRole>(initialRole);

    useEffect(() => {
        setupAxiosClient(role);
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