import React, { Component } from "react";

//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { Statistic } from "antd";
import { Typography, Divider } from "antd";
import { Button } from "antd";

//Internal Components

import EnterStakingAmount from "../components/EnterStakingAmount";
import ConfirmStakeModel from "../components/ConfirmStakeModel";

//Contract
import { storyContract, web3, calculateDeadline } from "../utils/utils";

const { Paragraph, Title, Text } = Typography;
const { Countdown } = Statistic;
const ButtonGroup = Button.Group;

class MarketResolvedPanel extends Component {
  state = {
    author: "",
    myVote: false,
    communityVote: false,
    myWinnings: 0,
    maxWinnings: 0
  };

  async getAccountDetails() {
    const address = await web3.eth.getAccounts();
    this.setState({ author: address[0] });
  }

  async componentDidMount() {
    //fetch Book Chapters
    const that = this;

    await this.getAccountDetails;

    storyContract.methods
      .getIndividualEarning(this.props.chapterId)
      .call({ from: this.props.reader })
      .then(resolution => {
        console.log(resolution);

        const myVote = resolution.castedVote;
        const communityVote = resolution.winning_status ? myVote : !myVote;
        const myWinnings = web3.utils.fromWei(resolution.amountStaked, "ether");
        const maxWinnings = web3.utils.fromWei(resolution.maxPayment, "ether");

        that.setState({ myVote, communityVote, myWinnings, maxWinnings });
      });
  }

  render() {
    console.log(this.state);
    return (
      <Row gutter={16}>
        <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
          <Typography>
            <Title level={4}>{this.props.question} in the next chapter?</Title>
          </Typography>
        </Col>
        <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
          <Statistic
            title="Your Vote"
            value={this.state.myVote ? "Yes" : "No"}
          />
        </Col>
        <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
          <Statistic
            title="Community Vote"
            value={this.state.communityVote ? "Yes" : "No"}
          />
        </Col>
        <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
          <Statistic
            title="Your Winnings"
            value={`ETH ${this.state.myWinnings}`}
          />
        </Col>
        <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
          <Statistic
            title="Community Winnings"
            value={`ETH ${this.state.maxWinnings}`}
          />
        </Col>
      </Row>
    );
  }
}

const StakingInterface = ({
  stakedOn,
  updateStakeStatus,
  updateStakingAmount,
  stakedAmount,
  updateReaderIncentivizationProcessStatus
}) => (
  <>
    <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
      <ButtonGroup>
        <Button
          type={stakedOn ? "primary" : ""}
          onClick={() => updateStakeStatus(true)}
        >
          Yes
        </Button>
        <Button
          type={stakedOn ? "" : "primary"}
          onClick={() => updateStakeStatus(false)}
        >
          No
        </Button>
      </ButtonGroup>
    </Col>
    <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
      <EnterStakingAmount
        updateStakingAmount={updateStakingAmount}
        stakedAmount={stakedAmount}
      />
    </Col>
    <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
      <ConfirmStakeModel
        stakedOn={stakedOn}
        stakedAmount={stakedAmount}
        updateReaderIncentivizationProcessStatus={
          updateReaderIncentivizationProcessStatus
        }
      />
    </Col>
  </>
);

const StakingFinishedInterace = ({ deadlineStatus, resolveTheMarket }) => {
  return deadlineStatus ? (
    <Button type="primary" onClick={resolveTheMarket}>
      Claim Rewards
    </Button>
  ) : (
    <h1>Thank you for voting!</h1>
  );
};

const StakingPanel = ({
  question,
  stakedOn,
  updateStakeStatus,
  updateStakingAmount,
  stakedAmount,
  isReaderIncentivizationProcessFinished,
  updateReaderIncentivizationProcessStatus,
  deadlineStatus,
  resolveTheMarket
}) => {
  return (
    <>
      <Col span={24}>
        <Typography style={{ textAlign: "center" }}>
          <Text strong>Enjoyed Reading? Decide what’s next</Text>
        </Typography>
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Typography>
          <Title level={4}>{question} in the next chapter?</Title>
        </Typography>
      </Col>
      {isReaderIncentivizationProcessFinished ? (
        <StakingFinishedInterace
          deadlineStatus={deadlineStatus}
          resolveTheMarket={resolveTheMarket}
        />
      ) : (
        <StakingInterface
          stakedOn={stakedOn}
          updateStakeStatus={updateStakeStatus}
          updateStakingAmount={updateStakingAmount}
          stakedAmount={stakedAmount}
          updateReaderIncentivizationProcessStatus={
            updateReaderIncentivizationProcessStatus
          }
        />
      )}
    </>
  );
};

