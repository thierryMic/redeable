const url = process.env.REACT_APP_API
var headers = JSON.parse(process.env.REACT_APP_HEADERS)

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const FILTER_CATEGORIES = 'FILTER_CATEGORIES'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'


export const receiveCategories = (categories) => ({
	type: RECEIVE_CATEGORIES,
	...categories
})


export const filterCategories = (id) => ({
	type: FILTER_CATEGORIES,
	id
})



export const receivePosts = (posts) => ({
	type: RECEIVE_POSTS,
	posts,
})


export function fetchData(endpoint, handler) {
	return function(dispatch) {
		return fetch(`${url}/${endpoint}`, headers)
			.then(response => response.json())
			.then(json => dispatch(handler(json)))
			.catch(error => {
				console.log(error)
			})
		}

}