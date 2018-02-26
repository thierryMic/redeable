
const url = process.env.REACT_APP_API
var headers = JSON.parse(process.env.REACT_APP_HEADERS)

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'



export const receiveCategories = (categories) => ({
	type: RECEIVE_CATEGORIES,
	...categories
})

export const receivePosts = (posts) => ({
	type: RECEIVE_POSTS,
	posts,
})



export function fetchData(endpoint) {
	return function(dispatch) {
		return fetch(`${url}/${endpoint}`, headers)
			.then(response => response.json())
			.then(json => dispatch(receiveCategories(json)))
		}

}