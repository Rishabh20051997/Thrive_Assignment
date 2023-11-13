import {combineReducers} from '@reduxjs/toolkit';
import newsListEntity from './splices/news-list-entity';
import { SLICE_NAME } from './constant';

/**
 * Combine all reducers and return a ReducersMapObject
 * @return { ReducersMapObject }
 */
export default combineReducers({
  [SLICE_NAME.NEWS_LIST]: newsListEntity
});