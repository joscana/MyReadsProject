import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Book extends Component {
    static propTypes = {
        coverURL: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    }
    state = {
        bookshelf: 'None'
    }
    render() {
        return(
        <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.coverURL})`}}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
        )
    }
}

export default Book