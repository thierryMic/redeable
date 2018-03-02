import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

/**
* @description Represents a category item
*/


export const Category = (props) => {

    const { category, filter, active } = props

    return (
        <Route render={({ history }) => {
            return(
                <button className={active ? 'category-button-active' : 'category-button'}
                        onClick={() => {
                            history.push(active ? '/' : `/${category.name}`)
                            filter(category.name)
                        }}
                >
                	{category.name}
                </button>
        )}}/>
    )
}

Category.propTypes = {
    category: PropTypes.object.isRequired,
    filter: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
}