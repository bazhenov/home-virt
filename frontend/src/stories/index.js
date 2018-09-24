import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { VmList } from '../components/VmList'
import "antd/dist/antd.css";

const vms = [
  {name: "Windows", uuid: "dcb3255d10e74a739ba4ce18f9d606f0", is_running: false},
  {name: "Linux", uuid: "9a8ac9f8a6d243e4927e178582262f00", is_running: false},
  {name: "MacOs", uuid: "4f01c58877964462a89e78150725b796", is_running: true}
]

const timeout = (data, timeout) => new Promise((resolve, reject) =>
  setTimeout(() => resolve(data), timeout))

const neverPromise = new Promise(() => {})

storiesOf('VmList', module)
  .add('base example', () => <VmList vmLoader={() => Promise.resolve(vms)}
    onVmRun={action('onVmRun')} onVmStop={action('onVmStop')}/>)
    .add('executing', () => <VmList vmLoader={() => Promise.resolve(vms)}
      onVmRun={() => timeout(true, 1000)} onVmStop={() => timeout(true, 1000)}/>)
  .add('loading', () => <VmList vmLoader={() => neverPromise} />)
