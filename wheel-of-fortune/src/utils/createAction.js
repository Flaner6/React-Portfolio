export const createAction = (actionName) => {
    const action = (payload) => ({
      type: actionName,
      payload
    });
    action.type = actionName;
    return action;
  }
  
  