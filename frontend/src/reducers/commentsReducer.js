export default function commentsReducer(state={comments:{}, isFetching:false,}, action) {
	switch (action.type) {

		case "REQUEST_COMMENTS": {
			return {comments: {...state.comments, [action.postId]:[]},
					isFetching: true
				}
		}

		case "RECEIVE_COMMENTS": {
			return {comments: {...state.comments, ...action.comments},
					isFetching: false
				}
		}

		default: {
			return state;
		}
	}
}