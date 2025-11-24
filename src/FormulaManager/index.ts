// FxStatesManager.ts — Optimized with Reverse Dependency Map
export interface FxState {
  fx: string;
  isFx: boolean;
  deps: string[]; // e.g. ["dropdown.value"]
  evaluatedAt?: number;
}

export interface FxStatesManagerState {
  formulaMeta: Record<string, Record<string, FxState>>;
  evaluationQueue: string[]; // ["input.value"]
  componentNameToIdMap: Record<string, string>; // name -> id
  reverseDeps: Record<string, Set<string>>; // depKey -> dependents
  liveValues: Record<string, any>; // e.g. { "dropdown.value": "first", "text.value": "second" }
}

export class FxStatesManager {
  private static instance: FxStatesManager;
  private state: FxStatesManagerState;
  private onFormulaUpdate?: (
    componentId: string,
    propertyName: string,
    newValue: any
  ) => void;
  private debug = false;

  private constructor(initialState?: FxStatesManagerState) {
    this.state = initialState || {
      formulaMeta: {},
      evaluationQueue: [],
      componentNameToIdMap: {},
      reverseDeps: {},
      liveValues: {},
    };
  }

  static getInstance(): FxStatesManager {
    if (!FxStatesManager.instance)
      FxStatesManager.instance = new FxStatesManager();
    return FxStatesManager.instance;
  }

  enableDebug(enable = true) {
    this.debug = enable;
  }

  private log(...args: any[]) {
    if (this.debug) console.log("[FxManager]", ...args);
  }

  // === Setup ===
  setOnFormulaUpdate(
    cb: (componentId: string, propertyName: string, newValue: any) => void
  ) {
    this.onFormulaUpdate = cb;
  }

  setComponentMapping(componentName: string, componentId: string) {
    this.state.componentNameToIdMap[componentName] = componentId;
  }

  // === Formula State ===
  setFxState(componentName: string, propertyName: string, fxState: FxState) {
    if (!this.state.formulaMeta[componentName])
      this.state.formulaMeta[componentName] = {};

    this.state.formulaMeta[componentName][propertyName] = fxState;
    this.log(`Set FxState for ${componentName}.${propertyName}`, fxState);

    // Register dependencies in reverse map
    this.registerReverseDeps(componentName, propertyName, fxState.deps);

    if (fxState.isFx) this.enqueue(`${componentName}.${propertyName}`);
  }

  getFxState(componentName: string, propertyName: string): FxState | undefined {
    return this.state.formulaMeta[componentName]?.[propertyName];
  }

  // === Dependency Extraction ===
  // extractDependencies(formula: string): string[] {
  //   console.log("🔍 [FormulaManager] Starting extraction for formula:", JSON.stringify(formula));
    
  //   const fields: Record<string, string> = {};
  //   if (!formula || typeof formula !== 'string') {
  //     console.log("🔍 [FormulaManager] Invalid formula input");
  //     return [];
  //   }

  //   // 🧪 MANUAL TEST: Test the specific failing case
  //   if (formula.includes('table3.data')) {
  //     console.log("🧪 [FormulaManager] Testing with the problematic formula:", formula);
  //   }

  //   // 🔧 SIMPLIFIED: Use a more robust approach
  //   const curlyBraceRegex = /\{\{([^}]+)\}\}/g;
  //   const matches: RegExpMatchArray[] = [];
    
  //   // Method 1: Try matchAll
  //   try {
  //     const matchAllResult = Array.from(formula.matchAll(curlyBraceRegex));
  //     console.log("🔍 [FormulaManager] matchAll result:", matchAllResult);
  //     matches.push(...matchAllResult);
  //   } catch (error) {
  //     console.log("🔍 [FormulaManager] matchAll failed:", error);
  //   }

  //   // Method 2: Fallback to exec if matchAll didn't work
  //   if (matches.length === 0) {
  //     console.log("🔍 [FormulaManager] Using exec fallback");
  //     curlyBraceRegex.lastIndex = 0; // Reset regex
  //     let execMatch;
  //     while ((execMatch = curlyBraceRegex.exec(formula)) !== null) {
  //       console.log("🔍 [FormulaManager] exec found match:", execMatch);
  //       matches.push(execMatch);
  //       // Prevent infinite loop
  //       if (!curlyBraceRegex.global) break;
  //     }
  //   }

