import { IContentResolver } from './ContentResolver';

export type IToolbarItem = {
  id: string;
  type: 'textColorIndicator' | 'toggle' | 'font' | 'imageSettings' | 'textType';
  presentation?: Record<string, any>;
  attributes: Record<string, string | boolean | number>;
  commands: Record<string, (...args: any) => void>;
};
type Modify<T, R> = Omit<T, keyof R> & R;

export type ToolbarSpec = (toolbarItem: IToolbarItem) => boolean;

type Command = ({ attributes, editorCommands }) => (args) => void;

export type IToolbarItemConfig = Modify<
  IToolbarItem,
  {
    attributes: Record<string, IContentResolver<any>>;
    commands: Record<string, Command>;
  }
>;
