export default function commentsReducer(state={comments:{}, isFetching:{}}, action) {
	switch (action.type) {

		// set isFetching and add a key,value pair consisting of a postid and an empty array
		case "REQUEST_COMMENTS": {
			return {comments: {...state.comments, [action.postId]:[]},
					isFetching: {...state.isFetching, [action.postId]:true}
				}
		}

		// add received comments to the state and set isFetching to false
		case "RECEIVE_COMMENTS": {
			const {comments, sortKey} = action
			const key = Object.keys(comments)[0]
			const newComments = sort(comments[key], sortKey)
			return {comments: {...state.comments, [key]:newComments},
					isFetching: {...state.isFetching, [action.parentId]:false}
				}
		}

		// add, edit and delete comments
		case "REC_NEW_COMMENT":
		case "REC_SAVE_COMMENT":
		case "REC_DELETE_COMMENT": {
			return processComment(action,state)
		}


		// increment or decrement the voteCount of a comment
		case "REC_COMMENT_VOTE": {
			const {payload, sortKey} = action
			const index = state.comments[payload.parentId].findIndex(p => p.id === payload.id)
			let newComments = [...state.comments[payload.parentId]]
			newComments[index].voteScore = payload.voteScore
			if (sortKey === 'voteScore') {
				newComments = sort(newComments, sortKey)
			}

			return {...state,
					comments:{...state.comments, [payload.parentId]:newComments}
				}
		}

		// sorts the comment of a post with the id postid
		case "SORT_POSTS": {
			const {postid, key} = action
			if (postid) {
				const newComments = sort(state.comments[postid], key)
				return {...state, comments: {...state.comments, [postid]:newComments}}
			}
			return state
		}

		default: {
			return state;
		}
	}
}

/**
* @description sorts and array in descending order
* @param {array} array - the array to eb sorted
* @param {key} array - the key by which to sort the array objects
*/
const sort = (array, key) => [...array.sort( (a,b) => ( a[key] <  b[key]))]


/**
* @description adds, edits or deletes a comment
* @param {object} action - an object compring a comment and an operation to be carried out: add,
						   edit or delete
* @param {object} state - the state object
*/
function processComment(action, state) {
	const {parentId, id} = action.payload
	let newComments = [...state.comments[parentId]]
	const index = state.comments[parentId].findIndex(p => p.id === id)

	if (action.type === "REC_DELETE_COMMENT") {
		newComments.splice(index, 1)
	} else {
		newComments.splice(index === -1 ? 0 : index, index === -1 ? 0 : 1, action.payload)
	}

	return {...state, comments:{...state.comments, [parentId]:newComments}}
}