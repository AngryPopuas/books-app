import { useForm } from "react-hook-form"
import { IBook } from "../../../../types"
import { useState } from "react"
import { useAppDispatch } from "../../../../hooks/redux"
import { EditBookThunk } from "../../../../store/slices/bookSlice"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MultiSelectAuthors from "../forms-components/multi-select-authors/MultiSelectAuthors"
import SelectRating from "../forms-components/select-rating/SelectRating"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditBookFormSchema } from "@/schemas"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"


const EditBookForm = ({ props, callback }: { props: IBook, callback: () => void }) => {
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof EditBookFormSchema>>({
        resolver: zodResolver(EditBookFormSchema),
        defaultValues: {
            id: props.id,
            title: props.title,
            authors: props.authors,
            publishedYear: props.publishedYear !== 'Нет информации' ? Number(props.publishedYear) : '',
            rating: props.rating ? props.rating : 0,
            ISBN: props.ISBN ? props.ISBN : undefined,
        },
    })

    const onSubmit = async (values: z.infer<typeof EditBookFormSchema>) => {
        setIsLoading(true)
        await dispatch(EditBookThunk({ book: values, id: values.id }))
            .then(() => {
                toast({ title: "Успешно", description: "Книга была изменена", })
                callback()
            })
            .catch(() => toast({ variant: 'destructive', title: 'Ошибка!', description: 'Что-то пошло не так!' }))
            .finally(() => setIsLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-[15px] w-[400px] rounded-md p-[10px] bg-secondary border">
            <Input
                {...register('title')}
                placeholder="Название"
                disabled={isLoading}
                type="text"
            />
            {errors.title && <span className="text-red-500 text-start m-[5px]">{errors.title.message}</span>}
            <Input
                {...register('publishedYear')}
                placeholder="Год публикации"
                disabled={isLoading}
                type="text"
            />
            {errors.publishedYear && <span className="text-red-500 text-start m-[5px]">{errors.publishedYear.message}</span>}
            <SelectRating selectCallback={(value) => {
                setValue('rating', Number(value))
            }} />
            {errors.rating && <span className="text-red-500 text-start m-[5px]">{errors.rating.message}</span>}
            <Input
                {...register('ISBN')}
                placeholder="ISBN"
                disabled={isLoading}
                type="text"
            />
            {errors.ISBN && <span className="text-red-500 text-start m-[5px]">{errors.ISBN.message}</span>}
            <div className="min-h-[50px] w-full">
                <MultiSelectAuthors
                    defaultValue={props.authors}
                    stateCallback={(selectedAuthors) => {
                        // @ts-ignore
                        setValue('authors', selectedAuthors)
                    }} />
            </div>
            {errors.authors && <span className="text-red-500 text-start m-[5px]">{errors.authors.message}</span>}

            <Button disabled={isLoading} className="w-full">Изменить</Button>
            <Button variant={'destructive'} type="button" onClick={callback} className="w-full">Отмена</Button>
        </form>
    )
}

export default EditBookForm