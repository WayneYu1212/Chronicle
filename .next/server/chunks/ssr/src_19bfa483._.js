module.exports = [
"[project]/src/lib/text.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "splitSentenceLines",
    ()=>splitSentenceLines
]);
function splitSentenceLines(text) {
    return text.split("\n").flatMap((paragraph)=>{
        if (!paragraph) return [
            ""
        ];
        return paragraph.match(/[^。！？!?；;]+(?:[。！？!?；;]+[”’」』】）》]*|$)/g) ?? [
            paragraph
        ];
    });
}
}),
"[project]/src/components/SentenceText.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SentenceText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/text.ts [app-ssr] (ecmascript)");
;
;
function SentenceText({ text, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `sentence-text ${className ?? ""}`.trim(),
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splitSentenceLines"])(text).map((line, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sentence-line",
                children: line || "\u00a0"
            }, `${index}-${line}`, false, {
                fileName: "[project]/src/components/SentenceText.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/SentenceText.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ActivityStage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActivityStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SentenceText.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function ActivityStage({ beat, onComplete }) {
    if (beat.type === "sorting" && beat.sorting) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortingActivity, {
            beat: beat,
            onComplete: onComplete
        }, void 0, false, {
            fileName: "[project]/src/components/ActivityStage.tsx",
            lineNumber: 14,
            columnNumber: 12
        }, this);
    }
    if (beat.type === "inspection" && beat.inspection) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InspectionActivity, {
            beat: beat,
            onComplete: onComplete
        }, void 0, false, {
            fileName: "[project]/src/components/ActivityStage.tsx",
            lineNumber: 17,
            columnNumber: 12
        }, this);
    }
    if (beat.type === "comparison" && beat.comparison) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ComparisonActivity, {
            beat: beat,
            onComplete: onComplete
        }, void 0, false, {
            fileName: "[project]/src/components/ActivityStage.tsx",
            lineNumber: 20,
            columnNumber: 12
        }, this);
    }
    if (beat.type === "assembly" && beat.assembly) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AssemblyActivity, {
            beat: beat,
            onComplete: onComplete
        }, void 0, false, {
            fileName: "[project]/src/components/ActivityStage.tsx",
            lineNumber: 23,
            columnNumber: 12
        }, this);
    }
    return null;
}
function SortingActivity({ beat, onComplete }) {
    const config = beat.sorting;
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sorted, setSorted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("先选一张纸，再放入合适的书匣。也可以直接拖动。");
    const remaining = config.documents.filter((document)=>!sorted[document.id]);
    const normalDone = Object.keys(sorted).length >= config.required;
    const place = (documentId, category)=>{
        const document = config.documents.find((item)=>item.id === documentId);
        if (!document) return;
        if (document.anomalous) {
            setMessage("这页没有题名，也不属于任何一卷。先把它留在案上。");
            setSelected(documentId);
            return;
        }
        if (document.category !== category) {
            setMessage(`纸上的格式不像${category}，再看一眼落款和行款。`);
            return;
        }
        setSorted((current)=>({
                ...current,
                [documentId]: category
            }));
        setSelected(null);
        setMessage(`${document.title}已经收入${category}匣。`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "activity",
        "aria-label": "文稿分类",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "今日书课"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            Object.keys(sorted).length,
                            "/",
                            config.required
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "activity-copy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    text: beat.text
                }, void 0, false, {
                    fileName: "[project]/src/components/ActivityStage.tsx",
                    lineNumber: 59,
                    columnNumber: 36
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "document-tray",
                children: remaining.map((document)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        draggable: true,
                        onDragStart: (event)=>event.dataTransfer.setData("text/plain", document.id),
                        onClick: ()=>setSelected(document.id),
                        className: `document-slip ${selected === document.id ? "is-selected" : ""} ${document.anomalous ? "is-anomalous" : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: document.mark ?? "无记"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: document.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                text: document.excerpt
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        ]
                    }, document.id, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "category-grid",
                children: config.categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "category-slot",
                        onClick: ()=>selected && place(selected, category),
                        onDragOver: (event)=>event.preventDefault(),
                        onDrop: (event)=>place(event.dataTransfer.getData("text/plain"), category),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: category
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: [
                                    Object.values(sorted).filter((value)=>value === category).length,
                                    " 件"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, category, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "work-feedback",
                "aria-live": "polite",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    text: message
                }, void 0, false, {
                    fileName: "[project]/src/components/ActivityStage.tsx",
                    lineNumber: 91,
                    columnNumber: 55
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            normalDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "seal-action",
                type: "button",
                onClick: ()=>onComplete({
                        wage: 18
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "记"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    " 普通文稿已清"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityStage.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
function InspectionActivity({ beat, onComplete }) {
    const config = beat.inspection;
    const [found, setFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [detail, setDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("从纸、墨、字和藏印开始查验。");
    const done = found.length >= config.required;
    const inspect = (id, nextDetail)=>{
        setFound((current)=>current.includes(id) ? current : [
                ...current,
                id
            ]);
        setDetail(nextDetail);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "activity inspection",
        "aria-label": "残页查验",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "查验残页"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 112,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            found.length,
                            "/",
                            config.required
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 112,
                        columnNumber: 58
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "activity-copy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    text: beat.text
                }, void 0, false, {
                    fileName: "[project]/src/components/ActivityStage.tsx",
                    lineNumber: 113,
                    columnNumber: 36
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inspection-sheet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "folio-number",
                        children: "十三"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            text: config.document.excerpt
                        }, void 0, false, {
                            fileName: "[project]/src/components/ActivityStage.tsx",
                            lineNumber: 116,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    config.hotspots.map((spot, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `inspection-mark mark-${index + 1} ${found.includes(spot.id) ? "is-found" : ""}`,
                            onClick: ()=>inspect(spot.id, spot.detail),
                            "aria-label": `查验${spot.label}`,
                            children: index + 1
                        }, spot.id, false, {
                            fileName: "[project]/src/components/ActivityStage.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "work-feedback",
                "aria-live": "polite",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    text: detail
                }, void 0, false, {
                    fileName: "[project]/src/components/ActivityStage.tsx",
                    lineNumber: 127,
                    columnNumber: 55
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "seal-action",
                type: "button",
                onClick: ()=>onComplete({
                        clues: config.hotspots.map((spot)=>spot.label),
                        archive: beat.unlockArchive,
                        paper: 1
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "录"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 128,
                        columnNumber: 182
                    }, this),
                    " 写入笺记"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 128,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityStage.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
function ComparisonActivity({ beat, onComplete }) {
    const config = beat.comparison;
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("把两页并在一处，先看纸筋，再看运笔。");
    const [solved, setSolved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "activity",
        "aria-label": "文稿比对",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "两纸互校"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 139,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "比"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 139,
                        columnNumber: 58
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "activity-copy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    text: config.question
                }, void 0, false, {
                    fileName: "[project]/src/components/ActivityStage.tsx",
                    lineNumber: 140,
                    columnNumber: 36
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "comparison-spread",
                children: config.documents.map((document)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "comparison-document",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: document.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    text: document.excerpt
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ActivityStage.tsx",
                                    lineNumber: 144,
                                    columnNumber: 47
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 144,
                                columnNumber: 44
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "纸"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 22
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: document.paper
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ActivityStage.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "墨"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 68
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: document.ink
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 78
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ActivityStage.tsx",
                                        lineNumber: 145,
                                        columnNumber: 63
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "字"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 112
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: document.handwriting
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 122
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ActivityStage.tsx",
                                        lineNumber: 145,
                                        columnNumber: 107
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, document.id, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "comparison-options",
                children: config.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setFeedback(option.feedback);
                            setSolved(Boolean(option.correct));
                        },
                        children: option.text
                    }, option.id, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "work-feedback",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    text: feedback
                }, void 0, false, {
                    fileName: "[project]/src/components/ActivityStage.tsx",
                    lineNumber: 154,
                    columnNumber: 36
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            solved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "seal-action",
                type: "button",
                onClick: ()=>onComplete({
                        clues: [
                            "残页同源"
                        ]
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "合"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 155,
                        columnNumber: 112
                    }, this),
                    " 收下判断"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 155,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityStage.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
function AssemblyActivity({ beat, onComplete }) {
    const config = beat.assembly;
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [side, setSide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("front");
    const [joined, setJoined] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [solved, setSolved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("先看正面文字，也要翻看纸背。撕口、折痕和旧墨比句意更可靠。");
    const available = config.fragments.filter((fragment)=>!order.includes(fragment.id));
    const correct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>order.length === config.fragments.length && order.every((id, index)=>config.fragments.find((fragment)=>fragment.id === id)?.order === index), [
        config.fragments,
        order
    ]);
    const add = (id)=>{
        setJoined(false);
        setSolved(false);
        setOrder((current)=>current.includes(id) ? current : [
                ...current,
                id
            ]);
    };
    const remove = (id)=>{
        setJoined(false);
        setSolved(false);
        setOrder((current)=>current.filter((item)=>item !== id));
    };
    const check = ()=>{
        if (correct) {
            setJoined(true);
            setMessage("三道撕口和两条横折同时接上。纸背的西字也连成了同一行。");
        } else {
            setMessage("正面的句意勉强能读，纸背的旧墨却接不上。翻到纸背，再按折痕重排。");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "activity assembly-activity",
        "aria-label": "残页校勘",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "缀合与辨源"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 189,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: joined ? "辨" : `${order.length}/${config.fragments.length}`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 189,
                        columnNumber: 59
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "activity-copy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    text: joined ? config.question : beat.text
                }, void 0, false, {
                    fileName: "[project]/src/components/ActivityStage.tsx",
                    lineNumber: 190,
                    columnNumber: 36
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "folio-side-toggle",
                "aria-label": "查看纸面",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: side === "front" ? "is-active" : "",
                        onClick: ()=>setSide("front"),
                        children: "汉文正面"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: side === "back" ? "is-active" : "",
                        onClick: ()=>setSide("back"),
                        children: "西字纸背"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "assembly-line",
                children: [
                    order.map((id)=>{
                        const fragment = config.fragments.find((item)=>item.id === id);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `manuscript-fragment fragment-${fragment.order + 1}`,
                            onClick: ()=>remove(id),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: fragment.edge
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ActivityStage.tsx",
                                    lineNumber: 200,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    text: side === "front" ? fragment.text : fragment.back
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ActivityStage.tsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, id, true, {
                            fileName: "[project]/src/components/ActivityStage.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this);
                    }),
                    order.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "将残片放到这里"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 205,
                        columnNumber: 32
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fragment-tray",
                children: available.map((fragment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        draggable: true,
                        className: "manuscript-fragment",
                        onClick: ()=>add(fragment.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: fragment.edge
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                text: side === "front" ? fragment.text : fragment.back
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this)
                        ]
                    }, fragment.id, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            joined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "source-options",
                children: config.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setMessage(option.feedback);
                            setSolved(Boolean(option.correct));
                        },
                        children: option.text
                    }, option.id, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 218,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 216,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "work-feedback",
                "aria-live": "polite",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    text: message
                }, void 0, false, {
                    fileName: "[project]/src/components/ActivityStage.tsx",
                    lineNumber: 224,
                    columnNumber: 55
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            !joined && order.length === config.fragments.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "ink-action",
                type: "button",
                onClick: check,
                children: "以纸背核对"
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 225,
                columnNumber: 63
            }, this),
            solved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "seal-action",
                type: "button",
                onClick: ()=>onComplete({
                        clues: [
                            config.completionClue
                        ],
                        archive: beat.unlockArchive
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "录"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 226,
                        columnNumber: 156
                    }, this),
                    " 著录来源"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 226,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityStage.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/BookShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
;
;
function BookShell({ left, right, chapter, progress }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "reading-desk",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "book-ribbons",
                "aria-label": "书内导航",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        title: "合卷",
                        children: "卷首"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BookShell.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/archive",
                        title: "查看史料",
                        children: "笺记"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BookShell.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/settings",
                        title: "设置",
                        children: "杂项"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BookShell.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BookShell.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "open-book",
                "aria-label": "摊开的线装书",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "book-page book-page-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "book-rule",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            left,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "page-folio",
                                children: chapter ?? "佣书"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BookShell.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "book-gutter",
                        "aria-hidden": true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 25,
                                columnNumber: 50
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 25,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 25,
                                columnNumber: 60
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 25,
                                columnNumber: 65
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BookShell.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "book-page book-page-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "book-rule",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            right,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "page-folio",
                                children: progress ?? "听雨书坊"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BookShell.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BookShell.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BookShell.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ChoiceButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChoiceButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function ChoiceButton({ text, index, onSelect }) {
    const labels = [
        "甲",
        "乙",
        "丙",
        "丁"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onSelect,
        className: "ink-choice",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: labels[index] ?? index + 1
            }, void 0, false, {
                fileName: "[project]/src/components/ChoiceButton.tsx",
                lineNumber: 7,
                columnNumber: 74
            }, this),
            text
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChoiceButton.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/components/ManuscriptPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ManuscriptPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChoiceButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChoiceButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SentenceText.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ManuscriptPage({ speaker, text, isTitle, canTurn, onTurn, choices, onChoice, footer }) {
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [leaving, setLeaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const busy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setVisible(true), 40);
        return ()=>window.clearTimeout(timer);
    }, []);
    const transition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((done)=>{
        if (busy.current) return;
        busy.current = true;
        setLeaving(true);
        window.setTimeout(()=>done?.(), 230);
    }, []);
    const handleClick = (event)=>{
        if (event.target.closest("button, a") || !canTurn || choices) return;
        transition(onTurn);
    };
    const speakerKind = speaker === "我" ? "self" : speaker === "旁白" ? "narrator" : speaker ? "other" : "plain";
    const speakerLabel = speaker === "旁白" ? "记" : speaker;
    const paragraphs = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SentenceText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        text: text
    }, void 0, false, {
        fileName: "[project]/src/components/ManuscriptPage.tsx",
        lineNumber: 38,
        columnNumber: 22
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: `narrative-page ${visible ? "is-visible" : ""} ${leaving ? "is-leaving" : ""} ${canTurn ? "is-clickable" : ""}`,
        onClick: handleClick,
        onKeyDown: (event)=>{
            if ((event.key === "Enter" || event.key === " ") && canTurn && !choices) {
                event.preventDefault();
                transition(onTurn);
            }
        },
        tabIndex: canTurn ? 0 : undefined,
        role: canTurn ? "button" : undefined,
        "aria-label": canTurn ? "继续阅读" : undefined,
        children: [
            isTitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chapter-leaf",
                children: paragraphs
            }, void 0, false, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `dialogue-block dialogue-block--${speakerKind}`,
                children: [
                    speakerLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "speaker-rail",
                        "aria-label": `说话者：${speaker}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "speaker-label",
                                children: speakerLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/ManuscriptPage.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "speaker-line",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/ManuscriptPage.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "narrative-copy",
                        children: paragraphs
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this),
            choices && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "choice-list",
                children: choices.map((choice, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChoiceButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        text: choice.text,
                        index: index,
                        onSelect: ()=>transition(()=>onChoice?.(index))
                    }, choice.id, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 62,
                        columnNumber: 80
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 62,
                columnNumber: 19
            }, this),
            canTurn && !choices && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "continue-mark",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 63,
                        columnNumber: 74
                    }, this),
                    "续页"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 63,
                columnNumber: 31
            }, this),
            footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "narrative-footer",
                children: footer
            }, void 0, false, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 64,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ManuscriptPage.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/types/game.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_VARIABLES",
    ()=>DEFAULT_VARIABLES,
    "SAVE_KEY",
    ()=>SAVE_KEY
]);
const DEFAULT_VARIABLES = {
    paper: 0,
    trust: 0,
    wage: 0,
    trust_yimin: 0,
    trust_qing: 0,
    trust_priest: 0
};
const SAVE_KEY = "chronicle-save";
}),
"[project]/src/lib/save.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyEffects",
    ()=>applyEffects,
    "clearSave",
    ()=>clearSave,
    "createInitialSave",
    ()=>createInitialSave,
    "hasSave",
    ()=>hasSave,
    "loadSave",
    ()=>loadSave,
    "writeSave",
    ()=>writeSave
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/game.ts [app-ssr] (ecmascript)");
;
function loadSave() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function writeSave(data) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function clearSave() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function hasSave() {
    return loadSave() !== null;
}
function applyEffects(variables, effects) {
    if (!effects) return variables;
    const next = {
        ...variables
    };
    for (const key of Object.keys(effects)){
        const delta = effects[key];
        if (typeof delta === "number") {
            next[key] = (next[key] ?? 0) + delta;
        }
    }
    return next;
}
function createInitialSave(chapterId) {
    return {
        chapterId,
        beatIndex: 0,
        variables: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_VARIABLES"]
        },
        unlockedArchive: [],
        unlockedCharacters: [],
        completedActivities: [],
        clues: [],
        savedAt: Date.now()
    };
}
}),
"[project]/src/story/chapter01.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"id\":\"chapter01\",\"title\":\"第一章\",\"subtitle\":\"第十三页\",\"beats\":[{\"id\":\"opening-01\",\"type\":\"title\",\"text\":\"康熙九年，广州。\\n雨从昨夜落到今日，城西的石路一直没有干。\"},{\"id\":\"opening-02\",\"speaker\":\"旁白\",\"text\":\"天才蒙蒙亮，我便推开听雨书坊的木门。门轴受了潮，发出一声极长的呻吟。柜上摆着昨夜没收进去的线香，湿气把香灰压成了一道灰白的弧。\"},{\"id\":\"opening-03\",\"speaker\":\"旁白\",\"text\":\"我在这里做了七个月的佣书。替客人誊抄诗稿，给书坊修补残卷，也把收来的旧纸分门别类。写得快，一日能挣二十文；碰上有钱而心急的客人，也许再添一碗热汤。\"},{\"id\":\"opening-04\",\"speaker\":\"老板\",\"text\":\"来得正好。后院三只箱子，天黑前清出来。可卖的入匣，能作衬纸的另放，霉烂得救不回来的等我看过再说。\"},{\"id\":\"opening-05\",\"speaker\":\"旁白\",\"text\":\"老板姓沈。街坊都叫他沈掌柜，我却很少听见有人喊他的名字。他正在磨一方旧砚，袖口沾着墨，案边放着一封折得极窄的信。信封上没有投递人的姓名。\"},{\"id\":\"opening-choice\",\"type\":\"choice\",\"text\":\"我先问哪一件事？\",\"choices\":[{\"id\":\"ask-wage\",\"text\":\"三箱都在今日清完，工钱怎么算？\",\"effects\":{\"wage\":2},\"goto\":\"opening-wage\"},{\"id\":\"ask-source\",\"text\":\"这些旧纸从哪里收来的？\",\"effects\":{\"trust\":1},\"goto\":\"opening-source\"}]},{\"id\":\"opening-wage\",\"speaker\":\"老板\",\"text\":\"底钱二十文。分得干净，再添十文。你若把有字的东西当废纸裁了，便从下月工钱里扣。\",\"next\":\"opening-06\"},{\"id\":\"opening-source\",\"speaker\":\"老板\",\"text\":\"城西一户人家清出来的。主人新近过世，后人只要屋子，不要纸。你做你的活，莫替别人盘家底。\",\"next\":\"opening-06\"},{\"id\":\"opening-06\",\"speaker\":\"旁白\",\"text\":\"三只杉木箱依次排在后院。第一箱有淡淡的樟脑味，第二箱压着半块青砖，第三箱的铜搭扣已经断了，箱盖上却留着一道刚擦过的手印。\"},{\"id\":\"opening-07\",\"speaker\":\"旁白\",\"text\":\"箱子旁放着一张收条，写的是“旧书旧纸三箱，共重一百八十七斤”。纸角盖了书坊的印，却没有卖主画押。沈掌柜做生意一向谨慎，哪怕收一捆废纸也要留下姓名。这是我第一次看见一张没有卖主的收条。\"},{\"id\":\"opening-08\",\"speaker\":\"旁白\",\"text\":\"我问小满昨晚谁送来的。他说两名脚夫都戴着斗笠，箱子落地便走，掌柜追到巷口才补给他们脚钱。雨太密，他没看清脸，只记得其中一人搬箱时露出手腕，腕上有一道被绳索磨出的旧疤。\"},{\"id\":\"sorting-01\",\"type\":\"sorting\",\"text\":\"先整理第一箱。看题名、行款与落款，把六份普通文稿收入合适的书匣。那张没有题名的纸可以暂留案上。\",\"sorting\":{\"required\":6,\"categories\":[\"家书\",\"契约\",\"佛经\",\"诗稿\",\"账本\",\"杂纸\"],\"documents\":[{\"id\":\"letter\",\"title\":\"寄长兄书\",\"excerpt\":\"母病已安，勿以归舟为念……\",\"category\":\"家书\",\"paper\":\"本地竹纸\",\"ink\":\"松烟墨\",\"handwriting\":\"行楷\",\"mark\":\"弟百拜\"},{\"id\":\"contract\",\"title\":\"赁屋文契\",\"excerpt\":\"今凭中见，赁西濠屋一所……\",\"category\":\"契约\",\"paper\":\"厚皮纸\",\"ink\":\"浓墨\",\"handwriting\":\"楷书\",\"mark\":\"画押\"},{\"id\":\"sutra\",\"title\":\"金刚经残抄\",\"excerpt\":\"应无所住，而生其心……\",\"category\":\"佛经\",\"paper\":\"黄麻纸\",\"ink\":\"旧墨\",\"handwriting\":\"馆阁小楷\",\"mark\":\"佛\"},{\"id\":\"poem\",\"title\":\"珠江夜泊\",\"excerpt\":\"潮落孤城外，灯寒客棹边……\",\"category\":\"诗稿\",\"paper\":\"白棉纸\",\"ink\":\"淡墨\",\"handwriting\":\"草书\",\"mark\":\"未署\"},{\"id\":\"ledger\",\"title\":\"药材流水\",\"excerpt\":\"陈皮二斤，苏木四两，银三钱……\",\"category\":\"账本\",\"paper\":\"毛边纸\",\"ink\":\"杂墨\",\"handwriting\":\"账房体\",\"mark\":\"九月\"},{\"id\":\"wrapper\",\"title\":\"旧书包纸\",\"excerpt\":\"仅余半行店号与一处油斑。\",\"category\":\"杂纸\",\"paper\":\"粗竹纸\",\"ink\":\"褪墨\",\"handwriting\":\"印字\",\"mark\":\"残\"},{\"id\":\"folio13\",\"title\":\"无题残页\",\"excerpt\":\"……二十四日暮，城垣已弃。堂中妇孺尚聚，神父仍为众人听告解……\",\"paper\":\"白棉纸，横折密集\",\"ink\":\"正文青灰，纸背另有淡墨\",\"handwriting\":\"工整译抄小楷\",\"mark\":\"十三\",\"anomalous\":true,\"archiveId\":\"folio-13\"}]}},{\"id\":\"work-daily-01\",\"speaker\":\"旁白\",\"text\":\"第一箱里最值钱的并非诗稿，而是那张赁屋文契。纸虽普通，年月、四至、中人、租银都写得齐整，末尾三处画押也没有被水晕开。若立契的两家还有后人在，这一页便能抵得上半箱无名诗。佣书看纸，先看它还能替谁说话。\"},{\"id\":\"work-daily-02\",\"speaker\":\"旁白\",\"text\":\"寄长兄的家书只写了半面。写信人说母亲病已安稳，叫兄长不要急着归舟；翻到背后，却又添了一行极小的字，请他若能回来，务必从后门进家。两句话的墨色相差数月，第一句话用于安慰，第二句话才像真正想说的事。\"},{\"id\":\"work-daily-03\",\"speaker\":\"旁白\",\"text\":\"药材流水里夹着一片干枯的榕叶。账房把“苏木”写了又改，原来的数目被墨团遮住。我把纸迎着窗光看，刮去的字仍在纸背留下浅痕。沈掌柜曾说，字可以涂掉，笔尖压进纸里的力气却很难收回。\"},{\"id\":\"work-daily-04\",\"speaker\":\"小满\",\"text\":\"师兄，旧纸里若夹着家书，也要拿去卖吗？我上回看见有人在城南买了一包旧账，回去拿它糊窗。纸上的人要是还活着，隔着窗洞看见自己的话，会不会来讨？\"},{\"id\":\"work-daily-05\",\"speaker\":\"我\",\"text\":\"纸到了书坊，先问用处，再问价钱。有人来讨，拿得出凭据，掌柜自然会还。无人来讨，我们至少替它留一个名字。若连名字都没有，就只能看它自己留下了什么。\"},{\"id\":\"work-daily-06\",\"speaker\":\"旁白\",\"text\":\"小满似懂非懂地把佛经收入黄签匣。他才十三岁，只记得广州如今的城门什么时候开，巡夜的更夫从哪条巷子经过。二十年前的事离他很远，远得像旧纸上的前朝年号；可对沈掌柜这样的人，那些年份似乎从未真正过去。\"},{\"id\":\"work-01\",\"speaker\":\"旁白\",\"text\":\"寻常旧纸各有自己的规矩。家书先问收信人，契约先看年月和画押，账簿纵然只剩半页，也能从银钱的列法认出来。真正麻烦的，往往是没有开头、没有落款，也没人肯认领的东西。\"},{\"id\":\"work-02\",\"speaker\":\"旁白\",\"text\":\"那张无题纸比别的纸薄，边缘却没有虫咬。右下角写着一个很小的“十三”，像是页码。它原来应当夹在一册书里，前后至少还有十二页。可我把第一箱翻到底，只找到它一张。\"},{\"id\":\"work-03\",\"speaker\":\"小满\",\"text\":\"前头有人找掌柜。他不买书，只问昨夜是不是收了三箱旧纸。\"},{\"id\":\"work-04\",\"speaker\":\"旁白\",\"text\":\"说话的是书坊的小学徒小满。他抱着一摞刚裁好的纸，雨水顺着发梢滴在肩上。沈掌柜没有抬头，只让他把门闩扣上，说今日歇得早。\"},{\"id\":\"work-choice\",\"type\":\"choice\",\"text\":\"那张无题残页还压在我手下。\",\"choices\":[{\"id\":\"show-now\",\"text\":\"立刻把残页交给沈掌柜。\",\"effects\":{\"trust\":2,\"trust_yimin\":1},\"goto\":\"work-show\"},{\"id\":\"inspect-first\",\"text\":\"先自行看清纸墨，再向他开口。\",\"effects\":{\"paper\":1},\"goto\":\"work-inspect\"}]},{\"id\":\"work-show\",\"speaker\":\"旁白\",\"text\":\"我把残页平放在他的砚旁。他磨墨的手停了一瞬，墨锭仍抵着砚堂，黑色的水纹却慢慢散开。他先看页码，又把纸翻到背面，像是在寻找一个早已知道位置的记号。他让我把灯移近，逐处说清自己看见的纸墨特征。\",\"next\":\"inspect-01\"},{\"id\":\"work-inspect\",\"speaker\":\"旁白\",\"text\":\"我没有立刻叫他。佣书靠眼睛吃饭，一张纸值不值钱，有时只差一个针眼般的印记。我把灯移近，先从纸筋、墨色和笔势看起。\",\"next\":\"inspect-01\"},{\"id\":\"inspect-01\",\"type\":\"inspection\",\"text\":\"残页受过潮，正反两面又有不同文字。找出能够判断书写先后与流传方式的三处痕迹。\",\"unlockArchive\":[\"folio-13\"],\"inspection\":{\"required\":3,\"document\":{\"id\":\"folio13\",\"title\":\"第十三页\",\"excerpt\":\"……二十四日暮，城垣已弃。堂中妇孺尚聚，神父仍为众人听告解。男仆忽自门外呼曰：守城之兵已经散了……\",\"paper\":\"白棉纸，横折密集\",\"ink\":\"正文青灰，纸背另有淡墨\",\"handwriting\":\"工整译抄小楷\",\"mark\":\"十三\",\"archiveId\":\"folio-13\",\"anomalous\":true},\"hotspots\":[{\"id\":\"calendar\",\"label\":\"西历日期\",\"detail\":\"正文只写“二十四日”，纸背相同位置却有“24 de Novembro”的淡字。这个日期写法不像本地人的日记。\"},{\"id\":\"ink\",\"label\":\"两层旧墨\",\"detail\":\"汉字遇到纸背透出的西字时会刻意避让。西文先写，汉文后来依着它译抄。\"},{\"id\":\"folio\",\"label\":\"后添页码\",\"detail\":\"“十三”的墨色更黑，笔锋也更硬。正文、译抄与编页至少经过了三次落笔。\"},{\"id\":\"wax\",\"label\":\"封蜡残屑\",\"detail\":\"折缝里嵌着暗红蜡屑。它曾像书信一样封好递送，并非从装订古籍上直接拆下。\"}]}},{\"id\":\"boss-01\",\"speaker\":\"老板\",\"text\":\"这页纸，你看过了？\"},{\"id\":\"boss-02\",\"speaker\":\"旁白\",\"text\":\"他问得很轻。我跟他做了七个月的事，见过他和欠账的举人争钱，也见过差役上门查禁书。他从来没有像此刻这样，把一句寻常问话说得像一道门槛。\"},{\"id\":\"boss-03\",\"speaker\":\"老板\",\"text\":\"有些纸看过便算了。有些纸看过，往后便要记住自己对谁说过。你若还想在广州安稳吃这碗饭，今日见到的字先留在肚子里。\"},{\"id\":\"boss-04\",\"speaker\":\"旁白\",\"text\":\"他说完，将残页夹进一册空账簿。可他的手指压在页角上，迟迟没有合拢。我看见账簿封皮内侧写着一行极小的字：某年某月，收纸十二页。如今这里只有第十三页。\"},{\"id\":\"boss-05\",\"speaker\":\"旁白\",\"text\":\"沈掌柜察觉我的目光，立即合上账簿。他没有斥责，只让我去烧一壶水。后院水缸快见底了，雨水却从瓦沟白白流走。我站在檐下接水时，看见他把第十三页举到窗前，随后从衣襟里取出一张更小的纸条核对。\"},{\"id\":\"boss-06\",\"speaker\":\"旁白\",\"text\":\"那张纸条只露出一角，上面画着几道横线，像一本书缺失页次的清单。沈掌柜对着十三这个数目看了很久，最后用朱笔点了一点。那一点极红，落在陈年的灰墨旁边，仿佛今天才有人承认这页纸确实存在。\"},{\"id\":\"second-box-01\",\"speaker\":\"老板\",\"text\":\"第一箱清完便去吃饭。第二箱先别动。\"},{\"id\":\"second-box-02\",\"speaker\":\"旁白\",\"text\":\"他越是这样说，我越注意到第二箱。压箱的青砖并不是为了防潮。砖下垫着一片旧封套，封套被人沿边裁开，露出与第十三页相同的横折和暗红蜡痕。\"},{\"id\":\"second-box-03\",\"speaker\":\"旁白\",\"text\":\"第二箱的表层全是无关紧要的蒙学书：《千字文》三册，《幼学琼林》两册，还有一本被孩童画满小人的《论语》。它们排列得过分整齐，像是后来才铺上去的。真正从旧宅搬来的书不会这样干净，灰尘也不会只停在箱角。\"},{\"id\":\"second-box-04\",\"speaker\":\"旁白\",\"text\":\"我把青砖挪开时，砖底粘着一缕蓝线。线头打的是装订书册用的双结，颜色与第十三页撕口处残留的纤维相同。有人拆过那册书，又把普通课本一层层盖回去，希望下一个开箱的人只看见孩子读过的旧书。\"},{\"id\":\"comparison-01\",\"type\":\"comparison\",\"text\":\"我趁沈掌柜去前堂时取出封套内的残纸。封套正面是汉字，拆开的内层却露出一行西文旧墨。\",\"comparison\":{\"question\":\"这两层文字是什么关系？选择能够同时解释墨色、避让和折痕的判断。\",\"documents\":[{\"id\":\"folio13a\",\"title\":\"汉文正面\",\"excerpt\":\"二十四日暮，城垣已弃。堂中妇孺尚聚。\",\"paper\":\"白棉纸，横折穿字\",\"ink\":\"青灰，遇背字处避让\",\"handwriting\":\"工整译抄小楷\"},{\"id\":\"folio-edge\",\"title\":\"西字纸背\",\"excerpt\":\"24 de Novembro ... Padre ...\",\"paper\":\"同纸同折，字迹在下层\",\"ink\":\"淡褐，局部透到正面\",\"handwriting\":\"连写西字\"}],\"options\":[{\"id\":\"same-writer\",\"text\":\"同一个人先写西文，再自行改写成汉文。\",\"feedback\":\"两种笔迹的运笔习惯完全不同，汉字还会避开已经透出的旧墨。仅凭内容无法认定同一作者。\"},{\"id\":\"translation-layer\",\"text\":\"西文记录在先，后来有人把内容译抄成汉文。\",\"correct\":true,\"feedback\":\"墨层、日期写法与避让关系互相印证。眼前这页很可能是西文亲历记录的汉文译抄本。\"},{\"id\":\"later-forgery\",\"text\":\"西字是后人为抬高手稿身价而添写的。\",\"feedback\":\"西字墨层位于汉字之下，折痕也早于汉文。它出现得更早，无法用后添伪记解释。\"}]}},{\"id\":\"discovery-01\",\"speaker\":\"旁白\",\"text\":\"封套夹层里还有三片手掌宽的碎纸。每片正面都有汉字，背后则是我读不懂的连写西字。若只顺着汉文句意去排，会得到两种都能读通的次序；翻到背面，横折与旧墨却只容许一种接法。\"},{\"id\":\"discovery-02\",\"speaker\":\"旁白\",\"text\":\"最左一片沾着暗红封蜡，中间一片有两枚细小针孔，最右一片保留信纸原边。有人先把一封从远处寄来的报告拆开，沿着西文行间译成汉字，后来又把译稿编入另一册书。\"},{\"id\":\"discovery-03\",\"speaker\":\"旁白\",\"text\":\"纸背反复出现一个词：Padre。我曾在澳门来的历书和教堂账目里见过相似的字形，却不知道它指人、地名还是官职。沈掌柜一定能读出更多，所以他刚才才先翻纸背。\"},{\"id\":\"assembly-01\",\"type\":\"assembly\",\"text\":\"三片纸的汉文都能勉强成句。请来回查看正反两面，按撕口、横折与旧墨位置缀合。\",\"unlockArchive\":[\"west-gate-fragment\"],\"assembly\":{\"fragments\":[{\"id\":\"fragment-a\",\"text\":\"二十四日暮，\",\"back\":\"24 de Novembro\",\"edge\":\"左缘封蜡\",\"order\":0},{\"id\":\"fragment-b\",\"text\":\"城垣已弃。\",\"back\":\"a muralha ...\",\"edge\":\"两枚针孔\",\"order\":1},{\"id\":\"fragment-c\",\"text\":\"堂中妇孺尚聚。\",\"back\":\"o Padre ...\",\"edge\":\"右侧原边\",\"order\":2}],\"question\":\"缀合完成后，请为这份残页著录来源层次。哪一种判断最经得起纸墨证据？\",\"options\":[{\"id\":\"direct-chinese\",\"text\":\"一位广州人亲历其事，当场用汉文写下见闻。\",\"feedback\":\"汉文避开纸背旧墨，日期也沿用西文写法。它写成得更晚。\"},{\"id\":\"translated-report\",\"text\":\"西洋教士先写亲历报告，后来有人译抄成汉文并重新编页。\",\"correct\":true,\"feedback\":\"这项著录能解释三层痕迹：西文亲历记录、汉文译抄和后加页码。原作者的姓名仍待查证。\"},{\"id\":\"mixed-rumor\",\"text\":\"书坊把两份无关残纸拼在一起，编成一段传闻。\",\"feedback\":\"三片纸的撕口、横折和西文行距都连续，来自同一张信纸。\"}],\"completionClue\":\"西文报告译抄本\"}},{\"id\":\"afternoon-01\",\"speaker\":\"旁白\",\"text\":\"残句接上的时候，前堂忽然传来门环撞木的声音。一下，两下。来人敲得很慢，仿佛知道店里的人一定听得见，也一定会开门。\"},{\"id\":\"visitor-01\",\"speaker\":\"陌生客\",\"text\":\"听说贵坊昨夜收了些旧纸。我家主人寻一部先人诗稿，愿出三倍市价。纸张很薄，页脚有数目。若已拆散，单页也收。\"},{\"id\":\"visitor-02\",\"speaker\":\"老板\",\"text\":\"听雨坊只收经史旧刻，不替人寻家稿。客官从哪里听来的消息，便回哪里再问。\"},{\"id\":\"visitor-03\",\"speaker\":\"旁白\",\"text\":\"门缝下露出一双干净的皂靴。广州连日大雨，从西关走到这里不可能一尘不沾。那人没有争辩，只将一枚崭新的制钱推过门槛，说改日再来。\"},{\"id\":\"visitor-04\",\"speaker\":\"旁白\",\"text\":\"制钱落地时声音很脆，是今年刚铸的新钱。钱背朝上，满文一侧被人用刀划了一道细痕。小满弯腰想捡，沈掌柜喝住了他，随后用夹炭的火箸把钱拨进空茶盏，连同茶盏一起锁进柜中。\"},{\"id\":\"visitor-05\",\"speaker\":\"小满\",\"text\":\"他若真寻先人诗稿，为什么连书名都不说？城里每天卖出的旧纸那么多，他又怎么知道三只箱子刚好到了我们这里？昨晚替人送箱子的脚夫，明明是掌柜亲自从后巷领进来的。\"},{\"id\":\"visitor-06\",\"speaker\":\"老板\",\"text\":\"你今日什么也没看见。把前门的水擦干净，再去看看后门有没有人。沿墙根走，别站在窗下往外探。若有人问店里几个人，就说我午后去了河南，没有回来。\"},{\"id\":\"visitor-choice\",\"type\":\"choice\",\"text\":\"陌生客离开后，沈掌柜回到后院。拼好的残纸仍在案上。\",\"choices\":[{\"id\":\"admit\",\"text\":\"承认自己动过第二箱，并交出拼好的残纸。\",\"effects\":{\"trust\":2,\"trust_yimin\":1},\"goto\":\"visitor-admit\"},{\"id\":\"hide\",\"text\":\"先收起最小的一片，只说发现了封套。\",\"effects\":{\"paper\":1,\"trust\":-1},\"goto\":\"visitor-hide\"}]},{\"id\":\"visitor-admit\",\"speaker\":\"老板\",\"text\":\"你手快，眼也不坏。只是从今日起，动一张纸之前要先想清楚：它原来藏了二十年，凭什么偏在你手里重见天日？\",\"next\":\"evening-01\"},{\"id\":\"visitor-hide\",\"speaker\":\"旁白\",\"text\":\"我说话时，他一直看着我的右袖。那片碎纸贴着腕骨，薄得几乎没有重量。我却第一次知道，一张纸也能让人的手臂发沉。\",\"next\":\"evening-01\"},{\"id\":\"evening-01\",\"speaker\":\"旁白\",\"text\":\"雨到黄昏终于小了。小满把门板一块块装上，街市的声音也随之变窄。沈掌柜重新点灯，把三只箱子搬进内室，又从柜底取出一本从未让我碰过的账册。\"},{\"id\":\"evening-02\",\"speaker\":\"旁白\",\"text\":\"账册没有店号。每一页只记日期、纸数和一个极简的代称：山客、旧史、海上人、白云僧。二十年前的某一页被整齐割去，只剩装订处一线毛边。\"},{\"id\":\"evening-ledger-01\",\"speaker\":\"旁白\",\"text\":\"我从那些代称旁看见不同颜色的点。黑点表示已经收回，朱点表示尚在人手，空圈表示持有人已经亡故。少数名字后面同时有朱点和空圈，沈掌柜说，那代表人虽然死了，纸却仍在走动。\"},{\"id\":\"evening-ledger-02\",\"speaker\":\"旁白\",\"text\":\"最早一笔记在顺治七年冬，只有“十二页，散失”五个字。此后每隔两三年便添一笔：一页入寺，一页随商船出海，两页焚毁，一页见于肇庆。二十年过去，清单仍没有合拢，今天找到的第十三页甚至不在原数之内。\"},{\"id\":\"evening-ledger-03\",\"speaker\":\"我\",\"text\":\"若原本只记十二页，今天这一页又为什么编号十三？是清单错了，还是有人后来补写过？\"},{\"id\":\"evening-ledger-04\",\"speaker\":\"老板\",\"text\":\"所以那位旧友才要在闭眼前见到原稿。他知道当年的事，也知道这份文字经过谁的手，却从未亲眼看过完整一册。人能记错，清单能抄错，页码也能伪造。我们只能把各处留下的痕迹先收回来。\"},{\"id\":\"evening-03\",\"speaker\":\"老板\",\"text\":\"这些箱子属于一位旧友。他病得很重，想在闭眼前把散在外面的纸找齐。今日门外那个人也在找，但他替谁办事，我还不知道。\"},{\"id\":\"evening-04\",\"speaker\":\"老板\",\"text\":\"你可以到此为止。今日工钱照三十文算，明早来抄《通鉴》。你若愿意继续，明日卯时随我去西关收一批遗书。去了以后，看见什么、听见什么，都不能随便问姓名。\"},{\"id\":\"final-choice\",\"type\":\"choice\",\"text\":\"灯花爆了一声。门外的雨水沿石阶流过，那枚陌生人留下的制钱还躺在门槛边。\",\"choices\":[{\"id\":\"accept\",\"text\":\"收下今日工钱，答应明日同行。\",\"effects\":{\"trust\":2,\"wage\":10},\"goto\":\"ending-accept\"},{\"id\":\"ask-night\",\"text\":\"先问清楚：今晚这些箱子放在哪里？\",\"effects\":{\"trust\":1,\"paper\":1},\"goto\":\"ending-night\"}]},{\"id\":\"ending-accept\",\"speaker\":\"我\",\"text\":\"卯时以前，我会到。\",\"next\":\"ending-01\"},{\"id\":\"ending-night\",\"speaker\":\"老板\",\"text\":\"问得对。今晚你别回前街，从后门走。箱子留在这里，我留下守。若明早门上的封条破了，你便当从未见过我。\",\"next\":\"ending-01\"},{\"id\":\"ending-01\",\"speaker\":\"旁白\",\"text\":\"我把三十文钱收入袖中。沈掌柜递给我一张空白题签，让我在上面写明日要收的书名。我提笔等了很久，他却只说了两个字：遗书。\"},{\"id\":\"ending-detail-01\",\"speaker\":\"旁白\",\"text\":\"“遗书”可以是死者留下的文字，也可以是前代散失的著述。我不知道他取哪一层意思，便把两个字写得很慢。第一笔落下时，内室的灯焰忽然向门边偏去，像有一股极细的风从门缝钻进来。\"},{\"id\":\"ending-detail-02\",\"speaker\":\"老板\",\"text\":\"明日见到那户人家，不要先看书架，要先看地上的灰。书被人拿走，架上会空；书被人换过，灰里会留下新脚印。也不要问主人从前做过什么，只问这些纸最后一次被谁翻开。\"},{\"id\":\"ending-detail-03\",\"speaker\":\"旁白\",\"text\":\"他把账册重新锁好，钥匙却没有放回腰间，而是塞进一只待售的砚盒。我忽然明白，门外那位客人若今晚再来，沈掌柜并不相信一道木门能挡住他。他只希望来人即使进得来，也找不到真正该拿的东西。\"},{\"id\":\"ending-detail-04\",\"speaker\":\"旁白\",\"text\":\"小满从后门探头回来，说巷口停着一顶没有灯的青布轿。轿夫蹲在檐下避雨，已经换过两拨，轿子却一直没动。沈掌柜让他今晚睡在邻家的印坊，又嘱咐他不要告诉任何人我明日要去西关。\"},{\"id\":\"ending-detail-05\",\"speaker\":\"旁白\",\"text\":\"我在后门换上蓑衣时，发现自己的旧伞被人挪过位置。伞柄仍朝着墙，伞尖滴下的水痕却绕到了门边。有人进来以后碰过它，又尽量照原样放了回去。鞋柜下还粘着一点浅灰色的泥，与门外那双干净皂靴的鞋底颜色相同。那位客人并没有一直站在前门。\"},{\"id\":\"ending-detail-06\",\"speaker\":\"老板\",\"text\":\"明日若我没有开门，你便去西关的长寿巷，找门楣上刻着三朵梅花的人家。只说听雨坊来收书，不要提我的姓，也不要带今日的题签。有人若问你第十三页，便说它已经被我投进火里。\"},{\"id\":\"ending-02\",\"speaker\":\"旁白\",\"text\":\"离开书坊时，街上已经没有行人。我走出十余步，听见身后传来极轻的一声木响。有人从里面拨动了门闩。沈掌柜明明还站在后院的灯下。\"},{\"id\":\"ending-03\",\"speaker\":\"旁白\",\"text\":\"我没有回头。袖中那张记着“第十三页”的笺纸被雨气浸软，半枚朱印的形状却越来越清楚。它像一个尚未说出口的姓，也像一扇刚被推开的门。\"},{\"id\":\"ending-title\",\"type\":\"title\",\"text\":\"第一章 · 第十三页\\n完\\n\\n明日卯时，西关见。\"}]}"));}),
"[project]/src/lib/story.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getChapter",
    ()=>getChapter,
    "getFirstChapterId",
    ()=>getFirstChapterId,
    "listChapters",
    ()=>listChapters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$story$2f$chapter01$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/story/chapter01.json (json)");
