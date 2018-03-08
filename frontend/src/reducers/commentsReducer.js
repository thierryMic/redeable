export default function commentsReducer(state={comments:{}, isFetching:{}}, action) {
	switch (action.type) {

		case "REQUEST_COMMENTS": {
			return {comments: {...state.comments, [action.postId]:[]},
					isFetching: {...state.isFetching, [action.postId]:true}
				}
		}

		case "RECEIVE_COMMENTS": {
			return {comments: {...state.comments, ...action.comments},
					isFetching: {...state.isFetching, [action.parentId]:false}
				}
		}

		case "REC_SAVE_COMMENT": {
			const {payload} = action
			const index = state.comments[payload.parentId].findIndex( p => p.id === payload.id)
			let newComments =[]

			console.log("Index", index)
			if (index === -1) {
				 newComments = [...state.comments[payload.parentId], payload]
			} else {
				newComments = [...state.comments[payload.parentId]]
				newComments[index] = payload
			}
			return {...state, comments:{...state.comments, [payload.parentId]:newComments}}
		}


		case "REC_COMMENT_VOTE": {
			const {payload} = action
			const index = state.comments[payload.parentId].findIndex( p => p.id === payload.id)
			const newComments = [...state.comments[payload.parentId]]

			newComments[index].voteScore = payload.voteScore
			return {...state,
					comments:{...state.comments, [payload.parentID]:newComments}
				}
		}


		default: {
			return state;
		}
	}
}