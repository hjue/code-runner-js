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
