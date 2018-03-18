import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'


export const EditPost = (props) => {

    const { categories, isOpen, openEditPost, post, editText, type, handleSubmit } = props
    Modal.setAppElement('#root');
    return (
        <Modal className='edit-modal' isOpen={isOpen}>

        	<form className='edit-form' onSubmit={(e) => handleSubmit(e)}>
                <div className='edit-title'>{getTitle(type)}</div>
                {type==='newPost' && (
                	<div className='edit-details'>
                        <label>Category</label>
                        <select className='edit-sel' name='category' value={post && post.category}
                                onChange={(e) => editText(e)}>
                        	{categories.map ((c) => (
                        		c.name !=='All' &&
                                <option key={c.name} value={c.name} >{c.name}</option>
                        	))}
                        </select>


                        <label>Title</label>
                        <input type='text' name='title'
                               value={post && post.title}
                               onChange={(e) => editText(e)}
                            />

                    </div>
                )}

		        <div className='edit-body'>
                    <label>Contents</label>
                    <textarea rows='5' cols='50' name='body'
                              value={post && post.body}
                              onChange={(e) => editText(e)}
                            >
                    </textarea>
                </div>

                <div className='edit-actions'>
    		        <button className='button'>Save</button>
    	        	<button className='button' onClick={() => {openEditPost(false)}}>Close</button>
                </div>
        	</form>
        </Modal>
    )
}

EditPost.propTypes = {
	categories: PropTypes.array.isRequired,
	isOpen: PropTypes.bool.isRequired,
    openEditPost: PropTypes.func.isRequired,
    editText: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

function getTitle(type) {
    switch(type) {
        case 'newPost' : {
            return 'New post'
        }
        case 'newComment' : {
            return 'New comment'
        }
        case 'editPost' : {
            return 'Edit post'
        }
        case 'editComment' : {
            return 'Edit comment'
        }
        default : {
            return 'New post'
        }
    }
}