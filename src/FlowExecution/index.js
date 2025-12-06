import toast from 'react-hot-toast';
// import ApiTask from './apiTask';
// import toastTask from './toastTask';
import globalContext from './../context/GlobalContext';



/* 
  @ToastTask function to display toast messages 
  @param {Object} apiData - Data for the toast node
  @param {String} apiData.message - Message for the toast
  @param {String} apiData.type - Type of toast (success, error, info, warning)
*/

const ToastTask = async (apiData) => {
  try {
    const { message, type = 'success', duration = 3 } = apiData;
    
    // Evaluate formulas
    const evaluatedMessage = globalContext.evaluateFormula(message, OUTPUTSTORE);
    const evaluatedType = type;
    const evaluatedDuration = duration * 1000; // Convert to milliseconds
    
    // Display toast based on type
    const toastOptions = {
      duration: evaluatedDuration
    };
    
    switch (evaluatedType) {
      case 'success':
        toast.success(evaluatedMessage, toastOptions);
        break;
      case 'error':
        toast.error(evaluatedMessage, toastOptions);
        break;
      case 'warning':
        toast(evaluatedMessage, {
          ...toastOptions,
          icon: '⚠️'
        });
        break;
      case 'info':
      default:
        toast(evaluatedMessage, {
          ...toastOptions,
          icon: 'ℹ️'
        });
        break;
    }
    
    return {
      OUTPUT: {
        success: true,
        message: evaluatedMessage,
        type: evaluatedType,
        duration: duration,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Toast error:', error);
    return { OUTPUT: { success: false, error: error.message } };
  }
}

/* 
  @AlertTask function to display toast messages 
  @param {Object} apiData - Data for the toast node
  @param {String} apiData.message - Message for the toast
  @param {String} apiData.type - Type of toast (success, error, info, warning)
*/

const AlertTask = async (apiData) => {
  const { message } = apiData;
  alert(message);
  return 1;
}


/* 
  @JSTask function to display toast messages 
  @param {Object} apiData - Data for the toast node
  @param {String} apiData.message - Message for the toast
  @param {String} apiData.type - Type of toast (success, error, info, warning)
*/

// const JSTask = async (apiData) => {
//   const { params, code } = apiData;
//   let result = globalContext.evaluateFormula(params, OUTPUTSTORE);
//   var executionFunction = new Function("params", code);
//   let Output = executionFunction(result);
//   console.log("JS output of code", Output)
//   return { "OUTPUT": Output };
// }


const JSTask = async (apiData) => {
  var OUTPUTSTORE = {};
  console.log("JSTask executing with async support")
  const { params, code } = apiData;
  
  console.log("JS apidata", apiData, params)
  let newParams = Object.keys(params).reduce((accumulator, key) => {
    let result = globalContext.evaluateFormula(params[key], OUTPUTSTORE);
    accumulator[key] = result;
    return accumulator;
  }, {})

  try {
    // Check if code contains async/await keywords
    const isAsync = /\b(async|await)\b/.test(code);
    
    if (isAsync) {
      // Create async function for async code
      const asyncExecutionFunction = new Function(
        Object.keys(newParams).join(','), 
        `return (async () => {\n${code}\n})()`
      );
      let Output = await asyncExecutionFunction(...Object.values(newParams));
      console.log("JS async output:", Output);
      return { "OUTPUT": Output };
    } else {
      // Regular synchronous execution
      const executionFunction = new Function(Object.keys(newParams).join(','), code);
      let Output = executionFunction(...Object.values(newParams));
      console.log("JS sync output:", Output);
      return { "OUTPUT": Output };
    }
  } catch (error) {
    console.error("JS execution error:", error);
    return { "ERROR": error.message, "OUTPUT": null };
  }
}


/* 
  @SetData function to display toast messages 
  @param {Object} apiData - Data for the toast node
  @param {String} apiData.message - Message for the toast
  @param {String} apiData.type - Type of toast (success, error, info, warning)
*/

const SetData = async (apiData) => {
  const { control_name, property_name, formula } = apiData;
  let result = globalContext.evaluateFormula(formula, OUTPUTSTORE);
  globalContext.updateComponentByName(control_name, property_name, result);
  return { "OUTPUT": result };
}

// Function For ScreenType
const NavigateToScreen = async (apiData, curNode, nodes, options) => {
  try {
    const { screenId, position, heightOrWidth, height, width } = apiData;
    const { setPopup, setSidebar, setHeader, selectedSidebarId, selectedPopupId, selectedHeaderId, screens, setSelectedScreenIndex, initandOpenSidebar, initandOpenPopup, initandOpenHeader, navigate } = options;
    
    // Evaluate formulas in the parameters
    const evaluatedScreenId = globalContext.evaluateFormula(screenId, OUTPUTSTORE);
    const evaluatedPosition = position ? globalContext.evaluateFormula(position, OUTPUTSTORE) : position;
    const evaluatedHeightOrWidth = heightOrWidth ? globalContext.evaluateFormula(heightOrWidth, OUTPUTSTORE) : heightOrWidth;
    const evaluatedHeight = height ? globalContext.evaluateFormula(height, OUTPUTSTORE) : height;
    const evaluatedWidth = width ? globalContext.evaluateFormula(width, OUTPUTSTORE) : width;
    
    console.log('NavigateToScreen: Evaluated parameters', {
      screenId: evaluatedScreenId,
      position: evaluatedPosition,
      heightOrWidth: evaluatedHeightOrWidth,
      height: evaluatedHeight,
      width: evaluatedWidth
    });
    
    for (var i = 0; i < screens.length; i++) {
      if (screens[i]["id"] == evaluatedScreenId) {
        if (screens[i]["type"] == "popup") {
          if (selectedPopupId == evaluatedScreenId) {
            setPopup(null);
          }
          // Ensure width and height have proper units
          const popupHeight = evaluatedHeight && !evaluatedHeight.includes('px') && !evaluatedHeight.includes('%') 
            ? evaluatedHeight + 'px' 
            : evaluatedHeight || '400px';
          const popupWidth = evaluatedWidth && !evaluatedWidth.includes('px') && !evaluatedWidth.includes('%')
            ? evaluatedWidth + 'px'
            : evaluatedWidth || '400px';
          
          console.log('Opening popup with dimensions:', { height: popupHeight, width: popupWidth });
          initandOpenPopup(evaluatedScreenId, popupHeight, popupWidth);
          
          toast.success(`Opened popup: ${screens[i].properties?.title || evaluatedScreenId}`);
          break;
        }
        else if (screens[i]["type"] == "sidebar") {
          if (selectedSidebarId == evaluatedScreenId) {
            setSidebar(null);
          }
          initandOpenSidebar(evaluatedScreenId, evaluatedPosition, evaluatedHeightOrWidth);
          toast.success(`Opened sidebar: ${screens[i].properties?.title || evaluatedScreenId}`);
          break;
        }
        else if (screens[i]["type"] == "header") {
          if (selectedHeaderId == evaluatedScreenId) {
            setHeader(null);
          }
          initandOpenHeader(evaluatedScreenId, evaluatedHeight, evaluatedPosition);
          toast.success(`Opened header: ${screens[i].properties?.title || evaluatedScreenId}`);
          break;
        }
        else if (screens[i]["type"] == "screen") {
          if (navigate && typeof navigate === 'function') {
            navigate(`/preview/${evaluatedScreenId}`);
          } else {
            window.location.href = `/preview/${evaluatedScreenId}`;
          }
          toast.success(`Navigated to screen: ${screens[i].properties?.title || evaluatedScreenId}`);
          break;
        }
      }
    }
    
    return { 
      OUTPUT: { 
        success: true,
        screenId: evaluatedScreenId,
        screenType: screens.find(s => s.id === evaluatedScreenId)?.type || 'unknown'
      } 
    };
  } catch (error) {
    console.error('NavigateToScreen error:', error);
    toast.error(`Navigation error: ${error.message}`);
    return { OUTPUT: { success: false, error: error.message } };
  }
};

// Navigate To Next Screen
const NavigateToNextScreen = async (apiData, curNode, nodes, options) => {
  try {
    const { screens, navigate } = options;
    
    console.log('NavigateToNextScreen: Starting navigation logic', { screens });
    
    // Filter screens to only get 'screen' type
    const screenList = screens.filter((screen) => screen.type === 'screen');
    console.log('NavigateToNextScreen: Available screens', screenList);

    if (screenList.length === 0) {
      console.warn('NavigateToNextScreen: No screens of type "screen" found');
      toast.warning('No screens available for navigation');
      return { OUTPUT: { success: false, message: 'No screens available' } };
    }

    // Get the current screen ID from the URL
    const currentScreenId = new URL(window.location.href).pathname.split('/').pop();
    console.log('NavigateToNextScreen: Current screen ID', currentScreenId);
    
    // Find current screen index
    const currentScreenIndex = screenList.findIndex((screen) => screen.id === currentScreenId);
    console.log('NavigateToNextScreen: Current screen index', currentScreenIndex);

    if (currentScreenIndex === -1) {
      console.error('NavigateToNextScreen: Current screen not found in the list');
      toast.error('Current screen not found in navigation list');
      return { OUTPUT: { success: false, message: 'Current screen not found' } };
    }

    // Get next screen
    const nextScreenIndex = currentScreenIndex + 1;
    const nextScreen = screenList[nextScreenIndex];
    
    if (nextScreen) {
      console.log(`NavigateToNextScreen: Navigating to ${nextScreen.id}`);
      
      // Use navigate function if available
      if (navigate && typeof navigate === 'function') {
        navigate(`/preview/${nextScreen.id}`);
        toast.success(`Navigated to ${nextScreen.properties?.title || nextScreen.id}`);
      } else {
        // Fallback to window.location if navigate not available
        window.location.href = `/preview/${nextScreen.id}`;
        toast.success(`Navigating to ${nextScreen.properties?.title || nextScreen.id}`);
      }
      
      return { 
        OUTPUT: { 
          success: true,
          fromScreen: currentScreenId,
          toScreen: nextScreen.id,
          screenTitle: nextScreen.properties?.title || nextScreen.id
        } 
      };
    } else {
      console.log('NavigateToNextScreen: No more screens to navigate to');
      toast.info('You are on the last screen');
      
      return { 
        OUTPUT: { 
          success: false, 
          message: 'Already on the last screen',
          currentScreen: currentScreenId,
          totalScreens: screenList.length
        } 
      };
    }
  } catch (error) {
    console.error('NavigateToNextScreen: Error during navigation', error);
    toast.error(`Navigation error: ${error.message}`);
    
    return { 
      OUTPUT: { 
        success: false, 
        error: error.message 
      } 
    };
  }
};


/* 
  @Delay function to display toast messages 
  @param {Object} apiData - Data for the toast node
  @param {String} apiData.message - Message for the toast
  @param {String} apiData.type - Type of toast (success, error, info, warning)
*/

const DelayTask = async (apiData) => {
  const { delay } = apiData;
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, delay)
  });
  return 1;
}


