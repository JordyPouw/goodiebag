import React from 'react';

import { Sidebar } from './index';

export default {
  title: 'Sidebar',
  component: Sidebar,
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  property: 'value',
};
