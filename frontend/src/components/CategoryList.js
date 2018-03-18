import React from 'react'
import PropTypes from 'prop-types'
import { Category } from './Category'

/**
* @description renders a CategoryList component
* @description this is a list of available categories by which the user can filter
*/
export const CategoryList = (props) => {
    const { categories, filter, activeFilter } = props
    return (
        <div className='cat-list'>
            {categories.map( (c) => (
                <Category key={c.name}
                          category={c}
                          filter={filter}
                          active={activeFilter===c.name}
                />))}
        </div>
    )
}

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    filter: PropTypes.func.isRequired,
    activeFilter: PropTypes.string.isRequired
}
