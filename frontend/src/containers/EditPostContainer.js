import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { EditPost } from '../components/EditPost'
import serializeForm from 'form-serialize'
import { openEditPost, reqSavePost, recSavePost, recNewComment, fetchData,
         editText } from '../actions/actions'

// used to generate a unique id for new posts and comments
const UUID = require('uuid-js');

/**
* Class representing the EditPostContainer component
* @extends Component
*/
class EditPostContainer extends Component {

    static propTypes = {
        editType: PropTypes.string,
    }

    /**
    * @description makes the appropriate calls to the api to save posts or comments
    */
    handleSubmit = (e) => {
        const { reqSavePost, recSavePost, recNewComment, post, editType, fetchData,
                openEditPost, match} = this.props

        //intialise default values for various parameters
        let handler = recSavePost
        let url = 'posts'
        let newPost = serializeForm(e.target, { hash: true, empty:true})
        let method ='POST'
        let body = {}

        e.preventDefault()

        // set relevant url and get a time stamp if this is a comment
        if (editType.indexOf('Comment') > 0) {
            url = 'comments'
            post.timestamp = Date.now()
            newPost.parentId = match.params.postid
        }

        // new post or comment
        if (editType.indexOf('new') === 0) {
            newPost.id = UUID.create().hex
            newPost.timestamp = Date.now()
            newPost.author ='default'
            body = JSON.stringify(newPost)
        } else {
            //existing post or comment, change method and append id to url
            body = JSON.stringify(post)
            method = 'PUT'
            url = `${url}/${post.id}`
        }

        //change handler for new comments
        if (editType === 'newComment') {
            handler = recNewComment
        }

        // send api request and close EditPost component
        fetchData(url, reqSavePost, handler, {method: method, body:body})
        .then(openEditPost(false))
        .catch(error => {console.log(error)})
    }

    /**
    * @description renders a EditPostContainer component
    */
    render() {
        const { categories, openEditPost, isOpen, post, editType, editText} = this.props

        return (
            <div>
                <EditPost isOpen={isOpen}
                          openEditPost={openEditPost}
                          editText={editText}
                          categories={categories}
                          post={post}
                          type={editType}
                          handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        isOpen: state.app.editPostOpen,
        categories: state.categories.categories,
        post: state.app.editPost,
        editType: state.app.editType
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        openEditPost: (o, p, t) => dispatch(openEditPost(o, p, t)),
        editText: (e) => dispatch(editText(e)),
        reqSavePost: () => dispatch(reqSavePost()),
        recSavePost: (p) => dispatch(recSavePost(p)),
        recNewComment: (p) => dispatch(recNewComment(p)),
        fetchData: (e, i, h, m) => dispatch(fetchData(e, i, h, m))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPostContainer))

