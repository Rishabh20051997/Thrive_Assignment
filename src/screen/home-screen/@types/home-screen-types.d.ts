interface IHomeScreenData {
    dripTimer: number
    list: INewsItem[]
    isLoading: boolean
    fetchMoreData: () => void
    onPinNewsItem: (item: INewsItem) => void
    onDelete: (item: INewsItem) => void
    updateDripTimer: (value: number) => void
    fetchMoreRandomData: () => void
}