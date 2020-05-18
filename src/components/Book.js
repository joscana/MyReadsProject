import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Book extends Component {
    static propTypes = {
        bookId: PropTypes.string.isRequired,
        coverURL: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired,
        bookShelf: PropTypes.string.isRequired
    }
    
    changeShelf = (event) => {
        const shelf = event.target.value;
        this.props.changeShelf(this.props.bookId, shelf);
    }

    render() {
        return(
        <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.coverURL})`}}></div>
          <div className="book-shelf-changer">
            <select onChange={this.changeShelf}> 
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading" selected={this.props.bookShelf === "currentlyReading"}>Currently Reading</option>
              <option value="wantToRead" selected= {this.props.bookShelf ==="wantToRead"}>Want to Read</option>
              <option value="read" selected={this.props.bookShelf === "read"}>Read</option>
              <option value="none" selected={this.props.bookShelf === "none"}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join()}</div>
      </div>
        )
    }
}

export default Book