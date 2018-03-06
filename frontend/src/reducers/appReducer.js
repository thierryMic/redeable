export default function appReducer(state={editPostOpen:false}, action) {
	switch (action.type) {

		case "OPEN_EDIT_POST": {
			console.log(action.open)
			return {editPostOpen:action.open}
		}

		default: {
			return state;
		}
	}
}
