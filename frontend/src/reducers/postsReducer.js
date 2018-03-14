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
			const {payload} = action
			const index = state.posts.findIndex( p => p.id === payload.id)

			if (index === -1) {
				return {...state, posts:sort([...state.posts, payload], state.sortKey)}
			} else {
				const newPosts = [...state.posts]
				newPosts[index] = payload
				return {...state, posts:newPosts}
			}
		}


		case "REC_POST_VOTE": {
			const newPosts = [...state.posts]
			const index = newPosts.findIndex( p => p.id === action.payload.id)
			newPosts[index].voteScore = action.payload.voteScore
			return {...state, posts:newPosts}
		}


		case "REC_NEW_COMMENT": {
			const newPosts = [...state.posts]
			const index = newPosts.findIndex( p => p.id === action.payload.parentId)
			newPosts[index].commentCount++
			return {...state, posts:newPosts}
		}


		case "REC_DELETE_POST": {
			const newPosts = [...state.posts]
			const index = newPosts.findIndex( p => p.id === action.payload.id)
			newPosts.splice(index,1)
			return {...state, posts:newPosts}
		}


		case "REC_DELETE_COMMENT": {
			const newPosts = [...state.posts]
			const index = newPosts.findIndex( p => p.id === action.payload.parentId)
			newPosts[index].commentCount--
			return {...state, posts:newPosts}
		}


		default: {
			return state;
		}
	}
}


const sort = (array, key) => [...array.sort( (a,b) => ( a[key] <  b[key]))]
