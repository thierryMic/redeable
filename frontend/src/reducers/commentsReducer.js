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

		default: {
			return state;
		}
	}
}