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


		case "SORT_POSTS": {
			const sorted = [...state.posts.sort( (a,b) => ( a[action.key] <  b[action.key]))]
			return {posts:sorted}
		}


		default: {
			return state;
		}
	}
}