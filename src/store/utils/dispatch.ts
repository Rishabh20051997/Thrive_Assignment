import { store } from "../configure-store";
import { apiCallBegan } from "../middlewares/middleware-actions";

const apiDispatch = (payload: IDispatchType) => {
  return store.dispatch({type: apiCallBegan.type, payload: payload});
};
export default apiDispatch;