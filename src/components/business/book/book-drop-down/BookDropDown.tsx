import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const BookDropDown = ({ callback }: { callback: (value: 'edit' | 'delete') => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button variant="outline"><Menu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => {callback('delete')}}>Удалить</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {callback('edit')}}>Изменить</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default BookDropDown