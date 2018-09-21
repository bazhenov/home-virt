import React from "react";
import { VmList } from "./VmList";
import reqwest from 'reqwest'

export class App extends React.Component {
  render() {
    return (
      <VmList
        vms={[{ id: 0, name: "Vm 1" }, { id: 1, name: "Vm 2" }]}
        onVmRun={this.vmStart}/>
    );
  }

  vmStart(vm) {
    return reqwest({url: "/api/vm/start", method: "POST", data: {uuid: vm.UUID}})
  }

  vmStop(vm) {
    return reqwest({url: "/api/vm/stop", method: "POST", data: {uuid: vm.UUID}})
  }

  vmList() {
    return reqwest({url: "/api/vm/list", method: "GET"})
  }
}
