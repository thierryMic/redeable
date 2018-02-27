export default function postReducer(state=[], action) {
	switch (action.type) {

		case "RECEIVE_POSTS": {
			return [...state,
					...action.posts
			];
		}

		default: {
			return state;
		}
	}
}