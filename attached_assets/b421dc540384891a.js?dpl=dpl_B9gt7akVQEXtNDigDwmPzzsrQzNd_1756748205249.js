(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  "object" == typeof document ? document.currentScript : void 0,
  {
    68612: function (e) {
      var { g: t, __dirname: r, m: n, e: o } = e;
      {
        ("use strict");
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = function ({
            html: e,
            height: n = null,
            width: o = null,
            children: i,
            dataNtpc: a = "",
          }) {
            return (
              (0, r.useEffect)(() => {
                a &&
                  performance.mark("mark_feature_usage", {
                    detail: { feature: `next-third-parties-${a}` },
                  });
              }, [a]),
              (0, t.jsxs)(t.Fragment, {
                children: [
                  i,
                  e
                    ? (0, t.jsx)("div", {
                        style: {
                          height: null != n ? `${n}px` : "auto",
                          width: null != o ? `${o}px` : "auto",
                        },
                        "data-ntpc": a,
                        dangerouslySetInnerHTML: { __html: e },
                      })
                    : null,
                ],
              })
            );
          });
        let t = e.r(58064),
          r = e.r(38653);
      }
    },
    50926: function (e) {
      var { g: t, __dirname: r, m: n, e: o } = e;
      {
        ("use strict");
        var i =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.sendGTMEvent = void 0),
          (o.GoogleTagManager = function (e) {
            let {
              gtmId: o,
              gtmScriptUrl: i = "https://www.googletagmanager.com/gtm.js",
              dataLayerName: s = "dataLayer",
              auth: l,
              preview: c,
              dataLayer: u,
              nonce: f,
            } = e;
            a = s;
            let d = "dataLayer" !== s ? `&l=${s}` : "",
              p = l ? `&gtm_auth=${l}` : "",
              g = c ? `&gtm_preview=${c}&gtm_cookies_win=x` : "";
            return (
              (0, r.useEffect)(() => {
                performance.mark("mark_feature_usage", {
                  detail: { feature: "next-third-parties-gtm" },
                });
              }, []),
              (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)(n.default, {
                    id: "_next-gtm-init",
                    dangerouslySetInnerHTML: {
                      __html: `
      (function(w,l){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        ${u ? `w[l].push(${JSON.stringify(u)})` : ""}
      })(window,'${s}');`,
                    },
                    nonce: f,
                  }),
                  (0, t.jsx)(n.default, {
                    id: "_next-gtm",
                    "data-ntpc": "GTM",
                    src: `${i}?id=${o}${d}${p}${g}`,
                    nonce: f,
                  }),
                ],
              })
            );
          });
        let t = e.r(58064),
          r = e.r(38653),
          n = i(e.r(31111)),
          a = "dataLayer";
        o.sendGTMEvent = (e, t) => {
          let r = t || a;
          (window[r] = window[r] || []), window[r].push(e);
        };
      }
    },
    41776: function (e) {
      var { g: t, __dirname: r, m: n, e: o } = e;
      {
        ("use strict");
        let t;
        var i =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.GoogleAnalytics = function (e) {
            let {
              gaId: o,
              debugMode: i,
              dataLayerName: s = "dataLayer",
              nonce: l,
            } = e;
            return (
              void 0 === t && (t = s),
              (0, n.useEffect)(() => {
                performance.mark("mark_feature_usage", {
                  detail: { feature: "next-third-parties-ga" },
                });
              }, []),
              (0, r.jsxs)(r.Fragment, {
                children: [
                  (0, r.jsx)(a.default, {
                    id: "_next-ga-init",
                    dangerouslySetInnerHTML: {
                      __html: `
          window['${s}'] = window['${s}'] || [];
          function gtag(){window['${s}'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '${o}' ${i ? ",{ 'debug_mode': true }" : ""});`,
                    },
                    nonce: l,
                  }),
                  (0, r.jsx)(a.default, {
                    id: "_next-ga",
                    src: `https://www.googletagmanager.com/gtag/js?id=${o}`,
                    nonce: l,
                  }),
                ],
              })
            );
          }),
          (o.sendGAEvent = function (...e) {
            if (void 0 === t)
              return void console.warn(
                "@next/third-parties: GA has not been initialized"
              );
            window[t]
              ? window[t].push(arguments)
              : console.warn(
                  `@next/third-parties: GA dataLayer ${t} does not exist`
                );
          });
        let r = e.r(58064),
          n = e.r(38653),
          a = i(e.r(31111));
      }
    },
    64384: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({
        EasePack: () => h,
        ExpoScaleEase: () => p,
        RoughEase: () => g,
        SlowMo: () => d,
        default: () => h,
      });
      var n,
        o,
        i = function () {
          return (
            n ||
            ("undefined" != typeof window &&
              (n = window.gsap) &&
              n.registerPlugin &&
              n)
          );
        },
        a = function (e, t) {
          return !!(void 0 === e ? t : e && !~(e + "").indexOf("false"));
        },
        s = function (e) {
          if ((n = e || i())) {
            o = n.registerEase;
            var t,
              r = n.parseEase(),
              a = function (e) {
                return function (t) {
                  var r = 0.5 + t / 2;
                  e.config = function (t) {
                    return e(2 * (1 - t) * t * r + t * t);
                  };
                };
              };
            for (t in r) r[t].config || a(r[t]);
            for (t in (o("slow", d), o("expoScale", p), o("rough", g), h))
              "version" !== t && n.core.globals(t, h[t]);
          }
        },
        l = function (e, t, r) {
          var n =
              (e = Math.min(1, e || 0.7)) < 1 ? (t || 0 === t ? t : 0.7) : 0,
            o = (1 - e) / 2,
            i = o + e,
            s = a(r);
          return function (e) {
            var t = e + (0.5 - e) * n;
            return e < o
              ? s
                ? 1 - (e = 1 - e / o) * e
                : t - (e = 1 - e / o) * e * e * e * t
              : e > i
              ? s
                ? 1 === e
                  ? 0
                  : 1 - (e = (e - i) / o) * e
                : t + (e - t) * (e = (e - i) / o) * e * e * e
              : s
              ? 1
              : t;
          };
        },
        c = function (e, t, r) {
          var o = Math.log(t / e),
            i = t - e;
          return (
            r && (r = n.parseEase(r)),
            function (t) {
              return (e * Math.exp(o * (r ? r(t) : t)) - e) / i;
            }
          );
        },
        u = function (e, t, r) {
          (this.t = e),
            (this.v = t),
            r &&
              ((this.next = r),
              (r.prev = this),
              (this.c = r.v - t),
              (this.gap = r.t - e));
        },
        f = function (e) {
          "object" != typeof e && (e = { points: +e || 20 });
          for (
            var t,
              r,
              o,
              i,
              s,
              l,
              c,
              f = e.taper || "none",
              d = [],
              p = 0,
              g = 0 | (+e.points || 20),
              h = g,
              v = a(e.randomize, !0),
              m = a(e.clamp),
              _ = n ? n.parseEase(e.template) : 0,
              y = 0.4 * (+e.strength || 1);
            --h > -1;

          )
            (t = v ? Math.random() : (1 / g) * h),
              (r = _ ? _(t) : t),
              (o =
                "none" === f
                  ? y
                  : "out" === f
                  ? (i = 1 - t) * i * y
                  : "in" === f
                  ? t * t * y
                  : t < 0.5
                  ? (i = 2 * t) * i * 0.5 * y
                  : (i = (1 - t) * 2) * i * 0.5 * y),
              v
                ? (r += Math.random() * o - 0.5 * o)
                : h % 2
                ? (r += 0.5 * o)
                : (r -= 0.5 * o),
              m && (r > 1 ? (r = 1) : r < 0 && (r = 0)),
              (d[p++] = { x: t, y: r });
          for (
            d.sort(function (e, t) {
              return e.x - t.x;
            }),
              l = new u(1, 1, null),
              h = g;
            h--;

          )
            l = new u((s = d[h]).x, s.y, l);
          return (
            (c = new u(0, 0, l.t ? l : l.next)),
            function (e) {
              var t = c;
              if (e > t.t) {
                for (; t.next && e >= t.t; ) t = t.next;
                t = t.prev;
              } else for (; t.prev && e <= t.t; ) t = t.prev;
              return (c = t), t.v + ((e - t.t) / t.gap) * t.c;
            }
          );
        },
        d = l(0.7);
      (d.ease = d), (d.config = l);
      var p = c(1, 2);
      p.config = c;
      var g = f();
      (g.ease = g), (g.config = f);
      var h = { SlowMo: d, RoughEase: g, ExpoScaleEase: p };
      for (var v in h) (h[v].register = s), (h[v].version = "3.13.0");
      i() && n.registerPlugin(d);
    },
    92366: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({
        Observer: () => N,
        _getProxyProp: () => T,
        _getScrollFunc: () => z,
        _getTarget: () => R,
        _getVelocityProp: () => Y,
        _horizontal: () => L,
        _isViewport: () => P,
        _proxies: () => x,
        _scrollers: () => y,
        _vertical: () => D,
        default: () => N,
      });
      var n,
        o,
        i,
        a,
        s,
        l,
        c,
        u,
        f,
        d,
        p,
        g,
        h,
        v = function () {
          return (
            n ||
            ("undefined" != typeof window &&
              (n = window.gsap) &&
              n.registerPlugin &&
              n)
          );
        },
        m = 1,
        _ = [],
        y = [],
        x = [],
        b = Date.now,
        w = function (e, t) {
          return t;
        },
        E = function () {
          var e = f.core,
            t = e.bridge || {},
            r = e._scrollers,
            n = e._proxies;
          r.push.apply(r, y),
            n.push.apply(n, x),
            (y = r),
            (x = n),
            (w = function (e, r) {
              return t[e](r);
            });
        },
        T = function (e, t) {
          return ~x.indexOf(e) && x[x.indexOf(e) + 1][t];
        },
        P = function (e) {
          return !!~d.indexOf(e);
        },
        S = function (e, t, r, n, o) {
          return e.addEventListener(t, r, { passive: !1 !== n, capture: !!o });
        },
        k = function (e, t, r, n) {
          return e.removeEventListener(t, r, !!n);
        },
        C = "scrollLeft",
        M = "scrollTop",
        O = function () {
          return (p && p.isPressed) || y.cache++;
        },
        A = function (e, t) {
          var r = function r(n) {
            if (n || 0 === n) {
              m && (i.history.scrollRestoration = "manual");
              var o = p && p.isPressed;
              e((n = r.v = Math.round(n) || (p && p.iOS ? 1 : 0))),
                (r.cacheID = y.cache),
                o && w("ss", n);
            } else
              (t || y.cache !== r.cacheID || w("ref")) &&
                ((r.cacheID = y.cache), (r.v = e()));
            return r.v + r.offset;
          };
          return (r.offset = 0), e && r;
        },
        L = {
          s: C,
          p: "left",
          p2: "Left",
          os: "right",
          os2: "Right",
          d: "width",
          d2: "Width",
          a: "x",
          sc: A(function (e) {
            return arguments.length
              ? i.scrollTo(e, D.sc())
              : i.pageXOffset || a[C] || s[C] || l[C] || 0;
          }),
        },
        D = {
          s: M,
          p: "top",
          p2: "Top",
          os: "bottom",
          os2: "Bottom",
          d: "height",
          d2: "Height",
          a: "y",
          op: L,
          sc: A(function (e) {
            return arguments.length
              ? i.scrollTo(L.sc(), e)
              : i.pageYOffset || a[M] || s[M] || l[M] || 0;
          }),
        },
        R = function (e, t) {
          return (
            ((t && t._ctx && t._ctx.selector) || n.utils.toArray)(e)[0] ||
            ("string" == typeof e && !1 !== n.config().nullTargetWarn
              ? console.warn("Element not found:", e)
              : null)
          );
        },
        F = function (e, t) {
          for (var r = t.length; r--; )
            if (t[r] === e || t[r].contains(e)) return !0;
          return !1;
        },
        z = function (e, t) {
          var r = t.s,
            o = t.sc;
          P(e) && (e = a.scrollingElement || s);
          var i = y.indexOf(e),
            l = o === D.sc ? 1 : 2;
          ~i || (i = y.push(e) - 1), y[i + l] || S(e, "scroll", O);
          var c = y[i + l],
            u =
              c ||
              (y[i + l] =
                A(T(e, r), !0) ||
                (P(e)
                  ? o
                  : A(function (t) {
                      return arguments.length ? (e[r] = t) : e[r];
                    })));
          return (
            (u.target = e),
            c || (u.smooth = "smooth" === n.getProperty(e, "scrollBehavior")),
            u
          );
        },
        Y = function (e, t, r) {
          var n = e,
            o = e,
            i = b(),
            a = i,
            s = t || 50,
            l = Math.max(500, 3 * s),
            c = function (e, t) {
              var l = b();
              t || l - i > s
                ? ((o = n), (n = e), (a = i), (i = l))
                : r
                ? (n += e)
                : (n = o + ((e - o) / (l - a)) * (i - a));
            };
          return {
            update: c,
            reset: function () {
              (o = n = r ? 0 : n), (a = i = 0);
            },
            getVelocity: function (e) {
              var t = a,
                s = o,
                u = b();
              return (
                (e || 0 === e) && e !== n && c(e),
                i === a || u - a > l
                  ? 0
                  : ((n + (r ? s : -s)) / ((r ? u : i) - t)) * 1e3
              );
            },
          };
        },
        I = function (e, t) {
          return (
            t && !e._gsapAllow && e.preventDefault(),
            e.changedTouches ? e.changedTouches[0] : e
          );
        },
        B = function (e) {
          var t = Math.max.apply(Math, e),
            r = Math.min.apply(Math, e);
          return Math.abs(t) >= Math.abs(r) ? t : r;
        },
        j = function () {
          (f = n.core.globals().ScrollTrigger) && f.core && E();
        },
        X = function (e) {
          return (
            (n = e || v()),
            !o &&
              n &&
              "undefined" != typeof document &&
              document.body &&
              ((i = window),
              (s = (a = document).documentElement),
              (l = a.body),
              (d = [i, a, s, l]),
              n.utils.clamp,
              (h = n.core.context || function () {}),
              (u = "onpointerenter" in l ? "pointer" : "mouse"),
              (c = N.isTouch =
                i.matchMedia &&
                i.matchMedia("(hover: none), (pointer: coarse)").matches
                  ? 1
                  : 2 *
                    ("ontouchstart" in i ||
                      navigator.maxTouchPoints > 0 ||
                      navigator.msMaxTouchPoints > 0)),
              (g = N.eventTypes =
                (
                  "ontouchstart" in s
                    ? "touchstart,touchmove,touchcancel,touchend"
                    : !("onpointerdown" in s)
                    ? "mousedown,mousemove,mouseup,mouseup"
                    : "pointerdown,pointermove,pointercancel,pointerup"
                ).split(",")),
              setTimeout(function () {
                return (m = 0);
              }, 500),
              j(),
              (o = 1)),
            o
          );
        };
      (L.op = D), (y.cache = 0);
      var N = (function () {
        var e;
        function t(e) {
          this.init(e);
        }
        return (
          (t.prototype.init = function (e) {
            o || X(n) || console.warn("Please gsap.registerPlugin(Observer)"),
              f || j();
            var t = e.tolerance,
              r = e.dragMinimum,
              d = e.type,
              v = e.target,
              m = e.lineHeight,
              y = e.debounce,
              x = e.preventDefault,
              w = e.onStop,
              E = e.onStopDelay,
              T = e.ignore,
              C = e.wheelSpeed,
              M = e.event,
              A = e.onDragStart,
              N = e.onDragEnd,
              H = e.onDrag,
              $ = e.onPress,
              W = e.onRelease,
              U = e.onRight,
              G = e.onLeft,
              V = e.onUp,
              q = e.onDown,
              K = e.onChangeX,
              J = e.onChangeY,
              Z = e.onChange,
              Q = e.onToggleX,
              ee = e.onToggleY,
              et = e.onHover,
              er = e.onHoverEnd,
              en = e.onMove,
              eo = e.ignoreCheck,
              ei = e.isNormalizer,
              ea = e.onGestureStart,
              es = e.onGestureEnd,
              el = e.onWheel,
              ec = e.onEnable,
              eu = e.onDisable,
              ef = e.onClick,
              ed = e.scrollSpeed,
              ep = e.capture,
              eg = e.allowClicks,
              eh = e.lockAxis,
              ev = e.onLockAxis;
            (this.target = v = R(v) || s),
              (this.vars = e),
              T && (T = n.utils.toArray(T)),
              (t = t || 1e-9),
              (r = r || 0),
              (C = C || 1),
              (ed = ed || 1),
              (d = d || "wheel,touch,pointer"),
              (y = !1 !== y),
              m || (m = parseFloat(i.getComputedStyle(l).lineHeight) || 22);
            var em,
              e_,
              ey,
              ex,
              eb,
              ew,
              eE,
              eT = this,
              eP = 0,
              eS = 0,
              ek = e.passive || (!x && !1 !== e.passive),
              eC = z(v, L),
              eM = z(v, D),
              eO = eC(),
              eA = eM(),
              eL =
                ~d.indexOf("touch") &&
                !~d.indexOf("pointer") &&
                "pointerdown" === g[0],
              eD = P(v),
              eR = v.ownerDocument || a,
              eF = [0, 0, 0],
              ez = [0, 0, 0],
              eY = 0,
              eI = function () {
                return (eY = b());
              },
              eB = function (e, t) {
                return (
                  ((eT.event = e) && T && F(e.target, T)) ||
                  (t && eL && "touch" !== e.pointerType) ||
                  (eo && eo(e, t))
                );
              },
              ej = function () {
                var e = (eT.deltaX = B(eF)),
                  r = (eT.deltaY = B(ez)),
                  n = Math.abs(e) >= t,
                  o = Math.abs(r) >= t;
                Z && (n || o) && Z(eT, e, r, eF, ez),
                  n &&
                    (U && eT.deltaX > 0 && U(eT),
                    G && eT.deltaX < 0 && G(eT),
                    K && K(eT),
                    Q && eT.deltaX < 0 != eP < 0 && Q(eT),
                    (eP = eT.deltaX),
                    (eF[0] = eF[1] = eF[2] = 0)),
                  o &&
                    (q && eT.deltaY > 0 && q(eT),
                    V && eT.deltaY < 0 && V(eT),
                    J && J(eT),
                    ee && eT.deltaY < 0 != eS < 0 && ee(eT),
                    (eS = eT.deltaY),
                    (ez[0] = ez[1] = ez[2] = 0)),
                  (ex || ey) &&
                    (en && en(eT),
                    ey && (A && 1 === ey && A(eT), H && H(eT), (ey = 0)),
                    (ex = !1)),
                  ew && ((ew = !1), 1) && ev && ev(eT),
                  eb && (el(eT), (eb = !1)),
                  (em = 0);
              },
              eX = function (e, t, r) {
                (eF[r] += e),
                  (ez[r] += t),
                  eT._vx.update(e),
                  eT._vy.update(t),
                  y ? em || (em = requestAnimationFrame(ej)) : ej();
              },
              eN = function (e, t) {
                eh &&
                  !eE &&
                  ((eT.axis = eE = Math.abs(e) > Math.abs(t) ? "x" : "y"),
                  (ew = !0)),
                  "y" !== eE && ((eF[2] += e), eT._vx.update(e, !0)),
                  "x" !== eE && ((ez[2] += t), eT._vy.update(t, !0)),
                  y ? em || (em = requestAnimationFrame(ej)) : ej();
              },
              eH = function (e) {
                if (!eB(e, 1)) {
                  var t = (e = I(e, x)).clientX,
                    n = e.clientY,
                    o = t - eT.x,
                    i = n - eT.y,
                    a = eT.isDragging;
                  (eT.x = t),
                    (eT.y = n),
                    (a ||
                      ((o || i) &&
                        (Math.abs(eT.startX - t) >= r ||
                          Math.abs(eT.startY - n) >= r))) &&
                      ((ey = a ? 2 : 1), a || (eT.isDragging = !0), eN(o, i));
                }
              },
              e$ = (eT.onPress = function (e) {
                eB(e, 1) ||
                  (e && e.button) ||
                  ((eT.axis = eE = null),
                  e_.pause(),
                  (eT.isPressed = !0),
                  (e = I(e)),
                  (eP = eS = 0),
                  (eT.startX = eT.x = e.clientX),
                  (eT.startY = eT.y = e.clientY),
                  eT._vx.reset(),
                  eT._vy.reset(),
                  S(ei ? v : eR, g[1], eH, ek, !0),
                  (eT.deltaX = eT.deltaY = 0),
                  $ && $(eT));
              }),
              eW = (eT.onRelease = function (e) {
                if (!eB(e, 1)) {
                  k(ei ? v : eR, g[1], eH, !0);
                  var t = !isNaN(eT.y - eT.startY),
                    r = eT.isDragging,
                    o =
                      r &&
                      (Math.abs(eT.x - eT.startX) > 3 ||
                        Math.abs(eT.y - eT.startY) > 3),
                    a = I(e);
                  !o &&
                    t &&
                    (eT._vx.reset(),
                    eT._vy.reset(),
                    x &&
                      eg &&
                      n.delayedCall(0.08, function () {
                        if (b() - eY > 300 && !e.defaultPrevented) {
                          if (e.target.click) e.target.click();
                          else if (eR.createEvent) {
                            var t = eR.createEvent("MouseEvents");
                            t.initMouseEvent(
                              "click",
                              !0,
                              !0,
                              i,
                              1,
                              a.screenX,
                              a.screenY,
                              a.clientX,
                              a.clientY,
                              !1,
                              !1,
                              !1,
                              !1,
                              0,
                              null
                            ),
                              e.target.dispatchEvent(t);
                          }
                        }
                      })),
                    (eT.isDragging = eT.isGesturing = eT.isPressed = !1),
                    w && r && !ei && e_.restart(!0),
                    ey && ej(),
                    N && r && N(eT),
                    W && W(eT, o);
                }
              }),
              eU = function (e) {
                return (
                  e.touches &&
                  e.touches.length > 1 &&
                  (eT.isGesturing = !0) &&
                  ea(e, eT.isDragging)
                );
              },
              eG = function () {
                return (eT.isGesturing = !1), es(eT);
              },
              eV = function (e) {
                if (!eB(e)) {
                  var t = eC(),
                    r = eM();
                  eX((t - eO) * ed, (r - eA) * ed, 1),
                    (eO = t),
                    (eA = r),
                    w && e_.restart(!0);
                }
              },
              eq = function (e) {
                if (!eB(e)) {
                  (e = I(e, x)), el && (eb = !0);
                  var t =
                    (1 === e.deltaMode
                      ? m
                      : 2 === e.deltaMode
                      ? i.innerHeight
                      : 1) * C;
                  eX(e.deltaX * t, e.deltaY * t, 0), w && !ei && e_.restart(!0);
                }
              },
              eK = function (e) {
                if (!eB(e)) {
                  var t = e.clientX,
                    r = e.clientY,
                    n = t - eT.x,
                    o = r - eT.y;
                  (eT.x = t),
                    (eT.y = r),
                    (ex = !0),
                    w && e_.restart(!0),
                    (n || o) && eN(n, o);
                }
              },
              eJ = function (e) {
                (eT.event = e), et(eT);
              },
              eZ = function (e) {
                (eT.event = e), er(eT);
              },
              eQ = function (e) {
                return eB(e) || (I(e, x) && ef(eT));
              };
            (e_ = eT._dc =
              n
                .delayedCall(E || 0.25, function () {
                  eT._vx.reset(), eT._vy.reset(), e_.pause(), w && w(eT);
                })
                .pause()),
              (eT.deltaX = eT.deltaY = 0),
              (eT._vx = Y(0, 50, !0)),
              (eT._vy = Y(0, 50, !0)),
              (eT.scrollX = eC),
              (eT.scrollY = eM),
              (eT.isDragging = eT.isGesturing = eT.isPressed = !1),
              h(this),
              (eT.enable = function (e) {
                return (
                  !eT.isEnabled &&
                    (S(eD ? eR : v, "scroll", O),
                    d.indexOf("scroll") >= 0 &&
                      S(eD ? eR : v, "scroll", eV, ek, ep),
                    d.indexOf("wheel") >= 0 && S(v, "wheel", eq, ek, ep),
                    ((d.indexOf("touch") >= 0 && c) ||
                      d.indexOf("pointer") >= 0) &&
                      (S(v, g[0], e$, ek, ep),
                      S(eR, g[2], eW),
                      S(eR, g[3], eW),
                      eg && S(v, "click", eI, !0, !0),
                      ef && S(v, "click", eQ),
                      ea && S(eR, "gesturestart", eU),
                      es && S(eR, "gestureend", eG),
                      et && S(v, u + "enter", eJ),
                      er && S(v, u + "leave", eZ),
                      en && S(v, u + "move", eK)),
                    (eT.isEnabled = !0),
                    (eT.isDragging =
                      eT.isGesturing =
                      eT.isPressed =
                      ex =
                      ey =
                        !1),
                    eT._vx.reset(),
                    eT._vy.reset(),
                    (eO = eC()),
                    (eA = eM()),
                    e && e.type && e$(e),
                    ec && ec(eT)),
                  eT
                );
              }),
              (eT.disable = function () {
                eT.isEnabled &&
                  (_.filter(function (e) {
                    return e !== eT && P(e.target);
                  }).length || k(eD ? eR : v, "scroll", O),
                  eT.isPressed &&
                    (eT._vx.reset(),
                    eT._vy.reset(),
                    k(ei ? v : eR, g[1], eH, !0)),
                  k(eD ? eR : v, "scroll", eV, ep),
                  k(v, "wheel", eq, ep),
                  k(v, g[0], e$, ep),
                  k(eR, g[2], eW),
                  k(eR, g[3], eW),
                  k(v, "click", eI, !0),
                  k(v, "click", eQ),
                  k(eR, "gesturestart", eU),
                  k(eR, "gestureend", eG),
                  k(v, u + "enter", eJ),
                  k(v, u + "leave", eZ),
                  k(v, u + "move", eK),
                  (eT.isEnabled = eT.isPressed = eT.isDragging = !1),
                  eu && eu(eT));
              }),
              (eT.kill = eT.revert =
                function () {
                  eT.disable();
                  var e = _.indexOf(eT);
                  e >= 0 && _.splice(e, 1), p === eT && (p = 0);
                }),
              _.push(eT),
              ei && P(v) && (p = eT),
              eT.enable(M);
          }),
          (e = [
            {
              key: "velocityX",
              get: function () {
                return this._vx.getVelocity();
              },
            },
            {
              key: "velocityY",
              get: function () {
                return this._vy.getVelocity();
              },
            },
          ]),
          (function (e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          })(t.prototype, e),
          t
        );
      })();
      (N.version = "3.13.0"),
        (N.create = function (e) {
          return new N(e);
        }),
        (N.register = X),
        (N.getAll = function () {
          return _.slice();
        }),
        (N.getById = function (e) {
          return _.filter(function (t) {
            return t.vars.id === e;
          })[0];
        }),
        v() && n.registerPlugin(N);
    },
    12423: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ ScrollTrigger: () => tv, default: () => tv });
      var n,
        o,
        i,
        a,
        s,
        l,
        c,
        u,
        f,
        d,
        p,
        g,
        h,
        v,
        m,
        _,
        y,
        x,
        b,
        w,
        E,
        T,
        P,
        S,
        k,
        C,
        M,
        O,
        A,
        L,
        D,
        R,
        F,
        z,
        Y,
        I,
        B,
        j,
        X = e.i(92366),
        N = 1,
        H = Date.now,
        $ = H(),
        W = 0,
        U = 0,
        G = function (e, t, r) {
          var n =
            es(e) && ("clamp(" === e.substr(0, 6) || e.indexOf("max") > -1);
          return (r["_" + t + "Clamp"] = n), n ? e.substr(6, e.length - 7) : e;
        },
        V = function (e, t) {
          return t && (!es(e) || "clamp(" !== e.substr(0, 6))
            ? "clamp(" + e + ")"
            : e;
        },
        q = function () {
          return (v = 1);
        },
        K = function () {
          return (v = 0);
        },
        J = function (e) {
          return e;
        },
        Z = function (e) {
          return Math.round(1e5 * e) / 1e5 || 0;
        },
        Q = function () {
          return "undefined" != typeof window;
        },
        ee = function () {
          return n || (Q() && (n = window.gsap) && n.registerPlugin && n);
        },
        et = function (e) {
          return !!~c.indexOf(e);
        },
        er = function (e) {
          return (
            ("Height" === e ? D : i["inner" + e]) ||
            s["client" + e] ||
            l["client" + e]
          );
        },
        en = function (e) {
          return (
            (0, X._getProxyProp)(e, "getBoundingClientRect") ||
            (et(e)
              ? function () {
                  return (tc.width = i.innerWidth), (tc.height = D), tc;
                }
              : function () {
                  return eM(e);
                })
          );
        },
        eo = function (e, t, r) {
          var n = r.d,
            o = r.d2,
            i = r.a;
          return (i = (0, X._getProxyProp)(e, "getBoundingClientRect"))
            ? function () {
                return i()[n];
              }
            : function () {
                return (t ? er(o) : e["client" + o]) || 0;
              };
        },
        ei = function (e, t) {
          var r = t.s,
            n = t.d2,
            o = t.d,
            i = t.a;
          return Math.max(
            0,
            ((r = "scroll" + n), (i = (0, X._getProxyProp)(e, r)))
              ? i() - en(e)()[o]
              : et(e)
              ? (s[r] || l[r]) - er(n)
              : e[r] - e["offset" + n]
          );
        },
        ea = function (e, t) {
          for (var r = 0; r < b.length; r += 3)
            (!t || ~t.indexOf(b[r + 1])) && e(b[r], b[r + 1], b[r + 2]);
        },
        es = function (e) {
          return "string" == typeof e;
        },
        el = function (e) {
          return "function" == typeof e;
        },
        ec = function (e) {
          return "number" == typeof e;
        },
        eu = function (e) {
          return "object" == typeof e;
        },
        ef = function (e, t, r) {
          return e && e.progress(+!t) && r && e.pause();
        },
        ed = function (e, t) {
          if (e.enabled) {
            var r = e._ctx
              ? e._ctx.add(function () {
                  return t(e);
                })
              : t(e);
            r && r.totalTime && (e.callbackAnimation = r);
          }
        },
        ep = Math.abs,
        eg = "left",
        eh = "right",
        ev = "bottom",
        em = "width",
        e_ = "height",
        ey = "Right",
        ex = "Left",
        eb = "Bottom",
        ew = "padding",
        eE = "margin",
        eT = "Width",
        eP = "Height",
        eS = function (e) {
          return i.getComputedStyle(e);
        },
        ek = function (e) {
          var t = eS(e).position;
          e.style.position = "absolute" === t || "fixed" === t ? t : "relative";
        },
        eC = function (e, t) {
          for (var r in t) r in e || (e[r] = t[r]);
          return e;
        },
        eM = function (e, t) {
          var r =
              t &&
              "matrix(1, 0, 0, 1, 0, 0)" !== eS(e)[m] &&
              n
                .to(e, {
                  x: 0,
                  y: 0,
                  xPercent: 0,
                  yPercent: 0,
                  rotation: 0,
                  rotationX: 0,
                  rotationY: 0,
                  scale: 1,
                  skewX: 0,
                  skewY: 0,
                })
                .progress(1),
            o = e.getBoundingClientRect();
          return r && r.progress(0).kill(), o;
        },
        eO = function (e, t) {
          var r = t.d2;
          return e["offset" + r] || e["client" + r] || 0;
        },
        eA = function (e) {
          var t,
            r = [],
            n = e.labels,
            o = e.duration();
          for (t in n) r.push(n[t] / o);
          return r;
        },
        eL = function (e) {
          var t = n.utils.snap(e),
            r =
              Array.isArray(e) &&
              e.slice(0).sort(function (e, t) {
                return e - t;
              });
          return r
            ? function (e, n, o) {
                var i;
                if ((void 0 === o && (o = 0.001), !n)) return t(e);
                if (n > 0) {
                  for (e -= o, i = 0; i < r.length; i++)
                    if (r[i] >= e) return r[i];
                  return r[i - 1];
                }
                for (i = r.length, e += o; i--; ) if (r[i] <= e) return r[i];
                return r[0];
              }
            : function (r, n, o) {
                void 0 === o && (o = 0.001);
                var i = t(r);
                return !n || Math.abs(i - r) < o || i - r < 0 == n < 0
                  ? i
                  : t(n < 0 ? r - e : r + e);
              };
        },
        eD = function (e, t, r, n) {
          return r.split(",").forEach(function (r) {
            return e(t, r, n);
          });
        },
        eR = function (e, t, r, n, o) {
          return e.addEventListener(t, r, { passive: !n, capture: !!o });
        },
        eF = function (e, t, r, n) {
          return e.removeEventListener(t, r, !!n);
        },
        ez = function (e, t, r) {
          (r = r && r.wheelHandler) && (e(t, "wheel", r), e(t, "touchmove", r));
        },
        eY = {
          startColor: "green",
          endColor: "red",
          indent: 0,
          fontSize: "16px",
          fontWeight: "normal",
        },
        eI = { toggleActions: "play", anticipatePin: 0 },
        eB = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
        ej = function (e, t) {
          if (es(e)) {
            var r = e.indexOf("="),
              n = ~r ? (e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
            ~r &&
              (e.indexOf("%") > r && (n *= t / 100), (e = e.substr(0, r - 1))),
              (e =
                n +
                (e in eB
                  ? eB[e] * t
                  : ~e.indexOf("%")
                  ? (parseFloat(e) * t) / 100
                  : parseFloat(e) || 0));
          }
          return e;
        },
        eX = function (e, t, r, n, o, i, s, c) {
          var u = o.startColor,
            f = o.endColor,
            d = o.fontSize,
            p = o.indent,
            g = o.fontWeight,
            h = a.createElement("div"),
            v = et(r) || "fixed" === (0, X._getProxyProp)(r, "pinType"),
            m = -1 !== e.indexOf("scroller"),
            _ = v ? l : r,
            y = -1 !== e.indexOf("start"),
            x = y ? u : f,
            b =
              "border-color:" +
              x +
              ";font-size:" +
              d +
              ";color:" +
              x +
              ";font-weight:" +
              g +
              ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
          return (
            (b += "position:" + ((m || c) && v ? "fixed;" : "absolute;")),
            (m || c || !v) &&
              (b +=
                (n === X._vertical ? eh : ev) +
                ":" +
                (i + parseFloat(p)) +
                "px;"),
            s &&
              (b +=
                "box-sizing:border-box;text-align:left;width:" +
                s.offsetWidth +
                "px;"),
            (h._isStart = y),
            h.setAttribute(
              "class",
              "gsap-marker-" + e + (t ? " marker-" + t : "")
            ),
            (h.style.cssText = b),
            (h.innerText = t || 0 === t ? e + "-" + t : e),
            _.children[0] ? _.insertBefore(h, _.children[0]) : _.appendChild(h),
            (h._offset = h["offset" + n.op.d2]),
            eN(h, 0, n, y),
            h
          );
        },
        eN = function (e, t, r, o) {
          var i = { display: "block" },
            a = r[o ? "os2" : "p2"],
            s = r[o ? "p2" : "os2"];
          (e._isFlipped = o),
            (i[r.a + "Percent"] = o ? -100 : 0),
            (i[r.a] = o ? "1px" : 0),
            (i["border" + a + eT] = 1),
            (i["border" + s + eT] = 0),
            (i[r.p] = t + "px"),
            n.set(e, i);
        },
        eH = [],
        e$ = {},
        eW = function () {
          return H() - W > 34 && (Y || (Y = requestAnimationFrame(te)));
        },
        eU = function () {
          (P && P.isPressed && !(P.startX > l.clientWidth)) ||
            (X._scrollers.cache++,
            P ? Y || (Y = requestAnimationFrame(te)) : te(),
            W || eZ("scrollStart"),
            (W = H()));
        },
        eG = function () {
          (C = i.innerWidth), (k = i.innerHeight);
        },
        eV = function (e) {
          X._scrollers.cache++,
            (!0 === e ||
              (!h &&
                !T &&
                !a.fullscreenElement &&
                !a.webkitFullscreenElement &&
                (!S ||
                  C !== i.innerWidth ||
                  Math.abs(i.innerHeight - k) > 0.25 * i.innerHeight))) &&
              u.restart(!0);
        },
        eq = {},
        eK = [],
        eJ = function e() {
          return eF(tv, "scrollEnd", e) || e8(!0);
        },
        eZ = function (e) {
          return (
            (eq[e] &&
              eq[e].map(function (e) {
                return e();
              })) ||
            eK
          );
        },
        eQ = [],
        e0 = function (e) {
          for (var t = 0; t < eQ.length; t += 5)
            (!e || (eQ[t + 4] && eQ[t + 4].query === e)) &&
              ((eQ[t].style.cssText = eQ[t + 1]),
              eQ[t].getBBox && eQ[t].setAttribute("transform", eQ[t + 2] || ""),
              (eQ[t + 3].uncache = 1));
        },
        e1 = function (e, t) {
          var r;
          for (_ = 0; _ < eH.length; _++)
            (r = eH[_]) &&
              (!t || r._ctx === t) &&
              (e ? r.kill(1) : r.revert(!0, !0));
          (R = !0), t && e0(t), t || eZ("revert");
        },
        e2 = function (e, t) {
          X._scrollers.cache++,
            (t || !I) &&
              X._scrollers.forEach(function (e) {
                return el(e) && e.cacheID++ && (e.rec = 0);
              }),
            es(e) && (i.history.scrollRestoration = A = e);
        },
        e3 = 0,
        e5 = function () {
          if (B !== e3) {
            var e = (B = e3);
            requestAnimationFrame(function () {
              return e === e3 && e8(!0);
            });
          }
        },
        e6 = function () {
          l.appendChild(L),
            (D = (!P && L.offsetHeight) || i.innerHeight),
            l.removeChild(L);
        },
        e4 = function (e) {
          return f(
            ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end"
          ).forEach(function (t) {
            return (t.style.display = e ? "none" : "block");
          });
        },
        e8 = function (e, t) {
          if (
            ((s = a.documentElement),
            (l = a.body),
            (c = [i, a, s, l]),
            W && !e && !R)
          )
            return void eR(tv, "scrollEnd", eJ);
          e6(),
            (I = tv.isRefreshing = !0),
            X._scrollers.forEach(function (e) {
              return el(e) && ++e.cacheID && (e.rec = e());
            });
          var r = eZ("refreshInit");
          w && tv.sort(),
            t || e1(),
            X._scrollers.forEach(function (e) {
              el(e) &&
                (e.smooth && (e.target.style.scrollBehavior = "auto"), e(0));
            }),
            eH.slice(0).forEach(function (e) {
              return e.refresh();
            }),
            (R = !1),
            eH.forEach(function (e) {
              if (e._subPinOffset && e.pin) {
                var t = e.vars.horizontal ? "offsetWidth" : "offsetHeight",
                  r = e.pin[t];
                e.revert(!0, 1), e.adjustPinSpacing(e.pin[t] - r), e.refresh();
              }
            }),
            (F = 1),
            e4(!0),
            eH.forEach(function (e) {
              var t = ei(e.scroller, e._dir),
                r = "max" === e.vars.end || (e._endClamp && e.end > t),
                n = e._startClamp && e.start >= t;
              (r || n) &&
                e.setPositions(
                  n ? t - 1 : e.start,
                  r ? Math.max(n ? t : e.start + 1, t) : e.end,
                  !0
                );
            }),
            e4(!1),
            (F = 0),
            r.forEach(function (e) {
              return e && e.render && e.render(-1);
            }),
            X._scrollers.forEach(function (e) {
              el(e) &&
                (e.smooth &&
                  requestAnimationFrame(function () {
                    return (e.target.style.scrollBehavior = "smooth");
                  }),
                e.rec && e(e.rec));
            }),
            e2(A, 1),
            u.pause(),
            e3++,
            (I = 2),
            te(2),
            eH.forEach(function (e) {
              return el(e.vars.onRefresh) && e.vars.onRefresh(e);
            }),
            (I = tv.isRefreshing = !1),
            eZ("refresh");
        },
        e7 = 0,
        e9 = 1,
        te = function (e) {
          if (2 === e || (!I && !R)) {
            (tv.isUpdating = !0), j && j.update(0);
            var t = eH.length,
              r = H(),
              n = r - $ >= 50,
              o = t && eH[0].scroll();
            if (
              ((e9 = e7 > o ? -1 : 1),
              I || (e7 = o),
              n &&
                (W && !v && r - W > 200 && ((W = 0), eZ("scrollEnd")),
                (p = $),
                ($ = r)),
              e9 < 0)
            ) {
              for (_ = t; _-- > 0; ) eH[_] && eH[_].update(0, n);
              e9 = 1;
            } else for (_ = 0; _ < t; _++) eH[_] && eH[_].update(0, n);
            tv.isUpdating = !1;
          }
          Y = 0;
        },
        tt = [
          eg,
          "top",
          ev,
          eh,
          eE + eb,
          eE + ey,
          eE + "Top",
          eE + ex,
          "display",
          "flexShrink",
          "float",
          "zIndex",
          "gridColumnStart",
          "gridColumnEnd",
          "gridRowStart",
          "gridRowEnd",
          "gridArea",
          "justifySelf",
          "alignSelf",
          "placeSelf",
          "order",
        ],
        tr = tt.concat([
          em,
          e_,
          "boxSizing",
          "max" + eT,
          "max" + eP,
          "position",
          eE,
          ew,
          ew + "Top",
          ew + ey,
          ew + eb,
          ew + ex,
        ]),
        tn = function (e, t, r) {
          ta(r);
          var n = e._gsap;
          if (n.spacerIsNative) ta(n.spacerState);
          else if (e._gsap.swappedIn) {
            var o = t.parentNode;
            o && (o.insertBefore(e, t), o.removeChild(t));
          }
          e._gsap.swappedIn = !1;
        },
        to = function (e, t, r, n) {
          if (!e._gsap.swappedIn) {
            for (var o, i = tt.length, a = t.style, s = e.style; i--; )
              a[(o = tt[i])] = r[o];
            (a.position = "absolute" === r.position ? "absolute" : "relative"),
              "inline" === r.display && (a.display = "inline-block"),
              (s[ev] = s[eh] = "auto"),
              (a.flexBasis = r.flexBasis || "auto"),
              (a.overflow = "visible"),
              (a.boxSizing = "border-box"),
              (a[em] = eO(e, X._horizontal) + "px"),
              (a[e_] = eO(e, X._vertical) + "px"),
              (a[ew] = s[eE] = s.top = s[eg] = "0"),
              ta(n),
              (s[em] = s["max" + eT] = r[em]),
              (s[e_] = s["max" + eP] = r[e_]),
              (s[ew] = r[ew]),
              e.parentNode !== t &&
                (e.parentNode.insertBefore(t, e), t.appendChild(e)),
              (e._gsap.swappedIn = !0);
          }
        },
        ti = /([A-Z])/g,
        ta = function (e) {
          if (e) {
            var t,
              r,
              o = e.t.style,
              i = e.length,
              a = 0;
            for ((e.t._gsap || n.core.getCache(e.t)).uncache = 1; a < i; a += 2)
              (r = e[a + 1]),
                (t = e[a]),
                r
                  ? (o[t] = r)
                  : o[t] &&
                    o.removeProperty(t.replace(ti, "-$1").toLowerCase());
          }
        },
        ts = function (e) {
          for (var t = tr.length, r = e.style, n = [], o = 0; o < t; o++)
            n.push(tr[o], r[tr[o]]);
          return (n.t = e), n;
        },
        tl = function (e, t, r) {
          for (var n, o = [], i = e.length, a = 8 * !!r; a < i; a += 2)
            (n = e[a]), o.push(n, n in t ? t[n] : e[a + 1]);
          return (o.t = e.t), o;
        },
        tc = { left: 0, top: 0 },
        tu = function (e, t, r, o, i, a, c, u, f, d, p, g, h, v) {
          el(e) && (e = e(u)),
            es(e) &&
              "max" === e.substr(0, 3) &&
              (e = g + ("=" === e.charAt(4) ? ej("0" + e.substr(3), r) : 0));
          var m,
            _,
            y,
            x = h ? h.time() : 0;
          if ((h && h.seek(0), isNaN(e) || (e *= 1), ec(e)))
            h &&
              (e = n.utils.mapRange(
                h.scrollTrigger.start,
                h.scrollTrigger.end,
                0,
                g,
                e
              )),
              c && eN(c, r, o, !0);
          else {
            el(t) && (t = t(u));
            var b,
              w,
              E,
              T,
              P = (e || "0").split(" ");
            (b = eM((y = (0, X._getTarget)(t, u) || l)) || {}).left ||
              b.top ||
              "none" !== eS(y).display ||
              ((T = y.style.display),
              (y.style.display = "block"),
              (b = eM(y)),
              T ? (y.style.display = T) : y.style.removeProperty("display")),
              (w = ej(P[0], b[o.d])),
              (E = ej(P[1] || "0", r)),
              (e = b[o.p] - f[o.p] - d + w + i - E),
              c && eN(c, E, o, r - E < 20 || (c._isStart && E > 20)),
              (r -= r - E);
          }
          if ((v && ((u[v] = e || -0.001), e < 0 && (e = 0)), a)) {
            var S = e + r,
              k = a._isStart;
            (m = "scroll" + o.d2),
              eN(
                a,
                S,
                o,
                (k && S > 20) ||
                  (!k && (p ? Math.max(l[m], s[m]) : a.parentNode[m]) <= S + 1)
              ),
              p &&
                ((f = eM(c)),
                p && (a.style[o.op.p] = f[o.op.p] - o.op.m - a._offset + "px"));
          }
          return (
            h &&
              y &&
              ((m = eM(y)),
              h.seek(g),
              (_ = eM(y)),
              (h._caScrollDist = m[o.p] - _[o.p]),
              (e = (e / h._caScrollDist) * g)),
            h && h.seek(x),
            h ? e : Math.round(e)
          );
        },
        tf = /(webkit|moz|length|cssText|inset)/i,
        td = function (e, t, r, o) {
          if (e.parentNode !== t) {
            var i,
              a,
              s = e.style;
            if (t === l) {
              for (i in ((e._stOrig = s.cssText), (a = eS(e))))
                +i ||
                  tf.test(i) ||
                  !a[i] ||
                  "string" != typeof s[i] ||
                  "0" === i ||
                  (s[i] = a[i]);
              (s.top = r), (s.left = o);
            } else s.cssText = e._stOrig;
            (n.core.getCache(e).uncache = 1), t.appendChild(e);
          }
        },
        tp = function (e, t, r) {
          var n = t,
            o = n;
          return function (t) {
            var i = Math.round(e());
            return (
              i !== n &&
                i !== o &&
                Math.abs(i - n) > 3 &&
                Math.abs(i - o) > 3 &&
                ((t = i), r && r()),
              (o = n),
              (n = Math.round(t))
            );
          };
        },
        tg = function (e, t, r) {
          var o = {};
          (o[t.p] = "+=" + r), n.set(e, o);
        },
        th = function (e, t) {
          var r = (0, X._getScrollFunc)(e, t),
            o = "_scroll" + t.p2,
            i = function t(i, a, s, l, c) {
              var u = t.tween,
                f = a.onComplete,
                d = {};
              s = s || r();
              var p = tp(r, s, function () {
                u.kill(), (t.tween = 0);
              });
              return (
                (c = (l && c) || 0),
                (l = l || i - s),
                u && u.kill(),
                (a[o] = i),
                (a.inherit = !1),
                (a.modifiers = d),
                (d[o] = function () {
                  return p(s + l * u.ratio + c * u.ratio * u.ratio);
                }),
                (a.onUpdate = function () {
                  X._scrollers.cache++, t.tween && te();
                }),
                (a.onComplete = function () {
                  (t.tween = 0), f && f.call(u);
                }),
                (u = t.tween = n.to(e, a))
              );
            };
          return (
            (e[o] = r),
            (r.wheelHandler = function () {
              return i.tween && i.tween.kill() && (i.tween = 0);
            }),
            eR(e, "wheel", r.wheelHandler),
            tv.isTouch && eR(e, "touchmove", r.wheelHandler),
            i
          );
        },
        tv = (function () {
          function e(t, r) {
            o ||
              e.register(n) ||
              console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
              O(this),
              this.init(t, r);
          }
          return (
            (e.prototype.init = function (t, r) {
              if (
                ((this.progress = this.start = 0),
                this.vars && this.kill(!0, !0),
                !U)
              ) {
                this.update = this.refresh = this.kill = J;
                return;
              }
              var o,
                c,
                u,
                g,
                m,
                y,
                x,
                b,
                T,
                P,
                S,
                k,
                C,
                M,
                O,
                A,
                L,
                D,
                R,
                Y,
                B,
                $,
                q,
                K,
                Q,
                ee,
                er,
                ea,
                eg,
                eh,
                ev,
                eD,
                ez,
                eB,
                eN,
                eW,
                eG,
                eq,
                eK,
                eZ,
                eQ,
                e0 = (t = eC(
                  es(t) || ec(t) || t.nodeType ? { trigger: t } : t,
                  eI
                )),
                e1 = e0.onUpdate,
                e2 = e0.toggleClass,
                e3 = e0.id,
                e6 = e0.onToggle,
                e4 = e0.onRefresh,
                e8 = e0.scrub,
                e7 = e0.trigger,
                te = e0.pin,
                tt = e0.pinSpacing,
                tr = e0.invalidateOnRefresh,
                ti = e0.anticipatePin,
                tf = e0.onScrubComplete,
                tp = e0.onSnapComplete,
                tv = e0.once,
                tm = e0.snap,
                t_ = e0.pinReparent,
                ty = e0.pinSpacer,
                tx = e0.containerAnimation,
                tb = e0.fastScrollEnd,
                tw = e0.preventOverlaps,
                tE =
                  t.horizontal || (t.containerAnimation && !1 !== t.horizontal)
                    ? X._horizontal
                    : X._vertical,
                tT = !e8 && 0 !== e8,
                tP = (0, X._getTarget)(t.scroller || i),
                tS = n.core.getCache(tP),
                tk = et(tP),
                tC =
                  ("pinType" in t
                    ? t.pinType
                    : (0, X._getProxyProp)(tP, "pinType") ||
                      (tk && "fixed")) === "fixed",
                tM = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
                tO = tT && t.toggleActions.split(" "),
                tA = "markers" in t ? t.markers : eI.markers,
                tL = tk ? 0 : parseFloat(eS(tP)["border" + tE.p2 + eT]) || 0,
                tD = this,
                tR =
                  t.onRefreshInit &&
                  function () {
                    return t.onRefreshInit(tD);
                  },
                tF = eo(tP, tk, tE),
                tz =
                  !tk || ~X._proxies.indexOf(tP)
                    ? en(tP)
                    : function () {
                        return tc;
                      },
                tY = 0,
                tI = 0,
                tB = 0,
                tj = (0, X._getScrollFunc)(tP, tE);
              if (
                ((tD._startClamp = tD._endClamp = !1),
                (tD._dir = tE),
                (ti *= 45),
                (tD.scroller = tP),
                (tD.scroll = tx ? tx.time.bind(tx) : tj),
                (y = tj()),
                (tD.vars = t),
                (r = r || t.animation),
                "refreshPriority" in t &&
                  ((w = 1), -9999 === t.refreshPriority && (j = tD)),
                (tS.tweenScroll = tS.tweenScroll || {
                  top: th(tP, X._vertical),
                  left: th(tP, X._horizontal),
                }),
                (tD.tweenTo = u = tS.tweenScroll[tE.p]),
                (tD.scrubDuration = function (e) {
                  (eN = ec(e) && e)
                    ? eB
                      ? eB.duration(e)
                      : (eB = n.to(r, {
                          ease: "expo",
                          totalProgress: "+=0",
                          inherit: !1,
                          duration: eN,
                          paused: !0,
                          onComplete: function () {
                            return tf && tf(tD);
                          },
                        }))
                    : (eB && eB.progress(1).kill(), (eB = 0));
                }),
                r &&
                  ((r.vars.lazy = !1),
                  (r._initted && !tD.isReverted) ||
                    (!1 !== r.vars.immediateRender &&
                      !1 !== t.immediateRender &&
                      r.duration() &&
                      r.render(0, !0, !0)),
                  (tD.animation = r.pause()),
                  (r.scrollTrigger = tD),
                  tD.scrubDuration(e8),
                  (eD = 0),
                  e3 || (e3 = r.vars.id)),
                tm &&
                  ((!eu(tm) || tm.push) && (tm = { snapTo: tm }),
                  "scrollBehavior" in l.style &&
                    n.set(tk ? [l, s] : tP, { scrollBehavior: "auto" }),
                  X._scrollers.forEach(function (e) {
                    return (
                      el(e) &&
                      e.target === (tk ? a.scrollingElement || s : tP) &&
                      (e.smooth = !1)
                    );
                  }),
                  (m = el(tm.snapTo)
                    ? tm.snapTo
                    : "labels" === tm.snapTo
                    ? ((o = r),
                      function (e) {
                        return n.utils.snap(eA(o), e);
                      })
                    : "labelsDirectional" === tm.snapTo
                    ? ((c = r),
                      function (e, t) {
                        return eL(eA(c))(e, t.direction);
                      })
                    : !1 !== tm.directional
                    ? function (e, t) {
                        return eL(tm.snapTo)(
                          e,
                          H() - tI < 500 ? 0 : t.direction
                        );
                      }
                    : n.utils.snap(tm.snapTo)),
                  (eW = eu((eW = tm.duration || { min: 0.1, max: 2 }))
                    ? d(eW.min, eW.max)
                    : d(eW, eW)),
                  (eG = n
                    .delayedCall(tm.delay || eN / 2 || 0.1, function () {
                      var e = tj(),
                        t = H() - tI < 500,
                        o = u.tween;
                      if (
                        (t || 10 > Math.abs(tD.getVelocity())) &&
                        !o &&
                        !v &&
                        tY !== e
                      ) {
                        var i,
                          a,
                          s = (e - b) / A,
                          l = r && !tT ? r.totalProgress() : s,
                          c = t ? 0 : ((l - ez) / (H() - p)) * 1e3 || 0,
                          f = n.utils.clamp(-s, 1 - s, (ep(c / 2) * c) / 0.185),
                          d = s + (!1 === tm.inertia ? 0 : f),
                          g = tm,
                          h = g.onStart,
                          _ = g.onInterrupt,
                          y = g.onComplete;
                        if (
                          (ec((i = m(d, tD))) || (i = d),
                          (a = Math.max(0, Math.round(b + i * A))),
                          e <= T && e >= b && a !== e)
                        ) {
                          if (o && !o._initted && o.data <= ep(a - e)) return;
                          !1 === tm.inertia && (f = i - s),
                            u(
                              a,
                              {
                                duration: eW(
                                  ep(
                                    (0.185 * Math.max(ep(d - l), ep(i - l))) /
                                      c /
                                      0.05 || 0
                                  )
                                ),
                                ease: tm.ease || "power3",
                                data: ep(a - e),
                                onInterrupt: function () {
                                  return eG.restart(!0) && _ && _(tD);
                                },
                                onComplete: function () {
                                  tD.update(),
                                    (tY = tj()),
                                    r &&
                                      !tT &&
                                      (eB
                                        ? eB.resetTo(
                                            "totalProgress",
                                            i,
                                            r._tTime / r._tDur
                                          )
                                        : r.progress(i)),
                                    (eD = ez =
                                      r && !tT
                                        ? r.totalProgress()
                                        : tD.progress),
                                    tp && tp(tD),
                                    y && y(tD);
                                },
                              },
                              e,
                              f * A,
                              a - e - f * A
                            ),
                            h && h(tD, u.tween);
                        }
                      } else tD.isActive && tY !== e && eG.restart(!0);
                    })
                    .pause())),
                e3 && (e$[e3] = tD),
                (eQ =
                  (e7 = tD.trigger =
                    (0, X._getTarget)(e7 || (!0 !== te && te))) &&
                  e7._gsap &&
                  e7._gsap.stRevert) && (eQ = eQ(tD)),
                (te = !0 === te ? e7 : (0, X._getTarget)(te)),
                es(e2) && (e2 = { targets: e7, className: e2 }),
                te &&
                  (!1 === tt ||
                    tt === eE ||
                    (tt =
                      (!!tt ||
                        !te.parentNode ||
                        !te.parentNode.style ||
                        "flex" !== eS(te.parentNode).display) &&
                      ew),
                  (tD.pin = te),
                  (g = n.core.getCache(te)).spacer
                    ? (L = g.pinState)
                    : (ty &&
                        ((ty = (0, X._getTarget)(ty)) &&
                          !ty.nodeType &&
                          (ty = ty.current || ty.nativeElement),
                        (g.spacerIsNative = !!ty),
                        ty && (g.spacerState = ts(ty))),
                      (g.spacer = Y = ty || a.createElement("div")),
                      Y.classList.add("pin-spacer"),
                      e3 && Y.classList.add("pin-spacer-" + e3),
                      (g.pinState = L = ts(te))),
                  !1 !== t.force3D && n.set(te, { force3D: !0 }),
                  (tD.spacer = Y = g.spacer),
                  (ee = (ev = eS(te))[tt + tE.os2]),
                  ($ = n.getProperty(te)),
                  (q = n.quickSetter(te, tE.a, "px")),
                  to(te, Y, ev),
                  (R = ts(te))),
                tA)
              ) {
                (M = eu(tA) ? eC(tA, eY) : eY),
                  (k = eX("scroller-start", e3, tP, tE, M, 0)),
                  (C = eX("scroller-end", e3, tP, tE, M, 0, k)),
                  (B = k["offset" + tE.op.d2]);
                var tX = (0, X._getTarget)(
                  (0, X._getProxyProp)(tP, "content") || tP
                );
                (P = this.markerStart = eX("start", e3, tX, tE, M, B, 0, tx)),
                  (S = this.markerEnd = eX("end", e3, tX, tE, M, B, 0, tx)),
                  tx && (eZ = n.quickSetter([P, S], tE.a, "px")),
                  tC ||
                    (X._proxies.length &&
                      !0 === (0, X._getProxyProp)(tP, "fixedMarkers")) ||
                    (ek(tk ? l : tP),
                    n.set([k, C], { force3D: !0 }),
                    (ea = n.quickSetter(k, tE.a, "px")),
                    (eh = n.quickSetter(C, tE.a, "px")));
              }
              if (tx) {
                var tN = tx.vars.onUpdate,
                  tH = tx.vars.onUpdateParams;
                tx.eventCallback("onUpdate", function () {
                  tD.update(0, 0, 1), tN && tN.apply(tx, tH || []);
                });
              }
              if (
                ((tD.previous = function () {
                  return eH[eH.indexOf(tD) - 1];
                }),
                (tD.next = function () {
                  return eH[eH.indexOf(tD) + 1];
                }),
                (tD.revert = function (e, t) {
                  if (!t) return tD.kill(!0);
                  var n = !1 !== e || !tD.enabled,
                    o = h;
                  n !== tD.isReverted &&
                    (n &&
                      ((eq = Math.max(tj(), tD.scroll.rec || 0)),
                      (tB = tD.progress),
                      (eK = r && r.progress())),
                    P &&
                      [P, S, k, C].forEach(function (e) {
                        return (e.style.display = n ? "none" : "block");
                      }),
                    n && ((h = tD), tD.update(n)),
                    !te ||
                      (t_ && tD.isActive) ||
                      (n ? tn(te, Y, L) : to(te, Y, eS(te), er)),
                    n || tD.update(n),
                    (h = o),
                    (tD.isReverted = n));
                }),
                (tD.refresh = function (o, i, c, f) {
                  if ((!h && tD.enabled) || i) {
                    if (te && o && W) return void eR(e, "scrollEnd", eJ);
                    !I && tR && tR(tD),
                      (h = tD),
                      u.tween && !c && (u.tween.kill(), (u.tween = 0)),
                      eB && eB.pause(),
                      tr &&
                        r &&
                        (r.revert({ kill: !1 }).invalidate(),
                        r.getChildren &&
                          r.getChildren(!0, !0, !1).forEach(function (e) {
                            return (
                              e.vars.immediateRender && e.render(0, !0, !0)
                            );
                          })),
                      tD.isReverted || tD.revert(!0, !0),
                      (tD._subPinOffset = !1);
                    var d,
                      p,
                      g,
                      v,
                      m,
                      _,
                      w,
                      M,
                      z,
                      B,
                      j,
                      N,
                      U,
                      V = tF(),
                      q = tz(),
                      J = tx ? tx.duration() : ei(tP, tE),
                      Z = A <= 0.01 || !A,
                      ee = 0,
                      et = f || 0,
                      en = eu(c) ? c.end : t.end,
                      eo = t.endTrigger || e7,
                      ea = eu(c)
                        ? c.start
                        : t.start ||
                          (0 !== t.start && e7 ? (te ? "0 0" : "0 100%") : 0),
                      ec = (tD.pinnedContainer =
                        t.pinnedContainer &&
                        (0, X._getTarget)(t.pinnedContainer, tD)),
                      ef = (e7 && Math.max(0, eH.indexOf(tD))) || 0,
                      ed = ef;
                    for (
                      tA &&
                      eu(c) &&
                      ((N = n.getProperty(k, tE.p)),
                      (U = n.getProperty(C, tE.p)));
                      ed-- > 0;

                    )
                      (_ = eH[ed]).end || _.refresh(0, 1) || (h = tD),
                        (w = _.pin) &&
                          (w === e7 || w === te || w === ec) &&
                          !_.isReverted &&
                          (B || (B = []), B.unshift(_), _.revert(!0, !0)),
                        _ !== eH[ed] && (ef--, ed--);
                    for (
                      el(ea) && (ea = ea(tD)),
                        b =
                          tu(
                            (ea = G(ea, "start", tD)),
                            e7,
                            V,
                            tE,
                            tj(),
                            P,
                            k,
                            tD,
                            q,
                            tL,
                            tC,
                            J,
                            tx,
                            tD._startClamp && "_startClamp"
                          ) || (te ? -0.001 : 0),
                        el(en) && (en = en(tD)),
                        es(en) &&
                          !en.indexOf("+=") &&
                          (~en.indexOf(" ")
                            ? (en = (es(ea) ? ea.split(" ")[0] : "") + en)
                            : ((ee = ej(en.substr(2), V)),
                              (en = es(ea)
                                ? ea
                                : (tx
                                    ? n.utils.mapRange(
                                        0,
                                        tx.duration(),
                                        tx.scrollTrigger.start,
                                        tx.scrollTrigger.end,
                                        b
                                      )
                                    : b) + ee),
                              (eo = e7))),
                        en = G(en, "end", tD),
                        T =
                          Math.max(
                            b,
                            tu(
                              en || (eo ? "100% 0" : J),
                              eo,
                              V,
                              tE,
                              tj() + ee,
                              S,
                              C,
                              tD,
                              q,
                              tL,
                              tC,
                              J,
                              tx,
                              tD._endClamp && "_endClamp"
                            )
                          ) || -0.001,
                        ee = 0,
                        ed = ef;
                      ed--;

                    )
                      (w = (_ = eH[ed]).pin) &&
                        _.start - _._pinPush <= b &&
                        !tx &&
                        _.end > 0 &&
                        ((d =
                          _.end -
                          (tD._startClamp ? Math.max(0, _.start) : _.start)),
                        ((w === e7 && _.start - _._pinPush < b) || w === ec) &&
                          isNaN(ea) &&
                          (ee += d * (1 - _.progress)),
                        w === te && (et += d));
                    if (
                      ((b += ee),
                      (T += ee),
                      tD._startClamp && (tD._startClamp += ee),
                      tD._endClamp &&
                        !I &&
                        ((tD._endClamp = T || -0.001),
                        (T = Math.min(T, ei(tP, tE)))),
                      (A = T - b || ((b -= 0.01) && 0.001)),
                      Z &&
                        (tB = n.utils.clamp(0, 1, n.utils.normalize(b, T, eq))),
                      (tD._pinPush = et),
                      P &&
                        ee &&
                        (((d = {})[tE.a] = "+=" + ee),
                        ec && (d[tE.p] = "-=" + tj()),
                        n.set([P, S], d)),
                      te && !(F && tD.end >= ei(tP, tE)))
                    )
                      (d = eS(te)),
                        (v = tE === X._vertical),
                        (g = tj()),
                        (K = parseFloat($(tE.a)) + et),
                        !J &&
                          T > 1 &&
                          ((j = {
                            style: (j = (tk ? a.scrollingElement || s : tP)
                              .style),
                            value: j["overflow" + tE.a.toUpperCase()],
                          }),
                          tk &&
                            "scroll" !==
                              eS(l)["overflow" + tE.a.toUpperCase()] &&
                            (j.style["overflow" + tE.a.toUpperCase()] =
                              "scroll")),
                        to(te, Y, d),
                        (R = ts(te)),
                        (p = eM(te, !0)),
                        (M =
                          tC &&
                          (0, X._getScrollFunc)(
                            tP,
                            v ? X._horizontal : X._vertical
                          )()),
                        tt
                          ? (((er = [tt + tE.os2, A + et + "px"]).t = Y),
                            (ed = tt === ew ? eO(te, tE) + A + et : 0) &&
                              (er.push(tE.d, ed + "px"),
                              "auto" !== Y.style.flexBasis &&
                                (Y.style.flexBasis = ed + "px")),
                            ta(er),
                            ec &&
                              eH.forEach(function (e) {
                                e.pin === ec &&
                                  !1 !== e.vars.pinSpacing &&
                                  (e._subPinOffset = !0);
                              }),
                            tC && tj(eq))
                          : (ed = eO(te, tE)) &&
                            "auto" !== Y.style.flexBasis &&
                            (Y.style.flexBasis = ed + "px"),
                        tC &&
                          (((m = {
                            top: p.top + (v ? g - b : M) + "px",
                            left: p.left + (v ? M : g - b) + "px",
                            boxSizing: "border-box",
                            position: "fixed",
                          })[em] = m["max" + eT] =
                            Math.ceil(p.width) + "px"),
                          (m[e_] = m["max" + eP] = Math.ceil(p.height) + "px"),
                          (m[eE] =
                            m[eE + "Top"] =
                            m[eE + ey] =
                            m[eE + eb] =
                            m[eE + ex] =
                              "0"),
                          (m[ew] = d[ew]),
                          (m[ew + "Top"] = d[ew + "Top"]),
                          (m[ew + ey] = d[ew + ey]),
                          (m[ew + eb] = d[ew + eb]),
                          (m[ew + ex] = d[ew + ex]),
                          (D = tl(L, m, t_)),
                          I && tj(0)),
                        r
                          ? ((z = r._initted),
                            E(1),
                            r.render(r.duration(), !0, !0),
                            (Q = $(tE.a) - K + A + et),
                            (eg = Math.abs(A - Q) > 1),
                            tC && eg && D.splice(D.length - 2, 2),
                            r.render(0, !0, !0),
                            z || r.invalidate(!0),
                            r.parent || r.totalTime(r.totalTime()),
                            E(0))
                          : (Q = A),
                        j &&
                          (j.value
                            ? (j.style["overflow" + tE.a.toUpperCase()] =
                                j.value)
                            : j.style.removeProperty("overflow-" + tE.a));
                    else if (e7 && tj() && !tx)
                      for (p = e7.parentNode; p && p !== l; )
                        p._pinOffset &&
                          ((b -= p._pinOffset), (T -= p._pinOffset)),
                          (p = p.parentNode);
                    B &&
                      B.forEach(function (e) {
                        return e.revert(!1, !0);
                      }),
                      (tD.start = b),
                      (tD.end = T),
                      (y = x = I ? eq : tj()),
                      tx || I || (y < eq && tj(eq), (tD.scroll.rec = 0)),
                      tD.revert(!1, !0),
                      (tI = H()),
                      eG && ((tY = -1), eG.restart(!0)),
                      (h = 0),
                      r &&
                        tT &&
                        (r._initted || eK) &&
                        r.progress() !== eK &&
                        r.progress(eK || 0, !0).render(r.time(), !0, !0),
                      (Z ||
                        tB !== tD.progress ||
                        tx ||
                        tr ||
                        (r && !r._initted)) &&
                        (r &&
                          !tT &&
                          (r._initted || tB || !1 !== r.vars.immediateRender) &&
                          r.totalProgress(
                            tx && b < -0.001 && !tB
                              ? n.utils.normalize(b, T, 0)
                              : tB,
                            !0
                          ),
                        (tD.progress = Z || (y - b) / A === tB ? 0 : tB)),
                      te && tt && (Y._pinOffset = Math.round(tD.progress * Q)),
                      eB && eB.invalidate(),
                      isNaN(N) ||
                        ((N -= n.getProperty(k, tE.p)),
                        (U -= n.getProperty(C, tE.p)),
                        tg(k, tE, N),
                        tg(P, tE, N - (f || 0)),
                        tg(C, tE, U),
                        tg(S, tE, U - (f || 0))),
                      Z && !I && tD.update(),
                      !e4 || I || O || ((O = !0), e4(tD), (O = !1));
                  }
                }),
                (tD.getVelocity = function () {
                  return ((tj() - x) / (H() - p)) * 1e3 || 0;
                }),
                (tD.endAnimation = function () {
                  ef(tD.callbackAnimation),
                    r &&
                      (eB
                        ? eB.progress(1)
                        : r.paused()
                        ? tT || ef(r, tD.direction < 0, 1)
                        : ef(r, r.reversed()));
                }),
                (tD.labelToScroll = function (e) {
                  return (
                    (r &&
                      r.labels &&
                      (b || tD.refresh() || b) +
                        (r.labels[e] / r.duration()) * A) ||
                    0
                  );
                }),
                (tD.getTrailing = function (e) {
                  var t = eH.indexOf(tD),
                    r =
                      tD.direction > 0
                        ? eH.slice(0, t).reverse()
                        : eH.slice(t + 1);
                  return (
                    es(e)
                      ? r.filter(function (t) {
                          return t.vars.preventOverlaps === e;
                        })
                      : r
                  ).filter(function (e) {
                    return tD.direction > 0 ? e.end <= b : e.start >= T;
                  });
                }),
                (tD.update = function (e, t, n) {
                  if (!tx || n || e) {
                    var o,
                      i,
                      a,
                      s,
                      c,
                      d,
                      g,
                      v = !0 === I ? eq : tD.scroll(),
                      m = e ? 0 : (v - b) / A,
                      _ = m < 0 ? 0 : m > 1 ? 1 : m || 0,
                      w = tD.progress;
                    if (
                      (t &&
                        ((x = y),
                        (y = tx ? tj() : v),
                        tm &&
                          ((ez = eD), (eD = r && !tT ? r.totalProgress() : _))),
                      ti &&
                        te &&
                        !h &&
                        !N &&
                        W &&
                        (!_ && b < v + ((v - x) / (H() - p)) * ti
                          ? (_ = 1e-4)
                          : 1 === _ &&
                            T > v + ((v - x) / (H() - p)) * ti &&
                            (_ = 0.9999)),
                      _ !== w && tD.enabled)
                    ) {
                      if (
                        ((s =
                          (c =
                            (o = tD.isActive = !!_ && _ < 1) !=
                            (!!w && w < 1)) || !!_ != !!w),
                        (tD.direction = _ > w ? 1 : -1),
                        (tD.progress = _),
                        s &&
                          !h &&
                          ((i = _ && !w ? 0 : 1 === _ ? 1 : 1 === w ? 2 : 3),
                          tT &&
                            ((a =
                              (!c && "none" !== tO[i + 1] && tO[i + 1]) ||
                              tO[i]),
                            (g =
                              r &&
                              ("complete" === a || "reset" === a || a in r)))),
                        tw &&
                          (c || g) &&
                          (g || e8 || !r) &&
                          (el(tw)
                            ? tw(tD)
                            : tD.getTrailing(tw).forEach(function (e) {
                                return e.endAnimation();
                              })),
                        !tT &&
                          (!eB || h || N
                            ? r && r.totalProgress(_, !!(h && (tI || e)))
                            : (eB._dp._time - eB._start !== eB._time &&
                                eB.render(eB._dp._time - eB._start),
                              eB.resetTo
                                ? eB.resetTo(
                                    "totalProgress",
                                    _,
                                    r._tTime / r._tDur
                                  )
                                : ((eB.vars.totalProgress = _),
                                  eB.invalidate().restart()))),
                        te)
                      )
                        if ((e && tt && (Y.style[tt + tE.os2] = ee), tC)) {
                          if (s) {
                            if (
                              ((d =
                                !e &&
                                _ > w &&
                                T + 1 > v &&
                                v + 1 >= ei(tP, tE)),
                              t_)
                            )
                              if (!e && (o || d)) {
                                var E = eM(te, !0),
                                  P = v - b;
                                td(
                                  te,
                                  l,
                                  E.top + (tE === X._vertical ? P : 0) + "px",
                                  E.left + (tE === X._vertical ? 0 : P) + "px"
                                );
                              } else td(te, Y);
                            ta(o || d ? D : R),
                              (eg && _ < 1 && o) ||
                                q(K + (1 !== _ || d ? 0 : Q));
                          }
                        } else q(Z(K + Q * _));
                      !tm || u.tween || h || N || eG.restart(!0),
                        e2 &&
                          (c || (tv && _ && (_ < 1 || !z))) &&
                          f(e2.targets).forEach(function (e) {
                            return e.classList[o || tv ? "add" : "remove"](
                              e2.className
                            );
                          }),
                        !e1 || tT || e || e1(tD),
                        s && !h
                          ? (tT &&
                              (g &&
                                ("complete" === a
                                  ? r.pause().totalProgress(1)
                                  : "reset" === a
                                  ? r.restart(!0).pause()
                                  : "restart" === a
                                  ? r.restart(!0)
                                  : r[a]()),
                              e1 && e1(tD)),
                            (c || !z) &&
                              (e6 && c && ed(tD, e6),
                              tM[i] && ed(tD, tM[i]),
                              tv && (1 === _ ? tD.kill(!1, 1) : (tM[i] = 0)),
                              !c && tM[(i = 1 === _ ? 1 : 3)] && ed(tD, tM[i])),
                            tb &&
                              !o &&
                              Math.abs(tD.getVelocity()) >
                                (ec(tb) ? tb : 2500) &&
                              (ef(tD.callbackAnimation),
                              eB
                                ? eB.progress(1)
                                : ef(r, "reverse" === a ? 1 : !_, 1)))
                          : tT && e1 && !h && e1(tD);
                    }
                    if (eh) {
                      var S = tx
                        ? (v / tx.duration()) * (tx._caScrollDist || 0)
                        : v;
                      ea(S + +!!k._isFlipped), eh(S);
                    }
                    eZ && eZ((-v / tx.duration()) * (tx._caScrollDist || 0));
                  }
                }),
                (tD.enable = function (t, r) {
                  tD.enabled ||
                    ((tD.enabled = !0),
                    eR(tP, "resize", eV),
                    tk || eR(tP, "scroll", eU),
                    tR && eR(e, "refreshInit", tR),
                    !1 !== t && ((tD.progress = tB = 0), (y = x = tY = tj())),
                    !1 !== r && tD.refresh());
                }),
                (tD.getTween = function (e) {
                  return e && u ? u.tween : eB;
                }),
                (tD.setPositions = function (e, t, r, n) {
                  if (tx) {
                    var o = tx.scrollTrigger,
                      i = tx.duration(),
                      a = o.end - o.start;
                    (e = o.start + (a * e) / i), (t = o.start + (a * t) / i);
                  }
                  tD.refresh(
                    !1,
                    !1,
                    {
                      start: V(e, r && !!tD._startClamp),
                      end: V(t, r && !!tD._endClamp),
                    },
                    n
                  ),
                    tD.update();
                }),
                (tD.adjustPinSpacing = function (e) {
                  if (er && e) {
                    var t = er.indexOf(tE.d) + 1;
                    (er[t] = parseFloat(er[t]) + e + "px"),
                      (er[1] = parseFloat(er[1]) + e + "px"),
                      ta(er);
                  }
                }),
                (tD.disable = function (t, r) {
                  if (
                    tD.enabled &&
                    (!1 !== t && tD.revert(!0, !0),
                    (tD.enabled = tD.isActive = !1),
                    r || (eB && eB.pause()),
                    (eq = 0),
                    g && (g.uncache = 1),
                    tR && eF(e, "refreshInit", tR),
                    eG &&
                      (eG.pause(), u.tween && u.tween.kill() && (u.tween = 0)),
                    !tk)
                  ) {
                    for (var n = eH.length; n--; )
                      if (eH[n].scroller === tP && eH[n] !== tD) return;
                    eF(tP, "resize", eV), tk || eF(tP, "scroll", eU);
                  }
                }),
                (tD.kill = function (e, n) {
                  tD.disable(e, n), eB && !n && eB.kill(), e3 && delete e$[e3];
                  var o = eH.indexOf(tD);
                  o >= 0 && eH.splice(o, 1),
                    o === _ && e9 > 0 && _--,
                    (o = 0),
                    eH.forEach(function (e) {
                      return e.scroller === tD.scroller && (o = 1);
                    }),
                    o || I || (tD.scroll.rec = 0),
                    r &&
                      ((r.scrollTrigger = null),
                      e && r.revert({ kill: !1 }),
                      n || r.kill()),
                    P &&
                      [P, S, k, C].forEach(function (e) {
                        return e.parentNode && e.parentNode.removeChild(e);
                      }),
                    j === tD && (j = 0),
                    te &&
                      (g && (g.uncache = 1),
                      (o = 0),
                      eH.forEach(function (e) {
                        return e.pin === te && o++;
                      }),
                      o || (g.spacer = 0)),
                    t.onKill && t.onKill(tD);
                }),
                eH.push(tD),
                tD.enable(!1, !1),
                eQ && eQ(tD),
                r && r.add && !A)
              ) {
                var t$ = tD.update;
                (tD.update = function () {
                  (tD.update = t$),
                    X._scrollers.cache++,
                    b || T || tD.refresh();
                }),
                  n.delayedCall(0.01, tD.update),
                  (A = 0.01),
                  (b = T = 0);
              } else tD.refresh();
              te && e5();
            }),
            (e.register = function (t) {
              return (
                o ||
                  ((n = t || ee()),
                  Q() && window.document && e.enable(),
                  (o = U)),
                o
              );
            }),
            (e.defaults = function (e) {
              if (e) for (var t in e) eI[t] = e[t];
              return eI;
            }),
            (e.disable = function (e, t) {
              (U = 0),
                eH.forEach(function (r) {
                  return r[t ? "kill" : "disable"](e);
                }),
                eF(i, "wheel", eU),
                eF(a, "scroll", eU),
                clearInterval(g),
                eF(a, "touchcancel", J),
                eF(l, "touchstart", J),
                eD(eF, a, "pointerdown,touchstart,mousedown", q),
                eD(eF, a, "pointerup,touchend,mouseup", K),
                u.kill(),
                ea(eF);
              for (var r = 0; r < X._scrollers.length; r += 3)
                ez(eF, X._scrollers[r], X._scrollers[r + 1]),
                  ez(eF, X._scrollers[r], X._scrollers[r + 2]);
            }),
            (e.enable = function () {
              if (
                ((i = window),
                (s = (a = document).documentElement),
                (l = a.body),
                n &&
                  ((f = n.utils.toArray),
                  (d = n.utils.clamp),
                  (O = n.core.context || J),
                  (E = n.core.suppressOverwrites || J),
                  (A = i.history.scrollRestoration || "auto"),
                  (e7 = i.pageYOffset || 0),
                  n.core.globals("ScrollTrigger", e),
                  l))
              ) {
                (U = 1),
                  ((L = document.createElement("div")).style.height = "100vh"),
                  (L.style.position = "absolute"),
                  e6(),
                  (function e() {
                    return U && requestAnimationFrame(e);
                  })(),
                  X.Observer.register(n),
                  (e.isTouch = X.Observer.isTouch),
                  (M =
                    X.Observer.isTouch &&
                    /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
                  (S = 1 === X.Observer.isTouch),
                  eR(i, "wheel", eU),
                  (c = [i, a, s, l]),
                  n.matchMedia
                    ? ((e.matchMedia = function (e) {
                        var t,
                          r = n.matchMedia();
                        for (t in e) r.add(t, e[t]);
                        return r;
                      }),
                      n.addEventListener("matchMediaInit", function () {
                        return e1();
                      }),
                      n.addEventListener("matchMediaRevert", function () {
                        return e0();
                      }),
                      n.addEventListener("matchMedia", function () {
                        e8(0, 1), eZ("matchMedia");
                      }),
                      n
                        .matchMedia()
                        .add("(orientation: portrait)", function () {
                          return eG(), eG;
                        }))
                    : console.warn("Requires GSAP 3.11.0 or later"),
                  eG(),
                  eR(a, "scroll", eU);
                var t,
                  r,
                  p = l.hasAttribute("style"),
                  h = l.style,
                  v = h.borderTopStyle,
                  _ = n.core.Animation.prototype;
                for (
                  _.revert ||
                    Object.defineProperty(_, "revert", {
                      value: function () {
                        return this.time(-0.01, !0);
                      },
                    }),
                    h.borderTopStyle = "solid",
                    t = eM(l),
                    X._vertical.m = Math.round(t.top + X._vertical.sc()) || 0,
                    X._horizontal.m =
                      Math.round(t.left + X._horizontal.sc()) || 0,
                    v
                      ? (h.borderTopStyle = v)
                      : h.removeProperty("border-top-style"),
                    p ||
                      (l.setAttribute("style", ""), l.removeAttribute("style")),
                    g = setInterval(eW, 250),
                    n.delayedCall(0.5, function () {
                      return (N = 0);
                    }),
                    eR(a, "touchcancel", J),
                    eR(l, "touchstart", J),
                    eD(eR, a, "pointerdown,touchstart,mousedown", q),
                    eD(eR, a, "pointerup,touchend,mouseup", K),
                    m = n.utils.checkPrefix("transform"),
                    tr.push(m),
                    o = H(),
                    u = n.delayedCall(0.2, e8).pause(),
                    b = [
                      a,
                      "visibilitychange",
                      function () {
                        var e = i.innerWidth,
                          t = i.innerHeight;
                        a.hidden
                          ? ((y = e), (x = t))
                          : (y !== e || x !== t) && eV();
                      },
                      a,
                      "DOMContentLoaded",
                      e8,
                      i,
                      "load",
                      e8,
                      i,
                      "resize",
                      eV,
                    ],
                    ea(eR),
                    eH.forEach(function (e) {
                      return e.enable(0, 1);
                    }),
                    r = 0;
                  r < X._scrollers.length;
                  r += 3
                )
                  ez(eF, X._scrollers[r], X._scrollers[r + 1]),
                    ez(eF, X._scrollers[r], X._scrollers[r + 2]);
              }
            }),
            (e.config = function (t) {
              "limitCallbacks" in t && (z = !!t.limitCallbacks);
              var r = t.syncInterval;
              (r && clearInterval(g)) || ((g = r) && setInterval(eW, r)),
                "ignoreMobileResize" in t &&
                  (S = 1 === e.isTouch && t.ignoreMobileResize),
                "autoRefreshEvents" in t &&
                  (ea(eF) || ea(eR, t.autoRefreshEvents || "none"),
                  (T = -1 === (t.autoRefreshEvents + "").indexOf("resize")));
            }),
            (e.scrollerProxy = function (e, t) {
              var r = (0, X._getTarget)(e),
                n = X._scrollers.indexOf(r),
                o = et(r);
              ~n && X._scrollers.splice(n, o ? 6 : 2),
                t &&
                  (o
                    ? X._proxies.unshift(i, t, l, t, s, t)
                    : X._proxies.unshift(r, t));
            }),
            (e.clearMatchMedia = function (e) {
              eH.forEach(function (t) {
                return t._ctx && t._ctx.query === e && t._ctx.kill(!0, !0);
              });
            }),
            (e.isInViewport = function (e, t, r) {
              var n = (
                  es(e) ? (0, X._getTarget)(e) : e
                ).getBoundingClientRect(),
                o = n[r ? em : e_] * t || 0;
              return r
                ? n.right - o > 0 && n.left + o < i.innerWidth
                : n.bottom - o > 0 && n.top + o < i.innerHeight;
            }),
            (e.positionInViewport = function (e, t, r) {
              es(e) && (e = (0, X._getTarget)(e));
              var n = e.getBoundingClientRect(),
                o = n[r ? em : e_],
                a =
                  null == t
                    ? o / 2
                    : t in eB
                    ? eB[t] * o
                    : ~t.indexOf("%")
                    ? (parseFloat(t) * o) / 100
                    : parseFloat(t) || 0;
              return r
                ? (n.left + a) / i.innerWidth
                : (n.top + a) / i.innerHeight;
            }),
            (e.killAll = function (e) {
              if (
                (eH.slice(0).forEach(function (e) {
                  return "ScrollSmoother" !== e.vars.id && e.kill();
                }),
                !0 !== e)
              ) {
                var t = eq.killAll || [];
                (eq = {}),
                  t.forEach(function (e) {
                    return e();
                  });
              }
            }),
            e
          );
        })();
      (tv.version = "3.13.0"),
        (tv.saveStyles = function (e) {
          return e
            ? f(e).forEach(function (e) {
                if (e && e.style) {
                  var t = eQ.indexOf(e);
                  t >= 0 && eQ.splice(t, 5),
                    eQ.push(
                      e,
                      e.style.cssText,
                      e.getBBox && e.getAttribute("transform"),
                      n.core.getCache(e),
                      O()
                    );
                }
              })
            : eQ;
        }),
        (tv.revert = function (e, t) {
          return e1(!e, t);
        }),
        (tv.create = function (e, t) {
          return new tv(e, t);
        }),
        (tv.refresh = function (e) {
          return e ? eV(!0) : (o || tv.register()) && e8(!0);
        }),
        (tv.update = function (e) {
          return ++X._scrollers.cache && te(2 * (!0 === e));
        }),
        (tv.clearScrollMemory = e2),
        (tv.maxScroll = function (e, t) {
          return ei(e, t ? X._horizontal : X._vertical);
        }),
        (tv.getScrollFunc = function (e, t) {
          return (0, X._getScrollFunc)(
            (0, X._getTarget)(e),
            t ? X._horizontal : X._vertical
          );
        }),
        (tv.getById = function (e) {
          return e$[e];
        }),
        (tv.getAll = function () {
          return eH.filter(function (e) {
            return "ScrollSmoother" !== e.vars.id;
          });
        }),
        (tv.isScrolling = function () {
          return !!W;
        }),
        (tv.snapDirectional = eL),
        (tv.addEventListener = function (e, t) {
          var r = eq[e] || (eq[e] = []);
          ~r.indexOf(t) || r.push(t);
        }),
        (tv.removeEventListener = function (e, t) {
          var r = eq[e],
            n = r && r.indexOf(t);
          n >= 0 && r.splice(n, 1);
        }),
        (tv.batch = function (e, t) {
          var r,
            o = [],
            i = {},
            a = t.interval || 0.016,
            s = t.batchMax || 1e9,
            l = function (e, t) {
              var r = [],
                o = [],
                i = n
                  .delayedCall(a, function () {
                    t(r, o), (r = []), (o = []);
                  })
                  .pause();
              return function (e) {
                r.length || i.restart(!0),
                  r.push(e.trigger),
                  o.push(e),
                  s <= r.length && i.progress(1);
              };
            };
          for (r in t)
            i[r] =
              "on" === r.substr(0, 2) && el(t[r]) && "onRefreshInit" !== r
                ? l(r, t[r])
                : t[r];
          return (
            el(s) &&
              ((s = s()),
              eR(tv, "refresh", function () {
                return (s = t.batchMax());
              })),
            f(e).forEach(function (e) {
              var t = {};
              for (r in i) t[r] = i[r];
              (t.trigger = e), o.push(tv.create(t));
            }),
            o
          );
        });
      var tm,
        t_ = function (e, t, r, n) {
          return (
            t > n ? e(n) : t < 0 && e(0),
            r > n ? (n - t) / (r - t) : r < 0 ? t / (t - r) : 1
          );
        },
        ty = function e(t, r) {
          !0 === r
            ? t.style.removeProperty("touch-action")
            : (t.style.touchAction =
                !0 === r
                  ? "auto"
                  : r
                  ? "pan-" + r + (X.Observer.isTouch ? " pinch-zoom" : "")
                  : "none"),
            t === s && e(l, r);
        },
        tx = { auto: 1, scroll: 1 },
        tb = function (e) {
          var t,
            r = e.event,
            o = e.target,
            i = e.axis,
            a = (r.changedTouches ? r.changedTouches[0] : r).target,
            s = a._gsap || n.core.getCache(a),
            c = H();
          if (!s._isScrollT || c - s._isScrollT > 2e3) {
            for (
              ;
              a &&
              a !== l &&
              ((a.scrollHeight <= a.clientHeight &&
                a.scrollWidth <= a.clientWidth) ||
                !(tx[(t = eS(a)).overflowY] || tx[t.overflowX]));

            )
              a = a.parentNode;
            (s._isScroll =
              a &&
              a !== o &&
              !et(a) &&
              (tx[(t = eS(a)).overflowY] || tx[t.overflowX])),
              (s._isScrollT = c);
          }
          (s._isScroll || "x" === i) &&
            (r.stopPropagation(), (r._gsapAllow = !0));
        },
        tw = function (e, t, r, n) {
          return X.Observer.create({
            target: e,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: t,
            onWheel: (n = n && tb),
            onPress: n,
            onDrag: n,
            onScroll: n,
            onEnable: function () {
              return r && eR(a, X.Observer.eventTypes[0], tT, !1, !0);
            },
            onDisable: function () {
              return eF(a, X.Observer.eventTypes[0], tT, !0);
            },
          });
        },
        tE = /(input|label|select|textarea)/i,
        tT = function (e) {
          var t = tE.test(e.target.tagName);
          (t || tm) && ((e._gsapAllow = !0), (tm = t));
        },
        tP = function (e) {
          eu(e) || (e = {}),
            (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
            e.type || (e.type = "wheel,touch"),
            (e.debounce = !!e.debounce),
            (e.id = e.id || "normalizer");
          var t,
            r,
            o,
            a,
            l,
            c,
            u,
            f,
            p = e,
            g = p.normalizeScrollX,
            h = p.momentum,
            v = p.allowNestedScroll,
            m = p.onRelease,
            _ = (0, X._getTarget)(e.target) || s,
            y = n.core.globals().ScrollSmoother,
            x = y && y.get(),
            b =
              M &&
              ((e.content && (0, X._getTarget)(e.content)) ||
                (x && !1 !== e.content && !x.smooth() && x.content())),
            w = (0, X._getScrollFunc)(_, X._vertical),
            E = (0, X._getScrollFunc)(_, X._horizontal),
            T = 1,
            P =
              (X.Observer.isTouch && i.visualViewport
                ? i.visualViewport.scale * i.visualViewport.width
                : i.outerWidth) / i.innerWidth,
            S = 0,
            k = el(h)
              ? function () {
                  return h(t);
                }
              : function () {
                  return h || 2.8;
                },
            C = tw(_, e.type, !0, v),
            O = function () {
              return (a = !1);
            },
            A = J,
            L = J,
            D = function () {
              (r = ei(_, X._vertical)),
                (L = d(+!!M, r)),
                g && (A = d(0, ei(_, X._horizontal))),
                (o = e3);
            },
            R = function () {
              (b._gsap.y = Z(parseFloat(b._gsap.y) + w.offset) + "px"),
                (b.style.transform =
                  "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                  parseFloat(b._gsap.y) +
                  ", 0, 1)"),
                (w.offset = w.cacheID = 0);
            },
            F = function () {
              if (a) {
                requestAnimationFrame(O);
                var e = Z(t.deltaY / 2),
                  r = L(w.v - e);
                if (b && r !== w.v + w.offset) {
                  w.offset = r - w.v;
                  var n = Z((parseFloat(b && b._gsap.y) || 0) - w.offset);
                  (b.style.transform =
                    "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                    n +
                    ", 0, 1)"),
                    (b._gsap.y = n + "px"),
                    (w.cacheID = X._scrollers.cache),
                    te();
                }
                return !0;
              }
              w.offset && R(), (a = !0);
            },
            z = function () {
              D(),
                l.isActive() &&
                  l.vars.scrollY > r &&
                  (w() > r ? l.progress(1) && w(r) : l.resetTo("scrollY", r));
            };
          return (
            b && n.set(b, { y: "+=0" }),
            (e.ignoreCheck = function (e) {
              return (
                (M && "touchmove" === e.type && F(e)) ||
                (T > 1.05 && "touchstart" !== e.type) ||
                t.isGesturing ||
                (e.touches && e.touches.length > 1)
              );
            }),
            (e.onPress = function () {
              a = !1;
              var e = T;
              (T = Z(((i.visualViewport && i.visualViewport.scale) || 1) / P)),
                l.pause(),
                e !== T && ty(_, T > 1.01 || (!g && "x")),
                (c = E()),
                (u = w()),
                D(),
                (o = e3);
            }),
            (e.onRelease = e.onGestureStart =
              function (e, t) {
                if ((w.offset && R(), t)) {
                  X._scrollers.cache++;
                  var o,
                    i,
                    a = k();
                  g &&
                    ((i = (o = E()) + -(0.05 * a * e.velocityX) / 0.227),
                    (a *= t_(E, o, i, ei(_, X._horizontal))),
                    (l.vars.scrollX = A(i))),
                    (i = (o = w()) + -(0.05 * a * e.velocityY) / 0.227),
                    (a *= t_(w, o, i, ei(_, X._vertical))),
                    (l.vars.scrollY = L(i)),
                    l.invalidate().duration(a).play(0.01),
                    ((M && l.vars.scrollY >= r) || o >= r - 1) &&
                      n.to({}, { onUpdate: z, duration: a });
                } else f.restart(!0);
                m && m(e);
              }),
            (e.onWheel = function () {
              l._ts && l.pause(), H() - S > 1e3 && ((o = 0), (S = H()));
            }),
            (e.onChange = function (e, t, r, n, i) {
              if (
                (e3 !== o && D(),
                t &&
                  g &&
                  E(A(n[2] === t ? c + (e.startX - e.x) : E() + t - n[1])),
                r)
              ) {
                w.offset && R();
                var a = i[2] === r,
                  s = a ? u + e.startY - e.y : w() + r - i[1],
                  l = L(s);
                a && s !== l && (u += l - s), w(l);
              }
              (r || t) && te();
            }),
            (e.onEnable = function () {
              ty(_, !g && "x"),
                tv.addEventListener("refresh", z),
                eR(i, "resize", z),
                w.smooth &&
                  ((w.target.style.scrollBehavior = "auto"),
                  (w.smooth = E.smooth = !1)),
                C.enable();
            }),
            (e.onDisable = function () {
              ty(_, !0),
                eF(i, "resize", z),
                tv.removeEventListener("refresh", z),
                C.kill();
            }),
            (e.lockAxis = !1 !== e.lockAxis),
            ((t = new X.Observer(e)).iOS = M),
            M && !w() && w(1),
            M && n.ticker.add(J),
            (f = t._dc),
            (l = n.to(t, {
              ease: "power4",
              paused: !0,
              inherit: !1,
              scrollX: g ? "+=0.1" : "+=0",
              scrollY: "+=0.1",
              modifiers: {
                scrollY: tp(w, w(), function () {
                  return l.pause();
                }),
              },
              onUpdate: te,
              onComplete: f.vars.onComplete,
            })),
            t
          );
        };
      (tv.sort = function (e) {
        if (el(e)) return eH.sort(e);
        var t = i.pageYOffset || 0;
        return (
          tv.getAll().forEach(function (e) {
            return (e._sortY = e.trigger
              ? t + e.trigger.getBoundingClientRect().top
              : e.start + i.innerHeight);
          }),
          eH.sort(
            e ||
              function (e, t) {
                return (
                  -1e6 * (e.vars.refreshPriority || 0) +
                  (e.vars.containerAnimation ? 1e6 : e._sortY) -
                  ((t.vars.containerAnimation ? 1e6 : t._sortY) +
                    -1e6 * (t.vars.refreshPriority || 0))
                );
              }
          )
        );
      }),
        (tv.observe = function (e) {
          return new X.Observer(e);
        }),
        (tv.normalizeScroll = function (e) {
          if (void 0 === e) return P;
          if (!0 === e && P) return P.enable();
          if (!1 === e) {
            P && P.kill(), (P = e);
            return;
          }
          var t = e instanceof X.Observer ? e : tP(e);
          return (
            P && P.target === t.target && P.kill(), et(t.target) && (P = t), t
          );
        }),
        (tv.core = {
          _getVelocityProp: X._getVelocityProp,
          _inputObserver: tw,
          _scrollers: X._scrollers,
          _proxies: X._proxies,
          bridge: {
            ss: function () {
              W || eZ("scrollStart"), (W = H());
            },
            ref: function () {
              return h;
            },
          },
        }),
        ee() && n.registerPlugin(tv);
    },
    52287: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ ScrollTriggerConfig: () => l }), e.i(22271);
      var n = e.i(85444),
        o = e.i(17170),
        i = e.i(12423),
        a = e.i(54995),
        s = e.i(38653);
      function l() {
        let e,
          t,
          r = (0, n.c)(3);
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = []), (r[0] = e))
          : (e = r[0]),
          (0, s.useLayoutEffect)(u, e);
        let o = (0, a.useLenis)(i.ScrollTrigger.update);
        return (
          r[1] !== o ? ((t = [o]), (r[1] = o), (r[2] = t)) : (t = r[2]),
          (0, s.useEffect)(c, t),
          null
        );
      }
      function c() {
        return i.ScrollTrigger.refresh();
      }
      function u() {
        o.default.registerPlugin(i.ScrollTrigger),
          i.ScrollTrigger.clearScrollMemory("manual"),
          i.ScrollTrigger.defaults({ markers: !1 });
      }
    },
    62609: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ GSAP: () => u });
      var n = e.i(58064),
        o = e.i(85444),
        i = e.i(17170),
        a = e.i(64384),
        s = e.i(38653),
        l = e.i(6673),
        c = e.i(52287);
      function u(e) {
        let t,
          r,
          i = (0, o.c)(3),
          { scrollTrigger: a } = e,
          l = void 0 !== a && a;
        return (
          i[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((t = []), (i[0] = t))
            : (t = i[0]),
          (0, s.useLayoutEffect)(f, t),
          i[1] !== l
            ? ((r = l && (0, n.jsx)(c.ScrollTriggerConfig, {})),
              (i[1] = l),
              (i[2] = r))
            : (r = i[2]),
          r
        );
      }
      function f() {
        i.default.defaults({ ease: "none" }),
          i.default.registerPlugin(a.RoughEase),
          i.default.ticker.lagSmoothing(0),
          i.default.ticker.remove(i.default.updateRoot),
          l.default?.add(d);
      }
      function d(e) {
        i.default.updateRoot(e / 1e3);
      }
    },
    34225: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ measure: () => o, mutate: () => i });
        var n = e.i(6673);
        let t = [],
          r = [];
        function o(e) {
          return new Promise((r) => {
            t.push(() => r(e()));
          });
        }
        function i(e) {
          return new Promise((t) => {
            r.push(() => t(e()));
          });
        }
        n.default.add(
          () => {
            for (let e of t) e();
            for (let e of ((t.length = 0), r)) e();
            r.length = 0;
          },
          { priority: 1e3 }
        );
      }
    },
    32828: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      e.s({ RealViewport: () => s });
      var n = e.i(85444),
        o = e.i(38653),
        i = e.i(34225);
      function a() {
        (0, i.mutate)(() => {
          document.documentElement.style.setProperty(
            "--vw",
            `${0.01 * document.documentElement.offsetWidth}px`
          ),
            document.documentElement.style.setProperty(
              "--dvh",
              `${0.01 * window.innerHeight}px`
            ),
            document.documentElement.style.setProperty(
              "--svh",
              `${0.01 * document.documentElement.clientHeight}px`
            ),
            document.documentElement.style.setProperty("--lvh", "1vh"),
            document.documentElement.style.setProperty(
              "--scrollbar-width",
              `${(function () {
                let e = document.createElement("div");
                (e.style.visibility = "hidden"),
                  (e.style.overflow = "scroll"),
                  document.body.appendChild(e);
                let t = document.createElement("div");
                e.appendChild(t);
                let r = e.offsetWidth - t.offsetWidth;
                return e.remove(), r;
              })()}px`
            );
        });
      }
      function s() {
        let e,
          t = (0, n.c)(1);
        return (
          t[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (t[0] = e))
            : (e = t[0]),
          (0, o.useLayoutEffect)(l, e),
          null
        );
      }
      function l() {
        return window.addEventListener("resize", a, !1), a(), c;
      }
      function c() {
        window.removeEventListener("resize", a, !1);
      }
    },
    50276: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({
          DEFAULT_LOCALE: () => t,
          detectLocaleFromDomain: () => n,
          getLocale: () => o,
        });
        let t = "en";
        function n(e) {
          return e &&
            (e.includes("neckband.viture.jp") ||
              e.includes("neckband-jp.vercel.app"))
            ? "ja"
            : t;
        }
        async function o(e) {
          return n(e?.get("host") || "");
        }
      }
    },
    97434: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ dictionary: () => t });
        let t = { buttons: { watchFilm: "Watch the film" }, text: { x: "x" } };
      }
    },
    34889: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ dictionary: () => t });
        let t = { buttons: { watchFilm: "動画を観る" }, text: { x: "倍" } };
      }
    },
    15248: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({
          getTranslation: () =>
            function e(r, o = n.DEFAULT_LOCALE, i = {}) {
              let a = t[o] || t[n.DEFAULT_LOCALE],
                s = r.split("."),
                l = a;
              for (let t of s)
                if (void 0 === (l = l?.[t])) {
                  if (o !== n.DEFAULT_LOCALE) return e(r, n.DEFAULT_LOCALE, i);
                  return r;
                }
              return "string" == typeof l && Object.keys(i).length > 0
                ? Object.entries(i).reduce(
                    (e, [t, r]) => e.replace(RegExp(`{{${t}}}`, "g"), r),
                    l
                  )
                : l;
            },
        });
        var n = e.i(50276),
          o = e.i(97434),
          i = e.i(34889);
        let t = { en: o.dictionary, ja: i.dictionary };
      }
    },
    60618: (e) => {
      "use strict";
      var { g: t, __dirname: r } = e;
      {
        e.s({ I18nProvider: () => l, locales: () => t, useI18n: () => s });
        var n = e.i(58064),
          o = e.i(38653),
          i = e.i(15248),
          a = e.i(50276);
        let t = { en: "English", ja: "Japanese" },
          r = (0, o.createContext)({
            locale: a.DEFAULT_LOCALE,
            setLocale: () => {},
            t: (e) => e,
          });
        function s() {
          let { locale: e, setLocale: t, t: n } = (0, o.useContext)(r);
          return { locale: e, setLocale: t, t: n };
        }
        function l({ children: e, initialLocale: t = a.DEFAULT_LOCALE }) {
          let [s, l] = (0, o.useState)(t);
          return (
            (0, o.useEffect)(() => {
              {
                let e = (0, a.detectLocaleFromDomain)(window.location.hostname);
                e !== s && l(e);
              }
            }, [s]),
            (0, n.jsx)(r.Provider, {
              value: {
                locale: s,
                setLocale: l,
                t: (e, t) => (0, i.getTranslation)(e, s, t),
              },
              children: e,
            })
          );
        }
      }
    },
  },
]);

//# sourceMappingURL=4b4bc72054539632.js.map
