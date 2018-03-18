import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { matchPath } from 'react-router'
import { connect } from 'react-redux'
import { fetchData, requestCats, receiveCats, filterCats} from '../actions/actions'
import { CategoryList } from '../components/CategoryList'



/**
* Class representing a category container
* @extends Component
*/
class CategoryContainer extends Component {

    /**
    * @description extracts a postid parameter from the current location's url
    * @returns {string} postid
    */
    getCategoryFromUrl = (url) => {
        const match = matchPath(url, {path: '/:category', exact: true, strict: false})
        return match === null ? "" : match.params.category
    }

  /**
  * @description retrieves available categories from the readable api
  */
    componentDidMount() {
        const { categories, isFetching, filterCats, history, fetchData } = this.props
        if (categories.length === 0 && !isFetching) {
            fetchData("categories")
            filterCats(this.getCategoryFromUrl(history.location.pathname) || "")
        }

        // @listens back and forward browser buttons
        // retrieves category from url and filters posts
        window.onpopstate = () => {
            const newFilter = this.getCategoryFromUrl(history.location.pathname)
            if (newFilter !== this.props.activeFilter ) {
                filterCats(newFilter)
            }
        }
    }

    /**
    * @description removes event listeners
    */
    componentWillUnmount () {
        window.onpopstate = () => {}
    }

    /**
    * @description renders a CategoryContainer component
    */
    render() {
        const { categories, filterCats, activeFilter } = this.props

        return (
            <CategoryList categories={categories}
                          filter={filterCats}
                          activeFilter={activeFilter}/>
        )
    }
}


function mapStateToProps (state) {
    return {
        isFetching:state.categories.isFetching,
        categories:state.categories.categories,
        activeFilter:state.categories.activeFilter
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        requestCats: () => dispatch(requestCats()),
        receiveCats: () => dispatch(receiveCats()),
        filterCats: (id) => dispatch(filterCats(id)),
        fetchData: (e, i, h) => dispatch(fetchData(e, requestCats, receiveCats))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryContainer))

