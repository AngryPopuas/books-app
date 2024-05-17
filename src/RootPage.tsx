import { useEffect, useState } from "react"
import CreateBookForm from "./components/business/forms/create-book-form/CreateBookForm"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { GetBooksThunk } from "./store/slices/bookSlice"
import Header from "./components/business/header/Header"
import BookListSkeleton from "./components/business/book/book-list-skeleton/BookListSkeleton"
import BookListWrapper from "./components/business/book/book-list-wrapper/BookListWrapper"
import CreateAuthorForm from "./components/business/forms/create-author-form/CreateAuthorForm"

const RootPage = () => {
  const dispatch = useAppDispatch()
  const books = useAppSelector(store => store.booksStore.books)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true)
      await dispatch(GetBooksThunk(''))
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
    fetchBooks()
  }, [])

  return (
    <div className="mx-auto w-full p-[5px] max-w-[1280px]">
      <Header />
      <div className="mt-10 w-full space-y-[15px] flex flex-col items-center ">
        <h2>Добавить книгу:</h2>
        <CreateBookForm />
        <h2>Добавить автора:</h2>
        <CreateAuthorForm />
      </div>
      <div className="mt-10">
        {isLoading
          ?
          <BookListSkeleton />
          :
          <BookListWrapper props={books} />
        }
      </div>
    </div >
  )
}

export default RootPage
