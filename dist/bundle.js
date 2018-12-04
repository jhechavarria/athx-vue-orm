/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Entity.js":
/*!****************************!*\
  !*** ./src/core/Entity.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Entity; });\n/* harmony import */ var _ObjectManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectManager */ \"./src/core/ObjectManager.js\");\n/* harmony import */ var _Repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Repository */ \"./src/core/Repository.js\");\n\n\n\nclass Entity extends _ObjectManager__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n{\n    constructor()\n    {\n        super();\n\n        this.unique_identifier = \"id\";\n        this.table_name = this.constructor.name;\n        this.table_schema = {\n            id: {\n                type: Number,\n                required: true,\n                validator: (value) => {\n                    return Number.isInteger(value) && value;\n                }\n            }\n        };\n    }\n\n    getIdentifier()\n    {\n        return this[this.unique_identifier];\n    }\n\n    hydrate(data)\n    {\n        for (let property in this.table_schema)\n        {\n            if (data[property])\n                this[property] = data[property];\n            else if (this.table_schema[property].nullable)\n                this[property] = null;\n        }\n\n        for (let property in this.foreign_keys)\n        {\n            if (!data[property])\n                continue;\n\n            let repo = new _Repository__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.foreign_keys[property]);\n            this[property] = repo.list(data[property]);\n        }\n    }\n\n    toObject()\n    {\n        let obj = {};\n\n        for (let property in this.table_schema)\n        {\n            if (this[property])\n                obj[property] = this[property];\n            else if (this.table_schema[property].nullable)\n                obj[property] = null;\n        }\n\n        for (let property in this.foreign_keys)\n        {\n            if (!this[property])\n                continue;\n\n            obj[property] = [];\n\n            for (let identifier in this[property])\n            {\n                let id = this[property][identifier].getIdentifier();\n                obj[property].push(id);\n            }\n        }\n\n        return obj;\n    }\n}\n\n//# sourceURL=webpack:///./src/core/Entity.js?");

/***/ }),

/***/ "./src/core/ObjectManager.js":
/*!***********************************!*\
  !*** ./src/core/ObjectManager.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ObjectManager; });\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ \"./src/core/Storage.js\");\n/* harmony import */ var _Validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Validator */ \"./src/core/Validator.js\");\n\n\n\nclass ObjectManager extends _Validator__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n{\n    constructor()\n    {\n        super();\n\n        this.storage = new _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    }\n\n    save()\n    {\n        let identifier = this.getIdentifier();\n        let data = this.toObject();\n        let table = this.storage.get(this.table_name);\n\n        if (!table)\n            table = {};\n\n        table[identifier] = data;\n\n        this.storage.set(this.table_name, table);\n    }\n\n    remove()\n    {\n        let identifier = this.getIdentifier();\n        let table = this.storage.get(this.table_name);\n\n        if (!table || table[identifier] == undefined)\n            return true;\n\n        delete table[identifier];\n\n        this.storage.set(this.table_name, table);\n    }\n\n    isLinkable(entity)\n    {\n        for (var property in this.foreign_keys)\n        {\n            let type = this.foreign_keys[property].name;\n            if (entity.constructor.name == type)\n                return true;\n        }\n        return false;\n    }\n\n    link(entity)\n    {\n        for (var property in this.foreign_keys)\n        {\n            let type = this.foreign_keys[property].name;\n            if (entity.constructor.name == type)\n            {\n                let identifier = entity.getIdentifier();\n                if (this[property] && this[property][identifier])\n                    return true;\n\n                if (this[property] == undefined)\n                    this[property] = {};\n\n                this[property][identifier] = entity;\n\n                entity.save();\n                this.save();\n\n                return true;\n            }\n        }\n        return false;\n    }\n\n    unlink(entity)\n    {\n        for (var property in this.foreign_keys)\n        {\n            let type = this.foreign_keys[property].name;\n            if (entity.constructor.name == type)\n            {\n                let identifier = entity.getIdentifier();\n                if (!this[property][identifier])\n                    return true;\n\n                delete this[property][identifier];\n\n                this.save();\n\n                return true;\n            }\n        }\n        return true;\n    }\n}\n\n//# sourceURL=webpack:///./src/core/ObjectManager.js?");

