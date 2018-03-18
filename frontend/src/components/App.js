import '../styles/App.css'
import React, { Component } from 'react'
import { matchPath } from 'react-router'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CategoryContainer from '../containers/CategoryContainer'
import PostListContainer from '../containers/PostListContainer'
import PostContainer from '../containers/PostContainer'
import EditPostContainer from '../containers/EditPostContainer'

import { openEditPost, sortPosts } from '../actions/actions'



/**
* Class representing the Readable application
* @extends Component
*/
class App extends Component {

    /**
    * @description extracts a postid parameter from the current location's url
    * @returns {string} postid
    */
    getPostFromUrl() {
        const url = this.props.history.location.pathname
        const match = matchPath(url, {path: '/:category/:postid', exact: true, strict: false})
        return match === null ? "" : match.params.postid
    }


    /**
    * @description opens the editPost modal with the relevant parameters for creating a new post
    * @fires openEditPost action
    */
    handleNew() {
        const newType = this.getPostFromUrl() ? 'Comment' : 'Post'
        this.props.openEditPost(true, {}, `new${newType}`)
    }


  /**
  * @description renders the main page of the Readable application
  */
    render() {
        const {sortPosts} = this.props
        return (
        <div className='App'>
            <Route render={ () => (

                //the header of the application
                //displays the app title, commands for changing categories, commands for sorting
                //and adding posts
                <div className='header'>
                    <span className='title'> Readable </span>

                    <CategoryContainer />

                    <button className='button new-button' onClick={() => this.handleNew()}>
                        New {this.getPostFromUrl() ? 'comment' : 'post'}
                    </button>

                    <div className='sort-select'>
                        <label className=''> Sort by:
                            <select className=''
                                    onChange = {(e, p) => {sortPosts(e.target.value,
                                                           this.getPostFromUrl())}}
                                    defaultValue={process.env.REACT_APP_DEFAULT_SORT}
                            >
                                <option value="voteScore">Votes</option>
                                <option value="commentCount">Comments</option>
                                <option value="timestamp">Date</option>
                            </select>
                        </label>
                    </div>
                </div>
                )}
            />

            {/*displays an individual post and its related coments */}
            <Route exact path='/:category/:postid' render={( {match} ) => (
                <div className='container'>
                    <EditPostContainer />
                    <PostContainer match={match} />
                </div>
                )}
            />

            {/*displays a list of posts for a specific category */}
            <Route exact path='/:category?' render={ () => (
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

function mapStateToProps (state) {
    return {
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        openEditPost: (o, p, t) => dispatch(openEditPost(o, p, t)),
        sortPosts: (k, p) => dispatch(sortPosts(k, p)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))