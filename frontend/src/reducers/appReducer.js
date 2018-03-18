export default function appReducer(state={editPostOpen:false, editPost:{}, editType:'post',
								          location:'category'}, action) {
	switch (action.type) {

		//set the editPostOpen property in the application state
		case "OPEN_EDIT_POST": {
			return {editPostOpen:action.open, editPost:action.post, editType: action.editType}
		}

		//modifies the values of the post currently being edited
		case "EDIT_TEXT": {
			return{ ...state, editPost:{...state.editPost, ...action.delta}}
		}

		default: {
			return state;
		}
	}
}
