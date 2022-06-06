import React, { Component } from "react";
import { Link } from "react-router-dom";

//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { Spin } from "antd";

//Custom Customponents
import BookCard from "../components/BookCard";

//Contracts
import { storyContract } from "../utils/utils";

const bookImages = [
  "https://images-na.ssl-images-amazon.com/images/I/91ocU8970hL.jpg",
  "https://i.harperapps.com/covers/9780062316097/x510.jpg",
  "https://images-na.ssl-images-amazon.com/images/I/71e0msPF7jL.jpg"
];

const RenderBooksCard = ({ listOfBooks }) => {
  return listOfBooks.length === 0 ? (
    <h1>No Books found</h1>
  ) : (
    listOfBooks.map((book, index) => (
      <Col key={book.id} xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 4 }}>
        <Link to={`/chapter-list/${book.id}`}>
          <BookCard title={book.title} image={bookImages[index]} />
        </Link>
      </Col>
    ))
  );
};

class BookList extends Component {
  state = {
    listOfBooks: [],
    loaded: false
  };

  componentDidMount() {
    const that = this;

    storyContract.methods
      .getAllBooks()
      .call()
      .then(function(result) {
        const listOfBooks = result.map(book => {
          return {
            id: book.bookId,
            title: book.name
          };
        });

        that.setState({ listOfBooks, loaded: true });
      });

    // this.setState({ listOfBooks });
  }

  render() {
    // console.log(this.state.listOfBooks);
    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <PageHeader
          title="Book List 📚"
          // subTitle="This is a subtitle"
        />
        <Row gutter={16}>
          {this.state.loaded ? (
            <RenderBooksCard listOfBooks={this.state.listOfBooks} />
          ) : (
            <Col span={24} style={{ textAlign: "center" }}>
              <Spin />
            </Col>
          )}
        </Row>
      </Layout>
    );
  }
}

export default BookList;
