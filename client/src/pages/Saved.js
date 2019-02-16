import React, { Component } from "react";
import API from "../utils/API";
import Delete from "../components/Buttons/Delete";

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.savedBooks();
    console.log(this.state.books);
  }

  savedBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    console.log("clicked");
    API.deleteBook(id)
      .then(res => this.savedBooks())
      .catch(err => console.log(err));
  };

  render() {
    const { books } = this.state;
    return (
      <React.Fragment>
        {/* {books.map(b => (
          <React.Fragment>
            <Books
              id={b._id}
              key={b._id}
              title={b.title}
              description={b.description}
              link={b.previewLink}
              img={b.image}
              authors={b.authors}
            />
            <Delete handleDelete={() => this.handleDelete(b._id)} />
          </React.Fragment>
        ))} */}
      </React.Fragment>
    );
  }
}

export default Saved;
