import '../styles/App.css'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryContainer from '../containers/CategoryContainer'
import PostListContainer from '../containers/PostListContainer'
import PostContainer from '../containers/PostContainer'
import EditPostContainer from '../containers/EditPostContainer'


class App extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
    }

    render() {
        return (
        <div className='App'>
            <Route render={( {match} ) => (
                <div className='header'>
                    <span className='title'> Readable </span>
                    <CategoryContainer match={match}/>
                </div>
                )}
            />

            <Route exact path='/:category/:postid' render={( {match} ) => (
                <div className='container'>
                    <EditPostContainer />
                    <PostContainer match={match} />
                </div>
                )}
            />

            <Route exact path='/:category?' render={( {match} ) => (
                <div className='container'>
                    <EditPostContainer />
                    <PostListContainer />
                </div>
                )}
            />
        </div>
        )
    }
}

export default App