import { IBook } from "@/types"
import BookWrapper from "../../book-wrapper/BookWrapper"

const BookList = ({ props }: { props: [string, IBook[]][]}) => {


    return (
        <div className='flex flex-col justify-start'>
            {
                props?.map(([key, value]) => {
                    return (
                        <div key={key} id='category' className='flex flex-col space-y-[30px] mt-[30px]'>
                            <h2>{Number(key) ? `${key} год` : key}</h2>
                            <div className='flex flex-row items-center justify-start flex-wrap'>
                                {value.map((book) => {
                                    return (
                                        <div key={book.id} className='m-[5px]'>
                                            <BookWrapper props={book} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BookList