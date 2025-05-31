import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "./select.tsx";
import {useRole} from "../../lib/contexts/authentication/RoleContext.tsx";
import type {UserRole} from "../../api/authentication/setupAxiosClient.ts";
import CheckInButton from "../reservation/check_in_button.tsx";


const Header = () => {
    const {setRole, role} = useRole()
    return (
        <header className="flex justify-center items-center gap-x-2 bg-blue-500 py-2">
            <CheckInButton role={role}></CheckInButton>
            <h1 className="font-bold text-white text-3xl">Parqueen</h1>
            <div className="justify-self-end">
                <Select value={role} onValueChange={async function (value) {
                    setRole(value as UserRole);
                }} name="parking">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selectioner un rôle"/>
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