import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { receivePosts, receiveCategories } from '../actions/actions'


class App extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        this.props.fetchData("categories", receiveCategories)
        this.props.fetchData("posts", receivePosts)
    }


    render() {
        const {categories, posts} = this.props

        return (
        <div className="App">
            {categories &&
                Object.keys(categories).map ((c) => (
                <li key={c}>{categories[c].name}</li>
            ))}

            {posts &&
                Object.keys(posts).map ((c) => (
                <li key={c}>{posts[c].title}</li>
            ))}
        </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        posts:state.posts,
        categories:state.categories
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        receiveCategories: () => dispatch(receiveCategories()),
        receivePosts: () => dispatch(receivePosts()),
        fetchData: (e, h) => dispatch(fetchData(e, h))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)

