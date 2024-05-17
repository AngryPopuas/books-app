import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBook, IBookStore, ICreateBookForm } from '../../types'
import { DeleteBookAction, GetBooksActions, SaveBookAction, UpdateBookAction } from '../../actions'


export const GetBooksThunk = createAsyncThunk(
    'books/get',
    async (_filters: string, thunkAPI) => {
        try {
            const request = await GetBooksActions()
            return request
        } catch (err) {
            return thunkAPI.rejectWithValue('There was a problem with your request')
        }
    },
)
export const EditBookThunk = createAsyncThunk(
    'books/edit',
    async ({ book, id }: { book: IBook, id: string }, thunkAPI) => {
        try {
            const request = await UpdateBookAction(book, id)
            return request
        } catch (err) {
            return thunkAPI.rejectWithValue('There was a problem with your request')
        }
    },
)
export const DeleteBookThunk = createAsyncThunk(
    'books/delete',
    async (id: string, thunkAPI) => {
        try {
            const request = await DeleteBookAction(id)
            return request
        } catch (err) {
            return thunkAPI.rejectWithValue('There was a problem with your request')
        }
    },
)
export const CreateBookThunk = createAsyncThunk(
    'books/create',
    async (book: ICreateBookForm, thunkAPI) => {
        try {
            const request = await SaveBookAction(book)
            return request
        } catch (err) {
            return thunkAPI.rejectWithValue('There was a problem with your request')
        }
    },
)


const initialState: IBookStore = {
    books: [],
}

export const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(CreateBookThunk.fulfilled, (state, action: PayloadAction<IBook>) => {
            console.log(action.payload)
            state.books.push(action.payload)
        })
        builder.addCase(GetBooksThunk.fulfilled, (state, action: PayloadAction<Array<IBook>>) => {
            state.books = action.payload
        })
        builder.addCase(DeleteBookThunk.fulfilled, (state, action: PayloadAction<string>) => {
            state.books.splice(state.books.findIndex(book => book.id === action.payload), 1)
        })
        builder.addCase(EditBookThunk.fulfilled, (state, action: PayloadAction<{ book: IBook, id: string }>) => {
            state.books.splice(state.books.findIndex(book => book.id === action.payload.id), 1, action.payload.book)
        })
    }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default bookSlice.reducer