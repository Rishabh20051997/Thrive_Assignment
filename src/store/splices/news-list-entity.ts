import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { SLICE_NAME, httpMethods } from '../constant';
import apiDispatch from '../utils/dispatch';
import { log } from '../../services/reactotron/reactotron-log';
import asyncStorage from '../../services/async-storage-services';


const NEWS_LIST = SLICE_NAME.NEWS_LIST;

/**
 *
 * @param item news item received from server
 * @returns {INewsItem} data required
 */
const formatNewsDataData = (item: LooseObject) => {
    const { url = '', title = '', description = '', content = '', author = '', source = {}, isPinList = false } = item;

    return {
        _id : url,
        title,
        description,
        content,
        author,
        sourceName : source?.name || '',
        isPinList
    } as INewsItem;
};

// called by apiDispatch to initiate api call
const onApiFetchInitiateReducer = (newsListState: INewsListState) => {
    newsListState.isLoading = true;
    newsListState.hasApiError = false
};

// called by apiDispatch on success of api call with payload
const onSuccessfullyDataFetchedReducer = (
    newsListState: INewsListState,
    { payload }: { payload: LooseObject },
) => {
    log('payload : payload ', payload)
    const { requestParam = {}, data = { }} = payload
    const { articles = [] } = data;
    const { pageCount } = requestParam;
    const formattedData = articles.map(formatNewsDataData);

    newsListState.isLoading = false;
    newsListState.list = formattedData;
    newsListState.hasApiError = false
    newsListState.pageCount = pageCount

    asyncStorage.storeData('@newsList', newsListState.list)
};

// called by apiDispatch on failure of api call with payload
const onDataFetchFailureReducer = (newsListState: INewsListState) => {
    newsListState.isLoading = false;
    newsListState.hasApiError = true
};

// called by apiDispatch on success of api call with payload
const onSuccessfullyRandomNewsDataFetchedReducer = (
    newsListState: INewsListState,
    { payload }: { payload: LooseObject },
) => {

    const { requestParam = {}, data = { }} = payload
    const { articles = [] } = data;
    const formattedData = articles.map(formatNewsDataData);

    newsListState.list = [...formattedData, ...newsListState.list];
    asyncStorage.storeData('@newsList', newsListState.list)
};

const onDeleteNewsCardReducer = (
    newsListState: INewsListState,
    { payload }: { payload: LooseObject },
) => {

    newsListState.list = newsListState.list.filter(item => {
        return item._id !== payload._id
    })

    newsListState.pinList = newsListState.pinList.filter(item => {
        return item._id !== payload._id
    })

    
    ToastAndroid.show('Successfully deleted', ToastAndroid.SHORT)
    asyncStorage.storeData('@pinList', newsListState.pinList)
};

const onPinListNewsAddedCardReducer = (
    newsListState: INewsListState,
    { payload }: { payload: INewsItem },
) => {
    if(payload.isPinList) {
        newsListState.pinList = newsListState.pinList.filter(item => {
            return item._id !== payload._id
        })
        ToastAndroid.show('Removed from PinList', ToastAndroid.SHORT)
    } else {
        newsListState.pinList = [...newsListState.pinList, { ...payload, isPinList: true} ]
        ToastAndroid.show('Added to PinList', ToastAndroid.SHORT)
    }
    
    newsListState.list.forEach(item => {
        if(item._id === payload._id) {
            item.isPinList = !item.isPinList
        }

    }) 

    asyncStorage.storeData('@pinList', newsListState.pinList)
};

const updateNewsListDataReducer = (
    newsListState: INewsListState,
    { payload }: { payload: any[] },
) => {

    newsListState.isLoading = false;
    newsListState.list = payload;
};

const updatePinNewsListDataReducer = (
    newsListState: INewsListState,
    { payload }: { payload: any[] },
) => {

    newsListState.pinList = payload;
};





// slice definition of news list Slice
export const slice = createSlice({
    name: NEWS_LIST,
    initialState: <INewsListState>{
        isLoading: false,
        list: [],
        hasApiError: false,
        pageCount: 1,
        pinList: []
    },
    reducers: {
        onApiFetchInitiate: onApiFetchInitiateReducer,
        onSuccessfullyDataFetched: onSuccessfullyDataFetchedReducer,
        onDataFetchFailure: onDataFetchFailureReducer,
        onSuccessfullyRandomNewsDataFetched: onSuccessfullyRandomNewsDataFetchedReducer,
        onDeleteNewsCard: onDeleteNewsCardReducer,
        onPinListNewsAddedCard: onPinListNewsAddedCardReducer,
        updateNewsListData: updateNewsListDataReducer,
        updatePinNewsListData: updatePinNewsListDataReducer
    },
});

/**** selector  Start *****/

/**
 * returns news list list
 */
const getAllNewsList = () =>
    createSelector(
        (store: RootState) => store[NEWS_LIST],
        (state: INewsListState) => {
            return state?.list || [];
        },
    );

const getNewsLoadingListStatus = () =>
    createSelector(
        (store: RootState) => store[NEWS_LIST],
        (state: INewsListState) => {
            return state?.isLoading || false;
        },
    );

const getNewsFetchedPageCount = () =>
    createSelector(
        (store: RootState) => store[NEWS_LIST],
        (state: INewsListState) => {
            return state?.pageCount || 1;
        },
);

const getAllPinListNewsList = () =>
    createSelector(
        (store: RootState) => store[NEWS_LIST],
        (state: INewsListState) => {
            return state?.pinList || [];
        },
    );


/*** Selector End ****/

const API_KEY=  'e92b6d0a08004c15b529ed2e6bf9eb88'
const PAGE_SIZE = 20
/**
 * api call to load  all news list
 */
export const loadNewsHeadline = (page = 1) => () => {
    return apiDispatch({
        url: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}&page=${page}`,
        onStart: onApiFetchInitiate.type,
        requestParam: { pageCount : 1 },
        onError: onDataFetchFailure.type,
        onSuccess: onSuccessfullyDataFetched.type,
        method: httpMethods.GET,
    });
};

export const loadRefreshNewsHeadline = (page = 1, randomApiSearchText = '') => () => {
    return apiDispatch({
        url: `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&pageSize=5&q=${randomApiSearchText}&page=${page}`,
        onStart: '',
        requestParam: { pageCount : 1 },
        onError: '',
        onSuccess: onSuccessfullyRandomNewsDataFetched.type,
        method: httpMethods.GET,
    });
};


const {
    onApiFetchInitiate,
    onSuccessfullyDataFetched,
    onDataFetchFailure,
    onSuccessfullyRandomNewsDataFetched,
    onDeleteNewsCard,
    onPinListNewsAddedCard,
    updateNewsListData,
updatePinNewsListData
} = slice.actions;

export {
    getAllNewsList,
    getNewsLoadingListStatus,
    getNewsFetchedPageCount,
    getAllPinListNewsList,
    onPinListNewsAddedCard,
    onDeleteNewsCard,
    updateNewsListData,
updatePinNewsListData
};

export default slice.reducer;