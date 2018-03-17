const url = process.env.REACT_APP_API
var headers = JSON.parse(process.env.REACT_APP_HEADERS)

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const FILTER_CATEGORIES = 'FILTER_CATEGORIES'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ACTIVATE_POST = 'ACTIVATE_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const REFRESH_POSTS = 'REFRESH_POSTS'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export const OPEN_EDIT_POST = 'OPEN_EDIT_POST'
export const REQ_SAVE_POST = 'REQ_SAVE_POST'
export const REC_SAVE_POST = 'REC_SAVE_POST'
export const REQ_DELETE_POST = 'REQ_DELETE_POST'
export const REC_DELETE_POST = 'REC_DELETE_POST'

export const REQ_VOTE = 'REQ_VOTE'

export const REC_POST_VOTE = 'REC_POST_VOTE'
export const REC_COMMENT_VOTE = 'REC_COMMENT_VOTE'
export const REC_SAVE_COMMENT = 'REC_SAVE_COMMENT'
export const REC_NEW_COMMENT = 'REC_NEW_COMMENT'
export const REC_DELETE_COMMENT = 'REC_DELETE_COMMENT'

export const EDIT_TEXT = 'EDIT_TEXT'


export const editText = (e) => {
	let delta = {}
	delta[e.target.name] = e.target.value
	return {
		type: EDIT_TEXT,
		delta
	}
}


export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
})


export const receiveCategories = (categories) => ({
	type: RECEIVE_CATEGORIES,
	...categories
})


export const filterCategories = (id) => ({
	type: FILTER_CATEGORIES,
	id
})


export const requestPosts = () => ({
  type: REQUEST_POSTS,
})


export const receivePosts = (posts) => {
	if (!Array.isArray(posts)) {
		posts = [posts]
	}
	return {
		type: RECEIVE_POSTS,
		posts,
	}
}


export function receiveAllPosts(posts) {
	return function(dispatch) {
		dispatch(receivePosts(posts))
		dispatch(refreshPosts())
	}
}


export const sortPosts = (key, postid) => ({
	type: SORT_POSTS,
	key,
	postid
})


export const refreshPosts = () => ({
	type: REFRESH_POSTS,
})


export const openEditPost = (open, post, editType) => ({
	type: OPEN_EDIT_POST,
	open,
	post,
	editType
})


export const reqSavePost = () => () => ({
	type: REQ_SAVE_POST,
})


export const recSavePost = (payload) => () => ({
	type: payload.parentId ? REC_SAVE_COMMENT : REC_SAVE_POST,
	payload
})


export const recNewComment = (payload) => () => ({
	type: REC_NEW_COMMENT,
	payload,
})


export const reqVote = () => () => ({
  type: REQ_VOTE,
})


export const recVote = (payload) => (dispatch, state) => ({
  type: payload.parentId ? REC_COMMENT_VOTE : REC_POST_VOTE,
  payload,
  sortKey:state().posts.sortKey
})


export const reqDeletePost = () => () => ({
  type: REQ_DELETE_POST,
})


export const recDeletePost = (payload) => () => ({
  type: payload.parentId ? REC_DELETE_COMMENT : REC_DELETE_POST,
  payload
})


export const requestComments = (postId) => () => ({
  type: REQUEST_COMMENTS,
  postId
})


export function receiveComments (commentsArray)  {
	return function (dispatch, state) {
		let comments = {}
		const parentId = commentsArray[0] && commentsArray[0].parentId
		commentsArray.length > 0 && (comments[commentsArray[0].parentId] = commentsArray)

		return dispatch({type: RECEIVE_COMMENTS,
				comments,
				parentId,
				sortKey:state().posts.sortKey

			})
		}
}


export function fetchData(endpoint, initiator, handler, options={method:'GET'}) {
	return function(dispatch) {
		dispatch(initiator())
		return fetch(`${url}/${endpoint}`, {
						...headers,
					    ...options
						})
			.then(response => response.json())
			.then(json => dispatch(handler(json)))
			.catch(error => {
				console.log(error)
			})
		}

}

