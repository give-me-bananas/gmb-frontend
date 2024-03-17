export type GlobalState = {
  isAuth: boolean;
};

export type AppAction = { type: "setAuth" } | { type: "setUnauth" };

export const GlobalReducer = (state: GlobalState, action: AppAction) => {
  const { type } = action;
  switch (type) {
    case "setAuth":
      return {
        ...state,
        isAuth: true,
      };
    case "setUnauth":
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};
