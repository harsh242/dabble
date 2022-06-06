import React from "react";
import { Link } from "react-router-dom";

//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";

import { Input, Button } from "antd";
import { Form, InputNumber, Radio, Result } from "antd";
import { storyContract, web3 } from "../utils/utils";

const { TextArea } = Input;

class PublishingModeChapter extends React.Component {
  state = {
    author: "",
    bookTitle: "",
    bookId: "",
    submittedEntry: false
  };

  async componentDidMount() {
    const that = this;
    const { bookId } = this.props.match.params;

    await this.getAccountDetails();

    storyContract.methods
      .bookIdMapping(bookId)
      .call()
      .then(result => {
        console.log(result);
        that.setState({
          bookTitle: result.name,
          author: result.authorId,
          bookId: result.bookId
        });
      });
  }

  async getAccountDetails() {
    const address = await web3.eth.getAccounts();
    this.setState({ author: address[0] });
  }

  handleSubmit = e => {
    e.preventDefault();

    const that = this;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          chapterTitle,
          content,
          question,
          stakedAmount,
          authorPreference
        } = values;

        const userAccount = this.state.author;

        storyContract.methods
          .createChapter(
            parseInt(this.state.bookId),
            chapterTitle,
            content,
            question,
            authorPreference,
            ""
          )
          .send({
            from: userAccount,
            value: web3.utils.toWei(stakedAmount.toString(), "ether")
          })
          .then(function(reciept) {
            // console.log(reciept);
            that.setState({ submittedEntry: true });
          });
      }
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    console.log(this.state);
    // console.log(this.props.match.params);

    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        {this.state.submittedEntry ? (
          <Result
            status="success"
            title="Successfully submitted your next chapter to the blockchain!"
            subTitle="Strap in for the feedback!"
            extra={[
              <Link to={"/"}>
                <Button type="primary" key="console">
                  Read all member stories
                </Button>
              </Link>
            ]}
          />
        ) : (
          <>
            <Row>
              <Col span={24}>
                <PageHeader
                  onBack={() => this.goBack()}
                  title="Write your next chapter:"
                />
              </Col>
            </Row>
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
              <Form.Item label="Book's title: ">
                {this.state.bookTitle}
              </Form.Item>
              <Form.Item label="Enter chapter's title: ">
                {getFieldDecorator("chapterTitle", {
                  rules: [
                    {
                      type: "string",
                      message: ""
                    },
                    {
                      required: true,
                      message: "Please input chapter's name!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Enter chapter's content: ">
                {getFieldDecorator("content", {
                  rules: [
                    {
                      type: "string",
                      message: ""
                    },
                    {
                      required: true,
                      message: "Please input chapter's content!"
                    }
                  ]
                })(<TextArea rows={4} />)}
              </Form.Item>
              <Form.Item label="Enter your followup question: ">
                {getFieldDecorator("question", {
                  rules: [
                    {
                      type: "string",
                      message: ""
                    },
                    {
                      required: true,
                      message: "Please input your followup question!"
                    }
                  ]
                })(
                  <Input
                    style={{ width: "50%", marginRight: 20 }}
                    placeholder="Example: Should I kill Harry"
                  />
                )}
                <span className="ant-form-text"> in the next chapter?</span>
              </Form.Item>

              <Form.Item label="Your skin in the game to incentivize feedback">
                {getFieldDecorator("stakedAmount", {
                  initialValue: 3,
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input staking amount. Life is no free ride!"
                    }
                  ]
                })(<InputNumber />)}
                <span className="ant-form-text"> ETH</span>
              </Form.Item>
              <Form.Item label="In case of tie, your preference">
                {getFieldDecorator("authorPreference")(
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                )}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Layout>
    );
  }
}

const WrappedPublishingModeChapter = Form.create({ name: "register" })(
  PublishingModeChapter
);

export default WrappedPublishingModeChapter;
