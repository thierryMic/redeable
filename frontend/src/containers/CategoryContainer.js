import React, { Component } from 'react'

import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { requestCategories, receiveCategories, filterCategories} from '../actions/actions'

import { CategoryList } from '../components/CategoryList'


class CategoryContainer extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        const { categories, isFetching } = this.props
        if (categories.length === 0 && !isFetching) {
            this.props.fetchData("categories", requestCategories, receiveCategories)
        }
    }


    render() {
        const { categories, filterCategories, activeFilter } = this.props

        return (
            <CategoryList categories={categories}
                          filter={filterCategories}
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
        requestCategories: () => dispatch(requestCategories()),
        receiveCategories: () => dispatch(receiveCategories()),
        filterCategories: (id) => dispatch(filterCategories(id)),
        fetchData: (e, i, h) => dispatch(fetchData(e, i, h))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)

