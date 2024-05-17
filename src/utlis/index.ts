import { IBook } from "@/types";




export const CheckIsBookRecommended = (book: IBook, books: Array<IBook>) => {
    const stages = [false, false, false]

}

export const GetRecomendedBookUtil = (book: Array<IBook>) => {



    return book
        .filter((book) => Number(book.publishedYear) + 3 <= new Date().getFullYear())
        .sort((a, b) => Number(b.rating) - Number(a.rating))[0]
}
export const SortTitleUtil = (book: Array<IBook>) => {
    return book.sort((a, b) => a.title.localeCompare(b.title))
}

export const MainSortBooksUtil = (books: Array<IBook>, method?: 'authors' | 'years') => {
    const sortedBooks = method === 'years' || !method ? SortBooksPublishedUtil([...books]) : SortBooksAuthorsUtil([...books])
    const output: Array<[string, IBook[]]> = []


    Object.entries(sortedBooks).forEach(([key, value]) => {
        if (key === 'Нет информации') output.unshift([key, SortTitleUtil(value)])
        else { output.push([key, SortTitleUtil(value)]) }
    });

    const recommendedBook = GetRecomendedBookUtil(books)

    if (recommendedBook) {
        output.push(['Рекомендованная книга', [recommendedBook]])
    }
    return output.reverse()

}
export const SortBooksPublishedUtil = (books: Array<IBook>) => {
    const uniqueYears: { [value: string]: Array<IBook> } = {}
    // const sortedBooks: [[string, Array<IBook>]] = [['propertyName', []]]

    books.forEach((book) => {
        if (book.publishedYear) {
            uniqueYears.hasOwnProperty(book.publishedYear)
                ?
                uniqueYears[book.publishedYear].push(book)
                :
                uniqueYears[book.publishedYear] = [{ ...book }]
        } else {
            uniqueYears.hasOwnProperty('Нет информации')
                ?
                uniqueYears['Нет информации'].push(book)
                :
                uniqueYears['Нет информации'] = [{ ...book }]
        }
    })

    return uniqueYears
}

export const SortBooksAuthorsUtil = (books: Array<IBook>) => {
    const uniqueAuthors: { [value: string]: Array<IBook> } = {}

    books.forEach((book) => {
        book.authors.forEach((author) => {
            if (uniqueAuthors.hasOwnProperty(author.name)) {
                uniqueAuthors[author.name].push(book)
            } else {
                uniqueAuthors[author.name] = [{ ...book }]
            }
        })
    })

    return uniqueAuthors
}

export const ISBNCheckUtil = (ISBN: string) => {
    let subject = ISBN;
    var regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
    if (regex.test(subject)) {
        var chars = subject.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
        var last = chars.pop();
        var sum = 0;
        var check, i;

        if (chars.length == 9) {
            chars.reverse();
            for (i = 0; i < chars.length; i++) {
                sum += (i + 2) * parseInt(chars[i], 10);
            }
            check = 11 - (sum % 11);
            if (check == 10) {
                check = "X";
            } else if (check == 11) {
                check = "0";
            }
        } else {
            for (i = 0; i < chars.length; i++) {
                sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
            }
            check = 10 - (sum % 10);
            if (check == 10) {
                check = "0";
            }
        }
        if (check == last) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}