import {
    GET_ITEMS,
    GET_ITEMS_FAILURE,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_BY_ID,
    GET_ITEMS_BY_ID_SUCCESS,
    GET_ITEMS_BY_ID_FAILURE,
    SAVE_ITEM,
    SAVE_ITEM_SUCCESS,
    SAVE_ITEM_FAILURE,
    REMOVE_ITEM_BY_ID,
    REMOVE_ITEM_BY_ID_SUCCESS,
    REMOVE_ITEM_BY_ID_FAILURE,
    UPDATE_ITEM,
    UPDATE_ITEM_SUCCESS
} from "../constans/actionConstan";
import {takeLatest, put} from 'redux-saga/effects';
import axios from '../configs/api'
import pagination from "./pagination";

function* getAllItems(action) {
    let parameter = pagination(action)
    let result = yield axios.get(`/items?${parameter}`)
        .then(data => {
            return {
                type: GET_ITEMS_SUCCESS,
                data: data.list,
                pagination: {
                    size: data.size,
                    total: data.total,
                    page: data.page
                },
            };
        })
        .catch((err) => {
            console.log("Error: " + err)
            return {
                type: GET_ITEMS_FAILURE,
                error: err
            };
        });
    yield put(result)
}

function* getItemById(action) {
    console.log("getItem Sagas")
    let result = yield axios.get(`/items/${action.id}`)
        .then(data => {
            return ({
                type: GET_ITEMS_BY_ID_SUCCESS,
                data: data
            })
        })
        .catch(err => {
            console.log("Error find item sagas: " + err)
            return ({
                type: GET_ITEMS_BY_ID_FAILURE,
                error: err
            })
        })
    yield put(result)
}
function* removeItemById(action) {
    let result = yield axios.delete(`/items/${action.id}`)
        .then(data => {
            return ({
                type: REMOVE_ITEM_BY_ID_SUCCESS,
                data: data
            })
        })
        .catch(err=> {
            console.log("Error Remove sagas: " + err)
            return ({
                type: REMOVE_ITEM_BY_ID_FAILURE,
                error: err
            })
        })
    yield put(result)
}

function* updateItem(action) {
    let result = false

    yield put({
        type: UPDATE_ITEM_SUCCESS,
        data: result
    })
}

function* saveItem(action) {
    let model = action.model;
    let method = 'POST', url = '/items';
    if (model.id) {
        method= "PUT";
        url += `/${model.id}`
    }
    let result = yield axios ({
        url: url,
        method: method,
        data: model
    })
        .then(data=> {
            return {
                type: SAVE_ITEM_SUCCESS,
                data: data
            };
        })
        .catch(err => {
            console.log("Error save sagas: " + err)
            return{
                type: SAVE_ITEM_FAILURE,
                error: err
            };
        })
    yield put(result)
}

export function* watchGetAllItem() {
    yield takeLatest(GET_ITEMS, getAllItems);
}
export function* watchGetItemById() {
    yield takeLatest(GET_ITEMS_BY_ID,getItemById);
}
export function* watchRemoveItemById() {
    yield takeLatest(REMOVE_ITEM_BY_ID,removeItemById);
}
export function* watchUpdateItem() {
    yield takeLatest(UPDATE_ITEM,updateItem);
}
export function* watchSaveItem() {
    yield takeLatest(SAVE_ITEM,saveItem);
}