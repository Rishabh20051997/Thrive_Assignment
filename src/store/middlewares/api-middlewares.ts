

import axios from 'axios';
import { AnyAction, Middleware } from 'redux';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from './middleware-actions';
import { httpMethods } from '../constant';

/**
 * This will make an api call using axios ,
 *    Before beginning the api call it will dispatch on start action
 *    After a successful api call it will dispatch onSuccess and on error it will dispatch onError action
 */
const makeApiRequest = async (
    dispatch: AppDispatch,
    getState: RootState,
    payload: IDispatchType,
) => {
    const {
        url,
        method,
        data,
        onError,
        onStart,
        onSuccess,
        requestParam,
    } = payload;


    try {
        // called before api call starts
        if (onStart) {
            // if requestParam object passed -> return back in response payload, else return simple data
            dispatch({
                type: onStart,
                payload: { requestParam: requestParam || {} },
            });
        }

        let response = null

        if (method === httpMethods.GET) {
            response = await axios.get(url)
        } else if (method === httpMethods.POST) {
            response = await axios.post(url, data)
        }



        dispatch({ type: apiCallSuccess.type, payload: response?.data });


        // called after api call resolves
        if (onSuccess) {
            // if requestParam object passed -> return back in response payload, else return simple data
            requestParam
                ? dispatch({
                    type: onSuccess,
                    payload: { data: response?.data, requestParam: requestParam },
                })
                : dispatch({ type: onSuccess, payload: response?.data });
        }

        return response;
    } catch (error: any) {
        let response = { data: { message: '', statusCode: 0 } }; // temporary

        if (error?.response?.data) {
            response = error?.response;
        } else {
            if (error?.message) {
                response = { data: { message: error?.message, statusCode: 400 } };
            }
        }

        dispatch({ type: apiCallFailed?.type, payload: response });

        // called after api call rejects or has error
        if (error) {
            // if requestParam object passed -> return back in response payload, else return simple data
            requestParam
                ? dispatch({
                    type: onError,
                    payload: { error: response, requestParam: requestParam },
                })
                : dispatch({ type: onError, payload: response });
        }
        return response;
    }
};

const apiMiddleware: Middleware<
    { dispatch: Dispatch; getState: RootState }, // Most middleware do not modify the dispatch return value
    RootState
> =
    ({ dispatch, getState }: { dispatch: Dispatch; getState: RootState }) =>
        (next: any) =>
            (action: AnyAction) => {
                return action?.type === apiCallBegan.type
                    ? makeApiRequest(dispatch, getState, action?.payload)
                    : next(action);
            };
export default apiMiddleware;
