import { IBook } from '@/types'
import { MainSortBooksUtil } from '@/utlis'

import { useEffect, useState } from 'react'
import BookList from './book-list/BookList'
import BookListSelect from './book-list-select/BookListSelect'

const BookListWrapper = ({ props }: { props: Array<IBook> }) => {
    const [sortSelect,setSortSelect] = useState<'years' | 'authors'>('years')
    const [sortedBooks, setSortedBooks] = useState<[string, IBook[]][]>()

    useEffect(() => {
        (async () => {
            setSortedBooks(MainSortBooksUtil(props,sortSelect))
        })()
    }, [props,sortSelect])

    return (
        <>
            {sortedBooks &&
                <>
                    <BookListSelect selectCallback={(value) => setSortSelect(value as "years" | "authors")} />
                    <BookList props={sortedBooks} />
                </>
            }
        </>
    )
}

export default BookListWrapper