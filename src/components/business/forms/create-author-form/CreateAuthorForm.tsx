import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { AuthorSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { CreateAuthorAction } from "@/actions"

const CreateBookForm = () => {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof AuthorSchema>>({
        resolver: zodResolver(AuthorSchema),
        defaultValues: {
            id: '...',
            name: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof AuthorSchema>) => {
        console.log(values)
        setIsLoading(true)
        await CreateAuthorAction(values.name)
            .then(() => toast({ title: "Успешно", description: "Автор был добавлен!", }))
            .catch(() => toast({ variant: 'destructive', title: 'Ошибка!', description: 'Что-то пошло не так!' }))
            .finally(() => setIsLoading(false))
    }
    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-[15px] max-w-[700px] w-full">
            <Input
                placeholder="Укажите автора"
                disabled={isLoading}
                {...register('name')}
                type="text"
            />
            {errors.name && <span className="text-red-500 text-start m-[5px]">{errors.name.message}</span>}
            <Button disabled={isLoading} className="w-full" type="submit">Создать автора</Button>
        </form>
    )
}

export default CreateBookForm


