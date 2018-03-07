import React, { Component } from 'react'
import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestPosts, receiveAllPosts, sortPosts, reqVote, recVote } from '../actions/actions'
import { PostList } from '../components/PostList'


class PostListContainer extends Component {

    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        const { isFetching, fresh } = this.props
        if (!fresh && !isFetching) {
            this.props.fetchData("posts", requestPosts, receiveAllPosts)
        }
    }


    render() {
        const { posts, active, sortPosts, fetchData, reqVote, recVote } = this.props
        return (
            <PostList
                posts={active === 'All' ? posts : posts.filter( p => p.category === active)}
                sortPosts={sortPosts}
                allowSort={true}
                fetchData={fetchData}
                reqVote={reqVote}
                recVote={recVote}
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
        fetchData: (e, i, h, m) => dispatch(fetchData(e, i, h, m)),
        requestPosts: () => dispatch(requestPosts()),
        receivePosts: () => dispatch(receiveAllPosts()),
        sortPosts: (k) => dispatch(sortPosts(k)),
        reqVote: () => dispatch(reqVote()),
        recVote: (p) => dispatch(recVote(p)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)

