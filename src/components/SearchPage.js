import React, { Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'




class SearchPage extends Component {

    state = {
        books: []
    }

    search = (query) => {

        if(query === '') {
            this.setState({
                books: []
            });
            return;
        }

        BooksAPI.search(query)
        .then(response => {
            console.log(response)

            if(response.error) {
                this.setState({
                    books: []
                });
                return;
            }

            const books = []
            for (let book of response) {
                if (book.imageLinks) {
                    if (!book.authors) {
                        book.authors = []
                    }
                    books.push(book)
                }
            }
            this.setState({
                books: books
            })
        });
    }
    
    render() {

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
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
                onChange={(event) => this.search(event.target.value)}
                />
                </form>
              </div>
            </div>
            <div className="search-books-results">
                <BookShelf
                    title = "Results"
                    books = {this.state.books}
                    changeShelf = {Book.changeShelf}
                />
            </div>
          </div>

        )
    }
}


export default SearchPage