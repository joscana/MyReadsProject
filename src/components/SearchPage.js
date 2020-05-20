import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import * as BooksAPI from '../BooksAPI'


class SearchPage extends Component {
    static propTypes = {

    }
    // updateQuery = (query) => {
    //     this.setState(() =>({
    //         query: query.trim()
    // }))
    // }

    search = (query) => {
        console.log("Function called")
        BooksAPI.search(query)
        .then(response => {
            console.log(response)
        });
    }
    
    render() {
        // const { query } = this.state.query
        // const { books } = this.state.allBooks
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
              <ol className="books-grid"></ol>
            </div>
          </div>

        )
    }
}


export default SearchPage