/* 
  @Loop function to Iterate
  @param {Object} apiData - Data for the toast node
  @param {String} apiData.message - Message for the toast
  @param {String} apiData.type - Type of toast (success, error, info, warning)
*/

const LoopTask = async (apiData, curNode) => {
  const children = curNode.children;
  const { count } = apiData;
  let result = [];
  for (let i = 0; i < count; i++) {
    console.log(`Starting iteration ${i + 1}`);
    if (children && children.length > 0) {
      let r = await executeFlow(children, children[0].id);
      result.push(r);
    }
  }
  return result;
}

const FxExecuteQueryTask = async (data) => {
  const { name } = data;
  // find query by name and then call executeFlow on it
  const query = globalContext.queries.find((q) => q.name === name);
  if (query) {
    let r = await executeFlow([query], query.id);


    const updatedQueries = globalContext.queries.map((query) =>
      query.name === name
        ? { ...query, value: r.OUTPUT }
        : query
    );
    globalContext.setQueries(updatedQueries);
    return r;
  }
  return { "OUTPUT": name };
}
/* write fx task description here 
  
*/


const FxTask = async (apiData) => {
  const { fx_data } = apiData;
  let result = globalContext.evaluateFormula(fx_data, OUTPUTSTORE);
  console.log("fxresult",result)
  return { "OUTPUT": result };
}

