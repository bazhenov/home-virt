import React from "react";
import { List, Skeleton, Button } from "antd";

export class VmList extends React.Component {
  static defaultProps = {
    onVmRun: null
  };

  render() {
    return (
      <List
        dataSource={this.props.vms}
        renderItem={i => (
          <List.Item
            actions={[
              <Button
                type="primary"
                icon="caret-right"
                shape="circle"
                onClick={() => this.props.onVmRun(i)}
              />
            ]}
          >
            <Skeleton title={false} loading={false} active>
              <p className="vm-name">{i.name}</p>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}
