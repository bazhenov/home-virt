import React from "react";
import { Breadcrumb, Button } from "antd";
import { VmList } from "./VmList";

export class App extends React.Component {
  render() {
    return (
      <div>
        <VmList
          vms={[{ id: 0, name: "Vm 1" }, { id: 1, name: "Vm 2" }]}
          onVmRun={id => alert(JSON.stringify(id))}
        />
      </div>
    );
  }
}
