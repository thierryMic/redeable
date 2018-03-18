import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostList } from '../components/PostList'
import { requestPosts, receiveAllPosts, reqVote, recVote,
         openEditPost, reqDeletePost, recDeletePost, fetchData } from '../actions/actions'


/**
* Class representing the PostListContainer component
* @extends Component
*/
class PostListContainer extends Component {

    /**
    * @description retrieves all posts the api server
    */
    componentDidMount() {
        const { isFetching, fresh, fetchData} = this.props
        if (!fresh && !isFetching) {
            fetchData(requestPosts, receiveAllPosts)("posts")
        }
    }

    /**
    * @description renders a PostListContainer component
    */
    render() {
        const { posts, active, sortPosts, fetchData, reqVote, recVote,
                openEditPost, reqDeletePost, recDeletePost} = this.props

        return (
            //filter posts if a category is chosen otherwise display all post
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
        reqVote: () => dispatch(reqVote()),
        recVote: (p) => dispatch(recVote(p)),
        reqDeletePost: () => dispatch(reqDeletePost()),
        recDeletePost: (p) => dispatch(recDeletePost(p)),
        openEditPost: t => (o, p) =>  dispatch(openEditPost(o, p, t)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)

