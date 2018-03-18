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

/**
* @description updates the text value of a controlled component
* @param {event} e - an event object
*/
export const editText = (e) => {
	let delta = {}
	//the event's target name should match a property of a post object
	delta[e.target.name] = e.target.value
	return {
		type: EDIT_TEXT,
		delta
	}
}

/**
* @description action creator - see type
*/
export const requestCats = () => ({
  type: REQUEST_CATEGORIES,
})


/**
* @description action creator - see type
* @param {array} categories - an array of strings representing categories
*/
export const receiveCats = (categories) => ({
	type: RECEIVE_CATEGORIES,
	...categories
})

/**
* @description action creator - see type
* @param {string} id - the id of a category
*/
export const filterCats = (id) => ({
	type: FILTER_CATEGORIES,
	id
})

/**
* @description action creator - see type
*/
export const requestPosts = () => ({
  type: REQUEST_POSTS,
})

/**
* @description action creator - see type
* @param {array} posts array of post objects
*/
export const receivePosts = (posts) => {
	if (!Array.isArray(posts)) {
		posts = [posts]
	}
	return {
		type: RECEIVE_POSTS,
		posts,
	}
}


/**
* @description calls receivePosts and refreshPosts action creators
* @description this is only called when all posts are retrived from the api
* @param {array} posts array of post objects
*/
export function receiveAllPosts(posts) {
	return function(dispatch) {
		dispatch(receivePosts(posts))
		dispatch(refreshPosts())
	}
}

/**
* @description action creator - see type
*/
export const refreshPosts = () => ({
	type: REFRESH_POSTS,
})

/**
* @description action creator - see type
* @param {string} key - the property by which to sort posts
* @param {string} postid - the id of a specific post
*/
export const sortPosts = (key, postid) => ({
	type: SORT_POSTS,
	key,
	postid
})

/**
* @description action creator - see type
* @param {boolean} open - indicates whether the EditPost modal should be open or not
* @param {post} post - a post object to be use to pre-polate relevant fields on the modal
* @param {string} editType - the type of editing: newPost, new Comment, editPost or editComment
*/
export const openEditPost = (open, post, editType) => ({
	type: OPEN_EDIT_POST,
	open,
	post,
	editType
})

/**
* @description action creator - see type
*/
export const reqSavePost = () => () => ({
	type: REQ_SAVE_POST,
})

/**
* @description action creator - see type
* @param {object} payload - a comment or post object
*/
export const recSavePost = (payload) => () => ({
	type: payload.parentId ? REC_SAVE_COMMENT : REC_SAVE_POST,
	payload
})

/**
* @description action creator - see type
* @param {object} payload - a comment object
*/
export const recNewComment = (payload) => () => ({
	type: REC_NEW_COMMENT,
	countChange: 1,
	payload,
})


/**
* @description action creator - see type
* @description req stands for request
*/
export const reqVote = () => () => ({
  type: REQ_VOTE,
})


/**
* @description action creator - see type
* @description dispatches an appropriate action depending on whether the payload is a post or a
* @description comment
* @param {object} payload - a comment or post object
*/
//returns a REC_COMMENT or REC_POST depending on whether the payload has parentId
export const recVote = (payload) => (dispatch, state) => ({
  type: payload.parentId ? REC_COMMENT_VOTE : REC_POST_VOTE,
  sortKey:state().posts.sortKey,
  payload,
})

/**
* @description action creator - see type
* @description req stands for request
*/
export const reqDeletePost = () => () => ({
  type: REQ_DELETE_POST,
})



/**
* @description action creator - see type
* @description req stands for request
* @param {object} payload - a comment or post object
*/
export const recDeletePost = (payload) => () => ({
  type: payload.parentId ? REC_DELETE_COMMENT : REC_DELETE_POST,
  countChange: -1,
  payload
})

/**
* @description action creator - see type
* @param {string} postid - the id of the post for which we want to retriece comments
*/
export const requestComments = (postId) => () => ({
  type: REQUEST_COMMENTS,
  postId
})

/**
* @description action creator - see type
* @param {array} commentsArray - an array of comment relating to a particular post
*/
export function receiveComments (commentsArray)  {
	return function (dispatch, state) {
		//create a key, value pair consisting of the parent postid and its corresponding comments
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


/** @function fetchData
* @description helper for making api calls and dispatching actions
* @param {string} endpoint - The api url which will be called with the fetch api
* @param {function} initiator - An action creator to be called before making an api call
* @param {function} handler - An action creator to be called upon receiving a response
* @param {object} options - a JSON object to be append to the api request
*/
export function fetchData(endpoint, initiator, handler, options={method:'GET'}) {
	return function(dispatch) {
		dispatch(initiator())
		return fetch(`${url}/${endpoint}`, {
						...headers,
					    ...options
						})
			.then(response => response.json())
			.then(json => dispatch(handler(json)))
			.catch(error => {console.log(error)})
		}

}