  //   // Method 3: Manual string parsing as last resort
  //   if (matches.length === 0) {
  //     console.log("🔍 [FormulaManager] Using manual string parsing");
  //     const startIdx = formula.indexOf('{{');
  //     const endIdx = formula.indexOf('}}', startIdx);
  //     if (startIdx !== -1 && endIdx !== -1) {
  //       const content = formula.substring(startIdx + 2, endIdx);
  //       console.log("🔍 [FormulaManager] Manual extraction found:", content);
  //       matches.push(['{{' + content + '}}', content] as RegExpMatchArray);
  //     }
  //   }

  //   console.log("🔍 [FormulaManager] Total matches found:", matches.length, matches);

  //   // Process each match to extract field names
  //   matches.forEach((match, index) => {
  //     const innerExpression = match[1];
  //     console.log(`🔍 [FormulaManager] Processing match ${index}:`, innerExpression);

  //     // Extract field names using a more permissive regex
  //     const fieldRegex = /[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*/g;
  //     const fieldMatches = Array.from(innerExpression.matchAll(fieldRegex));
      
  //     console.log(`🔍 [FormulaManager] Field matches in "${innerExpression}":`, fieldMatches);
      
  //     fieldMatches.forEach((fieldMatch) => {
  //       let key = fieldMatch[0];
  //       console.log("🔍 [FormulaManager] Processing potential field:", key);
        
  //       // Skip lodash function names
  //       if (key.startsWith("_.")) {
  //         console.log("🔍 [FormulaManager] Skipping lodash function:", key);
  //         return;
  //       }
        
  //       // Skip JavaScript built-ins and common keywords
  //       const jsBuiltins = ['console', 'window', 'document', 'Math', 'Date', 'JSON', 'Object', 'Array', 'String', 'Number', 'Boolean', 'function', 'var', 'let', 'const', 'if', 'else', 'for', 'while', 'return', 'true', 'false', 'null', 'undefined'];
  //       if (jsBuiltins.includes(key)) {
  //         console.log("🔍 [FormulaManager] Skipping JS builtin:", key);
  //         return;
  //       }
        
  //       // Extract the root component name (e.g., "table3" from "table3.data")
  //       const rootComponent = key.split('.')[0];
  //       console.log("🔍 [FormulaManager] Root component extracted:", rootComponent);
        
  //       // Add both the full path and root component
  //       fields[key] = key;
  //       if (rootComponent !== key) {
  //         fields[rootComponent] = rootComponent;
  //       }
        
  //       console.log("🔍 [FormulaManager] Added fields:", key, rootComponent);
  //     });
  //   });

  //   const dependencies = [...Object.keys(fields)];
  //   console.log("🔍 [FormulaManager] Final extractDependencies result:", {
  //     formula,
  //     extractedDeps: dependencies,
  //     fieldsObject: fields
  //   });
    
