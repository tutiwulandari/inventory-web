import { all } from 'redux-saga/effects';
import {watchFindAllUnit, watchRemoveUnitById, watchFindUnitById, watchSaveUnit, watchUpdateUnit} from "./unitsagas";
import {watchGetAllItem, watchGetItemById, watchRemoveItemById, watchSaveItem, watchUpdateItem} from "./itemsagas";
import {watchGetAllStocks, watchSaveStock, watchGetStockById, watchRemoveStockById, watchUpdateStock} from './stocksagas'

export default function* rootSaga() {
    yield all([
        watchFindAllUnit(), watchFindUnitById(),watchRemoveUnitById(), watchSaveUnit(), watchUpdateUnit(),
        watchGetAllItem(),watchGetItemById(), watchRemoveItemById(), watchSaveItem(), watchUpdateItem(),
        watchGetAllStocks(), watchGetStockById(), watchRemoveStockById(), watchSaveStock(), watchUpdateStock()
        ]
    )
}