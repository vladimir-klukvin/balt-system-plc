'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ language: "bsplc" }, new FooDocumentSymbolProvider()));
}
exports.activate = activate;
class FooDocumentSymbolProvider {
    provideDocumentSymbols(document, token) {
        return new Promise((resolve, reject) => {
            var symbols = [];
            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);
                if (line.text.startsWith(";*** ")) {
                    symbols.push({
                        name: line.text.substr(4).trim(),
                        kind: vscode.SymbolKind.Module,
                        location: new vscode.Location(document.uri, line.range)
                    });
                }
            }
            resolve(symbols);
        });
    }
}
function deactivate() { }
exports.deactivate = deactivate;