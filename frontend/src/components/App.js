import '../styles/App.css'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
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

            <Route exact path='/:category/:postid' render={( {match} ) => (
                <div>
                    <CategoryContainer match={match}/>
                    <PostContainer match={match} />
                </div>
                )}
            />

            <Route exact path='/:category?' render={( {match} ) => (
                <div>
                    <CategoryContainer match={match}/>
                    <PostListContainer />
                </div>
                )}
            />

        </div>
        )
    }
}


export default App

