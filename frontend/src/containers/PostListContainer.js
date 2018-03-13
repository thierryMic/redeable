import React, { Component } from 'react'
import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestPosts, receiveAllPosts, sortPosts, reqVote, recVote, openEditPost } from '../actions/actions'
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
        const { posts, active, sortPosts, fetchData, reqVote, recVote, openEditPost } = this.props
        return (
            <PostList
                posts={active === 'All' ? posts : posts.filter( p => p.category === active)}
                sortPosts={sortPosts}
                allowSort={true}
                fetchData={fetchData(reqVote, recVote)}
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
        openEditPost: t => (o, p) =>  dispatch(openEditPost(o, p, t)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)

