import { ContentResolver } from './ContentResolver';
import EventEmitter from './EventEmitter';

export class Content extends EventEmitter {
  static EVENTS = {
    contentChangeEvent: 'contentChange',
  };

  private constructor(private content) {
    super();
  }
  private resolved = {};
  resolve(contentResolver: ContentResolver) {
    if (this.resolved[contentResolver.id]) {
      return this.resolved[contentResolver.id];
    } else {
      this.resolved[contentResolver.id] = contentResolver.resolve(this.content);
    }
    return this.resolved[contentResolver.id];
  }

  updateContent(content) {
    this.content = content;
    this.resolved = {};
    this.emit(Content.EVENTS.contentChangeEvent);
  }

  isEmpty() {
    return !!this.content;
  }

  static create(content) {
    return new Content(content);
  }
}
