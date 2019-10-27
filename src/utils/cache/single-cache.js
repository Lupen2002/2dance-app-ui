// @flow

type Value<T> = {
  expires: number,
  val?: T,
}

const now = () => new Date().getTime();

export class SingleCache<T> {
  ttl: number;
  data: ?Value<T>;

  constructor(ttl: number = 0) {
    this.ttl = ttl;
    this.data = null;
  }

  get(): ?T {
    let val = null;
    let obj = this.data;
    if (obj) {
      val = obj.val;
      if (now() >= obj.expires) {
        val = null;
        this.data = null;
      }
    }
    return val
  }

  del(): ?T {
    const oldval = this.get();
    this.data = null;
    return oldval
  }

  put(val: T, ttl?: number): ?T {
    let currentTTL = ttl;
    if (ttl === undefined) {
      currentTTL = this.ttl
    }
    let oldval = this.del();
    if (val !== null) this.data = { expires: now() + currentTTL, val: val };
    return oldval
  }
}
