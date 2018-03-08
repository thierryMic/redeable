import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'


export const EditPost = (props) => {

    const { categories, isOpen, openEditPost, post, editText, type, handleSubmit } = props
    Modal.setAppElement('#root');
    return (
        <Modal isOpen={isOpen}>
        	<form className='' onSubmit={(e) => handleSubmit(e)}>
                {type==='post' && (
                	<div>
                        <label>Category</label>
                        <select className='' name='category' value={post && post.category}
                                onChange={(e) => editText(e)}>
                        	{categories.map ((c) => (
                        		c.name !=='All' &&
                                <option key={c.name} value={c.name} >{c.name}</option>
                        	))}
                        </select>

        	            <label>
                            Title
                            <input type='text' name='title'
                                   value={post && post.title}
                                   onChange={(e) => editText(e)}
                                />
                        </label>
                    </div>
                )}

		        <label>
                    Contents
                    <textarea rows='5' cols='50' name='body'
                              value={post && post.body}
                              onChange={(e) => editText(e)}
                            >
                    </textarea>
                </label>

		        <button>Save</button>
	        	<button className='' onClick={() => {openEditPost(false)}}>Close</button>

        	</form>
        </Modal>
    )
}

EditPost.propTypes = {
	categories: PropTypes.array.isRequired,
	isOpen: PropTypes.bool.isRequired,
	reqSavePost: PropTypes.func.isRequired,
    recSavePost: PropTypes.func.isRequired,
    openEditPost: PropTypes.func.isRequired,
    editText: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}