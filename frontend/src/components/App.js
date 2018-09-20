import React from "react";
import { VmList } from "./VmList";

export class App extends React.Component {
  render() {
    return (
      <VmList
        vms={[{ id: 0, name: "Vm 1" }, { id: 1, name: "Vm 2" }]}
        onVmRun={id => alert(JSON.stringify(id))}/>
    );
  }
}
