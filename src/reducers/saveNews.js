export const newsConstants = {
  SAVE_REQUEST: ' NEWS_SAVE_REQUEST',
  SAVE_SUCCESS: ' NEWS_SAVE_SUCCESS',
  SAVE_FAILURE: ' NEWS_SAVE_FAILURE',
};
const news = JSON.parse(localStorage.getItem('news'));
const initialState = news ? { saving: true, news } : {};

export function saveNews(state = initialState, action) {
  switch (action.type) {
    case newsConstants.SAVE_REQUEST:
      return { saving: true };
    case newsConstants.SAVE_SUCCESS:
      return {};
    case newsConstants.SAVE_FAILURE:
      return {};
    default:
      return state;
  }
}
