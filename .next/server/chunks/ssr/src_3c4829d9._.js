module.exports = [
"[project]/src/lib/sound.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "playPageTurnSound",
    ()=>playPageTurnSound,
    "preloadPageTurnSound",
    ()=>preloadPageTurnSound
]);
let pageTurnAudio = null;
function preloadPageTurnSound(src) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function playPageTurnSound() {
    if (!pageTurnAudio) return;
    pageTurnAudio.currentTime = 0;
    void pageTurnAudio.play().catch(()=>{});
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
        "一",
        "二",
        "三",
        "四"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onSelect,
        className: "group w-full rounded-sm border border-paper-edge/70 bg-paper-dark/40 px-5 py-4 text-left transition-all duration-300 hover:border-cinnabar/40 hover:bg-paper-dark/70",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mr-3 font-title text-sm text-cinnabar",
                children: labels[index] ?? index + 1
            }, void 0, false, {
                fileName: "[project]/src/components/ChoiceButton.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "leading-relaxed tracking-wide text-ink group-hover:text-cinnabar",
                children: text
            }, void 0, false, {
                fileName: "[project]/src/components/ChoiceButton.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChoiceButton.tsx",
        lineNumber: 13,
        columnNumber: 5
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChoiceButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChoiceButton.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
/* 古籍翻页动画时长（ms）— 缓慢克制 */ const EXIT_MS = 250;
const ENTER_MS = 250;
function ManuscriptPage({ speaker, text, isTitle = false, canTurn = false, onTurn, choices, onChoice, footer }) {
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('entering');
    const mountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const turningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onTurnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onTurn);
    const onChoiceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onChoice);
    onTurnRef.current = onTurn;
    onChoiceRef.current = onChoice;
    /* 首次挂载入场动画 */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        mountedRef.current = true;
        timerRef.current = setTimeout(()=>{
            if (!mountedRef.current) return;
            setPhase('idle');
        }, ENTER_MS);
        return ()=>{
            mountedRef.current = false;
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);
    /* 翻页：淡出 → 下一内容 → 淡入 */ const startExit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((onComplete)=>{
        if (phase !== 'idle' || turningRef.current) return;
        turningRef.current = true;
        setPhase('exiting');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["playPageTurnSound"])();
        timerRef.current = setTimeout(()=>{
            if (!mountedRef.current) return;
            onComplete();
            setPhase('entering');
            timerRef.current = setTimeout(()=>{
                if (!mountedRef.current) return;
                setPhase('idle');
                turningRef.current = false;
            }, ENTER_MS);
        }, EXIT_MS);
    }, [
        phase
    ]);
    const handlePageClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (event.target.closest('[data-no-turn]')) return;
        if (!canTurn || choices) return;
        startExit(()=>onTurnRef.current?.());
    }, [
        canTurn,
        choices,
        startExit
    ]);
    const handleChoiceSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index)=>{
        startExit(()=>onChoiceRef.current?.(index));
    }, [
        startExit
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (canTurn && !choices) {
                startExit(()=>onTurnRef.current?.());
            }
        }
    }, [
        canTurn,
        choices,
        startExit
    ]);
    const phaseClass = phase === 'exiting' ? 'manuscript-page--exit' : phase === 'entering' ? 'manuscript-page--enter' : '';
    const isInteractive = canTurn && phase === 'idle' && !choices;
    /* 为每段文字绑定独立 key，确保 remount 时彻底销毁旧 DOM */ const contentKey = text;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "manuscript-stage mx-auto w-full max-w-2xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: `manuscript-page ${phaseClass}`,
            onClick: handlePageClick,
            onKeyDown: handleKeyDown,
            role: isInteractive ? 'button' : undefined,
            tabIndex: isInteractive ? 0 : undefined,
            "aria-label": isInteractive ? '点击翻页' : undefined,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "manuscript-sheet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "manuscript-corner-curl",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "manuscript-paper-texture",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this),
                    !isTitle && speaker && speaker !== '旁白' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "manuscript-speaker",
                        children: speaker
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 133,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: isTitle ? 'manuscript-title-text' : 'manuscript-body-text',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: text
                        }, contentKey, false, {
                            fileName: "[project]/src/components/ManuscriptPage.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    choices && choices.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "manuscript-choices",
                        children: choices.map((choice, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChoiceButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                index: index,
                                text: choice.text,
                                onSelect: ()=>handleChoiceSelect(index)
                            }, choice.id, false, {
                                fileName: "[project]/src/components/ManuscriptPage.tsx",
                                lineNumber: 143,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 141,
                        columnNumber: 13
                    }, this),
                    canTurn && phase === 'idle' && !choices && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "manuscript-turn-hint",
                        "aria-hidden": true,
                        children: "─ 续 ─"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 154,
                        columnNumber: 13
                    }, this),
                    footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "manuscript-footer",
                        "data-no-turn": true,
                        children: footer
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManuscriptPage.tsx",
                        lineNumber: 159,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ManuscriptPage.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ManuscriptPage.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ManuscriptPage.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/WoodButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WoodButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
