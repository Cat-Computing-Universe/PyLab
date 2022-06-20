function gpumatmul(a, b) {
    const gpu = new GPU();
    console.log(a);
    console.log(b);
    // add numpy matrix conversion here
    // converting for Matrix A, B
    for (let y = 0; y < matASizeI; y++) {
        this.matrixA.push([])
        for (let x = 0; x < matASizeJ; x++) {
            const value = parseInt((Math.random() * 10).toString())
            this.matrixA[y].push(value)
        }
    }

    for (let y = 0; y < matBSizeI; y++) {
        this.matrixB.push([])
        for (let x = 0; x < matBSizeJ; x++) {
            const value = parseInt((Math.random() * 10).toString())
            this.matrixB[y].push(value)
        }
    }
    this.matrixResult = [];
    const multiplyMatrix = gpu.createKernel(function (a, b) {
        let sum = 0;
        for (let i = 0; i < this.matSizeJ; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x];
        }
        return sum;
    }).setOutput([this.matSizeI, this.matSizeK])

    return multiplyMatrix(this.matrixA, this.matrixB);

}