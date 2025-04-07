export interface PaginationFilter{
    _page: number;
    _per_page: number;

    first: number,
    items: number,
    last: number,
    next: number | null,
    pages: number,
    prev: number | null
}