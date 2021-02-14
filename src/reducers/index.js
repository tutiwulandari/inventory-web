import {combineReducers} from 'redux'
import {findAllUnit, findUnitById, removeUnitById, saveUnit, updateUnit} from "./unitReducer";
import {getItems, removeItemById, saveItem, updateItem, getItemById} from './itemReducer'
import {getStocks, getStockById, removeStockById, saveStock, updateStock} from './stockReducer';

const rootReducer = combineReducers({
    findAllUnit,
    findUnitById,
    removeUnitById,
    saveUnit,
    updateUnit,
    getItems,
    getItemById,
    removeItemById,
    updateItem,
    saveItem,
    getStocks,
    getStockById,
    saveStock,
    updateStock,
    removeStockById

});
export default rootReducer;