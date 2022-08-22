type SortingAlgoStepFn = (a: number[], update: (arr: number[]) => void) => Promise<void>;

function swap(a: number[], i: number, j: number): void {
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}

async function merge(a: number[], update: (arr: number[]) => void, l: number, m: number, r: number, s: number[]): Promise<void> {
    for (let i = l; i <= r; ++i) s[i] = a[i];
    let iL = l;
    let iR = m + 1;
    for (let k = l; k <= r; ++k) {
        if (iL > m) {
            a[k] = s[iR];
            ++iR;
        } else if (iR > r) {
            a[k] = s[iL];
            ++iL;
        } else if (s[iL] <= s[iR]) {
            a[k] = s[iL];
            ++iL;
        } else {
            a[k] = s[iR];
            ++iR;
        }
        update([...a]);
        await new Promise(r => setTimeout(r, 20));
    }
}

async function mergeSort(a: number[], update: (arr: number[]) => void, l: number = 0, r: number = a.length - 1, s: number[] = Array(a.length)): Promise<void> {
    if (r - l <= 0) return;
    const m = Math.floor(l + (r - l) / 2);
    await mergeSort(a, update, l, m, s);
    await mergeSort(a, update, m + 1, r, s);
    await merge(a, update, l, m, r, s);
}

async function fixDown(a: number[], i: number, n: number, update: (arr: number[]) => void): Promise<void> {
    while (i * 2 + 1 < n) {
        let j = i * 2 + 1;
        if (j + 1 < n && a[j + 1] > a[j]) ++j;
        if (a[i] >= a[j]) break;
        swap(a, i, j);
        i = j;
        update([...a]);
        await new Promise((r) => setTimeout(r, 20));
    }
} 

async function heapSort(a: number[], update: (arr: number[]) => void): Promise<void> {
    for (let i = Math.floor((a.length - 2) / 2); i >= 0; --i) {
        await fixDown(a, i, a.length, update);
    }
    let n = a.length;
    while (n > 1) {
        swap(a, 0, n - 1);
        update([...a]);
        await new Promise(r => setTimeout(r, 20));
        --n;
        await fixDown(a, 0, n, update);
    }
}

function choosePivot(l: number, r: number): number {
    return l + Math.floor(Math.random() * (r + 1 - l));
}

async function partition(a: number[], p: number, l: number, r: number, update: (arr: number[]) => void): Promise<number> {
    swap(a, p, r);
    update([...a]);
    await new Promise(r => setTimeout(r, 20));
    let i = l - 1;
    let j = r;
    let v = a[j];
    while (true) {
        do ++i; while (a[i] < v);
        do --j; while (j >= i && a[j] > v);
        if (i >= j) break;
        swap(a, i, j);
        update([...a]);
        await new Promise((r) => setTimeout(r, 20));
    }
    swap(a, i, r);
    update([...a]);
    await new Promise((r) => setTimeout(r, 20));
    return i;
}

async function quickSort(a: number[], update: (arr: number[]) => void, l: number = 0, r: number = a.length - 1): Promise<void> {
    if (r - l <= 0) return;
    let p = choosePivot(l, r);
    let i = await partition(a, p, l, r, update);
    await quickSort(a, update, l, i - 1);
    await quickSort(a, update, i + 1, r);
}

async function bubbleSort(a: number[], update: (arr: number[]) => void): Promise<void> {
    for (let i = 0; i < a.length - 1; ++i) {
        for (let j = 0; j < a.length - i - 1; ++j) {
            if (a[j] > a[j + 1]) {
                swap(a, j, j + 1);
                update([...a]);
                await new Promise(r => setTimeout(r, 20));
            }
        }
    }
}

async function insertionSort(a: number[], update: (arr: number[]) => void): Promise<void> {
    for (let i = 1; i < a.length; ++i) {
        for (let j = i; j > 0 && a[j] < a[j - 1]; --j) {
            swap(a, j - 1, j);
            update([...a]);
            await new Promise(r => setTimeout(r, 20));
        }
    }
}

async function bucketSort(a: number[], digit: number, radix: number, update: (arr: number[]) => void): Promise<void> {
    const b: number[][] = Array(radix);
    for (let i = 0; i < b.length; ++i) {
        b[i] = Array(0);
    }
    const powOfTen = Math.pow(10, digit);
    for (let i = 0; i < a.length; ++i) {
        b[Math.floor(a[i] / powOfTen) % 10].push(a[i]);
    }
    let i = 0;
    for (let j = 0; j < radix; ++j) {
        for (let k = 0; k < b[j].length; ++k) {
            a[i] = b[j][k];
            ++i;
            update(a.map(v => v / 1000000));
            await new Promise((r) => setTimeout(r, 20));
        }
    }
}

async function lsdRadixSort(a: number[], digits: number, radix: number, update: (arr: number[]) => void): Promise<void> {
    for (let i = 0; i < digits; ++i) {
        await bucketSort(a, i, radix, update);
    }
}

async function radixSort(a: number[], update: (arr: number[]) => void): Promise<void> {
    a = a.map(v => Math.floor(v * 1000000));
    lsdRadixSort(a, 6, 10, update);
}

const SortingAlgorithms: { [string: string]: SortingAlgoStepFn } = {
    mergeSort: mergeSort,
    heapSort: heapSort,
    quickSort: quickSort,
    insertionSort: insertionSort,
    bubbleSort: bubbleSort,
    radixSort: radixSort,
};

export default function performSortingAlgorithm(algorithm: string, array: number[], update: (arr: number[]) => void, done: () => void) {
    SortingAlgorithms[algorithm](array, update).then(() => done());
}
