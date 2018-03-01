import { combineReducers } from 'redux'
import postsReducer from './postsReducer'
import categoryReducer from './categoryReducer'
import commentsReducer from './commentsReducer'

export const allReducers = combineReducers (
  {
    posts:postsReducer,
    categories:categoryReducer,
    comments:commentsReducer,
  }
)
