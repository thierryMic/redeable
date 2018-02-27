import React, { Component } from 'react'

import '../styles/App.css'

import CategoryContainer from '../containers/CategoryContainer'
import PostContainer from '../containers/PostContainer'

class App extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
    }


    render() {
        return (
        <div className="App">
            <CategoryContainer />
            <PostContainer />
        </div>
        )
    }
}



export default App

