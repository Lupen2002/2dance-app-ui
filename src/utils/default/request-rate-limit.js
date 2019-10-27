// @flow

const throttledQueue = (perInterval: number, interval: number) => {
  const queue = [];
  let lastCalled = Date.now();
  let timeout: ?TimeoutID = null;

  const dequeue = () => {
    const threshold = lastCalled + interval;
    const now = Date.now();

    if (now < threshold) {
      clearTimeout(timeout);
      timeout = setTimeout(dequeue, threshold - now);
      return
    }

    const callbacks = queue.splice(0, perInterval);
    for(let x = 0; x < callbacks.length; x++) {
      callbacks[x]();
    }

    lastCalled = Date.now();
    timeout = setTimeout(dequeue, interval);
  };

  return (callback) => {
    queue.push(callback);
    if (!timeout) {
      timeout = setTimeout(dequeue, interval);
    }
  }
};

const throttled = throttledQueue(1, 500);


export const rateLimit = (): Promise<*> => {
  return new Promise( res => throttled(() => {
    res()
  }))
};

