import '../styles/App.css'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryContainer from '../containers/CategoryContainer'
import PostListContainer from '../containers/PostListContainer'
import PostContainer from '../containers/PostContainer'
import EditPostContainer from '../containers/EditPostContainer'
import { withRouter } from 'react-router-dom'
import { openEditPost } from '../actions/actions'
import { connect } from 'react-redux'

class App extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
    }


    render() {
        const newType = this.props.match.params.postid ? 'Comment' : 'Post'
        return (
        <div className='App'>
            <Route render={( {match} ) => (

                <div className='header'>
                    <span className='title'> Readable </span>
                    <CategoryContainer match={match}/>
                    <button className='button new-button'
                            onClick={() => {this.props.openEditPost(true, {}, `new${newType}`)}}
                    >
                        New {newType}
                    </button>
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
    }
}

// export default App
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))