// Global polyfills for EventTarget and CustomEvent required by youtubei.js in React Native

if (typeof global.EventTarget === 'undefined') {
  class EventTargetPolyfill {
    listeners: Record<string, Function[]> = {};

    addEventListener(type: string, callback: Function) {
      if (!(type in this.listeners)) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(callback);
    }

    removeEventListener(type: string, callback: Function) {
      if (!(type in this.listeners)) return;
      const stack = this.listeners[type];
      for (let i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === callback) {
          stack.splice(i, 1);
          return;
        }
      }
    }

    dispatchEvent(event: { type: string; defaultPrevented?: boolean }) {
      if (!(event.type in this.listeners)) {
        return true;
      }
      const stack = this.listeners[event.type].slice();
      for (let i = 0, l = stack.length; i < l; i++) {
        stack[i].call(this, event);
      }
      return !event.defaultPrevented;
    }
  }
  (global as any).EventTarget = EventTargetPolyfill;
}

if (typeof global.CustomEvent === 'undefined') {
  class CustomEventPolyfill {
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    detail: any;
    constructor(event: string, params: { bubbles?: boolean; cancelable?: boolean; detail?: any } = {}) {
      this.type = event;
      this.bubbles = !!params.bubbles;
      this.cancelable = !!params.cancelable;
      this.detail = params.detail ?? null;
    }
  }
  (global as any).CustomEvent = CustomEventPolyfill;
}

// Mock standard browser globals accessed by YouTube player scripts
if (typeof global.window === 'undefined') {
  (global as any).window = global;
}

if (typeof global.document === 'undefined') {
  const mockElement = {
    style: {},
    setAttribute: () => {},
    removeAttribute: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  (global as any).document = {
    createElement: () => mockElement,
    addEventListener: () => {},
    removeEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
  };
}

if (typeof global.navigator === 'undefined') {
  (global as any).navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    onLine: true,
  };
}
