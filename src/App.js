import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'

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

      //filter books
      for (let book of response) {
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
        read: read
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
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {JSON.stringify(this.state.query)}
                  {/* NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms. */}
                <form>
                <input
                className="search-books"
                type="text" 
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
