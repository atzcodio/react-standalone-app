import { queries } from '@testing-library/react';
import _, {LoDashStatic} from  'lodash'


interface Component {
  id: string;
  type: string;
  properties: any;
  position?: { x: number; y: number };
  size?: { width: number | string; height: number | string };
  output?: string; // Output property for formula evaluation
  _name: string;
}

interface Screen {
  id: string;
  body: Component[];
}

interface BaseGlobalContext {
  screens: Screen[];
  queries: any[];
  setQueries: (queries: any[]) => void,
  updateComponentByName: (name: string, field:string, value:any) => void;
  setPopup:(id:string)=>void;
  setSidebar:(id:string)=>void;
  setHeader:(id:string)=>void;
}

interface GlobalContext extends BaseGlobalContext {
  evaluateFormula: (formula: string, taskData?: { [key: string]: any }) => any;
}

// Function to evaluate formulas
const getComponentSuggestions = () => {
  // TODO: Implement suggestions based on component types and properties
  let functions = Object.keys(_).filter((key:string) => typeof _[key as keyof LoDashStatic] === 'function').map((name)=> {
    return "_."+ name;
  })

  let suggestions:string [] = [];
  globalContext.screens.forEach(screen => {
    screen.body.forEach(cmp => {
      let name = cmp.properties._name
      Object.keys(cmp.properties).forEach(prop => {
        if(prop !== '_name') {
          suggestions.push(name + '.' + prop);
        }
      })
    })
  })
  return suggestions.concat(functions);
}

const getComponentPropertiesMap = () => {
  // TODO: Implement suggestions based on component types and properties
  let map:Record<string,any> = {};
  let cmpKeys:Array<string> = [];
  let cmpValues:Array<any> = [];
  globalContext.screens.forEach(screen => {
    screen.body.forEach(cmp => {
      cmpKeys.push(cmp.properties._name);
      cmpValues.push(cmp.properties);
      // let name = cmp.properties._name;
      // map[name] = cmp.properties;

    })
  });
  globalContext.queries.forEach((query:any) => {
      if(query.name) {
        console.log(`🔍 [Formula Context] Query: ${query.name}`, {
          hasValue: !!query.value,
          valueKeys: query.value ? Object.keys(query.value) : 'null',
          hasRows: !!query.value?.rows,
          rowsLength: query.value?.rows?.length
        });
        cmpKeys.push(query.name);
        cmpValues.push(query.value);
      }
    })
  return {cmpKeys: cmpKeys, cmpValues:cmpValues};
}


const evaluateFormula = (formula = '',taskData: { [key: string]: any } = {},options: Record<string, string> = {}) => {
  // Check if screens and selectedScreenIndex are defined and valid
  let liveValues = options.liveValues || {};
  let REPEATITEMSEP = "__RPKEY__";
  try {
    // if (!globalContext.screens) {
    //   console.error('Invalid screen or selected screen index');
    //   return formula; // Return original formula if no valid screen found
    // }

    let {cmpKeys, cmpValues} = getComponentPropertiesMap();
    cmpKeys = cmpKeys.concat(Object.keys(taskData));
    cmpValues = cmpValues.concat(Object.values(taskData));

    // Function to get the exact component value, keeping its type intact
    const geExpressionData = (expression: string) => {
      // const screen = screens[selectedScreenIndex];
      // const parts = expression.split('.'); // Split path like "input.text" into ['input', 'text']
      // const componentName = parts[0]; // First part is the component name
      // const component = screen.body.find(c => c._name === componentName);
      var result = null;
      try {
        var funExpression = new Function(cmpKeys.join(","), "return "+expression);
        console.log("in FUNCTION EXPRESSION");
        result = funExpression(...cmpValues)
      }
      catch(ex:any) {
        result = null
        throw new Error(ex.message);
      }
      return result;
    };
  
  
    const isStringifiedJSON = (str: string) => {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      };

      if (formula == null) return null;

      let hasInterpolation = /{{([^}]+)}}/.test(formula);

      // Replace all {{expr}} with resolved values
      let replacedFormula = formula.replace(/{{([^}]+)}}/g, (match, p1) => {
        let expression = p1.trim();

        if (expression.includes(".ITEM.")) {
          expression = expression.split(".").join(REPEATITEMSEP);
        }

        let value = geExpressionData(expression);

        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);

        if (typeof value === "string") {
          // Escape quotes safely
          return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        }

        return value;
      });

      try {
        // ✅ Case 1: No curly braces at all → plain string
        if (!hasInterpolation) {
          const trimmed = replacedFormula.trim();
          if (trimmed === "true") return true;
          if (trimmed === "false") return false;
          if (isStringifiedJSON(trimmed)) return JSON.parse(trimmed);
          if (trimmed && !isNaN(Number(trimmed))) return Number(trimmed);
          return trimmed;
        }

        // ✅ Case 2: If it looks like a pure arithmetic/expression (no letters except inside props)
        if (/^[\d\s+\-*/().,'"\[\]{}]+$/.test(replacedFormula)) {
          return new Function("return " + replacedFormula)();
        }

        // ✅ Case 3: Treat as template string with interpolation
        // Convert formula to a proper JS template literal
        const templateFormula =
          "`" +
          formula.replace(/{{([^}]+)}}/g, "${geExpressionData('$1')}") +
          "`";
        const fnResult = new Function(
          "geExpressionData",
          "return " + templateFormula
        )(geExpressionData);

        return fnResult;

      }
      catch (ex:any) {
        console.error(
          "Error evaluating formula:",
          ex,
          "Formula:",
          formula,
          "Replaced:",
          replacedFormula
        );
        return replacedFormula;
      }
  }catch(ex:any) {
    //throw new Error(ex.message);
    return null;
  }
};



// Global context object
const globalContext: GlobalContext = {
  screens: [],
  queries: [],
  setQueries: (queries: any) => {},
  evaluateFormula,
  updateComponentByName: (name: string, field:string, value:any) => {},
  setSidebar:(id:string)=>{},
  setPopup:(id:string)=>{},
  setHeader:(id:string)=>{},
};

// Function to set the global context
export const setGlobalContext = (context: BaseGlobalContext): void => {
  globalContext.screens = context.screens;
  globalContext.queries = context.queries;
  globalContext.setQueries = context.setQueries;
  globalContext.setSidebar=context.setSidebar;
  globalContext.setPopup=context.setPopup;
  globalContext.setHeader=context.setHeader;
  globalContext.updateComponentByName = context.updateComponentByName
};

// Export the global context
export default globalContext;
