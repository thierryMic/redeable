import { combineReducers } from 'redux'
import appReducer from './appReducer'
import postsReducer from './postsReducer'
import categoryReducer from './categoryReducer'
import commentsReducer from './commentsReducer'

export const allReducers = combineReducers (
  {
    app:appReducer,
    posts:postsReducer,
    categories:categoryReducer,
    comments:commentsReducer,
  }
)
