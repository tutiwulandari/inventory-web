import axios from "../configs/api";
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
import {put, takeLatest} from "redux-saga/effects";
import pagination from "./pagination";

function* getAllStocks(action) {
    let parameter = pagination(action)
    let result = yield axios.get(`/stocks?${parameter}`)
        .then(data => {
            console.log("DATA + " + data.list);
            return {
                type: GET_STOCKS_SUCCESS,
                pagination: {
                    size: data.size,
                    total: data.total,
                    page: data.page
                },
                data: data.list
            };
        })
        .catch((err) => {
            console.log("Error: " + err)
            return {
                type: GET_STOCKS_FAILURE,
                error: err
            };
        });
    yield put(result)
}

function* getStockById(action) {
    console.log("getStock Sagas")
    let result = yield axios.get(`/stocks/${action.id}`)
        .then(data => {
            return ({
                type: GET_STOCKS_BY_ID_SUCCESS,
                data: data
            })
        })
        .catch(err => {
            console.log("Error find stock sagas: " + err)
            return ({
                type: GET_STOCKS_BY_ID_FAILURE,
                error: err
            })
        })
    yield put(result)
}
function* removeStockById(action) {
    let result = yield axios.delete(`/stocks/${action.id}`)
        .then(data => {
            return ({
                type: REMOVE_STOCK_BY_ID_SUCCESS,
                data: data
            })
        })
        .catch(err=> {
            console.log("Error Remove sagas: " + err)
            return ({
                type: REMOVE_STOCK_BY_ID_FAILURE,
                error: err
            })
        })
    yield put(result)
}

function* updateStock(action) {
    let result = false

    yield put({
        type: UPDATE_STOCK_SUCCESS,
        data: result
    })
}

function* saveStock(action) {
    let model = action.model;
    let method = 'POST', url = '/stocks';
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
                type: SAVE_STOCK_SUCCESS,
                data: data
            };
        })
        .catch(err => {
            console.log("Error save sagas: " + err)
            return{
                type: SAVE_STOCK_FAILURE,
                error: err
            };
        })
    yield put(result)
}

export function* watchGetAllStocks() {
    yield takeLatest(GET_STOCKS, getAllStocks);
}
export function* watchGetStockById() {
    yield takeLatest(GET_STOCKS_BY_ID,getStockById);
}
export function* watchRemoveStockById() {
    yield takeLatest(REMOVE_STOCK_BY_ID,removeStockById);
}
export function* watchUpdateStock() {
    yield takeLatest(UPDATE_STOCK,updateStock);
}
export function* watchSaveStock() {
    yield takeLatest(SAVE_STOCK,saveStock);
}