import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../../../hooks/redux"
import { useState } from "react"
import { CreateBookThunk } from "../../../../store/slices/bookSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import SelectRating from "../forms-components/select-rating/SelectRating"
import MultiSelectAuthors from "../forms-components/multi-select-authors/MultiSelectAuthors"
import { CreateBookFormSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'

const CreateBookForm = () => {
    const { toast } = useToast()
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof CreateBookFormSchema>>({
        resolver: zodResolver(CreateBookFormSchema),
        defaultValues: {
            title: "",
            authors: [],
            publishedYear: '',
            rating: 0,
            ISBN: undefined,
        },
    })

    const onSubmit = async (values: z.infer<typeof CreateBookFormSchema>) => {
        console.log(values)
        setIsLoading(true)
        await dispatch(CreateBookThunk(values))
            .then(() => toast({ title: "Успешно", description: "Книга была добавлена", }))
            .catch(() => toast({ variant: 'destructive', title: 'Ошибка!', description: 'Что-то пошло не так!' }))
            .finally(() => setIsLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-[15px] max-w-[700px] w-full">
            <Input
                placeholder="Название"
                disabled={isLoading}
                {...register('title')}
                type="text"
            />
            {errors.title && <span className="text-red-500 text-start m-[5px]">{errors.title.message}</span>}
            <Input
                placeholder="Год публикации"
                disabled={isLoading}
                type="text"
                {...register('publishedYear')}
            />
            {errors.publishedYear && <span className="text-red-500 text-start m-[5px]">{errors.publishedYear.message}</span>}
            <SelectRating selectCallback={(value) => {
                setValue('rating', Number(value))
            }} />
            {errors.rating && <span className="text-red-500 text-start m-[5px]">{errors.rating.message}</span>}
            <Input
                placeholder="ISBN"
                disabled={isLoading}
                type="text"
                {...register('ISBN')}
            />
            {errors.ISBN && <span className="text-red-500 text-start m-[5px]">{errors.ISBN.message}</span>}
            <div className="min-h-[50px] w-full">
                <MultiSelectAuthors
                    stateCallback={(selectedAuthors) => {
                        // @ts-ignore
                        setValue('authors', selectedAuthors)
                    }} />
            </div>
            {errors.authors && <span className="text-red-500 text-start m-[5px]">{errors.authors.message}</span>}

            <Button disabled={isLoading} className="w-full">Создать</Button>
        </form>
    )
}

export default CreateBookForm


