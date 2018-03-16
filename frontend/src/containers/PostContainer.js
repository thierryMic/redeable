import React, { Component } from 'react'
import { Post } from '../components/Post'
import { NotFound } from '../components/NotFound'
import PropTypes from 'prop-types'
import { requestPosts, receivePosts, requestComments, receiveComments,
         sortPosts, reqVote, recVote, openEditPost, fetchData,
         reqDeletePost, recDeletePost } from '../actions/actions'
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
            const x = fetchData(requestPosts, receivePosts)(`posts/${postid}`)
        }

        if (!comments[postid] && !(comments[postid] && comments[postid].isFetching)) {
            fetchData(requestComments(postid), receiveComments)(`posts/${postid}/comments`)
        }
    }

    render() {

        const {posts, comments, fetchData, reqVote, recVote, openEditPost ,
               reqDeletePost, recDeletePost, isFetching } = this.props
        const postid = this.props.match.params.postid
        const post = posts.find(p => p.id === postid)

        return (
            <div className='post-list'>
                {post && <Post post={post}
                               vote={fetchData(reqVote, recVote)}
                               del={fetchData(reqDeletePost, recDeletePost)}
                               openEditPost={openEditPost('editPost')}
                            />}

                {post && comments[postid] && <PostList posts={comments[postid]}
                                                       vote={fetchData(reqVote, recVote)}
                                                       del={fetchData(reqDeletePost, recDeletePost)}
                                                       allowSort={false}
                                                       openEditPost={openEditPost('editComment')}
                                                />}
                {!post && !isFetching  && <NotFound />}
            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        posts:state.posts.posts,
        isFetching: state.posts.isFetching,
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
        reqDeletePost: () => dispatch(reqDeletePost()),
        recDeletePost: (p) => dispatch(recDeletePost(p)),
        openEditPost: t => (o, p) =>  dispatch(openEditPost(o, p, t)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)

