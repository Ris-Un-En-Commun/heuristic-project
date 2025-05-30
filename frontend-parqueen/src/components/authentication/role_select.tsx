import {setupAxiosClient, type UserRole} from "../../api/setupAxiosClient.ts";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "../ui/select.tsx";

const RoleSelect = () => {
    return (
        <Select onValueChange={value => setupAxiosClient(value as UserRole)} name="parking">
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

    );
};

export default RoleSelect;