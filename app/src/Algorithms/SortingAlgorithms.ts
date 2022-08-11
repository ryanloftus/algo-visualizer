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

async function mergeSort(a: number[], update: (arr: number[]) => void, l: number, r: number, s: number[]) {
    if (r - l <= 0) return;
    const m = Math.floor(l + (r - l) / 2);
    await mergeSort(a, update, l, m, s);
    await mergeSort(a, update, m + 1, r, s);
    await merge(a, update, l, m, r, s);
}

const SortingAlgorithms: any = {
    mergeSort : (a: number[], update: (arr: number[]) => void) => {
        mergeSort(a, update, 0, a.length - 1, Array(a.length));
    }
};

export default SortingAlgorithms;
