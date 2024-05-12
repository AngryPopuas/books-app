export interface IAuthor {
    id: string,
    name: string,
}
export interface ICreateBookForm {
    title: string,
    authors: Array<IAuthor>,
    publishedYear?: number | string | undefined,
    rating?: number,
    ISBN?: string | "" | undefined,
}
export interface IBook {
    id: string,
    title: string,
    authors: Array<IAuthor>,
    publishedYear?: number | string | undefined,
    rating?: number,
    ISBN?: string | "" | undefined, 
}
export interface IBookStore {
    books: Array<IBook>
}