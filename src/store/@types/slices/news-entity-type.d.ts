interface INewsItem {
    _id: string
    title: string
    description: string
    content: string
    author: string
    sourceName: string
    isPinList: boolean

}
interface INewsListState {
    isLoading: boolean,
    list: INewsItem[]
    pinList: INewsItem[]
    hasApiError: boolean
    pageCount: number
}