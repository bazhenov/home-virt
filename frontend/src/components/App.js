import React from "react";
import { VmList } from "./VmList";
import reqwest from 'reqwest'

export class App extends React.Component {
  render() {
    return (
      <VmList
				vmLoader={() => this.vmList()}
				onVmRun={(vm) => this.vmRun(vm)}
				onVmStop={(vm) => this.vmStop(vm)} />
    );
  }

  vmRun(vm) {
    return reqwest({url: "/api/vm/start", method: "POST",contentType: 'application/json', data: JSON.stringify(vm)})
  }

  vmStop(vm) {
    return reqwest({url: "/api/vm/stop", method: "POST", contentType: 'application/json', data: JSON.stringify(vm)})
  }

  vmList() {
    return reqwest({url: "/api/vm/list", method: "GET", type: "json"})
  }
}
