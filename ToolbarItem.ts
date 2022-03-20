import { IToolbarItemConfig } from './types';
import { Content } from './Content';
import { ToolbarItemCreator } from './Toolbar';

export class ToolbarItem {
  static create(toolbarItemConfig: IToolbarItemConfig): ToolbarItemCreator {
    return (content: Content, editorCommands) => {
      const toolbarItem = {
        id: toolbarItemConfig.id,
        presentation: toolbarItemConfig.presentation,
        type: toolbarItemConfig.type,
        attributes: {},
        commands: {},
      };

      Object.keys(toolbarItemConfig.commands).forEach((commandName) => {
        toolbarItem.commands[commandName] = toolbarItemConfig.commands[
          commandName
        ]({
          attributes: toolbarItem.attributes,
          editorCommands,
        });
      });

      Object.keys(toolbarItemConfig.attributes).forEach((attributeName) => {
        toolbarItem.attributes[attributeName] = content.resolve(
          toolbarItemConfig.attributes[attributeName]
        );
      });

      return toolbarItem;
    };
  }
}
