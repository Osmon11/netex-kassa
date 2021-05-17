const GET_MERCHANTS = 'GET_MERCHANTS'
const GET_MERCHANTS_SUCCESS = 'GET_MERCHANTS_SUCCESS'
const GET_MERCHANTS_LOADING = 'GET_MERCHANTS_LOADING'
const GET_MERCHANTS_FAILED = 'GET_MERCHANTS_FAILED'
const ADD_MERCHANTS_SUCCESS = 'ADD_MERCHANTS_SUCCESS'
const ADD_MERCHANTS_LOADING = 'ADD_MERCHANTS_LOADING'
const ADD_MERCHANTS_FAILED = 'ADD_MERCHANTS_FAILED'

const initialState = {
  merchants: [],
  get: {
    loading: false,
    success: false,
    failed: false,
  },
  add: {
    loading: false,
    success: false,
    failed: false,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MERCHANTS:
      return {
        ...state,
        merchants: action.merchants,
      }
    case GET_MERCHANTS_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
        },
      }
    case GET_MERCHANTS_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
        },
      }
    case GET_MERCHANTS_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
        },
      }
    case ADD_MERCHANTS_LOADING:
      return {
        ...state,
        add: {
          success: false,
          loading: true,
          failed: false,
        },
      }
    case ADD_MERCHANTS_SUCCESS:
      return {
        ...state,
        add: {
          success: true,
          loading: false,
          failed: false,
        },
      }
    case ADD_MERCHANTS_FAILED:
      return {
        ...state,
        add: {
          success: false,
          loading: false,
          failed: true,
        },
      }
    default:
      return state
  }
}

export default reducer
