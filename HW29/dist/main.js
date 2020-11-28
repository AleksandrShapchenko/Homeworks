/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports */
/*! CommonJS bailout: this is used directly at 1:17-21 */
/***/ (function() {

eval("var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nconst url = 'https://jsonplaceholder.typicode.com/';\r\nconst postUrl = 'posts';\r\nconst commentsUrl = 'comments';\r\nconst postHistory = [];\r\nlet postNumber = 0;\r\ndocument.addEventListener('DOMContentLoaded', init);\r\nfunction init() {\r\n    const postContainer = document.querySelector('.post-container');\r\n    const request = document.querySelector('#request');\r\n    const postInput = document.querySelector('#postInput');\r\n    request.addEventListener('click', main);\r\n    postInput.addEventListener('keyup', (event) => {\r\n        if (event.key === \"Enter\") {\r\n            main();\r\n        }\r\n        else {\r\n            event.preventDefault();\r\n        }\r\n    });\r\n    function main() {\r\n        let id = Number(postInput.value);\r\n        if (!isNaN(id) && id > 0) {\r\n            postInput.disabled = true;\r\n            getPostById().then((post) => {\r\n                getCommentsByPostId(post);\r\n            }).catch((error) => {\r\n                postInput.disabled = false;\r\n                console.log(error);\r\n            });\r\n        }\r\n        function getPostById() {\r\n            return __awaiter(this, void 0, void 0, function* () {\r\n                let response = yield fetch(`${url}${postUrl}/${id}`);\r\n                if (response.ok) {\r\n                    let response = yield fetch(`${url}${postUrl}/${id}`);\r\n                    let data = yield response.json();\r\n                    let post = document.createElement('pre');\r\n                    post.className = 'post';\r\n                    let span = document.createElement('span');\r\n                    let header = document.createElement('h2');\r\n                    header.innerHTML = `Post№ ${++postNumber}`;\r\n                    header.className = 'post-header';\r\n                    post.append(header);\r\n                    for (const [key, value] of Object.entries(data)) {\r\n                        if (key != 'userId' && key != 'id') {\r\n                            const keyValue = `${key}: ${value}\\n`;\r\n                            span.append(keyValue);\r\n                        }\r\n                    }\r\n                    post.append(span);\r\n                    postContainer.append(post);\r\n                    postHistory.push(data);\r\n                    postInput.disabled = false;\r\n                    postInput.focus();\r\n                    return post;\r\n                }\r\n                else {\r\n                    throw new Error('error with getting post');\r\n                }\r\n            });\r\n        }\r\n        function getCommentsByPostId(post) {\r\n            return __awaiter(this, void 0, void 0, function* () {\r\n                let response = yield fetch(`${url}${postUrl}/${id}/${commentsUrl}`);\r\n                if (response.ok) {\r\n                    let data = yield response.json();\r\n                    let commentsHeader = document.createElement('h3');\r\n                    commentsHeader.innerHTML = 'Comments: ';\r\n                    commentsHeader.className = 'post-header';\r\n                    let span = document.createElement('span');\r\n                    (yield post).append(commentsHeader);\r\n                    for (const entry of data) {\r\n                        for (const [key, value] of Object.entries(entry)) {\r\n                            if (key == 'email' || key == 'body') {\r\n                                const keyValue = `${key}: ${value}\\n`;\r\n                                span.append(keyValue);\r\n                            }\r\n                        }\r\n                    }\r\n                    (yield post).append(span);\r\n                }\r\n                else {\r\n                    throw new Error('error with getting comments');\r\n                }\r\n            });\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ })()
;