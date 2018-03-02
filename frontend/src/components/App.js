import '../styles/App.css'
import React, { Component } from 'react'
import { Route, Redirect} from 'react-router-dom'
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



            <Route exact path='/post/:postid' component={PostContainer}/>

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

