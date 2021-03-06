require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = signAddon;
	exports.signAddonAndExit = signAddonAndExit;
	
	var _mz = __webpack_require__(1);
	
	var _when = __webpack_require__(2);
	
	var _when2 = _interopRequireDefault(_when);
	
	var _amoClient = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function signAddon(_ref) {
	  var xpiPath = _ref.xpiPath,
	      id = _ref.id,
	      version = _ref.version,
	      apiKey = _ref.apiKey,
	      apiSecret = _ref.apiSecret,
	      _ref$apiUrlPrefix = _ref.apiUrlPrefix,
	      apiUrlPrefix = _ref$apiUrlPrefix === undefined ? "https://addons.mozilla.org/api/v3" : _ref$apiUrlPrefix,
	      apiJwtExpiresIn = _ref.apiJwtExpiresIn,
	      _ref$verbose = _ref.verbose,
	      verbose = _ref$verbose === undefined ? false : _ref$verbose,
	      timeout = _ref.timeout,
	      downloadDir = _ref.downloadDir,
	      apiProxy = _ref.apiProxy,
	      apiRequestConfig = _ref.apiRequestConfig,
	      _ref$AMOClient = _ref.AMOClient,
	      AMOClient = _ref$AMOClient === undefined ? _amoClient.Client : _ref$AMOClient;
	
	
	  return _when2.default.promise(function (resolve) {
	
	    function reportEmpty(name) {
	      throw new Error("required argument was empty: " + name);
	    }
	
	    if (!xpiPath) {
	      reportEmpty("xpiPath");
	    }
	    if (!version) {
	      reportEmpty("version");
	    }
	    if (!apiSecret) {
	      reportEmpty("apiSecret");
	    }
	    if (!apiKey) {
	      reportEmpty("apiKey");
	    }
	
	    resolve();
	  }).then(function () {
	    return _mz.fs.stat(xpiPath);
	  }).catch(function (statError) {
	    throw new Error("error with " + xpiPath + ": " + statError);
	  }).then(function (stats) {
	    if (!stats.isFile) {
	      throw new Error("not a file: " + xpiPath);
	    }
	  }).then(function () {
	
	    var client = new AMOClient({
	      apiKey: apiKey,
	      apiSecret: apiSecret,
	      apiUrlPrefix: apiUrlPrefix,
	      apiJwtExpiresIn: apiJwtExpiresIn,
	      downloadDir: downloadDir,
	      debugLogging: verbose,
	      signedStatusCheckTimeout: timeout,
	      proxyServer: apiProxy,
	      requestConfig: apiRequestConfig
	    });
	
	    return client.sign({
	      xpiPath: xpiPath,
	      guid: id,
	      version: version
	    });
	  });
	} // Importing this like `import fs from "mz/fs"` was causing usage on
	// npm 2.x to throw missing dependency errors. *shrug*
	function signAddonAndExit(options, _ref2) {
	  var _ref2$systemProcess = _ref2.systemProcess,
	      systemProcess = _ref2$systemProcess === undefined ? process : _ref2$systemProcess,
	      _ref2$throwError = _ref2.throwError,
	      throwError = _ref2$throwError === undefined ? false : _ref2$throwError,
	      _ref2$logger = _ref2.logger,
	      logger = _ref2$logger === undefined ? console : _ref2$logger;
	
	  return signAddon(options).then(function (result) {
	    logger.log(result.success ? "SUCCESS" : "FAIL");
	    systemProcess.exit(result.success ? 0 : 1);
	  }).catch(function (err) {
	    logger.error("FAIL");
	    if (throwError) {
	      throw err;
	    }
	    logger.error(err.stack);
	    systemProcess.exit(1);
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("mz");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("when");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PseudoProgress = exports.Client = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.formatResponse = formatResponse;
	exports.getUrlBasename = getUrlBasename;
	
	var _deepcopy = __webpack_require__(4);
	
	var _deepcopy2 = _interopRequireDefault(_deepcopy);
	
	var _fs = __webpack_require__(5);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _url = __webpack_require__(6);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _path = __webpack_require__(7);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _jsonwebtoken = __webpack_require__(8);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	var _request = __webpack_require__(9);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _when = __webpack_require__(2);
	
	var _when2 = _interopRequireDefault(_when);
	
	var _node = __webpack_require__(10);
	
	var _node2 = _interopRequireDefault(_node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultSetInterval = setInterval;
	var defaultClearInterval = clearInterval;
	
	/**
	 * Construct a new addons.mozilla.org API client.
	 *
	 * @param {Object} conf
	 *   - `apiKey`: API key string from the Developer Hub.
	 *   - `apiSecret`: API secret string from the Developer Hub.
	 *   - `apiUrlPrefix`: API URL prefix, including any leading paths.
	 *   - `apiJwtExpiresIn`: Number of seconds until the JWT token for the API
	 *     request expires. This must match the expiration time that the API
	 *     server accepts.
	 *   - `signedStatusCheckInterval`: A period in millesconds between
	 *     checks when waiting on add-on signing.
	 *   - `signedStatusCheckTimeout`: A length in millesconds to give up
	 *      if the add-on hasn't been signed.
	 *   - `debugLogging`: When true, log more information
	 *   - `downloadDir`: Absolute path to save downloaded files to.
	 *     The working directory will be used by default.
	 *   - `proxyServer`: Optional proxy server to use for all requests,
	 *     such as "http://yourproxy:6000"
	 *   - `requestConfig`: Optional configuration object to pass to
	 *     request(). Not all parameters are guaranteed to be applied.
	 */
	
	var Client = exports.Client = function () {
	  function Client(_ref) {
	    var apiKey = _ref.apiKey,
	        apiSecret = _ref.apiSecret,
	        apiUrlPrefix = _ref.apiUrlPrefix,
	        _ref$apiJwtExpiresIn = _ref.apiJwtExpiresIn,
	        apiJwtExpiresIn = _ref$apiJwtExpiresIn === undefined ? 60 * 5 : _ref$apiJwtExpiresIn,
	        _ref$debugLogging = _ref.debugLogging,
	        debugLogging = _ref$debugLogging === undefined ? false : _ref$debugLogging,
	        _ref$signedStatusChec = _ref.signedStatusCheckInterval,
	        signedStatusCheckInterval = _ref$signedStatusChec === undefined ? 1000 : _ref$signedStatusChec,
	        _ref$signedStatusChec2 = _ref.signedStatusCheckTimeout,
	        signedStatusCheckTimeout = _ref$signedStatusChec2 === undefined ? 120000 : _ref$signedStatusChec2,
	        _ref$logger = _ref.logger,
	        logger = _ref$logger === undefined ? console : _ref$logger,
	        _ref$downloadDir = _ref.downloadDir,
	        downloadDir = _ref$downloadDir === undefined ? process.cwd() : _ref$downloadDir,
	        _ref$fs = _ref.fs,
	        fs = _ref$fs === undefined ? _fs2.default : _ref$fs,
	        _ref$request = _ref.request,
	        request = _ref$request === undefined ? _request2.default : _ref$request,
	        proxyServer = _ref.proxyServer,
	        requestConfig = _ref.requestConfig,
	        validateProgress = _ref.validateProgress;
	
	    _classCallCheck(this, Client);
	
	    this.apiKey = apiKey;
	    this.apiSecret = apiSecret;
	    this.apiUrlPrefix = apiUrlPrefix; // default set in CLI options.
	    this.apiJwtExpiresIn = apiJwtExpiresIn;
	    this.signedStatusCheckInterval = signedStatusCheckInterval;
	    this.signedStatusCheckTimeout = signedStatusCheckTimeout;
	    this.debugLogging = debugLogging;
	    this.logger = logger;
	    this.downloadDir = downloadDir;
	    this.proxyServer = proxyServer;
	    this.requestConfig = requestConfig || {};
	
	    // Set up external dependencies, allowing for overrides.
	    this._validateProgress = validateProgress || new PseudoProgress({
	      preamble: "Validating add-on"
	    });
	    this._fs = fs;
	    this._request = request;
	  }
	
	  /**
	   * Sign a new version of your add-on at addons.mozilla.org.
	   *
	   * @param {Object} conf
	   *   - `xpiPath` Path to xpi file.
	   *   - `guid` Optional add-on GUID, aka the ID in install.rdf.
	   *   - `version` add-on version string.
	   * @return {Promise} signingResult with keys:
	   *   - success: boolean
	   *   - downloadedFiles: Array of file objects
	   *   - id: string identifier for the signed add-on
	   */
	
	
	  _createClass(Client, [{
	    key: "sign",
	    value: function sign(_ref2) {
	      var _this = this;
	
	      var guid = _ref2.guid,
	          version = _ref2.version,
	          xpiPath = _ref2.xpiPath;
	
	
	      var formData = {
	        upload: this._fs.createReadStream(xpiPath)
	      };
	      var addonUrl = "/addons/";
	      var method = "put";
	      if (guid) {
	        // PUT to a specific URL for this add-on + version.
	        addonUrl += encodeURIComponent(guid) + "/versions/" + encodeURIComponent(version) + "/";
	      } else {
	        // POST to a generic URL to create a new add-on.
	        this.debug("Signing add-on without an ID");
	        method = "post";
	        formData.version = version;
	      }
	
	      var doRequest = this[method].bind(this);
	
	      return doRequest({
	        url: addonUrl, formData: formData
	      }, {
	        throwOnBadResponse: false
	      }).then(function (responseResult) {
	        var httpResponse = responseResult[0] || {};
	        var response = responseResult[1] || {};
	
	        var acceptableStatuses = [200, 201, 202];
	        var receivedError = !!response.error;
	        if (acceptableStatuses.indexOf(httpResponse.statusCode) === -1 || receivedError) {
	          if (response.error) {
	            _this.logger.error("Server response: " + response.error, "(status: " + httpResponse.statusCode + ")");
	            return { success: false, reason: 'bad_http_response', error: response.error, statusCode: httpResponse.statusCode };
	          }
	
	          throw new Error("Received bad response from the server while requesting " + _this.absoluteURL(addonUrl) + "\n\n" + "status: " + httpResponse.statusCode + "\n" + "response: " + formatResponse(response) + "\n" + "headers: " + JSON.stringify(httpResponse.headers || {}) + "\n");
	        }
	
	        return _this.waitForSignedAddon(response.url);
	      });
	    }
	
	    /**
	     * Poll a status URL, waiting for the queued add-on to be signed.
	     *
	     * @param {String} URL to GET for add-on status.
	     * @return {Promise}
	     */
	
	  }, {
	    key: "waitForSignedAddon",
	    value: function waitForSignedAddon(statusUrl, opt) {
	      var _this2 = this;
	
	      var lastStatusResponse;
	
	      opt = _extends({
	        clearTimeout: clearTimeout,
	        setAbortTimeout: setTimeout,
	        setStatusCheckTimeout: setTimeout,
	        abortAfter: this.signedStatusCheckTimeout
	      }, opt);
	
	      return _when2.default.promise(function (resolve, reject) {
	        _this2._validateProgress.animate();
	        var statusCheckTimeout;
	        var nextStatusCheck;
	
	        var checkSignedStatus = function checkSignedStatus() {
	          return _this2.get({ url: statusUrl }).then(function (result) {
	            var data = result[1];
	            lastStatusResponse = data;
	
	            // TODO: remove this when the API has been fully deployed with this
	            // change: https://github.com/mozilla/olympia/pull/1041
	            var apiReportsAutoSigning = typeof data.automated_signing !== "undefined";
	
	            var canBeAutoSigned = data.automated_signing;
	            var failedValidation = !data.valid;
	            // The add-on passed validation and all files have been created.
	            // There are many checks for this state because the data will be
	            // updated incrementally by the API server.
	            var signedAndReady = data.valid && data.active && data.reviewed && data.files && data.files.length > 0;
	            // The add-on is valid but requires a manual review before it can
	            // be signed.
	            var requiresManualReview = data.valid && apiReportsAutoSigning && !canBeAutoSigned;
	
	            if (data.processed && (failedValidation || signedAndReady || requiresManualReview)) {
	
	              _this2._validateProgress.finish();
	              opt.clearTimeout(statusCheckTimeout);
	              _this2.logger.log("Validation results:", data.validation_url);
	
	              if (requiresManualReview) {
	                _this2.logger.log("Your add-on has been submitted for review. It passed " + "validation but could not be automatically signed " + "because this is a listed add-on.");
	                return resolve({ success: false, reason: 'listed_not_auto_signed', validationUrl: data.validation_url });
	              } else if (signedAndReady) {
	                // TODO: show some validation warnings if there are any.
	                // We should show things like "missing update URL in install.rdf"
	                return resolve(_this2.downloadSignedFiles(data.files).then(function (result) {
	                  return _extends({
	                    id: data.guid
	                  }, result);
	                }));
	              } else {
	                _this2.logger.log("Your add-on failed validation and could not be signed");
	                return resolve({ success: false, reason: 'validation_failed', validationUrl: data.validation_url, originalResponse: data });
	              }
	            } else {
	              // The add-on has not been fully processed yet.
	              nextStatusCheck = opt.setStatusCheckTimeout(checkSignedStatus, _this2.signedStatusCheckInterval);
	            }
	          });
	        };
	
	        checkSignedStatus().catch(reject);
	
	        statusCheckTimeout = opt.setAbortTimeout(function () {
	          _this2._validateProgress.finish();
	          opt.clearTimeout(nextStatusCheck);
	          reject(new Error("Validation took too long to complete; last status: " + formatResponse(lastStatusResponse || "[null]")));
	        }, opt.abortAfter);
	      });
	    }
	
	    /**
	     * Download the signed files.
	     *
	     * @param {Array} Array of file objects returned from the API.
	     *                Each object needs to have these parameters:
	     *                  - `download_url` - the URL to the file
	     * @return {Promise}
	     */
	
	  }, {
	    key: "downloadSignedFiles",
	    value: function downloadSignedFiles(signedFiles) {
	      var _this3 = this;
	
	      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          _ref3$createWriteStre = _ref3.createWriteStream,
	          createWriteStream = _ref3$createWriteStre === undefined ? _fs2.default.createWriteStream : _ref3$createWriteStre,
	          request = _ref3.request,
	          _ref3$stdout = _ref3.stdout,
	          stdout = _ref3$stdout === undefined ? process.stdout : _ref3$stdout;
	
	      if (!request) {
	        request = this._request;
	      }
	      var allDownloads = [];
	      var dataExpected = null;
	      var dataReceived = 0;
	
	      function showProgress() {
	        var progress = "...";
	        if (dataExpected !== null) {
	          var amount = (dataReceived / dataExpected * 100).toFixed();
	          // Pad the percentage amount so that the line length is consistent.
	          // This should do something like '  0%', ' 25%', '100%'
	          var padding = "";
	          try {
	            padding = Array(4 - amount.length).join(" ");
	          } catch (e) {
	            // Ignore Invalid array length and such.
	          }
	          progress = padding + amount + "% ";
	        }
	        stdout.write("\r" + "Downloading signed files: " + progress);
	      }
	
	      var download = function download(fileUrl) {
	        return _when2.default.promise(function (resolve, reject) {
	          // The API will give us a signed file named in a sane way.
	          var fileName = _path2.default.join(_this3.downloadDir, getUrlBasename(fileUrl));
	          var out = createWriteStream(fileName);
	
	          request(_this3.configureRequest({
	            method: "GET",
	            url: fileUrl,
	            followRedirect: true
	          })).on("error", reject).on("response", function (response) {
	            if (response.statusCode < 200 || response.statusCode >= 300) {
	              throw new Error("Got a " + response.statusCode + " response " + ("when downloading " + fileUrl));
	            }
	            var contentLength = response.headers["content-length"];
	            if (contentLength) {
	              dataExpected += parseInt(contentLength);
	            }
	          }).on("data", function (chunk) {
	            dataReceived += chunk.length;
	            showProgress();
	          }).pipe(out).on("error", reject);
	
	          out.on("finish", function () {
	            stdout.write("\n"); // end the progress output
	            resolve(fileName);
	          });
	        });
	      };
	
	      return _when2.default.promise(function (resolve, reject) {
	        var foundUnsignedFiles = false;
	        signedFiles.forEach(function (file) {
	          if (file.signed) {
	            allDownloads.push(download(file.download_url));
	          } else {
	            _this3.debug("This file was not signed:", file);
	            foundUnsignedFiles = true;
	          }
	        });
	
	        if (allDownloads.length) {
	          if (foundUnsignedFiles) {
	            _this3.logger.log("Some files were not signed. Re-run with --verbose for details.");
	          }
	          showProgress();
	          resolve(_when2.default.all(allDownloads));
	        } else {
	          reject(new Error("The XPI was processed but no signed files were found. Check your " + "manifest and make sure it targets Firefox as an application."));
	        }
	      }).then(function (downloadedFiles) {
	        _this3.logger.log("Downloaded:");
	        downloadedFiles.forEach(function (fileName) {
	          _this3.logger.log("    " + fileName.replace(process.cwd(), "."));
	        });
	        return {
	          success: true,
	          downloadedFiles: downloadedFiles
	        };
	      });
	    }
	
	    /**
	     * Make a GET request.
	     *
	     * @param {Object} conf, as accepted by the `request` module.
	     * @param {Object} options, as accepted by `this.request()`.
	     * @return {Promise}
	     */
	
	  }, {
	    key: "get",
	    value: function get() {
	      return this.request.apply(this, ["get"].concat(Array.prototype.slice.call(arguments)));
	    }
	
	    /**
	     * Make a POST request.
	     *
	     * @param {Object} conf, as accepted by the `request` module.
	     * @param {Object} options, as accepted by `this.request()`.
	     * @return {Promise}
	     */
	
	  }, {
	    key: "post",
	    value: function post() {
	      return this.request.apply(this, ["post"].concat(Array.prototype.slice.call(arguments)));
	    }
	
	    /**
	     * Make a PUT request.
	     *
	     * @param {Object} conf, as accepted by the `request` module.
	     * @param {Object} options, as accepted by `this.request()`.
	     * @return {Promise}
	     */
	
	  }, {
	    key: "put",
	    value: function put() {
	      return this.request.apply(this, ["put"].concat(Array.prototype.slice.call(arguments)));
	    }
	
	    /**
	     * Make a PATCH request.
	     *
	     * @param {Object} conf, as accepted by the `request` module.
	     * @param {Object} options, as accepted by `this.request()`.
	     * @return {Promise}
	     */
	
	  }, {
	    key: "patch",
	    value: function patch() {
	      return this.request.apply(this, ["patch"].concat(Array.prototype.slice.call(arguments)));
	    }
	
	    /**
	     * Make a DELETE request.
	     *
	     * @param {Object} conf, as accepted by the `request` module.
	     * @param {Object} options, as accepted by `this.request()`.
	     * @return {Promise}
	     */
	
	  }, {
	    key: "delete",
	    value: function _delete() {
	      return this.request.apply(this, ["delete"].concat(Array.prototype.slice.call(arguments)));
	    }
	
	    /**
	     * Returns a URL that is guaranteed to be absolute.
	     *
	     * @param {String} a relative or already absolute URL
	     * @return {String} an absolute URL, prefixed by the API prefix if necessary.
	     */
	
	  }, {
	    key: "absoluteURL",
	    value: function absoluteURL(url) {
	      if (!url.match(/^http/i)) {
	        url = this.apiUrlPrefix + url;
	      }
	      return url;
	    }
	
	    /**
	     * Configures a request with defaults such as authentication headers.
	     *
	     * @param {Object} requestConf as accepted by the `request` module.
	     * @return {Object} new requestConf object suitable
	     *                  for `request(conf)`, `request.get(conf)`, etc.
	     */
	
	  }, {
	    key: "configureRequest",
	    value: function configureRequest(requestConf) {
	      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          _ref4$jwt = _ref4.jwt,
	          jwt = _ref4$jwt === undefined ? _jsonwebtoken2.default : _ref4$jwt;
	
	      requestConf = _extends({}, this.requestConfig, requestConf);
	      if (!requestConf.url) {
	        throw new Error("request URL was not specified");
	      }
	      requestConf.url = this.absoluteURL(requestConf.url);
	      if (this.proxyServer) {
	        requestConf.proxy = this.proxyServer;
	      }
	
	      var authToken = jwt.sign({ iss: this.apiKey }, this.apiSecret, {
	        algorithm: "HS256",
	        expiresIn: this.apiJwtExpiresIn
	      });
	
	      // Make sure the request won't time out before the JWT expires.
	      // This may be useful for slow file uploads.
	      requestConf.timeout = this.apiJwtExpiresIn * 1000 + 500;
	
	      requestConf.headers = _extends({
	        Authorization: "JWT " + authToken,
	        Accept: "application/json"
	      }, requestConf.headers);
	
	      return requestConf;
	    }
	
	    /**
	     * Make any HTTP request to the addons.mozilla.org API.
	     *
	     * This includes the necessary authorization header.
	     *
	     * @param {String} method - HTTP method name.
	     * @param {Object} requestConf as accepted by the `request` module.
	     * @param {Object} options.
	     *  - `throwOnBadResponse` - if true, an error will be thrown when not
	     *                           response status is not 2xx
	     *
	     * The returned promise will be resolved with an array of arguments
	     * that match the arguments sent to the callback as specified in the
	     * `request` module.
	     *
	     * @return {Promise}
	     */
	
	  }, {
	    key: "request",
	    value: function request(method, requestConf) {
	      var _this4 = this;
	
	      var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          _ref5$throwOnBadRespo = _ref5.throwOnBadResponse,
	          throwOnBadResponse = _ref5$throwOnBadRespo === undefined ? true : _ref5$throwOnBadRespo;
	
	      method = method.toLowerCase();
	      return _when2.default.promise(function (resolve) {
	        requestConf = _this4.configureRequest(requestConf);
	        _this4.debug("[API] " + method.toUpperCase() + " request:\n", requestConf);
	
	        // Get the caller, like request.get(), request.put() ...
	        var requestMethod = _this4._request[method].bind(_this4._request);
	        // Wrap the request callback in a promise. Here is an example without
	        // promises:
	        //
	        // request.put(requestConf, function(err, httpResponse, body) {
	        //   // promise gets resolved here
	        // })
	        //
	        resolve(_node2.default.call(requestMethod, requestConf));
	      }).then(function (responseResult) {
	        var httpResponse = responseResult[0];
	        var body = responseResult[1];
	
	        if (throwOnBadResponse) {
	          if (httpResponse.statusCode > 299 || httpResponse.statusCode < 200) {
	            throw new Error("Received bad response from " + _this4.absoluteURL(requestConf.url) + "; " + "status: " + httpResponse.statusCode + "; " + "response: " + formatResponse(body));
	          }
	        }
	
	        if (httpResponse.headers && httpResponse.headers["content-type"] === "application/json" && typeof body === "string") {
	          try {
	            body = JSON.parse(body);
	          } catch (e) {
	            _this4.logger.log("Failed to parse JSON response from server:", e);
	          }
	        }
	        _this4.debug("[API] " + method.toUpperCase() + " response:\n", "Status: " + httpResponse.statusCode + "\n", { headers: httpResponse.headers, response: body });
	
	        return [httpResponse, body];
	      });
	    }
	
	    /**
	     * Output some debugging info if this instance is configured for it.
	     */
	
	  }, {
	    key: "debug",
	    value: function debug() {
	      var _logger;
	
	      if (!this.debugLogging) {
	        return;
	      }
	
	      function redact(obj) {
	        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object" || !obj) {
	          return obj;
	        }
	        if (obj.headers) {
	          ["Authorization", "cookie", "set-cookie"].forEach(function (hdr) {
	            if (obj.headers[hdr]) {
	              obj.headers[hdr] = "<REDACTED>";
	            }
	          });
	        }
	        Object.keys(obj).forEach(function (key) {
	          obj[key] = redact(obj[key]);
	        });
	        return obj;
	      }
	
	      var args = Array.prototype.map.call(arguments, function (val) {
	        if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
	          val = (0, _deepcopy2.default)(val);
	          val = redact(val);
	        }
	        return val;
	      });
	      (_logger = this.logger).log.apply(_logger, ["[sign-addon]"].concat(_toConsumableArray(args)));
	    }
	  }]);
	
	  return Client;
	}();
	
	/**
	 * A pseudo progress indicator.
	 *
	 * This is just a silly shell animation that was meant to simulate how lots of
	 * tests would be run on an add-on file. It sort of looks like a torrent file
	 * randomly getting filled in.
	 */
	
	
	var PseudoProgress = exports.PseudoProgress = function () {
	  function PseudoProgress() {
	    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref6$preamble = _ref6.preamble,
	        preamble = _ref6$preamble === undefined ? "" : _ref6$preamble,
	        _ref6$setInterval = _ref6.setInterval,
	        setInterval = _ref6$setInterval === undefined ? defaultSetInterval : _ref6$setInterval,
	        _ref6$clearInterval = _ref6.clearInterval,
	        clearInterval = _ref6$clearInterval === undefined ? defaultClearInterval : _ref6$clearInterval,
	        _ref6$stdout = _ref6.stdout,
	        stdout = _ref6$stdout === undefined ? process.stdout : _ref6$stdout;
	
	    _classCallCheck(this, PseudoProgress);
	
	    this.bucket = [];
	    this.interval = null;
	    this.motionCounter = 1;
	
	    this.preamble = preamble;
	    this.preamble += " [";
	    this.addendum = "]";
	    this.setInterval = setInterval;
	    this.clearInterval = clearInterval;
	    this.stdout = stdout;
	
	    var shellWidth = 80;
	    if (this.stdout.isTTY) {
	      shellWidth = this.stdout.columns;
	    }
	
	    this.emptyBucketPointers = [];
	    var bucketSize = shellWidth - this.preamble.length - this.addendum.length;
	    for (var i = 0; i < bucketSize; i++) {
	      this.bucket.push(" ");
	      this.emptyBucketPointers.push(i);
	    }
	  }
	
	  _createClass(PseudoProgress, [{
	    key: "animate",
	    value: function animate(conf) {
	      var _this5 = this;
	
	      conf = _extends({
	        speed: 100
	      }, conf);
	      var bucketIsFull = false;
	      this.interval = this.setInterval(function () {
	        if (bucketIsFull) {
	          _this5.moveBucket();
	        } else {
	          bucketIsFull = _this5.randomlyFillBucket();
	        }
	      }, conf.speed);
	    }
	  }, {
	    key: "finish",
	    value: function finish() {
	      this.clearInterval(this.interval);
	      this.fillBucket();
	      // The bucket has already filled to the terminal width at this point
	      // but for copy/paste purposes, add a new line:
	      this.stdout.write("\n");
	    }
	  }, {
	    key: "randomlyFillBucket",
	    value: function randomlyFillBucket() {
	      var _this6 = this;
	
	      // randomly fill a bucket (the width of the shell) with dots.
	      var randomIndex = Math.floor(Math.random() * this.emptyBucketPointers.length);
	      var pointer = this.emptyBucketPointers[randomIndex];
	      this.bucket[pointer] = ".";
	
	      this.showBucket();
	
	      var isFull = true;
	      var newPointers = [];
	      this.emptyBucketPointers.forEach(function (pointer) {
	        if (_this6.bucket[pointer] === " ") {
	          isFull = false;
	          newPointers.push(pointer);
	        }
	      });
	      this.emptyBucketPointers = newPointers;
	
	      return isFull;
	    }
	  }, {
	    key: "fillBucket",
	    value: function fillBucket() {
	      // fill the whole bucket with dots to indicate completion.
	      this.bucket = this.bucket.map(function () {
	        return ".";
	      });
	      this.showBucket();
	    }
	  }, {
	    key: "moveBucket",
	    value: function moveBucket() {
	      // animate dots moving in a forward motion.
	      for (var i = 0; i < this.bucket.length; i++) {
	        this.bucket[i] = (i - this.motionCounter) % 3 ? " " : ".";
	      }
	      this.showBucket();
	
	      this.motionCounter++;
	    }
	  }, {
	    key: "showBucket",
	    value: function showBucket() {
	      this.stdout.write("\r" + this.preamble + this.bucket.join("") + this.addendum);
	    }
	  }]);
	
	  return PseudoProgress;
	}();
	
	/**
	 * Returns a nicely formatted HTTP response.
	 *
	 * This makes the response suitable for logging.
	 * */
	
	
	function formatResponse(response, options) {
	  options = _extends({
	    maxLength: 500
	  }, options);
	  var prettyResponse = response;
	  if ((typeof prettyResponse === "undefined" ? "undefined" : _typeof(prettyResponse)) === "object") {
	    try {
	      prettyResponse = JSON.stringify(prettyResponse);
	    } catch (e) {
	      //
	    }
	  }
	  if (typeof prettyResponse === "string") {
	    if (prettyResponse.length > options.maxLength) {
	      prettyResponse = prettyResponse.substring(0, options.maxLength) + "...";
	    }
	  }
	  return prettyResponse.toString();
	}
	
	/**
	 * Returns the basename of a URL, suitable for saving to disk.
	 * */
	function getUrlBasename(absUrl) {
	  var urlPath = _path2.default.basename(_url2.default.parse(absUrl).path);
	  var parts = urlPath.split("?");
	  return parts[0];
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("deepcopy");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2013 original author or authors */
	
	/**
	 * Collection of helpers for interfacing with node-style asynchronous functions
	 * using promises.
	 *
	 * @author Brian Cavalier
	 * @contributor Renato Zannon
	 */
	
	(function(define) {
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var when = __webpack_require__(11);
		var _liftAll = __webpack_require__(30);
		var setTimer = __webpack_require__(13).setTimer;
		var slice = Array.prototype.slice;
	
		var _apply = __webpack_require__(18)(when.Promise, dispatch);
	
		return {
			lift: lift,
			liftAll: liftAll,
			apply: apply,
			call: call,
			createCallback: createCallback,
			bindCallback: bindCallback,
			liftCallback: liftCallback
		};
	
		/**
		 * Takes a node-style async function and calls it immediately (with an optional
		 * array of arguments or promises for arguments). It returns a promise whose
		 * resolution depends on whether the async functions calls its callback with the
		 * conventional error argument or not.
		 *
		 * With this it becomes possible to leverage existing APIs while still reaping
		 * the benefits of promises.
		 *
		 * @example
		 *    function onlySmallNumbers(n, callback) {
		 *		if(n < 10) {
		 *			callback(null, n + 10);
		 *		} else {
		 *			callback(new Error("Calculation failed"));
		 *		}
		 *	}
		 *
		 *    var nodefn = require("when/node/function");
		 *
		 *    // Logs '15'
		 *    nodefn.apply(onlySmallNumbers, [5]).then(console.log, console.error);
		 *
		 *    // Logs 'Calculation failed'
		 *    nodefn.apply(onlySmallNumbers, [15]).then(console.log, console.error);
		 *
		 * @param {function} f node-style function that will be called
		 * @param {Array} [args] array of arguments to func
		 * @returns {Promise} promise for the value func passes to its callback
		 */
		function apply(f, args) {
			return _apply(f, this, args || []);
		}
	
		function dispatch(f, thisArg, args, h) {
			var cb = createCallback(h);
			try {
				switch(args.length) {
					case 2: f.call(thisArg, args[0], args[1], cb); break;
					case 1: f.call(thisArg, args[0], cb); break;
					case 0: f.call(thisArg, cb); break;
					default:
						args.push(cb);
						f.apply(thisArg, args);
				}
			} catch(e) {
				h.reject(e);
			}
		}
	
		/**
		 * Has the same behavior that {@link apply} has, with the difference that the
		 * arguments to the function are provided individually, while {@link apply} accepts
		 * a single array.
		 *
		 * @example
		 *    function sumSmallNumbers(x, y, callback) {
		 *		var result = x + y;
		 *		if(result < 10) {
		 *			callback(null, result);
		 *		} else {
		 *			callback(new Error("Calculation failed"));
		 *		}
		 *	}
		 *
		 *    // Logs '5'
		 *    nodefn.call(sumSmallNumbers, 2, 3).then(console.log, console.error);
		 *
		 *    // Logs 'Calculation failed'
		 *    nodefn.call(sumSmallNumbers, 5, 10).then(console.log, console.error);
		 *
		 * @param {function} f node-style function that will be called
		 * @param {...*} [args] arguments that will be forwarded to the function
		 * @returns {Promise} promise for the value func passes to its callback
		 */
		function call(f /*, args... */) {
			return _apply(f, this, slice.call(arguments, 1));
		}
	
		/**
		 * Takes a node-style function and returns new function that wraps the
		 * original and, instead of taking a callback, returns a promise. Also, it
		 * knows how to handle promises given as arguments, waiting for their
		 * resolution before executing.
		 *
		 * Upon execution, the orginal function is executed as well. If it passes
		 * a truthy value as the first argument to the callback, it will be
		 * interpreted as an error condition, and the promise will be rejected
		 * with it. Otherwise, the call is considered a resolution, and the promise
		 * is resolved with the callback's second argument.
		 *
		 * @example
		 *    var fs = require("fs"), nodefn = require("when/node/function");
		 *
		 *    var promiseRead = nodefn.lift(fs.readFile);
		 *
		 *    // The promise is resolved with the contents of the file if everything
		 *    // goes ok
		 *    promiseRead('exists.txt').then(console.log, console.error);
		 *
		 *    // And will be rejected if something doesn't work out
		 *    // (e.g. the files does not exist)
		 *    promiseRead('doesnt_exist.txt').then(console.log, console.error);
		 *
		 *
		 * @param {Function} f node-style function to be lifted
		 * @param {...*} [args] arguments to be prepended for the new function @deprecated
		 * @returns {Function} a promise-returning function
		 */
		function lift(f /*, args... */) {
			var args1 = arguments.length > 1 ? slice.call(arguments, 1) : [];
			return function() {
				// TODO: Simplify once partialing has been removed
				var l = args1.length;
				var al = arguments.length;
				var args = new Array(al + l);
				var i;
				for(i=0; i<l; ++i) {
					args[i] = args1[i];
				}
				for(i=0; i<al; ++i) {
					args[i+l] = arguments[i];
				}
				return _apply(f, this, args);
			};
		}
	
		/**
		 * Lift all the functions/methods on src
		 * @param {object|function} src source whose functions will be lifted
		 * @param {function?} combine optional function for customizing the lifting
		 *  process. It is passed dst, the lifted function, and the property name of
		 *  the original function on src.
		 * @param {(object|function)?} dst option destination host onto which to place lifted
		 *  functions. If not provided, liftAll returns a new object.
		 * @returns {*} If dst is provided, returns dst with lifted functions as
		 *  properties.  If dst not provided, returns a new object with lifted functions.
		 */
		function liftAll(src, combine, dst) {
			return _liftAll(lift, combine, dst, src);
		}
	
		/**
		 * Takes an object that responds to the resolver interface, and returns
		 * a function that will resolve or reject it depending on how it is called.
		 *
		 * @example
		 *	function callbackTakingFunction(callback) {
		 *		if(somethingWrongHappened) {
		 *			callback(error);
		 *		} else {
		 *			callback(null, interestingValue);
		 *		}
		 *	}
		 *
		 *	var when = require('when'), nodefn = require('when/node/function');
		 *
		 *	var deferred = when.defer();
		 *	callbackTakingFunction(nodefn.createCallback(deferred.resolver));
		 *
		 *	deferred.promise.then(function(interestingValue) {
		 *		// Use interestingValue
		 *	});
		 *
		 * @param {Resolver} resolver that will be 'attached' to the callback
		 * @returns {Function} a node-style callback function
		 */
		function createCallback(resolver) {
			return function(err, value) {
				if(err) {
					resolver.reject(err);
				} else if(arguments.length > 2) {
					resolver.resolve(slice.call(arguments, 1));
				} else {
					resolver.resolve(value);
				}
			};
		}
	
		/**
		 * Attaches a node-style callback to a promise, ensuring the callback is
		 * called for either fulfillment or rejection. Returns a promise with the same
		 * state as the passed-in promise.
		 *
		 * @example
		 *	var deferred = when.defer();
		 *
		 *	function callback(err, value) {
		 *		// Handle err or use value
		 *	}
		 *
		 *	bindCallback(deferred.promise, callback);
		 *
		 *	deferred.resolve('interesting value');
		 *
		 * @param {Promise} promise The promise to be attached to.
		 * @param {Function} callback The node-style callback to attach.
		 * @returns {Promise} A promise with the same state as the passed-in promise.
		 */
		function bindCallback(promise, callback) {
			promise = when(promise);
	
			if (callback) {
				promise.then(success, wrapped);
			}
	
			return promise;
	
			function success(value) {
				wrapped(null, value);
			}
	
			function wrapped(err, value) {
				setTimer(function () {
					callback(err, value);
				}, 0);
			}
		}
	
		/**
		 * Takes a node-style callback and returns new function that accepts a
		 * promise, calling the original callback when the promise is either
		 * fulfilled or rejected with the appropriate arguments.
		 *
		 * @example
		 *	var deferred = when.defer();
		 *
		 *	function callback(err, value) {
		 *		// Handle err or use value
		 *	}
		 *
		 *	var wrapped = liftCallback(callback);
		 *
		 *	// `wrapped` can now be passed around at will
		 *	wrapped(deferred.promise);
		 *
		 *	deferred.resolve('interesting value');
		 *
		 * @param {Function} callback The node-style callback to wrap.
		 * @returns {Function} The lifted, promise-accepting function.
		 */
		function liftCallback(callback) {
			return function(promise) {
				return bindCallback(promise, callback);
			};
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	})(__webpack_require__(14));
	
	
	


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	
	/**
	 * Promises/A+ and when() implementation
	 * when is part of the cujoJS family of libraries (http://cujojs.com/)
	 * @author Brian Cavalier
	 * @author John Hann
	 */
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
		var timed = __webpack_require__(12);
		var array = __webpack_require__(16);
		var flow = __webpack_require__(19);
		var fold = __webpack_require__(20);
		var inspect = __webpack_require__(21);
		var generate = __webpack_require__(22);
		var progress = __webpack_require__(23);
		var withThis = __webpack_require__(24);
		var unhandledRejection = __webpack_require__(25);
		var TimeoutError = __webpack_require__(15);
	
		var Promise = [array, flow, fold, generate, progress,
			inspect, withThis, timed, unhandledRejection]
			.reduce(function(Promise, feature) {
				return feature(Promise);
			}, __webpack_require__(27));
	
		var apply = __webpack_require__(18)(Promise);
	
		// Public API
	
		when.promise     = promise;              // Create a pending promise
		when.resolve     = Promise.resolve;      // Create a resolved promise
		when.reject      = Promise.reject;       // Create a rejected promise
	
		when.lift        = lift;                 // lift a function to return promises
		when['try']      = attempt;              // call a function and return a promise
		when.attempt     = attempt;              // alias for when.try
	
		when.iterate     = Promise.iterate;      // DEPRECATED (use cujojs/most streams) Generate a stream of promises
		when.unfold      = Promise.unfold;       // DEPRECATED (use cujojs/most streams) Generate a stream of promises
	
		when.join        = join;                 // Join 2 or more promises
	
		when.all         = all;                  // Resolve a list of promises
		when.settle      = settle;               // Settle a list of promises
	
		when.any         = lift(Promise.any);    // One-winner race
		when.some        = lift(Promise.some);   // Multi-winner race
		when.race        = lift(Promise.race);   // First-to-settle race
	
		when.map         = map;                  // Array.map() for promises
		when.filter      = filter;               // Array.filter() for promises
		when.reduce      = lift(Promise.reduce);       // Array.reduce() for promises
		when.reduceRight = lift(Promise.reduceRight);  // Array.reduceRight() for promises
	
		when.isPromiseLike = isPromiseLike;      // Is something promise-like, aka thenable
	
		when.Promise     = Promise;              // Promise constructor
		when.defer       = defer;                // Create a {promise, resolve, reject} tuple
	
		// Error types
	
		when.TimeoutError = TimeoutError;
	
		/**
		 * Get a trusted promise for x, or by transforming x with onFulfilled
		 *
		 * @param {*} x
		 * @param {function?} onFulfilled callback to be called when x is
		 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
		 *   will be invoked immediately.
		 * @param {function?} onRejected callback to be called when x is
		 *   rejected.
		 * @param {function?} onProgress callback to be called when progress updates
		 *   are issued for x. @deprecated
		 * @returns {Promise} a new promise that will fulfill with the return
		 *   value of callback or errback or the completion value of promiseOrValue if
		 *   callback and/or errback is not supplied.
		 */
		function when(x, onFulfilled, onRejected, onProgress) {
			var p = Promise.resolve(x);
			if (arguments.length < 2) {
				return p;
			}
	
			return p.then(onFulfilled, onRejected, onProgress);
		}
	
		/**
		 * Creates a new promise whose fate is determined by resolver.
		 * @param {function} resolver function(resolve, reject, notify)
		 * @returns {Promise} promise whose fate is determine by resolver
		 */
		function promise(resolver) {
			return new Promise(resolver);
		}
	
		/**
		 * Lift the supplied function, creating a version of f that returns
		 * promises, and accepts promises as arguments.
		 * @param {function} f
		 * @returns {Function} version of f that returns promises
		 */
		function lift(f) {
			return function() {
				for(var i=0, l=arguments.length, a=new Array(l); i<l; ++i) {
					a[i] = arguments[i];
				}
				return apply(f, this, a);
			};
		}
	
		/**
		 * Call f in a future turn, with the supplied args, and return a promise
		 * for the result.
		 * @param {function} f
		 * @returns {Promise}
		 */
		function attempt(f /*, args... */) {
			/*jshint validthis:true */
			for(var i=0, l=arguments.length-1, a=new Array(l); i<l; ++i) {
				a[i] = arguments[i+1];
			}
			return apply(f, this, a);
		}
	
		/**
		 * Creates a {promise, resolver} pair, either or both of which
		 * may be given out safely to consumers.
		 * @return {{promise: Promise, resolve: function, reject: function, notify: function}}
		 */
		function defer() {
			return new Deferred();
		}
	
		function Deferred() {
			var p = Promise._defer();
	
			function resolve(x) { p._handler.resolve(x); }
			function reject(x) { p._handler.reject(x); }
			function notify(x) { p._handler.notify(x); }
	
			this.promise = p;
			this.resolve = resolve;
			this.reject = reject;
			this.notify = notify;
			this.resolver = { resolve: resolve, reject: reject, notify: notify };
		}
	
		/**
		 * Determines if x is promise-like, i.e. a thenable object
		 * NOTE: Will return true for *any thenable object*, and isn't truly
		 * safe, since it may attempt to access the `then` property of x (i.e.
		 *  clever/malicious getters may do weird things)
		 * @param {*} x anything
		 * @returns {boolean} true if x is promise-like
		 */
		function isPromiseLike(x) {
			return x && typeof x.then === 'function';
		}
	
		/**
		 * Return a promise that will resolve only once all the supplied arguments
		 * have resolved. The resolution value of the returned promise will be an array
		 * containing the resolution values of each of the arguments.
		 * @param {...*} arguments may be a mix of promises and values
		 * @returns {Promise}
		 */
		function join(/* ...promises */) {
			return Promise.all(arguments);
		}
	
		/**
		 * Return a promise that will fulfill once all input promises have
		 * fulfilled, or reject when any one input promise rejects.
		 * @param {array|Promise} promises array (or promise for an array) of promises
		 * @returns {Promise}
		 */
		function all(promises) {
			return when(promises, Promise.all);
		}
	
		/**
		 * Return a promise that will always fulfill with an array containing
		 * the outcome states of all input promises.  The returned promise
		 * will only reject if `promises` itself is a rejected promise.
		 * @param {array|Promise} promises array (or promise for an array) of promises
		 * @returns {Promise} promise for array of settled state descriptors
		 */
		function settle(promises) {
			return when(promises, Promise.settle);
		}
	
		/**
		 * Promise-aware array map function, similar to `Array.prototype.map()`,
		 * but input array may contain promises or values.
		 * @param {Array|Promise} promises array of anything, may contain promises and values
		 * @param {function(x:*, index:Number):*} mapFunc map function which may
		 *  return a promise or value
		 * @returns {Promise} promise that will fulfill with an array of mapped values
		 *  or reject if any input promise rejects.
		 */
		function map(promises, mapFunc) {
			return when(promises, function(promises) {
				return Promise.map(promises, mapFunc);
			});
		}
	
		/**
		 * Filter the provided array of promises using the provided predicate.  Input may
		 * contain promises and values
		 * @param {Array|Promise} promises array of promises and values
		 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
		 *  Must return truthy (or promise for truthy) for items to retain.
		 * @returns {Promise} promise that will fulfill with an array containing all items
		 *  for which predicate returned truthy.
		 */
		function filter(promises, predicate) {
			return when(promises, function(promises) {
				return Promise.filter(promises, predicate);
			});
		}
	
		return when;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(14));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var env = __webpack_require__(13);
		var TimeoutError = __webpack_require__(15);
	
		function setTimeout(f, ms, x, y) {
			return env.setTimer(function() {
				f(x, y, ms);
			}, ms);
		}
	
		return function timed(Promise) {
			/**
			 * Return a new promise whose fulfillment value is revealed only
			 * after ms milliseconds
			 * @param {number} ms milliseconds
			 * @returns {Promise}
			 */
			Promise.prototype.delay = function(ms) {
				var p = this._beget();
				this._handler.fold(handleDelay, ms, void 0, p._handler);
				return p;
			};
	
			function handleDelay(ms, x, h) {
				setTimeout(resolveDelay, ms, x, h);
			}
	
			function resolveDelay(x, h) {
				h.resolve(x);
			}
	
			/**
			 * Return a new promise that rejects after ms milliseconds unless
			 * this promise fulfills earlier, in which case the returned promise
			 * fulfills with the same value.
			 * @param {number} ms milliseconds
			 * @param {Error|*=} reason optional rejection reason to use, defaults
			 *   to a TimeoutError if not provided
			 * @returns {Promise}
			 */
			Promise.prototype.timeout = function(ms, reason) {
				var p = this._beget();
				var h = p._handler;
	
				var t = setTimeout(onTimeout, ms, reason, p._handler);
	
				this._handler.visit(h,
					function onFulfill(x) {
						env.clearTimer(t);
						this.resolve(x); // this = h
					},
					function onReject(x) {
						env.clearTimer(t);
						this.reject(x); // this = h
					},
					h.notify);
	
				return p;
			};
	
			function onTimeout(reason, h, ms) {
				var e = typeof reason === 'undefined'
					? new TimeoutError('timed out after ' + ms + 'ms')
					: reason;
				h.reject(e);
			}
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		/*jshint maxcomplexity:6*/
	
		// Sniff "best" async scheduling option
		// Prefer process.nextTick or MutationObserver, then check for
		// setTimeout, and finally vertx, since its the only env that doesn't
		// have setTimeout
	
		var MutationObs;
		var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;
	
		// Default env
		var setTimer = function(f, ms) { return setTimeout(f, ms); };
		var clearTimer = function(t) { return clearTimeout(t); };
		var asap = function (f) { return capturedSetTimeout(f, 0); };
	
		// Detect specific env
		if (isNode()) { // Node
			asap = function (f) { return process.nextTick(f); };
	
		} else if (MutationObs = hasMutationObserver()) { // Modern browser
			asap = initMutationObserver(MutationObs);
	
		} else if (!capturedSetTimeout) { // vert.x
			var vertxRequire = require;
			var vertx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
			setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
			clearTimer = vertx.cancelTimer;
			asap = vertx.runOnLoop || vertx.runOnContext;
		}
	
		return {
			setTimer: setTimer,
			clearTimer: clearTimer,
			asap: asap
		};
	
		function isNode () {
			return typeof process !== 'undefined' &&
				Object.prototype.toString.call(process) === '[object process]';
		}
	
		function hasMutationObserver () {
			return (typeof MutationObserver === 'function' && MutationObserver) ||
				(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
		}
	
		function initMutationObserver(MutationObserver) {
			var scheduled;
			var node = document.createTextNode('');
			var o = new MutationObserver(run);
			o.observe(node, { characterData: true });
	
			function run() {
				var f = scheduled;
				scheduled = void 0;
				f();
			}
	
			var i = 0;
			return function (f) {
				scheduled = f;
				node.data = (i ^= 1);
			};
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		/**
		 * Custom error type for promises rejected by promise.timeout
		 * @param {string} message
		 * @constructor
		 */
		function TimeoutError (message) {
			Error.call(this);
			this.message = message;
			this.name = TimeoutError.name;
			if (typeof Error.captureStackTrace === 'function') {
				Error.captureStackTrace(this, TimeoutError);
			}
		}
	
		TimeoutError.prototype = Object.create(Error.prototype);
		TimeoutError.prototype.constructor = TimeoutError;
	
		return TimeoutError;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var state = __webpack_require__(17);
		var applier = __webpack_require__(18);
	
		return function array(Promise) {
	
			var applyFold = applier(Promise);
			var toPromise = Promise.resolve;
			var all = Promise.all;
	
			var ar = Array.prototype.reduce;
			var arr = Array.prototype.reduceRight;
			var slice = Array.prototype.slice;
	
			// Additional array combinators
	
			Promise.any = any;
			Promise.some = some;
			Promise.settle = settle;
	
			Promise.map = map;
			Promise.filter = filter;
			Promise.reduce = reduce;
			Promise.reduceRight = reduceRight;
	
			/**
			 * When this promise fulfills with an array, do
			 * onFulfilled.apply(void 0, array)
			 * @param {function} onFulfilled function to apply
			 * @returns {Promise} promise for the result of applying onFulfilled
			 */
			Promise.prototype.spread = function(onFulfilled) {
				return this.then(all).then(function(array) {
					return onFulfilled.apply(this, array);
				});
			};
	
			return Promise;
	
			/**
			 * One-winner competitive race.
			 * Return a promise that will fulfill when one of the promises
			 * in the input array fulfills, or will reject when all promises
			 * have rejected.
			 * @param {array} promises
			 * @returns {Promise} promise for the first fulfilled value
			 */
			function any(promises) {
				var p = Promise._defer();
				var resolver = p._handler;
				var l = promises.length>>>0;
	
				var pending = l;
				var errors = [];
	
				for (var h, x, i = 0; i < l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}
	
					h = Promise._handler(x);
					if(h.state() > 0) {
						resolver.become(h);
						Promise._visitRemaining(promises, i, h);
						break;
					} else {
						h.visit(resolver, handleFulfill, handleReject);
					}
				}
	
				if(pending === 0) {
					resolver.reject(new RangeError('any(): array must not be empty'));
				}
	
				return p;
	
				function handleFulfill(x) {
					/*jshint validthis:true*/
					errors = null;
					this.resolve(x); // this === resolver
				}
	
				function handleReject(e) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					errors.push(e);
					if(--pending === 0) {
						this.reject(errors);
					}
				}
			}
	
			/**
			 * N-winner competitive race
			 * Return a promise that will fulfill when n input promises have
			 * fulfilled, or will reject when it becomes impossible for n
			 * input promises to fulfill (ie when promises.length - n + 1
			 * have rejected)
			 * @param {array} promises
			 * @param {number} n
			 * @returns {Promise} promise for the earliest n fulfillment values
			 *
			 * @deprecated
			 */
			function some(promises, n) {
				/*jshint maxcomplexity:7*/
				var p = Promise._defer();
				var resolver = p._handler;
	
				var results = [];
				var errors = [];
	
				var l = promises.length>>>0;
				var nFulfill = 0;
				var nReject;
				var x, i; // reused in both for() loops
	
				// First pass: count actual array items
				for(i=0; i<l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						continue;
					}
					++nFulfill;
				}
	
				// Compute actual goals
				n = Math.max(n, 0);
				nReject = (nFulfill - n + 1);
				nFulfill = Math.min(n, nFulfill);
	
				if(n > nFulfill) {
					resolver.reject(new RangeError('some(): array must contain at least '
					+ n + ' item(s), but had ' + nFulfill));
				} else if(nFulfill === 0) {
					resolver.resolve(results);
				}
	
				// Second pass: observe each array item, make progress toward goals
				for(i=0; i<l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						continue;
					}
	
					Promise._handler(x).visit(resolver, fulfill, reject, resolver.notify);
				}
	
				return p;
	
				function fulfill(x) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					results.push(x);
					if(--nFulfill === 0) {
						errors = null;
						this.resolve(results);
					}
				}
	
				function reject(e) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					errors.push(e);
					if(--nReject === 0) {
						results = null;
						this.reject(errors);
					}
				}
			}
	
			/**
			 * Apply f to the value of each promise in a list of promises
			 * and return a new list containing the results.
			 * @param {array} promises
			 * @param {function(x:*, index:Number):*} f mapping function
			 * @returns {Promise}
			 */
			function map(promises, f) {
				return Promise._traverse(f, promises);
			}
	
			/**
			 * Filter the provided array of promises using the provided predicate.  Input may
			 * contain promises and values
			 * @param {Array} promises array of promises and values
			 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
			 *  Must return truthy (or promise for truthy) for items to retain.
			 * @returns {Promise} promise that will fulfill with an array containing all items
			 *  for which predicate returned truthy.
			 */
			function filter(promises, predicate) {
				var a = slice.call(promises);
				return Promise._traverse(predicate, a).then(function(keep) {
					return filterSync(a, keep);
				});
			}
	
			function filterSync(promises, keep) {
				// Safe because we know all promises have fulfilled if we've made it this far
				var l = keep.length;
				var filtered = new Array(l);
				for(var i=0, j=0; i<l; ++i) {
					if(keep[i]) {
						filtered[j++] = Promise._handler(promises[i]).value;
					}
				}
				filtered.length = j;
				return filtered;
	
			}
	
			/**
			 * Return a promise that will always fulfill with an array containing
			 * the outcome states of all input promises.  The returned promise
			 * will never reject.
			 * @param {Array} promises
			 * @returns {Promise} promise for array of settled state descriptors
			 */
			function settle(promises) {
				return all(promises.map(settleOne));
			}
	
			function settleOne(p) {
				var h = Promise._handler(p);
				if(h.state() === 0) {
					return toPromise(p).then(state.fulfilled, state.rejected);
				}
	
				h._unreport();
				return state.inspect(h);
			}
	
			/**
			 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
			 * input may contain promises and/or values, and reduceFunc
			 * may return either a value or a promise, *and* initialValue may
			 * be a promise for the starting value.
			 * @param {Array|Promise} promises array or promise for an array of anything,
			 *      may contain a mix of promises and values.
			 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
			 * @returns {Promise} that will resolve to the final reduced value
			 */
			function reduce(promises, f /*, initialValue */) {
				return arguments.length > 2 ? ar.call(promises, liftCombine(f), arguments[2])
						: ar.call(promises, liftCombine(f));
			}
	
			/**
			 * Traditional reduce function, similar to `Array.prototype.reduceRight()`, but
			 * input may contain promises and/or values, and reduceFunc
			 * may return either a value or a promise, *and* initialValue may
			 * be a promise for the starting value.
			 * @param {Array|Promise} promises array or promise for an array of anything,
			 *      may contain a mix of promises and values.
			 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
			 * @returns {Promise} that will resolve to the final reduced value
			 */
			function reduceRight(promises, f /*, initialValue */) {
				return arguments.length > 2 ? arr.call(promises, liftCombine(f), arguments[2])
						: arr.call(promises, liftCombine(f));
			}
	
			function liftCombine(f) {
				return function(z, x, i) {
					return applyFold(f, void 0, [z,x,i]);
				};
			}
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return {
			pending: toPendingState,
			fulfilled: toFulfilledState,
			rejected: toRejectedState,
			inspect: inspect
		};
	
		function toPendingState() {
			return { state: 'pending' };
		}
	
		function toRejectedState(e) {
			return { state: 'rejected', reason: e };
		}
	
		function toFulfilledState(x) {
			return { state: 'fulfilled', value: x };
		}
	
		function inspect(handler) {
			var state = handler.state();
			return state === 0 ? toPendingState()
				 : state > 0   ? toFulfilledState(handler.value)
				               : toRejectedState(handler.value);
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		makeApply.tryCatchResolve = tryCatchResolve;
	
		return makeApply;
	
		function makeApply(Promise, call) {
			if(arguments.length < 2) {
				call = tryCatchResolve;
			}
	
			return apply;
	
			function apply(f, thisArg, args) {
				var p = Promise._defer();
				var l = args.length;
				var params = new Array(l);
				callAndResolve({ f:f, thisArg:thisArg, args:args, params:params, i:l-1, call:call }, p._handler);
	
				return p;
			}
	
			function callAndResolve(c, h) {
				if(c.i < 0) {
					return call(c.f, c.thisArg, c.params, h);
				}
	
				var handler = Promise._handler(c.args[c.i]);
				handler.fold(callAndResolveNext, c, void 0, h);
			}
	
			function callAndResolveNext(c, x, h) {
				c.params[c.i] = x;
				c.i -= 1;
				callAndResolve(c, h);
			}
		}
	
		function tryCatchResolve(f, thisArg, args, resolver) {
			try {
				resolver.resolve(f.apply(thisArg, args));
			} catch(e) {
				resolver.reject(e);
			}
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));
	
	


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function flow(Promise) {
	
			var resolve = Promise.resolve;
			var reject = Promise.reject;
			var origCatch = Promise.prototype['catch'];
	
			/**
			 * Handle the ultimate fulfillment value or rejection reason, and assume
			 * responsibility for all errors.  If an error propagates out of result
			 * or handleFatalError, it will be rethrown to the host, resulting in a
			 * loud stack track on most platforms and a crash on some.
			 * @param {function?} onResult
			 * @param {function?} onError
			 * @returns {undefined}
			 */
			Promise.prototype.done = function(onResult, onError) {
				this._handler.visit(this._handler.receiver, onResult, onError);
			};
	
			/**
			 * Add Error-type and predicate matching to catch.  Examples:
			 * promise.catch(TypeError, handleTypeError)
			 *   .catch(predicate, handleMatchedErrors)
			 *   .catch(handleRemainingErrors)
			 * @param onRejected
			 * @returns {*}
			 */
			Promise.prototype['catch'] = Promise.prototype.otherwise = function(onRejected) {
				if (arguments.length < 2) {
					return origCatch.call(this, onRejected);
				}
	
				if(typeof onRejected !== 'function') {
					return this.ensure(rejectInvalidPredicate);
				}
	
				return origCatch.call(this, createCatchFilter(arguments[1], onRejected));
			};
	
			/**
			 * Wraps the provided catch handler, so that it will only be called
			 * if the predicate evaluates truthy
			 * @param {?function} handler
			 * @param {function} predicate
			 * @returns {function} conditional catch handler
			 */
			function createCatchFilter(handler, predicate) {
				return function(e) {
					return evaluatePredicate(e, predicate)
						? handler.call(this, e)
						: reject(e);
				};
			}
	
			/**
			 * Ensures that onFulfilledOrRejected will be called regardless of whether
			 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
			 * receive the promises' value or reason.  Any returned value will be disregarded.
			 * onFulfilledOrRejected may throw or return a rejected promise to signal
			 * an additional error.
			 * @param {function} handler handler to be called regardless of
			 *  fulfillment or rejection
			 * @returns {Promise}
			 */
			Promise.prototype['finally'] = Promise.prototype.ensure = function(handler) {
				if(typeof handler !== 'function') {
					return this;
				}
	
				return this.then(function(x) {
					return runSideEffect(handler, this, identity, x);
				}, function(e) {
					return runSideEffect(handler, this, reject, e);
				});
			};
	
			function runSideEffect (handler, thisArg, propagate, value) {
				var result = handler.call(thisArg);
				return maybeThenable(result)
					? propagateValue(result, propagate, value)
					: propagate(value);
			}
	
			function propagateValue (result, propagate, x) {
				return resolve(result).then(function () {
					return propagate(x);
				});
			}
	
			/**
			 * Recover from a failure by returning a defaultValue.  If defaultValue
			 * is a promise, it's fulfillment value will be used.  If defaultValue is
			 * a promise that rejects, the returned promise will reject with the
			 * same reason.
			 * @param {*} defaultValue
			 * @returns {Promise} new promise
			 */
			Promise.prototype['else'] = Promise.prototype.orElse = function(defaultValue) {
				return this.then(void 0, function() {
					return defaultValue;
				});
			};
	
			/**
			 * Shortcut for .then(function() { return value; })
			 * @param  {*} value
			 * @return {Promise} a promise that:
			 *  - is fulfilled if value is not a promise, or
			 *  - if value is a promise, will fulfill with its value, or reject
			 *    with its reason.
			 */
			Promise.prototype['yield'] = function(value) {
				return this.then(function() {
					return value;
				});
			};
	
			/**
			 * Runs a side effect when this promise fulfills, without changing the
			 * fulfillment value.
			 * @param {function} onFulfilledSideEffect
			 * @returns {Promise}
			 */
			Promise.prototype.tap = function(onFulfilledSideEffect) {
				return this.then(onFulfilledSideEffect)['yield'](this);
			};
	
			return Promise;
		};
	
		function rejectInvalidPredicate() {
			throw new TypeError('catch predicate must be a function');
		}
	
		function evaluatePredicate(e, predicate) {
			return isError(predicate) ? e instanceof predicate : predicate(e);
		}
	
		function isError(predicate) {
			return predicate === Error
				|| (predicate != null && predicate.prototype instanceof Error);
		}
	
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}
	
		function identity(x) {
			return x;
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	/** @author Jeff Escalante */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function fold(Promise) {
	
			Promise.prototype.fold = function(f, z) {
				var promise = this._beget();
	
				this._handler.fold(function(z, x, to) {
					Promise._handler(z).fold(function(x, z, to) {
						to.resolve(f.call(this, z, x));
					}, x, this, to);
				}, z, promise._handler.receiver, promise._handler);
	
				return promise;
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var inspect = __webpack_require__(17).inspect;
	
		return function inspection(Promise) {
	
			Promise.prototype.inspect = function() {
				return inspect(Promise._handler(this));
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function generate(Promise) {
	
			var resolve = Promise.resolve;
	
			Promise.iterate = iterate;
			Promise.unfold = unfold;
	
			return Promise;
	
			/**
			 * @deprecated Use github.com/cujojs/most streams and most.iterate
			 * Generate a (potentially infinite) stream of promised values:
			 * x, f(x), f(f(x)), etc. until condition(x) returns true
			 * @param {function} f function to generate a new x from the previous x
			 * @param {function} condition function that, given the current x, returns
			 *  truthy when the iterate should stop
			 * @param {function} handler function to handle the value produced by f
			 * @param {*|Promise} x starting value, may be a promise
			 * @return {Promise} the result of the last call to f before
			 *  condition returns true
			 */
			function iterate(f, condition, handler, x) {
				return unfold(function(x) {
					return [x, f(x)];
				}, condition, handler, x);
			}
	
			/**
			 * @deprecated Use github.com/cujojs/most streams and most.unfold
			 * Generate a (potentially infinite) stream of promised values
			 * by applying handler(generator(seed)) iteratively until
			 * condition(seed) returns true.
			 * @param {function} unspool function that generates a [value, newSeed]
			 *  given a seed.
			 * @param {function} condition function that, given the current seed, returns
			 *  truthy when the unfold should stop
			 * @param {function} handler function to handle the value produced by unspool
			 * @param x {*|Promise} starting value, may be a promise
			 * @return {Promise} the result of the last value produced by unspool before
			 *  condition returns true
			 */
			function unfold(unspool, condition, handler, x) {
				return resolve(x).then(function(seed) {
					return resolve(condition(seed)).then(function(done) {
						return done ? seed : resolve(unspool(seed)).spread(next);
					});
				});
	
				function next(item, newSeed) {
					return resolve(handler(item)).then(function() {
						return unfold(unspool, condition, handler, newSeed);
					});
				}
			}
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function progress(Promise) {
	
			/**
			 * @deprecated
			 * Register a progress handler for this promise
			 * @param {function} onProgress
			 * @returns {Promise}
			 */
			Promise.prototype.progress = function(onProgress) {
				return this.then(void 0, void 0, onProgress);
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function addWith(Promise) {
			/**
			 * Returns a promise whose handlers will be called with `this` set to
			 * the supplied receiver.  Subsequent promises derived from the
			 * returned promise will also have their handlers called with receiver
			 * as `this`. Calling `with` with undefined or no arguments will return
			 * a promise whose handlers will again be called in the usual Promises/A+
			 * way (no `this`) thus safely undoing any previous `with` in the
			 * promise chain.
			 *
			 * WARNING: Promises returned from `with`/`withThis` are NOT Promises/A+
			 * compliant, specifically violating 2.2.5 (http://promisesaplus.com/#point-41)
			 *
			 * @param {object} receiver `this` value for all handlers attached to
			 *  the returned promise.
			 * @returns {Promise}
			 */
			Promise.prototype['with'] = Promise.prototype.withThis = function(receiver) {
				var p = this._beget();
				var child = p._handler;
				child.receiver = receiver;
				this._handler.chain(child, receiver);
				return p;
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));
	


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var setTimer = __webpack_require__(13).setTimer;
		var format = __webpack_require__(26);
	
		return function unhandledRejection(Promise) {
	
			var logError = noop;
			var logInfo = noop;
			var localConsole;
	
			if(typeof console !== 'undefined') {
				// Alias console to prevent things like uglify's drop_console option from
				// removing console.log/error. Unhandled rejections fall into the same
				// category as uncaught exceptions, and build tools shouldn't silence them.
				localConsole = console;
				logError = typeof localConsole.error !== 'undefined'
					? function (e) { localConsole.error(e); }
					: function (e) { localConsole.log(e); };
	
				logInfo = typeof localConsole.info !== 'undefined'
					? function (e) { localConsole.info(e); }
					: function (e) { localConsole.log(e); };
			}
	
			Promise.onPotentiallyUnhandledRejection = function(rejection) {
				enqueue(report, rejection);
			};
	
			Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
				enqueue(unreport, rejection);
			};
	
			Promise.onFatalRejection = function(rejection) {
				enqueue(throwit, rejection.value);
			};
	
			var tasks = [];
			var reported = [];
			var running = null;
	
			function report(r) {
				if(!r.handled) {
					reported.push(r);
					logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
				}
			}
	
			function unreport(r) {
				var i = reported.indexOf(r);
				if(i >= 0) {
					reported.splice(i, 1);
					logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
				}
			}
	
			function enqueue(f, x) {
				tasks.push(f, x);
				if(running === null) {
					running = setTimer(flush, 0);
				}
			}
	
			function flush() {
				running = null;
				while(tasks.length > 0) {
					tasks.shift()(tasks.shift());
				}
			}
	
			return Promise;
		};
	
		function throwit(e) {
			throw e;
		}
	
		function noop() {}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return {
			formatError: formatError,
			formatObject: formatObject,
			tryStringify: tryStringify
		};
	
		/**
		 * Format an error into a string.  If e is an Error and has a stack property,
		 * it's returned.  Otherwise, e is formatted using formatObject, with a
		 * warning added about e not being a proper Error.
		 * @param {*} e
		 * @returns {String} formatted string, suitable for output to developers
		 */
		function formatError(e) {
			var s = typeof e === 'object' && e !== null && (e.stack || e.message) ? e.stack || e.message : formatObject(e);
			return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
		}
	
		/**
		 * Format an object, detecting "plain" objects and running them through
		 * JSON.stringify if possible.
		 * @param {Object} o
		 * @returns {string}
		 */
		function formatObject(o) {
			var s = String(o);
			if(s === '[object Object]' && typeof JSON !== 'undefined') {
				s = tryStringify(o, s);
			}
			return s;
		}
	
		/**
		 * Try to return the result of JSON.stringify(x).  If that fails, return
		 * defaultValue
		 * @param {*} x
		 * @param {*} defaultValue
		 * @returns {String|*} JSON.stringify(x) or defaultValue
		 */
		function tryStringify(x, defaultValue) {
			try {
				return JSON.stringify(x);
			} catch(e) {
				return defaultValue;
			}
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
		var makePromise = __webpack_require__(28);
		var Scheduler = __webpack_require__(29);
		var async = __webpack_require__(13).asap;
	
		return makePromise({
			scheduler: new Scheduler(async)
		});
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(14));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function makePromise(environment) {
	
			var tasks = environment.scheduler;
			var emitRejection = initEmitRejection();
	
			var objectCreate = Object.create ||
				function(proto) {
					function Child() {}
					Child.prototype = proto;
					return new Child();
				};
	
			/**
			 * Create a promise whose fate is determined by resolver
			 * @constructor
			 * @returns {Promise} promise
			 * @name Promise
			 */
			function Promise(resolver, handler) {
				this._handler = resolver === Handler ? handler : init(resolver);
			}
	
			/**
			 * Run the supplied resolver
			 * @param resolver
			 * @returns {Pending}
			 */
			function init(resolver) {
				var handler = new Pending();
	
				try {
					resolver(promiseResolve, promiseReject, promiseNotify);
				} catch (e) {
					promiseReject(e);
				}
	
				return handler;
	
				/**
				 * Transition from pre-resolution state to post-resolution state, notifying
				 * all listeners of the ultimate fulfillment or rejection
				 * @param {*} x resolution value
				 */
				function promiseResolve (x) {
					handler.resolve(x);
				}
				/**
				 * Reject this promise with reason, which will be used verbatim
				 * @param {Error|*} reason rejection reason, strongly suggested
				 *   to be an Error type
				 */
				function promiseReject (reason) {
					handler.reject(reason);
				}
	
				/**
				 * @deprecated
				 * Issue a progress event, notifying all progress listeners
				 * @param {*} x progress event payload to pass to all listeners
				 */
				function promiseNotify (x) {
					handler.notify(x);
				}
			}
	
			// Creation
	
			Promise.resolve = resolve;
			Promise.reject = reject;
			Promise.never = never;
	
			Promise._defer = defer;
			Promise._handler = getHandler;
	
			/**
			 * Returns a trusted promise. If x is already a trusted promise, it is
			 * returned, otherwise returns a new trusted Promise which follows x.
			 * @param  {*} x
			 * @return {Promise} promise
			 */
			function resolve(x) {
				return isPromise(x) ? x
					: new Promise(Handler, new Async(getHandler(x)));
			}
	
			/**
			 * Return a reject promise with x as its reason (x is used verbatim)
			 * @param {*} x
			 * @returns {Promise} rejected promise
			 */
			function reject(x) {
				return new Promise(Handler, new Async(new Rejected(x)));
			}
	
			/**
			 * Return a promise that remains pending forever
			 * @returns {Promise} forever-pending promise.
			 */
			function never() {
				return foreverPendingPromise; // Should be frozen
			}
	
			/**
			 * Creates an internal {promise, resolver} pair
			 * @private
			 * @returns {Promise}
			 */
			function defer() {
				return new Promise(Handler, new Pending());
			}
	
			// Transformation and flow control
	
			/**
			 * Transform this promise's fulfillment value, returning a new Promise
			 * for the transformed result.  If the promise cannot be fulfilled, onRejected
			 * is called with the reason.  onProgress *may* be called with updates toward
			 * this promise's fulfillment.
			 * @param {function=} onFulfilled fulfillment handler
			 * @param {function=} onRejected rejection handler
			 * @param {function=} onProgress @deprecated progress handler
			 * @return {Promise} new promise
			 */
			Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
				var parent = this._handler;
				var state = parent.join().state();
	
				if ((typeof onFulfilled !== 'function' && state > 0) ||
					(typeof onRejected !== 'function' && state < 0)) {
					// Short circuit: value will not change, simply share handler
					return new this.constructor(Handler, parent);
				}
	
				var p = this._beget();
				var child = p._handler;
	
				parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);
	
				return p;
			};
	
			/**
			 * If this promise cannot be fulfilled due to an error, call onRejected to
			 * handle the error. Shortcut for .then(undefined, onRejected)
			 * @param {function?} onRejected
			 * @return {Promise}
			 */
			Promise.prototype['catch'] = function(onRejected) {
				return this.then(void 0, onRejected);
			};
	
			/**
			 * Creates a new, pending promise of the same type as this promise
			 * @private
			 * @returns {Promise}
			 */
			Promise.prototype._beget = function() {
				return begetFrom(this._handler, this.constructor);
			};
	
			function begetFrom(parent, Promise) {
				var child = new Pending(parent.receiver, parent.join().context);
				return new Promise(Handler, child);
			}
	
			// Array combinators
	
			Promise.all = all;
			Promise.race = race;
			Promise._traverse = traverse;
	
			/**
			 * Return a promise that will fulfill when all promises in the
			 * input array have fulfilled, or will reject when one of the
			 * promises rejects.
			 * @param {array} promises array of promises
			 * @returns {Promise} promise for array of fulfillment values
			 */
			function all(promises) {
				return traverseWith(snd, null, promises);
			}
	
			/**
			 * Array<Promise<X>> -> Promise<Array<f(X)>>
			 * @private
			 * @param {function} f function to apply to each promise's value
			 * @param {Array} promises array of promises
			 * @returns {Promise} promise for transformed values
			 */
			function traverse(f, promises) {
				return traverseWith(tryCatch2, f, promises);
			}
	
			function traverseWith(tryMap, f, promises) {
				var handler = typeof f === 'function' ? mapAt : settleAt;
	
				var resolver = new Pending();
				var pending = promises.length >>> 0;
				var results = new Array(pending);
	
				for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
					x = promises[i];
	
					if (x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}
	
					traverseAt(promises, handler, i, x, resolver);
				}
	
				if(pending === 0) {
					resolver.become(new Fulfilled(results));
				}
	
				return new Promise(Handler, resolver);
	
				function mapAt(i, x, resolver) {
					if(!resolver.resolved) {
						traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
					}
				}
	
				function settleAt(i, x, resolver) {
					results[i] = x;
					if(--pending === 0) {
						resolver.become(new Fulfilled(results));
					}
				}
			}
	
			function traverseAt(promises, handler, i, x, resolver) {
				if (maybeThenable(x)) {
					var h = getHandlerMaybeThenable(x);
					var s = h.state();
	
					if (s === 0) {
						h.fold(handler, i, void 0, resolver);
					} else if (s > 0) {
						handler(i, h.value, resolver);
					} else {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
					}
				} else {
					handler(i, x, resolver);
				}
			}
	
			Promise._visitRemaining = visitRemaining;
			function visitRemaining(promises, start, handler) {
				for(var i=start; i<promises.length; ++i) {
					markAsHandled(getHandler(promises[i]), handler);
				}
			}
	
			function markAsHandled(h, handler) {
				if(h === handler) {
					return;
				}
	
				var s = h.state();
				if(s === 0) {
					h.visit(h, void 0, h._unreport);
				} else if(s < 0) {
					h._unreport();
				}
			}
	
			/**
			 * Fulfill-reject competitive race. Return a promise that will settle
			 * to the same state as the earliest input promise to settle.
			 *
			 * WARNING: The ES6 Promise spec requires that race()ing an empty array
			 * must return a promise that is pending forever.  This implementation
			 * returns a singleton forever-pending promise, the same singleton that is
			 * returned by Promise.never(), thus can be checked with ===
			 *
			 * @param {array} promises array of promises to race
			 * @returns {Promise} if input is non-empty, a promise that will settle
			 * to the same outcome as the earliest input promise to settle. if empty
			 * is empty, returns a promise that will never settle.
			 */
			function race(promises) {
				if(typeof promises !== 'object' || promises === null) {
					return reject(new TypeError('non-iterable passed to race()'));
				}
	
				// Sigh, race([]) is untestable unless we return *something*
				// that is recognizable without calling .then() on it.
				return promises.length === 0 ? never()
					 : promises.length === 1 ? resolve(promises[0])
					 : runRace(promises);
			}
	
			function runRace(promises) {
				var resolver = new Pending();
				var i, x, h;
				for(i=0; i<promises.length; ++i) {
					x = promises[i];
					if (x === void 0 && !(i in promises)) {
						continue;
					}
	
					h = getHandler(x);
					if(h.state() !== 0) {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
						break;
					} else {
						h.visit(resolver, resolver.resolve, resolver.reject);
					}
				}
				return new Promise(Handler, resolver);
			}
	
			// Promise internals
			// Below this, everything is @private
	
			/**
			 * Get an appropriate handler for x, without checking for cycles
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandler(x) {
				if(isPromise(x)) {
					return x._handler.join();
				}
				return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
			}
	
			/**
			 * Get a handler for thenable x.
			 * NOTE: You must only call this if maybeThenable(x) == true
			 * @param {object|function|Promise} x
			 * @returns {object} handler
			 */
			function getHandlerMaybeThenable(x) {
				return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
			}
	
			/**
			 * Get a handler for potentially untrusted thenable x
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandlerUntrusted(x) {
				try {
					var untrustedThen = x.then;
					return typeof untrustedThen === 'function'
						? new Thenable(untrustedThen, x)
						: new Fulfilled(x);
				} catch(e) {
					return new Rejected(e);
				}
			}
	
			/**
			 * Handler for a promise that is pending forever
			 * @constructor
			 */
			function Handler() {}
	
			Handler.prototype.when
				= Handler.prototype.become
				= Handler.prototype.notify // deprecated
				= Handler.prototype.fail
				= Handler.prototype._unreport
				= Handler.prototype._report
				= noop;
	
			Handler.prototype._state = 0;
	
			Handler.prototype.state = function() {
				return this._state;
			};
	
			/**
			 * Recursively collapse handler chain to find the handler
			 * nearest to the fully resolved value.
			 * @returns {object} handler nearest the fully resolved value
			 */
			Handler.prototype.join = function() {
				var h = this;
				while(h.handler !== void 0) {
					h = h.handler;
				}
				return h;
			};
	
			Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
				this.when({
					resolver: to,
					receiver: receiver,
					fulfilled: fulfilled,
					rejected: rejected,
					progress: progress
				});
			};
	
			Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
				this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
			};
	
			Handler.prototype.fold = function(f, z, c, to) {
				this.when(new Fold(f, z, c, to));
			};
	
			/**
			 * Handler that invokes fail() on any handler it becomes
			 * @constructor
			 */
			function FailIfRejected() {}
	
			inherit(Handler, FailIfRejected);
	
			FailIfRejected.prototype.become = function(h) {
				h.fail();
			};
	
			var failIfRejected = new FailIfRejected();
	
			/**
			 * Handler that manages a queue of consumers waiting on a pending promise
			 * @constructor
			 */
			function Pending(receiver, inheritedContext) {
				Promise.createContext(this, inheritedContext);
	
				this.consumers = void 0;
				this.receiver = receiver;
				this.handler = void 0;
				this.resolved = false;
			}
	
			inherit(Handler, Pending);
	
			Pending.prototype._state = 0;
	
			Pending.prototype.resolve = function(x) {
				this.become(getHandler(x));
			};
	
			Pending.prototype.reject = function(x) {
				if(this.resolved) {
					return;
				}
	
				this.become(new Rejected(x));
			};
	
			Pending.prototype.join = function() {
				if (!this.resolved) {
					return this;
				}
	
				var h = this;
	
				while (h.handler !== void 0) {
					h = h.handler;
					if (h === this) {
						return this.handler = cycle();
					}
				}
	
				return h;
			};
	
			Pending.prototype.run = function() {
				var q = this.consumers;
				var handler = this.handler;
				this.handler = this.handler.join();
				this.consumers = void 0;
	
				for (var i = 0; i < q.length; ++i) {
					handler.when(q[i]);
				}
			};
	
			Pending.prototype.become = function(handler) {
				if(this.resolved) {
					return;
				}
	
				this.resolved = true;
				this.handler = handler;
				if(this.consumers !== void 0) {
					tasks.enqueue(this);
				}
	
				if(this.context !== void 0) {
					handler._report(this.context);
				}
			};
	
			Pending.prototype.when = function(continuation) {
				if(this.resolved) {
					tasks.enqueue(new ContinuationTask(continuation, this.handler));
				} else {
					if(this.consumers === void 0) {
						this.consumers = [continuation];
					} else {
						this.consumers.push(continuation);
					}
				}
			};
	
			/**
			 * @deprecated
			 */
			Pending.prototype.notify = function(x) {
				if(!this.resolved) {
					tasks.enqueue(new ProgressTask(x, this));
				}
			};
	
			Pending.prototype.fail = function(context) {
				var c = typeof context === 'undefined' ? this.context : context;
				this.resolved && this.handler.join().fail(c);
			};
	
			Pending.prototype._report = function(context) {
				this.resolved && this.handler.join()._report(context);
			};
	
			Pending.prototype._unreport = function() {
				this.resolved && this.handler.join()._unreport();
			};
	
			/**
			 * Wrap another handler and force it into a future stack
			 * @param {object} handler
			 * @constructor
			 */
			function Async(handler) {
				this.handler = handler;
			}
	
			inherit(Handler, Async);
	
			Async.prototype.when = function(continuation) {
				tasks.enqueue(new ContinuationTask(continuation, this));
			};
	
			Async.prototype._report = function(context) {
				this.join()._report(context);
			};
	
			Async.prototype._unreport = function() {
				this.join()._unreport();
			};
	
			/**
			 * Handler that wraps an untrusted thenable and assimilates it in a future stack
			 * @param {function} then
			 * @param {{then: function}} thenable
			 * @constructor
			 */
			function Thenable(then, thenable) {
				Pending.call(this);
				tasks.enqueue(new AssimilateTask(then, thenable, this));
			}
	
			inherit(Pending, Thenable);
	
			/**
			 * Handler for a fulfilled promise
			 * @param {*} x fulfillment value
			 * @constructor
			 */
			function Fulfilled(x) {
				Promise.createContext(this);
				this.value = x;
			}
	
			inherit(Handler, Fulfilled);
	
			Fulfilled.prototype._state = 1;
	
			Fulfilled.prototype.fold = function(f, z, c, to) {
				runContinuation3(f, z, this, c, to);
			};
	
			Fulfilled.prototype.when = function(cont) {
				runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
			};
	
			var errorId = 0;
	
			/**
			 * Handler for a rejected promise
			 * @param {*} x rejection reason
			 * @constructor
			 */
			function Rejected(x) {
				Promise.createContext(this);
	
				this.id = ++errorId;
				this.value = x;
				this.handled = false;
				this.reported = false;
	
				this._report();
			}
	
			inherit(Handler, Rejected);
	
			Rejected.prototype._state = -1;
	
			Rejected.prototype.fold = function(f, z, c, to) {
				to.become(this);
			};
	
			Rejected.prototype.when = function(cont) {
				if(typeof cont.rejected === 'function') {
					this._unreport();
				}
				runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
			};
	
			Rejected.prototype._report = function(context) {
				tasks.afterQueue(new ReportTask(this, context));
			};
	
			Rejected.prototype._unreport = function() {
				if(this.handled) {
					return;
				}
				this.handled = true;
				tasks.afterQueue(new UnreportTask(this));
			};
	
			Rejected.prototype.fail = function(context) {
				this.reported = true;
				emitRejection('unhandledRejection', this);
				Promise.onFatalRejection(this, context === void 0 ? this.context : context);
			};
	
			function ReportTask(rejection, context) {
				this.rejection = rejection;
				this.context = context;
			}
	
			ReportTask.prototype.run = function() {
				if(!this.rejection.handled && !this.rejection.reported) {
					this.rejection.reported = true;
					emitRejection('unhandledRejection', this.rejection) ||
						Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
				}
			};
	
			function UnreportTask(rejection) {
				this.rejection = rejection;
			}
	
			UnreportTask.prototype.run = function() {
				if(this.rejection.reported) {
					emitRejection('rejectionHandled', this.rejection) ||
						Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
				}
			};
	
			// Unhandled rejection hooks
			// By default, everything is a noop
	
			Promise.createContext
				= Promise.enterContext
				= Promise.exitContext
				= Promise.onPotentiallyUnhandledRejection
				= Promise.onPotentiallyUnhandledRejectionHandled
				= Promise.onFatalRejection
				= noop;
	
			// Errors and singletons
	
			var foreverPendingHandler = new Handler();
			var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);
	
			function cycle() {
				return new Rejected(new TypeError('Promise cycle'));
			}
	
			// Task runners
	
			/**
			 * Run a single consumer
			 * @constructor
			 */
			function ContinuationTask(continuation, handler) {
				this.continuation = continuation;
				this.handler = handler;
			}
	
			ContinuationTask.prototype.run = function() {
				this.handler.join().when(this.continuation);
			};
	
			/**
			 * Run a queue of progress handlers
			 * @constructor
			 */
			function ProgressTask(value, handler) {
				this.handler = handler;
				this.value = value;
			}
	
			ProgressTask.prototype.run = function() {
				var q = this.handler.consumers;
				if(q === void 0) {
					return;
				}
	
				for (var c, i = 0; i < q.length; ++i) {
					c = q[i];
					runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
				}
			};
	
			/**
			 * Assimilate a thenable, sending it's value to resolver
			 * @param {function} then
			 * @param {object|function} thenable
			 * @param {object} resolver
			 * @constructor
			 */
			function AssimilateTask(then, thenable, resolver) {
				this._then = then;
				this.thenable = thenable;
				this.resolver = resolver;
			}
	
			AssimilateTask.prototype.run = function() {
				var h = this.resolver;
				tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);
	
				function _resolve(x) { h.resolve(x); }
				function _reject(x)  { h.reject(x); }
				function _notify(x)  { h.notify(x); }
			};
	
			function tryAssimilate(then, thenable, resolve, reject, notify) {
				try {
					then.call(thenable, resolve, reject, notify);
				} catch (e) {
					reject(e);
				}
			}
	
			/**
			 * Fold a handler value with z
			 * @constructor
			 */
			function Fold(f, z, c, to) {
				this.f = f; this.z = z; this.c = c; this.to = to;
				this.resolver = failIfRejected;
				this.receiver = this;
			}
	
			Fold.prototype.fulfilled = function(x) {
				this.f.call(this.c, this.z, x, this.to);
			};
	
			Fold.prototype.rejected = function(x) {
				this.to.reject(x);
			};
	
			Fold.prototype.progress = function(x) {
				this.to.notify(x);
			};
	
			// Other helpers
	
			/**
			 * @param {*} x
			 * @returns {boolean} true iff x is a trusted Promise
			 */
			function isPromise(x) {
				return x instanceof Promise;
			}
	
			/**
			 * Test just enough to rule out primitives, in order to take faster
			 * paths in some code
			 * @param {*} x
			 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
			 */
			function maybeThenable(x) {
				return (typeof x === 'object' || typeof x === 'function') && x !== null;
			}
	
			function runContinuation1(f, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject(f, h.value, receiver, next);
				Promise.exitContext();
			}
	
			function runContinuation3(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject3(f, x, h.value, receiver, next);
				Promise.exitContext();
			}
	
			/**
			 * @deprecated
			 */
			function runNotify(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.notify(x);
				}
	
				Promise.enterContext(h);
				tryCatchReturn(f, x, receiver, next);
				Promise.exitContext();
			}
	
			function tryCatch2(f, a, b) {
				try {
					return f(a, b);
				} catch(e) {
					return reject(e);
				}
			}
	
			/**
			 * Return f.call(thisArg, x), or if it throws return a rejected promise for
			 * the thrown exception
			 */
			function tryCatchReject(f, x, thisArg, next) {
				try {
					next.become(getHandler(f.call(thisArg, x)));
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * Same as above, but includes the extra argument parameter.
			 */
			function tryCatchReject3(f, x, y, thisArg, next) {
				try {
					f.call(thisArg, x, y, next);
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * @deprecated
			 * Return f.call(thisArg, x), or if it throws, *return* the exception
			 */
			function tryCatchReturn(f, x, thisArg, next) {
				try {
					next.notify(f.call(thisArg, x));
				} catch(e) {
					next.notify(e);
				}
			}
	
			function inherit(Parent, Child) {
				Child.prototype = objectCreate(Parent.prototype);
				Child.prototype.constructor = Child;
			}
	
			function snd(x, y) {
				return y;
			}
	
			function noop() {}
	
			function initEmitRejection() {
				/*global process, self, CustomEvent*/
				if(typeof process !== 'undefined' && process !== null
					&& typeof process.emit === 'function') {
					// Returning falsy here means to call the default
					// onPotentiallyUnhandledRejection API.  This is safe even in
					// browserify since process.emit always returns falsy in browserify:
					// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
					return function(type, rejection) {
						return type === 'unhandledRejection'
							? process.emit(type, rejection.value, rejection)
							: process.emit(type, rejection);
					};
				} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
					return (function(noop, self, CustomEvent) {
						var hasCustomEvent = false;
						try {
							var ev = new CustomEvent('unhandledRejection');
							hasCustomEvent = ev instanceof CustomEvent;
						} catch (e) {}
	
						return !hasCustomEvent ? noop : function(type, rejection) {
							var ev = new CustomEvent(type, {
								detail: {
									reason: rejection.value,
									key: rejection
								},
								bubbles: false,
								cancelable: true
							});
	
							return !self.dispatchEvent(ev);
						};
					}(noop, self, CustomEvent));
				}
	
				return noop;
			}
	
			return Promise;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		// Credit to Twisol (https://github.com/Twisol) for suggesting
		// this type of extensible queue + trampoline approach for next-tick conflation.
	
		/**
		 * Async task scheduler
		 * @param {function} async function to schedule a single async function
		 * @constructor
		 */
		function Scheduler(async) {
			this._async = async;
			this._running = false;
	
			this._queue = this;
			this._queueLen = 0;
			this._afterQueue = {};
			this._afterQueueLen = 0;
	
			var self = this;
			this.drain = function() {
				self._drain();
			};
		}
	
		/**
		 * Enqueue a task
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.enqueue = function(task) {
			this._queue[this._queueLen++] = task;
			this.run();
		};
	
		/**
		 * Enqueue a task to run after the main task queue
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.afterQueue = function(task) {
			this._afterQueue[this._afterQueueLen++] = task;
			this.run();
		};
	
		Scheduler.prototype.run = function() {
			if (!this._running) {
				this._running = true;
				this._async(this.drain);
			}
		};
	
		/**
		 * Drain the handler queue entirely, and then the after queue
		 */
		Scheduler.prototype._drain = function() {
			var i = 0;
			for (; i < this._queueLen; ++i) {
				this._queue[i].run();
				this._queue[i] = void 0;
			}
	
			this._queueLen = 0;
			this._running = false;
	
			for (i = 0; i < this._afterQueueLen; ++i) {
				this._afterQueue[i].run();
				this._afterQueue[i] = void 0;
			}
	
			this._afterQueueLen = 0;
		};
	
		return Scheduler;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function liftAll(liftOne, combine, dst, src) {
			if(typeof combine === 'undefined') {
				combine = defaultCombine;
			}
	
			return Object.keys(src).reduce(function(dst, key) {
				var f = src[key];
				return typeof f === 'function' ? combine(dst, liftOne(f), key) : dst;
			}, typeof dst === 'undefined' ? defaultDst(src) : dst);
		};
	
		function defaultCombine(o, f, k) {
			o[k] = f;
			return o;
		}
	
		function defaultDst(src) {
			return typeof src === 'function' ? src.bind() : Object.create(src);
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(14)));


/***/ }
/******/ ]);
//# sourceMappingURL=sign-addon.js.map