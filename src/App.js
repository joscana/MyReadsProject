import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }
  state = {
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
        read: read,
      });

    });
  }



  render() {
   

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf
              title = "Currently Reading"
              books = {this.state.currentlyReading}
              onShelfChanged = {this.requestBooks}
            />
            <BookShelf
              title = "Want to Read"
              books = {this.state.wantToRead}
              onShelfChanged = {this.requestBooks}
            />
            <BookShelf
              title = "Read"
              books = {this.state.read}
              onShelfChanged = {this.requestBooks}
            />
          </div>
          <Link
            to='/search'
            className='open-search'
            >
              Add a book
          </Link>
        </div>
      )} />
      <Route path='/search' component={SearchPage} />
          
      </div>
    )
  }
}

export default BooksApp
