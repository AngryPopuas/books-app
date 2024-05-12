import { useState } from "react"
import BookItem from "../book-item/BookItem"
import { IBook } from "../../../../types"
import EditBookForm from "../../forms/edit-book-form/EditBookForm"


const BookWrapper = ({ props }: { props: IBook }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)

    return (
        <>
            {isEditing
                ?
                <EditBookForm props={props} callback={() => { setIsEditing(!isEditing) }} />
                :
                <BookItem props={props} callback={() => { setIsEditing(!isEditing) }} />
            }
        </>
    )
}

export default BookWrapper