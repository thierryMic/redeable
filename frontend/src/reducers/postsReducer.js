export default function postsReducer(state={posts:[], isFetching:false, fresh:false,
									 sortKey:process.env.REACT_APP_DEFAULT_SORT}, action) {
	switch (action.type) {

		// request posta nd set isFEtching to true
		case "REQUEST_POSTS": {
			return {...state,
					isFetching:true
				}
		}

		// add posts to the application state and set isFetching to false
		case "RECEIVE_POSTS": {
			return {...state,
					posts:sort([...action.posts], state.sortKey),
					isFetching:false
				}
		}

		// sort the application posts in descending order based on the specified key
		case "SORT_POSTS": {
			return {...state,
					posts:sort(state.posts, action.key),
					sortKey:action.key}
		}

		//set the fresh property in the application state to true
		case "REFRESH_POSTS": {
			return {...state, fresh:true}
		}

		//adds a new post or edits an existing one
		case "REC_SAVE_POST": {
			const {payload} = action
			const index = state.posts.findIndex( p => p.id === payload.id)

			//edit and existing post which was found at index
			if (index !== -1) {
				const newPosts = [...state.posts]
				newPosts[index] = payload
				return {...state, posts:newPosts}
			}

			//add a new post
			return {...state, posts:sort([...state.posts, payload], state.sortKey)}
		}

		//deletes a post from the application state
		case "REC_DELETE_POST": {
			const newPosts = [...state.posts]
			const index = newPosts.findIndex( p => p.id === action.payload.id)
			newPosts.splice(index,1)
			return {...state, posts:newPosts}
		}

		// increment or decrement the voteCount of a specified post
		case "REC_POST_VOTE": {
			let newPosts = [...state.posts]
			const index = newPosts.findIndex( p => p.id === action.payload.id)
			newPosts[index].voteScore = action.payload.voteScore
			if (state.sortKey === 'voteScore') {
				newPosts = sort(newPosts, state.sortKey)
			}
			return {...state, posts:newPosts}
		}

		// increment or decrement the commentCount of a specified post
		case "REC_NEW_COMMENT":
		case "REC_DELETE_COMMENT": {
			let newPosts = [...state.posts]
			const index = newPosts.findIndex( p => p.id === action.payload.parentId)
			newPosts[index].commentCount = newPosts[index].commentCount + action.countChange
			if (state.sortKey === 'commentCount') {
				newPosts = sort(newPosts, state.sortKey)
			}
			return {...state, posts:newPosts}
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
