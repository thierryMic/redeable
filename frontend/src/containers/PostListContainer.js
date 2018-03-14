import React, { Component } from 'react'
import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestPosts, receiveAllPosts, sortPosts, reqVote, recVote,
         openEditPost, reqDeletePost, recDeletePost } from '../actions/actions'
import { PostList } from '../components/PostList'


class PostListContainer extends Component {

    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        const { isFetching, fresh, fetchData} = this.props
        if (!fresh && !isFetching) {
            fetchData(requestPosts, receiveAllPosts)("posts")
        }
    }


    render() {
        const { posts, active, sortPosts, fetchData, reqVote, recVote, openEditPost,
                reqDeletePost, recDeletePost} = this.props
        return (
            <PostList
                posts={active === 'All' ? posts : posts.filter( p => p.category === active)}
                sortPosts={sortPosts}
                allowSort={true}
                vote={fetchData(reqVote, recVote)}
                del={fetchData(reqDeletePost, recDeletePost)}
                openEditPost={openEditPost('editPost')}
            />


        )
    }
}


function mapStateToProps (state) {
    return {
        isFetching:state.posts.isFetching,
        posts:state.posts.posts,
        active:state.categories.activeFilter,
        fresh:state.posts.fresh
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        fetchData: (i, h) => (e, m) => dispatch(fetchData(e, i, h, m)),
        requestPosts: () => dispatch(requestPosts()),
        receivePosts: () => dispatch(receiveAllPosts()),
        sortPosts: (k) => dispatch(sortPosts(k)),
        reqVote: () => dispatch(reqVote()),
        recVote: (p) => dispatch(recVote(p)),
        reqDeletePost: () => dispatch(reqDeletePost()),
        recDeletePost: (p) => dispatch(recDeletePost(p)),
        openEditPost: t => (o, p) =>  dispatch(openEditPost(o, p, t)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)

