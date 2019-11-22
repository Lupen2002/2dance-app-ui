// @flow

import { IOS, platform } from "@vkontakte/vkui";

const osname = platform();
const mem = {};

export class LocalstorageCache<T> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): ?T {
    let val: ?T = null;
    const objSrc: ?string =
      osname === IOS ? mem[this.key] : window.localStorage.getItem(this.key);
    if (objSrc) {
      val = JSON.parse(objSrc);
    }
    return val;
  }

  del(): ?T {
    const oldval = this.get();
    if (osname === IOS) {
      mem[this.key] = null;
    } else {
      window.localStorage.removeItem(this.key);
    }
    return oldval;
  }

  put(val: T): void {
    if (val) {
      const src: ?string = JSON.stringify(val);
      if (src) {
        if (osname === IOS) {
          mem[this.key] = src;
        } else {
          window.localStorage.setItem(this.key, src);
        }
      }
    }
  }
}
