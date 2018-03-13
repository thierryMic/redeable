import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EditPost } from '../components/EditPost'
import { openEditPost, reqSavePost, recSavePost, fetchData, editText } from '../actions/actions'
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
        newType:  PropTypes.string.isRequired
    }

    handleSubmit = (e) => {
        const { reqSavePost, recSavePost, post, editType, fetchData, match} = this.props
        let url = 'posts'
        let newPost = serializeForm(e.target, { hash: true, empty:true})

        e.preventDefault()

        if (editType === 'comment') {
            url = 'comments'
            post.timestamp = Date.now()
            newPost.parentId = match.params.postid
        }

        // new post
        if (post.id == null) {
            newPost.id = UUID.create().hex
            newPost.timestamp = Date.now()
            newPost.author ='default'
            newPost = JSON.stringify(newPost)
            fetchData(url, reqSavePost, recSaveNewPost, {method:'POST', body:newPost})
        } else {
            //existing post
            const edits = JSON.stringify(post)
            fetchData(`${url}/${post.id}`, reqSavePost, recSavePost, {method:'PUT', body:edits})
        }
    }


    render() {
        const { categories, openEditPost, isOpen, post, editText, editType, match} = this.props
        const newType = match.params.postid ? 'comment' : 'post'
        return (
            <div>
                <button className='' onClick={() => {openEditPost(true, {}, newType)}}>
                    New {newType}
                </button>

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
        fetchData: (e, i, h, m) => dispatch(fetchData(e, i, h, m))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPostContainer))

