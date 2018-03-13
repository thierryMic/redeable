import React, { Component } from 'react'
import { Post } from '../components/Post'
import PropTypes from 'prop-types'
import { requestPosts, receivePosts, requestComments, receiveComments,
         sortPosts, reqVote, recVote, openEditPost, fetchData} from '../actions/actions'
import { connect } from 'react-redux'
import { PostList } from '../components/PostList'

class PostContainer extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    /**
    * @description - trigger a request comments
    */
    componentWillMount() {
        const { postid } = this.props.match.params
        const { posts, comments, fetchData } = this.props

        const post = posts.find(p => p.id === postid)

        if (post == null) {
            fetchData(requestPosts, receivePosts)(`posts/${postid}`)
        }

        if (!comments[postid] && !(comments[postid] && comments[postid].isFetching)) {
            fetchData(requestComments(postid), receiveComments)(`posts/${postid}/comments`)
        }
    }

    render() {

        const {posts, comments, fetchData, reqVote, recVote, openEditPost} = this.props
        const postid = this.props.match.params.postid
        const post = posts.find(p => p.id === postid)

        return (
            <div>
                {post && <Post post={post}
                               fetchData={fetchData(reqVote, recVote)}
                               openEditPost={openEditPost('editPost')}
                            />}

                {post && comments[postid] && <PostList posts={comments[postid]}
                                                       fetchData={fetchData(reqVote, recVote)}
                                                       allowSort={false}
                                                       openEditPost={openEditPost('editComment')}
                                                />}

            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        posts:state.posts.posts,
        comments:state.comments.comments,
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        requestPosts: () => dispatch(requestPosts()),
        receivePosts: () => dispatch(receivePosts()),
        requestComments: (id) => dispatch(requestComments(id)),
        receiveComments: () => dispatch(receiveComments()),
        fetchData: (i, h) => (e, m) => dispatch(fetchData(e, i, h, m)),
        sortPosts: (k) => dispatch(sortPosts(k)),
        reqVote: () => dispatch(reqVote()),
        recVote: (p) => dispatch(recVote(p)),
        openEditPost: t => (o, p) =>  dispatch(openEditPost(o, p, t)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)

