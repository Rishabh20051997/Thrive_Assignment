interface IPinListScreenData {
    list: INewsItem[]
    isLoading: boolean
    onPinNewsItem: (item: INewsItem) => void
    onDelete: (item: INewsItem) => void
}