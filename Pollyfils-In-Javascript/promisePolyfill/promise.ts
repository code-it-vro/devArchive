/**
 * Custom Promise implementation with TypeScript support
 * Implements the Promises/A+ specification
 */

// Type definitions for promise handlers and states
interface Handler {
  onFulfilled?: (value: any) => any;
  onRejected?: (error: any) => any;
}

type State = "pending" | "fulfilled" | "rejected";
type Executor = (
  resolve: (value: any) => void,
  reject: (error: any) => void
) => void;

class MyPromise {
  // Internal state management
  private state: State = "pending";
  private value: any;
  private handlers: Handler[] = [];

  /**
   * @param executor Function that receives resolve and reject functions
   */
  constructor(executor: Executor) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  /**
   * Resolves the promise with a value
   * @param result Value to resolve with
   */
  private resolve(result: any): void {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    this.value = result;
    this.handlers.forEach(this.handle.bind(this));
  }

  /**
   * Rejects the promise with an error
   * @param error Error to reject with
   */
  private reject(error: any): void {
    if (this.state !== "pending") return;
    this.state = "rejected";
    this.value = error;
    this.handlers.forEach(this.handle.bind(this));
  }

  /**
   * Processes handlers based on promise state
   * @param handler Object containing success/error callbacks
   */
  private handle(handler: Handler): void {
    if (this.state === "fulfilled" && handler.onFulfilled) {
      handler.onFulfilled(this.value);
    } else if (this.state === "rejected" && handler.onRejected) {
      handler.onRejected(this.value);
    } else if (this.state === "pending") {
      this.handlers.push(handler);
    }
  }

  /**
   * Chains promises and handles transformations
   * @param onFulfilled Success callback
   * @param onRejected Error callback
   * @returns New promise instance
   */
  public then(
    onFulfilled?: (value: any) => any,
    onRejected?: (error: any) => any
  ): MyPromise {
    return new MyPromise((resolve, reject) => {
      this.handle({
        onFulfilled: (result) => {
          if (!onFulfilled) return resolve(result);
          try {
            resolve(onFulfilled(result));
          } catch (err) {
            reject(err);
          }
        },
        onRejected: onRejected ? onRejected : reject,
      });
    });
  }

  /**
   * Handles promise rejection
   * @param onRejected Error callback
   * @returns New promise instance
   */
  public catch(onRejected: (error: any) => any): MyPromise {
    return this.then(undefined, onRejected);
  }
}

export default MyPromise;
