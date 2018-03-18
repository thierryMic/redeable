export default function categoryReducer(state={categories:[], isFetching:false, activeFilter:'All'}, action) {
	switch (action.type) {

		//set isFetiching to true
		case "REQUEST_CATEGORIES": {
			return {...state,
					isFetching:true
				}
		}

		//add categories to the state and set isFetching to false
		case "RECEIVE_CATEGORIES": {
			return {...state,
					categories:[{name: 'All', path: 'All'}, ...action.categories],
					isFetching:false
				}
		}

		// sets the activeFilter property in the state
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