;
const chapters = {
    chapter01: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$story$2f$chapter01$2e$json__$28$json$29$__["default"]
};
function getChapter(id) {
    return chapters[id];
}
function getFirstChapterId() {
    return "chapter01";
}
function listChapters() {
    return Object.values(chapters);
}
}),
"[project]/src/app/game/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GamePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ActivityStage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ActivityStage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BookShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BookShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManuscriptPage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ManuscriptPage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/save.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$story$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/story.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const ACTIVITY_TYPES = new Set([
    "sorting",
    "inspection",
    "comparison",
    "assembly"
]);
function normalizeSave(data) {
    return {
        ...data,
        variables: {
            paper: data.variables.paper ?? 0,
            trust: data.variables.trust ?? 0,
            wage: data.variables.wage ?? 0,
            trust_yimin: data.variables.trust_yimin ?? 0,
            trust_qing: data.variables.trust_qing ?? 0,
            trust_priest: data.variables.trust_priest ?? 0
        },
        unlockedArchive: data.unlockedArchive ?? [],
        unlockedCharacters: data.unlockedCharacters ?? [],
        completedActivities: data.completedActivities ?? [],
        clues: data.clues ?? []
    };
}
function GameContent() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const mode = searchParams.get("mode") ?? "new";
    const chapterId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$story$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirstChapterId"])();
    const chapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$story$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChapter"])(chapterId);
    const [save, setSave] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [beatId, setBeatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!chapter) return;
        const existing = mode === "continue" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadSave"])() : null;
        const initial = existing?.chapterId === chapterId ? normalizeSave(existing) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInitialSave"])(chapterId);
        setSave(initial);
        setBeatId(chapter.beats[initial.beatIndex]?.id ?? chapter.beats[0].id);
    }, [
        chapter,
        chapterId,
        mode
    ]);
    const currentIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>chapter?.beats.findIndex((beat)=>beat.id === beatId) ?? -1, [
        chapter,
        beatId
    ]);
    const currentBeat = chapter?.beats[currentIndex];
    const commit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextBeatId, nextSave, index)=>{
        const data = {
            ...nextSave,
            beatIndex: index,
            savedAt: Date.now()
        };
        setSave(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeSave"])(data);
        setBeatId(nextBeatId);
    }, []);
    const resolveNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((beat)=>{
        if (!chapter) return null;
        const index = beat.next ? chapter.beats.findIndex((item)=>item.id === beat.next) : chapter.beats.findIndex((item)=>item.id === beat.id) + 1;
        return index >= 0 && index < chapter.beats.length ? {
            beat: chapter.beats[index],
            index
        } : null;
    }, [
        chapter
    ]);
    const advance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((override)=>{
        if (!currentBeat || !save) return;
        const resolved = resolveNext(currentBeat);
        if (resolved) commit(resolved.beat.id, override ?? save, resolved.index);
    }, [
        commit,
        currentBeat,
        resolveNext,
        save
    ]);
    const handleChoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((choiceIndex)=>{
        if (!currentBeat?.choices || !save || !chapter) return;
        const choice = currentBeat.choices[choiceIndex];
        const nextSave = {
            ...save,
            variables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyEffects"])(save.variables, choice.effects)
        };
        const gotoIndex = choice.goto ? chapter.beats.findIndex((beat)=>beat.id === choice.goto) : -1;
        if (gotoIndex >= 0) commit(chapter.beats[gotoIndex].id, nextSave, gotoIndex);
        else advance(nextSave);
    }, [
        advance,
        chapter,
        commit,
        currentBeat,
        save
    ]);
    const handleActivity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((result)=>{
        if (!save || !currentBeat) return;
        const nextSave = {
            ...save,
            variables: {
                ...save.variables,
                wage: save.variables.wage + (result.wage ?? 0),
                paper: save.variables.paper + (result.paper ?? 0)
            },
            completedActivities: Array.from(new Set([
                ...save.completedActivities,
                currentBeat.id
            ])),
            clues: Array.from(new Set([
                ...save.clues,
                ...result.clues ?? []
            ])),
            unlockedArchive: Array.from(new Set([
                ...save.unlockedArchive,
                ...result.archive ?? [],
                ...currentBeat.unlockArchive ?? []
            ]))
        };
        advance(nextSave);
    }, [
        advance,
        currentBeat,
        save
    ]);
    if (!chapter || !save || !currentBeat || currentIndex < 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "loading-book",
            children: "展卷中……"
        }, void 0, false, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 97,
            columnNumber: 12
        }, this);
    }
    const activity = ACTIVITY_TYPES.has(currentBeat.type ?? "");
    const choices = currentBeat.type === "choice" ? currentBeat.choices : undefined;
    const isEnd = resolveNext(currentBeat) === null;
    const segment = currentIndex < 9 ? "开工" : currentIndex < 18 ? "旧纸" : currentIndex < 30 ? "残页" : currentIndex < 41 ? "来客" : "夜谈";
    const left = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "ledger-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vertical-title",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "听雨书坊"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 107,
                        columnNumber: 39
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        children: "今日书课"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 107,
                        columnNumber: 56
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ledger-date",
                children: "康熙九年 · 九月廿三"
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: segment
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ledger-objective",
                children: activity ? "完成案上的工作，所得判断会写入笺记。" : "读下去。留意纸上没有写明的事情。"
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "ledger-stats",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "工钱"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 112,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: [
                                    save.variables.wage || 20,
                                    " 文"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 112,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "残页"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 113,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: [
                                    save.variables.paper,
                                    " 页"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 113,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "掌柜"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 114,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: save.variables.trust > 3 ? "渐信" : save.variables.trust < 0 ? "存疑" : "平常"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 114,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "clue-notes",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "clue-kind",
                        children: "自查"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "clue-heading",
                        children: "案头笺记"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "clue-content",
                        children: save.clues.length ? save.clues.slice(-4).map((clue)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "· ",
                                    clue
                                ]
                            }, clue, true, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 120,
                                columnNumber: 67
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "尚无可记之事。"
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/page.tsx",
                            lineNumber: 120,
                            columnNumber: 97
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ledger-motto",
                children: "纸寿千年，语存一日。所抄为何，须自己看清。"
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
    const right = activity ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ActivityStage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        beat: currentBeat,
        onComplete: handleActivity
    }, currentBeat.id, false, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManuscriptPage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        speaker: currentBeat.type === "title" ? undefined : currentBeat.speaker,
        text: currentBeat.text,
        isTitle: currentBeat.type === "title",
        canTurn: !isEnd && !choices,
        onTurn: ()=>advance(),
        choices: choices,
        onChoice: handleChoice,
        footer: isEnd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            className: "seal-action",
            href: "/archive",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "终"
                }, void 0, false, {
                    fileName: "[project]/src/app/game/page.tsx",
                    lineNumber: 139,
                    columnNumber: 69
                }, void 0),
                " 查看本章笺记"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 139,
            columnNumber: 23
        }, void 0) : undefined
    }, currentBeat.id, false, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BookShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        left: left,
        right: right,
        chapter: chapter.subtitle,
        progress: `${currentIndex + 1} / ${chapter.beats.length}`
    }, void 0, false, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 143,
        columnNumber: 10
    }, this);
}
function GamePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "loading-book",
            children: "展卷中……"
        }, void 0, false, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 147,
            columnNumber: 30
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GameContent, {}, void 0, false, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 147,
            columnNumber: 73
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 147,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=src_19bfa483._.js.map