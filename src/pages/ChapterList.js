import React, { Component } from "react";
import { Link } from "react-router-dom";
//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { List, Button } from "antd";
import { Statistic } from "antd";

import { storyContract, web3, calculateDeadline } from "../utils/utils";

const { Countdown } = Statistic;

class ChapterList extends Component {
  state = {
    author: "",
    reader: "",
    title: "",
    bookId: "",
    listofChapters: []
  };

  async getAccountDetails() {
    const address = await web3.eth.getAccounts();
    this.setState({ reader: address[0] });
  }

  componentDidMount() {
    //fetch Book Chapters

    const that = this;
    this.getAccountDetails();

    const bookId = this.props.match.params.id;

    storyContract.methods
      .bookIdMapping(bookId)
      .call()
      .then(result => {
        that.setState({
          title: result.name,
          author: result.authorId,
          bookId: result.bookId
        });
      });

    storyContract.methods
      .getAllChapterBooks(bookId)
      .call()
      .then(function(result) {
        const listofChapters = result.map((chapter, index) => {
          return {
            id: chapter.chapterId,
            indexOfChapter: index + 1,
            chapterName: chapter.name,
            isResolved: chapter.isResolved,
            staked: web3.utils.fromWei(chapter.bounty, "ether"),
            creationDate: chapter.creationTime,
            deadline: calculateDeadline(chapter.creationTime)
          };
        });

        that.setState({ listofChapters });
      });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    // console.log(this.state);
    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <PageHeader
          onBack={() => this.goBack()}
          title={this.state.title}
          //   subTitle="This is a subtitle"
        />
        <List
          itemLayout="vertical"
          dataSource={this.state.listofChapters}
          renderItem={chapter => (
            <List.Item style={{ marginLeft: 50, marginRight: 50 }}>
              <List.Item.Meta
                title={
                  <Link to={`/chapter/${this.state.bookId}/${chapter.id}`}>
                    Chapter {chapter.indexOfChapter}: {chapter.chapterName}
                  </Link>
                }
              />
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Prediction Market"
                    value={chapter.isResolved ? "Passed" : "Live"}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Staked" value={`♦ ${chapter.staked}`} />
                </Col>
                <Col span={8}>
                  {chapter.isResolved ? (
                    <Statistic title="Countdown" value={0} />
                  ) : (
                    <Countdown title="Countdown" value={chapter.deadline} />
                  )}
                </Col>
              </Row>
            </List.Item>
          )}
        />

        {this.state.author === this.state.reader ? (
          <Link
            to={`/chapter-publish/${this.state.bookId}`}
            style={{ margin: 50, textAlign: "center" }}
          >
            <Button type="primary">Create a new chapter!</Button>
          </Link>
        ) : null}
      </Layout>
    );
  }
}

export default ChapterList;
