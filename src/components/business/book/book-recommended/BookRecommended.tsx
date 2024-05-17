import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { IBook } from "../../../../types"
import { Button } from "@/components/ui/button"


const BookRecommended = ({ props }: { props: IBook }) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Узнать статус:</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <h4>Книга не прошла проверку потому что:</h4>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default BookRecommended