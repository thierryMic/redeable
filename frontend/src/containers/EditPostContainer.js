import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EditPost } from '../components/EditPost'
import { openEditPost } from '../actions/actions'

class EditPostContainer extends Component {

    static propTypes = {
        editPostOn: PropTypes.func
    }

    /**
    * @description - trigger a request comments
    */
    componentWillMount() {
    }

    render() {
        const { openEditPost, isOpen } = this.props
        return (
            <div>
                <button className='' onClick={() => {openEditPost(true)}}>New post</button>
                <EditPost isOpen={isOpen} openEditPost={openEditPost}/>
            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        isOpen: state.app.editPostOpen
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        openEditPost: (o) => dispatch(openEditPost(o)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPostContainer)

