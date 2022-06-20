import * as Comlink from 'comlink';
import { executeOutput } from '@hedgehog/core';

importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");

async function loadPyodideAndPackages() {
  var setup_code = `
  import sys, io, traceback
  namespace = {}  # use separate namespace to hide run_code, modules, etc.
  def run_code(code):
    """run specified code and return stdout and stderr"""
    out = io.StringIO()
    oldout = sys.stdout
    olderr = sys.stderr
    sys.stdout = sys.stderr = out
    try:
        # change next line to exec(code, {}) if you want to clear vars each time
        exec(code, namespace)
    except:
        traceback.print_exc()

    sys.stdout = oldout
    sys.stderr = olderr
    return out.getvalue()
  `
  
  self.pyodide = await loadPyodide();
  self.pyodide.runPython(setup_code)
  await self.pyodide.loadPackage(["numpy", "pytz"]);
}

function setup_pyodide() {
  // setup pyodide environment to run code blocks as needed

  
}

let pyodideReadyPromise = loadPyodideAndPackages();

const outputWorker = {
  output: async (e: any) => {
    await pyodideReadyPromise;
    self.pyodide.globals.set("code_to_run",  e)
    let results = await self.pyodide.runPythonAsync('run_code(code_to_run)');
    console.log(results)
    return [{ itemType: 'TEXT', text: results } ];
    console.log(results);
    return executeOutput(e)
  }
};

Comlink.expose(outputWorker);

export default null as any;
