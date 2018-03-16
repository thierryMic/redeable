import '../styles/App.css'
import React, { Component } from 'react'
import { matchPath } from 'react-router'
import { Route } from 'react-router-dom'
import CategoryContainer from '../containers/CategoryContainer'
import PostListContainer from '../containers/PostListContainer'
import PostContainer from '../containers/PostContainer'
import EditPostContainer from '../containers/EditPostContainer'
import { withRouter } from 'react-router-dom'
import { openEditPost, sortPosts } from '../actions/actions'
import { connect } from 'react-redux'

class App extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
    }

    getPostFromUrl() {
        const url = this.props.history.location.pathname
        const match = matchPath(url, {path: '/:category/:postid', exact: true, strict: false})
        return match === null ? "" : match.params.postid
    }

    handleNew() {
        const newType = this.getPostFromUrl() ? 'Comment' : 'Post'
        this.props.openEditPost(true, {}, `new${newType}`)
    }

    render() {

        return (
        <div className='App'>
            <Route render={( {match} ) => (

                <div className='header'>
                    <span className='title'> Readable </span>
                    <CategoryContainer match={match}/>
                    <button className='button new-button' onClick={() => this.handleNew()}>
                        New {this.getPostFromUrl() ? 'comment' : 'post'}
                    </button>

                    <div className='sort-select'>
                        <label className=''> Sort by:
                            <select className=''
                                    onChange = {(e) => {this.props.sortPosts(e.target.value)}}
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

function mapStateToProps (state) {
    return {
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        openEditPost: (o, p, t) => dispatch(openEditPost(o, p, t)),
        sortPosts: (k) => dispatch(sortPosts(k)),
    }
}

// export default App
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))