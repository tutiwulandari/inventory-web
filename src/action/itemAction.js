import {
    GET_ITEMS,
    GET_ITEMS_BY_ID,
    REMOVE_ITEM_BY_ID,
    SAVE_ITEM,
    UPDATE_ITEM
} from "../constans/actionConstan";

export function getAll(pagination) {
    return {
        type: GET_ITEMS,
        pagination: {
            page: pagination.page,
            size: pagination.size,
        }
    }
}
export function save(model) {
    console.log("save action item")
    return {
        type: SAVE_ITEM,
        model
    }
}

export function getItemById(id) {
    return {
        type: GET_ITEMS_BY_ID,
        id
    }
}


export function removeById(id) {
    return {
        type: REMOVE_ITEM_BY_ID,
        id
    }
}

export function update(payload) {
    console.log("save update action")
    return {
        type: UPDATE_ITEM,
        payload
    }
}