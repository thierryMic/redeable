import React from 'react'
import PropTypes from 'prop-types'
import { Category } from './Category'

/**
* @description Represents a category list
*/
export const CategoryList = (props) => {

    const { categories, filter, activeFilter } = props
    return (
        <div>
            {categories.map( (c) => (
                <Category key={c.name} category={c} filter={filter} active={activeFilter===c.name}/>
                ))}
        </div>
    )
}

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    filter: PropTypes.func.isRequired,
    activeFilter: PropTypes.string.isRequired
}
