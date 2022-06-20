function gpumatmul(a, b) {
    const gpu = new GPU();

    matSizeI = a.length;
    matSizeJ = a[0].length;
    matSizeK = b[0].length;

    // add error handling

    const multiplyMatrix = gpu.createKernel(function (a, b, size) {
        let sum = 0;
        for (let i = 0; i < size; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x];
        }
        return sum;
    }).setOutput([matSizeI, matSizeK])

    const result = multiplyMatrix(a, b, matSizeJ);
    return result
    // todo: convert to arrary?
}