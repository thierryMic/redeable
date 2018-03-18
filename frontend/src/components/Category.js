import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'


/**
* @description renders a Category component
* @description effectively a command button allows the user to filter posts
*/
export const Category = (props) => {
    const { category, filter, active } = props

    return (
        <Route render={({ history }) => {
            return(
                <button className={'button cat-button ' + (active ? 'cat-button-active' : '')}
                        onClick={() => {
                            history.push(`/${category.name}`)
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