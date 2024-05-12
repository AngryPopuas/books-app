import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const BookListSelect = ({ selectCallback }: { selectCallback: (value: string) => void }) => {
    return (
        <Select onValueChange={(value) => selectCallback(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Сортировать по" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="authors">По авторам</SelectItem>
                    <SelectItem value="years">По годам</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default BookListSelect