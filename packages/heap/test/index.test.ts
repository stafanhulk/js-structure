import { describe, expect, it } from "@jest/globals";
import Heap from "../src/index";

describe("Heap", () => {
  describe("构造函数", () => {
    it("应该创建一个空的最小堆", () => {
      const heap = new Heap(Heap.MIN_HEAP, []);
      expect(heap.isEmpty()).toBe(true);
      expect(heap.size()).toBe(0);
    });

    it("应该创建一个带初始值的最小堆", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1]);
      expect(heap.isEmpty()).toBe(false);
      expect(heap.size()).toBe(4);
    });

    it("应该创建一个空的最大堆", () => {
      const heap = new Heap(Heap.MAX_HEAP, []);
      expect(heap.isEmpty()).toBe(true);
    });

    it("应该在传入非数组时抛出错误", () => {
      expect(() => {
        new Heap(Heap.MIN_HEAP, "not an array" as any);
      }).toThrow("Heap expects an array of values");
    });

    it("应该在传入非函数比较器时抛出错误", () => {
      expect(() => {
        new Heap("not a function" as any, []);
      }).toThrow("Heap expects a compare function");
    });
  });

  describe("静态比较器", () => {
    it("MIN_HEAP 应该正确比较", () => {
      expect(Heap.MIN_HEAP(1, 2)).toBe(true);
      expect(Heap.MIN_HEAP(2, 1)).toBe(false);
      expect(Heap.MIN_HEAP(1, 1)).toBe(false);
    });

    it("MAX_HEAP 应该正确比较", () => {
      expect(Heap.MAX_HEAP(2, 1)).toBe(true);
      expect(Heap.MAX_HEAP(1, 2)).toBe(false);
      expect(Heap.MAX_HEAP(1, 1)).toBe(false);
    });
  });

  describe("push", () => {
    it("应该向最小堆中添加元素", () => {
      const heap = new Heap<number>(Heap.MIN_HEAP, []);
      heap.push(5);
      expect(heap.size()).toBe(1);
      expect(heap.top()).toBe(5);
    });

    it("应该向最小堆中添加多个元素并保持堆属性", () => {
      const heap = new Heap<number>(Heap.MIN_HEAP, []);
      heap.push(5).push(3).push(7).push(1);
      expect(heap.top()).toBe(1);
      expect(heap.size()).toBe(4);
    });

    it("应该向最大堆中添加元素并保持堆属性", () => {
      const heap = new Heap<number>(Heap.MAX_HEAP, []);
      heap.push(5).push(3).push(7).push(1);
      expect(heap.top()).toBe(7);
      expect(heap.size()).toBe(4);
    });
  });

  describe("pop", () => {
    it("应该从空堆中返回 null", () => {
      const heap = new Heap(Heap.MIN_HEAP, []);
      expect(heap.pop()).toBe(null);
    });

    it("应该从最小堆中按顺序弹出元素", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1, 9, 2]);
      heap.balance();

      expect(heap.pop()).toBe(1);
      expect(heap.pop()).toBe(2);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(5);
      expect(heap.pop()).toBe(7);
      expect(heap.pop()).toBe(9);
      expect(heap.pop()).toBe(null);
    });

    it("应该从最大堆中按顺序弹出元素", () => {
      const heap = new Heap(Heap.MAX_HEAP, [5, 3, 7, 1, 9, 2]);
      heap.balance();

      expect(heap.pop()).toBe(9);
      expect(heap.pop()).toBe(7);
      expect(heap.pop()).toBe(5);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(2);
      expect(heap.pop()).toBe(1);
    });

    it("弹出后应该保持堆属性", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1]);
      heap.balance();
      heap.pop();
      expect(heap.isValid()).toBe(true);
    });
  });

  describe("top", () => {
    it("应该从空堆返回 null", () => {
      const heap = new Heap(Heap.MIN_HEAP, []);
      expect(heap.top()).toBe(null);
    });

    it("应该返回最小堆的最小值而不移除", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1]);
      heap.balance();
      const size = heap.size();
      expect(heap.top()).toBe(1);
      expect(heap.size()).toBe(size);
    });

    it("应该返回最大堆的最大值而不移除", () => {
      const heap = new Heap(Heap.MAX_HEAP, [5, 3, 7, 1]);
      heap.balance();
      const size = heap.size();
      expect(heap.top()).toBe(7);
      expect(heap.size()).toBe(size);
    });
  });

  describe("isEmpty", () => {
    it("空堆应该返回 true", () => {
      const heap = new Heap(Heap.MIN_HEAP, []);
      expect(heap.isEmpty()).toBe(true);
    });

    it("非空堆应该返回 false", () => {
      const heap = new Heap(Heap.MIN_HEAP, [1]);
      expect(heap.isEmpty()).toBe(false);
    });

    it("清空后应该返回 true", () => {
      const heap = new Heap(Heap.MIN_HEAP, [1, 2, 3]);
      heap.clear();
      expect(heap.isEmpty()).toBe(true);
    });
  });

  describe("size", () => {
    it("应该返回正确的大小", () => {
      const heap = new Heap<number>(Heap.MIN_HEAP, []);
      expect(heap.size()).toBe(0);

      heap.push(1);
      expect(heap.size()).toBe(1);

      heap.push(2).push(3);
      expect(heap.size()).toBe(3);

      heap.pop();
      expect(heap.size()).toBe(2);
    });
  });

  describe("clear", () => {
    it("应该清空堆", () => {
      const heap = new Heap(Heap.MIN_HEAP, [1, 2, 3, 4, 5]);
      heap.clear();
      expect(heap.isEmpty()).toBe(true);
      expect(heap.size()).toBe(0);
      expect(heap.top()).toBe(null);
    });

    it("应该返回 this 以支持链式调用", () => {
      const heap = new Heap(Heap.MIN_HEAP, [1, 2, 3]);
      const result = heap.clear();
      expect(result).toBe(heap);
    });
  });

  describe("clone", () => {
    it("应该创建堆的副本", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1]);
      const cloned = heap.clone();

      expect(cloned.size()).toBe(heap.size());
      expect(cloned.toArray()).toEqual(heap.toArray());
    });

    it("克隆的堆应该是独立的", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7]);
      const cloned = heap.clone();

      heap.push(1);
      expect(heap.size()).toBe(4);
      expect(cloned.size()).toBe(3);
    });
  });

  describe("isValid", () => {
    it("平衡后的堆应该是有效的", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1, 9, 2]);
      heap.balance();
      expect(heap.isValid()).toBe(true);
    });

    it("最大堆应该是有效的", () => {
      const heap = new Heap(Heap.MAX_HEAP, [5, 3, 7, 1]);
      heap.balance();
      expect(heap.isValid()).toBe(true);
    });

    it("空堆应该是有效的", () => {
      const heap = new Heap(Heap.MIN_HEAP, []);
      expect(heap.isValid()).toBe(true);
    });
  });

  describe("balance", () => {
    it("应该将无序数组平衡成有效的堆", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1, 9, 2, 8, 4, 6]);
      heap.balance();
      expect(heap.isValid()).toBe(true);
    });

    it("应该返回 this 以支持链式调用", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7]);
      const result = heap.balance();
      expect(result).toBe(heap);
    });

    it("平衡后最小堆的顶部应该是最小值", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1, 9]);
      heap.balance();
      expect(heap.top()).toBe(1);
    });

    it("平衡后最大堆的顶部应该是最大值", () => {
      const heap = new Heap(Heap.MAX_HEAP, [5, 3, 7, 1, 9]);
      heap.balance();
      expect(heap.top()).toBe(9);
    });
  });

  describe("toArray", () => {
    it("应该返回堆的数组表示", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7]);
      const arr = heap.toArray();
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBe(3);
    });

    it("返回的数组应该是副本", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7]);
      const arr = heap.toArray();
      arr.push(10);
      expect(heap.size()).toBe(3);
    });
  });

  describe("迭代器", () => {
    it("应该支持 for...of 循环", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7, 1, 9]);
      heap.balance();

      const result: number[] = [];
      for (const value of heap) {
        result.push(value as number);
      }

      expect(result).toEqual([1, 3, 5, 7, 9]);
    });

    it("迭代后堆应该为空", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, 3, 7]);
      heap.balance();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of heap) {
        // 消费所有元素
      }

      expect(heap.isEmpty()).toBe(true);
    });

    it("应该支持展开运算符", () => {
      const heap = new Heap(Heap.MAX_HEAP, [5, 3, 7, 1]);
      heap.balance();

      const result = [...heap];
      expect(result).toEqual([7, 5, 3, 1]);
    });
  });

  describe("自定义比较器", () => {
    it("应该支持自定义对象的比较", () => {
      interface Task {
        name: string;
        priority: number;
      }

      const comparator = (a: Task, b: Task) => a.priority < b.priority;
      const heap = new Heap<Task>(comparator, [
        { name: "task1", priority: 5 },
        { name: "task2", priority: 1 },
        { name: "task3", priority: 3 }
      ]);

      heap.balance();

      const top = heap.top();
      expect(top?.priority).toBe(1);
    });
  });

  describe("边界情况", () => {
    it("应该处理单个元素", () => {
      const heap = new Heap(Heap.MIN_HEAP, [42]);
      expect(heap.top()).toBe(42);
      expect(heap.pop()).toBe(42);
      expect(heap.isEmpty()).toBe(true);
    });

    it("应该处理重复元素", () => {
      const heap = new Heap(Heap.MIN_HEAP, [3, 3, 3, 3]);
      heap.balance();

      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(3);
    });

    it("应该处理负数", () => {
      const heap = new Heap(Heap.MIN_HEAP, [5, -3, 7, -1, 0]);
      heap.balance();

      expect(heap.pop()).toBe(-3);
      expect(heap.pop()).toBe(-1);
      expect(heap.pop()).toBe(0);
      expect(heap.pop()).toBe(5);
      expect(heap.pop()).toBe(7);
    });

    it("应该处理大量数据", () => {
      const data = Array.from({ length: 1000 }, (_) => Math.random() * 1000);
      const heap = new Heap(Heap.MIN_HEAP, data);
      heap.balance();

      expect(heap.size()).toBe(1000);
      expect(heap.isValid()).toBe(true);

      let prev = heap.pop() as number;
      while (!heap.isEmpty()) {
        const current = heap.pop() as number;
        expect(current).toBeGreaterThanOrEqual(prev);
        prev = current;
      }
    });
  });
});