const UpdateReadingPanel = ({ updateReadStatus }) => {
  return (
    <>
      <Col span={24}>
        <Typography style={{ textAlign: "center" }}>
          <Text strong>
            Finished reading?
            <br />
            Author is giving rewards if you confirm on chain!
          </Text>
        </Typography>
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Button type="primary" onClick={() => updateReadStatus()}>
          Lol, What?
        </Button>
      </Col>
    </>
  );
};

const IncentivizeReadersPanel = ({
  deadline,
  readingStatus,
  updateReadStatus,
  question,
  stakedOn,
  updateStakeStatus,
  stakedAmount,
  updateStakingAmount,
  isReaderIncentivizationProcessFinished,
  updateReaderIncentivizationProcessStatus,
  deadlineStatus,
  updateDeadlineStatus,
  resolveTheMarket
}) => {
  const showReaderApproriatePanel = readingStatus ? (
    <StakingPanel
      question={question}
      stakedOn={stakedOn}
      updateStakeStatus={updateStakeStatus}
      stakedAmount={stakedAmount}
      updateStakingAmount={updateStakingAmount}
      isReaderIncentivizationProcessFinished={
        isReaderIncentivizationProcessFinished
      }
      updateReaderIncentivizationProcessStatus={
        updateReaderIncentivizationProcessStatus
      }
      deadlineStatus={deadlineStatus}
      resolveTheMarket={resolveTheMarket}
    />
  ) : (
    <UpdateReadingPanel updateReadStatus={updateReadStatus} />
  );

  return (
    <Row gutter={16}>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        {showReaderApproriatePanel}
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Countdown
          title="Time Remaining"
          value={deadline}
          onFinish={updateDeadlineStatus}
        />
      </Col>
    </Row>
  );
};

const AuthorStatusPanel = ({ deadline, question, resolveTheMarket }) => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Typography style={{ textAlign: "center" }}>
          <Text strong>Voting under way!</Text>
        </Typography>
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Typography>
          <Title level={4}>{question} in the next chapter?</Title>
        </Typography>
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Countdown title="Time Remaining" value={deadline} />
      </Col>
    </Row>
  );
};

class SpecificChapterView extends Component {
  state = {
    book: {
      id: "",
      title: "",
      author: ""
    },
    chapter: {
      id: "",
      title: "",
      content: "",
      isResolved: false,
      question: "",
      creationTime: "",
      deadline: ""
    },
    reader: {
      account: "",
      isRead: false,
      stakedOn: true,
      stakedAmount: 0,
      incentivizingProcessFinished: false
    },
    statusCheck: {
      readCheck: false,
      votedCheck: false
    },
    deadlineFinished: false,
    resolutionDetails: {}
  };

  async getAccountDetails() {
    const address = await web3.eth.getAccounts();
    this.setState(prevState => ({
      ...prevState,
      reader: {
        ...prevState.reader,
        account: address[0]
      }
    }));
  }

