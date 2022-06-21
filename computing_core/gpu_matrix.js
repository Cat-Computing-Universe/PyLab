kGPUKernelLoopMaxIteration = 10000;

function gpumatmul(a, b) {
    // getting your GPU resource.
    const gpu = new GPU();

    if (a.length === 0 || b.length === 0) {
        throw new Error("Matrix dimension can not be zero");
    }

    matSizeI = a.length;
    matSizeJ = a[0].length;
    matSizeK = b[0].length;

    // add error handling
    if (matSizeJ !== b.length) {
        throw new Error("Matrix size don't match.");
    }

    const multiplyMatrix = gpu.createKernel(function (a, b, size) {
        let sum = 0;
        for (let i = 0; i < size; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x];
        }
        return sum;
    }).setLoopMaxIterations(kGPUKernelLoopMaxIteration).setOutput([matSizeK, matSizeI]);

    console.log("Performing matrix multiplication on GPU")
    const result = multiplyMatrix(a, b, matSizeJ);
    array_result = []

    console.log("Performing result copying")
    for (let i = 0; i < result.length; i++) {
        array_result.push(Array.from(result[i]))
    }

    return array_result
}