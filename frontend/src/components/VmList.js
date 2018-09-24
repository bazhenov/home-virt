import React from "react";
import { List, Skeleton, Button, Spin } from "antd";

const STATUS_LOADING = "loading"
const STATUS_LOADED = "loaded"
const STATUS_EXECUTING = "executing"

export class VmList extends React.Component {
  static defaultProps = {
    vmLoader: null,
    onVmRun: null
  };

  state = {
    status: STATUS_LOADING,
    vms: []
  }

  createListActions(vm) {
    const disabled = this.state.status == STATUS_EXECUTING
    return vm.is_running
      ? [<Button type="primary" icon="stop" shape="circle" onClick={() => this.onVmStop(vm)} disabled={disabled} />]
      : [<Button type="primary" icon="caret-right" shape="circle" onClick={() => this.onVmRun(vm)} disabled={disabled} />]
  }

  render() {
    if ( this.state.status == STATUS_LOADING ) {
      return <div style={{textAlign: 'center'}}><Spin tip="Loading..." size="large"/></div>

    } else if ( this.state.status == STATUS_LOADED || this.state.status == STATUS_EXECUTING ) {
      return (
        <List
          dataSource={this.state.vms}
          renderItem={vm => (
            <List.Item actions={this.createListActions(vm)}>
              <Skeleton title={false} loading={false} active>
                <p className="vm-name">{vm.name}</p>
              </Skeleton>
            </List.Item>
          )}
        />
      )
    }
  }

  onVmRun(vm) {
    if ( this.props.onVmRun ) {
      this.setState({status: STATUS_EXECUTING})
      this.props.onVmRun(vm).then(() => {
        this.doLoad()
      })
    }
  }

  onVmStop(vm) {
    if ( this.props.onVmStop ) {
      this.setState({status: STATUS_EXECUTING})
      this.props.onVmStop(vm).then(() => {
        this.doLoad()
      })
    }
  }

  componentDidMount() {
    this.doLoad();
  }

  doLoad() {
    if ( this.props.vmLoader ) {
      this.setState({status: STATUS_LOADING})
      this.props.vmLoader().then(vms => this.setState({status: STATUS_LOADED, vms}))
    }
  }
}
