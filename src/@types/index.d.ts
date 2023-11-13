interface LooseObject {
    [key: string]: any;
  }
  
  interface LooseStringObject {
    [key: string]: string;
  }
  
  interface IDispatchType {
    url: string;
    method: HttpMethod;
    data?: LooseObject;
    requestParam?: LooseObject
    onStart: string;
    onSuccess: string;
    onError: string;
  }