import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'

var UUID = require('uuid-js');
/**
* @description Represents a category item
*/


const handleSubmit = (e, props) => {
    const { reqSavePost, recSavePost } = props

    e.preventDefault()

    let post = serializeForm(e.target, { hash: true, empty:true})
    post.id = UUID.create().hex
    post.timestamp = Date.now()
    post.author ='default'
    post = JSON.stringify(post)

    props.fetchData('posts', reqSavePost, recSavePost, {method:'POST', body:post})
}


export const EditPost = (props) => {

    const { categories, isOpen, openEditPost} = props
    Modal.setAppElement('#root');
    return (
        <Modal isOpen={isOpen}>
        	<form className='' onSubmit={(e,p) => handleSubmit(e, props)}>

        		<label>Category</label>
                <select className='' name='category'>
                	{categories.map ((c) => (
                		c.name !=='All' && <option key={c.name} value={c.name} >{c.name}</option>
                	))}
                </select>

	            <label>Title<input type='text' name='title'/></label>
		        <label>Contents<textarea rows='5' cols='50' name='body'></textarea></label>

		        <button>Save</button>
	        	<button className='' onClick={() => {openEditPost(false)}}>Close</button>
        	</form>
        </Modal>
    )
}

EditPost.propTypes = {
	categories: PropTypes.array.isRequired,
	isOpen: PropTypes.bool.isRequired,
	openEditPost: PropTypes.func.isRequired,
	reqSavePost: PropTypes.func.isRequired,
    recSavePost: PropTypes.func.isRequired,
}