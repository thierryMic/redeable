import React, { Component } from 'react'

import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestPosts, receiveAllPosts, sortPosts } from '../actions/actions'
import { PostList } from '../components/PostList'


class PostListContainer extends Component {

    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        const { posts, isFetching, fresh } = this.props
        if (!fresh && !isFetching) {
            this.props.fetchData("posts", requestPosts, receiveAllPosts)
        }
    }


    render() {
        const { posts, active, sortPosts } = this.props
        return (
            <PostList
                posts={active === '' ? posts : posts.filter( p => p.category === active)}
                sortPosts={sortPosts}
                allowSort={true}
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
        fetchData: (e, i, h) => dispatch(fetchData(e, i, h)),
        requestPosts: () => dispatch(requestPosts()),
        receivePosts: () => dispatch(receiveAllPosts()),
        sortPosts: (k) => dispatch(sortPosts(k)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)

