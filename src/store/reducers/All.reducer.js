import axios from "axios";

const GET_API = "GET_API";
const API_LOADING = "API_LOADING";
const GET_FILTER = "GET_FILTER";
const GET_FAVS = "GET_FAVS";
export const UPDATE_HITS = "UPDATE_HITS";

const initialState = {
  api: [],
  filter: [],
  favs: [],
  loading: false,
};

//this function calls the react, angular and vue api
export const getAllApi = (number) => {
  return async function (dispatch) {
    try {
      dispatch({ type: API_LOADING, payload: true });

      const targetsID =
        localStorage.getItem("targetsMarked") !== null &&
        localStorage
          .getItem("targetsMarked")
          .split(",")
          .filter((item) => item !== "");

      const react = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=${number}`
      );
      const angular = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=angular&page=${number}`
      );
      const vue = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=${number}`
      );

      // all the api is stored here
      const allApi = [
        ...react.data.hits,
        ...angular.data.hits,
        ...vue.data.hits,
      ]
        .filter(({ story_url, story_title }) => story_title && story_url)
        .map(
          ({
            created_at,
            author,
            story_id,
            story_title,
            story_url,
            objectID,
          }) => ({
            created_at: created_at,
            id: objectID,
            author: author,
            story_id: story_id,
            story_title: story_title,
            story_url: story_url,
            marked: false,
          })
        );
      //Here create a array with react,angular and vue hits and filter the items that have story_url and story_title
      dispatch({
        type: GET_API,
        payload: allApi,
      });
      //using the javascript methods it is possible to filter the favorite cards that are in the localStorage
      const arrayTargets =
        targetsID !== false &&
        targetsID.map((item) => {
          const [filterTarget] = allApi.filter(({ id }) => id === item);
          return filterTarget;
        });

      dispatch({ type: GET_FAVS, payload: arrayTargets });
      dispatch({ type: API_LOADING, payload: false });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getApiReact = (number) => {
  return async function (dispatch) {
    try {
      dispatch({ type: API_LOADING, payload: true });
      const react = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=${number}`
      );

      const reactjs = react.data.hits
        .filter(({ story_url, story_title }) => story_title && story_url)
        .map(
          ({
            created_at,
            author,
            story_id,
            story_title,
            story_url,
            objectID,
          }) => ({
            created_at: created_at,
            author: author,
            id: objectID,
            story_id: story_id,
            story_title: story_title,
            story_url: story_url,
            marked: false,
          })
        );

      dispatch({
        type: GET_FILTER,
        payload: reactjs,
      });

      dispatch({ type: API_LOADING, payload: false });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getApiAngular = (number) => {
  return async function (dispatch) {
    try {
      dispatch({ type: API_LOADING, payload: true });
      const react = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=angular&page=${number}`
      );
      dispatch({
        type: GET_FILTER,
        payload: react.data.hits
          .filter(({ story_url, story_title }) => story_title && story_url)
          .map(
            ({
              created_at,
              author,
              story_id,
              story_title,
              story_url,
              objectID,
            }) => ({
              created_at: created_at,
              id: objectID,
              author: author,
              story_id: story_id,
              story_title: story_title,
              story_url: story_url,
              marked: false,
            })
          ),
      });
      dispatch({ type: API_LOADING, payload: false });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getApiVue = (number) => {
  return async function (dispatch) {
    try {
      dispatch({ type: API_LOADING, payload: true });
      const react = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=${number}`
      );
      dispatch({
        type: GET_FILTER,
        payload: react.data.hits
          .filter(({ story_url, story_title }) => story_title && story_url)
          .map(
            ({
              created_at,
              author,
              story_id,
              story_title,
              story_url,
              objectID,
            }) => ({
              created_at: created_at,
              id: objectID,
              author: author,
              story_id: story_id,
              story_title: story_title,
              story_url: story_url,
              marked: false,
            })
          ),
      });
      dispatch({ type: API_LOADING, payload: false });
    } catch (err) {
      console.log(err);
    }
  };
};

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API:
      return {
        ...state,
        api: action.payload,
      };
    case API_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case UPDATE_HITS: {
      return {
        ...state,
        favs: [
          action.payload,
          ...state.favs.filter(({ id }) => id !== action.payload.id),
        ],
      };
    }
    case GET_FAVS: {
      return {
        ...state,
        favs:
          action.payload === false
            ? []
            : action.payload
                .filter((item) => item !== undefined)
                .map((item) => ({ ...item, marked: true })),
      };
    }

    default:
      return state;
  }
};
