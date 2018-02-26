import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { receivePosts } from '../actions/actions'


class App extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        this.props.fetchData("categories")
    }


    render() {
        const {categories} = this.props

        return (
        <div className="App">
            {categories && Object.keys(categories).map ((c) => (
                <li key={c}>{categories[c].name}</li>
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
        receivePosts: () => dispatch(receivePosts),
        fetchData: (e) => dispatch(fetchData(e))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)