/* 
@param {Array} nodes - Array of nodes in the flow
@TaskTask {Object} apiData - Data for the API call node
@param {String} apiData.endpoint - Endpoint for the API call
@param {String} apiData.method - HTTP method for the API call
@param {String} apiData.headers - Headers for the API call
@param {String} apiData.params - Parameters for the API call
@param {Number} apiData.timeout - Timeout for the API call
@param {Object} toastData - Data for the toast node
@param {String} toastData.message - Message for the toast
@param {String} toastData.type - Type of toast (success, error, info, warning)
*/

// //function to convert formula iteratively and replace it with exact value
// const executeFormula = (objects) =>{
//   const  {evaluateFormula} =useComponentContext();
//   let evaluatedObject = Object.keys(objects).forEach(key=>{
//     if(typeof key !== Object){
//       return key;
//     }
//     let x={}
//     Object.keys(objects(key)).forEach(key1=>{
//       let keyPart=evaluateFormula(key1);
//       let valuePart = evaluateFormula(objects[key][key1])
//       x.keyPart = valuePart;
//     });
//     return x;
//   })
// }

// Function to convert formula iteratively and replace it with exact value
const evaluateApiData = (objects) => {
  // console.log("apiData---?objects",Object.keys(objects['pathParams']))
  let { pathParams } = objects;
  return Object.keys(objects).reduce((accumulator, currentKey) => {
    if (currentKey === 'endpoint') {
      // Replace placeholders in the endpoint
      const evaluatedEndpoint = objects['endpoint'].replace(/{{(.*?)}}/g, (_, expression) => {
        // return globalContext.evaluateFormula(`{{${expression}}}`); // Evaluate each placeholder
        return pathParams[expression];
      });
      console.log("Evaluated Endpoint:", evaluatedEndpoint);
      accumulator[currentKey] = evaluatedEndpoint;
      return accumulator;
    }
    else if (typeof objects[currentKey] === 'number' || typeof objects[currentKey] === 'boolean') {
      console.log("keyPartEvaluated(notEvaluated)", objects[currentKey], typeof objects[currentKey])
      accumulator[currentKey] = objects[currentKey];
      console.log("keyPartEvaluated(Evaluated)", objects[currentKey], typeof objects[currentKey])
    }
    else if (typeof objects[currentKey] !== 'object') {
      if (currentKey === 'responseFormat' && objects[currentKey] === 'JSON') {//evaluaated value of this was causing problem
        console.log("keyPartEvaluated(notEvaluated)", objects[currentKey], typeof objects[currentKey])
        accumulator[currentKey] = objects[currentKey];
        console.log("keyPartEvaluated(Evaluated)===", globalContext.evaluateFormula(objects[currentKey]), typeof objects[currentKey])
        accumulator['responseFormat'] = 'JSON';
        return accumulator;
      }
      else {
        console.log("keyPartEvaluated(notEvaluated)", objects[currentKey], typeof objects[currentKey])
        accumulator[currentKey] = globalContext.evaluateFormula(objects[currentKey]);
        console.log("keyPartEvaluated(Evaluated)", globalContext.evaluateFormula(objects[currentKey]));
        // console.log("keyPartEvaluated(notEvaluated)",evaluateFormula(objects[currentKey]))
        return accumulator;
      }
    }

    else {
      // if(innerKey==='contentType'){//evaluation on this part was giving some unecpected output(html tag)
      //   console.log("keyPartEvaluated(notEvaluated)",innerKey)
      //   accumulator[innerKey] =globalContext.evaluateFormula(objects[currentKey][innerKey]);
      //   console.log("keyPartEvaluated(notEvaluated)",innerKey)
      //   return accumulator
      // }
      accumulator[currentKey] = Object.keys(objects[currentKey]).reduce((innerAccumulator, innerKey) => {
        console.log("keyPartEvaluated(notEvaluated)", innerKey)
        if (innerKey === 'contentType') {//this is temporary as contentType is referncing to some html tag dom
          let keyPart = 'contentType';
          let valuePart = globalContext.evaluateFormula(objects[currentKey][innerKey]);
          innerAccumulator[keyPart] = valuePart;
          return innerAccumulator;
        }
        let keyPart = globalContext.evaluateFormula(innerKey);
        console.log("keyPartEvaluated", keyPart)
        let valuePart = globalContext.evaluateFormula(objects[currentKey][innerKey]);
        valuePart = String(valuePart)
        innerAccumulator[keyPart] = valuePart;
        return innerAccumulator;
      }, {});
    }
    return accumulator;
  }, {});
};

