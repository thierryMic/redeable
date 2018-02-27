import React from 'react'
import PropTypes from 'prop-types'

/**
* @description Represents a category item
*/


export const Category = (props) => {

    const { category, filter, active } = props

    return (
        <button className={active ? 'category-button-active' : 'category-button'}
                onClick={() => filter(category.name)}
        >
        	{category.name}
        </button>
    )
}

Category.propTypes = {
    category: PropTypes.object.isRequired,
    filter: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
}