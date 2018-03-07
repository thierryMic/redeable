export default function postsReducer(state={posts:[], isFetching:false, fresh:false,
									 sortKey:process.env.REACT_APP_DEFAULT_SORT}, action) {
	switch (action.type) {

		case "REQUEST_POSTS": {
			return {...state,
					isFetching:true
				}
		}

		case "RECEIVE_POSTS": {
			return {...state,
					posts:sort([...action.posts], state.sortKey),
					isFetching:false
				}
		}


		case "SORT_POSTS": {
			return {...state,
					posts:sort(state.posts, action.key),
					sortKey:action.key}
		}


		case "REFRESH_POSTS": {
			return {...state, fresh:true}
		}


		case "REC_SAVE_POST": {
			return {...state,
					posts:sort([...state.posts, action.post], state.sortKey)}
		}


		case "REC_POST_VOTE": {
			const index = state.posts.findIndex( p => p.id === action.payload.id)
			const newPosts = [...state.posts]

			newPosts[index].voteScore = action.payload.voteScore
			return {...state, posts:newPosts}
		}


		default: {
			return state;
		}
	}
}


const sort = (array, key) => [...array.sort( (a,b) => ( a[key] <  b[key]))]
