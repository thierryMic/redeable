import { combineReducers } from 'redux'
import postReducer from './postReducer'
import categoryReducer from './categoryReducer'

export const allReducers = combineReducers (
  {
    posts:postReducer,
    categories:categoryReducer
  }
)
