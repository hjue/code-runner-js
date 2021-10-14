
# code-runner

支持运行Java、Python、Javascript 的API Server

## Installation

```
npm install

node server.js
```


## Usage
### Request


URL: http://127.0.0.1:8000/runcode
Method: POST
Content-Type: application/json

```json
{ "content": <code>,
  "language": "<java|javascript|python",
  "name": <filename>
 }
```
*Example:*
```json
{ "content": "let x = 10; console.log('hello world!' + x);" ,
  "language": "javascript",
  "name": "main.js"
}
```

### Response

```json
{
    "success": <boolean>,
    "output": <runnig_result>
}
```
*Example:*
```json
{
    "success": true,
    "output": "hello world!10\n"
}
```

## TEST

```
time curl 'http://127.0.0.1:8000/runcode' \
-X 'POST' \
-H 'Content-Type: application/json' \
--data-binary '{"files":[{"language":"java","name":"HelloWorld.java","content":"\n        public class HelloWorld{\n\n          public static void main(String []args){\n             System.out.println(\"Hello World\");\n          }\n     }\n    "}]}' 



time curl 'http://127.0.0.1:8000/runcode' \
-X 'POST' \
-H 'Content-Type: application/json' \
--data-binary '{"files":[{"language":"js","name":"main.js","content":"console.log(\"Hello World!\")"}]}' \



time curl 'http://127.0.0.1:8000/runcode' \
-X 'POST' \
-H 'Content-Type: application/json' \
--data-binary '{"files":[{"language":"python","name":"main.py","content":"print(\"Hello World!\")\n"}]}' 

```