import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "./select.tsx";
import {useRole} from "../../lib/contexts/authentication/RoleContext.tsx";
import type {UserRole} from "../../api/setupAxiosClient.ts";

const Header = () => {
    const {setRole} = useRole()
    return (
        <header className="flex justify-center items-center bg-blue-500 py-2">
            <h1 className="font-bold text-white text-3xl">Réservation de Parking</h1>
            <div className="justify-self-end">
                <Select onValueChange={value => setRole(value as UserRole)} name="parking">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Profile</SelectLabel>
                            <SelectItem value="admin">Karim (Secrétaire)</SelectItem>
                            <SelectItem value="user">David (Employé)</SelectItem>
                            <SelectItem value="manager">Laura (Manager)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </header>
    );
};

export default Header;