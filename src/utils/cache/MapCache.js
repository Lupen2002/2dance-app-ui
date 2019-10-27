// @flow

type Value<T> = {
  expires: number,
  val?: T,
}

type Map<T> = { [string]: Value<T> }

const now = () => new Date().getTime();

export class MapCache<T> {
  ttl: number;
  data: Map<T>;

  constructor(ttl: number = 0) {
    this.ttl = ttl;
    this.data = {}
  }

  get(key: string): ?T {
    let val = null;
    let obj = this.data[key];
    if (obj) {
      val = obj.val;
      if (now() >= obj.expires) {
        val = null;
        delete this.data[key]
      }
    }
    return val
  }

  del(key: string): ?T {
    const oldval = this.get(key);
    delete this.data[key];
    return oldval
  }

  put(key: string, val: T, ttl?: number): ?T {
    let currentTTL = ttl;
    if (ttl === undefined) {
      currentTTL = this.ttl
    }
    let oldval = this.del(key);
    if (val !== null) this.data[key] = { expires: now() + currentTTL, val: val };
    return oldval
  }
}