  //   return dependencies;
  // }

extractDependencies(formula: string): string[] {
  if (!formula || typeof formula !== "string") return [];

  const bracesRegex = /\{\{([\s\S]*?)\}\}/g;
  const matches = Array.from(formula.matchAll(bracesRegex));

  const deps = new Set<string>();

  // Words/idents to skip entirely
  const jsSkip = new Set([
    "console","window","document","Math","Date","JSON","Object","Array",
    "String","Number","Boolean","function","var","let","const","if","else",
    "for","while","return","true","false","null","undefined"
  ]);

  for (const m of matches) {
    let expr = m[1];

    // 1) Remove string literals (single/double/template) so quoted args like "firstName" are ignored
    //    This regex removes sequences like 'text', "text", `text ${x}`.
    expr = expr.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, " ");

    // 2) Optionally remove comments (single-line // and block /* */)
    expr = expr.replace(/\/\/.*$/gm, " ").replace(/\/\*[\s\S]*?\*\//g, " ");

    // 3) Find variable-like dotted tokens (allow $ and _ in identifiers)
    const tokenRegex = /[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*/g;
    const tokens = expr.match(tokenRegex) || [];

    for (const t of tokens) {
      // skip lodash call like _.map (starts with "_.")
      if (t.startsWith("_.") || t === "_") continue;

      // skip JS builtins / keywords
      if (jsSkip.has(t)) continue;

      // skip plain numeric identifiers (rare) - but token regex won't match pure numbers
      // Add the full dotted path as dependency (e.g., table.data)
      deps.add(t);
    }
  }

  return Array.from(deps);
}




  updateDependencies(
    componentName: string,
    propertyName: string,
    formula: string
  ) {
    const fxState = this.getFxState(componentName, propertyName);
    if (!fxState) return;
    fxState.deps = this.extractDependencies(formula);
    this.registerReverseDeps(componentName, propertyName, fxState.deps);
    this.log(
      `Updated deps for ${componentName}.${propertyName}:`,
      fxState.deps
    );
  }

  // === Reverse Dependency Map ===
  private registerReverseDeps(
    componentName: string,
    propertyName: string,
    deps: string[]
  ) {
    const targetKey = `${componentName}.${propertyName}`;

    // Remove old reverse deps first
    Object.keys(this.state.reverseDeps).forEach((dep) => {
      this.state.reverseDeps[dep].delete(targetKey);
      if (this.state.reverseDeps[dep].size === 0)
        delete this.state.reverseDeps[dep];
    });

    // Register new dependencies
    deps.forEach((dep) => {
      if (!this.state.reverseDeps[dep]) this.state.reverseDeps[dep] = new Set();
      this.state.reverseDeps[dep].add(targetKey);
    });

    this.log(`Registered reverseDeps for ${targetKey}:`, deps);
  }

  // === Queue Handling ===
  private enqueue(key: string) {
    if (!this.state.evaluationQueue.includes(key)) {
      this.state.evaluationQueue.push(key);
      this.log("Queued:", key);
    }
  }

  markComponentForEvaluation(changedName: string, changedField: string) {
    const dependencyKey = `${changedName}.${changedField}`;
    const visited = new Set<string>();

    this.log(`Marking components for evaluation due to change: ${dependencyKey}`);

    const markRecursive = (depKey: string) => {
      if (visited.has(depKey)) return;
      visited.add(depKey);

      Object.entries(this.state.formulaMeta).forEach(([cmpName, props]) => {
        Object.entries(props).forEach(([propName, fxState]) => {
          if (!fxState.isFx || !fxState.deps?.length) return;

          // Check for direct dependency match
          const hasDirectDependency = fxState.deps.includes(depKey);
          
          // Check for nested dependency match (e.g., if depKey is "table.selected_row", 
          // also match dependencies like "table.selected_row.email")
          const hasNestedDependency = fxState.deps.some(dep => dep.startsWith(depKey + "."));

          if (hasDirectDependency || hasNestedDependency) {
            const queueKey = `${cmpName}.${propName}`;
            
            this.log(`Dependency FOUND1111111 and Marked: ${queueKey} depends on ${depKey}`);

            // add to evaluation queue if not already there
            if (!this.state.evaluationQueue.includes(queueKey)) {
              this.state.evaluationQueue.push(queueKey);
              this.log(`Queued: ${queueKey}`);
            }

            // recursively mark further dependents
            markRecursive(queueKey);
          }
        });
      });
    };

    markRecursive(dependencyKey);

    this.log("Final evaluation queue:", this.state.evaluationQueue);
  }

  // === Evaluation Processing ===
  // processEvaluationQueue(formulaEngine: (formula: string) => any) {
  //   const processed: string[] = [];
  //   this.log("Processing queue:", this.state.evaluationQueue);

  //   this.state.evaluationQueue.forEach(queueKey => {
  //     const [componentName, propertyName] = queueKey.split(".");
  //     const fxState = this.getFxState(componentName, propertyName);
  //     if (!fxState?.isFx || !fxState.fx) return;

  //     try {
  //       const newValue = formulaEngine(fxState.fx);
  //       fxState.evaluatedAt = Date.now();
  //       const cmpId = this.state.componentNameToIdMap[componentName];
  //       if (this.onFormulaUpdate) this.onFormulaUpdate(cmpId, propertyName, newValue);
  //       this.log(`Evaluated: ${queueKey} →`, newValue);
  //       processed.push(queueKey);
  //     } catch (err) {
  //       console.error(`Error evaluating ${queueKey}:`, err);
  //     }
  //   });

  //   this.state.evaluationQueue = this.state.evaluationQueue.filter(k => !processed.includes(k));
  // }

  processEvaluationQueue(formulaEngine: (formula: string, taskData?: Record<string, any>, options?: Record<string, any>) => any) {
    const visited = new Set<string>();

    while (this.state.evaluationQueue.length > 0) {
      const queueKey = this.state.evaluationQueue.shift()!;
      if (visited.has(queueKey)) continue;
      visited.add(queueKey);

      const [componentName, propertyName] = queueKey.split(".");
      const fxState = this.getFxState(componentName, propertyName);
      if (!fxState?.isFx || !fxState.fx) continue;

      try {
        // ✅ Evaluate the formula
        const newValue = formulaEngine(fxState.fx, {}, {
          liveValues: this.state.liveValues
        });

        // ✅ Cache the evaluated value immediately
        this.state.liveValues[queueKey] = newValue;
        fxState.evaluatedAt = Date.now();

        console.log("Dependency Live Values EXECUTED AND TYRING TO SET:", queueKey, newValue,this.onFormulaUpdate);

        // ✅ Notify React/UI
        const cmpId = this.state.componentNameToIdMap[componentName];
        if (this.onFormulaUpdate)
          this.onFormulaUpdate(cmpId, propertyName, newValue);

        this.log(`Evaluated: ${queueKey} →`, newValue);

        // ✅ Enqueue dependents (multi-level propagation)
        const dependents = this.state.reverseDeps[queueKey];
        if (dependents?.size) {
          dependents.forEach((depKey) => {
            if (
              !visited.has(depKey) &&
              !this.state.evaluationQueue.includes(depKey)
            ) {
              this.state.evaluationQueue.push(depKey);
              this.log(`Queued dependent: ${depKey}`);
            }
          });
        }
      } catch (err) {
        console.error(`Error evaluating ${queueKey}:`, err);
      }
    }
  }

  // === Data/Query Change Handling ===
  /**
   * Mark all formulas that depend on a specific data source (query) for re-evaluation
   * @param dataName - The name of the data source (query name)
   */
  markDataDependentsForEvaluation(dataName: string) {
    this.log(`🔍 [FxManager] Marking dependents for data change: ${dataName}`);
    
    let foundDependencies = 0;
    
    // Look for formulas that directly reference this data name
    Object.entries(this.state.formulaMeta).forEach(([componentName, props]) => {
      Object.entries(props).forEach(([propertyName, fxState]) => {
        if (!fxState.isFx || !fxState.deps?.length) return;
        
        // Check if any dependency matches the data name
        const hasDataDependency = fxState.deps.some(dep => {
          // Direct match (e.g., "queryName" or "queryName.someProperty")
          return dep === dataName || dep.startsWith(`${dataName}.`);
        });
        
        if (hasDataDependency) {
          foundDependencies++;
          const queueKey = `${componentName}.${propertyName}`;
          this.log(`🔍 [FxManager] Found data dependency: ${queueKey} depends on ${dataName}`);
          this.log(`🔍 [FxManager] Component formula: ${fxState.fx}`);
          this.log(`🔍 [FxManager] Component dependencies: ${JSON.stringify(fxState.deps)}`);
          
          // Add to evaluation queue if not already there
          if (!this.state.evaluationQueue.includes(queueKey)) {
            this.state.evaluationQueue.push(queueKey);
            this.log(`🔍 [FxManager] Queued for data update: ${queueKey}`);
          }
        }
      });
    });
    
    this.log(`🔍 [FxManager] Total dependencies found for ${dataName}: ${foundDependencies}`);
    this.log(`🔍 [FxManager] Current evaluation queue:`, this.state.evaluationQueue);
    
    this.log("Evaluation queue after data change:", this.state.evaluationQueue);
  }

  /**
   * Handle query/data name changes - update dependencies and re-evaluate
   * @param oldName - Previous query name
   * @param newName - New query name
   */
  handleDataNameChange(oldName: string, newName: string) {
    if (oldName === newName) return;
    
    this.log(`Handling data name change: ${oldName} → ${newName}`);
    
    // Update all formulas that reference the old name
    Object.entries(this.state.formulaMeta).forEach(([componentName, props]) => {
      Object.entries(props).forEach(([propertyName, fxState]) => {
        if (!fxState.isFx || !fxState.deps?.length) return;
        
        // Check if dependencies need updating
        const updatedDeps = fxState.deps.map(dep => {
          if (dep === oldName) return newName;
          if (dep.startsWith(`${oldName}.`)) {
            return dep.replace(`${oldName}.`, `${newName}.`);
          }
          return dep;
        });
        
        // If dependencies changed, update them
        const depsChanged = updatedDeps.some((dep, index) => dep !== fxState.deps![index]);
        if (depsChanged) {
          fxState.deps = updatedDeps;
          this.log(`Updated dependencies for ${componentName}.${propertyName}:`, updatedDeps);
          
          // Re-register reverse dependencies
          this.registerReverseDeps(componentName, propertyName, updatedDeps);
          
          // Mark for re-evaluation
          const queueKey = `${componentName}.${propertyName}`;
          if (!this.state.evaluationQueue.includes(queueKey)) {
            this.state.evaluationQueue.push(queueKey);
          }
        }
      });
    });
  }

  /**
   * Update formula and regenerate all dependency metadata
   * Called when a component formula is saved/changed
   * @param componentName - Name of the component
   * @param propertyName - Property name with the formula
   * @param newFormula - The new formula string
   */
  updateFormulaAndDependencies(
    componentName: string,
    propertyName: string,
    newFormula: string
  ) {
    this.log(`🔄 [FxManager] Updating formula for ${componentName}.${propertyName}:`, newFormula);
    
    const targetKey = `${componentName}.${propertyName}`;
    
    // 🔧 EXPLICIT CLEANUP: Remove old dependencies first
    const oldFxState = this.getFxState(componentName, propertyName);
    if (oldFxState && oldFxState.deps) {
      this.log(`🔄 [FxManager] Cleaning up old dependencies:`, oldFxState.deps);
      
      // Remove this formula from reverse dependencies of its old dependencies
      oldFxState.deps.forEach(oldDep => {
        if (this.state.reverseDeps[oldDep]) {
          this.state.reverseDeps[oldDep].delete(targetKey);
          if (this.state.reverseDeps[oldDep].size === 0) {
            delete this.state.reverseDeps[oldDep];
          }
          this.log(`🔄 [FxManager] Removed ${targetKey} from ${oldDep} dependencies`);
        }
      });
    }
    
    // Extract new dependencies
    const newDeps = this.extractDependencies(newFormula);
    this.log(`🔄 [FxManager] New dependencies extracted:`, newDeps);
    
    // Create/update FxState
    const fxState = {
      fx: newFormula,
      isFx: newFormula.trim().length > 0,
      deps: newDeps,
      evaluatedAt: Date.now()
    };
    
    // Update formula metadata directly (skip setFxState to avoid double cleanup)
    if (!this.state.formulaMeta[componentName]) {
      this.state.formulaMeta[componentName] = {};
    }
    this.state.formulaMeta[componentName][propertyName] = fxState;
    
    // 🔧 EXPLICIT REGISTRATION: Register new dependencies
    newDeps.forEach(dep => {
      if (!this.state.reverseDeps[dep]) {
        this.state.reverseDeps[dep] = new Set();
      }
      this.state.reverseDeps[dep].add(targetKey);
      this.log(`🔄 [FxManager] Added ${targetKey} to ${dep} dependencies`);
    });
    
    this.log(`🔄 [FxManager] Updated dependencies for ${componentName}.${propertyName}:`, newDeps);
    
    // If formula is active, queue for evaluation
    if (fxState.isFx && newFormula.trim().length > 0) {
      this.enqueue(targetKey);
      this.log(`🔄 [FxManager] Queued for evaluation: ${targetKey}`);
    }
    
    // Debug: Log reverse dependencies state
    this.log(`🔄 [FxManager] Current reverse dependencies:`, this.state.reverseDeps);
    
    return fxState;
  }

  /**
   * Regenerate all reverse dependencies - useful after bulk formula changes
   */
  regenerateAllReverseDependencies() {
    this.log(`🔄 [FxManager] Regenerating all reverse dependencies...`);
    
    // Clear existing reverse dependencies
    this.state.reverseDeps = {};
    
    // Rebuild from all current formulas
    Object.entries(this.state.formulaMeta).forEach(([componentName, props]) => {
      Object.entries(props).forEach(([propertyName, fxState]) => {
        if (fxState.deps && fxState.deps.length > 0) {
          this.registerReverseDeps(componentName, propertyName, fxState.deps);
        }
      });
    });
    
    this.log(`🔄 [FxManager] Reverse dependencies regenerated:`, this.state.reverseDeps);
  }

  /**
   * Remove formula and clean up all associated dependencies
   * @param componentName - Name of the component
   * @param propertyName - Property name with the formula
   */
  removeFormula(componentName: string, propertyName: string) {
    this.log(`🗑️ [FxManager] Removing formula for ${componentName}.${propertyName}`);
    
    const targetKey = `${componentName}.${propertyName}`;
    
    // Remove from formula metadata
    if (this.state.formulaMeta[componentName]) {
      delete this.state.formulaMeta[componentName][propertyName];
      
      // Clean up empty component metadata
      if (Object.keys(this.state.formulaMeta[componentName]).length === 0) {
        delete this.state.formulaMeta[componentName];
      }
    }
    
    // Remove from reverse dependencies
    Object.keys(this.state.reverseDeps).forEach((dep) => {
      this.state.reverseDeps[dep].delete(targetKey);
      if (this.state.reverseDeps[dep].size === 0) {
        delete this.state.reverseDeps[dep];
      }
    });
    
    // Remove from evaluation queue
    this.state.evaluationQueue = this.state.evaluationQueue.filter(
      key => key !== targetKey
    );
    
    // Remove from live values
    if (this.state.liveValues[targetKey]) {
      delete this.state.liveValues[targetKey];
    }
    
    this.log(`🗑️ [FxManager] Formula removed and dependencies cleaned up`);
  }

  /**
   * Get all formulas that depend on a specific component property
   * @param componentName - Name of the component
   * @param propertyName - Property name
   */
  getDependents(componentName: string, propertyName: string): string[] {
    const dependencyKey = `${componentName}.${propertyName}`;
    const dependents = this.state.reverseDeps[dependencyKey];
    return dependents ? Array.from(dependents) : [];
  }

  /**
   * Get detailed dependency information for debugging
   */
  getDependencyDebugInfo() {
    const info = {
      totalFormulas: 0,
      totalDependencies: Object.keys(this.state.reverseDeps).length,
      formulasByComponent: {} as Record<string, number>,
      dependencyGraph: this.state.reverseDeps,
      queueLength: this.state.evaluationQueue.length,
      liveValuesCount: Object.keys(this.state.liveValues).length
    };
    
    Object.entries(this.state.formulaMeta).forEach(([componentName, props]) => {
      const formulaCount = Object.keys(props).length;
      info.totalFormulas += formulaCount;
      info.formulasByComponent[componentName] = formulaCount;
    });
    
    return info;
  }

  // === Getters ===
  getState() {
    return { ...this.state };
  }
  
  // === Testing & Debugging ===
  testDependencyExtraction() {
    console.log("🧪 Testing dependency extraction:");
    
    // Test the specific problematic formula first
    console.log("🧪 === TESTING PROBLEMATIC FORMULA ===");
    const problematicFormula = '{{_.map(table3.data,"firstName")}}';
    const problematicResult = this.extractDependencies(problematicFormula);
    console.log(`🧪 RESULT: ${problematicFormula} -> Dependencies:`, problematicResult);
    
    console.log("🧪 === TESTING OTHER FORMULAS ===");
    const testCases = [
      "{{_.map(table3.data, 'firstName')}}",
      "{{_.filter(users.data, user => user.active)}}",
      "{{table1.selected_row.email}}",
      "{{dropdown.value + input.value}}",
      "{{_.sum(orders.data, 'amount')}}",
      "{{_.find(customers.data, c => c.id === selected.id)}}"
    ];
    
    testCases.forEach(formula => {
      const deps = this.extractDependencies(formula);
      console.log(`Formula: ${formula} -> Dependencies:`, deps);
    });
    
    // Manual test to verify regex
    console.log("🧪 === MANUAL REGEX TEST ===");
    const testRegex = /\{\{([^}]+)\}\}/g;
    const testString = '{{_.map(table3.data,"firstName")}}';
    console.log("Test string:", testString);
    console.log("Regex test result:", testRegex.test(testString));
    
    testRegex.lastIndex = 0; // Reset
    const manualMatch = testRegex.exec(testString);
    console.log("Manual exec result:", manualMatch);
  }
}

export default FxStatesManager;
