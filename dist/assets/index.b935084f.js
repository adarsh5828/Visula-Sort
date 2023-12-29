import {
  c as e,
  d as t,
  m as r,
  s as n,
  r as a,
  A as l,
  a as o,
  T as i,
  b as s,
  q as c,
  B as u,
  e as d,
  S as m,
  V as p,
  f,
  I as g,
  W as y,
  C as x,
  g as h
} from "./vendor.1c86e2af.js";

async function* BubbleSort(arr, compare, swap, update) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield await compare([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        yield await swap(j, j + 1);
      }
      update(j);
      yield;
    }
  }
}

async function* SelectionSort(arr, compare, swap, update) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      yield await compare([minIndex, j]);
      if (!(arr[j] > arr[minIndex])) {
        yield;
        break;
      }
      yield await swap(j, minIndex);
      minIndex = j;
    }
    update(i);
    yield;
  }
}

async function* InsertionSort(arr, compare, swap, update) {
  for (let i = 0; i < arr.length; i++) {
    let current = i;
    for (let j = i - 1; j >= 0; j--) {
      yield await compare([current, j]);
      if (!(arr[j] > arr[current])) {
        yield;
        break;
      }
      yield await swap(j, current);
      current = j;
    }
    update(i);
    yield;
  }
}

async function* HeapSort(arr, compare, swap, update) {
  let size = arr.length;
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    yield* await heapify(i);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    size--;
    update(size);
    yield await swap(0, i);
    yield* await heapify(0);
  }

  async function* heapify(n) {
    const left = 2 * n + 1;
    const right = 2 * n + 2;
    let largest = n;
    const indices = [];

    if (left < size) indices.push(left);
    if (right < size) indices.push(right);
    yield await compare(indices, n);

    if (left < size && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== n) {
      yield await swap(n, largest);
      yield* await heapify(largest);
    }
  }

  update(0);
  yield;
}

async function* MergeSort(arr, compare, swap, update, start = 0, end = arr.length - 1) {
  if (start === end) return arr;
  const middle = Math.floor((start + end) / 2);

  yield* await MergeSort(arr.slice(0, middle + 1), compare, swap, update, start, middle);
  yield* await MergeSort(arr.slice(middle + 1), compare, swap, update, middle + 1, end);

  return yield* await merge(arr, compare, swap, update, start, middle, end);
}

async function* merge(arr, compare, swap, update, start, middle, end) {
  let left = arr.slice(start, middle + 1);
  let right = arr.slice(middle + 1);
  let result = [];

  while (left.length > 0 && right.length > 0) {
    yield await compare([start + result.length, start + left.length + right.length]);
    yield await swap(start + result.length, start + left.length + right.length);
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
    yield;
  }

  result = [...result, ...left, ...right];
  for (let i = 0; i < result.length; i++) {
    arr[start + i] = result[i];
    update(start + i);
    yield;
  }
}

async function* QuickSort(arr, compare, swap, update, start = 0, end = arr.length - 1) {
  if (start < end) {
    let partitionIndex = await partition(arr, compare, swap, update, start, end);
    await QuickSort(arr, compare, swap, update, start, partitionIndex - 1);
    await QuickSort(arr, compare, swap, update, partitionIndex + 1, end);
  }
}

async function* partition(arr, compare, swap, update, start, end) {
  let pivotIndex = Math.floor(Math.random() * (end - start + 1) + start);
  let pivotValue = arr[pivotIndex];
  yield* await compare([pivotIndex], -1);

  await swap(pivotIndex, end);
  let i = start - 1;

  for (let j = start; j < end; j++) {
    yield* await compare([pivotIndex, j], -1);
    if (arr[j] <= pivotValue) {
      i++;
      if (i !== j) {
        await swap(i, j);
      }
    }
  }
  i++;
  await swap(i, end);
  yield* await compare([], i);
  return i;
}

const sortingAlgorithms = [
  {
    component: BubbleSort,
    title: "Bubble",
    name: "BubbleSort"
  },
  {
    component: SelectionSort,
    title: "Selection",
    name: "SelectionSort"
  },
  {
    component: InsertionSort,
    title: "Insertion",
    name: "InsertionSort"
  },
  {
    component: HeapSort,
    title: "Heap",
    name: "HeapSort"
  },
  {
    component: MergeSort,
    title: "Merge",
    name: "MergeSort"
  },
  {
    component: QuickSort,
    title: "Quick",
    name: "QuickSort"
  }
];

const getInitialArray = () => {
  const width = window.innerWidth;
  if (width < 460) return [4, 3, 2, 1];
  if (width < 720) return [8, 7, 6, 5, 4, 3, 2, 1];
  return [12, 11, 10, 9, 8, 7, 6, ]
}
