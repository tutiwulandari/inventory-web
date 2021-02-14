import {
  GET_STOCKS,
  GET_STOCKS_BY_ID,
  REMOVE_STOCK_BY_ID,
  SAVE_STOCK,
  UPDATE_STOCK
} from "../constans/actionConstan";

export function getAll(pagination) {
  console.log("save action stock");
  return {
    type: GET_STOCKS,
    pagination: {
      page: pagination.page,
      size: pagination.size,
    }
  };
}

export function save(model) {
  console.log("save action item")
  return {
    type: SAVE_STOCK,
    model
  }
}

export function getStockById(id) {
  return {
    type: GET_STOCKS_BY_ID,
    id
  }
}


export function removeById(id) {
  return {
    type: REMOVE_STOCK_BY_ID,
    id
  }
}

export function update(payload) {
  console.log("save update action")
  return {
    type: UPDATE_STOCK,
    payload
  }
}
