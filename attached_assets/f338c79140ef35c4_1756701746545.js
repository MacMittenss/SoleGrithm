(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  "object" == typeof document ? document.currentScript : void 0,
  {
    2289: function (t) {
      var { g: e, __dirname: i, m: r, e: n } = t;
      {
        ("use strict");
        Object.defineProperty(n, "__esModule", { value: !0 }),
          Object.defineProperty(n, "setAttributesFromProps", {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let t = {
            acceptCharset: "accept-charset",
            className: "class",
            htmlFor: "for",
            httpEquiv: "http-equiv",
            noModule: "noModule",
          },
          e = [
            "onLoad",
            "onReady",
            "dangerouslySetInnerHTML",
            "children",
            "onError",
            "strategy",
            "stylesheets",
          ];
        function s(t) {
          return ["async", "defer", "noModule"].includes(t);
        }
        function o(i, r) {
          for (let [n, o] of Object.entries(r)) {
            if (!r.hasOwnProperty(n) || e.includes(n) || void 0 === o) continue;
            let a = t[n] || n.toLowerCase();
            "SCRIPT" === i.tagName && s(a)
              ? (i[a] = !!o)
              : i.setAttribute(a, String(o)),
              (!1 === o ||
                ("SCRIPT" === i.tagName && s(a) && (!o || "false" === o))) &&
                (i.setAttribute(a, ""), i.removeAttribute(a));
          }
        }
        ("function" == typeof n.default ||
          ("object" == typeof n.default && null !== n.default)) &&
          void 0 === n.default.__esModule &&
          (Object.defineProperty(n.default, "__esModule", { value: !0 }),
          Object.assign(n.default, n),
          (r.exports = n.default));
      }
    },
    49045: function (t) {
      var { g: e, __dirname: i, m: r, e: n } = t;
      {
        ("use strict");
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = {
          cancelIdleCallback: function () {
            return e;
          },
          requestIdleCallback: function () {
            return t;
          },
        };
        for (var o in s)
          Object.defineProperty(n, o, { enumerable: !0, get: s[o] });
        let t =
            ("undefined" != typeof self &&
              self.requestIdleCallback &&
              self.requestIdleCallback.bind(window)) ||
            function (t) {
              let e = Date.now();
              return self.setTimeout(function () {
                t({
                  didTimeout: !1,
                  timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - e));
                  },
                });
              }, 1);
            },
          e =
            ("undefined" != typeof self &&
              self.cancelIdleCallback &&
              self.cancelIdleCallback.bind(window)) ||
            function (t) {
              return clearTimeout(t);
            };
        ("function" == typeof n.default ||
          ("object" == typeof n.default && null !== n.default)) &&
          void 0 === n.default.__esModule &&
          (Object.defineProperty(n.default, "__esModule", { value: !0 }),
          Object.assign(n.default, n),
          (r.exports = n.default));
      }
    },
    84480: function (t) {
      var { g: e, __dirname: i, m: r, e: n } = t;
      {
        ("use strict");
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = {
          default: function () {
            return w;
          },
          handleClientScriptLoad: function () {
            return a;
          },
          initScriptLoader: function () {
            return l;
          },
        };
        for (var o in s)
          Object.defineProperty(n, o, { enumerable: !0, get: s[o] });
        let e = t.r(13314),
          i = t.r(81369),
          u = t.r(58064),
          c = e._(t.r(95168)),
          f = i._(t.r(38653)),
          p = t.r(26796),
          d = t.r(2289),
          _ = t.r(49045),
          m = new Map(),
          g = new Set(),
          v = (t) => {
            if (c.default.preinit)
              return void t.forEach((t) => {
                c.default.preinit(t, { as: "style" });
              });
            if ("undefined" != typeof window) {
              let e = document.head;
              t.forEach((t) => {
                let i = document.createElement("link");
                (i.type = "text/css"),
                  (i.rel = "stylesheet"),
                  (i.href = t),
                  e.appendChild(i);
              });
            }
          },
          y = (t) => {
            let {
                src: e,
                id: i,
                onLoad: r = () => {},
                onReady: n = null,
                dangerouslySetInnerHTML: s,
                children: o = "",
                strategy: a = "afterInteractive",
                onError: l,
                stylesheets: h,
              } = t,
              u = i || e;
            if (u && g.has(u)) return;
            if (m.has(e)) {
              g.add(u), m.get(e).then(r, l);
              return;
            }
            let c = () => {
                n && n(), g.add(u);
              },
              f = document.createElement("script"),
              p = new Promise((t, e) => {
                f.addEventListener("load", function (e) {
                  t(), r && r.call(this, e), c();
                }),
                  f.addEventListener("error", function (t) {
                    e(t);
                  });
              }).catch(function (t) {
                l && l(t);
              });
            s
              ? ((f.innerHTML = s.__html || ""), c())
              : o
              ? ((f.textContent =
                  "string" == typeof o
                    ? o
                    : Array.isArray(o)
                    ? o.join("")
                    : ""),
                c())
              : e && ((f.src = e), m.set(e, p)),
              (0, d.setAttributesFromProps)(f, t),
              "worker" === a && f.setAttribute("type", "text/partytown"),
              f.setAttribute("data-nscript", a),
              h && v(h),
              document.body.appendChild(f);
          };
        function a(t) {
          let { strategy: e = "afterInteractive" } = t;
          "lazyOnload" === e
            ? window.addEventListener("load", () => {
                (0, _.requestIdleCallback)(() => y(t));
              })
            : y(t);
        }
        function l(t) {
          t.forEach(a),
            [
              ...document.querySelectorAll(
                '[data-nscript="beforeInteractive"]'
              ),
              ...document.querySelectorAll('[data-nscript="beforePageRender"]'),
            ].forEach((t) => {
              let e = t.id || t.getAttribute("src");
              g.add(e);
            });
        }
        function h(t) {
          let {
              id: e,
              src: i = "",
              onLoad: r = () => {},
              onReady: n = null,
              strategy: s = "afterInteractive",
              onError: o,
              stylesheets: a,
              ...l
            } = t,
            {
              updateScripts: h,
              scripts: d,
              getIsSsr: m,
              appDir: v,
              nonce: w,
            } = (0, f.useContext)(p.HeadManagerContext),
            T = (0, f.useRef)(!1);
          (0, f.useEffect)(() => {
            let t = e || i;
            T.current || (n && t && g.has(t) && n(), (T.current = !0));
          }, [n, e, i]);
          let b = (0, f.useRef)(!1);
          if (
            ((0, f.useEffect)(() => {
              if (!b.current) {
                if ("afterInteractive" === s) y(t);
                else
                  "lazyOnload" === s &&
                    ("complete" === document.readyState
                      ? (0, _.requestIdleCallback)(() => y(t))
                      : window.addEventListener("load", () => {
                          (0, _.requestIdleCallback)(() => y(t));
                        }));
                b.current = !0;
              }
            }, [t, s]),
            ("beforeInteractive" === s || "worker" === s) &&
              (h
                ? ((d[s] = (d[s] || []).concat([
                    { id: e, src: i, onLoad: r, onReady: n, onError: o, ...l },
                  ])),
                  h(d))
                : m && m()
                ? g.add(e || i)
                : m && !m() && y(t)),
            v)
          ) {
            if (
              (a &&
                a.forEach((t) => {
                  c.default.preinit(t, { as: "style" });
                }),
              "beforeInteractive" === s)
            )
              if (!i)
                return (
                  l.dangerouslySetInnerHTML &&
                    ((l.children = l.dangerouslySetInnerHTML.__html),
                    delete l.dangerouslySetInnerHTML),
                  (0, u.jsx)("script", {
                    nonce: w,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([0, { ...l, id: e }]) +
                        ")",
                    },
                  })
                );
              else
                return (
                  c.default.preload(
                    i,
                    l.integrity
                      ? {
                          as: "script",
                          integrity: l.integrity,
                          nonce: w,
                          crossOrigin: l.crossOrigin,
                        }
                      : { as: "script", nonce: w, crossOrigin: l.crossOrigin }
                  ),
                  (0, u.jsx)("script", {
                    nonce: w,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([i, { ...l, id: e }]) +
                        ")",
                    },
                  })
                );
            "afterInteractive" === s &&
              i &&
              c.default.preload(
                i,
                l.integrity
                  ? {
                      as: "script",
                      integrity: l.integrity,
                      nonce: w,
                      crossOrigin: l.crossOrigin,
                    }
                  : { as: "script", nonce: w, crossOrigin: l.crossOrigin }
              );
          }
          return null;
        }
        Object.defineProperty(h, "__nextScript", { value: !0 });
        let w = h;
        ("function" == typeof n.default ||
          ("object" == typeof n.default && null !== n.default)) &&
          void 0 === n.default.__esModule &&
          (Object.defineProperty(n.default, "__esModule", { value: !0 }),
          Object.assign(n.default, n),
          (r.exports = n.default));
      }
    },
    31111: function (t) {
      var { g: e, __dirname: i, m: r, e: n } = t;
      r.exports = t.r(84480);
    },
    37670: (t) => {
      "use strict";
      var { g: e, __dirname: i } = t;
      function r(t) {
        if (void 0 === t)
          throw ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function n(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = e);
      }
      t.s({
        Animation: () => eL,
        Back: () => iC,
        Bounce: () => iR,
        Circ: () => iD,
        Cubic: () => iS,
        Elastic: () => ik,
        Expo: () => iA,
        GSCache: () => eD,
        Linear: () => ib,
        Power0: () => ig,
        Power1: () => iv,
        Power2: () => iy,
        Power3: () => iw,
        Power4: () => iT,
        PropTween: () => it,
        Quad: () => ix,
        Quart: () => iE,
        Quint: () => iO,
        Sine: () => iz,
        SteppedEase: () => iP,
        Strong: () => iM,
        Timeline: () => eN,
        TimelineLite: () => eN,
        TimelineMax: () => eN,
        Tween: () => e$,
        TweenLite: () => e$,
        TweenMax: () => e$,
        _checkPlugin: () => eB,
        _colorExp: () => em,
        _colorStringFilter: () => ev,
        _config: () => m,
        _forEachName: () => tl,
        _getCache: () => to,
        _getProperty: () => ta,
        _getSetter: () => e1,
        _isString: () => S,
        _isUndefined: () => M,
        _missingPlugin: () => q,
        _numExp: () => L,
        _numWithUnitExp: () => N,
        _parseRelative: () => tc,
        _plugins: () => tt,
        _relExp: () => F,
        _removeLinkedListItem: () => tE,
        _renderComplexString: () => e3,
        _replaceRandom: () => er,
        _round: () => th,
        _roundModifier: () => t3,
        _setDefaults: () => tv,
        _sortPropTweensByPriority: () => e7,
        _ticker: () => ey,
        clamp: () => tZ,
        default: () => im,
        distribute: () => t5,
        getUnit: () => t$,
        gsap: () => im,
        interpolate: () => es,
        mapRange: () => en,
        normalize: () => t7,
        pipe: () => t4,
        random: () => t6,
        selector: () => t1,
        shuffle: () => t2,
        snap: () => t8,
        splitColor: () => ep,
        toArray: () => t0,
        unitize: () => t9,
        wrap: () => ee,
        wrapYoyo: () => ei,
      });
      var s,
        o,
        a,
        l,
        h,
        u,
        c,
        f,
        p,
        d,
        _,
        m = {
          autoSleep: 120,
          force3D: "auto",
          nullTargetWarn: 1,
          units: { lineHeight: "" },
        },
        g = { duration: 0.5, overwrite: !1, delay: 0 },
        v = 2 * Math.PI,
        y = v / 4,
        w = 0,
        T = Math.sqrt,
        b = Math.cos,
        x = Math.sin,
        S = function (t) {
          return "string" == typeof t;
        },
        E = function (t) {
          return "function" == typeof t;
        },
        O = function (t) {
          return "number" == typeof t;
        },
        M = function (t) {
          return void 0 === t;
        },
        k = function (t) {
          return "object" == typeof t;
        },
        C = function (t) {
          return !1 !== t;
        },
        P = function () {
          return "undefined" != typeof window;
        },
        R = function (t) {
          return E(t) || S(t);
        },
        z =
          ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
          function () {},
        A = Array.isArray,
        D = /(?:-?\.?\d|\.)+/gi,
        L = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        N = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        I = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        F = /[+-]=-?[.\d]+/,
        U = /[^,'"\[\]\s]+/gi,
        W = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
        H = {},
        B = {},
        j = function (t) {
          return (B = ty(t, H)) && im;
        },
        q = function (t, e) {
          return console.warn(
            "Invalid property",
            t,
            "set to",
            e,
            "Missing plugin? gsap.registerPlugin()"
          );
        },
        Y = function (t, e) {
          return !e && console.warn(t);
        },
        X = function (t, e) {
          return (t && (H[t] = e) && B && (B[t] = e)) || H;
        },
        V = function () {
          return 0;
        },
        Q = { suppressEvents: !0, isStart: !0, kill: !1 },
        G = { suppressEvents: !0, kill: !1 },
        $ = { suppressEvents: !0 },
        Z = {},
        J = [],
        K = {},
        tt = {},
        te = {},
        ti = 30,
        tr = [],
        tn = "",
        ts = function (t) {
          var e,
            i,
            r = t[0];
          if ((k(r) || E(r) || (t = [t]), !(e = (r._gsap || {}).harness))) {
            for (i = tr.length; i-- && !tr[i].targetTest(r); );
            e = tr[i];
          }
          for (i = t.length; i--; )
            (t[i] && (t[i]._gsap || (t[i]._gsap = new eD(t[i], e)))) ||
              t.splice(i, 1);
          return t;
        },
        to = function (t) {
          return t._gsap || ts(t0(t))[0]._gsap;
        },
        ta = function (t, e, i) {
          return (i = t[e]) && E(i)
            ? t[e]()
            : (M(i) && t.getAttribute && t.getAttribute(e)) || i;
        },
        tl = function (t, e) {
          return (t = t.split(",")).forEach(e) || t;
        },
        th = function (t) {
          return Math.round(1e5 * t) / 1e5 || 0;
        },
        tu = function (t) {
          return Math.round(1e7 * t) / 1e7 || 0;
        },
        tc = function (t, e) {
          var i = e.charAt(0),
            r = parseFloat(e.substr(2));
          return (
            (t = parseFloat(t)),
            "+" === i ? t + r : "-" === i ? t - r : "*" === i ? t * r : t / r
          );
        },
        tf = function (t, e) {
          for (var i = e.length, r = 0; 0 > t.indexOf(e[r]) && ++r < i; );
          return r < i;
        },
        tp = function () {
          var t,
            e,
            i = J.length,
            r = J.slice(0);
          for (t = 0, K = {}, J.length = 0; t < i; t++)
            (e = r[t]) &&
              e._lazy &&
              (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
        },
        td = function (t) {
          return !!(t._initted || t._startAt || t.add);
        },
        t_ = function (t, e, i, r) {
          J.length && !o && tp(),
            t.render(e, i, r || !!(o && e < 0 && td(t))),
            J.length && !o && tp();
        },
        tm = function (t) {
          var e = parseFloat(t);
          return (e || 0 === e) && (t + "").match(U).length < 2
            ? e
            : S(t)
            ? t.trim()
            : t;
        },
        tg = function (t) {
          return t;
        },
        tv = function (t, e) {
          for (var i in e) i in t || (t[i] = e[i]);
          return t;
        },
        ty = function (t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        },
        tw = function t(e, i) {
          for (var r in i)
            "__proto__" !== r &&
              "constructor" !== r &&
              "prototype" !== r &&
              (e[r] = k(i[r]) ? t(e[r] || (e[r] = {}), i[r]) : i[r]);
          return e;
        },
        tT = function (t, e) {
          var i,
            r = {};
          for (i in t) i in e || (r[i] = t[i]);
          return r;
        },
        tb = function (t) {
          var e,
            i = t.parent || l,
            r = t.keyframes
              ? ((e = A(t.keyframes)),
                function (t, i) {
                  for (var r in i)
                    r in t ||
                      ("duration" === r && e) ||
                      "ease" === r ||
                      (t[r] = i[r]);
                })
              : tv;
          if (C(t.inherit))
            for (; i; ) r(t, i.vars.defaults), (i = i.parent || i._dp);
          return t;
        },
        tx = function (t, e) {
          for (
            var i = t.length, r = i === e.length;
            r && i-- && t[i] === e[i];

          );
          return i < 0;
        },
        tS = function (t, e, i, r, n) {
          void 0 === i && (i = "_first"), void 0 === r && (r = "_last");
          var s,
            o = t[r];
          if (n) for (s = e[n]; o && o[n] > s; ) o = o._prev;
          return (
            o
              ? ((e._next = o._next), (o._next = e))
              : ((e._next = t[i]), (t[i] = e)),
            e._next ? (e._next._prev = e) : (t[r] = e),
            (e._prev = o),
            (e.parent = e._dp = t),
            e
          );
        },
        tE = function (t, e, i, r) {
          void 0 === i && (i = "_first"), void 0 === r && (r = "_last");
          var n = e._prev,
            s = e._next;
          n ? (n._next = s) : t[i] === e && (t[i] = s),
            s ? (s._prev = n) : t[r] === e && (t[r] = n),
            (e._next = e._prev = e.parent = null);
        },
        tO = function (t, e) {
          t.parent &&
            (!e || t.parent.autoRemoveChildren) &&
            t.parent.remove &&
            t.parent.remove(t),
            (t._act = 0);
        },
        tM = function (t, e) {
          if (t && (!e || e._end > t._dur || e._start < 0))
            for (var i = t; i; ) (i._dirty = 1), (i = i.parent);
          return t;
        },
        tk = function (t) {
          for (var e = t.parent; e && e.parent; )
            (e._dirty = 1), e.totalDuration(), (e = e.parent);
          return t;
        },
        tC = function (t, e, i, r) {
          return (
            t._startAt &&
            (o
              ? t._startAt.revert(G)
              : (t.vars.immediateRender && !t.vars.autoRevert) ||
                t._startAt.render(e, !0, r))
          );
        },
        tP = function (t) {
          return t._repeat
            ? tR(t._tTime, (t = t.duration() + t._rDelay)) * t
            : 0;
        },
        tR = function (t, e) {
          var i = Math.floor((t = tu(t / e)));
          return t && i === t ? i - 1 : i;
        },
        tz = function (t, e) {
          return (
            (t - e._start) * e._ts +
            (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
          );
        },
        tA = function (t) {
          return (t._end = tu(
            t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0)
          ));
        },
        tD = function (t, e) {
          var i = t._dp;
          return (
            i &&
              i.smoothChildTiming &&
              t._ts &&
              ((t._start = tu(
                i._time -
                  (t._ts > 0
                    ? e / t._ts
                    : -(((t._dirty ? t.totalDuration() : t._tDur) - e) / t._ts))
              )),
              tA(t),
              i._dirty || tM(i, t)),
            t
          );
        },
        tL = function (t, e) {
          var i;
          if (
            ((e._time ||
              (!e._dur && e._initted) ||
              (e._start < t._time && (e._dur || !e.add))) &&
              ((i = tz(t.rawTime(), e)),
              (!e._dur || tG(0, e.totalDuration(), i) - e._tTime > 1e-8) &&
                e.render(i, !0)),
            tM(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
          ) {
            if (t._dur < t.duration())
              for (i = t; i._dp; )
                i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
            t._zTime = -1e-8;
          }
        },
        tN = function (t, e, i, r) {
          return (
            e.parent && tO(e),
            (e._start = tu(
              (O(i) ? i : i || t !== l ? tX(t, i, e) : t._time) + e._delay
            )),
            (e._end = tu(
              e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
            )),
            tS(t, e, "_first", "_last", t._sort ? "_start" : 0),
            tW(e) || (t._recent = e),
            r || tL(t, e),
            t._ts < 0 && tD(t, t._tTime),
            t
          );
        },
        tI = function (t, e) {
          return (
            (H.ScrollTrigger || q("scrollTrigger", e)) &&
            H.ScrollTrigger.create(e, t)
          );
        },
        tF = function (t, e, i, r, n) {
          return (ej(t, e, n), t._initted)
            ? !i &&
              t._pt &&
              !o &&
              ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
              p !== ey.frame
              ? (J.push(t), (t._lazy = [n, r]), 1)
              : void 0
            : 1;
        },
        tU = function t(e) {
          var i = e.parent;
          return (
            i && i._ts && i._initted && !i._lock && (0 > i.rawTime() || t(i))
          );
        },
        tW = function (t) {
          var e = t.data;
          return "isFromStart" === e || "isStart" === e;
        },
        tH = function (t, e, i, r) {
          var n,
            s,
            a,
            l = t.ratio,
            h =
              e < 0 ||
              (!e &&
                ((!t._start && tU(t) && !(!t._initted && tW(t))) ||
                  ((t._ts < 0 || t._dp._ts < 0) && !tW(t))))
                ? 0
                : 1,
            u = t._rDelay,
            c = 0;
          if (
            (u &&
              t._repeat &&
              ((s = tR((c = tG(0, t._tDur, e)), u)),
              t._yoyo && 1 & s && (h = 1 - h),
              s !== tR(t._tTime, u) &&
                ((l = 1 - h),
                t.vars.repeatRefresh && t._initted && t.invalidate())),
            h !== l || o || r || 1e-8 === t._zTime || (!e && t._zTime))
          ) {
            if (!t._initted && tF(t, e, r, i, c)) return;
            for (
              a = t._zTime,
                t._zTime = e || 1e-8 * !!i,
                i || (i = e && !a),
                t.ratio = h,
                t._from && (h = 1 - h),
                t._time = 0,
                t._tTime = c,
                n = t._pt;
              n;

            )
              n.r(h, n.d), (n = n._next);
            e < 0 && tC(t, e, i, !0),
              t._onUpdate && !i && ea(t, "onUpdate"),
              c && t._repeat && !i && t.parent && ea(t, "onRepeat"),
              (e >= t._tDur || e < 0) &&
                t.ratio === h &&
                (h && tO(t, 1),
                i ||
                  o ||
                  (ea(t, h ? "onComplete" : "onReverseComplete", !0),
                  t._prom && t._prom()));
          } else t._zTime || (t._zTime = e);
        },
        tB = function (t, e, i) {
          var r;
          if (i > e)
            for (r = t._first; r && r._start <= i; ) {
              if ("isPause" === r.data && r._start > e) return r;
              r = r._next;
            }
          else
            for (r = t._last; r && r._start >= i; ) {
              if ("isPause" === r.data && r._start < e) return r;
              r = r._prev;
            }
        },
        tj = function (t, e, i, r) {
          var n = t._repeat,
            s = tu(e) || 0,
            o = t._tTime / t._tDur;
          return (
            o && !r && (t._time *= s / t._dur),
            (t._dur = s),
            (t._tDur = n
              ? n < 0
                ? 1e10
                : tu(s * (n + 1) + t._rDelay * n)
              : s),
            o > 0 && !r && tD(t, (t._tTime = t._tDur * o)),
            t.parent && tA(t),
            i || tM(t.parent, t),
            t
          );
        },
        tq = function (t) {
          return t instanceof eN ? tM(t) : tj(t, t._dur);
        },
        tY = { _start: 0, endTime: V, totalDuration: V },
        tX = function t(e, i, r) {
          var n,
            s,
            o,
            a = e.labels,
            l = e._recent || tY,
            h = e.duration() >= 1e8 ? l.endTime(!1) : e._dur;
          return S(i) && (isNaN(i) || i in a)
            ? ((s = i.charAt(0)),
              (o = "%" === i.substr(-1)),
              (n = i.indexOf("=")),
              "<" === s || ">" === s)
              ? (n >= 0 && (i = i.replace(/=/, "")),
                ("<" === s ? l._start : l.endTime(l._repeat >= 0)) +
                  (parseFloat(i.substr(1)) || 0) *
                    (o ? (n < 0 ? l : r).totalDuration() / 100 : 1))
              : n < 0
              ? (i in a || (a[i] = h), a[i])
              : ((s = parseFloat(i.charAt(n - 1) + i.substr(n + 1))),
                o && r && (s = (s / 100) * (A(r) ? r[0] : r).totalDuration()),
                n > 1 ? t(e, i.substr(0, n - 1), r) + s : h + s)
            : null == i
            ? h
            : +i;
        },
        tV = function (t, e, i) {
          var r,
            n,
            s = O(e[1]),
            o = (s ? 2 : 1) + (t < 2 ? 0 : 1),
            a = e[o];
          if ((s && (a.duration = e[1]), (a.parent = i), t)) {
            for (r = a, n = i; n && !("immediateRender" in r); )
              (r = n.vars.defaults || {}), (n = C(n.vars.inherit) && n.parent);
            (a.immediateRender = C(r.immediateRender)),
              t < 2 ? (a.runBackwards = 1) : (a.startAt = e[o - 1]);
          }
          return new e$(e[0], a, e[o + 1]);
        },
        tQ = function (t, e) {
          return t || 0 === t ? e(t) : e;
        },
        tG = function (t, e, i) {
          return i < t ? t : i > e ? e : i;
        },
        t$ = function (t, e) {
          return S(t) && (e = W.exec(t)) ? e[1] : "";
        },
        tZ = function (t, e, i) {
          return tQ(i, function (i) {
            return tG(t, e, i);
          });
        },
        tJ = [].slice,
        tK = function (t, e) {
          return (
            t &&
            k(t) &&
            "length" in t &&
            ((!e && !t.length) || (t.length - 1 in t && k(t[0]))) &&
            !t.nodeType &&
            t !== h
          );
        },
        t0 = function (t, e, i) {
          var r;
          return a && !e && a.selector
            ? a.selector(t)
            : S(t) && !i && (u || !ew())
            ? tJ.call((e || c).querySelectorAll(t), 0)
            : A(t)
            ? (void 0 === r && (r = []),
              t.forEach(function (t) {
                var e;
                return (S(t) && !i) || tK(t, 1)
                  ? (e = r).push.apply(e, t0(t))
                  : r.push(t);
              }) || r)
            : tK(t)
            ? tJ.call(t, 0)
            : t
            ? [t]
            : [];
        },
        t1 = function (t) {
          return (
            (t = t0(t)[0] || Y("Invalid scope") || {}),
            function (e) {
              var i = t.current || t.nativeElement || t;
              return t0(
                e,
                i.querySelectorAll
                  ? i
                  : i === t
                  ? Y("Invalid scope") || c.createElement("div")
                  : t
              );
            }
          );
        },
        t2 = function (t) {
          return t.sort(function () {
            return 0.5 - Math.random();
          });
        },
        t5 = function (t) {
          if (E(t)) return t;
          var e = k(t) ? t : { each: t },
            i = eC(e.ease),
            r = e.from || 0,
            n = parseFloat(e.base) || 0,
            s = {},
            o = r > 0 && r < 1,
            a = isNaN(r) || o,
            l = e.axis,
            h = r,
            u = r;
          return (
            S(r)
              ? (h = u = { center: 0.5, edges: 0.5, end: 1 }[r] || 0)
              : !o && a && ((h = r[0]), (u = r[1])),
            function (t, o, c) {
              var f,
                p,
                d,
                _,
                m,
                g,
                v,
                y,
                w,
                b = (c || e).length,
                x = s[b];
              if (!x) {
                if (!(w = "auto" === e.grid ? 0 : (e.grid || [1, 1e8])[1])) {
                  for (
                    v = -1e8;
                    v < (v = c[w++].getBoundingClientRect().left) && w < b;

                  );
                  w < b && w--;
                }
                for (
                  g = 0,
                    x = s[b] = [],
                    f = a ? Math.min(w, b) * h - 0.5 : r % w,
                    p = 1e8 === w ? 0 : a ? (b * u) / w - 0.5 : (r / w) | 0,
                    v = 0,
                    y = 1e8;
                  g < b;
                  g++
                )
                  (d = (g % w) - f),
                    (_ = p - ((g / w) | 0)),
                    (x[g] = m =
                      l ? Math.abs("y" === l ? _ : d) : T(d * d + _ * _)),
                    m > v && (v = m),
                    m < y && (y = m);
                "random" === r && t2(x),
                  (x.max = v - y),
                  (x.min = y),
                  (x.v = b =
                    (parseFloat(e.amount) ||
                      parseFloat(e.each) *
                        (w > b
                          ? b - 1
                          : l
                          ? "y" === l
                            ? b / w
                            : w
                          : Math.max(w, b / w)) ||
                      0) * ("edges" === r ? -1 : 1)),
                  (x.b = b < 0 ? n - b : n),
                  (x.u = t$(e.amount || e.each) || 0),
                  (i = i && b < 0 ? eM(i) : i);
              }
              return (
                (b = (x[t] - x.min) / x.max || 0),
                tu(x.b + (i ? i(b) : b) * x.v) + x.u
              );
            }
          );
        },
        t3 = function (t) {
          var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
          return function (i) {
            var r = tu(Math.round(parseFloat(i) / t) * t * e);
            return (r - (r % 1)) / e + (O(i) ? 0 : t$(i));
          };
        },
        t8 = function (t, e) {
          var i,
            r,
            n = A(t);
          return (
            !n &&
              k(t) &&
              ((i = n = t.radius || 1e8),
              t.values
                ? (r = !O((t = t0(t.values))[0])) && (i *= i)
                : (t = t3(t.increment))),
            tQ(
              e,
              n
                ? E(t)
                  ? function (e) {
                      return Math.abs((r = t(e)) - e) <= i ? r : e;
                    }
                  : function (e) {
                      for (
                        var n,
                          s,
                          o = parseFloat(r ? e.x : e),
                          a = parseFloat(r ? e.y : 0),
                          l = 1e8,
                          h = 0,
                          u = t.length;
                        u--;

                      )
                        (n = r
                          ? (n = t[u].x - o) * n + (s = t[u].y - a) * s
                          : Math.abs(t[u] - o)) < l && ((l = n), (h = u));
                      return (
                        (h = !i || l <= i ? t[h] : e),
                        r || h === e || O(e) ? h : h + t$(e)
                      );
                    }
                : t3(t)
            )
          );
        },
        t6 = function (t, e, i, r) {
          return tQ(A(t) ? !e : !0 === i ? ((i = 0), !1) : !r, function () {
            return A(t)
              ? t[~~(Math.random() * t.length)]
              : (r =
                  (i = i || 1e-5) < 1
                    ? Math.pow(10, (i + "").length - 2)
                    : 1) &&
                  Math.floor(
                    Math.round(
                      (t - i / 2 + Math.random() * (e - t + 0.99 * i)) / i
                    ) *
                      i *
                      r
                  ) / r;
          });
        },
        t4 = function () {
          for (var t = arguments.length, e = Array(t), i = 0; i < t; i++)
            e[i] = arguments[i];
          return function (t) {
            return e.reduce(function (t, e) {
              return e(t);
            }, t);
          };
        },
        t9 = function (t, e) {
          return function (i) {
            return t(parseFloat(i)) + (e || t$(i));
          };
        },
        t7 = function (t, e, i) {
          return en(t, e, 0, 1, i);
        },
        et = function (t, e, i) {
          return tQ(i, function (i) {
            return t[~~e(i)];
          });
        },
        ee = function t(e, i, r) {
          var n = i - e;
          return A(e)
            ? et(e, t(0, e.length), i)
            : tQ(r, function (t) {
                return ((n + ((t - e) % n)) % n) + e;
              });
        },
        ei = function t(e, i, r) {
          var n = i - e,
            s = 2 * n;
          return A(e)
            ? et(e, t(0, e.length - 1), i)
            : tQ(r, function (t) {
                return (
                  (t = (s + ((t - e) % s)) % s || 0), e + (t > n ? s - t : t)
                );
              });
        },
        er = function (t) {
          for (var e, i, r, n, s = 0, o = ""; ~(e = t.indexOf("random(", s)); )
            (r = t.indexOf(")", e)),
              (n = "[" === t.charAt(e + 7)),
              (i = t.substr(e + 7, r - e - 7).match(n ? U : D)),
              (o +=
                t.substr(s, e - s) +
                t6(n ? i : +i[0], n ? 0 : +i[1], +i[2] || 1e-5)),
              (s = r + 1);
          return o + t.substr(s, t.length - s);
        },
        en = function (t, e, i, r, n) {
          var s = e - t,
            o = r - i;
          return tQ(n, function (e) {
            return i + (((e - t) / s) * o || 0);
          });
        },
        es = function t(e, i, r, n) {
          var s = isNaN(e + i)
            ? 0
            : function (t) {
                return (1 - t) * e + t * i;
              };
          if (!s) {
            var o,
              a,
              l,
              h,
              u,
              c = S(e),
              f = {};
            if ((!0 === r && (n = 1) && (r = null), c))
              (e = { p: e }), (i = { p: i });
            else if (A(e) && !A(i)) {
              for (a = 1, l = [], u = (h = e.length) - 2; a < h; a++)
                l.push(t(e[a - 1], e[a]));
              h--,
                (s = function (t) {
                  var e = Math.min(u, ~~(t *= h));
                  return l[e](t - e);
                }),
                (r = i);
            } else n || (e = ty(A(e) ? [] : {}, e));
            if (!l) {
              for (o in i) eW.call(f, e, o, "get", i[o]);
              s = function (t) {
                return e8(t, f) || (c ? e.p : e);
              };
            }
          }
          return tQ(r, s);
        },
        eo = function (t, e, i) {
          var r,
            n,
            s,
            o = t.labels,
            a = 1e8;
          for (r in o)
            (n = o[r] - e) < 0 == !!i &&
              n &&
              a > (n = Math.abs(n)) &&
              ((s = r), (a = n));
          return s;
        },
        ea = function (t, e, i) {
          var r,
            n,
            s,
            o = t.vars,
            l = o[e],
            h = a,
            u = t._ctx;
          if (l)
            return (
              (r = o[e + "Params"]),
              (n = o.callbackScope || t),
              i && J.length && tp(),
              u && (a = u),
              (s = r ? l.apply(n, r) : l.call(n)),
              (a = h),
              s
            );
        },
        el = function (t) {
          return (
            tO(t),
            t.scrollTrigger && t.scrollTrigger.kill(!!o),
            1 > t.progress() && ea(t, "onInterrupt"),
            t
          );
        },
        eh = [],
        eu = function (t) {
          if (t)
            if (((t = (!t.name && t.default) || t), P() || t.headless)) {
              var e = t.name,
                i = E(t),
                r =
                  e && !i && t.init
                    ? function () {
                        this._props = [];
                      }
                    : t,
                n = {
                  init: V,
                  render: e8,
                  add: eW,
                  kill: e4,
                  modifier: e6,
                  rawVars: 0,
                },
                s = {
                  targetTest: 0,
                  get: 0,
                  getSetter: e1,
                  aliases: {},
                  register: 0,
                };
              if ((ew(), t !== r)) {
                if (tt[e]) return;
                tv(r, tv(tT(t, n), s)),
                  ty(r.prototype, ty(n, tT(t, s))),
                  (tt[(r.prop = e)] = r),
                  t.targetTest && (tr.push(r), (Z[e] = 1)),
                  (e =
                    ("css" === e
                      ? "CSS"
                      : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
              }
              X(e, r), t.register && t.register(im, r, it);
            } else eh.push(t);
        },
        ec = {
          aqua: [0, 255, 255],
          lime: [0, 255, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, 255],
          navy: [0, 0, 128],
          white: [255, 255, 255],
          olive: [128, 128, 0],
          yellow: [255, 255, 0],
          orange: [255, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [255, 0, 0],
          pink: [255, 192, 203],
          cyan: [0, 255, 255],
          transparent: [255, 255, 255, 0],
        },
        ef = function (t, e, i) {
          return (
            ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
              ? e + (i - e) * t * 6
              : t < 0.5
              ? i
              : 3 * t < 2
              ? e + (i - e) * (2 / 3 - t) * 6
              : e) *
              255 +
              0.5) |
            0
          );
        },
        ep = function (t, e, i) {
          var r,
            n,
            s,
            o,
            a,
            l,
            h,
            u,
            c,
            f,
            p = t ? (O(t) ? [t >> 16, (t >> 8) & 255, 255 & t] : 0) : ec.black;
          if (!p) {
            if (
              ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), ec[t])
            )
              p = ec[t];
            else if ("#" === t.charAt(0)) {
              if (
                (t.length < 6 &&
                  ((r = t.charAt(1)),
                  (t =
                    "#" +
                    r +
                    r +
                    (n = t.charAt(2)) +
                    n +
                    (s = t.charAt(3)) +
                    s +
                    (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
                9 === t.length)
              )
                return [
                  (p = parseInt(t.substr(1, 6), 16)) >> 16,
                  (p >> 8) & 255,
                  255 & p,
                  parseInt(t.substr(7), 16) / 255,
                ];
              p = [
                (t = parseInt(t.substr(1), 16)) >> 16,
                (t >> 8) & 255,
                255 & t,
              ];
            } else if ("hsl" === t.substr(0, 3))
              if (((p = f = t.match(D)), e)) {
                if (~t.indexOf("="))
                  return (p = t.match(L)), i && p.length < 4 && (p[3] = 1), p;
              } else
                (o = (p[0] % 360) / 360),
                  (a = p[1] / 100),
                  (n = (l = p[2] / 100) <= 0.5 ? l * (a + 1) : l + a - l * a),
                  (r = 2 * l - n),
                  p.length > 3 && (p[3] *= 1),
                  (p[0] = ef(o + 1 / 3, r, n)),
                  (p[1] = ef(o, r, n)),
                  (p[2] = ef(o - 1 / 3, r, n));
            else p = t.match(D) || ec.transparent;
            p = p.map(Number);
          }
          return (
            e &&
              !f &&
              ((r = p[0] / 255),
              (l =
                ((h = Math.max(r, (n = p[1] / 255), (s = p[2] / 255))) +
                  (u = Math.min(r, n, s))) /
                2),
              h === u
                ? (o = a = 0)
                : ((c = h - u),
                  (a = l > 0.5 ? c / (2 - h - u) : c / (h + u)),
                  (o =
                    (h === r
                      ? (n - s) / c + 6 * (n < s)
                      : h === n
                      ? (s - r) / c + 2
                      : (r - n) / c + 4) * 60)),
              (p[0] = ~~(o + 0.5)),
              (p[1] = ~~(100 * a + 0.5)),
              (p[2] = ~~(100 * l + 0.5))),
            i && p.length < 4 && (p[3] = 1),
            p
          );
        },
        ed = function (t) {
          var e = [],
            i = [],
            r = -1;
          return (
            t.split(em).forEach(function (t) {
              var n = t.match(N) || [];
              e.push.apply(e, n), i.push((r += n.length + 1));
            }),
            (e.c = i),
            e
          );
        },
        e_ = function (t, e, i) {
          var r,
            n,
            s,
            o,
            a = "",
            l = (t + a).match(em),
            h = e ? "hsla(" : "rgba(",
            u = 0;
          if (!l) return t;
          if (
            ((l = l.map(function (t) {
              return (
                (t = ep(t, e, 1)) &&
                h +
                  (e
                    ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                    : t.join(",")) +
                  ")"
              );
            })),
            i && ((s = ed(t)), (r = i.c).join(a) !== s.c.join(a)))
          )
            for (o = (n = t.replace(em, "1").split(N)).length - 1; u < o; u++)
              a +=
                n[u] +
                (~r.indexOf(u)
                  ? l.shift() || h + "0,0,0,0)"
                  : (s.length ? s : l.length ? l : i).shift());
          if (!n)
            for (o = (n = t.split(em)).length - 1; u < o; u++) a += n[u] + l[u];
          return a + n[o];
        },
        em = (function () {
          var t,
            e =
              "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
          for (t in ec) e += "|" + t + "\\b";
          return RegExp(e + ")", "gi");
        })(),
        eg = /hsl[a]?\(/,
        ev = function (t) {
          var e,
            i = t.join(" ");
          if (((em.lastIndex = 0), em.test(i)))
            return (
              (e = eg.test(i)),
              (t[1] = e_(t[1], e)),
              (t[0] = e_(t[0], e, ed(t[1]))),
              !0
            );
        },
        ey = (function () {
          var t,
            e,
            i,
            r,
            n,
            s,
            o = Date.now,
            a = 500,
            l = 33,
            p = o(),
            d = p,
            m = 1e3 / 240,
            g = 1e3 / 240,
            v = [],
            y = function i(h) {
              var u,
                c,
                f,
                _,
                y = o() - d,
                w = !0 === h;
              if (
                ((y > a || y < 0) && (p += y - l),
                (d += y),
                ((u = (f = d - p) - g) > 0 || w) &&
                  ((_ = ++r.frame),
                  (n = f - 1e3 * r.time),
                  (r.time = f /= 1e3),
                  (g += u + (u >= m ? 4 : m - u)),
                  (c = 1)),
                w || (t = e(i)),
                c)
              )
                for (s = 0; s < v.length; s++) v[s](f, n, _, h);
            };
          return (r = {
            time: 0,
            frame: 0,
            tick: function () {
              y(!0);
            },
            deltaRatio: function (t) {
              return n / (1e3 / (t || 60));
            },
            wake: function () {
              f &&
                (!u &&
                  P() &&
                  ((c = (h = u = window).document || {}),
                  (H.gsap = im),
                  (h.gsapVersions || (h.gsapVersions = [])).push(im.version),
                  j(B || h.GreenSockGlobals || (!h.gsap && h) || {}),
                  eh.forEach(eu)),
                (i =
                  "undefined" != typeof requestAnimationFrame &&
                  requestAnimationFrame),
                t && r.sleep(),
                (e =
                  i ||
                  function (t) {
                    return setTimeout(t, (g - 1e3 * r.time + 1) | 0);
                  }),
                (_ = 1),
                y(2));
            },
            sleep: function () {
              (i ? cancelAnimationFrame : clearTimeout)(t), (_ = 0), (e = V);
            },
            lagSmoothing: function (t, e) {
              l = Math.min(e || 33, (a = t || 1 / 0));
            },
            fps: function (t) {
              (m = 1e3 / (t || 240)), (g = 1e3 * r.time + m);
            },
            add: function (t, e, i) {
              var n = e
                ? function (e, i, s, o) {
                    t(e, i, s, o), r.remove(n);
                  }
                : t;
              return r.remove(t), v[i ? "unshift" : "push"](n), ew(), n;
            },
            remove: function (t, e) {
              ~(e = v.indexOf(t)) && v.splice(e, 1) && s >= e && s--;
            },
            _listeners: v,
          });
        })(),
        ew = function () {
          return !_ && ey.wake();
        },
        eT = {},
        eb = /^[\d.\-M][\d.\-,\s]/,
        ex = /["']/g,
        eS = function (t) {
          for (
            var e,
              i,
              r,
              n = {},
              s = t.substr(1, t.length - 3).split(":"),
              o = s[0],
              a = 1,
              l = s.length;
            a < l;
            a++
          )
            (i = s[a]),
              (e = a !== l - 1 ? i.lastIndexOf(",") : i.length),
              (r = i.substr(0, e)),
              (n[o] = isNaN(r) ? r.replace(ex, "").trim() : +r),
              (o = i.substr(e + 1).trim());
          return n;
        },
        eE = function (t) {
          var e = t.indexOf("(") + 1,
            i = t.indexOf(")"),
            r = t.indexOf("(", e);
          return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
        },
        eO = function (t) {
          var e = (t + "").split("("),
            i = eT[e[0]];
          return i && e.length > 1 && i.config
            ? i.config.apply(
                null,
                ~t.indexOf("{") ? [eS(e[1])] : eE(t).split(",").map(tm)
              )
            : eT._CE && eb.test(t)
            ? eT._CE("", t)
            : i;
        },
        eM = function (t) {
          return function (e) {
            return 1 - t(1 - e);
          };
        },
        ek = function t(e, i) {
          for (var r, n = e._first; n; )
            n instanceof eN
              ? t(n, i)
              : !n.vars.yoyoEase ||
                (n._yoyo && n._repeat) ||
                n._yoyo === i ||
                (n.timeline
                  ? t(n.timeline, i)
                  : ((r = n._ease),
                    (n._ease = n._yEase),
                    (n._yEase = r),
                    (n._yoyo = i))),
              (n = n._next);
        },
        eC = function (t, e) {
          return (t && (E(t) ? t : eT[t] || eO(t))) || e;
        },
        eP = function (t, e, i, r) {
          void 0 === i &&
            (i = function (t) {
              return 1 - e(1 - t);
            }),
            void 0 === r &&
              (r = function (t) {
                return t < 0.5 ? e(2 * t) / 2 : 1 - e((1 - t) * 2) / 2;
              });
          var n,
            s = { easeIn: e, easeOut: i, easeInOut: r };
          return (
            tl(t, function (t) {
              for (var e in ((eT[t] = H[t] = s),
              (eT[(n = t.toLowerCase())] = i),
              s))
                eT[
                  n +
                    ("easeIn" === e
                      ? ".in"
                      : "easeOut" === e
                      ? ".out"
                      : ".inOut")
                ] = eT[t + "." + e] = s[e];
            }),
            s
          );
        },
        eR = function (t) {
          return function (e) {
            return e < 0.5
              ? (1 - t(1 - 2 * e)) / 2
              : 0.5 + t((e - 0.5) * 2) / 2;
          };
        },
        ez = function t(e, i, r) {
          var n = i >= 1 ? i : 1,
            s = (r || (e ? 0.3 : 0.45)) / (i < 1 ? i : 1),
            o = (s / v) * (Math.asin(1 / n) || 0),
            a = function (t) {
              return 1 === t
                ? 1
                : n * Math.pow(2, -10 * t) * x((t - o) * s) + 1;
            },
            l =
              "out" === e
                ? a
                : "in" === e
                ? function (t) {
                    return 1 - a(1 - t);
                  }
                : eR(a);
          return (
            (s = v / s),
            (l.config = function (i, r) {
              return t(e, i, r);
            }),
            l
          );
        },
        eA = function t(e, i) {
          void 0 === i && (i = 1.70158);
          var r = function (t) {
              return t ? --t * t * ((i + 1) * t + i) + 1 : 0;
            },
            n =
              "out" === e
                ? r
                : "in" === e
                ? function (t) {
                    return 1 - r(1 - t);
                  }
                : eR(r);
          return (
            (n.config = function (i) {
              return t(e, i);
            }),
            n
          );
        };
      tl("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
        var i = e < 5 ? e + 1 : e;
        eP(
          t + ",Power" + (i - 1),
          e
            ? function (t) {
                return Math.pow(t, i);
              }
            : function (t) {
                return t;
              },
          function (t) {
            return 1 - Math.pow(1 - t, i);
          },
          function (t) {
            return t < 0.5
              ? Math.pow(2 * t, i) / 2
              : 1 - Math.pow((1 - t) * 2, i) / 2;
          }
        );
      }),
        (eT.Linear.easeNone = eT.none = eT.Linear.easeIn),
        eP("Elastic", ez("in"), ez("out"), ez()),
        (function (t, e) {
          var i = 1 / 2.75,
            r = (1 / 2.75) * 2,
            n = (1 / 2.75) * 2.5,
            s = function (s) {
              return s < i
                ? 7.5625 * s * s
                : s < r
                ? 7.5625 * Math.pow(s - 1.5 / 2.75, 2) + 0.75
                : s < n
                ? t * (s -= 2.25 / e) * s + 0.9375
                : t * Math.pow(s - 2.625 / e, 2) + 0.984375;
            };
          eP(
            "Bounce",
            function (t) {
              return 1 - s(1 - t);
            },
            s
          );
        })(7.5625, 2.75),
        eP("Expo", function (t) {
          return (
            Math.pow(2, 10 * (t - 1)) * t + t * t * t * t * t * t * (1 - t)
          );
        }),
        eP("Circ", function (t) {
          return -(T(1 - t * t) - 1);
        }),
        eP("Sine", function (t) {
          return 1 === t ? 1 : -b(t * y) + 1;
        }),
        eP("Back", eA("in"), eA("out"), eA()),
        (eT.SteppedEase =
          eT.steps =
          H.SteppedEase =
            {
              config: function (t, e) {
                void 0 === t && (t = 1);
                var i = 1 / t,
                  r = t + +!e,
                  n = +!!e,
                  s = 0.99999999;
                return function (t) {
                  return (((r * tG(0, s, t)) | 0) + n) * i;
                };
              },
            }),
        (g.ease = eT["quad.out"]),
        tl(
          "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
          function (t) {
            return (tn += t + "," + t + "Params,");
          }
        );
      var eD = function (t, e) {
          (this.id = w++),
            (t._gsap = this),
            (this.target = t),
            (this.harness = e),
            (this.get = e ? e.get : ta),
            (this.set = e ? e.getSetter : e1);
        },
        eL = (function () {
          function t(t) {
            (this.vars = t),
              (this._delay = +t.delay || 0),
              (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
                ((this._rDelay = t.repeatDelay || 0),
                (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
              (this._ts = 1),
              tj(this, +t.duration, 1, 1),
              (this.data = t.data),
              a && ((this._ctx = a), a.data.push(this)),
              _ || ey.wake();
          }
          var e = t.prototype;
          return (
            (e.delay = function (t) {
              return t || 0 === t
                ? (this.parent &&
                    this.parent.smoothChildTiming &&
                    this.startTime(this._start + t - this._delay),
                  (this._delay = t),
                  this)
                : this._delay;
            }),
            (e.duration = function (t) {
              return arguments.length
                ? this.totalDuration(
                    this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
                  )
                : this.totalDuration() && this._dur;
            }),
            (e.totalDuration = function (t) {
              return arguments.length
                ? ((this._dirty = 0),
                  tj(
                    this,
                    this._repeat < 0
                      ? t
                      : (t - this._repeat * this._rDelay) / (this._repeat + 1)
                  ))
                : this._tDur;
            }),
            (e.totalTime = function (t, e) {
              if ((ew(), !arguments.length)) return this._tTime;
              var i = this._dp;
              if (i && i.smoothChildTiming && this._ts) {
                for (
                  tD(this, t), !i._dp || i.parent || tL(i, this);
                  i && i.parent;

                )
                  i.parent._time !==
                    i._start +
                      (i._ts >= 0
                        ? i._tTime / i._ts
                        : -((i.totalDuration() - i._tTime) / i._ts)) &&
                    i.totalTime(i._tTime, !0),
                    (i = i.parent);
                !this.parent &&
                  this._dp.autoRemoveChildren &&
                  ((this._ts > 0 && t < this._tDur) ||
                    (this._ts < 0 && t > 0) ||
                    (!this._tDur && !t)) &&
                  tN(this._dp, this, this._start - this._delay);
              }
              return (
                (this._tTime === t &&
                  (this._dur || e) &&
                  (!this._initted || 1e-8 !== Math.abs(this._zTime)) &&
                  (t || this._initted || (!this.add && !this._ptLookup))) ||
                  (this._ts || (this._pTime = t), t_(this, t, e)),
                this
              );
            }),
            (e.time = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    Math.min(this.totalDuration(), t + tP(this)) %
                      (this._dur + this._rDelay) || (t ? this._dur : 0),
                    e
                  )
                : this._time;
            }),
            (e.totalProgress = function (t, e) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * t, e)
                : this.totalDuration()
                ? Math.min(1, this._tTime / this._tDur)
                : this.rawTime() >= 0 && this._initted
                ? 1
                : 0;
            }),
            (e.progress = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (this._yoyo && !(1 & this.iteration()) ? 1 - t : t) +
                      tP(this),
                    e
                  )
                : this.duration()
                ? Math.min(1, this._time / this._dur)
                : +(this.rawTime() > 0);
            }),
            (e.iteration = function (t, e) {
              var i = this.duration() + this._rDelay;
              return arguments.length
                ? this.totalTime(this._time + (t - 1) * i, e)
                : this._repeat
                ? tR(this._tTime, i) + 1
                : 1;
            }),
            (e.timeScale = function (t, e) {
              if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
              if (this._rts === t) return this;
              var i =
                this.parent && this._ts
                  ? tz(this.parent._time, this)
                  : this._tTime;
              return (
                (this._rts = +t || 0),
                (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
                this.totalTime(
                  tG(-Math.abs(this._delay), this.totalDuration(), i),
                  !1 !== e
                ),
                tA(this),
                tk(this)
              );
            }),
            (e.paused = function (t) {
              return arguments.length
                ? (this._ps !== t &&
                    ((this._ps = t),
                    t
                      ? ((this._pTime =
                          this._tTime ||
                          Math.max(-this._delay, this.rawTime())),
                        (this._ts = this._act = 0))
                      : (ew(),
                        (this._ts = this._rts),
                        this.totalTime(
                          this.parent && !this.parent.smoothChildTiming
                            ? this.rawTime()
                            : this._tTime || this._pTime,
                          1 === this.progress() &&
                            1e-8 !== Math.abs(this._zTime) &&
                            (this._tTime -= 1e-8)
                        ))),
                  this)
                : this._ps;
            }),
            (e.startTime = function (t) {
              if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return (
                  e &&
                    (e._sort || !this.parent) &&
                    tN(e, this, t - this._delay),
                  this
                );
              }
              return this._start;
            }),
            (e.endTime = function (t) {
              return (
                this._start +
                (C(t) ? this.totalDuration() : this.duration()) /
                  Math.abs(this._ts || 1)
              );
            }),
            (e.rawTime = function (t) {
              var e = this.parent || this._dp;
              return e
                ? t &&
                  (!this._ts ||
                    (this._repeat && this._time && 1 > this.totalProgress()))
                  ? this._tTime % (this._dur + this._rDelay)
                  : this._ts
                  ? tz(e.rawTime(t), this)
                  : this._tTime
                : this._tTime;
            }),
            (e.revert = function (t) {
              void 0 === t && (t = $);
              var e = o;
              return (
                (o = t),
                td(this) &&
                  (this.timeline && this.timeline.revert(t),
                  this.totalTime(-0.01, t.suppressEvents)),
                "nested" !== this.data && !1 !== t.kill && this.kill(),
                (o = e),
                this
              );
            }),
            (e.globalTime = function (t) {
              for (var e = this, i = arguments.length ? t : e.rawTime(); e; )
                (i = e._start + i / (Math.abs(e._ts) || 1)), (e = e._dp);
              return !this.parent && this._sat ? this._sat.globalTime(t) : i;
            }),
            (e.repeat = function (t) {
              return arguments.length
                ? ((this._repeat = t === 1 / 0 ? -2 : t), tq(this))
                : -2 === this._repeat
                ? 1 / 0
                : this._repeat;
            }),
            (e.repeatDelay = function (t) {
              if (arguments.length) {
                var e = this._time;
                return (this._rDelay = t), tq(this), e ? this.time(e) : this;
              }
              return this._rDelay;
            }),
            (e.yoyo = function (t) {
              return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            (e.seek = function (t, e) {
              return this.totalTime(tX(this, t), C(e));
            }),
            (e.restart = function (t, e) {
              return (
                this.play().totalTime(t ? -this._delay : 0, C(e)),
                this._dur || (this._zTime = -1e-8),
                this
              );
            }),
            (e.play = function (t, e) {
              return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
            }),
            (e.reverse = function (t, e) {
              return (
                null != t && this.seek(t || this.totalDuration(), e),
                this.reversed(!0).paused(!1)
              );
            }),
            (e.pause = function (t, e) {
              return null != t && this.seek(t, e), this.paused(!0);
            }),
            (e.resume = function () {
              return this.paused(!1);
            }),
            (e.reversed = function (t) {
              return arguments.length
                ? (!!t !== this.reversed() &&
                    this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                  this)
                : this._rts < 0;
            }),
            (e.invalidate = function () {
              return (
                (this._initted = this._act = 0), (this._zTime = -1e-8), this
              );
            }),
            (e.isActive = function () {
              var t,
                e = this.parent || this._dp,
                i = this._start;
              return !!(
                !e ||
                (this._ts &&
                  this._initted &&
                  e.isActive() &&
                  (t = e.rawTime(!0)) >= i &&
                  t < this.endTime(!0) - 1e-8)
              );
            }),
            (e.eventCallback = function (t, e, i) {
              var r = this.vars;
              return arguments.length > 1
                ? (e
                    ? ((r[t] = e),
                      i && (r[t + "Params"] = i),
                      "onUpdate" === t && (this._onUpdate = e))
                    : delete r[t],
                  this)
                : r[t];
            }),
            (e.then = function (t) {
              var e = this;
              return new Promise(function (i) {
                var r = E(t) ? t : tg,
                  n = function () {
                    var t = e.then;
                    (e.then = null),
                      E(r) && (r = r(e)) && (r.then || r === e) && (e.then = t),
                      i(r),
                      (e.then = t);
                  };
                (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
                (!e._tTime && e._ts < 0)
                  ? n()
                  : (e._prom = n);
              });
            }),
            (e.kill = function () {
              el(this);
            }),
            t
          );
        })();
      tv(eL.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -1e-8,
        _prom: 0,
        _ps: !1,
        _rts: 1,
      });
      var eN = (function (t) {
        function e(e, i) {
          var n;
          return (
            void 0 === e && (e = {}),
            ((n = t.call(this, e) || this).labels = {}),
            (n.smoothChildTiming = !!e.smoothChildTiming),
            (n.autoRemoveChildren = !!e.autoRemoveChildren),
            (n._sort = C(e.sortChildren)),
            l && tN(e.parent || l, r(n), i),
            e.reversed && n.reverse(),
            e.paused && n.paused(!0),
            e.scrollTrigger && tI(r(n), e.scrollTrigger),
            n
          );
        }
        n(e, t);
        var i = e.prototype;
        return (
          (i.to = function (t, e, i) {
            return tV(0, arguments, this), this;
          }),
          (i.from = function (t, e, i) {
            return tV(1, arguments, this), this;
          }),
          (i.fromTo = function (t, e, i, r) {
            return tV(2, arguments, this), this;
          }),
          (i.set = function (t, e, i) {
            return (
              (e.duration = 0),
              (e.parent = this),
              tb(e).repeatDelay || (e.repeat = 0),
              (e.immediateRender = !!e.immediateRender),
              new e$(t, e, tX(this, i), 1),
              this
            );
          }),
          (i.call = function (t, e, i) {
            return tN(this, e$.delayedCall(0, t, e), i);
          }),
          (i.staggerTo = function (t, e, i, r, n, s, o) {
            return (
              (i.duration = e),
              (i.stagger = i.stagger || r),
              (i.onComplete = s),
              (i.onCompleteParams = o),
              (i.parent = this),
              new e$(t, i, tX(this, n)),
              this
            );
          }),
          (i.staggerFrom = function (t, e, i, r, n, s, o) {
            return (
              (i.runBackwards = 1),
              (tb(i).immediateRender = C(i.immediateRender)),
              this.staggerTo(t, e, i, r, n, s, o)
            );
          }),
          (i.staggerFromTo = function (t, e, i, r, n, s, o, a) {
            return (
              (r.startAt = i),
              (tb(r).immediateRender = C(r.immediateRender)),
              this.staggerTo(t, e, r, n, s, o, a)
            );
          }),
          (i.render = function (t, e, i) {
            var r,
              n,
              s,
              a,
              h,
              u,
              c,
              f,
              p,
              d,
              _,
              m,
              g = this._time,
              v = this._dirty ? this.totalDuration() : this._tDur,
              y = this._dur,
              w = t <= 0 ? 0 : tu(t),
              T = this._zTime < 0 != t < 0 && (this._initted || !y);
            if (
              (this !== l && w > v && t >= 0 && (w = v),
              w !== this._tTime || i || T)
            ) {
              if (
                (g !== this._time &&
                  y &&
                  ((w += this._time - g), (t += this._time - g)),
                (r = w),
                (p = this._start),
                (u = !(f = this._ts)),
                T && (y || (g = this._zTime), (t || !e) && (this._zTime = t)),
                this._repeat)
              ) {
                if (
                  ((_ = this._yoyo),
                  (h = y + this._rDelay),
                  this._repeat < -1 && t < 0)
                )
                  return this.totalTime(100 * h + t, e, i);
                if (
                  ((r = tu(w % h)),
                  w === v
                    ? ((a = this._repeat), (r = y))
                    : ((a = ~~(d = tu(w / h))) && a === d && ((r = y), a--),
                      r > y && (r = y)),
                  (d = tR(this._tTime, h)),
                  !g &&
                    this._tTime &&
                    d !== a &&
                    this._tTime - d * h - this._dur <= 0 &&
                    (d = a),
                  _ && 1 & a && ((r = y - r), (m = 1)),
                  a !== d && !this._lock)
                ) {
                  var b = _ && 1 & d,
                    x = b === (_ && 1 & a);
                  if (
                    (a < d && (b = !b),
                    (g = b ? 0 : w % y ? y : w),
                    (this._lock = 1),
                    (this.render(g || (m ? 0 : tu(a * h)), e, !y)._lock = 0),
                    (this._tTime = w),
                    !e && this.parent && ea(this, "onRepeat"),
                    this.vars.repeatRefresh &&
                      !m &&
                      (this.invalidate()._lock = 1),
                    (g && g !== this._time) ||
                      !this._ts !== u ||
                      (this.vars.onRepeat && !this.parent && !this._act) ||
                      ((y = this._dur),
                      (v = this._tDur),
                      x &&
                        ((this._lock = 2),
                        (g = b ? y : -1e-4),
                        this.render(g, !0),
                        this.vars.repeatRefresh && !m && this.invalidate()),
                      (this._lock = 0),
                      !this._ts && !u))
                  )
                    return this;
                  ek(this, m);
                }
              }
              if (
                (this._hasPause &&
                  !this._forcing &&
                  this._lock < 2 &&
                  (c = tB(this, tu(g), tu(r))) &&
                  (w -= r - (r = c._start)),
                (this._tTime = w),
                (this._time = r),
                (this._act = !f),
                this._initted ||
                  ((this._onUpdate = this.vars.onUpdate),
                  (this._initted = 1),
                  (this._zTime = t),
                  (g = 0)),
                !g && w && !e && !d && (ea(this, "onStart"), this._tTime !== w))
              )
                return this;
              if (r >= g && t >= 0)
                for (n = this._first; n; ) {
                  if (
                    ((s = n._next),
                    (n._act || r >= n._start) && n._ts && c !== n)
                  ) {
                    if (n.parent !== this) return this.render(t, e, i);
                    if (
                      (n.render(
                        n._ts > 0
                          ? (r - n._start) * n._ts
                          : (n._dirty ? n.totalDuration() : n._tDur) +
                              (r - n._start) * n._ts,
                        e,
                        i
                      ),
                      r !== this._time || (!this._ts && !u))
                    ) {
                      (c = 0), s && (w += this._zTime = -1e-8);
                      break;
                    }
                  }
                  n = s;
                }
              else {
                n = this._last;
                for (var S = t < 0 ? t : r; n; ) {
                  if (
                    ((s = n._prev), (n._act || S <= n._end) && n._ts && c !== n)
                  ) {
                    if (n.parent !== this) return this.render(t, e, i);
                    if (
                      (n.render(
                        n._ts > 0
                          ? (S - n._start) * n._ts
                          : (n._dirty ? n.totalDuration() : n._tDur) +
                              (S - n._start) * n._ts,
                        e,
                        i || (o && td(n))
                      ),
                      r !== this._time || (!this._ts && !u))
                    ) {
                      (c = 0), s && (w += this._zTime = S ? -1e-8 : 1e-8);
                      break;
                    }
                  }
                  n = s;
                }
              }
              if (
                c &&
                !e &&
                (this.pause(),
                (c.render(r >= g ? 0 : -1e-8)._zTime = r >= g ? 1 : -1),
                this._ts)
              )
                return (this._start = p), tA(this), this.render(t, e, i);
              this._onUpdate && !e && ea(this, "onUpdate", !0),
                ((w === v && this._tTime >= this.totalDuration()) ||
                  (!w && g)) &&
                  (p === this._start || Math.abs(f) !== Math.abs(this._ts)) &&
                  !this._lock &&
                  ((t || !y) &&
                    ((w === v && this._ts > 0) || (!w && this._ts < 0)) &&
                    tO(this, 1),
                  e ||
                    (t < 0 && !g) ||
                    (!w && !g && v) ||
                    (ea(
                      this,
                      w === v && t >= 0 ? "onComplete" : "onReverseComplete",
                      !0
                    ),
                    this._prom &&
                      !(w < v && this.timeScale() > 0) &&
                      this._prom()));
            }
            return this;
          }),
          (i.add = function (t, e) {
            var i = this;
            if ((O(e) || (e = tX(this, e, t)), !(t instanceof eL))) {
              if (A(t))
                return (
                  t.forEach(function (t) {
                    return i.add(t, e);
                  }),
                  this
                );
              if (S(t)) return this.addLabel(t, e);
              if (!E(t)) return this;
              t = e$.delayedCall(0, t);
            }
            return this !== t ? tN(this, t, e) : this;
          }),
          (i.getChildren = function (t, e, i, r) {
            void 0 === t && (t = !0),
              void 0 === e && (e = !0),
              void 0 === i && (i = !0),
              void 0 === r && (r = -1e8);
            for (var n = [], s = this._first; s; )
              s._start >= r &&
                (s instanceof e$
                  ? e && n.push(s)
                  : (i && n.push(s),
                    t && n.push.apply(n, s.getChildren(!0, e, i)))),
                (s = s._next);
            return n;
          }),
          (i.getById = function (t) {
            for (var e = this.getChildren(1, 1, 1), i = e.length; i--; )
              if (e[i].vars.id === t) return e[i];
          }),
          (i.remove = function (t) {
            return S(t)
              ? this.removeLabel(t)
              : E(t)
              ? this.killTweensOf(t)
              : (t.parent === this && tE(this, t),
                t === this._recent && (this._recent = this._last),
                tM(this));
          }),
          (i.totalTime = function (e, i) {
            return arguments.length
              ? ((this._forcing = 1),
                !this._dp &&
                  this._ts &&
                  (this._start = tu(
                    ey.time -
                      (this._ts > 0
                        ? e / this._ts
                        : -((this.totalDuration() - e) / this._ts))
                  )),
                t.prototype.totalTime.call(this, e, i),
                (this._forcing = 0),
                this)
              : this._tTime;
          }),
          (i.addLabel = function (t, e) {
            return (this.labels[t] = tX(this, e)), this;
          }),
          (i.removeLabel = function (t) {
            return delete this.labels[t], this;
          }),
          (i.addPause = function (t, e, i) {
            var r = e$.delayedCall(0, e || V, i);
            return (
              (r.data = "isPause"),
              (this._hasPause = 1),
              tN(this, r, tX(this, t))
            );
          }),
          (i.removePause = function (t) {
            var e = this._first;
            for (t = tX(this, t); e; )
              e._start === t && "isPause" === e.data && tO(e), (e = e._next);
          }),
          (i.killTweensOf = function (t, e, i) {
            for (var r = this.getTweensOf(t, i), n = r.length; n--; )
              eI !== r[n] && r[n].kill(t, e);
            return this;
          }),
          (i.getTweensOf = function (t, e) {
            for (var i, r = [], n = t0(t), s = this._first, o = O(e); s; )
              s instanceof e$
                ? tf(s._targets, n) &&
                  (o
                    ? (!eI || (s._initted && s._ts)) &&
                      s.globalTime(0) <= e &&
                      s.globalTime(s.totalDuration()) > e
                    : !e || s.isActive()) &&
                  r.push(s)
                : (i = s.getTweensOf(n, e)).length && r.push.apply(r, i),
                (s = s._next);
            return r;
          }),
          (i.tweenTo = function (t, e) {
            e = e || {};
            var i,
              r = this,
              n = tX(r, t),
              s = e,
              o = s.startAt,
              a = s.onStart,
              l = s.onStartParams,
              h = s.immediateRender,
              u = e$.to(
                r,
                tv(
                  {
                    ease: e.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: n,
                    overwrite: "auto",
                    duration:
                      e.duration ||
                      Math.abs(
                        (n - (o && "time" in o ? o.time : r._time)) /
                          r.timeScale()
                      ) ||
                      1e-8,
                    onStart: function () {
                      if ((r.pause(), !i)) {
                        var t =
                          e.duration ||
                          Math.abs(
                            (n - (o && "time" in o ? o.time : r._time)) /
                              r.timeScale()
                          );
                        u._dur !== t && tj(u, t, 0, 1).render(u._time, !0, !0),
                          (i = 1);
                      }
                      a && a.apply(u, l || []);
                    },
                  },
                  e
                )
              );
            return h ? u.render(0) : u;
          }),
          (i.tweenFromTo = function (t, e, i) {
            return this.tweenTo(e, tv({ startAt: { time: tX(this, t) } }, i));
          }),
          (i.recent = function () {
            return this._recent;
          }),
          (i.nextLabel = function (t) {
            return void 0 === t && (t = this._time), eo(this, tX(this, t));
          }),
          (i.previousLabel = function (t) {
            return void 0 === t && (t = this._time), eo(this, tX(this, t), 1);
          }),
          (i.currentLabel = function (t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.previousLabel(this._time + 1e-8);
          }),
          (i.shiftChildren = function (t, e, i) {
            void 0 === i && (i = 0);
            for (var r, n = this._first, s = this.labels; n; )
              n._start >= i && ((n._start += t), (n._end += t)), (n = n._next);
            if (e) for (r in s) s[r] >= i && (s[r] += t);
            return tM(this);
          }),
          (i.invalidate = function (e) {
            var i = this._first;
            for (this._lock = 0; i; ) i.invalidate(e), (i = i._next);
            return t.prototype.invalidate.call(this, e);
          }),
          (i.clear = function (t) {
            void 0 === t && (t = !0);
            for (var e, i = this._first; i; )
              (e = i._next), this.remove(i), (i = e);
            return (
              this._dp && (this._time = this._tTime = this._pTime = 0),
              t && (this.labels = {}),
              tM(this)
            );
          }),
          (i.totalDuration = function (t) {
            var e,
              i,
              r,
              n = 0,
              s = this._last,
              o = 1e8;
            if (arguments.length)
              return this.timeScale(
                (this._repeat < 0 ? this.duration() : this.totalDuration()) /
                  (this.reversed() ? -t : t)
              );
            if (this._dirty) {
              for (r = this.parent; s; )
                (e = s._prev),
                  s._dirty && s.totalDuration(),
                  (i = s._start) > o && this._sort && s._ts && !this._lock
                    ? ((this._lock = 1),
                      (tN(this, s, i - s._delay, 1)._lock = 0))
                    : (o = i),
                  i < 0 &&
                    s._ts &&
                    ((n -= i),
                    ((!r && !this._dp) || (r && r.smoothChildTiming)) &&
                      ((this._start += i / this._ts),
                      (this._time -= i),
                      (this._tTime -= i)),
                    this.shiftChildren(-i, !1, -Infinity),
                    (o = 0)),
                  s._end > n && s._ts && (n = s._end),
                  (s = e);
              tj(this, this === l && this._time > n ? this._time : n, 1, 1),
                (this._dirty = 0);
            }
            return this._tDur;
          }),
          (e.updateRoot = function (t) {
            if ((l._ts && (t_(l, tz(t, l)), (p = ey.frame)), ey.frame >= ti)) {
              ti += m.autoSleep || 120;
              var e = l._first;
              if ((!e || !e._ts) && m.autoSleep && ey._listeners.length < 2) {
                for (; e && !e._ts; ) e = e._next;
                e || ey.sleep();
              }
            }
          }),
          e
        );
      })(eL);
      tv(eN.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
      var eI,
        eF,
        eU = function (t, e, i, r, n, s, o) {
          var a,
            l,
            h,
            u,
            c,
            f,
            p,
            d,
            _ = new it(this._pt, t, e, 0, 1, e3, null, n),
            m = 0,
            g = 0;
          for (
            _.b = i,
              _.e = r,
              i += "",
              r += "",
              (p = ~r.indexOf("random(")) && (r = er(r)),
              s && (s((d = [i, r]), t, e), (i = d[0]), (r = d[1])),
              l = i.match(I) || [];
            (a = I.exec(r));

          )
            (u = a[0]),
              (c = r.substring(m, a.index)),
              h ? (h = (h + 1) % 5) : "rgba(" === c.substr(-5) && (h = 1),
              u !== l[g++] &&
                ((f = parseFloat(l[g - 1]) || 0),
                (_._pt = {
                  _next: _._pt,
                  p: c || 1 === g ? c : ",",
                  s: f,
                  c: "=" === u.charAt(1) ? tc(f, u) - f : parseFloat(u) - f,
                  m: h && h < 4 ? Math.round : 0,
                }),
                (m = I.lastIndex));
          return (
            (_.c = m < r.length ? r.substring(m, r.length) : ""),
            (_.fp = o),
            (F.test(r) || p) && (_.e = 0),
            (this._pt = _),
            _
          );
        },
        eW = function (t, e, i, r, n, s, o, a, l, h) {
          E(r) && (r = r(n || 0, t, s));
          var u,
            c = t[e],
            f =
              "get" !== i
                ? i
                : E(c)
                ? l
                  ? t[
                      e.indexOf("set") || !E(t["get" + e.substr(3)])
                        ? e
                        : "get" + e.substr(3)
                    ](l)
                  : t[e]()
                : c,
            p = E(c) ? (l ? eK : eJ) : eZ;
          if (
            (S(r) &&
              (~r.indexOf("random(") && (r = er(r)),
              "=" === r.charAt(1) &&
                ((u = tc(f, r) + (t$(f) || 0)) || 0 === u) &&
                (r = u)),
            !h || f !== r || eF)
          )
            return isNaN(f * r) || "" === r
              ? (c || e in t || q(e, r),
                eU.call(this, t, e, f, r, p, a || m.stringFilter, l))
              : ((u = new it(
                  this._pt,
                  t,
                  e,
                  +f || 0,
                  r - (f || 0),
                  "boolean" == typeof c ? e5 : e2,
                  0,
                  p
                )),
                l && (u.fp = l),
                o && u.modifier(o, this, t),
                (this._pt = u));
        },
        eH = function (t, e, i, r, n) {
          if (
            (E(t) && (t = eV(t, n, e, i, r)),
            !k(t) || (t.style && t.nodeType) || A(t) || z(t))
          )
            return S(t) ? eV(t, n, e, i, r) : t;
          var s,
            o = {};
          for (s in t) o[s] = eV(t[s], n, e, i, r);
          return o;
        },
        eB = function (t, e, i, r, n, s) {
          var o, a, l, h;
          if (
            tt[t] &&
            !1 !==
              (o = new tt[t]()).init(
                n,
                o.rawVars ? e[t] : eH(e[t], r, n, s, i),
                i,
                r,
                s
              ) &&
            ((i._pt = a =
              new it(i._pt, n, t, 0, 1, o.render, o, 0, o.priority)),
            i !== d)
          )
            for (
              l = i._ptLookup[i._targets.indexOf(n)], h = o._props.length;
              h--;

            )
              l[o._props[h]] = a;
          return o;
        },
        ej = function t(e, i, r) {
          var n,
            a,
            h,
            u,
            c,
            f,
            p,
            d,
            _,
            m,
            v,
            y,
            w,
            T = e.vars,
            b = T.ease,
            x = T.startAt,
            S = T.immediateRender,
            E = T.lazy,
            O = T.onUpdate,
            M = T.runBackwards,
            k = T.yoyoEase,
            P = T.keyframes,
            R = T.autoRevert,
            z = e._dur,
            A = e._startAt,
            D = e._targets,
            L = e.parent,
            N = L && "nested" === L.data ? L.vars.targets : D,
            I = "auto" === e._overwrite && !s,
            F = e.timeline;
          if (
            (!F || (P && b) || (b = "none"),
            (e._ease = eC(b, g.ease)),
            (e._yEase = k ? eM(eC(!0 === k ? b : k, g.ease)) : 0),
            k &&
              e._yoyo &&
              !e._repeat &&
              ((k = e._yEase), (e._yEase = e._ease), (e._ease = k)),
            (e._from = !F && !!T.runBackwards),
            !F || (P && !T.stagger))
          ) {
            if (
              ((y = (d = D[0] ? to(D[0]).harness : 0) && T[d.prop]),
              (n = tT(T, Z)),
              A &&
                (A._zTime < 0 && A.progress(1),
                i < 0 && M && S && !R
                  ? A.render(-1, !0)
                  : A.revert(M && z ? G : Q),
                (A._lazy = 0)),
              x)
            ) {
              if (
                (tO(
                  (e._startAt = e$.set(
                    D,
                    tv(
                      {
                        data: "isStart",
                        overwrite: !1,
                        parent: L,
                        immediateRender: !0,
                        lazy: !A && C(E),
                        startAt: null,
                        delay: 0,
                        onUpdate:
                          O &&
                          function () {
                            return ea(e, "onUpdate");
                          },
                        stagger: 0,
                      },
                      x
                    )
                  ))
                ),
                (e._startAt._dp = 0),
                (e._startAt._sat = e),
                i < 0 && (o || (!S && !R)) && e._startAt.revert(G),
                S && z && i <= 0 && r <= 0)
              ) {
                i && (e._zTime = i);
                return;
              }
            } else if (M && z && !A)
              if (
                (i && (S = !1),
                (h = tv(
                  {
                    overwrite: !1,
                    data: "isFromStart",
                    lazy: S && !A && C(E),
                    immediateRender: S,
                    stagger: 0,
                    parent: L,
                  },
                  n
                )),
                y && (h[d.prop] = y),
                tO((e._startAt = e$.set(D, h))),
                (e._startAt._dp = 0),
                (e._startAt._sat = e),
                i < 0 && (o ? e._startAt.revert(G) : e._startAt.render(-1, !0)),
                (e._zTime = i),
                S)
              ) {
                if (!i) return;
              } else t(e._startAt, 1e-8, 1e-8);
            for (
              a = 0, e._pt = e._ptCache = 0, E = (z && C(E)) || (E && !z);
              a < D.length;
              a++
            ) {
              if (
                ((p = (c = D[a])._gsap || ts(D)[a]._gsap),
                (e._ptLookup[a] = m = {}),
                K[p.id] && J.length && tp(),
                (v = N === D ? a : N.indexOf(c)),
                d &&
                  !1 !== (_ = new d()).init(c, y || n, e, v, N) &&
                  ((e._pt = u =
                    new it(e._pt, c, _.name, 0, 1, _.render, _, 0, _.priority)),
                  _._props.forEach(function (t) {
                    m[t] = u;
                  }),
                  _.priority && (f = 1)),
                !d || y)
              )
                for (h in n)
                  tt[h] && (_ = eB(h, n, e, v, c, N))
                    ? _.priority && (f = 1)
                    : (m[h] = u =
                        eW.call(e, c, h, "get", n[h], v, N, 0, T.stringFilter));
              e._op && e._op[a] && e.kill(c, e._op[a]),
                I &&
                  e._pt &&
                  ((eI = e),
                  l.killTweensOf(c, m, e.globalTime(i)),
                  (w = !e.parent),
                  (eI = 0)),
                e._pt && E && (K[p.id] = 1);
            }
            f && e7(e), e._onInit && e._onInit(e);
          }
          (e._onUpdate = O),
            (e._initted = (!e._op || e._pt) && !w),
            P && i <= 0 && F.render(1e8, !0, !0);
        },
        eq = function (t, e, i, r, n, s, o, a) {
          var l,
            h,
            u,
            c,
            f = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
          if (!f)
            for (
              f = t._ptCache[e] = [], u = t._ptLookup, c = t._targets.length;
              c--;

            ) {
              if ((l = u[c][e]) && l.d && l.d._pt)
                for (l = l.d._pt; l && l.p !== e && l.fp !== e; ) l = l._next;
              if (!l)
                return (
                  (eF = 1),
                  (t.vars[e] = "+=0"),
                  ej(t, o),
                  (eF = 0),
                  a ? Y(e + " not eligible for reset") : 1
                );
              f.push(l);
            }
          for (c = f.length; c--; )
            ((l = (h = f[c])._pt || h).s =
              (r || 0 === r) && !n ? r : l.s + (r || 0) + s * l.c),
              (l.c = i - l.s),
              h.e && (h.e = th(i) + t$(h.e)),
              h.b && (h.b = l.s + t$(h.b));
        },
        eY = function (t, e) {
          var i,
            r,
            n,
            s,
            o = t[0] ? to(t[0]).harness : 0,
            a = o && o.aliases;
          if (!a) return e;
          for (r in ((i = ty({}, e)), a))
            if (r in i)
              for (n = (s = a[r].split(",")).length; n--; ) i[s[n]] = i[r];
          return i;
        },
        eX = function (t, e, i, r) {
          var n,
            s,
            o = e.ease || r || "power1.inOut";
          if (A(e))
            (s = i[t] || (i[t] = [])),
              e.forEach(function (t, i) {
                return s.push({ t: (i / (e.length - 1)) * 100, v: t, e: o });
              });
          else
            for (n in e)
              (s = i[n] || (i[n] = [])),
                "ease" === n || s.push({ t: parseFloat(t), v: e[n], e: o });
        },
        eV = function (t, e, i, r, n) {
          return E(t)
            ? t.call(e, i, r, n)
            : S(t) && ~t.indexOf("random(")
            ? er(t)
            : t;
        },
        eQ = tn + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
        eG = {};
      tl(eQ + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
        return (eG[t] = 1);
      });
      var e$ = (function (t) {
        function e(e, i, n, o) {
          "number" == typeof i && ((n.duration = i), (i = n), (n = null));
          var a,
            h,
            u,
            c,
            f,
            p,
            d,
            _,
            g = t.call(this, o ? i : tb(i)) || this,
            v = g.vars,
            y = v.duration,
            w = v.delay,
            T = v.immediateRender,
            b = v.stagger,
            x = v.overwrite,
            S = v.keyframes,
            E = v.defaults,
            M = v.scrollTrigger,
            P = v.yoyoEase,
            D = i.parent || l,
            L = (A(e) || z(e) ? O(e[0]) : "length" in i) ? [e] : t0(e);
          if (
            ((g._targets = L.length
              ? ts(L)
              : Y(
                  "GSAP target " + e + " not found. https://gsap.com",
                  !m.nullTargetWarn
                ) || []),
            (g._ptLookup = []),
            (g._overwrite = x),
            S || b || R(y) || R(w))
          ) {
            if (
              ((i = g.vars),
              (a = g.timeline =
                new eN({
                  data: "nested",
                  defaults: E || {},
                  targets: D && "nested" === D.data ? D.vars.targets : L,
                })).kill(),
              (a.parent = a._dp = r(g)),
              (a._start = 0),
              b || R(y) || R(w))
            ) {
              if (((c = L.length), (d = b && t5(b)), k(b)))
                for (f in b) ~eQ.indexOf(f) && (_ || (_ = {}), (_[f] = b[f]));
              for (h = 0; h < c; h++)
                ((u = tT(i, eG)).stagger = 0),
                  P && (u.yoyoEase = P),
                  _ && ty(u, _),
                  (p = L[h]),
                  (u.duration = +eV(y, r(g), h, p, L)),
                  (u.delay = (+eV(w, r(g), h, p, L) || 0) - g._delay),
                  !b &&
                    1 === c &&
                    u.delay &&
                    ((g._delay = w = u.delay), (g._start += w), (u.delay = 0)),
                  a.to(p, u, d ? d(h, p, L) : 0),
                  (a._ease = eT.none);
              a.duration() ? (y = w = 0) : (g.timeline = 0);
            } else if (S) {
              tb(tv(a.vars.defaults, { ease: "none" })),
                (a._ease = eC(S.ease || i.ease || "none"));
              var N,
                I,
                F,
                U = 0;
              if (A(S))
                S.forEach(function (t) {
                  return a.to(L, t, ">");
                }),
                  a.duration();
              else {
                for (f in ((u = {}), S))
                  "ease" === f ||
                    "easeEach" === f ||
                    eX(f, S[f], u, S.easeEach);
                for (f in u)
                  for (
                    h = 0,
                      N = u[f].sort(function (t, e) {
                        return t.t - e.t;
                      }),
                      U = 0;
                    h < N.length;
                    h++
                  )
                    ((F = {
                      ease: (I = N[h]).e,
                      duration: ((I.t - (h ? N[h - 1].t : 0)) / 100) * y,
                    })[f] = I.v),
                      a.to(L, F, U),
                      (U += F.duration);
                a.duration() < y && a.to({}, { duration: y - a.duration() });
              }
            }
            y || g.duration((y = a.duration()));
          } else g.timeline = 0;
          return (
            !0 !== x || s || ((eI = r(g)), l.killTweensOf(L), (eI = 0)),
            tN(D, r(g), n),
            i.reversed && g.reverse(),
            i.paused && g.paused(!0),
            (T ||
              (!y &&
                !S &&
                g._start === tu(D._time) &&
                C(T) &&
                (function t(e) {
                  return !e || (e._ts && t(e.parent));
                })(r(g)) &&
                "nested" !== D.data)) &&
              ((g._tTime = -1e-8), g.render(Math.max(0, -w) || 0)),
            M && tI(r(g), M),
            g
          );
        }
        n(e, t);
        var i = e.prototype;
        return (
          (i.render = function (t, e, i) {
            var r,
              n,
              s,
              o,
              a,
              l,
              h,
              u,
              c,
              f = this._time,
              p = this._tDur,
              d = this._dur,
              _ = t < 0,
              m = t > p - 1e-8 && !_ ? p : t < 1e-8 ? 0 : t;
            if (d) {
              if (
                m !== this._tTime ||
                !t ||
                i ||
                (!this._initted && this._tTime) ||
                (this._startAt && this._zTime < 0 !== _) ||
                this._lazy
              ) {
                if (((r = m), (u = this.timeline), this._repeat)) {
                  if (((o = d + this._rDelay), this._repeat < -1 && _))
                    return this.totalTime(100 * o + t, e, i);
                  if (
                    ((r = tu(m % o)),
                    m === p
                      ? ((s = this._repeat), (r = d))
                      : (s = ~~(a = tu(m / o))) && s === a
                      ? ((r = d), s--)
                      : r > d && (r = d),
                    (l = this._yoyo && 1 & s) &&
                      ((c = this._yEase), (r = d - r)),
                    (a = tR(this._tTime, o)),
                    r === f && !i && this._initted && s === a)
                  )
                    return (this._tTime = m), this;
                  s !== a &&
                    (u && this._yEase && ek(u, l),
                    this.vars.repeatRefresh &&
                      !l &&
                      !this._lock &&
                      r !== o &&
                      this._initted &&
                      ((this._lock = i = 1),
                      (this.render(tu(o * s), !0).invalidate()._lock = 0)));
                }
                if (!this._initted) {
                  if (tF(this, _ ? t : r, i, e, m))
                    return (this._tTime = 0), this;
                  if (
                    f !== this._time &&
                    !(i && this.vars.repeatRefresh && s !== a)
                  )
                    return this;
                  if (d !== this._dur) return this.render(t, e, i);
                }
                if (
                  ((this._tTime = m),
                  (this._time = r),
                  !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                  (this.ratio = h = (c || this._ease)(r / d)),
                  this._from && (this.ratio = h = 1 - h),
                  !f &&
                    m &&
                    !e &&
                    !a &&
                    (ea(this, "onStart"), this._tTime !== m))
                )
                  return this;
                for (n = this._pt; n; ) n.r(h, n.d), (n = n._next);
                (u &&
                  u.render(
                    t < 0 ? t : u._dur * u._ease(r / this._dur),
                    e,
                    i
                  )) ||
                  (this._startAt && (this._zTime = t)),
                  this._onUpdate &&
                    !e &&
                    (_ && tC(this, t, e, i), ea(this, "onUpdate")),
                  this._repeat &&
                    s !== a &&
                    this.vars.onRepeat &&
                    !e &&
                    this.parent &&
                    ea(this, "onRepeat"),
                  (m === this._tDur || !m) &&
                    this._tTime === m &&
                    (_ && !this._onUpdate && tC(this, t, !0, !0),
                    (t || !d) &&
                      ((m === this._tDur && this._ts > 0) ||
                        (!m && this._ts < 0)) &&
                      tO(this, 1),
                    !e &&
                      !(_ && !f) &&
                      (m || f || l) &&
                      (ea(
                        this,
                        m === p ? "onComplete" : "onReverseComplete",
                        !0
                      ),
                      this._prom &&
                        !(m < p && this.timeScale() > 0) &&
                        this._prom()));
              }
            } else tH(this, t, e, i);
            return this;
          }),
          (i.targets = function () {
            return this._targets;
          }),
          (i.invalidate = function (e) {
            return (
              (e && this.vars.runBackwards) || (this._startAt = 0),
              (this._pt =
                this._op =
                this._onUpdate =
                this._lazy =
                this.ratio =
                  0),
              (this._ptLookup = []),
              this.timeline && this.timeline.invalidate(e),
              t.prototype.invalidate.call(this, e)
            );
          }),
          (i.resetTo = function (t, e, i, r, n) {
            _ || ey.wake(), this._ts || this.play();
            var s = Math.min(
              this._dur,
              (this._dp._time - this._start) * this._ts
            );
            return (this._initted || ej(this, s),
            eq(this, t, e, i, r, this._ease(s / this._dur), s, n))
              ? this.resetTo(t, e, i, r, 1)
              : (tD(this, 0),
                this.parent ||
                  tS(
                    this._dp,
                    this,
                    "_first",
                    "_last",
                    this._dp._sort ? "_start" : 0
                  ),
                this.render(0));
          }),
          (i.kill = function (t, e) {
            if ((void 0 === e && (e = "all"), !t && (!e || "all" === e)))
              return (
                (this._lazy = this._pt = 0),
                this.parent
                  ? el(this)
                  : this.scrollTrigger && this.scrollTrigger.kill(!!o),
                this
              );
            if (this.timeline) {
              var i = this.timeline.totalDuration();
              return (
                this.timeline.killTweensOf(t, e, eI && !0 !== eI.vars.overwrite)
                  ._first || el(this),
                this.parent &&
                  i !== this.timeline.totalDuration() &&
                  tj(this, (this._dur * this.timeline._tDur) / i, 0, 1),
                this
              );
            }
            var r,
              n,
              s,
              a,
              l,
              h,
              u,
              c = this._targets,
              f = t ? t0(t) : c,
              p = this._ptLookup,
              d = this._pt;
            if ((!e || "all" === e) && tx(c, f))
              return "all" === e && (this._pt = 0), el(this);
            for (
              r = this._op = this._op || [],
                "all" !== e &&
                  (S(e) &&
                    ((l = {}),
                    tl(e, function (t) {
                      return (l[t] = 1);
                    }),
                    (e = l)),
                  (e = eY(c, e))),
                u = c.length;
              u--;

            )
              if (~f.indexOf(c[u]))
                for (l in ((n = p[u]),
                "all" === e
                  ? ((r[u] = e), (a = n), (s = {}))
                  : ((s = r[u] = r[u] || {}), (a = e)),
                a))
                  (h = n && n[l]) &&
                    (("kill" in h.d && !0 !== h.d.kill(l)) ||
                      tE(this, h, "_pt"),
                    delete n[l]),
                    "all" !== s && (s[l] = 1);
            return this._initted && !this._pt && d && el(this), this;
          }),
          (e.to = function (t, i) {
            return new e(t, i, arguments[2]);
          }),
          (e.from = function (t, e) {
            return tV(1, arguments);
          }),
          (e.delayedCall = function (t, i, r, n) {
            return new e(i, 0, {
              immediateRender: !1,
              lazy: !1,
              overwrite: !1,
              delay: t,
              onComplete: i,
              onReverseComplete: i,
              onCompleteParams: r,
              onReverseCompleteParams: r,
              callbackScope: n,
            });
          }),
          (e.fromTo = function (t, e, i) {
            return tV(2, arguments);
          }),
          (e.set = function (t, i) {
            return (
              (i.duration = 0), i.repeatDelay || (i.repeat = 0), new e(t, i)
            );
          }),
          (e.killTweensOf = function (t, e, i) {
            return l.killTweensOf(t, e, i);
          }),
          e
        );
      })(eL);
      tv(e$.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0,
      }),
        tl("staggerTo,staggerFrom,staggerFromTo", function (t) {
          e$[t] = function () {
            var e = new eN(),
              i = tJ.call(arguments, 0);
            return (
              i.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, i)
            );
          };
        });
      var eZ = function (t, e, i) {
          return (t[e] = i);
        },
        eJ = function (t, e, i) {
          return t[e](i);
        },
        eK = function (t, e, i, r) {
          return t[e](r.fp, i);
        },
        e0 = function (t, e, i) {
          return t.setAttribute(e, i);
        },
        e1 = function (t, e) {
          return E(t[e]) ? eJ : M(t[e]) && t.setAttribute ? e0 : eZ;
        },
        e2 = function (t, e) {
          return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
        },
        e5 = function (t, e) {
          return e.set(e.t, e.p, !!(e.s + e.c * t), e);
        },
        e3 = function (t, e) {
          var i = e._pt,
            r = "";
          if (!t && e.b) r = e.b;
          else if (1 === t && e.e) r = e.e;
          else {
            for (; i; )
              (r =
                i.p +
                (i.m
                  ? i.m(i.s + i.c * t)
                  : Math.round((i.s + i.c * t) * 1e4) / 1e4) +
                r),
                (i = i._next);
            r += e.c;
          }
          e.set(e.t, e.p, r, e);
        },
        e8 = function (t, e) {
          for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next);
        },
        e6 = function (t, e, i, r) {
          for (var n, s = this._pt; s; )
            (n = s._next), s.p === r && s.modifier(t, e, i), (s = n);
        },
        e4 = function (t) {
          for (var e, i, r = this._pt; r; )
            (i = r._next),
              (r.p !== t || r.op) && r.op !== t
                ? r.dep || (e = 1)
                : tE(this, r, "_pt"),
              (r = i);
          return !e;
        },
        e9 = function (t, e, i, r) {
          r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
        },
        e7 = function (t) {
          for (var e, i, r, n, s = t._pt; s; ) {
            for (e = s._next, i = r; i && i.pr > s.pr; ) i = i._next;
            (s._prev = i ? i._prev : n) ? (s._prev._next = s) : (r = s),
              (s._next = i) ? (i._prev = s) : (n = s),
              (s = e);
          }
          t._pt = r;
        },
        it = (function () {
          function t(t, e, i, r, n, s, o, a, l) {
            (this.t = e),
              (this.s = r),
              (this.c = n),
              (this.p = i),
              (this.r = s || e2),
              (this.d = o || this),
              (this.set = a || eZ),
              (this.pr = l || 0),
              (this._next = t),
              t && (t._prev = this);
          }
          return (
            (t.prototype.modifier = function (t, e, i) {
              (this.mSet = this.mSet || this.set),
                (this.set = e9),
                (this.m = t),
                (this.mt = i),
                (this.tween = e);
            }),
            t
          );
        })();
      tl(
        tn +
          "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
        function (t) {
          return (Z[t] = 1);
        }
      ),
        (H.TweenMax = H.TweenLite = e$),
        (H.TimelineLite = H.TimelineMax = eN),
        (l = new eN({
          sortChildren: !1,
          defaults: g,
          autoRemoveChildren: !0,
          id: "root",
          smoothChildTiming: !0,
        })),
        (m.stringFilter = ev);
      var ie = [],
        ii = {},
        ir = [],
        is = 0,
        io = 0,
        ia = function (t) {
          return (ii[t] || ir).map(function (t) {
            return t();
          });
        },
        il = function () {
          var t = Date.now(),
            e = [];
          t - is > 2 &&
            (ia("matchMediaInit"),
            ie.forEach(function (t) {
              var i,
                r,
                n,
                s,
                o = t.queries,
                a = t.conditions;
              for (r in o)
                (i = h.matchMedia(o[r]).matches) && (n = 1),
                  i !== a[r] && ((a[r] = i), (s = 1));
              s && (t.revert(), n && e.push(t));
            }),
            ia("matchMediaRevert"),
            e.forEach(function (t) {
              return t.onMatch(t, function (e) {
                return t.add(null, e);
              });
            }),
            (is = t),
            ia("matchMedia"));
        },
        ih = (function () {
          function t(t, e) {
            (this.selector = e && t1(e)),
              (this.data = []),
              (this._r = []),
              (this.isReverted = !1),
              (this.id = io++),
              t && this.add(t);
          }
          var e = t.prototype;
          return (
            (e.add = function (t, e, i) {
              E(t) && ((i = e), (e = t), (t = E));
              var r = this,
                n = function () {
                  var t,
                    n = a,
                    s = r.selector;
                  return (
                    n && n !== r && n.data.push(r),
                    i && (r.selector = t1(i)),
                    (a = r),
                    (t = e.apply(r, arguments)),
                    E(t) && r._r.push(t),
                    (a = n),
                    (r.selector = s),
                    (r.isReverted = !1),
                    t
                  );
                };
              return (
                (r.last = n),
                t === E
                  ? n(r, function (t) {
                      return r.add(null, t);
                    })
                  : t
                  ? (r[t] = n)
                  : n
              );
            }),
            (e.ignore = function (t) {
              var e = a;
              (a = null), t(this), (a = e);
            }),
            (e.getTweens = function () {
              var e = [];
              return (
                this.data.forEach(function (i) {
                  return i instanceof t
                    ? e.push.apply(e, i.getTweens())
                    : i instanceof e$ &&
                        !(i.parent && "nested" === i.parent.data) &&
                        e.push(i);
                }),
                e
              );
            }),
            (e.clear = function () {
              this._r.length = this.data.length = 0;
            }),
            (e.kill = function (t, e) {
              var i = this;
              if (t) {
                for (var r, n = i.getTweens(), s = i.data.length; s--; )
                  "isFlip" === (r = i.data[s]).data &&
                    (r.revert(),
                    r.getChildren(!0, !0, !1).forEach(function (t) {
                      return n.splice(n.indexOf(t), 1);
                    }));
                for (
                  n
                    .map(function (t) {
                      return {
                        g:
                          t._dur ||
                          t._delay ||
                          (t._sat && !t._sat.vars.immediateRender)
                            ? t.globalTime(0)
                            : -1 / 0,
                        t: t,
                      };
                    })
                    .sort(function (t, e) {
                      return e.g - t.g || -1 / 0;
                    })
                    .forEach(function (e) {
                      return e.t.revert(t);
                    }),
                    s = i.data.length;
                  s--;

                )
                  (r = i.data[s]) instanceof eN
                    ? "nested" !== r.data &&
                      (r.scrollTrigger && r.scrollTrigger.revert(), r.kill())
                    : r instanceof e$ || !r.revert || r.revert(t);
                i._r.forEach(function (e) {
                  return e(t, i);
                }),
                  (i.isReverted = !0);
              } else
                this.data.forEach(function (t) {
                  return t.kill && t.kill();
                });
              if ((this.clear(), e))
                for (var o = ie.length; o--; )
                  ie[o].id === this.id && ie.splice(o, 1);
            }),
            (e.revert = function (t) {
              this.kill(t || {});
            }),
            t
          );
        })(),
        iu = (function () {
          function t(t) {
            (this.contexts = []), (this.scope = t), a && a.data.push(this);
          }
          var e = t.prototype;
          return (
            (e.add = function (t, e, i) {
              k(t) || (t = { matches: t });
              var r,
                n,
                s,
                o = new ih(0, i || this.scope),
                l = (o.conditions = {});
              for (n in (a && !o.selector && (o.selector = a.selector),
              this.contexts.push(o),
              (e = o.add("onMatch", e)),
              (o.queries = t),
              t))
                "all" === n
                  ? (s = 1)
                  : (r = h.matchMedia(t[n])) &&
                    (0 > ie.indexOf(o) && ie.push(o),
                    (l[n] = r.matches) && (s = 1),
                    r.addListener
                      ? r.addListener(il)
                      : r.addEventListener("change", il));
              return (
                s &&
                  e(o, function (t) {
                    return o.add(null, t);
                  }),
                this
              );
            }),
            (e.revert = function (t) {
              this.kill(t || {});
            }),
            (e.kill = function (t) {
              this.contexts.forEach(function (e) {
                return e.kill(t, !0);
              });
            }),
            t
          );
        })(),
        ic = {
          registerPlugin: function () {
            for (var t = arguments.length, e = Array(t), i = 0; i < t; i++)
              e[i] = arguments[i];
            e.forEach(function (t) {
              return eu(t);
            });
          },
          timeline: function (t) {
            return new eN(t);
          },
          getTweensOf: function (t, e) {
            return l.getTweensOf(t, e);
          },
          getProperty: function (t, e, i, r) {
            S(t) && (t = t0(t)[0]);
            var n = to(t || {}).get,
              s = i ? tg : tm;
            return (
              "native" === i && (i = ""),
              t
                ? e
                  ? s(((tt[e] && tt[e].get) || n)(t, e, i, r))
                  : function (e, i, r) {
                      return s(((tt[e] && tt[e].get) || n)(t, e, i, r));
                    }
                : t
            );
          },
          quickSetter: function (t, e, i) {
            if ((t = t0(t)).length > 1) {
              var r = t.map(function (t) {
                  return im.quickSetter(t, e, i);
                }),
                n = r.length;
              return function (t) {
                for (var e = n; e--; ) r[e](t);
              };
            }
            t = t[0] || {};
            var s = tt[e],
              o = to(t),
              a = (o.harness && (o.harness.aliases || {})[e]) || e,
              l = s
                ? function (e) {
                    var r = new s();
                    (d._pt = 0),
                      r.init(t, i ? e + i : e, d, 0, [t]),
                      r.render(1, r),
                      d._pt && e8(1, d);
                  }
                : o.set(t, a);
            return s
              ? l
              : function (e) {
                  return l(t, a, i ? e + i : e, o, 1);
                };
          },
          quickTo: function (t, e, i) {
            var r,
              n = im.to(
                t,
                tv(
                  (((r = {})[e] = "+=0.1"),
                  (r.paused = !0),
                  (r.stagger = 0),
                  r),
                  i || {}
                )
              ),
              s = function (t, i, r) {
                return n.resetTo(e, t, i, r);
              };
            return (s.tween = n), s;
          },
          isTweening: function (t) {
            return l.getTweensOf(t, !0).length > 0;
          },
          defaults: function (t) {
            return t && t.ease && (t.ease = eC(t.ease, g.ease)), tw(g, t || {});
          },
          config: function (t) {
            return tw(m, t || {});
          },
          registerEffect: function (t) {
            var e = t.name,
              i = t.effect,
              r = t.plugins,
              n = t.defaults,
              s = t.extendTimeline;
            (r || "").split(",").forEach(function (t) {
              return (
                t &&
                !tt[t] &&
                !H[t] &&
                Y(e + " effect requires " + t + " plugin.")
              );
            }),
              (te[e] = function (t, e, r) {
                return i(t0(t), tv(e || {}, n), r);
              }),
              s &&
                (eN.prototype[e] = function (t, i, r) {
                  return this.add(te[e](t, k(i) ? i : (r = i) && {}, this), r);
                });
          },
          registerEase: function (t, e) {
            eT[t] = eC(e);
          },
          parseEase: function (t, e) {
            return arguments.length ? eC(t, e) : eT;
          },
          getById: function (t) {
            return l.getById(t);
          },
          exportRoot: function (t, e) {
            void 0 === t && (t = {});
            var i,
              r,
              n = new eN(t);
            for (
              n.smoothChildTiming = C(t.smoothChildTiming),
                l.remove(n),
                n._dp = 0,
                n._time = n._tTime = l._time,
                i = l._first;
              i;

            )
              (r = i._next),
                (e ||
                  !(
                    !i._dur &&
                    i instanceof e$ &&
                    i.vars.onComplete === i._targets[0]
                  )) &&
                  tN(n, i, i._start - i._delay),
                (i = r);
            return tN(l, n, 0), n;
          },
          context: function (t, e) {
            return t ? new ih(t, e) : a;
          },
          matchMedia: function (t) {
            return new iu(t);
          },
          matchMediaRefresh: function () {
            return (
              ie.forEach(function (t) {
                var e,
                  i,
                  r = t.conditions;
                for (i in r) r[i] && ((r[i] = !1), (e = 1));
                e && t.revert();
              }) || il()
            );
          },
          addEventListener: function (t, e) {
            var i = ii[t] || (ii[t] = []);
            ~i.indexOf(e) || i.push(e);
          },
          removeEventListener: function (t, e) {
            var i = ii[t],
              r = i && i.indexOf(e);
            r >= 0 && i.splice(r, 1);
          },
          utils: {
            wrap: ee,
            wrapYoyo: ei,
            distribute: t5,
            random: t6,
            snap: t8,
            normalize: t7,
            getUnit: t$,
            clamp: tZ,
            splitColor: ep,
            toArray: t0,
            selector: t1,
            mapRange: en,
            pipe: t4,
            unitize: t9,
            interpolate: es,
            shuffle: t2,
          },
          install: j,
          effects: te,
          ticker: ey,
          updateRoot: eN.updateRoot,
          plugins: tt,
          globalTimeline: l,
          core: {
            PropTween: it,
            globals: X,
            Tween: e$,
            Timeline: eN,
            Animation: eL,
            getCache: to,
            _removeLinkedListItem: tE,
            reverting: function () {
              return o;
            },
            context: function (t) {
              return t && a && (a.data.push(t), (t._ctx = a)), a;
            },
            suppressOverwrites: function (t) {
              return (s = t);
            },
          },
        };
      tl("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
        return (ic[t] = e$[t]);
      }),
        ey.add(eN.updateRoot),
        (d = ic.to({}, { duration: 0 }));
      var ip = function (t, e) {
          for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
            i = i._next;
          return i;
        },
        id = function (t, e) {
          var i,
            r,
            n,
            s = t._targets;
          for (i in e)
            for (r = s.length; r--; )
              (n = t._ptLookup[r][i]) &&
                (n = n.d) &&
                (n._pt && (n = ip(n, i)),
                n && n.modifier && n.modifier(e[i], t, s[r], i));
        },
        i_ = function (t, e) {
          return {
            name: t,
            headless: 1,
            rawVars: 1,
            init: function (t, i, r) {
              r._onInit = function (t) {
                var r, n;
                if (
                  (S(i) &&
                    ((r = {}),
                    tl(i, function (t) {
                      return (r[t] = 1);
                    }),
                    (i = r)),
                  e)
                ) {
                  for (n in ((r = {}), i)) r[n] = e(i[n]);
                  i = r;
                }
                id(t, i);
              };
            },
          };
        },
        im =
          ic.registerPlugin(
            {
              name: "attr",
              init: function (t, e, i, r, n) {
                var s, o, a;
                for (s in ((this.tween = i), e))
                  (a = t.getAttribute(s) || ""),
                    ((o = this.add(
                      t,
                      "setAttribute",
                      (a || 0) + "",
                      e[s],
                      r,
                      n,
                      0,
                      0,
                      s
                    )).op = s),
                    (o.b = a),
                    this._props.push(s);
              },
              render: function (t, e) {
                for (var i = e._pt; i; )
                  o ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), (i = i._next);
              },
            },
            {
              name: "endArray",
              headless: 1,
              init: function (t, e) {
                for (var i = e.length; i--; )
                  this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
              },
            },
            i_("roundProps", t3),
            i_("modifiers"),
            i_("snap", t8)
          ) || ic;
      (e$.version = eN.version = im.version = "3.13.0"), (f = 1), P() && ew();
      var ig = eT.Power0,
        iv = eT.Power1,
        iy = eT.Power2,
        iw = eT.Power3,
        iT = eT.Power4,
        ib = eT.Linear,
        ix = eT.Quad,
        iS = eT.Cubic,
        iE = eT.Quart,
        iO = eT.Quint,
        iM = eT.Strong,
        ik = eT.Elastic,
        iC = eT.Back,
        iP = eT.SteppedEase,
        iR = eT.Bounce,
        iz = eT.Sine,
        iA = eT.Expo,
        iD = eT.Circ;
    },
    12188: (t) => {
      "use strict";
      var { g: e, __dirname: i } = t;
      t.s({
        CSSPlugin: () => ty,
        _createElement: () => I,
        _getBBox: () => q,
        checkPrefix: () => W,
        default: () => ty,
      });
      var r,
        n,
        s,
        o,
        a,
        l,
        h,
        u = t.i(37670),
        c = {},
        f = 180 / Math.PI,
        p = Math.PI / 180,
        d = Math.atan2,
        _ = /([A-Z])/g,
        m = /(left|right|width|margin|padding|x)/i,
        g = /[\s,\(]\S/,
        v = {
          autoAlpha: "opacity,visibility",
          scale: "scaleX,scaleY",
          alpha: "opacity",
        },
        y = function (t, e) {
          return e.set(
            e.t,
            e.p,
            Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u,
            e
          );
        },
        w = function (t, e) {
          return e.set(
            e.t,
            e.p,
            1 === t ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u,
            e
          );
        },
        T = function (t, e) {
          return e.set(
            e.t,
            e.p,
            t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b,
            e
          );
        },
        b = function (t, e) {
          var i = e.s + e.c * t;
          e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
        },
        x = function (t, e) {
          return e.set(e.t, e.p, t ? e.e : e.b, e);
        },
        S = function (t, e) {
          return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        },
        E = function (t, e, i) {
          return (t.style[e] = i);
        },
        O = function (t, e, i) {
          return t.style.setProperty(e, i);
        },
        M = function (t, e, i) {
          return (t._gsap[e] = i);
        },
        k = function (t, e, i) {
          return (t._gsap.scaleX = t._gsap.scaleY = i);
        },
        C = function (t, e, i, r, n) {
          var s = t._gsap;
          (s.scaleX = s.scaleY = i), s.renderTransform(n, s);
        },
        P = function (t, e, i, r, n) {
          var s = t._gsap;
          (s[e] = i), s.renderTransform(n, s);
        },
        R = "transform",
        z = R + "Origin",
        A = function t(e, i) {
          var r = this,
            n = this.target,
            s = n.style,
            o = n._gsap;
          if (e in c && s) {
            if (((this.tfm = this.tfm || {}), "transform" === e))
              return v.transform.split(",").forEach(function (e) {
                return t.call(r, e, i);
              });
            if (
              (~(e = v[e] || e).indexOf(",")
                ? e.split(",").forEach(function (t) {
                    return (r.tfm[t] = Z(n, t));
                  })
                : (this.tfm[e] = o.x ? o[e] : Z(n, e)),
              e === z && (this.tfm.zOrigin = o.zOrigin),
              this.props.indexOf(R) >= 0)
            )
              return;
            o.svg &&
              ((this.svgo = n.getAttribute("data-svg-origin")),
              this.props.push(z, i, "")),
              (e = R);
          }
          (s || i) && this.props.push(e, i, s[e]);
        },
        D = function (t) {
          t.translate &&
            (t.removeProperty("translate"),
            t.removeProperty("scale"),
            t.removeProperty("rotate"));
        },
        L = function () {
          var t,
            e,
            i = this.props,
            r = this.target,
            n = r.style,
            s = r._gsap;
          for (t = 0; t < i.length; t += 3)
            i[t + 1]
              ? 2 === i[t + 1]
                ? r[i[t]](i[t + 2])
                : (r[i[t]] = i[t + 2])
              : i[t + 2]
              ? (n[i[t]] = i[t + 2])
              : n.removeProperty(
                  "--" === i[t].substr(0, 2)
                    ? i[t]
                    : i[t].replace(_, "-$1").toLowerCase()
                );
          if (this.tfm) {
            for (e in this.tfm) s[e] = this.tfm[e];
            s.svg &&
              (s.renderTransform(),
              r.setAttribute("data-svg-origin", this.svgo || "")),
              ((t = l()) && t.isStart) ||
                n[R] ||
                (D(n),
                s.zOrigin &&
                  n[z] &&
                  ((n[z] += " " + s.zOrigin + "px"),
                  (s.zOrigin = 0),
                  s.renderTransform()),
                (s.uncache = 1));
          }
        },
        N = function (t, e) {
          var i = { target: t, props: [], revert: L, save: A };
          return (
            t._gsap || u.gsap.core.getCache(t),
            e &&
              t.style &&
              t.nodeType &&
              e.split(",").forEach(function (t) {
                return i.save(t);
              }),
            i
          );
        },
        I = function (t, e) {
          var i = r.createElementNS
            ? r.createElementNS(
                (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
                t
              )
            : r.createElement(t);
          return i && i.style ? i : r.createElement(t);
        },
        F = function t(e, i, r) {
          var n = getComputedStyle(e);
          return (
            n[i] ||
            n.getPropertyValue(i.replace(_, "-$1").toLowerCase()) ||
            n.getPropertyValue(i) ||
            (!r && t(e, W(i) || i, 1)) ||
            ""
          );
        },
        U = "O,Moz,ms,Ms,Webkit".split(","),
        W = function (t, e, i) {
          var r = (e || o).style,
            n = 5;
          if (t in r && !i) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1);
            n-- && !(U[n] + t in r);

          );
          return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? U[n] : "") + t;
        },
        H = function () {
          "undefined" != typeof window &&
            window.document &&
            ((n = (r = window.document).documentElement),
            (o = I("div") || { style: {} }),
            I("div"),
            (z = (R = W(R)) + "Origin"),
            (o.style.cssText =
              "border-width:0;line-height:0;position:absolute;padding:0"),
            (h = !!W("perspective")),
            (l = u.gsap.core.reverting),
            (s = 1));
        },
        B = function (t) {
          var e,
            i = t.ownerSVGElement,
            r = I(
              "svg",
              (i && i.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"
            ),
            s = t.cloneNode(!0);
          (s.style.display = "block"), r.appendChild(s), n.appendChild(r);
          try {
            e = s.getBBox();
          } catch (t) {}
          return r.removeChild(s), n.removeChild(r), e;
        },
        j = function (t, e) {
          for (var i = e.length; i--; )
            if (t.hasAttribute(e[i])) return t.getAttribute(e[i]);
        },
        q = function (t) {
          var e, i;
          try {
            e = t.getBBox();
          } catch (r) {
            (e = B(t)), (i = 1);
          }
          return (
            (e && (e.width || e.height)) || i || (e = B(t)),
            !e || e.width || e.x || e.y
              ? e
              : {
                  x: +j(t, ["x", "cx", "x1"]) || 0,
                  y: +j(t, ["y", "cy", "y1"]) || 0,
                  width: 0,
                  height: 0,
                }
          );
        },
        Y = function (t) {
          return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && q(t));
        },
        X = function (t, e) {
          if (e) {
            var i,
              r = t.style;
            e in c && e !== z && (e = R),
              r.removeProperty
                ? (("ms" === (i = e.substr(0, 2)) ||
                    "webkit" === e.substr(0, 6)) &&
                    (e = "-" + e),
                  r.removeProperty(
                    "--" === i ? e : e.replace(_, "-$1").toLowerCase()
                  ))
                : r.removeAttribute(e);
          }
        },
        V = function (t, e, i, r, n, s) {
          var o = new u.PropTween(t._pt, e, i, 0, 1, s ? S : x);
          return (t._pt = o), (o.b = r), (o.e = n), t._props.push(i), o;
        },
        Q = { deg: 1, rad: 1, turn: 1 },
        G = { grid: 1, flex: 1 },
        $ = function t(e, i, n, s) {
          var a,
            l,
            h,
            f,
            p = parseFloat(n) || 0,
            d = (n + "").trim().substr((p + "").length) || "px",
            _ = o.style,
            g = m.test(i),
            v = "svg" === e.tagName.toLowerCase(),
            y = (v ? "client" : "offset") + (g ? "Width" : "Height"),
            w = "px" === s,
            T = "%" === s;
          if (s === d || !p || Q[s] || Q[d]) return p;
          if (
            ("px" === d || w || (p = t(e, i, n, "px")),
            (f = e.getCTM && Y(e)),
            (T || "%" === d) && (c[i] || ~i.indexOf("adius")))
          )
            return (
              (a = f ? e.getBBox()[g ? "width" : "height"] : e[y]),
              (0, u._round)(T ? (p / a) * 100 : (p / 100) * a)
            );
          if (
            ((_[g ? "width" : "height"] = 100 + (w ? d : s)),
            (l =
              ("rem" !== s && ~i.indexOf("adius")) ||
              ("em" === s && e.appendChild && !v)
                ? e
                : e.parentNode),
            f && (l = (e.ownerSVGElement || {}).parentNode),
            (l && l !== r && l.appendChild) || (l = r.body),
            (h = l._gsap) &&
              T &&
              h.width &&
              g &&
              h.time === u._ticker.time &&
              !h.uncache)
          )
            return (0, u._round)((p / h.width) * 100);
          if (T && ("height" === i || "width" === i)) {
            var b = e.style[i];
            (e.style[i] = 100 + s), (a = e[y]), b ? (e.style[i] = b) : X(e, i);
          } else
            (T || "%" === d) &&
              !G[F(l, "display")] &&
              (_.position = F(e, "position")),
              l === e && (_.position = "static"),
              l.appendChild(o),
              (a = o[y]),
              l.removeChild(o),
              (_.position = "absolute");
          return (
            g &&
              T &&
              (((h = (0, u._getCache)(l)).time = u._ticker.time),
              (h.width = l[y])),
            (0, u._round)(w ? (a * p) / 100 : a && p ? (100 / a) * p : 0)
          );
        },
        Z = function (t, e, i, r) {
          var n;
          return (
            s || H(),
            e in v &&
              "transform" !== e &&
              ~(e = v[e]).indexOf(",") &&
              (e = e.split(",")[0]),
            c[e] && "transform" !== e
              ? ((n = th(t, r)),
                (n =
                  "transformOrigin" !== e
                    ? n[e]
                    : n.svg
                    ? n.origin
                    : tu(F(t, z)) + " " + n.zOrigin + "px"))
              : (!(n = t.style[e]) ||
                  "auto" === n ||
                  r ||
                  ~(n + "").indexOf("calc(")) &&
                (n =
                  (ti[e] && ti[e](t, e, i)) ||
                  F(t, e) ||
                  (0, u._getProperty)(t, e) ||
                  +("opacity" === e)),
            i && !~(n + "").trim().indexOf(" ") ? $(t, e, n, i) + i : n
          );
        },
        J = function (t, e, i, r) {
          if (!i || "none" === i) {
            var n = W(e, t, 1),
              s = n && F(t, n, 1);
            s && s !== i
              ? ((e = n), (i = s))
              : "borderColor" === e && (i = F(t, "borderTopColor"));
          }
          var o,
            a,
            l,
            h,
            c,
            f,
            p,
            d,
            _,
            m,
            g,
            v = new u.PropTween(
              this._pt,
              t.style,
              e,
              0,
              1,
              u._renderComplexString
            ),
            y = 0,
            w = 0;
          if (
            ((v.b = i),
            (v.e = r),
            (i += ""),
            "var(--" === (r += "").substring(0, 6) &&
              (r = F(t, r.substring(4, r.indexOf(")")))),
            "auto" === r &&
              ((f = t.style[e]),
              (t.style[e] = r),
              (r = F(t, e) || r),
              f ? (t.style[e] = f) : X(t, e)),
            (o = [i, r]),
            (0, u._colorStringFilter)(o),
            (i = o[0]),
            (r = o[1]),
            (l = i.match(u._numWithUnitExp) || []),
            (r.match(u._numWithUnitExp) || []).length)
          ) {
            for (; (a = u._numWithUnitExp.exec(r)); )
              (p = a[0]),
                (_ = r.substring(y, a.index)),
                c
                  ? (c = (c + 1) % 5)
                  : ("rgba(" === _.substr(-5) || "hsla(" === _.substr(-5)) &&
                    (c = 1),
                p !== (f = l[w++] || "") &&
                  ((h = parseFloat(f) || 0),
                  (g = f.substr((h + "").length)),
                  "=" === p.charAt(1) && (p = (0, u._parseRelative)(h, p) + g),
                  (d = parseFloat(p)),
                  (m = p.substr((d + "").length)),
                  (y = u._numWithUnitExp.lastIndex - m.length),
                  m ||
                    ((m = m || u._config.units[e] || g),
                    y === r.length && ((r += m), (v.e += m))),
                  g !== m && (h = $(t, e, f, m) || 0),
                  (v._pt = {
                    _next: v._pt,
                    p: _ || 1 === w ? _ : ",",
                    s: h,
                    c: d - h,
                    m: (c && c < 4) || "zIndex" === e ? Math.round : 0,
                  }));
            v.c = y < r.length ? r.substring(y, r.length) : "";
          } else v.r = "display" === e && "none" === r ? S : x;
          return u._relExp.test(r) && (v.e = 0), (this._pt = v), v;
        },
        K = {
          top: "0%",
          bottom: "100%",
          left: "0%",
          right: "100%",
          center: "50%",
        },
        tt = function (t) {
          var e = t.split(" "),
            i = e[0],
            r = e[1] || "50%";
          return (
            ("top" === i || "bottom" === i || "left" === r || "right" === r) &&
              ((t = i), (i = r), (r = t)),
            (e[0] = K[i] || i),
            (e[1] = K[r] || r),
            e.join(" ")
          );
        },
        te = function (t, e) {
          if (e.tween && e.tween._time === e.tween._dur) {
            var i,
              r,
              n,
              s = e.t,
              o = s.style,
              a = e.u,
              l = s._gsap;
            if ("all" === a || !0 === a) (o.cssText = ""), (r = 1);
            else
              for (n = (a = a.split(",")).length; --n > -1; )
                c[(i = a[n])] &&
                  ((r = 1), (i = "transformOrigin" === i ? z : R)),
                  X(s, i);
            r &&
              (X(s, R),
              l &&
                (l.svg && s.removeAttribute("transform"),
                (o.scale = o.rotate = o.translate = "none"),
                th(s, 1),
                (l.uncache = 1),
                D(o)));
          }
        },
        ti = {
          clearProps: function (t, e, i, r, n) {
            if ("isFromStart" !== n.data) {
              var s = (t._pt = new u.PropTween(t._pt, e, i, 0, 0, te));
              return (
                (s.u = r), (s.pr = -10), (s.tween = n), t._props.push(i), 1
              );
            }
          },
        },
        tr = [1, 0, 0, 1, 0, 0],
        tn = {},
        ts = function (t) {
          return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
        },
        to = function (t) {
          var e = F(t, R);
          return ts(e) ? tr : e.substr(7).match(u._numExp).map(u._round);
        },
        ta = function (t, e) {
          var i,
            r,
            s,
            o,
            a = t._gsap || (0, u._getCache)(t),
            l = t.style,
            h = to(t);
          return a.svg && t.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
              (h = [
                (s = t.transform.baseVal.consolidate().matrix).a,
                s.b,
                s.c,
                s.d,
                s.e,
                s.f,
              ]).join(",")
              ? tr
              : h
            : (h !== tr ||
                t.offsetParent ||
                t === n ||
                a.svg ||
                ((s = l.display),
                (l.display = "block"),
                ((i = t.parentNode) &&
                  (t.offsetParent || t.getBoundingClientRect().width)) ||
                  ((o = 1), (r = t.nextElementSibling), n.appendChild(t)),
                (h = to(t)),
                s ? (l.display = s) : X(t, "display"),
                o &&
                  (r
                    ? i.insertBefore(t, r)
                    : i
                    ? i.appendChild(t)
                    : n.removeChild(t))),
              e && h.length > 6 ? [h[0], h[1], h[4], h[5], h[12], h[13]] : h);
        },
        tl = function (t, e, i, r, n, s) {
          var o,
            a,
            l,
            h,
            u = t._gsap,
            c = n || ta(t, !0),
            f = u.xOrigin || 0,
            p = u.yOrigin || 0,
            d = u.xOffset || 0,
            _ = u.yOffset || 0,
            m = c[0],
            g = c[1],
            v = c[2],
            y = c[3],
            w = c[4],
            T = c[5],
            b = e.split(" "),
            x = parseFloat(b[0]) || 0,
            S = parseFloat(b[1]) || 0;
          i
            ? c !== tr &&
              (a = m * y - g * v) &&
              ((l = (y / a) * x + (-v / a) * S + (v * T - y * w) / a),
              (h = (-g / a) * x + (m / a) * S - (m * T - g * w) / a),
              (x = l),
              (S = h))
            : ((x =
                (o = q(t)).x + (~b[0].indexOf("%") ? (x / 100) * o.width : x)),
              (S =
                o.y +
                (~(b[1] || b[0]).indexOf("%") ? (S / 100) * o.height : S))),
            r || (!1 !== r && u.smooth)
              ? ((u.xOffset = d + ((w = x - f) * m + (T = S - p) * v) - w),
                (u.yOffset = _ + (w * g + T * y) - T))
              : (u.xOffset = u.yOffset = 0),
            (u.xOrigin = x),
            (u.yOrigin = S),
            (u.smooth = !!r),
            (u.origin = e),
            (u.originIsAbsolute = !!i),
            (t.style[z] = "0px 0px"),
            s &&
              (V(s, u, "xOrigin", f, x),
              V(s, u, "yOrigin", p, S),
              V(s, u, "xOffset", d, u.xOffset),
              V(s, u, "yOffset", _, u.yOffset)),
            t.setAttribute("data-svg-origin", x + " " + S);
        },
        th = function (t, e) {
          var i = t._gsap || new u.GSCache(t);
          if ("x" in i && !e && !i.uncache) return i;
          var r,
            n,
            s,
            o,
            a,
            l,
            c,
            _,
            m,
            g,
            v,
            y,
            w,
            T,
            b,
            x,
            S,
            E,
            O,
            M,
            k,
            C,
            P,
            A,
            D,
            L,
            N,
            I,
            U,
            W,
            H,
            B,
            j = t.style,
            q = i.scaleX < 0,
            X = getComputedStyle(t),
            V = F(t, z) || "0";
          return (
            (r = n = s = l = c = _ = m = g = v = 0),
            (o = a = 1),
            (i.svg = !!(t.getCTM && Y(t))),
            X.translate &&
              (("none" !== X.translate ||
                "none" !== X.scale ||
                "none" !== X.rotate) &&
                (j[R] =
                  ("none" !== X.translate
                    ? "translate3d(" +
                      (X.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                      ") "
                    : "") +
                  ("none" !== X.rotate ? "rotate(" + X.rotate + ") " : "") +
                  ("none" !== X.scale
                    ? "scale(" + X.scale.split(" ").join(",") + ") "
                    : "") +
                  ("none" !== X[R] ? X[R] : "")),
              (j.scale = j.rotate = j.translate = "none")),
            (T = ta(t, i.svg)),
            i.svg &&
              (i.uncache
                ? ((D = t.getBBox()),
                  (V = i.xOrigin - D.x + "px " + (i.yOrigin - D.y) + "px"),
                  (A = ""))
                : (A = !e && t.getAttribute("data-svg-origin")),
              tl(t, A || V, !!A || i.originIsAbsolute, !1 !== i.smooth, T)),
            (y = i.xOrigin || 0),
            (w = i.yOrigin || 0),
            T !== tr &&
              ((E = T[0]),
              (O = T[1]),
              (M = T[2]),
              (k = T[3]),
              (r = C = T[4]),
              (n = P = T[5]),
              6 === T.length
                ? ((o = Math.sqrt(E * E + O * O)),
                  (a = Math.sqrt(k * k + M * M)),
                  (l = E || O ? d(O, E) * f : 0),
                  (m = M || k ? d(M, k) * f + l : 0) &&
                    (a *= Math.abs(Math.cos(m * p))),
                  i.svg &&
                    ((r -= y - (y * E + w * M)), (n -= w - (y * O + w * k))))
                : ((B = T[6]),
                  (W = T[7]),
                  (N = T[8]),
                  (I = T[9]),
                  (U = T[10]),
                  (H = T[11]),
                  (r = T[12]),
                  (n = T[13]),
                  (s = T[14]),
                  (c = (b = d(B, U)) * f),
                  b &&
                    ((A = C * (x = Math.cos(-b)) + N * (S = Math.sin(-b))),
                    (D = P * x + I * S),
                    (L = B * x + U * S),
                    (N = -(C * S) + N * x),
                    (I = -(P * S) + I * x),
                    (U = -(B * S) + U * x),
                    (H = -(W * S) + H * x),
                    (C = A),
                    (P = D),
                    (B = L)),
                  (_ = (b = d(-M, U)) * f),
                  b &&
                    ((A = E * (x = Math.cos(-b)) - N * (S = Math.sin(-b))),
                    (D = O * x - I * S),
                    (L = M * x - U * S),
                    (H = k * S + H * x),
                    (E = A),
                    (O = D),
                    (M = L)),
                  (l = (b = d(O, E)) * f),
                  b &&
                    ((A = E * (x = Math.cos(b)) + O * (S = Math.sin(b))),
                    (D = C * x + P * S),
                    (O = O * x - E * S),
                    (P = P * x - C * S),
                    (E = A),
                    (C = D)),
                  c &&
                    Math.abs(c) + Math.abs(l) > 359.9 &&
                    ((c = l = 0), (_ = 180 - _)),
                  (o = (0, u._round)(Math.sqrt(E * E + O * O + M * M))),
                  (a = (0, u._round)(Math.sqrt(P * P + B * B))),
                  (m = Math.abs((b = d(C, P))) > 2e-4 ? b * f : 0),
                  (v = H ? 1 / (H < 0 ? -H : H) : 0)),
              i.svg &&
                ((A = t.getAttribute("transform")),
                (i.forceCSS = t.setAttribute("transform", "") || !ts(F(t, R))),
                A && t.setAttribute("transform", A))),
            Math.abs(m) > 90 &&
              270 > Math.abs(m) &&
              (q
                ? ((o *= -1),
                  (m += l <= 0 ? 180 : -180),
                  (l += l <= 0 ? 180 : -180))
                : ((a *= -1), (m += m <= 0 ? 180 : -180))),
            (e = e || i.uncache),
            (i.x =
              r -
              ((i.xPercent =
                r &&
                ((!e && i.xPercent) ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-r) ? -50 : 0)))
                ? (t.offsetWidth * i.xPercent) / 100
                : 0) +
              "px"),
            (i.y =
              n -
              ((i.yPercent =
                n &&
                ((!e && i.yPercent) ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-n)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * i.yPercent) / 100
                : 0) +
              "px"),
            (i.z = s + "px"),
            (i.scaleX = (0, u._round)(o)),
            (i.scaleY = (0, u._round)(a)),
            (i.rotation = (0, u._round)(l) + "deg"),
            (i.rotationX = (0, u._round)(c) + "deg"),
            (i.rotationY = (0, u._round)(_) + "deg"),
            (i.skewX = m + "deg"),
            (i.skewY = g + "deg"),
            (i.transformPerspective = v + "px"),
            (i.zOrigin =
              parseFloat(V.split(" ")[2]) || (!e && i.zOrigin) || 0) &&
              (j[z] = tu(V)),
            (i.xOffset = i.yOffset = 0),
            (i.force3D = u._config.force3D),
            (i.renderTransform = i.svg ? t_ : h ? td : tf),
            (i.uncache = 0),
            i
          );
        },
        tu = function (t) {
          return (t = t.split(" "))[0] + " " + t[1];
        },
        tc = function (t, e, i) {
          var r = (0, u.getUnit)(e);
          return (
            (0, u._round)(parseFloat(e) + parseFloat($(t, "x", i + "px", r))) +
            r
          );
        },
        tf = function (t, e) {
          (e.z = "0px"),
            (e.rotationY = e.rotationX = "0deg"),
            (e.force3D = 0),
            td(t, e);
        },
        tp = "0deg",
        td = function (t, e) {
          var i = e || this,
            r = i.xPercent,
            n = i.yPercent,
            s = i.x,
            o = i.y,
            a = i.z,
            l = i.rotation,
            h = i.rotationY,
            u = i.rotationX,
            c = i.skewX,
            f = i.skewY,
            d = i.scaleX,
            _ = i.scaleY,
            m = i.transformPerspective,
            g = i.force3D,
            v = i.target,
            y = i.zOrigin,
            w = "",
            T = ("auto" === g && t && 1 !== t) || !0 === g;
          if (y && (u !== tp || h !== tp)) {
            var b,
              x = parseFloat(h) * p,
              S = Math.sin(x),
              E = Math.cos(x);
            (s = tc(v, s, -(S * (b = Math.cos((x = parseFloat(u) * p))) * y))),
              (o = tc(v, o, -(-Math.sin(x) * y))),
              (a = tc(v, a, -(E * b * y) + y));
          }
          "0px" !== m && (w += "perspective(" + m + ") "),
            (r || n) && (w += "translate(" + r + "%, " + n + "%) "),
            (T || "0px" !== s || "0px" !== o || "0px" !== a) &&
              (w +=
                "0px" !== a || T
                  ? "translate3d(" + s + ", " + o + ", " + a + ") "
                  : "translate(" + s + ", " + o + ") "),
            l !== tp && (w += "rotate(" + l + ") "),
            h !== tp && (w += "rotateY(" + h + ") "),
            u !== tp && (w += "rotateX(" + u + ") "),
            (c !== tp || f !== tp) && (w += "skew(" + c + ", " + f + ") "),
            (1 !== d || 1 !== _) && (w += "scale(" + d + ", " + _ + ") "),
            (v.style[R] = w || "translate(0, 0)");
        },
        t_ = function (t, e) {
          var i,
            r,
            n,
            s,
            o,
            a = e || this,
            l = a.xPercent,
            h = a.yPercent,
            c = a.x,
            f = a.y,
            d = a.rotation,
            _ = a.skewX,
            m = a.skewY,
            g = a.scaleX,
            v = a.scaleY,
            y = a.target,
            w = a.xOrigin,
            T = a.yOrigin,
            b = a.xOffset,
            x = a.yOffset,
            S = a.forceCSS,
            E = parseFloat(c),
            O = parseFloat(f);
          (d = parseFloat(d)),
            (_ = parseFloat(_)),
            (m = parseFloat(m)) && ((_ += m = parseFloat(m)), (d += m)),
            d || _
              ? ((d *= p),
                (_ *= p),
                (i = Math.cos(d) * g),
                (r = Math.sin(d) * g),
                (n = -(Math.sin(d - _) * v)),
                (s = Math.cos(d - _) * v),
                _ &&
                  ((m *= p),
                  (n *= o = Math.sqrt(1 + (o = Math.tan(_ - m)) * o)),
                  (s *= o),
                  m &&
                    ((i *= o = Math.sqrt(1 + (o = Math.tan(m)) * o)),
                    (r *= o))),
                (i = (0, u._round)(i)),
                (r = (0, u._round)(r)),
                (n = (0, u._round)(n)),
                (s = (0, u._round)(s)))
              : ((i = g), (s = v), (r = n = 0)),
            ((E && !~(c + "").indexOf("px")) ||
              (O && !~(f + "").indexOf("px"))) &&
              ((E = $(y, "x", c, "px")), (O = $(y, "y", f, "px"))),
            (w || T || b || x) &&
              ((E = (0, u._round)(E + w - (w * i + T * n) + b)),
              (O = (0, u._round)(O + T - (w * r + T * s) + x))),
            (l || h) &&
              ((o = y.getBBox()),
              (E = (0, u._round)(E + (l / 100) * o.width)),
              (O = (0, u._round)(O + (h / 100) * o.height))),
            (o =
              "matrix(" +
              i +
              "," +
              r +
              "," +
              n +
              "," +
              s +
              "," +
              E +
              "," +
              O +
              ")"),
            y.setAttribute("transform", o),
            S && (y.style[R] = o);
        },
        tm = function (t, e, i, r, n) {
          var s,
            o,
            a = (0, u._isString)(n),
            l = parseFloat(n) * (a && ~n.indexOf("rad") ? f : 1) - r,
            h = r + l + "deg";
          return (
            a &&
              ("short" === (s = n.split("_")[1]) &&
                (l %= 360) != l % 180 &&
                (l += l < 0 ? 360 : -360),
              "cw" === s && l < 0
                ? (l = ((l + 36e9) % 360) - 360 * ~~(l / 360))
                : "ccw" === s &&
                  l > 0 &&
                  (l = ((l - 36e9) % 360) - 360 * ~~(l / 360))),
            (t._pt = o = new u.PropTween(t._pt, e, i, r, l, w)),
            (o.e = h),
            (o.u = "deg"),
            t._props.push(i),
            o
          );
        },
        tg = function (t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        },
        tv = function (t, e, i) {
          var r,
            n,
            s,
            o,
            a,
            l,
            h,
            f = tg({}, i._gsap),
            p = i.style;
          for (n in (f.svg
            ? ((s = i.getAttribute("transform")),
              i.setAttribute("transform", ""),
              (p[R] = e),
              (r = th(i, 1)),
              X(i, R),
              i.setAttribute("transform", s))
            : ((s = getComputedStyle(i)[R]),
              (p[R] = e),
              (r = th(i, 1)),
              (p[R] = s)),
          c))
            (s = f[n]) !== (o = r[n]) &&
              0 > "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) &&
              ((a =
                (0, u.getUnit)(s) !== (h = (0, u.getUnit)(o))
                  ? $(i, n, s, h)
                  : parseFloat(s)),
              (l = parseFloat(o)),
              (t._pt = new u.PropTween(t._pt, r, n, a, l - a, y)),
              (t._pt.u = h || 0),
              t._props.push(n));
          tg(r, f);
        };
      (0, u._forEachName)("padding,margin,Width,Radius", function (t, e) {
        var i = "Right",
          r = "Bottom",
          n = "Left",
          s = (
            e < 3 ? ["Top", i, r, n] : ["Top" + n, "Top" + i, r + i, r + n]
          ).map(function (i) {
            return e < 2 ? t + i : "border" + i + t;
          });
        ti[e > 1 ? "border" + t : t] = function (t, e, i, r, n) {
          var o, a;
          if (arguments.length < 4)
            return 5 ===
              (a = (o = s.map(function (e) {
                return Z(t, e, i);
              })).join(" ")).split(o[0]).length
              ? o[0]
              : a;
          (o = (r + "").split(" ")),
            (a = {}),
            s.forEach(function (t, e) {
              return (a[t] = o[e] = o[e] || o[((e - 1) / 2) | 0]);
            }),
            t.init(e, a, n);
        };
      });
      var ty = {
        name: "css",
        register: H,
        targetTest: function (t) {
          return t.style && t.nodeType;
        },
        init: function (t, e, i, r, n) {
          var o,
            a,
            l,
            h,
            f,
            p,
            d,
            _,
            m,
            w,
            x,
            S,
            E,
            O,
            M,
            k,
            C = this._props,
            P = t.style,
            A = i.vars.startAt;
          for (d in (s || H(),
          (this.styles = this.styles || N(t)),
          (k = this.styles.props),
          (this.tween = i),
          e))
            if (
              "autoRound" !== d &&
              ((a = e[d]),
              !(u._plugins[d] && (0, u._checkPlugin)(d, e, i, r, t, n)))
            ) {
              if (
                ((f = typeof a),
                (p = ti[d]),
                "function" === f && (f = typeof (a = a.call(i, r, t, n))),
                "string" === f &&
                  ~a.indexOf("random(") &&
                  (a = (0, u._replaceRandom)(a)),
                p)
              )
                p(this, t, d, a, i) && (M = 1);
              else if ("--" === d.substr(0, 2))
                (o = (getComputedStyle(t).getPropertyValue(d) + "").trim()),
                  (a += ""),
                  (u._colorExp.lastIndex = 0),
                  u._colorExp.test(o) ||
                    ((_ = (0, u.getUnit)(o)), (m = (0, u.getUnit)(a))),
                  m ? _ !== m && (o = $(t, d, o, m) + m) : _ && (a += _),
                  this.add(P, "setProperty", o, a, r, n, 0, 0, d),
                  C.push(d),
                  k.push(d, 0, P[d]);
              else if ("undefined" !== f) {
                if (
                  (A && d in A
                    ? ((o =
                        "function" == typeof A[d]
                          ? A[d].call(i, r, t, n)
                          : A[d]),
                      (0, u._isString)(o) &&
                        ~o.indexOf("random(") &&
                        (o = (0, u._replaceRandom)(o)),
                      (0, u.getUnit)(o + "") ||
                        "auto" === o ||
                        (o +=
                          u._config.units[d] || (0, u.getUnit)(Z(t, d)) || ""),
                      "=" === (o + "").charAt(1) && (o = Z(t, d)))
                    : (o = Z(t, d)),
                  (h = parseFloat(o)),
                  (w =
                    "string" === f && "=" === a.charAt(1) && a.substr(0, 2)) &&
                    (a = a.substr(2)),
                  (l = parseFloat(a)),
                  d in v &&
                    ("autoAlpha" === d &&
                      (1 === h &&
                        "hidden" === Z(t, "visibility") &&
                        l &&
                        (h = 0),
                      k.push("visibility", 0, P.visibility),
                      V(
                        this,
                        P,
                        "visibility",
                        h ? "inherit" : "hidden",
                        l ? "inherit" : "hidden",
                        !l
                      )),
                    "scale" !== d &&
                      "transform" !== d &&
                      ~(d = v[d]).indexOf(",") &&
                      (d = d.split(",")[0])),
                  (x = d in c))
                ) {
                  if (
                    (this.styles.save(d),
                    "string" === f &&
                      "var(--" === a.substring(0, 6) &&
                      (l = parseFloat(
                        (a = F(t, a.substring(4, a.indexOf(")"))))
                      )),
                    S ||
                      (((E = t._gsap).renderTransform && !e.parseTransform) ||
                        th(t, e.parseTransform),
                      (O = !1 !== e.smoothOrigin && E.smooth),
                      ((S = this._pt =
                        new u.PropTween(
                          this._pt,
                          P,
                          R,
                          0,
                          1,
                          E.renderTransform,
                          E,
                          0,
                          -1
                        )).dep = 1)),
                    "scale" === d)
                  )
                    (this._pt = new u.PropTween(
                      this._pt,
                      E,
                      "scaleY",
                      E.scaleY,
                      (w ? (0, u._parseRelative)(E.scaleY, w + l) : l) -
                        E.scaleY || 0,
                      y
                    )),
                      (this._pt.u = 0),
                      C.push("scaleY", d),
                      (d += "X");
                  else if ("transformOrigin" === d) {
                    k.push(z, 0, P[z]),
                      (a = tt(a)),
                      E.svg
                        ? tl(t, a, 0, O, 0, this)
                        : ((m = parseFloat(a.split(" ")[2]) || 0) !==
                            E.zOrigin && V(this, E, "zOrigin", E.zOrigin, m),
                          V(this, P, d, tu(o), tu(a)));
                    continue;
                  } else if ("svgOrigin" === d) {
                    tl(t, a, 1, O, 0, this);
                    continue;
                  } else if (d in tn) {
                    tm(this, E, d, h, w ? (0, u._parseRelative)(h, w + a) : a);
                    continue;
                  } else if ("smoothOrigin" === d) {
                    V(this, E, "smooth", E.smooth, a);
                    continue;
                  } else if ("force3D" === d) {
                    E[d] = a;
                    continue;
                  } else if ("transform" === d) {
                    tv(this, a, t);
                    continue;
                  }
                } else d in P || (d = W(d) || d);
                if (
                  x ||
                  ((l || 0 === l) && (h || 0 === h) && !g.test(a) && d in P)
                )
                  (_ = (o + "").substr((h + "").length)),
                    l || (l = 0),
                    (m =
                      (0, u.getUnit)(a) ||
                      (d in u._config.units ? u._config.units[d] : _)),
                    _ !== m && (h = $(t, d, o, m)),
                    (this._pt = new u.PropTween(
                      this._pt,
                      x ? E : P,
                      d,
                      h,
                      (w ? (0, u._parseRelative)(h, w + l) : l) - h,
                      !x && ("px" === m || "zIndex" === d) && !1 !== e.autoRound
                        ? b
                        : y
                    )),
                    (this._pt.u = m || 0),
                    _ !== m &&
                      "%" !== m &&
                      ((this._pt.b = o), (this._pt.r = T));
                else if (d in P) J.call(this, t, d, o, w ? w + a : a);
                else if (d in t) this.add(t, d, o || t[d], w ? w + a : a, r, n);
                else if ("parseTransform" !== d) {
                  (0, u._missingPlugin)(d, a);
                  continue;
                }
                x ||
                  (d in P
                    ? k.push(d, 0, P[d])
                    : "function" == typeof t[d]
                    ? k.push(d, 2, t[d]())
                    : k.push(d, 1, o || t[d])),
                  C.push(d);
              }
            }
          M && (0, u._sortPropTweensByPriority)(this);
        },
        render: function (t, e) {
          if (e.tween._time || !l())
            for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next);
          else e.styles.revert();
        },
        get: Z,
        aliases: v,
        getSetter: function (t, e, i) {
          var r = v[e];
          return (
            r && 0 > r.indexOf(",") && (e = r),
            e in c && e !== z && (t._gsap.x || Z(t, "x"))
              ? i && a === i
                ? "scale" === e
                  ? k
                  : M
                : ((a = i || {}), "scale" === e ? C : P)
              : t.style && !(0, u._isUndefined)(t.style[e])
              ? E
              : ~e.indexOf("-")
              ? O
              : (0, u._getSetter)(t, e)
          );
        },
        core: { _removeProperty: X, _getMatrix: ta },
      };
      (u.gsap.utils.checkPrefix = W),
        (u.gsap.core.getStyleSaver = N),
        (function (t, e, i, r) {
          var n = (0, u._forEachName)(t + "," + e + "," + i, function (t) {
            c[t] = 1;
          });
          (0, u._forEachName)(e, function (t) {
            (u._config.units[t] = "deg"), (tn[t] = 1);
          }),
            (v[n[13]] = t + "," + e),
            (0, u._forEachName)(r, function (t) {
              var e = t.split(":");
              v[e[1]] = n[e[0]];
            });
        })(
          "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
          "rotation,rotationX,rotationY,skewX,skewY",
          "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
          "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
        ),
        (0, u._forEachName)(
          "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
          function (t) {
            u._config.units[t] = "px";
          }
        ),
        u.gsap.registerPlugin(ty);
    },
    17170: (t) => {
      "use strict";
      var { g: e, __dirname: i } = t;
      t.s({ TweenMax: () => o, default: () => s, gsap: () => s });
      var r = t.i(37670),
        n = t.i(12188),
        s = r.gsap.registerPlugin(n.CSSPlugin) || r.gsap,
        o = s.core.Tween;
    },
    72375: (t) => {
      "use strict";
      var { g: e, __dirname: i } = t;
      function r(t, e, i) {
        return Math.max(t, Math.min(e, i));
      }
      t.s({ default: () => c });
      var n = class {
          isRunning = !1;
          value = 0;
          from = 0;
          to = 0;
          currentTime = 0;
          lerp;
          duration;
          easing;
          onUpdate;
          advance(t) {
            if (!this.isRunning) return;
            let e = !1;
            if (this.duration && this.easing) {
              this.currentTime += t;
              let i = r(0, this.currentTime / this.duration, 1),
                n = (e = i >= 1) ? 1 : this.easing(i);
              this.value = this.from + (this.to - this.from) * n;
            } else if (this.lerp) {
              var i, n, s, o;
              (this.value =
                ((i = this.value),
                (n = this.to),
                (s = 60 * this.lerp),
                (1 - (o = 1 - Math.exp(-s * t))) * i + o * n)),
                Math.round(this.value) === this.to &&
                  ((this.value = this.to), (e = !0));
            } else (this.value = this.to), (e = !0);
            e && this.stop(), this.onUpdate?.(this.value, e);
          }
          stop() {
            this.isRunning = !1;
          }
          fromTo(
            t,
            e,
            { lerp: i, duration: r, easing: n, onStart: s, onUpdate: o }
          ) {
            (this.from = this.value = t),
              (this.to = e),
              (this.lerp = i),
              (this.duration = r),
              (this.easing = n),
              (this.currentTime = 0),
              (this.isRunning = !0),
              s?.(),
              (this.onUpdate = o);
          }
        },
        s = class {
          constructor(t, e, { autoResize: i = !0, debounce: r = 250 } = {}) {
            (this.wrapper = t),
              (this.content = e),
              i &&
                ((this.debouncedResize = (function (t, e) {
                  let i;
                  return function (...r) {
                    let n = this;
                    clearTimeout(i),
                      (i = setTimeout(() => {
                        (i = void 0), t.apply(n, r);
                      }, e));
                  };
                })(this.resize, r)),
                this.wrapper instanceof Window
                  ? window.addEventListener("resize", this.debouncedResize, !1)
                  : ((this.wrapperResizeObserver = new ResizeObserver(
                      this.debouncedResize
                    )),
                    this.wrapperResizeObserver.observe(this.wrapper)),
                (this.contentResizeObserver = new ResizeObserver(
                  this.debouncedResize
                )),
                this.contentResizeObserver.observe(this.content)),
              this.resize();
          }
          width = 0;
          height = 0;
          scrollHeight = 0;
          scrollWidth = 0;
          debouncedResize;
          wrapperResizeObserver;
          contentResizeObserver;
          destroy() {
            this.wrapperResizeObserver?.disconnect(),
              this.contentResizeObserver?.disconnect(),
              this.wrapper === window &&
                this.debouncedResize &&
                window.removeEventListener("resize", this.debouncedResize, !1);
          }
          resize = () => {
            this.onWrapperResize(), this.onContentResize();
          };
          onWrapperResize = () => {
            this.wrapper instanceof Window
              ? ((this.width = window.innerWidth),
                (this.height = window.innerHeight))
              : ((this.width = this.wrapper.clientWidth),
                (this.height = this.wrapper.clientHeight));
          };
          onContentResize = () => {
            this.wrapper instanceof Window
              ? ((this.scrollHeight = this.content.scrollHeight),
                (this.scrollWidth = this.content.scrollWidth))
              : ((this.scrollHeight = this.wrapper.scrollHeight),
                (this.scrollWidth = this.wrapper.scrollWidth));
          };
          get limit() {
            return {
              x: this.scrollWidth - this.width,
              y: this.scrollHeight - this.height,
            };
          }
        },
        o = class {
          events = {};
          emit(t, ...e) {
            let i = this.events[t] || [];
            for (let t = 0, r = i.length; t < r; t++) i[t]?.(...e);
          }
          on(t, e) {
            return (
              this.events[t]?.push(e) || (this.events[t] = [e]),
              () => {
                this.events[t] = this.events[t]?.filter((t) => e !== t);
              }
            );
          }
          off(t, e) {
            this.events[t] = this.events[t]?.filter((t) => e !== t);
          }
          destroy() {
            this.events = {};
          }
        },
        a = 100 / 6,
        l = { passive: !1 },
        h = class {
          constructor(t, e = { wheelMultiplier: 1, touchMultiplier: 1 }) {
            (this.element = t),
              (this.options = e),
              window.addEventListener("resize", this.onWindowResize, !1),
              this.onWindowResize(),
              this.element.addEventListener("wheel", this.onWheel, l),
              this.element.addEventListener("touchstart", this.onTouchStart, l),
              this.element.addEventListener("touchmove", this.onTouchMove, l),
              this.element.addEventListener("touchend", this.onTouchEnd, l);
          }
          touchStart = { x: 0, y: 0 };
          lastDelta = { x: 0, y: 0 };
          window = { width: 0, height: 0 };
          emitter = new o();
          on(t, e) {
            return this.emitter.on(t, e);
          }
          destroy() {
            this.emitter.destroy(),
              window.removeEventListener("resize", this.onWindowResize, !1),
              this.element.removeEventListener("wheel", this.onWheel, l),
              this.element.removeEventListener(
                "touchstart",
                this.onTouchStart,
                l
              ),
              this.element.removeEventListener(
                "touchmove",
                this.onTouchMove,
                l
              ),
              this.element.removeEventListener("touchend", this.onTouchEnd, l);
          }
          onTouchStart = (t) => {
            let { clientX: e, clientY: i } = t.targetTouches
              ? t.targetTouches[0]
              : t;
            (this.touchStart.x = e),
              (this.touchStart.y = i),
              (this.lastDelta = { x: 0, y: 0 }),
              this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t });
          };
          onTouchMove = (t) => {
            let { clientX: e, clientY: i } = t.targetTouches
                ? t.targetTouches[0]
                : t,
              r = -(e - this.touchStart.x) * this.options.touchMultiplier,
              n = -(i - this.touchStart.y) * this.options.touchMultiplier;
            (this.touchStart.x = e),
              (this.touchStart.y = i),
              (this.lastDelta = { x: r, y: n }),
              this.emitter.emit("scroll", { deltaX: r, deltaY: n, event: t });
          };
          onTouchEnd = (t) => {
            this.emitter.emit("scroll", {
              deltaX: this.lastDelta.x,
              deltaY: this.lastDelta.y,
              event: t,
            });
          };
          onWheel = (t) => {
            let { deltaX: e, deltaY: i, deltaMode: r } = t,
              n = 1 === r ? a : 2 === r ? this.window.width : 1,
              s = 1 === r ? a : 2 === r ? this.window.height : 1;
            (e *= n),
              (i *= s),
              (e *= this.options.wheelMultiplier),
              (i *= this.options.wheelMultiplier),
              this.emitter.emit("scroll", { deltaX: e, deltaY: i, event: t });
          };
          onWindowResize = () => {
            this.window = {
              width: window.innerWidth,
              height: window.innerHeight,
            };
          };
        },
        u = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        c = class {
          _isScrolling = !1;
          _isStopped = !1;
          _isLocked = !1;
          _preventNextNativeScrollEvent = !1;
          _resetVelocityTimeout = null;
          __rafID = null;
          isTouching;
          time = 0;
          userData = {};
          lastVelocity = 0;
          velocity = 0;
          direction = 0;
          options;
          targetScroll;
          animatedScroll;
          animate = new n();
          emitter = new o();
          dimensions;
          virtualScroll;
          constructor({
            wrapper: t = window,
            content: e = document.documentElement,
            eventsTarget: i = t,
            smoothWheel: r = !0,
            syncTouch: n = !1,
            syncTouchLerp: o = 0.075,
            touchInertiaExponent: a = 1.7,
            duration: l,
            easing: c,
            lerp: f = 0.1,
            infinite: p = !1,
            orientation: d = "vertical",
            gestureOrientation: _ = "vertical",
            touchMultiplier: m = 1,
            wheelMultiplier: g = 1,
            autoResize: v = !0,
            prevent: y,
            virtualScroll: w,
            overscroll: T = !0,
            autoRaf: b = !1,
            anchors: x = !1,
            autoToggle: S = !1,
            allowNestedScroll: E = !1,
            __experimental__naiveDimensions: O = !1,
          } = {}) {
            (window.lenisVersion = "1.3.9-dev.2"),
              (t && t !== document.documentElement) || (t = window),
              "number" == typeof l && "function" != typeof c
                ? (c = u)
                : "function" == typeof c && "number" != typeof l && (l = 1),
              (this.options = {
                wrapper: t,
                content: e,
                eventsTarget: i,
                smoothWheel: r,
                syncTouch: n,
                syncTouchLerp: o,
                touchInertiaExponent: a,
                duration: l,
                easing: c,
                lerp: f,
                infinite: p,
                gestureOrientation: _,
                orientation: d,
                touchMultiplier: m,
                wheelMultiplier: g,
                autoResize: v,
                prevent: y,
                virtualScroll: w,
                overscroll: T,
                autoRaf: b,
                anchors: x,
                autoToggle: S,
                allowNestedScroll: E,
                __experimental__naiveDimensions: O,
              }),
              (this.dimensions = new s(t, e, { autoResize: v })),
              this.updateClassName(),
              (this.targetScroll = this.animatedScroll = this.actualScroll),
              this.options.wrapper.addEventListener(
                "scroll",
                this.onNativeScroll,
                !1
              ),
              this.options.wrapper.addEventListener(
                "scrollend",
                this.onScrollEnd,
                { capture: !0 }
              ),
              this.options.anchors &&
                this.options.wrapper === window &&
                this.options.wrapper.addEventListener(
                  "click",
                  this.onClick,
                  !1
                ),
              this.options.wrapper.addEventListener(
                "pointerdown",
                this.onPointerDown,
                !1
              ),
              (this.virtualScroll = new h(i, {
                touchMultiplier: m,
                wheelMultiplier: g,
              })),
              this.virtualScroll.on("scroll", this.onVirtualScroll),
              this.options.autoToggle &&
                this.rootElement.addEventListener(
                  "transitionend",
                  this.onTransitionEnd,
                  { passive: !0 }
                ),
              this.options.autoRaf &&
                (this.__rafID = requestAnimationFrame(this.raf));
          }
          destroy() {
            this.emitter.destroy(),
              this.options.wrapper.removeEventListener(
                "scroll",
                this.onNativeScroll,
                !1
              ),
              this.options.wrapper.removeEventListener(
                "scrollend",
                this.onScrollEnd,
                { capture: !0 }
              ),
              this.options.wrapper.removeEventListener(
                "pointerdown",
                this.onPointerDown,
                !1
              ),
              this.options.anchors &&
                this.options.wrapper === window &&
                this.options.wrapper.removeEventListener(
                  "click",
                  this.onClick,
                  !1
                ),
              this.virtualScroll.destroy(),
              this.dimensions.destroy(),
              this.cleanUpClassName(),
              this.__rafID && cancelAnimationFrame(this.__rafID);
          }
          on(t, e) {
            return this.emitter.on(t, e);
          }
          off(t, e) {
            return this.emitter.off(t, e);
          }
          onScrollEnd = (t) => {
            t instanceof CustomEvent ||
              ("smooth" !== this.isScrolling && !1 !== this.isScrolling) ||
              t.stopPropagation();
          };
          dispatchScrollendEvent = () => {
            this.options.wrapper.dispatchEvent(
              new CustomEvent("scrollend", {
                bubbles: this.options.wrapper === window,
                detail: { lenisScrollEnd: !0 },
              })
            );
          };
          onTransitionEnd = (t) => {
            if (t.propertyName.includes("overflow")) {
              let t = this.isHorizontal ? "overflow-x" : "overflow-y";
              ["hidden", "clip"].includes(getComputedStyle(this.rootElement)[t])
                ? this.internalStop()
                : this.internalStart();
            }
          };
          setScroll(t) {
            this.isHorizontal
              ? this.options.wrapper.scrollTo({ left: t, behavior: "instant" })
              : this.options.wrapper.scrollTo({ top: t, behavior: "instant" });
          }
          onClick = (t) => {
            let e = t
              .composedPath()
              .find(
                (t) =>
                  t instanceof HTMLAnchorElement &&
                  (t.getAttribute("href")?.startsWith("#") ||
                    t.getAttribute("href")?.startsWith("/#") ||
                    t.getAttribute("href")?.startsWith("./#"))
              );
            if (e) {
              let t = e.getAttribute("href");
              if (t) {
                let e =
                    "object" == typeof this.options.anchors &&
                    this.options.anchors
                      ? this.options.anchors
                      : void 0,
                  i = `#${t.split("#")[1]}`;
                ["#", "/#", "./#", "#top", "/#top", "./#top"].includes(t) &&
                  (i = 0),
                  this.scrollTo(i, e);
              }
            }
          };
          onPointerDown = (t) => {
            1 === t.button && this.reset();
          };
          onVirtualScroll = (t) => {
            if (
              "function" == typeof this.options.virtualScroll &&
              !1 === this.options.virtualScroll(t)
            )
              return;
            let { deltaX: e, deltaY: i, event: r } = t;
            if (
              (this.emitter.emit("virtual-scroll", {
                deltaX: e,
                deltaY: i,
                event: r,
              }),
              r.ctrlKey || r.lenisStopPropagation)
            )
              return;
            let n = r.type.includes("touch"),
              s = r.type.includes("wheel");
            this.isTouching = "touchstart" === r.type || "touchmove" === r.type;
            let o = 0 === e && 0 === i;
            if (
              this.options.syncTouch &&
              n &&
              "touchstart" === r.type &&
              o &&
              !this.isStopped &&
              !this.isLocked
            )
              return void this.reset();
            let a =
              ("vertical" === this.options.gestureOrientation && 0 === i) ||
              ("horizontal" === this.options.gestureOrientation && 0 === e);
            if (o || a) return;
            let l = r.composedPath();
            l = l.slice(0, l.indexOf(this.rootElement));
            let h = this.options.prevent;
            if (
              l.find(
                (t) =>
                  t instanceof HTMLElement &&
                  (("function" == typeof h && h?.(t)) ||
                    t.hasAttribute?.("data-lenis-prevent") ||
                    (n && t.hasAttribute?.("data-lenis-prevent-touch")) ||
                    (s && t.hasAttribute?.("data-lenis-prevent-wheel")) ||
                    (this.options.allowNestedScroll &&
                      this.checkNestedScroll(t, { deltaX: e, deltaY: i })))
              )
            )
              return;
            if (this.isStopped || this.isLocked) {
              r.cancelable && r.preventDefault();
              return;
            }
            if (
              !(
                (this.options.syncTouch && n) ||
                (this.options.smoothWheel && s)
              )
            ) {
              (this.isScrolling = "native"),
                this.animate.stop(),
                (r.lenisStopPropagation = !0);
              return;
            }
            let u = i;
            "both" === this.options.gestureOrientation
              ? (u = Math.abs(i) > Math.abs(e) ? i : e)
              : "horizontal" === this.options.gestureOrientation && (u = e),
              (!this.options.overscroll ||
                this.options.infinite ||
                (this.options.wrapper !== window &&
                  ((this.animatedScroll > 0 &&
                    this.animatedScroll < this.limit) ||
                    (0 === this.animatedScroll && i > 0) ||
                    (this.animatedScroll === this.limit && i < 0)))) &&
                (r.lenisStopPropagation = !0),
              r.cancelable && r.preventDefault();
            let c = n && this.options.syncTouch,
              f = n && "touchend" === r.type;
            f &&
              (u =
                Math.sign(this.velocity) *
                Math.pow(
                  Math.abs(this.velocity),
                  this.options.touchInertiaExponent
                )),
              this.scrollTo(this.targetScroll + u, {
                programmatic: !1,
                ...(c
                  ? { lerp: f ? this.options.syncTouchLerp : 1 }
                  : {
                      lerp: this.options.lerp,
                      duration: this.options.duration,
                      easing: this.options.easing,
                    }),
              });
          };
          resize() {
            this.dimensions.resize(),
              (this.animatedScroll = this.targetScroll = this.actualScroll),
              this.emit();
          }
          emit() {
            this.emitter.emit("scroll", this);
          }
          onNativeScroll = () => {
            if (
              (null !== this._resetVelocityTimeout &&
                (clearTimeout(this._resetVelocityTimeout),
                (this._resetVelocityTimeout = null)),
              this._preventNextNativeScrollEvent)
            ) {
              this._preventNextNativeScrollEvent = !1;
              return;
            }
            if (!1 === this.isScrolling || "native" === this.isScrolling) {
              let t = this.animatedScroll;
              (this.animatedScroll = this.targetScroll = this.actualScroll),
                (this.lastVelocity = this.velocity),
                (this.velocity = this.animatedScroll - t),
                (this.direction = Math.sign(this.animatedScroll - t)),
                this.isStopped || (this.isScrolling = "native"),
                this.emit(),
                0 !== this.velocity &&
                  (this._resetVelocityTimeout = setTimeout(() => {
                    (this.lastVelocity = this.velocity),
                      (this.velocity = 0),
                      (this.isScrolling = !1),
                      this.emit();
                  }, 400));
            }
          };
          reset() {
            (this.isLocked = !1),
              (this.isScrolling = !1),
              (this.animatedScroll = this.targetScroll = this.actualScroll),
              (this.lastVelocity = this.velocity = 0),
              this.animate.stop();
          }
          start() {
            if (this.isStopped) {
              if (this.options.autoToggle)
                return void this.rootElement.style.removeProperty("overflow");
              this.internalStart();
            }
          }
          internalStart() {
            this.isStopped &&
              (this.reset(), (this.isStopped = !1), this.emit());
          }
          stop() {
            if (!this.isStopped) {
              if (this.options.autoToggle)
                return void this.rootElement.style.setProperty(
                  "overflow",
                  "clip"
                );
              this.internalStop();
            }
          }
          internalStop() {
            this.isStopped ||
              (this.reset(), (this.isStopped = !0), this.emit());
          }
          raf = (t) => {
            let e = t - (this.time || t);
            (this.time = t),
              this.animate.advance(0.001 * e),
              this.options.autoRaf &&
                (this.__rafID = requestAnimationFrame(this.raf));
          };
          scrollTo(
            t,
            {
              offset: e = 0,
              immediate: i = !1,
              lock: n = !1,
              duration: s = this.options.duration,
              easing: o = this.options.easing,
              lerp: a = this.options.lerp,
              onStart: l,
              onComplete: h,
              force: c = !1,
              programmatic: f = !0,
              userData: p,
            } = {}
          ) {
            if ((!this.isStopped && !this.isLocked) || c) {
              if ("string" == typeof t && ["top", "left", "start"].includes(t))
                t = 0;
              else if (
                "string" == typeof t &&
                ["bottom", "right", "end"].includes(t)
              )
                t = this.limit;
              else {
                let i;
                if (
                  ("string" == typeof t
                    ? (i = document.querySelector(t))
                    : t instanceof HTMLElement && t?.nodeType && (i = t),
                  i)
                ) {
                  if (this.options.wrapper !== window) {
                    let t = this.rootElement.getBoundingClientRect();
                    e -= this.isHorizontal ? t.left : t.top;
                  }
                  let r = i.getBoundingClientRect();
                  t =
                    (this.isHorizontal ? r.left : r.top) + this.animatedScroll;
                }
              }
              if ("number" == typeof t) {
                if (((t += e), (t = Math.round(t)), this.options.infinite)) {
                  if (f) {
                    this.targetScroll = this.animatedScroll = this.scroll;
                    let e = t - this.animatedScroll;
                    e > this.limit / 2
                      ? (t -= this.limit)
                      : e < -this.limit / 2 && (t += this.limit);
                  }
                } else t = r(0, t, this.limit);
                if (t === this.targetScroll) {
                  l?.(this), h?.(this);
                  return;
                }
                if (((this.userData = p ?? {}), i)) {
                  (this.animatedScroll = this.targetScroll = t),
                    this.setScroll(this.scroll),
                    this.reset(),
                    this.preventNextNativeScrollEvent(),
                    this.emit(),
                    h?.(this),
                    (this.userData = {}),
                    requestAnimationFrame(() => {
                      this.dispatchScrollendEvent();
                    });
                  return;
                }
                f || (this.targetScroll = t),
                  "number" == typeof s && "function" != typeof o
                    ? (o = u)
                    : "function" == typeof o && "number" != typeof s && (s = 1),
                  this.animate.fromTo(this.animatedScroll, t, {
                    duration: s,
                    easing: o,
                    lerp: a,
                    onStart: () => {
                      n && (this.isLocked = !0),
                        (this.isScrolling = "smooth"),
                        l?.(this);
                    },
                    onUpdate: (t, e) => {
                      (this.isScrolling = "smooth"),
                        (this.lastVelocity = this.velocity),
                        (this.velocity = t - this.animatedScroll),
                        (this.direction = Math.sign(this.velocity)),
                        (this.animatedScroll = t),
                        this.setScroll(this.scroll),
                        f && (this.targetScroll = t),
                        e || this.emit(),
                        e &&
                          (this.reset(),
                          this.emit(),
                          h?.(this),
                          (this.userData = {}),
                          requestAnimationFrame(() => {
                            this.dispatchScrollendEvent();
                          }),
                          this.preventNextNativeScrollEvent());
                    },
                  });
              }
            }
          }
          preventNextNativeScrollEvent() {
            (this._preventNextNativeScrollEvent = !0),
              requestAnimationFrame(() => {
                this._preventNextNativeScrollEvent = !1;
              });
          }
          checkNestedScroll(t, { deltaX: e, deltaY: i }) {
            let r,
              n,
              s,
              o,
              a,
              l,
              h,
              u,
              c,
              f,
              p,
              d,
              _,
              m,
              g = Date.now(),
              v = (t._lenis ??= {}),
              y = this.options.gestureOrientation;
            if (g - (v.time ?? 0) > 2e3) {
              v.time = Date.now();
              let e = window.getComputedStyle(t);
              v.computedStyle = e;
              let i = e.overflowX,
                c = e.overflowY;
              if (
                ((r = ["auto", "overlay", "scroll"].includes(i)),
                (n = ["auto", "overlay", "scroll"].includes(c)),
                (v.hasOverflowX = r),
                (v.hasOverflowY = n),
                (!r && !n) ||
                  ("vertical" === y && !n) ||
                  ("horizontal" === y && !r))
              )
                return !1;
              (a = t.scrollWidth),
                (l = t.scrollHeight),
                (h = t.clientWidth),
                (u = t.clientHeight),
                (s = a > h),
                (o = l > u),
                (v.isScrollableX = s),
                (v.isScrollableY = o),
                (v.scrollWidth = a),
                (v.scrollHeight = l),
                (v.clientWidth = h),
                (v.clientHeight = u);
            } else
              (s = v.isScrollableX),
                (o = v.isScrollableY),
                (r = v.hasOverflowX),
                (n = v.hasOverflowY),
                (a = v.scrollWidth),
                (l = v.scrollHeight),
                (h = v.clientWidth),
                (u = v.clientHeight);
            if (
              (!r && !n) ||
              (!s && !o) ||
              ("vertical" === y && (!n || !o)) ||
              ("horizontal" === y && (!r || !s)) ||
              ("horizontal" === y
                ? (c = "x")
                : "vertical" === y
                ? (c = "y")
                : (0 !== e && r && s && (c = "x"),
                  0 !== i && n && o && (c = "y")),
              !c)
            )
              return !1;
            if ("x" === c)
              (f = t.scrollLeft), (p = a - h), (d = e), (_ = r), (m = s);
            else {
              if ("y" !== c) return !1;
              (f = t.scrollTop), (p = l - u), (d = i), (_ = n), (m = o);
            }
            return (d > 0 ? f < p : f > 0) && _ && m;
          }
          get rootElement() {
            return this.options.wrapper === window
              ? document.documentElement
              : this.options.wrapper;
          }
          get limit() {
            return this.options.__experimental__naiveDimensions
              ? this.isHorizontal
                ? this.rootElement.scrollWidth - this.rootElement.clientWidth
                : this.rootElement.scrollHeight - this.rootElement.clientHeight
              : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
          }
          get isHorizontal() {
            return "horizontal" === this.options.orientation;
          }
          get actualScroll() {
            let t = this.options.wrapper;
            return this.isHorizontal
              ? t.scrollX ?? t.scrollLeft
              : t.scrollY ?? t.scrollTop;
          }
          get scroll() {
            var t;
            return this.options.infinite
              ? ((this.animatedScroll % (t = this.limit)) + t) % t
              : this.animatedScroll;
          }
          get progress() {
            return 0 === this.limit ? 1 : this.scroll / this.limit;
          }
          get isScrolling() {
            return this._isScrolling;
          }
          set isScrolling(t) {
            this._isScrolling !== t &&
              ((this._isScrolling = t), this.updateClassName());
          }
          get isStopped() {
            return this._isStopped;
          }
          set isStopped(t) {
            this._isStopped !== t &&
              ((this._isStopped = t), this.updateClassName());
          }
          get isLocked() {
            return this._isLocked;
          }
          set isLocked(t) {
            this._isLocked !== t &&
              ((this._isLocked = t), this.updateClassName());
          }
          get isSmooth() {
            return "smooth" === this.isScrolling;
          }
          get className() {
            let t = "lenis";
            return (
              this.options.autoToggle && (t += " lenis-autoToggle"),
              this.isStopped && (t += " lenis-stopped"),
              this.isLocked && (t += " lenis-locked"),
              this.isScrolling && (t += " lenis-scrolling"),
              "smooth" === this.isScrolling && (t += " lenis-smooth"),
              t
            );
          }
          updateClassName() {
            this.cleanUpClassName(),
              (this.rootElement.className =
                `${this.rootElement.className} ${this.className}`.trim());
          }
          cleanUpClassName() {
            this.rootElement.className = this.rootElement.className
              .replace(/lenis(-\w+)?/g, "")
              .trim();
          }
        };
    },
    54995: (t) => {
      "use strict";
      var { g: e, __dirname: i } = t;
      t.s({
        Lenis: () => l,
        LenisContext: () => o,
        ReactLenis: () => l,
        default: () => l,
        useLenis: () => u,
      });
      var r = t.i(72375),
        n = t.i(38653),
        s = t.i(58064),
        o = (0, n.createContext)(null),
        a = new (class {
          constructor(t) {
            this.state = t;
          }
          listeners = [];
          set(t) {
            for (let e of ((this.state = t), this.listeners)) e(this.state);
          }
          subscribe(t) {
            return (
              (this.listeners = [...this.listeners, t]),
              () => {
                this.listeners = this.listeners.filter((e) => e !== t);
              }
            );
          }
          get() {
            return this.state;
          }
        })(null),
        l = (0, n.forwardRef)(
          (
            {
              children: t,
              root: e = !1,
              options: i = {},
              autoRaf: l = !0,
              ...h
            },
            u
          ) => {
            let c = (0, n.useRef)(null),
              f = (0, n.useRef)(null),
              [p, d] = (0, n.useState)(void 0);
            (0, n.useImperativeHandle)(
              u,
              () => ({ wrapper: c.current, content: f.current, lenis: p }),
              [p]
            ),
              (0, n.useEffect)(() => {
                let t = new r.default({
                  ...i,
                  ...(c.current &&
                    f.current && { wrapper: c.current, content: f.current }),
                  autoRaf: i?.autoRaf ?? l,
                });
                return (
                  d(t),
                  () => {
                    t.destroy(), d(void 0);
                  }
                );
              }, [e, JSON.stringify({ ...i, wrapper: null, content: null })]);
            let _ = (0, n.useRef)([]),
              m = (0, n.useCallback)((t, e) => {
                _.current.push({ callback: t, priority: e }),
                  _.current.sort((t, e) => t.priority - e.priority);
              }, []),
              g = (0, n.useCallback)((t) => {
                _.current = _.current.filter((e) => e.callback !== t);
              }, []);
            return ((0, n.useEffect)(() => {
              if (e && p)
                return (
                  a.set({ lenis: p, addCallback: m, removeCallback: g }),
                  () => a.set(null)
                );
            }, [e, p, m, g]),
            (0, n.useEffect)(() => {
              if (!p) return;
              let t = (t) => {
                for (let e = 0; e < _.current.length; e++)
                  _.current[e]?.callback(t);
              };
              return (
                p.on("scroll", t),
                () => {
                  p.off("scroll", t);
                }
              );
            }, [p]),
            t)
              ? (0, s.jsx)(o.Provider, {
                  value: { lenis: p, addCallback: m, removeCallback: g },
                  children:
                    e && "asChild" !== e
                      ? t
                      : (0, s.jsx)("div", {
                          ref: c,
                          ...h,
                          children: (0, s.jsx)("div", { ref: f, children: t }),
                        }),
                })
              : null;
          }
        ),
        h = {};
      function u(t, e = [], i = 0) {
        let r = (0, n.useContext)(o),
          s = (function (t) {
            let [e, i] = (0, n.useState)(t.get());
            return (0, n.useEffect)(() => t.subscribe((t) => i(t)), [t]), e;
          })(a),
          { lenis: l, addCallback: c, removeCallback: f } = r ?? s ?? h;
        return (
          (0, n.useEffect)(() => {
            if (t && c && f && l)
              return (
                c(t, i),
                t(l),
                () => {
                  f(t);
                }
              );
          }, [l, c, f, i, ...e]),
          l
        );
      }
    },
  },
]);

//# sourceMappingURL=6973e2c43d6f1810.js.map
