export interface ResponsePagination {
    total: number,
    lastPage: number,
    currentPage: number,
    perPage: number,
    prev: number | null,
    next: number | null,
}

interface RequestPagination {
    page: number
    perPage: number
    totalResults: number
}

export function paginate({ page, perPage, totalResults }: RequestPagination): ResponsePagination {

    const lastPage = Math.ceil(totalResults / perPage)
    const next = page < lastPage ? page + 1 : null

    return {
        total: totalResults,
        lastPage: lastPage,
        currentPage: page ? page : 1,
        perPage: perPage,
        prev: page - 1 ? page -1 : null,
        next: next
    }
}