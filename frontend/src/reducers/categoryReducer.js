export default function categoryReducer(state={categories:[], isFetching:false, activeFilter:'All'}, action) {
	switch (action.type) {

		case "REQUEST_CATEGORIES": {
			return {...state,
					isFetching:true
				}
		}

		case "RECEIVE_CATEGORIES": {
			return {...state,
					categories:[{name: 'All', path: 'All'}, ...action.categories],
					isFetching:false
				}
		}

		case "FILTER_CATEGORIES": {
			const newFilter = action.id==='' ? 'All' : action.id
			if (state.activeFilter !== newFilter) {
				return {...state, activeFilter:newFilter};
				}
			return state;
		}

		default: {
			return state;
		}
	}
}