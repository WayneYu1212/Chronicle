(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ActivityStage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActivityStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
function ActivityStage(param) {
    let { beat, onComplete } = param;
    if (beat.type === "sorting" && beat.sorting) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortingActivity, {
            beat: beat,
            onComplete: onComplete
        }, void 0, false, {
            fileName: "[project]/src/components/ActivityStage.tsx",
            lineNumber: 13,
            columnNumber: 12
        }, this);
    }
    if (beat.type === "inspection" && beat.inspection) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InspectionActivity, {
            beat: beat,
            onComplete: onComplete
        }, void 0, false, {
            fileName: "[project]/src/components/ActivityStage.tsx",
            lineNumber: 16,
            columnNumber: 12
        }, this);
    }
    if (beat.type === "comparison" && beat.comparison) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ComparisonActivity, {
            beat: beat,
            onComplete: onComplete
        }, void 0, false, {
            fileName: "[project]/src/components/ActivityStage.tsx",
            lineNumber: 19,
            columnNumber: 12
        }, this);
    }
    if (beat.type === "assembly" && beat.assembly) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssemblyActivity, {
            beat: beat,
            onComplete: onComplete
        }, void 0, false, {
            fileName: "[project]/src/components/ActivityStage.tsx",
            lineNumber: 22,
            columnNumber: 12
        }, this);
    }
    return null;
}
_c = ActivityStage;
function SortingActivity(param) {
    let { beat, onComplete } = param;
    _s();
    const config = beat.sorting;
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sorted, setSorted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("先选一张纸，再放入合适的书匣。也可以直接拖动。");
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
            setMessage("纸上的格式不像".concat(category, "，再看一眼落款和行款。"));
            return;
        }
        setSorted((current)=>({
                ...current,
                [documentId]: category
            }));
        setSelected(null);
        setMessage("".concat(document.title, "已经收入").concat(category, "匣。"));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "activity",
        "aria-label": "文稿分类",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "今日书课"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            Object.keys(sorted).length,
                            "/",
                            config.required
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "activity-copy",
                children: beat.text
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "document-tray",
                children: remaining.map((document)=>{
                    var _document_mark;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        draggable: true,
                        onDragStart: (event)=>event.dataTransfer.setData("text/plain", document.id),
                        onClick: ()=>setSelected(document.id),
                        className: "document-slip ".concat(selected === document.id ? "is-selected" : "", " ").concat(document.anomalous ? "is-anomalous" : ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: (_document_mark = document.mark) !== null && _document_mark !== void 0 ? _document_mark : "无记"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: document.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: document.excerpt
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        ]
                    }, document.id, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "category-grid",
                children: config.categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "category-slot",
                        onClick: ()=>selected && place(selected, category),
                        onDragOver: (event)=>event.preventDefault(),
                        onDrop: (event)=>place(event.dataTransfer.getData("text/plain"), category),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: category
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: [
                                    Object.values(sorted).filter((value)=>value === category).length,
                                    " 件"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, category, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "work-feedback",
                "aria-live": "polite",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            normalDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "seal-action",
                type: "button",
                onClick: ()=>onComplete({
                        wage: 18
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "记"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this),
                    " 普通文稿已清"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 92,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityStage.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(SortingActivity, "S+ufOi2tRqDL2sxHp+zzK5HrJU4=");
_c1 = SortingActivity;
function InspectionActivity(param) {
    let { beat, onComplete } = param;
    _s1();
    const config = beat.inspection;
    const [found, setFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [detail, setDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("从纸、墨、字和藏印开始查验。");
    const done = found.length >= config.required;
    const inspect = (id, nextDetail)=>{
        setFound((current)=>current.includes(id) ? current : [
                ...current,
                id
            ]);
        setDetail(nextDetail);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "activity inspection",
        "aria-label": "残页查验",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "查验残页"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 111,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            found.length,
                            "/",
                            config.required
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 111,
                        columnNumber: 58
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "activity-copy",
                children: beat.text
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inspection-sheet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "folio-number",
                        children: "十三"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: config.document.excerpt
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    config.hotspots.map((spot, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "inspection-mark mark-".concat(index + 1, " ").concat(found.includes(spot.id) ? "is-found" : ""),
                            onClick: ()=>inspect(spot.id, spot.detail),
                            "aria-label": "查验".concat(spot.label),
                            children: index + 1
                        }, spot.id, false, {
                            fileName: "[project]/src/components/ActivityStage.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "work-feedback",
                "aria-live": "polite",
                children: detail
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "seal-action",
                type: "button",
                onClick: ()=>onComplete({
                        clues: config.hotspots.map((spot)=>spot.label),
                        archive: beat.unlockArchive,
                        paper: 1
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "录"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 127,
                        columnNumber: 182
                    }, this),
                    " 写入笺记"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 127,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityStage.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s1(InspectionActivity, "jv5V02VCRd+eVKu2afNe+Ur1iP4=");
_c2 = InspectionActivity;
function ComparisonActivity(param) {
    let { beat, onComplete } = param;
    _s2();
    const config = beat.comparison;
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("把两页并在一处，先看纸筋，再看运笔。");
    const [solved, setSolved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "activity",
        "aria-label": "文稿比对",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "两纸互校"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 138,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "比"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 138,
                        columnNumber: 58
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "activity-copy",
                children: config.question
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "comparison-spread",
                children: config.documents.map((document)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "comparison-document",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: document.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: document.excerpt
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 143,
                                columnNumber: 44
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "纸"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 22
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: document.paper
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ActivityStage.tsx",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "墨"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 68
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: document.ink
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 78
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ActivityStage.tsx",
                                        lineNumber: 144,
                                        columnNumber: 63
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "字"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 112
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: document.handwriting
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityStage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 122
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ActivityStage.tsx",
                                        lineNumber: 144,
                                        columnNumber: 107
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ActivityStage.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this)
                        ]
                    }, document.id, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "comparison-options",
                children: config.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setFeedback(option.feedback);
                            setSolved(Boolean(option.correct));
                        },
                        children: option.text
                    }, option.id, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "work-feedback",
                children: feedback
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            solved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "seal-action",
                type: "button",
                onClick: ()=>onComplete({
                        clues: [
                            "残页同源"
                        ]
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "合"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 154,
                        columnNumber: 112
                    }, this),
                    " 收下判断"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 154,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityStage.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s2(ComparisonActivity, "iQDUqY29GemMeuXCQFrELoUf7wk=");
_c3 = ComparisonActivity;
function AssemblyActivity(param) {
    let { beat, onComplete } = param;
    _s3();
    const config = beat.assembly;
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("依照撕口与文意，把三片残纸接回原序。");
    const available = config.fragments.filter((fragment)=>!order.includes(fragment.id));
    const correct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssemblyActivity.useMemo[correct]": ()=>order.length === config.fragments.length && order.every({
                "AssemblyActivity.useMemo[correct]": (id, index)=>{
                    var _config_fragments_find;
                    return ((_config_fragments_find = config.fragments.find({
                        "AssemblyActivity.useMemo[correct]": (fragment)=>fragment.id === id
                    }["AssemblyActivity.useMemo[correct]"])) === null || _config_fragments_find === void 0 ? void 0 : _config_fragments_find.order) === index;
                }
            }["AssemblyActivity.useMemo[correct]"])
    }["AssemblyActivity.useMemo[correct]"], [
        config.fragments,
        order
    ]);
    const add = (id)=>setOrder((current)=>current.includes(id) ? current : [
                ...current,
                id
            ]);
    const check = ()=>{
        if (correct) setMessage("纸口相合。残句终于连成了一段话。");
        else {
            setMessage("文气在中间断了。再按撕口重排。 ");
            setOrder([]);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "activity",
        "aria-label": "残页拼接",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "缀合残纸"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 172,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            order.length,
                            "/",
                            config.fragments.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 172,
                        columnNumber: 58
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "activity-copy",
                children: beat.text
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "assembly-line",
                children: [
                    order.map((id)=>{
                        const fragment = config.fragments.find((item)=>item.id === id);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setOrder((current)=>current.filter((item)=>item !== id)),
                            children: fragment.text
                        }, id, false, {
                            fileName: "[project]/src/components/ActivityStage.tsx",
                            lineNumber: 175,
                            columnNumber: 104
                        }, this);
                    }),
                    order.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "将残片放到这里"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 176,
                        columnNumber: 32
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fragment-tray",
                children: available.map((fragment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        draggable: true,
                        onClick: ()=>add(fragment.id),
                        children: fragment.text
                    }, fragment.id, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 179,
                        columnNumber: 38
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "work-feedback",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            !correct && order.length === config.fragments.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "ink-action",
                type: "button",
                onClick: check,
                children: "核对次序"
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 182,
                columnNumber: 64
            }, this),
            correct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "seal-action",
                type: "button",
                onClick: ()=>onComplete({
                        clues: [
                            "西门残句"
                        ],
                        archive: beat.unlockArchive
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "缀"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityStage.tsx",
                        lineNumber: 183,
                        columnNumber: 142
                    }, this),
                    " 收入残卷"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityStage.tsx",
                lineNumber: 183,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityStage.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_s3(AssemblyActivity, "kDjAh8WW7Wiz0k13Uoh2naurT4g=");
_c4 = AssemblyActivity;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ActivityStage");
__turbopack_context__.k.register(_c1, "SortingActivity");
__turbopack_context__.k.register(_c2, "InspectionActivity");
__turbopack_context__.k.register(_c3, "ComparisonActivity");
__turbopack_context__.k.register(_c4, "AssemblyActivity");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BookShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function BookShell(param) {
    let { left, right, chapter, progress } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "reading-desk",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "book-ribbons",
                "aria-label": "书内导航",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        title: "合卷",
                        children: "卷首"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BookShell.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/archive",
                        title: "查看史料",
                        children: "笺记"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BookShell.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "open-book",
                "aria-label": "摊开的线装书",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "book-page book-page-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "book-rule",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            left,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "page-folio",
                                children: chapter !== null && chapter !== void 0 ? chapter : "佣书"
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "book-gutter",
                        "aria-hidden": true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 25,
                                columnNumber: 50
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 25,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 25,
                                columnNumber: 60
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "book-page book-page-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "book-rule",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/BookShell.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            right,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "page-folio",
                                children: progress !== null && progress !== void 0 ? progress : "听雨书坊"
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
_c = BookShell;
var _c;
__turbopack_context__.k.register(_c, "BookShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ChoiceButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChoiceButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ChoiceButton(param) {
    let { text, index, onSelect } = param;
    const labels = [
        "甲",
        "乙",
        "丙",
        "丁"
    ];
    var _labels_index;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onSelect,
        className: "ink-choice",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: (_labels_index = labels[index]) !== null && _labels_index !== void 0 ? _labels_index : index + 1
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
_c = ChoiceButton;
var _c;
__turbopack_context__.k.register(_c, "ChoiceButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ManuscriptPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ManuscriptPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChoiceButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChoiceButton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ManuscriptPage(param) {
    let { speaker, text, isTitle, canTurn, onTurn, choices, onChoice, footer } = param;
    _s();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [leaving, setLeaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const busy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManuscriptPage.useEffect": ()=>{
            const timer = window.setTimeout({
                "ManuscriptPage.useEffect.timer": ()=>setVisible(true)
            }["ManuscriptPage.useEffect.timer"], 40);
            return ({
                "ManuscriptPage.useEffect": ()=>window.clearTimeout(timer)
            })["ManuscriptPage.useEffect"];
        }
    }["ManuscriptPage.useEffect"], []);
    const transition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManuscriptPage.useCallback[transition]": (done)=>{
            if (busy.current) return;
            busy.current = true;
            setLeaving(true);
            window.setTimeout({
                "ManuscriptPage.useCallback[transition]": ()=>done === null || done === void 0 ? void 0 : done()
            }["ManuscriptPage.useCallback[transition]"], 230);
        }
    }["ManuscriptPage.useCallback[transition]"], []);
    const handleClick = (event)=>{
        if (event.target.closest("button, a") || !canTurn || choices) return;
        transition(onTurn);
    };
    const speakerKind = speaker === "我" ? "self" : speaker === "旁白" ? "narrator" : speaker ? "other" : "plain";
    const speakerLabel = speaker === "旁白" ? "记" : speaker;
    const paragraphs = text.split("\n").map((line, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: line || "\u00a0"
        }, "".concat(index, "-").concat(line), false, {
            fileName: "[project]/src/components/ManuscriptPage.tsx",
            lineNumber: 37,
            columnNumber: 60
        }, this));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "narrative-page ".concat(visible ? "is-visible" : "", " ").concat(leaving ? "is-leaving" : "", " ").concat(canTurn ? "is-clickable" : ""),
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
            isTitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chapter-leaf",
                children: paragraphs
            }, void 0, false, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "dialogue-block dialogue-block--".concat(speakerKind),
                children: [
                    speakerLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "speaker-rail",
                        "aria-label": "说话者：".concat(speaker),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "speaker-label",
                                children: speakerLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/ManuscriptPage.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "speaker-line",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/ManuscriptPage.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "narrative-copy",
                        children: paragraphs
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this),
            choices && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "choice-list",
                children: choices.map((choice, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChoiceButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        text: choice.text,
                        index: index,
                        onSelect: ()=>transition(()=>onChoice === null || onChoice === void 0 ? void 0 : onChoice(index))
                    }, choice.id, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 61,
                        columnNumber: 80
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 61,
                columnNumber: 19
            }, this),
            canTurn && !choices && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "continue-mark",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 62,
                        columnNumber: 74
                    }, this),
                    "续页"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 62,
                columnNumber: 31
            }, this),
            footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "narrative-footer",
                children: footer
            }, void 0, false, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 63,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ManuscriptPage.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(ManuscriptPage, "iJTPCxRl4LeBxKj0ANqobesvmGQ=");
