import { IToolbarItem, ToolbarSpec, IToolbarItemConfig } from './types';

import EventEmitter from './EventEmitter';
import { Content } from './Content';

export type ToolbarItemCreator = (
  content: Content,
  editorCommands: any
) => IToolbarItem;

//ricosToolbar
type RicosToolbarProps = {
  toolbarItemCreators: ToolbarItemCreator[];
  content: Content;
  editor: any;
};

export class RicosToolbar extends EventEmitter {
  static EVENTS = {
    toolbarItemsCreated: 'toolbarsCreated',
  };
  private toolbarItems: IToolbarItem[] = [];
  private toolbarItemCreators: ToolbarItemCreator[];
  private content: Content;
  private editor = null;

  static create({ toolbarItemCreators, content, editor }: RicosToolbarProps) {
    return new RicosToolbar({ toolbarItemCreators, content, editor });
  }

  private constructor({
    toolbarItemCreators,
    content,
    editor,
  }: RicosToolbarProps) {
    super();
    this.toolbarItems = [];
    this.toolbarItemCreators = toolbarItemCreators;
    this.content = content;
    this.editor = editor;

    this.toolbarItems = this.createToolbarItems();

    content.on(Content.EVENTS.contentChangeEvent, () => {
      const previousToolbarItems = Object.freeze(this.toolbarItems);

      this.toolbarItems = this.createToolbarItems();

      this.emit(RicosToolbar.EVENTS.toolbarItemsCreated, {
        previousToolbarItems,
        toolbarItems: Object.freeze(this.toolbarItems),
      });
    });
  }

  private createToolbarItems() {
    return this.toolbarItemCreators.map((toolbarItemCreator) => {
      return toolbarItemCreator(this.content, this.editor);
    });
  }

  addToolbarItemCreator(toolbarItemCreator: ToolbarItemCreator) {
    this.toolbarItemCreators.push(toolbarItemCreator);
  }
  getItems() {
    return this.toolbarItems;
  }

  getItemsBy(spec: ToolbarSpec) {
    return this.toolbarItems.filter(spec);
  }

  getItemById(id) {
    return this.toolbarItems.find((item) => item.id === id);
  }
}
