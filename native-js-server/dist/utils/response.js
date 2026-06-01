"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJSON = sendJSON;
exports.sendXML = sendXML;
exports.parseBody = parseBody;
function sendJSON(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.end(JSON.stringify(data));
}
function sendXML(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Access-Control-Allow-Origin", "*");
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<response>\n';
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === "object" && value !== null) {
            xml += `  <${key}>\n`;
            for (const [subKey, subValue] of Object.entries(value)) {
                xml += `    <${subKey}>${escapeXml(String(subValue))}</${subKey}>\n`;
            }
            xml += `  </${key}>\n`;
        }
        else {
            xml += `  <${key}>${escapeXml(String(value))}</${key}>\n`;
        }
    }
    xml += "</response>";
    res.end(xml);
}
function escapeXml(str) {
    return str.replace(/[<>&'"]/g, (char) => {
        switch (char) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "'":
                return "&apos;";
            case '"':
                return "&quot;";
            default:
                return char;
        }
    });
}
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            if (!body) {
                resolve({});
                return;
            }
            const contentType = req.headers["content-type"] || "";
            if (contentType.includes("application/json")) {
                try {
                    resolve(JSON.parse(body));
                }
                catch (error) {
                    reject(new Error("Invalid JSON"));
                }
            }
            else if (contentType.includes("application/xml") ||
                contentType.includes("text/xml")) {
                resolve({ rawXml: body, contentType: "xml" });
            }
            else if (contentType.includes("application/x-www-form-urlencoded")) {
                const params = new URLSearchParams(body);
                const result = {};
                for (const [key, value] of params) {
                    result[key] = value;
                }
                resolve(result);
            }
            else {
                resolve({ rawBody: body });
            }
        });
        req.on("error", reject);
    });
}
