export class EventEmitter {
  private events: Record<string, Function[]> = {};

  on(event: string, listener: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  addListener(event: string, listener: Function) {
    return this.on(event, listener);
  }

  off(event: string, listener: Function) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(l => l !== listener);
    return this;
  }

  removeListener(event: string, listener: Function) {
    return this.off(event, listener);
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return false;
    this.events[event].forEach(listener => {
      try {
        listener(...args);
      } catch (err) {
        console.error('Error in event listener:', err);
      }
    });
    return true;
  }

  once(event: string, listener: Function) {
    const wrapper = (...args: any[]) => {
      this.off(event, wrapper);
      listener(...args);
    };
    return this.on(event, wrapper);
  }

  removeAllListeners(event?: string) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }

  setMaxListeners(_n: number) {
    return this;
  }
}

// Add self-reference for CommonJS compatibility (e.g. require('events').EventEmitter)
(EventEmitter as any).EventEmitter = EventEmitter;

export default EventEmitter;
