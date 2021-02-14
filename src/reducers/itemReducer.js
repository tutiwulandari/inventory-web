import {
    GET_ITEMS,
    GET_ITEMS_FAILURE,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_BY_ID,
    GET_ITEMS_BY_ID_SUCCESS,
    GET_ITEMS_BY_ID_FAILURE,
    REMOVE_ITEM_BY_ID,
    REMOVE_ITEM_BY_ID_SUCCESS,
    REMOVE_ITEM_BY_ID_FAILURE,
    UPDATE_ITEM,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    SAVE_ITEM,
    SAVE_ITEM_SUCCESS,
    SAVE_ITEM_FAILURE
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

export const getItems = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                pagination: {
                    size: null,
                    total: null,
                    page: null
                },
                isLoading: true,
            };

        case GET_ITEMS_SUCCESS:
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
        case GET_ITEMS_FAILURE:
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

export const removeItemById = (state = {...initialState, data: false}, action) => {
    switch (action.type) {
        case REMOVE_ITEM_BY_ID:
            return {
                ...state,
                data: false,
                isLoading: true
            }
        case REMOVE_ITEM_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: true,
                error: null
            };
        case REMOVE_ITEM_BY_ID_FAILURE:
            return {
                data: false,
                isLoading: false,
                error: action.error
            };
        default:
            return false;
    }
}
export const getItemById = (state = { ...initialState, data: false }, action) => {
    switch (action.type) {
        case GET_ITEMS_BY_ID:
            return {
                ...state,
                isLoading: true
            };
        case GET_ITEMS_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_ITEMS_BY_ID_FAILURE:
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

export const updateItem = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_ITEM:
            console.log("updateing item in reducres")
            return true
        case UPDATE_ITEM_SUCCESS:
            console.log("updateing success item in reducres")
            return true
        default:
            return false;
    }
}
export const saveItem = (state = {...initialState}, action) => {
    console.log("saveitem reducer")
    switch (action.type) {
        case SAVE_ITEM:
            console.log("save item reducer")
            console.log(action.data)
            return {
                ...state,
                data: null,
                isLoading: true
            };
        case SAVE_ITEM_SUCCESS:
            console.log("save item reducer success")
            console.log(action.data)
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case SAVE_ITEM_FAILURE:
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
