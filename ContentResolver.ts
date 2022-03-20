export interface IContentResolver<T> {
  id: string;
  resolve: (content: T) => any;
  description: string;
  type: string;
}

export class ContentResolver implements IContentResolver<any> {
  private constructor(readonly id, readonly resolve, readonly description) {}

  get type() {
    return 'content';
  }
  static create({ resolve, description }) {
    return new ContentResolver(Math.random().toString(), resolve, description);
  }
}
