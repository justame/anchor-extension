import React, { Component } from 'react';
import ToolbarButtonComponent from './ToolbarButton';
import { IToolbarItem, ToolbarSpec } from '../types';
import { RicosToolbar } from '../Toolbar';

type ToolbarProps = {
  toolbar: RicosToolbar;
  toolbarItemsRenders: any;
};

const visibleOnlySpec: ToolbarSpec = (toolbarItem) =>
  toolbarItem.attributes['visible'] === true;

//RicosToolbar

class ToolbarComponent extends Component<ToolbarProps, {}> {
  items: Record<string, any> = {};
  state = {
    dummyUpdate: 1,
  };
  constructor(props) {
    super(props);

    props.toolbar.on(RicosToolbar.EVENTS.toolbarItemsCreated, () => {
      // force update
      this.setState({ dummyUpdate: this.state.dummyUpdate + 1 });
    });
  }

  render() {
    const toolbarButtons = this.props.toolbar.getItemsBy(visibleOnlySpec);
    const { toolbarItemsRenders } = this.props;
    return (
      <div className="toolbar">
        {toolbarButtons.map((toolbarButton, index) => {
          const ItemComponent =
            toolbarItemsRenders[toolbarButton.type](toolbarButton);

          return (
            <div key={toolbarButton.id} className="toolbarItem">
              {ItemComponent}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ToolbarComponent;
