export default function categoryReducer(state={categories:[], activeFilter:''}, action) {
	switch (action.type) {

		case "RECEIVE_CATEGORIES": {
			return {...state,
					categories:[...action.categories]
				}
		}

		case "FILTER_CATEGORIES": {
			const newFilter = state.activeFilter===action.id ? '' : action.id
			return {...state,
					activeFilter:newFilter
				};
		}

		default: {
			return state;
		}
	}
}