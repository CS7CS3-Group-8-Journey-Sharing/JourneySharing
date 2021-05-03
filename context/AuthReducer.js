import * as React from "react";

export default authReducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.userToken,
        user: action.user,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.userToken,
        user: action.user,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        user: null,
        isLoading: false,
        notifications: []
      };
    case "ADD_NOTIFICATIONS":
      return {
        ...prevState,
        notifications: action.notifications
      };
  }
};