_c = ManuscriptPage;
var _c;
__turbopack_context__.k.register(_c, "ManuscriptPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/game.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/save.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/game.ts [app-client] (ecmascript)");
;
function loadSave() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAVE_KEY"]);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}
function writeSave(data) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAVE_KEY"], JSON.stringify(data));
}
function clearSave() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAVE_KEY"]);
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
            var _next_key;
            next[key] = ((_next_key = next[key]) !== null && _next_key !== void 0 ? _next_key : 0) + delta;
        }
    }
    return next;
}
function createInitialSave(chapterId) {
    return {
        chapterId,
        beatIndex: 0,
        variables: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VARIABLES"]
        },
        unlockedArchive: [],
        unlockedCharacters: [],
        completedActivities: [],
        clues: [],
        savedAt: Date.now()
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/story/chapter01.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"id\":\"chapter01\",\"title\":\"第一章\",\"subtitle\":\"第十三页\",\"beats\":[{\"id\":\"opening-01\",\"type\":\"title\",\"text\":\"康熙九年，广州。\\n雨从昨夜落到今日，城西的石路一直没有干。\"},{\"id\":\"opening-02\",\"speaker\":\"旁白\",\"text\":\"天才蒙蒙亮，我便推开听雨书坊的木门。门轴受了潮，发出一声极长的呻吟。柜上摆着昨夜没收进去的线香，湿气把香灰压成了一道灰白的弧。\"},{\"id\":\"opening-03\",\"speaker\":\"旁白\",\"text\":\"我在这里做了七个月的佣书。替客人誊抄诗稿，给书坊修补残卷，也把收来的旧纸分门别类。写得快，一日能挣二十文；碰上有钱而心急的客人，也许再添一碗热汤。\"},{\"id\":\"opening-04\",\"speaker\":\"老板\",\"text\":\"来得正好。后院三只箱子，天黑前清出来。可卖的入匣，能作衬纸的另放，霉烂得救不回来的等我看过再说。\"},{\"id\":\"opening-05\",\"speaker\":\"旁白\",\"text\":\"老板姓沈。街坊都叫他沈掌柜，我却很少听见有人喊他的名字。他正在磨一方旧砚，袖口沾着墨，案边放着一封折得极窄的信。信封上没有投递人的姓名。\"},{\"id\":\"opening-choice\",\"type\":\"choice\",\"text\":\"我先问哪一件事？\",\"choices\":[{\"id\":\"ask-wage\",\"text\":\"三箱都在今日清完，工钱怎么算？\",\"effects\":{\"wage\":2},\"goto\":\"opening-wage\"},{\"id\":\"ask-source\",\"text\":\"这些旧纸从哪里收来的？\",\"effects\":{\"trust\":1},\"goto\":\"opening-source\"}]},{\"id\":\"opening-wage\",\"speaker\":\"老板\",\"text\":\"底钱二十文。分得干净，再添十文。你若把有字的东西当废纸裁了，便从下月工钱里扣。\",\"next\":\"opening-06\"},{\"id\":\"opening-source\",\"speaker\":\"老板\",\"text\":\"城西一户人家清出来的。主人新近过世，后人只要屋子，不要纸。你做你的活，莫替别人盘家底。\",\"next\":\"opening-06\"},{\"id\":\"opening-06\",\"speaker\":\"旁白\",\"text\":\"三只杉木箱依次排在后院。第一箱有淡淡的樟脑味，第二箱压着半块青砖，第三箱的铜搭扣已经断了，箱盖上却留着一道刚擦过的手印。\"},{\"id\":\"opening-07\",\"speaker\":\"旁白\",\"text\":\"箱子旁放着一张收条，写的是“旧书旧纸三箱，共重一百八十七斤”。纸角盖了书坊的印，却没有卖主画押。沈掌柜做生意一向谨慎，哪怕收一捆废纸也要留下姓名。这是我第一次看见一张没有卖主的收条。\"},{\"id\":\"opening-08\",\"speaker\":\"旁白\",\"text\":\"我问小满昨晚谁送来的。他说两名脚夫都戴着斗笠，箱子落地便走，掌柜追到巷口才补给他们脚钱。雨太密，他没看清脸，只记得其中一人搬箱时露出手腕，腕上有一道被绳索磨出的旧疤。\"},{\"id\":\"sorting-01\",\"type\":\"sorting\",\"text\":\"先整理第一箱。看题名、行款与落款，把六份普通文稿收入合适的书匣。那张没有题名的纸可以暂留案上。\",\"sorting\":{\"required\":6,\"categories\":[\"家书\",\"契约\",\"佛经\",\"诗稿\",\"账本\",\"杂纸\"],\"documents\":[{\"id\":\"letter\",\"title\":\"寄长兄书\",\"excerpt\":\"母病已安，勿以归舟为念……\",\"category\":\"家书\",\"paper\":\"本地竹纸\",\"ink\":\"松烟墨\",\"handwriting\":\"行楷\",\"mark\":\"弟百拜\"},{\"id\":\"contract\",\"title\":\"赁屋文契\",\"excerpt\":\"今凭中见，赁西濠屋一所……\",\"category\":\"契约\",\"paper\":\"厚皮纸\",\"ink\":\"浓墨\",\"handwriting\":\"楷书\",\"mark\":\"画押\"},{\"id\":\"sutra\",\"title\":\"金刚经残抄\",\"excerpt\":\"应无所住，而生其心……\",\"category\":\"佛经\",\"paper\":\"黄麻纸\",\"ink\":\"旧墨\",\"handwriting\":\"馆阁小楷\",\"mark\":\"佛\"},{\"id\":\"poem\",\"title\":\"珠江夜泊\",\"excerpt\":\"潮落孤城外，灯寒客棹边……\",\"category\":\"诗稿\",\"paper\":\"白棉纸\",\"ink\":\"淡墨\",\"handwriting\":\"草书\",\"mark\":\"未署\"},{\"id\":\"ledger\",\"title\":\"药材流水\",\"excerpt\":\"陈皮二斤，苏木四两，银三钱……\",\"category\":\"账本\",\"paper\":\"毛边纸\",\"ink\":\"杂墨\",\"handwriting\":\"账房体\",\"mark\":\"九月\"},{\"id\":\"wrapper\",\"title\":\"旧书包纸\",\"excerpt\":\"仅余半行店号与一处油斑。\",\"category\":\"杂纸\",\"paper\":\"粗竹纸\",\"ink\":\"褪墨\",\"handwriting\":\"印字\",\"mark\":\"残\"},{\"id\":\"folio13\",\"title\":\"无题残页\",\"excerpt\":\"……自西门入者，无问老幼。余伏梁上，不敢出声，亦不敢尽记……\",\"paper\":\"薄竹纸，帘纹细密\",\"ink\":\"墨色发青\",\"handwriting\":\"急促小楷\",\"mark\":\"十三\",\"anomalous\":true,\"archiveId\":\"folio-13\"}]}},{\"id\":\"work-daily-01\",\"speaker\":\"旁白\",\"text\":\"第一箱里最值钱的并非诗稿，而是那张赁屋文契。纸虽普通，年月、四至、中人、租银都写得齐整，末尾三处画押也没有被水晕开。若立契的两家还有后人在，这一页便能抵得上半箱无名诗。佣书看纸，先看它还能替谁说话。\"},{\"id\":\"work-daily-02\",\"speaker\":\"旁白\",\"text\":\"寄长兄的家书只写了半面。写信人说母亲病已安稳，叫兄长不要急着归舟；翻到背后，却又添了一行极小的字，请他若能回来，务必从后门进家。两句话的墨色相差数月，第一句话用于安慰，第二句话才像真正想说的事。\"},{\"id\":\"work-daily-03\",\"speaker\":\"旁白\",\"text\":\"药材流水里夹着一片干枯的榕叶。账房把“苏木”写了又改，原来的数目被墨团遮住。我把纸迎着窗光看，刮去的字仍在纸背留下浅痕。沈掌柜曾说，字可以涂掉，笔尖压进纸里的力气却很难收回。\"},{\"id\":\"work-daily-04\",\"speaker\":\"小满\",\"text\":\"师兄，旧纸里若夹着家书，也要拿去卖吗？我上回看见有人在城南买了一包旧账，回去拿它糊窗。纸上的人要是还活着，隔着窗洞看见自己的话，会不会来讨？\"},{\"id\":\"work-daily-05\",\"speaker\":\"我\",\"text\":\"纸到了书坊，先问用处，再问价钱。有人来讨，拿得出凭据，掌柜自然会还。无人来讨，我们至少替它留一个名字。若连名字都没有，就只能看它自己留下了什么。\"},{\"id\":\"work-daily-06\",\"speaker\":\"旁白\",\"text\":\"小满似懂非懂地把佛经收入黄签匣。他才十三岁，只记得广州如今的城门什么时候开，巡夜的更夫从哪条巷子经过。二十年前的事离他很远，远得像旧纸上的前朝年号；可对沈掌柜这样的人，那些年份似乎从未真正过去。\"},{\"id\":\"work-01\",\"speaker\":\"旁白\",\"text\":\"寻常旧纸各有自己的规矩。家书先问收信人，契约先看年月和画押，账簿纵然只剩半页，也能从银钱的列法认出来。真正麻烦的，往往是没有开头、没有落款，也没人肯认领的东西。\"},{\"id\":\"work-02\",\"speaker\":\"旁白\",\"text\":\"那张无题纸比别的纸薄，边缘却没有虫咬。右下角写着一个很小的“十三”，像是页码。它原来应当夹在一册书里，前后至少还有十二页。可我把第一箱翻到底，只找到它一张。\"},{\"id\":\"work-03\",\"speaker\":\"小满\",\"text\":\"前头有人找掌柜。他不买书，只问昨夜是不是收了三箱旧纸。\"},{\"id\":\"work-04\",\"speaker\":\"旁白\",\"text\":\"说话的是书坊的小学徒小满。他抱着一摞刚裁好的纸，雨水顺着发梢滴在肩上。沈掌柜没有抬头，只让他把门闩扣上，说今日歇得早。\"},{\"id\":\"work-choice\",\"type\":\"choice\",\"text\":\"那张无题残页还压在我手下。\",\"choices\":[{\"id\":\"show-now\",\"text\":\"立刻把残页交给沈掌柜。\",\"effects\":{\"trust\":2,\"trust_yimin\":1},\"goto\":\"work-show\"},{\"id\":\"inspect-first\",\"text\":\"先自行看清纸墨，再向他开口。\",\"effects\":{\"paper\":1},\"goto\":\"work-inspect\"}]},{\"id\":\"work-show\",\"speaker\":\"旁白\",\"text\":\"我把残页平放在他的砚旁。他磨墨的手停了一瞬，墨锭仍抵着砚堂，黑色的水纹却慢慢散开。他先看页码，又把纸翻到背面，像是在寻找一个早已知道位置的记号。他让我把灯移近，逐处说清自己看见的纸墨特征。\",\"next\":\"inspect-01\"},{\"id\":\"work-inspect\",\"speaker\":\"旁白\",\"text\":\"我没有立刻叫他。佣书靠眼睛吃饭，一张纸值不值钱，有时只差一个针眼般的印记。我把灯移近，先从纸筋、墨色和笔势看起。\",\"next\":\"inspect-01\"},{\"id\":\"inspect-01\",\"type\":\"inspection\",\"text\":\"残页受过潮，表面留下许多假线索。找出三处真正有用的特征。\",\"unlockArchive\":[\"folio-13\"],\"inspection\":{\"required\":3,\"document\":{\"id\":\"folio13\",\"title\":\"第十三页\",\"excerpt\":\"……自西门入者，无问老幼。余伏梁上，不敢出声。火光至三更稍歇，闻街中有人以乡音相呼，旋即无声。余不敢尽记。\",\"paper\":\"薄竹纸，帘纹细密\",\"ink\":\"墨色发青\",\"handwriting\":\"急促小楷\",\"mark\":\"十三\",\"archiveId\":\"folio-13\",\"anomalous\":true},\"hotspots\":[{\"id\":\"paper\",\"label\":\"细密帘纹\",\"detail\":\"纸背的竹帘纹很细，广州常见的粗竹纸没有这种做法，纸料可能来自外埠。\"},{\"id\":\"ink\",\"label\":\"青灰旧墨\",\"detail\":\"墨色微微发青，落纸已有些年月；后添的“十三”却更黑，页码与正文未必同时写成。\"},{\"id\":\"seal\",\"label\":\"半枚朱印\",\"detail\":\"左边撕口藏着半道朱线。若另一半还在，应该能拼出一枚藏书印。\"},{\"id\":\"fold\",\"label\":\"反向折痕\",\"detail\":\"折痕穿过字行，说明它曾被人折小藏起，并非一直装订在册。\"}]}},{\"id\":\"boss-01\",\"speaker\":\"老板\",\"text\":\"这页纸，你看过了？\"},{\"id\":\"boss-02\",\"speaker\":\"旁白\",\"text\":\"他问得很轻。我跟他做了七个月的事，见过他和欠账的举人争钱，也见过差役上门查禁书。他从来没有像此刻这样，把一句寻常问话说得像一道门槛。\"},{\"id\":\"boss-03\",\"speaker\":\"老板\",\"text\":\"有些纸看过便算了。有些纸看过，往后便要记住自己对谁说过。你若还想在广州安稳吃这碗饭，今日见到的字先留在肚子里。\"},{\"id\":\"boss-04\",\"speaker\":\"旁白\",\"text\":\"他说完，将残页夹进一册空账簿。可他的手指压在页角上，迟迟没有合拢。我看见账簿封皮内侧写着一行极小的字：某年某月，收纸十二页。如今这里只有第十三页。\"},{\"id\":\"boss-05\",\"speaker\":\"旁白\",\"text\":\"沈掌柜察觉我的目光，立即合上账簿。他没有斥责，只让我去烧一壶水。后院水缸快见底了，雨水却从瓦沟白白流走。我站在檐下接水时，看见他把第十三页举到窗前，随后从衣襟里取出一张更小的纸条核对。\"},{\"id\":\"boss-06\",\"speaker\":\"旁白\",\"text\":\"那张纸条只露出一角，上面画着几道横线，像一本书缺失页次的清单。沈掌柜对着十三这个数目看了很久，最后用朱笔点了一点。那一点极红，落在陈年的灰墨旁边，仿佛今天才有人承认这页纸确实存在。\"},{\"id\":\"second-box-01\",\"speaker\":\"老板\",\"text\":\"第一箱清完便去吃饭。第二箱先别动。\"},{\"id\":\"second-box-02\",\"speaker\":\"旁白\",\"text\":\"他越是这样说，我越注意到第二箱。压箱的青砖并不是为了防潮。砖下垫着一片旧封套，封套被人沿边裁开，露出与第十三页相同的细密帘纹。\"},{\"id\":\"second-box-03\",\"speaker\":\"旁白\",\"text\":\"第二箱的表层全是无关紧要的蒙学书：《千字文》三册，《幼学琼林》两册，还有一本被孩童画满小人的《论语》。它们排列得过分整齐，像是后来才铺上去的。真正从旧宅搬来的书不会这样干净，灰尘也不会只停在箱角。\"},{\"id\":\"second-box-04\",\"speaker\":\"旁白\",\"text\":\"我把青砖挪开时，砖底粘着一缕蓝线。线头打的是装订书册用的双结，颜色与第十三页撕口处残留的纤维相同。有人拆过那册书，又把普通课本一层层盖回去，希望下一个开箱的人只看见孩子读过的旧书。\"},{\"id\":\"comparison-01\",\"type\":\"comparison\",\"text\":\"我趁沈掌柜去前堂时取出封套内的残纸。两张纸相隔多年重新并在案上。\",\"comparison\":{\"question\":\"这两张残纸来自同一份文稿吗？选择最可靠的判断。\",\"documents\":[{\"id\":\"folio13a\",\"title\":\"第十三页\",\"excerpt\":\"……自西门入者，无问老幼……\",\"paper\":\"细帘纹薄竹纸\",\"ink\":\"青灰\",\"handwriting\":\"右斜小楷\"},{\"id\":\"folio-edge\",\"title\":\"封套残片\",\"excerpt\":\"……门外积尸，雨至而沟赤……\",\"paper\":\"细帘纹薄竹纸\",\"ink\":\"青灰\",\"handwriting\":\"右斜小楷\"}],\"options\":[{\"id\":\"same-content\",\"text\":\"都写到城门，因此同源。\",\"feedback\":\"内容相近只能说明题材相近，无法证明出自同一册。\"},{\"id\":\"same-material\",\"text\":\"纸帘、墨色和转折笔势三处相合。\",\"correct\":true,\"feedback\":\"三种独立特征相互印证，可以暂定为同一手稿。\"},{\"id\":\"different-number\",\"text\":\"一页有页码，一页没有，因此不同源。\",\"feedback\":\"页码可能后添，也可能刚好落在残缺部分，不能单独下结论。\"}]}},{\"id\":\"discovery-01\",\"speaker\":\"旁白\",\"text\":\"封套不只包着一片纸。夹层里还有两片指宽的碎纸，一片留着“西门”二字，一片只剩半个“声”字。撕口新旧不一，像有人曾将完整的一页拆开，分藏在三个地方。\"},{\"id\":\"discovery-02\",\"speaker\":\"旁白\",\"text\":\"我把两片碎纸放在掌心，忽然闻到极淡的药味。不是防虫的芸香，也不是书坊常用的樟脑，更像医馆里煎过的黄柏。纸缝中沾着一粒已经发黑的蜡，说明它曾被封进某种容器，而非随手夹在书页之间。\"},{\"id\":\"discovery-03\",\"speaker\":\"旁白\",\"text\":\"其中一片背后另有三个拉丁字母。我只在澳门来的历书上见过类似文字，无法读出意思。字母写得端正，墨却与正文一致。写下它的人或许会两种文字，也可能有人在手稿流转途中留下了自己的记号。\"},{\"id\":\"assembly-01\",\"type\":\"assembly\",\"text\":\"碎纸的边缘仍能辨认。按撕口和句意排列三片残文。\",\"unlockArchive\":[\"west-gate-fragment\"],\"assembly\":{\"fragments\":[{\"id\":\"fragment-a\",\"text\":\"自西门入者，\",\"order\":0},{\"id\":\"fragment-b\",\"text\":\"无问老幼。余伏梁上，\",\"order\":1},{\"id\":\"fragment-c\",\"text\":\"不敢出声。\",\"order\":2}]}},{\"id\":\"afternoon-01\",\"speaker\":\"旁白\",\"text\":\"残句接上的时候，前堂忽然传来门环撞木的声音。一下，两下。来人敲得很慢，仿佛知道店里的人一定听得见，也一定会开门。\"},{\"id\":\"visitor-01\",\"speaker\":\"陌生客\",\"text\":\"听说贵坊昨夜收了些旧纸。我家主人寻一部先人诗稿，愿出三倍市价。纸张很薄，页脚有数目。若已拆散，单页也收。\"},{\"id\":\"visitor-02\",\"speaker\":\"老板\",\"text\":\"听雨坊只收经史旧刻，不替人寻家稿。客官从哪里听来的消息，便回哪里再问。\"},{\"id\":\"visitor-03\",\"speaker\":\"旁白\",\"text\":\"门缝下露出一双干净的皂靴。广州连日大雨，从西关走到这里不可能一尘不沾。那人没有争辩，只将一枚崭新的制钱推过门槛，说改日再来。\"},{\"id\":\"visitor-04\",\"speaker\":\"旁白\",\"text\":\"制钱落地时声音很脆，是今年刚铸的新钱。钱背朝上，满文一侧被人用刀划了一道细痕。小满弯腰想捡，沈掌柜喝住了他，随后用夹炭的火箸把钱拨进空茶盏，连同茶盏一起锁进柜中。\"},{\"id\":\"visitor-05\",\"speaker\":\"小满\",\"text\":\"他若真寻先人诗稿，为什么连书名都不说？城里每天卖出的旧纸那么多，他又怎么知道三只箱子刚好到了我们这里？昨晚替人送箱子的脚夫，明明是掌柜亲自从后巷领进来的。\"},{\"id\":\"visitor-06\",\"speaker\":\"老板\",\"text\":\"你今日什么也没看见。把前门的水擦干净，再去看看后门有没有人。沿墙根走，别站在窗下往外探。若有人问店里几个人，就说我午后去了河南，没有回来。\"},{\"id\":\"visitor-choice\",\"type\":\"choice\",\"text\":\"陌生客离开后，沈掌柜回到后院。拼好的残纸仍在案上。\",\"choices\":[{\"id\":\"admit\",\"text\":\"承认自己动过第二箱，并交出拼好的残纸。\",\"effects\":{\"trust\":2,\"trust_yimin\":1},\"goto\":\"visitor-admit\"},{\"id\":\"hide\",\"text\":\"先收起最小的一片，只说发现了封套。\",\"effects\":{\"paper\":1,\"trust\":-1},\"goto\":\"visitor-hide\"}]},{\"id\":\"visitor-admit\",\"speaker\":\"老板\",\"text\":\"你手快，眼也不坏。只是从今日起，动一张纸之前要先想清楚：它原来藏了二十年，凭什么偏在你手里重见天日？\",\"next\":\"evening-01\"},{\"id\":\"visitor-hide\",\"speaker\":\"旁白\",\"text\":\"我说话时，他一直看着我的右袖。那片碎纸贴着腕骨，薄得几乎没有重量。我却第一次知道，一张纸也能让人的手臂发沉。\",\"next\":\"evening-01\"},{\"id\":\"evening-01\",\"speaker\":\"旁白\",\"text\":\"雨到黄昏终于小了。小满把门板一块块装上，街市的声音也随之变窄。沈掌柜重新点灯，把三只箱子搬进内室，又从柜底取出一本从未让我碰过的账册。\"},{\"id\":\"evening-02\",\"speaker\":\"旁白\",\"text\":\"账册没有店号。每一页只记日期、纸数和一个极简的代称：山客、旧史、海上人、白云僧。二十年前的某一页被整齐割去，只剩装订处一线毛边。\"},{\"id\":\"evening-ledger-01\",\"speaker\":\"旁白\",\"text\":\"我从那些代称旁看见不同颜色的点。黑点表示已经收回，朱点表示尚在人手，空圈表示持有人已经亡故。少数名字后面同时有朱点和空圈，沈掌柜说，那代表人虽然死了，纸却仍在走动。\"},{\"id\":\"evening-ledger-02\",\"speaker\":\"旁白\",\"text\":\"最早一笔记在顺治七年冬，只有“十二页，散失”五个字。此后每隔两三年便添一笔：一页入寺，一页随商船出海，两页焚毁，一页见于肇庆。二十年过去，清单仍没有合拢，今天找到的第十三页甚至不在原数之内。\"},{\"id\":\"evening-ledger-03\",\"speaker\":\"我\",\"text\":\"若原本只记十二页，今天这一页又为什么编号十三？是清单错了，还是有人后来补写过？\"},{\"id\":\"evening-ledger-04\",\"speaker\":\"老板\",\"text\":\"所以那位旧友才要在闭眼前见到原稿。他知道当年的事，也知道这份文字经过谁的手，却从未亲眼看过完整一册。人能记错，清单能抄错，页码也能伪造。我们只能把各处留下的痕迹先收回来。\"},{\"id\":\"evening-03\",\"speaker\":\"老板\",\"text\":\"这些箱子属于一位旧友。他病得很重，想在闭眼前把散在外面的纸找齐。今日门外那个人也在找，但他替谁办事，我还不知道。\"},{\"id\":\"evening-04\",\"speaker\":\"老板\",\"text\":\"你可以到此为止。今日工钱照三十文算，明早来抄《通鉴》。你若愿意继续，明日卯时随我去西关收一批遗书。去了以后，看见什么、听见什么，都不能随便问姓名。\"},{\"id\":\"final-choice\",\"type\":\"choice\",\"text\":\"灯花爆了一声。门外的雨水沿石阶流过，那枚陌生人留下的制钱还躺在门槛边。\",\"choices\":[{\"id\":\"accept\",\"text\":\"收下今日工钱，答应明日同行。\",\"effects\":{\"trust\":2,\"wage\":10},\"goto\":\"ending-accept\"},{\"id\":\"ask-night\",\"text\":\"先问清楚：今晚这些箱子放在哪里？\",\"effects\":{\"trust\":1,\"paper\":1},\"goto\":\"ending-night\"}]},{\"id\":\"ending-accept\",\"speaker\":\"我\",\"text\":\"卯时以前，我会到。\",\"next\":\"ending-01\"},{\"id\":\"ending-night\",\"speaker\":\"老板\",\"text\":\"问得对。今晚你别回前街，从后门走。箱子留在这里，我留下守。若明早门上的封条破了，你便当从未见过我。\",\"next\":\"ending-01\"},{\"id\":\"ending-01\",\"speaker\":\"旁白\",\"text\":\"我把三十文钱收入袖中。沈掌柜递给我一张空白题签，让我在上面写明日要收的书名。我提笔等了很久，他却只说了两个字：遗书。\"},{\"id\":\"ending-detail-01\",\"speaker\":\"旁白\",\"text\":\"“遗书”可以是死者留下的文字，也可以是前代散失的著述。我不知道他取哪一层意思，便把两个字写得很慢。第一笔落下时，内室的灯焰忽然向门边偏去，像有一股极细的风从门缝钻进来。\"},{\"id\":\"ending-detail-02\",\"speaker\":\"老板\",\"text\":\"明日见到那户人家，不要先看书架，要先看地上的灰。书被人拿走，架上会空；书被人换过，灰里会留下新脚印。也不要问主人从前做过什么，只问这些纸最后一次被谁翻开。\"},{\"id\":\"ending-detail-03\",\"speaker\":\"旁白\",\"text\":\"他把账册重新锁好，钥匙却没有放回腰间，而是塞进一只待售的砚盒。我忽然明白，门外那位客人若今晚再来，沈掌柜并不相信一道木门能挡住他。他只希望来人即使进得来，也找不到真正该拿的东西。\"},{\"id\":\"ending-detail-04\",\"speaker\":\"旁白\",\"text\":\"小满从后门探头回来，说巷口停着一顶没有灯的青布轿。轿夫蹲在檐下避雨，已经换过两拨，轿子却一直没动。沈掌柜让他今晚睡在邻家的印坊，又嘱咐他不要告诉任何人我明日要去西关。\"},{\"id\":\"ending-detail-05\",\"speaker\":\"旁白\",\"text\":\"我在后门换上蓑衣时，发现自己的旧伞被人挪过位置。伞柄仍朝着墙，伞尖滴下的水痕却绕到了门边。有人进来以后碰过它，又尽量照原样放了回去。鞋柜下还粘着一点浅灰色的泥，与门外那双干净皂靴的鞋底颜色相同。那位客人并没有一直站在前门。\"},{\"id\":\"ending-detail-06\",\"speaker\":\"老板\",\"text\":\"明日若我没有开门，你便去西关的长寿巷，找门楣上刻着三朵梅花的人家。只说听雨坊来收书，不要提我的姓，也不要带今日的题签。有人若问你第十三页，便说它已经被我投进火里。\"},{\"id\":\"ending-02\",\"speaker\":\"旁白\",\"text\":\"离开书坊时，街上已经没有行人。我走出十余步，听见身后传来极轻的一声木响。有人从里面拨动了门闩。沈掌柜明明还站在后院的灯下。\"},{\"id\":\"ending-03\",\"speaker\":\"旁白\",\"text\":\"我没有回头。袖中那张记着“第十三页”的笺纸被雨气浸软，半枚朱印的形状却越来越清楚。它像一个尚未说出口的姓，也像一扇刚被推开的门。\"},{\"id\":\"ending-title\",\"type\":\"title\",\"text\":\"第一章 · 第十三页\\n完\\n\\n明日卯时，西关见。\"}]}"));}),
"[project]/src/lib/story.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/game/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GamePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ActivityStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ActivityStage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BookShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BookShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManuscriptPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ManuscriptPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/save.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$story$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/story.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    var _data_variables_paper, _data_variables_trust, _data_variables_wage, _data_variables_trust_yimin, _data_variables_trust_qing, _data_variables_trust_priest, _data_unlockedArchive, _data_unlockedCharacters, _data_completedActivities, _data_clues;
    return {
        ...data,
        variables: {
            paper: (_data_variables_paper = data.variables.paper) !== null && _data_variables_paper !== void 0 ? _data_variables_paper : 0,
            trust: (_data_variables_trust = data.variables.trust) !== null && _data_variables_trust !== void 0 ? _data_variables_trust : 0,
            wage: (_data_variables_wage = data.variables.wage) !== null && _data_variables_wage !== void 0 ? _data_variables_wage : 0,
            trust_yimin: (_data_variables_trust_yimin = data.variables.trust_yimin) !== null && _data_variables_trust_yimin !== void 0 ? _data_variables_trust_yimin : 0,
            trust_qing: (_data_variables_trust_qing = data.variables.trust_qing) !== null && _data_variables_trust_qing !== void 0 ? _data_variables_trust_qing : 0,
            trust_priest: (_data_variables_trust_priest = data.variables.trust_priest) !== null && _data_variables_trust_priest !== void 0 ? _data_variables_trust_priest : 0
        },
        unlockedArchive: (_data_unlockedArchive = data.unlockedArchive) !== null && _data_unlockedArchive !== void 0 ? _data_unlockedArchive : [],
        unlockedCharacters: (_data_unlockedCharacters = data.unlockedCharacters) !== null && _data_unlockedCharacters !== void 0 ? _data_unlockedCharacters : [],
        completedActivities: (_data_completedActivities = data.completedActivities) !== null && _data_completedActivities !== void 0 ? _data_completedActivities : [],
        clues: (_data_clues = data.clues) !== null && _data_clues !== void 0 ? _data_clues : []
    };
}
function GameContent() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    var _searchParams_get;
    const mode = (_searchParams_get = searchParams.get("mode")) !== null && _searchParams_get !== void 0 ? _searchParams_get : "new";
    const chapterId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$story$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirstChapterId"])();
    const chapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$story$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChapter"])(chapterId);
    const [save, setSave] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [beatId, setBeatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameContent.useEffect": ()=>{
            var _chapter_beats_initial_beatIndex;
            if (!chapter) return;
            const existing = mode === "continue" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadSave"])() : null;
            const initial = (existing === null || existing === void 0 ? void 0 : existing.chapterId) === chapterId ? normalizeSave(existing) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialSave"])(chapterId);
            setSave(initial);
            var _chapter_beats_initial_beatIndex_id;
            setBeatId((_chapter_beats_initial_beatIndex_id = (_chapter_beats_initial_beatIndex = chapter.beats[initial.beatIndex]) === null || _chapter_beats_initial_beatIndex === void 0 ? void 0 : _chapter_beats_initial_beatIndex.id) !== null && _chapter_beats_initial_beatIndex_id !== void 0 ? _chapter_beats_initial_beatIndex_id : chapter.beats[0].id);
        }
    }["GameContent.useEffect"], [
        chapter,
        chapterId,
        mode
    ]);
    const currentIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GameContent.useMemo[currentIndex]": ()=>{
            var _chapter_beats_findIndex;
            return (_chapter_beats_findIndex = chapter === null || chapter === void 0 ? void 0 : chapter.beats.findIndex({
                "GameContent.useMemo[currentIndex]": (beat)=>beat.id === beatId
            }["GameContent.useMemo[currentIndex]"])) !== null && _chapter_beats_findIndex !== void 0 ? _chapter_beats_findIndex : -1;
        }
    }["GameContent.useMemo[currentIndex]"], [
        chapter,
        beatId
    ]);
    const currentBeat = chapter === null || chapter === void 0 ? void 0 : chapter.beats[currentIndex];
    const commit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameContent.useCallback[commit]": (nextBeatId, nextSave, index)=>{
            const data = {
                ...nextSave,
                beatIndex: index,
                savedAt: Date.now()
            };
            setSave(data);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeSave"])(data);
            setBeatId(nextBeatId);
        }
    }["GameContent.useCallback[commit]"], []);
    const resolveNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameContent.useCallback[resolveNext]": (beat)=>{
            if (!chapter) return null;
            const index = beat.next ? chapter.beats.findIndex({
                "GameContent.useCallback[resolveNext]": (item)=>item.id === beat.next
            }["GameContent.useCallback[resolveNext]"]) : chapter.beats.findIndex({
                "GameContent.useCallback[resolveNext]": (item)=>item.id === beat.id
            }["GameContent.useCallback[resolveNext]"]) + 1;
            return index >= 0 && index < chapter.beats.length ? {
                beat: chapter.beats[index],
                index
            } : null;
        }
    }["GameContent.useCallback[resolveNext]"], [
        chapter
    ]);
    const advance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameContent.useCallback[advance]": (override)=>{
            if (!currentBeat || !save) return;
            const resolved = resolveNext(currentBeat);
            if (resolved) commit(resolved.beat.id, override !== null && override !== void 0 ? override : save, resolved.index);
        }
    }["GameContent.useCallback[advance]"], [
        commit,
        currentBeat,
        resolveNext,
        save
    ]);
    const handleChoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameContent.useCallback[handleChoice]": (choiceIndex)=>{
            if (!(currentBeat === null || currentBeat === void 0 ? void 0 : currentBeat.choices) || !save || !chapter) return;
            const choice = currentBeat.choices[choiceIndex];
            const nextSave = {
                ...save,
                variables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyEffects"])(save.variables, choice.effects)
            };
            const gotoIndex = choice.goto ? chapter.beats.findIndex({
                "GameContent.useCallback[handleChoice]": (beat)=>beat.id === choice.goto
            }["GameContent.useCallback[handleChoice]"]) : -1;
            if (gotoIndex >= 0) commit(chapter.beats[gotoIndex].id, nextSave, gotoIndex);
            else advance(nextSave);
        }
    }["GameContent.useCallback[handleChoice]"], [
        advance,
        chapter,
        commit,
        currentBeat,
        save
    ]);
    const handleActivity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameContent.useCallback[handleActivity]": (result)=>{
            if (!save || !currentBeat) return;
            var _result_wage, _result_paper, _result_clues, _result_archive, _currentBeat_unlockArchive;
            const nextSave = {
                ...save,
                variables: {
                    ...save.variables,
                    wage: save.variables.wage + ((_result_wage = result.wage) !== null && _result_wage !== void 0 ? _result_wage : 0),
                    paper: save.variables.paper + ((_result_paper = result.paper) !== null && _result_paper !== void 0 ? _result_paper : 0)
                },
                completedActivities: Array.from(new Set([
                    ...save.completedActivities,
                    currentBeat.id
                ])),
                clues: Array.from(new Set([
                    ...save.clues,
                    ...(_result_clues = result.clues) !== null && _result_clues !== void 0 ? _result_clues : []
                ])),
                unlockedArchive: Array.from(new Set([
                    ...save.unlockedArchive,
                    ...(_result_archive = result.archive) !== null && _result_archive !== void 0 ? _result_archive : [],
                    ...(_currentBeat_unlockArchive = currentBeat.unlockArchive) !== null && _currentBeat_unlockArchive !== void 0 ? _currentBeat_unlockArchive : []
                ]))
            };
            advance(nextSave);
        }
    }["GameContent.useCallback[handleActivity]"], [
        advance,
        currentBeat,
        save
    ]);
    if (!chapter || !save || !currentBeat || currentIndex < 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "loading-book",
            children: "展卷中……"
        }, void 0, false, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 97,
            columnNumber: 12
        }, this);
    }
    var _currentBeat_type;
    const activity = ACTIVITY_TYPES.has((_currentBeat_type = currentBeat.type) !== null && _currentBeat_type !== void 0 ? _currentBeat_type : "");
    const choices = currentBeat.type === "choice" ? currentBeat.choices : undefined;
    const isEnd = resolveNext(currentBeat) === null;
    const segment = currentIndex < 9 ? "开工" : currentIndex < 18 ? "旧纸" : currentIndex < 30 ? "残页" : currentIndex < 41 ? "来客" : "夜谈";
    const left = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "ledger-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vertical-title",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "听雨书坊"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 107,
                        columnNumber: 39
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ledger-date",
                children: "康熙九年 · 九月廿三"
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: segment
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ledger-objective",
                children: activity ? "完成案上的工作，所得判断会写入笺记。" : "读下去。留意纸上没有写明的事情。"
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "ledger-stats",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "工钱"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 112,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "残页"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 113,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "掌柜"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 114,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "clue-notes",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "clue-kind",
                        children: "自查"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "clue-heading",
                        children: "案头笺记"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "clue-content",
                        children: save.clues.length ? save.clues.slice(-4).map((clue)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "· ",
                                    clue
                                ]
                            }, clue, true, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 120,
                                columnNumber: 67
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
    const right = activity ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ActivityStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        beat: currentBeat,
        onComplete: handleActivity
    }, currentBeat.id, false, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManuscriptPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        speaker: currentBeat.type === "title" ? undefined : currentBeat.speaker,
        text: currentBeat.text,
        isTitle: currentBeat.type === "title",
        canTurn: !isEnd && !choices,
        onTurn: ()=>advance(),
        choices: choices,
        onChoice: handleChoice,
        footer: isEnd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "seal-action",
            href: "/archive",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BookShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        left: left,
        right: right,
        chapter: chapter.subtitle,
        progress: "".concat(currentIndex + 1, " / ").concat(chapter.beats.length)
    }, void 0, false, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 143,
        columnNumber: 10
    }, this);
}
_s(GameContent, "x7/jG1+kySzDkZssACNefrGD8VM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = GameContent;
function GamePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "loading-book",
            children: "展卷中……"
        }, void 0, false, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 147,
            columnNumber: 30
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GameContent, {}, void 0, false, {
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
_c1 = GamePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "GameContent");
__turbopack_context__.k.register(_c1, "GamePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target) {
    for(var _len = arguments.length, searchParamsList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        searchParamsList[_key - 1] = arguments[_key];
    }
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? "[" + hostname + "]" : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && "?" + query || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return "" + protocol + host + pathname + search + hash;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn("Unknown key passed via urlObject into url.format: " + key);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (e.g. via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return protocol + "//" + hostname + (port ? ':' + port : '');
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? "?" + urlParts.slice(1).join('?') : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        var _App_prototype;
        if ((_App_prototype = App.prototype) == null ? void 0 : _App_prototype.getInitialProps) {
            const message = '"' + getDisplayName(App) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = '"' + getDisplayName(App) + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn("" + getDisplayName(App) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps");
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = "Cannot find module for page: " + page;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = "Failed to load static file for page: " + page + " " + message;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = "Cannot find the middleware module";
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _approuterinstance = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
const _segmentcache = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/segment-cache.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    const { nodeName } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === 'A';
    if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
        // ignore click for browser’s default behavior
        return;
    }
    if (!(0, _islocalurl.isLocalURL)(href)) {
        if (replace) {
            // browser default behavior does not replace the history state
            // so we need to do it manually
            e.preventDefault();
            location.replace(href);
        }
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    if (onNavigate) {
        let isDefaultPrevented = false;
        onNavigate({
            preventDefault: ()=>{
                isDefaultPrevented = true;
            }
        });
        if (isDefaultPrevented) {
            return;
        }
    }
    _react.default.startTransition(()=>{
        (0, _approuterinstance.dispatchNavigateAction)(as || href, replace ? 'replace' : 'push', scroll != null ? scroll : true, linkInstanceRef.current);
    });
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _segmentcache.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error("Failed prop type: The prop `" + args.key + "` expects a " + args.expected + " in `<Link>`, but got `" + args.actual + "` instead." + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto' && props[key] !== 'unstable_forceStale') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto" | "unstable_forceStale"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error("Dynamic href `" + href + "` found in <Link> while using the `/app` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href"), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn('"onClick" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link');
            }
            if (onMouseEnterProp) {
                console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error("No children were passed to <Link> with `href` of `" + hrefProp + "` but one child is required https://nextjs.org/docs/messages/link-no-children"), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error("Multiple children were passed to <Link> with `href` of `" + hrefProp + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ((children == null ? void 0 : children.type) === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error('Component rendered inside next/link has to pass click event to "onClick" prop.'), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user.
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _segmentcache.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _segmentcache.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
]);

//# sourceMappingURL=_ece2d439._.js.map