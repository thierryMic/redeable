export default function appReducer(state={editPostOpen:false, editedPost:{}, editType:'post'}, action) {
	switch (action.type) {

		case "OPEN_EDIT_POST": {
			return {editPostOpen:action.open, editPost:action.post, editType: action.editType}
		}


		case "EDIT_TEXT": {
			return{...state, editPost:{...state.editPost, ...action.delta}}
		}

		default: {
			return state;
		}
	}
}