;
;
function WoodButton({ href, onClick, children, disabled, className = "" }) {
    const classes = `wood-button ${className}`;
    if (href && !disabled) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: `inline-block text-center no-underline ${classes}`,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/WoodButton.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this);
    }
    if (href && disabled) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `inline-block cursor-not-allowed text-center no-underline ${classes}`,
            "aria-disabled": true,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/WoodButton.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        disabled: disabled,
        className: classes,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/WoodButton.tsx",
        lineNumber: 38,
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
        savedAt: Date.now()
    };
}
}),
"[project]/src/story/chapter01.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"id\":\"chapter01\",\"title\":\"第一章\",\"subtitle\":\"第十三页\",\"beats\":[{\"id\":\"beat-01\",\"type\":\"title\",\"text\":\"雨已经下了三天。\"},{\"id\":\"beat-02\",\"speaker\":\"旁白\",\"text\":\"老板把几箱旧纸推到我的面前。\"},{\"id\":\"beat-03\",\"speaker\":\"老板\",\"text\":\"今天把这些整理完。\"},{\"id\":\"beat-04\",\"speaker\":\"旁白\",\"text\":\"我伸手，却发现其中一页，没有第一页。\"},{\"id\":\"beat-05\",\"speaker\":\"旁白\",\"text\":\"那是一张没有第一页的纸。我轻轻展开，墨迹已经模糊。\"},{\"id\":\"beat-06\",\"speaker\":\"老板\",\"text\":\"这张纸……不是这里的。\"},{\"id\":\"beat-07\",\"type\":\"choice\",\"text\":\"你准备——\",\"choices\":[{\"id\":\"choice-paper\",\"text\":\"继续寻找同样纸张\",\"effects\":{\"paper\":1},\"goto\":\"beat-08a\"},{\"id\":\"choice-trust\",\"text\":\"先询问老板\",\"effects\":{\"trust\":1,\"trust_yimin\":1},\"goto\":\"beat-08b\"}]},{\"id\":\"beat-08a\",\"speaker\":\"旁白\",\"text\":\"我在箱底又翻出两页。纸缘一样毛糙，墨色一样淡，却都不知从何处来。\",\"next\":\"beat-09\"},{\"id\":\"beat-08b\",\"speaker\":\"老板\",\"text\":\"别问太多。问多了，纸也会烫手。\",\"next\":\"beat-09\"},{\"id\":\"beat-09\",\"speaker\":\"旁白\",\"text\":\"雨声又紧了一层。这一页残卷，像是某个更大故事的开头——而开头，已经被人撕走了。\"},{\"id\":\"beat-10\",\"speaker\":\"旁白\",\"text\":\"【第一章 · 试玩结束。后续章节开发中。】\"}]}"));}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManuscriptPage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ManuscriptPage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WoodButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WoodButton.tsx [app-ssr] (ecmascript)");
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
function GameContent() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const mode = searchParams.get("mode") ?? "new";
    const chapterId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$story$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirstChapterId"])();
    const chapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$story$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChapter"])(chapterId);
    const [save, setSave] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [beatId, setBeatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!chapter) return;
        if (mode === "continue") {
            const existing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadSave"])();
            if (existing && existing.chapterId === chapterId) {
                setSave(existing);
                const beat = chapter.beats[existing.beatIndex];
                setBeatId(beat?.id ?? chapter.beats[0].id);
                setReady(true);
                return;
            }
        }
        const initial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInitialSave"])(chapterId);
        setSave(initial);
        setBeatId(chapter.beats[0].id);
        setReady(true);
    }, [
        chapter,
        chapterId,
        mode
    ]);
    const currentIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!chapter) return -1;
        return chapter.beats.findIndex((b)=>b.id === beatId);
    }, [
        chapter,
        beatId
    ]);
    const currentBeat = chapter?.beats[currentIndex];
    const persistProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextBeatId, variables, beatIndex)=>{
        if (!chapter) return;
        const data = {
            chapterId: chapter.id,
            beatIndex,
            variables,
            unlockedArchive: save?.unlockedArchive ?? [],
            unlockedCharacters: save?.unlockedCharacters ?? [],
            savedAt: Date.now()
        };
        setSave(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeSave"])(data);
        setBeatId(nextBeatId);
    }, [
        chapter,
        save
    ]);
    const resolveNextBeat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((beat)=>{
        if (!chapter) return null;
        if (beat.next) {
            const index = chapter.beats.findIndex((b)=>b.id === beat.next);
            if (index >= 0) return {
                beat: chapter.beats[index],
                index
            };
        }
        const nextIndex = chapter.beats.findIndex((b)=>b.id === beat.id) + 1;
        if (nextIndex >= chapter.beats.length) return null;
        return {
            beat: chapter.beats[nextIndex],
            index: nextIndex
        };
    }, [
        chapter
    ]);
    const advance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!chapter || !save || !currentBeat) return;
        const resolved = resolveNextBeat(currentBeat);
        if (!resolved) return;
        persistProgress(resolved.beat.id, save.variables, resolved.index);
    }, [
        chapter,
        save,
        currentBeat,
        resolveNextBeat,
        persistProgress
    ]);
    const handleChoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((choiceIndex)=>{
        if (!currentBeat?.choices || !save) return;
        const choice = currentBeat.choices[choiceIndex];
        if (!choice) return;
        const nextVariables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyEffects"])(save.variables, choice.effects);
        const gotoId = choice.goto;
        const gotoIndex = chapter?.beats.findIndex((b)=>b.id === gotoId) ?? -1;
        if (gotoId && gotoIndex >= 0) {
            persistProgress(gotoId, nextVariables, gotoIndex);
            return;
        }
        advance();
    }, [
        currentBeat,
        save,
        chapter,
        persistProgress,
        advance
    ]);
    const isEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!chapter || !currentBeat || currentIndex < 0) return false;
        return resolveNextBeat(currentBeat) === null;
    }, [
        chapter,
        currentBeat,
        currentIndex,
        resolveNextBeat
    ]);
    if (!ready || !chapter || !save || !currentBeat) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "tracking-[0.3em] text-ink-faint",
                children: "展卷中……"
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 117,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this);
    }
    const isChoice = currentBeat.type === "choice" && currentBeat.choices?.length;
    const isTitle = currentBeat.type === "title";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative flex min-h-screen flex-col bg-gradient-to-b from-paper via-paper to-paper-dark/30 px-4 py-8 sm:px-6 sm:py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mx-auto mb-8 flex w-full max-w-2xl items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "text-xs tracking-[0.3em] text-ink-faint hover:text-cinnabar",
                        children: "← 返回"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "chapter-label",
                                children: chapter.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            chapter.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs tracking-[0.35em] text-ink-faint",
                                children: chapter.subtitle
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs tracking-wider text-ink-faint",
                        children: [
                            currentIndex + 1,
                            "/",
                            chapter.beats.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mx-auto w-full max-w-2xl flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManuscriptPage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    speaker: isTitle ? undefined : currentBeat.speaker,
                    text: currentBeat.text,
                    isTitle: isTitle,
                    canTurn: !isEnd && !isChoice,
                    onTurn: advance,
                    choices: isChoice ? currentBeat.choices : undefined,
                    onChoice: isChoice ? handleChoice : undefined,
                    footer: isEnd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-3 pt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WoodButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "text-sm opacity-80",
                                children: "返回首页"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 155,
                                columnNumber: 17
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WoodButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/game?mode=new",
                                onClick: ()=>{
                                    const initial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInitialSave"])(chapterId);
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeSave"])(initial);
                                },
                                className: "text-sm opacity-80",
                                children: "重读本章"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 158,
                                columnNumber: 17
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 154,
                        columnNumber: 15
                    }, void 0) : undefined
                }, currentBeat.id, false, {
                    fileName: "[project]/src/app/game/page.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mx-auto mt-10 w-full max-w-2xl border-t border-paper-edge/40 pt-4 text-center text-xs tracking-wider text-ink-faint",
                children: [
                    "残页 ",
                    save.variables.paper,
                    " · 信任 ",
                    save.variables.trust
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
function GamePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "tracking-[0.3em] text-ink-faint",
                children: "展卷中……"
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 186,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 185,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GameContent, {}, void 0, false, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 190,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_3c4829d9._.js.map