/***/ }),

/***/ "./src/core/Repository.js":
/*!********************************!*\
  !*** ./src/core/Repository.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Repository; });\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ \"./src/core/Storage.js\");\n\n\nclass Repository\n{\n    constructor(object)\n    {\n        this.storage = new _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n        if (typeof object == \"function\")\n        {\n            this.entity = object;\n            this.table_name = object.name;\n        }\n        else if (object instanceof Object)\n        {\n            this.entity = object.constructor;\n            this.table_name = object.constructor.name;\n        }\n    }\n\n    getRawData()\n    {\n        let data = this.storage.get(this.table_name);\n\n        if (data == null)\n            return false;\n\n        return data;\n    }\n\n    read(identifier)\n    {\n        let data = this.getRawData();\n\n        if (!data || data[identifier] == undefined)\n            return false;\n\n        return this.buildEntity(data[identifier]);\n    }\n\n    list(identifiers=null)\n    {\n        let data = this.getRawData();\n        let entity = new this.entity();\n        let identifier = entity.unique_identifier;\n\n        if (!data)\n            return {};\n\n        for (let key in data)\n        {\n            let id = data[key][identifier];\n            if (identifiers != null && !identifiers.includes(id))\n            {\n                delete data[key];\n                continue;\n            }\n\n            data[key] = this.buildEntity(data[key]);\n        }\n\n        return data;\n    }\n\n    find(where)\n    {\n        let data = this.getRawData();\n\n        if (!data)\n            return {};\n\n        let found = {};\n\n        for (key in data)\n        {\n            let item = data[key];\n            let corresponds = true;\n            for (property in where)\n            {\n                if (item[property] != where[property])\n                {\n                    corresponds = false;\n                    break;\n                }\n            }\n            if (corresponds)\n                found[key] = this.buildEntity(item);\n        }\n\n        return found;\n    }\n\n    buildEntity(data)\n    {\n        let entity = new this.entity();\n\n        entity.hydrate(data);\n\n        return entity;\n    }\n}\n\n//# sourceURL=webpack:///./src/core/Repository.js?");

/***/ }),

/***/ "./src/core/Storage.js":
/*!*****************************!*\
  !*** ./src/core/Storage.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Storage; });\nclass Storage\n{\n    constructor(storageType=\"local\")\n    {\n        this.storage = window[storageType + \"Storage\"];\n    }\n\n    get(key)\n    {\n        let data = this.storage.getItem(key);\n\n        if (data == null)\n            return false;\n\n        return JSON.parse(data);\n    }\n\n    set(key, value)\n    {\n        if (!key || !value)\n            return false;\n\n        value = JSON.stringify(value);\n\n        this.storage.setItem(key, value);\n    }\n\n    remove(key)\n    {\n        this.storage.removeItem(key);\n    }\n\n    clear()\n    {\n        this.storage.clear();\n    }\n}\n\n//# sourceURL=webpack:///./src/core/Storage.js?");

/***/ }),

/***/ "./src/core/Validator.js":
/*!*******************************!*\
  !*** ./src/core/Validator.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Validator; });\n/* harmony import */ var _ValidatorRules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidatorRules */ \"./src/core/ValidatorRules.js\");\n\n\nclass Validator extends _ValidatorRules__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n{\n    validate()\n    {\n        this.clearErrors();\n\n        for (var property in this.table_schema)\n        {\n            var data = this[property];\n            var rules = this.table_schema[property];\n\n            if (!this.required(data) && rules.default)\n            {\n                if (typeof rules.default == \"function\")\n                    data = rules.default();\n                else\n                    data = rules.default;\n            }\n\n            if (rules.required && !this.required(data, rules.required))\n                this.setError(property, \"required\");\n\n            if (rules.type && !this.type(data, rules.type))\n                this.setError(property, \"type\");\n\n            if (rules.validator && !this.validator(data, rules.validator))\n                this.setError(property, \"validator\");\n        }\n\n        for (let key in this.validation_errors)\n            return false;\n        return true;\n    }\n\n    getErrors()\n    {\n        return this.validation_errors;\n    }\n\n    clearErrors()\n    {\n        this.validation_errors = {};\n    }\n\n    setError(property, error)\n    {\n        if (!this.validation_errors[property])\n            this.validation_errors[property] = [];\n\n        if (this.validation_errors[property].indexOf(error) == -1)\n            this.validation_errors[property].push(error);\n    }\n\n    prepRule(property, rules)\n    {\n        if (typeof property == \"number\")\n            return {\n                property: rules,\n                required: false\n            };\n\n        if (rules instanceof Array || !rules instanceof Object )\n            return {\n                property: property,\n                type: rules,\n                required: false\n            };\n\n        rules.property = property;\n        return rules;\n    }\n}\n\n//# sourceURL=webpack:///./src/core/Validator.js?");

