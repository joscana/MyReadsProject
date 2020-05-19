import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

}

export default BookShelf