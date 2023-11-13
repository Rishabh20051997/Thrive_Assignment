interface Entities {
    auth: LooseObject;
  }
  
  interface StateInstance {
    entities: Entities;
  }
  
  type getState = () => StateInstance;