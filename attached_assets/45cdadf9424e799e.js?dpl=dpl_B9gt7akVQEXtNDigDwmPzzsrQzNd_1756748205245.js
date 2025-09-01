(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  "object" == typeof document ? document.currentScript : void 0,
  {
    71306: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        blurred: "preloader-module__HuRKdq__blurred",
        char: "preloader-module__HuRKdq__char",
        inner: "preloader-module__HuRKdq__inner",
        preloader: "preloader-module__HuRKdq__preloader",
        progressBar: "preloader-module__HuRKdq__progressBar",
        solid: "preloader-module__HuRKdq__solid",
        textWrapper: "preloader-module__HuRKdq__textWrapper",
        videoWrapper: "preloader-module__HuRKdq__videoWrapper",
        word: "preloader-module__HuRKdq__word",
        wordBlurred: "preloader-module__HuRKdq__wordBlurred",
      });
    },
    91248: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ Preloader: () => t });
        var s = e.i(58064),
          i = e.i(85444),
          o = e.i(60566),
          l = e.i(17170),
          a = e.i(38653),
          n = e.i(71306);
        let t = (0, a.forwardRef)(function (e, t) {
          let r,
            c,
            d,
            u,
            m,
            p,
            f,
            h,
            g = (0, i.c)(8),
            _ = (0, a.useRef)(null),
            v = (0, a.useRef)(null),
            y = (0, a.useRef)(null),
            b = (0, a.useRef)(null);
          g[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = []), (g[0] = r))
            : (r = g[0]);
          let x = (0, a.useRef)(r);
          g[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = []), (g[1] = c))
            : (c = g[1]);
          let w = (0, a.useRef)(c);
          g[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((d = function () {
                let e = l.default.timeline();
                return (
                  e.fromTo(
                    [w.current],
                    { opacity: 0 },
                    {
                      opacity: 1,
                      ease: "rough({ template: power2.in, strength: 5, points:4, taper:out, randomize:false, clamp:false })",
                      duration: 0.45,
                      stagger: 0.3,
                    },
                    2
                  ),
                  e.fromTo(
                    [x.current],
                    { opacity: 0 },
                    {
                      opacity: 1,
                      ease: "rough({ template: power2.in, strength: 5, points:4, taper:out, randomize:false, clamp:false })",
                      duration: 0.45,
                      stagger: 0.3,
                    },
                    2.1
                  ),
                  e.to(
                    b.current,
                    { filter: "blur(30px) brightness(1) saturate(1)" },
                    3
                  ),
                  e.fromTo(
                    y.current,
                    { autoAlpha: 1, xPercent: -100 },
                    { xPercent: 0, ease: "expo.inOut", duration: 3.5 },
                    1
                  ),
                  e.to(_.current, {
                    yPercent: -100,
                    ease: "expo.inOut",
                    duration: 1.2,
                  }),
                  e.to(
                    v.current,
                    { opacity: 0, duration: 0.3, ease: "power1.out" },
                    "<"
                  ),
                  e.set(_.current, { display: "none" }),
                  e
                );
              }),
              (g[2] = d))
            : (d = g[2]);
          let k = d;
          return (
            g[3] === Symbol.for("react.memo_cache_sentinel")
              ? ((u = () => ({ appear: k })), (g[3] = u))
              : (u = g[3]),
            (0, a.useImperativeHandle)(t, u),
            g[4] === Symbol.for("react.memo_cache_sentinel")
              ? ((m = (0, s.jsx)("div", {
                  className: n.default.word,
                  children: "Luma".split("").map((e, t) =>
                    (0, s.jsx)(
                      "span",
                      {
                        className: n.default.char,
                        ref: (e) => {
                          w.current[t] = e;
                        },
                        style: { "--char-index": t, "--total-chars": 4 },
                        children: e,
                      },
                      t
                    )
                  ),
                })),
                (p = (0, o.default)(n.default.word, n.default.wordBlurred)),
                (g[4] = m),
                (g[5] = p))
              : ((m = g[4]), (p = g[5])),
            g[6] === Symbol.for("react.memo_cache_sentinel")
              ? ((f = (0, s.jsxs)("div", {
                  className: n.default.textWrapper,
                  children: [
                    m,
                    (0, s.jsx)("div", {
                      className: p,
                      ref: b,
                      children: "Luma".split("").map((e, t) =>
                        (0, s.jsx)(
                          "span",
                          {
                            className: n.default.char,
                            ref: (e) => {
                              x.current[t] = e;
                            },
                            style: { "--char-index": t, "--total-chars": 4 },
                            children: e,
                          },
                          t
                        )
                      ),
                    }),
                  ],
                })),
                (g[6] = f))
              : (f = g[6]),
            g[7] === Symbol.for("react.memo_cache_sentinel")
              ? ((h = (0, s.jsx)("div", {
                  className: n.default.preloader,
                  ref: _,
                  children: (0, s.jsxs)("div", {
                    className: n.default.inner,
                    ref: v,
                    children: [
                      f,
                      (0, s.jsxs)("div", {
                        className: n.default.progressBar,
                        ref: y,
                        children: [
                          (0, s.jsx)("div", { className: n.default.blurred }),
                          (0, s.jsx)("div", { className: n.default.solid }),
                        ],
                      }),
                    ],
                  }),
                })),
                (g[7] = h))
              : (h = g[7]),
            h
          );
        });
      }
    },
    33907: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i = e.i(38653);
        function o() {
          return (o = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, i.memo)(function (e) {
          return (0,
          i.createElement)("svg", o({ viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, e), s || (s = (0, i.createElement)("path", { d: "m5 9 5.6 5.6q1.4 1.2 2.8 0L19 9", stroke: "white", strokeWidth: 2, strokeLinecap: "round" })));
        });
      }
    },
    13827: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o,
          l = e.i(38653);
        function a() {
          return (a = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, l.memo)(function (e) {
          return (0,
          l.createElement)("svg", a({ viewBox: "0 0 1362 421", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, e), s || (s = (0, l.createElement)("mask", { id: "dots-grid_svg__b", "mask-type": "luminance", maskUnits: "userSpaceOnUse" }, (0, l.createElement)("ellipse", { cx: 681, cy: 421, rx: 681, ry: 421, fill: "url(#dots-grid_svg__a)" }))), i || (i = (0, l.createElement)("g", { mask: "url(#dots-grid_svg__b)" }, (0, l.createElement)("path", { d: "M129 0v421", stroke: "url(#dots-grid_svg__c)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M145 0v421", stroke: "url(#dots-grid_svg__d)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M161 0v421", stroke: "url(#dots-grid_svg__e)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M177 0v421", stroke: "url(#dots-grid_svg__f)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M193 0v421", stroke: "url(#dots-grid_svg__g)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M209 0v421", stroke: "url(#dots-grid_svg__h)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M225 0v421", stroke: "url(#dots-grid_svg__i)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M241 0v421", stroke: "url(#dots-grid_svg__j)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M257 0v421", stroke: "url(#dots-grid_svg__k)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M273 0v421", stroke: "url(#dots-grid_svg__l)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M289 0v421", stroke: "url(#dots-grid_svg__m)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M305 0v421", stroke: "url(#dots-grid_svg__n)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M321 0v421", stroke: "url(#dots-grid_svg__o)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M337 0v421", stroke: "url(#dots-grid_svg__p)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M353 0v421", stroke: "url(#dots-grid_svg__q)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M369 0v421", stroke: "url(#dots-grid_svg__r)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M385 0v421", stroke: "url(#dots-grid_svg__s)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M401 0v421", stroke: "url(#dots-grid_svg__t)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M417 0v421", stroke: "url(#dots-grid_svg__u)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M433 0v421", stroke: "url(#dots-grid_svg__v)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M449 0v421", stroke: "url(#dots-grid_svg__w)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M465 0v421", stroke: "url(#dots-grid_svg__x)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M481 0v421", stroke: "url(#dots-grid_svg__y)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M497 0v421", stroke: "url(#dots-grid_svg__z)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M513 0v421", stroke: "url(#dots-grid_svg__A)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M529 0v421", stroke: "url(#dots-grid_svg__B)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M545 0v421", stroke: "url(#dots-grid_svg__C)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M561 0v421", stroke: "url(#dots-grid_svg__D)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M577 0v421", stroke: "url(#dots-grid_svg__E)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M593 0v421", stroke: "url(#dots-grid_svg__F)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M609 0v421", stroke: "url(#dots-grid_svg__G)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M625 0v421", stroke: "url(#dots-grid_svg__H)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M641 0v421", stroke: "url(#dots-grid_svg__I)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M657 0v421", stroke: "url(#dots-grid_svg__J)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M673 0v421", stroke: "url(#dots-grid_svg__K)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M689 0v421", stroke: "url(#dots-grid_svg__L)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M705 0v421", stroke: "url(#dots-grid_svg__M)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M721 0v421", stroke: "url(#dots-grid_svg__N)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M737 0v421", stroke: "url(#dots-grid_svg__O)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M753 0v421", stroke: "url(#dots-grid_svg__P)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M769 0v421", stroke: "url(#dots-grid_svg__Q)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M785 0v421", stroke: "url(#dots-grid_svg__R)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M801 0v421", stroke: "url(#dots-grid_svg__S)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M817 0v421", stroke: "url(#dots-grid_svg__T)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M833 0v421", stroke: "url(#dots-grid_svg__U)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M849 0v421", stroke: "url(#dots-grid_svg__V)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M865 0v421", stroke: "url(#dots-grid_svg__W)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M881 0v421", stroke: "url(#dots-grid_svg__X)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M897 0v421", stroke: "url(#dots-grid_svg__Y)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M913 0v421", stroke: "url(#dots-grid_svg__Z)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M929 0v421", stroke: "url(#dots-grid_svg__aa)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M945 0v421", stroke: "url(#dots-grid_svg__ab)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M961 0v421", stroke: "url(#dots-grid_svg__ac)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M977 0v421", stroke: "url(#dots-grid_svg__ad)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M993 0v421", stroke: "url(#dots-grid_svg__ae)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1009 0v421", stroke: "url(#dots-grid_svg__af)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1025 0v421", stroke: "url(#dots-grid_svg__ag)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1041 0v421", stroke: "url(#dots-grid_svg__ah)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1057 0v421", stroke: "url(#dots-grid_svg__ai)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1073 0v421", stroke: "url(#dots-grid_svg__aj)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1089 0v421", stroke: "url(#dots-grid_svg__ak)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1105 0v421", stroke: "url(#dots-grid_svg__al)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1121 0v421", stroke: "url(#dots-grid_svg__am)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1137 0v421", stroke: "url(#dots-grid_svg__an)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1153 0v421", stroke: "url(#dots-grid_svg__ao)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1169 0v421", stroke: "url(#dots-grid_svg__ap)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1185 0v421", stroke: "url(#dots-grid_svg__aq)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1201 0v421", stroke: "url(#dots-grid_svg__ar)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1217 0v421", stroke: "url(#dots-grid_svg__as)", strokeWidth: 2, strokeDasharray: "2 20" }), (0, l.createElement)("path", { d: "M1233 0v421", stroke: "url(#dots-grid_svg__at)", strokeWidth: 2, strokeDasharray: "2 20" }))), o || (o = (0, l.createElement)("defs", null, (0, l.createElement)("radialGradient", { id: "dots-grid_svg__a" }, (0, l.createElement)("stop", { offset: "10%", stopColor: "#cccccc" }), (0, l.createElement)("stop", { offset: "80%", stopColor: "#000000" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__c", x1: 129.5, y1: 181, x2: 129.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__d", x1: 145.5, y1: 181, x2: 145.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__e", x1: 161.5, y1: 181, x2: 161.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__f", x1: 177.5, y1: 181, x2: 177.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__g", x1: 193.5, y1: 181, x2: 193.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__h", x1: 209.5, y1: 181, x2: 209.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__i", x1: 225.5, y1: 181, x2: 225.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__j", x1: 241.5, y1: 181, x2: 241.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__k", x1: 257.5, y1: 181, x2: 257.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__l", x1: 273.5, y1: 181, x2: 273.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__m", x1: 289.5, y1: 181, x2: 289.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__n", x1: 305.5, y1: 181, x2: 305.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__o", x1: 321.5, y1: 181, x2: 321.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__p", x1: 337.5, y1: 181, x2: 337.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__q", x1: 353.5, y1: 181, x2: 353.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__r", x1: 369.5, y1: 181, x2: 369.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__s", x1: 385.5, y1: 181, x2: 385.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__t", x1: 401.5, y1: 181, x2: 401.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__u", x1: 417.5, y1: 181, x2: 417.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__v", x1: 433.5, y1: 181, x2: 433.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__w", x1: 449.5, y1: 181, x2: 449.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__x", x1: 465.5, y1: 181, x2: 465.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__y", x1: 481.5, y1: 181, x2: 481.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__z", x1: 497.5, y1: 181, x2: 497.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__A", x1: 513.5, y1: 181, x2: 513.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__B", x1: 529.5, y1: 181, x2: 529.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__C", x1: 545.5, y1: 181, x2: 545.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__D", x1: 561.5, y1: 181, x2: 561.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__E", x1: 577.5, y1: 181, x2: 577.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__F", x1: 593.5, y1: 181, x2: 593.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__G", x1: 609.5, y1: 181, x2: 609.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__H", x1: 625.5, y1: 181, x2: 625.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__I", x1: 641.5, y1: 181, x2: 641.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__J", x1: 657.5, y1: 181, x2: 657.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__K", x1: 673.5, y1: 181, x2: 673.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__L", x1: 689.5, y1: 181, x2: 689.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__M", x1: 705.5, y1: 181, x2: 705.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__N", x1: 721.5, y1: 181, x2: 721.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__O", x1: 737.5, y1: 181, x2: 737.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__P", x1: 753.5, y1: 181, x2: 753.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__Q", x1: 769.5, y1: 181, x2: 769.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__R", x1: 785.5, y1: 181, x2: 785.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__S", x1: 801.5, y1: 181, x2: 801.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__T", x1: 817.5, y1: 181, x2: 817.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__U", x1: 833.5, y1: 181, x2: 833.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__V", x1: 849.5, y1: 181, x2: 849.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__W", x1: 865.5, y1: 181, x2: 865.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__X", x1: 881.5, y1: 181, x2: 881.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__Y", x1: 897.5, y1: 181, x2: 897.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__Z", x1: 913.5, y1: 181, x2: 913.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__aa", x1: 929.5, y1: 181, x2: 929.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ab", x1: 945.5, y1: 181, x2: 945.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ac", x1: 961.5, y1: 181, x2: 961.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ad", x1: 977.5, y1: 181, x2: 977.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ae", x1: 993.5, y1: 181, x2: 993.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__af", x1: 1009.5, y1: 181, x2: 1009.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ag", x1: 1025.5, y1: 181, x2: 1025.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ah", x1: 1041.5, y1: 181, x2: 1041.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ai", x1: 1057.5, y1: 181, x2: 1057.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__aj", x1: 1073.5, y1: 181, x2: 1073.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ak", x1: 1089.5, y1: 181, x2: 1089.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__al", x1: 1105.5, y1: 181, x2: 1105.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__am", x1: 1121.5, y1: 181, x2: 1121.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__an", x1: 1137.5, y1: 181, x2: 1137.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ao", x1: 1153.5, y1: 181, x2: 1153.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ap", x1: 1169.5, y1: 181, x2: 1169.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__aq", x1: 1185.5, y1: 181, x2: 1185.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__ar", x1: 1201.5, y1: 181, x2: 1201.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__as", x1: 1217.5, y1: 181, x2: 1217.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })), (0, l.createElement)("linearGradient", { id: "dots-grid_svg__at", x1: 1233.5, y1: 181, x2: 1233.5, y2: 474, gradientUnits: "userSpaceOnUse" }, (0, l.createElement)("stop", { stopColor: "white", stopOpacity: 0 }), (0, l.createElement)("stop", { offset: 1, stopColor: "white" })))));
        });
      }
    },
    66351: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      ("use strict");
      function o(e) {
        let {
            widthInt: t,
            heightInt: r,
            blurWidth: s,
            blurHeight: i,
            blurDataURL: o,
            objectFit: l,
          } = e,
          a = s ? 40 * s : t,
          n = i ? 40 * i : r,
          c = a && n ? "viewBox='0 0 " + a + " " + n + "'" : "";
        return (
          "%3Csvg xmlns='http://www.w3.org/2000/svg' " +
          c +
          "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" +
          (c
            ? "none"
            : "contain" === l
            ? "xMidYMid"
            : "cover" === l
            ? "xMidYMid slice"
            : "none") +
          "' style='filter: url(%23b);' href='" +
          o +
          "'/%3E%3C/svg%3E"
        );
      }
      Object.defineProperty(i, "__esModule", { value: !0 }),
        Object.defineProperty(i, "getImageBlurSvg", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
    },
    61642: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        Object.defineProperty(i, "__esModule", { value: !0 });
        var o = {
          VALID_LOADERS: function () {
            return e;
          },
          imageConfigDefault: function () {
            return t;
          },
        };
        for (var l in o)
          Object.defineProperty(i, l, { enumerable: !0, get: o[l] });
        let e = ["default", "imgix", "cloudinary", "akamai", "custom"],
          t = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            loaderFile: "",
            domains: [],
            disableStaticImages: !1,
            minimumCacheTTL: 60,
            formats: ["image/webp"],
            dangerouslyAllowSVG: !1,
            contentSecurityPolicy:
              "script-src 'none'; frame-src 'none'; sandbox;",
            contentDispositionType: "attachment",
            localPatterns: void 0,
            remotePatterns: [],
            qualities: void 0,
            unoptimized: !1,
          };
      }
    },
    61311: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        e.i(22271),
          Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "getImgProps", {
            enumerable: !0,
            get: function () {
              return a;
            },
          }),
          e.r(12597);
        let t = e.r(66351),
          r = e.r(61642),
          s = ["-moz-initial", "fill", "none", "scale-down", void 0];
        function o(e) {
          return void 0 !== e.default;
        }
        function l(e) {
          return void 0 === e
            ? e
            : "number" == typeof e
            ? Number.isFinite(e)
              ? e
              : NaN
            : "string" == typeof e && /^[0-9]+$/.test(e)
            ? parseInt(e, 10)
            : NaN;
        }
        function a(e, i) {
          var a, n;
          let c,
            d,
            u,
            {
              src: m,
              sizes: p,
              unoptimized: f = !1,
              priority: h = !1,
              loading: g,
              className: _,
              quality: v,
              width: y,
              height: b,
              fill: x = !1,
              style: w,
              overrideSrc: k,
              onLoad: S,
              onLoadingComplete: j,
              placeholder: E = "empty",
              blurDataURL: N,
              fetchPriority: C,
              decoding: T = "async",
              layout: O,
              objectFit: P,
              objectPosition: R,
              lazyBoundary: M,
              lazyRoot: I,
              ...L
            } = e,
            {
              imgConf: U,
              showAltText: z,
              blurComplete: W,
              defaultLoader: $,
            } = i,
            D = U || r.imageConfigDefault;
          if ("allSizes" in D) c = D;
          else {
            let e = [...D.deviceSizes, ...D.imageSizes].sort((e, t) => e - t),
              t = D.deviceSizes.sort((e, t) => e - t),
              r = null == (a = D.qualities) ? void 0 : a.sort((e, t) => e - t);
            c = { ...D, allSizes: e, deviceSizes: t, qualities: r };
          }
          if (void 0 === $)
            throw Object.defineProperty(
              Error(
                "images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"
              ),
              "__NEXT_ERROR_CODE",
              { value: "E163", enumerable: !1, configurable: !0 }
            );
          let q = L.loader || $;
          delete L.loader, delete L.srcSet;
          let G = "__next_img_default" in q;
          if (G) {
            if ("custom" === c.loader)
              throw Object.defineProperty(
                Error(
                  'Image with src "' +
                    m +
                    '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'
                ),
                "__NEXT_ERROR_CODE",
                { value: "E252", enumerable: !1, configurable: !0 }
              );
          } else {
            let e = q;
            q = (t) => {
              let { config: r, ...s } = t;
              return e(s);
            };
          }
          if (O) {
            "fill" === O && (x = !0);
            let e = {
              intrinsic: { maxWidth: "100%", height: "auto" },
              responsive: { width: "100%", height: "auto" },
            }[O];
            e && (w = { ...w, ...e });
            let t = { responsive: "100vw", fill: "100vw" }[O];
            t && !p && (p = t);
          }
          let A = "",
            B = l(y),
            H = l(b);
          if ((n = m) && "object" == typeof n && (o(n) || void 0 !== n.src)) {
            let e = o(m) ? m.default : m;
            if (!e.src)
              throw Object.defineProperty(
                Error(
                  "An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " +
                    JSON.stringify(e)
                ),
                "__NEXT_ERROR_CODE",
                { value: "E460", enumerable: !1, configurable: !0 }
              );
            if (!e.height || !e.width)
              throw Object.defineProperty(
                Error(
                  "An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " +
                    JSON.stringify(e)
                ),
                "__NEXT_ERROR_CODE",
                { value: "E48", enumerable: !1, configurable: !0 }
              );
            if (
              ((d = e.blurWidth),
              (u = e.blurHeight),
              (N = N || e.blurDataURL),
              (A = e.src),
              !x)
            )
              if (B || H) {
                if (B && !H) {
                  let t = B / e.width;
                  H = Math.round(e.height * t);
                } else if (!B && H) {
                  let t = H / e.height;
                  B = Math.round(e.width * t);
                }
              } else (B = e.width), (H = e.height);
          }
          let F = !h && ("lazy" === g || void 0 === g);
          (!(m = "string" == typeof m ? m : A) ||
            m.startsWith("data:") ||
            m.startsWith("blob:")) &&
            ((f = !0), (F = !1)),
            c.unoptimized && (f = !0),
            G &&
              !c.dangerouslyAllowSVG &&
              m.split("?", 1)[0].endsWith(".svg") &&
              (f = !0);
          let V = l(v),
            Q = Object.assign(
              x
                ? {
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    objectFit: P,
                    objectPosition: R,
                  }
                : {},
              z ? {} : { color: "transparent" },
              w
            ),
            K =
              W || "empty" === E
                ? null
                : "blur" === E
                ? 'url("data:image/svg+xml;charset=utf-8,' +
                  (0, t.getImageBlurSvg)({
                    widthInt: B,
                    heightInt: H,
                    blurWidth: d,
                    blurHeight: u,
                    blurDataURL: N || "",
                    objectFit: Q.objectFit,
                  }) +
                  '")'
                : 'url("' + E + '")',
            Z = s.includes(Q.objectFit)
              ? "fill" === Q.objectFit
                ? "100% 100%"
                : "cover"
              : Q.objectFit,
            X = K
              ? {
                  backgroundSize: Z,
                  backgroundPosition: Q.objectPosition || "50% 50%",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: K,
                }
              : {},
            Y = (function (e) {
              let {
                config: t,
                src: r,
                unoptimized: s,
                width: i,
                quality: o,
                sizes: l,
                loader: a,
              } = e;
              if (s) return { src: r, srcSet: void 0, sizes: void 0 };
              let { widths: n, kind: c } = (function (e, t, r) {
                  let { deviceSizes: s, allSizes: i } = e;
                  if (r) {
                    let e = /(^|\s)(1?\d?\d)vw/g,
                      t = [];
                    for (let s; (s = e.exec(r)); ) t.push(parseInt(s[2]));
                    if (t.length) {
                      let e = 0.01 * Math.min(...t);
                      return {
                        widths: i.filter((t) => t >= s[0] * e),
                        kind: "w",
                      };
                    }
                    return { widths: i, kind: "w" };
                  }
                  return "number" != typeof t
                    ? { widths: s, kind: "w" }
                    : {
                        widths: [
                          ...new Set(
                            [t, 2 * t].map(
                              (e) => i.find((t) => t >= e) || i[i.length - 1]
                            )
                          ),
                        ],
                        kind: "x",
                      };
                })(t, i, l),
                d = n.length - 1;
              return {
                sizes: l || "w" !== c ? l : "100vw",
                srcSet: n
                  .map(
                    (e, s) =>
                      a({ config: t, src: r, quality: o, width: e }) +
                      " " +
                      ("w" === c ? e : s + 1) +
                      c
                  )
                  .join(", "),
                src: a({ config: t, src: r, quality: o, width: n[d] }),
              };
            })({
              config: c,
              src: m,
              unoptimized: f,
              width: B,
              quality: V,
              sizes: p,
              loader: q,
            });
          return {
            props: {
              ...L,
              loading: F ? "lazy" : g,
              fetchPriority: C,
              width: B,
              height: H,
              decoding: T,
              className: _,
              style: { ...Q, ...X },
              sizes: Y.sizes,
              srcSet: Y.srcSet,
              src: k || Y.src,
            },
            meta: { unoptimized: f, priority: h, placeholder: E, fill: x },
          };
        }
      }
    },
    70719: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "default", {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let t = e.r(38653),
          r = "undefined" == typeof window,
          s = r ? () => {} : t.useLayoutEffect,
          l = r ? () => {} : t.useEffect;
        function o(e) {
          let { headManager: i, reduceComponentsToState: o } = e;
          function a() {
            if (i && i.mountedInstances) {
              let r = t.Children.toArray(
                Array.from(i.mountedInstances).filter(Boolean)
              );
              i.updateHead(o(r, e));
            }
          }
          if (r) {
            var n;
            null == i || null == (n = i.mountedInstances) || n.add(e.children),
              a();
          }
          return (
            s(() => {
              var t;
              return (
                null == i ||
                  null == (t = i.mountedInstances) ||
                  t.add(e.children),
                () => {
                  var t;
                  null == i ||
                    null == (t = i.mountedInstances) ||
                    t.delete(e.children);
                }
              );
            }),
            s(
              () => (
                i && (i._pendingUpdate = a),
                () => {
                  i && (i._pendingUpdate = a);
                }
              )
            ),
            l(
              () => (
                i &&
                  i._pendingUpdate &&
                  (i._pendingUpdate(), (i._pendingUpdate = null)),
                () => {
                  i &&
                    i._pendingUpdate &&
                    (i._pendingUpdate(), (i._pendingUpdate = null));
                }
              )
            ),
            null
          );
        }
      }
    },
    21884: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        e.i(22271),
          Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "AmpStateContext", {
            enumerable: !0,
            get: function () {
              return t;
            },
          });
        let t = e.r(13314)._(e.r(38653)).default.createContext({});
      }
    },
    68978: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      ("use strict");
      function o(e) {
        let {
          ampFirst: t = !1,
          hybrid: r = !1,
          hasQuery: s = !1,
        } = void 0 === e ? {} : e;
        return t || (r && s);
      }
      Object.defineProperty(i, "__esModule", { value: !0 }),
        Object.defineProperty(i, "isInAmpMode", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
    },
    17153: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        var o = e.i(22271);
        Object.defineProperty(i, "__esModule", { value: !0 });
        var l = {
          default: function () {
            return v;
          },
          defaultHead: function () {
            return n;
          },
        };
        for (var a in l)
          Object.defineProperty(i, a, { enumerable: !0, get: l[a] });
        let t = e.r(13314),
          r = e.r(81369),
          u = e.r(58064),
          m = r._(e.r(38653)),
          p = t._(e.r(70719)),
          f = e.r(21884),
          h = e.r(26796),
          g = e.r(68978);
        function n(e) {
          void 0 === e && (e = !1);
          let t = [(0, u.jsx)("meta", { charSet: "utf-8" }, "charset")];
          return (
            e ||
              t.push(
                (0, u.jsx)(
                  "meta",
                  { name: "viewport", content: "width=device-width" },
                  "viewport"
                )
              ),
            t
          );
        }
        function c(e, t) {
          return "string" == typeof t || "number" == typeof t
            ? e
            : t.type === m.default.Fragment
            ? e.concat(
                m.default.Children.toArray(t.props.children).reduce(
                  (e, t) =>
                    "string" == typeof t || "number" == typeof t
                      ? e
                      : e.concat(t),
                  []
                )
              )
            : e.concat(t);
        }
        e.r(12597);
        let _ = ["name", "httpEquiv", "charSet", "itemProp"];
        function d(e, t) {
          let { inAmpMode: r } = t;
          return e
            .reduce(c, [])
            .reverse()
            .concat(n(r).reverse())
            .filter(
              (function () {
                let e = new Set(),
                  t = new Set(),
                  r = new Set(),
                  s = {};
                return (i) => {
                  let o = !0,
                    l = !1;
                  if (
                    i.key &&
                    "number" != typeof i.key &&
                    i.key.indexOf("$") > 0
                  ) {
                    l = !0;
                    let t = i.key.slice(i.key.indexOf("$") + 1);
                    e.has(t) ? (o = !1) : e.add(t);
                  }
                  switch (i.type) {
                    case "title":
                    case "base":
                      t.has(i.type) ? (o = !1) : t.add(i.type);
                      break;
                    case "meta":
                      for (let e = 0, t = _.length; e < t; e++) {
                        let t = _[e];
                        if (i.props.hasOwnProperty(t))
                          if ("charSet" === t) r.has(t) ? (o = !1) : r.add(t);
                          else {
                            let e = i.props[t],
                              r = s[t] || new Set();
                            ("name" !== t || !l) && r.has(e)
                              ? (o = !1)
                              : (r.add(e), (s[t] = r));
                          }
                      }
                  }
                  return o;
                };
              })()
            )
            .reverse()
            .map((e, t) => {
              let s = e.key || t;
              if (
                o.default.env.__NEXT_OPTIMIZE_FONTS &&
                !r &&
                "link" === e.type &&
                e.props.href &&
                [
                  "https://fonts.googleapis.com/css",
                  "https://use.typekit.net/",
                ].some((t) => e.props.href.startsWith(t))
              ) {
                let t = { ...(e.props || {}) };
                return (
                  (t["data-href"] = t.href),
                  (t.href = void 0),
                  (t["data-optimized-fonts"] = !0),
                  m.default.cloneElement(e, t)
                );
              }
              return m.default.cloneElement(e, { key: s });
            });
        }
        let v = function (e) {
          let { children: t } = e,
            r = (0, m.useContext)(f.AmpStateContext),
            s = (0, m.useContext)(h.HeadManagerContext);
          return (0, u.jsx)(p.default, {
            reduceComponentsToState: d,
            headManager: s,
            inAmpMode: (0, g.isInAmpMode)(r),
            children: t,
          });
        };
        ("function" == typeof i.default ||
          ("object" == typeof i.default && null !== i.default)) &&
          void 0 === i.default.__esModule &&
          (Object.defineProperty(i.default, "__esModule", { value: !0 }),
          Object.assign(i.default, i),
          (s.exports = i.default));
      }
    },
    27772: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        e.i(22271),
          Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "ImageConfigContext", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let t = e.r(13314)._(e.r(38653)),
          r = e.r(61642),
          s = t.default.createContext(r.imageConfigDefault);
      }
    },
    73600: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        e.i(22271),
          Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "RouterContext", {
            enumerable: !0,
            get: function () {
              return t;
            },
          });
        let t = e.r(13314)._(e.r(38653)).default.createContext(null);
      }
    },
    55836: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        function o(e) {
          var t;
          let { config: r, src: s, width: i, quality: o } = e,
            l =
              o ||
              (null == (t = r.qualities)
                ? void 0
                : t.reduce((e, t) =>
                    Math.abs(t - 75) < Math.abs(e - 75) ? t : e
                  )) ||
              75;
          return (
            r.path +
            "?url=" +
            encodeURIComponent(s) +
            "&w=" +
            i +
            "&q=" +
            l +
            (s.startsWith("/_next/static/media/") && 1
              ? "&dpl=dpl_B9gt7akVQEXtNDigDwmPzzsrQzNd"
              : "")
          );
        }
        e.i(22271),
          Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "default", {
            enumerable: !0,
            get: function () {
              return t;
            },
          }),
          (o.__next_img_default = !0);
        let t = o;
      }
    },
    48757: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "useMergedRef", {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let t = e.r(38653);
        function o(e, r) {
          let s = (0, t.useRef)(null),
            i = (0, t.useRef)(null);
          return (0, t.useCallback)(
            (t) => {
              if (null === t) {
                let e = s.current;
                e && ((s.current = null), e());
                let t = i.current;
                t && ((i.current = null), t());
              } else e && (s.current = l(e, t)), r && (i.current = l(r, t));
            },
            [e, r]
          );
        }
        function l(e, t) {
          if ("function" != typeof e)
            return (
              (e.current = t),
              () => {
                e.current = null;
              }
            );
          {
            let r = e(t);
            return "function" == typeof r ? r : () => e(null);
          }
        }
        ("function" == typeof i.default ||
          ("object" == typeof i.default && null !== i.default)) &&
          void 0 === i.default.__esModule &&
          (Object.defineProperty(i.default, "__esModule", { value: !0 }),
          Object.assign(i.default, i),
          (s.exports = i.default));
      }
    },
    11772: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        e.i(22271),
          Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "Image", {
            enumerable: !0,
            get: function () {
              return b;
            },
          });
        let t = e.r(13314),
          r = e.r(81369),
          n = e.r(58064),
          c = r._(e.r(38653)),
          d = t._(e.r(95168)),
          u = t._(e.r(17153)),
          m = e.r(61311),
          p = e.r(61642),
          f = e.r(27772);
        e.r(12597);
        let h = e.r(73600),
          g = t._(e.r(55836)),
          _ = e.r(48757),
          v = JSON.parse(
            '{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","dangerouslyAllowSVG":true,"unoptimized":false}'
          );
        function o(e, t, r, s, i, o, l) {
          let a = null == e ? void 0 : e.src;
          e &&
            e["data-loaded-src"] !== a &&
            ((e["data-loaded-src"] = a),
            ("decode" in e ? e.decode() : Promise.resolve())
              .catch(() => {})
              .then(() => {
                if (e.parentElement && e.isConnected) {
                  if (
                    ("empty" !== t && i(!0), null == r ? void 0 : r.current)
                  ) {
                    let t = new Event("load");
                    Object.defineProperty(t, "target", {
                      writable: !1,
                      value: e,
                    });
                    let s = !1,
                      i = !1;
                    r.current({
                      ...t,
                      nativeEvent: t,
                      currentTarget: e,
                      target: e,
                      isDefaultPrevented: () => s,
                      isPropagationStopped: () => i,
                      persist: () => {},
                      preventDefault: () => {
                        (s = !0), t.preventDefault();
                      },
                      stopPropagation: () => {
                        (i = !0), t.stopPropagation();
                      },
                    });
                  }
                  (null == s ? void 0 : s.current) && s.current(e);
                }
              }));
        }
        function l(e) {
          return c.use ? { fetchPriority: e } : { fetchpriority: e };
        }
        "undefined" == typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
        let y = (0, c.forwardRef)((e, t) => {
          let {
              src: r,
              srcSet: s,
              sizes: i,
              height: a,
              width: d,
              decoding: u,
              className: m,
              style: p,
              fetchPriority: f,
              placeholder: h,
              loading: g,
              unoptimized: v,
              fill: y,
              onLoadRef: b,
              onLoadingCompleteRef: x,
              setBlurComplete: w,
              setShowAltText: k,
              sizesInput: S,
              onLoad: j,
              onError: E,
              ...N
            } = e,
            C = (0, c.useCallback)(
              (e) => {
                e &&
                  (E && (e.src = e.src), e.complete && o(e, h, b, x, w, v, S));
              },
              [r, h, b, x, w, E, v, S]
            ),
            T = (0, _.useMergedRef)(t, C);
          return (0, n.jsx)("img", {
            ...N,
            ...l(f),
            loading: g,
            width: d,
            height: a,
            decoding: u,
            "data-nimg": y ? "fill" : "1",
            className: m,
            style: p,
            sizes: i,
            srcSet: s,
            src: r,
            ref: T,
            onLoad: (e) => {
              o(e.currentTarget, h, b, x, w, v, S);
            },
            onError: (e) => {
              k(!0), "empty" !== h && w(!0), E && E(e);
            },
          });
        });
        function a(e) {
          let { isAppRouter: t, imgAttributes: r } = e,
            s = {
              as: "image",
              imageSrcSet: r.srcSet,
              imageSizes: r.sizes,
              crossOrigin: r.crossOrigin,
              referrerPolicy: r.referrerPolicy,
              ...l(r.fetchPriority),
            };
          return t && d.default.preload
            ? (d.default.preload(r.src, s), null)
            : (0, n.jsx)(u.default, {
                children: (0, n.jsx)(
                  "link",
                  { rel: "preload", href: r.srcSet ? void 0 : r.src, ...s },
                  "__nimg-" + r.src + r.srcSet + r.sizes
                ),
              });
        }
        let b = (0, c.forwardRef)((e, t) => {
          let r = (0, c.useContext)(h.RouterContext),
            s = (0, c.useContext)(f.ImageConfigContext),
            i = (0, c.useMemo)(() => {
              var e;
              let t = v || s || p.imageConfigDefault,
                r = [...t.deviceSizes, ...t.imageSizes].sort((e, t) => e - t),
                i = t.deviceSizes.sort((e, t) => e - t),
                o =
                  null == (e = t.qualities) ? void 0 : e.sort((e, t) => e - t);
              return { ...t, allSizes: r, deviceSizes: i, qualities: o };
            }, [s]),
            { onLoad: o, onLoadingComplete: l } = e,
            d = (0, c.useRef)(o);
          (0, c.useEffect)(() => {
            d.current = o;
          }, [o]);
          let u = (0, c.useRef)(l);
          (0, c.useEffect)(() => {
            u.current = l;
          }, [l]);
          let [_, b] = (0, c.useState)(!1),
            [x, w] = (0, c.useState)(!1),
            { props: k, meta: S } = (0, m.getImgProps)(e, {
              defaultLoader: g.default,
              imgConf: i,
              blurComplete: _,
              showAltText: x,
            });
          return (0, n.jsxs)(n.Fragment, {
            children: [
              (0, n.jsx)(y, {
                ...k,
                unoptimized: S.unoptimized,
                placeholder: S.placeholder,
                fill: S.fill,
                onLoadRef: d,
                onLoadingCompleteRef: u,
                setBlurComplete: b,
                setShowAltText: w,
                sizesInput: e.sizes,
                ref: t,
              }),
              S.priority
                ? (0, n.jsx)(a, { isAppRouter: !r, imgAttributes: k })
                : null,
            ],
          });
        });
        ("function" == typeof i.default ||
          ("object" == typeof i.default && null !== i.default)) &&
          void 0 === i.default.__esModule &&
          (Object.defineProperty(i.default, "__esModule", { value: !0 }),
          Object.assign(i.default, i),
          (s.exports = i.default));
      }
    },
    82653: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        e.i(22271);
        ("use strict");
        Object.defineProperty(i, "__esModule", { value: !0 });
        var o = {
          default: function () {
            return c;
          },
          getImageProps: function () {
            return a;
          },
        };
        for (var l in o)
          Object.defineProperty(i, l, { enumerable: !0, get: o[l] });
        let t = e.r(13314),
          r = e.r(61311),
          s = e.r(11772),
          n = t._(e.r(55836));
        function a(e) {
          let { props: t } = (0, r.getImgProps)(e, {
            defaultLoader: n.default,
            imgConf: JSON.parse(
              '{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","dangerouslyAllowSVG":true,"unoptimized":false}'
            ),
          });
          for (let [e, r] of Object.entries(t)) void 0 === r && delete t[e];
          return { props: t };
        }
        let c = s.Image;
      }
    },
    12568: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      s.exports = e.r(82653);
    },
    20051: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({ block: "image-module___v4zoa__block" });
    },
    67376: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Image: () => c });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(12568);
      e.i(7442);
      var a = e.i(51602),
        n = e.i(20051);
      function c(e) {
        let t,
          r,
          c,
          u,
          m,
          p,
          f,
          h,
          g,
          _,
          v,
          y,
          b,
          x,
          w,
          k,
          S,
          j,
          E,
          N,
          C,
          T = (0, i.c)(41);
        T[0] !== e
          ? (({
              style: f,
              className: t,
              loading: h,
              objectFit: g,
              quality: _,
              alt: v,
              fill: r,
              block: y,
              width: b,
              height: x,
              mobileSize: w,
              desktopSize: k,
              sizes: m,
              src: p,
              unoptimized: S,
              ref: u,
              ...c
            } = e),
            (T[0] = e),
            (T[1] = t),
            (T[2] = r),
            (T[3] = c),
            (T[4] = u),
            (T[5] = m),
            (T[6] = p),
            (T[7] = f),
            (T[8] = h),
            (T[9] = g),
            (T[10] = _),
            (T[11] = v),
            (T[12] = y),
            (T[13] = b),
            (T[14] = x),
            (T[15] = w),
            (T[16] = k),
            (T[17] = S))
          : ((t = T[1]),
            (r = T[2]),
            (c = T[3]),
            (u = T[4]),
            (m = T[5]),
            (p = T[6]),
            (f = T[7]),
            (h = T[8]),
            (g = T[9]),
            (_ = T[10]),
            (v = T[11]),
            (y = T[12]),
            (b = T[13]),
            (x = T[14]),
            (w = T[15]),
            (k = T[16]),
            (S = T[17]));
        let O = void 0 === h ? "eager" : h,
          P = void 0 === g ? "cover" : g,
          R = void 0 === _ ? 90 : _,
          M = void 0 === v ? "" : v,
          I = void 0 === y ? !r : y,
          L = void 0 === b ? (I ? 1 : void 0) : b,
          U = void 0 === x ? (I ? 1 : void 0) : x,
          z = void 0 === w ? "100vw" : w,
          W = void 0 === k ? "100vw" : k;
        if (!p) return;
        m = m || `(max-width: ${a.breakpoints.dt}px) ${z}, ${W}`;
        let $ = u,
          D = !I;
        T[18] !== P || T[19] !== f
          ? ((j = { objectFit: P, ...f }),
            (T[18] = P),
            (T[19] = f),
            (T[20] = j))
          : (j = T[20]);
        let q = I && n.default.block;
        return (
          T[21] !== t || T[22] !== q
            ? ((E = (0, o.default)(t, q)),
              (T[21] = t),
              (T[22] = q),
              (T[23] = E))
            : (E = T[23]),
          T[24] !== p || T[25] !== S
            ? ((N = S || ("string" == typeof p && p?.includes(".svg"))),
              (T[24] = p),
              (T[25] = S),
              (T[26] = N))
            : (N = T[26]),
          T[27] !== M ||
          T[28] !== U ||
          T[29] !== O ||
          T[30] !== c ||
          T[31] !== R ||
          T[32] !== u ||
          T[33] !== m ||
          T[34] !== p ||
          T[35] !== D ||
          T[36] !== j ||
          T[37] !== E ||
          T[38] !== N ||
          T[39] !== L
            ? ((C = (0, s.jsx)(l.default, {
                ref: $,
                fill: D,
                width: L,
                height: U,
                loading: O,
                quality: R,
                alt: M,
                style: j,
                className: E,
                sizes: m,
                src: p,
                unoptimized: N,
                draggable: "false",
                onDragStart: d,
                ...c,
              })),
              (T[27] = M),
              (T[28] = U),
              (T[29] = O),
              (T[30] = c),
              (T[31] = R),
              (T[32] = u),
              (T[33] = m),
              (T[34] = p),
              (T[35] = D),
              (T[36] = j),
              (T[37] = E),
              (T[38] = N),
              (T[39] = L),
              (T[40] = C))
            : (C = T[40]),
          C
        );
      }
      function d(e) {
        return e.preventDefault();
      }
    },
    50748: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ SplitText: () => b, default: () => b });
        let t,
          r,
          s,
          i = () => s || b.register(window.gsap),
          o = "undefined" != typeof Intl ? new Intl.Segmenter() : 0,
          l = (e) =>
            "string" == typeof e
              ? l(document.querySelectorAll(e))
              : "length" in e
              ? Array.from(e)
              : [e],
          a = (e) => l(e).filter((e) => e instanceof HTMLElement),
          n = [],
          c = function () {},
          d = /\s+/g,
          u = RegExp(
            "\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.",
            "gu"
          ),
          m = { left: 0, top: 0, width: 0, height: 0 },
          p = (e, t) => {
            if (t) {
              let r = new Set(e.join("").match(t) || n),
                s = e.length,
                i,
                o,
                l,
                a;
              if (r.size) {
                for (; --s > -1; )
                  for (l of ((o = e[s]), r))
                    if (l.startsWith(o) && l.length > o.length) {
                      for (
                        i = 0, a = o;
                        l.startsWith((a += e[s + ++i])) && a.length < l.length;

                      );
                      if (i && a.length === l.length) {
                        (e[s] = l), e.splice(s + 1, i);
                        break;
                      }
                    }
              }
            }
            return e;
          },
          f = (e) =>
            "inline" === window.getComputedStyle(e).display &&
            (e.style.display = "inline-block"),
          h = (e, t, r) =>
            t.insertBefore(
              "string" == typeof e ? document.createTextNode(e) : e,
              r
            ),
          g = (e, t, r) => {
            let s = t[e + "sClass"] || "",
              { tag: i = "div", aria: o = "auto", propIndex: l = !1 } = t,
              a = "line" === e ? "block" : "inline-block",
              n = s.indexOf("++") > -1,
              c = (t) => {
                let c = document.createElement(i),
                  d = r.length + 1;
                return (
                  s && (c.className = s + (n ? " " + s + d : "")),
                  l && c.style.setProperty("--" + e, d + ""),
                  "none" !== o && c.setAttribute("aria-hidden", "true"),
                  "span" !== i &&
                    ((c.style.position = "relative"), (c.style.display = a)),
                  (c.textContent = t),
                  r.push(c),
                  c
                );
              };
            return n && (s = s.replace("++", "")), (c.collection = r), c;
          },
          _ = (e, t, r, s) => {
            let i = g("line", r, s),
              o = window.getComputedStyle(e).textAlign || "left";
            return (r, s) => {
              let l = i("");
              for (l.style.textAlign = o, e.insertBefore(l, t[r]); r < s; r++)
                l.appendChild(t[r]);
              l.normalize();
            };
          },
          v = (e, t, r, s, i, l, a, c, u, m) => {
            var g;
            let _ = Array.from(e.childNodes),
              y = 0,
              {
                wordDelimiter: b,
                reduceWhiteSpace: x = !0,
                prepareText: w,
              } = t,
              k = e.getBoundingClientRect(),
              S = k,
              j =
                !x &&
                "pre" === window.getComputedStyle(e).whiteSpace.substring(0, 3),
              E = 0,
              N = r.collection,
              C,
              T,
              O,
              P,
              R,
              M,
              I,
              L,
              U,
              z,
              W,
              $,
              D,
              q,
              G,
              A,
              B,
              H;
            for (
              "object" == typeof b
                ? ((O = b.delimiter || b), (T = b.replaceWith || ""))
                : (T = "" === b ? "" : b || " "),
                C = " " !== T;
              y < _.length;
              y++
            )
              if (3 === (P = _[y]).nodeType) {
                for (
                  G = P.textContent || "",
                    x
                      ? (G = G.replace(d, " "))
                      : j && (G = G.replace(/\n/g, T + "\n")),
                    w && (G = w(G, e)),
                    P.textContent = G,
                    B = (R = T || O ? G.split(O || T) : G.match(c) || n)[
                      R.length - 1
                    ],
                    L = C ? " " === B.slice(-1) : !B,
                    B || R.pop(),
                    S = k,
                    (I = C ? " " === R[0].charAt(0) : !R[0]) && h(" ", e, P),
                    R[0] || R.shift(),
                    p(R, u),
                    (l && m) || (P.textContent = ""),
                    U = 1;
                  U <= R.length;
                  U++
                )
                  if (
                    ((A = R[U - 1]),
                    !x &&
                      j &&
                      "\n" === A.charAt(0) &&
                      (null == (g = P.previousSibling) || g.remove(),
                      h(document.createElement("br"), e, P),
                      (A = A.slice(1))),
                    x || "" !== A)
                  )
                    if (" " === A)
                      e.insertBefore(document.createTextNode(" "), P);
                    else {
                      if (
                        (C && " " === A.charAt(0) && h(" ", e, P),
                        E && 1 === U && !I && N.indexOf(E.parentNode) > -1
                          ? (M = N[N.length - 1]).appendChild(
                              document.createTextNode(s ? "" : A)
                            )
                          : (h((M = r(s ? "" : A)), e, P),
                            E &&
                              1 === U &&
                              !I &&
                              M.insertBefore(E, M.firstChild)),
                        s)
                      )
                        for (
                          H = 0,
                            W = o
                              ? p(
                                  [...o.segment(A)].map((e) => e.segment),
                                  u
                                )
                              : A.match(c) || n;
                          H < W.length;
                          H++
                        )
                          M.appendChild(
                            " " === W[H]
                              ? document.createTextNode(" ")
                              : s(W[H])
                          );
                      if (l && m) {
                        if (
                          ((G = P.textContent =
                            G.substring(A.length + 1, G.length)),
                          (z = M.getBoundingClientRect()).top > S.top &&
                            z.left <= S.left)
                        ) {
                          for (
                            $ = e.cloneNode(), D = e.childNodes[0];
                            D && D !== M;

                          )
                            (q = D), (D = D.nextSibling), $.appendChild(q);
                          e.parentNode.insertBefore($, e), i && f($);
                        }
                        S = z;
                      }
                      (U < R.length || L) &&
                        h(
                          U >= R.length
                            ? " "
                            : C && " " === A.slice(-1)
                            ? " " + T
                            : T,
                          e,
                          P
                        );
                    }
                  else h(T, e, P);
                e.removeChild(P), (E = 0);
              } else
                1 === P.nodeType &&
                  (a && a.indexOf(P) > -1
                    ? (N.indexOf(P.previousSibling) > -1 &&
                        N[N.length - 1].appendChild(P),
                      (E = P))
                    : (v(P, t, r, s, i, l, a, c, u, !0), (E = 0)),
                  i && f(P));
          },
          y = class e {
            constructor(e, t) {
              (this.isSplit = !1),
                i(),
                (this.elements = a(e)),
                (this.chars = []),
                (this.words = []),
                (this.lines = []),
                (this.masks = []),
                (this.vars = t),
                (this._split = () => this.isSplit && this.split(this.vars));
              let r = [],
                s,
                o = () => {
                  let e = r.length,
                    t;
                  for (; e--; ) {
                    let s = (t = r[e]).element.offsetWidth;
                    if (s !== t.width) {
                      (t.width = s), this._split();
                      return;
                    }
                  }
                };
              (this._data = {
                orig: r,
                obs:
                  "undefined" != typeof ResizeObserver &&
                  new ResizeObserver(() => {
                    clearTimeout(s), (s = setTimeout(o, 200));
                  }),
              }),
                c(this),
                this.split(t);
            }
            split(e) {
              this.isSplit && this.revert(),
                (this.vars = e = e || this.vars || {});
              let {
                  type: t = "chars,words,lines",
                  aria: s = "auto",
                  deepSlice: i = !0,
                  smartWrap: o,
                  onSplit: n,
                  autoSplit: c = !1,
                  specialChars: d,
                  mask: p,
                } = this.vars,
                f = t.indexOf("lines") > -1,
                h = t.indexOf("chars") > -1,
                y = t.indexOf("words") > -1,
                b = h && !y && !f,
                x =
                  d &&
                  ("push" in d ? RegExp("(?:" + d.join("|") + ")", "gu") : d),
                w = x ? RegExp(x.source + "|" + u.source, "gu") : u,
                k = !!e.ignore && a(e.ignore),
                { orig: S, animTime: j, obs: E } = this._data,
                N;
              return (
                (h || y || f) &&
                  (this.elements.forEach((t, r) => {
                    (S[r] = {
                      element: t,
                      html: t.innerHTML,
                      ariaL: t.getAttribute("aria-label"),
                      ariaH: t.getAttribute("aria-hidden"),
                    }),
                      "auto" === s
                        ? t.setAttribute(
                            "aria-label",
                            (t.textContent || "").trim()
                          )
                        : "hidden" === s &&
                          t.setAttribute("aria-hidden", "true");
                    let a = [],
                      n = [],
                      c = [],
                      d = h ? g("char", e, a) : null,
                      u = g("word", e, n),
                      p,
                      j,
                      E,
                      N;
                    if ((v(t, e, u, d, b, i && (f || b), k, w, x, !1), f)) {
                      let r = l(t.childNodes),
                        s = _(t, r, e, c),
                        i,
                        o = [],
                        a = 0,
                        n = r.map((e) =>
                          1 === e.nodeType ? e.getBoundingClientRect() : m
                        ),
                        d = m;
                      for (p = 0; p < r.length; p++)
                        1 === (i = r[p]).nodeType &&
                          ("BR" === i.nodeName
                            ? (o.push(i), s(a, p + 1), (d = n[(a = p + 1)]))
                            : (p &&
                                n[p].top > d.top &&
                                n[p].left <= d.left &&
                                (s(a, p), (a = p)),
                              (d = n[p])));
                      a < p && s(a, p),
                        o.forEach((e) => {
                          var t;
                          return null == (t = e.parentNode)
                            ? void 0
                            : t.removeChild(e);
                        });
                    }
                    if (!y) {
                      for (p = 0; p < n.length; p++)
                        if (
                          ((j = n[p]),
                          h || !j.nextSibling || 3 !== j.nextSibling.nodeType)
                        )
                          if (o && !f) {
                            for (
                              (E =
                                document.createElement(
                                  "span"
                                )).style.whiteSpace = "nowrap";
                              j.firstChild;

                            )
                              E.appendChild(j.firstChild);
                            j.replaceWith(E);
                          } else j.replaceWith(...j.childNodes);
                        else
                          (N = j.nextSibling) &&
                            3 === N.nodeType &&
                            ((N.textContent =
                              (j.textContent || "") + (N.textContent || "")),
                            j.remove());
                      (n.length = 0), t.normalize();
                    }
                    this.lines.push(...c),
                      this.words.push(...n),
                      this.chars.push(...a);
                  }),
                  p &&
                    this[p] &&
                    this.masks.push(
                      ...this[p].map((e) => {
                        let t = e.cloneNode();
                        return (
                          e.replaceWith(t),
                          t.appendChild(e),
                          e.className &&
                            (t.className = e.className.replace(
                              /(\b\w+\b)/g,
                              "$1-mask"
                            )),
                          (t.style.overflow = "clip"),
                          t
                        );
                      })
                    )),
                (this.isSplit = !0),
                r &&
                  (c
                    ? r.addEventListener("loadingdone", this._split)
                    : "loading" === r.status &&
                      console.warn("SplitText called before fonts loaded")),
                (N = n && n(this)) &&
                  N.totalTime &&
                  (this._data.anim = j ? N.totalTime(j) : N),
                f &&
                  c &&
                  this.elements.forEach((e, t) => {
                    (S[t].width = e.offsetWidth), E && E.observe(e);
                  }),
                this
              );
            }
            revert() {
              var e, t;
              let { orig: s, anim: i, obs: o } = this._data;
              return (
                o && o.disconnect(),
                s.forEach(({ element: e, html: t, ariaL: r, ariaH: s }) => {
                  (e.innerHTML = t),
                    r
                      ? e.setAttribute("aria-label", r)
                      : e.removeAttribute("aria-label"),
                    s
                      ? e.setAttribute("aria-hidden", s)
                      : e.removeAttribute("aria-hidden");
                }),
                (this.chars.length =
                  this.words.length =
                  this.lines.length =
                  s.length =
                  this.masks.length =
                    0),
                (this.isSplit = !1),
                null == r || r.removeEventListener("loadingdone", this._split),
                i && ((this._data.animTime = i.totalTime()), i.revert()),
                null == (t = (e = this.vars).onRevert) || t.call(e, this),
                this
              );
            }
            static create(t, r) {
              return new e(t, r);
            }
            static register(e) {
              (t = t || e || window.gsap) &&
                ((l = t.utils.toArray), (c = t.core.context || c)),
                !s && window.innerWidth > 0 && ((r = document.fonts), (s = !0));
            }
          };
        y.version = "3.13.0";
        let b = y;
      }
    },
    49476: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ useIsVisualEditor: () => o });
      var s = e.i(85444),
        i = e.i(38653);
      function o() {
        let e,
          t,
          r = (0, s.c)(2),
          [o, l] = (0, i.useState)(!1);
        return (
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = () => {
                l(window.location.search.includes("_storyblok"));
              }),
              (t = []),
              (r[0] = e),
              (r[1] = t))
            : ((e = r[0]), (t = r[1])),
          (0, i.useEffect)(e, t),
          o
        );
      }
    },
    48823: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ easings: () => c });
        let t = Math.pow,
          r = Math.sqrt,
          s = Math.sin,
          i = Math.cos,
          o = Math.PI,
          l = (2 * o) / 3,
          a = (2 * o) / 4.5,
          n = (e) =>
            e < 0.36363636363636365
              ? 7.5625 * e * e
              : e < 0.7272727272727273
              ? 7.5625 * (e - 0.5454545454545454) * e + 0.75
              : e < 0.9090909090909091
              ? 7.5625 * (e - 0.8181818181818182) * e + 0.9375
              : 7.5625 * (e - 0.9545454545454546) * e + 0.984375,
          c = {
            linear: (e) => e,
            easeInQuad: (e) => e * e,
            easeOutQuad: (e) => 1 - (1 - e) * (1 - e),
            easeInOutQuad: (e) =>
              e < 0.5 ? 2 * e * e : 1 - t(-2 * e + 2, 2) / 2,
            easeInCubic: (e) => e * e * e,
            easeOutCubic: (e) => 1 - t(1 - e, 3),
            easeInOutCubic: (e) =>
              e < 0.5 ? 4 * e * e * e : 1 - t(-2 * e + 2, 3) / 2,
            easeInQuart: (e) => e * e * e * e,
            easeOutQuart: (e) => 1 - t(1 - e, 4),
            easeInOutQuart: (e) =>
              e < 0.5 ? 8 * e * e * e * e : 1 - t(-2 * e + 2, 4) / 2,
            easeInQuint: (e) => e * e * e * e * e,
            easeOutQuint: (e) => 1 - t(1 - e, 5),
            easeInOutQuint: (e) =>
              e < 0.5 ? 16 * e * e * e * e * e : 1 - t(-2 * e + 2, 5) / 2,
            easeInSine: (e) => 1 - i((e * o) / 2),
            easeOutSine: (e) => s((e * o) / 2),
            easeInOutSine: (e) => -(i(o * e) - 1) / 2,
            easeInExpo: (e) => (0 === e ? 0 : t(2, 10 * e - 10)),
            easeOutExpo: (e) => (1 === e ? 1 : 1 - t(2, -10 * e)),
            easeInOutExpo: (e) =>
              0 === e
                ? 0
                : 1 === e
                ? 1
                : e < 0.5
                ? t(2, 20 * e - 10) / 2
                : (2 - t(2, -20 * e + 10)) / 2,
            easeInCirc: (e) => 1 - r(1 - t(e, 2)),
            easeOutCirc: (e) => r(1 - t(e - 1, 2)),
            easeInOutCirc: (e) =>
              e < 0.5
                ? (1 - r(1 - t(2 * e, 2))) / 2
                : (r(1 - t(-2 * e + 2, 2)) + 1) / 2,
            easeInBack: (e) => 2.70158 * e * e * e - 1.70158 * e * e,
            easeOutBack: (e) =>
              1 + 2.70158 * t(e - 1, 3) + 1.70158 * t(e - 1, 2),
            easeInOutBack: (e) =>
              e < 0.5
                ? (t(2 * e, 2) * (7.189819 * e - 2.5949095)) / 2
                : (t(2 * e - 2, 2) * (3.5949095 * (2 * e - 2) + 2.5949095) +
                    2) /
                  2,
            easeInElastic: (e) =>
              0 === e
                ? 0
                : 1 === e
                ? 1
                : -t(2, 10 * e - 10) * s((10 * e - 10.75) * l),
            easeOutElastic: (e) =>
              0 === e
                ? 0
                : 1 === e
                ? 1
                : t(2, -10 * e) * s((10 * e - 0.75) * l) + 1,
            easeInOutElastic: (e) =>
              0 === e
                ? 0
                : 1 === e
                ? 1
                : e < 0.5
                ? -(t(2, 20 * e - 10) * s((20 * e - 11.125) * a)) / 2
                : (t(2, -20 * e + 10) * s((20 * e - 11.125) * a)) / 2 + 1,
            easeInBounce: (e) => 1 - n(1 - e),
            easeOutBounce: n,
            easeInOutBounce: (e) =>
              e < 0.5 ? (1 - n(1 - 2 * e)) / 2 : (1 + n(2 * e - 1)) / 2,
            cubicBezier: (e, t, r, s, i) => {
              let o = 1 - i;
              return (
                o ** 3 * e +
                3 * o ** 2 * i * t +
                3 * o * i ** 2 * r +
                i ** 3 * s
              );
            },
          };
      }
    },
    47103: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({
          clamp: () => i,
          default: () => t,
          ease: () => d,
          fromTo: () => u,
          lerp: () => l,
          mapRange: () => o,
          modulo: () => n,
          stagger: () => c,
          truncate: () => a,
        });
        var s = e.i(48823);
        function i(e, t, r) {
          return Math.max(e, Math.min(t, r));
        }
        function o(e, t, r, s, l, a = !1) {
          let n = ((r - e) * (l - s)) / (t - e) + s;
          return s > l ? (a ? i(l, n, s) : n) : a ? i(s, n, l) : n;
        }
        function l(e, t, r) {
          return (1 - r) * e + r * t;
        }
        function a(e, t) {
          return Number.parseFloat(e.toFixed(t));
        }
        function n(e, t) {
          return 0 === t ? e : t < 0 ? Number.NaN : ((e % t) + t) % t;
        }
        function c(e, t, r, s) {
          return i(0, o(e * s, 1 - (t - e) * s, r, 0, 1), 1);
        }
        function d(e, t) {
          return s.easings[t](e);
        }
        function u(e, t = 0, r = 1, s = 0, i = {}) {
          if (!e) return;
          void 0 === i?.stagger && (i.stagger = 0),
            void 0 === i?.ease && (i.ease = "linear");
          let l = "object" == typeof t ? Object.keys(t) : ["value"],
            a = Array.isArray(e) ? e : [e];
          for (let [e, n] of a.entries()) {
            let u = d(c(e, a.length, s, i.stagger), i.ease),
              m = Object.fromEntries(
                l.map((s) => {
                  let i = "object" == typeof t ? t[s] : t,
                    l = "object" == typeof r ? r[s] : r;
                  return [
                    s,
                    o(
                      0,
                      1,
                      u,
                      "function" == typeof i ? i(e) : i,
                      "function" == typeof l ? l(e) : l
                    ),
                  ];
                })
              );
            i.render && n && i.render(n, m);
          }
        }
        let t = {
          lerp: l,
          clamp: i,
          mapRange: o,
          truncate: a,
          modulo: n,
          stagger: c,
          ease: d,
          fromTo: u,
        };
      }
    },
    81453: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        fallback: "split-text-module__McvV0q__fallback",
        split: "split-text-module__McvV0q__split",
        splitText: "split-text-module__McvV0q__splitText",
        willAppear: "split-text-module__McvV0q__willAppear",
      });
    },
    36940: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ SplitText: () => u });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(50748),
        a = e.i(38653),
        n = e.i(49476),
        c = e.i(47103),
        d = e.i(81453);
      function u(e) {
        let t,
          r,
          u,
          p,
          f,
          h,
          g,
          _,
          v = (0, i.c)(31),
          {
            ref: y,
            children: b,
            className: x,
            as: w,
            ease: k,
            willAppear: S,
            type: j,
          } = e,
          E = void 0 === w ? "span" : w,
          N = void 0 === k ? "easeOutSine" : k,
          C = void 0 === S || S,
          T = void 0 === j ? "words" : j,
          O = (0, n.useIsVisualEditor)(),
          P = (0, a.useRef)(null),
          R = (0, a.useRef)(null),
          [M, I] = (0, a.useState)(null);
        if (
          (v[0] !== T
            ? ((t = () => {
                if (!R.current) return;
                let e = R.current;
                e?.children.length === 1 && (e = e.children[0]);
                let t = l.SplitText.create(e, {
                  type: T,
                  mask: T,
                  wordsClass: "word",
                  linesClass: "line",
                  charsClass: "char",
                });
                return (
                  I(t),
                  () => {
                    t.revert(), I(null);
                  }
                );
              }),
              (v[0] = T),
              (v[1] = t))
            : (t = v[1]),
          v[2] !== b ? ((r = [b]), (v[2] = b), (v[3] = r)) : (r = v[3]),
          (0, a.useEffect)(t, r),
          v[4] !== N || v[5] !== M || v[6] !== T || v[7] !== C
            ? ((u = () => ({
                getNode: () => P.current,
                setProgress: (e) => {
                  C &&
                    P.current?.style.setProperty("opacity", e > 0 ? "1" : "0"),
                    M &&
                      (0, c.fromTo)(M?.[T], { y: 100 }, { y: 0 }, e, {
                        ease: N,
                        stagger: 0.1,
                        render: m,
                      });
                },
              })),
              (v[4] = N),
              (v[5] = M),
              (v[6] = T),
              (v[7] = C),
              (v[8] = u))
            : (u = v[8]),
          (0, a.useImperativeHandle)(y, u),
          O)
        ) {
          let e, t, r;
          v[9] !== x
            ? ((e = (0, o.default)(d.default.splitText, x)),
              (v[9] = x),
              (v[10] = e))
            : (e = v[10]);
          let i = +!!C;
          return (
            v[11] !== i
              ? ((t = { opacity: i }), (v[11] = i), (v[12] = t))
              : (t = v[12]),
            v[13] !== E || v[14] !== b || v[15] !== t || v[16] !== e
              ? ((r = (0, s.jsx)(E, {
                  className: e,
                  ref: P,
                  style: t,
                  children: b,
                })),
                (v[13] = E),
                (v[14] = b),
                (v[15] = t),
                (v[16] = e),
                (v[17] = r))
              : (r = v[17]),
            r
          );
        }
        v[18] !== x
          ? ((p = (0, o.default)(d.default.splitText, x)),
            (v[18] = x),
            (v[19] = p))
          : (p = v[19]);
        let L = +!!C;
        return (
          v[20] !== L
            ? ((f = { opacity: L }), (v[20] = L), (v[21] = f))
            : (f = v[21]),
          v[22] !== b
            ? ((h = (0, s.jsx)("span", {
                className: d.default.split,
                ref: R,
                children: b,
              })),
              (g = (0, s.jsx)("span", {
                className: d.default.fallback,
                children: b,
              })),
              (v[22] = b),
              (v[23] = h),
              (v[24] = g))
            : ((h = v[23]), (g = v[24])),
          v[25] !== E ||
          v[26] !== f ||
          v[27] !== h ||
          v[28] !== g ||
          v[29] !== p
            ? ((_ = (0, s.jsxs)(E, {
                className: p,
                ref: P,
                style: f,
                children: [h, g],
              })),
              (v[25] = E),
              (v[26] = f),
              (v[27] = h),
              (v[28] = g),
              (v[29] = p),
              (v[30] = _))
            : (_ = v[30]),
          _
        );
      }
      function m(e, t) {
        let { y: r } = t;
        e instanceof HTMLElement &&
          e.style.setProperty("transform", `translateY(${r}%)`);
      }
    },
    97287: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({
          StoryblokContext: () => t,
          StoryblokContextProvider: () => d,
          useStoryblokContext: () => n,
        });
        var s = e.i(58064),
          i = e.i(85444),
          o = e.i(31111),
          l = e.i(38653),
          a = e.i(49476);
        let t = (0, l.createContext)({});
        function n() {
          return (0, l.useContext)(t);
        }
        function c(e) {
          let t,
            r = (0, i.c)(3),
            { onLoad: l } = e,
            n = (0, a.useIsVisualEditor)();
          return (
            r[0] !== n || r[1] !== l
              ? ((t =
                  n &&
                  (0, s.jsx)(o.default, {
                    src: "//app.storyblok.com/f/storyblok-v2-latest.js",
                    type: "text/javascript",
                    onLoad: l,
                    strategy: "afterInteractive",
                  })),
                (r[0] = n),
                (r[1] = l),
                (r[2] = t))
              : (t = r[2]),
            t
          );
        }
        function d(e) {
          let r,
            o,
            a,
            n,
            d,
            u = (0, i.c)(13),
            { story: m, options: p, children: f } = e,
            h = m.id,
            [g, _] = (0, l.useState)(m);
          u[0] !== h || u[1] !== p
            ? ((r = () => {
                new window.StoryblokBridge(p).on("input", (e) => {
                  e && e.story?.id === h && _(e.story);
                });
              }),
              (u[0] = h),
              (u[1] = p),
              (u[2] = r))
            : (r = u[2]);
          let v = r;
          return (
            u[3] !== v
              ? ((o = (0, s.jsx)(l.Suspense, {
                  children: (0, s.jsx)(c, { onLoad: v }),
                })),
                (u[3] = v),
                (u[4] = o))
              : (o = u[4]),
            u[5] !== g
              ? ((a = { story: g }), (u[5] = g), (u[6] = a))
              : (a = u[6]),
            u[7] !== f || u[8] !== a
              ? ((n = (0, s.jsx)(t.Provider, { value: a, children: f })),
                (u[7] = f),
                (u[8] = a),
                (u[9] = n))
              : (n = u[9]),
            u[10] !== o || u[11] !== n
              ? ((d = (0, s.jsxs)(s.Fragment, { children: [o, n] })),
                (u[10] = o),
                (u[11] = n),
                (u[12] = d))
              : (d = u[12]),
            d
          );
        }
      }
    },
    42928: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ useStore: () => t });
        let t = (0, e.i(77666).create)((e) => ({
          lenisSnap: void 0,
          isNavOpened: !1,
          isLoading: !1,
          isNavigationCollapsed: !1,
          setLenisSnap: (t) => e({ lenisSnap: t }),
          setIsNavOpened: (t) => e({ isNavOpened: t }),
          setIsLoading: (t) => e({ isLoading: t }),
          setIsNavigationCollapsed: (t) => e({ isNavigationCollapsed: t }),
        }));
      }
    },
    90858: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        illuminate: "luma-illuminate-text-module__laZ2Ka__illuminate",
        illuminateChar: "luma-illuminate-text-module__laZ2Ka__illuminateChar",
        luma: "luma-illuminate-text-module__laZ2Ka__luma",
        lumaIlluminate: "luma-illuminate-text-module__laZ2Ka__lumaIlluminate",
        splitChar: "luma-illuminate-text-module__laZ2Ka__splitChar",
      });
    },
    74957: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ LumaIlluminateText: () => n });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(17170),
        l = e.i(38653),
        a = e.i(90858);
      function n(e) {
        let t,
          r,
          n,
          c,
          d,
          u,
          m,
          p,
          f = (0, i.c)(8),
          { ref: h } = e,
          g = (0, l.useRef)(null),
          _ = (0, l.useRef)(null),
          v = (0, l.useRef)(null);
        f[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = []), (f[0] = t))
          : (t = f[0]);
        let y = (0, l.useRef)(t);
        f[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = []), (f[1] = r))
          : (r = f[1]);
        let b = (0, l.useRef)(r);
        f[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = [1, 3, 4, 7]), (f[2] = n))
          : (n = f[2]);
        let x = n;
        f[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = (e) =>
              b.current[x[e]].getBoundingClientRect().x -
              y.current[e].getBoundingClientRect().x),
            (f[3] = c))
          : (c = f[3]);
        let w = c;
        f[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = () => {
              let e = o.default.timeline();
              return (
                e.fromTo(
                  g.current,
                  { yPercent: 100 },
                  { yPercent: 0, ease: "expo.out", duration: 1.2 }
                ),
                y.current.forEach((t, r) => {
                  e.fromTo(
                    t,
                    { x: 0 },
                    { x: w(r), ease: "expo.inOut", duration: 1.4 },
                    0.2
                  );
                }),
                b.current.forEach((t, r) => {
                  e.fromTo(
                    t,
                    { opacity: 0 },
                    {
                      opacity: +!x.includes(r),
                      ease: "power1.out",
                      duration: 0.3,
                    },
                    0.9
                  ),
                    e.fromTo(
                      t,
                      { x: -50 },
                      { x: 0, ease: "expo.inOut", duration: 1.4 },
                      0.2
                    );
                }),
                e.set(y.current, { opacity: 0 }),
                e.set(b.current, { opacity: 1, x: 0 }, "<"),
                e
              );
            }),
            (f[4] = d))
          : (d = f[4]);
        let k = d;
        return (
          f[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = () => ({ appear: k })), (f[5] = u))
            : (u = f[5]),
          (0, l.useImperativeHandle)(h, u),
          f[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((m = (0, s.jsx)("div", {
                ref: _,
                className: a.default.luma,
                "aria-label": "Illuminate",
                children: "luma".split("").map((e, t) =>
                  (0, s.jsx)(
                    "span",
                    {
                      className: a.default.splitChar,
                      ref: (e) => {
                        e && (y.current[t] = e);
                      },
                      style: { "--char-index": x[t], "--total-chars": 10 },
                      children: e,
                    },
                    t
                  )
                ),
              })),
              (f[6] = m))
            : (m = f[6]),
          f[7] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = (0, s.jsxs)("div", {
                className: a.default.lumaIlluminate,
                ref: g,
                children: [
                  m,
                  (0, s.jsx)("div", {
                    ref: v,
                    className: a.default.illuminate,
                    children: "Illuminate".split("").map((e, t) =>
                      (0, s.jsx)(
                        "span",
                        {
                          className: a.default.splitChar,
                          style: {
                            opacity: 0,
                            "--char-index": t,
                            "--total-chars": 10,
                          },
                          ref: (e) => {
                            e && (b.current[t] = e);
                          },
                          children: e,
                        },
                        t
                      )
                    ),
                  }),
                ],
              })),
              (f[7] = p))
            : (p = f[7]),
          p
        );
      }
    },
    17457: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({
          TransformContext: () => r,
          TransformProvider: () => l,
          useTransform: () => a,
        });
        var s = e.i(58064),
          i = e.i(85444),
          o = e.i(38653);
        let t = {
            translate: { x: 0, y: 0, z: 0 },
            rotate: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            clip: { top: 0, right: 0, bottom: 0, left: 0 },
            userData: {},
          },
          r = (0, o.createContext)({
            getTransform: () => structuredClone(t),
            addCallback: () => {},
            removeCallback: () => {},
            setTranslate: () => {},
            setRotate: () => {},
            setScale: () => {},
            setClip: () => {},
            setUserData: () => {},
          });
        function l(e) {
          let l,
            n,
            c,
            d,
            u,
            m,
            p,
            f,
            h,
            g,
            _,
            v,
            y,
            b,
            x,
            w,
            k,
            S = (0, i.c)(18),
            { children: j, ref: E } = e;
          S[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = structuredClone(t)), (S[0] = l))
            : (l = S[0]);
          let N = (0, o.useRef)(l);
          S[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = structuredClone(t)), (S[1] = n))
            : (n = S[1]);
          let C = (0, o.useRef)(n);
          S[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = () => {
                let e = structuredClone(N.current);
                return (
                  (e.translate.x = e.translate.x + C.current.translate.x),
                  (e.translate.y = e.translate.y + C.current.translate.y),
                  (e.translate.z = e.translate.z + C.current.translate.z),
                  (e.rotate.x = e.rotate.x + C.current.rotate.x),
                  (e.rotate.y = e.rotate.y + C.current.rotate.y),
                  (e.rotate.z = e.rotate.z + C.current.rotate.z),
                  (e.scale.x = e.scale.x * C.current.scale.x),
                  (e.scale.y = e.scale.y * C.current.scale.y),
                  (e.scale.z = e.scale.z * C.current.scale.z),
                  (e.userData = { ...C.current.userData, ...e.userData }),
                  e
                );
              }),
              (S[2] = c))
            : (c = S[2]);
          let T = c;
          S[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((d = []), (S[3] = d))
            : (d = S[3]);
          let O = (0, o.useRef)(d);
          S[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = (e) => {
                O.current.push(e);
              }),
              (S[4] = u))
            : (u = S[4]);
          let P = u;
          S[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((m = (e) => {
                O.current = O.current.filter((t) => t !== e);
              }),
              (S[5] = m))
            : (m = S[5]);
          let R = m;
          S[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = () => {
                for (let e of O.current) e(T());
              }),
              (S[6] = p))
            : (p = S[6]);
          let M = p;
          S[7] === Symbol.for("react.memo_cache_sentinel")
            ? ((f = (e, t, r) => {
                let s = void 0 === e ? 0 : e,
                  i = void 0 === t ? 0 : t,
                  o = void 0 === r ? 0 : r;
                Number.isNaN(s) || (C.current.translate.x = Number(s)),
                  Number.isNaN(i) || (C.current.translate.y = Number(i)),
                  Number.isNaN(o) || (C.current.translate.z = Number(o)),
                  M();
              }),
              (S[7] = f))
            : (f = S[7]);
          let I = f;
          S[8] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = (e, t, r) => {
                let s = void 0 === e ? 0 : e,
                  i = void 0 === t ? 0 : t,
                  o = void 0 === r ? 0 : r;
                Number.isNaN(s) || (C.current.rotate.x = Number(s)),
                  Number.isNaN(i) || (C.current.rotate.y = Number(i)),
                  Number.isNaN(o) || (C.current.rotate.z = Number(o)),
                  M();
              }),
              (S[8] = h))
            : (h = S[8]);
          let L = h;
          S[9] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = (e, t, r) => {
                let s = void 0 === e ? 1 : e,
                  i = void 0 === t ? 1 : t,
                  o = void 0 === r ? 1 : r;
                Number.isNaN(s) || (C.current.scale.x = Number(s)),
                  Number.isNaN(i) || (C.current.scale.y = Number(i)),
                  Number.isNaN(o) || (C.current.scale.z = Number(o)),
                  M();
              }),
              (S[9] = g))
            : (g = S[9]);
          let U = g;
          S[10] === Symbol.for("react.memo_cache_sentinel")
            ? ((_ = (e) => {
                let {
                    top: t,
                    right: r,
                    bottom: s,
                    left: i,
                  } = void 0 === e ? {} : e,
                  o = void 0 === t ? 0 : t,
                  l = void 0 === r ? 0 : r,
                  a = void 0 === s ? 0 : s,
                  n = void 0 === i ? 0 : i;
                Number.isNaN(o) || (C.current.clip.top = Number(o)),
                  Number.isNaN(l) || (C.current.clip.right = Number(l)),
                  Number.isNaN(a) || (C.current.clip.bottom = Number(a)),
                  Number.isNaN(n) || (C.current.clip.left = Number(n)),
                  M();
              }),
              (S[10] = _))
            : (_ = S[10]);
          let z = _;
          S[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((v = (e, t) => {
                (C.current.userData[e] = t), M();
              }),
              (S[11] = v))
            : (v = S[11]);
          let W = v;
          return (
            S[12] === Symbol.for("react.memo_cache_sentinel")
              ? ((y = (e) => {
                  (N.current = structuredClone(e)), M();
                }),
                (b = [M]),
                (S[12] = y),
                (S[13] = b))
              : ((y = S[12]), (b = S[13])),
            a(y, b),
            S[14] === Symbol.for("react.memo_cache_sentinel")
              ? ((x = () => ({
                  setTranslate: I,
                  setRotate: L,
                  setScale: U,
                  setClip: z,
                  setUserData: W,
                })),
                (S[14] = x))
              : (x = S[14]),
            (0, o.useImperativeHandle)(E, x),
            S[15] === Symbol.for("react.memo_cache_sentinel")
              ? ((w = {
                  getTransform: T,
                  addCallback: P,
                  removeCallback: R,
                  setTranslate: I,
                  setRotate: L,
                  setScale: U,
                  setClip: z,
                  setUserData: W,
                }),
                (S[15] = w))
              : (w = S[15]),
            S[16] !== j
              ? ((k = (0, s.jsx)(r, { value: w, children: j })),
                (S[16] = j),
                (S[17] = k))
              : (k = S[17]),
            k
          );
        }
        function a(e, t = []) {
          let {
            getTransform: s,
            addCallback: i,
            removeCallback: l,
          } = (0, o.useContext)(r);
          return (
            (0, o.useEffect)(() => {
              if (e)
                return (
                  i(e),
                  () => {
                    l(e);
                  }
                );
            }, [e, i, l, ...t]),
            s
          );
        }
      }
    },
    22477: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ useScrollTrigger: () => p });
      var s = e.i(85444),
        i = e.i(4371),
        o = e.i(54995),
        l = e.i(38653),
        a = e.i(17457),
        n = e.i(47103),
        c = e.i(87771),
        d = e.i(35569);
      function u(e) {
        let t,
          r,
          i,
          o,
          a,
          n,
          u = (0, s.c)(19);
        u[0] !== e
          ? ((t = void 0 === e ? {} : e), (u[0] = e), (u[1] = t))
          : (t = u[1]);
        let { type: m, fixed: p, visible: f, id: h } = t,
          g = void 0 === m ? "start" : m,
          _ = void 0 !== p && p,
          v = void 0 !== f && f,
          y = void 0 === h ? "" : h,
          b = (0, l.useRef)(null),
          x = "start" === g ? "green" : "red",
          w = "start" === g ? "start" : "end";
        u[2] !== x ? ((r = { color: x }), (u[2] = x), (u[3] = r)) : (r = u[3]);
        let k = (0, d.useMinimap)(r),
          { minimap: S } = (0, c.useOrchestra)();
        u[4] !== x ||
        u[5] !== _ ||
        u[6] !== y ||
        u[7] !== S ||
        u[8] !== k ||
        u[9] !== w ||
        u[10] !== g ||
        u[11] !== v
          ? ((i = () => {
              if (!S || !v) return;
              let e = document.createElement("div");
              k?.(e),
                (e.style.cssText = `
        position: ${_ ? "fixed" : "absolute"};
        top: 0px;
        left: ${_ ? "50%" : "10%"};
        right: ${_ ? "10%" : "50%"};
        text-align: ${_ ? "left" : "right"};
        z-index: 9999;
        color: ${x};
        
        ${"start" === g ? "border-top" : "border-bottom"}: 1px solid ${x};
        transform: translateY(${"start" === g ? "0%" : "-100%"});
        font-size: 24px;
        font-family: Arial, sans-serif;
        text-transform: uppercase;
      `);
              let t = document.createElement("div");
              return (
                (t.style.cssText = `
      position: absolute;
      padding: 8px;
      ${"start" === g ? "left" : "right"}: 0;
    `),
                e.appendChild(t),
                (t.innerText = (_ ? "viewport " : `${y} `) + w),
                (b.current = e),
                (e.style.pointerEvents = "none"),
                document.documentElement.appendChild(b.current),
                () => {
                  b.current?.remove();
                }
              );
            }),
            (o = [x, w, _, y, v, g, k, S]),
            (u[4] = x),
            (u[5] = _),
            (u[6] = y),
            (u[7] = S),
            (u[8] = k),
            (u[9] = w),
            (u[10] = g),
            (u[11] = v),
            (u[12] = i),
            (u[13] = o))
          : ((i = u[12]), (o = u[13])),
          (0, l.useEffect)(i, o),
          u[14] !== x || u[15] !== _
            ? ((a = (e) => {
                if (!b.current) return;
                let t = b.current;
                if (((t.style.top = `${e}px`), !_)) return;
                let r = t.children[0];
                e <= 0
                  ? ((t.style.transform = "translateY(0%)"),
                    (t.style.borderBottom = "none"),
                    (t.style.borderTop = `1px solid ${x}`),
                    (r.style.top = "0"))
                  : e >= window.innerHeight &&
                    ((t.style.transform = "translateY(-100%)"),
                    (t.style.borderBottom = `1px solid ${x}`),
                    (t.style.borderTop = "none"),
                    (r.style.bottom = "0"));
              }),
              (u[14] = x),
              (u[15] = _),
              (u[16] = a))
            : (a = u[16]);
        let j = a;
        return (
          u[17] !== j
            ? ((n = { top: j }), (u[17] = j), (u[18] = n))
            : (n = u[18]),
          n
        );
      }
      function m(e) {
        return "number" == typeof e || !Number.isNaN(e);
      }
      function p(
        {
          rect: e,
          start: t = "bottom bottom",
          end: r = "top top",
          id: s = "",
          offset: c = 0,
          disabled: d = !1,
          markers: f,
          onEnter: h,
          onLeave: g,
          onProgress: _,
          steps: v = 1,
        },
        y = []
      ) {
        let b = (0, a.useTransform)(),
          x = (0, o.useLenis)(),
          w = u({ id: s, type: "start", visible: f }),
          k = u({ id: s, type: "end", visible: f }),
          S = u({ id: s, type: "start", fixed: !0, visible: f }),
          j = u({ id: s, type: "end", fixed: !0, visible: f }),
          { height: E = 0 } = (0, i.useWindowSize)(),
          [N, C] = "string" == typeof t ? t.split(" ") : [t],
          [T, O] = "string" == typeof r ? r.split(" ") : [r],
          P = m(C) ? Number.parseFloat(C) : 0;
        "top" === C && (P = 0),
          "center" === C && (P = 0.5 * E),
          "bottom" === C && (P = E);
        let R = m(O) ? Number.parseFloat(O) : 0;
        "top" === O && (R = 0),
          "center" === O && (R = 0.5 * E),
          "bottom" === O && (R = E);
        let M = m(N) ? Number.parseFloat(N) : e?.bottom || 0;
        "top" === N && (M = e?.top || 0),
          "center" === N && (M = (e?.top || 0) + 0.5 * (e?.height || 0)),
          "bottom" === N && (M = e?.bottom || 0),
          (M += c);
        let I = m(T) ? Number.parseFloat(T) : e?.top || 0;
        "top" === T && (I = e?.top || 0),
          "center" === T && (I = (e?.top || 0) + 0.5 * (e?.height || 0)),
          "bottom" === T && (I = e?.bottom || 0),
          (I += c);
        let L = M - P,
          U = I - R,
          z = (0, l.useRef)(_);
        z.current = _;
        let W = (0, l.useCallback)(
            (e, t) => {
              z.current?.({
                height: U - L,
                isActive: e >= 0 && e <= 1,
                progress: (0, n.clamp)(0, e, 1),
                lastProgress: t,
                steps: Array.from({ length: v }).map((t, r) =>
                  (0, n.clamp)(
                    0,
                    (0, n.mapRange)(r / v, (r + 1) / v, e, 0, 1),
                    1
                  )
                ),
              });
            },
            [U, L, v, ...y]
          ),
          [$, D] = (0, i.useLazyState)(
            void 0,
            (e, t) => {
              !Number.isNaN(e) &&
                void 0 !== e &&
                (((e >= 0 && t < 0) || (e <= 1 && t > 1)) &&
                  h?.({ progress: (0, n.clamp)(0, e, 1) }),
                (0, n.clamp)(0, e, 1) !== (0, n.clamp)(0, t, 1) && W(e, t),
                ((e < 0 && t >= 0) || (e > 1 && t <= 1)) &&
                  g?.({ progress: (0, n.clamp)(0, e, 1) }));
            },
            [U, L, v, W, ...y]
          ),
          q = (0, l.useCallback)(() => {
            let e;
            if (d) return;
            e = x ? Math.floor(x?.scroll) : window.scrollY;
            let { translate: t } = b();
            S && S.top(P),
              j && j.top(R),
              w && w.top(M - t.y),
              k && k.top(I - t.y),
              $((0, n.mapRange)(L, U, e - t.y, 0, 1));
          }, [x, S, j, P, R, w, k, M, I, L, U, b, $, d, ...y]);
        (0, o.useLenis)(q, [q]),
          (0, l.useEffect)(() => {
            if (!x)
              return (
                q(),
                window.addEventListener("scroll", q, !1),
                () => {
                  window.removeEventListener("scroll", q, !1);
                }
              );
          }, [x, q]),
          (0, a.useTransform)(q, [q]);
      }
    },
    18810: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        mask: "section-module__Fy_-CG__mask",
        section: "section-module__Fy_-CG__section",
      });
    },
    18421: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section: () => m });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(4371),
        a = e.i(38653),
        n = e.i(22477),
        c = e.i(47103),
        d = e.i(42928),
        u = e.i(18810);
      function m(e) {
        let t,
          r,
          m,
          h,
          g,
          _,
          v,
          y,
          b,
          x,
          w,
          k,
          S,
          j = (0, i.c)(35),
          {
            children: E,
            ref: N,
            mask: C,
            leave: T,
            className: O,
            sticky: P,
            style: R,
            snap: M,
          } = e,
          I = void 0 !== C && C;
        j[0] !== M
          ? ((t = void 0 === M ? ["start", "end"] : M), (j[0] = M), (j[1] = t))
          : (t = j[1]);
        let L = t,
          U = (0, a.useRef)(null),
          [z, W] = (0, l.useRect)(),
          $ = (0, d.useStore)(f);
        j[2] !== $ || j[3] !== W || j[4] !== L
          ? ((r = () => {
              L && $ && W.element && $.addElement(W.element, { align: L });
            }),
            (m = [$, W, L]),
            (j[2] = $),
            (j[3] = W),
            (j[4] = L),
            (j[5] = r),
            (j[6] = m))
          : ((r = j[5]), (m = j[6])),
          (0, a.useEffect)(r, m),
          j[7] !== I
            ? ((h = (e) => {
                let { progress: t } = e;
                I &&
                  (0, c.fromTo)(
                    U.current,
                    { maskLeft: 100, maskRight: 100 },
                    {
                      maskLeft: 90 * ("right" === I),
                      maskRight: 90 * ("left" === I),
                    },
                    t,
                    {
                      ease: "linear",
                      render: (e, t) => {
                        let { maskLeft: r, maskRight: s } = t;
                        e instanceof HTMLElement &&
                          U.current?.style.setProperty(
                            "clip-path",
                            `polygon(0% ${r}%,100% ${s}%,100% 100%,0% 100%)`
                          );
                      },
                    }
                  );
              }),
              (j[7] = I),
              (j[8] = h))
            : (h = j[8]),
          j[9] !== W || j[10] !== h
            ? ((g = {
                rect: W,
                start: "top bottom",
                end: "top top",
                onProgress: h,
              }),
              (j[9] = W),
              (j[10] = h),
              (j[11] = g))
            : (g = j[11]),
          (0, n.useScrollTrigger)(g);
        let D = (0, a.useRef)(null);
        j[12] !== T
          ? ((_ = (e) => {
              let { progress: t } = e;
              ("zoomBlur" === T || "dezoomBlur" === T) &&
                (0, c.fromTo)(
                  D.current,
                  { blur: 0, scale: () => 1 },
                  {
                    blur: 20,
                    scale: () =>
                      "zoomBlur" === T ? 1.2 : "dezoomBlur" === T ? 0.8 : 1,
                  },
                  t,
                  { ease: "easeInSine", render: p }
                );
            }),
            (j[12] = T),
            (j[13] = _))
          : (_ = j[13]),
          j[14] !== W || j[15] !== _
            ? ((v = {
                rect: W,
                start: "bottom bottom",
                end: "bottom top",
                onProgress: _,
              }),
              (j[14] = W),
              (j[15] = _),
              (j[16] = v))
            : (v = j[16]),
          (0, n.useScrollTrigger)(v),
          j[17] !== O
            ? ((y = (0, o.default)(u.default.section, "overflow-x-clip", O)),
              (j[17] = O),
              (j[18] = y))
            : (y = j[18]),
          j[19] !== N || j[20] !== z
            ? ((b = (e) => {
                z(e), N && ("function" == typeof N ? N(e) : (N.current = e));
              }),
              (j[19] = N),
              (j[20] = z),
              (j[21] = b))
            : (b = j[21]),
          j[22] !== I
            ? ((x =
                I && (0, s.jsx)("div", { className: u.default.mask, ref: U })),
              (j[22] = I),
              (j[23] = x))
            : (x = j[23]);
        let q = void 0 !== P && P ? "sticky h-[100svh] top-0" : "h-full";
        return (
          j[24] !== q
            ? ((w = (0, o.default)(q)), (j[24] = q), (j[25] = w))
            : (w = j[25]),
          j[26] !== E || j[27] !== w
            ? ((k = (0, s.jsx)("div", { className: w, ref: D, children: E })),
              (j[26] = E),
              (j[27] = w),
              (j[28] = k))
            : (k = j[28]),
          j[29] !== R ||
          j[30] !== y ||
          j[31] !== b ||
          j[32] !== x ||
          j[33] !== k
            ? ((S = (0, s.jsxs)("section", {
                className: y,
                ref: b,
                style: R,
                children: [x, k],
              })),
              (j[29] = R),
              (j[30] = y),
              (j[31] = b),
              (j[32] = x),
              (j[33] = k),
              (j[34] = S))
            : (S = j[34]),
          S
        );
      }
      function p(e, t) {
        let { blur: r, scale: s } = t;
        e instanceof HTMLElement &&
          (e.style.setProperty("filter", `blur(${r}px)`),
          e.style.setProperty(
            "transform",
            `scale(${s}) ${r > 0 ? "translateZ(0)" : ""}`
          ));
      }
      function f(e) {
        return e.lenisSnap;
      }
    },
    80332: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        contentWrapper: "section1-module__iQD6-W__contentWrapper",
        gridWrapper: "section1-module__iQD6-W__gridWrapper",
        inner: "section1-module__iQD6-W__inner",
        lumaIllu: "section1-module__iQD6-W__lumaIllu",
        lumaIlluBlur: "section1-module__iQD6-W__lumaIlluBlur",
        lumaIlluWrapper: "section1-module__iQD6-W__lumaIlluWrapper",
        next: "section1-module__iQD6-W__next",
        nextWrapper: "section1-module__iQD6-W__nextWrapper",
        section1: "section1-module__iQD6-W__section1",
        sticky: "section1-module__iQD6-W__sticky",
        title: "section1-module__iQD6-W__title",
      });
    },
    19458: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section1: () => v }), e.i(22271);
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(17170),
        l = e.i(54995),
        a = e.i(38653),
        n = e.i(91248),
        c = e.i(33907),
        d = e.i(13827),
        u = e.i(67376),
        m = e.i(36940),
        p = e.i(97287),
        f = e.i(42928),
        h = e.i(74957),
        g = e.i(18421),
        _ = e.i(80332);
      function v() {
        let { story: e } = (0, p.useStoryblokContext)(),
          t = e?.content?.section1;
        if (!t) return null;
        let r = (0, a.useRef)(null),
          v = (0, a.useRef)(null),
          y = (0, a.useRef)(null),
          b = (0, a.useRef)(null),
          x = (0, a.useRef)(null),
          w = (0, a.useRef)(null),
          k = (0, a.useRef)(null),
          S = (0, a.useRef)(null),
          j = (0, f.useStore)((e) => e.setIsLoading),
          E = (0, a.useCallback)(() => {
            let e = o.default.timeline();
            e.fromTo(
              v.current,
              { yPercent: 25 },
              { yPercent: 0, ease: "expo.inOut", duration: 1.2 },
              0
            ),
              e.fromTo(
                x.current,
                { yPercent: 50 },
                { yPercent: 0, ease: "expo.out", duration: 1.2 },
                0
              );
            let t = { value: 0 };
            return (
              e.add(k.current.appear(), 0.7),
              e.add(S.current.appear(), 0.7),
              e.fromTo(
                t,
                { value: 0 },
                {
                  value: 1,
                  duration: 1.2,
                  onUpdate: () => {
                    w.current?.setProgress(t.value);
                  },
                },
                0.8
              ),
              e
            );
          }, []);
        (0, a.useLayoutEffect)(() => {
          if (!r.current) return;
          j(!0);
          let e = o.default.timeline();
          e.add(r.current?.appear(), 0),
            e.add(() => {
              j(!1);
            }, ">"),
            e.add(E(), 4.5);
        }, [j, E]);
        let N = (0, l.useLenis)();
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(n.Preloader, { ref: r }),
            (0, s.jsx)(g.Section, {
              className: (0, i.default)(_.default.section1, "overflow-clip"),
              leave: "zoomBlur",
              children: (0, s.jsx)("div", {
                className: _.default.sticky,
                ref: y,
                children: (0, s.jsxs)("div", {
                  className: _.default.inner,
                  ref: v,
                  children: [
                    (0, s.jsxs)("div", {
                      className: "absolute inset-0",
                      ref: b,
                      children: [
                        (0, s.jsx)(u.Image, {
                          src: "/images/section1.png",
                          fill: !0,
                          className: "desktop-only",
                          quality: 95,
                        }),
                        (0, s.jsx)(u.Image, {
                          src: "/images/section1-mobile.png",
                          fill: !0,
                          className: "mobile-only",
                        }),
                      ],
                    }),
                    (0, s.jsx)("div", {
                      className: (0, i.default)(
                        "dr-layout-block",
                        _.default.contentWrapper
                      ),
                      children: (0, s.jsxs)("h2", {
                        className: (0, i.default)(_.default.title, "h2"),
                        children: [
                          (0, s.jsxs)("div", {
                            className: _.default.lumaIlluWrapper,
                            children: [
                              (0, s.jsx)("div", {
                                className: _.default.lumaIlluBlur,
                                "aria-hidden": "true",
                                children: (0, s.jsx)(h.LumaIlluminateText, {
                                  ref: k,
                                }),
                              }),
                              (0, s.jsx)("div", {
                                className: _.default.lumaIllu,
                                children: (0, s.jsx)(h.LumaIlluminateText, {
                                  ref: S,
                                }),
                              }),
                            ],
                          }),
                          (0, s.jsx)(m.SplitText, {
                            willAppear: !0,
                            ref: w,
                            ease: "easeOutExpo",
                            children: t,
                          }),
                        ],
                      }),
                    }),
                    (0, s.jsx)("div", {
                      className: _.default.gridWrapper,
                      ref: x,
                      children: (0, s.jsx)(d.default, {}),
                    }),
                    (0, s.jsx)("div", {
                      className: _.default.nextWrapper,
                      children: (0, s.jsx)("button", {
                        className: _.default.next,
                        type: "button",
                        onClick: () => {
                          N?.scrollTo(window.innerHeight);
                        },
                        children: (0, s.jsx)(c.default, {}),
                      }),
                    }),
                  ],
                }),
              }),
            }),
          ],
        });
      }
    },
    115: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i = e.i(38653);
        function o() {
          return (o = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, i.memo)(function (e) {
          return (0,
          i.createElement)("svg", o({ viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, e), s || (s = (0, i.createElement)("path", { d: "m9 19 5.6-5.6q1.2-1.4 0-2.8L9 5", stroke: "white", strokeWidth: 2, strokeLinecap: "round" })));
        });
      }
    },
    98451: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o,
          l,
          a,
          n,
          c,
          d = e.i(38653);
        function u() {
          return (u = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, d.memo)(function (e) {
          return (0,
          d.createElement)("svg", u({ viewBox: "0 0 45 44", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, e), s || (s = (0, d.createElement)("path", { fill: "url(#icon-3d_svg__a)", d: "M5.4 16a1 1 0 0 0 1-1v-2.8A2 2 0 0 1 8.6 10h2.8a1 1 0 1 0 0-2H8.6a4 4 0 0 0-4.2 4.2V15a1 1 0 0 0 1 1" })), i || (i = (0, d.createElement)("path", { fill: "url(#icon-3d_svg__a)", d: "M36.2 8h-2.8a1 1 0 0 0 0 2h2.8a2 2 0 0 1 2.2 2.2V15a1 1 0 1 0 2 0v-2.8A4 4 0 0 0 36.2 8" })), o || (o = (0, d.createElement)("path", { fill: "url(#icon-3d_svg__a)", d: "M11.4 34H8.6a2 2 0 0 1-2.2-2.2V29a1 1 0 1 0-2 0v2.8A4 4 0 0 0 8.6 36h2.8a1 1 0 0 0 0-2" })), l || (l = (0, d.createElement)("path", { fill: "url(#icon-3d_svg__a)", d: "M39.4 28a1 1 0 0 0-1 1v2.8a2 2 0 0 1-2.2 2.2h-2.8a1 1 0 0 0 0 2h2.8a4 4 0 0 0 4.2-4.2V29a1 1 0 0 0-1-1" })), a || (a = (0, d.createElement)("path", { fill: "url(#icon-3d_svg__a)", d: "M19.5 21.8a3.2 3.2 0 0 0-2.5-5.1h-5.3a1 1 0 0 0 0 2H17a1.2 1.2 0 0 1 0 2.3h-3.2a1 1 0 0 0 0 2h3.6a1.2 1.2 0 1 1 0 2.3h-5.7a1 1 0 1 0 0 2h5.7a3.1 3.1 0 0 0 2-5.5" })), n || (n = (0, d.createElement)("path", { fill: "url(#icon-3d_svg__a)", d: "M34 22a5.3 5.3 0 0 0-5.3-5.3h-5.3a1 1 0 0 0 0 2h.5v6.6h-.5a1 1 0 1 0 0 2h6A5.3 5.3 0 0 0 34 22m-8-3.3h2.8a3.3 3.3 0 0 1 0 6.6H26z" })), c || (c = (0, d.createElement)("defs", null, (0, d.createElement)("linearGradient", { id: "icon-3d_svg__a", x1: 0.3, y1: 24, x2: 43.6, y2: 18.3, gradientUnits: "userSpaceOnUse" }, (0, d.createElement)("stop", { stopColor: "#FF2900" }), (0, d.createElement)("stop", { offset: 0.6, stopColor: "#FE7A60" }), (0, d.createElement)("stop", { offset: 1, stopColor: "#581DFF" })))));
        });
      }
    },
    13095: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o = e.i(38653);
        function l() {
          return (l = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, o.memo)(function (e) {
          return (0,
          o.createElement)("svg", l({ viewBox: "0 0 45 44", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, e), s || (s = (0, o.createElement)("path", { d: "M23.2 17.7c11.6-3.5 21-.6 21-.5 0 1.4-.7 3-.6 3-1.7-.2-2 3-2 3C41 32 33 31 32.9 31c-7.6 0-9.4-8.6-9.4-8.6-.2-1.2-1-1.4-1.3-1.5q-.7-.1-1.2 1.5S19 31 11.5 31c0 0-8.1 1-8.7-7.7 0 0-.3-3.3-2-3 0 0-.7-1.8-.6-3.1 0 0 9.4-3 21 .5l1 .2q.6 0 1-.2M13 29.4c4.7-.4 5.7-5.4 5.8-8q0-1.4-1-2.2zm20.4-11.8-4.6 10.8q1.3 1 3.6 1L37.6 18q-1.7-.4-4.3-.5M7 28.4v.1q.7.5 1.6.7l2 .2 5.2-11q-2-.7-4.2-.7zm27.4 1 1.2-.3q2.5-.4 3.4-3a13 13 0 0 0 1-6q-.2-.7-.7-1.2zm-25-11.6-3.4.6c-.8.1-1.5 1-1.7 1.8A15 15 0 0 0 5.6 27zm21.6-.1q-2.1.2-4 1.2-1.5.9-1.4 2.5c0 1.5.4 3.7 1.5 5.4z", fill: "url(#icon-glasses_svg__a)" })), i || (i = (0, o.createElement)("defs", null, (0, o.createElement)("linearGradient", { id: "icon-glasses_svg__a", x1: 0.3, y1: 24, x2: 43.6, y2: 18.3, gradientUnits: "userSpaceOnUse" }, (0, o.createElement)("stop", { stopColor: "#FF2900" }), (0, o.createElement)("stop", { offset: 0.6, stopColor: "#FE7A60" }), (0, o.createElement)("stop", { offset: 1, stopColor: "#581DFF" })))));
        });
      }
    },
    84400: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o,
          l,
          a,
          n,
          c = e.i(38653);
        function d() {
          return (d = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, c.memo)(function (e) {
          return (0,
          c.createElement)("svg", d({ viewBox: "0 0 45 44", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, e), s || (s = (0, c.createElement)("path", { d: "M39.6 25v-6", stroke: "url(#icon-idk_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), i || (i = (0, c.createElement)("path", { d: "M31.6 25v-6", stroke: "url(#icon-idk_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), o || (o = (0, c.createElement)("path", { d: "M23.6 25v-6", stroke: "url(#icon-idk_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), l || (l = (0, c.createElement)("path", { d: "M15.6 25v-6", stroke: "url(#icon-idk_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), a || (a = (0, c.createElement)("path", { d: "M7.6 25v-6", stroke: "url(#icon-idk_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), n || (n = (0, c.createElement)("defs", null, (0, c.createElement)("linearGradient", { id: "icon-idk_svg__a", gradientUnits: "userSpaceOnUse" }, (0, c.createElement)("stop", { stopColor: "#FF2900" }), (0, c.createElement)("stop", { offset: 0.6, stopColor: "#FE7A60" }), (0, c.createElement)("stop", { offset: 1, stopColor: "#581DFF" })))));
        });
      }
    },
    41203: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o = e.i(38653);
        function l() {
          return (l = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, o.memo)(function (e) {
          return (0,
          o.createElement)("svg", l({ viewBox: "0 0 43 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, e), s || (s = (0, o.createElement)("path", { d: "M19 12a7 7 0 0 1-4 6 7 7 0 0 1-7.2-1.4 6.5 6.5 0 0 1 4.7-11.1q2.7 0 4.6 1.9 2 2 2 4.6m23.3 0a12 12 0 0 1-3.6 8.5 12 12 0 0 1-8.6 3.5H12.5q-5.1-.1-8.6-3.5a12 12 0 0 1 0-17Q7.4.1 12.5 0H30a12 12 0 0 1 11.3 7.4q.9 2.2.9 4.6M40 12a10 10 0 0 0-6-9 10 10 0 0 0-3.9-.8H12.5a10 10 0 0 0-7 2.9 10 10 0 0 0 0 13.8 10 10 0 0 0 7 3H30q4.2 0 7-3 3-2.8 3-6.9", fill: "url(#icon-take-off_svg__a)" })), i || (i = (0, o.createElement)("defs", null, (0, o.createElement)("linearGradient", { id: "icon-take-off_svg__a", x1: 0.3, y1: 24, x2: 43.6, y2: 18.3, gradientUnits: "userSpaceOnUse" }, (0, o.createElement)("stop", { stopColor: "#FF2900" }), (0, o.createElement)("stop", { offset: 0.6, stopColor: "#FE7A60" }), (0, o.createElement)("stop", { offset: 1, stopColor: "#581DFF" })))));
        });
      }
    },
    21284: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o = e.i(38653);
        function l() {
          return (l = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, o.memo)(function (e) {
          return (0,
          o.createElement)("svg", l({ viewBox: "0 0 44 44", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, e), s || (s = (0, o.createElement)("path", { d: "M24.2 22a7 7 0 0 1 4.1-6 7 7 0 0 1 7.2 1.4 6.5 6.5 0 0 1-4.7 11.1q-2.7 0-4.6-1.9a7 7 0 0 1-2-4.6M1 22a12 12 0 0 1 3.6-8.5Q8 10.1 13.2 10h17.6q5.1.1 8.6 3.5a12 12 0 0 1 0 17 12 12 0 0 1-8.6 3.5H13.2a12 12 0 0 1-11.3-7.4Q1 24.4 1 22m2.2 0a10 10 0 0 0 6.1 9q2 .9 3.9.8h17.6q4.2 0 7-2.9a10 10 0 0 0 0-13.8 10 10 0 0 0-7-3H13.2a10 10 0 0 0-7 3 10 10 0 0 0-3 6.9", fill: "url(#icon-toggle_svg__a)" })), i || (i = (0, o.createElement)("defs", null, (0, o.createElement)("linearGradient", { id: "icon-toggle_svg__a", gradientUnits: "userSpaceOnUse" }, (0, o.createElement)("stop", { stopColor: "#FF2900" }), (0, o.createElement)("stop", { offset: 0.6, stopColor: "#FE7A60" }), (0, o.createElement)("stop", { offset: 1, stopColor: "#581DFF" })))));
        });
      }
    },
    97536: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o,
          l,
          a,
          n = e.i(38653);
        function c() {
          return (c = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, n.memo)(function (e) {
          return (0,
          n.createElement)("svg", c({ viewBox: "0 0 45 44", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, e), s || (s = (0, n.createElement)("path", { d: "M9.8 17v8", stroke: "url(#icon-volume_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), i || (i = (0, n.createElement)("path", { d: "M17.8 15v12", stroke: "url(#icon-volume_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), o || (o = (0, n.createElement)("path", { d: "M25.8 13v16", stroke: "url(#icon-volume_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), l || (l = (0, n.createElement)("path", { d: "M33.8 11v20", stroke: "url(#icon-volume_svg__a)", strokeWidth: 2, strokeLinecap: "round" })), a || (a = (0, n.createElement)("defs", null, (0, n.createElement)("linearGradient", { id: "icon-volume_svg__a", gradientUnits: "userSpaceOnUse" }, (0, n.createElement)("stop", { stopColor: "#FF2900" }), (0, n.createElement)("stop", { offset: 0.6, stopColor: "#FE7A60" }), (0, n.createElement)("stop", { offset: 1, stopColor: "#581DFF" })))));
        });
      }
    },
    68423: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      ("use strict");
      Object.defineProperty(i, "__esModule", { value: !0 });
      var o = {
        assign: function () {
          return d;
        },
        searchParamsToUrlQuery: function () {
          return a;
        },
        urlQueryToSearchParams: function () {
          return c;
        },
      };
      for (var l in o)
        Object.defineProperty(i, l, { enumerable: !0, get: o[l] });
      function a(e) {
        let t = {};
        for (let [r, s] of e.entries()) {
          let e = t[r];
          void 0 === e
            ? (t[r] = s)
            : Array.isArray(e)
            ? e.push(s)
            : (t[r] = [e, s]);
        }
        return t;
      }
      function n(e) {
        return "string" == typeof e
          ? e
          : ("number" != typeof e || isNaN(e)) && "boolean" != typeof e
          ? ""
          : String(e);
      }
      function c(e) {
        let t = new URLSearchParams();
        for (let [r, s] of Object.entries(e))
          if (Array.isArray(s)) for (let e of s) t.append(r, n(e));
          else t.set(r, n(s));
        return t;
      }
      function d(e) {
        for (
          var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), s = 1;
          s < t;
          s++
        )
          r[s - 1] = arguments[s];
        for (let t of r) {
          for (let r of t.keys()) e.delete(r);
          for (let [r, s] of t.entries()) e.append(r, s);
        }
        return e;
      }
    },
    30609: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        e.i(22271);
        ("use strict");
        Object.defineProperty(i, "__esModule", { value: !0 });
        var o = {
          formatUrl: function () {
            return a;
          },
          formatWithValidation: function () {
            return n;
          },
          urlObjectKeys: function () {
            return s;
          },
        };
        for (var l in o)
          Object.defineProperty(i, l, { enumerable: !0, get: o[l] });
        let t = e.r(81369)._(e.r(68423)),
          r = /https?|ftp|gopher|file/;
        function a(e) {
          let { auth: s, hostname: i } = e,
            o = e.protocol || "",
            l = e.pathname || "",
            a = e.hash || "",
            n = e.query || "",
            c = !1;
          (s = s ? encodeURIComponent(s).replace(/%3A/i, ":") + "@" : ""),
            e.host
              ? (c = s + e.host)
              : i &&
                ((c = s + (~i.indexOf(":") ? "[" + i + "]" : i)),
                e.port && (c += ":" + e.port)),
            n &&
              "object" == typeof n &&
              (n = String(t.urlQueryToSearchParams(n)));
          let d = e.search || (n && "?" + n) || "";
          return (
            o && !o.endsWith(":") && (o += ":"),
            e.slashes || ((!o || r.test(o)) && !1 !== c)
              ? ((c = "//" + (c || "")), l && "/" !== l[0] && (l = "/" + l))
              : c || (c = ""),
            a && "#" !== a[0] && (a = "#" + a),
            d && "?" !== d[0] && (d = "?" + d),
            "" +
              o +
              c +
              (l = l.replace(/[?#]/g, encodeURIComponent)) +
              (d = d.replace("#", "%23")) +
              a
          );
        }
        let s = [
          "auth",
          "hash",
          "host",
          "hostname",
          "href",
          "path",
          "pathname",
          "port",
          "protocol",
          "query",
          "search",
          "slashes",
        ];
        function n(e) {
          return a(e);
        }
      }
    },
    95863: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        e.i(22271);
        ("use strict");
        Object.defineProperty(i, "__esModule", { value: !0 });
        var o = {
          DecodeError: function () {
            return _;
          },
          MiddlewareNotFoundError: function () {
            return x;
          },
          MissingStaticPage: function () {
            return b;
          },
          NormalizeError: function () {
            return v;
          },
          PageNotFoundError: function () {
            return y;
          },
          SP: function () {
            return h;
          },
          ST: function () {
            return g;
          },
          WEB_VITALS: function () {
            return t;
          },
          execOnce: function () {
            return a;
          },
          getDisplayName: function () {
            return d;
          },
          getLocationOrigin: function () {
            return n;
          },
          getURL: function () {
            return c;
          },
          isAbsoluteUrl: function () {
            return s;
          },
          isResSent: function () {
            return u;
          },
          loadGetInitialProps: function () {
            return p;
          },
          normalizeRepeatedSlashes: function () {
            return m;
          },
          stringifyError: function () {
            return f;
          },
        };
        for (var l in o)
          Object.defineProperty(i, l, { enumerable: !0, get: o[l] });
        let t = ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"];
        function a(e) {
          let t,
            r = !1;
          return function () {
            for (var s = arguments.length, i = Array(s), o = 0; o < s; o++)
              i[o] = arguments[o];
            return r || ((r = !0), (t = e(...i))), t;
          };
        }
        let r = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
          s = (e) => r.test(e);
        function n() {
          let { protocol: e, hostname: t, port: r } = window.location;
          return e + "//" + t + (r ? ":" + r : "");
        }
        function c() {
          let { href: e } = window.location,
            t = n();
          return e.substring(t.length);
        }
        function d(e) {
          return "string" == typeof e
            ? e
            : e.displayName || e.name || "Unknown";
        }
        function u(e) {
          return e.finished || e.headersSent;
        }
        function m(e) {
          let t = e.split("?");
          return (
            t[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") +
            (t[1] ? "?" + t.slice(1).join("?") : "")
          );
        }
        async function p(e, t) {
          let r = t.res || (t.ctx && t.ctx.res);
          if (!e.getInitialProps)
            return t.ctx && t.Component
              ? { pageProps: await p(t.Component, t.ctx) }
              : {};
          let s = await e.getInitialProps(t);
          if (r && u(r)) return s;
          if (!s)
            throw Object.defineProperty(
              Error(
                '"' +
                  d(e) +
                  '.getInitialProps()" should resolve to an object. But found "' +
                  s +
                  '" instead.'
              ),
              "__NEXT_ERROR_CODE",
              { value: "E394", enumerable: !1, configurable: !0 }
            );
          return s;
        }
        let h = "undefined" != typeof performance,
          g =
            h &&
            ["mark", "measure", "getEntriesByName"].every(
              (e) => "function" == typeof performance[e]
            );
        class _ extends Error {}
        class v extends Error {}
        class y extends Error {
          constructor(e) {
            super(),
              (this.code = "ENOENT"),
              (this.name = "PageNotFoundError"),
              (this.message = "Cannot find module for page: " + e);
          }
        }
        class b extends Error {
          constructor(e, t) {
            super(),
              (this.message =
                "Failed to load static file for page: " + e + " " + t);
          }
        }
        class x extends Error {
          constructor() {
            super(),
              (this.code = "ENOENT"),
              (this.message = "Cannot find the middleware module");
          }
        }
        function f(e) {
          return JSON.stringify({ message: e.message, stack: e.stack });
        }
      }
    },
    52100: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "isLocalURL", {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let t = e.r(95863),
          r = e.r(90225);
        function o(e) {
          if (!(0, t.isAbsoluteUrl)(e)) return !0;
          try {
            let s = (0, t.getLocationOrigin)(),
              i = new URL(e, s);
            return i.origin === s && (0, r.hasBasePath)(i.pathname);
          } catch (e) {
            return !1;
          }
        }
      }
    },
    90972: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        e.i(22271),
          Object.defineProperty(i, "__esModule", { value: !0 }),
          Object.defineProperty(i, "errorOnce", {
            enumerable: !0,
            get: function () {
              return t;
            },
          });
        let t = (e) => {};
      }
    },
    86240: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      {
        ("use strict");
        e.i(22271), Object.defineProperty(i, "__esModule", { value: !0 });
        var o = {
          default: function () {
            return n;
          },
          useLinkStatus: function () {
            return b;
          },
        };
        for (var l in o)
          Object.defineProperty(i, l, { enumerable: !0, get: o[l] });
        let t = e.r(81369),
          r = e.r(58064),
          c = t._(e.r(38653)),
          d = e.r(30609),
          u = e.r(84948),
          m = e.r(59708),
          p = e.r(48757),
          f = e.r(95863),
          h = e.r(44910);
        e.r(12597);
        let g = e.r(91981),
          _ = e.r(52100),
          v = e.r(1541);
        function a(e) {
          return "string" == typeof e ? e : (0, d.formatUrl)(e);
        }
        function n(e) {
          let t,
            s,
            i,
            [o, l] = (0, c.useOptimistic)(g.IDLE_LINK_STATUS),
            n = (0, c.useRef)(null),
            {
              href: d,
              as: b,
              children: x,
              prefetch: w = null,
              passHref: k,
              replace: S,
              shallow: j,
              scroll: E,
              onClick: N,
              onMouseEnter: C,
              onTouchStart: T,
              legacyBehavior: O = !1,
              onNavigate: P,
              ref: R,
              unstable_dynamicOnHover: M,
              ...I
            } = e;
          (t = x),
            O &&
              ("string" == typeof t || "number" == typeof t) &&
              (t = (0, r.jsx)("a", { children: t }));
          let L = c.default.useContext(u.AppRouterContext),
            U = !1 !== w,
            z = null === w ? m.PrefetchKind.AUTO : m.PrefetchKind.FULL,
            { href: W, as: $ } = c.default.useMemo(() => {
              let e = a(d);
              return { href: e, as: b ? a(b) : e };
            }, [d, b]);
          O && (s = c.default.Children.only(t));
          let D = O ? s && "object" == typeof s && s.ref : R,
            q = c.default.useCallback(
              (e) => (
                null !== L &&
                  (n.current = (0, g.mountLinkInstance)(e, W, L, z, U, l)),
                () => {
                  n.current &&
                    ((0, g.unmountLinkForCurrentNavigation)(n.current),
                    (n.current = null)),
                    (0, g.unmountPrefetchableInstance)(e);
                }
              ),
              [U, W, L, z, l]
            ),
            G = {
              ref: (0, p.useMergedRef)(q, D),
              onClick(e) {
                O || "function" != typeof N || N(e),
                  O &&
                    s.props &&
                    "function" == typeof s.props.onClick &&
                    s.props.onClick(e),
                  L &&
                    (e.defaultPrevented ||
                      (function (e, t, r, s, i, o, l) {
                        let { nodeName: a } = e.currentTarget;
                        if (
                          !(
                            ("A" === a.toUpperCase() &&
                              (function (e) {
                                let t = e.currentTarget.getAttribute("target");
                                return (
                                  (t && "_self" !== t) ||
                                  e.metaKey ||
                                  e.ctrlKey ||
                                  e.shiftKey ||
                                  e.altKey ||
                                  (e.nativeEvent && 2 === e.nativeEvent.which)
                                );
                              })(e)) ||
                            e.currentTarget.hasAttribute("download")
                          )
                        ) {
                          if (!(0, _.isLocalURL)(t)) {
                            i && (e.preventDefault(), location.replace(t));
                            return;
                          }
                          e.preventDefault(),
                            c.default.startTransition(() => {
                              if (l) {
                                let e = !1;
                                if (
                                  (l({
                                    preventDefault: () => {
                                      e = !0;
                                    },
                                  }),
                                  e)
                                )
                                  return;
                              }
                              (0, v.dispatchNavigateAction)(
                                r || t,
                                i ? "replace" : "push",
                                null == o || o,
                                s.current
                              );
                            });
                        }
                      })(e, W, $, n, S, E, P));
              },
              onMouseEnter(e) {
                O || "function" != typeof C || C(e),
                  O &&
                    s.props &&
                    "function" == typeof s.props.onMouseEnter &&
                    s.props.onMouseEnter(e),
                  L &&
                    U &&
                    (0, g.onNavigationIntent)(e.currentTarget, !0 === M);
              },
              onTouchStart: function (e) {
                O || "function" != typeof T || T(e),
                  O &&
                    s.props &&
                    "function" == typeof s.props.onTouchStart &&
                    s.props.onTouchStart(e),
                  L &&
                    U &&
                    (0, g.onNavigationIntent)(e.currentTarget, !0 === M);
              },
            };
          return (
            (0, f.isAbsoluteUrl)($)
              ? (G.href = $)
              : (O && !k && ("a" !== s.type || "href" in s.props)) ||
                (G.href = (0, h.addBasePath)($)),
            (i = O
              ? c.default.cloneElement(s, G)
              : (0, r.jsx)("a", { ...I, ...G, children: t })),
            (0, r.jsx)(y.Provider, { value: o, children: i })
          );
        }
        e.r(90972);
        let y = (0, c.createContext)(g.IDLE_LINK_STATUS),
          b = () => (0, c.useContext)(y);
        ("function" == typeof i.default ||
          ("object" == typeof i.default && null !== i.default)) &&
          void 0 === i.default.__esModule &&
          (Object.defineProperty(i.default, "__esModule", { value: !0 }),
          Object.assign(i.default, i),
          (s.exports = i.default));
      }
    },
    96983: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Link: () => l });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(86240);
      function l(e) {
        let t,
          r,
          l,
          a,
          n,
          c,
          d,
          u,
          m,
          p,
          f,
          h = (0, i.c)(32);
        h[0] !== e
          ? (({
              href: l,
              onClick: a,
              prefetch: c,
              children: t,
              disabled: r,
              ...n
            } = e),
            (h[0] = e),
            (h[1] = t),
            (h[2] = r),
            (h[3] = l),
            (h[4] = a),
            (h[5] = n),
            (h[6] = c))
          : ((t = h[1]),
            (r = h[2]),
            (l = h[3]),
            (a = h[4]),
            (n = h[5]),
            (c = h[6]));
        let g = void 0 === c || c;
        h[7] !== l
          ? ((d = l?.startsWith("http")), (h[7] = l), (h[8] = d))
          : (d = h[8]);
        let _ = d;
        if (!l && a) {
          let e, i;
          h[9] !== a
            ? ((e = (e) => a(e)), (h[9] = a), (h[10] = e))
            : (e = h[10]);
          let o = n;
          return (
            h[11] !== t || h[12] !== r || h[13] !== e || h[14] !== o
              ? ((i = (0, s.jsx)("button", {
                  onClick: e,
                  type: "button",
                  disabled: r,
                  ...o,
                  children: t,
                })),
                (h[11] = t),
                (h[12] = r),
                (h[13] = e),
                (h[14] = o),
                (h[15] = i))
              : (i = h[15]),
            i
          );
        }
        if (!l) {
          let e,
            r = n;
          return (
            h[16] !== t || h[17] !== r
              ? ((e = (0, s.jsx)("div", { ...r, children: t })),
                (h[16] = t),
                (h[17] = r),
                (h[18] = e))
              : (e = h[18]),
            e
          );
        }
        h[19] !== _
          ? ((u = _ && { target: "_blank", rel: "noopener noreferrer" }),
            (h[19] = _),
            (h[20] = u))
          : (u = h[20]),
          h[21] !== n || h[22] !== u
            ? ((m = { ...n, ...u }), (h[21] = n), (h[22] = u), (h[23] = m))
            : (m = h[23]);
        let v = m;
        h[24] !== a
          ? ((p = (e) => {
              a?.(e);
            }),
            (h[24] = a),
            (h[25] = p))
          : (p = h[25]);
        let y = p;
        return (
          h[26] !== t ||
          h[27] !== y ||
          h[28] !== l ||
          h[29] !== v ||
          h[30] !== g
            ? ((f = (0, s.jsx)(o.default, {
                prefetch: g,
                onClick: y,
                ...v,
                href: l,
                children: t,
              })),
              (h[26] = t),
              (h[27] = y),
              (h[28] = l),
              (h[29] = v),
              (h[30] = g),
              (h[31] = f))
            : (f = h[31]),
          f
        );
      }
    },
    36460: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Video: () => a });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(4371),
        l = e.i(38653);
      function a(e) {
        let t,
          r,
          a,
          c,
          d,
          u,
          m,
          p = (0, i.c)(25),
          {
            src: f,
            mobileSrc: h,
            className: g,
            autoPlay: _,
            muted: v,
            loop: y,
            playsInline: b,
            ref: x,
          } = e,
          w = void 0 !== _ && _,
          k = void 0 !== v && v,
          S = void 0 !== y && y,
          j = void 0 !== b && b,
          E = (0, l.useRef)(null);
        p[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = { rootMargin: "1000px", once: !0 }), (p[0] = t))
          : (t = p[0]);
        let [N, C] = (0, o.useIntersectionObserver)(t);
        p[1] !== w || p[2] !== C?.isIntersecting
          ? ((r = () => {
              E.current && C?.isIntersecting && w && E.current.play();
            }),
            (p[1] = w),
            (p[2] = C?.isIntersecting),
            (p[3] = r))
          : (r = p[3]),
          p[4] !== w || p[5] !== C
            ? ((a = [C, w]), (p[4] = w), (p[5] = C), (p[6] = a))
            : (a = p[6]),
          (0, l.useEffect)(r, a);
        let T = n,
          O = w && C?.isIntersecting,
          P = C?.isIntersecting ? "auto" : "none";
        p[7] !== x || p[8] !== N
          ? ((c = (e) => {
              N(e),
                (E.current = e),
                x && ("function" == typeof x ? x(e) : x && (x.current = e));
            }),
            (p[7] = x),
            (p[8] = N),
            (p[9] = c))
          : (c = p[9]),
          p[10] !== h
            ? ((d =
                h &&
                (0, s.jsx)("source", {
                  src: h,
                  type: T(h),
                  media: "(max-width:800px)",
                })),
              (p[10] = h),
              (p[11] = d))
            : (d = p[11]);
        let R = T(f);
        return (
          p[12] !== f || p[13] !== R
            ? ((u = (0, s.jsx)("source", { src: f, type: R })),
              (p[12] = f),
              (p[13] = R),
              (p[14] = u))
            : (u = p[14]),
          p[15] !== g ||
          p[16] !== S ||
          p[17] !== k ||
          p[18] !== j ||
          p[19] !== c ||
          p[20] !== d ||
          p[21] !== u ||
          p[22] !== O ||
          p[23] !== P
            ? ((m = (0, s.jsxs)("video", {
                className: g,
                autoPlay: O,
                preload: P,
                muted: k,
                loop: S,
                playsInline: j,
                ref: c,
                children: [d, u],
              })),
              (p[15] = g),
              (p[16] = S),
              (p[17] = k),
              (p[18] = j),
              (p[19] = c),
              (p[20] = d),
              (p[21] = u),
              (p[22] = O),
              (p[23] = P),
              (p[24] = m))
            : (m = p[24]),
          m
        );
      }
      function n(e) {
        return `video/${e.split(".").slice(-1)[0]}`;
      }
    },
    53216: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        blurred: "gradient-text-module__frmLeG__blurred",
        gradientText: "gradient-text-module__frmLeG__gradientText",
        text: "gradient-text-module__frmLeG__text",
      });
    },
    70471: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ GradientText: () => l });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(53216);
      function l(e) {
        let t,
          r,
          l,
          a = (0, i.c)(9),
          { blurred: n, children: c, ref: d } = e,
          u = void 0 === n || n;
        return (
          a[0] !== u || a[1] !== c
            ? ((t =
                u &&
                (0, s.jsx)("span", {
                  "aria-hidden": "true",
                  className: o.default.blurred,
                  children: c,
                })),
              (a[0] = u),
              (a[1] = c),
              (a[2] = t))
            : (t = a[2]),
          a[3] !== c || a[4] !== d
            ? ((r = (0, s.jsx)("span", {
                className: o.default.text,
                ref: d,
                children: c,
              })),
              (a[3] = c),
              (a[4] = d),
              (a[5] = r))
            : (r = a[5]),
          a[6] !== t || a[7] !== r
            ? ((l = (0, s.jsxs)("span", {
                className: o.default.gradientText,
                children: [t, r],
              })),
              (a[6] = t),
              (a[7] = r),
              (a[8] = l))
            : (l = a[8]),
          l
        );
      }
    },
    9547: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({});
    },
    3074: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Text: () => n, html: () => a });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(9547);
      function a(e) {
        return (0, s.jsx)("span", {
          dangerouslySetInnerHTML: {
            __html: e.replaceAll("\n", "<br />").replaceAll("-", "‑"),
          },
        });
      }
      function n(e) {
        let t,
          r,
          a,
          n,
          c,
          d,
          u = (0, i.c)(19),
          {
            tag: m,
            className: p,
            html: f,
            mobileHtml: h,
            ref: g,
            mobileRef: _,
          } = e,
          v = void 0 === h ? f : h,
          y = void 0 === m ? "span" : m;
        return (
          u[0] !== p
            ? ((t = (0, o.default)(p, l.default.text, "desktop-only")),
              (u[0] = p),
              (u[1] = t))
            : (t = u[1]),
          u[2] !== f
            ? ((r = f.replaceAll("\n", "<br />")), (u[2] = f), (u[3] = r))
            : (r = u[3]),
          u[4] !== r
            ? ((a = { __html: r }), (u[4] = r), (u[5] = a))
            : (a = u[5]),
          u[6] !== y || u[7] !== g || u[8] !== t || u[9] !== a
            ? ((n = (0, s.jsx)(y, {
                className: t,
                dangerouslySetInnerHTML: a,
                ref: g,
              })),
              (u[6] = y),
              (u[7] = g),
              (u[8] = t),
              (u[9] = a),
              (u[10] = n))
            : (n = u[10]),
          u[11] !== y || u[12] !== p || u[13] !== v || u[14] !== _
            ? ((c =
                v &&
                (0, s.jsx)(y, {
                  className: (0, o.default)(p, l.default.text, "mobile-only"),
                  dangerouslySetInnerHTML: {
                    __html: v.replaceAll("\n", "<br />"),
                  },
                  ref: _,
                })),
              (u[11] = y),
              (u[12] = p),
              (u[13] = v),
              (u[14] = _),
              (u[15] = c))
            : (c = u[15]),
          u[16] !== n || u[17] !== c
            ? ((d = (0, s.jsxs)(s.Fragment, { children: [n, c] })),
              (u[16] = n),
              (u[17] = c),
              (u[18] = d))
            : (d = u[18]),
          d
        );
      }
    },
    6702: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        centered: "title-subtitle-module__HtnROq__centered",
        small: "title-subtitle-module__HtnROq__small",
        subtitle: "title-subtitle-module__HtnROq__subtitle",
        titleSubtitle: "title-subtitle-module__HtnROq__titleSubtitle",
      });
    },
    99840: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ TitleSubtitle: () => u });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(38653),
        a = e.i(36940),
        n = e.i(3074),
        c = e.i(47103),
        d = e.i(6702);
      function u(e) {
        let t,
          r,
          u,
          m,
          p,
          f,
          h,
          g,
          _,
          v,
          y,
          b,
          x = (0, i.c)(30),
          {
            title: w,
            subtitle: k,
            mobileTitle: S,
            mobileSubtitle: j,
            centered: E,
            small: N,
            smallSubtitle: C,
            ref: T,
          } = e,
          O = void 0 === S ? w : S,
          P = void 0 === j ? k : j,
          R = void 0 !== N && N,
          M = void 0 !== C && C,
          I = (0, l.useRef)(null),
          L = (0, l.useRef)(null),
          U = (0, l.useRef)(null),
          z = (0, l.useRef)(null),
          W = (0, l.useRef)(null);
        x[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = () => ({
              el: I,
              setProgress: (e) => {
                U.current?.setProgress((0, c.mapRange)(0, 0.6, e, 0, 1, !0)),
                  z.current?.setProgress((0, c.mapRange)(0, 0.6, e, 0, 1, !0)),
                  L.current?.setProgress((0, c.mapRange)(0.4, 1, e, 0, 1, !0)),
                  W.current?.setProgress((0, c.mapRange)(0.4, 1, e, 0, 1, !0));
              },
            })),
            (r = []),
            (x[0] = t),
            (x[1] = r))
          : ((t = x[0]), (r = x[1])),
          (0, l.useImperativeHandle)(T, t, r);
        let $ = void 0 !== E && E && d.default.centered,
          D = R && d.default.small;
        x[2] !== $ || x[3] !== D
          ? ((u = (0, o.default)(d.default.titleSubtitle, $, D)),
            (x[2] = $),
            (x[3] = D),
            (x[4] = u))
          : (u = x[4]);
        let q = R ? "h3-mobile" : "h2";
        x[5] !== q
          ? ((m = (0, o.default)(q, "desktop-only")), (x[5] = q), (x[6] = m))
          : (m = x[6]),
          x[7] !== w
            ? ((p = "string" == typeof w ? (0, n.html)(w) : w),
              (x[7] = w),
              (x[8] = p))
            : (p = x[8]),
          x[9] !== m || x[10] !== p
            ? ((f = (0, s.jsx)(a.SplitText, {
                as: "h2",
                willAppear: !0,
                className: m,
                ref: U,
                children: p,
              })),
              (x[9] = m),
              (x[10] = p),
              (x[11] = f))
            : (f = x[11]);
        let G = R ? "h3-mobile" : "h2";
        return (
          x[12] !== G
            ? ((h = (0, o.default)(G, "mobile-only")), (x[12] = G), (x[13] = h))
            : (h = x[13]),
          x[14] !== O
            ? ((g = "string" == typeof O ? (0, n.html)(O) : O),
              (x[14] = O),
              (x[15] = g))
            : (g = x[15]),
          x[16] !== h || x[17] !== g
            ? ((_ = (0, s.jsx)(a.SplitText, {
                as: "h2",
                willAppear: !0,
                className: h,
                ref: z,
                children: g,
              })),
              (x[16] = h),
              (x[17] = g),
              (x[18] = _))
            : (_ = x[18]),
          x[19] !== k
            ? ((v =
                k &&
                (0, s.jsx)(a.SplitText, {
                  as: "p",
                  ref: L,
                  className: (0, o.default)(
                    "subtitle text-white-40 inline-block desktop-only",
                    d.default.subtitle
                  ),
                  type: "lines",
                  children: "string" == typeof k ? (0, n.html)(k) : k,
                })),
              (x[19] = k),
              (x[20] = v))
            : (v = x[20]),
          x[21] !== P || x[22] !== M
            ? ((y =
                P &&
                (0, s.jsx)(a.SplitText, {
                  as: "p",
                  ref: W,
                  className: (0, o.default)(
                    M ? "subtitleMobile" : "subtitle",
                    "text-white-40 inline-block mobile-only",
                    d.default.subtitle
                  ),
                  type: "lines",
                  children: "string" == typeof P ? (0, n.html)(P) : P,
                })),
              (x[21] = P),
              (x[22] = M),
              (x[23] = y))
            : (y = x[23]),
          x[24] !== u ||
          x[25] !== f ||
          x[26] !== _ ||
          x[27] !== v ||
          x[28] !== y
            ? ((b = (0, s.jsxs)("div", {
                ref: I,
                className: u,
                children: [f, _, v, y],
              })),
              (x[24] = u),
              (x[25] = f),
              (x[26] = _),
              (x[27] = v),
              (x[28] = y),
              (x[29] = b))
            : (b = x[29]),
          b
        );
      }
    },
    39664: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        active: "section10-module__fkP61a__active",
        blur: "section10-module__fkP61a__blur",
        cta: "section10-module__fkP61a__cta",
        ctaIcon: "section10-module__fkP61a__ctaIcon",
        ctaMobileWrapper: "section10-module__fkP61a__ctaMobileWrapper",
        icon: "section10-module__fkP61a__icon",
        iconFill: "section10-module__fkP61a__iconFill",
        iconLabel: "section10-module__fkP61a__iconLabel",
        iconWhite: "section10-module__fkP61a__iconWhite",
        icons: "section10-module__fkP61a__icons",
        section10: "section10-module__fkP61a__section10",
        small: "section10-module__fkP61a__small",
        sticky: "section10-module__fkP61a__sticky",
        svgWrapper: "section10-module__fkP61a__svgWrapper",
        titleWrapper: "section10-module__fkP61a__titleWrapper",
        videoWrapper: "section10-module__fkP61a__videoWrapper",
        videosWrapper: "section10-module__fkP61a__videosWrapper",
      });
    },
    11307: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ LargeButton: () => j, Section10: () => E });
        var s = e.i(58064),
          i = e.i(85444),
          o = e.i(60566),
          l = e.i(17170),
          a = e.i(4371),
          n = e.i(38653),
          c = e.i(115),
          d = e.i(98451),
          u = e.i(13095),
          m = e.i(84400),
          p = e.i(41203),
          f = e.i(21284),
          h = e.i(97536),
          g = e.i(96983),
          _ = e.i(36460),
          v = e.i(22477),
          y = e.i(97287),
          b = e.i(47103),
          x = e.i(70471),
          w = e.i(18421),
          k = e.i(99840),
          S = e.i(39664);
        let t = {
          title: "Dynamic Light Effects",
          subtitle: "Another Industry First – Illuminate Your Way to Victory",
          cta: { label: "Personalize My Own Style", href: "" },
          icons: [
            {
              label: "Power on",
              icon: f.default,
              videoUrl: "/videos/parts/01_power-on.webm",
            },
            {
              label: "Take Off",
              icon: p.default,
              videoUrl: "/videos/parts/02_take-off.webm",
            },
            {
              label: "Tune Up",
              icon: h.default,
              videoUrl: "/videos/parts/04_tune-up.webm",
            },
            {
              label: "Tune Down",
              icon: m.default,
              videoUrl: "/videos/parts/03_tune-down.webm",
            },
            {
              label: "3D Switch",
              icon: d.default,
              videoUrl: "/videos/parts/05_3d-switch.webm",
            },
            {
              label: "Electrochromic Film",
              icon: u.default,
              videoUrl: "/videos/parts/06_electrochromic-film-switch.webm",
            },
          ],
        };
        function j(e) {
          let t,
            r,
            l,
            a,
            n,
            d,
            u = (0, i.c)(17),
            {
              href: m,
              label: p,
              className: f,
              gradientText: h,
              small: _,
              blur: v,
            } = e,
            y = _ ? "sizeLabel" : "lightSubtitle",
            b = _ && S.default.small,
            w = v && S.default.blur;
          return (
            u[0] !== f || u[1] !== y || u[2] !== b || u[3] !== w
              ? ((t = (0, o.default)(
                  y,
                  S.default.icon,
                  S.default.cta,
                  b,
                  w,
                  f
                )),
                (u[0] = f),
                (u[1] = y),
                (u[2] = b),
                (u[3] = w),
                (u[4] = t))
              : (t = u[4]),
            u[5] !== p
              ? ((r = (0, s.jsx)("span", { children: p })),
                (u[5] = p),
                (u[6] = r))
              : (r = u[6]),
            u[7] !== h
              ? ((l = h && (0, s.jsx)(x.GradientText, { children: h })),
                (u[7] = h),
                (u[8] = l))
              : (l = u[8]),
            u[9] !== r || u[10] !== l
              ? ((a = (0, s.jsxs)("div", {
                  className: "flex flex-col dr-gap-4",
                  children: [r, l],
                })),
                (u[9] = r),
                (u[10] = l),
                (u[11] = a))
              : (a = u[11]),
            u[12] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = (0, s.jsx)("span", {
                  className: S.default.ctaIcon,
                  children: (0, s.jsx)(c.default, {}),
                })),
                (u[12] = n))
              : (n = u[12]),
            u[13] !== m || u[14] !== t || u[15] !== a
              ? ((d = (0, s.jsxs)(g.Link, {
                  className: t,
                  href: m,
                  children: [a, n],
                })),
                (u[13] = m),
                (u[14] = t),
                (u[15] = a),
                (u[16] = d))
              : (d = u[16]),
            d
          );
        }
        function E() {
          let { story: e } = (0, y.useStoryblokContext)(),
            r = e?.content?.section10?.[0];
          if (!r) return null;
          let [i, c] = (0, n.useState)(0),
            [d, u] = (0, a.useRect)(),
            [m, p] = (0, a.useRect)(),
            f = (0, n.useRef)(null),
            h = (0, n.useRef)([]),
            g = (0, n.useRef)([]),
            x = (0, n.useRef)(null);
          (0, v.useScrollTrigger)({
            rect: u,
            start: "top center",
            end: "top top",
            onProgress({ progress: e }) {
              f.current?.setProgress(e);
            },
          }),
            (0, v.useScrollTrigger)({
              rect: p,
              start: "top bottom",
              end: "bottom bottom",
              onProgress({ progress: e }) {
                (0, b.fromTo)(
                  [...g.current, x.current],
                  { y: 20, scale: 0.75 },
                  { y: 0, scale: 1 },
                  e,
                  {
                    ease: "easeOutSine",
                    stagger: 0.03,
                    render(e, { y: t, scale: r }) {
                      e instanceof HTMLElement &&
                        (e.style.transform = `translate3d(0, ${t}vh, 0) scale3d(${r}, ${r}, 1)`);
                    },
                  }
                );
              },
            });
          let E = (0, n.useCallback)(
            (e) => {
              i !== e && c(e);
            },
            [i]
          );
          return (
            (0, n.useEffect)(() => {
              let e = h.current[i],
                t = g.current[i];
              if (!e || !t) return;
              let r = t.querySelector(".js-label");
              t.style.width = "auto";
              let s = t.offsetWidth;
              r.style.display = "block";
              let o = t.offsetWidth;
              return (
                l.default.fromTo(
                  t,
                  { width: s },
                  {
                    width: o,
                    duration: 1,
                    overwrite: "auto",
                    ease: "expo.out",
                    onComplete: () => {
                      t.style.width = "auto";
                    },
                  }
                ),
                l.default.fromTo(
                  r,
                  { opacity: 0 },
                  {
                    opacity: 1,
                    ease: "power1.out",
                    overwrite: "auto",
                    duration: 0.5,
                  }
                ),
                (e.currentTime = 0),
                e.play().catch(() => {}),
                (e.style.opacity = "1"),
                () => {
                  e.pause(), (e.style.opacity = "0"), (t.style.width = "auto");
                  let s = t.offsetWidth;
                  r.style.display = "none";
                  let i = t.offsetWidth;
                  (r.style.display = "block"),
                    l.default.fromTo(
                      t,
                      { width: s },
                      {
                        width: i,
                        duration: 1,
                        overwrite: "auto",
                        ease: "expo.out",
                        onComplete: () => {
                          t.style.width = "auto";
                        },
                      }
                    ),
                    l.default.to(r, {
                      opacity: 0,
                      ease: "power1.inOut",
                      duration: 0.2,
                      overwrite: "auto",
                      onComplete: () => {
                        r.style.display = "none";
                      },
                    });
                }
              );
            }, [i]),
            (0, s.jsx)(w.Section, {
              mask: "left",
              className: (0, o.default)(S.default.section10),
              ref: d,
              snap: "start",
              children: (0, s.jsxs)("div", {
                className: S.default.sticky,
                children: [
                  (0, s.jsx)("div", {
                    className: (0, o.default)(
                      "dr-layout-block",
                      S.default.titleWrapper
                    ),
                    children: (0, s.jsx)(k.TitleSubtitle, {
                      title: r?.title?.[0]?.desktop,
                      mobileTitle: r?.title?.[0]?.mobile,
                      subtitle: r?.subtitle?.[0]?.desktop,
                      mobileSubtitle: r?.subtitle?.[0]?.mobile,
                      centered: !0,
                      ref: f,
                      smallSubtitle: !0,
                    }),
                  }),
                  (0, s.jsx)("div", {
                    className: S.default.videosWrapper,
                    children: t.icons.map((e, t) =>
                      (0, s.jsx)(
                        "div",
                        {
                          className: S.default.videoWrapper,
                          children: (0, s.jsx)(_.Video, {
                            src: e.videoUrl,
                            ref: (e) => {
                              e && (h.current[t] = e);
                            },
                            muted: !0,
                            loop: !0,
                            playsInline: !0,
                            autoPlay: 0 === t,
                          }),
                        },
                        t
                      )
                    ),
                  }),
                  (0, s.jsxs)("div", {
                    className: S.default.icons,
                    "data-lenis-prevent-touch": !0,
                    ref: m,
                    children: [
                      t.icons.map((e, t) => {
                        let r = e.icon;
                        return (0, s.jsxs)(
                          "button",
                          {
                            type: "button",
                            className: (0, o.default)(S.default.icon, {
                              [S.default.active]: i === t,
                            }),
                            onClick: () => E(t),
                            ref: (e) => {
                              e && (g.current[t] = e);
                            },
                            children: [
                              (0, s.jsxs)("div", {
                                className: S.default.svgWrapper,
                                children: [
                                  (0, s.jsx)(r, {
                                    className: S.default.iconFill,
                                  }),
                                  (0, s.jsx)(r, {
                                    className: S.default.iconWhite,
                                  }),
                                ],
                              }),
                              (0, s.jsx)("span", {
                                className: (0, o.default)(
                                  S.default.iconLabel,
                                  "lightSubtitle text-white js-label"
                                ),
                                children: e.label,
                              }),
                            ],
                          },
                          t
                        );
                      }),
                      (0, s.jsx)("div", {
                        ref: x,
                        className: "desktop-only",
                        children: (0, s.jsx)(j, {
                          href: t.cta.href,
                          label: t.cta.label,
                          gradientText: "Coming soon",
                        }),
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: (0, o.default)(
                      "mobile-only dr-layout-block",
                      S.default.ctaMobileWrapper
                    ),
                    children: (0, s.jsx)(j, {
                      href: t.cta.href,
                      label: t.cta.label,
                      gradientText: "Coming soon",
                    }),
                  }),
                ],
              }),
            })
          );
        }
      }
    },
    5578: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o,
          l,
          a,
          n,
          c,
          d,
          u = e.i(38653);
        function m() {
          return (m = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, u.memo)(function (e) {
          return (0,
          u.createElement)("svg", m({ viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, e), s || (s = (0, u.createElement)("path", { d: "M2.1.4q-.5.7-.5 1.6v24q0 .9.5 1.6h.1l13.5-13.4v-.4z", fill: "url(#google-play_svg__a)" })), i || (i = (0, u.createElement)("path", { d: "m20.2 18.7-4.5-4.5v-.4l4.5-4.5v.1l5.4 3c1.5.9 1.5 2.3 0 3.2l-5.3 3z", fill: "url(#google-play_svg__b)" })), o || (o = (0, u.createElement)("path", { d: "M20.3 18.6 15.7 14 2.1 27.6a2 2 0 0 0 2.3 0z", fill: "url(#google-play_svg__c)" })), l || (l = (0, u.createElement)("path", { d: "m20.3 9.4-16-9a2 2 0 0 0-2.2 0L15.7 14z", fill: "url(#google-play_svg__d)" })), a || (a = (0, u.createElement)("path", { opacity: 0.1, d: "m20.2 18.5-15.8 9a2 2 0 0 1-2.2 0H2v.1a2 2 0 0 0 2.3 0l15.9-9z", fill: "black" })), n || (n = (0, u.createElement)("path", { opacity: 0.1, d: "M2.1 27.4q-.5-.7-.5-1.5v.1q0 .9.5 1.6l.1-.1", fill: "black" })), c || (c = (0, u.createElement)("path", { opacity: 0.1, d: "m25.6 15.4-5.4 3.1v.1l5.4-3a2 2 0 0 0 1.2-1.6 2 2 0 0 1-1.2 1.4", fill: "black" })), d || (d = (0, u.createElement)("defs", null, (0, u.createElement)("linearGradient", { id: "google-play_svg__a", x1: 14.5, y1: 1.7, x2: -3.8, y2: 20, gradientUnits: "userSpaceOnUse" }, (0, u.createElement)("stop", { stopColor: "#008EFF" }), (0, u.createElement)("stop", { offset: 0, stopColor: "#008FFF" }), (0, u.createElement)("stop", { offset: 0.3, stopColor: "#00ACFF" }), (0, u.createElement)("stop", { offset: 0.5, stopColor: "#00C0FF" }), (0, u.createElement)("stop", { offset: 0.8, stopColor: "#00CDFF" }), (0, u.createElement)("stop", { offset: 1, stopColor: "#00D1FF" })), (0, u.createElement)("linearGradient", { id: "google-play_svg__b", x1: 25.8, y1: 14, x2: -0.5, y2: 14, gradientUnits: "userSpaceOnUse" }, (0, u.createElement)("stop", { stopColor: "#FFD800" }), (0, u.createElement)("stop", { offset: 1, stopColor: "#FF8A00" })), (0, u.createElement)("linearGradient", { id: "google-play_svg__c", x1: 17.8, y1: 16.5, x2: -7, y2: 41.3, gradientUnits: "userSpaceOnUse" }, (0, u.createElement)("stop", { stopColor: "#FF3A44" }), (0, u.createElement)("stop", { offset: 1, stopColor: "#B11162" })), (0, u.createElement)("linearGradient", { id: "google-play_svg__d", x1: -1.3, y1: -7.6, x2: 9.8, y2: 3.5, gradientUnits: "userSpaceOnUse" }, (0, u.createElement)("stop", { stopColor: "#328E71" }), (0, u.createElement)("stop", { offset: 0.1, stopColor: "#2D9571" }), (0, u.createElement)("stop", { offset: 0.5, stopColor: "#15BD74" }), (0, u.createElement)("stop", { offset: 0.8, stopColor: "#06D575" }), (0, u.createElement)("stop", { offset: 1, stopColor: "#00DE76" })))));
        });
      }
    },
    99792: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o = e.i(38653);
        function l() {
          return (l = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, o.memo)(function (e) {
          return (0,
          o.createElement)("svg", l({ viewBox: "0 0 28 33", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, e), s || (s = (0, o.createElement)("path", { d: "M18.8 6q1-1.2 1.4-2.6.4-1.3.3-2.7V.4h-.3q-1.3 0-2.6.7a8 8 0 0 0-3.7 4.3q-.5 1.2-.3 2.6v.3h.3q1.4 0 2.6-.6A7 7 0 0 0 18.8 6", fill: "white" })), i || (i = (0, o.createElement)("path", { d: "M22.9 17.4c0-3.7 2.9-5.5 3.2-5.7l.3-.2-.2-.3Q25 9.7 23.6 9q-2.2-1.1-3.4-1-2.4 0-4.3 1-1 .5-1.7.5L12.3 9Q10.8 8 9 8 7 8 5 9.2a8 8 0 0 0-2.8 3Q.3 15.5 1 19.6A20 20 0 0 0 6.4 31q1.5 1.3 3 1.3 1.4 0 2.4-.6 1.1-.5 2.8-.6a6 6 0 0 1 2.6.6q1 .5 2.6.6t3-1.3l2-2.7c1.5-2.1 2.2-4.2 2.3-4.5v-.4H27c-.2-.2-4-1.7-4-6.1", fill: "white" })));
        });
      }
    },
    29663: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o,
          l,
          a,
          n = e.i(38653);
        function c() {
          return (c = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, n.memo)(function (e) {
          return (0,
          n.createElement)("svg", c({ viewBox: "0 0 32 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, e), s || (s = (0, n.createElement)("path", { d: "M19 5h.1v1h1.1V2l-.1-.9-.5-.6-.8-.4a3 3 0 0 0-1.8 0l-.8.4-.5.6-.2.7h1.1l.4-.6.4-.2h.4q.6 0 1 .2.3.3.3.8v.4l-1.6.1a3 3 0 0 0-1.7.5q-.6.5-.5 1.2l.1.7.4.6.6.3a3 3 0 0 0 2-.1l.4-.3q0-.2.3-.5m-.4-.3-.5.2-.6.1q-.5 0-.8-.2l-.3-.6.3-.6 1-.2 1.4-.1v.4a1 1 0 0 1-.5 1", fill: "white" })), i || (i = (0, n.createElement)("path", { d: "m26.8 17.7-2-.5q-3.4-.8-3.3-2.6c0-1.7 1.6-2.8 3.8-2.8q3.4 0 4 3h2.4c0-3.1-2.7-5.2-6.3-5.2-3.8 0-6.5 2-6.5 5.1q0 3.7 4.8 4.8l2.3.5q3.5.8 3.4 3c0 1.6-1.7 2.8-4 2.8q-4-.1-4.4-3h-2.6c.2 3.2 2.9 5.2 6.8 5.2 4.2 0 6.8-2 6.8-5.4q.2-3.7-5.2-4.9", fill: "white" })), o || (o = (0, n.createElement)("path", { d: "M14 6V1a2 2 0 0 0-1-1h-1l-1 .2-.7.8-.7-.8q-.3-.3-1-.3h-.5l-.9.6-.3.5V0H5.8v5.8h1.1V2.3l.2-.5.2-.4a1 1 0 0 1 1-.4h.4a1 1 0 0 1 .6.7v4.2h1.2V1.8a1 1 0 0 1 .7-.7h.5q.6 0 .8.2t.3 1v3.6z", fill: "white" })), l || (l = (0, n.createElement)("path", { d: "M8.3 9.6C3.3 9.6 0 13 0 18.8S3.2 28 8.3 28s8.4-3.5 8.4-9.2-3.2-9.2-8.4-9.2m0 16.1c-3.5 0-5.7-2.7-5.7-6.9s2.2-7 5.7-7 5.7 2.7 5.7 7-2.2 7-5.7 7", fill: "white" })), a || (a = (0, n.createElement)("path", { d: "M23 1.5a1 1 0 0 1 1.2-.5h.6l.4.3.3.3.1.5h1.1a2 2 0 0 0-1.5-2l-1-.1q-.6 0-1.1.2l-.9.6-.5 1q-.3.5-.2 1.2 0 .8.2 1.2l.5 1 .9.6 1.1.2q.6 0 1-.2.4 0 .8-.4a2 2 0 0 0 .7-1.5h-1q-.2.6-.5.8-.4.3-1 .3l-.6-.1-.5-.4-.3-.7-.1-.8v-.8z", fill: "white" })));
        });
      }
    },
    27696: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i,
          o,
          l,
          a = e.i(38653);
        function n() {
          return (n = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, a.memo)(function (e) {
          return (0,
          a.createElement)("svg", n({ viewBox: "0 0 32 33", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, e), s || (s = (0, a.createElement)("path", { d: "M15.2.5H0v15.2h15.2z", fill: "#0078D4" })), i || (i = (0, a.createElement)("path", { d: "M32 .5H16.8v15.2H32z", fill: "#0078D4" })), o || (o = (0, a.createElement)("path", { d: "M15.2 17.3H0v15.2h15.2z", fill: "#0078D4" })), l || (l = (0, a.createElement)("path", { d: "M32 17.3H16.8v15.2H32z", fill: "#0078D4" })));
        });
      }
    },
    345: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        alive: "blurry-gradient-module__gkYgHG__alive",
        blurryGradient: "blurry-gradient-module__gkYgHG__blurryGradient",
        gradient: "blurry-gradient-module__gkYgHG__gradient",
        lowFade: "blurry-gradient-module__gkYgHG__lowFade",
        mask: "blurry-gradient-module__gkYgHG__mask",
        moveInCircle: "blurry-gradient-module__gkYgHG__moveInCircle",
      });
    },
    70091: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ BlurryGradient: () => a });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(345);
      function a(e) {
        let t,
          r,
          a,
          n = (0, i.c)(5),
          { lowFade: c } = e,
          d = void 0 !== c && c;
        return (
          n[0] !== d
            ? ((t = (0, o.default)(l.default.blurryGradient, {
                [l.default.lowFade]: d,
              })),
              (n[0] = d),
              (n[1] = t))
            : (t = n[1]),
          n[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, s.jsx)("div", {
                className: l.default.mask,
                children: (0, s.jsx)("div", { className: l.default.gradient }),
              })),
              (n[2] = r))
            : (r = n[2]),
          n[3] !== t
            ? ((a = (0, s.jsx)("div", { className: t, children: r })),
              (n[3] = t),
              (n[4] = a))
            : (a = n[4]),
          a
        );
      }
    },
    72489: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        gradientWrapper: "section11-module__XZ044a__gradientWrapper",
        icon: "section11-module__XZ044a__icon",
        icons: "section11-module__XZ044a__icons",
        left: "section11-module__XZ044a__left",
        middle: "section11-module__XZ044a__middle",
        middleReflect: "section11-module__XZ044a__middleReflect",
        right: "section11-module__XZ044a__right",
        screen: "section11-module__XZ044a__screen",
        screenScroller: "section11-module__XZ044a__screenScroller",
        section11: "section11-module__XZ044a__section11",
        sticky: "section11-module__XZ044a__sticky",
      });
    },
    23015: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section11: () => x });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(5578),
        n = e.i(99792),
        c = e.i(29663),
        d = e.i(27696),
        u = e.i(67376),
        m = e.i(36460),
        p = e.i(40886),
        f = e.i(22477),
        h = e.i(97287),
        g = e.i(47103),
        _ = e.i(70091),
        v = e.i(18421),
        y = e.i(99840),
        b = e.i(72489);
      function x() {
        let { story: e } = (0, h.useStoryblokContext)(),
          t = e?.content?.section11?.[0];
        if (!t) return null;
        let [r, x] = (0, o.useRect)(),
          w = (0, l.useRef)(null),
          k = (0, l.useRef)(null),
          S = (0, l.useRef)(null),
          j = (0, l.useRef)([]),
          [E, N] = (0, o.useRect)(),
          [C, T] = (0, o.useRect)(),
          { isDesktop: O } = (0, p.useDeviceDetection)();
        return (
          (0, l.useRef)(null),
          (0, f.useScrollTrigger)({
            rect: x,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              w.current?.setProgress(e),
                (0, g.fromTo)(
                  j.current,
                  { y: 50, opacity: 0 },
                  { y: 0, opacity: 1 },
                  (0, g.mapRange)(0.6, 1, e, 0, 1, !0),
                  {
                    ease: "easeOutSine",
                    stagger: 0.05,
                    render(e, { y: t, opacity: r }) {
                      e instanceof HTMLElement &&
                        ((e.style.transform = `translate3d(0, ${t}%, 0)`),
                        (e.style.opacity = `${r}`));
                    },
                  }
                );
            },
          }),
          (0, f.useScrollTrigger)(
            {
              rect: x,
              start: "center center",
              end: "bottom center",
              onProgress({ progress: e }) {
                if (S.current)
                  if (O) S.current.style.transform = "";
                  else {
                    let t = (0, g.ease)(e, "easeInOutQuad");
                    S.current.style.transform = `translate3d(${
                      -((T.width || 0) - (N.width || 0)) * t
                    }px, 0, 0)`;
                  }
              },
            },
            [O]
          ),
          (0, f.useScrollTrigger)({
            rect: x,
            start: "bottom bottom",
            end: "bottom top",
            onProgress({ progress: e }) {
              if (!k.current) return;
              let t = (0, g.ease)(e, "easeInOutQuad");
              k.current.style.transform = `scale3d(${1 - 0.15 * t}, ${
                1 - 0.15 * t
              }, 1)`;
            },
          }),
          (0, s.jsx)(v.Section, {
            className: (0, i.default)(
              b.default.section11,
              "dr-layout-block-inner"
            ),
            ref: r,
            snap: !!O && "start",
            children: (0, s.jsxs)("div", {
              className: b.default.sticky,
              children: [
                (0, s.jsx)(y.TitleSubtitle, {
                  title: t?.title?.[0]?.desktop,
                  mobileTitle: t?.title?.[0]?.mobile,
                  subtitle: t?.subtitle?.[0]?.desktop,
                  mobileSubtitle: t?.subtitle?.[0]?.mobile,
                  centered: !0,
                  ref: w,
                  smallSubtitle: !0,
                }),
                (0, s.jsxs)("div", {
                  className: b.default.icons,
                  children: [
                    (0, s.jsx)("div", {
                      className: b.default.icon,
                      ref: (e) => {
                        j.current[0] = e;
                      },
                      children: (0, s.jsx)(a.default, {}),
                    }),
                    (0, s.jsx)("div", {
                      className: b.default.icon,
                      ref: (e) => {
                        j.current[1] = e;
                      },
                      children: (0, s.jsx)(n.default, {}),
                    }),
                    (0, s.jsx)("div", {
                      className: b.default.icon,
                      ref: (e) => {
                        j.current[2] = e;
                      },
                      children: (0, s.jsx)(d.default, {}),
                    }),
                    (0, s.jsx)("div", {
                      className: b.default.icon,
                      ref: (e) => {
                        j.current[3] = e;
                      },
                      children: (0, s.jsx)(c.default, {}),
                    }),
                  ],
                }),
                (0, s.jsxs)("div", {
                  className: b.default.screenScroller,
                  ref: (e) => {
                    e && ((k.current = e), E(e));
                  },
                  children: [
                    (0, s.jsx)("div", {
                      className: b.default.gradientWrapper,
                      children: (0, s.jsx)(_.BlurryGradient, { lowFade: !0 }),
                    }),
                    (0, s.jsxs)("div", {
                      className: b.default.screen,
                      ref: (e) => {
                        e && ((S.current = e), C(e));
                      },
                      children: [
                        (0, s.jsx)("div", {
                          className: b.default.left,
                          children: (0, s.jsx)(u.Image, {
                            src: "/images/section11/left.png",
                            desktopSize: "25vw",
                            mobileSize: "50vw",
                            alt: "",
                            fill: !0,
                          }),
                        }),
                        (0, s.jsx)("div", {
                          className: b.default.middle,
                          children: (0, s.jsx)(m.Video, {
                            src: "/videos/severance-desktop.webm",
                            mobileSrc: "/videos/severance-mobile.mp4",
                            autoPlay: !0,
                            playsInline: !0,
                            muted: !0,
                            loop: !0,
                            className: "w-full h-full object-cover",
                          }),
                        }),
                        (0, s.jsx)("div", {
                          className: b.default.right,
                          children: (0, s.jsx)(u.Image, {
                            src: "/images/section11/right.png",
                            desktopSize: "25vw",
                            mobileSize: "50vw",
                            alt: "",
                            fill: !0,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
        );
      }
    },
    92406: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        bentoCard: "section12-module__BCPo9G__bentoCard",
        bentoCta: "section12-module__BCPo9G__bentoCta",
        bentoScreen: "section12-module__BCPo9G__bentoScreen",
        bentoScreenOuter: "section12-module__BCPo9G__bentoScreenOuter",
        bentoScreenWrapper: "section12-module__BCPo9G__bentoScreenWrapper",
        bigCard: "section12-module__BCPo9G__bigCard",
        cardInner: "section12-module__BCPo9G__cardInner",
        cards: "section12-module__BCPo9G__cards",
        head: "section12-module__BCPo9G__head",
        left: "section12-module__BCPo9G__left",
        light: "section12-module__BCPo9G__light",
        right: "section12-module__BCPo9G__right",
        screenGuy: "section12-module__BCPo9G__screenGuy",
        screenLight: "section12-module__BCPo9G__screenLight",
        screenUI: "section12-module__BCPo9G__screenUI",
        section12: "section12-module__BCPo9G__section12",
        sticky: "section12-module__BCPo9G__sticky",
      });
    },
    63558: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section12: () => v });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(4371),
        a = e.i(38653),
        n = e.i(115),
        c = e.i(67376),
        d = e.i(3074),
        u = e.i(36460),
        m = e.i(22477),
        p = e.i(97287),
        f = e.i(47103),
        h = e.i(18421),
        g = e.i(11307),
        _ = e.i(92406);
      function v() {
        let { story: e } = (0, p.useStoryblokContext)(),
          t = e?.content?.section12?.[0];
        if (!t) return null;
        let [r, i] = (0, l.useRect)(),
          [v, b] = (0, l.useRect)(),
          x = (0, a.useRef)(null),
          w = (0, a.useRef)(null),
          k = (0, a.useRef)(null),
          S = (0, a.useRef)(null),
          j = (0, a.useRef)(null),
          E = (0, a.useRef)(null);
        return (
          (0, m.useScrollTrigger)({
            rect: i,
            start: "bottom bottom",
            end: "top top",
            onProgress({ progress: e }) {
              if (
                !x.current ||
                !w.current ||
                !k.current ||
                !S.current ||
                !j.current ||
                !E.current
              )
                return;
              let t = (0, f.ease)(e, "easeInOutSine"),
                r = 0.65 + 0.35 * t;
              (x.current.style.transform = `scale3d(${r}, ${r}, 1)`),
                (w.current.style.transform = `translate3d(-50%, -50%, 0) scale3d(${
                  r ** 1.7
                }, 1, 1)`),
                (k.current.style.background = `linear-gradient( -45deg, rgba(255, 255, 255, 0.5) 0%, #fff0 ${
                  32 + (1 - t) * 12
                }%, #fff0 100% )`);
              let s = b.width || 0,
                i = b.height || 0,
                o = (0.65 * s - s) * 0.5 * t - 0.07 * s * t,
                l = (0.65 * i - i) * 0.5 * (t - 0.5) * 2 - 0.05 * s * t;
              (S.current.style.transform = `translate3d(${o}px, ${-l}px, 0)`),
                (j.current.style.transform = `translate3d(${-o}px, ${-l}px, 0)`),
                (E.current.style.transform = `translate3d(0, ${
                  0.15 * i * (1 - t)
                }px, 0)`);
            },
          }),
          (0, s.jsx)(h.Section, {
            className: (0, o.default)(
              _.default.section12,
              "dr-layout-block-inner"
            ),
            snap: "start",
            children: (0, s.jsx)("div", {
              className: _.default.sticky,
              children: (0, s.jsxs)("div", {
                className: (0, o.default)(
                  _.default.cards,
                  "grid grid-cols-1 dt:grid-cols-2 dt:grid-rows-2 gap-gap"
                ),
                children: [
                  (0, s.jsx)("div", {
                    children: (0, s.jsx)(y, {
                      title: (0, s.jsx)(d.Text, {
                        html: t?.cards[0].title?.[0]?.desktop,
                        mobileHtml: t?.cards[0].title?.[0]?.mobile,
                      }),
                      children: (0, s.jsx)(c.Image, {
                        src: "/images/glass2.png",
                        fill: !0,
                        desktopSize: "50vw",
                        mobileSize: "100vw",
                      }),
                    }),
                  }),
                  (0, s.jsx)("div", {
                    className: (0, o.default)(
                      "dt:row-span-2",
                      _.default.bigCard
                    ),
                    children: (0, s.jsx)(y, {
                      title: (0, s.jsx)(d.Text, {
                        html: t?.cards[1].title?.[0]?.desktop,
                        mobileHtml: t?.cards[1].title?.[0]?.mobile,
                      }),
                      subTitle: (0, s.jsx)(d.Text, {
                        html: t?.cards[1].subtitle?.[0]?.desktop,
                        mobileHtml: t?.cards[1].subtitle?.[0]?.mobile,
                      }),
                      children: (0, s.jsxs)("div", {
                        className: "absolute inset-0",
                        children: [
                          (0, s.jsx)(u.Video, {
                            src: "/videos/nemo.webm",
                            autoPlay: !0,
                            playsInline: !0,
                            muted: !0,
                            loop: !0,
                            className:
                              "absolute w-full h-full desktop-only object-cover",
                          }),
                          (0, s.jsx)(u.Video, {
                            src: "/videos/nemo-mobile.webm",
                            autoPlay: !0,
                            playsInline: !0,
                            muted: !0,
                            loop: !0,
                            className:
                              "absolute w-full h-full mobile-only object-cover",
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, s.jsx)("div", {
                    children: (0, s.jsx)(y, {
                      title: (0, s.jsx)(d.Text, {
                        html: t?.cards[2].title?.[0]?.desktop,
                        mobileHtml: t?.cards[2].title?.[0]?.mobile,
                      }),
                      cta: (0, s.jsx)(g.LargeButton, {
                        href: t?.cards[2].cta?.[0]?.url,
                        label: t?.cards[2].cta?.[0]?.text,
                        gradientText: (0, s.jsx)(d.Text, {
                          html: t?.cards[2].subtitle?.[0]?.desktop,
                          mobileHtml: t?.cards[2].subtitle?.[0]?.mobile,
                        }),
                        small: !0,
                        blur: !0,
                        className: "w-full",
                      }),
                      children: (0, s.jsxs)("div", {
                        className: _.default.bentoScreenOuter,
                        children: [
                          (0, s.jsxs)("div", {
                            className: _.default.bentoScreenWrapper,
                            ref: r,
                            children: [
                              (0, s.jsx)("div", {
                                className: _.default.bentoScreen,
                                ref: (e) => {
                                  (x.current = e), v(e);
                                },
                              }),
                              (0, s.jsx)("div", {
                                className: _.default.screenLight,
                                ref: w,
                                children: (0, s.jsx)("div", {
                                  className: _.default.light,
                                  ref: k,
                                }),
                              }),
                              (0, s.jsxs)("div", {
                                className: _.default.screenUI,
                                children: [
                                  (0, s.jsx)("div", {
                                    className: _.default.left,
                                    ref: S,
                                    children: (0, s.jsx)(n.default, {}),
                                  }),
                                  (0, s.jsx)("div", {
                                    className: _.default.right,
                                    ref: j,
                                    children: (0, s.jsx)(n.default, {}),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, s.jsx)("div", {
                            className: _.default.screenGuy,
                            ref: E,
                            children: (0, s.jsx)(c.Image, {
                              src: "/images/back-guy-screen.png",
                              fill: !0,
                              mobileSize: "45vw",
                              desktopSize: "20vw",
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            }),
          })
        );
      }
      function y(e) {
        let t,
          r,
          l,
          a,
          n,
          c,
          d,
          u = (0, i.c)(15),
          { title: m, subTitle: p, cta: f, children: h } = e;
        return (
          u[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((t = (0, o.default)(_.default.bentoCard, "overflow-clip")),
              (u[0] = t))
            : (t = u[0]),
          u[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, o.default)(_.default.head, "relative z-10")),
              (u[1] = r))
            : (r = u[1]),
          u[2] !== m
            ? ((l = (0, s.jsx)("h3", { className: "h4", children: m })),
              (u[2] = m),
              (u[3] = l))
            : (l = u[3]),
          u[4] !== p
            ? ((a =
                p &&
                (0, s.jsx)("p", {
                  className: "lightSubtitle text-white-40",
                  children: p,
                })),
              (u[4] = p),
              (u[5] = a))
            : (a = u[5]),
          u[6] !== l || u[7] !== a
            ? ((n = (0, s.jsxs)("div", { className: r, children: [l, a] })),
              (u[6] = l),
              (u[7] = a),
              (u[8] = n))
            : (n = u[8]),
          u[9] !== f
            ? ((c =
                f &&
                (0, s.jsx)("div", {
                  className: (0, o.default)(
                    _.default.bentoCta,
                    "max-dt:w-full"
                  ),
                  children: f,
                })),
              (u[9] = f),
              (u[10] = c))
            : (c = u[10]),
          u[11] !== h || u[12] !== n || u[13] !== c
            ? ((d = (0, s.jsx)("div", {
                className: t,
                children: (0, s.jsxs)("div", {
                  className: _.default.cardInner,
                  children: [n, c, h],
                }),
              })),
              (u[11] = h),
              (u[12] = n),
              (u[13] = c),
              (u[14] = d))
            : (d = u[14]),
          d
        );
      }
    },
    88489: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({
          BlockTypes: () => s,
          MarkTypes: () => i,
          TextTypes: () => o,
          apiPlugin: () => U,
          loadStoryblokBridge: () => q,
          registerStoryblokBridge: () => $,
          renderRichText: () => p,
          richTextResolver: () => c,
          storyblokEditable: () => z,
          storyblokInit: () => D,
          useStoryblokBridge: () => $,
        });
        var s = ((e) => (
            (e.DOCUMENT = "doc"),
            (e.HEADING = "heading"),
            (e.PARAGRAPH = "paragraph"),
            (e.QUOTE = "blockquote"),
            (e.OL_LIST = "ordered_list"),
            (e.UL_LIST = "bullet_list"),
            (e.LIST_ITEM = "list_item"),
            (e.CODE_BLOCK = "code_block"),
            (e.HR = "horizontal_rule"),
            (e.BR = "hard_break"),
            (e.IMAGE = "image"),
            (e.EMOJI = "emoji"),
            (e.COMPONENT = "blok"),
            (e.TABLE = "table"),
            (e.TABLE_ROW = "tableRow"),
            (e.TABLE_CELL = "tableCell"),
            (e.TABLE_HEADER = "tableHeader"),
            e
          ))(s || {}),
          i = ((e) => (
            (e.BOLD = "bold"),
            (e.STRONG = "strong"),
            (e.STRIKE = "strike"),
            (e.UNDERLINE = "underline"),
            (e.ITALIC = "italic"),
            (e.CODE = "code"),
            (e.LINK = "link"),
            (e.ANCHOR = "anchor"),
            (e.STYLED = "styled"),
            (e.SUPERSCRIPT = "superscript"),
            (e.SUBSCRIPT = "subscript"),
            (e.TEXT_STYLE = "textStyle"),
            (e.HIGHLIGHT = "highlight"),
            e
          ))(i || {}),
          o = ((e) => ((e.TEXT = "text"), e))(o || {}),
          l = ((e) => (
            (e.URL = "url"),
            (e.STORY = "story"),
            (e.ASSET = "asset"),
            (e.EMAIL = "email"),
            e
          ))(l || {});
        let t = [
            "area",
            "base",
            "br",
            "col",
            "embed",
            "hr",
            "img",
            "input",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr",
          ],
          r = (e = {}) =>
            Object.keys(e)
              .map((t) => `${t}="${e[t]}"`)
              .join(" "),
          f = (e = {}) =>
            Object.keys(e)
              .map((t) => `${t}: ${e[t]}`)
              .join("; ");
        function a(e) {
          return e
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
        let h = (e) =>
          Object.fromEntries(
            Object.entries(e).filter(([e, t]) => void 0 !== t)
          );
        function n(e, s = {}, i) {
          let o = r(s),
            l = o ? `${e} ${o}` : e,
            a = Array.isArray(i) ? i.join("") : i || "";
          return e ? (t.includes(e) ? `<${l}>` : `<${l}>${a}</${e}>`) : a;
        }
        function c(e = {}) {
          let t = new Map(),
            {
              renderFn: r = n,
              textFn: d = a,
              resolvers: u = {},
              optimizeImages: m = !1,
              keyedResolvers: p = !1,
            } = e,
            g = r !== n,
            _ = () => ({
              render: (e, s = {}, i) => {
                if (p && e) {
                  let r = t.get(e) || 0;
                  t.set(e, r + 1), (s.key = `${e}-${r}`);
                }
                return r(e, s, i);
              },
            }),
            v = (e) => (t, r) => {
              let s = t.attrs || {};
              return r.render(e, s, t.children || null);
            },
            y =
              (e, t = !1) =>
              ({ text: r, attrs: s }, i) => {
                let { class: o, id: l, ...a } = s || {},
                  n = t ? { class: o, id: l, style: f(a) || void 0 } : s || {};
                return i.render(e, h(n), r);
              },
            b = (e) => S(e),
            x = (e, t) => {
              let { linktype: r, href: s, anchor: i, ...o } = e.attrs || {},
                a = "";
              switch (r) {
                case l.ASSET:
                case l.URL:
                  a = s;
                  break;
                case l.EMAIL:
                  a = `mailto:${s}`;
                  break;
                case l.STORY:
                  (a = s), i && (a = `${a}#${i}`);
                  break;
                default:
                  a = s;
              }
              let n = { ...o };
              return a && (n.href = a), t.render("a", n, e.text);
            },
            w = new Map([
              [s.DOCUMENT, v("")],
              [
                s.HEADING,
                (e, t) => {
                  let { level: r, ...s } = e.attrs || {};
                  return t.render(`h${r}`, s, e.children);
                },
              ],
              [s.PARAGRAPH, v("p")],
              [s.UL_LIST, v("ul")],
              [s.OL_LIST, v("ol")],
              [s.LIST_ITEM, v("li")],
              [
                s.IMAGE,
                (e, t) => {
                  let {
                      src: r,
                      alt: s,
                      title: i,
                      srcset: o,
                      sizes: l,
                    } = e.attrs || {},
                    a = r,
                    n = {};
                  if (m) {
                    let { src: e, attrs: t } = (function (e, t) {
                      if (!t) return { src: e, attrs: {} };
                      let r = 0,
                        s = 0,
                        i = {},
                        o = [];
                      function l(e, t, r, s, i) {
                        "number" != typeof e || e <= t || e >= r
                          ? console.warn(
                              `[StoryblokRichText] - ${
                                s.charAt(0).toUpperCase() + s.slice(1)
                              } value must be a number between ${t} and ${r} (inclusive)`
                            )
                          : i.push(`${s}(${e})`);
                      }
                      if ("object" == typeof t) {
                        if (
                          ("number" == typeof t.width && t.width > 0
                            ? ((i.width = t.width), (r = t.width))
                            : console.warn(
                                "[StoryblokRichText] - Width value must be a number greater than 0"
                              ),
                          t.height &&
                          "number" == typeof t.height &&
                          t.height > 0
                            ? ((i.height = t.height), (s = t.height))
                            : console.warn(
                                "[StoryblokRichText] - Height value must be a number greater than 0"
                              ),
                          t.loading &&
                            ["lazy", "eager"].includes(t.loading) &&
                            (i.loading = t.loading),
                          t.class && (i.class = t.class),
                          t.filters)
                        ) {
                          let { filters: e } = t || {},
                            {
                              blur: r,
                              brightness: s,
                              fill: i,
                              format: a,
                              grayscale: n,
                              quality: c,
                              rotate: d,
                            } = e || {};
                          r && l(r, 0, 100, "blur", o),
                            c && l(c, 0, 100, "quality", o),
                            s && l(s, 0, 100, "brightness", o),
                            i && o.push(`fill(${i})`),
                            n && o.push("grayscale()"),
                            d &&
                              [0, 90, 180, 270].includes(
                                t.filters.rotate || 0
                              ) &&
                              o.push(`rotate(${d})`),
                            a &&
                              ["webp", "png", "jpeg"].includes(a) &&
                              o.push(`format(${a})`);
                        }
                        t.srcset &&
                          (i.srcset = t.srcset
                            .map((t) => {
                              if ("number" == typeof t)
                                return `${e}/m/${t}x0/${
                                  o.length > 0 ? `filters:${o.join(":")}` : ""
                                } ${t}w`;
                              if (!Array.isArray(t) || 2 !== t.length)
                                return void console.warn(
                                  "[StoryblokRichText] - srcset entry must be a number or a tuple of two numbers"
                                );
                              {
                                let [r, s] = t;
                                return `${e}/m/${r}x${s}/${
                                  o.length > 0 ? `filters:${o.join(":")}` : ""
                                } ${r}w`;
                              }
                            })
                            .join(", ")),
                          t.sizes && (i.sizes = t.sizes.join(", "));
                      }
                      let a = `${e}/m/`;
                      return (
                        r > 0 && s > 0 && (a = `${a}${r}x${s}/`),
                        o.length > 0 && (a = `${a}filters:${o.join(":")}`),
                        { src: a, attrs: i }
                      );
                    })(r, m);
                    (a = e), (n = t);
                  }
                  let c = {
                    src: a,
                    alt: s,
                    title: i,
                    srcset: o,
                    sizes: l,
                    ...n,
                  };
                  return t.render("img", h(c));
                },
              ],
              [
                s.EMOJI,
                (e, t) => {
                  var r, s, i, o;
                  let l = t.render("img", {
                    src: null == (r = e.attrs) ? void 0 : r.fallbackImage,
                    alt: null == (s = e.attrs) ? void 0 : s.alt,
                    style:
                      "width: 1.25em; height: 1.25em; vertical-align: text-top",
                    draggable: "false",
                    loading: "lazy",
                  });
                  return t.render(
                    "span",
                    {
                      "data-type": "emoji",
                      "data-name": null == (i = e.attrs) ? void 0 : i.name,
                      "data-emoji": null == (o = e.attrs) ? void 0 : o.emoji,
                    },
                    l
                  );
                },
              ],
              [
                s.CODE_BLOCK,
                (e, t) =>
                  t.render(
                    "pre",
                    e.attrs || {},
                    t.render("code", {}, e.children || "")
                  ),
              ],
              [s.HR, v("hr")],
              [s.BR, v("br")],
              [s.QUOTE, v("blockquote")],
              [
                s.COMPONENT,
                (e, t) => {
                  var r, s;
                  return (
                    console.warn(
                      "[StoryblokRichtText] - BLOK resolver is not available for vanilla usage"
                    ),
                    t.render("span", {
                      blok:
                        null == (r = null == e ? void 0 : e.attrs)
                          ? void 0
                          : r.body[0],
                      id: null == (s = e.attrs) ? void 0 : s.id,
                      style: "display: none",
                    })
                  );
                },
              ],
              [
                o.TEXT,
                (e) => {
                  let { marks: r, ...s } = e;
                  if ("text" in e) {
                    if (r)
                      return r.reduce(
                        (e, t) => b({ ...t, text: e }),
                        b({ ...s, children: s.children })
                      );
                    let i = e.attrs || {};
                    if (p) {
                      let e = t.get("txt") || 0;
                      t.set("txt", e + 1), (i.key = `txt-${e}`);
                    }
                    return d(s.text, i);
                  }
                  return "";
                },
              ],
              [i.LINK, x],
              [i.ANCHOR, x],
              [i.STYLED, y("span", !0)],
              [i.BOLD, y("strong")],
              [i.TEXT_STYLE, y("span", !0)],
              [i.ITALIC, y("em")],
              [i.UNDERLINE, y("u")],
              [i.STRIKE, y("s")],
              [i.CODE, y("code")],
              [i.SUPERSCRIPT, y("sup")],
              [i.SUBSCRIPT, y("sub")],
              [i.HIGHLIGHT, y("mark")],
              [
                s.TABLE,
                (e, t) => {
                  let r = t.render("tbody", {}, e.children);
                  return t.render("table", {}, r);
                },
              ],
              [s.TABLE_ROW, (e, t) => t.render("tr", {}, e.children)],
              [
                s.TABLE_CELL,
                (e, t) => {
                  let {
                      colspan: r,
                      rowspan: s,
                      colwidth: i,
                      backgroundColor: o,
                      ...l
                    } = e.attrs || {},
                    a = { ...l };
                  r > 1 && (a.colspan = r), s > 1 && (a.rowspan = s);
                  let n = [];
                  return (
                    i && n.push(`width: ${i}px;`),
                    o && n.push(`background-color: ${o};`),
                    n.length > 0 && (a.style = n.join(" ")),
                    t.render("td", h(a), e.children)
                  );
                },
              ],
              [
                s.TABLE_HEADER,
                (e, t) => {
                  let {
                      colspan: r,
                      rowspan: s,
                      colwidth: i,
                      backgroundColor: o,
                      ...l
                    } = e.attrs || {},
                    a = { ...l };
                  r > 1 && (a.colspan = r), s > 1 && (a.rowspan = s);
                  let n = [];
                  return (
                    i && n.push(`width: ${i}px;`),
                    o && n.push(`background-color: ${o};`),
                    n.length > 0 && (a.style = n.join(" ")),
                    t.render("th", h(a), e.children)
                  );
                },
              ],
              ...Object.entries(u).map(([e, t]) => [e, t]),
            ]);
          function k(e) {
            let t = w.get(e.type);
            if (!t)
              return (
                console.error(
                  "<Storyblok>",
                  `No resolver found for node type ${e.type}`
                ),
                ""
              );
            let r = _();
            if ("text" === e.type) return t(e, r);
            let s = e.content ? e.content.map(S) : void 0;
            return t({ ...e, children: s }, r);
          }
          function S(e) {
            return "doc" === e.type
              ? g
                ? e.content.map(k)
                : e.content.map(k).join("")
              : Array.isArray(e)
              ? e.map(k)
              : k(e);
          }
          return { render: S };
        }
        let g = !1,
          _ = [],
          v = (e) =>
            new Promise((t, r) => {
              if (
                typeof window > "u" ||
                ((window.storyblokRegisterEvent = (e) => {
                  if (window.location === window.parent.location)
                    return void console.warn(
                      "You are not in Draft Mode or in the Visual Editor."
                    );
                  g ? e() : _.push(e);
                }),
                document.getElementById("storyblok-javascript-bridge"))
              )
                return;
              let s = document.createElement("script");
              (s.async = !0),
                (s.src = e),
                (s.id = "storyblok-javascript-bridge"),
                (s.onerror = (e) => r(e)),
                (s.onload = (e) => {
                  _.forEach((e) => e()), (g = !0), t(e);
                }),
                document.getElementsByTagName("head")[0].appendChild(s);
            });
        var d = Object.defineProperty,
          u = (e, t, r) =>
            t in e
              ? d(e, t, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: r,
                })
              : (e[t] = r),
          m = (e, t, r) => u(e, "symbol" != typeof t ? t + "" : t, r);
        class y extends Error {
          constructor(e) {
            super(e), (this.name = "AbortError");
          }
        }
        let b = (e = "") => e.includes("/cdn/"),
          x = (e, t = 25, r = 1) => ({ ...e, per_page: t, page: r }),
          w = (e) => new Promise((t) => setTimeout(t, e)),
          k = (e = 0, t) => Array.from({ length: e }, t),
          S = (e = 0, t = e) => {
            let r = Math.abs(t - e) || 0,
              s = e < t ? 1 : -1;
            return k(r, (t, r) => r * s + e);
          },
          j = async (e, t) => Promise.all(e.map(t)),
          E = (e = [], t) => e.map(t).reduce((e, t) => [...e, ...t], []),
          N = (e, t, r) => {
            let s = [];
            for (let i in e) {
              let o;
              if (!Object.prototype.hasOwnProperty.call(e, i)) continue;
              let l = e[i];
              if (null == l) continue;
              let a = r ? "" : encodeURIComponent(i);
              (o =
                "object" == typeof l
                  ? N(
                      l,
                      t ? t + encodeURIComponent(`[${a}]`) : a,
                      Array.isArray(l)
                    )
                  : `${
                      t ? t + encodeURIComponent(`[${a}]`) : a
                    }=${encodeURIComponent(l)}`),
                s.push(o);
            }
            return s.join("&");
          },
          C = (e) => {
            let t = {
              eu: "api.storyblok.com",
              us: "api-us.storyblok.com",
              cn: "app.storyblokchina.cn",
              ap: "api-ap.storyblok.com",
              ca: "api-ca.storyblok.com",
            };
            return t[e] ?? t.eu;
          };
        class T {
          constructor(e) {
            m(this, "baseURL"),
              m(this, "timeout"),
              m(this, "headers"),
              m(this, "responseInterceptor"),
              m(this, "fetch"),
              m(this, "ejectInterceptor"),
              m(this, "url"),
              m(this, "parameters"),
              m(this, "fetchOptions"),
              (this.baseURL = e.baseURL),
              (this.headers = e.headers || new Headers()),
              (this.timeout = null != e && e.timeout ? 1e3 * e.timeout : 0),
              (this.responseInterceptor = e.responseInterceptor),
              (this.fetch = (...t) => (e.fetch ? e.fetch(...t) : fetch(...t))),
              (this.ejectInterceptor = !1),
              (this.url = ""),
              (this.parameters = {}),
              (this.fetchOptions = {});
          }
          get(e, t) {
            return (
              (this.url = e), (this.parameters = t), this._methodHandler("get")
            );
          }
          post(e, t) {
            return (
              (this.url = e), (this.parameters = t), this._methodHandler("post")
            );
          }
          put(e, t) {
            return (
              (this.url = e), (this.parameters = t), this._methodHandler("put")
            );
          }
          delete(e, t) {
            return (
              (this.url = e),
              (this.parameters = t ?? {}),
              this._methodHandler("delete")
            );
          }
          async _responseHandler(e) {
            let t = [],
              r = { data: {}, headers: {}, status: 0, statusText: "" };
            for (let s of (204 !== e.status &&
              (await e.json().then((e) => {
                r.data = e;
              })),
            e.headers.entries()))
              t[s[0]] = s[1];
            return (
              (r.headers = { ...t }),
              (r.status = e.status),
              (r.statusText = e.statusText),
              r
            );
          }
          async _methodHandler(e) {
            let t,
              r = `${this.baseURL}${this.url}`,
              s = null;
            "get" === e
              ? (r = `${this.baseURL}${this.url}?${N(this.parameters)}`)
              : (s = JSON.stringify(this.parameters));
            let i = new URL(r),
              o = new AbortController(),
              { signal: l } = o;
            this.timeout && (t = setTimeout(() => o.abort(), this.timeout));
            try {
              let r = await this.fetch(`${i}`, {
                method: e,
                headers: this.headers,
                body: s,
                signal: l,
                ...this.fetchOptions,
              });
              this.timeout && clearTimeout(t);
              let o = await this._responseHandler(r);
              return this.responseInterceptor && !this.ejectInterceptor
                ? this._statusHandler(this.responseInterceptor(o))
                : this._statusHandler(o);
            } catch (e) {
              return { message: e };
            }
          }
          setFetchOptions(e = {}) {
            Object.keys(e).length > 0 && "method" in e && delete e.method,
              (this.fetchOptions = { ...e });
          }
          eject() {
            this.ejectInterceptor = !0;
          }
          _normalizeErrorMessage(e) {
            if (Array.isArray(e)) return e[0] || "Unknown error";
            if (e && "object" == typeof e) {
              if (e.error) return e.error;
              for (let t in e) {
                if (Array.isArray(e[t])) return `${t}: ${e[t][0]}`;
                if ("string" == typeof e[t]) return `${t}: ${e[t]}`;
              }
              if (e.slug) return e.slug;
            }
            return "Unknown error";
          }
          _statusHandler(e) {
            let t = /20[0-6]/g;
            return new Promise((r, s) => {
              if (t.test(`${e.status}`)) return r(e);
              s({
                message: this._normalizeErrorMessage(e.data),
                status: e.status,
                response: e,
              });
            });
          }
        }
        let O = "SB-Agent",
          P = {
            defaultAgentName: "SB-JS-CLIENT",
            defaultAgentVersion: "SB-Agent-Version",
            packageVersion: "6.0.0",
          },
          R = { DRAFT: "draft" },
          M = {},
          I = {};
        class L {
          constructor(e, t) {
            m(this, "client"),
              m(this, "maxRetries"),
              m(this, "retriesDelay"),
              m(this, "throttle"),
              m(this, "accessToken"),
              m(this, "cache"),
              m(this, "resolveCounter"),
              m(this, "relations"),
              m(this, "links"),
              m(this, "version"),
              m(this, "richTextResolver"),
              m(this, "resolveNestedRelations"),
              m(this, "stringifiedStoriesCache"),
              m(this, "inlineAssets");
            let r = e.endpoint || t;
            if (!r) {
              let t = !1 === e.https ? "http" : "https";
              r = e.oauthToken
                ? `${t}://${C(e.region)}/v1`
                : `${t}://${C(e.region)}/v2`;
            }
            let s = new Headers();
            s.set("Content-Type", "application/json"),
              s.set("Accept", "application/json"),
              e.headers &&
                ("Headers" === e.headers.constructor.name
                  ? e.headers.entries().toArray()
                  : Object.entries(e.headers)
                ).forEach(([e, t]) => {
                  s.set(e, t);
                }),
              s.has(O) ||
                (s.set(O, P.defaultAgentName),
                s.set(P.defaultAgentVersion, P.packageVersion));
            let i = 5;
            e.oauthToken && (s.set("Authorization", e.oauthToken), (i = 3)),
              e.rateLimit && (i = e.rateLimit),
              (this.maxRetries = e.maxRetries || 10),
              (this.retriesDelay = 300),
              (this.throttle = (function (e, t, r) {
                if (!Number.isFinite(t))
                  throw TypeError("Expected `limit` to be a finite number");
                if (!Number.isFinite(1e3))
                  throw TypeError("Expected `interval` to be a finite number");
                let s = [],
                  i = [],
                  o = 0,
                  l = !1,
                  a = async () => {
                    o++;
                    let t = s.shift();
                    if (t)
                      try {
                        let r = await e(...t.args);
                        t.resolve(r);
                      } catch (e) {
                        t.reject(e);
                      }
                    let r = setTimeout(() => {
                      o--, s.length > 0 && a(), (i = i.filter((e) => e !== r));
                    }, 1e3);
                    i.includes(r) || i.push(r);
                  },
                  n = (...e) =>
                    l
                      ? Promise.reject(
                          Error(
                            "Throttled function is already aborted and not accepting new promises"
                          )
                        )
                      : new Promise((r, i) => {
                          s.push({ resolve: r, reject: i, args: e }),
                            o < t && a();
                        });
                return (
                  (n.abort = () => {
                    (l = !0),
                      i.forEach(clearTimeout),
                      (i = []),
                      s.forEach((e) =>
                        e.reject(() => new y("Throttle function aborted"))
                      ),
                      (s.length = 0);
                  }),
                  n
                );
              })(this.throttledRequest.bind(this), i, 1e3)),
              (this.accessToken = e.accessToken || ""),
              (this.relations = {}),
              (this.links = {}),
              (this.cache = e.cache || { clear: "manual" }),
              (this.resolveCounter = 0),
              (this.resolveNestedRelations = e.resolveNestedRelations || !0),
              (this.stringifiedStoriesCache = {}),
              (this.version = e.version || R.DRAFT),
              (this.inlineAssets = e.inlineAssets || !1),
              (this.client = new T({
                baseURL: r,
                timeout: e.timeout || 0,
                headers: s,
                responseInterceptor: e.responseInterceptor,
                fetch: e.fetch,
              }));
          }
          parseParams(e) {
            return (
              e.token || (e.token = this.getToken()),
              e.cv || (e.cv = I[e.token]),
              Array.isArray(e.resolve_relations) &&
                (e.resolve_relations = e.resolve_relations.join(",")),
              "u" > typeof e.resolve_relations && (e.resolve_level = 2),
              e
            );
          }
          factoryParamOptions(e, t) {
            return b(e) ? this.parseParams(t) : t;
          }
          makeRequest(e, t, r, s, i) {
            let o = this.factoryParamOptions(e, x(t, r, s));
            return this.cacheResponse(e, o, void 0, i);
          }
          get(e, t = {}, r) {
            t || (t = {});
            let s = `/${e}`;
            t.version = t.version || this.version;
            let i = this.factoryParamOptions(s, t);
            return this.cacheResponse(s, i, void 0, r);
          }
          async getAll(e, t = {}, r, s) {
            let i = (null == t ? void 0 : t.per_page) || 25,
              o = `/${e}`.replace(/\/$/, ""),
              l = r ?? o.substring(o.lastIndexOf("/") + 1);
            t.version = t.version || this.version;
            let a = await this.makeRequest(o, t, i, 1, s),
              n = a.total ? Math.ceil(a.total / i) : 1;
            return E(
              [
                a,
                ...(await j(S(1, n), (e) =>
                  this.makeRequest(o, t, i, e + 1, s)
                )),
              ],
              (e) => Object.values(e.data[l])
            );
          }
          post(e, t = {}, r) {
            let s = `/${e}`;
            return this.throttle("post", s, t, r);
          }
          put(e, t = {}, r) {
            let s = `/${e}`;
            return this.throttle("put", s, t, r);
          }
          delete(e, t = {}, r) {
            t || (t = {});
            let s = `/${e}`;
            return this.throttle("delete", s, t, r);
          }
          getStories(e = {}, t) {
            return this._addResolveLevel(e), this.get("cdn/stories", e, t);
          }
          getStory(e, t = {}, r) {
            return this._addResolveLevel(t), this.get(`cdn/stories/${e}`, t, r);
          }
          getToken() {
            return this.accessToken;
          }
          ejectInterceptor() {
            this.client.eject();
          }
          _addResolveLevel(e) {
            "u" > typeof e.resolve_relations && (e.resolve_level = 2);
          }
          _cleanCopy(e) {
            return JSON.parse(JSON.stringify(e));
          }
          _insertLinks(e, t, r) {
            let s = e[t];
            s &&
            "multilink" === s.fieldtype &&
            "story" === s.linktype &&
            "string" == typeof s.id &&
            this.links[r][s.id]
              ? (s.story = this._cleanCopy(this.links[r][s.id]))
              : s &&
                "story" === s.linktype &&
                "string" == typeof s.uuid &&
                this.links[r][s.uuid] &&
                (s.story = this._cleanCopy(this.links[r][s.uuid]));
          }
          getStoryReference(e, t) {
            return this.relations[e][t]
              ? JSON.parse(
                  this.stringifiedStoriesCache[t] ||
                    JSON.stringify(this.relations[e][t])
                )
              : t;
          }
          _resolveField(e, t, r) {
            let s = e[t];
            "string" == typeof s
              ? (e[t] = this.getStoryReference(r, s))
              : Array.isArray(s) &&
                (e[t] = s
                  .map((e) => this.getStoryReference(r, e))
                  .filter(Boolean));
          }
          _insertRelations(e, t, r, s) {
            if (
              Array.isArray(r)
                ? r.find((e) => e.endsWith(`.${t}`))
                : r.endsWith(`.${t}`)
            )
              return void this._resolveField(e, t, s);
            let i = e.component ? `${e.component}.${t}` : t;
            (Array.isArray(r) ? r.includes(i) : r === i) &&
              this._resolveField(e, t, s);
          }
          iterateTree(e, t, r) {
            let s = (e, i = "") => {
              if (!(!e || e._stopResolving)) {
                if (Array.isArray(e)) e.forEach((e, t) => s(e, `${i}[${t}]`));
                else if ("object" == typeof e)
                  for (let o in e) {
                    let l = i ? `${i}.${o}` : o;
                    ((e.component && e._uid) || "link" === e.type) &&
                      (this._insertRelations(e, o, t, r),
                      this._insertLinks(e, o, r)),
                      s(e[o], l);
                  }
              }
            };
            s(e.content);
          }
          async resolveLinks(e, t, r) {
            let s = [];
            if (e.link_uuids) {
              let r = e.link_uuids.length,
                i = [];
              for (let t = 0; t < r; t += 50) {
                let s = Math.min(r, t + 50);
                i.push(e.link_uuids.slice(t, s));
              }
              for (let e = 0; e < i.length; e++)
                (
                  await this.getStories({
                    per_page: 50,
                    language: t.language,
                    version: t.version,
                    starts_with: t.starts_with,
                    by_uuids: i[e].join(","),
                  })
                ).data.stories.forEach((e) => {
                  s.push(e);
                });
            } else s = e.links;
            s.forEach((e) => {
              this.links[r][e.uuid] = { ...e, _stopResolving: !0 };
            });
          }
          async resolveRelations(e, t, r) {
            let s = [];
            if (e.rel_uuids) {
              let r = e.rel_uuids.length,
                i = [];
              for (let t = 0; t < r; t += 50) {
                let s = Math.min(r, t + 50);
                i.push(e.rel_uuids.slice(t, s));
              }
              for (let e = 0; e < i.length; e++)
                (
                  await this.getStories({
                    per_page: 50,
                    language: t.language,
                    version: t.version,
                    starts_with: t.starts_with,
                    by_uuids: i[e].join(","),
                    excluding_fields: t.excluding_fields,
                  })
                ).data.stories.forEach((e) => {
                  s.push(e);
                });
              s.length > 0 && ((e.rels = s), delete e.rel_uuids);
            } else s = e.rels;
            s &&
              s.length > 0 &&
              s.forEach((e) => {
                this.relations[r][e.uuid] = { ...e, _stopResolving: !0 };
              });
          }
          async resolveStories(e, t, r) {
            var s, i;
            let o = [];
            if (
              ((this.links[r] = {}),
              (this.relations[r] = {}),
              "u" > typeof t.resolve_relations &&
                t.resolve_relations.length > 0 &&
                ("string" == typeof t.resolve_relations &&
                  (o = t.resolve_relations.split(",")),
                await this.resolveRelations(e, t, r)),
              t.resolve_links &&
                ["1", "story", "url", "link"].includes(t.resolve_links) &&
                ((null != (s = e.links) && s.length) ||
                  (null != (i = e.link_uuids) && i.length)) &&
                (await this.resolveLinks(e, t, r)),
              this.resolveNestedRelations)
            )
              for (let e in this.relations[r])
                this.iterateTree(this.relations[r][e], o, r);
            e.story
              ? this.iterateTree(e.story, o, r)
              : e.stories.forEach((e) => {
                  this.iterateTree(e, o, r);
                }),
              (this.stringifiedStoriesCache = {}),
              delete this.links[r],
              delete this.relations[r];
          }
          async cacheResponse(e, t, r, s) {
            let i = N({ url: e, params: t }),
              o = this.cacheProvider();
            if ("published" === t.version && "/cdn/spaces/me" !== e) {
              let e = await o.get(i);
              if (e) return Promise.resolve(e);
            }
            return new Promise(async (l, a) => {
              var n;
              try {
                let r = await this.throttle("get", e, t, s);
                if (200 !== r.status) return a(r);
                let c = { data: r.data, headers: r.headers };
                if (
                  (null != (n = r.headers) &&
                    n["per-page"] &&
                    (c = Object.assign({}, c, {
                      perPage: r.headers["per-page"]
                        ? Number.parseInt(r.headers["per-page"])
                        : 0,
                      total: r.headers["per-page"]
                        ? Number.parseInt(r.headers.total)
                        : 0,
                    })),
                  c.data.story || c.data.stories)
                ) {
                  let e = (this.resolveCounter = ++this.resolveCounter % 1e3);
                  await this.resolveStories(c.data, t, `${e}`),
                    (c = await this.processInlineAssets(c));
                }
                "published" === t.version &&
                  "/cdn/spaces/me" !== e &&
                  (await o.set(i, c));
                let d =
                  ("onpreview" === this.cache.clear && "draft" === t.version) ||
                  "auto" === this.cache.clear;
                return (
                  t.token &&
                    c.data.cv &&
                    (d &&
                      I[t.token] &&
                      I[t.token] !== c.data.cv &&
                      (await this.flushCache()),
                    (I[t.token] = c.data.cv)),
                  l(c)
                );
              } catch (s) {
                if (
                  s.response &&
                  429 === s.status &&
                  (r = typeof r > "u" ? 0 : r + 1) < this.maxRetries
                )
                  return (
                    console.log(
                      `Hit rate limit. Retrying in ${
                        this.retriesDelay / 1e3
                      } seconds.`
                    ),
                    await w(this.retriesDelay),
                    this.cacheResponse(e, t, r).then(l).catch(a)
                  );
                a(s);
              }
            });
          }
          throttledRequest(e, t, r, s) {
            return this.client.setFetchOptions(s), this.client[e](t, r);
          }
          cacheVersions() {
            return I;
          }
          cacheVersion() {
            return I[this.accessToken];
          }
          setCacheVersion(e) {
            this.accessToken && (I[this.accessToken] = e);
          }
          clearCacheVersion() {
            this.accessToken && (I[this.accessToken] = 0);
          }
          cacheProvider() {
            switch (this.cache.type) {
              case "memory":
                return {
                  get: (e) => Promise.resolve(M[e]),
                  getAll: () => Promise.resolve(M),
                  set: (e, t) => ((M[e] = t), Promise.resolve(void 0)),
                  flush: () => ((M = {}), Promise.resolve(void 0)),
                };
              case "custom":
                if (this.cache.custom) return this.cache.custom;
              default:
                return {
                  get: () => Promise.resolve(),
                  getAll: () => Promise.resolve(void 0),
                  set: () => Promise.resolve(void 0),
                  flush: () => Promise.resolve(void 0),
                };
            }
          }
          async flushCache() {
            return (
              await this.cacheProvider().flush(), this.clearCacheVersion(), this
            );
          }
          async processInlineAssets(e) {
            if (!this.inlineAssets) return e;
            let t = (r) => {
              if (!r || "object" != typeof r) return r;
              if (Array.isArray(r)) return r.map((e) => t(e));
              let s = { ...r };
              for (let r in ("asset" === s.fieldtype &&
                Array.isArray(e.data.assets) &&
                (s = { ...s, ...e.data.assets.find((e) => e.id === s.id) }),
              s))
                "object" == typeof s[r] && (s[r] = t(s[r]));
              return s;
            };
            return (
              e.data.story && (e.data.story.content = t(e.data.story.content)),
              e.data.stories &&
                (e.data.stories = e.data.stories.map(
                  (e) => ((e.content = t(e.content)), e)
                )),
              e
            );
          }
        }
        let U = (e = {}) => {
            let { apiOptions: t } = e;
            return t && t.accessToken
              ? { storyblokApi: new L(t) }
              : void console.error(
                  "You need to provide an access token to interact with Storyblok API. Read https://www.storyblok.com/docs/api/content-delivery#topics/authentication"
                );
          },
          z = (e) => {
            if ("object" != typeof e || typeof e._editable > "u") return {};
            try {
              let t = JSON.parse(
                e._editable.replace(/^<!--#storyblok#/, "").replace(/-->$/, "")
              );
              return t
                ? {
                    "data-blok-c": JSON.stringify(t),
                    "data-blok-uid": `${t.id}-${t.uid}`,
                  }
                : {};
            } catch {
              return {};
            }
          },
          W = "https://app.storyblok.com/f/storyblok-v2-latest.js",
          $ = (e, t, r = {}) => {
            var s;
            let i =
                !(typeof window > "u") &&
                "u" > typeof window.storyblokRegisterEvent,
              o = new URL(
                null == (s = window.location) ? void 0 : s.href
              ).searchParams.get("_storyblok");
            if (!(!i || null === o || +o !== e)) {
              if (!e)
                return void console.warn(
                  "Story ID is not defined. Please provide a valid ID."
                );
              window.storyblokRegisterEvent(() => {
                new window.StoryblokBridge(r).on(
                  ["input", "published", "change"],
                  (r) => {
                    var s;
                    r &&
                      ("input" === r.action &&
                      (null == (s = r.story) ? void 0 : s.id) === e
                        ? t(r.story)
                        : ("change" === r.action || "published" === r.action) &&
                          r.storyId === e &&
                          window.location.reload());
                  }
                );
              });
            }
          },
          D = (e = {}) => {
            var t, r;
            let {
              bridge: s,
              accessToken: i,
              use: o = [],
              apiOptions: l = {},
              bridgeUrl: a,
            } = e;
            l.accessToken = l.accessToken || i;
            let n = { bridge: s, apiOptions: l },
              c = {};
            o.forEach((e) => {
              c = { ...c, ...e(n) };
            }),
              a && (W = a);
            let d =
              !(typeof window > "u") &&
              (null == (r = null == (t = window.location) ? void 0 : t.search)
                ? void 0
                : r.includes("_storyblok_tk"));
            return !1 !== s && d && v(W), c;
          };
        function p(e, t) {
          return c(t).render(e);
        }
        let q = () => v(W);
      }
    },
    86567: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        inner: "marquee-module__irIMSq__inner",
        marquee: "marquee-module__irIMSq__marquee",
      });
    },
    61089: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Marquee: () => m });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(4371),
        a = e.i(54995),
        n = e.i(38653),
        c = e.i(92854),
        d = e.i(47103),
        u = e.i(86567);
      function m(e) {
        let t,
          r,
          m,
          p,
          f,
          h,
          g,
          _,
          v,
          y,
          b,
          x,
          w,
          k,
          S,
          j,
          E,
          N,
          C = (0, i.c)(41);
        C[0] !== e
          ? (({
              children: t,
              className: r,
              repeat: h,
              speed: g,
              scrollVelocity: _,
              reversed: v,
              pauseOnHover: y,
              onMouseEnter: m,
              onMouseLeave: p,
              ...f
            } = e),
            (C[0] = e),
            (C[1] = t),
            (C[2] = r),
            (C[3] = m),
            (C[4] = p),
            (C[5] = f),
            (C[6] = h),
            (C[7] = g),
            (C[8] = _),
            (C[9] = v),
            (C[10] = y))
          : ((t = C[1]),
            (r = C[2]),
            (m = C[3]),
            (p = C[4]),
            (f = C[5]),
            (h = C[6]),
            (g = C[7]),
            (_ = C[8]),
            (v = C[9]),
            (y = C[10]));
        let T = void 0 === h ? 2 : h,
          O = void 0 === g ? 1 : g,
          P = void 0 === _ || _,
          R = void 0 !== v && v,
          M = void 0 !== y && y;
        C[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = { lazy: !0 }), (C[11] = b))
          : (b = C[11]);
        let [I, L] = (0, l.useResizeObserver)(b);
        C[12] === Symbol.for("react.memo_cache_sentinel")
          ? ((x = []), (C[12] = x))
          : (x = C[12]);
        let U = (0, n.useRef)(x),
          z = (0, n.useRef)(1e3 * Math.random()),
          W = (0, n.useRef)(!1),
          [$, D] = (0, l.useIntersectionObserver)(),
          q = (0, a.useLenis)();
        if (
          (C[13] !== L ||
          C[14] !== D?.isIntersecting ||
          C[15] !== q?.velocity ||
          C[16] !== M ||
          C[17] !== R ||
          C[18] !== P ||
          C[19] !== O
            ? ((w = (e, t) => {
                let r = L();
                if (
                  !D?.isIntersecting ||
                  (M && W.current) ||
                  !r?.borderBoxSize[0]?.inlineSize
                )
                  return;
                let s = q?.velocity ?? 0;
                P || (s = 0);
                let i = 0.1 * O * (s = 1 + Math.abs(s / 5)) * t;
                R ? (z.current = z.current - i) : (z.current = z.current + i);
                let o = r.borderBoxSize[0].inlineSize;
                for (let e of ((z.current = (0, d.modulo)(z.current, o)),
                U.current))
                  e.style.transform = `translate3d(${-z.current}px,0,0)`;
              }),
              (C[13] = L),
              (C[14] = D?.isIntersecting),
              (C[15] = q?.velocity),
              (C[16] = M),
              (C[17] = R),
              (C[18] = P),
              (C[19] = O),
              (C[20] = w))
            : (w = C[20]),
          (0, c.useTempus)(w),
          C[21] !== r
            ? ((k = (0, o.default)(r, u.default.marquee)),
              (C[21] = r),
              (C[22] = k))
            : (k = C[22]),
          C[23] !== m
            ? ((S = (e) => {
                (W.current = !0), m?.(e);
              }),
              (C[23] = m),
              (C[24] = S))
            : (S = C[24]),
          C[25] !== p
            ? ((j = (e) => {
                (W.current = !1), p?.(e);
              }),
              (C[25] = p),
              (C[26] = j))
            : (j = C[26]),
          C[27] !== t || C[28] !== T || C[29] !== I)
        ) {
          let e;
          C[31] !== t || C[32] !== I
            ? ((e = (e, r) =>
                (0, s.jsx)(
                  "div",
                  {
                    className: u.default.inner,
                    "aria-hidden": 0 !== r,
                    "data-nosnippet": 0 !== r ? "" : void 0,
                    ref: (e) => {
                      e && ((U.current[r] = e), 0 === r && I(e));
                    },
                    children: t,
                  },
                  `marquee-item-${r}`
                )),
              (C[31] = t),
              (C[32] = I),
              (C[33] = e))
            : (e = C[33]),
            (E = Array(T).fill(t).map(e)),
            (C[27] = t),
            (C[28] = T),
            (C[29] = I),
            (C[30] = E);
        } else E = C[30];
        return (
          C[34] !== f ||
          C[35] !== $ ||
          C[36] !== S ||
          C[37] !== j ||
          C[38] !== E ||
          C[39] !== k
            ? ((N = (0, s.jsx)("div", {
                ref: $,
                className: k,
                onMouseEnter: S,
                onMouseLeave: j,
                ...f,
                children: E,
              })),
              (C[34] = f),
              (C[35] = $),
              (C[36] = S),
              (C[37] = j),
              (C[38] = E),
              (C[39] = k),
              (C[40] = N))
            : (N = C[40]),
          N
        );
      }
    },
    9916: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        content: "marquee-content-module__rcZS4a__content",
        icon: "marquee-content-module__rcZS4a__icon",
        marquee: "marquee-content-module__rcZS4a__marquee",
        marqueeIcon: "marquee-content-module__rcZS4a__marqueeIcon",
        marqueeItem: "marquee-content-module__rcZS4a__marqueeItem",
        marquees: "marquee-content-module__rcZS4a__marquees",
      });
    },
    28388: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ MarqueeContent: () => c });
      var s = e.i(58064),
        i = e.i(88489),
        o = e.i(60566),
        l = e.i(12568),
        a = e.i(61089),
        n = e.i(9916);
      function c({
        ref: e,
        marqueeContainerRef: t,
        className: r,
        marquee1Content: i,
        marquee2Content: l,
        marquee3Content: c,
        children: u,
      }) {
        return (0, s.jsxs)("div", {
          className: (0, o.default)(n.default.content, "marquee-container", r),
          ref: e,
          children: [
            u,
            (0, s.jsxs)("div", {
              ref: t,
              className: (0, o.default)("marquee-wrapper", n.default.marquees),
              children: [
                (0, s.jsx)(a.Marquee, {
                  repeat: 4,
                  className: n.default.marquee,
                  children: i.map((e, t) =>
                    (0, s.jsx)(d, { ...e }, `${e.type}-${t}-1-1`)
                  ),
                }),
                (0, s.jsx)(a.Marquee, {
                  repeat: 4,
                  reversed: !0,
                  className: n.default.marquee,
                  children: l.map((e, t) =>
                    (0, s.jsx)(d, { ...e }, `${e.type}-${t}-2-1`)
                  ),
                }),
                (0, s.jsx)(a.Marquee, {
                  repeat: 4,
                  className: (0, o.default)("mobile-only", n.default.marquee),
                  children: c.map((e, t) =>
                    (0, s.jsx)(d, { ...e }, `${e.type}-${t}-3-1`)
                  ),
                }),
              ],
            }),
          ],
        });
      }
      function d({ type: e, src: t, alt: r, _editable: a }) {
        return "image" === e
          ? (0, s.jsx)("div", {
              ...(0, i.storyblokEditable)({ _editable: a }),
              className: (0, o.default)("marquee-item", n.default.marqueeItem),
              children: (0, s.jsx)(l.default, {
                src: t,
                alt: r,
                fill: !0,
                sizes: "(max-width: 800px) 64vw, 20vw",
              }),
            })
          : "icon" === e
          ? (0, s.jsx)("div", {
              ...(0, i.storyblokEditable)({ _editable: a }),
              className: n.default.marqueeIcon,
              children: (0, s.jsx)("div", {
                className: n.default.icon,
                children: (0, s.jsx)(l.default, {
                  src: t,
                  alt: r || "",
                  fill: !0,
                  sizes: "(max-width: 800px) 64vw, 20vw",
                }),
              }),
            })
          : void 0;
      }
    },
    5885: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        content: "section13-module__yG7dZW__content",
        marquee: "section13-module__yG7dZW__marquee",
        marqueeContainer: "section13-module__yG7dZW__marqueeContainer",
        section13: "section13-module__yG7dZW__section13",
        sticky: "section13-module__yG7dZW__sticky",
        titleContainer: "section13-module__yG7dZW__titleContainer",
      });
    },
    61431: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ Section13: () => f });
        var s = e.i(58064),
          i = e.i(60566),
          o = e.i(4371),
          l = e.i(38653),
          a = e.i(28388),
          n = e.i(99840),
          c = e.i(5885),
          d = e.i(22477),
          u = e.i(97287),
          m = e.i(18421);
        function p(e, t = 5) {
          let r = e.filter((e) => "icon" === e.type),
            s = e.filter((e) => "icon" !== e.type),
            i = [];
          for (let e = s.length - 1; e > 0; e--) {
            let t = Math.floor(Math.random() * (e + 1));
            [s[e], s[t]] = [s[t], s[e]];
          }
          let o = Math.floor(Math.random() * Math.floor(s.length / 2));
          i = [...s.slice(0, o), r[0], ...s.slice(o)];
          let l = o + t;
          return (
            l > i.length && (l = i.length),
            (i = [...i.slice(0, l), r[1], ...i.slice(l)])
          );
        }
        let t = [
            {
              type: "image",
              src: "/images/marquee/1.jpg",
              alt: "0",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/2.jpg",
              alt: "1",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/3.jpg",
              alt: "2",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/4.jpg",
              alt: "3",
              width: 80,
              height: 40,
            },
            {
              type: "icon",
              src: "/images/marquee/marquee-play.svg",
              alt: "4",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/6.jpg",
              alt: "5",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/7.jpg",
              alt: "6",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/8.jpg",
              alt: "7",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/9.jpg",
              alt: "8",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/10.jpg",
              alt: "9",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/11.jpg",
              alt: "10",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/12.jpg",
              alt: "11",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/13.jpg",
              alt: "12",
              width: 80,
              height: 40,
            },
            {
              type: "icon",
              src: "/images/marquee/marquee-xbox.svg",
              alt: "13",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/15.jpg",
              alt: "14",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/16.jpg",
              alt: "15",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/17.jpg",
              alt: "16",
              width: 80,
              height: 40,
            },
            {
              type: "image",
              src: "/images/marquee/18.jpg",
              alt: "17",
              width: 80,
              height: 40,
            },
          ],
          r = { row2: p([...t]), row3: p([...t]) };
        function f() {
          let { story: e } = (0, u.useStoryblokContext)(),
            p = e?.content?.section13?.[0];
          if (!p) return null;
          let f = (0, l.useRef)(null),
            [h, g] = (0, o.useRect)(),
            _ = (0, l.useRef)(null);
          return (
            (0, d.useScrollTrigger)({
              rect: g,
              start: "top center",
              end: "top top",
              onProgress: ({ progress: e }) => {
                _.current?.setProgress(e);
              },
            }),
            (0, s.jsx)(m.Section, {
              className: (0, i.default)(c.default.section13),
              ref: h,
              snap: "start",
              children: (0, s.jsx)("div", {
                className: c.default.sticky,
                children: (0, s.jsxs)("div", {
                  className: c.default.content,
                  children: [
                    (0, s.jsx)("div", {
                      className: (0, i.default)(
                        "dr-layout-block",
                        c.default.titleContainer
                      ),
                      children: (0, s.jsx)(n.TitleSubtitle, {
                        title: p?.title?.[0]?.desktop,
                        mobileTitle: p?.title?.[0]?.mobile,
                        subtitle: p?.subtitle?.[0]?.desktop,
                        mobileSubtitle: p?.subtitle?.[0]?.mobile,
                        centered: !0,
                        ref: _,
                      }),
                    }),
                    (0, s.jsx)("div", {
                      className: c.default.marqueeContainer,
                      children: (0, s.jsx)(a.MarqueeContent, {
                        ref: f,
                        className: c.default.marquee,
                        marqueeContainerRef: f,
                        marquee1Content: t,
                        marquee2Content: r.row2,
                        marquee3Content: r.row3,
                        children: (0, s.jsx)("div", {}),
                      }),
                    }),
                  ],
                }),
              }),
            })
          );
        }
      }
    },
    3748: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        content: "section14-module__Nbg2ra__content",
        deviceItem: "section14-module__Nbg2ra__deviceItem",
        deviceName: "section14-module__Nbg2ra__deviceName",
        deviceNameFirst: "section14-module__Nbg2ra__deviceNameFirst",
        deviceNameSecond: "section14-module__Nbg2ra__deviceNameSecond",
        devicesList: "section14-module__Nbg2ra__devicesList",
        hoverBackground: "section14-module__Nbg2ra__hoverBackground",
        logo: "section14-module__Nbg2ra__logo",
        logoWrapper: "section14-module__Nbg2ra__logoWrapper",
        logosContainer: "section14-module__Nbg2ra__logosContainer",
        section14: "section14-module__Nbg2ra__section14",
        sticky: "section14-module__Nbg2ra__sticky",
      });
    },
    11934: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ Section14: () => f });
        var s = e.i(58064),
          i = e.i(60566),
          o = e.i(4371),
          l = e.i(38653),
          a = e.i(96983),
          n = e.i(22477),
          c = e.i(97287),
          d = e.i(47103),
          u = e.i(18421),
          m = e.i(99840),
          p = e.i(3748);
        let t = {
          devices: [
            {
              logos: [
                {
                  src: "/images/icons/google-play.svg",
                  id: "logo-google-play",
                },
                { src: "/images/icons/apple-icon.svg", id: "logo-apple" },
              ],
            },
            {
              logos: [
                { src: "/images/icons/xbox-icon.svg", id: "logo-xbox" },
                {
                  src: "/images/icons/playstation-icon.svg",
                  id: "logo-playstation",
                },
                {
                  src: "/images/icons/remote-xbox.svg",
                  id: "logo-remote-xbox",
                },
                {
                  src: "/images/icons/remote-play.svg",
                  id: "logo-remote-play",
                },
              ],
            },
            {
              logos: [
                { src: "/images/icons/luma-icon.svg", id: "logo-luma" },
                { src: "/images/icons/nvidia-icon.svg", id: "logo-nvidia" },
                { src: "/images/icons/xbox-icon.svg", id: "logo-xbox-2" },
              ],
            },
            {
              logos: [
                { src: "/images/icons/switch-icon.svg", id: "logo-switch" },
              ],
            },
            {
              logos: [
                { src: "/images/icons/windows-icon.svg", id: "logo-windows" },
                { src: "/images/icons/macos-icon.svg", id: "logo-mac-os" },
              ],
            },
          ],
        };
        function f() {
          let { story: e } = (0, c.useStoryblokContext)(),
            r = e?.content?.section14?.[0];
          if (!r) return null;
          let f = (0, l.useRef)(null),
            [h, g] = (0, o.useRect)(),
            _ = (0, l.useRef)([]);
          return (
            (0, n.useScrollTrigger)({
              rect: g,
              start: "top center",
              end: "top top",
              onProgress: ({ progress: e }) => {
                f.current?.setProgress(e);
              },
            }),
            (0, n.useScrollTrigger)({
              rect: g,
              start: "top center",
              end: "top top",
              onProgress: ({ progress: e }) => {
                (0, d.fromTo)(
                  _.current.filter((e) => null !== e),
                  { opacity: 0, y: (e) => 200 + 25 * e },
                  { y: 0, opacity: 1 },
                  e,
                  {
                    ease: "linear",
                    stagger: 0.1,
                    render: (e, { y: t, opacity: r }) => {
                      e instanceof HTMLElement &&
                        (e.style.setProperty("transform", `translateY(${t}%)`),
                        e.style.setProperty("opacity", `${r}`));
                    },
                  }
                );
              },
            }),
            (0, s.jsx)(u.Section, {
              mask: "left",
              className: (0, i.default)(p.default.section14),
              ref: h,
              snap: "start",
              children: (0, s.jsx)("div", {
                className: (0, i.default)(
                  p.default.sticky,
                  "dr-layout-block-inner"
                ),
                children: (0, s.jsxs)("div", {
                  className: p.default.content,
                  children: [
                    (0, s.jsx)(m.TitleSubtitle, {
                      title: r?.title?.[0]?.desktop,
                      mobileTitle: r?.title?.[0]?.mobile,
                      subtitle: r?.subtitle?.[0]?.desktop,
                      mobileSubtitle: r?.subtitle?.[0]?.mobile,
                      small: !0,
                      ref: f,
                    }),
                    (0, s.jsx)("div", {
                      className: p.default.devicesList,
                      children: r?.cta.map((e, r) =>
                        (0, s.jsx)(
                          a.Link,
                          {
                            href: e.url,
                            className: p.default.deviceLink,
                            children: (0, s.jsxs)("div", {
                              className: p.default.deviceItem,
                              ref: (e) => {
                                _.current[r] = e;
                              },
                              children: [
                                (0, s.jsx)("div", {
                                  className: p.default.hoverBackground,
                                }),
                                (0, s.jsxs)("h4", {
                                  className: (0, i.default)(
                                    "h4",
                                    p.default.deviceName
                                  ),
                                  children: [
                                    (0, s.jsx)("span", {
                                      className: (0, i.default)(
                                        p.default.deviceNameFirst,
                                        "deviceNameSpan"
                                      ),
                                      children: e.text,
                                    }),
                                    (0, s.jsx)("span", {
                                      className: (0, i.default)(
                                        p.default.deviceNameSecond,
                                        "deviceNameSpan"
                                      ),
                                      children: "Learn more",
                                    }),
                                  ],
                                }),
                                (0, s.jsx)("div", {
                                  className: p.default.logosContainer,
                                  children: t.devices[r].logos.map((e) =>
                                    (0, s.jsx)(
                                      "div",
                                      {
                                        className: p.default.logoWrapper,
                                        children: (0, s.jsx)("img", {
                                          src: e.src,
                                          alt: "logo",
                                          width: 48,
                                          height: 48,
                                          className: p.default.logo,
                                        }),
                                      },
                                      e.id
                                    )
                                  ),
                                }),
                              ],
                            }),
                          },
                          e._uid
                        )
                      ),
                    }),
                  ],
                }),
              }),
            })
          );
        }
      }
    },
    77576: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({ sequence: "frame-sequence-module__X5Gf_W__sequence" });
    },
    25292: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ FrameSequence: () => d });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(40886),
        n = e.i(47103),
        c = e.i(77576);
      function d({
        frames: e = [],
        mobileFrames: t = e,
        className: r,
        objectFit: d = "cover",
        ref: u,
      }) {
        let m = (0, l.useRef)(0),
          p = (0, l.useRef)(null),
          [f, h] = (0, o.useRect)({}),
          { isMobile: g } = (0, a.useDeviceDetection)(),
          _ = (0, l.useRef)(new Map()),
          v = (0, l.useCallback)(async (e) => {
            let t;
            if (
              _.current.has(e) &&
              (_.current.get(e) instanceof Image ||
                _.current.get(e) instanceof ImageBitmap)
            )
              return _.current.get(e);
            let r = new Promise((e) => {
              t = e;
            });
            return (r.resolve = t), _.current.set(e, r), r;
          }, []),
          [y, b] = (0, o.useIntersectionObserver)({
            rootMargin: "1000px",
            threshold: 0,
            once: !0,
          });
        (0, l.useEffect)(() => {
          if (b?.isIntersecting && void 0 !== g) {
            var r = ({ url: e, image: t }) => {
              _.current.has(e) &&
                _.current.get(e) instanceof Promise &&
                _.current.get(e).resolve(t),
                _.current.set(e, t),
                x(m.current);
            };
            for (let s of g ? t : e) {
              let e = new Image();
              (e.onload = () => {
                r({ url: s, image: e });
              }),
                (e.src = s);
            }
          }
        }, [g, v, b]),
          (0, l.useEffect)(() => {
            let e = p.current;
            e &&
              ((e.width =
                Math.floor(h.width ?? 0) *
                Math.min(2, window.devicePixelRatio)),
              (e.height =
                Math.floor(h.height ?? 0) *
                Math.min(2, window.devicePixelRatio)));
          }, [h]);
        let x = (0, l.useCallback)(
          async (r) => {
            m.current = r;
            let s = g ? t[r] : e[r],
              i = await v(s);
            if (!i || !p.current) return;
            let o = p.current.getContext("2d");
            o &&
              (o.clearRect(0, 0, o.canvas.width, o.canvas.height),
              (function (e, t, r = "cover") {
                let s = e.canvas.width,
                  i = e.canvas.height,
                  o = t.width,
                  l = t.height,
                  a = s / i,
                  n = o / l,
                  c =
                    ("contain" === r
                      ? a > n
                        ? i * n
                        : s
                      : "cover" === r
                      ? a > n
                        ? s
                        : i * n
                      : s) / o,
                  d = o * c,
                  u = l * c;
                e.drawImage(t, 0, 0, o, l, (s - d) * 0.5, (i - u) * 0.5, d, u);
              })(o, i, d));
          },
          [g, v, d]
        );
        (0, l.useEffect)(() => {
          b?.isIntersecting && void 0 !== g && x(m.current);
        }, [h, g, b, x]);
        let w = (0, l.useCallback)(
            (
              r,
              { start: s = 0, end: i = g ? t.length - 1 : e.length - 1 } = {}
            ) => {
              x(Math.floor((0, n.mapRange)(0, 1, r, s, i)));
            },
            [x, e, t, g]
          ),
          k = (0, l.useCallback)(
            ({ loop: r = !0, start: s = 0 } = {}) => {
              let i = m.current + 1;
              r && i > (g ? t.length - 1 : e.length - 1) && (i = s), x(i);
            },
            [x, g, t, e]
          ),
          S = (0, l.useRef)(null);
        return (
          (0, l.useImperativeHandle)(
            u,
            () => ({
              frame: x,
              setProgress: w,
              getCurrentFrameIndex: () => m.current,
              getNode: () => S.current,
              next: k,
            }),
            [x, w, k]
          ),
          (0, s.jsx)("div", {
            ref: (e) => {
              f(e), (S.current = e), y(e);
            },
            className: (0, i.default)(c.default.sequence, r),
            children: (0, s.jsx)("canvas", { ref: p }),
          })
        );
      }
    },
    94646: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        button: "small-button-module__2USyQq__button",
        buttonHover: "small-button-module__2USyQq__buttonHover",
        dark: "small-button-module__2USyQq__dark",
        orange: "small-button-module__2USyQq__orange",
        reducedPadding: "small-button-module__2USyQq__reducedPadding",
        white: "small-button-module__2USyQq__white",
      });
    },
    67022: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ SmallButton: () => n });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(96983),
        a = e.i(94646);
      function n(e) {
        let t,
          r,
          n,
          c,
          d,
          u = (0, i.c)(16),
          {
            theme: m,
            children: p,
            link: f,
            reducedPadding: h,
            ref: g,
            className: _,
            disabled: v,
            onClick: y,
          } = e,
          b = void 0 === _ ? "" : _,
          x = m && a.default[m];
        return (
          u[0] !== b || u[1] !== h || u[2] !== x
            ? ((t = (0, o.default)(
                a.default.button,
                "text14_24",
                x,
                { [a.default.reducedPadding]: h },
                b
              )),
              (u[0] = b),
              (u[1] = h),
              (u[2] = x),
              (u[3] = t))
            : (t = u[3]),
          u[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, s.jsx)("div", { className: a.default.buttonHover })),
              (u[4] = r))
            : (r = u[4]),
          u[5] !== p
            ? ((n = (0, s.jsx)("span", { children: p })),
              (u[5] = p),
              (u[6] = n))
            : (n = u[6]),
          u[7] !== v || u[8] !== f || u[9] !== y || u[10] !== t || u[11] !== n
            ? ((c = (0, s.jsxs)(l.Link, {
                href: f,
                disabled: v,
                onClick: y,
                className: t,
                children: [r, n],
              })),
              (u[7] = v),
              (u[8] = f),
              (u[9] = y),
              (u[10] = t),
              (u[11] = n),
              (u[12] = c))
            : (c = u[12]),
          u[13] !== g || u[14] !== c
            ? ((d = (0, s.jsx)("div", { ref: g, children: c })),
              (u[13] = g),
              (u[14] = c),
              (u[15] = d))
            : (d = u[15]),
          d
        );
      }
    },
    76521: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        collaborationContainer:
          "section15-module__0Ez0MW__collaborationContainer",
        collaborationLogo: "section15-module__0Ez0MW__collaborationLogo",
        content: "section15-module__0Ez0MW__content",
        logo: "section15-module__0Ez0MW__logo",
        logoWrapper: "section15-module__0Ez0MW__logoWrapper",
        logosContainer: "section15-module__0Ez0MW__logosContainer",
        mobileTitle: "section15-module__0Ez0MW__mobileTitle",
        section15: "section15-module__0Ez0MW__section15",
        sticky: "section15-module__0Ez0MW__sticky",
        subtitle: "section15-module__0Ez0MW__subtitle",
        wrapper: "section15-module__0Ez0MW__wrapper",
      });
    },
    87851: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ Section15: () => _ });
        var s = e.i(58064),
          i = e.i(60566),
          o = e.i(4371),
          l = e.i(38653),
          a = e.i(25292),
          n = e.i(67376),
          c = e.i(3074),
          d = e.i(22477),
          u = e.i(97287),
          m = e.i(47103),
          p = e.i(67022),
          f = e.i(18421),
          h = e.i(99840),
          g = e.i(76521);
        let t = {
          logos: [
            { src: "/images/icons/remote-xbox.svg", id: "logo-remote-xbox" },
            { src: "/images/icons/remote-play.svg", id: "logo-remote-play" },
            { src: "/images/icons/nvidia-icon.svg", id: "logo-nvidia" },
            { src: "/images/icons/google-play.svg", id: "logo-google-play" },
            { src: "/images/icons/xbox-icon.svg", id: "logo-xbox-icon" },
          ],
          collaborationLogo: "/images/viture-8bitdo.svg",
        };
        function _() {
          let { story: e } = (0, u.useStoryblokContext)(),
            r = e?.content?.section15?.[0];
          if (!r) return null;
          let _ = (0, l.useRef)(null),
            v = (0, l.useRef)(null),
            [y, b] = (0, o.useRect)(),
            x = (0, l.useRef)([]),
            w = (0, l.useRef)(null);
          (0, l.useRef)(null),
            (0, d.useScrollTrigger)({
              rect: b,
              start: "center center",
              end: "bottom bottom",
              onProgress: ({ progress: e }) => {
                (0, m.fromTo)(
                  v.current,
                  { scale: 0.8, opacity: 0 },
                  { scale: 1, opacity: 1 },
                  e,
                  {
                    ease: "easeOutSine",
                    stagger: 0.15,
                    render: (e, { scale: t, opacity: r }) => {
                      e instanceof HTMLElement &&
                        (e.style.setProperty("transform", `scale(${t})`),
                        e.style.setProperty("opacity", `${r}`));
                    },
                  }
                );
              },
            }),
            (0, d.useScrollTrigger)({
              rect: b,
              start: "center center",
              end: "bottom bottom",
              onProgress: ({ progress: e }) => {
                (0, m.fromTo)(
                  x.current.filter((e) => null !== e),
                  { scale: 0.5, opacity: 0 },
                  { scale: 1, opacity: 1 },
                  e,
                  {
                    ease: "easeOutSine",
                    stagger: 0.075,
                    render: (e, { scale: t, opacity: r }) => {
                      e instanceof HTMLElement &&
                        (e.style.setProperty("transform", `scale(${t})`),
                        e.style.setProperty("opacity", `${r}`));
                    },
                  }
                );
              },
            }),
            (0, d.useScrollTrigger)({
              rect: b,
              start: "center center",
              end: "bottom bottom",
              markers: !0,
              onProgress: ({ progress: e }) => {
                w.current?.setProgress(e);
              },
            }),
            (0, d.useScrollTrigger)({
              rect: b,
              start: "top top",
              end: "bottom bottom",
              onProgress: ({ progress: e }) => {
                _.current?.setProgress(e);
              },
            });
          let k = (0, l.useRef)(null);
          return (0, s.jsx)(f.Section, {
            className: (0, i.default)(g.default.section15, "overflow-clip"),
            ref: y,
            sticky: !0,
            leave: "zoomBlur",
            snap: "end",
            children: (0, s.jsxs)("div", {
              ref: k,
              className: (0, i.default)(
                g.default.sticky,
                "dr-layout-block-inner"
              ),
              children: [
                (0, s.jsx)(a.FrameSequence, {
                  ref: _,
                  className:
                    "absolute left-0 dt:left-[20%] w-full top-[0] bottom-[0] ",
                  frames: Array.from(
                    { length: 90 },
                    (e, t) => `/videos/controller/${t + 1}.webp`
                  ),
                  mobileFrames: Array.from(
                    { length: 30 },
                    (e, t) => `/videos/controller-mobile/${3 * t + 1}.webp`
                  ),
                }),
                (0, s.jsx)("div", {
                  className:
                    "absolute inset-0 bg-primary opacity-50 mobile-only",
                }),
                (0, s.jsxs)("div", {
                  className: g.default.content,
                  children: [
                    (0, s.jsx)(h.TitleSubtitle, {
                      title: r?.title?.[0]?.desktop,
                      mobileTitle: r?.title?.[0]?.mobile,
                      subtitle: r?.subtitle?.[0]?.desktop,
                      mobileSubtitle: r?.subtitle?.[0]?.mobile,
                      ref: w,
                    }),
                    (0, s.jsxs)("div", {
                      className: g.default.collaborationContainer,
                      ref: v,
                      children: [
                        (0, s.jsx)(n.Image, {
                          src: t.collaborationLogo,
                          alt: "Collaboration Logo",
                          width: 230,
                          height: 16,
                          className: g.default.collaborationLogo,
                        }),
                        (0, s.jsx)(c.Text, {
                          className: (0, i.default)(
                            "lightSubtitle",
                            g.default.subtitle
                          ),
                          html: r?.caption?.[0]?.desktop,
                          mobileHtml: r?.caption?.[0]?.mobile,
                        }),
                      ],
                    }),
                    (0, s.jsxs)("div", {
                      className: g.default.wrapper,
                      children: [
                        (0, s.jsx)(p.SmallButton, {
                          theme: "white",
                          link: r?.cta?.[0]?.url,
                          ref: (e) => {
                            x.current[0] = e;
                          },
                          children: r?.cta?.[0]?.text,
                        }),
                        (0, s.jsx)("div", {
                          className: g.default.logosContainer,
                          children: t.logos.map((e, t) =>
                            (0, s.jsx)(
                              "div",
                              {
                                className: g.default.logoWrapper,
                                ref: (e) => {
                                  x.current[t + 1] = e;
                                },
                                children: (0, s.jsx)(n.Image, {
                                  src: e.src,
                                  alt: "logo",
                                  width: 48,
                                  height: 48,
                                  className: g.default.logo,
                                }),
                              },
                              e.id
                            )
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          });
        }
      }
    },
    35819: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        details: "section16-module__3JzOza__details",
        section16: "section16-module__3JzOza__section16",
        sticky: "section16-module__3JzOza__sticky",
      });
    },
    72119: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section16: () => h });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(67376),
        n = e.i(36940),
        c = e.i(3074),
        d = e.i(22477),
        u = e.i(97287),
        m = e.i(18421),
        p = e.i(99840),
        f = e.i(35819);
      function h() {
        let { story: e } = (0, u.useStoryblokContext)(),
          t = e?.content?.section16?.[0];
        if (!t) return null;
        let r = (0, l.useRef)(null),
          [h, g] = (0, o.useRect)(),
          _ = (0, l.useRef)(null);
        (0, d.useScrollTrigger)({
          rect: g,
          start: "top center",
          end: "top top",
          onProgress: ({ progress: e }) => {
            _.current?.setProgress(e);
          },
        });
        let v = (0, l.useRef)(null),
          y = (0, l.useRef)(null),
          [b, x] = (0, o.useRect)();
        return (
          (0, d.useScrollTrigger)({
            rect: x,
            start: "center bottom",
            end: "bottom bottom",
            onProgress: ({ progress: e }) => {
              v.current?.setProgress(e), y.current?.setProgress(e);
            },
          }),
          (0, s.jsx)(m.Section, {
            mask: "right",
            className: (0, i.default)(f.default.section16, "overflow-x-clip"),
            ref: h,
            leave: "dezoomBlur",
            snap: "start",
            children: (0, s.jsxs)("div", {
              className: (0, i.default)(
                f.default.sticky,
                "dr-layout-block-inner overflow-clip"
              ),
              ref: r,
              children: [
                (0, s.jsx)("div", {
                  className:
                    "absolute inset-0 top-[33%] dt:top-[15%] dt:min-h-full aspect-[375/504] dt:aspect-[1920/1080] dt:w-full",
                  children: (0, s.jsx)(a.Image, {
                    fill: !0,
                    src: "/images/section16.png",
                    alt: "",
                  }),
                }),
                (0, s.jsx)(p.TitleSubtitle, {
                  title: t?.title?.[0]?.desktop,
                  mobileTitle: t?.title?.[0]?.mobile,
                  subtitle: t?.subtitle?.[0]?.desktop,
                  mobileSubtitle: t?.subtitle?.[0]?.mobile,
                  ref: _,
                }),
                (0, s.jsxs)("div", {
                  ref: b,
                  className: (0, i.default)(f.default.details, "lightSubtitle"),
                  children: [
                    (0, s.jsx)(n.SplitText, {
                      ref: v,
                      className: (0, i.default)("desktop-only"),
                      as: "div",
                      type: "lines",
                      children: (0, c.html)(t?.caption?.[0]?.desktop),
                    }),
                    (0, s.jsx)(n.SplitText, {
                      ref: y,
                      className: (0, i.default)("mobile-only"),
                      as: "div",
                      type: "lines",
                      children: (0, c.html)(t?.caption?.[0]?.mobile),
                    }),
                  ],
                }),
              ],
            }),
          })
        );
      }
    },
    69264: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        section17: "section17-module__3DKC5W__section17",
        sticky: "section17-module__3DKC5W__sticky",
      });
    },
    97562: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section17: () => f });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(67376),
        l = e.i(99840),
        a = e.i(69264),
        n = e.i(4371),
        c = e.i(38653),
        d = e.i(22477),
        u = e.i(97287),
        m = e.i(47103),
        p = e.i(18421);
      function f() {
        let { story: e } = (0, u.useStoryblokContext)(),
          t = e?.content?.section17?.[0];
        if (!t) return null;
        let [r, f] = (0, n.useRect)(),
          h = (0, c.useRef)(null),
          g = (0, c.useRef)(null);
        return (
          (0, c.useRef)(null),
          (0, d.useScrollTrigger)({
            rect: f,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              g.current?.setProgress(e);
            },
          }),
          (0, d.useScrollTrigger)({
            rect: f,
            start: "top bottom",
            end: "top top",
            onProgress: ({ progress: e }) => {
              (0, m.fromTo)(
                h.current,
                { scale: 1.25, y: 0, blur: 20 },
                { scale: 1, y: 0, blur: 0 },
                e,
                {
                  ease: "easeOutSine",
                  render: (e, { scale: t, y: r, blur: s }) => {
                    e instanceof HTMLElement &&
                      (e.style.setProperty(
                        "transform",
                        `translateY(${r}vh) scale(${t}) ${
                          s > 0 ? "translateZ(0)" : ""
                        }`
                      ),
                      e.style.setProperty("filter", `blur(${s}px)`));
                  },
                }
              );
            },
          }),
          (0, s.jsx)(p.Section, {
            mask: "left",
            className: (0, i.default)(a.default.section17, "overflow-x-clip"),
            ref: r,
            leave: "zoomBlur",
            snap: "start",
            children: (0, s.jsx)("div", {
              className: "h-full overflow-clip",
              children: (0, s.jsxs)("div", {
                className: (0, i.default)(
                  a.default.sticky,
                  "dr-layout-block-inner"
                ),
                ref: h,
                children: [
                  (0, s.jsx)("div", {
                    className:
                      "absolute inset-0 top-[33%] dt:top-[15%] dt:min-h-full aspect-[375/504] dt:aspect-[1920/1080] dt:w-full",
                    children: (0, s.jsx)(o.Image, {
                      fill: !0,
                      src: "/images/section17.png",
                      alt: "",
                    }),
                  }),
                  (0, s.jsx)(l.TitleSubtitle, {
                    title: t?.title?.[0]?.desktop,
                    mobileTitle: t?.title?.[0]?.mobile,
                    subtitle: t?.subtitle?.[0]?.desktop,
                    mobileSubtitle: t?.subtitle?.[0]?.mobile,
                    ref: g,
                  }),
                ],
              }),
            }),
          })
        );
      }
    },
    4042: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        button: "product-item-module__yw1N5a__button",
        product0: "product-item-module__yw1N5a__product0",
        product1: "product-item-module__yw1N5a__product1",
        product2: "product-item-module__yw1N5a__product2",
        productItem: "product-item-module__yw1N5a__productItem",
        productItemImg: "product-item-module__yw1N5a__productItemImg",
        productItemLabel: "product-item-module__yw1N5a__productItemLabel",
        productItemName: "product-item-module__yw1N5a__productItemName",
        productNameContainer:
          "product-item-module__yw1N5a__productNameContainer",
        productPrice: "product-item-module__yw1N5a__productPrice",
        productTag: "product-item-module__yw1N5a__productTag",
        productText: "product-item-module__yw1N5a__productText",
        productTextContainer:
          "product-item-module__yw1N5a__productTextContainer",
      });
    },
    61713: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ ProductItem: () => c });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(67376),
        a = e.i(67022),
        n = e.i(4042);
      function c(e) {
        let t,
          r,
          c,
          d,
          u,
          m,
          p,
          f,
          h,
          g,
          _,
          v,
          y,
          b,
          x,
          w,
          k,
          S,
          j,
          E,
          N,
          C,
          T,
          O,
          P,
          R,
          M,
          I,
          L = (0, i.c)(55);
        L[0] !== e
          ? (({
              image: u,
              name: f,
              label: p,
              price: h,
              tag: v,
              description: d,
              cta: c,
              available: t,
              index: m,
              className: r,
              ref: g,
              ..._
            } = e),
            (L[0] = e),
            (L[1] = t),
            (L[2] = r),
            (L[3] = c),
            (L[4] = d),
            (L[5] = u),
            (L[6] = m),
            (L[7] = p),
            (L[8] = f),
            (L[9] = h),
            (L[10] = g),
            (L[11] = _),
            (L[12] = v))
          : ((t = L[1]),
            (r = L[2]),
            (c = L[3]),
            (d = L[4]),
            (u = L[5]),
            (m = L[6]),
            (p = L[7]),
            (f = L[8]),
            (h = L[9]),
            (g = L[10]),
            (_ = L[11]),
            (v = L[12]));
        let U = "number" == typeof m ? n.default[`product${m}`] : "";
        L[13] !== r || L[14] !== U
          ? ((y = [n.default.productItem, U, r].filter(Boolean)),
            (L[13] = r),
            (L[14] = U),
            (L[15] = y))
          : (y = L[15]);
        let z = y.join(" ");
        L[16] !== u || L[17] !== f
          ? ((b = (0, s.jsx)(l.Image, {
              src: u,
              alt: f,
              className: n.default.productItemImg,
              block: !0,
              desktopSize: "30vw",
              mobileSize: "100vw",
            })),
            (L[16] = u),
            (L[17] = f),
            (L[18] = b))
          : (b = L[18]);
        let W = 1 === m ? "productTitleBig" : "productTitle";
        L[19] !== W
          ? ((x = (0, o.default)(n.default.productNameContainer, W)),
            (L[19] = W),
            (L[20] = x))
          : (x = L[20]),
          L[21] !== f
            ? ((w = (0, s.jsx)("span", {
                className: n.default.productItemName,
                children: f,
              })),
              (L[21] = f),
              (L[22] = w))
            : (w = L[22]),
          L[23] !== p
            ? ((k =
                p &&
                (0, s.jsx)("span", {
                  className: (0, o.default)(
                    "productLabel",
                    n.default.productItemLabel
                  ),
                  children: p,
                })),
              (L[23] = p),
              (L[24] = k))
            : (k = L[24]),
          L[25] !== x || L[26] !== w || L[27] !== k
            ? ((S = (0, s.jsxs)("div", { className: x, children: [w, k] })),
              (L[25] = x),
              (L[26] = w),
              (L[27] = k),
              (L[28] = S))
            : (S = L[28]),
          L[29] === Symbol.for("react.memo_cache_sentinel")
            ? ((j = (0, o.default)("productLabel", n.default.productPrice)),
              (L[29] = j))
            : (j = L[29]),
          L[30] !== h
            ? ((E = (0, s.jsx)("div", { className: j, children: h })),
              (L[30] = h),
              (L[31] = E))
            : (E = L[31]),
          L[32] === Symbol.for("react.memo_cache_sentinel")
            ? ((N = (0, o.default)("productLabel", n.default.productTag)),
              (L[32] = N))
            : (N = L[32]),
          L[33] !== v
            ? ((C = (0, s.jsx)("div", { className: N, children: v })),
              (L[33] = v),
              (L[34] = C))
            : (C = L[34]),
          L[35] === Symbol.for("react.memo_cache_sentinel")
            ? ((T = (0, o.default)(n.default.productTextContainer)),
              (O = (0, o.default)("productLabel", n.default.productText)),
              (L[35] = T),
              (L[36] = O))
            : ((T = L[35]), (O = L[36])),
          L[37] !== d
            ? ((P = (0, s.jsx)("div", { className: O, children: d })),
              (L[37] = d),
              (L[38] = P))
            : (P = L[38]);
        let $ = c?.url,
          D = t ? "white" : "dark",
          q = c?.text;
        return (
          L[39] !== $ || L[40] !== D || L[41] !== q
            ? ((R = (0, s.jsx)(a.SmallButton, {
                className: n.default.button,
                link: $,
                theme: D,
                children: q,
              })),
              (L[39] = $),
              (L[40] = D),
              (L[41] = q),
              (L[42] = R))
            : (R = L[42]),
          L[43] !== P || L[44] !== R
            ? ((M = (0, s.jsxs)("div", { className: T, children: [P, R] })),
              (L[43] = P),
              (L[44] = R),
              (L[45] = M))
            : (M = L[45]),
          L[46] !== g ||
          L[47] !== _ ||
          L[48] !== E ||
          L[49] !== C ||
          L[50] !== z ||
          L[51] !== M ||
          L[52] !== b ||
          L[53] !== S
            ? ((I = (0, s.jsxs)("div", {
                ref: g,
                className: z,
                ..._,
                children: [b, S, E, C, M],
              })),
              (L[46] = g),
              (L[47] = _),
              (L[48] = E),
              (L[49] = C),
              (L[50] = z),
              (L[51] = M),
              (L[52] = b),
              (L[53] = S),
              (L[54] = I))
            : (I = L[54]),
          I
        );
      }
    },
    71982: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        picker: "section18-module__Tahmpa__picker",
        pickerItem: "section18-module__Tahmpa__pickerItem",
        "pickerItem--active": "section18-module__Tahmpa__pickerItem--active",
        productList: "section18-module__Tahmpa__productList",
        section18: "section18-module__Tahmpa__section18",
        sectionHead: "section18-module__Tahmpa__sectionHead",
        sticky: "section18-module__Tahmpa__sticky",
      });
    },
    71667: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section18: () => g });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(96983),
        n = e.i(22477),
        c = e.i(97287),
        d = e.i(47103),
        u = e.i(70091),
        m = e.i(61713),
        p = e.i(18421),
        f = e.i(99840),
        h = e.i(71982);
      function g() {
        let { story: e } = (0, c.useStoryblokContext)(),
          t = e?.content?.section18?.[0];
        if (!t) return null;
        let r = (0, l.useRef)(null),
          g = (0, l.useRef)([]),
          [_, v] = (0, o.useRect)(),
          y = (0, l.useRef)([]),
          b = (0, l.useRef)(null);
        (0, n.useScrollTrigger)({
          rect: v,
          start: "top center",
          end: "top top",
          onProgress: ({ progress: e }) => {
            b.current?.setProgress(e);
          },
        }),
          (0, n.useScrollTrigger)({
            rect: v,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              (0, d.fromTo)(
                g.current.filter((e) => null !== e).reverse(),
                { scale: 0.6, opacity: 0 },
                { scale: 1, opacity: 1 },
                e,
                {
                  ease: "easeOutSine",
                  stagger: 0.15,
                  render: (e, { scale: t, opacity: r }) => {
                    e instanceof HTMLElement &&
                      (e.style.setProperty("transform", `scale(${t})`),
                      e.style.setProperty("opacity", `${r}`));
                  },
                }
              );
            },
          }),
          (0, n.useScrollTrigger)({
            rect: v,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              (0, d.fromTo)(
                y.current.filter((e) => null !== e),
                { y: 100 },
                { y: 0 },
                e,
                {
                  ease: "easeOutSine",
                  stagger: 0.08,
                  render: (e, { y: t }) => {
                    e instanceof HTMLElement &&
                      e.style.setProperty("transform", `translateY(${t}%)`);
                  },
                }
              );
            },
          });
        let x = (0, l.useRef)(null);
        return (
          (0, n.useScrollTrigger)({
            rect: v,
            start: "top top",
            end: "center center",
            onProgress: ({ progress: e }) => {
              (0, d.fromTo)(
                x.current,
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 0.8 },
                e,
                {
                  ease: "easeOutSine",
                  render: (e, { opacity: t, scale: r }) => {
                    e instanceof HTMLElement &&
                      (e.style.setProperty("opacity", `${t}`),
                      e.style.setProperty("transform", `scale(${r})`));
                  },
                }
              );
            },
          }),
          (0, l.useEffect)(() => {
            let e = r.current;
            if (!e) return;
            let t = r.current?.querySelectorAll("[data-slide]");
            if (!t || 0 === t.length) return;
            let s = t[Math.floor(t.length / 2)];
            if (!s) return;
            let i = s.offsetLeft,
              o = s.offsetWidth,
              l = e.offsetWidth;
            e.scrollTo({ left: i - (l - o) / 2, behavior: "instant" });
          }, []),
          (0, s.jsx)(p.Section, {
            mask: "right",
            className: (0, i.default)(h.default.section18, "overflow-x-clip"),
            ref: _,
            snap: "start",
            children: (0, s.jsxs)("div", {
              className: (0, i.default)(
                h.default.sticky,
                "flex flex-col justify-between"
              ),
              ref: x,
              children: [
                (0, s.jsx)(u.BlurryGradient, {}),
                (0, s.jsxs)("div", {
                  children: [
                    (0, s.jsx)("div", {
                      className: h.default.sectionHead,
                      children: (0, s.jsx)(f.TitleSubtitle, {
                        title: t?.title?.[0]?.desktop,
                        mobileTitle: t?.title?.[0]?.mobile,
                        ref: b,
                      }),
                    }),
                    (0, s.jsxs)("div", {
                      className: h.default.picker,
                      children: [
                        (0, s.jsx)("span", {
                          className: (0, i.default)(
                            "subtitle",
                            h.default.pickerItem,
                            h.default["pickerItem--active"]
                          ),
                          ref: (e) => {
                            y.current[0] = e;
                          },
                          children: "Luma Series",
                        }),
                        (0, s.jsx)(a.Link, {
                          href: t?.link?.[0]?.url,
                          className: (0, i.default)(
                            "subtitle",
                            h.default.pickerItem
                          ),
                          target: "_blank",
                          rel: "noopener noreferrer",
                          ref: (e) => {
                            y.current[1] = e;
                          },
                          children: t?.link?.[0]?.text,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)("div", {
                  className: h.default.productList,
                  ref: r,
                  "data-lenis-prevent-touch": !0,
                  children: t.products.map((e, t) =>
                    (0, s.jsx)(
                      m.ProductItem,
                      {
                        ref: (e) => {
                          g.current[t] = e;
                        },
                        ...e,
                        cta: e.cta?.[0],
                        image: e.image?.filename,
                        index: t,
                        "data-slide": !0,
                      },
                      `${e.name}-${e.label ?? "base"}`
                    )
                  ),
                }),
              ],
            }),
          })
        );
      }
    },
    96172: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        card: "section19-module__zoHQJG__card",
        cardContent: "section19-module__zoHQJG__cardContent",
        cardTitle: "section19-module__zoHQJG__cardTitle",
        content: "section19-module__zoHQJG__content",
        description: "section19-module__zoHQJG__description",
        glow: "section19-module__zoHQJG__glow",
        section19: "section19-module__zoHQJG__section19",
      });
    },
    26599: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section19: () => v });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(67376),
        n = e.i(3074),
        c = e.i(36460),
        d = e.i(22477),
        u = e.i(97287),
        m = e.i(47103),
        p = e.i(70091),
        f = e.i(67022),
        h = e.i(18421),
        g = e.i(99840),
        _ = e.i(96172);
      function v() {
        let { story: e } = (0, u.useStoryblokContext)(),
          t = e?.content?.section19?.[0];
        if (!t) return null;
        let r = (0, l.useRef)(null),
          v = (0, l.useRef)(null),
          y = (0, l.useRef)(null),
          b = (0, l.useRef)(null),
          [x, w] = (0, o.useRect)();
        (0, d.useScrollTrigger)({
          rect: w,
          start: "top bottom",
          end: "bottom bottom",
          onProgress: ({ progress: e }) => {
            (0, m.fromTo)(
              b.current,
              { y: 25, blur: 40, opacity: 0 },
              { y: 0, blur: 0, opacity: 1 },
              (0, m.mapRange)(0.5, 1, e, 0, 1, !0),
              {
                ease: "easeOutSine",
                render: (e, { y: t, blur: r, opacity: s }) => {
                  e instanceof HTMLElement &&
                    (e.style.setProperty(
                      "transform",
                      `translateY(${t}vh) ${r > 0 ? "translateZ(0)" : ""}`
                    ),
                    e.style.setProperty("filter", `blur(${r}px)`),
                    e.style.setProperty("opacity", `${s}`));
                },
              }
            );
          },
        }),
          (0, d.useScrollTrigger)({
            rect: w,
            start: "top bottom",
            end: "top center",
            onProgress: ({ progress: e }) => {
              (e = (0, m.mapRange)(0.5, 1, e, 0, 1, !0)),
                r.current?.setProgress(e);
            },
          });
        let [k, S] = (0, o.useRect)();
        return (
          (0, d.useScrollTrigger)({
            rect: S,
            start: "top bottom",
            end: "bottom bottom",
            onProgress: ({ progress: e }) => {
              (0, m.fromTo)(y.current, { y: 10 }, { y: 0 }, e, {
                ease: "easeOutSine",
                render: (e, { y: t }) => {
                  e instanceof HTMLElement &&
                    e.style.setProperty("transform", `translateY(${t}vh)`);
                },
              });
            },
          }),
          (0, d.useScrollTrigger)({
            rect: w,
            start: "bottom bottom",
            end: "bottom top",
            onProgress: ({ progress: e }) => {
              (0, m.fromTo)(b.current, { y: 0 }, { y: 33 }, e, {
                ease: "easeOutSine",
                render: (e, { y: t, opacity: r }) => {
                  e instanceof HTMLElement &&
                    e.style.setProperty("transform", `translateY(${t}vh)`);
                },
              });
            },
          }),
          (0, s.jsxs)(h.Section, {
            className: (0, i.default)(_.default.section19),
            snap: "start",
            children: [
              (0, s.jsx)("div", {
                className: "dr-layout-block-inner relative z-1 dr-mb-78",
                children: (0, s.jsxs)("div", {
                  ref: v,
                  className: (0, i.default)(
                    _.default.card,
                    "relative aspect-[343/490] dt:aspect-[1728/352] flex flex-col justify-start dt:justify-between items-start overflow-clip"
                  ),
                  children: [
                    (0, s.jsx)("div", {
                      className:
                        "absolute max-dt:left-0 right-0 top-[60%] dt:top-[-20%] dt:w-[80%] bottom-[-20%] dt:bottom-[-20%] dt:right-[-20%]",
                      children: (0, s.jsx)(p.BlurryGradient, {}),
                    }),
                    (0, s.jsx)("div", {
                      className:
                        "absolute max-dt:left-0 right-0 top-[60%] dt:right-0 dt:top-0 dt:w-[40%] bottom-0",
                      children: (0, s.jsx)(a.Image, {
                        fill: !0,
                        src: "/images/section19-glass.png",
                        alt: "",
                        desktopSize: "40vw",
                        mobileSize: "100vw",
                      }),
                    }),
                    (0, s.jsx)("div", {
                      className: _.default.cardContent,
                      children: (0, s.jsx)(n.Text, {
                        tag: "h2",
                        className: (0, i.default)("h3", _.default.cardTitle),
                        html: t?.cards?.[0]?.title?.[0]?.desktop,
                        mobileHtml: t?.cards?.[0]?.title?.[0]?.mobile,
                      }),
                    }),
                    (0, s.jsx)(f.SmallButton, {
                      link: t?.cards?.[0]?.cta?.[0]?.url,
                      theme: "white",
                      children: t?.cards?.[0]?.cta?.[0]?.text,
                    }),
                  ],
                }),
              }),
              (0, s.jsxs)("div", {
                ref: x,
                className: (0, i.default)(
                  _.default.content,
                  "relative dr-layout-block-inner overflow-x-clip"
                ),
                children: [
                  (0, s.jsx)("div", {
                    className: "absolute inset-0",
                    ref: b,
                    children: (0, s.jsx)(c.Video, {
                      src: "/videos/girl.webm",
                      autoPlay: !0,
                      loop: !0,
                      muted: !0,
                      playsInline: !0,
                      className: "w-full h-full object-cover",
                    }),
                  }),
                  (0, s.jsx)("div", {
                    className: (0, i.default)(
                      _.default.description,
                      "relative"
                    ),
                    children: (0, s.jsx)(g.TitleSubtitle, {
                      title: t?.title?.[0]?.desktop,
                      mobileTitle: t?.title?.[0]?.mobile,
                      subtitle: t?.subtitle?.[0]?.desktop,
                      mobileSubtitle: t?.subtitle?.[0]?.mobile,
                      ref: r,
                    }),
                  }),
                  (0, s.jsx)("div", {
                    ref: k,
                    children: (0, s.jsx)(n.Text, {
                      tag: "p",
                      className: (0, i.default)(
                        "lightSubtitle relative",
                        _.default.details
                      ),
                      html: t?.caption?.[0]?.desktop,
                      mobileHtml: t?.caption?.[0]?.mobile,
                      ref: y,
                    }),
                  }),
                ],
              }),
            ],
          })
        );
      }
    },
    92937: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        "align-bottom": "card-module__JTl4uq__align-bottom",
        card: "card-module__JTl4uq__card",
        cardOuter: "card-module__JTl4uq__cardOuter",
      });
    },
    55166: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Card: () => u });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(4371),
        a = e.i(40886),
        n = e.i(22477),
        c = e.i(47103),
        d = e.i(92937);
      function u(e) {
        let t,
          r,
          u,
          m,
          p,
          f,
          h,
          g,
          _ = (0, i.c)(21),
          { className: v, children: y, align: b, ref: x } = e;
        _[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = { ignoreTransform: !0 }), (_[0] = t))
          : (t = _[0]);
        let [w, k] = (0, l.useRect)(t),
          { isMobile: S } = (0, a.useDeviceDetection)();
        _[1] !== S || _[2] !== k
          ? ((r = (e) => {
              let { progress: t } = e;
              if (!S) return;
              let r = k?.element?.querySelector("video");
              r &&
                (t <= 0.5 && (r.currentTime = 0),
                t >= 0.7
                  ? r?.paused && r.currentTime < r.duration && r.play()
                  : r.pause()),
                (0, c.fromTo)(
                  k.element,
                  { y: 50, scale: 0.5, clipPath: 20 },
                  { y: 0, scale: 1, clipPath: 0 },
                  t,
                  {
                    ease: "easeOutSine",
                    stagger: 0.05,
                    render: (e, t) => {
                      let { y: r, scale: s, clipPath: i } = t;
                      e instanceof HTMLElement &&
                        (e.style.setProperty(
                          "transform",
                          `translateY(${r}vh) scale(${s}) ${
                            0 !== r && "translateZ(0)"
                          }`
                        ),
                        e.style.setProperty(
                          "clip-path",
                          `inset(${i}% round ${S ? "8.53vw" : "2.5vw"})`
                        ));
                    },
                  }
                );
            }),
            (_[1] = S),
            (_[2] = k),
            (_[3] = r))
          : (r = _[3]),
          _[4] !== k || _[5] !== r
            ? ((u = {
                rect: k,
                start: "top bottom",
                end: "bottom bottom",
                onProgress: r,
              }),
              (_[4] = k),
              (_[5] = r),
              (_[6] = u))
            : (u = _[6]),
          _[7] !== S ? ((m = [S]), (_[7] = S), (_[8] = m)) : (m = _[8]),
          (0, n.useScrollTrigger)(u, m),
          _[9] !== x || _[10] !== w
            ? ((p = (e) => {
                w(e), x && ("function" == typeof x ? x(e) : (x.current = e));
              }),
              (_[9] = x),
              (_[10] = w),
              (_[11] = p))
            : (p = _[11]);
        let j = d.default[`align-${void 0 === b ? "top" : b}`];
        return (
          _[12] !== v || _[13] !== j
            ? ((f = (0, o.default)(d.default.cardOuter, j, "bg-white-08", v)),
              (_[12] = v),
              (_[13] = j),
              (_[14] = f))
            : (f = _[14]),
          _[15] !== y
            ? ((h = (0, s.jsx)("div", {
                className: d.default.card,
                children: y,
              })),
              (_[15] = y),
              (_[16] = h))
            : (h = _[16]),
          _[17] !== p || _[18] !== f || _[19] !== h
            ? ((g = (0, s.jsx)("div", { ref: p, className: f, children: h })),
              (_[17] = p),
              (_[18] = f),
              (_[19] = h),
              (_[20] = g))
            : (g = _[20]),
          g
        );
      }
    },
    10136: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        cardCols: "section2-module__24Nf6W__cardCols",
        cardContent: "section2-module__24Nf6W__cardContent",
        cards: "section2-module__24Nf6W__cards",
        inner: "section2-module__24Nf6W__inner",
        right: "section2-module__24Nf6W__right",
        section2: "section2-module__24Nf6W__section2",
        sticky: "section2-module__24Nf6W__sticky",
      });
    },
    41176: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section2: () => v });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(3074),
        n = e.i(36460),
        c = e.i(40886),
        d = e.i(22477),
        u = e.i(97287),
        m = e.i(47103),
        p = e.i(67022),
        f = e.i(55166),
        h = e.i(18421),
        g = e.i(99840),
        _ = e.i(10136);
      function v() {
        let { story: e } = (0, u.useStoryblokContext)(),
          t = e?.content?.section2?.[0];
        if (!t) return null;
        let r = (0, l.useRef)(null),
          v = (0, l.useRef)([]),
          y = (0, l.useRef)(null),
          [b, x] = (0, o.useRect)(),
          { isMobile: w } = (0, c.useDeviceDetection)();
        (0, d.useScrollTrigger)({
          rect: x,
          start: "top center",
          end: "top top",
          onProgress: ({ progress: e }) => {
            r.current?.setProgress(e);
          },
        }),
          (0, d.useScrollTrigger)(
            {
              rect: x,
              start: "top bottom",
              end: "top top",
              onProgress: ({ progress: e }) => {
                if (!w) {
                  if (e <= 0.5)
                    for (let e of v.current) e && (e.currentTime = 0);
                  if (e >= 0.7)
                    for (let e of v.current)
                      e?.paused && e.currentTime < e.duration && e.play();
                  else for (let e of v.current) e && e.pause();
                }
              },
            },
            [w]
          );
        let k = (0, l.useRef)([]);
        return (
          (0, d.useScrollTrigger)(
            {
              rect: x,
              start: "top center",
              end: "top top",
              onProgress: ({ progress: e }) => {
                w ||
                  (0, m.fromTo)(
                    k.current,
                    { y: 100, scale: 0.5, clipPath: 20 },
                    { y: 0, scale: 1, clipPath: 0 },
                    e,
                    {
                      ease: "easeOutSine",
                      stagger: 0.05,
                      render: (e, { y: t, scale: r, clipPath: s }) => {
                        e instanceof HTMLElement &&
                          (e.style.setProperty(
                            "transform",
                            `translateY(${t}vh) scale(${r}) ${
                              0 !== t && "translateZ(0)"
                            }`
                          ),
                          e.style.setProperty(
                            "clip-path",
                            `inset(${s}% round 2.5vw})`
                          ));
                      },
                    }
                  );
              },
            },
            [w]
          ),
          (0, s.jsx)(h.Section, {
            ref: b,
            mask: "left",
            leave: "dezoomBlur",
            children: (0, s.jsx)("div", {
              className: (0, i.default)(_.default.sticky),
              children: (0, s.jsxs)("div", {
                className: (0, i.default)(
                  "dr-layout-block-inner",
                  _.default.inner
                ),
                ref: y,
                children: [
                  (0, s.jsxs)("div", {
                    className: "relative",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "h-[50vh] absolute left-0 top-[100%] right-0",
                      }),
                      (0, s.jsx)(g.TitleSubtitle, {
                        title: t?.title?.[0]?.desktop,
                        mobileTitle: t?.title?.[0]?.mobile,
                        subtitle: t?.subtitle?.[0]?.desktop,
                        mobileSubtitle: t?.subtitle?.[0]?.mobile,
                        ref: r,
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: (0, i.default)(
                      _.default.cards,
                      "grid grid-cols-1 dt:grid-cols-4 gap-gap"
                    ),
                    children: [
                      (0, s.jsxs)(f.Card, {
                        ref: (e) => {
                          k.current[0] = e;
                        },
                        children: [
                          (0, s.jsx)("div", {
                            className: "absolute inset-0",
                            children: (0, s.jsx)(n.Video, {
                              src: "/videos/demo1.webm",
                              mobileSrc: "/videos/demo1-mobile.webm",
                              muted: !0,
                              playsInline: !0,
                              className: (0, i.default)(
                                "absolute top-[33%] w-full h-full object-cover circleMask"
                              ),
                              ref: (e) => {
                                v.current[0] = e;
                              },
                            }),
                          }),
                          (0, s.jsxs)("div", {
                            className: _.default.cardContent,
                            children: [
                              (0, s.jsx)(a.Text, {
                                tag: "h3",
                                className: "h4",
                                html: t?.cards?.[0]?.title?.[0]?.desktop,
                                mobileHtml: t?.cards?.[0]?.title?.[0]?.mobile,
                              }),
                              (0, s.jsx)(a.Text, {
                                tag: "p",
                                className: "lightSubtitle text-white-40",
                                html: t?.cards?.[0]?.subtitle?.[0]?.desktop,
                                mobileHtml:
                                  t?.cards?.[0]?.subtitle?.[0]?.mobile,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)(f.Card, {
                        ref: (e) => {
                          k.current[1] = e;
                        },
                        className: (0, i.default)(
                          "dt:col-span-2",
                          _.default.middleCard
                        ),
                        align: "bottom",
                        children: [
                          (0, s.jsx)("div", {
                            className: "absolute inset-0",
                            children: (0, s.jsx)(n.Video, {
                              src: "/videos/demo2.webm",
                              mobileSrc: "/videos/demo2-mobile.webm",
                              muted: !0,
                              playsInline: !0,
                              className: (0, i.default)(
                                "absolute left-[33%] dt:left-[10%] top-[-0%] w-full h-full object-cover circleMask"
                              ),
                              ref: (e) => {
                                v.current[1] = e;
                              },
                            }),
                          }),
                          (0, s.jsxs)("div", {
                            className: (0, i.default)(_.default.cardCols),
                            children: [
                              (0, s.jsxs)("div", {
                                className: (0, i.default)(
                                  _.default.cardContent
                                ),
                                children: [
                                  (0, s.jsx)(a.Text, {
                                    tag: "p",
                                    className: "lightSubtitle text-white-40",
                                    html: t?.cards?.[1]?.pretitle?.[0]?.desktop,
                                    mobileHtml:
                                      t?.cards?.[1]?.pretitle?.[0]?.mobile,
                                  }),
                                  (0, s.jsx)(a.Text, {
                                    tag: "h3",
                                    className: "h4",
                                    html: t?.cards?.[1]?.title?.[0]?.desktop,
                                    mobileHtml:
                                      t?.cards?.[1]?.title?.[0]?.mobile,
                                  }),
                                  (0, s.jsx)(a.Text, {
                                    tag: "p",
                                    className: "lightSubtitle text-white-40",
                                    html: t?.cards?.[1]?.subtitle?.[0]?.desktop,
                                    mobileHtml:
                                      t?.cards?.[1]?.subtitle?.[0]?.mobile,
                                  }),
                                ],
                              }),
                              (0, s.jsx)("div", {
                                className: (0, i.default)(
                                  _.default.right,
                                  "relative"
                                ),
                                children: (0, s.jsx)(p.SmallButton, {
                                  link: t?.cards?.[1]?.cta?.[0]?.url,
                                  theme: "white",
                                  children: t?.cards?.[1]?.cta?.[0]?.text,
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)(f.Card, {
                        ref: (e) => {
                          k.current[2] = e;
                        },
                        children: [
                          (0, s.jsx)("div", {
                            className: "absolute inset-0",
                            children: (0, s.jsx)(n.Video, {
                              src: "/videos/demo3.webm",
                              mobileSrc: "/videos/demo3-mobile.webm",
                              muted: !0,
                              playsInline: !0,
                              className: (0, i.default)(
                                "absolute left-[0%] top-[20%] w-full h-full object-cover circleMask"
                              ),
                              ref: (e) => {
                                v.current[2] = e;
                              },
                            }),
                          }),
                          (0, s.jsxs)("div", {
                            className: _.default.cardContent,
                            children: [
                              (0, s.jsx)(a.Text, {
                                tag: "h3",
                                className: "h4",
                                html: t?.cards?.[2]?.title?.[0]?.desktop,
                                mobileHtml: t?.cards?.[2]?.title?.[0]?.mobile,
                              }),
                              (0, s.jsx)(a.Text, {
                                tag: "p",
                                className: "lightSubtitle text-white-40",
                                html: t?.cards?.[2]?.subtitle?.[0]?.desktop,
                                mobileHtml:
                                  t?.cards?.[2]?.subtitle?.[0]?.mobile,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          })
        );
      }
    },
    35671: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        content: "section20-module__kUzs9G__content",
        heart: "section20-module__kUzs9G__heart",
        partnersItem: "section20-module__kUzs9G__partnersItem",
        partnersList: "section20-module__kUzs9G__partnersList",
        section20: "section20-module__kUzs9G__section20",
        sticky: "section20-module__kUzs9G__sticky",
        text: "section20-module__kUzs9G__text",
        titleContainer: "section20-module__kUzs9G__titleContainer",
      });
    },
    82355: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section20: () => g });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(67376),
        n = e.i(22477),
        c = e.i(97287),
        d = e.i(47103),
        u = e.i(70091),
        m = e.i(67022),
        p = e.i(18421),
        f = e.i(99840),
        h = e.i(35671);
      function g() {
        let { story: e } = (0, c.useStoryblokContext)(),
          t = e?.content?.section20?.[0];
        if (!t) return null;
        let [r, g] = (0, o.useRect)(),
          _ = (0, l.useRef)([]),
          v = (0, l.useRef)(null),
          y = (0, l.useRef)(null),
          b = (0, l.useRef)(null),
          { height: x = 0 } = (0, o.useWindowSize)();
        (0, n.useScrollTrigger)({
          rect: g,
          start: "top center",
          end: "top top",
          onProgress: ({ progress: e }) => {
            (0, d.fromTo)(
              _.current.filter((e) => null !== e),
              { y: 300 },
              { y: 0 },
              e,
              {
                ease: "easeOutSine",
                stagger: 0.075,
                render: (e, { y: t }) => {
                  e instanceof HTMLElement &&
                    e.style.setProperty("transform", `translateY(${t}%)`);
                },
              }
            );
          },
        }),
          (0, n.useScrollTrigger)({
            rect: g,
            start: `top ${0.25 * x}`,
            end: "top top",
            onProgress: ({ progress: e }) => {
              (0, d.fromTo)(
                b.current,
                { y: 25, scale: 0.6 },
                { y: 0, scale: 1 },
                e,
                {
                  ease: "easeOutSine",
                  render: (e, { y: t, scale: r }) => {
                    e instanceof HTMLElement &&
                      e.style.setProperty(
                        "transform",
                        `translateY(${t}vh) scale(${r})`
                      );
                  },
                }
              );
            },
          }),
          (0, n.useScrollTrigger)({
            rect: g,
            start: `top ${0.35 * x}`,
            end: "top top",
            onProgress: ({ progress: e }) => {
              (0, d.fromTo)(v.current, { y: 300 }, { y: 0 }, e, {
                ease: "easeOutSine",
                stagger: 0.075,
                render: (e, { y: t }) => {
                  e instanceof HTMLElement &&
                    e.style.setProperty("transform", `translateY(${t}%)`);
                },
              });
            },
          }),
          (0, n.useScrollTrigger)({
            rect: g,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              y.current?.setProgress(e);
            },
          });
        let w = (0, l.useRef)(null);
        return (
          (0, n.useScrollTrigger)({
            rect: g,
            start: "top top",
            end: "bottom bottom",
            onProgress: ({ progress: e }) => {
              (0, d.fromTo)(
                w.current,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -30 },
                e,
                {
                  ease: "easeOutSine",
                  render: (e, { opacity: t, y: r }) => {
                    e instanceof HTMLElement &&
                      (e.style.setProperty("opacity", `${t}`),
                      e.style.setProperty("transform", `translateY(${r}vh)`));
                  },
                }
              );
            },
          }),
          (0, s.jsx)(p.Section, {
            className: (0, i.clsx)(h.default.section20, "overflow-clip"),
            ref: r,
            snap: "start",
            children: (0, s.jsxs)("div", {
              className: h.default.sticky,
              ref: w,
              children: [
                (0, s.jsx)(u.BlurryGradient, {}),
                (0, s.jsxs)("div", {
                  className: h.default.content,
                  children: [
                    (0, s.jsx)("div", {
                      className: h.default.titleContainer,
                      children: (0, s.jsx)(f.TitleSubtitle, {
                        small: !0,
                        ref: y,
                        title: t?.title?.[0]?.desktop,
                        mobileTitle: t?.title?.[0]?.mobile,
                        subtitle: t?.subtitle?.[0]?.desktop,
                        mobileSubtitle: t?.subtitle?.[0]?.mobile,
                      }),
                    }),
                    (0, s.jsx)("ul", {
                      className: h.default.partnersList,
                      children: t?.items?.split(",").map((e, t) =>
                        (0, s.jsx)(
                          "li",
                          {
                            className: (0, i.default)(
                              h.default.partnersItem,
                              "h4"
                            ),
                            children: (0, s.jsx)("span", {
                              className: h.default.text,
                              ref: (e) => {
                                _.current[t] = e;
                              },
                              children: e,
                            }),
                          },
                          e._uid
                        )
                      ),
                    }),
                    (0, s.jsxs)("div", {
                      className: h.default.heart,
                      children: [
                        (0, s.jsx)(a.Image, {
                          src: "/images/heart-icon.svg",
                          alt: "Description",
                          width: 48,
                          height: 48,
                          ref: v,
                        }),
                        " ",
                      ],
                    }),
                    (0, s.jsx)(m.SmallButton, {
                      link: t?.cta?.[0]?.url,
                      theme: "white",
                      ref: b,
                      children: t?.cta?.[0]?.text,
                    }),
                  ],
                }),
              ],
            }),
          })
        );
      }
    },
    41072: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        decorator: "hotspot-module__GlFlMq__decorator",
        hotspot: "hotspot-module__GlFlMq__hotspot",
        inner: "hotspot-module__GlFlMq__inner",
        innerCircle: "hotspot-module__GlFlMq__innerCircle",
        outerCircle: "hotspot-module__GlFlMq__outerCircle",
        title: "hotspot-module__GlFlMq__title",
      });
    },
    29795: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Hotspot: () => d });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(38653),
        a = e.i(36940),
        n = e.i(47103),
        c = e.i(41072);
      function d(e) {
        let t,
          r,
          d,
          u,
          m,
          p,
          f,
          h,
          g,
          _,
          v,
          y = (0, i.c)(22),
          { position: b, children: x, title: w, subtitle: k, ref: S } = e,
          j = (0, l.useRef)(null),
          E = (0, l.useRef)(null),
          N = (0, l.useRef)(null),
          C = (0, l.useRef)(null),
          T = (0, l.useRef)(0);
        y[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = (e) => {
              j.current?.setProgress((0, n.stagger)(0, 2, e, 0.15)),
                E.current?.setProgress((0, n.stagger)(1, 2, e, 0.15)),
                N.current?.setProgress((0, n.stagger)(2, 2, e, 0.15)),
                C.current &&
                  ((C.current.style.opacity = `${e}`),
                  (C.current.style.transform = `scale3d(${e}, ${e}, 1)`));
            }),
            (y[0] = t))
          : (t = y[0]);
        let O = t;
        return (
          y[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = () => ({ setProgress: O, progress: T })), (y[1] = r))
            : (r = y[1]),
          (0, l.useImperativeHandle)(S, r),
          y[2] !== b.x || y[3] !== b.y
            ? ((d = { "--pos-x": b.x, "--pos-y": b.y }),
              (y[2] = b.x),
              (y[3] = b.y),
              (y[4] = d))
            : (d = y[4]),
          y[5] !== k
            ? ((u = (0, s.jsx)(a.SplitText, {
                ref: j,
                willAppear: !0,
                className: "lightSubtitle text-white-40",
                children: k,
              })),
              (y[5] = k),
              (y[6] = u))
            : (u = y[6]),
          y[7] === Symbol.for("react.memo_cache_sentinel")
            ? ((m = (0, o.default)("hotspotTitle uppercase", c.default.title)),
              (y[7] = m))
            : (m = y[7]),
          y[8] !== w
            ? ((p = (0, s.jsx)(a.SplitText, {
                ref: E,
                willAppear: !0,
                className: m,
                children: w,
              })),
              (y[8] = w),
              (y[9] = p))
            : (p = y[9]),
          y[10] !== x
            ? ((f = (0, s.jsx)(a.SplitText, {
                ref: N,
                willAppear: !0,
                className: "lightSubtitle",
                type: "lines",
                children: x,
              })),
              (y[10] = x),
              (y[11] = f))
            : (f = y[11]),
          y[12] !== u || y[13] !== p || y[14] !== f
            ? ((h = (0, s.jsxs)("div", {
                className: "flex flex-col",
                children: [u, p, f],
              })),
              (y[12] = u),
              (y[13] = p),
              (y[14] = f),
              (y[15] = h))
            : (h = y[15]),
          y[16] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = (0, s.jsxs)("div", {
                ref: C,
                className: c.default.decorator,
                children: [
                  (0, s.jsx)("div", { className: c.default.outerCircle }),
                  (0, s.jsx)("div", { className: c.default.innerCircle }),
                ],
              })),
              (y[16] = g))
            : (g = y[16]),
          y[17] !== h
            ? ((_ = (0, s.jsxs)("div", {
                className: c.default.inner,
                children: [h, g],
              })),
              (y[17] = h),
              (y[18] = _))
            : (_ = y[18]),
          y[19] !== _ || y[20] !== d
            ? ((v = (0, s.jsx)("div", {
                className: c.default.hotspot,
                style: d,
                children: _,
              })),
              (y[19] = _),
              (y[20] = d),
              (y[21] = v))
            : (v = y[21]),
          v
        );
      }
    },
    98413: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        hotspots: "section3-module__SzoO3a__hotspots",
        section3: "section3-module__SzoO3a__section3",
        sticky: "section3-module__SzoO3a__sticky",
        title: "section3-module__SzoO3a__title",
        viewport: "section3-module__SzoO3a__viewport",
        viewportInner: "section3-module__SzoO3a__viewportInner",
      });
    },
    97202: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ Section3: () => v });
        var s = e.i(58064),
          i = e.i(60566),
          o = e.i(17170),
          l = e.i(4371),
          a = e.i(38653),
          n = e.i(67376),
          c = e.i(3074),
          d = e.i(40886),
          u = e.i(22477),
          m = e.i(97287),
          p = e.i(47103),
          f = e.i(29795),
          h = e.i(18421),
          g = e.i(99840),
          _ = e.i(98413);
        let t = {
          hotspots: [
            { position: { mobile: [12, 65], desktop: [28, 70] } },
            { position: { mobile: [60, 50], desktop: [60, 50] } },
          ],
        };
        function v() {
          let { story: e } = (0, m.useStoryblokContext)(),
            r = e?.content?.section3?.[0];
          if (!r) return null;
          let v = (0, a.useRef)(null),
            y = (0, a.useRef)([]),
            b = (0, a.useRef)(null),
            [x, w] = (0, l.useRect)(),
            { isMobile: k } = (0, d.useDeviceDetection)(),
            [S, j] = (0, l.useRect)(),
            [E, N] = (0, l.useRect)(),
            C = o.default.parseEase("power1.inOut");
          return (
            (0, u.useScrollTrigger)({
              rect: w,
              start: "top center",
              end: "top top",
              onProgress: ({ progress: e }) => {
                b.current?.setProgress(e);
              },
            }),
            (0, u.useScrollTrigger)({
              rect: w,
              start: "bottom bottom",
              end: "bottom top",
              onProgress: ({ progress: e }) => {
                (0, p.fromTo)(w.element, { opacity: 1 }, { opacity: 0 }, e, {
                  ease: "easeOutSine",
                  render: (e, { opacity: t }) => {
                    e instanceof HTMLElement &&
                      e.style.setProperty("opacity", `${t}`);
                  },
                });
              },
            }),
            (0, u.useScrollTrigger)({
              rect: w,
              start: "top top",
              end: "bottom bottom",
              onProgress: ({ progress: e }) => {
                if (!v.current) return;
                let t = 0;
                if (k)
                  for (let r of ((t = (0, p.mapRange)(
                    0,
                    1,
                    C(e),
                    0.2 * (j.width || 0),
                    ((N.width || 0) - (j.width || 0)) * 0.7,
                    !0
                  )),
                  y.current))
                    r.setProgress(1);
                else {
                  let t = y.current.length;
                  y.current.forEach((r, s) => {
                    let i = (0, p.mapRange)(s / t, (s + 1) / t, e, 0, 1, !0);
                    r.setProgress(i);
                  });
                }
                v.current.style.transform = `translate3d(${-t}px, 0, 0)`;
              },
            }),
            (0, s.jsx)(h.Section, {
              className: _.default.section3,
              ref: x,
              style: { "--aspect-ratio": 1920 / 1080 },
              children: (0, s.jsxs)("div", {
                className: _.default.sticky,
                children: [
                  (0, s.jsx)("div", {
                    className: (0, i.default)(
                      _.default.title,
                      "dr-layout-block relative"
                    ),
                    children: (0, s.jsx)(g.TitleSubtitle, {
                      title: r?.title?.[0]?.desktop,
                      mobileTitle: r?.title?.[0]?.mobile,
                      subtitle: r?.subtitle?.[0]?.desktop,
                      mobileSubtitle: r?.subtitle?.[0]?.mobile,
                      centered: !0,
                      ref: b,
                    }),
                  }),
                  (0, s.jsx)("div", {
                    className: _.default.viewport,
                    ref: S,
                    children: (0, s.jsxs)("div", {
                      className: _.default.viewportInner,
                      ref: (e) => {
                        (v.current = e), E(e);
                      },
                      children: [
                        (0, s.jsx)("div", {
                          className: "absolute inset-0 top-[10%] dt:min-h-full",
                          children: (0, s.jsx)(n.Image, {
                            fill: !0,
                            src: "/images/section3.png",
                            alt: "",
                            mobileSize: "250vw",
                          }),
                        }),
                        (0, s.jsx)("div", {
                          className: _.default.hotspots,
                          children: r?.cards.map((e, r) =>
                            (0, s.jsx)(
                              f.Hotspot,
                              {
                                position: {
                                  x: t.hotspots[r].position[
                                    k ? "mobile" : "desktop"
                                  ][0],
                                  y: t.hotspots[r].position[
                                    k ? "mobile" : "desktop"
                                  ][1],
                                },
                                subtitle: e?.pretitle?.[0]?.desktop,
                                title: e?.title?.[0]?.desktop,
                                ref: (e) => {
                                  e && (y.current[r] = e);
                                },
                                children: (0, s.jsx)(c.Text, {
                                  tag: "p",
                                  className: (0, i.default)(
                                    "lightSubtitle",
                                    _.default.itemContent
                                  ),
                                  html: e?.subtitle?.[0]?.desktop,
                                  mobileHtml: e?.subtitle?.[0]?.mobile,
                                }),
                              },
                              r
                            )
                          ),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            })
          );
        }
      }
    },
    27191: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        itemContent: "section4-module__hVEtlG__itemContent",
        itemInner: "section4-module__hVEtlG__itemInner",
        itemTitle: "section4-module__hVEtlG__itemTitle",
        list: "section4-module__hVEtlG__list",
        listItem: "section4-module__hVEtlG__listItem",
        section4: "section4-module__hVEtlG__section4",
        sticky: "section4-module__hVEtlG__sticky",
      });
    },
    96164: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section4: () => g });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(25292),
        n = e.i(3074),
        c = e.i(40886),
        d = e.i(22477),
        u = e.i(97287),
        m = e.i(47103),
        p = e.i(18421),
        f = e.i(99840),
        h = e.i(27191);
      function g() {
        let { story: e } = (0, u.useStoryblokContext)(),
          t = e?.content?.section4?.[0];
        if (!t) return null;
        let r = (0, l.useRef)(null),
          g = (0, l.useRef)(null),
          _ = (0, l.useRef)(null),
          [v, y] = (0, o.useRect)(),
          [b, x] = (0, o.useRect)(),
          { isMobile: w } = (0, c.useDeviceDetection)();
        (0, d.useScrollTrigger)({
          rect: y,
          start: "top center",
          end: "top top",
          onProgress: ({ progress: e }) => {
            g.current?.setProgress(e);
          },
        }),
          (0, d.useScrollTrigger)(
            {
              rect: y,
              start: "top bottom",
              end: "top top",
              onProgress: ({ progress: e }) => {
                (0, m.fromTo)(
                  r.current,
                  { clipPath: 20, borderRadius: w ? 17 : 5 },
                  { clipPath: 0, borderRadius: 0 },
                  e,
                  {
                    ease: "easeOutSine",
                    render: (e, { clipPath: t, borderRadius: s }) => {
                      r.current?.style.setProperty(
                        "clip-path",
                        `inset(${t}% round ${s}vw)`
                      );
                    },
                  }
                );
              },
            },
            [w]
          );
        let k = (0, l.useRef)([]);
        return (
          (0, d.useScrollTrigger)({
            rect: x,
            start: "top center",
            end: "center center",
            onProgress: ({ progress: e }) => {
              _.current?.setProgress(e),
                (0, m.fromTo)(k.current, { y: 100 }, { y: 0 }, e, {
                  stagger: 0.15,
                  ease: "easeOutSine",
                  render: (e, { y: t }) => {
                    e instanceof HTMLElement &&
                      (e.style.transform = `translateY(${t}%)`);
                  },
                });
            },
          }),
          (0, s.jsx)(p.Section, {
            mask: "right",
            leave: "zoomBlur",
            className: (0, i.default)(h.default.section4),
            ref: v,
            children: (0, s.jsxs)("div", {
              className: (0, i.default)(
                h.default.sticky,
                "dr-layout-block-inner"
              ),
              ref: r,
              children: [
                (0, s.jsx)(a.FrameSequence, {
                  ref: g,
                  className: "absolute inset-0",
                  frames: Array.from(
                    { length: 60 },
                    (e, t) => `/videos/demo/${t + 1}.webp`
                  ),
                  mobileFrames: Array.from(
                    { length: 20 },
                    (e, t) => `/videos/demo-mobile/${3 * t + 1}.webp`
                  ),
                }),
                (0, s.jsx)("div", {
                  className:
                    "absolute inset-0 bg-primary opacity-20 desktop-only",
                }),
                (0, s.jsx)("div", {
                  className:
                    "absolute inset-0 bg-primary opacity-50 mobile-only",
                }),
                (0, s.jsxs)("div", {
                  className: "relative",
                  children: [
                    (0, s.jsx)("div", {
                      className: "absolute top-[100%] left-0 right-0 h-[50vh]",
                      ref: b,
                    }),
                    (0, s.jsx)(f.TitleSubtitle, {
                      title: t?.title?.[0]?.desktop,
                      mobileTitle: t?.title?.[0]?.mobile,
                      subtitle: t?.subtitle?.[0]?.desktop,
                      mobileSubtitle: t?.subtitle?.[0]?.mobile,
                      ref: _,
                    }),
                  ],
                }),
                (0, s.jsx)("ul", {
                  className: (0, i.default)(h.default.list, "relative"),
                  children: t?.cards.map((e, t) =>
                    (0, s.jsx)(
                      "li",
                      {
                        className: h.default.listItem,
                        children: (0, s.jsxs)("div", {
                          className: h.default.itemInner,
                          ref: (e) => {
                            k.current[t] = e;
                          },
                          children: [
                            (0, s.jsx)(n.Text, {
                              tag: "h3",
                              className: (0, i.default)(
                                "subtitle dt:h4",
                                h.default.itemTitle
                              ),
                              html: e?.title?.[0]?.desktop,
                              mobileHtml: e?.title?.[0]?.mobile,
                            }),
                            (0, s.jsx)(n.Text, {
                              tag: "p",
                              className: (0, i.default)(
                                "lightSubtitle",
                                h.default.itemContent
                              ),
                              html: e?.subtitle?.[0]?.desktop,
                              mobileHtml: e?.subtitle?.[0]?.mobile,
                            }),
                          ],
                        }),
                      },
                      t
                    )
                  ),
                }),
              ],
            }),
          })
        );
      }
    },
    31261: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        bottom: "section5-module__2p3uJa__bottom",
        section5: "section5-module__2p3uJa__section5",
        sticky: "section5-module__2p3uJa__sticky",
      });
    },
    4442: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section5: () => _ });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(67376),
        n = e.i(36940),
        c = e.i(3074),
        d = e.i(36460),
        u = e.i(40886),
        m = e.i(22477),
        p = e.i(97287),
        f = e.i(18421),
        h = e.i(99840),
        g = e.i(31261);
      function _() {
        let { story: e } = (0, p.useStoryblokContext)(),
          t = e?.content?.section5?.[0];
        if (!t) return null;
        let [r, _] = (0, o.useRect)(),
          [v, y] = (0, o.useRect)(),
          b = (0, l.useRef)(null),
          x = (0, l.useRef)(null),
          { isSafari: w } = (0, u.useDeviceDetection)();
        return (
          (0, m.useScrollTrigger)({
            rect: _,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              x.current?.setProgress(e);
            },
          }),
          (0, m.useScrollTrigger)({
            rect: y,
            start: "top bottom",
            end: "bottom bottom",
            onProgress: ({ progress: e }) => {
              b.current?.setProgress(e);
            },
          }),
          (0, s.jsx)(f.Section, {
            mask: "right",
            leave: "zoomBlur",
            className: (0, i.default)(g.default.section5),
            ref: r,
            children: (0, s.jsxs)("div", {
              className: (0, i.default)(
                g.default.sticky,
                "dr-layout-block-inner overflow-clip relative"
              ),
              children: [
                (0, s.jsxs)("div", {
                  className:
                    "absolute dt:left-[50%] dt:top-[50%] max-dt:inset-0 w-full dt:min-h-full dt:translate-x-[-50%] dt:translate-y-[-50%] dt:aspect-[1920/1080]",
                  children: [
                    (0, s.jsx)(a.Image, {
                      src: "/images/woman.png",
                      fill: !0,
                      className: "desktop-only",
                    }),
                    (0, s.jsx)(a.Image, {
                      src: "/images/woman-mobile.png",
                      fill: !0,
                      className: "mobile-only",
                    }),
                    (0, s.jsx)("div", {
                      className:
                        "absolute dr-w-300 dt:dr-w-500 aspect-square top-[66%] dt:top-[61%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10",
                      children: w
                        ? (0, s.jsx)(a.Image, {
                            src: "/images/audio.png",
                            fill: !0,
                          })
                        : (0, s.jsx)(d.Video, {
                            src: "/videos/audio.webm",
                            autoPlay: !0,
                            muted: !0,
                            loop: !0,
                            playsInline: !0,
                            className: "w-full h-full object-cover",
                          }),
                    }),
                  ],
                }),
                (0, s.jsx)(h.TitleSubtitle, {
                  title: t?.title?.[0]?.desktop,
                  mobileTitle: t?.title?.[0]?.mobile,
                  subtitle: t?.subtitle?.[0]?.desktop,
                  mobileSubtitle: t?.subtitle?.[0]?.mobile,
                  centered: !0,
                  ref: x,
                }),
                (0, s.jsx)("div", {
                  className: g.default.bottom,
                  ref: v,
                  children: (0, s.jsx)(n.SplitText, {
                    ref: b,
                    type: "lines",
                    className: "lightSubtitle",
                    children: (0, c.html)(t?.caption?.[0]?.desktop),
                  }),
                }),
              ],
            }),
          })
        );
      }
    },
    12661: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        amp: "section6-module__MLXB0a__amp",
        legend: "section6-module__MLXB0a__legend",
        section6: "section6-module__MLXB0a__section6",
        size: "section6-module__MLXB0a__size",
        sizeLabel: "section6-module__MLXB0a__sizeLabel",
        sizes: "section6-module__MLXB0a__sizes",
        sticky: "section6-module__MLXB0a__sticky",
        value: "section6-module__MLXB0a__value",
      });
    },
    87463: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section6: () => v });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(25292),
        n = e.i(3074),
        c = e.i(40886),
        d = e.i(22477),
        u = e.i(97287),
        m = e.i(47103),
        p = e.i(70091),
        f = e.i(70471),
        h = e.i(18421),
        g = e.i(99840),
        _ = e.i(12661);
      function v() {
        let { story: e } = (0, u.useStoryblokContext)(),
          t = e?.content?.section6?.[0];
        if (!t) return null;
        let r = (0, l.useRef)(null),
          [v, y] = (0, o.useRect)(),
          b = (0, l.useRef)(null),
          x = (0, l.useRef)([]),
          w = (0, l.useRef)(null),
          k = (0, l.useRef)(null),
          S = (0, l.useRef)(null),
          { isMobile: j } = (0, c.useDeviceDetection)();
        return (
          (0, d.useScrollTrigger)({
            rect: y,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              w.current?.setProgress(e);
            },
          }),
          (0, d.useScrollTrigger)(
            {
              rect: y,
              start: `top ${j ? "bottom" : "center"}`,
              end: "top top",
              onProgress: ({ progress: e }) => {
                (0, m.fromTo)(
                  k.current,
                  { animatedNumber: 0 },
                  { animatedNumber: 70 },
                  j ? e : (0, m.mapRange)(0.7, 1, e, 0, 1, !0),
                  {
                    ease: "easeOutSine",
                    render: (e, { y: t, animatedNumber: r }) => {
                      k.current &&
                        (k.current.textContent = String(Math.round(r)));
                    },
                  }
                );
              },
            },
            [j]
          ),
          (0, d.useScrollTrigger)({
            rect: y,
            start: "top center",
            end: "bottom bottom",
            onProgress: ({ progress: e }) => {
              r.current?.setProgress(e);
            },
          }),
          (0, d.useScrollTrigger)({
            rect: y,
            start: "top top",
            end: "bottom bottom",
            onProgress: ({ progress: e }) => {
              (0, m.fromTo)(
                b.current,
                { y: 80 },
                { y: 0 },
                (0, m.mapRange)(0, 0.6, e, 0, 1, !0),
                {
                  ease: "easeOutSine",
                  render: (e, { y: t }) => {
                    !j &&
                      e instanceof HTMLElement &&
                      e.style.setProperty("transform", `translateY(${t}%)`);
                  },
                }
              ),
                (0, m.fromTo)(
                  x.current,
                  { y: 100, animatedNumber: 0 },
                  { y: 0, animatedNumber: 74 },
                  j ? e : (0, m.mapRange)(0.4, 1, e, 0, 1, !0),
                  {
                    ease: "easeOutSine",
                    render: (e, { y: t, animatedNumber: r }) => {
                      S.current &&
                        (S.current.textContent = String(Math.round(r))),
                        e instanceof HTMLElement &&
                          e.style.setProperty("transform", `translateY(${t}%)`);
                    },
                  }
                );
            },
          }),
          (0, s.jsx)(h.Section, {
            mask: "left",
            leave: "zoomBlur",
            className: (0, i.default)(_.default.section6),
            ref: v,
            children: (0, s.jsxs)("div", {
              className: (0, i.default)(
                _.default.sticky,
                "dr-layout-block-inner overflow-clip"
              ),
              children: [
                (0, s.jsx)(p.BlurryGradient, {}),
                (0, s.jsx)(a.FrameSequence, {
                  ref: r,
                  className:
                    "absolute bottom-0 dt:top-0 left-[-10%] dt:left-0 right-0 top-[33%]",
                  frames: Array.from(
                    { length: 65 },
                    (e, t) => `/videos/transform/${t + 1}.webp`
                  ),
                  mobileFrames: Array.from(
                    { length: 32 },
                    (e, t) => `/videos/transform-mobile/${2 * t + 1}.webp`
                  ),
                }),
                (0, s.jsx)(g.TitleSubtitle, {
                  title: t?.title?.[0]?.desktop,
                  mobileTitle: t?.title?.[0]?.mobile,
                  subtitle: t?.subtitle?.[0]?.desktop,
                  mobileSubtitle: t?.subtitle?.[0]?.mobile,
                  ref: w,
                }),
                (0, s.jsxs)("div", {
                  className: (0, i.default)(
                    "h3 transform-[translateY(70%)]",
                    _.default.sizes
                  ),
                  ref: b,
                  children: [
                    (0, s.jsxs)("div", {
                      className: _.default.size,
                      children: [
                        (0, s.jsx)("div", {
                          className: (0, i.default)(
                            "lightSubtitle",
                            "text-white-40",
                            _.default.label
                          ),
                          children: "Up to",
                        }),
                        (0, s.jsxs)("div", {
                          className: _.default.value,
                          children: [
                            (0, s.jsxs)("span", {
                              children: [
                                (0, s.jsx)("span", {
                                  ref: k,
                                  className: "tabular-nums",
                                  children: "70",
                                }),
                                " ",
                                "iPDs",
                              ],
                            }),
                            (0, s.jsx)("span", {
                              className: (0, i.default)(
                                "sizeLabel",
                                _.default.sizeLabel
                              ),
                              children: "Regular",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsx)("div", {
                      className: (0, i.default)(
                        _.default.amp,
                        "overflow-y-clip self-start"
                      ),
                      children: (0, s.jsx)("div", {
                        ref: (e) => {
                          x.current[0] = e;
                        },
                        children: (0, s.jsx)(f.GradientText, { children: "&" }),
                      }),
                    }),
                    (0, s.jsx)("div", {
                      className: "overflow-clip",
                      children: (0, s.jsxs)("div", {
                        className: _.default.size,
                        ref: (e) => {
                          x.current[1] = e;
                        },
                        children: [
                          (0, s.jsx)("div", {
                            className: (0, i.default)(
                              "lightSubtitle",
                              "text-white-40",
                              _.default.label
                            ),
                            children: "Up to",
                          }),
                          (0, s.jsxs)("div", {
                            className: _.default.value,
                            children: [
                              (0, s.jsxs)("span", {
                                children: [
                                  (0, s.jsx)("span", {
                                    ref: S,
                                    className: "tabular-nums",
                                    children: "74",
                                  }),
                                  " ",
                                  "iPDs",
                                ],
                              }),
                              (0, s.jsx)("span", {
                                className: (0, i.default)(
                                  "sizeLabel",
                                  _.default.sizeLabel
                                ),
                                children: "Large",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                (0, s.jsx)(n.Text, {
                  className: (0, i.default)(
                    "legend",
                    "text-white-40",
                    _.default.legend
                  ),
                  html: t?.caption?.[0]?.desktop,
                  mobileHtml: t?.caption?.[0]?.mobile,
                }),
              ],
            }),
          })
        );
      }
    },
    73250: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        digit: "odometer-module__9-L4cW__digit",
        digitColumn: "odometer-module__9-L4cW__digitColumn",
        digitStack: "odometer-module__9-L4cW__digitStack",
        odometer: "odometer-module__9-L4cW__odometer",
      });
    },
    41081: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ Odometer: () => t });
        var s = e.i(58064),
          i = e.i(60566),
          o = e.i(4371),
          l = e.i(38653),
          a = e.i(73250);
        let t = ({
          startValue: e,
          endValue: t,
          className: r,
          padLength: n = 2,
          digitJSX: c = (e) => `${e}`,
          ref: d,
        }) => {
          let u = (0, l.useRef)(0),
            m = (0, l.useRef)([]),
            [p, f] = (0, o.useResizeObserver)(),
            h = (0, l.useRef)([]),
            g = (0, l.useCallback)(
              (e) =>
                String(Math.floor(e))
                  .padStart(n, "0")
                  .split("")
                  .map((e) => Number.parseInt(e)),
              [n]
            ),
            _ = () => {
              let r = g(e),
                s = g(t);
              r.forEach((e, t) => {
                let r = m.current[t] || 0,
                  i = s[t],
                  o = h.current[t];
                if (!o) return;
                let l =
                  ((e + ((i - e + 10 + r) % 10) * u.current) % 10) *
                  (f?.contentRect.height || 0);
                o.style.transform = `translate3d(0, ${-l}px, 0)`;
              });
            },
            v = (e) => {
              (u.current = e), _();
            },
            y = (e, t) => {
              (m.current[e] = t), _();
            };
          return (
            (0, l.useImperativeHandle)(d, () => ({
              setProgress: v,
              setDigitOffset: y,
              progress: u,
            })),
            (0, s.jsx)("div", {
              className: (0, i.default)(a.default.odometer, r),
              ref: p,
              children: Array.from({ length: n }).map((e, t) =>
                (0, s.jsx)(
                  "div",
                  {
                    className: a.default.digitColumn,
                    children: (0, s.jsx)("div", {
                      className: a.default.digitStack,
                      ref: (e) => {
                        h.current[t] = e;
                      },
                      children: Array.from({ length: 10 }).map((e, r) =>
                        (0, s.jsx)(
                          "div",
                          {
                            className: a.default.digit,
                            children: (0, s.jsx)("span", { children: c(r, t) }),
                          },
                          r
                        )
                      ),
                    }),
                  },
                  t
                )
              ),
            })
          );
        };
      }
    },
    78568: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        alive: "section7-module__2phnqG__alive",
        content: "section7-module__2phnqG__content",
        contentTitle: "section7-module__2phnqG__contentTitle",
        cta: "section7-module__2phnqG__cta",
        customOdometer: "section7-module__2phnqG__customOdometer",
        digitCol0: "section7-module__2phnqG__digitCol0",
        digitCol1: "section7-module__2phnqG__digitCol1",
        moveInCircle: "section7-module__2phnqG__moveInCircle",
        odometerWrapper: "section7-module__2phnqG__odometerWrapper",
        orb: "section7-module__2phnqG__orb",
        orbMask: "section7-module__2phnqG__orbMask",
        orbWrapper: "section7-module__2phnqG__orbWrapper",
        section7: "section7-module__2phnqG__section7",
        sticky: "section7-module__2phnqG__sticky",
        unit: "section7-module__2phnqG__unit",
      });
    },
    67381: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section7: () => v });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(17170),
        l = e.i(4371),
        a = e.i(38653),
        n = e.i(36940),
        c = e.i(3074),
        d = e.i(22477),
        u = e.i(97287),
        m = e.i(48823),
        p = e.i(47103),
        f = e.i(67022),
        h = e.i(41081),
        g = e.i(18421),
        _ = e.i(78568);
      function v() {
        let { story: e } = (0, u.useStoryblokContext)(),
          t = e?.content?.section7?.[0];
        if (!t) return null;
        let [r, v] = (0, l.useRect)(),
          [y, b] = (0, a.useState)(!1),
          x = (0, a.useRef)(null),
          w = (0, a.useRef)(null),
          k = (0, a.useRef)(null);
        (0, d.useScrollTrigger)({
          rect: v,
          start: "top bottom",
          end: "top top",
          onProgress({ progress: e }) {
            x.current?.setProgress(
              m.easings.easeOutSine((0, p.mapRange)(0.2, 1, e, 0, 1, !0))
            );
          },
        }),
          (0, d.useScrollTrigger)({
            rect: v,
            start: "center bottom",
            end: "bottom bottom",
            onProgress({ progress: e }) {
              w.current?.setProgress((0, p.mapRange)(0.5, 1, e, 0, 1, !0)),
                k.current?.setProgress((0, p.mapRange)(0.75, 1, e, 0, 1, !0));
            },
          });
        let S = (0, a.useCallback)(() => {
          b(!0);
          let e = { value: 0 };
          o.default.to(e, {
            value: 6,
            duration: 2,
            ease: "elastic.out(1,1)",
            onUpdate: () => {
              x.current?.setDigitOffset(1, e.value);
            },
            onComplete: () => {
              setTimeout(() => {
                window.open(t?.cta?.[0]?.url, "_blank");
              }, 1e3);
            },
          });
        }, []);
        return (0, s.jsx)(g.Section, {
          mask: "left",
          className: (0, i.default)(_.default.section7),
          ref: r,
          children: (0, s.jsxs)("div", {
            className: (0, i.default)(
              _.default.sticky,
              "dr-layout-block-inner"
            ),
            children: [
              (0, s.jsx)("div", {
                className: _.default.orbWrapper,
                children: (0, s.jsx)("div", {
                  className: _.default.orbMask,
                  children: (0, s.jsx)("div", { className: _.default.orb }),
                }),
              }),
              (0, s.jsxs)("div", {
                className: _.default.odometerWrapper,
                children: [
                  (0, s.jsx)(h.Odometer, {
                    startValue: 20,
                    endValue: 52,
                    className: _.default.customOdometer,
                    ref: x,
                    digitJSX: (e, t) =>
                      0 === t
                        ? (0, s.jsx)("span", {
                            className: (0, i.default)(
                              _.default.digit,
                              _.default.digitCol0
                            ),
                            children: e,
                          })
                        : (0, s.jsx)("span", {
                            className: (0, i.default)(
                              _.default.digit,
                              _.default.digitCol1
                            ),
                            children: e,
                          }),
                  }),
                  (0, s.jsx)("span", {
                    className: _.default.unit,
                    children: "°",
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className: _.default.content,
                children: [
                  (0, s.jsx)(n.SplitText, {
                    as: "h2",
                    className: (0, i.default)("h4", _.default.contentTitle),
                    ref: w,
                    type: "lines",
                    children: (0, c.html)(t?.title?.[0]?.desktop),
                  }),
                  (0, s.jsx)(n.SplitText, {
                    as: "span",
                    className: "legendSmall text-white-40",
                    ref: k,
                    type: "lines",
                    children: (0, c.html)(t?.subtitle?.[0]?.desktop),
                  }),
                  (0, s.jsx)(f.SmallButton, {
                    theme: "white",
                    onClick: S,
                    disabled: y,
                    className: _.default.cta,
                    tag: "button",
                    children: t?.cta?.[0]?.text,
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    78280: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        card: "section8-module__TLrZFW__card",
        cardContent: "section8-module__TLrZFW__cardContent",
        cardCtas: "section8-module__TLrZFW__cardCtas",
        cards: "section8-module__TLrZFW__cards",
        cta: "section8-module__TLrZFW__cta",
        section8: "section8-module__TLrZFW__section8",
        sticky: "section8-module__TLrZFW__sticky",
      });
    },
    13845: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section8: () => y });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(67376),
        n = e.i(3074),
        c = e.i(36460),
        d = e.i(40886),
        u = e.i(22477),
        m = e.i(97287),
        p = e.i(47103),
        f = e.i(67022),
        h = e.i(55166),
        g = e.i(18421),
        _ = e.i(99840),
        v = e.i(78280);
      function y() {
        let { story: e } = (0, m.useStoryblokContext)(),
          t = e?.content?.section8?.[0];
        if (!t) return null;
        let r = (0, l.useRef)(null),
          y = (0, l.useRef)([]),
          [b, x] = (0, o.useRect)(),
          { isMobile: w } = (0, d.useDeviceDetection)();
        (0, u.useScrollTrigger)({
          rect: x,
          start: "top center",
          end: "top top",
          onProgress: ({ progress: e }) => {
            if ((r.current?.setProgress(e), e <= 0.5))
              for (let e of y.current) e && (e.currentTime = 0);
            if (e >= 0.7)
              for (let e of y.current)
                e?.paused &&
                  e.currentTime < e.duration &&
                  (e.play(), (e.currentTime = 0));
            else for (let e of y.current) e && e.pause();
          },
        });
        let k = (0, l.useRef)([]);
        (0, u.useScrollTrigger)(
          {
            rect: x,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              w ||
                (0, p.fromTo)(
                  k.current,
                  { y: 100, scale: 0.5, clipPath: 20 },
                  { y: 0, scale: 1, clipPath: 0 },
                  e,
                  {
                    ease: "easeOutSine",
                    stagger: 0.05,
                    render: (e, { y: t, scale: r, clipPath: s }) => {
                      e instanceof HTMLElement &&
                        (e.style.setProperty(
                          "transform",
                          `translateY(${t}vh) scale(${r})`
                        ),
                        e.style.setProperty(
                          "clip-path",
                          `inset(${s}% round 2.5vw)`
                        ));
                    },
                  }
                );
            },
          },
          [w]
        );
        let S = (0, l.useRef)(null);
        return (0, s.jsx)(g.Section, {
          className: (0, i.default)(v.default.section8),
          ref: b,
          leave: "dezoomBlur",
          children: (0, s.jsxs)("div", {
            className: (0, i.default)(
              v.default.sticky,
              "dr-layout-block-inner"
            ),
            ref: S,
            children: [
              (0, s.jsx)(_.TitleSubtitle, {
                title: t?.title?.[0]?.desktop,
                mobileTitle: t?.title?.[0]?.mobile,
                subtitle: t?.subtitle?.[0]?.desktop,
                mobileSubtitle: t?.subtitle?.[0]?.mobile,
                centered: !0,
                small: !0,
                ref: r,
              }),
              (0, s.jsxs)("div", {
                className: (0, i.default)(
                  v.default.cards,
                  "grid grid-cols-1 dt:grid-cols-3 gap-gap"
                ),
                children: [
                  (0, s.jsxs)(h.Card, {
                    ref: (e) => {
                      k.current[0] = e;
                    },
                    children: [
                      (0, s.jsx)("div", {
                        className: "absolute inset-0",
                        children: (0, s.jsx)(c.Video, {
                          src: "/videos/electrochromic.webm",
                          muted: !0,
                          playsInline: !0,
                          className: (0, i.default)(
                            "absolute w-full h-full object-cover"
                          ),
                          ref: (e) => {
                            y.current[0] = e;
                          },
                        }),
                      }),
                      (0, s.jsxs)("div", {
                        className: v.default.cardContent,
                        children: [
                          (0, s.jsx)(n.Text, {
                            tag: "h3",
                            className: "h4",
                            html: t?.cards?.[0]?.title?.[0]?.desktop,
                            mobileHtml: t?.cards?.[0]?.title?.[0]?.mobile,
                          }),
                          (0, s.jsx)(n.Text, {
                            tag: "p",
                            className: "lightSubtitle text-white-40",
                            html: t?.cards?.[0]?.subtitle?.[0]?.desktop,
                            mobileHtml: t?.cards?.[0]?.subtitle?.[0]?.mobile,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsxs)(h.Card, {
                    ref: (e) => {
                      k.current[1] = e;
                    },
                    children: [
                      (0, s.jsx)("div", {
                        className: "absolute inset-0",
                        children: (0, s.jsx)(c.Video, {
                          src: "/videos/demo3.webm",
                          mobileSrc: "/videos/demo3-mobile.webm",
                          muted: !0,
                          playsInline: !0,
                          className: (0, i.default)(
                            "absolute top-[25%] w-full h-full object-cover circleMask opacity-80"
                          ),
                          ref: (e) => {
                            y.current[1] = e;
                          },
                        }),
                      }),
                      (0, s.jsxs)("div", {
                        className: v.default.cardContent,
                        children: [
                          (0, s.jsx)(n.Text, {
                            tag: "h3",
                            className: "h4",
                            html: t?.cards?.[1]?.title?.[0]?.desktop,
                            mobileHtml: t?.cards?.[1]?.title?.[0]?.mobile,
                          }),
                          (0, s.jsx)(n.Text, {
                            tag: "p",
                            className: "lightSubtitle text-white-40",
                            html: t?.cards?.[1]?.subtitle?.[0]?.desktop,
                            mobileHtml: t?.cards?.[1]?.subtitle?.[0]?.mobile,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsxs)(h.Card, {
                    ref: (e) => {
                      k.current[2] = e;
                    },
                    className: v.default.card,
                    children: [
                      (0, s.jsx)("div", {
                        className: "absolute inset-0",
                        children: (0, s.jsx)(a.Image, {
                          src: "/images/glass.png",
                          className: (0, i.default)(
                            "absolute left-[0%] top-[-0%] !w-full !h-full"
                          ),
                          desktopSize: "30vw",
                          mobileSize: "100vw",
                        }),
                      }),
                      (0, s.jsxs)("div", {
                        className: v.default.cardContent,
                        children: [
                          (0, s.jsx)(n.Text, {
                            tag: "h3",
                            className: "h4",
                            html: t?.cards?.[2]?.title?.[0]?.desktop,
                            mobileHtml: t?.cards?.[2]?.title?.[0]?.mobile,
                          }),
                          (0, s.jsxs)("div", {
                            className: v.default.cardCtas,
                            children: [
                              (0, s.jsx)(f.SmallButton, {
                                reducedPadding: !0,
                                className: v.default.cta,
                                theme: "white",
                                link: t?.cards?.[2]?.cta?.[0]?.url,
                                children: t?.cards?.[2]?.cta?.[0]?.text,
                              }),
                              (0, s.jsx)(f.SmallButton, {
                                reducedPadding: !0,
                                className: v.default.cta,
                                theme: "dark",
                                link: t?.cards?.[2]?.cta?.[1]?.url,
                                children: t?.cards?.[2]?.cta?.[1]?.text,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    4374: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        cardContent: "section9-module__1xDnga__cardContent",
        cardCtas: "section9-module__1xDnga__cardCtas",
        cards: "section9-module__1xDnga__cards",
        cta: "section9-module__1xDnga__cta",
        lastCard: "section9-module__1xDnga__lastCard",
        section9: "section9-module__1xDnga__section9",
        sticky: "section9-module__1xDnga__sticky",
      });
    },
    76078: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section9: () => v });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(67376),
        n = e.i(3074),
        c = e.i(36460),
        d = e.i(40886),
        u = e.i(22477),
        m = e.i(97287),
        p = e.i(47103),
        f = e.i(55166),
        h = e.i(18421),
        g = e.i(99840),
        _ = e.i(4374);
      function v() {
        let { story: e } = (0, m.useStoryblokContext)(),
          t = e?.content?.section9?.[0];
        if (!t) return null;
        let r = (0, l.useRef)(null),
          v = (0, l.useRef)([]),
          [y, b] = (0, o.useRect)(),
          [x, w] = (0, o.useRect)(),
          { isMobile: k } = (0, d.useDeviceDetection)();
        (0, u.useScrollTrigger)(
          {
            rect: b,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              r.current?.setProgress(e),
                k ||
                  (0, p.fromTo)(
                    v.current,
                    { y: 100, scale: 0.5, clipPath: 20 },
                    { y: 0, scale: 1, clipPath: 0 },
                    e,
                    {
                      ease: "easeOutSine",
                      stagger: 0.05,
                      render: (e, { y: t, scale: r, clipPath: s }) => {
                        e instanceof HTMLElement &&
                          (e.style.setProperty(
                            "transform",
                            `translateY(${t}vh) scale(${r})`
                          ),
                          e.style.setProperty(
                            "clip-path",
                            `inset(${s}% round 2.5vw)`
                          ));
                      },
                    }
                  );
            },
          },
          [k]
        ),
          (0, u.useScrollTrigger)(
            {
              rect: w,
              start: "top bottom",
              end: "bottom bottom",
              onProgress: ({ progress: e }) => {
                (0, p.fromTo)(
                  w.element,
                  { y: 50, scale: 0.5, clipPath: 20 },
                  { y: 0, scale: 1, clipPath: 0 },
                  e,
                  {
                    ease: "easeOutSine",
                    render: (e, { scale: t, clipPath: r }) => {
                      e instanceof HTMLElement &&
                        (e.style.setProperty("transform", `scale(${t})`),
                        e.style.setProperty(
                          "clip-path",
                          `inset(${r}% round ${k ? "8.53vw" : "2.5vw"})`
                        ));
                    },
                  }
                );
              },
            },
            [k]
          );
        let S = (0, l.useRef)(null);
        return (0, s.jsx)(h.Section, {
          mask: "right",
          leave: "dezoomBlur",
          className: (0, i.default)(_.default.section9),
          ref: y,
          children: (0, s.jsxs)("div", {
            className: (0, i.default)(
              _.default.sticky,
              "dr-layout-block-inner"
            ),
            ref: S,
            children: [
              (0, s.jsx)(g.TitleSubtitle, {
                title: t?.title?.[0]?.desktop,
                mobileTitle: t?.title?.[0]?.mobile,
                subtitle: t?.subtitle?.[0]?.desktop,
                mobileSubtitle: t?.subtitle?.[0]?.mobile,
                centered: !0,
                small: !0,
                ref: r,
              }),
              (0, s.jsxs)("div", {
                className: "flex flex-col gap-gap",
                children: [
                  (0, s.jsxs)("div", {
                    className: (0, i.default)(
                      _.default.cards,
                      "grid grid-cols-1 dt:grid-cols-3 gap-gap"
                    ),
                    children: [
                      (0, s.jsxs)(f.Card, {
                        ref: (e) => {
                          v.current[0] = e;
                        },
                        children: [
                          (0, s.jsx)(a.Image, {
                            src: "/images/section9-1.png",
                            fill: !0,
                            desktopSize: "50vw",
                            mobileSize: "100vw",
                          }),
                          (0, s.jsx)("div", {
                            className: _.default.cardContent,
                            children: (0, s.jsx)(n.Text, {
                              tag: "h3",
                              className: "h4",
                              html: t?.cards?.[0]?.title?.[0]?.desktop,
                              mobileHtml: t?.cards?.[0]?.title?.[0]?.mobile,
                            }),
                          }),
                        ],
                      }),
                      (0, s.jsxs)(f.Card, {
                        ref: (e) => {
                          v.current[1] = e;
                        },
                        children: [
                          (0, s.jsx)(a.Image, {
                            src: "/images/section9-2.png",
                            fill: !0,
                            desktopSize: "50vw",
                            mobileSize: "100vw",
                          }),
                          (0, s.jsxs)("div", {
                            className: _.default.cardContent,
                            children: [
                              (0, s.jsx)(n.Text, {
                                tag: "h3",
                                className: "h4",
                                html: t?.cards?.[1]?.title?.[0]?.desktop,
                                mobileHtml: t?.cards?.[1]?.title?.[0]?.mobile,
                              }),
                              (0, s.jsx)(n.Text, {
                                tag: "p",
                                className: "lightSubtitle text-white-40",
                                html: t?.cards?.[1]?.subtitle?.[0]?.desktop,
                                mobileHtml:
                                  t?.cards?.[1]?.subtitle?.[0]?.mobile,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)(f.Card, {
                        align: "bottom",
                        ref: (e) => {
                          v.current[2] = e;
                        },
                        children: [
                          (0, s.jsx)(a.Image, {
                            src: "/images/section9-3.png",
                            fill: !0,
                            desktopSize: "50vw",
                            mobileSize: "100vw",
                          }),
                          (0, s.jsx)("div", {
                            className: _.default.cardContent,
                            children: (0, s.jsx)(n.Text, {
                              tag: "h3",
                              className: "h4 text-center",
                              html: t?.cards?.[2]?.title?.[0]?.desktop,
                              mobileHtml: t?.cards?.[2]?.title?.[0]?.mobile,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: (0, i.default)(
                      _.default.lastCard,
                      "grid grid-cols-1 dt:grid-cols-3 gap-gap"
                    ),
                    ref: (e) => {
                      x(e);
                    },
                    children: (0, s.jsxs)(f.Card, {
                      className: "dt:col-span-3",
                      children: [
                        (0, s.jsxs)("div", {
                          className: "absolute inset-0",
                          children: [
                            (0, s.jsx)(a.Image, {
                              src: "/images/demo4-bg.png",
                              fill: !0,
                              className: "desktop-only",
                            }),
                            (0, s.jsx)("div", {
                              className:
                                "absolute top-[33%] dt:top-0 left-0 right-0  dt:left-[22%] dt:right-[-15%] bottom-[0%] circleMask",
                              children: (0, s.jsx)(c.Video, {
                                className:
                                  "absolute w-full h-full object-cover",
                                src: "/videos/demo4.webm",
                                mobileSrc: "/videos/demo4-mobile.webm",
                                autoPlay: !0,
                                loop: !0,
                                muted: !0,
                                playsInline: !0,
                              }),
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className: _.default.cardContent,
                          children: [
                            (0, s.jsx)(n.Text, {
                              tag: "h3",
                              className: "h3",
                              html: t?.cards?.[3]?.title?.[0]?.desktop,
                              mobileHtml: t?.cards?.[3]?.title?.[0]?.mobile,
                            }),
                            (0, s.jsx)(n.Text, {
                              tag: "p",
                              className: "lightSubtitle text-white-40",
                              html: t?.cards?.[3]?.subtitle?.[0]?.desktop,
                              mobileHtml: t?.cards?.[3]?.subtitle?.[0]?.mobile,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    31145: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        button: "big-button-module__Sa8nAa__button",
        buttonHover: "big-button-module__Sa8nAa__buttonHover",
        white: "big-button-module__Sa8nAa__white",
      });
    },
    67064: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ BigButton: () => a });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(96983),
        l = e.i(31145);
      function a(e) {
        let t,
          r,
          a,
          n,
          c = (0, i.c)(10),
          { theme: d, children: u, link: m, ref: p } = e,
          f = d && l.default[d];
        c[0] !== f
          ? ((t = [l.default.button, "bigButtonLabel uppercase", f].filter(
              Boolean
            )),
            (c[0] = f),
            (c[1] = t))
          : (t = c[1]);
        let h = t.join(" ");
        return (
          c[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, s.jsx)("div", { className: l.default.buttonHover })),
              (c[2] = r))
            : (r = c[2]),
          c[3] !== u
            ? ((a = (0, s.jsx)("span", { children: u })),
              (c[3] = u),
              (c[4] = a))
            : (a = c[4]),
          c[5] !== m || c[6] !== p || c[7] !== h || c[8] !== a
            ? ((n = (0, s.jsxs)(o.Link, {
                href: m,
                className: h,
                ref: p,
                children: [r, a],
              })),
              (c[5] = m),
              (c[6] = p),
              (c[7] = h),
              (c[8] = a),
              (c[9] = n))
            : (n = c[9]),
          n
        );
      }
    },
    23433: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        content: "credit-claim-module__K0rRNG__content",
        creditClaim: "credit-claim-module__K0rRNG__creditClaim",
        text: "credit-claim-module__K0rRNG__text",
        title: "credit-claim-module__K0rRNG__title",
      });
    },
    94478: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ CreditClaim: () => n });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(67022),
        a = e.i(23433);
      function n(e) {
        let t,
          r,
          n,
          c,
          d,
          u,
          m,
          p = (0, i.c)(16),
          { ref: f, title: h, text: g, cta: _ } = e;
        p[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = (0, o.default)(a.default.title, "h4")), (p[0] = t))
          : (t = p[0]),
          p[1] !== h
            ? ((r = (0, s.jsx)("h2", { className: t, children: h })),
              (p[1] = h),
              (p[2] = r))
            : (r = p[2]),
          p[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = (0, o.default)(a.default.text, "lightSubtitle")),
              (p[3] = n))
            : (n = p[3]),
          p[4] !== g
            ? ((c = (0, s.jsx)("p", { className: n, children: g })),
              (p[4] = g),
              (p[5] = c))
            : (c = p[5]),
          p[6] !== r || p[7] !== c
            ? ((d = (0, s.jsxs)("div", {
                className: a.default.content,
                children: [r, c],
              })),
              (p[6] = r),
              (p[7] = c),
              (p[8] = d))
            : (d = p[8]);
        let v = _?.url,
          y = _?.text;
        return (
          p[9] !== v || p[10] !== y
            ? ((u = (0, s.jsx)(l.SmallButton, {
                link: v,
                theme: "orange",
                children: y,
              })),
              (p[9] = v),
              (p[10] = y),
              (p[11] = u))
            : (u = p[11]),
          p[12] !== f || p[13] !== d || p[14] !== u
            ? ((m = (0, s.jsxs)("div", {
                className: a.default.creditClaim,
                ref: f,
                children: [d, u],
              })),
              (p[12] = f),
              (p[13] = d),
              (p[14] = u),
              (p[15] = m))
            : (m = p[15]),
          m
        );
      }
    },
    87754: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        content: "section21-module__B-N36W__content",
        copyright: "section21-module__B-N36W__copyright",
        inner: "section21-module__B-N36W__inner",
        section21: "section21-module__B-N36W__section21",
      });
    },
    77598: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Section21: () => _ });
      var s = e.i(58064),
        i = e.i(60566),
        o = e.i(4371),
        l = e.i(38653),
        a = e.i(67376),
        n = e.i(40886),
        c = e.i(22477),
        d = e.i(97287),
        u = e.i(47103),
        m = e.i(67064),
        p = e.i(94478),
        f = e.i(18421),
        h = e.i(99840),
        g = e.i(87754);
      function _() {
        let { story: e } = (0, d.useStoryblokContext)(),
          t = e?.content?.section21?.[0];
        if (!t) return null;
        let [r, _] = (0, o.useRect)(),
          v = (0, l.useRef)(null),
          y = (0, l.useRef)(null),
          b = (0, l.useRef)(null),
          { isMobile: x } = (0, n.useDeviceDetection)();
        return (
          (0, c.useScrollTrigger)(
            {
              rect: _,
              start: "top bottom",
              end: "top top",
              onProgress: ({ progress: e }) => {
                (0, u.fromTo)(
                  _.element,
                  { clipPath: 20, borderRadius: x ? 17 : 5 },
                  { clipPath: 0, borderRadius: 0 },
                  e,
                  {
                    ease: "easeOutSine",
                    render: (e, { clipPath: t, borderRadius: r }) => {
                      e instanceof HTMLElement &&
                        e.style.setProperty(
                          "clip-path",
                          `inset(${t}% round ${r}vw)`
                        );
                    },
                  }
                );
              },
            },
            [x]
          ),
          (0, c.useScrollTrigger)({
            rect: _,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              b.current?.setProgress(e);
            },
          }),
          (0, c.useScrollTrigger)({
            rect: _,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              (0, u.fromTo)(
                v.current,
                { y: 25, scale: 0.6 },
                { y: 0, scale: 1 },
                e,
                {
                  ease: "easeOutSine",
                  render: (e, { y: t, scale: r }) => {
                    e instanceof HTMLElement &&
                      e.style.setProperty(
                        "transform",
                        `translateY(${t}vh) scale(${r}) ${
                          0 !== t && "translateZ(0)"
                        }`
                      );
                  },
                }
              );
            },
          }),
          (0, c.useScrollTrigger)({
            rect: _,
            start: "top center",
            end: "top top",
            onProgress: ({ progress: e }) => {
              (0, u.fromTo)(
                y.current,
                { y: 50, scale: 0.4 },
                { y: 0, scale: 1 },
                e,
                {
                  ease: "easeOutSine",
                  render: (e, { y: t, scale: r }) => {
                    e instanceof HTMLElement &&
                      e.style.setProperty(
                        "transform",
                        `translateY(${t}vh) scale(${r}) ${
                          0 !== t && "translateZ(0)"
                        }`
                      );
                  },
                }
              );
            },
          }),
          (0, s.jsx)(f.Section, {
            className: g.default.section21,
            ref: r,
            snap: "start",
            children: (0, s.jsxs)("div", {
              className: g.default.inner,
              children: [
                (0, s.jsx)(a.Image, { src: "/images/section21.png", fill: !0 }),
                (0, s.jsxs)("div", {
                  className: g.default.content,
                  children: [
                    (0, s.jsx)(h.TitleSubtitle, {
                      small: !0,
                      ref: b,
                      title: t?.title?.[0]?.desktop,
                      mobileTitle: t?.title?.[0]?.mobile,
                      subtitle: t?.subtitle?.[0]?.desktop,
                      mobileSubtitle: t?.subtitle?.[0]?.mobile,
                    }),
                    (0, s.jsx)(m.BigButton, {
                      theme: "white",
                      link: t?.cta?.[0]?.url,
                      ref: v,
                      children: t?.cta?.[0]?.text,
                    }),
                  ],
                }),
                (0, s.jsx)(p.CreditClaim, {
                  ref: y,
                  title: t?.cards?.[0]?.title?.[0]?.desktop,
                  text: t?.cards?.[0]?.subtitle?.[0]?.desktop,
                  cta: t?.cards?.[0]?.cta?.[0],
                }),
                (0, s.jsx)("p", {
                  className: (0, i.default)("text14_21", g.default.copyright),
                  children: "VITURE © 2025",
                }),
              ],
            }),
          })
        );
      }
    },
    55366: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e;
      s.exports = e.r(41842);
    },
    22508: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        bannerDesktop: "banner-desktop-module__RDsdcW__bannerDesktop",
        content: "banner-desktop-module__RDsdcW__content",
        text: "banner-desktop-module__RDsdcW__text",
      });
    },
    69462: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ BannerDesktop: () => t });
        var s = e.i(58064),
          i = e.i(85444),
          o = e.i(60566),
          l = e.i(17170),
          a = e.i(38653),
          n = e.i(96983),
          c = e.i(42928),
          d = e.i(22508);
        let t = () => {
          let e,
            t,
            r,
            m,
            p,
            f = (0, i.c)(6);
          f[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = {
                link: "https://www.viture.com/blog/leading-the-way-in-xr-best-display-best-features",
                content:
                  '<img style="margin: 0px 4px 0px 0px; height: 24px;" src="https://cdn.shopify.com/s/files/1/0762/8760/7065/files/announcement-icon-luma-beast-glasses.png?v=1751800164" alt="glasses" />\n        <span>Leading the Way in XR:&nbsp;</span>\n        <span style="font-weight:700;color: transparent;background-image: linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%);background-clip: text;-webkit-background-clip: text;">Best Display, Best Features</span>',
              }),
              (f[0] = e))
            : (e = f[0]);
          let h = e,
            g = (0, a.useRef)(null),
            _ = (0, c.useStore)(u);
          return (
            f[1] !== _
              ? ((t = () => {
                  if (!g.current) return;
                  let e = l.default.timeline();
                  return (
                    _
                      ? e.to(g.current, {
                          yPercent: -100,
                          duration: 0.4,
                          ease: "power2.in",
                          overwrite: "auto",
                        })
                      : e.to(g.current, {
                          yPercent: 0,
                          duration: 1,
                          ease: "expo.out",
                          overwrite: "auto",
                        }),
                    () => {
                      e.kill();
                    }
                  );
                }),
                (r = [_]),
                (f[1] = _),
                (f[2] = t),
                (f[3] = r))
              : ((t = f[2]), (r = f[3])),
            (0, a.useLayoutEffect)(t, r),
            f[4] === Symbol.for("react.memo_cache_sentinel")
              ? ((m = (0, o.default)(d.default.bannerDesktop, "desktop-only")),
                (f[4] = m))
              : (m = f[4]),
            f[5] === Symbol.for("react.memo_cache_sentinel")
              ? ((p = (0, s.jsx)("div", {
                  className: m,
                  ref: g,
                  children: (0, s.jsx)(n.Link, {
                    href: h.link,
                    className: d.default.link,
                    children: (0, s.jsx)("div", {
                      className: d.default.content,
                      children: (0, s.jsx)("p", {
                        className: (0, o.default)(
                          "text16_24_normal",
                          d.default.text
                        ),
                        dangerouslySetInnerHTML: { __html: h.content },
                      }),
                    }),
                  }),
                })),
                (f[5] = p))
              : (p = f[5]),
            p
          );
        };
        function u(e) {
          return e.isNavigationCollapsed;
        }
      }
    },
    39515: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        banner: "banner-mobile-module__3zKlBq__banner",
        basePrice: "banner-mobile-module__3zKlBq__basePrice",
        buyLink: "banner-mobile-module__3zKlBq__buyLink",
        content: "banner-mobile-module__3zKlBq__content",
        glassesContainer: "banner-mobile-module__3zKlBq__glassesContainer",
        linkGradient: "banner-mobile-module__3zKlBq__linkGradient",
        row: "banner-mobile-module__3zKlBq__row",
      });
    },
    41013: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ BannerMobile: () => m });
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(17170),
        a = e.i(38653),
        n = e.i(96983),
        c = e.i(42928),
        d = e.i(39515);
      function u() {
        let e,
          t,
          r = (0, i.c)(2);
        return (
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, s.jsx)("path", {
                fill: "url(#a)",
                d: "M45.0344 1.838c-.3897-.3155-1.2154-.1485-2.8948-.3804-1.401-.1949-4.2309-.5289-8.4711-.5289-5.0567 0-7.5805 1.1784-8.6011 1.4753-1.0206.2969-1.7072.2598-2.0041.2598-.2969 0-.9835.037-2.0041-.2598-1.0206-.297-3.5351-1.466-8.5918-1.466-4.2309 0-7.0608.334-8.4711.5289-1.6701.232-2.5052.0649-2.8949.3804-.3896.3154-.2876 1.067-.2876 1.4288 0 .3619 0 1.0856.5567 1.3176.5567.232.9186.065 1.3454.2969.4268.232.8536.8536 1.1134 2.1711.2598 1.3175.5567 4.2959 1.7443 6.0031 1.1784 1.7072 3.3124 2.6629 6.5969 2.5979 3.2846-.0649 4.9547-.5567 6.365-2.0969 1.4103-1.5402 2.134-4.036 2.4587-4.9268.3248-.8907.7516-1.8928 1.1134-2.1711.2598-.1949.7237-.167.9557-.167.232 0 .6866-.0279.9557.167.3618.2783.7886 1.2804 1.1134 2.1711.3247.8907 1.0484 3.3773 2.4587 4.9268 1.4104 1.5402 3.0897 2.032 6.365 2.0969 3.2845.065 5.4185-.8907 6.5969-2.5979 1.1783-1.7072 1.4753-4.6949 1.7443-6.0031.2598-1.3175.6866-1.9392 1.1134-2.1711.4268-.232.7887-.065 1.3454-.297.5567-.2319.5567-.9556.5567-1.3175 0-.3618.1021-1.1134-.2876-1.4288l.0092-.0093Z",
              })),
              (r[0] = e))
            : (e = r[0]),
          r[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((t = (0, s.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "46",
                height: "16",
                fill: "none",
                "aria-hidden": "true",
                children: [
                  e,
                  (0, s.jsx)("defs", {
                    children: (0, s.jsxs)("linearGradient", {
                      id: "a",
                      x1: ".8018",
                      x2: "45.202",
                      y1: "15.6658",
                      y2: "5.6058",
                      gradientUnits: "userSpaceOnUse",
                      children: [
                        (0, s.jsx)("stop", { stopColor: "#FF2900" }),
                        (0, s.jsx)("stop", {
                          offset: ".6058",
                          stopColor: "#FE7A60",
                        }),
                        (0, s.jsx)("stop", {
                          offset: "1",
                          stopColor: "#581DFF",
                        }),
                      ],
                    }),
                  }),
                ],
              })),
              (r[1] = t))
            : (t = r[1]),
          t
        );
      }
      function m() {
        let e,
          t,
          r,
          m,
          f,
          h,
          g,
          _,
          v = (0, i.c)(10),
          y = (0, c.useStore)(p),
          b = (0, a.useRef)(null),
          [x, w] = (0, a.useState)("");
        v[0] !== y
          ? ((e = () => {
              if (!b.current) return;
              let e = l.default.timeline();
              return (
                y
                  ? (e.to(b.current, {
                      yPercent: 100,
                      duration: 0.4,
                      ease: "power3.in",
                      overwrite: "auto",
                    }),
                    e.to(
                      b.current,
                      {
                        opacity: 0,
                        ease: "power1.out",
                        duration: 0.3,
                        overwrite: "auto",
                      },
                      "<"
                    ))
                  : e.to(b.current, {
                      yPercent: 0,
                      opacity: 1,
                      duration: 1,
                      ease: "expo.out",
                      overwrite: "auto",
                    }),
                window?.location && w(window.location.pathname),
                () => {
                  e.kill();
                }
              );
            }),
            (t = [y]),
            (v[0] = y),
            (v[1] = e),
            (v[2] = t))
          : ((e = v[1]), (t = v[2])),
          (0, a.useLayoutEffect)(e, t),
          v[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, o.default)(d.default.banner, "mobile-only")),
              (v[3] = r))
            : (r = v[3]),
          v[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((m = (0, s.jsx)("div", {
                className: d.default.glassesContainer,
                children: (0, s.jsx)(u, {}),
              })),
              (f = (0, o.default)(
                d.default.basePrice,
                "text16_24_normal",
                "text-white-40"
              )),
              (v[4] = m),
              (v[5] = f))
            : ((m = v[4]), (f = v[5])),
          v[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = (0, s.jsxs)("div", {
                className: d.default.row,
                children: [
                  m,
                  (0, s.jsxs)("div", {
                    className: f,
                    children: [
                      "From ",
                      (0, s.jsx)("strong", {
                        className: "text-white",
                        children: "$399",
                      }),
                    ],
                  }),
                ],
              })),
              (v[6] = h))
            : (h = v[6]);
        let k = `https://www.viture.com/product/viture-luma-xr-glasses${
          "/" !== x ? `?discount=${x.replaceAll("/", "")}` : ""
        }`;
        return (
          v[7] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = (0, s.jsx)("span", {
                className: (0, o.default)(
                  d.default.linkGradient,
                  "text16_24_600"
                ),
                children: "Order Now",
              })),
              (v[7] = g))
            : (g = v[7]),
          v[8] !== k
            ? ((_ = (0, s.jsx)("div", {
                className: r,
                ref: b,
                children: (0, s.jsxs)("div", {
                  className: d.default.content,
                  children: [
                    h,
                    (0, s.jsx)(n.Link, {
                      href: k,
                      className: d.default.buyLink,
                      children: g,
                    }),
                  ],
                }),
              })),
              (v[8] = k),
              (v[9] = _))
            : (_ = v[9]),
          _
        );
      }
      function p(e) {
        return e.isNavigationCollapsed;
      }
    },
    47373: function (e) {
      var { g: t, __dirname: r, m: s, e: i } = e,
        o = "function" == typeof Float32Array;
      function l(e, t, r) {
        return (((1 - 3 * r + 3 * t) * e + (3 * r - 6 * t)) * e + 3 * t) * e;
      }
      function a(e, t, r) {
        return (
          3 * (1 - 3 * r + 3 * t) * e * e + 2 * (3 * r - 6 * t) * e + 3 * t
        );
      }
      function n(e) {
        return e;
      }
      s.exports = function (e, t, r, s) {
        if (!(0 <= e && e <= 1 && 0 <= r && r <= 1))
          throw Error("bezier x values must be in [0, 1] range");
        if (e === t && r === s) return n;
        for (var i = o ? new Float32Array(11) : Array(11), c = 0; c < 11; ++c)
          i[c] = l(0.1 * c, e, r);
        return function (o) {
          return 0 === o
            ? 0
            : 1 === o
            ? 1
            : l(
                (function (t) {
                  for (var s = 0, o = 1; 10 !== o && i[o] <= t; ++o) s += 0.1;
                  var n = s + ((t - i[--o]) / (i[o + 1] - i[o])) * 0.1,
                    c = a(n, e, r);
                  if (c >= 0.001) {
                    for (var d = n, u = 0; u < 4; ++u) {
                      var m = a(d, e, r);
                      if (0 === m) break;
                      var p = l(d, e, r) - t;
                      d -= p / m;
                    }
                    return d;
                  }
                  return 0 === c
                    ? n
                    : (function (e, t, r, s, i) {
                        var o,
                          a,
                          n = 0;
                        do
                          (o = l((a = t + (r - t) / 2), s, i) - e) > 0
                            ? (r = a)
                            : (t = a);
                        while (Math.abs(o) > 1e-7 && ++n < 10);
                        return a;
                      })(t, s, s + 0.1, e, r);
                })(o),
                t,
                s
              );
        };
      };
    },
    72287: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ default: () => o });
      var s = class {
          element;
          options;
          align;
          rect = {};
          wrapperResizeObserver;
          resizeObserver;
          constructor(
            e,
            {
              align: t = ["start"],
              ignoreSticky: r = !0,
              ignoreTransform: s = !1,
            } = {}
          ) {
            (this.element = e),
              (this.options = {
                align: t,
                ignoreSticky: r,
                ignoreTransform: s,
              }),
              (this.align = [t].flat()),
              (this.wrapperResizeObserver = new ResizeObserver(
                this.onWrapperResize
              )),
              this.wrapperResizeObserver.observe(document.body),
              this.onWrapperResize(),
              (this.resizeObserver = new ResizeObserver(this.onResize)),
              this.resizeObserver.observe(this.element),
              this.setRect({
                width: this.element.offsetWidth,
                height: this.element.offsetHeight,
              });
          }
          destroy() {
            this.wrapperResizeObserver.disconnect(),
              this.resizeObserver.disconnect();
          }
          setRect({ top: e, left: t, width: r, height: s, element: i } = {}) {
            (e = e ?? this.rect.top),
              (t = t ?? this.rect.left),
              (r = r ?? this.rect.width),
              (s = s ?? this.rect.height),
              (i = i ?? this.rect.element),
              (e !== this.rect.top ||
                t !== this.rect.left ||
                r !== this.rect.width ||
                s !== this.rect.height ||
                i !== this.rect.element) &&
                ((this.rect.top = e),
                (this.rect.y = e),
                (this.rect.width = r),
                (this.rect.height = s),
                (this.rect.left = t),
                (this.rect.x = t),
                (this.rect.bottom = e + s),
                (this.rect.right = t + r));
          }
          onWrapperResize = () => {
            let e, t;
            if (
              (this.options.ignoreSticky &&
                (function e(t) {
                  "sticky" === getComputedStyle(t).position &&
                    (t.style.setProperty("position", "static"),
                    (t.dataset.sticky = "true")),
                    t.offsetParent && e(t.offsetParent);
                })(this.element),
              this.options.ignoreTransform)
            )
              (e = (function e(t, r = 0) {
                let s = r + t.offsetTop;
                return t.offsetParent ? e(t.offsetParent, s) : s;
              })(this.element)),
                (t = (function e(t, r = 0) {
                  let s = r + t.offsetLeft;
                  return t.offsetParent ? e(t.offsetParent, s) : s;
                })(this.element));
            else {
              let r = this.element.getBoundingClientRect();
              (e =
                r.top +
                (function e(t, r = 0) {
                  let s = r + t.scrollTop;
                  return t.offsetParent
                    ? e(t.offsetParent, s)
                    : s + window.scrollY;
                })(this.element)),
                (t =
                  r.left +
                  (function e(t, r = 0) {
                    let s = r + t.scrollLeft;
                    return t.offsetParent
                      ? e(t.offsetParent, s)
                      : s + window.scrollX;
                  })(this.element));
            }
            this.options.ignoreSticky &&
              (function e(t) {
                t?.dataset?.sticky === "true" &&
                  (t.style.removeProperty("position"), delete t.dataset.sticky),
                  t.offsetParent && e(t.offsetParent);
              })(this.element),
              this.setRect({ top: e, left: t });
          };
          onResize = ([e]) => {
            if (!e?.borderBoxSize[0]) return;
            let t = e.borderBoxSize[0].inlineSize,
              r = e.borderBoxSize[0].blockSize;
            this.setRect({ width: t, height: r });
          };
        },
        i = 0,
        o = class {
          constructor(
            e,
            {
              type: t = "proximity",
              lerp: r,
              easing: s,
              duration: i,
              distanceThreshold: o = "50%",
              debounce: l = 500,
              onSnapStart: a,
              onSnapComplete: n,
            } = {}
          ) {
            (this.lenis = e),
              (this.options = {
                type: t,
                lerp: r,
                easing: s,
                duration: i,
                distanceThreshold: o,
                debounce: l,
                onSnapStart: a,
                onSnapComplete: n,
              }),
              this.onWindowResize(),
              window.addEventListener("resize", this.onWindowResize, !1),
              (this.onSnapDebounced = (function (e, t) {
                let r;
                return function (...s) {
                  let i = this;
                  clearTimeout(r),
                    (r = setTimeout(() => {
                      (r = void 0), e.apply(i, s);
                    }, t));
                };
              })(this.onSnap, this.options.debounce)),
              this.lenis.on("virtual-scroll", this.onSnapDebounced);
          }
          options;
          elements = new Map();
          snaps = new Map();
          viewport = { width: window.innerWidth, height: window.innerHeight };
          isStopped = !1;
          onSnapDebounced;
          destroy() {
            this.lenis.off("virtual-scroll", this.onSnapDebounced),
              window.removeEventListener("resize", this.onWindowResize, !1),
              this.elements.forEach((e) => e.destroy());
          }
          start() {
            this.isStopped = !1;
          }
          stop() {
            this.isStopped = !0;
          }
          add(e, t = {}) {
            let r = i++;
            return (
              this.snaps.set(r, { value: e, userData: t }),
              () => this.snaps.delete(r)
            );
          }
          addElement(e, t = {}) {
            let r = i++;
            return (
              this.elements.set(r, new s(e, t)), () => this.elements.delete(r)
            );
          }
          onWindowResize = () => {
            (this.viewport.width = window.innerWidth),
              (this.viewport.height = window.innerHeight);
          };
          onSnap = () => {
            let e,
              { scroll: t, isHorizontal: r } = this.lenis;
            t = Math.ceil(this.lenis.scroll);
            let s = [...this.snaps.values()];
            if (
              (this.elements.forEach(({ rect: e, align: t }) => {
                let i;
                t.forEach((t) => {
                  "start" === t
                    ? (i = e.top)
                    : "center" === t
                    ? (i = r
                        ? e.left + e.width / 2 - this.viewport.width / 2
                        : e.top + e.height / 2 - this.viewport.height / 2)
                    : "end" === t &&
                      (i = r
                        ? e.left + e.width - this.viewport.width
                        : e.top + e.height - this.viewport.height),
                    "number" == typeof i &&
                      s.push({ value: Math.ceil(i), userData: {} });
                });
              }),
              0 ===
                (s = s.sort((e, t) => Math.abs(e.value) - Math.abs(t.value)))
                  .length)
            )
              return;
            let i = s.findLast(({ value: e }) => e <= t);
            void 0 === i && (i = s[0]);
            let o = Math.abs(t - i.value),
              l = s.find(({ value: e }) => e >= t);
            void 0 === l && (l = s[s.length - 1]);
            let a = o < Math.abs(t - l.value) ? i : l,
              n = Math.abs(t - a.value),
              c = r ? "width" : "height";
            (e =
              "string" == typeof this.options.distanceThreshold &&
              this.options.distanceThreshold.endsWith("%")
                ? (Number(this.options.distanceThreshold.replace("%", "")) /
                    100) *
                  this.viewport[c]
                : "number" == typeof this.options.distanceThreshold
                ? this.options.distanceThreshold
                : this.viewport[c]),
              ("mandatory" === this.options.type ||
                ("proximity" === this.options.type && n <= e)) &&
                this.lenis.scrollTo(a.value, {
                  lerp: this.options.lerp,
                  easing: this.options.easing,
                  duration: this.options.duration,
                  userData: { initiator: "snap" },
                  onStart: () => {
                    this.options.onSnapStart?.(a);
                  },
                  onComplete: () => {
                    this.options.onSnapComplete?.(a);
                  },
                });
          };
        };
    },
    61752: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Lenis: () => h }), e.i(22271);
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(47373),
        l = e.i(54995),
        a = e.i(72287),
        n = e.i(38653),
        c = e.i(92854),
        d = e.i(42928);
      function u() {
        let e,
          t,
          r,
          s,
          c,
          u,
          h = (0, i.c)(13),
          g = (0, d.useStore)(f),
          _ = (0, d.useStore)(p),
          v = (0, l.useLenis)();
        h[0] !== _ || h[1] !== v
          ? ((e = () => {
              _ ? v?.stop() : v?.start();
            }),
            (t = [_, v]),
            (h[0] = _),
            (h[1] = v),
            (h[2] = e),
            (h[3] = t))
          : ((e = h[2]), (t = h[3])),
          (0, n.useEffect)(e, t);
        let y = (0, n.useRef)(0),
          b = (0, n.useRef)(0);
        h[4] !== v || h[5] !== g
          ? ((r = () => {
              v &&
                ((b.current = Math.abs(v.scroll - y.current)),
                (b.current > 50 || v.scroll < 100) &&
                  ((y.current = v.scroll),
                  g((v.direction || 0) > 0 && v.scroll > 100)));
            }),
            (h[4] = v),
            (h[5] = g),
            (h[6] = r))
          : (r = h[6]);
        let x = r;
        h[7] !== x ? ((s = [x]), (h[7] = x), (h[8] = s)) : (s = h[8]),
          (0, l.useLenis)(x, s);
        let w = (0, d.useStore)(m);
        return (
          h[9] !== v || h[10] !== w
            ? ((c = () => {
                if (v) {
                  let e = new a.default(v, {
                    easing: (0, o.default)(0.3, 0, 0, 1),
                    duration: 0.75,
                  });
                  return (
                    w(e),
                    () => {
                      e.destroy();
                    }
                  );
                }
              }),
              (u = [v, w]),
              (h[9] = v),
              (h[10] = w),
              (h[11] = c),
              (h[12] = u))
            : ((c = h[11]), (u = h[12])),
          (0, n.useEffect)(c, u),
          null
        );
      }
      function m(e) {
        return e.setLenisSnap;
      }
      function p(e) {
        return e.isLoading;
      }
      function f(e) {
        return e.setIsNavigationCollapsed;
      }
      function h(e) {
        let t,
          r,
          o,
          a,
          d = (0, i.c)(8),
          { options: m, children: p } = e,
          f = (0, n.useRef)(null);
        d[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = (e) => {
              f.current?.lenis && f.current.lenis.raf(e);
            }),
            (d[0] = t))
          : (t = d[0]),
          (0, c.useTempus)(t),
          d[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, s.jsx)(u, {})), (d[1] = r))
            : (r = d[1]);
        let h = m?.lerp ?? 0.125;
        return (
          d[2] !== m || d[3] !== h
            ? ((o = {
                ...m,
                lerp: h,
                autoRaf: !1,
                anchors: !0,
                wheelMultiplier: 0.5,
                touchMultiplier: 0.75,
                syncTouch: !0,
                prevent: g,
              }),
              (d[2] = m),
              (d[3] = h),
              (d[4] = o))
            : (o = d[4]),
          d[5] !== p || d[6] !== o
            ? ((a = (0, s.jsxs)(s.Fragment, {
                children: [
                  r,
                  (0, s.jsx)(l.ReactLenis, {
                    ref: f,
                    root: "asChild",
                    options: o,
                    id: "lenis",
                    children: p,
                  }),
                ],
              })),
              (d[5] = p),
              (d[6] = o),
              (d[7] = a))
            : (a = d[7]),
          a
        );
      }
      function g(e) {
        return (
          e?.nodeName === "VERCEL-LIVE-FEEDBACK" ||
          e?.id === "theatrejs-studio-root"
        );
      }
    },
    62222: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ default: () => t });
        var s,
          i = e.i(38653);
        function o() {
          return (o = Object.assign.bind()).apply(null, arguments);
        }
        let t = (0, i.memo)(function (e) {
          return (0,
          i.createElement)("svg", o({ viewBox: "0 0 41 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, e), s || (s = (0, i.createElement)("path", { d: "m10.1 0 16 28h-9.8L.3 0zM36 0l4.5 8h-9.8l-4.6-8z", fill: "white" })));
        });
      }
    },
    64408: (e) => {
      var { g: t, __dirname: r } = e;
      e.v({
        active: "navigation-module__mix1Pa__active",
        basePrice: "navigation-module__mix1Pa__basePrice",
        buttonHover: "navigation-module__mix1Pa__buttonHover",
        buyLink: "navigation-module__mix1Pa__buyLink",
        glassesContainer: "navigation-module__mix1Pa__glassesContainer",
        headerInner: "navigation-module__mix1Pa__headerInner",
        linkGradient: "navigation-module__mix1Pa__linkGradient",
        logo: "navigation-module__mix1Pa__logo",
        menuIcon: "navigation-module__mix1Pa__menuIcon",
        middle: "navigation-module__mix1Pa__middle",
        nav: "navigation-module__mix1Pa__nav",
        navigation: "navigation-module__mix1Pa__navigation",
        right: "navigation-module__mix1Pa__right",
      });
    },
    30771: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ Navigation: () => t });
        var s = e.i(58064),
          i = e.i(85444),
          o = e.i(60566),
          l = e.i(17170),
          a = e.i(38653),
          n = e.i(62222),
          c = e.i(67376),
          d = e.i(96983),
          u = e.i(42928),
          m = e.i(64408);
        let t = () => {
          let e,
            t,
            r,
            f,
            h,
            g,
            _,
            v,
            y,
            b = (0, i.c)(11),
            x = (0, a.useRef)(null),
            w = (0, u.useStore)(p),
            [k, S] = (0, a.useState)("");
          b[0] !== w
            ? ((e = () => {
                if (!x.current) return;
                let e = l.default.timeline();
                return (
                  w
                    ? e.to(x.current, {
                        yPercent: -175,
                        duration: 0.4,
                        ease: "power2.in",
                        overwrite: "auto",
                      })
                    : e.to(x.current, {
                        yPercent: 0,
                        duration: 1,
                        ease: "expo.out",
                        overwrite: "auto",
                      }),
                  window?.location && S(window.location.pathname),
                  () => {
                    e.kill();
                  }
                );
              }),
              (t = [w]),
              (b[0] = w),
              (b[1] = e),
              (b[2] = t))
            : ((e = b[1]), (t = b[2])),
            (0, a.useLayoutEffect)(e, t),
            b[3] === Symbol.for("react.memo_cache_sentinel")
              ? ((r = (0, s.jsx)("div", {
                  className: m.default.middle,
                  children: (0, s.jsx)("a", {
                    href: "https://www.viture.com",
                    className: m.default.logo,
                    children: (0, s.jsx)(n.default, {}),
                  }),
                })),
                (b[3] = r))
              : (r = b[3]),
            b[4] === Symbol.for("react.memo_cache_sentinel")
              ? ((f = (0, s.jsx)("div", {
                  className: m.default.glassesContainer,
                  children: (0, s.jsx)(c.Image, {
                    width: 45,
                    height: 16,
                    src: "/images/icons/glasses.svg",
                  }),
                })),
                (h = (0, o.default)(
                  m.default.basePrice,
                  "text16_24_normal",
                  "text-white-40"
                )),
                (b[4] = f),
                (b[5] = h))
              : ((f = b[4]), (h = b[5])),
            b[6] === Symbol.for("react.memo_cache_sentinel")
              ? ((g = (0, s.jsxs)("div", {
                  className: h,
                  children: [
                    "From ",
                    (0, s.jsx)("strong", {
                      className: "text-white",
                      children: "$399",
                    }),
                  ],
                })),
                (b[6] = g))
              : (g = b[6]);
          let j = `https://www.viture.com/product/viture-luma-xr-glasses${
            "/" !== k ? `?discount=${k.replaceAll("/", "")}` : ""
          }`;
          return (
            b[7] === Symbol.for("react.memo_cache_sentinel")
              ? ((_ = (0, s.jsx)("div", { className: m.default.buttonHover })),
                (v = (0, s.jsx)("span", {
                  className: (0, o.default)(
                    m.default.linkGradient,
                    "text16_24_600"
                  ),
                  children: "Order Now",
                })),
                (b[7] = _),
                (b[8] = v))
              : ((_ = b[7]), (v = b[8])),
            b[9] !== j
              ? ((y = (0, s.jsx)("div", {
                  className: m.default.navigation,
                  children: (0, s.jsxs)("div", {
                    className: m.default.headerInner,
                    ref: x,
                    children: [
                      r,
                      (0, s.jsxs)("div", {
                        className: m.default.right,
                        children: [
                          f,
                          g,
                          (0, s.jsxs)(d.Link, {
                            href: j,
                            className: m.default.buyLink,
                            children: [_, v],
                          }),
                        ],
                      }),
                    ],
                  }),
                })),
                (b[9] = j),
                (b[10] = y))
              : (y = b[10]),
            y
          );
        };
        function p(e) {
          return e.isNavigationCollapsed;
        }
      }
    },
    30558: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ ScrollRestoration: () => o });
      var s = e.i(85444),
        i = e.i(38653);
      function o(e) {
        let t,
          r,
          o = (0, s.c)(3),
          { type: l } = e,
          a = void 0 === l ? "auto" : l;
        return (
          o[0] !== a
            ? ((t = () => {
                history.scrollRestoration = a;
              }),
              (r = [a]),
              (o[0] = a),
              (o[1] = t),
              (o[2] = r))
            : ((t = o[1]), (r = o[2])),
          (0, i.useEffect)(t, r),
          null
        );
      }
    },
    15507: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ Wrapper: () => f }), e.i(22271);
      var s = e.i(58064),
        i = e.i(85444),
        o = e.i(60566),
        l = e.i(55366),
        a = e.i(38653),
        n = e.i(97686),
        c = e.i(69462),
        d = e.i(41013),
        u = e.i(61752),
        m = e.i(30771),
        p = e.i(30558);
      function f(e) {
        let t,
          r,
          f,
          h,
          g,
          _,
          v,
          y,
          b,
          x,
          w,
          k,
          S,
          j,
          E,
          N,
          C,
          T = (0, i.c)(30);
        T[0] !== e
          ? (({
              children: t,
              theme: h,
              className: r,
              lenis: g,
              webgl: _,
              ...f
            } = e),
            (T[0] = e),
            (T[1] = t),
            (T[2] = r),
            (T[3] = f),
            (T[4] = h),
            (T[5] = g),
            (T[6] = _))
          : ((t = T[1]),
            (r = T[2]),
            (f = T[3]),
            (h = T[4]),
            (g = T[5]),
            (_ = T[6]));
        let O = void 0 === h ? "dark" : h,
          P = (0, l.usePathname)();
        T[7] !== O
          ? ((v = () => {
              document.documentElement.setAttribute("data-theme", O);
            }),
            (T[7] = O),
            (T[8] = v))
          : (v = T[8]),
          T[9] !== P || T[10] !== O
            ? ((y = [P, O]), (T[9] = P), (T[10] = O), (T[11] = y))
            : (y = T[11]),
          (0, a.useEffect)(v, y),
          T[12] !== _
            ? ((b =
                _ &&
                (0, s.jsx)(n.Canvas, {
                  root: !0,
                  ...("object" == typeof _ && _),
                })),
              (T[12] = _),
              (T[13] = b))
            : (b = T[13]),
          T[14] === Symbol.for("react.memo_cache_sentinel")
            ? ((x = (0, s.jsx)(c.BannerDesktop, {})),
              (w = (0, s.jsx)(d.BannerMobile, {})),
              (k = (0, s.jsx)(m.Navigation, {})),
              (T[14] = x),
              (T[15] = w),
              (T[16] = k))
            : ((x = T[14]), (w = T[15]), (k = T[16])),
          T[17] !== r
            ? ((S = (0, o.default)("relative flex flex-col grow", r)),
              (T[17] = r),
              (T[18] = S))
            : (S = T[18]),
          T[19] !== t || T[20] !== f || T[21] !== S
            ? ((j = (0, s.jsxs)(u.Lenis, {
                children: [
                  x,
                  w,
                  k,
                  (0, s.jsx)("main", { className: S, ...f, children: t }),
                ],
              })),
              (T[19] = t),
              (T[20] = f),
              (T[21] = S),
              (T[22] = j))
            : (j = T[22]);
        let R = `document.documentElement.setAttribute('data-theme', '${O}');`;
        return (
          T[23] !== R
            ? ((E = (0, s.jsx)("script", { children: R })),
              (T[23] = R),
              (T[24] = E))
            : (E = T[24]),
          T[25] === Symbol.for("react.memo_cache_sentinel")
            ? ((N = (0, s.jsx)(p.ScrollRestoration, { type: "manual" })),
              (T[25] = N))
            : (N = T[25]),
          T[26] !== j || T[27] !== E || T[28] !== b
            ? ((C = (0, s.jsxs)(s.Fragment, { children: [b, j, E, N] })),
              (T[26] = j),
              (T[27] = E),
              (T[28] = b),
              (T[29] = C))
            : (C = T[29]),
          C
        );
      }
    },
  },
]);

//# sourceMappingURL=4d0a780a6fc1e8a1.js.map
