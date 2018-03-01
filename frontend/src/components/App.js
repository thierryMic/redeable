import '../styles/App.css'
import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import CategoryContainer from '../containers/CategoryContainer'
import PostListContainer from '../containers/PostListContainer'
import PostContainer from '../containers/PostContainer'

class App extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
    }


    render() {
        return (
        <div className='App'>

            <Route exact path='/' render={() => (
                <div>
                    <CategoryContainer />
                    <PostListContainer />
                </div>
                )}
            />

            <Route exact path='/post/:postid' component={PostContainer}/>



        </div>
        )
    }
}


export default App

