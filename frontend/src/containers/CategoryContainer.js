import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestCategories, receiveCategories, filterCategories} from '../actions/actions'

import { CategoryList } from '../components/CategoryList'
import { withRouter } from 'react-router-dom'

import { matchPath } from 'react-router'

class CategoryContainer extends Component {


    getCategoryFromUrl = (url) => {
        const match = matchPath(url, {path: '/:category', exact: true, strict: false})
        return match === null ? "" : match.params.category
    }

    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        const {categories, isFetching, filterCategories, match, history, activeFilter} = this.props
        if (categories.length === 0 && !isFetching) {
            this.props.fetchData("categories", requestCategories, receiveCategories)
            filterCategories(match.params.category || "")
        }

        window.onpopstate = () => {
            const newFilter = this.getCategoryFromUrl(history.location.pathname)
            newFilter != this.props.activeFilter ? filterCategories(newFilter) : null
        }
    }


    componentWillUnmount () {
        window.onpopstate = () => {}
    }



    render() {
        const { categories, filterCategories, match, activeFilter } = this.props

        return (
            <CategoryList categories={categories}
                          match={match}
                          filter={filterCategories}
                          activeFilter={match.params.category || ""}/>
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
        requestCategories: () => dispatch(requestCategories()),
        receiveCategories: () => dispatch(receiveCategories()),
        filterCategories: (id) => dispatch(filterCategories(id)),
        fetchData: (e, i, h) => dispatch(fetchData(e, i, h))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryContainer))

