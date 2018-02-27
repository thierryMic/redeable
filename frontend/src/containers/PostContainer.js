import React, { Component } from 'react'

import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { receivePosts } from '../actions/actions'

import { PostList } from '../components/PostList'


class PostContainer extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        this.props.fetchData("posts", receivePosts)
    }

    render() {

        const { posts, category} = this.props

        return (
            <PostList
                posts={category === '' ? posts : posts.filter( p => p.category === category)}
            />
        )
    }
}


function mapStateToProps (state) {
    return {
        posts:state.posts,
        category:state.categories.activeFilter
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        receivePosts: () => dispatch(receivePosts()),
        fetchData: (e, h) => dispatch(fetchData(e, h))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)

