import React from "react";
import { List, Skeleton, Button } from "antd";

export class VmList extends React.Component {
  static defaultProps = {
    onVmRun: null
  };

  createListActions(vm) {
    return [<Button type="primary" icon="caret-right" shape="circle" onClick={() => this.props.onVmRun(vm)} />]
  }

  render() {
    return (
      <List
        dataSource={this.props.vms}
        renderItem={vm => (
          <List.Item actions={this.createListActions(vm)}>
            <Skeleton title={false} loading={false} active>
              <p className="vm-name">{vm.name}</p>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}
