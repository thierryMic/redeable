import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Modal from 'react-modal'

/**
* @description Represents a category item
*/


export const EditPost = (props) => {

    const { isOpen, openEditPost } = props
    Modal.setAppElement('#root');
    return (
        <Modal isOpen={isOpen}>
        	<button className='' onClick={() => {openEditPost(false)}}>Close</button>
        </Modal>
    )
}

EditPost.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	openEditPost: PropTypes.func.isRequired
}