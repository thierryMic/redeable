export default function categoryReducer(state={categories:[], isFetching:false, activeFilter:''}, action) {
	switch (action.type) {

		case "REQUEST_CATEGORIES": {
			return {...state,
					isFetching:true
				}
		}

		case "RECEIVE_CATEGORIES": {
			return {...state,
					categories:[...action.categories],
					isFetching:false
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