  async componentDidMount() {
    //fetch Book Chapters
    const that = this;

    const chapterId = this.props.match.params.chapterId;

    await this.getAccountDetails();

    storyContract.methods
      .ChapterMapping(chapterId)
      .call()
      .then(chapter => {
        const bookDetails = {
          id: chapter.bookId
        };

        const chapterDetails = {
          id: chapterId,
          indexOfChapter: parseInt(chapterId) + 1,
          title: chapter.name,
          content: chapter.content,
          isResolved: chapter.isResolved,
          staked: web3.utils.fromWei(chapter.bounty, "ether"),
          question: chapter.question,
          creationTime: chapter.creationTime,
          deadline: calculateDeadline(chapter.creationTime)
        };

        that.setState(prevState => ({
          ...prevState,
          book: { ...bookDetails },
          chapter: { ...chapterDetails }
        }));
      });

    storyContract.methods
      .hasRead(chapterId)
      .call({ from: this.state.reader.account })
      .then(result => {
        that.setState(prevState => ({
          ...prevState,
          reader: {
            ...prevState.reader,
            isRead: result
          },
          statusCheck: {
            ...prevState.statusCheck,
            readCheck: true
          }
        }));
      });

    storyContract.methods
      .hasVoted(chapterId)
      .call({ from: this.state.reader.account })
      .then(result => {
        that.setState(prevState => ({
          ...prevState,
          reader: {
            ...prevState.reader,
            incentivizingProcessFinished: result
          },
          statusCheck: {
            ...prevState.statusCheck,
            votedCheck: true
          }
        }));
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.book.id !== this.state.book.id) {
      const that = this;
      storyContract.methods
        .bookIdMapping(this.state.book.id)
        .call()
        .then(result => {
          // console.log(result);
          that.setState(prevState => ({
            ...prevState,
            book: {
              ...prevState.book,
              title: result.name,
              author: result.authorId
            }
          }));
        });
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  updateReadStatus = () => {
    const that = this;
    const chapterId = this.state.chapter.id;
    const userAccount = this.state.reader.account;

    storyContract.methods
      .readChapter(chapterId)
      .send({
        from: userAccount
      })
      .then(function(receipt) {
        // console.log(receipt);
        that.setState(prevState => ({
          ...prevState,
          reader: {
            ...prevState.reader,
            isRead: true
          }
        }));
      });
  };

  updateStakeStatus = clickedOn => {
    // console.log(clickedOn);
    this.setState(prevState => ({
      ...prevState,
      reader: {
        ...prevState.reader,
        stakedOn: clickedOn
      }
    }));
    // this.setState({ stakedOn: clickedOn });
  };

  updateStakingAmount = amount => {
    console.log(amount);
    this.setState(prevState => ({
      ...prevState,
      reader: {
        ...prevState.reader,
        stakedAmount: amount
      }
    }));
  };

  updateReaderIncentivizationProcessStatus = status => {
    //Do Payment

    const that = this;

    console.log(this.state);

    const chapterId = this.state.chapter.id;
    const vote = this.state.reader.stakedOn;
    const amountStakedOnVote = this.state.reader.stakedAmount;
    const userAccount = this.state.reader.account;

    storyContract.methods
      .voteForFollowup(chapterId, vote)
      .send({
        from: userAccount,
        value: web3.utils.toWei(amountStakedOnVote, "ether")
      })
      .then(function(receipt) {
        console.log(receipt);

        that.setState(prevState => ({
          ...prevState,
          reader: {
            ...prevState.reader,
            incentivizingProcessFinished: status
          }
        }));
      });
  };

  renderIncentivedReadingPanel = () => {
    if (this.state.book.author === this.state.reader.account) {
      return (
        <AuthorStatusPanel
          deadline={this.state.chapter.deadline}
          question={this.state.chapter.question}
          resolveTheMarket={this.resolveTheMarket}
        />
      );
    } else {
      if (
        this.state.statusCheck.readCheck === true &&
        this.state.statusCheck.votedCheck === true
      ) {
        return (
          <IncentivizeReadersPanel
            readingStatus={this.state.reader.isRead}
            updateReadStatus={this.updateReadStatus}
            question={this.state.chapter.question}
            stakedOn={this.state.reader.stakedOn}
            updateStakeStatus={this.updateStakeStatus} // Voted on Yes or No
            stakedAmount={this.state.reader.stakedAmount}
            updateStakingAmount={this.updateStakingAmount}
            isReaderIncentivizationProcessFinished={
              this.state.reader.incentivizingProcessFinished
            } //Has the user voted or not
            updateReaderIncentivizationProcessStatus={
              this.updateReaderIncentivizationProcessStatus
            }
            deadline={this.state.chapter.deadline}
            deadlineStatus={this.state.deadlineFinished}
            updateDeadlineStatus={this.updateDeadlineStatus}
            resolveTheMarket={this.resolveTheMarket}
          />
        );
      }
    }
  };

  updateDeadlineStatus = () => {
    this.setState({ deadlineFinished: true });
  };

  resolveTheMarket = () => {
    //Market resolved

    const chapterId = this.state.chapter.id;
    const userAccount = this.state.reader.account;

    storyContract.methods
      .payReaders(chapterId)
      .send({
        from: userAccount
      })
      .then(function(receipt) {
        console.log(receipt);
        //Readers incentivized for reading
        storyContract.methods
          .makePayemntOnConsensus(chapterId)
          .send({
            from: userAccount
          })
          .then(function(receipt) {
            //Readers incentivized for voting
            console.log(receipt);
          });
      });
  };

  render() {
    console.log(this.state);
    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <Row>
          <Col span={24}>
            <PageHeader
              onBack={() => this.goBack()}
              title={this.state.book.title}
              subTitle={`Chapter ${this.state.chapter.indexOfChapter}:${
                this.state.chapter.title
              } `}
            />
          </Col>
        </Row>

        <Divider />
        <Row>
          <Col span={24} style={{ marginBottom: 20 }}>
            <Typography>
              <Paragraph>{this.state.chapter.content}</Paragraph>
            </Typography>
          </Col>
          <Divider />
        </Row>

        {/* Prediction Market True == Incentivizing Panel, False === Resolution Panel */}

        {this.state.chapter.isResolved ? (
          <MarketResolvedPanel
            question={this.state.question}
            chapterId={this.state.chapter.id}
            reader={this.state.reader.account}
            // resolutionDetails={this.state.resolutionDetails}
          />
        ) : (
          this.renderIncentivedReadingPanel()
        )}
      </Layout>
    );
  }
}

export default SpecificChapterView;
