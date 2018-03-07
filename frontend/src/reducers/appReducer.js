export default function appReducer(state={editPostOpen:false}, action) {
	switch (action.type) {

		case "OPEN_EDIT_POST": {
			return {editPostOpen:action.open}
		}

		default: {
			return state;
		}
	}
}
