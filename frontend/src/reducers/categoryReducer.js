export default function categoryReducer(state=[], action) {
	switch (action.type) {

		case "RECEIVE_CATEGORIES": {
			return {...state,
					...action.categories
				};
		}

		default: {
			return state;
		}
	}
}