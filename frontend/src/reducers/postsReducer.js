export default function postsReducer(state={posts:[], isFetching:false}, action) {
	switch (action.type) {

		case "REQUEST_POSTS": {
			return {...state,
					isFetching:true
				}
		}


		case "RECEIVE_POSTS": {
			return {...state,
					posts:[...action.posts],
					isFetching:false
				}
		}


		default: {
			return state;
		}
	}
}