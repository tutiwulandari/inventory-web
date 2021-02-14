import {
    GET_STOCKS,
    GET_STOCKS_FAILURE,
    GET_STOCKS_SUCCESS,
    GET_STOCKS_BY_ID,
    GET_STOCKS_BY_ID_SUCCESS,
    GET_STOCKS_BY_ID_FAILURE,
    SAVE_STOCK,
    SAVE_STOCK_SUCCESS,
    SAVE_STOCK_FAILURE,
    UPDATE_STOCK,
    UPDATE_STOCK_SUCCESS,
    UPDATE_STOCK_FAILURE,
    REMOVE_STOCK_BY_ID,
    REMOVE_STOCK_BY_ID_SUCCESS,
    REMOVE_STOCK_BY_ID_FAILURE,
} from "../constans/actionConstan";

const initialState = {
    data: null,
    isLoading: false,
    error: null,
    pagination: {
        size: null,
        total: null,
        page: null
    }
}

export const getStocks = (state = initialState, action) => {
    switch (action.type) {
        case GET_STOCKS:
            return {
                ...state,
                pagination: {
                    size: null,
                    total: null,
                    page: null
                },
                isLoading: true,
            };

        case GET_STOCKS_SUCCESS:
            return {
                data: action.data,
                pagination: {
                    size: action.pagination.size,
                    total: action.pagination.total,
                    page: action.pagination.page
                },
                isLoading: false,
                error: null
            };
        case GET_STOCKS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return {
                ...state,
                isLoading: false,
                error: null
            }
    }
}
export const removeStockById = (state = {...initialState, data: false}, action) => {
    switch (action.type) {
        case REMOVE_STOCK_BY_ID:
            return {
                ...state,
                data: false,
                isLoading: true
            }
        case REMOVE_STOCK_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: true,
                error: null
            };
        case REMOVE_STOCK_BY_ID_FAILURE:
            return {
                data: false,
                isLoading: false,
                error: action.error
            };
        default:
            return false;
    }
}
export const getStockById = (state = { ...initialState, data: false }, action) => {
    switch (action.type) {
        case GET_STOCKS_BY_ID:
            return {
                ...state,
                isLoading: true
            };
        case GET_STOCKS_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_STOCKS_BY_ID_FAILURE:
            return {
                data: false,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                isLoading: false,
                error: null
            }
    }
}


export const updateStock = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_STOCK:
            console.log("updateing stock in reducres")
            return true
        case UPDATE_STOCK_SUCCESS:
            console.log("updateing success stock in reducres")
            return true
        default:
            return false;
    }
}
export const saveStock = (state = {...initialState}, action) => {
    console.log("save stock reducer")
    switch (action.type) {
        case SAVE_STOCK:
            console.log("save stock reducer")
            console.log(action.data)
            return {
                ...state,
                data: null,
                isLoading: true
            };
        case SAVE_STOCK_SUCCESS:
            console.log("save stock reducer success")
            console.log(action.data)
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case SAVE_STOCK_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.error
            };
        default:
            return {
                ...state,
                data: null,
                isLoading: false,
                error: null
            }
    }
}
