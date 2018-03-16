export default function commentsReducer(state={comments:{}, isFetching:{}}, action) {
	switch (action.type) {

		case "REQUEST_COMMENTS": {
			return {comments: {...state.comments, [action.postId]:[]},
					isFetching: {...state.isFetching, [action.postId]:true}
				}
		}

		case "RECEIVE_COMMENTS": {
			const {comments, sortKey} = action
			const key = Object.keys(comments)[0]
			const newComments = sort(comments[key], sortKey)
			return {comments: {...state.comments, [key]:newComments},
					isFetching: {...state.isFetching, [action.parentId]:false}
				}
		}

		case "REC_SAVE_COMMENT": {
			const {payload} = action
			const index = state.comments[payload.parentId].findIndex( p => p.id === payload.id)
			let newComments =[]

			newComments = [...state.comments[payload.parentId]]
			newComments[index] = payload
			return {...state, comments:{...state.comments, [payload.parentId]:newComments}}
		}


		case "REC_NEW_COMMENT": {
			const {payload} = action
			let newComments = []

			newComments = [...state.comments[payload.parentId], payload]
			return {...state, comments:{...state.comments, [payload.parentId]:newComments}}
		}


		case "REC_COMMENT_VOTE": {
			const {payload, sortKey} = action
			const index = state.comments[payload.parentId].findIndex( p => p.id === payload.id)
			let newComments = [...state.comments[payload.parentId]]
			newComments[index].voteScore = payload.voteScore
			if (sortKey === 'voteScore') {
				newComments = sort(newComments, sortKey)
			}

			return {...state,
					comments:{...state.comments, [payload.parentId]:newComments}
				}
		}


		case "REC_DELETE_COMMENT": {
			const {payload} = action
			const index = state.comments[payload.parentId].findIndex( p => p.id === payload.id)
			let newComments =[]

			newComments = [...state.comments[payload.parentId]]
			newComments.splice(index,1)
			return {...state, comments:{...state.comments, [payload.parentId]:newComments}}
		}


		case "SORT_POSTS": {
			const {postid, key} = action
			if (postid) {
				const newComments = sort(state.comments[postid], key)
				return {...state,
						comments: {...state.comments, [postid]:newComments}
						}
			} else {
				return state
			}
		}

		default: {
			return state;
		}
	}
}

const sort = (array, key) => [...array.sort( (a,b) => ( a[key] <  b[key]))]

