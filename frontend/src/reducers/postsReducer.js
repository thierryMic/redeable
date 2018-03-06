export default function postsReducer(state={posts:[], isFetching:false, fresh:false}, action) {
	switch (action.type) {

		case "REQUEST_POSTS": {
			return {...state,
					isFetching:true
				}
		}


		case "RECEIVE_POSTS": {
			return {...state,
					posts:sort([...action.posts], process.env.REACT_APP_DEFAULT_SORT),
					isFetching:false
				}
		}


		case "SORT_POSTS": {
			return {posts:sort(state.posts, action.key)}
		}


		case "REFRESH_POSTS": {
			return {...state, fresh:true}
		}


		default: {
			return state;
		}
	}
}


const sort = (array, key) => [...array.sort( (a,b) => ( a[key] <  b[key]))]
