import React, { Component } from 'react'

import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestPosts, receivePosts, sortPosts } from '../actions/actions'
import { PostList } from '../components/PostList'


class PostListContainer extends Component {

    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        const { posts, isFetching } = this.props
        if (posts.length === 0 && !isFetching) {
            this.props.fetchData("posts", requestPosts, receivePosts)
        }
    }


    render() {
        const { posts, active, sortPosts } = this.props
        return (
            <PostList
                posts={active === '' ? posts : posts.filter( p => p.category === active)}
                sortPosts={sortPosts}
            />


        )
    }
}


function mapStateToProps (state) {
    return {
        isFetching:state.posts.isFetching,
        posts:state.posts.posts,
        active:state.categories.activeFilter
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        requestPosts: () => dispatch(requestPosts()),
        receivePosts: () => dispatch(receivePosts()),
        fetchData: (e, i, h) => dispatch(fetchData(e, i, h)),
        sortPosts: (k) => dispatch(sortPosts(k))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)

