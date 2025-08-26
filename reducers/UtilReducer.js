import { SIGNED_OUT, LOADING_START, LOADING_STOP } from "../actions/index";

const initialState = {
  loading: false,
};

export default function util(state = initialState, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_STOP:
      return {
        ...state,
        loading: false,
      };
    case SIGNED_OUT:
      return { ...initialState };
    default:
      return state;
  }
}
