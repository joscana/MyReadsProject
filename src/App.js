import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'

class BooksApp extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    query: ''
  }

  componentDidMount() {
    this.requestBooks()
  }

  requestBooks = () => {
    BooksAPI.getAll()
    .then(response => {
      const currentlyReading = []
      const wantToRead = []
      const read = []
      const allBooks = []

      //filter books
      for (let book of response) {
        allBooks.push(book)
        if(book.shelf === "currentlyReading") {
          currentlyReading.push(book)
        }
        else if(book.shelf === "wantToRead") {
          wantToRead.push(book)
        }
        else if(book.shelf === "read") {
          read.push(book)
        }
      }

      this.setState({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read,
        allBooks: allBooks
      });

    });
  }

  changeShelf = (bookId, shelf) => {
    const book = {id: bookId};
    BooksAPI.update(book, shelf)
    .then( response => {
      this.requestBooks();
    });
  }

  updateQuery = (query) => {
    this.setState(() =>({
      query: query.trim()
  }))
  }

  render() {
   

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                title = "Currently Reading"
                books = {this.state.currentlyReading}
                changeShelf = {this.changeShelf}
              />
              <BookShelf
                title = "Want to Read"
                books = {this.state.wantToRead}
                changeShelf = {this.changeShelf}
              />
              <BookShelf
                title = "Read"
                books = {this.state.read}
                changeShelf = {this.changeShelf}
              />
            </div>

            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
