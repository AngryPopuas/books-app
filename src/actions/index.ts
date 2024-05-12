import { db } from '../../firebase.config'
import { addDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { IAuthor, IBook, ICreateBookForm } from '../types';
import { collection, getDocs, deleteDoc } from "firebase/firestore";


export const GetAuthorsAction = async (authorQuery?: string) => {
    try {
        const data: Array<IAuthor> = []
        const searchString = `${authorQuery![0].toUpperCase()}${authorQuery?.slice(1, authorQuery.length)}`
        console.log(searchString)
        const q = query(collection(db, "authors"), where('name', '>=', searchString), where('name', '<=', searchString + '\uF8FF'));
        console.log(authorQuery)
        const request = await getDocs(q);
        request.forEach((doc) => {
            console.log(doc)
            data.push({
                id: doc.id,
                name: doc.data().name
            })
        });
        return data
    } catch (err) {
        throw new Error('There was a problem with your request')
    }
}
export const SaveBookAction = async (book: ICreateBookForm) => {
    try {
        const data = {
            title: book.title,
            authors: book.authors,
            publishedYear: book.publishedYear ? book.publishedYear : 'Нет информации',
            rating: book.rating,
            ISBN: book.ISBN,
        }
        const request = await addDoc(collection(db, "books"), { ...data });
        const output: IBook = {
            ...book, id: request.id,
            rating: Number(book.rating),
            publishedYear: book.publishedYear ? book.publishedYear : undefined
        }
        return output
    } catch (err) {
        throw new Error('There was a problem with your request')
    }
}
export const DeleteBookAction = async (id: string) => {
    try {
        await deleteDoc(doc(db, "books", id));
        return id
    } catch (err) {
        throw new Error('There was a problem with your request')
    }
}
export const UpdateBookAction = async (book: IBook, id: string) => {
    try {
        await updateDoc(doc(db, "books", id), {
            ...book
        })
        return { book, id }
    } catch (err) {
        throw new Error('There was a problem with your request')
    }
}
export const GetBooksActions = async () => {
    try {
        const data: Array<IBook> = []
        const querySnapshot = await getDocs(collection(db, "books"));
        querySnapshot.forEach((doc) => {
            const book = doc.data()
            data.push({
                id: doc.id,
                title: book.title,
                authors: book.authors,
                publishedYear: book.publishedYear ? book.publishedYear : null,
                rating: book.rating ? book.rating : null,
                ISBN: book.ISBN ? book.ISBN : null,
            })
        });
        return data
    } catch (err) {
        throw new Error('There was a problem with your request')
    }
}