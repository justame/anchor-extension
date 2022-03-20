import React from 'react';
import { IToolbarItem } from './types';
type ComponentProps = {
  toolbarItem: IToolbarItem;
};

const ToggleButton = ({ toolbarItem }: ComponentProps) => {
  const Icon = toolbarItem.presentation.icon;
  const activeClassName = toolbarItem.attributes.active ? 'active' : '';

  return (
    <div>
      <div
        className={`toggleButton ${activeClassName}`}
        onClick={(e) => toolbarItem.commands?.click(e)}
      >
        <Icon />
      </div>
    </div>
  );
};

const TextColorIndicator = ({ toolbarItem }: ComponentProps) => {
  return (
    <div
      style={{
        border: `solid 1px #CCC`,
        backgroundColor: toolbarItem.attributes.color,
        width: 30,
        height: 30,
      }}
    ></div>
  );
};

const FontDropDown = ({ toolbarItem }: ComponentProps) => {
  return (
    <div>
      <select
        onChange={(e) => {
          toolbarItem.commands.changeFont(e.target.selectedOptions[0].value);
        }}
      >
        <option value="Roboto">Roboto</option>
        <option value="Arial">Arial</option>
        <option value="Helveticate">Helveticate</option>
        <option value="David">David</option>
      </select>
    </div>
  );
};

const Settings = ({ toolbarItem }: ComponentProps) => {
  return (
    <div>
      <button onClick={(e) => toolbarItem.commands.click()}>
        {toolbarItem.presentation.label}
      </button>
    </div>
  );
};

const TextType = ({ toolbarItem }: ComponentProps) => {
  return (
    <div>
      <select
        value={toolbarItem.attributes.textType.toString()}
        onChange={(e) => {
          toolbarItem.commands.changeFont(e.target.selectedOptions[0].value);
        }}
      >
        <option value="paragraph">paragraph</option>
        <option value="image">image</option>
      </select>
    </div>
  );
};

export const toolbarItemsRenders = {
  toggle: (toolbarItem) => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  textColorIndicator: (toolbarItem) => {
    return <TextColorIndicator toolbarItem={toolbarItem} />;
  },
  font: (toolbarItem) => {
    return <FontDropDown toolbarItem={toolbarItem} />;
  },
  imageSettings: (toolbarItem) => {
    return <Settings toolbarItem={toolbarItem} />;
  },
  textType: (toolbarItem) => {
    return <TextType toolbarItem={toolbarItem} />;
  },
};
