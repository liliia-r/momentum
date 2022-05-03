export class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  get(key) {
    const items = this.storage.getItem(key);
    return items ? JSON.parse(items) : null;
  }

  save(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (err) {
      throw new Error();
    }
  }

  remove(key) {
    try {
      this.storage.removeItem(key);
    } catch (err) {
      throw new Error();
    }
  }
}
