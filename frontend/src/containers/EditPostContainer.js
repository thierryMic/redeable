import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EditPost } from '../components/EditPost'
import { openEditPost, reqSavePost, recSavePost, fetchData } from '../actions/actions'

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
        const { categories, openEditPost, isOpen, reqSavePost, recSavePost, fetchData } = this.props
        return (
            <div>
                <button className='' onClick={() => {openEditPost(true)}}>New post</button>
                <EditPost isOpen={isOpen}
                          openEditPost={openEditPost}
                          reqSavePost={reqSavePost}
                          recSavePost={recSavePost}
                          fetchData={fetchData}
                          categories={categories}
                />
            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        isOpen: state.app.editPostOpen,
        categories: state.categories.categories
    }
}

function mapDispatchToProps(dispatch)  {
    return {
        openEditPost: (o) => dispatch(openEditPost(o)),
        reqSavePost: () => dispatch(reqSavePost()),
        recSavePost: (p) => dispatch(recSavePost(p)),
        fetchData: (e, i, h, m) => dispatch(fetchData(e, i, h, m))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPostContainer)

