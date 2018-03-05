import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestCategories, receiveCategories, filterCategories} from '../actions/actions'

import { CategoryList } from '../components/CategoryList'
import { withRouter } from 'react-router-dom'

class CategoryContainer extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        const { categories, isFetching, filterCategories, match } = this.props
        if (categories.length === 0 && !isFetching) {
            this.props.fetchData("categories", requestCategories, receiveCategories)
        }

        filterCategories(match.params.category || "")

        window.onpopstate = ()=> {
            console.log("Match  :", match)
            console.log("History:", this.props.history)
            filterCategories(match.params.category || "")
            }

    }



    render( ) {
        const { categories, filterCategories, match } = this.props

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

