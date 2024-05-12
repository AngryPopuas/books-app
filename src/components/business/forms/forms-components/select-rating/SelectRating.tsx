

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectRating = ({ selectCallback }: { selectCallback: (value: string) => void }) => {
    return (
        <Select onValueChange={(value) => selectCallback(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Рейтинг" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="0">0 </SelectItem>
                    <SelectItem value="1">1 </SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default SelectRating