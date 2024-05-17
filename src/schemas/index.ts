import { ISBNCheckUtil } from '@/utlis'
import { z } from 'zod'

export const AuthorSchema = z.object({
    id: z.string(),
    name: z.string()
        .min(3, 'Название должно содержать хотя-бы 3 символа')
        .max(26, 'Название должно быть меньше 26 символов'),
})

export const CreateBookFormSchema = z.object({
    title: z.string()
        .min(1, 'Название обязательно')
        .max(100, 'Название не может быть больше 100 символов'),
    authors: z.array(AuthorSchema)
        .nonempty({ message: 'Книга должна содержать хотя бы одного автора' }),
    publishedYear: z.coerce.number({ message: 'Число не валидное' })
        .min(1800, 'Книга не может быть выпущена раньше 1800 года')
        .optional()
        .or(z.literal('')),
    rating: z.number()
        .min(0, 'Рейтинг не может быть ниже 0')
        .max(10, 'Рейтинг не может быть выше 10'),
    ISBN: z.string()
        .refine((value) => ISBNCheckUtil(value), { message: 'ISBN не валидный' })
        .optional()
        .or(z.literal(''))
})

export const EditBookFormSchema = z.object({
    id: z.string(),
    title: z.string()
        .min(1, 'Название обязательно')
        .max(100, 'Название не может быть больше 100 символов'),
    authors: z.array(AuthorSchema)
        .nonempty({ message: 'Книга должна содержать хотя бы одного автора' }),
    publishedYear: z.coerce.number({ message: 'Число не валидное' })
        .min(1800, 'Книга не может быть выпущена раньше 1800 года')
        .optional()
        .or(z.literal('')),
    rating: z.number()
        .min(0, 'Рейтинг не может быть ниже 0')
        .max(10, 'Рейтинг не может быть выше 10'),
    ISBN: z.string()
        .refine((value) => ISBNCheckUtil(value), { message: 'ISBN не валидный' })
        .optional()
        .or(z.literal(''))
})