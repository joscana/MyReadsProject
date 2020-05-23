import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }




    render() {
        const books = []
        for (let book of this.props.books) {
            books.push(
            <li key={book.id}> 
                <Book
                    bookId = {book.id}
                    coverURL= {book.imageLinks.thumbnail}
                    title = {book.title}
                    authors = {book.authors}
                    bookShelf = { !book.shelf ? 'none': book.shelf }
                    changeShelf = {this.props.changeShelf}
                    />
            </li>)
        }

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books}
                </ol>
                </div>
            </div>
        )
    }

}

export default BookShelf