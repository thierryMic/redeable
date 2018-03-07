import React, { Component } from 'react'
import { Post } from '../components/Post'
import PropTypes from 'prop-types'
import { fetchData } from '../actions/actions'
import { requestPosts, receivePosts, requestComments, receiveComments, sortPosts, reqVote, recVote} from '../actions/actions'
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
            fetchData(`posts/${postid}`, requestPosts, receivePosts)
        }

        if (!comments[postid] && !(comments[postid] && comments[postid].isFetching)) {
            fetchData(`posts/${postid}/comments`, requestComments(postid), receiveComments)
        }
    }

    render() {

        const {posts, comments, fetchData, reqVote, recVote} = this.props
        const postid = this.props.match.params.postid
        const post = posts.find(p => p.id === postid)

        return (
            <div>
                {post && <Post post={post}
                               fetchData={fetchData}
                               reqVote={reqVote}
                               recVote={recVote}
                         />}
                {post && comments[postid] && <PostList posts={comments[postid]}
                                                       fetchData={fetchData}
                                                       reqVote={reqVote}
                                                       recVote={recVote}
                                                       allowSort={false} />}
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
        fetchData: (e, i, h, m) => dispatch(fetchData(e, i, h, m)),
        sortPosts: (k) => dispatch(sortPosts(k)),
        reqVote: () => dispatch(reqVote()),
        recVote: (p) => dispatch(recVote(p))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)

