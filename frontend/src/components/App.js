import '../styles/App.css'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryContainer from '../containers/CategoryContainer'
import PostListContainer from '../containers/PostListContainer'
import PostContainer from '../containers/PostContainer'
import EditPostContainer from '../containers/EditPostContainer'
import { withRouter } from 'react-router-dom'

class App extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
    }

    render() {
        return (
        <div className='App'>

            <EditPostContainer />

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

// function mapStateToProps (state) {
//     return {
//     }

// }

// function mapDispatchToProps(dispatch)  {
//     return {
//         editPostOn: () => dispatch(editPostOn()),
//     }
// }



// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
export default App