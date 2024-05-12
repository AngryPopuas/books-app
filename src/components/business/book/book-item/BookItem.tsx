import { useAppDispatch } from "../../../../hooks/redux"
import { IBook } from "../../../../types"
import BookDropDown from "../book-drop-down/BookDropDown"
import BookSvg1 from '../../../../assets/img/Book1.svg'
import { DeleteBookThunk } from "@/store/slices/bookSlice";
import { useToast } from "@/components/ui/use-toast";


const BookItem = ({ props, callback }: { props: IBook, callback: () => void }) => {
    const { toast } = useToast()
    const dispatch = useAppDispatch()

    const handleBookDropDown = async (value: 'edit' | 'delete') => {
        value === 'edit'
            ?
            callback()
            :
            await dispatch(DeleteBookThunk(props.id))
                .then(() => toast({ title: "Успешно", description: "Книга была удалена!", }))
                .catch(() => toast({ variant: 'destructive', title: 'Ошибка!', description: 'Что-то пошло не так!' }))

    }
    return (
        <div id="book" className="relative w-[400px] flex flex-row border bg-secondary rounded-md p-[10px]">
            <img src={BookSvg1} alt="" width={'159px'} height={'226px'} className="object-cover w-[159px] h-[226px]" />
            <div className="flex flex-col justify-between pl-5 pr-12">
                <div className="absolute top-0 right-0">
                    <BookDropDown callback={(value) => handleBookDropDown(value)} />
                </div>
                <h4>{props.title.slice(0,22)}...</h4>
                <p>Авторы: {props.authors.map(item => item.name).join(',').slice(0,20)}</p>
                <p>Рейтинг: {props.rating ? props.rating : 0}</p>
                <p>Год издания: {props.publishedYear ? props.publishedYear : 'Неизвестно'}</p>
            </div>
        </div>
    )
}

export default BookItem