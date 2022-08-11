type SortingAlgoStepFn = (a: number[], update: (arr: number[]) => void) => Promise<void>;

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

async function mergeSortInPlace(a: number[], update: (arr: number[]) => void, l: number, r: number, s: number[]): Promise<void> {
    if (r - l <= 0) return;
    const m = Math.floor(l + (r - l) / 2);
    await mergeSortInPlace(a, update, l, m, s);
    await mergeSortInPlace(a, update, m + 1, r, s);
    await merge(a, update, l, m, r, s);
}

async function mergeSort(a: number[], update: (arr: number[]) => void): Promise<void> {
    mergeSortInPlace(a, update, 0, a.length - 1, Array(a.length));
}

async function heapSort(a: number[], update: (arr: number[]) => void): Promise<void> {

}

async function quickSort(a: number[], update: (arr: number[]) => void): Promise<void> {

}

async function bubbleSort(a: number[], update: (arr: number[]) => void): Promise<void> {
    for (let i = 0; i < a.length - 1; ++i) {
        for (let j = 0; j < a.length - i - 1; ++j) {
            if (a[j] > a[j + 1]) {
                let tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
                update([...a]);
                await new Promise(r => setTimeout(r, 20));
            }
        }
    }
}

async function insertionSort(a: number[], update: (arr: number[]) => void): Promise<void> {
    for (let i = 1; i < a.length; ++i) {
        for (let j = i; j > 0 && a[j] < a[j - 1]; --j) {
            let tmp = a[j];
            a[j] = a[j - 1];
            a[j - 1] = tmp;
            update([...a]);
            await new Promise(r => setTimeout(r, 20));
        }
    }
}

async function radixSort(a: number[], update: (arr: number[]) => void): Promise<void> {

}

const SortingAlgorithms: { [string: string]: SortingAlgoStepFn } = {
    mergeSort: mergeSort,
    heapSort: heapSort,
    quickSort: quickSort,
    insertionSort: insertionSort,
    bubbleSort: bubbleSort,
    radixSort: radixSort,
};

export default function performSortingAlgorithm(algorithm: string, array: number[], update: (arr: number[]) => void) {
    SortingAlgorithms[algorithm](array, update);
}
