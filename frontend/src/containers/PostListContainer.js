import React, { Component } from 'react'

import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestPosts, receivePosts } from '../actions/actions'
import { PostList } from '../components/PostList'
import { withRouter } from 'react-router-dom'

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
        const { posts, active} = this.props
        return (
            <PostList
                posts={active === '' ? posts : posts.filter( p => p.category === active)}
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
        fetchData: (e, i, h) => dispatch(fetchData(e, i, h))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostListContainer))

