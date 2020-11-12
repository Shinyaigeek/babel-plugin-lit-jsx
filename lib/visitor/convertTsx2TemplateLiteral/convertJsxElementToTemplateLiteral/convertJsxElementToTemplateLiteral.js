"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertJSXElementToTemplateLiteral = void 0;
var types_1 = require("@babel/types");
var convertEventListener_1 = require("../../convertTsx2TemplateLiteral/convertEventListener/convertEventListener");
var isUserDefinedComponent_1 = require("../../isUserDefinedComponent/isUserDefinedComponent");
var convertComponent2Function_1 = require("../convertComponent2Function/convertComponent2Function");
var table = {
    "className": "class",
};
var ConvertJSXElementToTemplateLiteral = /** @class */ (function () {
    function ConvertJSXElementToTemplateLiteral(props) {
        this.element = props;
        this.queries = [];
        this.expressions = [];
        this.query = "";
    }
    ConvertJSXElementToTemplateLiteral.prototype.render = function () {
        return types_1.templateLiteral(this.queries, this.expressions);
    };
    ConvertJSXElementToTemplateLiteral.prototype.traverse = function () {
        this.handleQueries(this.element);
        this.queries.push(types_1.templateElement({
            raw: this.query,
            cooked: this.query,
        }));
    };
    ConvertJSXElementToTemplateLiteral.prototype.handleExpressions = function (exp) {
        var expression = types_1.isJSXExpressionContainer(exp) ? exp.expression : exp;
        if (types_1.isJSXEmptyExpression(expression)) {
            throw new Error("jsx empty expression is invalid");
        }
        this.expressions.push(expression);
    };
    ConvertJSXElementToTemplateLiteral.prototype.handleQueries = function (jsx) {
        var _this = this;
        var _a, _b;
        if (types_1.isJSXElement(jsx)) {
            if (isUserDefinedComponent_1.isUserDefinedComponent(jsx)) {
                this.queries.push(types_1.templateElement({
                    raw: this.query,
                    cooked: this.query,
                }));
                this.query = "";
                var litHtmlComponent = convertComponent2Function_1.convertComponent2Function(jsx);
                if (litHtmlComponent) {
                    this.handleExpressions(litHtmlComponent);
                }
            }
            else {
                if (!types_1.isJSXIdentifier(jsx.openingElement.name)) {
                    throw new Error("jsx should be identifier");
                }
                this.query += "<" + jsx.openingElement.name.name;
                jsx.openingElement.attributes.forEach(function (attr) {
                    var _a;
                    if (types_1.isJSXSpreadAttribute(attr)) {
                        throw new Error("spread property is not supported");
                    }
                    if (types_1.isJSXNamespacedName(attr.name)) {
                        throw new Error("jsx namespaced attr is not supported");
                    }
                    var key = (function () {
                        if (attr.name.name in table) {
                            var proper = table[attr.name.name];
                            return proper;
                        }
                        if (attr.name.name[0] === "o" && attr.name.name[1] === "n") {
                            return convertEventListener_1.convertEventListener(attr.name.name);
                        }
                        return attr.name.name;
                    })();
                    if (types_1.isJSXExpressionContainer(attr.value)) {
                        _this.query += " " + key + "=";
                        _this.queries.push(types_1.templateElement({
                            raw: _this.query,
                            cooked: _this.query,
                        }));
                        _this.query = "";
                        if (key === "style") {
                            if (types_1.isObjectExpression(attr.value.expression)) {
                                _this.handleExpressions(types_1.callExpression(types_1.identifier("styleMap"), [
                                    attr.value.expression,
                                ]));
                            }
                            else {
                                throw new Error("jsx attr styles property should be object");
                            }
                        }
                        else {
                            _this.handleExpressions(attr.value);
                        }
                    }
                    else {
                        if (types_1.isJSXElement(attr.value)) {
                            throw new Error("jsx element props should be compiled to function in the prior step");
                        }
                        if (types_1.isJSXFragment(attr.value)) {
                            throw new Error("jsx fragment props should be compiled to function in the prior step");
                        }
                        _this.query += " " + key + "=\"" + (((_a = attr.value) === null || _a === void 0 ? void 0 : _a.value) || types_1.nullLiteral()) + "\"";
                    }
                });
                if (jsx.openingElement.selfClosing) {
                    this.query += " />";
                }
                else {
                    this.query += ">";
                }
                jsx.children.forEach(function (child) {
                    if (types_1.isJSXText(child)) {
                        _this.query += child.value;
                    }
                    if (types_1.isJSXElement(child)) {
                        _this.handleQueries(child);
                    }
                    if (types_1.isJSXExpressionContainer(child)) {
                        _this.queries.push(types_1.templateElement({
                            raw: _this.query,
                            cooked: _this.query,
                        }));
                        _this.query = "";
                        _this.handleExpressions(child);
                    }
                    if (types_1.isCallExpression(child)) {
                        _this.queries.push(types_1.templateElement({
                            raw: _this.query,
                            cooked: _this.query,
                        }));
                        _this.query = "";
                        _this.handleExpressions(child);
                    }
                });
                if (!jsx.openingElement.selfClosing) {
                    if (!types_1.isJSXIdentifier(jsx.openingElement.name)) {
                        throw new Error("jsx should be identifier");
                    }
                    if (types_1.isJSXMemberExpression((_a = jsx.closingElement) === null || _a === void 0 ? void 0 : _a.name)) {
                        throw new Error("jsx closingElement shouldn't be jsx member expression");
                    }
                    this.query += "</" + ((_b = jsx.closingElement) === null || _b === void 0 ? void 0 : _b.name.name) + ">";
                }
            }
        }
        if (types_1.isJSXFragment(jsx)) {
            jsx.children.forEach(function (child) {
                if (types_1.isJSXText(child)) {
                    _this.query += child.value;
                }
                if (types_1.isJSXElement(child)) {
                    _this.handleQueries(child);
                }
                if (types_1.isJSXExpressionContainer(child)) {
                    _this.queries.push(types_1.templateElement({
                        raw: _this.query,
                        cooked: _this.query,
                    }));
                    _this.query = "";
                    _this.handleExpressions(child);
                }
            });
        }
    };
    return ConvertJSXElementToTemplateLiteral;
}());
exports.ConvertJSXElementToTemplateLiteral = ConvertJSXElementToTemplateLiteral;
