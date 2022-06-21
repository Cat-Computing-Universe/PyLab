# This file defines the necessary decorated functions for 2D Matrix GPU multiplication
import numpy as np
from js import gpumatmul
from pyodide import to_js

def gmm(a, b, to_numpy=False):
    result = gpumatmul(to_js(a), to_js(b))
    if to_numpy:
        return np.array(result.to_py())

    return result