"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractHtml = exports.constructSearchUrl = exports.SEARCH_ROUTE = exports.BASE_URL = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
exports.BASE_URL = "https://fddb.info";
exports.SEARCH_ROUTE = "/db/de/suche/?search=";
const constructSearchUrl = (query) => exports.BASE_URL + exports.SEARCH_ROUTE + query;
exports.constructSearchUrl = constructSearchUrl;
const extractHtml = (axios) => __awaiter(void 0, void 0, void 0, function* () {
    const url = (0, exports.constructSearchUrl)("a");
    try {
        const response = yield axios.get(url);
        const html = response.data;
        return cheerio_1.default.load(html);
    }
    catch (error) {
        console.log(error);
    }
});
exports.extractHtml = extractHtml;
//# sourceMappingURL=extractHtml.js.map