import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Post } from '../components/Post'
import { NotFound } from '../components/NotFound'
import { PostList } from '../components/PostList'
import PropTypes from 'prop-types'
import { requestPosts, receivePosts, requestComments, receiveComments,
         sortPosts, reqVote, recVote, openEditPost, fetchData,
         reqDeletePost, recDeletePost } from '../actions/actions'



/**
* Class representing the PostContainer component
* @extends Component
*/
class PostContainer extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    /**
    * @description retrieves post and coments from the api server
    */
    componentWillMount() {
        const { postid } = this.props.match.params
        const { posts, comments, fetchData } = this.props

        // retrieves a post from the api if the post is not already loaded
        const post = posts.find(p => p.id === postid)
        if (post == null) {
            fetchData(requestPosts, receivePosts)(`posts/${postid}`)
        }

        // retrieves a post's comments from the api if not already loaded
        if (!comments[postid] && !(comments[postid] && comments[postid].isFetching)) {
            fetchData(requestComments(postid), receiveComments)(`posts/${postid}/comments`)
        }
    }


    /**
    * @description renders a PostContainer component
    */
    render() {
        const {posts, comments, fetchData, reqVote, recVote, openEditPost ,
               reqDeletePost, recDeletePost, isFetching } = this.props
        const postid = this.props.match.params.postid
        const post = posts.find(p => p.id === postid)

        return (
            <div className='post-list'>
                {/* Display selected post */}
                {post && <Post post={post}
                               vote={fetchData(reqVote, recVote)}
                               del={fetchData(reqDeletePost, recDeletePost)}
                               openEditPost={openEditPost('editPost')}
                            />}

                {/*Display comments for selected post */}
                {post && comments[postid] && <PostList posts={comments[postid]}
                                                       vote={fetchData(reqVote, recVote)}
                                                       del={fetchData(reqDeletePost, recDeletePost)}
                                                       allowSort={false}
                                                       openEditPost={openEditPost('editComment')}
                                                />}

                {/*Display 404 page not found if the post cannot be retrieved */}
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

