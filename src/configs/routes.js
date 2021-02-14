
import {
    Error,
    UnitForm,
    UnitList,
}
from "../pages";
import ItemList from "../pages/Items/ItemList";
import StockList  from "../pages/Stocks/StockList";
import Home from '../components/Home'
import ItemForm from '../pages/ItemForm/ItemForm'
import StockForm from "../pages/StockForm";
import ItemDetail from "../pages/ItemForm/ItemDetail";
import UnitDetail from "../pages/UnitForm/UnitDetail";
import StockDetail from "../pages/StockForm/StockDetail";



export default [
    {
        //Add Unit
        path: '/unit',
        component: <UnitForm />,
        exact: true
    },
    {
        //FindById
        path: '/detail/id',
        component: <UnitDetail/>,
        exact: true
    },
    {
        //Home
        path: '/units',
        component: <Home/>,
        exact: true
    },
    {
        //get All unit
        path: '/unitList',
        component: <UnitList/>,
        exact: true
    },
    {
        //edit unit
        path: '/unit/:id/edit',
        component: <UnitForm />,
        exact: true
    },
    {
        //getALl item
        path: '/items',
        component:<ItemList/>,
        exact: true
    },

    {
        // add items
        path: '/item',
        component:<ItemForm/>,
        exact: true
    },
    {
        // edit items
        path: '/item/:id/edit',
        component:<ItemForm/>,
        exact: true
    },
    {
        // getId items
        path: '/detailItem/:id',
        component:<ItemDetail/>,
        exact: true
    },
    {
        path: '/stocks',
        component:<StockList/>,
        exact: true
    },
    {
        // add stock
        path: '/stock',
        component:<StockForm/>,
        exact: true
    },
    {
        // edit stock
        path: '/stock/:id/edit',
        component:<StockForm/>,
        exact: true
    },
    {
        // getId stock
        path: '/detailStock/:id',
        component:<StockDetail/>,
        exact: true
    },

    {
        path: '*',
        component: <Error />,
        exact: false
    },


];