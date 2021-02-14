import {
    FIND_ALL_UNIT, FIND_ALL_UNIT_SUCCESS, FIND_ALL_UNIT_FAILURE,
    FIND_UNIT_BY_ID, FIND_UNIT_BY_ID_SUCCESS, FIND_UNIT_BY_ID_FAILURE,
    REMOVE_UNIT_BY_ID, REMOVE_UNIT_BY_ID_SUCCESS, REMOVE_UNIT_BY_ID_FAILURE,
    SAVE_UNIT, SAVE_UNIT_SUCCESS, SAVE_UNIT_FAILURE,
    UPDATE_UNIT, UPDATE_UNIT_SUCCESS
}
    from "../constans/actionConstan";


const initialState = {
    data: null,
    pagination: {
        size: null,
        total: null,
        page: null
    },
    isLoading: false,
    error: null,
}

export const removeUnitById = (state = {...initialState, data: false}, action) => {
    switch (action.type) {
        case REMOVE_UNIT_BY_ID:
            return {
                ...state,
                data: false,
                isLoading: true
            }
        case REMOVE_UNIT_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: true,
                error: null
            };
        case REMOVE_UNIT_BY_ID_FAILURE:
            return {
                data: false,
                isLoading: false,
                error: action.error
            };
        default:
            return false;
    }
}


export const findUnitById = (state = { ...initialState, data: false }, action) => {
    switch (action.type) {
        case FIND_UNIT_BY_ID:
            return {
                ...state,
                isLoading: true
            };
        case FIND_UNIT_BY_ID_SUCCESS:
            return {
                data: action.data,
               isLoading: false,
                error: null
            }
        case FIND_UNIT_BY_ID_FAILURE:
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


export const findAllUnit = (state = initialState, action) => {
    switch (action.type) {
        case FIND_ALL_UNIT:
            return {
                ...state,
                pagination: {
                    size: null,
                    total: null,
                    page: null
                },
                isLoading: true,
            };

        case FIND_ALL_UNIT_SUCCESS:
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
        case FIND_ALL_UNIT_FAILURE:
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


export const updateUnit = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_UNIT:
            console.log("updateing unit in reducres")
            return true
        case UPDATE_UNIT_SUCCESS:
            console.log("updateing success unit in reducres")
            return true
        default:
            return false;
    }
}
export const saveUnit = (state = {...initialState}, action) => {
    console.log("saveunit reducer")
    switch (action.type) {
        case SAVE_UNIT:
            console.log("save unit reducer")
            console.log(action.data)
            return {
                ...state,
                data: null,
                isLoading: true
            };
        case SAVE_UNIT_SUCCESS:
            console.log("save unit reducer success")
            console.log(action.data)
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case SAVE_UNIT_FAILURE:
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
