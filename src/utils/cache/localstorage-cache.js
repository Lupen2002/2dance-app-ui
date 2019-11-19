// @flow

export class LocalstorageCache<T> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): ?T {
    let val: ?T = null;
    const objSrc: ?string = localStorage.getItem(this.key);
    if (objSrc) {
      val = JSON.parse(objSrc);
    }
    return val;
  }

  del(): ?T {
    const oldval = this.get();
    localStorage.removeItem(this.key);
    return oldval;
  }

  put(val: T): ?T {
    let oldval = this.del();
    if (val) {
      const src: ?string = JSON.stringify(val);
      src && localStorage.setItem(this.key, src);
    }
    return oldval;
  }
}