/***/ }),

/***/ "./src/core/ValidatorRules.js":
/*!************************************!*\
  !*** ./src/core/ValidatorRules.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ValidatorRules; });\nclass ValidatorRules\n{\n    requiredRule(data)\n    {\n        if (typeof data == \"string\" || typeof data == \"object\")\n            return data.length != 0;\n\n        return data != undefined && data != null;\n    }\n\n    typeRule(data, type)\n    {\n        if ((type instanceof Array) == false)\n        {\n            var typeName = type.name.toLowerCase();\n\n            if (typeof data == \"object\")\n            {\n                if (data.constructor == undefined && typeof data == typeName)\n                    return true;\n\n                return data instanceof type;\n            }\n            return typeof data == typeName;\n        }\n\n        for (t of type)\n        {\n            if (this.type(data, t))\n                return true;\n        }\n\n        return false;\n    }\n\n    validatorRule(data, rules)\n    {\n        let validator = rules.validator;\n\n        delete rules.validator;\n\n        return validator(data, rules);\n    }\n}\n\n//# sourceURL=webpack:///./src/core/ValidatorRules.js?");

/***/ }),

/***/ "./src/entities/Playlist.js":
/*!**********************************!*\
  !*** ./src/entities/Playlist.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Playlist; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n/* harmony import */ var _Track__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Track */ \"./src/entities/Track.js\");\n\n\n\nclass Playlist extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n{\n    constructor(data=null)\n    {\n        super();\n\n        this.table_schema['title'] = {\n            type: String,\n            required: true,\n            validator: (value) => {\n                return typeof value == \"string\" && value.length;\n            }\n        }\n\n        this.foreign_keys = {\n            tracks: _Track__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n        };\n\n        if (data)\n            this.hydrate(data);\n    }\n}\n\n//# sourceURL=webpack:///./src/entities/Playlist.js?");

/***/ }),

/***/ "./src/entities/Track.js":
/*!*******************************!*\
  !*** ./src/entities/Track.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Track; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass Track extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n{\n    constructor(data=null)\n    {\n        super();\n\n        this.table_schema['title'] = {\n            type: String,\n            required: true,\n            validator: (value) => {\n                return typeof value == \"string\" && value.length;\n            }\n        }\n\n        if (data)\n            this.hydrate(data);\n    }\n}\n\n//# sourceURL=webpack:///./src/entities/Track.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Repository_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Repository.js */ \"./src/core/Repository.js\");\n/* harmony import */ var _entities_Track__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/Track */ \"./src/entities/Track.js\");\n/* harmony import */ var _entities_Playlist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/Playlist */ \"./src/entities/Playlist.js\");\n// Import des objets\n\n\n\n\n// Initialisation du depot et de l'entite Playlist\nlet trepo = new _core_Repository_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_entities_Track__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nlet track = new _entities_Track__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    id: 1,\n    title: \"Best track ever but another !\"\n});\n\n// Initialisation du depot et de l'entite Track\nlet prepo = new _core_Repository_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_entities_Playlist__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nlet list = new _entities_Playlist__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    id: 1,\n    title: \"My awesome playlist !\"\n});\n\n// Drop de la base de donnees\nprepo.storage.clear();\n\n// Association et sauvegarde des deux entites\nlist.link(track);\n\n// Recherche des entites dans la base de donnees\nlist = prepo.read(list.getIdentifier());\ntrack = trepo.read(list.tracks[1].getIdentifier());\n\n// Affichage des titres des entites\nalert(list.title);\nalert(track.title);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });