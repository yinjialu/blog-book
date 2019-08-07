

function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex;
    left = typeof left !== 'number' ? 0 : left;
    right = typeof right !== 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        console.log(partitionIndex);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}

function partition(arr, left ,right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）   以 left 值为基准
        index = pivot + 1;
    for (var i = index; i <= right; i++) {   //  从 left + 1 开始循环
        if (arr[i] < arr[pivot]) {    //  只要是比 arr[left] 小的都移到 arr[index] 上面去 index 每次都+1
            swap(arr, i, index);
            console.log(arr);
            index++;
        }
    }
    swap(arr, pivot, index - 1);   //  分出所有比 arr[pivot] 小的值后，把 pivot 与最后一个移动过的值互换，此时 pivot 前面的值都比它小
    return index-1;   //  返回新的基准值
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function partition2(arr, low, high) {
    let pivot = arr[low];
    while (low < high) {
        while (low < high && arr[high] > pivot) {
            --high;
        }
        arr[low] = arr[high];
        while (low < high && arr[low] <= pivot) {
            ++low;
        }
        arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
}

function quickSort2(arr, low, high) {
    if (low < high) {
        let pivot = partition2(arr, low, high);
        quickSort2(arr, low, pivot - 1);
        quickSort2(arr, pivot + 1, high);
    }
    return arr;
}

var a = quickSort([4,2,3,8,6,1,5], 0, 6);
console.log(a);