import { GetAuthorsAction } from '@/actions'
import { Input } from '@/components/ui/input'
import { IAuthor } from '@/types'
import { useEffect, useRef, useState } from 'react'

const MultiSelectAuthors = ({ defaultValue, stateCallback }: { defaultValue?: Array<IAuthor>, stateCallback: (selected: Array<IAuthor>) => void }) => {
    const inputRef = useRef(null)
    const [inputQuery, setInputQuery] = useState<string>('')
    const [optionsQuery, setOptionsQuery] = useState<Array<IAuthor>>([])
    const [selectedAuthors, setSelectedAuthors] = useState<Array<IAuthor>>(defaultValue ? defaultValue : [])
    useEffect(() => {
        (async () => {
            if (!(inputQuery.trim())) {
                setOptionsQuery([])
                return;
            }
            const request = await GetAuthorsAction(inputQuery)
            const filteredRequest = request.filter(item => !selectedAuthors.find(book => book.id === item.id))
            console.log(filteredRequest, request, selectedAuthors, optionsQuery)
            setOptionsQuery([...filteredRequest])
        })();
    }, [inputQuery])

    const handleSelectAuthor = (author: IAuthor) => {
        setInputQuery('')
        setSelectedAuthors((authors) => [...authors, author])
        stateCallback([...selectedAuthors, author])
        setOptionsQuery([])
        // @ts-ignore
        inputRef.current?.focus()
    }
    const handleDeleteSelect = (id: string) => {
        console.log(id, selectedAuthors)
        stateCallback(selectedAuthors.filter(item => item.id !== id))
        setSelectedAuthors((authors) => authors.filter(item => item.id !== id))
    }

    return (
        <div className='flex flex-col relative w-full'>
            <div className='w-full flex items-center justify-start flex-wrap border border-input rounded-md bg-background'>
                {selectedAuthors.map((author) => {
                    return (
                        <span
                            key={author.id}
                            onClick={() => { handleDeleteSelect(author.id) }}
                            className='h-[30px] flex items-center m-[5px] p-[10px] rounded-md cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90'>
                            {author.name}
                        </span>
                    )
                })}
                <Input
                    ref={inputRef}
                    className='w-1/2 border-transparent focus:border-transparent focus:ring-0'
                    placeholder='Авторы'
                    value={inputQuery}
                    onChange={(e) => { setInputQuery(e.target.value) }}
                />
            </div>
            {optionsQuery.length
                ?
                <ul className='max-h-[100px] overflow-y-scroll scrollbar border-b border-l border-r border-input list-none m-0'>
                    {optionsQuery.map((option) => {
                        return (
                            <li
                                key={option.id}
                                className='flex items-center gap-[10px] p-5 cursor-pointer' onClick={() => { handleSelectAuthor(option) }}>
                                <span>{option.name}</span>
                            </li>
                        )
                    })}
                </ul>
                :
                <></>
            }
        </div>
    )
}




export default MultiSelectAuthors