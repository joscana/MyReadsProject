import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'



class Book extends Component {
    static propTypes = {
        bookId: PropTypes.string.isRequired,
        coverURL: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array,
        onShelfChanged: PropTypes.func.isRequired,
        bookShelf: PropTypes.string.isRequired
    }
    
    changeShelf = (event) => {
        const shelf = event.target.value;
            const book = {id: this.props.bookId};
            BooksAPI.update(book, shelf)
            .then( response => {
              this.props.onShelfChanged();
            })
        }

    render() {
        return(
        <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.coverURL})`}}></div>
          <div className="book-shelf-changer">
            <select onChange={this.changeShelf} defaultValue = {this.props.bookShelf}> 
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
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