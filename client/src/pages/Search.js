import React, { Component } from "react";
import SearchBar from "../components/SearchBar/index";
import Books from "../components/Books/index";
import API from "../utils/API";
import Button from "../components/Buttons/Save";

const book = require("google-books-search-2");

class App extends Component {
  state = {
    savedBooks: [],
    books: [],
    search: ""
  };

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    book
      .search(this.state.search)
      .then(res => this.setState({ books: res }))
      .catch(error => console.log(error));
  };

  handleSave = book => {
    console.log("test");
    const { thumbnail, title, description, previewLink, authors } = book;

    API.saveBook({
      title: title,
      authors: authors,
      description: description,
      image: thumbnail,
      link: previewLink
    });
  };

  render() {
    const { books } = this.state;
    return (
      <React.Fragment>
        <SearchBar
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        {books.map(b => (
          <React.Fragment>
            <div className="col-md-3">
              <Books
                img={b.thumbnail}
                title={b.title}
                description={b.description}
                link={b.previewLink}
                authors={b.authors}
              />
              <Button handleSave={() => this.handleSave(b)} />
            </div>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default App;
