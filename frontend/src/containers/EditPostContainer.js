import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EditPost } from '../components/EditPost'
import { openEditPost, reqSavePost, recSavePost, recNewComment, fetchData, editText } from '../actions/actions'
import { withRouter } from 'react-router-dom'
import serializeForm from 'form-serialize'

var UUID = require('uuid-js');
/**
* @description Represents a category item
*/

class EditPostContainer extends Component {

    static propTypes = {
        editPostOn: PropTypes.func,
        editType: PropTypes.string,
    }


    handleSubmit = (e) => {
        const { reqSavePost, recSavePost, recNewComment, post, editType, fetchData,
                openEditPost, match} = this.props
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
            //existing post or comment, change method and append id
            body = JSON.stringify(post)
            method = 'PUT'
            url = `${url}/${post.id}`
        }

        //change handler for new comments
        if (editType === 'newComment') {
            handler = recNewComment
        }

        fetchData(url, reqSavePost, handler, {method: method, body:body})
        openEditPost(false)
    }


    render() {
        const { categories, openEditPost, isOpen, post, editType, editText, match} = this.props
        const newType = match.params.postid ? 'Comment' : 'Post'
        return (
            <div>
                <EditPost isOpen={isOpen}
                          openEditPost={openEditPost}
                          editText={editText}
                          categories={categories}
                          post={post}
                          // type={`new${newType}`}
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

