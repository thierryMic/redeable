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

export const activatePost = (post) => ({
	type: ACTIVATE_POST,
	post,
})


export const sortPosts = (key) => ({
	type: SORT_POSTS,
	key
})


export const refreshPosts = () => ({
	type: REFRESH_POSTS,
})


export const openEditPost = (open) => ({
	type: OPEN_EDIT_POST,
	open
})


export const reqSavePost = () => () => ({
	type: REQ_SAVE_POST,
})


export const recSavePost = (post) => () => ({
	type: REC_SAVE_POST,
	post
})


export const requestComments = (postId) => () => ({
  type: REQUEST_COMMENTS,
  postId
})


export const receiveComments = (commentsArray) => {
	let comments = {}
	const parentId = commentsArray[0] && commentsArray[0].parentId
	commentsArray.length > 0 && (comments[commentsArray[0].parentId] = commentsArray)

	return {type: RECEIVE_COMMENTS,
			comments,
			parentId
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

