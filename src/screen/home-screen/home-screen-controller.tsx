import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    getAllNewsList, getNewsFetchedPageCount, getNewsLoadingListStatus,
    loadNewsHeadline, loadRefreshNewsHeadline, onDeleteNewsCard, onPinListNewsAddedCard,
    updateNewsListData, updatePinNewsListData
} from "../../store/splices/news-list-entity"
import { Pressable, Text, ToastAndroid } from "react-native"
import { useNavigation } from "@react-navigation/native"
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import asyncStorage from "../../services/async-storage-services"
import { log } from "../../services/reactotron/reactotron-log"

const useHomeScreenController = (): IHomeScreenData => {
    const list = useSelector(getAllNewsList())
    const loadingStatus = useSelector(getNewsLoadingListStatus())
    const pageCount = useSelector(getNewsFetchedPageCount())
    const isLoading = loadingStatus && !list?.length
    const dispatch = useDispatch<AppDispatch>()
    const [dripTimer, updateDripTimer] = useState(10000)

    const randomApiPageCount = useRef(1)
    const randomApiSearchText = useRef(65)

    const navigation = useNavigation()
    const { type, isConnected } = useNetInfo();


    const fetchData = async (pageCount = 1) => {
        log('fetchData isConnected', isConnected)
        if (isConnected) {
            dispatch(loadNewsHeadline(pageCount))
        } else if(isConnected !== null) {
            asyncStorage.getData('@newsList').then((data) => {
                log('fetchData data', data)
                dispatch(updateNewsListData(data))
            })
            asyncStorage.getData('@pinList').then((data) => {
                dispatch(updatePinNewsListData(data))
            })
        }
    }

    useEffect(() => {
        const timerSubs = setInterval(() => {
            fetchMoreRandomData()
            // console.log('hey called')
        }, dripTimer)

        return () => {
            clearInterval(timerSubs)
        }
    }, [dripTimer])

    useEffect(() => {
        fetchData()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Pressable
                style={{ marginRight: 10 }} onPress={() => {
                    if (isConnected) {
                        fetchMoreRandomData()
                    } else if(!isConnected) {
                        ToastAndroid.show('Please connect to Internet', ToastAndroid.SHORT)
                    }
                }}>
                <Text>Fetch More</Text>
            </Pressable>
        })
    }, [isConnected])

    const fetchMoreData = () => {
        fetchData(pageCount)
    }

    const fetchMoreRandomData = () => {
        if (isConnected) {

                dispatch(loadRefreshNewsHeadline(randomApiPageCount.current,    String.fromCharCode(randomApiSearchText.current) ))

                // means greater than 95 element
                if(randomApiPageCount.current > 19) {
                    randomApiSearchText.current +=  1
                    randomApiPageCount.current = 1
                } else {
                    randomApiPageCount.current += 5
                }
        }
    }

    const onPinNewsItem = (item: INewsItem) => {
        console.log('onPinNewsItem called', item)
        dispatch(onPinListNewsAddedCard(item))
    }

    const onDelete = (item: INewsItem) => {
        dispatch(onDeleteNewsCard(item))
    }

    return {
        dripTimer,
        list,
        fetchMoreData,
        isLoading,
        onPinNewsItem,
        onDelete,
        updateDripTimer,
        fetchMoreRandomData
    }
}

export default useHomeScreenController