import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllNewsList, getAllPinListNewsList, getNewsFetchedPageCount, getNewsLoadingListStatus, onDeleteNewsCard, onPinListNewsAddedCard } from "../../store/splices/news-list-entity"
import { useNavigation } from "@react-navigation/native"

const usePinListScreenController = (): IPinListScreenData => {
    const list = useSelector(getAllPinListNewsList())
    const isLoading = useSelector(getNewsLoadingListStatus())
    const dispatch = useDispatch<AppDispatch>()

    const navigation = useNavigation()

    const onPinNewsItem = (item: INewsItem) => {
        dispatch(onPinListNewsAddedCard(item))
    }

    const onDelete = (item: INewsItem) => {
        dispatch(onDeleteNewsCard(item))
    }

    return {
        list,
        isLoading,
        onPinNewsItem,
onDelete
    }
}

export default usePinListScreenController