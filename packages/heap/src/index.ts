class Heap<T = unknown> {
  static readonly MIN_HEAP = <T>(a: T, b: T) => a < b;
  static readonly MAX_HEAP = <T>(a: T, b: T) => a > b;

  private readonly heap: T[] = [];

  constructor(
    public readonly comparator: (a: T, b: T) => boolean,
    value?: T[]
  ) {
    if (typeof comparator !== "function") {
      throw new Error("Heap expects a compare function");
    }

    if (value) {
      if (!Array.isArray(value)) {
        throw new Error("Heap expects an array of values");
      }
      this.heap = [...value];
    } else {
      this.heap = [];
    }

    this.comparator = comparator;
  }

  private _swap(index1: number, index2: number) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  private _down(index: number) {
    const length = this.heap.length;

    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      let target = index;
      if (
        left < length &&
        this.comparator(this.heap[left], this.heap[target])
      ) {
        target = left;
      }

      if (
        right < length &&
        this.comparator(this.heap[right], this.heap[target])
      ) {
        target = right;
      }

      if (target === index) {
        break;
      }

      this._swap(index, target);
      index = target;
    }
  }

  private _up(index: number) {
    while (true) {
      const parent = Math.floor((index - 1) / 2);

      if (parent >= 0 && this.comparator(this.heap[index], this.heap[parent])) {
        this._swap(index, parent);

        index = parent;
      } else {
        break;
      }
    }
  }

  push(value: T): Heap<T> {
    this.heap.push(value);
    this._up(this.heap.length - 1);

    return this;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.heap[0];
    this._swap(0, this.heap.length - 1);
    this.heap.pop();
    this._down(0);

    return value;
  }

  top(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  clear() {
    this.heap.length = 0;

    return this;
  }

  clone(): Heap<T> {
    return new Heap(this.comparator, this.heap);
  }

  isValid(): boolean {
    return this.heap.every((value, index) => {
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left >= this.heap.length) {
        return true;
      } else if (right >= this.heap.length) {
        return this.comparator(value, this.heap[left]);
      } else {
        return (
          this.comparator(value, this.heap[left]) &&
          this.comparator(value, this.heap[right])
        );
      }
    });
  }

  balance(): Heap<T> {
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this._down(i);
    }

    return this;
  }

  toArray(): T[] {
    return [...this.heap];
  }

  /**
   * Implements an iterable on the heap
   * @public
   */
  [Symbol.iterator]() {
    let size = this.heap.length;

    return {
      next: () => {
        size -= 1;
        return {
          value: this.pop(),
          done: size === -1
        };
      }
    };
  }
}

export default Heap;
