import {
    FIND_ALL_UNIT,
    FIND_UNIT_BY_ID,
    REMOVE_UNIT_BY_ID,
    SAVE_UNIT,
    UPDATE_UNIT

} from "../constans/actionConstan"

export function save(model) {
    console.log("save action unit")
    return {
        type: SAVE_UNIT,
        model
    }
}

export function findById(id) {
    return {
        type: FIND_UNIT_BY_ID,
        id
    }
}

export function findAll(pagination) {
    return {
        type: FIND_ALL_UNIT,
        pagination: {
            page: pagination.page,
            size: pagination.size,
        }
    }
}

export function removeById(id) {
    return {
        type: REMOVE_UNIT_BY_ID,
        id
    }
}

export function update(payload) {
    console.log("save update action")
    return {
        type: UPDATE_UNIT,
        payload
    }
}
