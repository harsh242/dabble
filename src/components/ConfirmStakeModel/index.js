import React from "react";

import { Modal, Button } from "antd";
import { Statistic } from "antd";
import { Row, Col } from "antd";

class ConfirmStakeModel extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    // console.log(e);
    this.props.updateReaderIncentivizationProcessStatus(true);
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="danger" onClick={this.showModal}>
          Confirm Stake!
        </Button>
        <Modal
          title="Confirm Staking Details:"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Staked On"
                value={this.props.stakedOn ? "Yes" : "No"}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Staked Amount"
                value={`$${this.props.stakedAmount}`}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default ConfirmStakeModel;
