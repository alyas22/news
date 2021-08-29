import { newsService } from '../APIs/news';

export const alertConstants = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR',
};
export const newsConstants = {
  SAVE_REQUEST: ' NEWS_SAVE_REQUEST',
  SAVE_SUCCESS: ' NEWS_SAVE_SUCCESS',
  SAVE_FAILURE: ' NEWS_SAVE_FAILURE',

  GETALL_REQUEST: 'NEWS_GETALL_REQUEST',
  GETALL_SUCCESS: 'NEWS_GETALL_SUCCESS',
  GETALL_FAILURE: 'NEWS_GETALL_FAILURE',

  DELETE_REQUEST: 'NEWS_DELETE_REQUEST',
  DELETE_SUCCESS: 'NEWS_DELETE_SUCCESS',
  DELETE_FAILURE: 'NEWS_DELETE_FAILURE',
};

export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}

export const newsActions = {
  save,
  getMyNews,
  delete: _delete,
};

function save(news) {
  return dispatch => {
    dispatch(request(news));
    newsService.saveNews(news).then(
      news1 => {
        dispatch(success(news1));
        alert('Added Successfuly!');
      },
      error => {
        dispatch(failure(error));
        alert(error);
      }
    );
  };

  function request(news) {
    return { type: newsConstants.SAVE_REQUEST, news };
  }
  function success(news) {
    return { type: newsConstants.SAVE_SUCCESS, news };
  }
  function failure(error) {
    return { type: newsConstants.SAVE_FAILURE, error };
  }
}

function getMyNews() {
  return dispatch => {
    dispatch(request());

    newsService.getMyNews().then(
      news => dispatch(success(news)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: newsConstants.GETALL_REQUEST };
  }
  function success(news) {
    return { type: newsConstants.GETALL_SUCCESS, news };
  }
  function failure(error) {
    return { type: newsConstants.GETALL_FAILURE, error };
  }
}

function _delete(news) {
  return dispatch => {
    dispatch(request(news));

    newsService.deleteNews(news).then(
      news1 => {
        dispatch(success(news1));
        alert('Deleted Successfuly!');
        location.reload(true);
      },
      error => {
        dispatch(failure(error));
        alert(error);
      }
    );
  };

  function request(news) {
    return { type: newsConstants.DELETE_REQUEST, news };
  }
  function success(news) {
    return { type: newsConstants.DELETE_SUCCESS, news };
  }
  function failure(error) {
    return { type: newsConstants.DELETE_FAILURE, error };
  }
}
