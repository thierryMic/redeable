import React, { Component } from 'react'

import { fetchData } from '../actions/actions'
import { connect } from 'react-redux'
import { receiveCategories, filterCategories} from '../actions/actions'

import { CategoryList } from '../components/CategoryList'


class CategoryContainer extends Component {


    /**
    * @description - trigger a request action
    */
    componentDidMount() {
        this.props.fetchData("categories", receiveCategories)
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
        categories:state.categories.categories,
        activeFilter:state.categories.activeFilter
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        receiveCategories: () => dispatch(receiveCategories()),
        filterCategories: (id) => dispatch(filterCategories(id)),
        fetchData: (e, h) => dispatch(fetchData(e, h))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)

