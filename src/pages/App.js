import React, { Component } from "react";
import "../assets/css/App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BookList from "./BookList";
import PublishingMode from "./PublishingMode";
import PublishingModeChapter from "./PublishingModeChapter";
import ChapterList from "./ChapterList";
import SpecificChapterView from "./SpecificChapterView";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header className="header">
            <Link to={"/"}>
              <div className="logo">Dabble</div>
            </Link>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to={"/book-publish"}>Publish a book!</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "50px 50px" }}>
            <Route path="/" exact component={BookList} />
            <Route path="/chapter-list/:id" component={ChapterList} />
            <Route
              path="/chapter/:bookId/:chapterId"
              component={SpecificChapterView}
            />
            <Route path="/book-publish" component={PublishingMode} />
            <Route
              path="/chapter-publish/:bookId"
              component={PublishingModeChapter}
            />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Built on Matic & Ethereum with ❤
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
