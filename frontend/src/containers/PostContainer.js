import React, { Component } from 'react'
import { Post } from '../components/Post'
import PropTypes from 'prop-types'
import { fetchData } from '../actions/actions'
import { requestComments, receiveComments, sortPosts} from '../actions/actions'
import { connect } from 'react-redux'
import { PostList } from '../components/PostList'


class PostContainer extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    /**
    * @description - trigger a request comments
    */
    componentDidMount() {
        const { postid } = this.props.match.params
        const { comments, fetchData } = this.props

        if (!comments[postid] && !(comments[postid] && comments[postid].isFetching)) {
            fetchData(`posts/${postid}/comments`, requestComments(postid), receiveComments)
        }
    }

    render() {

        const {posts, comments} = this.props
        const postId = this.props.match.params.postid

        return (
            <div>
                <Post post={posts.find(p => p.id === postId)}/>
                {comments[postId] && <PostList posts={comments[postId]} allowSort={false} />}

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
        requestComments: (id) => dispatch(requestComments(id)),
        receiveComments: () => dispatch(receiveComments()),
        fetchData: (e, i, h) => dispatch(fetchData(e, i, h)),
        sortPosts: (k) => dispatch(sortPosts(k)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)