const ApiTask = async (apiData) => {
  // const { endpoint, method, headers, params, timeout, body, data, cookies } = apiData;

  // console.log("apiData---?",apiData);
  let evaluatedApiData = evaluateApiData(apiData);
  
  const { endpoint, method, headers, params, timeout, body, data, cookies,contentType } = evaluatedApiData;

  headers['contentType'] = contentType ;
  console.log("contentType in flowExecution",contentType,headers)
  console.log("apiData---? evaluatedApiData", evaluatedApiData)

  let url = endpoint;
  // Config object for the fetch call
  const config = {
    method,
    timeout,
  };


  // Add query params to URL for GET requests
  if (method === "GET" && params) {
    const queryString = new URLSearchParams(params).toString();
    url = `${endpoint}?${queryString}`;
  }

  if (method === "POST" && headers && body) {
    if (headers["Content-Type"] === "application/json") {
      config.body = JSON.stringify(body);
    }
    else if (headers["Content-Type"] === "application/x-www-form-urlencoded") {
      config.body = new URLSearchParams(body).toString();
    }
    else if (headers["Content-Type"] === "multipart/form-data") {
      const formData = new FormData();
      for (const key in body) {
        formData.append(key, body[key]);
      }
      config.body = formData;

      // Let the browser set the correct boundary for multipart/form-data
      // delete config.headers["Content-Type"];
    }
  }

  if (["PUT", "PATCH", "DELETE"].includes(method) && headers && body) {
    if (headers) {
      config.headers = headers;
    }

    if (body) {
      config.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(url, config);
    // console.log("response", response);
    const data = await response.json();
    console.log("data...", data)
    console.log(`${method} Response received: inside function`, data);
    return { "OUTPUT": data };
  } catch (error) {
    console.error(`${method} Response received: inside function`, error);
    throw error;
  }
};

// const getApiData = {
//   endpoint: "https://dog.ceo/api/breeds/image/random",
//   method: "GET",
//   params: { breed: "retriever" }, 
//   timeout: 5000,
// };

// const postJsonData = {
//   endpoint: "https://jsonplaceholder.typicode.com/posts",
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: {
//     name: "John",
//     age: 30,
//   },
//   timeout: 5000,
// };
// const postFormUrlEncodedData = {
//   endpoint: "https://httpbin.org/post",
//   method: "POST",
//   headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   body: {
//     name: "John",
//     age: 30,
//   },
//   timeout: 5000,
// };
// const postMultipartData = {
//   endpoint: "https://httpbin.org/post",
//   method: "POST",
//   headers: { "Content-Type": "multipart/form-data" },
//   body: {
//     name: "John",
//     file: new File(["Hello, world!"], "hello.txt", {
//       type: "text/plain",
//     }),
//   },
//   timeout: 5000,
// };

// const putApiData = {
//   endpoint: "https://jsonplaceholder.typicode.com/posts/1",
//   method: "PUT",
//   headers: { "Content-Type": "application/json" },
//   body: {
//     id: 1,
//     title: "Updated Title",
//     body: "Updated Body",
//     userId: 1,
//   },
//   timeout: 5000,
// };

// const patchApiData = {
//   endpoint: "https://jsonplaceholder.typicode.com/posts/1",
//   method: "PATCH",
//   headers: { "Content-Type": "application/json" },
//   body: {
//     title: "Partially Updated Title",
//   },
//   timeout: 5000,
// };

// const deleteApiData = {
//   endpoint: "https://jsonplaceholder.typicode.com/posts/1",
//   method: "DELETE",
//   timeout: 5000,
// };

// // Console.log responses for all API methods
// (async () => {
//   const getResponse = await ApiTask(getApiData);
//   console.log("GET Response:", getResponse);

//   const jsonResponse = await ApiTask(postJsonData);
//   console.log("JSON POST Response:", jsonResponse);

//   const formUrlEncodedResponse = await ApiTask(postFormUrlEncodedData);
//   console.log("Form URL Encoded POST Response:", formUrlEncodedResponse);

//   const multipartResponse = await ApiTask(postMultipartData);
//   console.log("Multipart POST Response:", multipartResponse);

//   const putResponse = await ApiTask(putApiData);
//   console.log("PUT Response:", putResponse);

//   const patchResponse = await ApiTask(patchApiData);
//   console.log("PATCH Response:", patchResponse);

//   const deleteResponse = await ApiTask(deleteApiData);
//   console.log("DELETE Response:", deleteResponse);
// })();


const BranchTask = async (data, currentNode, nodes) => {
  for (let child of currentNode.children) {
    await executeFlow(nodes, child.id); // Traverse each child conditionally
  }
}

const ConditionTask = async (data, currentNode, nodes) => {
  // Insert logic here to evaluate a condition; for demo, assume true
  if (true) {
    if (currentNode.children && currentNode.children[0]) {
      await executeFlow(nodes, currentNode.children[0].id); // Proceed if condition is true
    }
  }
}

const StartTask = async () => {
  return 1;
}
const EndTask = async () => {
  return 1;
}

/*
  @DBConnectorTask function to execute database operations using stored connections
  @param {Object} dbData - Data for the database connector node
  @param {String} dbData.connectionName - Name of the stored database connection
  @param {String} dbData.query - SQL query to execute
  @param {String} dbData.queryType - Type of query (SELECT, INSERT, UPDATE, DELETE)
  @param {String} dbData.queryParams - Optional parameters for the query
*/
/* 
  @EmailSendTask function to send emails
  @param {Object} emailData - Data for the email node
  @param {String} emailData.to - Recipient email address
  @param {String} emailData.subject - Email subject
  @param {String} emailData.message - Email message content
  @param {String} emailData.cc - CC email addresses (optional)
*/
const EmailSendTask = async (emailData) => {
  try {
    const { to, subject, message, cc } = emailData;
    
    // Evaluate formulas in email data
    const evaluatedTo = globalContext.evaluateFormula(to, OUTPUTSTORE);
    const evaluatedSubject = globalContext.evaluateFormula(subject, OUTPUTSTORE);
    const evaluatedMessage = globalContext.evaluateFormula(message, OUTPUTSTORE);
    const evaluatedCC = cc ? globalContext.evaluateFormula(cc, OUTPUTSTORE) : '';
    
    console.log('Sending email:', {
      to: evaluatedTo,
      subject: evaluatedSubject,
      message: evaluatedMessage,
      cc: evaluatedCC
    });
    
    // Simulate email sending (in production, integrate with email service)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(`Email sent to ${evaluatedTo}`);
    
    return {
      OUTPUT: {
        success: true,
        to: evaluatedTo,
        subject: evaluatedSubject,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Email sending error:', error);
    toast.error(`Failed to send email: ${error.message}`);
    return { OUTPUT: { success: false, error: error.message } };
  }
};

/* 
  @ConsoleLogTask function to log messages to console
  @param {Object} logData - Data for the console log node
  @param {String} logData.message - Message to log
  @param {String} logData.level - Log level (log, info, warn, error, debug)
*/
const ConsoleLogTask = async (logData) => {
  try {
    const { message, level = 'info' } = logData;
    
    // Evaluate formula in message
    const evaluatedMessage = globalContext.evaluateFormula(message, OUTPUTSTORE);
    
    // Log based on level
    switch (level) {
      case 'error':
        console.error('[Flow]', evaluatedMessage);
        break;
      case 'warn':
        console.warn('[Flow]', evaluatedMessage);
        break;
      case 'debug':
        console.debug('[Flow]', evaluatedMessage);
        break;
      case 'log':
        console.log('[Flow]', evaluatedMessage);
        break;
      case 'info':
      default:
        console.info('[Flow]', evaluatedMessage);
        break;
    }
    
    return {
      OUTPUT: {
        message: evaluatedMessage,
        level: level,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Console log error:', error);
    return { OUTPUT: { success: false, error: error.message } };
  }
};

/* 
  @FileDownloadTask function to download files
  @param {Object} downloadData - Data for the file download node
  @param {String} downloadData.fileUrl - URL of the file to download
  @param {String} downloadData.fileName - Name for the downloaded file
*/
const FileDownloadTask = async (downloadData) => {
  try {
    const { fileUrl, fileName } = downloadData;
    
    // Evaluate formulas
    const evaluatedUrl = globalContext.evaluateFormula(fileUrl, OUTPUTSTORE);
    const evaluatedFileName = globalContext.evaluateFormula(fileName, OUTPUTSTORE);
    
    console.log('Downloading file:', evaluatedUrl, 'as', evaluatedFileName);
    
    // Create download link and trigger download
    const link = document.createElement('a');
    link.href = evaluatedUrl;
    link.download = evaluatedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`File download started: ${evaluatedFileName}`);
    
    return {
      OUTPUT: {
        success: true,
        fileUrl: evaluatedUrl,
        fileName: evaluatedFileName,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('File download error:', error);
    toast.error(`Download failed: ${error.message}`);
    return { OUTPUT: { success: false, error: error.message } };
  }
};

/* 
  @FileUploadTask function to handle file uploads
  @param {Object} uploadData - Data for the file upload node
  @param {String} uploadData.acceptTypes - Accepted file types
  @param {Boolean} uploadData.multiple - Allow multiple file selection
  @param {Number} uploadData.maxSize - Maximum file size in MB
*/
const FileUploadTask = async (uploadData) => {
  try {
    const { acceptTypes = '*/*', multiple = false, maxSize = 10 } = uploadData;
    
    return new Promise((resolve) => {
      // Create file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = acceptTypes;
      input.multiple = multiple;
      
      input.onchange = (event) => {
        const files = Array.from(event.target.files);
        const maxSizeBytes = maxSize * 1024 * 1024;
        
        // Check file sizes
        const oversizedFiles = files.filter(file => file.size > maxSizeBytes);
        if (oversizedFiles.length > 0) {
          toast.error(`Files exceed ${maxSize}MB limit`);
          resolve({ OUTPUT: { success: false, error: 'File size exceeded' } });
          return;
        }
        
        const fileInfo = files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }));
        
        toast.success(`${files.length} file(s) selected`);
        
        resolve({
          OUTPUT: {
            success: true,
            files: fileInfo,
            count: files.length,
            timestamp: new Date().toISOString()
          }
        });
      };
      
      input.oncancel = () => {
        resolve({ OUTPUT: { success: false, cancelled: true } });
      };
      
      // Trigger file selection dialog
      input.click();
    });
  } catch (error) {
    console.error('File upload error:', error);
    toast.error(`Upload failed: ${error.message}`);
    return { OUTPUT: { success: false, error: error.message } };
  }
};

/* 
  @LocalStorageTask function to manage localStorage operations
  @param {Object} storageData - Data for the localStorage node
  @param {String} storageData.action - Action to perform (set, get, remove, clear)
  @param {String} storageData.key - Storage key
  @param {String} storageData.value - Value to store (for set action)
*/
const LocalStorageTask = async (storageData) => {
  try {
    const { action, key, value } = storageData;
    
    // Evaluate formulas
    const evaluatedKey = globalContext.evaluateFormula(key, OUTPUTSTORE);
    const evaluatedValue = value ? globalContext.evaluateFormula(value, OUTPUTSTORE) : null;
    
    let result;
    
    switch (action) {
      case 'set':
        localStorage.setItem(evaluatedKey, evaluatedValue);
        result = { action: 'set', key: evaluatedKey, value: evaluatedValue };
        toast.success(`Stored ${evaluatedKey} in localStorage`);
        break;
        
      case 'get':
        const retrievedValue = localStorage.getItem(evaluatedKey);
        result = { action: 'get', key: evaluatedKey, value: retrievedValue };
        if (retrievedValue !== null) {
          toast.success(`Retrieved ${evaluatedKey} from localStorage`);
        } else {
          toast.info(`Key ${evaluatedKey} not found in localStorage`);
        }
        break;
        
      case 'remove':
        localStorage.removeItem(evaluatedKey);
        result = { action: 'remove', key: evaluatedKey };
        toast.success(`Removed ${evaluatedKey} from localStorage`);
        break;
        
      case 'clear':
        localStorage.clear();
        result = { action: 'clear' };
        toast.success('Cleared all localStorage data');
        break;
        
      default:
        throw new Error(`Invalid localStorage action: ${action}`);
    }
    
    return {
      OUTPUT: {
        success: true,
        ...result,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('LocalStorage operation error:', error);
    toast.error(`LocalStorage error: ${error.message}`);
    return { OUTPUT: { success: false, error: error.message } };
  }
};

const VariableSetTask = async (varData) => {
  try {
    const { variableName, value, type = 'string' } = varData;
    
    // Evaluate formulas
    const varName = globalContext.evaluateFormula(variableName, OUTPUTSTORE);
    let evalValue = globalContext.evaluateFormula(value, OUTPUTSTORE);
    
    // Convert value based on type
    switch (type) {
      case 'number':
        evalValue = parseFloat(evalValue);
        if (isNaN(evalValue)) throw new Error('Invalid number value');
        break;
      case 'boolean':
        evalValue = evalValue === 'true' || evalValue === true;
        break;
      case 'object':
        evalValue = typeof evalValue === 'string' ? JSON.parse(evalValue) : evalValue;
        break;
      case 'array':
        if (typeof evalValue === 'string') {
          try {
            evalValue = JSON.parse(evalValue);
          } catch {
            evalValue = evalValue.split(',').map(item => item.trim());
          }
        }
        break;
      case 'string':
      default:
        evalValue = String(evalValue);
        break;
    }
    
    // Set variable in output store
    OUTPUTSTORE[varName] = { OUTPUT: evalValue };
    
    toast.success(`Variable ${varName} set to ${type}`);
    
    return {
      OUTPUT: {
        success: true,
        variableName: varName,
        value: evalValue,
        type: type,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Variable set error:', error);
    toast.error(`Variable error: ${error.message}`);
    return { OUTPUT: { success: false, error: error.message } };
  }
};

const DBConnectorTask = async (dbData) => {
  try {
    const { 
      connectionName, 
      query, 
      queryType, 
      queryParams = '{}' 
    } = dbData;

    // Get the stored database connection
    const savedConnections = JSON.parse(localStorage.getItem('dbConnections') || '[]');
    const connection = savedConnections.find(conn => conn.name === connectionName);

    if (!connection) {
      throw new Error(`Database connection "${connectionName}" not found. Please check your connection settings.`);
    }

    // Evaluate formulas in the query and parameters
    const evaluatedQuery = globalContext.evaluateFormula(query, OUTPUTSTORE);
    const evaluatedParams = globalContext.evaluateFormula(queryParams, OUTPUTSTORE);

    // Parse query parameters
    let parsedParams = {};
    try {
      parsedParams = typeof evaluatedParams === 'string' ? JSON.parse(evaluatedParams) : evaluatedParams;
    } catch (error) {
      console.warn('Invalid query parameters format, using empty object');
      parsedParams = {};
    }

    console.log('DB Connector Execution:', {
      connectionName,
      dbType: connection.dbType,
      host: connection.host,
      database: connection.database,
      queryType,
      query: evaluatedQuery,
      parameters: parsedParams
    });

    // Simulate database operation based on query type
    let result;
    
    if (queryType === 'SELECT') {
      // Simulate SELECT query result
      result = {
        success: true,
        rows: [
          { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2024-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2024-01-16' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', created_at: '2024-01-17' }
        ],
        rowCount: 3,
        fields: ['id', 'name', 'email', 'created_at'],
        query: evaluatedQuery,
        executionTime: Math.random() * 0.1 + 0.02 + 's'
      };
    } else if (queryType === 'INSERT') {
      result = {
        success: true,
        insertedId: Math.floor(Math.random() * 1000) + 100,
        affectedRows: 1,
        query: evaluatedQuery,
        executionTime: Math.random() * 0.05 + 0.01 + 's'
      };
    } else if (queryType === 'UPDATE') {
      result = {
        success: true,
        affectedRows: Math.floor(Math.random() * 5) + 1,
        changedRows: Math.floor(Math.random() * 3) + 1,
        query: evaluatedQuery,
        executionTime: Math.random() * 0.08 + 0.02 + 's'
      };
    } else if (queryType === 'DELETE') {
      result = {
        success: true,
        affectedRows: Math.floor(Math.random() * 3) + 1,
        query: evaluatedQuery,
        executionTime: Math.random() * 0.06 + 0.01 + 's'
      };
    } else {
      // Custom query
      result = {
        success: true,
        message: 'Custom query executed successfully',
        query: evaluatedQuery,
        executionTime: Math.random() * 0.1 + 0.03 + 's'
      };
    }

    console.log('DB Query Result:', result);
    
    // Display success toast
    toast.success(`${connection.dbType} query executed on "${connectionName}" successfully`);
    
    return {
      OUTPUT: result,
      connection: {
        name: connectionName,
        dbType: connection.dbType,
        host: connection.host,
        database: connection.database
      },
      queryExecuted: evaluatedQuery,
      queryType: queryType,
      parameters: parsedParams
    };

  } catch (error) {
    console.error('Database execution error:', error);
    
    // Display error toast
    toast.error(`Database error: ${error.message}`);
    
    return {
      OUTPUT: null,
      error: error.message || 'Database operation failed',
      success: false
    };
  }
};

const TaskMap = {
  "start": StartTask,
  "toast": ToastTask,
  "loop": LoopTask,
  "api_call": ApiTask,
  "delay": DelayTask,
  "branch": BranchTask,
  "condition": ConditionTask,
  "fx": FxTask,
  "alert": AlertTask,
  "js": JSTask,
  "setdata": SetData,
  "dbconnector": DBConnectorTask,
  "triggerQuery": FxExecuteQueryTask,
  "navigateToScreen": NavigateToScreen,
  "navigateToNextScreen": NavigateToNextScreen,
  "emailSend": EmailSendTask,
  "consoleLog": ConsoleLogTask,
  "fileDownload": FileDownloadTask,
  "fileUpload": FileUploadTask,
  "localStorage": LocalStorageTask,
  "variableSet": VariableSetTask,
  "end": EndTask
};

var OUTPUTSTORE = {};

export const executeTask = async (nodes, curNode, options) => {
  let data = curNode.data;
  let Task = TaskMap[curNode.type];
  let taskOutput;

  console.log("in executeTask", curNode.type);
  if (Task) {
    taskOutput = await Task(data, curNode, nodes, options);
    if (curNode.name) {
      OUTPUTSTORE[curNode.name] = taskOutput;
    }
  } else {
    console.log("Task not found");
  }
  console.log("datastore value", OUTPUTSTORE);
  return taskOutput;
}




// Function to execute the flow logic
// nodes: Array of nodes in the flow
// nodeId: ID of the starting node (default is the first node)
const executeFlow = async (nodes, nodeId = 'node-0d9d4733-e48c-41fd-a41f-d93cc4718d97', options) => {
  // Find the current node by ID
  const currentNode = nodes.find(node => node.id === nodeId);
  if (!currentNode) return;
  var result = await executeTask(nodes, currentNode, options)
  // Move to the next node in sequence if it exists
  const nextNode = nodes.find(node => node.path && node.path[0] === (parseInt(currentNode.path[0], 10) + 1).toString());
  if (nextNode) {
    result = await executeFlow(nodes, nextNode.id, options);
  }
  return result;
}

export default executeFlow;
