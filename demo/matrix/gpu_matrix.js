import { GPU } from 'https://cdn.jsdelivr.net/npm/gpu.js@latest/dist/gpu-browser.min.js'

export class GPUMatrixMultiplier {
    matSizeI = 1;
    matSizeJ = 1;
    matSizeK = 1;
    matrixA = [];
    matrixB = [];

    matrixResult = [];

    constructor(a, b) {
        this.gpu = new GPU();
        console.log(this.gpu);
        // add numpy matrix conversion here
        this.matrixA = a;
        this.matrixB = b;
        this.matrixResult = [];
    }

    multiplyMatrix() {
        const gpu = this.gpu;
        const multiplyMatrix = gpu.createKernel(function (a, b) {
          let sum = 0;
          for (let i = 0; i < this.matSizeJ; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x];
          }
          return sum;
        }).setOutput([this.matSizeI, this.matSizeK])

        this.matrixResult = multiplyMatrix(this.matrixA, this.matrixB);
      }

}
