const appData = {
  screens: [
    {
      "id": "screen-5",
      "type": "screen",
      "body": [
        {
          "type": "ProductInfo",
          "id": "cmi9a1evj0wte356q5ayomjgo",
          "properties": {
            "test_properties": "hello",
            "productImage": null,
            "productName": null,
            "description": "Experience crystal-clear audio with premium wireless headphones featuring 30-hour battery life.",
            "price": "",
            "originalPrice": "$249.99",
            "rating": "",
            "inStock": true,
            "buttonText": "Add to Cart",
            "backgroundColor": "#e6f4ff",
            "textColor": "#333333",
            "primaryColor": "#722ed1",
            "shadowColor": "#f9f0ff",
            "padding": ["20px", "20px", "20px", "20px"],
            "margin": ["0px", "0px", "0px", "0px"],
            "borderRadius": ["0px", "0px", "0px", "0px"],
            "_name": "productinfo1",
            "editedOnDRS": true
          },
          "_name": "productinfo1",
          "position": { "x": 0, "y": 509.99998474121094 },
          "grid": {
            "desktop": { "width": 3, "height": 6, "x": 1, "y": 53 },
            "mobile": { "width": 24, "height": 53, "x": 0, "y": 51 }
          },
          "meta": {
            "productImage": {
              "fx": "{{table4.selected_row.image}}",
              "deps": ["table4.selected_row.image"],
              "isFx": true
            },
            "productName": {
              "fx": "{{table4.selected_row.title}}",
              "deps": ["table4.selected_row.title"],
              "isFx": true
            },
            "price": { "fx": "", "deps": [], "isFx": false },
            "rating": { "fx": "", "deps": [], "isFx": false }
          },
          "output": ""
        },
        {
          "type": "Button",
          "id": "cmibd2j3100ij356qbta59yte",
          "properties": {
            "test_properties": "hello",
            "_name": "button",
            "text": "Take Photo",
            "text_align": "center",
            "color": "#EAEAEA",
            "fontSize": "12px",
            "fontWeight": "500",
            "theme": "dark",
            "background_color": "#0D7377",
            "border": "1px solid #404040",
            "border_radius": ["5px", "5px", "5px", "5px"],
            "margin": ["0px", "0px", "0px", "0px"],
            "padding": ["0px", "0px", "0px", "0px"],
            "id": "",
            "char_limit": 0,
            "loading": 0,
            "event": {
              "nodes": [
                {
                  "id": "node-0d9d4733-e48c-41fd-a41f-d93cc4718d97",
                  "type": "start",
                  "name": "start",
                  "path": ["0"]
                },
                {
                  "id": "js-fc753dd8-b05f-475d-a147-dc8a91726cf6",
                  "type": "js",
                  "name": "Javascript_1",
                  "path": ["1"],
                  "data": {
                    "name": "Javascript_1",
                    "code": "const photo = await MBridge.camera.takePhoto({ quality: 80, saveToGallery: false });\nconsole.log(\"photo\", photo);\nreturn \"Hello word\";",
                    "params": {}
                  },
                  "inputs": [
                    {
                      "label": "Params",
                      "name": "params",
                      "type": "group",
                      "inputs": [
                        [
                          {
                            "label": "param",
                            "name": "param",
                            "type": "markCodeEditor",
                            "defaultValue": "param",
                            "grid_style": "row"
                          },
                          {
                            "label": "value",
                            "name": "value",
                            "type": "markCodeEditor",
                            "defaultValue": "value",
                            "grid_style": "row"
                          }
                        ]
                      ]
                    },
                    {
                      "label": "code",
                      "name": "code",
                      "type": "codeEditor",
                      "defaultValue": "// Write Your Code Here\n// let a=10;\n// let b=20;\n// return (a+b);\n",
                      "grid_style": "row"
                    }
                  ],
                  "configuring": true,
                  "validateStatusError": false,
                  "OUTPUT": null
                },
                {
                  "id": "node-b106675a-5148-4a2e-aa86-8e06abd692d1",
                  "type": "end",
                  "name": "end",
                  "path": ["2"]
                }
              ],
              "edges": []
            },
            "editedOnDRS": true
          },
          "_name": "button",
          "meta": {
            "text": { "fx": "{{\"Take Photo\"}}", "deps": [], "isFx": true }
          },
          "position": { "x": 16.66668701171875, "y": 1069.9999389648438 },
          "grid": {
            "desktop": { "width": 4, "height": 4, "x": 5, "y": 105 },
            "mobile": { "width": 11, "height": 4, "x": 1, "y": 107 }
          },
          "output": ""
        },
        {
          "type": "Button",
          "id": "cmic3qeqf01ln356q1q3yy5s8",
          "properties": {
            "test_properties": "hello",
            "_name": "button1",
            "text": "Next Page",
            "text_align": "center",
            "color": "#FFFFFF",
            "fontSize": "12px",
            "fontWeight": "500",
            "theme": "basic",
            "background_color": "#007BFF",
            "border": "1px solid #007BFF",
            "border_radius": ["5px", "5px", "5px", "5px"],
            "margin": ["0px", "0px", "0px", "0px"],
            "padding": ["0px", "0px", "0px", "0px"],
            "id": "",
            "char_limit": 0,
            "loading": 0,
            "event": {
              "nodes": [
                {
                  "id": "node-0d9d4733-e48c-41fd-a41f-d93cc4718d97",
                  "type": "start",
                  "name": "start",
                  "path": ["0"]
                },
                {
                  "id": "navigateToScreen-fb00ba59-d22a-4d73-be4b-55710bd6e0e2",
                  "type": "navigateToScreen",
                  "name": "NavigateToScreen_1",
                  "path": ["1"],
                  "data": { "name": "NavigateToScreen_1", "screenId": "screen" },
                  "inputs": [
                    {
                      "label": "Select Screen",
                      "name": "screenId",
                      "type": "select",
                      "options": [
                        { "label": "screen-5", "value": "screen-5" },
                        { "label": "screen", "value": "screen" }
                      ],
                      "defaultValue": "Select Screen"
                    },
                    {
                      "label": "heightOrWidth",
                      "name": "heightOrWidth",
                      "type": "text",
                      "defaultValue": "400px"
                    },
                    {
                      "label": "Select Positon",
                      "name": "position",
                      "type": "select",
                      "options": [
                        { "label": "left", "value": "left" },
                        { "label": "right", "value": "right" },
                        { "label": "top", "value": "top" },
                        { "label": "bottom", "value": "bottom" }
                      ],
                      "defaultValue": "Select Positon"
                    },
                    {
                      "label": "height",
                      "name": "height",
                      "type": "text",
                      "defaultValue": "600px"
                    },
                    {
                      "label": "width",
                      "name": "width",
                      "type": "text",
                      "defaultValue": "400px"
                    }
                  ],
                  "configuring": true,
                  "OUTPUT": {
                    "success": true,
                    "screenId": "screen",
                    "screenType": "screen"
                  }
                },
                {
                  "id": "node-b106675a-5148-4a2e-aa86-8e06abd692d1",
                  "type": "end",
                  "name": "end",
                  "path": ["2"]
                }
              ],
              "edges": []
            },
            "editedOnDRS": true
          },
          "_name": "button1",
          "meta": {
            "text": { "fx": "{{\"Next Page\"}}", "deps": [], "isFx": true }
          },
          "position": { "x": 216.66668701171875, "y": 1069.9999389648438 },
          "grid": {
            "desktop": { "width": 4, "height": 4, "x": 10, "y": 105 },
            "mobile": { "width": 10, "height": 4, "x": 13, "y": 107 }
          },
          "output": ""
        }
      ],
      "chosen": false,
      "selected": false
    },
    {
      "id": "screen",
      "type": "screen",
      "body": [
        {
          "type": "ProductInfo",
          "id": "cmic3uswb010a356qbae0vvvo",
          "properties": {
            "test_properties": "hello",
            "productImage": null,
            "productName": "Premium Wireless Headphones",
            "description": "Experience crystal-clear audio with premium wireless headphones featuring 30-hour battery life.",
            "price": "$199.99",
            "originalPrice": "$249.99",
            "rating": "4.5",
            "inStock": true,
            "buttonText": "Add to Cart",
            "backgroundColor": "#ffffff",
            "textColor": "#333333",
            "primaryColor": "#007bff",
            "shadowColor": "rgba(0,0,0,0.1)",
            "padding": ["20px", "20px", "20px", "20px"],
            "margin": ["10px", "10px", "10px", "10px"],
            "borderRadius": ["16px", "16px", "16px", "16px"],
            "_name": "productinfo",
            "editedOnDRS": true
          },
          "_name": "productinfo",
          "position": { "x": 0, "y": 449.9999542236328 },
          "grid": {
            "desktop": { "width": 24, "height": 40, "x": 3, "y": 47 },
            "mobile": { "width": 24, "height": 53, "x": 0, "y": 45 }
          },
          "meta": {
            "productImage": {
              "fx": "{{table.selected_row.image}}",
              "deps": ["table.selected_row.image"],
              "isFx": true
            }
          },
          "output": ""
        },
        {
          "type": "Button",
          "id": "cmic3w6bs016g356q4xob50fu",
          "properties": {
            "test_properties": "hello",
            "_name": "button2",
            "text": "Capacture Image",
            "text_align": "center",
            "color": "#ffffff",
            "fontSize": "12px",
            "fontWeight": "500",
            "theme": "dark",
            "background_color": "#ff0000",
            "border": "1px solid #e1e1e1",
            "border_radius": ["5px", "5px", "5px", "5px"],
            "margin": ["0px", "0px", "0px", "0px"],
            "padding": ["0px", "0px", "0px", "0px"],
            "id": "",
            "char_limit": 0,
            "loading": 0,
            "event": {
              "nodes": [
                {
                  "id": "node-0d9d4733-e48c-41fd-a41f-d93cc4718d97",
                  "type": "start",
                  "name": "start",
                  "path": ["0"]
                },
                {
                  "id": "node-b106675a-5148-4a2e-aa86-8e06abd692d1",
                  "type": "end",
                  "name": "end",
                  "path": ["2"]
                }
              ],
              "edges": "remove-node"
            },
            "editedOnDRS": true
          },
          "_name": "button2",
          "meta": {
            "text": { "fx": "{{\"Capacture Image\"}}", "deps": [], "isFx": true }
          },
          "position": { "x": 16.66668701171875, "y": 989.9999389648438 },
          "grid": {
            "desktop": { "width": 4, "height": 4, "x": 2, "y": 109 },
            "mobile": { "width": 11, "height": 4, "x": 1, "y": 99 }
          },
          "output": ""
        },
        {
          "type": "Button",
          "id": "cmic44ws401cu356q3zeda3pf",
          "properties": {
            "test_properties": "hello",
            "_name": "button3",
            "text": "Go Back",
            "text_align": "center",
            "color": "#ffffff",
            "fontSize": "12px",
            "fontWeight": "500",
            "theme": "dark",
            "background_color": "#ff0000",
            "border": "1px solid #e1e1e1",
            "border_radius": ["5px", "5px", "5px", "5px"],
            "margin": ["0px", "0px", "0px", "0px"],
            "padding": ["0px", "0px", "0px", "0px"],
            "id": "",
            "char_limit": 0,
            "loading": 0,
            "event": {
              "nodes": [
                {
                  "id": "node-0d9d4733-e48c-41fd-a41f-d93cc4718d97",
                  "type": "start",
                  "name": "start",
                  "path": ["0"]
                },
                {
                  "id": "navigateToScreen-44f7539a-64f8-428d-a96f-5b76e8fdf693",
                  "type": "navigateToScreen",
                  "name": "NavigateToScreen_1",
                  "path": ["1"],
                  "data": {
                    "name": "NavigateToScreen_1",
                    "screenId": "screen-5"
                  },
                  "inputs": [
                    {
                      "label": "Select Screen",
                      "name": "screenId",
                      "type": "select",
                      "options": [
                        { "label": "screen-5", "value": "screen-5" },
                        { "label": "screen", "value": "screen" }
                      ],
                      "defaultValue": "Select Screen"
                    },
                    {
                      "label": "heightOrWidth",
                      "name": "heightOrWidth",
                      "type": "text",
                      "defaultValue": "400px"
                    },
                    {
                      "label": "Select Positon",
                      "name": "position",
                      "type": "select",
                      "options": [
                        { "label": "left", "value": "left" },
                        { "label": "right", "value": "right" },
                        { "label": "top", "value": "top" },
                        { "label": "bottom", "value": "bottom" }
                      ],
                      "defaultValue": "Select Positon"
                    },
                    {
                      "label": "height",
                      "name": "height",
                      "type": "text",
                      "defaultValue": "600px"
                    },
                    {
                      "label": "width",
                      "name": "width",
                      "type": "text",
                      "defaultValue": "400px"
                    }
                  ],
                  "configuring": true
                },
                {
                  "id": "node-b106675a-5148-4a2e-aa86-8e06abd692d1",
                  "type": "end",
                  "name": "end",
                  "path": ["2"]
                }
              ],
              "edges": []
            },
            "editedOnDRS": true
          },
          "_name": "button3",
          "meta": {
            "text": { "fx": "{{\"Go Back\"}}", "deps": [], "isFx": true }
          },
          "position": { "x": 216.66668701171875, "y": 990.0000915527344 },
          "grid": {
            "desktop": { "width": 4, "height": 4, "x": 10, "y": 99 },
            "mobile": { "width": 10, "height": 4, "x": 13, "y": 99 }
          },
          "output": ""
        }
      ],
      "chosen": false
    }
  ],
  queries: [
    {
      id: "api_call-56eb387f-764f-4b7d-8623-4b4f641267ac",
      type: "api_call",
      name: "apiCall1",
      inputs: [
        {
          label: "Endpoint",
          name: "endpoint",
          type: "markCodeEditor",
          defaultValue: "https://dog.ceo/api/breeds/image/random",
          grid_style: "row",
        },
        {
          label: "Method",
          name: "method",
          type: "select",
          grid_style: "row",
          options: [
            {
              label: "GET",
              value: "GET",
            },
            {
              label: "POST",
              value: "POST",
            },
            {
              label: "PUT",
              value: "PUT",
            },
            {
              label: "DELETE",
              value: "DELETE",
            },
          ],
          defaultValue: "GET",
        },
        {
          type: "select",
          name: "contentType",
          label: "Content Type",
          grid_style: "row",
          options: [
            {
              label: "application/json",
              value: "application/json",
            },
            {
              label: "application/x-www-form-urlencoded",
              value: "application/x-www-form-urlencoded",
            },
            {
              label: "multipart/form-data",
              value: "multipart/form-data",
            },
            {
              label: "Application/XML",
              value: "application/xml",
            },
            {
              label: "Text/HTML",
              value: "text/html",
            },
            {
              label: "Text/Plain",
              value: "text/plain",
            },
            {
              label: "JSON",
              value: "JSON",
            },
            {
              label: "XML",
              value: "XML",
            },
            {
              label: "Plain Text",
              value: "Plain Text",
            },
          ],
          defaultValue: "application/json",
        },
        {
          label: "Params",
          name: "params",
          type: "group",
          inputs: [
            [
              {
                label: "param1",
                name: "param2",
                type: "markCodeEditor",
                defaultValue: "param1",
              },
              {
                label: "value1",
                name: "value1",
                type: "markCodeEditor",
                defaultValue: "value1",
              },
            ],
          ],
        },
        {
          name: "headers",
          label: "Headers",
          type: "group",
          inputs: [
            [
              {
                label: "key",
                name: "key",
                type: "markCodeEditor",
                defaultValue: "key",
              },
              {
                label: "value",
                name: "value",
                type: "markCodeEditor",
                defaultValue: "value2",
              },
            ],
          ],
        },
        {
          label: "raw body",
          type: "markCodeEditor",
          name: "rawBody",
          grid_style: "row",
          defaultValue: "zoha",
        },
        {
          label: "body",
          name: "body",
          type: "group",
          inputs: [
            [
              {
                label: "key",
                name: "key",
                type: "markCodeEditor",
                defaultValue: "key",
              },
              {
                label: "value",
                name: "value",
                type: "markCodeEditor",
                defaultValue: "value2",
              },
            ],
          ],
        },
        {
          label: "Cookies",
          name: "cookies",
          type: "group",
          inputs: [
            [
              {
                label: "key",
                name: "key",
                type: "markCodeEditor",
                defaultValue: "key",
              },
              {
                label: "value",
                name: "value",
                type: "markCodeEditor",
                defaultValue: "value",
              },
            ],
          ],
        },
        {
          label: "Use Cache",
          name: "useCache",
          type: "checkbox",
          grid_style: "row",
          defaultValue: false,
        },
        {
          label: "Response Format",
          name: "responseFormat",
          type: "select",
          grid_style: "row",
          options: [
            {
              label: "JSON",
              value: "JSON",
            },
            {
              label: "XML",
              value: "XML",
            },
            {
              label: "Plain Text",
              value: "Plain Text",
            },
          ],
          defaultValue: "JSON",
        },
        {
          label: "Retry Count",
          name: "retryCount",
          type: "markCodeEditor",
          grid_style: "row",
          defaultValue: 3,
          min: 1,
          max: 10,
        },
        {
          label: "Timeout",
          name: "timeout",
          type: "markCodeEditor",
          grid_style: "row",
          defaultValue: 30,
          min: 5,
          max: 120,
        },
      ],
      configuring: false,
      data: {
        name: "apiCall1",
        endpoint: "https://dog.ceo/api/breeds/image/random",
        method: "GET",
        contentType: "application/json",
        headers: {},
        params: {},
        body: {},
        cookies: {},
        useCache: false,
        responseFormat: "JSON",
        retryCount: 3,
        timeout: 30,
      },
      validateStatusError: false,
      value: {
        message: "https://images.dog.ceo/breeds/pyrenees/n02111500_3710.jpg",
        status: "success",
      },
    },
    {
      id: "javascript-56eb387f-764f-4b7d-8623-4b4f641267ac",
      type: "javascript",
      name: "JavascriptBlock",
      inputs: [
        {
          label: "Parameters",
          name: "params",
          type: "group",
          inputs: [
            [
              {
                label: "param1",
                name: "param2",
                type: "markCodeEditor",
                defaultValue: "param1",
              },
              {
                label: "value1",
                name: "value1",
                type: "markCodeEditor",
                defaultValue: "value1",
              },
            ],
          ],
        },
        {
          label: "Javascript",
          name: "jsBlock",
          type: "codeEditor",
          grid_style: "row",
          showLabel: false,
          defaultValue: false,
        },
      ],
      configuring: false,
      data: {
        name: "JavascriptBlock",
        params: {
          params1: "paramValue1",
          params2: "paramValue2",
        },
        jsBlock:
          "\n    //write your code here\n    \n\n\n\n\n\n    return (params1 + params2)    \n    ",
      },
      validateStatusError: false,
      value: 20,
    },
    {
      id: "fx-12345678-1234-1234-1234-1234567890ab",
      type: "fx",
      name: "FxBlock",
      inputs: [
        {
          label: "Function Code",
          name: "fxBlock",
          type: "markCodeEditor",
          grid_style: "row",
          showLabel: false,
          defaultValue: "// Wrte your code here\n\nreturn 'Result';",
        },
      ],
      configuring: false,
      data: {
        fxBlock: "// Write function to evaluate here\n\nreturn 'Result';",
      },
      validateStatusError: false,
      value: null,
    },
    {
      id: "dbconnector-12345678-1234-1234-1234-1234567890ab",
      type: "dbconnector",
      name: "DbConnectorBlock",
      inputs: [
        {
          label: "Database Connection",
          name: "connectionName",
          type: "select",
          options: [],
          defaultValue: "Select Connection",
        },
        {
          label: "SQL Query",
          name: "query",
          type: "codeEditor",
          defaultValue: "SELECT * FROM users LIMIT 10;",
          grid_style: "row",
        },
        {
          label: "Query Type",
          name: "queryType",
          type: "select",
          options: [
            {
              label: "SELECT",
              value: "SELECT",
            },
            {
              label: "INSERT",
              value: "INSERT",
            },
            {
              label: "UPDATE",
              value: "UPDATE",
            },
            {
              label: "DELETE",
              value: "DELETE",
            },
            {
              label: "CUSTOM",
              value: "CUSTOM",
            },
          ],
          defaultValue: "SELECT",
        },
        {
          label: "Query Parameters (Optional)",
          name: "queryParams",
          type: "markCodeEditor",
          defaultValue: "{}",
          grid_style: "row",
        },
      ],
      configuring: false,
      data: {
        name: "DbConnectorBlock",
        connectionUid: "a25edfc5-34f3-4286-8e2c-11c1923f7541",
        queryType: "SELECT",
        query: "SELECT * FROM actor LIMIT 10;",
        queryParams: "{}",
      },
      validateStatusError: false,
      value: {
        success: true,
        executionTime: "2ms",
        timestamp: "2025-11-18T09:21:01.763Z",
        type: "SELECT",
        rows: [
          {
            actor_id: 1,
            first_name: "PENELOPE",
            last_name: "GUINESS",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 2,
            first_name: "NICK",
            last_name: "WAHLBERG",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 3,
            first_name: "ED",
            last_name: "CHASE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 4,
            first_name: "JENNIFER",
            last_name: "DAVIS",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 5,
            first_name: "JOHNNY",
            last_name: "LOLLOBRIGIDA",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 6,
            first_name: "BETTE",
            last_name: "NICHOLSON",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 7,
            first_name: "GRACE",
            last_name: "MOSTEL",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 8,
            first_name: "MATTHEW",
            last_name: "JOHANSSON",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 9,
            first_name: "JOE",
            last_name: "SWANK",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 10,
            first_name: "CHRISTIAN",
            last_name: "GABLE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
        ],
        rowCount: 10,
        columns: [
          {
            name: "actor_id",
            type: 2,
          },
          {
            name: "first_name",
            type: 253,
          },
          {
            name: "last_name",
            type: 253,
          },
          {
            name: "last_update",
            type: 7,
          },
        ],
      },
    },
    {
      id: "2ib77k3wd6rlizr7qlftkoi2s23558zqsfh3ecu",
      type: "dbconnector",
      name: "DbConnectorBlock2",
      inputs: [
        {
          label: "Database Connection",
          name: "connectionName",
          type: "select",
          options: [],
          defaultValue: "Select Connection",
        },
        {
          label: "SQL Query",
          name: "query",
          type: "codeEditor",
          defaultValue: "SELECT * FROM users LIMIT 10;",
          grid_style: "row",
        },
        {
          label: "Query Type",
          name: "queryType",
          type: "select",
          options: [
            {
              label: "SELECT",
              value: "SELECT",
            },
            {
              label: "INSERT",
              value: "INSERT",
            },
            {
              label: "UPDATE",
              value: "UPDATE",
            },
            {
              label: "DELETE",
              value: "DELETE",
            },
            {
              label: "CUSTOM",
              value: "CUSTOM",
            },
          ],
          defaultValue: "SELECT",
        },
        {
          label: "Query Parameters (Optional)",
          name: "queryParams",
          type: "markCodeEditor",
          defaultValue: "{}",
          grid_style: "row",
        },
      ],
      configuring: false,
      data: {
        name: "DbConnectorBlock2",
        connectionUid: "a25edfc5-34f3-4286-8e2c-11c1923f7541",
        queryType: "SELECT",
        query: "SELECT * FROM actor LIMIT 10;",
        queryParams: '{"name": "Brijesh"}',
      },
      validateStatusError: false,
      value: {
        success: true,
        executionTime: "3ms",
        timestamp: "2025-11-18T14:07:21.845Z",
        type: "SELECT",
        rows: [
          {
            actor_id: 1,
            first_name: "PENELOPE",
            last_name: "GUINESS",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 2,
            first_name: "NICK",
            last_name: "WAHLBERG",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 3,
            first_name: "ED",
            last_name: "CHASE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 4,
            first_name: "JENNIFER",
            last_name: "DAVIS",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 5,
            first_name: "JOHNNY",
            last_name: "LOLLOBRIGIDA",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 6,
            first_name: "BETTE",
            last_name: "NICHOLSON",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 7,
            first_name: "GRACE",
            last_name: "MOSTEL",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 8,
            first_name: "MATTHEW",
            last_name: "JOHANSSON",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 9,
            first_name: "JOE",
            last_name: "SWANK",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 10,
            first_name: "CHRISTIAN",
            last_name: "GABLE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
        ],
        rowCount: 10,
        columns: [
          {
            name: "actor_id",
            type: 2,
          },
          {
            name: "first_name",
            type: 253,
          },
          {
            name: "last_name",
            type: 253,
          },
          {
            name: "last_update",
            type: 7,
          },
        ],
      },
    },
    {
      id: "d7rqqq1di2k2gymfca1dacnfmdh1ref156hh1tdf",
      type: "dbconnector",
      name: "DbConnectorBlock4",
      inputs: [
        {
          label: "Database Connection",
          name: "connectionName",
          type: "select",
          options: [],
          defaultValue: "Select Connection",
        },
        {
          label: "SQL Query",
          name: "query",
          type: "codeEditor",
          defaultValue: "SELECT * FROM users LIMIT 10;",
          grid_style: "row",
        },
        {
          label: "Query Type",
          name: "queryType",
          type: "select",
          options: [
            {
              label: "SELECT",
              value: "SELECT",
            },
            {
              label: "INSERT",
              value: "INSERT",
            },
            {
              label: "UPDATE",
              value: "UPDATE",
            },
            {
              label: "DELETE",
              value: "DELETE",
            },
            {
              label: "CUSTOM",
              value: "CUSTOM",
            },
          ],
          defaultValue: "SELECT",
        },
        {
          label: "Query Parameters (Optional)",
          name: "queryParams",
          type: "markCodeEditor",
          defaultValue: "{}",
          grid_style: "row",
        },
      ],
      configuring: false,
      data: {
        name: "DbConnectorBlock4",
        connectionUid: "6f3fafb3-2faa-4bba-a427-a2b1c15eb05b",
        queryType: "SELECT",
        query: "SELECT * FROM actor LIMIT 45;",
        queryParams: "{}",
      },
      validateStatusError: false,
      value: {
        success: true,
        executionTime: "2ms",
        dbType: "mysql",
        timestamp: "2025-11-18T20:48:39.995Z",
        type: "SELECT",
        rows: [
          {
            actor_id: 1,
            first_name: "PENELOPE",
            last_name: "GUINESS",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 2,
            first_name: "NICK",
            last_name: "WAHLBERG",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 3,
            first_name: "ED",
            last_name: "CHASE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 4,
            first_name: "JENNIFER",
            last_name: "DAVIS",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 5,
            first_name: "JOHNNY",
            last_name: "LOLLOBRIGIDA",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 6,
            first_name: "BETTE",
            last_name: "NICHOLSON",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 7,
            first_name: "GRACE",
            last_name: "MOSTEL",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 8,
            first_name: "MATTHEW",
            last_name: "JOHANSSON",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 9,
            first_name: "JOE",
            last_name: "SWANK",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 10,
            first_name: "CHRISTIAN",
            last_name: "GABLE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 11,
            first_name: "ZERO",
            last_name: "CAGE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 12,
            first_name: "KARL",
            last_name: "BERRY",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 13,
            first_name: "UMA",
            last_name: "WOOD",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 14,
            first_name: "VIVIEN",
            last_name: "BERGEN",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 15,
            first_name: "CUBA",
            last_name: "OLIVIER",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 16,
            first_name: "FRED",
            last_name: "COSTNER",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 17,
            first_name: "HELEN",
            last_name: "VOIGHT",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 18,
            first_name: "DAN",
            last_name: "TORN",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 19,
            first_name: "BOB",
            last_name: "FAWCETT",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 20,
            first_name: "LUCILLE",
            last_name: "TRACY",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 21,
            first_name: "KIRSTEN",
            last_name: "PALTROW",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 22,
            first_name: "ELVIS",
            last_name: "MARX",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 23,
            first_name: "SANDRA",
            last_name: "KILMER",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 24,
            first_name: "CAMERON",
            last_name: "STREEP",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 25,
            first_name: "KEVIN",
            last_name: "BLOOM",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 26,
            first_name: "RIP",
            last_name: "CRAWFORD",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 27,
            first_name: "JULIA",
            last_name: "MCQUEEN",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 28,
            first_name: "WOODY",
            last_name: "HOFFMAN",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 29,
            first_name: "ALEC",
            last_name: "WAYNE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 30,
            first_name: "SANDRA",
            last_name: "PECK",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 31,
            first_name: "SISSY",
            last_name: "SOBIESKI",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 32,
            first_name: "TIM",
            last_name: "HACKMAN",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 33,
            first_name: "MILLA",
            last_name: "PECK",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 34,
            first_name: "AUDREY",
            last_name: "OLIVIER",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 35,
            first_name: "JUDY",
            last_name: "DEAN",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 36,
            first_name: "BURT",
            last_name: "DUKAKIS",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 37,
            first_name: "VAL",
            last_name: "BOLGER",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 38,
            first_name: "TOM",
            last_name: "MCKELLEN",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 39,
            first_name: "GOLDIE",
            last_name: "BRODY",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 40,
            first_name: "JOHNNY",
            last_name: "CAGE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 41,
            first_name: "JODIE",
            last_name: "DEGENERES",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 42,
            first_name: "TOM",
            last_name: "MIRANDA",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 43,
            first_name: "KIRK",
            last_name: "JOVOVICH",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 44,
            first_name: "NICK",
            last_name: "STALLONE",
            last_update: "2006-02-14T23:04:33.000Z",
          },
          {
            actor_id: 45,
            first_name: "REESE",
            last_name: "KILMER",
            last_update: "2006-02-14T23:04:33.000Z",
          },
        ],
        rowCount: 45,
        columns: [
          {
            name: "actor_id",
            type: 2,
          },
          {
            name: "first_name",
            type: 253,
          },
          {
            name: "last_name",
            type: 253,
          },
          {
            name: "last_update",
            type: 7,
          },
        ],
      },
    },
    {
      id: "5yk0bbgzbbqil56pgr9e3atonohf593japk83a",
      type: "javascript",
      name: "js6",
      inputs: [
        {
          label: "Parameters",
          name: "params",
          type: "group",
          inputs: [
            [
              {
                label: "param1",
                name: "param2",
                type: "markCodeEditor",
                defaultValue: "param1",
              },
              {
                label: "value1",
                name: "value1",
                type: "markCodeEditor",
                defaultValue: "value1",
              },
            ],
          ],
        },
        {
          label: "Javascript",
          name: "jsBlock",
          type: "codeEditor",
          grid_style: "row",
          showLabel: false,
          defaultValue: false,
        },
      ],
      configuring: false,
      data: {
        name: "js6",
        jsBlock:
          'var data = [{"id":"1","title":"Gadgets","subtitle":"160 items","icon":"💻","backgroundColor":"#E3F2FD"},{"id":"2","title":"Beauty","subtitle":"453 items","icon":"💄","backgroundColor":"#F3E5F5"},{"id":"3","title":"Plants","subtitle":"162 items","icon":"🌺","backgroundColor":"#E8F5E8"},{"id":"4","title":"Clothes","subtitle":"652 items","icon":"👕","backgroundColor":"#FFF3E0"},{"id":"5","title":"Books","subtitle":"89 items","icon":"📚","backgroundColor":"#E8F5E8"},{"id":"6","title":"Auto","subtitle":"234 items","icon":"🚗","backgroundColor":"#F5F5F5"}];\nreturn data;\n\n\n\n\n\n\n\n\n',
        params: {},
      },
      validateStatusError: false,
      value: {
        OUTPUT: [
          {
            id: "1",
            title: "Gadgets",
            subtitle: "160 items",
            icon: "💻",
            backgroundColor: "#E3F2FD",
          },
          {
            id: "2",
            title: "Beauty",
            subtitle: "453 items",
            icon: "💄",
            backgroundColor: "#F3E5F5",
          },
          {
            id: "3",
            title: "Plants",
            subtitle: "162 items",
            icon: "🌺",
            backgroundColor: "#E8F5E8",
          },
          {
            id: "4",
            title: "Clothes",
            subtitle: "652 items",
            icon: "👕",
            backgroundColor: "#FFF3E0",
          },
          {
            id: "5",
            title: "Books",
            subtitle: "89 items",
            icon: "📚",
            backgroundColor: "#E8F5E8",
          },
          {
            id: "6",
            title: "Auto",
            subtitle: "234 items",
            icon: "🚗",
            backgroundColor: "#F5F5F5",
          },
        ],
      },
    },
    {
      id: "8o5j918jlgeakorjpievq88k8tiggn80iu3zpylg",
      type: "api_call",
      name: "fakeProducts",
      inputs: [
        {
          label: "Endpoint",
          name: "endpoint",
          type: "markCodeEditor",
          defaultValue: "https://dog.ceo/api/breeds/image/random",
          grid_style: "row",
        },
        {
          label: "Method",
          name: "method",
          type: "select",
          grid_style: "row",
          options: [
            {
              label: "GET",
              value: "GET",
            },
            {
              label: "POST",
              value: "POST",
            },
            {
              label: "PUT",
              value: "PUT",
            },
            {
              label: "DELETE",
              value: "DELETE",
            },
          ],
          defaultValue: "GET",
        },
        {
          type: "select",
          name: "contentType",
          label: "Content Type",
          grid_style: "row",
          options: [
            {
              label: "application/json",
              value: "application/json",
            },
            {
              label: "application/x-www-form-urlencoded",
              value: "application/x-www-form-urlencoded",
            },
            {
              label: "multipart/form-data",
              value: "multipart/form-data",
            },
            {
              label: "Application/XML",
              value: "application/xml",
            },
            {
              label: "Text/HTML",
              value: "text/html",
            },
            {
              label: "Text/Plain",
              value: "text/plain",
            },
            {
              label: "JSON",
              value: "JSON",
            },
            {
              label: "XML",
              value: "XML",
            },
            {
              label: "Plain Text",
              value: "Plain Text",
            },
          ],
          defaultValue: "application/json",
        },
        {
          label: "Params",
          name: "params",
          type: "group",
          inputs: [
            [
              {
                label: "param1",
                name: "param2",
                type: "markCodeEditor",
                defaultValue: "param1",
              },
              {
                label: "value1",
                name: "value1",
                type: "markCodeEditor",
                defaultValue: "value1",
              },
            ],
          ],
        },
        {
          name: "headers",
          label: "Headers",
          type: "group",
          inputs: [
            [
              {
                label: "key",
                name: "key",
                type: "markCodeEditor",
                defaultValue: "key",
              },
              {
                label: "value",
                name: "value",
                type: "markCodeEditor",
                defaultValue: "value2",
              },
            ],
          ],
        },
        {
          label: "raw body",
          type: "markCodeEditor",
          name: "rawBody",
          grid_style: "row",
          defaultValue: "zoha",
        },
        {
          label: "body",
          name: "body",
          type: "group",
          inputs: [
            [
              {
                label: "key",
                name: "key",
                type: "markCodeEditor",
                defaultValue: "key",
              },
              {
                label: "value",
                name: "value",
                type: "markCodeEditor",
                defaultValue: "value2",
              },
            ],
          ],
        },
        {
          label: "Cookies",
          name: "cookies",
          type: "group",
          inputs: [
            [
              {
                label: "key",
                name: "key",
                type: "markCodeEditor",
                defaultValue: "key",
              },
              {
                label: "value",
                name: "value",
                type: "markCodeEditor",
                defaultValue: "value",
              },
            ],
          ],
        },
        {
          label: "Use Cache",
          name: "useCache",
          type: "checkbox",
          grid_style: "row",
          defaultValue: false,
        },
        {
          label: "Response Format",
          name: "responseFormat",
          type: "select",
          grid_style: "row",
          options: [
            {
              label: "JSON",
              value: "JSON",
            },
            {
              label: "XML",
              value: "XML",
            },
            {
              label: "Plain Text",
              value: "Plain Text",
            },
          ],
          defaultValue: "JSON",
        },
        {
          label: "Retry Count",
          name: "retryCount",
          type: "markCodeEditor",
          grid_style: "row",
          defaultValue: 3,
          min: 1,
          max: 10,
        },
        {
          label: "Timeout",
          name: "timeout",
          type: "markCodeEditor",
          grid_style: "row",
          defaultValue: 30,
          min: 5,
          max: 120,
        },
      ],
      configuring: false,
      data: {
        name: "fakeProducts",
        method: "GET",
        endpoint: "https://fakestoreapi.com/products",
        contentType: "application/json",
        params: {},
        headers: {},
        cookies: {},
        useCache: false,
        responseFormat: "JSON",
        retryCount: 3,
        timeout: 30,
      },
      validateStatusError: false,
      value: [
        {
          id: 1,
          title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          price: 109.95,
          description:
            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
          rating: {
            rate: 3.9,
            count: 120,
          },
        },
        {
          id: 2,
          title: "Mens Casual Premium Slim Fit T-Shirts ",
          price: 22.3,
          description:
            "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          category: "men's clothing",
          image:
            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
          rating: {
            rate: 4.1,
            count: 259,
          },
        },
        {
          id: 3,
          title: "Mens Cotton Jacket",
          price: 55.99,
          description:
            "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
          rating: {
            rate: 4.7,
            count: 500,
          },
        },
        {
          id: 4,
          title: "Mens Casual Slim Fit",
          price: 15.99,
          description:
            "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
          rating: {
            rate: 2.1,
            count: 430,
          },
        },
        {
          id: 5,
          title:
            "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
          price: 695,
          description:
            "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
          category: "jewelery",
          image:
            "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
          rating: {
            rate: 4.6,
            count: 400,
          },
        },
        {
          id: 6,
          title: "Solid Gold Petite Micropave ",
          price: 168,
          description:
            "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
          category: "jewelery",
          image:
            "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
          rating: {
            rate: 3.9,
            count: 70,
          },
        },
        {
          id: 7,
          title: "White Gold Plated Princess",
          price: 9.99,
          description:
            "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
          category: "jewelery",
          image:
            "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
          rating: {
            rate: 3,
            count: 400,
          },
        },
        {
          id: 8,
          title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
          price: 10.99,
          description:
            "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
          category: "jewelery",
          image:
            "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
          rating: {
            rate: 1.9,
            count: 100,
          },
        },
        {
          id: 9,
          title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
          price: 64,
          description:
            "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
          category: "electronics",
          image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
          rating: {
            rate: 3.3,
            count: 203,
          },
        },
        {
          id: 10,
          title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
          price: 109,
          description:
            "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
          category: "electronics",
          image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
          rating: {
            rate: 2.9,
            count: 470,
          },
        },
        {
          id: 11,
          title:
            "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
          price: 109,
          description:
            "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
          category: "electronics",
          image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
          rating: {
            rate: 4.8,
            count: 319,
          },
        },
        {
          id: 12,
          title:
            "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
          price: 114,
          description:
            "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
          category: "electronics",
          image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
          rating: {
            rate: 4.8,
            count: 400,
          },
        },
        {
          id: 13,
          title:
            "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
          price: 599,
          description:
            "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
          category: "electronics",
          image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
          rating: {
            rate: 2.9,
            count: 250,
          },
        },
        {
          id: 14,
          title:
            "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
          price: 999.99,
          description:
            "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
          category: "electronics",
          image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png",
          rating: {
            rate: 2.2,
            count: 140,
          },
        },
        {
          id: 15,
          title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
          price: 56.99,
          description:
            "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
          category: "women's clothing",
          image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
          rating: {
            rate: 2.6,
            count: 235,
          },
        },
        {
          id: 16,
          title:
            "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
          price: 29.95,
          description:
            "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
          category: "women's clothing",
          image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
          rating: {
            rate: 2.9,
            count: 340,
          },
        },
        {
          id: 17,
          title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
          price: 39.99,
          description:
            "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
          category: "women's clothing",
          image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
          rating: {
            rate: 3.8,
            count: 679,
          },
        },
        {
          id: 18,
          title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
          price: 9.85,
          description:
            "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
          category: "women's clothing",
          image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png",
          rating: {
            rate: 4.7,
            count: 130,
          },
        },
        {
          id: 19,
          title: "Opna Women's Short Sleeve Moisture",
          price: 7.95,
          description:
            "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
          category: "women's clothing",
          image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png",
          rating: {
            rate: 4.5,
            count: 146,
          },
        },
        {
          id: 20,
          title: "DANVOUY Womens T Shirt Casual Cotton Short",
          price: 12.99,
          description:
            "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
          category: "women's clothing",
          image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
          rating: {
            rate: 3.6,
            count: 145,
          },
        },
      ],
    },
  ],
  connectors: [
    {
      id: "connector1",
      name: "Database",
      type: "PostgreSQL",
      config: {
        host: "localhost",
        database: "myapp",
      },
    },
    // ... more connectors
  ],
};

export default appData;
