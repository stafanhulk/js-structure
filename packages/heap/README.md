# @js-structure/heap

A high-performance heap data structure implementation for JavaScript/TypeScript, supporting both min-heap and max-heap.

## Features

- 🚀 Generic support with full type safety
- 📦 Both min-heap and max-heap support
- 🔧 Custom comparator functions
- ⚡ High-performance heap operations
- 🔄 Iterator protocol support (for...of, spread operator)
- 🎯 Method chaining
- ✅ Comprehensive test coverage
- 📝 TypeScript type definitions

## Installation

```bash
npm install @js-structure/heap
```

## Quick Start

### Min Heap

```typescript
import Heap from '@js-structure/heap';

const minHeap = new Heap<number>(Heap.MIN_HEAP);

minHeap.push(5).push(3).push(7).push(1);

console.log(minHeap.top()); // 1
console.log(minHeap.pop()); // 1
console.log(minHeap.pop()); // 3
```

### Max Heap

```typescript
const maxHeap = new Heap<number>(Heap.MAX_HEAP);

maxHeap.push(5).push(3).push(7).push(1);

console.log(maxHeap.top()); // 7
console.log(maxHeap.pop()); // 7
```

### Create Heap with Initial Values

```typescript
const heap = new Heap<number>(Heap.MIN_HEAP, [5, 3, 7, 1, 9, 2]);
heap.balance(); // Balance the heap

console.log(heap.top()); // 1
```

### Custom Comparator

```typescript
interface Task {
  name: string;
  priority: number;
}

const taskHeap = new Heap<Task>(
  (a, b) => a.priority < b.priority,
  [
    { name: 'task1', priority: 5 },
    { name: 'task2', priority: 1 },
    { name: 'task3', priority: 3 }
  ]
);

taskHeap.balance();
console.log(taskHeap.top()); // { name: 'task2', priority: 1 }
```

## API

### Constructor

```typescript
constructor(comparator: (a: T, b: T) => boolean, value?: T[])
```

Creates a new heap instance.

- `comparator`: Comparison function, returns `true` if first argument should be closer to the top
- `value`: Optional initial values array

### Static Properties

- `Heap.MIN_HEAP` - Built-in min-heap comparator
- `Heap.MAX_HEAP` - Built-in max-heap comparator

### Methods

#### `push(value: T): Heap<T>`

Adds an element to the heap and maintains heap property.

```typescript
heap.push(5).push(3).push(7);
```

#### `pop(): T | null`

Removes and returns the top element. Returns `null` if heap is empty.

```typescript
const value = heap.pop();
```

#### `top(): T | null`

Returns the top element without removing it. Returns `null` if heap is empty.

```typescript
const value = heap.top();
```

#### `isEmpty(): boolean`

Checks if the heap is empty.

#### `size(): number`

Returns the number of elements in the heap.

#### `clear(): Heap<T>`

Removes all elements from the heap.

#### `clone(): Heap<T>`

Creates a copy of the heap.

#### `isValid(): boolean`

Checks if the heap satisfies the heap property.

#### `balance(): Heap<T>`

Balances the heap. Call this method after creating a heap from an array.

```typescript
const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1]);
heap.balance();
```

#### `toArray(): T[]`

Returns an array representation of the heap.

### Iterator Support

The heap implements the iterator protocol and can be used with `for...of` loops and spread operators.

**Note:** Iteration consumes the heap elements (calls `pop()`), leaving the heap empty.

```typescript
const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1, 9]);
heap.balance();

for (const value of heap) {
  console.log(value); // Output in order: 1, 3, 5, 7, 9
}

// Using spread operator
const heap2 = new Heap(Heap.MAX_HEAP, [5, 3, 7, 1]);
heap2.balance();
const sorted = [...heap2]; // [7, 5, 3, 1]
```

## Use Cases

### Priority Queue

```typescript
interface Job {
  id: string;
  priority: number;
  task: () => void;
}

const jobQueue = new Heap<Job>(
  (a, b) => a.priority > b.priority
);

jobQueue.push({ id: '1', priority: 5, task: () => console.log('Job 1') });
jobQueue.push({ id: '2', priority: 10, task: () => console.log('Job 2') });

while (!jobQueue.isEmpty()) {
  const job = jobQueue.pop();
  job?.task();
}
```

### Top K Elements

```typescript
function topK(arr: number[], k: number): number[] {
  const minHeap = new Heap<number>(Heap.MIN_HEAP);
  
  for (const num of arr) {
    if (minHeap.size() < k) {
      minHeap.push(num);
    } else if (minHeap.top()! < num) {
      minHeap.pop();
      minHeap.push(num);
    }
  }
  
  return minHeap.toArray();
}

console.log(topK([3, 1, 5, 9, 2, 7, 4, 8, 6], 3)); // [7, 8, 9]
```

### Heap Sort

```typescript
function heapSort(arr: number[]): number[] {
  const heap = new Heap<number>(Heap.MIN_HEAP, arr);
  heap.balance();
  
  return [...heap]; // Uses iterator
}

console.log(heapSort([5, 3, 7, 1, 9, 2])); // [1, 2, 3, 5, 7, 9]
```

## Complexity

| Operation | Time Complexity |
|-----------|----------------|
| `push()` | O(log n) |
| `pop()` | O(log n) |
| `top()` | O(1) |
| `isEmpty()` | O(1) |
| `size()` | O(1) |
| `balance()` | O(n) |
| `clone()` | O(n) |
| `toArray()` | O(n) |
| `isValid()` | O(n) |

**Space Complexity:** O(n)
