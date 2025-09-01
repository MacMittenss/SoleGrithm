(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  "object" == typeof document ? document.currentScript : void 0,
  {
    27233: function (e) {
      var { g: t, __dirname: n, m: r, e: o } = e;
      {
        ("use strict");
        Object.defineProperty(o, "__esModule", { value: !0 }),
          Object.defineProperty(o, "BailoutToCSR", {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
        let t = e.r(1789);
        function i(e) {
          let { reason: n, children: r } = e;
          if ("undefined" == typeof window)
            throw Object.defineProperty(
              new t.BailoutToCSRError(n),
              "__NEXT_ERROR_CODE",
              { value: "E394", enumerable: !1, configurable: !0 }
            );
          return r;
        }
      }
    },
    68093: function (e) {
      var { g: t, __dirname: n, m: r, e: o } = e;
      ("use strict");
      function i(e) {
        return e
          .split("/")
          .map((e) => encodeURIComponent(e))
          .join("/");
      }
      Object.defineProperty(o, "__esModule", { value: !0 }),
        Object.defineProperty(o, "encodeURIPath", {
          enumerable: !0,
          get: function () {
            return i;
          },
        });
    },
    8445: function (e) {
      var { g: t, __dirname: n, m: r, e: o } = e;
      {
        ("use strict");
        e.i(22271),
          Object.defineProperty(o, "__esModule", { value: !0 }),
          Object.defineProperty(o, "PreloadChunks", {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
        let t = e.r(58064),
          n = e.r(95168),
          r = e.r(51599),
          l = e.r(68093);
        function i(e) {
          let { moduleIds: o } = e;
          if ("undefined" != typeof window) return null;
          let i = r.workAsyncStorage.getStore();
          if (void 0 === i) return null;
          let u = [];
          if (i.reactLoadableManifest && o) {
            let e = i.reactLoadableManifest;
            for (let t of o) {
              if (!e[t]) continue;
              let n = e[t].files;
              u.push(...n);
            }
          }
          return 0 === u.length
            ? null
            : (0, t.jsx)(t.Fragment, {
                children: u.map((e) => {
                  let r =
                    i.assetPrefix +
                    "/_next/" +
                    (0, l.encodeURIPath)(e) +
                    "?dpl=dpl_B9gt7akVQEXtNDigDwmPzzsrQzNd";
                  return e.endsWith(".css")
                    ? (0, t.jsx)(
                        "link",
                        {
                          precedence: "dynamic",
                          href: r,
                          rel: "stylesheet",
                          as: "style",
                        },
                        e
                      )
                    : ((0, n.preload)(r, {
                        as: "script",
                        fetchPriority: "low",
                      }),
                      null);
                }),
              });
        }
      }
    },
    23109: function (e) {
      var { g: t, __dirname: n, m: r, e: o } = e;
      {
        ("use strict");
        Object.defineProperty(o, "__esModule", { value: !0 }),
          Object.defineProperty(o, "default", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let t = e.r(58064),
          n = e.r(38653),
          r = e.r(27233),
          l = e.r(8445);
        function i(e) {
          return { default: e && "default" in e ? e.default : e };
        }
        let u = {
            loader: () => Promise.resolve(i(() => null)),
            loading: null,
            ssr: !0,
          },
          s = function (e) {
            let o = { ...u, ...e },
              s = (0, n.lazy)(() => o.loader().then(i)),
              a = o.loading;
            function c(e) {
              let i = a
                  ? (0, t.jsx)(a, { isLoading: !0, pastDelay: !0, error: null })
                  : null,
                u = !o.ssr || !!o.loading,
                c = u ? n.Suspense : n.Fragment,
                f = o.ssr
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        "undefined" == typeof window
                          ? (0, t.jsx)(l.PreloadChunks, {
                              moduleIds: o.modules,
                            })
                          : null,
                        (0, t.jsx)(s, { ...e }),
                      ],
                    })
                  : (0, t.jsx)(r.BailoutToCSR, {
                      reason: "next/dynamic",
                      children: (0, t.jsx)(s, { ...e }),
                    });
              return (0, t.jsx)(c, {
                ...(u ? { fallback: i } : {}),
                children: f,
              });
            }
            return (c.displayName = "LoadableComponent"), c;
          };
      }
    },
    47791: function (e) {
      var { g: t, __dirname: n, m: r, e: o } = e;
      {
        ("use strict");
        Object.defineProperty(o, "__esModule", { value: !0 }),
          Object.defineProperty(o, "default", {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
        let t = e.r(13314)._(e.r(23109));
        function i(e, n) {
          var r;
          let o = {};
          "function" == typeof e && (o.loader = e);
          let i = { ...o, ...n };
          return (0, t.default)({
            ...i,
            modules: null == (r = i.loadableGenerated) ? void 0 : r.modules,
          });
        }
        ("function" == typeof o.default ||
          ("object" == typeof o.default && null !== o.default)) &&
          void 0 === o.default.__esModule &&
          (Object.defineProperty(o.default, "__esModule", { value: !0 }),
          Object.assign(o.default, o),
          (r.exports = o.default));
      }
    },
    65862: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogContext: () => t, useDialogContext: () => o }), e.i(22271);
        var r = e.i(38653);
        let t = (0, r.createContext)(void 0);
        function o() {
          return (0, r.useContext)(t);
        }
      }
    },
    99714: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          DialogRootContext: () => t,
          useDialogRootContext: () => l,
          useOptionalDialogRootContext: () => i,
        }),
          e.i(22271);
        var r = e.i(38653),
          o = e.i(65862);
        let t = (0, r.createContext)(void 0);
        function i() {
          let e = (0, r.useContext)(t),
            n = (0, r.useContext)(o.DialogContext);
          if (void 0 !== n || void 0 !== e) return { ...e, ...n };
        }
        function l() {
          let e = (0, r.useContext)(t),
            n = (0, r.useContext)(o.DialogContext);
          if (void 0 === n)
            throw Error(
              "Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>."
            );
          return { ...e, ...n };
        }
      }
    },
    56624: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r(...e) {
        if (0 === e.length) return {};
        if (1 === e.length) return o(e[0], {});
        let t = o(e[0], {});
        for (let n = 1; n < e.length; n += 1) {
          let r = e[n];
          r &&
            (t = i(r)
              ? r(t)
              : (function (e, t) {
                  return t
                    ? e
                      ? Object.entries(t).reduce(
                          (t, [n, r]) => {
                            var o, i;
                            return (
                              !(function (e, t) {
                                let n = e.charCodeAt(2);
                                return (
                                  "o" === e[0] &&
                                  "n" === e[1] &&
                                  n >= 65 &&
                                  n <= 90 &&
                                  "function" == typeof t
                                );
                              })(n, r)
                                ? "style" === n
                                  ? (t[n] = (function (e, t) {
                                      if (t || e) return { ...e, ...t };
                                    })(e.style, r))
                                  : "className" === n
                                  ? (t[n] =
                                      ((o = e.className),
                                      (i = r) ? (o ? i + " " + o : i) : o))
                                  : (t[n] = r)
                                : (t[n] = (function (e, t) {
                                    return (n) => {
                                      var r;
                                      if (
                                        null != (r = n) &&
                                        "object" == typeof r &&
                                        "nativeEvent" in r
                                      ) {
                                        l(n);
                                        let r = t(n);
                                        return (
                                          n.baseUIHandlerPrevented || e?.(n), r
                                        );
                                      }
                                      let o = t(n);
                                      return e?.(n), o;
                                    };
                                  })(e[n], r)),
                              t
                            );
                          },
                          { ...e }
                        )
                      : t
                    : e || {};
                })(t, r));
        }
        return t ?? {};
      }
      function o(e, t) {
        return i(e) ? e(t) : e ?? {};
      }
      function i(e) {
        return "function" == typeof e;
      }
      function l(e) {
        return (
          (e.preventBaseUIHandler = () => {
            e.baseUIHandlerPrevented = !0;
          }),
          e
        );
      }
      e.s({ makeEventPreventable: () => l, mergeProps: () => r });
    },
    50682: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({}), e.i(56624);
    },
    61397: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({}), e.i(56624), e.i(50682);
    },
    34237: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r(e, t) {
        let n = {};
        return (
          Object.entries(e).forEach(([e, r]) => {
            if (t?.hasOwnProperty(e)) {
              let o = t[e](r);
              null != o && (n = { ...n, ...o });
              return;
            }
            !0 === r
              ? (n[`data-${e.toLowerCase()}`] = "")
              : r && (n[`data-${e.toLowerCase()}`] = r.toString());
          }),
          n
        );
      }
      e.s({ getStyleHookProps: () => r });
    },
    27340: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r(e, t) {
        return "function" == typeof e ? e(t) : e;
      }
      e.s({ resolveClassName: () => r });
    },
    61631: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ evaluateRenderProp: () => i });
      var r = e.i(38653);
      e.i(61397);
      var o = e.i(56624);
      function i(e, t, n) {
        return "function" == typeof e
          ? e(t, n)
          : (0, r.cloneElement)(e, {
              ...(0, o.mergeProps)(t, e.props),
              ref: t.ref,
            });
      }
    },
    23869: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useForkRef: () => o });
      var r = e.i(38653);
      function o(...e) {
        let t = (0, r.useRef)(void 0),
          n = (0, r.useCallback)((t) => {
            let n = e.map((e) => {
              if (null == e) return null;
              if ("function" == typeof e) {
                let n = e(t);
                return "function" == typeof n
                  ? n
                  : () => {
                      e(null);
                    };
              }
              return (
                (e.current = t),
                () => {
                  e.current = null;
                }
              );
            });
            return () => {
              n.forEach((e) => e?.());
            };
          }, e);
        return (0, r.useMemo)(
          () =>
            e.every((e) => null == e)
              ? null
              : (e) => {
                  t.current && (t.current(), (t.current = void 0)),
                    null != e && (t.current = n(e));
                },
          e
        );
      }
    },
    3855: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ isReactVersionAtLeast: () => r });
        let t = parseInt(e.i(38653).version, 10);
        function r(e) {
          return t >= e;
        }
      }
    },
    5655: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useRenderPropForkRef: () => i });
      var r = e.i(23869),
        o = e.i(3855);
      function i(e, ...t) {
        let n;
        return (
          (n =
            "function" != typeof e
              ? (0, o.isReactVersionAtLeast)(19)
                ? e.props.ref
                : e.ref
              : null),
          (0, r.useForkRef)(n, ...t)
        );
      }
    },
    41690: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ useRenderElement: () => c });
        var r = e.i(38653),
          o = e.i(34237),
          i = e.i(27340),
          l = e.i(61631),
          u = e.i(5655);
        e.i(61397);
        var s = e.i(56624),
          a = e.i(58064);
        let t = {};
        function c(e, n, f = {}) {
          let { className: d, render: m } = n,
            {
              propGetter: g = (e) => e,
              state: p = t,
              ref: v,
              props: h,
              customStyleHookMapping: y,
              styleHooks: b = !0,
            } = f,
            E =
              m ||
              ("string" == typeof e
                ? function (t) {
                    return "button" === e
                      ? (0, a.jsx)("button", { type: "button", ...t })
                      : "img" === e
                      ? (0, a.jsx)("img", { alt: "", ...t })
                      : (0, a.jsx)(e, { ...t });
                  }
                : e),
            x = (0, i.resolveClassName)(d, p),
            w = g({
              ...(0, r.useMemo)(
                () => (b ? (0, o.getStyleHookProps)(p, y) : t),
                [p, y, b]
              ),
              ...(Array.isArray(h) ? (0, s.mergeProps)(...h) : h),
            }),
            R = [];
          void 0 !== v && (R = Array.isArray(v) ? v : [v]);
          let C = { ...w, ref: (0, u.useRenderPropForkRef)(E, w.ref, ...R) };
          return (
            void 0 !== x && (C.className = x),
            () => (0, l.evaluateRenderProp)(E, C, p)
          );
        }
      }
    },
    94893: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useComponentRenderer: () => o });
      var r = e.i(41690);
      function o(e) {
        let t = "string" == typeof e.render ? e.render : void 0,
          n = "string" == typeof e.render ? void 0 : e.render;
        return {
          renderElement: (0, r.useRenderElement)(
            t,
            { className: e.className, render: n },
            { ...e, props: e.extraProps }
          ),
        };
      }
    },
    13209: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          TransitionStatusDataAttributes: () => t,
          transitionStatusMapping: () => o,
        });
        let t = (function (e) {
            return (
              (e.startingStyle = "data-starting-style"),
              (e.endingStyle = "data-ending-style"),
              e
            );
          })({}),
          n = { [t.startingStyle]: "" },
          r = { [t.endingStyle]: "" },
          o = {
            transitionStatus: (e) =>
              "starting" === e ? n : "ending" === e ? r : null,
          };
      }
    },
    91015: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          CommonPopupDataAttributes: () => t,
          CommonTriggerDataAttributes: () => n,
          popupStateMapping: () => f,
          pressableTriggerOpenStateMapping: () => c,
          triggerOpenStateMapping: () => a,
        });
        var r = e.i(13209);
        let t = (function (e) {
            return (
              (e.open = "data-open"),
              (e.closed = "data-closed"),
              (e[
                (e.startingStyle =
                  r.TransitionStatusDataAttributes.startingStyle)
              ] = "startingStyle"),
              (e[
                (e.endingStyle = r.TransitionStatusDataAttributes.endingStyle)
              ] = "endingStyle"),
              (e.anchorHidden = "data-anchor-hidden"),
              e
            );
          })({}),
          n = (function (e) {
            return (
              (e.popupOpen = "data-popup-open"), (e.pressed = "data-pressed"), e
            );
          })({}),
          o = { [n.popupOpen]: "" },
          i = { [n.popupOpen]: "", [n.pressed]: "" },
          l = { [t.open]: "" },
          u = { [t.closed]: "" },
          s = { [t.anchorHidden]: "" },
          a = { open: (e) => (e ? o : null) },
          c = { open: (e) => (e ? i : null) },
          f = { open: (e) => (e ? l : u), anchorHidden: (e) => (e ? s : null) };
      }
    },
    67056: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogBackdrop: () => n }), e.i(22271);
        var r = e.i(38653),
          o = e.i(99714);
        e.i(61397);
        var i = e.i(56624),
          l = e.i(94893),
          u = e.i(91015),
          s = e.i(13209),
          a = e.i(23869);
        let t = { ...u.popupStateMapping, ...s.transitionStatusMapping },
          n = (0, r.forwardRef)(function (e, n) {
            let { render: u, className: s, ...c } = e,
              {
                open: f,
                nested: d,
                mounted: m,
                transitionStatus: g,
                backdropRef: p,
              } = (0, o.useDialogRootContext)(),
              v = (0, r.useMemo)(
                () => ({ open: f, transitionStatus: g }),
                [f, g]
              ),
              h = (0, a.useForkRef)(p, n),
              { renderElement: y } = (0, l.useComponentRenderer)({
                render: u ?? "div",
                className: s,
                state: v,
                ref: h,
                extraProps: (0, i.mergeProps)(
                  {
                    role: "presentation",
                    hidden: !m,
                    style: { userSelect: "none", WebkitUserSelect: "none" },
                  },
                  c
                ),
                customStyleHookMapping: t,
              });
            return d ? null : y();
          });
      }
    },
    23695: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ useEnhancedEffect: () => t });
        var r = e.i(38653);
        let t = "undefined" != typeof window ? r.useLayoutEffect : r.useEffect;
      }
    },
    44142: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useEventCallback: () => i });
      var r = e.i(38653),
        o = e.i(23695);
      function i(e) {
        let t = (0, r.useRef)(e);
        return (
          (0, o.useEnhancedEffect)(() => {
            t.current = e;
          }),
          (0, r.useCallback)((...e) => t.current?.(...e), [])
        );
      }
    },
    96489: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r(...e) {}
      e.s({ warn: () => r }), e.i(22271);
    },
    12714: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useRootElementName: () => o }), e.i(22271);
      var r = e.i(38653);
      function o(e) {
        let { rootElementName: t = "" } = e,
          [n, o] = (0, r.useState)(t.toUpperCase());
        return {
          rootElementName: n,
          updateRootElementName: (0, r.useCallback)((e) => {
            o(e?.tagName ?? "");
          }, []),
        };
      }
      e.i(23695), e.i(96489);
    },
    17355: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          CompositeRootContext: () => t,
          useCompositeRootContext: () => o,
        }),
          e.i(22271);
        var r = e.i(38653);
        let t = (0, r.createContext)(void 0);
        function o(e = !1) {
          let n = (0, r.useContext)(t);
          if (void 0 === n && !e)
            throw Error(
              "Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>."
            );
          return n;
        }
      }
    },
    7294: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useButton: () => c });
      var r = e.i(38653),
        o = e.i(23869);
      e.i(61397);
      var i = e.i(56624),
        l = e.i(23695),
        u = e.i(44142),
        s = e.i(12714),
        a = e.i(17355);
      function c(e = {}) {
        let {
            buttonRef: t,
            disabled: n = !1,
            focusableWhenDisabled: f,
            tabIndex: d,
            type: m = "button",
            elementName: g,
          } = e,
          p = (0, r.useRef)(null),
          { rootElementName: v, updateRootElementName: h } = (0,
          s.useRootElementName)({ rootElementName: g }),
          y = void 0 !== (0, a.useCompositeRootContext)(!0),
          b = (0, u.useEventCallback)(() => {
            let e = p.current;
            return (
              "BUTTON" === v ||
              ("INPUT" === v && ["button", "submit", "reset"].includes(e?.type))
            );
          }),
          E = (0, u.useEventCallback)(() => {
            let e = p.current;
            return !!("A" === v && e?.href);
          }),
          x = (0, o.useForkRef)(h, t, p),
          w = (0, r.useMemo)(() => {
            let e = {};
            return (
              void 0 === d || y || (e.tabIndex = d),
              "BUTTON" === v || "INPUT" === v
                ? f || y
                  ? (e["aria-disabled"] = n)
                  : y || (e.disabled = n)
                : "" !== v &&
                  ("A" !== v
                    ? ((e.role = "button"), y || (e.tabIndex = d ?? 0))
                    : d && !y && (e.tabIndex = d),
                  n &&
                    ((e["aria-disabled"] = n),
                    y || (e.tabIndex = f ? d ?? 0 : -1))),
              e
            );
          }, [n, v, f, y, d]);
        return (
          (0, l.useEnhancedEffect)(() => {
            let e = p.current;
            e instanceof HTMLButtonElement &&
              y &&
              n &&
              void 0 === w.disabled &&
              e.disabled &&
              (e.disabled = !1);
          }, [n, w.disabled, y]),
          {
            getButtonProps: (0, r.useCallback)(
              (e = {}) => {
                let {
                  onClick: t,
                  onMouseDown: r,
                  onKeyUp: o,
                  onKeyDown: l,
                  onPointerDown: u,
                  ...s
                } = e;
                return (0, i.mergeProps)(
                  {
                    type: "BUTTON" === v || "INPUT" === v ? m : void 0,
                    onClick(e) {
                      if (n) return void e.preventDefault();
                      t?.(e);
                    },
                    onMouseDown(e) {
                      n || r?.(e);
                    },
                    onKeyDown(e) {
                      ((n && f && "Tab" !== e.key) ||
                        (e.target === e.currentTarget &&
                          !b() &&
                          " " === e.key)) &&
                        e.preventDefault(),
                        n || ((0, i.makeEventPreventable)(e), l?.(e)),
                        !e.baseUIHandlerPrevented &&
                          (e.target !== e.currentTarget ||
                            b() ||
                            E() ||
                            "Enter" !== e.key ||
                            n ||
                            (t?.(e), e.preventDefault()));
                    },
                    onKeyUp(e) {
                      n || ((0, i.makeEventPreventable)(e), o?.(e)),
                        !e.baseUIHandlerPrevented &&
                          (e.target !== e.currentTarget ||
                            b() ||
                            n ||
                            " " !== e.key ||
                            t?.(e));
                    },
                    onPointerDown(e) {
                      if (n) return void e.preventDefault();
                      u?.(e);
                    },
                    ref: x,
                  },
                  w,
                  s
                );
              },
              [w, n, v, f, b, E, x, m]
            ),
            buttonRef: x,
          }
        );
      }
    },
    14020: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useDialogClose: () => l });
      var r = e.i(7294);
      e.i(61397);
      var o = e.i(56624),
        i = e.i(44142);
      function l(e) {
        let { open: t, setOpen: n, rootRef: l, disabled: u } = e,
          s = (0, i.useEventCallback)((e) => {
            t && n(!1, e.nativeEvent, "click");
          }),
          { getButtonProps: a } = (0, r.useButton)({
            disabled: u,
            buttonRef: l,
          });
        return { getRootProps: (e) => (0, o.mergeProps)({ onClick: s }, e, a) };
      }
    },
    49191: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogClose: () => t }), e.i(22271);
        var r = e.i(38653),
          o = e.i(14020),
          i = e.i(99714),
          l = e.i(94893);
        let t = (0, r.forwardRef)(function (e, t) {
          let { render: n, className: u, disabled: s = !1, ...a } = e,
            { open: c, setOpen: f } = (0, i.useDialogRootContext)(),
            { getRootProps: d } = (0, o.useDialogClose)({
              disabled: s,
              open: c,
              setOpen: f,
              rootRef: t,
            }),
            m = (0, r.useMemo)(() => ({ disabled: s }), [s]),
            { renderElement: g } = (0, l.useComponentRenderer)({
              render: n ?? "button",
              className: u,
              state: m,
              propGetter: d,
              extraProps: a,
            });
          return g();
        });
      }
    },
    50735: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ useId: () => o });
        var r = e.i(38653);
        let t = 0,
          n = { ...r }.useId;
        function o(e, o) {
          if (void 0 !== n) {
            let t = n();
            return e ?? (o ? `${o}-${t}` : t);
          }
          return (function (e, n = "mui") {
            let [o, i] = r.useState(e),
              l = e || o;
            return (
              r.useEffect(() => {
                null == o && ((t += 1), i(`${n}-${t}`));
              }, [o, n]),
              l
            );
          })(e, o);
        }
      }
    },
    68859: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useBaseUiId: () => o });
      var r = e.i(50735);
      function o(e) {
        return (0, r.useId)(e, "base-ui");
      }
    },
    85944: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogDescription: () => n }), e.i(22271);
        var r = e.i(38653),
          o = e.i(99714);
        e.i(61397);
        var i = e.i(56624),
          l = e.i(94893),
          u = e.i(23695),
          s = e.i(68859);
        let t = {},
          n = (0, r.forwardRef)(function (e, n) {
            let { render: a, className: c, id: f, ...d } = e,
              { setDescriptionElementId: m } = (0, o.useDialogRootContext)(),
              g = (0, s.useBaseUiId)(f);
            (0, u.useEnhancedEffect)(
              () => (
                m(g),
                () => {
                  m(void 0);
                }
              ),
              [g, m]
            );
            let p = (0, r.useCallback)(
                (e = {}) => (0, i.mergeProps)({ id: g }, e),
                [g]
              ),
              { renderElement: v } = (0, l.useComponentRenderer)({
                propGetter: p,
                render: a ?? "p",
                className: c,
                state: t,
                ref: n,
                extraProps: d,
              });
            return v();
          });
      }
    },
    6307: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r() {
        return "undefined" != typeof window;
      }
      function o(e) {
        return u(e) ? (e.nodeName || "").toLowerCase() : "#document";
      }
      function i(e) {
        var t;
        return (
          (null == e || null == (t = e.ownerDocument)
            ? void 0
            : t.defaultView) || window
        );
      }
      function l(e) {
        var t;
        return null ==
          (t = (u(e) ? e.ownerDocument : e.document) || window.document)
          ? void 0
          : t.documentElement;
      }
      function u(e) {
        return !!r() && (e instanceof Node || e instanceof i(e).Node);
      }
      function s(e) {
        return !!r() && (e instanceof Element || e instanceof i(e).Element);
      }
      function a(e) {
        return (
          !!r() && (e instanceof HTMLElement || e instanceof i(e).HTMLElement)
        );
      }
      function c(e) {
        return (
          !!r() &&
          "undefined" != typeof ShadowRoot &&
          (e instanceof ShadowRoot || e instanceof i(e).ShadowRoot)
        );
      }
      function f(e) {
        let { overflow: t, overflowX: n, overflowY: r, display: o } = y(e);
        return (
          /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
          !["inline", "contents"].includes(o)
        );
      }
      function d(e) {
        return ["table", "td", "th"].includes(o(e));
      }
      function m(e) {
        return [":popover-open", ":modal"].some((t) => {
          try {
            return e.matches(t);
          } catch (e) {
            return !1;
          }
        });
      }
      function g(e) {
        let t = v(),
          n = s(e) ? y(e) : e;
        return (
          ["transform", "translate", "scale", "rotate", "perspective"].some(
            (e) => !!n[e] && "none" !== n[e]
          ) ||
          (!!n.containerType && "normal" !== n.containerType) ||
          (!t && !!n.backdropFilter && "none" !== n.backdropFilter) ||
          (!t && !!n.filter && "none" !== n.filter) ||
          [
            "transform",
            "translate",
            "scale",
            "rotate",
            "perspective",
            "filter",
          ].some((e) => (n.willChange || "").includes(e)) ||
          ["paint", "layout", "strict", "content"].some((e) =>
            (n.contain || "").includes(e)
          )
        );
      }
      function p(e) {
        let t = E(e);
        for (; a(t) && !h(t); ) {
          if (g(t)) return t;
          if (m(t)) break;
          t = E(t);
        }
        return null;
      }
      function v() {
        return (
          "undefined" != typeof CSS &&
          !!CSS.supports &&
          CSS.supports("-webkit-backdrop-filter", "none")
        );
      }
      function h(e) {
        return ["html", "body", "#document"].includes(o(e));
      }
      function y(e) {
        return i(e).getComputedStyle(e);
      }
      function b(e) {
        return s(e)
          ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
          : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
      }
      function E(e) {
        if ("html" === o(e)) return e;
        let t = e.assignedSlot || e.parentNode || (c(e) && e.host) || l(e);
        return c(t) ? t.host : t;
      }
      function x(e) {
        let t = E(e);
        return h(t)
          ? e.ownerDocument
            ? e.ownerDocument.body
            : e.body
          : a(t) && f(t)
          ? t
          : x(t);
      }
      function w(e) {
        return e.parent && Object.getPrototypeOf(e.parent)
          ? e.frameElement
          : null;
      }
      e.s({
        getComputedStyle: () => y,
        getContainingBlock: () => p,
        getDocumentElement: () => l,
        getFrameElement: () => w,
        getNearestOverflowAncestor: () => x,
        getNodeName: () => o,
        getNodeScroll: () => b,
        getOverflowAncestors: () =>
          function e(t, n, r) {
            var o;
            void 0 === n && (n = []), void 0 === r && (r = !0);
            let l = x(t),
              u = l === (null == (o = t.ownerDocument) ? void 0 : o.body),
              s = i(l);
            if (u) {
              let t = w(s);
              return n.concat(
                s,
                s.visualViewport || [],
                f(l) ? l : [],
                t && r ? e(t) : []
              );
            }
            return n.concat(l, e(l, [], r));
          },
        getParentNode: () => E,
        getWindow: () => i,
        isContainingBlock: () => g,
        isElement: () => s,
        isHTMLElement: () => a,
        isLastTraversableNode: () => h,
        isNode: () => u,
        isOverflowElement: () => f,
        isShadowRoot: () => c,
        isTableElement: () => d,
        isTopLayer: () => m,
        isWebKit: () => v,
      });
    },
    59692: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          alignments: () => n,
          clamp: () => r,
          createCoords: () => C,
          evaluate: () => o,
          expandPaddingObject: () => v,
          floor: () => R,
          getAlignment: () => l,
          getAlignmentAxis: () => c,
          getAlignmentSides: () => f,
          getAxisLength: () => s,
          getExpandedPlacements: () => d,
          getOppositeAlignmentPlacement: () => m,
          getOppositeAxis: () => u,
          getOppositeAxisPlacements: () => g,
          getOppositePlacement: () => p,
          getPaddingObject: () => h,
          getSide: () => i,
          getSideAxis: () => a,
          max: () => x,
          min: () => E,
          placements: () => b,
          rectToClientRect: () => y,
          round: () => w,
          sides: () => t,
        });
        let t = ["top", "right", "bottom", "left"],
          n = ["start", "end"],
          b = t.reduce(
            (e, t) => e.concat(t, t + "-" + n[0], t + "-" + n[1]),
            []
          ),
          E = Math.min,
          x = Math.max,
          w = Math.round,
          R = Math.floor,
          C = (e) => ({ x: e, y: e }),
          S = { left: "right", right: "left", bottom: "top", top: "bottom" },
          T = { start: "end", end: "start" };
        function r(e, t, n) {
          return x(e, E(t, n));
        }
        function o(e, t) {
          return "function" == typeof e ? e(t) : e;
        }
        function i(e) {
          return e.split("-")[0];
        }
        function l(e) {
          return e.split("-")[1];
        }
        function u(e) {
          return "x" === e ? "y" : "x";
        }
        function s(e) {
          return "y" === e ? "height" : "width";
        }
        function a(e) {
          return ["top", "bottom"].includes(i(e)) ? "y" : "x";
        }
        function c(e) {
          return u(a(e));
        }
        function f(e, t, n) {
          void 0 === n && (n = !1);
          let r = l(e),
            o = c(e),
            i = s(o),
            u =
              "x" === o
                ? r === (n ? "end" : "start")
                  ? "right"
                  : "left"
                : "start" === r
                ? "bottom"
                : "top";
          return t.reference[i] > t.floating[i] && (u = p(u)), [u, p(u)];
        }
        function d(e) {
          let t = p(e);
          return [m(e), t, m(t)];
        }
        function m(e) {
          return e.replace(/start|end/g, (e) => T[e]);
        }
        function g(e, t, n, r) {
          let o = l(e),
            u = (function (e, t, n) {
              let r = ["left", "right"],
                o = ["right", "left"];
              switch (e) {
                case "top":
                case "bottom":
                  if (n) return t ? o : r;
                  return t ? r : o;
                case "left":
                case "right":
                  return t ? ["top", "bottom"] : ["bottom", "top"];
                default:
                  return [];
              }
            })(i(e), "start" === n, r);
          return (
            o &&
              ((u = u.map((e) => e + "-" + o)), t && (u = u.concat(u.map(m)))),
            u
          );
        }
        function p(e) {
          return e.replace(/left|right|bottom|top/g, (e) => S[e]);
        }
        function v(e) {
          return { top: 0, right: 0, bottom: 0, left: 0, ...e };
        }
        function h(e) {
          return "number" != typeof e
            ? v(e)
            : { top: e, right: e, bottom: e, left: e };
        }
        function y(e) {
          let { x: t, y: n, width: r, height: o } = e;
          return {
            width: r,
            height: o,
            top: n,
            left: t,
            right: t + r,
            bottom: n + o,
            x: t,
            y: n,
          };
        }
      }
    },
    59782: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({
        focusable: () => k,
        getTabIndex: () => m,
        isFocusable: () => O,
        isTabbable: () => D,
        tabbable: () => P,
      });
      var r = [
          "input:not([inert])",
          "select:not([inert])",
          "textarea:not([inert])",
          "a[href]:not([inert])",
          "button:not([inert])",
          "[tabindex]:not(slot):not([inert])",
          "audio[controls]:not([inert])",
          "video[controls]:not([inert])",
          '[contenteditable]:not([contenteditable="false"]):not([inert])',
          "details>summary:first-of-type:not([inert])",
          "details:not([inert])",
        ],
        o = r.join(","),
        i = "undefined" == typeof Element,
        l = i
          ? function () {}
          : Element.prototype.matches ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector,
        u =
          !i && Element.prototype.getRootNode
            ? function (e) {
                var t;
                return null == e || null == (t = e.getRootNode)
                  ? void 0
                  : t.call(e);
              }
            : function (e) {
                return null == e ? void 0 : e.ownerDocument;
              },
        s = function e(t, n) {
          void 0 === n && (n = !0);
          var r,
            o =
              null == t || null == (r = t.getAttribute)
                ? void 0
                : r.call(t, "inert");
          return "" === o || "true" === o || (n && t && e(t.parentNode));
        },
        a = function (e) {
          var t,
            n =
              null == e || null == (t = e.getAttribute)
                ? void 0
                : t.call(e, "contenteditable");
          return "" === n || "true" === n;
        },
        c = function (e, t, n) {
          if (s(e)) return [];
          var r = Array.prototype.slice.apply(e.querySelectorAll(o));
          return t && l.call(e, o) && r.unshift(e), (r = r.filter(n));
        },
        f = function e(t, n, r) {
          for (var i = [], u = Array.from(t); u.length; ) {
            var a = u.shift();
            if (!s(a, !1))
              if ("SLOT" === a.tagName) {
                var c = a.assignedElements(),
                  f = e(c.length ? c : a.children, !0, r);
                r.flatten
                  ? i.push.apply(i, f)
                  : i.push({ scopeParent: a, candidates: f });
              } else {
                l.call(a, o) &&
                  r.filter(a) &&
                  (n || !t.includes(a)) &&
                  i.push(a);
                var d =
                    a.shadowRoot ||
                    ("function" == typeof r.getShadowRoot &&
                      r.getShadowRoot(a)),
                  m =
                    !s(d, !1) && (!r.shadowRootFilter || r.shadowRootFilter(a));
                if (d && m) {
                  var g = e(!0 === d ? a.children : d.children, !0, r);
                  r.flatten
                    ? i.push.apply(i, g)
                    : i.push({ scopeParent: a, candidates: g });
                } else u.unshift.apply(u, a.children);
              }
          }
          return i;
        },
        d = function (e) {
          return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
        },
        m = function (e) {
          if (!e) throw Error("No node provided");
          return e.tabIndex < 0 &&
            (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || a(e)) &&
            !d(e)
            ? 0
            : e.tabIndex;
        },
        g = function (e, t) {
          var n = m(e);
          return n < 0 && t && !d(e) ? 0 : n;
        },
        p = function (e, t) {
          return e.tabIndex === t.tabIndex
            ? e.documentOrder - t.documentOrder
            : e.tabIndex - t.tabIndex;
        },
        v = function (e) {
          return "INPUT" === e.tagName;
        },
        h = function (e, t) {
          for (var n = 0; n < e.length; n++)
            if (e[n].checked && e[n].form === t) return e[n];
        },
        y = function (e) {
          if (!e.name) return !0;
          var t,
            n = e.form || u(e),
            r = function (e) {
              return n.querySelectorAll(
                'input[type="radio"][name="' + e + '"]'
              );
            };
          if (
            "undefined" != typeof window &&
            void 0 !== window.CSS &&
            "function" == typeof window.CSS.escape
          )
            t = r(window.CSS.escape(e.name));
          else
            try {
              t = r(e.name);
            } catch (e) {
              return (
                console.error(
                  "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
                  e.message
                ),
                !1
              );
            }
          var o = h(t, e.form);
          return !o || o === e;
        },
        b = function (e) {
          return v(e) && "radio" === e.type && !y(e);
        },
        E = function (e) {
          var t,
            n,
            r,
            o,
            i,
            l,
            s,
            a = e && u(e),
            c = null == (t = a) ? void 0 : t.host,
            f = !1;
          if (a && a !== e)
            for (
              f = !!(
                (null != (n = c) &&
                  null != (r = n.ownerDocument) &&
                  r.contains(c)) ||
                (null != e && null != (o = e.ownerDocument) && o.contains(e))
              );
              !f && c;

            )
              f = !!(
                null != (l = c = null == (i = a = u(c)) ? void 0 : i.host) &&
                null != (s = l.ownerDocument) &&
                s.contains(c)
              );
          return f;
        },
        x = function (e) {
          var t = e.getBoundingClientRect(),
            n = t.width,
            r = t.height;
          return 0 === n && 0 === r;
        },
        w = function (e, t) {
          var n = t.displayCheck,
            r = t.getShadowRoot;
          if ("hidden" === getComputedStyle(e).visibility) return !0;
          var o = l.call(e, "details>summary:first-of-type")
            ? e.parentElement
            : e;
          if (l.call(o, "details:not([open]) *")) return !0;
          if (n && "full" !== n && "legacy-full" !== n) {
            if ("non-zero-area" === n) return x(e);
          } else {
            if ("function" == typeof r) {
              for (var i = e; e; ) {
                var s = e.parentElement,
                  a = u(e);
                if (s && !s.shadowRoot && !0 === r(s)) return x(e);
                e = e.assignedSlot
                  ? e.assignedSlot
                  : s || a === e.ownerDocument
                  ? s
                  : a.host;
              }
              e = i;
            }
            if (E(e)) return !e.getClientRects().length;
            if ("legacy-full" !== n) return !0;
          }
          return !1;
        },
        R = function (e) {
          if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
            for (var t = e.parentElement; t; ) {
              if ("FIELDSET" === t.tagName && t.disabled) {
                for (var n = 0; n < t.children.length; n++) {
                  var r = t.children.item(n);
                  if ("LEGEND" === r.tagName)
                    return (
                      !!l.call(t, "fieldset[disabled] *") || !r.contains(e)
                    );
                }
                return !0;
              }
              t = t.parentElement;
            }
          return !1;
        },
        C = function (e, t) {
          return !(
            t.disabled ||
            s(t) ||
            (v(t) && "hidden" === t.type) ||
            w(t, e) ||
            ("DETAILS" === t.tagName &&
              Array.prototype.slice.apply(t.children).some(function (e) {
                return "SUMMARY" === e.tagName;
              })) ||
            R(t)
          );
        },
        S = function (e, t) {
          return !(b(t) || 0 > m(t)) && !!C(e, t);
        },
        T = function (e) {
          var t = parseInt(e.getAttribute("tabindex"), 10);
          return !!isNaN(t) || !!(t >= 0);
        },
        L = function e(t) {
          var n = [],
            r = [];
          return (
            t.forEach(function (t, o) {
              var i = !!t.scopeParent,
                l = i ? t.scopeParent : t,
                u = g(l, i),
                s = i ? e(t.candidates) : l;
              0 === u
                ? i
                  ? n.push.apply(n, s)
                  : n.push(l)
                : r.push({
                    documentOrder: o,
                    tabIndex: u,
                    item: t,
                    isScope: i,
                    content: s,
                  });
            }),
            r
              .sort(p)
              .reduce(function (e, t) {
                return (
                  t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e
                );
              }, [])
              .concat(n)
          );
        },
        P = function (e, t) {
          var n;
          return L(
            (t = t || {}).getShadowRoot
              ? f([e], t.includeContainer, {
                  filter: S.bind(null, t),
                  flatten: !1,
                  getShadowRoot: t.getShadowRoot,
                  shadowRootFilter: T,
                })
              : c(e, t.includeContainer, S.bind(null, t))
          );
        },
        k = function (e, t) {
          var n;
          return (t = t || {}).getShadowRoot
            ? f([e], t.includeContainer, {
                filter: C.bind(null, t),
                flatten: !0,
                getShadowRoot: t.getShadowRoot,
              })
            : c(e, t.includeContainer, C.bind(null, t));
        },
        D = function (e, t) {
          if (((t = t || {}), !e)) throw Error("No node provided");
          return !1 !== l.call(e, o) && S(t, e);
        },
        M = r.concat("iframe").join(","),
        O = function (e, t) {
          if (((t = t || {}), !e)) throw Error("No node provided");
          return !1 !== l.call(e, M) && C(t, e);
        };
    },
    6661: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          activeElement: () => m,
          contains: () => g,
          createGridCellMap: () => B,
          disableFocusInside: () => X,
          enableFocusInside: () => Y,
          findNonDisabledListIndex: () => H,
          getDeepestNode: () => C,
          getDocument: () => y,
          getFloatingFocusElement: () => w,
          getGridCellIndexOfCorner: () => W,
          getGridCellIndices: () => U,
          getGridNavigatedIndex: () => _,
          getMaxListIndex: () => j,
          getMinListIndex: () => F,
          getNextTabbable: () => V,
          getNodeAncestors: () => S,
          getNodeChildren: () => R,
          getPlatform: () => u,
          getPreviousTabbable: () => G,
          getTabbableOptions: () => Q,
          getTarget: () => p,
          getUserAgent: () => s,
          isAndroid: () => c,
          isDifferentGridRow: () => I,
          isEventTargetWithin: () => v,
          isIndexOutOfListBounds: () => N,
          isJSDOM: () => d,
          isListIndexDisabled: () => K,
          isMac: () => f,
          isMouseLikePointerType: () => D,
          isOutsideEvent: () => q,
          isReactEvent: () => L,
          isRootElement: () => h,
          isSafari: () => a,
          isTypeableCombobox: () => E,
          isTypeableElement: () => b,
          isVirtualClick: () => P,
          isVirtualPointerEvent: () => k,
          matchesFocusVisible: () => x,
          stopEvent: () => T,
          useEffectEvent: () => A,
          useLatestRef: () => O,
          useModernLayoutEffect: () => M,
        }),
          e.i(22271);
        var r = e.i(6307),
          o = e.i(38653),
          i = e.i(59692),
          l = e.i(59782);
        function u() {
          let e = navigator.userAgentData;
          return null != e && e.platform ? e.platform : navigator.platform;
        }
        function s() {
          let e = navigator.userAgentData;
          return e && Array.isArray(e.brands)
            ? e.brands
                .map((e) => {
                  let { brand: t, version: n } = e;
                  return t + "/" + n;
                })
                .join(" ")
            : navigator.userAgent;
        }
        function a() {
          return /apple/i.test(navigator.vendor);
        }
        function c() {
          let e = /android/i;
          return e.test(u()) || e.test(s());
        }
        function f() {
          return (
            u().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints
          );
        }
        function d() {
          return s().includes("jsdom/");
        }
        let t = "data-floating-ui-focusable",
          n = "ArrowLeft",
          $ = "ArrowRight";
        function m(e) {
          let t = e.activeElement;
          for (
            ;
            (null == (n = t) || null == (n = n.shadowRoot)
              ? void 0
              : n.activeElement) != null;

          ) {
            var n;
            t = t.shadowRoot.activeElement;
          }
          return t;
        }
        function g(e, t) {
          if (!e || !t) return !1;
          let n = null == t.getRootNode ? void 0 : t.getRootNode();
          if (e.contains(t)) return !0;
          if (n && (0, r.isShadowRoot)(n)) {
            let n = t;
            for (; n; ) {
              if (e === n) return !0;
              n = n.parentNode || n.host;
            }
          }
          return !1;
        }
        function p(e) {
          return "composedPath" in e ? e.composedPath()[0] : e.target;
        }
        function v(e, t) {
          return (
            null != t &&
            ("composedPath" in e
              ? e.composedPath().includes(t)
              : null != e.target && t.contains(e.target))
          );
        }
        function h(e) {
          return e.matches("html,body");
        }
        function y(e) {
          return (null == e ? void 0 : e.ownerDocument) || document;
        }
        function b(e) {
          return (
            (0, r.isHTMLElement)(e) &&
            e.matches(
              "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])"
            )
          );
        }
        function E(e) {
          return !!e && "combobox" === e.getAttribute("role") && b(e);
        }
        function x(e) {
          if (!e || d()) return !0;
          try {
            return e.matches(":focus-visible");
          } catch (e) {
            return !0;
          }
        }
        function w(e) {
          return e
            ? e.hasAttribute(t)
              ? e
              : e.querySelector("[" + t + "]") || e
            : null;
        }
        function R(e, t, n) {
          void 0 === n && (n = !0);
          let r = e.filter((e) => {
              var n;
              return (
                e.parentId === t && (null == (n = e.context) ? void 0 : n.open)
              );
            }),
            o = r;
          for (; o.length; )
            (o = n
              ? e.filter((e) => {
                  var t;
                  return null == (t = o)
                    ? void 0
                    : t.some((t) => {
                        var n;
                        return (
                          e.parentId === t.id &&
                          (null == (n = e.context) ? void 0 : n.open)
                        );
                      });
                })
              : e),
              (r = r.concat(o));
          return r;
        }
        function C(e, t) {
          let n,
            r = -1;
          return (
            !(function t(o, i) {
              i > r && ((n = o), (r = i)),
                R(e, o).forEach((e) => {
                  t(e.id, i + 1);
                });
            })(t, 0),
            e.find((e) => e.id === n)
          );
        }
        function S(e, t) {
          var n;
          let r = [],
            o = null == (n = e.find((e) => e.id === t)) ? void 0 : n.parentId;
          for (; o; ) {
            let t = e.find((e) => e.id === o);
            (o = null == t ? void 0 : t.parentId), t && (r = r.concat(t));
          }
          return r;
        }
        function T(e) {
          e.preventDefault(), e.stopPropagation();
        }
        function L(e) {
          return "nativeEvent" in e;
        }
        function P(e) {
          return (
            (0 === e.mozInputSource && !!e.isTrusted) ||
            (c() && e.pointerType
              ? "click" === e.type && 1 === e.buttons
              : 0 === e.detail && !e.pointerType)
          );
        }
        function k(e) {
          return (
            !d() &&
            ((!c() && 0 === e.width && 0 === e.height) ||
              (c() &&
                1 === e.width &&
                1 === e.height &&
                0 === e.pressure &&
                0 === e.detail &&
                "mouse" === e.pointerType) ||
              (e.width < 1 &&
                e.height < 1 &&
                0 === e.pressure &&
                0 === e.detail &&
                "touch" === e.pointerType))
          );
        }
        function D(e, t) {
          let n = ["mouse", "pen"];
          return t || n.push("", void 0), n.includes(e);
        }
        var M =
          "undefined" != typeof document ? o.useLayoutEffect : o.useEffect;
        function O(e) {
          let t = o.useRef(e);
          return (
            M(() => {
              t.current = e;
            }),
            t
          );
        }
        let J = { ...o }.useInsertionEffect || ((e) => e());
        function A(e) {
          let t = o.useRef(() => {});
          return (
            J(() => {
              t.current = e;
            }),
            o.useCallback(function () {
              for (var e = arguments.length, n = Array(e), r = 0; r < e; r++)
                n[r] = arguments[r];
              return null == t.current ? void 0 : t.current(...n);
            }, [])
          );
        }
        function I(e, t, n) {
          return Math.floor(e / t) !== n;
        }
        function N(e, t) {
          return t < 0 || t >= e.current.length;
        }
        function F(e, t) {
          return H(e, { disabledIndices: t });
        }
        function j(e, t) {
          return H(e, {
            decrement: !0,
            startingIndex: e.current.length,
            disabledIndices: t,
          });
        }
        function H(e, t) {
          let {
              startingIndex: n = -1,
              decrement: r = !1,
              disabledIndices: o,
              amount: i = 1,
            } = void 0 === t ? {} : t,
            l = n;
          do l += r ? -i : i;
          while (l >= 0 && l <= e.current.length - 1 && K(e, l, o));
          return l;
        }
        function _(e, t) {
          let {
              event: r,
              orientation: o,
              loop: l,
              rtl: u,
              cols: s,
              disabledIndices: a,
              minIndex: c,
              maxIndex: f,
              prevIndex: d,
              stopEvent: m = !1,
            } = t,
            g = d;
          if ("ArrowUp" === r.key) {
            if ((m && T(r), -1 === d)) g = f;
            else if (
              ((g = H(e, {
                startingIndex: g,
                amount: s,
                decrement: !0,
                disabledIndices: a,
              })),
              l && (d - s < c || g < 0))
            ) {
              let e = d % s,
                t = f % s,
                n = f - (t - e);
              g = t === e ? f : t > e ? n : n - s;
            }
            N(e, g) && (g = d);
          }
          if (
            ("ArrowDown" === r.key &&
              (m && T(r),
              -1 === d
                ? (g = c)
                : ((g = H(e, {
                    startingIndex: d,
                    amount: s,
                    disabledIndices: a,
                  })),
                  l &&
                    d + s > f &&
                    (g = H(e, {
                      startingIndex: (d % s) - s,
                      amount: s,
                      disabledIndices: a,
                    }))),
              N(e, g) && (g = d)),
            "both" === o)
          ) {
            let t = (0, i.floor)(d / s);
            r.key === (u ? n : $) &&
              (m && T(r),
              d % s != s - 1
                ? ((g = H(e, { startingIndex: d, disabledIndices: a })),
                  l &&
                    I(g, s, t) &&
                    (g = H(e, {
                      startingIndex: d - (d % s) - 1,
                      disabledIndices: a,
                    })))
                : l &&
                  (g = H(e, {
                    startingIndex: d - (d % s) - 1,
                    disabledIndices: a,
                  })),
              I(g, s, t) && (g = d)),
              r.key === (u ? $ : n) &&
                (m && T(r),
                d % s != 0
                  ? ((g = H(e, {
                      startingIndex: d,
                      decrement: !0,
                      disabledIndices: a,
                    })),
                    l &&
                      I(g, s, t) &&
                      (g = H(e, {
                        startingIndex: d + (s - (d % s)),
                        decrement: !0,
                        disabledIndices: a,
                      })))
                  : l &&
                    (g = H(e, {
                      startingIndex: d + (s - (d % s)),
                      decrement: !0,
                      disabledIndices: a,
                    })),
                I(g, s, t) && (g = d));
            let o = (0, i.floor)(f / s) === t;
            N(e, g) &&
              (g =
                l && o
                  ? r.key === (u ? $ : n)
                    ? f
                    : H(e, {
                        startingIndex: d - (d % s) - 1,
                        disabledIndices: a,
                      })
                  : d);
          }
          return g;
        }
        function B(e, t, n) {
          let r = [],
            o = 0;
          return (
            e.forEach((e, i) => {
              let { width: l, height: u } = e,
                s = !1;
              for (n && (o = 0); !s; ) {
                let e = [];
                for (let n = 0; n < l; n++)
                  for (let r = 0; r < u; r++) e.push(o + n + r * t);
                (o % t) + l <= t && e.every((e) => null == r[e])
                  ? (e.forEach((e) => {
                      r[e] = i;
                    }),
                    (s = !0))
                  : o++;
              }
            }),
            [...r]
          );
        }
        function W(e, t, n, r, o) {
          if (-1 === e) return -1;
          let i = n.indexOf(e),
            l = t[e];
          switch (o) {
            case "tl":
              return i;
            case "tr":
              if (!l) return i;
              return i + l.width - 1;
            case "bl":
              if (!l) return i;
              return i + (l.height - 1) * r;
            case "br":
              return n.lastIndexOf(e);
          }
        }
        function U(e, t) {
          return t.flatMap((t, n) => (e.includes(t) ? [n] : []));
        }
        function K(e, t, n) {
          if (n) return n.includes(t);
          let r = e.current[t];
          return (
            null == r ||
            r.hasAttribute("disabled") ||
            "true" === r.getAttribute("aria-disabled")
          );
        }
        let Q = () => ({
          getShadowRoot: !0,
          displayCheck:
            "function" == typeof ResizeObserver &&
            ResizeObserver.toString().includes("[native code]")
              ? "full"
              : "none",
        });
        function z(e, t) {
          let n = (0, l.tabbable)(e, Q()),
            r = n.length;
          if (0 === r) return;
          let o = m(y(e)),
            i = n.indexOf(o);
          return n[-1 === i ? (1 === t ? 0 : r - 1) : i + t];
        }
        function V(e) {
          return z(y(e).body, 1) || e;
        }
        function G(e) {
          return z(y(e).body, -1) || e;
        }
        function q(e, t) {
          let n = t || e.currentTarget,
            r = e.relatedTarget;
          return !r || !g(n, r);
        }
        function X(e) {
          (0, l.tabbable)(e, Q()).forEach((e) => {
            (e.dataset.tabindex = e.getAttribute("tabindex") || ""),
              e.setAttribute("tabindex", "-1");
          });
        }
        function Y(e) {
          e.querySelectorAll("[data-tabindex]").forEach((e) => {
            let t = e.dataset.tabindex;
            delete e.dataset.tabindex,
              t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
          });
        }
      }
    },
    33982: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          arrow: () => n,
          autoPlacement: () => c,
          computePosition: () => t,
          detectOverflow: () => i,
          flip: () => f,
          hide: () => d,
          inline: () => m,
          limitShift: () => v,
          offset: () => g,
          shift: () => p,
          size: () => h,
        });
        var r = e.i(59692);
        function o(e, t, n) {
          let o,
            { reference: i, floating: l } = e,
            u = (0, r.getSideAxis)(t),
            s = (0, r.getAlignmentAxis)(t),
            a = (0, r.getAxisLength)(s),
            c = (0, r.getSide)(t),
            f = "y" === u,
            d = i.x + i.width / 2 - l.width / 2,
            m = i.y + i.height / 2 - l.height / 2,
            g = i[a] / 2 - l[a] / 2;
          switch (c) {
            case "top":
              o = { x: d, y: i.y - l.height };
              break;
            case "bottom":
              o = { x: d, y: i.y + i.height };
              break;
            case "right":
              o = { x: i.x + i.width, y: m };
              break;
            case "left":
              o = { x: i.x - l.width, y: m };
              break;
            default:
              o = { x: i.x, y: i.y };
          }
          switch ((0, r.getAlignment)(t)) {
            case "start":
              o[s] -= g * (n && f ? -1 : 1);
              break;
            case "end":
              o[s] += g * (n && f ? -1 : 1);
          }
          return o;
        }
        let t = async (e, t, n) => {
          let {
              placement: r = "bottom",
              strategy: i = "absolute",
              middleware: l = [],
              platform: u,
            } = n,
            s = l.filter(Boolean),
            a = await (null == u.isRTL ? void 0 : u.isRTL(t)),
            c = await u.getElementRects({
              reference: e,
              floating: t,
              strategy: i,
            }),
            { x: f, y: d } = o(c, r, a),
            m = r,
            g = {},
            p = 0;
          for (let n = 0; n < s.length; n++) {
            let { name: l, fn: v } = s[n],
              {
                x: h,
                y: y,
                data: b,
                reset: E,
              } = await v({
                x: f,
                y: d,
                initialPlacement: r,
                placement: m,
                strategy: i,
                middlewareData: g,
                rects: c,
                platform: u,
                elements: { reference: e, floating: t },
              });
            (f = null != h ? h : f),
              (d = null != y ? y : d),
              (g = { ...g, [l]: { ...g[l], ...b } }),
              E &&
                p <= 50 &&
                (p++,
                "object" == typeof E &&
                  (E.placement && (m = E.placement),
                  E.rects &&
                    (c =
                      !0 === E.rects
                        ? await u.getElementRects({
                            reference: e,
                            floating: t,
                            strategy: i,
                          })
                        : E.rects),
                  ({ x: f, y: d } = o(c, m, a))),
                (n = -1));
          }
          return { x: f, y: d, placement: m, strategy: i, middlewareData: g };
        };
        async function i(e, t) {
          var n;
          void 0 === t && (t = {});
          let {
              x: o,
              y: i,
              platform: l,
              rects: u,
              elements: s,
              strategy: a,
            } = e,
            {
              boundary: c = "clippingAncestors",
              rootBoundary: f = "viewport",
              elementContext: d = "floating",
              altBoundary: m = !1,
              padding: g = 0,
            } = (0, r.evaluate)(t, e),
            p = (0, r.getPaddingObject)(g),
            v = s[m ? ("floating" === d ? "reference" : "floating") : d],
            h = (0, r.rectToClientRect)(
              await l.getClippingRect({
                element:
                  null ==
                    (n = await (null == l.isElement
                      ? void 0
                      : l.isElement(v))) || n
                    ? v
                    : v.contextElement ||
                      (await (null == l.getDocumentElement
                        ? void 0
                        : l.getDocumentElement(s.floating))),
                boundary: c,
                rootBoundary: f,
                strategy: a,
              })
            ),
            y =
              "floating" === d
                ? {
                    x: o,
                    y: i,
                    width: u.floating.width,
                    height: u.floating.height,
                  }
                : u.reference,
            b = await (null == l.getOffsetParent
              ? void 0
              : l.getOffsetParent(s.floating)),
            E = ((await (null == l.isElement ? void 0 : l.isElement(b))) &&
              (await (null == l.getScale ? void 0 : l.getScale(b)))) || {
              x: 1,
              y: 1,
            },
            x = (0, r.rectToClientRect)(
              l.convertOffsetParentRelativeRectToViewportRelativeRect
                ? await l.convertOffsetParentRelativeRectToViewportRelativeRect(
                    { elements: s, rect: y, offsetParent: b, strategy: a }
                  )
                : y
            );
          return {
            top: (h.top - x.top + p.top) / E.y,
            bottom: (x.bottom - h.bottom + p.bottom) / E.y,
            left: (h.left - x.left + p.left) / E.x,
            right: (x.right - h.right + p.right) / E.x,
          };
        }
        let n = (e) => ({
            name: "arrow",
            options: e,
            async fn(t) {
              let {
                  x: n,
                  y: o,
                  placement: i,
                  rects: l,
                  platform: u,
                  elements: s,
                  middlewareData: a,
                } = t,
                { element: c, padding: f = 0 } = (0, r.evaluate)(e, t) || {};
              if (null == c) return {};
              let d = (0, r.getPaddingObject)(f),
                m = { x: n, y: o },
                g = (0, r.getAlignmentAxis)(i),
                p = (0, r.getAxisLength)(g),
                v = await u.getDimensions(c),
                h = "y" === g,
                y = h ? "clientHeight" : "clientWidth",
                b = l.reference[p] + l.reference[g] - m[g] - l.floating[p],
                E = m[g] - l.reference[g],
                x = await (null == u.getOffsetParent
                  ? void 0
                  : u.getOffsetParent(c)),
                w = x ? x[y] : 0;
              (w && (await (null == u.isElement ? void 0 : u.isElement(x)))) ||
                (w = s.floating[y] || l.floating[p]);
              let R = w / 2 - v[p] / 2 - 1,
                C = (0, r.min)(d[h ? "top" : "left"], R),
                S = (0, r.min)(d[h ? "bottom" : "right"], R),
                T = w - v[p] - S,
                L = w / 2 - v[p] / 2 + (b / 2 - E / 2),
                P = (0, r.clamp)(C, L, T),
                k =
                  !a.arrow &&
                  null != (0, r.getAlignment)(i) &&
                  L !== P &&
                  l.reference[p] / 2 - (L < C ? C : S) - v[p] / 2 < 0,
                D = k ? (L < C ? L - C : L - T) : 0;
              return {
                [g]: m[g] + D,
                data: {
                  [g]: P,
                  centerOffset: L - P - D,
                  ...(k && { alignmentOffset: D }),
                },
                reset: k,
              };
            },
          }),
          c = function (e) {
            return (
              void 0 === e && (e = {}),
              {
                name: "autoPlacement",
                options: e,
                async fn(t) {
                  var n, o, l, u;
                  let {
                      rects: s,
                      middlewareData: a,
                      placement: c,
                      platform: f,
                      elements: d,
                    } = t,
                    {
                      crossAxis: m = !1,
                      alignment: g,
                      allowedPlacements: p = r.placements,
                      autoAlignment: v = !0,
                      ...h
                    } = (0, r.evaluate)(e, t),
                    y =
                      void 0 !== g || p === r.placements
                        ? ((u = g || null)
                            ? [
                                ...p.filter(
                                  (e) => (0, r.getAlignment)(e) === u
                                ),
                                ...p.filter(
                                  (e) => (0, r.getAlignment)(e) !== u
                                ),
                              ]
                            : p.filter((e) => (0, r.getSide)(e) === e)
                          ).filter(
                            (e) =>
                              !u ||
                              (0, r.getAlignment)(e) === u ||
                              (!!v &&
                                (0, r.getOppositeAlignmentPlacement)(e) !== e)
                          )
                        : p,
                    b = await i(t, h),
                    E = (null == (n = a.autoPlacement) ? void 0 : n.index) || 0,
                    x = y[E];
                  if (null == x) return {};
                  let w = (0, r.getAlignmentSides)(
                    x,
                    s,
                    await (null == f.isRTL ? void 0 : f.isRTL(d.floating))
                  );
                  if (c !== x) return { reset: { placement: y[0] } };
                  let R = [b[(0, r.getSide)(x)], b[w[0]], b[w[1]]],
                    C = [
                      ...((null == (o = a.autoPlacement)
                        ? void 0
                        : o.overflows) || []),
                      { placement: x, overflows: R },
                    ],
                    S = y[E + 1];
                  if (S)
                    return {
                      data: { index: E + 1, overflows: C },
                      reset: { placement: S },
                    };
                  let T = C.map((e) => {
                      let t = (0, r.getAlignment)(e.placement);
                      return [
                        e.placement,
                        t && m
                          ? e.overflows.slice(0, 2).reduce((e, t) => e + t, 0)
                          : e.overflows[0],
                        e.overflows,
                      ];
                    }).sort((e, t) => e[1] - t[1]),
                    L =
                      (null ==
                      (l = T.filter((e) =>
                        e[2]
                          .slice(0, (0, r.getAlignment)(e[0]) ? 2 : 3)
                          .every((e) => e <= 0)
                      )[0])
                        ? void 0
                        : l[0]) || T[0][0];
                  return L !== c
                    ? {
                        data: { index: E + 1, overflows: C },
                        reset: { placement: L },
                      }
                    : {};
                },
              }
            );
          },
          f = function (e) {
            return (
              void 0 === e && (e = {}),
              {
                name: "flip",
                options: e,
                async fn(t) {
                  var n, o, l, u, s;
                  let {
                      placement: a,
                      middlewareData: c,
                      rects: f,
                      initialPlacement: d,
                      platform: m,
                      elements: g,
                    } = t,
                    {
                      mainAxis: p = !0,
                      crossAxis: v = !0,
                      fallbackPlacements: h,
                      fallbackStrategy: y = "bestFit",
                      fallbackAxisSideDirection: b = "none",
                      flipAlignment: E = !0,
                      ...x
                    } = (0, r.evaluate)(e, t);
                  if (null != (n = c.arrow) && n.alignmentOffset) return {};
                  let w = (0, r.getSide)(a),
                    R = (0, r.getSideAxis)(d),
                    C = (0, r.getSide)(d) === d,
                    S = await (null == m.isRTL ? void 0 : m.isRTL(g.floating)),
                    T =
                      h ||
                      (C || !E
                        ? [(0, r.getOppositePlacement)(d)]
                        : (0, r.getExpandedPlacements)(d)),
                    L = "none" !== b;
                  !h &&
                    L &&
                    T.push(...(0, r.getOppositeAxisPlacements)(d, E, b, S));
                  let P = [d, ...T],
                    k = await i(t, x),
                    D = [],
                    M = (null == (o = c.flip) ? void 0 : o.overflows) || [];
                  if ((p && D.push(k[w]), v)) {
                    let e = (0, r.getAlignmentSides)(a, f, S);
                    D.push(k[e[0]], k[e[1]]);
                  }
                  if (
                    ((M = [...M, { placement: a, overflows: D }]),
                    !D.every((e) => e <= 0))
                  ) {
                    let e =
                        ((null == (l = c.flip) ? void 0 : l.index) || 0) + 1,
                      t = P[e];
                    if (t)
                      return {
                        data: { index: e, overflows: M },
                        reset: { placement: t },
                      };
                    let n =
                      null ==
                      (u = M.filter((e) => e.overflows[0] <= 0).sort(
                        (e, t) => e.overflows[1] - t.overflows[1]
                      )[0])
                        ? void 0
                        : u.placement;
                    if (!n)
                      switch (y) {
                        case "bestFit": {
                          let e =
                            null ==
                            (s = M.filter((e) => {
                              if (L) {
                                let t = (0, r.getSideAxis)(e.placement);
                                return t === R || "y" === t;
                              }
                              return !0;
                            })
                              .map((e) => [
                                e.placement,
                                e.overflows
                                  .filter((e) => e > 0)
                                  .reduce((e, t) => e + t, 0),
                              ])
                              .sort((e, t) => e[1] - t[1])[0])
                              ? void 0
                              : s[0];
                          e && (n = e);
                          break;
                        }
                        case "initialPlacement":
                          n = d;
                      }
                    if (a !== n) return { reset: { placement: n } };
                  }
                  return {};
                },
              }
            );
          };
        function l(e, t) {
          return {
            top: e.top - t.height,
            right: e.right - t.width,
            bottom: e.bottom - t.height,
            left: e.left - t.width,
          };
        }
        function u(e) {
          return r.sides.some((t) => e[t] >= 0);
        }
        let d = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              name: "hide",
              options: e,
              async fn(t) {
                let { rects: n } = t,
                  { strategy: o = "referenceHidden", ...s } = (0, r.evaluate)(
                    e,
                    t
                  );
                switch (o) {
                  case "referenceHidden": {
                    let e = l(
                      await i(t, { ...s, elementContext: "reference" }),
                      n.reference
                    );
                    return {
                      data: {
                        referenceHiddenOffsets: e,
                        referenceHidden: u(e),
                      },
                    };
                  }
                  case "escaped": {
                    let e = l(
                      await i(t, { ...s, altBoundary: !0 }),
                      n.floating
                    );
                    return { data: { escapedOffsets: e, escaped: u(e) } };
                  }
                  default:
                    return {};
                }
              },
            }
          );
        };
        function s(e) {
          let t = (0, r.min)(...e.map((e) => e.left)),
            n = (0, r.min)(...e.map((e) => e.top));
          return {
            x: t,
            y: n,
            width: (0, r.max)(...e.map((e) => e.right)) - t,
            height: (0, r.max)(...e.map((e) => e.bottom)) - n,
          };
        }
        let m = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              name: "inline",
              options: e,
              async fn(t) {
                let {
                    placement: n,
                    elements: o,
                    rects: i,
                    platform: l,
                    strategy: u,
                  } = t,
                  { padding: a = 2, x: c, y: f } = (0, r.evaluate)(e, t),
                  d = Array.from(
                    (await (null == l.getClientRects
                      ? void 0
                      : l.getClientRects(o.reference))) || []
                  ),
                  m = (function (e) {
                    let t = e.slice().sort((e, t) => e.y - t.y),
                      n = [],
                      o = null;
                    for (let e = 0; e < t.length; e++) {
                      let r = t[e];
                      !o || r.y - o.y > o.height / 2
                        ? n.push([r])
                        : n[n.length - 1].push(r),
                        (o = r);
                    }
                    return n.map((e) => (0, r.rectToClientRect)(s(e)));
                  })(d),
                  g = (0, r.rectToClientRect)(s(d)),
                  p = (0, r.getPaddingObject)(a),
                  v = await l.getElementRects({
                    reference: {
                      getBoundingClientRect: function () {
                        if (
                          2 === m.length &&
                          m[0].left > m[1].right &&
                          null != c &&
                          null != f
                        )
                          return (
                            m.find(
                              (e) =>
                                c > e.left - p.left &&
                                c < e.right + p.right &&
                                f > e.top - p.top &&
                                f < e.bottom + p.bottom
                            ) || g
                          );
                        if (m.length >= 2) {
                          if ("y" === (0, r.getSideAxis)(n)) {
                            let e = m[0],
                              t = m[m.length - 1],
                              o = "top" === (0, r.getSide)(n),
                              i = e.top,
                              l = t.bottom,
                              u = o ? e.left : t.left,
                              s = o ? e.right : t.right;
                            return {
                              top: i,
                              bottom: l,
                              left: u,
                              right: s,
                              width: s - u,
                              height: l - i,
                              x: u,
                              y: i,
                            };
                          }
                          let e = "left" === (0, r.getSide)(n),
                            t = (0, r.max)(...m.map((e) => e.right)),
                            o = (0, r.min)(...m.map((e) => e.left)),
                            i = m.filter((n) =>
                              e ? n.left === o : n.right === t
                            ),
                            l = i[0].top,
                            u = i[i.length - 1].bottom;
                          return {
                            top: l,
                            bottom: u,
                            left: o,
                            right: t,
                            width: t - o,
                            height: u - l,
                            x: o,
                            y: l,
                          };
                        }
                        return g;
                      },
                    },
                    floating: o.floating,
                    strategy: u,
                  });
                return i.reference.x !== v.reference.x ||
                  i.reference.y !== v.reference.y ||
                  i.reference.width !== v.reference.width ||
                  i.reference.height !== v.reference.height
                  ? { reset: { rects: v } }
                  : {};
              },
            }
          );
        };
        async function a(e, t) {
          let { placement: n, platform: o, elements: i } = e,
            l = await (null == o.isRTL ? void 0 : o.isRTL(i.floating)),
            u = (0, r.getSide)(n),
            s = (0, r.getAlignment)(n),
            a = "y" === (0, r.getSideAxis)(n),
            c = ["left", "top"].includes(u) ? -1 : 1,
            f = l && a ? -1 : 1,
            d = (0, r.evaluate)(t, e),
            {
              mainAxis: m,
              crossAxis: g,
              alignmentAxis: p,
            } = "number" == typeof d
              ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
              : {
                  mainAxis: d.mainAxis || 0,
                  crossAxis: d.crossAxis || 0,
                  alignmentAxis: d.alignmentAxis,
                };
          return (
            s && "number" == typeof p && (g = "end" === s ? -1 * p : p),
            a ? { x: g * f, y: m * c } : { x: m * c, y: g * f }
          );
        }
        let g = function (e) {
            return (
              void 0 === e && (e = 0),
              {
                name: "offset",
                options: e,
                async fn(t) {
                  var n, r;
                  let { x: o, y: i, placement: l, middlewareData: u } = t,
                    s = await a(t, e);
                  return l ===
                    (null == (n = u.offset) ? void 0 : n.placement) &&
                    null != (r = u.arrow) &&
                    r.alignmentOffset
                    ? {}
                    : { x: o + s.x, y: i + s.y, data: { ...s, placement: l } };
                },
              }
            );
          },
          p = function (e) {
            return (
              void 0 === e && (e = {}),
              {
                name: "shift",
                options: e,
                async fn(t) {
                  let { x: n, y: o, placement: l } = t,
                    {
                      mainAxis: u = !0,
                      crossAxis: s = !1,
                      limiter: a = {
                        fn: (e) => {
                          let { x: t, y: n } = e;
                          return { x: t, y: n };
                        },
                      },
                      ...c
                    } = (0, r.evaluate)(e, t),
                    f = { x: n, y: o },
                    d = await i(t, c),
                    m = (0, r.getSideAxis)((0, r.getSide)(l)),
                    g = (0, r.getOppositeAxis)(m),
                    p = f[g],
                    v = f[m];
                  if (u) {
                    let e = "y" === g ? "top" : "left",
                      t = "y" === g ? "bottom" : "right",
                      n = p + d[e],
                      o = p - d[t];
                    p = (0, r.clamp)(n, p, o);
                  }
                  if (s) {
                    let e = "y" === m ? "top" : "left",
                      t = "y" === m ? "bottom" : "right",
                      n = v + d[e],
                      o = v - d[t];
                    v = (0, r.clamp)(n, v, o);
                  }
                  let h = a.fn({ ...t, [g]: p, [m]: v });
                  return {
                    ...h,
                    data: {
                      x: h.x - n,
                      y: h.y - o,
                      enabled: { [g]: u, [m]: s },
                    },
                  };
                },
              }
            );
          },
          v = function (e) {
            return (
              void 0 === e && (e = {}),
              {
                options: e,
                fn(t) {
                  let {
                      x: n,
                      y: o,
                      placement: i,
                      rects: l,
                      middlewareData: u,
                    } = t,
                    {
                      offset: s = 0,
                      mainAxis: a = !0,
                      crossAxis: c = !0,
                    } = (0, r.evaluate)(e, t),
                    f = { x: n, y: o },
                    d = (0, r.getSideAxis)(i),
                    m = (0, r.getOppositeAxis)(d),
                    g = f[m],
                    p = f[d],
                    v = (0, r.evaluate)(s, t),
                    h =
                      "number" == typeof v
                        ? { mainAxis: v, crossAxis: 0 }
                        : { mainAxis: 0, crossAxis: 0, ...v };
                  if (a) {
                    let e = "y" === m ? "height" : "width",
                      t = l.reference[m] - l.floating[e] + h.mainAxis,
                      n = l.reference[m] + l.reference[e] - h.mainAxis;
                    g < t ? (g = t) : g > n && (g = n);
                  }
                  if (c) {
                    var y, b;
                    let e = "y" === m ? "width" : "height",
                      t = ["top", "left"].includes((0, r.getSide)(i)),
                      n =
                        l.reference[d] -
                        l.floating[e] +
                        ((t && (null == (y = u.offset) ? void 0 : y[d])) || 0) +
                        (t ? 0 : h.crossAxis),
                      o =
                        l.reference[d] +
                        l.reference[e] +
                        (t
                          ? 0
                          : (null == (b = u.offset) ? void 0 : b[d]) || 0) -
                        (t ? h.crossAxis : 0);
                    p < n ? (p = n) : p > o && (p = o);
                  }
                  return { [m]: g, [d]: p };
                },
              }
            );
          },
          h = function (e) {
            return (
              void 0 === e && (e = {}),
              {
                name: "size",
                options: e,
                async fn(t) {
                  var n, o;
                  let l,
                    u,
                    { placement: s, rects: a, platform: c, elements: f } = t,
                    { apply: d = () => {}, ...m } = (0, r.evaluate)(e, t),
                    g = await i(t, m),
                    p = (0, r.getSide)(s),
                    v = (0, r.getAlignment)(s),
                    h = "y" === (0, r.getSideAxis)(s),
                    { width: y, height: b } = a.floating;
                  "top" === p || "bottom" === p
                    ? ((l = p),
                      (u =
                        v ===
                        ((await (null == c.isRTL
                          ? void 0
                          : c.isRTL(f.floating)))
                          ? "start"
                          : "end")
                          ? "left"
                          : "right"))
                    : ((u = p), (l = "end" === v ? "top" : "bottom"));
                  let E = b - g.top - g.bottom,
                    x = y - g.left - g.right,
                    w = (0, r.min)(b - g[l], E),
                    R = (0, r.min)(y - g[u], x),
                    C = !t.middlewareData.shift,
                    S = w,
                    T = R;
                  if (
                    (null != (n = t.middlewareData.shift) &&
                      n.enabled.x &&
                      (T = x),
                    null != (o = t.middlewareData.shift) &&
                      o.enabled.y &&
                      (S = E),
                    C && !v)
                  ) {
                    let e = (0, r.max)(g.left, 0),
                      t = (0, r.max)(g.right, 0),
                      n = (0, r.max)(g.top, 0),
                      o = (0, r.max)(g.bottom, 0);
                    h
                      ? (T =
                          y -
                          2 *
                            (0 !== e || 0 !== t
                              ? e + t
                              : (0, r.max)(g.left, g.right)))
                      : (S =
                          b -
                          2 *
                            (0 !== n || 0 !== o
                              ? n + o
                              : (0, r.max)(g.top, g.bottom)));
                  }
                  await d({ ...t, availableWidth: T, availableHeight: S });
                  let L = await c.getDimensions(f.floating);
                  return y !== L.width || b !== L.height
                    ? { reset: { rects: !0 } }
                    : {};
                },
              }
            );
          };
      }
    },
    87360: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          arrow: () => L,
          autoPlacement: () => w,
          autoUpdate: () => y,
          computePosition: () => D,
          detectOverflow: () => E,
          flip: () => C,
          hide: () => T,
          inline: () => P,
          limitShift: () => k,
          offset: () => x,
          platform: () => b,
          shift: () => R,
          size: () => S,
        });
        var r = e.i(59692),
          o = e.i(33982),
          i = e.i(6307);
        function l(e) {
          let t = (0, i.getComputedStyle)(e),
            n = parseFloat(t.width) || 0,
            o = parseFloat(t.height) || 0,
            l = (0, i.isHTMLElement)(e),
            u = l ? e.offsetWidth : n,
            s = l ? e.offsetHeight : o,
            a = (0, r.round)(n) !== u || (0, r.round)(o) !== s;
          return a && ((n = u), (o = s)), { width: n, height: o, $: a };
        }
        function u(e) {
          return (0, i.isElement)(e) ? e : e.contextElement;
        }
        function s(e) {
          let t = u(e);
          if (!(0, i.isHTMLElement)(t)) return (0, r.createCoords)(1);
          let n = t.getBoundingClientRect(),
            { width: o, height: s, $: a } = l(t),
            c = (a ? (0, r.round)(n.width) : n.width) / o,
            f = (a ? (0, r.round)(n.height) : n.height) / s;
          return (
            (c && Number.isFinite(c)) || (c = 1),
            (f && Number.isFinite(f)) || (f = 1),
            { x: c, y: f }
          );
        }
        let t = (0, r.createCoords)(0);
        function a(e) {
          let n = (0, i.getWindow)(e);
          return (0, i.isWebKit)() && n.visualViewport
            ? { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop }
            : t;
        }
        function c(e, t, n, o) {
          var l;
          void 0 === t && (t = !1), void 0 === n && (n = !1);
          let c = e.getBoundingClientRect(),
            f = u(e),
            d = (0, r.createCoords)(1);
          t && (o ? (0, i.isElement)(o) && (d = s(o)) : (d = s(e)));
          let m = (void 0 === (l = n) && (l = !1),
            o && (!l || o === (0, i.getWindow)(f)) && l)
              ? a(f)
              : (0, r.createCoords)(0),
            g = (c.left + m.x) / d.x,
            p = (c.top + m.y) / d.y,
            v = c.width / d.x,
            h = c.height / d.y;
          if (f) {
            let e = (0, i.getWindow)(f),
              t = o && (0, i.isElement)(o) ? (0, i.getWindow)(o) : o,
              n = e,
              r = (0, i.getFrameElement)(n);
            for (; r && o && t !== n; ) {
              let e = s(r),
                t = r.getBoundingClientRect(),
                o = (0, i.getComputedStyle)(r),
                l = t.left + (r.clientLeft + parseFloat(o.paddingLeft)) * e.x,
                u = t.top + (r.clientTop + parseFloat(o.paddingTop)) * e.y;
              (g *= e.x),
                (p *= e.y),
                (v *= e.x),
                (h *= e.y),
                (g += l),
                (p += u),
                (n = (0, i.getWindow)(r)),
                (r = (0, i.getFrameElement)(n));
            }
          }
          return (0, r.rectToClientRect)({ width: v, height: h, x: g, y: p });
        }
        function f(e, t) {
          let n = (0, i.getNodeScroll)(e).scrollLeft;
          return t ? t.left + n : c((0, i.getDocumentElement)(e)).left + n;
        }
        function d(e, t, n) {
          void 0 === n && (n = !1);
          let r = e.getBoundingClientRect();
          return {
            x: r.left + t.scrollLeft - (n ? 0 : f(e, r)),
            y: r.top + t.scrollTop,
          };
        }
        function m(e, t, n) {
          let o;
          if ("viewport" === t)
            o = (function (e, t) {
              let n = (0, i.getWindow)(e),
                r = (0, i.getDocumentElement)(e),
                o = n.visualViewport,
                l = r.clientWidth,
                u = r.clientHeight,
                s = 0,
                a = 0;
              if (o) {
                (l = o.width), (u = o.height);
                let e = (0, i.isWebKit)();
                (!e || (e && "fixed" === t)) &&
                  ((s = o.offsetLeft), (a = o.offsetTop));
              }
              return { width: l, height: u, x: s, y: a };
            })(e, n);
          else if ("document" === t)
            o = (function (e) {
              let t = (0, i.getDocumentElement)(e),
                n = (0, i.getNodeScroll)(e),
                o = e.ownerDocument.body,
                l = (0, r.max)(
                  t.scrollWidth,
                  t.clientWidth,
                  o.scrollWidth,
                  o.clientWidth
                ),
                u = (0, r.max)(
                  t.scrollHeight,
                  t.clientHeight,
                  o.scrollHeight,
                  o.clientHeight
                ),
                s = -n.scrollLeft + f(e),
                a = -n.scrollTop;
              return (
                "rtl" === (0, i.getComputedStyle)(o).direction &&
                  (s += (0, r.max)(t.clientWidth, o.clientWidth) - l),
                { width: l, height: u, x: s, y: a }
              );
            })((0, i.getDocumentElement)(e));
          else if ((0, i.isElement)(t))
            o = (function (e, t) {
              let n = c(e, !0, "fixed" === t),
                o = n.top + e.clientTop,
                l = n.left + e.clientLeft,
                u = (0, i.isHTMLElement)(e) ? s(e) : (0, r.createCoords)(1),
                a = e.clientWidth * u.x,
                f = e.clientHeight * u.y;
              return { width: a, height: f, x: l * u.x, y: o * u.y };
            })(t, n);
          else {
            let n = a(e);
            o = {
              x: t.x - n.x,
              y: t.y - n.y,
              width: t.width,
              height: t.height,
            };
          }
          return (0, r.rectToClientRect)(o);
        }
        function g(e) {
          return "static" === (0, i.getComputedStyle)(e).position;
        }
        function p(e, t) {
          if (
            !(0, i.isHTMLElement)(e) ||
            "fixed" === (0, i.getComputedStyle)(e).position
          )
            return null;
          if (t) return t(e);
          let n = e.offsetParent;
          return (
            (0, i.getDocumentElement)(e) === n && (n = n.ownerDocument.body), n
          );
        }
        function v(e, t) {
          let n = (0, i.getWindow)(e);
          if ((0, i.isTopLayer)(e)) return n;
          if (!(0, i.isHTMLElement)(e)) {
            let t = (0, i.getParentNode)(e);
            for (; t && !(0, i.isLastTraversableNode)(t); ) {
              if ((0, i.isElement)(t) && !g(t)) return t;
              t = (0, i.getParentNode)(t);
            }
            return n;
          }
          let r = p(e, t);
          for (; r && (0, i.isTableElement)(r) && g(r); ) r = p(r, t);
          return r &&
            (0, i.isLastTraversableNode)(r) &&
            g(r) &&
            !(0, i.isContainingBlock)(r)
            ? n
            : r || (0, i.getContainingBlock)(e) || n;
        }
        let n = async function (e) {
            let t = this.getOffsetParent || v,
              n = this.getDimensions,
              o = await n(e.floating);
            return {
              reference: (function (e, t, n) {
                let o = (0, i.isHTMLElement)(t),
                  l = (0, i.getDocumentElement)(t),
                  u = "fixed" === n,
                  s = c(e, !0, u, t),
                  a = { scrollLeft: 0, scrollTop: 0 },
                  m = (0, r.createCoords)(0);
                if (o || (!o && !u))
                  if (
                    (("body" !== (0, i.getNodeName)(t) ||
                      (0, i.isOverflowElement)(l)) &&
                      (a = (0, i.getNodeScroll)(t)),
                    o)
                  ) {
                    let e = c(t, !0, u, t);
                    (m.x = e.x + t.clientLeft), (m.y = e.y + t.clientTop);
                  } else l && (m.x = f(l));
                let g = !l || o || u ? (0, r.createCoords)(0) : d(l, a);
                return {
                  x: s.left + a.scrollLeft - m.x - g.x,
                  y: s.top + a.scrollTop - m.y - g.y,
                  width: s.width,
                  height: s.height,
                };
              })(e.reference, await t(e.floating), e.strategy),
              floating: { x: 0, y: 0, width: o.width, height: o.height },
            };
          },
          b = {
            convertOffsetParentRelativeRectToViewportRelativeRect: function (
              e
            ) {
              let { elements: t, rect: n, offsetParent: o, strategy: l } = e,
                u = "fixed" === l,
                a = (0, i.getDocumentElement)(o),
                f = !!t && (0, i.isTopLayer)(t.floating);
              if (o === a || (f && u)) return n;
              let m = { scrollLeft: 0, scrollTop: 0 },
                g = (0, r.createCoords)(1),
                p = (0, r.createCoords)(0),
                v = (0, i.isHTMLElement)(o);
              if (
                (v || (!v && !u)) &&
                (("body" !== (0, i.getNodeName)(o) ||
                  (0, i.isOverflowElement)(a)) &&
                  (m = (0, i.getNodeScroll)(o)),
                (0, i.isHTMLElement)(o))
              ) {
                let e = c(o);
                (g = s(o)),
                  (p.x = e.x + o.clientLeft),
                  (p.y = e.y + o.clientTop);
              }
              let h = !a || v || u ? (0, r.createCoords)(0) : d(a, m, !0);
              return {
                width: n.width * g.x,
                height: n.height * g.y,
                x: n.x * g.x - m.scrollLeft * g.x + p.x + h.x,
                y: n.y * g.y - m.scrollTop * g.y + p.y + h.y,
              };
            },
            getDocumentElement: i.getDocumentElement,
            getClippingRect: function (e) {
              let { element: t, boundary: n, rootBoundary: o, strategy: l } = e,
                u = [
                  ...("clippingAncestors" === n
                    ? (0, i.isTopLayer)(t)
                      ? []
                      : (function (e, t) {
                          let n = t.get(e);
                          if (n) return n;
                          let r = (0, i.getOverflowAncestors)(e, [], !1).filter(
                              (e) =>
                                (0, i.isElement)(e) &&
                                "body" !== (0, i.getNodeName)(e)
                            ),
                            o = null,
                            l = "fixed" === (0, i.getComputedStyle)(e).position,
                            u = l ? (0, i.getParentNode)(e) : e;
                          for (
                            ;
                            (0, i.isElement)(u) &&
                            !(0, i.isLastTraversableNode)(u);

                          ) {
                            let t = (0, i.getComputedStyle)(u),
                              n = (0, i.isContainingBlock)(u);
                            n || "fixed" !== t.position || (o = null),
                              (
                                l
                                  ? !n && !o
                                  : (!n &&
                                      "static" === t.position &&
                                      !!o &&
                                      ["absolute", "fixed"].includes(
                                        o.position
                                      )) ||
                                    ((0, i.isOverflowElement)(u) &&
                                      !n &&
                                      (function e(t, n) {
                                        let r = (0, i.getParentNode)(t);
                                        return (
                                          !(
                                            r === n ||
                                            !(0, i.isElement)(r) ||
                                            (0, i.isLastTraversableNode)(r)
                                          ) &&
                                          ("fixed" ===
                                            (0, i.getComputedStyle)(r)
                                              .position ||
                                            e(r, n))
                                        );
                                      })(e, u))
                              )
                                ? (r = r.filter((e) => e !== u))
                                : (o = t),
                              (u = (0, i.getParentNode)(u));
                          }
                          return t.set(e, r), r;
                        })(t, this._c)
                    : [].concat(n)),
                  o,
                ],
                s = u[0],
                a = u.reduce((e, n) => {
                  let o = m(t, n, l);
                  return (
                    (e.top = (0, r.max)(o.top, e.top)),
                    (e.right = (0, r.min)(o.right, e.right)),
                    (e.bottom = (0, r.min)(o.bottom, e.bottom)),
                    (e.left = (0, r.max)(o.left, e.left)),
                    e
                  );
                }, m(t, s, l));
              return {
                width: a.right - a.left,
                height: a.bottom - a.top,
                x: a.left,
                y: a.top,
              };
            },
            getOffsetParent: v,
            getElementRects: n,
            getClientRects: function (e) {
              return Array.from(e.getClientRects());
            },
            getDimensions: function (e) {
              let { width: t, height: n } = l(e);
              return { width: t, height: n };
            },
            getScale: s,
            isElement: i.isElement,
            isRTL: function (e) {
              return "rtl" === (0, i.getComputedStyle)(e).direction;
            },
          };
        function h(e, t) {
          return (
            e.x === t.x &&
            e.y === t.y &&
            e.width === t.width &&
            e.height === t.height
          );
        }
        function y(e, t, n, o) {
          let l;
          void 0 === o && (o = {});
          let {
              ancestorScroll: s = !0,
              ancestorResize: a = !0,
              elementResize: f = "function" == typeof ResizeObserver,
              layoutShift: d = "function" == typeof IntersectionObserver,
              animationFrame: m = !1,
            } = o,
            g = u(e),
            p =
              s || a
                ? [
                    ...(g ? (0, i.getOverflowAncestors)(g) : []),
                    ...(0, i.getOverflowAncestors)(t),
                  ]
                : [];
          p.forEach((e) => {
            s && e.addEventListener("scroll", n, { passive: !0 }),
              a && e.addEventListener("resize", n);
          });
          let v =
              g && d
                ? (function (e, t) {
                    let n,
                      o = null,
                      l = (0, i.getDocumentElement)(e);
                    function u() {
                      var e;
                      clearTimeout(n),
                        null == (e = o) || e.disconnect(),
                        (o = null);
                    }
                    return (
                      !(function i(s, a) {
                        void 0 === s && (s = !1), void 0 === a && (a = 1), u();
                        let c = e.getBoundingClientRect(),
                          { left: f, top: d, width: m, height: g } = c;
                        if ((s || t(), !m || !g)) return;
                        let p = (0, r.floor)(d),
                          v = (0, r.floor)(l.clientWidth - (f + m)),
                          y = {
                            rootMargin:
                              -p +
                              "px " +
                              -v +
                              "px " +
                              -(0, r.floor)(l.clientHeight - (d + g)) +
                              "px " +
                              -(0, r.floor)(f) +
                              "px",
                            threshold: (0, r.max)(0, (0, r.min)(1, a)) || 1,
                          },
                          b = !0;
                        function E(t) {
                          let r = t[0].intersectionRatio;
                          if (r !== a) {
                            if (!b) return i();
                            r
                              ? i(!1, r)
                              : (n = setTimeout(() => {
                                  i(!1, 1e-7);
                                }, 1e3));
                          }
                          1 !== r || h(c, e.getBoundingClientRect()) || i(),
                            (b = !1);
                        }
                        try {
                          o = new IntersectionObserver(E, {
                            ...y,
                            root: l.ownerDocument,
                          });
                        } catch (e) {
                          o = new IntersectionObserver(E, y);
                        }
                        o.observe(e);
                      })(!0),
                      u
                    );
                  })(g, n)
                : null,
            y = -1,
            b = null;
          f &&
            ((b = new ResizeObserver((e) => {
              let [r] = e;
              r &&
                r.target === g &&
                b &&
                (b.unobserve(t),
                cancelAnimationFrame(y),
                (y = requestAnimationFrame(() => {
                  var e;
                  null == (e = b) || e.observe(t);
                }))),
                n();
            })),
            g && !m && b.observe(g),
            b.observe(t));
          let E = m ? c(e) : null;
          return (
            m &&
              (function t() {
                let r = c(e);
                E && !h(E, r) && n(), (E = r), (l = requestAnimationFrame(t));
              })(),
            n(),
            () => {
              var e;
              p.forEach((e) => {
                s && e.removeEventListener("scroll", n),
                  a && e.removeEventListener("resize", n);
              }),
                null == v || v(),
                null == (e = b) || e.disconnect(),
                (b = null),
                m && cancelAnimationFrame(l);
            }
          );
        }
        let E = o.detectOverflow,
          x = o.offset,
          w = o.autoPlacement,
          R = o.shift,
          C = o.flip,
          S = o.size,
          T = o.hide,
          L = o.arrow,
          P = o.inline,
          k = o.limitShift,
          D = (e, t, n) => {
            let r = new Map(),
              i = { platform: b, ...n },
              l = { ...i.platform, _c: r };
            return (0, o.computePosition)(e, t, { ...i, platform: l });
          };
      }
    },
    71334: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          arrow: () => b,
          autoPlacement: () => v,
          flip: () => g,
          hide: () => h,
          inline: () => y,
          limitShift: () => m,
          offset: () => n,
          shift: () => d,
          size: () => p,
          useFloating: () => f,
        });
        var r = e.i(87360),
          o = e.i(38653),
          i = e.i(95168),
          l = "undefined" != typeof document ? o.useLayoutEffect : o.useEffect;
        function u(e, t) {
          let n, r, o;
          if (e === t) return !0;
          if (typeof e != typeof t) return !1;
          if ("function" == typeof e && e.toString() === t.toString())
            return !0;
          if (e && t && "object" == typeof e) {
            if (Array.isArray(e)) {
              if ((n = e.length) !== t.length) return !1;
              for (r = n; 0 != r--; ) if (!u(e[r], t[r])) return !1;
              return !0;
            }
            if ((n = (o = Object.keys(e)).length) !== Object.keys(t).length)
              return !1;
            for (r = n; 0 != r--; )
              if (!{}.hasOwnProperty.call(t, o[r])) return !1;
            for (r = n; 0 != r--; ) {
              let n = o[r];
              if (("_owner" !== n || !e.$$typeof) && !u(e[n], t[n])) return !1;
            }
            return !0;
          }
          return e != e && t != t;
        }
        function s(e) {
          return "undefined" == typeof window
            ? 1
            : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
        }
        function a(e, t) {
          let n = s(e);
          return Math.round(t * n) / n;
        }
        function c(e) {
          let t = (0, o.useRef)(e);
          return (
            l(() => {
              t.current = e;
            }),
            t
          );
        }
        function f(e) {
          void 0 === e && (e = {});
          let {
              placement: t = "bottom",
              strategy: n = "absolute",
              middleware: f = [],
              platform: d,
              elements: { reference: m, floating: g } = {},
              transform: p = !0,
              whileElementsMounted: v,
              open: h,
            } = e,
            [y, b] = (0, o.useState)({
              x: 0,
              y: 0,
              strategy: n,
              placement: t,
              middlewareData: {},
              isPositioned: !1,
            }),
            [E, x] = (0, o.useState)(f);
          u(E, f) || x(f);
          let [w, R] = (0, o.useState)(null),
            [C, S] = (0, o.useState)(null),
            T = (0, o.useCallback)((e) => {
              e !== D.current && ((D.current = e), R(e));
            }, []),
            L = (0, o.useCallback)((e) => {
              e !== M.current && ((M.current = e), S(e));
            }, []),
            P = m || w,
            k = g || C,
            D = (0, o.useRef)(null),
            M = (0, o.useRef)(null),
            O = (0, o.useRef)(y),
            A = null != v,
            I = c(v),
            N = c(d),
            F = c(h),
            j = (0, o.useCallback)(() => {
              if (!D.current || !M.current) return;
              let e = { placement: t, strategy: n, middleware: E };
              N.current && (e.platform = N.current),
                (0, r.computePosition)(D.current, M.current, e).then((e) => {
                  let t = { ...e, isPositioned: !1 !== F.current };
                  H.current &&
                    !u(O.current, t) &&
                    ((O.current = t),
                    (0, i.flushSync)(() => {
                      b(t);
                    }));
                });
            }, [E, t, n, N, F]);
          l(() => {
            !1 === h &&
              O.current.isPositioned &&
              ((O.current.isPositioned = !1),
              b((e) => ({ ...e, isPositioned: !1 })));
          }, [h]);
          let H = (0, o.useRef)(!1);
          l(
            () => (
              (H.current = !0),
              () => {
                H.current = !1;
              }
            ),
            []
          ),
            l(() => {
              if ((P && (D.current = P), k && (M.current = k), P && k)) {
                if (I.current) return I.current(P, k, j);
                j();
              }
            }, [P, k, j, I, A]);
          let _ = (0, o.useMemo)(
              () => ({
                reference: D,
                floating: M,
                setReference: T,
                setFloating: L,
              }),
              [T, L]
            ),
            B = (0, o.useMemo)(() => ({ reference: P, floating: k }), [P, k]),
            W = (0, o.useMemo)(() => {
              let e = { position: n, left: 0, top: 0 };
              if (!B.floating) return e;
              let t = a(B.floating, y.x),
                r = a(B.floating, y.y);
              return p
                ? {
                    ...e,
                    transform: "translate(" + t + "px, " + r + "px)",
                    ...(s(B.floating) >= 1.5 && { willChange: "transform" }),
                  }
                : { position: n, left: t, top: r };
            }, [n, p, B.floating, y.x, y.y]);
          return (0, o.useMemo)(
            () => ({
              ...y,
              update: j,
              refs: _,
              elements: B,
              floatingStyles: W,
            }),
            [y, j, _, B, W]
          );
        }
        let t = (e) => ({
            name: "arrow",
            options: e,
            fn(t) {
              let { element: n, padding: o } =
                "function" == typeof e ? e(t) : e;
              return n && {}.hasOwnProperty.call(n, "current")
                ? null != n.current
                  ? (0, r.arrow)({ element: n.current, padding: o }).fn(t)
                  : {}
                : n
                ? (0, r.arrow)({ element: n, padding: o }).fn(t)
                : {};
            },
          }),
          n = (e, t) => ({ ...(0, r.offset)(e), options: [e, t] }),
          d = (e, t) => ({ ...(0, r.shift)(e), options: [e, t] }),
          m = (e, t) => ({ ...(0, r.limitShift)(e), options: [e, t] }),
          g = (e, t) => ({ ...(0, r.flip)(e), options: [e, t] }),
          p = (e, t) => ({ ...(0, r.size)(e), options: [e, t] }),
          v = (e, t) => ({ ...(0, r.autoPlacement)(e), options: [e, t] }),
          h = (e, t) => ({ ...(0, r.hide)(e), options: [e, t] }),
          y = (e, t) => ({ ...(0, r.inline)(e), options: [e, t] }),
          b = (e, n) => ({ ...t(e), options: [e, n] });
      }
    },
    4993: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          Composite: () => ex,
          CompositeItem: () => ew,
          FloatingArrow: () => eP,
          FloatingDelayGroup: () => T,
          FloatingFocusManager: () => H,
          FloatingList: () => g,
          FloatingNode: () => b,
          FloatingOverlay: () => e1,
          FloatingPortal: () => I,
          FloatingTree: () => E,
          NextFloatingDelayGroup: () => P,
          inner: () => e4,
          safePolygon: () => ef,
          useClick: () => W,
          useClientPoint: () => K,
          useDelayGroup: () => L,
          useDelayGroupContext: () => eF,
          useDismiss: () => z,
          useFloating: () => G,
          useFloatingNodeId: () => y,
          useFloatingParentNodeId: () => eM,
          useFloatingPortalNode: () => A,
          useFloatingRootContext: () => V,
          useFloatingTree: () => eO,
          useFocus: () => X,
          useHover: () => S,
          useId: () => eL,
          useInnerOffset: () => ea,
          useInteractions: () => $,
          useListItem: () => p,
          useListNavigation: () => en,
          useMergeRefs: () => d,
          useNextDelayGroup: () => k,
          useRole: () => er,
          useTransitionStatus: () => ei,
          useTransitionStyles: () => el,
          useTypeahead: () => eu,
        }),
          e.i(22271);
        var r = e.i(38653),
          o = e.i(6661),
          i = e.i(58064),
          l = e.i(6307),
          u = e.i(59782),
          s = e.i(95168),
          a = e.i(71334),
          c = e.i(87360),
          f = e.i(59692);
        function d(e) {
          let t = r.useRef(void 0),
            n = r.useCallback((t) => {
              let n = e.map((e) => {
                if (null != e) {
                  if ("function" == typeof e) {
                    let n = e(t);
                    return "function" == typeof n
                      ? n
                      : () => {
                          e(null);
                        };
                  }
                  return (
                    (e.current = t),
                    () => {
                      e.current = null;
                    }
                  );
                }
              });
              return () => {
                n.forEach((e) => (null == e ? void 0 : e()));
              };
            }, e);
          return r.useMemo(
            () =>
              e.every((e) => null == e)
                ? null
                : (e) => {
                    t.current && (t.current(), (t.current = void 0)),
                      null != e && (t.current = n(e));
                  },
            e
          );
        }
        function m(e, t) {
          let n = e.compareDocumentPosition(t);
          return n & Node.DOCUMENT_POSITION_FOLLOWING ||
            n & Node.DOCUMENT_POSITION_CONTAINED_BY
            ? -1
            : n & Node.DOCUMENT_POSITION_PRECEDING ||
              n & Node.DOCUMENT_POSITION_CONTAINS
            ? 1
            : 0;
        }
        let t = r.createContext({
          register: () => {},
          unregister: () => {},
          map: new Map(),
          elementsRef: { current: [] },
        });
        function g(e) {
          let { children: n, elementsRef: o, labelsRef: l } = e,
            [u, s] = r.useState(() => new Set()),
            a = r.useCallback((e) => {
              s((t) => new Set(t).add(e));
            }, []),
            c = r.useCallback((e) => {
              s((t) => {
                let n = new Set(t);
                return n.delete(e), n;
              });
            }, []),
            f = r.useMemo(() => {
              let e = new Map();
              return (
                Array.from(u.keys())
                  .sort(m)
                  .forEach((t, n) => {
                    e.set(t, n);
                  }),
                e
              );
            }, [u]);
          return (0, i.jsx)(t.Provider, {
            value: r.useMemo(
              () => ({
                register: a,
                unregister: c,
                map: f,
                elementsRef: o,
                labelsRef: l,
              }),
              [a, c, f, o, l]
            ),
            children: n,
          });
        }
        function p(e) {
          void 0 === e && (e = {});
          let { label: n } = e,
            {
              register: i,
              unregister: l,
              map: u,
              elementsRef: s,
              labelsRef: a,
            } = r.useContext(t),
            [c, f] = r.useState(null),
            d = r.useRef(null),
            m = r.useCallback(
              (e) => {
                if (((d.current = e), null !== c && ((s.current[c] = e), a))) {
                  var t;
                  let r = void 0 !== n;
                  a.current[c] = r
                    ? n
                    : null != (t = null == e ? void 0 : e.textContent)
                    ? t
                    : null;
                }
              },
              [c, s, a, n]
            );
          return (
            (0, o.useModernLayoutEffect)(() => {
              let e = d.current;
              if (e)
                return (
                  i(e),
                  () => {
                    l(e);
                  }
                );
            }, [i, l]),
            (0, o.useModernLayoutEffect)(() => {
              let e = d.current ? u.get(d.current) : null;
              null != e && f(e);
            }, [u]),
            r.useMemo(() => ({ ref: m, index: null == c ? -1 : c }), [c, m])
          );
        }
        let n = "active",
          ed = "selected",
          em = "ArrowLeft",
          eg = "ArrowRight",
          ep = "ArrowUp",
          ev = "ArrowDown";
        function v(e, t) {
          return "function" == typeof e
            ? e(t)
            : e
            ? r.cloneElement(e, t)
            : (0, i.jsx)("div", { ...t });
        }
        let eh = r.createContext({ activeIndex: 0, onNavigate: () => {} }),
          ey = [em, eg],
          eb = [ep, ev],
          eE = [...ey, ...eb],
          ex = r.forwardRef(function (e, t) {
            let {
                render: n,
                orientation: l = "both",
                loop: u = !0,
                rtl: s = !1,
                cols: a = 1,
                disabledIndices: c,
                activeIndex: f,
                onNavigate: d,
                itemSizes: m,
                dense: p = !1,
                ...h
              } = e,
              [y, b] = r.useState(0),
              E = null != f ? f : y,
              x = (0, o.useEffectEvent)(null != d ? d : b),
              w = r.useRef([]),
              R = n && "function" != typeof n ? n.props : {},
              C = r.useMemo(() => ({ activeIndex: E, onNavigate: x }), [E, x]),
              S = a > 1,
              T = {
                ...h,
                ...R,
                ref: t,
                "aria-orientation": "both" === l ? void 0 : l,
                onKeyDown(e) {
                  null == h.onKeyDown || h.onKeyDown(e),
                    null == R.onKeyDown || R.onKeyDown(e),
                    (function (e) {
                      if (!eE.includes(e.key)) return;
                      let t = E,
                        n = (0, o.getMinListIndex)(w, c),
                        r = (0, o.getMaxListIndex)(w, c),
                        i = s ? em : eg,
                        f = s ? eg : em;
                      if (S) {
                        let f =
                            m ||
                            Array.from({ length: w.current.length }, () => ({
                              width: 1,
                              height: 1,
                            })),
                          d = (0, o.createGridCellMap)(f, a, p),
                          g = d.findIndex(
                            (e) =>
                              null != e && !(0, o.isListIndexDisabled)(w, e, c)
                          ),
                          v = d.reduce(
                            (e, t, n) =>
                              null == t || (0, o.isListIndexDisabled)(w, t, c)
                                ? e
                                : n,
                            -1
                          ),
                          h =
                            d[
                              (0, o.getGridNavigatedIndex)(
                                {
                                  current: d.map((e) =>
                                    e ? w.current[e] : null
                                  ),
                                },
                                {
                                  event: e,
                                  orientation: l,
                                  loop: u,
                                  rtl: s,
                                  cols: a,
                                  disabledIndices: (0, o.getGridCellIndices)(
                                    [
                                      ...(c ||
                                        w.current.map((e, t) =>
                                          (0, o.isListIndexDisabled)(w, t)
                                            ? t
                                            : void 0
                                        )),
                                      void 0,
                                    ],
                                    d
                                  ),
                                  minIndex: g,
                                  maxIndex: v,
                                  prevIndex: (0, o.getGridCellIndexOfCorner)(
                                    E > r ? n : E,
                                    f,
                                    d,
                                    a,
                                    e.key === ev
                                      ? "bl"
                                      : e.key === i
                                      ? "tr"
                                      : "tl"
                                  ),
                                }
                              )
                            ];
                        null != h && (t = h);
                      }
                      let d = {
                          horizontal: [i],
                          vertical: [ev],
                          both: [i, ev],
                        }[l],
                        g = { horizontal: [f], vertical: [ep], both: [f, ep] }[
                          l
                        ],
                        v = S
                          ? eE
                          : { horizontal: ey, vertical: eb, both: eE }[l];
                      if (
                        (t === E &&
                          [...d, ...g].includes(e.key) &&
                          (t =
                            u && t === r && d.includes(e.key)
                              ? n
                              : u && t === n && g.includes(e.key)
                              ? r
                              : (0, o.findNonDisabledListIndex)(w, {
                                  startingIndex: t,
                                  decrement: g.includes(e.key),
                                  disabledIndices: c,
                                })),
                        t !== E && !(0, o.isIndexOutOfListBounds)(w, t))
                      ) {
                        var h;
                        e.stopPropagation(),
                          v.includes(e.key) && e.preventDefault(),
                          x(t),
                          null == (h = w.current[t]) || h.focus();
                      }
                    })(e);
                },
              };
            return (0,
            i.jsx)(eh.Provider, { value: C, children: (0, i.jsx)(g, { elementsRef: w, children: v(n, T) }) });
          }),
          ew = r.forwardRef(function (e, t) {
            let { render: n, ...o } = e,
              i = n && "function" != typeof n ? n.props : {},
              { activeIndex: l, onNavigate: u } = r.useContext(eh),
              { ref: s, index: a } = p(),
              c = d([s, t, i.ref]),
              f = l === a;
            return v(n, {
              ...o,
              ...i,
              ref: c,
              tabIndex: f ? 0 : -1,
              "data-active": f ? "" : void 0,
              onFocus(e) {
                null == o.onFocus || o.onFocus(e),
                  null == i.onFocus || i.onFocus(e),
                  u(a);
              },
            });
          }),
          eR = { ...r },
          eC = !1,
          eS = 0,
          eT = () =>
            "floating-ui-" + Math.random().toString(36).slice(2, 6) + eS++,
          eL =
            eR.useId ||
            function () {
              let [e, t] = r.useState(() => (eC ? eT() : void 0));
              return (
                (0, o.useModernLayoutEffect)(() => {
                  null == e && t(eT());
                }, []),
                r.useEffect(() => {
                  eC = !0;
                }, []),
                e
              );
            },
          eP = r.forwardRef(function (e, t) {
            let {
                context: {
                  placement: n,
                  elements: { floating: u },
                  middlewareData: { arrow: s, shift: a },
                },
                width: c = 14,
                height: f = 7,
                tipRadius: d = 0,
                strokeWidth: m = 0,
                staticOffset: g,
                stroke: p,
                d: v,
                style: { transform: h, ...y } = {},
                ...b
              } = e,
              E = eL(),
              [x, w] = r.useState(!1);
            if (
              ((0, o.useModernLayoutEffect)(() => {
                u && "rtl" === (0, l.getComputedStyle)(u).direction && w(!0);
              }, [u]),
              !u)
            )
              return null;
            let [R, C] = n.split("-"),
              S = "top" === R || "bottom" === R,
              T = g;
            ((S && null != a && a.x) || (!S && null != a && a.y)) && (T = null);
            let L = 2 * m,
              P = L / 2,
              k = (c / 2) * (-(d / 8) + 1),
              D = ((f / 2) * d) / 4,
              M = !!v,
              O = T && "end" === C ? "bottom" : "top",
              A = T && "end" === C ? "right" : "left";
            T && x && (A = "end" === C ? "left" : "right");
            let I = (null == s ? void 0 : s.x) != null ? T || s.x : "",
              N = (null == s ? void 0 : s.y) != null ? T || s.y : "",
              F =
                v ||
                "M0,0 H" +
                  c +
                  (" L" + (c - k)) +
                  "," +
                  (f - D) +
                  (" Q" + c / 2 + "," + f + " " + k) +
                  "," +
                  (f - D) +
                  " Z",
              j = {
                top: M ? "rotate(180deg)" : "",
                left: M ? "rotate(90deg)" : "rotate(-90deg)",
                bottom: M ? "" : "rotate(180deg)",
                right: M ? "rotate(-90deg)" : "rotate(90deg)",
              }[R];
            return (0,
            i.jsxs)("svg", { ...b, "aria-hidden": !0, ref: t, width: M ? c : c + L, height: c, viewBox: "0 0 " + c + " " + (f > c ? f : c), style: { position: "absolute", pointerEvents: "none", [A]: I, [O]: N, [R]: S || M ? "100%" : "calc(100% - " + L / 2 + "px)", transform: [j, h].filter((e) => !!e).join(" "), ...y }, children: [L > 0 && (0, i.jsx)("path", { clipPath: "url(#" + E + ")", fill: "none", stroke: p, strokeWidth: L + +!v, d: F }), (0, i.jsx)("path", { stroke: L && !v ? b.fill : "none", d: F }), (0, i.jsx)("clipPath", { id: E, children: (0, i.jsx)("rect", { x: -P, y: P * (M ? -1 : 1), width: c + L, height: c }) })] });
          });
        function h() {
          let e = new Map();
          return {
            emit(t, n) {
              var r;
              null == (r = e.get(t)) || r.forEach((e) => e(n));
            },
            on(t, n) {
              e.has(t) || e.set(t, new Set()), e.get(t).add(n);
            },
            off(t, n) {
              var r;
              null == (r = e.get(t)) || r.delete(n);
            },
          };
        }
        let ek = r.createContext(null),
          eD = r.createContext(null),
          eM = () => {
            var e;
            return (null == (e = r.useContext(ek)) ? void 0 : e.id) || null;
          },
          eO = () => r.useContext(eD);
        function y(e) {
          let t = eL(),
            n = eO(),
            r = eM(),
            i = e || r;
          return (
            (0, o.useModernLayoutEffect)(() => {
              if (!t) return;
              let e = { id: t, parentId: i };
              return (
                null == n || n.addNode(e),
                () => {
                  null == n || n.removeNode(e);
                }
              );
            }, [n, t, i]),
            t
          );
        }
        function b(e) {
          let { children: t, id: n } = e,
            o = eM();
          return (0, i.jsx)(ek.Provider, {
            value: r.useMemo(() => ({ id: n, parentId: o }), [n, o]),
            children: t,
          });
        }
        function E(e) {
          let { children: t } = e,
            n = r.useRef([]),
            o = r.useCallback((e) => {
              n.current = [...n.current, e];
            }, []),
            l = r.useCallback((e) => {
              n.current = n.current.filter((t) => t !== e);
            }, []),
            [u] = r.useState(() => h());
          return (0, i.jsx)(eD.Provider, {
            value: r.useMemo(
              () => ({ nodesRef: n, addNode: o, removeNode: l, events: u }),
              [o, l, u]
            ),
            children: t,
          });
        }
        function x(e) {
          return "data-floating-ui-" + e;
        }
        function w(e) {
          -1 !== e.current && (clearTimeout(e.current), (e.current = -1));
        }
        let eA = x("safe-polygon");
        function R(e, t, n) {
          if (n && !(0, o.isMouseLikePointerType)(n)) return 0;
          if ("number" == typeof e) return e;
          if ("function" == typeof e) {
            let n = e();
            return "number" == typeof n ? n : null == n ? void 0 : n[t];
          }
          return null == e ? void 0 : e[t];
        }
        function C(e) {
          return "function" == typeof e ? e() : e;
        }
        function S(e, t) {
          void 0 === t && (t = {});
          let {
              open: n,
              onOpenChange: i,
              dataRef: u,
              events: s,
              elements: a,
            } = e,
            {
              enabled: c = !0,
              delay: f = 0,
              handleClose: d = null,
              mouseOnly: m = !1,
              restMs: g = 0,
              move: p = !0,
            } = t,
            v = eO(),
            h = eM(),
            y = (0, o.useLatestRef)(d),
            b = (0, o.useLatestRef)(f),
            E = (0, o.useLatestRef)(n),
            x = (0, o.useLatestRef)(g),
            S = r.useRef(),
            T = r.useRef(-1),
            L = r.useRef(),
            P = r.useRef(-1),
            k = r.useRef(!0),
            D = r.useRef(!1),
            M = r.useRef(() => {}),
            O = r.useRef(!1),
            A = r.useCallback(() => {
              var e;
              let t = null == (e = u.current.openEvent) ? void 0 : e.type;
              return (
                (null == t ? void 0 : t.includes("mouse")) && "mousedown" !== t
              );
            }, [u]);
          r.useEffect(() => {
            if (c)
              return (
                s.on("openchange", e),
                () => {
                  s.off("openchange", e);
                }
              );
            function e(e) {
              let { open: t } = e;
              t || (w(T), w(P), (k.current = !0), (O.current = !1));
            }
          }, [c, s]),
            r.useEffect(() => {
              if (!c || !y.current || !n) return;
              function e(e) {
                A() && i(!1, e, "hover");
              }
              let t = (0, o.getDocument)(a.floating).documentElement;
              return (
                t.addEventListener("mouseleave", e),
                () => {
                  t.removeEventListener("mouseleave", e);
                }
              );
            }, [a.floating, n, i, c, y, A]);
          let I = r.useCallback(
              function (e, t, n) {
                void 0 === t && (t = !0), void 0 === n && (n = "hover");
                let r = R(b.current, "close", S.current);
                r && !L.current
                  ? (w(T),
                    (T.current = window.setTimeout(() => i(!1, e, n), r)))
                  : t && (w(T), i(!1, e, n));
              },
              [b, i]
            ),
            N = (0, o.useEffectEvent)(() => {
              M.current(), (L.current = void 0);
            }),
            F = (0, o.useEffectEvent)(() => {
              if (D.current) {
                let e = (0, o.getDocument)(a.floating).body;
                (e.style.pointerEvents = ""),
                  e.removeAttribute(eA),
                  (D.current = !1);
              }
            }),
            j = (0, o.useEffectEvent)(
              () =>
                !!u.current.openEvent &&
                ["click", "mousedown"].includes(u.current.openEvent.type)
            );
          r.useEffect(() => {
            if (c && (0, l.isElement)(a.domReference)) {
              let o = a.domReference,
                i = a.floating;
              return (
                n && o.addEventListener("mouseleave", r),
                p && o.addEventListener("mousemove", e, { once: !0 }),
                o.addEventListener("mouseenter", e),
                o.addEventListener("mouseleave", t),
                i &&
                  (i.addEventListener("mouseleave", r),
                  i.addEventListener("mouseenter", s),
                  i.addEventListener("mouseleave", f)),
                () => {
                  n && o.removeEventListener("mouseleave", r),
                    p && o.removeEventListener("mousemove", e),
                    o.removeEventListener("mouseenter", e),
                    o.removeEventListener("mouseleave", t),
                    i &&
                      (i.removeEventListener("mouseleave", r),
                      i.removeEventListener("mouseenter", s),
                      i.removeEventListener("mouseleave", f));
                }
              );
            }
            function e(e) {
              if (
                (w(T),
                (k.current = !1),
                (m && !(0, o.isMouseLikePointerType)(S.current)) ||
                  (C(x.current) > 0 && !R(b.current, "open")))
              )
                return;
              let t = R(b.current, "open", S.current);
              t
                ? (T.current = window.setTimeout(() => {
                    E.current || i(!0, e, "hover");
                  }, t))
                : n || i(!0, e, "hover");
            }
            function t(e) {
              if (j()) return void F();
              M.current();
              let t = (0, o.getDocument)(a.floating);
              if (
                (w(P), (O.current = !1), y.current && u.current.floatingContext)
              ) {
                n || w(T),
                  (L.current = y.current({
                    ...u.current.floatingContext,
                    tree: v,
                    x: e.clientX,
                    y: e.clientY,
                    onClose() {
                      F(), N(), j() || I(e, !0, "safe-polygon");
                    },
                  }));
                let r = L.current;
                t.addEventListener("mousemove", r),
                  (M.current = () => {
                    t.removeEventListener("mousemove", r);
                  });
                return;
              }
              ("touch" === S.current &&
                (0, o.contains)(a.floating, e.relatedTarget)) ||
                I(e);
            }
            function r(e) {
              !j() &&
                u.current.floatingContext &&
                (null == y.current ||
                  y.current({
                    ...u.current.floatingContext,
                    tree: v,
                    x: e.clientX,
                    y: e.clientY,
                    onClose() {
                      F(), N(), j() || I(e);
                    },
                  })(e));
            }
            function s() {
              w(T);
            }
            function f(e) {
              j() || I(e, !1);
            }
          }, [a, c, e, m, p, I, N, F, i, n, E, v, b, y, u, j, x]),
            (0, o.useModernLayoutEffect)(() => {
              var e, t;
              if (
                c &&
                n &&
                null != (e = y.current) &&
                e.__options.blockPointerEvents &&
                A()
              ) {
                D.current = !0;
                let e = a.floating;
                if ((0, l.isElement)(a.domReference) && e) {
                  let n = (0, o.getDocument)(a.floating).body;
                  n.setAttribute(eA, "");
                  let r = a.domReference,
                    i =
                      null == v ||
                      null ==
                        (t = v.nodesRef.current.find((e) => e.id === h)) ||
                      null == (t = t.context)
                        ? void 0
                        : t.elements.floating;
                  return (
                    i && (i.style.pointerEvents = ""),
                    (n.style.pointerEvents = "none"),
                    (r.style.pointerEvents = "auto"),
                    (e.style.pointerEvents = "auto"),
                    () => {
                      (n.style.pointerEvents = ""),
                        (r.style.pointerEvents = ""),
                        (e.style.pointerEvents = "");
                    }
                  );
                }
              }
            }, [c, n, h, a, v, y, A]),
            (0, o.useModernLayoutEffect)(() => {
              n || ((S.current = void 0), (O.current = !1), N(), F());
            }, [n, N, F]),
            r.useEffect(
              () => () => {
                N(), w(T), w(P), F();
              },
              [c, a.domReference, N, F]
            );
          let H = r.useMemo(() => {
            function e(e) {
              S.current = e.pointerType;
            }
            return {
              onPointerDown: e,
              onPointerEnter: e,
              onMouseMove(e) {
                let { nativeEvent: t } = e;
                function r() {
                  k.current || E.current || i(!0, t, "hover");
                }
                (!m || (0, o.isMouseLikePointerType)(S.current)) &&
                  !n &&
                  0 !== C(x.current) &&
                  ((O.current && e.movementX ** 2 + e.movementY ** 2 < 2) ||
                    (w(P),
                    "touch" === S.current
                      ? r()
                      : ((O.current = !0),
                        (P.current = window.setTimeout(r, C(x.current))))));
              },
            };
          }, [m, i, n, E, x]);
          return r.useMemo(() => (c ? { reference: H } : {}), [c, H]);
        }
        let eI = () => {},
          eN = r.createContext({
            delay: 0,
            initialDelay: 0,
            timeoutMs: 0,
            currentId: null,
            setCurrentId: eI,
            setState: eI,
            isInstantPhase: !1,
          }),
          eF = () => r.useContext(eN);
        function T(e) {
          let { children: t, delay: n, timeoutMs: l = 0 } = e,
            [u, s] = r.useReducer((e, t) => ({ ...e, ...t }), {
              delay: n,
              timeoutMs: l,
              initialDelay: n,
              currentId: null,
              isInstantPhase: !1,
            }),
            a = r.useRef(null),
            c = r.useCallback((e) => {
              s({ currentId: e });
            }, []);
          return (
            (0, o.useModernLayoutEffect)(() => {
              u.currentId
                ? null === a.current
                  ? (a.current = u.currentId)
                  : u.isInstantPhase || s({ isInstantPhase: !0 })
                : (u.isInstantPhase && s({ isInstantPhase: !1 }),
                  (a.current = null));
            }, [u.currentId, u.isInstantPhase]),
            (0, i.jsx)(eN.Provider, {
              value: r.useMemo(
                () => ({ ...u, setState: s, setCurrentId: c }),
                [u, c]
              ),
              children: t,
            })
          );
        }
        function L(e, t) {
          void 0 === t && (t = {});
          let { open: n, onOpenChange: r, floatingId: i } = e,
            { id: l, enabled: u = !0 } = t,
            s = null != l ? l : i,
            a = eF(),
            {
              currentId: c,
              setCurrentId: f,
              initialDelay: d,
              setState: m,
              timeoutMs: g,
            } = a;
          return (
            (0, o.useModernLayoutEffect)(() => {
              u &&
                c &&
                (m({ delay: { open: 1, close: R(d, "close") } }),
                c !== s && r(!1));
            }, [u, s, r, m, c, d]),
            (0, o.useModernLayoutEffect)(() => {
              function e() {
                r(!1), m({ delay: d, currentId: null });
              }
              if (u && c && !n && c === s) {
                if (g) {
                  let t = window.setTimeout(e, g);
                  return () => {
                    clearTimeout(t);
                  };
                }
                e();
              }
            }, [u, n, m, c, s, r, d, g]),
            (0, o.useModernLayoutEffect)(() => {
              u && f !== eI && n && f(s);
            }, [u, n, f, s]),
            a
          );
        }
        let ej = r.createContext({
          hasProvider: !1,
          timeoutMs: 0,
          delayRef: { current: 0 },
          initialDelayRef: { current: 0 },
          timeoutIdRef: { current: -1 },
          currentIdRef: { current: null },
          currentContextRef: { current: null },
        });
        function P(e) {
          let { children: t, delay: n, timeoutMs: o = 0 } = e,
            l = r.useRef(n),
            u = r.useRef(n),
            s = r.useRef(null),
            a = r.useRef(null),
            c = r.useRef(-1);
          return (0, i.jsx)(ej.Provider, {
            value: r.useMemo(
              () => ({
                hasProvider: !0,
                delayRef: l,
                initialDelayRef: u,
                currentIdRef: s,
                timeoutMs: o,
                currentContextRef: a,
                timeoutIdRef: c,
              }),
              [o]
            ),
            children: t,
          });
        }
        function k(e, t) {
          void 0 === t && (t = {});
          let { open: n, onOpenChange: i, floatingId: l } = e,
            { enabled: u = !0 } = t,
            {
              currentIdRef: s,
              delayRef: a,
              timeoutMs: c,
              initialDelayRef: f,
              currentContextRef: d,
              hasProvider: m,
              timeoutIdRef: g,
            } = r.useContext(ej),
            [p, v] = r.useState(!1);
          return (
            (0, o.useModernLayoutEffect)(() => {
              function e() {
                var e;
                v(!1),
                  null == (e = d.current) || e.setIsInstantPhase(!1),
                  (s.current = null),
                  (d.current = null),
                  (a.current = f.current);
              }
              if (u && s.current && !n && s.current === l) {
                if ((v(!1), c))
                  return (
                    (g.current = window.setTimeout(e, c)),
                    () => {
                      clearTimeout(g.current);
                    }
                  );
                e();
              }
            }, [u, n, l, s, a, c, f, d, g]),
            (0, o.useModernLayoutEffect)(() => {
              if (!u || !n) return;
              let e = d.current,
                t = s.current;
              (d.current = { onOpenChange: i, setIsInstantPhase: v }),
                (s.current = l),
                (a.current = { open: 0, close: R(f.current, "close") }),
                null !== t && t !== l
                  ? (w(g),
                    v(!0),
                    null == e || e.setIsInstantPhase(!0),
                    null == e || e.onOpenChange(!1))
                  : (v(!1), null == e || e.setIsInstantPhase(!1));
            }, [u, n, l, i, s, a, c, f, d, g]),
            (0, o.useModernLayoutEffect)(
              () => () => {
                d.current = null;
              },
              [d]
            ),
            r.useMemo(
              () => ({ hasProvider: m, delayRef: a, isInstantPhase: p }),
              [m, a, p]
            )
          );
        }
        let eH = 0;
        function D(e, t) {
          void 0 === t && (t = {});
          let {
            preventScroll: n = !1,
            cancelPrevious: r = !0,
            sync: o = !1,
          } = t;
          r && cancelAnimationFrame(eH);
          let i = () => (null == e ? void 0 : e.focus({ preventScroll: n }));
          o ? i() : (eH = requestAnimationFrame(i));
        }
        function M(e, t) {
          if (!e || !t) return !1;
          let n = null == t.getRootNode ? void 0 : t.getRootNode();
          if (e.contains(t)) return !0;
          if (n && (0, l.isShadowRoot)(n)) {
            let n = t;
            for (; n; ) {
              if (e === n) return !0;
              n = n.parentNode || n.host;
            }
          }
          return !1;
        }
        let e_ = new WeakMap(),
          eB = new WeakSet(),
          eW = {},
          eU = 0,
          eK = () =>
            "undefined" != typeof HTMLElement &&
            "inert" in HTMLElement.prototype,
          ez = (e) => e && (e.host || ez(e.parentNode)),
          eV = (e, t) =>
            t
              .map((t) => {
                if (e.contains(t)) return t;
                let n = ez(t);
                return e.contains(n) ? n : null;
              })
              .filter((e) => null != e);
        function O(e, t, n) {
          var r;
          void 0 === t && (t = !1), void 0 === n && (n = !1);
          let o = ((null == (r = e[0]) ? void 0 : r.ownerDocument) || document)
            .body;
          return (function (e, t, n, r) {
            let o = "data-floating-ui-inert",
              i = r ? "inert" : n ? "aria-hidden" : null,
              u = eV(t, e),
              s = new Set(),
              a = new Set(u),
              c = [];
            eW[o] || (eW[o] = new WeakMap());
            let f = eW[o];
            return (
              u.forEach(function e(t) {
                !(!t || s.has(t)) &&
                  (s.add(t), t.parentNode && e(t.parentNode));
              }),
              (function e(t) {
                !t ||
                  a.has(t) ||
                  [].forEach.call(t.children, (t) => {
                    if ("script" !== (0, l.getNodeName)(t))
                      if (s.has(t)) e(t);
                      else {
                        let e = i ? t.getAttribute(i) : null,
                          n = null !== e && "false" !== e,
                          r = e_.get(t) || 0,
                          l = i ? r + 1 : r,
                          u = (f.get(t) || 0) + 1;
                        e_.set(t, l),
                          f.set(t, u),
                          c.push(t),
                          1 === l && n && eB.add(t),
                          1 === u && t.setAttribute(o, ""),
                          !n &&
                            i &&
                            t.setAttribute(i, "inert" === i ? "" : "true");
                      }
                  });
              })(t),
              s.clear(),
              eU++,
              () => {
                c.forEach((e) => {
                  let t = e_.get(e) || 0,
                    n = i ? t - 1 : t,
                    r = (f.get(e) || 0) - 1;
                  e_.set(e, n),
                    f.set(e, r),
                    n ||
                      (!eB.has(e) && i && e.removeAttribute(i), eB.delete(e)),
                    r || e.removeAttribute(o);
                }),
                  --eU ||
                    ((e_ = new WeakMap()),
                    (e_ = new WeakMap()),
                    (eB = new WeakSet()),
                    (eW = {}));
              }
            );
          })(e.concat(Array.from(o.querySelectorAll("[aria-live]"))), o, t, n);
        }
        let eG = {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "fixed",
            whiteSpace: "nowrap",
            width: "1px",
            top: 0,
            left: 0,
          },
          eq = r.forwardRef(function (e, t) {
            let [n, l] = r.useState();
            (0, o.useModernLayoutEffect)(() => {
              (0, o.isSafari)() && l("button");
            }, []);
            let u = {
              ref: t,
              tabIndex: 0,
              role: n,
              "aria-hidden": !n || void 0,
              [x("focus-guard")]: "",
              style: eG,
            };
            return (0, i.jsx)("span", { ...e, ...u });
          }),
          eX = r.createContext(null),
          eY = x("portal");
        function A(e) {
          void 0 === e && (e = {});
          let { id: t, root: n } = e,
            i = eL(),
            u = e$(),
            [s, a] = r.useState(null),
            c = r.useRef(null);
          return (
            (0, o.useModernLayoutEffect)(
              () => () => {
                null == s || s.remove(),
                  queueMicrotask(() => {
                    c.current = null;
                  });
              },
              [s]
            ),
            (0, o.useModernLayoutEffect)(() => {
              if (!i || c.current) return;
              let e = t ? document.getElementById(t) : null;
              if (!e) return;
              let n = document.createElement("div");
              (n.id = i),
                n.setAttribute(eY, ""),
                e.appendChild(n),
                (c.current = n),
                a(n);
            }, [t, i]),
            (0, o.useModernLayoutEffect)(() => {
              if (null === n || !i || c.current) return;
              let e = n || (null == u ? void 0 : u.portalNode);
              e && !(0, l.isElement)(e) && (e = e.current),
                (e = e || document.body);
              let r = null;
              t &&
                (((r = document.createElement("div")).id = t),
                e.appendChild(r));
              let o = document.createElement("div");
              (o.id = i),
                o.setAttribute(eY, ""),
                (e = r || e).appendChild(o),
                (c.current = o),
                a(o);
            }, [t, n, i, u]),
            s
          );
        }
        function I(e) {
          let { children: t, id: n, root: l, preserveTabOrder: u = !0 } = e,
            a = A({ id: n, root: l }),
            [c, f] = r.useState(null),
            d = r.useRef(null),
            m = r.useRef(null),
            g = r.useRef(null),
            p = r.useRef(null),
            v = null == c ? void 0 : c.modal,
            h = null == c ? void 0 : c.open,
            y = !!c && !c.modal && c.open && u && !!(l || a);
          return (
            r.useEffect(() => {
              if (a && u && !v)
                return (
                  a.addEventListener("focusin", e, !0),
                  a.addEventListener("focusout", e, !0),
                  () => {
                    a.removeEventListener("focusin", e, !0),
                      a.removeEventListener("focusout", e, !0);
                  }
                );
              function e(e) {
                a &&
                  (0, o.isOutsideEvent)(e) &&
                  ("focusin" === e.type
                    ? o.enableFocusInside
                    : o.disableFocusInside)(a);
              }
            }, [a, u, v]),
            r.useEffect(() => {
              a && (h || (0, o.enableFocusInside)(a));
            }, [h, a]),
            (0, i.jsxs)(eX.Provider, {
              value: r.useMemo(
                () => ({
                  preserveTabOrder: u,
                  beforeOutsideRef: d,
                  afterOutsideRef: m,
                  beforeInsideRef: g,
                  afterInsideRef: p,
                  portalNode: a,
                  setFocusManagerState: f,
                }),
                [u, a]
              ),
              children: [
                y &&
                  a &&
                  (0, i.jsx)(eq, {
                    "data-type": "outside",
                    ref: d,
                    onFocus: (e) => {
                      if ((0, o.isOutsideEvent)(e, a)) {
                        var t;
                        null == (t = g.current) || t.focus();
                      } else {
                        let e = c ? c.domReference : null,
                          t = (0, o.getPreviousTabbable)(e);
                        null == t || t.focus();
                      }
                    },
                  }),
                y && a && (0, i.jsx)("span", { "aria-owns": a.id, style: eG }),
                a && (0, s.createPortal)(t, a),
                y &&
                  a &&
                  (0, i.jsx)(eq, {
                    "data-type": "outside",
                    ref: m,
                    onFocus: (e) => {
                      if ((0, o.isOutsideEvent)(e, a)) {
                        var t;
                        null == (t = p.current) || t.focus();
                      } else {
                        let t = c ? c.domReference : null,
                          n = (0, o.getNextTabbable)(t);
                        null == n || n.focus(),
                          (null == c ? void 0 : c.closeOnFocusOut) &&
                            (null == c ||
                              c.onOpenChange(!1, e.nativeEvent, "focus-out"));
                      }
                    },
                  }),
              ],
            })
          );
        }
        let e$ = () => r.useContext(eX);
        function N(e) {
          return r.useMemo(
            () => (t) => {
              e.forEach((e) => {
                e && (e.current = t);
              });
            },
            e
          );
        }
        let eJ = [];
        function F() {
          return eJ
            .slice()
            .reverse()
            .find((e) => e.isConnected);
        }
        function j(e, t) {
          var n;
          if (
            !t.current.includes("floating") &&
            !(null != (n = e.getAttribute("role")) && n.includes("dialog"))
          )
            return;
          let r = (0, o.getTabbableOptions)(),
            i = (0, u.focusable)(e, r).filter((e) => {
              let t = e.getAttribute("data-tabindex") || "";
              return (
                (0, u.isTabbable)(e, r) ||
                (e.hasAttribute("data-tabindex") && !t.startsWith("-"))
              );
            }),
            l = e.getAttribute("tabindex");
          t.current.includes("floating") || 0 === i.length
            ? "0" !== l && e.setAttribute("tabindex", "0")
            : ("-1" !== l ||
                (e.hasAttribute("data-tabindex") &&
                  "-1" !== e.getAttribute("data-tabindex"))) &&
              (e.setAttribute("tabindex", "-1"),
              e.setAttribute("data-tabindex", "-1"));
        }
        let eQ = r.forwardRef(function (e, t) {
          return (0,
          i.jsx)("button", { ...e, type: "button", ref: t, tabIndex: -1, style: eG });
        });
        function H(e) {
          let {
              context: t,
              children: n,
              disabled: s = !1,
              order: a = ["content"],
              guards: c = !0,
              initialFocus: f = 0,
              returnFocus: d = !0,
              restoreFocus: m = !1,
              modal: g = !0,
              visuallyHiddenDismiss: p = !1,
              closeOnFocusOut: v = !0,
              outsideElementsInert: h = !1,
              getInsideElements: y = () => [],
            } = e,
            {
              open: b,
              onOpenChange: E,
              events: w,
              dataRef: R,
              elements: { domReference: C, floating: S },
            } = t,
            T = (0, o.useEffectEvent)(() => {
              var e;
              return null == (e = R.current.floatingContext)
                ? void 0
                : e.nodeId;
            }),
            L = (0, o.useEffectEvent)(y),
            P = "number" == typeof f && f < 0,
            k = (0, o.isTypeableCombobox)(C) && P,
            M = eK(),
            A = !M || c,
            I = !A || (M && h),
            H = (0, o.useLatestRef)(a),
            _ = (0, o.useLatestRef)(f),
            B = (0, o.useLatestRef)(d),
            W = eO(),
            U = e$(),
            K = r.useRef(null),
            z = r.useRef(null),
            V = r.useRef(!1),
            G = r.useRef(!1),
            q = r.useRef(-1),
            X = null != U,
            Y = (0, o.getFloatingFocusElement)(S),
            $ = (0, o.useEffectEvent)(function (e) {
              return (
                void 0 === e && (e = Y),
                e ? (0, u.tabbable)(e, (0, o.getTabbableOptions)()) : []
              );
            }),
            J = (0, o.useEffectEvent)((e) => {
              let t = $(e);
              return H.current
                .map((e) =>
                  C && "reference" === e ? C : Y && "floating" === e ? Y : t
                )
                .filter(Boolean)
                .flat();
            });
          r.useEffect(() => {
            if (s || !g) return;
            function e(e) {
              if ("Tab" === e.key) {
                (0, o.contains)(
                  Y,
                  (0, o.activeElement)((0, o.getDocument)(Y))
                ) &&
                  0 === $().length &&
                  !k &&
                  (0, o.stopEvent)(e);
                let t = J(),
                  n = (0, o.getTarget)(e);
                "reference" === H.current[0] &&
                  n === C &&
                  ((0, o.stopEvent)(e),
                  e.shiftKey ? D(t[t.length - 1]) : D(t[1])),
                  "floating" === H.current[1] &&
                    n === Y &&
                    e.shiftKey &&
                    ((0, o.stopEvent)(e), D(t[0]));
              }
            }
            let t = (0, o.getDocument)(Y);
            return (
              t.addEventListener("keydown", e),
              () => {
                t.removeEventListener("keydown", e);
              }
            );
          }, [s, C, Y, g, H, k, $, J]),
            r.useEffect(() => {
              if (!s && S)
                return (
                  S.addEventListener("focusin", e),
                  () => {
                    S.removeEventListener("focusin", e);
                  }
                );
              function e(e) {
                let t = (0, o.getTarget)(e),
                  n = $().indexOf(t);
                -1 !== n && (q.current = n);
              }
            }, [s, S, $]),
            r.useEffect(() => {
              if (!s && v && S && (0, l.isHTMLElement)(C))
                return (
                  C.addEventListener("focusout", t),
                  C.addEventListener("pointerdown", e),
                  S.addEventListener("focusout", t),
                  () => {
                    C.removeEventListener("focusout", t),
                      C.removeEventListener("pointerdown", e),
                      S.removeEventListener("focusout", t);
                  }
                );
              function e() {
                (G.current = !0),
                  setTimeout(() => {
                    G.current = !1;
                  });
              }
              function t(e) {
                let t = e.relatedTarget,
                  n = e.currentTarget;
                queueMicrotask(() => {
                  let r = T(),
                    i = !(
                      (0, o.contains)(C, t) ||
                      (0, o.contains)(S, t) ||
                      (0, o.contains)(t, S) ||
                      (0, o.contains)(null == U ? void 0 : U.portalNode, t) ||
                      (null != t && t.hasAttribute(x("focus-guard"))) ||
                      (W &&
                        ((0, o.getNodeChildren)(W.nodesRef.current, r).find(
                          (e) => {
                            var n, r;
                            return (
                              (0, o.contains)(
                                null == (n = e.context)
                                  ? void 0
                                  : n.elements.floating,
                                t
                              ) ||
                              (0, o.contains)(
                                null == (r = e.context)
                                  ? void 0
                                  : r.elements.domReference,
                                t
                              )
                            );
                          }
                        ) ||
                          (0, o.getNodeAncestors)(W.nodesRef.current, r).find(
                            (e) => {
                              var n, r, i;
                              return (
                                [
                                  null == (n = e.context)
                                    ? void 0
                                    : n.elements.floating,
                                  (0, o.getFloatingFocusElement)(
                                    null == (r = e.context)
                                      ? void 0
                                      : r.elements.floating
                                  ),
                                ].includes(t) ||
                                (null == (i = e.context)
                                  ? void 0
                                  : i.elements.domReference) === t
                              );
                            }
                          )))
                    );
                  if (
                    (n === C && Y && j(Y, H),
                    m &&
                      i &&
                      (0, o.activeElement)((0, o.getDocument)(Y)) ===
                        (0, o.getDocument)(Y).body)
                  ) {
                    (0, l.isHTMLElement)(Y) && Y.focus();
                    let e = q.current,
                      t = $(),
                      n = t[e] || t[t.length - 1] || Y;
                    (0, l.isHTMLElement)(n) && n.focus();
                  }
                  (k || !g) &&
                    t &&
                    i &&
                    !G.current &&
                    t !== F() &&
                    ((V.current = !0), E(!1, e, "focus-out"));
                });
              }
            }, [s, C, S, Y, g, W, U, E, v, m, $, k, T, H]);
          let Q = r.useRef(null),
            Z = r.useRef(null),
            ee = N([Q, null == U ? void 0 : U.beforeInsideRef]),
            et = N([Z, null == U ? void 0 : U.afterInsideRef]);
          function en(e) {
            return !s && p && g
              ? (0, i.jsx)(eQ, {
                  ref: "start" === e ? K : z,
                  onClick: (e) => E(!1, e.nativeEvent),
                  children: "string" == typeof p ? p : "Dismiss",
                })
              : null;
          }
          r.useEffect(() => {
            var e, t;
            if (s || !S) return;
            let n = Array.from(
                (null == U || null == (e = U.portalNode)
                  ? void 0
                  : e.querySelectorAll("[" + x("portal") + "]")) || []
              ),
              r = W ? (0, o.getNodeAncestors)(W.nodesRef.current, T()) : [],
              i =
                W && !g
                  ? r.map((e) => {
                      var t;
                      return null == (t = e.context)
                        ? void 0
                        : t.elements.floating;
                    })
                  : [],
              l = [
                S,
                null ==
                  (t = r.find((e) => {
                    var t;
                    return (0, o.isTypeableCombobox)(
                      (null == (t = e.context)
                        ? void 0
                        : t.elements.domReference) || null
                    );
                  })) || null == (t = t.context)
                  ? void 0
                  : t.elements.domReference,
                ...n,
                ...i,
                ...L(),
                K.current,
                z.current,
                Q.current,
                Z.current,
                null == U ? void 0 : U.beforeOutsideRef.current,
                null == U ? void 0 : U.afterOutsideRef.current,
                H.current.includes("reference") || k ? C : null,
              ].filter((e) => null != e),
              u = g || k ? O(l, !I, I) : O(l);
            return () => {
              u();
            };
          }, [s, C, S, g, H, U, k, A, I, W, T, L]),
            (0, o.useModernLayoutEffect)(() => {
              if (s || !(0, l.isHTMLElement)(Y)) return;
              let e = (0, o.getDocument)(Y),
                t = (0, o.activeElement)(e);
              queueMicrotask(() => {
                let e = J(Y),
                  n = _.current,
                  r = ("number" == typeof n ? e[n] : n.current) || Y,
                  i = (0, o.contains)(Y, t);
                P || i || !b || D(r, { preventScroll: r === Y });
              });
            }, [s, b, Y, P, J, _]),
            (0, o.useModernLayoutEffect)(() => {
              var e;
              if (s || !Y) return;
              let t = !1,
                n = (0, o.getDocument)(Y);
              function r(e) {
                let { reason: n, event: r, nested: i } = e;
                if (
                  (["hover", "safe-polygon"].includes(n) &&
                    "mouseleave" === r.type &&
                    (V.current = !0),
                  "outside-press" === n)
                )
                  if (i) (V.current = !1), (t = !0);
                  else if (
                    (0, o.isVirtualClick)(r) ||
                    (0, o.isVirtualPointerEvent)(r)
                  )
                    V.current = !1;
                  else {
                    let e = !1;
                    document.createElement("div").focus({
                      get preventScroll() {
                        return (e = !0), !1;
                      },
                    }),
                      e ? ((V.current = !1), (t = !0)) : (V.current = !0);
                  }
              }
              (e = (0, o.activeElement)(n)),
                (eJ = eJ.filter((e) => e.isConnected)),
                e &&
                  "body" !== (0, l.getNodeName)(e) &&
                  (eJ.push(e), eJ.length > 20 && (eJ = eJ.slice(-20))),
                w.on("openchange", r);
              let i = n.createElement("span");
              return (
                i.setAttribute("tabindex", "-1"),
                i.setAttribute("aria-hidden", "true"),
                Object.assign(i.style, eG),
                X && C && C.insertAdjacentElement("afterend", i),
                () => {
                  w.off("openchange", r);
                  let e = (0, o.activeElement)(n),
                    s =
                      (0, o.contains)(S, e) ||
                      (W &&
                        (0, o.getNodeChildren)(W.nodesRef.current, T()).some(
                          (t) => {
                            var n;
                            return (0, o.contains)(
                              null == (n = t.context)
                                ? void 0
                                : n.elements.floating,
                              e
                            );
                          }
                        )),
                    a = (function () {
                      if ("boolean" == typeof B.current) {
                        let e = C || F();
                        return e && e.isConnected ? e : i;
                      }
                      return B.current.current || i;
                    })();
                  queueMicrotask(() => {
                    let r = (function (e) {
                      let t = (0, o.getTabbableOptions)();
                      return (0, u.isTabbable)(e, t)
                        ? e
                        : (0, u.tabbable)(e, t)[0] || e;
                    })(a);
                    B.current &&
                      !V.current &&
                      (0, l.isHTMLElement)(r) &&
                      (r === e || e === n.body || s) &&
                      r.focus({ preventScroll: t }),
                      i.remove();
                  });
                }
              );
            }, [s, S, Y, B, R, w, W, X, C, T]),
            r.useEffect(() => {
              queueMicrotask(() => {
                V.current = !1;
              });
            }, [s]),
            (0, o.useModernLayoutEffect)(() => {
              if (!s && U)
                return (
                  U.setFocusManagerState({
                    modal: g,
                    closeOnFocusOut: v,
                    open: b,
                    onOpenChange: E,
                    domReference: C,
                  }),
                  () => {
                    U.setFocusManagerState(null);
                  }
                );
            }, [s, U, g, b, E, v, C]),
            (0, o.useModernLayoutEffect)(() => {
              !s && Y && j(Y, H);
            }, [s, Y, H]);
          let er = !s && A && (!g || !k) && (X || g);
          return (0, i.jsxs)(i.Fragment, {
            children: [
              er &&
                (0, i.jsx)(eq, {
                  "data-type": "inside",
                  ref: ee,
                  onFocus: (e) => {
                    if (g) {
                      let e = J();
                      D("reference" === a[0] ? e[0] : e[e.length - 1]);
                    } else if (null != U && U.preserveTabOrder && U.portalNode)
                      if (
                        ((V.current = !1),
                        (0, o.isOutsideEvent)(e, U.portalNode))
                      ) {
                        let e = (0, o.getNextTabbable)(C);
                        null == e || e.focus();
                      } else {
                        var t;
                        null == (t = U.beforeOutsideRef.current) || t.focus();
                      }
                  },
                }),
              !k && en("start"),
              n,
              en("end"),
              er &&
                (0, i.jsx)(eq, {
                  "data-type": "inside",
                  ref: et,
                  onFocus: (e) => {
                    if (g) D(J()[0]);
                    else if (null != U && U.preserveTabOrder && U.portalNode)
                      if (
                        (v && (V.current = !0),
                        (0, o.isOutsideEvent)(e, U.portalNode))
                      ) {
                        let e = (0, o.getPreviousTabbable)(C);
                        null == e || e.focus();
                      } else {
                        var t;
                        null == (t = U.afterOutsideRef.current) || t.focus();
                      }
                  },
                }),
            ],
          });
        }
        let eZ = 0,
          e0 = () => {},
          e1 = r.forwardRef(function (e, t) {
            let { lockScroll: n = !1, ...r } = e;
            return (
              (0, o.useModernLayoutEffect)(() => {
                if (n)
                  return (
                    1 == ++eZ &&
                      (e0 = (function () {
                        let e = /iP(hone|ad|od)|iOS/.test((0, o.getPlatform)()),
                          t = document.body.style,
                          n =
                            Math.round(
                              document.documentElement.getBoundingClientRect()
                                .left
                            ) + document.documentElement.scrollLeft
                              ? "paddingLeft"
                              : "paddingRight",
                          r =
                            window.innerWidth -
                            document.documentElement.clientWidth,
                          i = t.left ? parseFloat(t.left) : window.scrollX,
                          l = t.top ? parseFloat(t.top) : window.scrollY;
                        if (
                          ((t.overflow = "hidden"), r && (t[n] = r + "px"), e)
                        ) {
                          var u, s;
                          let e =
                            (null == (u = window.visualViewport)
                              ? void 0
                              : u.offsetLeft) || 0;
                          Object.assign(t, {
                            position: "fixed",
                            top:
                              -(
                                l -
                                Math.floor(
                                  (null == (s = window.visualViewport)
                                    ? void 0
                                    : s.offsetTop) || 0
                                )
                              ) + "px",
                            left: -(i - Math.floor(e)) + "px",
                            right: "0",
                          });
                        }
                        return () => {
                          Object.assign(t, { overflow: "", [n]: "" }),
                            e &&
                              (Object.assign(t, {
                                position: "",
                                top: "",
                                left: "",
                                right: "",
                              }),
                              window.scrollTo(i, l));
                        };
                      })()),
                    () => {
                      0 == --eZ && e0();
                    }
                  );
              }, [n]),
              (0, i.jsx)("div", {
                ref: t,
                ...r,
                style: {
                  position: "fixed",
                  overflow: "auto",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  ...r.style,
                },
              })
            );
          });
        function _(e) {
          return (
            (0, l.isHTMLElement)(e.target) && "BUTTON" === e.target.tagName
          );
        }
        function B(e) {
          return (0, o.isTypeableElement)(e);
        }
        function W(e, t) {
          void 0 === t && (t = {});
          let {
              open: n,
              onOpenChange: i,
              dataRef: u,
              elements: { domReference: s },
            } = e,
            {
              enabled: a = !0,
              event: c = "click",
              toggle: f = !0,
              ignoreMouse: d = !1,
              keyboardHandlers: m = !0,
              stickIfOpen: g = !0,
            } = t,
            p = r.useRef(),
            v = r.useRef(!1),
            h = r.useMemo(
              () => ({
                onPointerDown(e) {
                  p.current = e.pointerType;
                },
                onMouseDown(e) {
                  let t = p.current;
                  0 === e.button &&
                    "click" !== c &&
                    (((0, o.isMouseLikePointerType)(t, !0) && d) ||
                      (n &&
                      f &&
                      (!u.current.openEvent ||
                        !g ||
                        "mousedown" === u.current.openEvent.type)
                        ? i(!1, e.nativeEvent, "click")
                        : (e.preventDefault(), i(!0, e.nativeEvent, "click"))));
                },
                onClick(e) {
                  let t = p.current;
                  if ("mousedown" === c && p.current) {
                    p.current = void 0;
                    return;
                  }
                  ((0, o.isMouseLikePointerType)(t, !0) && d) ||
                    (n &&
                    f &&
                    (!u.current.openEvent ||
                      !g ||
                      "click" === u.current.openEvent.type)
                      ? i(!1, e.nativeEvent, "click")
                      : i(!0, e.nativeEvent, "click"));
                },
                onKeyDown(e) {
                  (p.current = void 0),
                    !(e.defaultPrevented || !m || _(e)) &&
                      (" " !== e.key ||
                        B(s) ||
                        (e.preventDefault(), (v.current = !0)),
                      ((0, l.isHTMLElement)(e.target) &&
                        "A" === e.target.tagName) ||
                        "Enter" !== e.key ||
                        (n && f
                          ? i(!1, e.nativeEvent, "click")
                          : i(!0, e.nativeEvent, "click")));
                },
                onKeyUp(e) {
                  !(e.defaultPrevented || !m || _(e) || B(s)) &&
                    " " === e.key &&
                    v.current &&
                    ((v.current = !1),
                    n && f
                      ? i(!1, e.nativeEvent, "click")
                      : i(!0, e.nativeEvent, "click"));
                },
              }),
              [u, s, c, d, m, i, n, g, f]
            );
          return r.useMemo(() => (a ? { reference: h } : {}), [a, h]);
        }
        function U(e) {
          return null != e && null != e.clientX;
        }
        function K(e, t) {
          void 0 === t && (t = {});
          let {
              open: n,
              dataRef: i,
              elements: { floating: u, domReference: s },
              refs: a,
            } = e,
            { enabled: c = !0, axis: f = "both", x: d = null, y: m = null } = t,
            g = r.useRef(!1),
            p = r.useRef(null),
            [v, h] = r.useState(),
            [y, b] = r.useState([]),
            E = (0, o.useEffectEvent)((e, t) => {
              if (
                !g.current &&
                (!i.current.openEvent || U(i.current.openEvent))
              ) {
                var n;
                let r, o, l;
                a.setPositionReference(
                  ((n = { x: e, y: t, axis: f, dataRef: i, pointerType: v }),
                  (r = null),
                  (o = null),
                  (l = !1),
                  {
                    contextElement: s || void 0,
                    getBoundingClientRect() {
                      var e;
                      let t = (null == s
                          ? void 0
                          : s.getBoundingClientRect()) || {
                          width: 0,
                          height: 0,
                          x: 0,
                          y: 0,
                        },
                        i = "x" === n.axis || "both" === n.axis,
                        u = "y" === n.axis || "both" === n.axis,
                        a =
                          ["mouseenter", "mousemove"].includes(
                            (null == (e = n.dataRef.current.openEvent)
                              ? void 0
                              : e.type) || ""
                          ) && "touch" !== n.pointerType,
                        c = t.width,
                        f = t.height,
                        d = t.x,
                        m = t.y;
                      return (
                        null == r && n.x && i && (r = t.x - n.x),
                        null == o && n.y && u && (o = t.y - n.y),
                        (d -= r || 0),
                        (m -= o || 0),
                        (c = 0),
                        (f = 0),
                        !l || a
                          ? ((c = "y" === n.axis ? t.width : 0),
                            (f = "x" === n.axis ? t.height : 0),
                            (d = i && null != n.x ? n.x : d),
                            (m = u && null != n.y ? n.y : m))
                          : l &&
                            !a &&
                            ((f = "x" === n.axis ? t.height : f),
                            (c = "y" === n.axis ? t.width : c)),
                        (l = !0),
                        {
                          width: c,
                          height: f,
                          x: d,
                          y: m,
                          top: m,
                          right: d + c,
                          bottom: m + f,
                          left: d,
                        }
                      );
                    },
                  })
                );
              }
            }),
            x = (0, o.useEffectEvent)((e) => {
              null == d &&
                null == m &&
                (n ? p.current || b([]) : E(e.clientX, e.clientY));
            }),
            w = (0, o.isMouseLikePointerType)(v) ? u : n,
            R = r.useCallback(() => {
              if (!w || !c || null != d || null != m) return;
              let e = (0, l.getWindow)(u);
              function t(n) {
                let r = (0, o.getTarget)(n);
                (0, o.contains)(u, r)
                  ? (e.removeEventListener("mousemove", t), (p.current = null))
                  : E(n.clientX, n.clientY);
              }
              if (!i.current.openEvent || U(i.current.openEvent)) {
                e.addEventListener("mousemove", t);
                let n = () => {
                  e.removeEventListener("mousemove", t), (p.current = null);
                };
                return (p.current = n), n;
              }
              a.setPositionReference(s);
            }, [w, c, d, m, u, i, a, s, E]);
          r.useEffect(() => R(), [R, y]),
            r.useEffect(() => {
              c && !u && (g.current = !1);
            }, [c, u]),
            r.useEffect(() => {
              !c && n && (g.current = !0);
            }, [c, n]),
            (0, o.useModernLayoutEffect)(() => {
              c && (null != d || null != m) && ((g.current = !1), E(d, m));
            }, [c, d, m, E]);
          let C = r.useMemo(() => {
            function e(e) {
              let { pointerType: t } = e;
              h(t);
            }
            return {
              onPointerDown: e,
              onPointerEnter: e,
              onMouseMove: x,
              onMouseEnter: x,
            };
          }, [x]);
          return r.useMemo(() => (c ? { reference: C } : {}), [c, C]);
        }
        let e2 = {
            pointerdown: "onPointerDown",
            mousedown: "onMouseDown",
            click: "onClick",
          },
          e3 = {
            pointerdown: "onPointerDownCapture",
            mousedown: "onMouseDownCapture",
            click: "onClickCapture",
          },
          e5 = (e) => {
            var t, n;
            return {
              escapeKey:
                "boolean" == typeof e
                  ? e
                  : null != (t = null == e ? void 0 : e.escapeKey) && t,
              outsidePress:
                "boolean" == typeof e
                  ? e
                  : null == (n = null == e ? void 0 : e.outsidePress) || n,
            };
          };
        function z(e, t) {
          void 0 === t && (t = {});
          let { open: n, onOpenChange: i, elements: u, dataRef: s } = e,
            {
              enabled: a = !0,
              escapeKey: c = !0,
              outsidePress: f = !0,
              outsidePressEvent: d = "pointerdown",
              referencePress: m = !1,
              referencePressEvent: g = "pointerdown",
              ancestorScroll: p = !1,
              bubbles: v,
              capture: h,
            } = t,
            y = eO(),
            b = (0, o.useEffectEvent)("function" == typeof f ? f : () => !1),
            E = "function" == typeof f ? b : f,
            w = r.useRef(!1),
            R = r.useRef(!1),
            { escapeKey: C, outsidePress: S } = e5(v),
            { escapeKey: T, outsidePress: L } = e5(h),
            P = r.useRef(!1),
            k = (0, o.useEffectEvent)((e) => {
              var t;
              if (!n || !a || !c || "Escape" !== e.key || P.current) return;
              let r =
                  null == (t = s.current.floatingContext) ? void 0 : t.nodeId,
                l = y ? (0, o.getNodeChildren)(y.nodesRef.current, r) : [];
              if (!C && (e.stopPropagation(), l.length > 0)) {
                let e = !0;
                if (
                  (l.forEach((t) => {
                    var n;
                    if (
                      null != (n = t.context) &&
                      n.open &&
                      !t.context.dataRef.current.__escapeKeyBubbles
                    ) {
                      e = !1;
                      return;
                    }
                  }),
                  !e)
                )
                  return;
              }
              i(!1, (0, o.isReactEvent)(e) ? e.nativeEvent : e, "escape-key");
            }),
            D = (0, o.useEffectEvent)((e) => {
              var t;
              let n = () => {
                var t;
                k(e),
                  null == (t = (0, o.getTarget)(e)) ||
                    t.removeEventListener("keydown", n);
              };
              null == (t = (0, o.getTarget)(e)) ||
                t.addEventListener("keydown", n);
            }),
            M = (0, o.useEffectEvent)((e) => {
              var t;
              let n = w.current;
              w.current = !1;
              let r = R.current;
              if (
                ((R.current = !1),
                ("click" === d && r) || n || ("function" == typeof E && !E(e)))
              )
                return;
              let a = (0, o.getTarget)(e),
                c = "[" + x("inert") + "]",
                f = (0, o.getDocument)(u.floating).querySelectorAll(c),
                m = (0, l.isElement)(a) ? a : null;
              for (; m && !(0, l.isLastTraversableNode)(m); ) {
                let e = (0, l.getParentNode)(m);
                if ((0, l.isLastTraversableNode)(e) || !(0, l.isElement)(e))
                  break;
                m = e;
              }
              if (
                f.length &&
                (0, l.isElement)(a) &&
                !(0, o.isRootElement)(a) &&
                !(0, o.contains)(a, u.floating) &&
                Array.from(f).every((e) => !(0, o.contains)(m, e))
              )
                return;
              if ((0, l.isHTMLElement)(a) && I) {
                let t = (0, l.isLastTraversableNode)(a),
                  n = (0, l.getComputedStyle)(a),
                  r = /auto|scroll/,
                  o = t || r.test(n.overflowX),
                  i = t || r.test(n.overflowY),
                  u = o && a.clientWidth > 0 && a.scrollWidth > a.clientWidth,
                  s =
                    i && a.clientHeight > 0 && a.scrollHeight > a.clientHeight,
                  c = "rtl" === n.direction,
                  f =
                    s &&
                    (c
                      ? e.offsetX <= a.offsetWidth - a.clientWidth
                      : e.offsetX > a.clientWidth),
                  d = u && e.offsetY > a.clientHeight;
                if (f || d) return;
              }
              let g =
                  null == (t = s.current.floatingContext) ? void 0 : t.nodeId,
                p =
                  y &&
                  (0, o.getNodeChildren)(y.nodesRef.current, g).some((t) => {
                    var n;
                    return (0, o.isEventTargetWithin)(
                      e,
                      null == (n = t.context) ? void 0 : n.elements.floating
                    );
                  });
              if (
                (0, o.isEventTargetWithin)(e, u.floating) ||
                (0, o.isEventTargetWithin)(e, u.domReference) ||
                p
              )
                return;
              let v = y ? (0, o.getNodeChildren)(y.nodesRef.current, g) : [];
              if (v.length > 0) {
                let e = !0;
                if (
                  (v.forEach((t) => {
                    var n;
                    if (
                      null != (n = t.context) &&
                      n.open &&
                      !t.context.dataRef.current.__outsidePressBubbles
                    ) {
                      e = !1;
                      return;
                    }
                  }),
                  !e)
                )
                  return;
              }
              i(!1, e, "outside-press");
            }),
            O = (0, o.useEffectEvent)((e) => {
              var t;
              let n = () => {
                var t;
                M(e),
                  null == (t = (0, o.getTarget)(e)) ||
                    t.removeEventListener(d, n);
              };
              null == (t = (0, o.getTarget)(e)) || t.addEventListener(d, n);
            });
          r.useEffect(() => {
            if (!n || !a) return;
            (s.current.__escapeKeyBubbles = C),
              (s.current.__outsidePressBubbles = S);
            let e = -1;
            function t(e) {
              i(!1, e, "ancestor-scroll");
            }
            function r() {
              window.clearTimeout(e), (P.current = !0);
            }
            function f() {
              e = window.setTimeout(() => {
                P.current = !1;
              }, 5 * !!(0, l.isWebKit)());
            }
            let m = (0, o.getDocument)(u.floating);
            c &&
              (m.addEventListener("keydown", T ? D : k, T),
              m.addEventListener("compositionstart", r),
              m.addEventListener("compositionend", f)),
              E && m.addEventListener(d, L ? O : M, L);
            let g = [];
            return (
              p &&
                ((0, l.isElement)(u.domReference) &&
                  (g = (0, l.getOverflowAncestors)(u.domReference)),
                (0, l.isElement)(u.floating) &&
                  (g = g.concat((0, l.getOverflowAncestors)(u.floating))),
                !(0, l.isElement)(u.reference) &&
                  u.reference &&
                  u.reference.contextElement &&
                  (g = g.concat(
                    (0, l.getOverflowAncestors)(u.reference.contextElement)
                  ))),
              (g = g.filter((e) => {
                var t;
                return (
                  e !==
                  (null == (t = m.defaultView) ? void 0 : t.visualViewport)
                );
              })).forEach((e) => {
                e.addEventListener("scroll", t, { passive: !0 });
              }),
              () => {
                c &&
                  (m.removeEventListener("keydown", T ? D : k, T),
                  m.removeEventListener("compositionstart", r),
                  m.removeEventListener("compositionend", f)),
                  E && m.removeEventListener(d, L ? O : M, L),
                  g.forEach((e) => {
                    e.removeEventListener("scroll", t);
                  }),
                  window.clearTimeout(e);
              }
            );
          }, [s, u, c, E, d, n, i, p, a, C, S, k, T, D, M, L, O]),
            r.useEffect(() => {
              w.current = !1;
            }, [E, d]);
          let A = r.useMemo(
              () => ({
                onKeyDown: k,
                ...(m && {
                  [e2[g]]: (e) => {
                    i(!1, e.nativeEvent, "reference-press");
                  },
                  ...("click" !== g && {
                    onClick(e) {
                      i(!1, e.nativeEvent, "reference-press");
                    },
                  }),
                }),
              }),
              [k, i, m, g]
            ),
            I = r.useMemo(
              () => ({
                onKeyDown: k,
                onMouseDown() {
                  R.current = !0;
                },
                onMouseUp() {
                  R.current = !0;
                },
                [e3[d]]: () => {
                  w.current = !0;
                },
              }),
              [k, d]
            );
          return r.useMemo(
            () => (a ? { reference: A, floating: I } : {}),
            [a, A, I]
          );
        }
        function V(e) {
          let { open: t = !1, onOpenChange: n, elements: i } = e,
            l = eL(),
            u = r.useRef({}),
            [s] = r.useState(() => h()),
            a = null != eM(),
            [c, f] = r.useState(i.reference),
            d = (0, o.useEffectEvent)((e, t, r) => {
              (u.current.openEvent = e ? t : void 0),
                s.emit("openchange", {
                  open: e,
                  event: t,
                  reason: r,
                  nested: a,
                }),
                null == n || n(e, t, r);
            }),
            m = r.useMemo(() => ({ setPositionReference: f }), []),
            g = r.useMemo(
              () => ({
                reference: c || i.reference || null,
                floating: i.floating || null,
                domReference: i.reference,
              }),
              [c, i.reference, i.floating]
            );
          return r.useMemo(
            () => ({
              dataRef: u,
              open: t,
              onOpenChange: d,
              elements: g,
              events: s,
              floatingId: l,
              refs: m,
            }),
            [t, d, g, s, l, m]
          );
        }
        function G(e) {
          void 0 === e && (e = {});
          let { nodeId: t } = e,
            n = V({
              ...e,
              elements: { reference: null, floating: null, ...e.elements },
            }),
            i = e.rootContext || n,
            u = i.elements,
            [s, c] = r.useState(null),
            [f, d] = r.useState(null),
            m = (null == u ? void 0 : u.domReference) || s,
            g = r.useRef(null),
            p = eO();
          (0, o.useModernLayoutEffect)(() => {
            m && (g.current = m);
          }, [m]);
          let v = (0, a.useFloating)({
              ...e,
              elements: { ...u, ...(f && { reference: f }) },
            }),
            h = r.useCallback(
              (e) => {
                let t = (0, l.isElement)(e)
                  ? {
                      getBoundingClientRect: () => e.getBoundingClientRect(),
                      getClientRects: () => e.getClientRects(),
                      contextElement: e,
                    }
                  : e;
                d(t), v.refs.setReference(t);
              },
              [v.refs]
            ),
            y = r.useCallback(
              (e) => {
                ((0, l.isElement)(e) || null === e) && ((g.current = e), c(e)),
                  ((0, l.isElement)(v.refs.reference.current) ||
                    null === v.refs.reference.current ||
                    (null !== e && !(0, l.isElement)(e))) &&
                    v.refs.setReference(e);
              },
              [v.refs]
            ),
            b = r.useMemo(
              () => ({
                ...v.refs,
                setReference: y,
                setPositionReference: h,
                domReference: g,
              }),
              [v.refs, y, h]
            ),
            E = r.useMemo(
              () => ({ ...v.elements, domReference: m }),
              [v.elements, m]
            ),
            x = r.useMemo(
              () => ({ ...v, ...i, refs: b, elements: E, nodeId: t }),
              [v, b, E, t, i]
            );
          return (
            (0, o.useModernLayoutEffect)(() => {
              i.dataRef.current.floatingContext = x;
              let e =
                null == p ? void 0 : p.nodesRef.current.find((e) => e.id === t);
              e && (e.context = x);
            }),
            r.useMemo(
              () => ({ ...v, context: x, refs: b, elements: E }),
              [v, b, E, x]
            )
          );
        }
        function q() {
          return (0, o.isMac)() && (0, o.isSafari)();
        }
        function X(e, t) {
          void 0 === t && (t = {});
          let {
              open: n,
              onOpenChange: i,
              events: u,
              dataRef: s,
              elements: a,
            } = e,
            { enabled: c = !0, visibleOnly: f = !0 } = t,
            d = r.useRef(!1),
            m = r.useRef(-1),
            g = r.useRef(!0);
          r.useEffect(() => {
            if (!c) return;
            let e = (0, l.getWindow)(a.domReference);
            function t() {
              !n &&
                (0, l.isHTMLElement)(a.domReference) &&
                a.domReference ===
                  (0, o.activeElement)((0, o.getDocument)(a.domReference)) &&
                (d.current = !0);
            }
            function r() {
              g.current = !0;
            }
            function i() {
              g.current = !1;
            }
            return (
              e.addEventListener("blur", t),
              q() &&
                (e.addEventListener("keydown", r, !0),
                e.addEventListener("pointerdown", i, !0)),
              () => {
                e.removeEventListener("blur", t),
                  q() &&
                    (e.removeEventListener("keydown", r, !0),
                    e.removeEventListener("pointerdown", i, !0));
              }
            );
          }, [a.domReference, n, c]),
            r.useEffect(() => {
              if (c)
                return (
                  u.on("openchange", e),
                  () => {
                    u.off("openchange", e);
                  }
                );
              function e(e) {
                let { reason: t } = e;
                ("reference-press" === t || "escape-key" === t) &&
                  (d.current = !0);
              }
            }, [u, c]),
            r.useEffect(
              () => () => {
                w(m);
              },
              []
            );
          let p = r.useMemo(
            () => ({
              onMouseLeave() {
                d.current = !1;
              },
              onFocus(e) {
                if (d.current) return;
                let t = (0, o.getTarget)(e.nativeEvent);
                if (f && (0, l.isElement)(t)) {
                  if (q() && !e.relatedTarget) {
                    if (!g.current && !(0, o.isTypeableElement)(t)) return;
                  } else if (!(0, o.matchesFocusVisible)(t)) return;
                }
                i(!0, e.nativeEvent, "focus");
              },
              onBlur(e) {
                d.current = !1;
                let t = e.relatedTarget,
                  n = e.nativeEvent,
                  r =
                    (0, l.isElement)(t) &&
                    t.hasAttribute(x("focus-guard")) &&
                    "outside" === t.getAttribute("data-type");
                m.current = window.setTimeout(() => {
                  var e;
                  let l = (0, o.activeElement)(
                    a.domReference ? a.domReference.ownerDocument : document
                  );
                  (t || l !== a.domReference) &&
                    ((0, o.contains)(
                      null == (e = s.current.floatingContext)
                        ? void 0
                        : e.refs.floating.current,
                      l
                    ) ||
                      (0, o.contains)(a.domReference, l) ||
                      r ||
                      i(!1, n, "focus"));
                });
              },
            }),
            [s, a.domReference, i, f]
          );
          return r.useMemo(() => (c ? { reference: p } : {}), [c, p]);
        }
        function Y(e, t, r) {
          let o = new Map(),
            i = "item" === r,
            l = e;
          if (i && e) {
            let { [n]: t, [ed]: r, ...o } = e;
            l = o;
          }
          return {
            ...("floating" === r && {
              tabIndex: -1,
              "data-floating-ui-focusable": "",
            }),
            ...l,
            ...t
              .map((t) => {
                let n = t ? t[r] : null;
                return "function" == typeof n ? (e ? n(e) : null) : n;
              })
              .concat(e)
              .reduce(
                (e, t) => (
                  t &&
                    Object.entries(t).forEach((t) => {
                      let [r, l] = t;
                      if (!(i && [n, ed].includes(r)))
                        if (0 === r.indexOf("on")) {
                          if (
                            (o.has(r) || o.set(r, []), "function" == typeof l)
                          ) {
                            var u;
                            null == (u = o.get(r)) || u.push(l),
                              (e[r] = function () {
                                for (
                                  var e,
                                    t = arguments.length,
                                    n = Array(t),
                                    i = 0;
                                  i < t;
                                  i++
                                )
                                  n[i] = arguments[i];
                                return null == (e = o.get(r))
                                  ? void 0
                                  : e
                                      .map((e) => e(...n))
                                      .find((e) => void 0 !== e);
                              });
                          }
                        } else e[r] = l;
                    }),
                  e
                ),
                {}
              ),
          };
        }
        function $(e) {
          void 0 === e && (e = []);
          let t = e.map((e) => (null == e ? void 0 : e.reference)),
            n = e.map((e) => (null == e ? void 0 : e.floating)),
            o = e.map((e) => (null == e ? void 0 : e.item)),
            i = r.useCallback((t) => Y(t, e, "reference"), t),
            l = r.useCallback((t) => Y(t, e, "floating"), n),
            u = r.useCallback((t) => Y(t, e, "item"), o);
          return r.useMemo(
            () => ({
              getReferenceProps: i,
              getFloatingProps: l,
              getItemProps: u,
            }),
            [i, l, u]
          );
        }
        function J(e, t, n) {
          switch (e) {
            case "vertical":
              return t;
            case "horizontal":
              return n;
            default:
              return t || n;
          }
        }
        function Q(e, t) {
          return J(t, e === ep || e === ev, e === em || e === eg);
        }
        function Z(e, t, n) {
          return (
            J(t, e === ev, n ? e === em : e === eg) ||
            "Enter" === e ||
            " " === e ||
            "" === e
          );
        }
        function ee(e, t, n) {
          let r = e === ev;
          return J(t, n ? e === em : e === eg, r);
        }
        function et(e, t, n, r) {
          let o = e === ep;
          return "both" === t || ("horizontal" === t && r && r > 1)
            ? "Escape" === e
            : J(t, n ? e === eg : e === em, o);
        }
        function en(e, t) {
          let { open: n, onOpenChange: i, elements: u, floatingId: s } = e,
            {
              listRef: a,
              activeIndex: c,
              onNavigate: f = () => {},
              enabled: d = !0,
              selectedIndex: m = null,
              allowEscape: g = !1,
              loop: p = !1,
              nested: v = !1,
              rtl: h = !1,
              virtual: y = !1,
              focusItemOnOpen: b = "auto",
              focusItemOnHover: E = !0,
              openOnArrowKeyDown: x = !0,
              disabledIndices: w,
              orientation: R = "vertical",
              parentOrientation: C,
              cols: S = 1,
              scrollItemIntoView: T = !0,
              virtualItemRef: L,
              itemSizes: P,
              dense: k = !1,
            } = t,
            M = (0, o.getFloatingFocusElement)(u.floating),
            O = (0, o.useLatestRef)(M),
            A = eM(),
            I = eO();
          (0, o.useModernLayoutEffect)(() => {
            e.dataRef.current.orientation = R;
          }, [e, R]);
          let N = (0, o.useEffectEvent)(() => {
              f(-1 === H.current ? null : H.current);
            }),
            F = (0, o.isTypeableCombobox)(u.domReference),
            j = r.useRef(b),
            H = r.useRef(null != m ? m : -1),
            _ = r.useRef(null),
            B = r.useRef(!0),
            W = r.useRef(N),
            U = r.useRef(!!u.floating),
            K = r.useRef(n),
            z = r.useRef(!1),
            V = r.useRef(!1),
            G = (0, o.useLatestRef)(w),
            q = (0, o.useLatestRef)(n),
            X = (0, o.useLatestRef)(T),
            Y = (0, o.useLatestRef)(m),
            [$, J] = r.useState(),
            [en, er] = r.useState(),
            eo = (0, o.useEffectEvent)(() => {
              function e(e) {
                if (y) {
                  var t;
                  null != (t = e.id) &&
                    t.endsWith("-fui-option") &&
                    (e.id = s + "-" + Math.random().toString(16).slice(2, 10)),
                    J(e.id),
                    null == I || I.events.emit("virtualfocus", e),
                    L && (L.current = e);
                } else D(e, { sync: z.current, preventScroll: !0 });
              }
              let t = a.current[H.current],
                n = V.current;
              t && e(t),
                (z.current ? (e) => e() : requestAnimationFrame)(() => {
                  let r = a.current[H.current] || t;
                  if (!r) return;
                  t || e(r);
                  let o = X.current;
                  o &&
                    el &&
                    (n || !B.current) &&
                    (null == r.scrollIntoView ||
                      r.scrollIntoView(
                        "boolean" == typeof o
                          ? { block: "nearest", inline: "nearest" }
                          : o
                      ));
                });
            });
          (0, o.useModernLayoutEffect)(() => {
            d &&
              (n && u.floating
                ? j.current &&
                  null != m &&
                  ((V.current = !0), (H.current = m), N())
                : U.current && ((H.current = -1), W.current()));
          }, [d, n, u.floating, m, N]),
            (0, o.useModernLayoutEffect)(() => {
              if (d && n && u.floating)
                if (null == c) {
                  if (((z.current = !1), null != Y.current)) return;
                  if (
                    (U.current && ((H.current = -1), eo()),
                    (!K.current || !U.current) &&
                      j.current &&
                      (null != _.current ||
                        (!0 === j.current && null == _.current)))
                  ) {
                    let e = 0,
                      t = () => {
                        null == a.current[0]
                          ? (e < 2 &&
                              (e ? requestAnimationFrame : queueMicrotask)(t),
                            e++)
                          : ((H.current =
                              null == _.current || Z(_.current, R, h) || v
                                ? (0, o.getMinListIndex)(a, G.current)
                                : (0, o.getMaxListIndex)(a, G.current)),
                            (_.current = null),
                            N());
                      };
                    t();
                  }
                } else
                  (0, o.isIndexOutOfListBounds)(a, c) ||
                    ((H.current = c), eo(), (V.current = !1));
            }, [d, n, u.floating, c, Y, v, a, R, h, N, eo, G]),
            (0, o.useModernLayoutEffect)(() => {
              var e;
              if (!d || u.floating || !I || y || !U.current) return;
              let t = I.nodesRef.current,
                n =
                  null == (e = t.find((e) => e.id === A)) ||
                  null == (e = e.context)
                    ? void 0
                    : e.elements.floating,
                r = (0, o.activeElement)((0, o.getDocument)(u.floating)),
                i = t.some(
                  (e) =>
                    e.context && (0, o.contains)(e.context.elements.floating, r)
                );
              n && !i && B.current && n.focus({ preventScroll: !0 });
            }, [d, u.floating, I, A, y]),
            (0, o.useModernLayoutEffect)(() => {
              if (d && I && y && !A)
                return (
                  I.events.on("virtualfocus", e),
                  () => {
                    I.events.off("virtualfocus", e);
                  }
                );
              function e(e) {
                er(e.id), L && (L.current = e);
              }
            }, [d, I, y, A, L]),
            (0, o.useModernLayoutEffect)(() => {
              (W.current = N), (K.current = n), (U.current = !!u.floating);
            }),
            (0, o.useModernLayoutEffect)(() => {
              n || (_.current = null);
            }, [n]);
          let ei = null != c,
            el = r.useMemo(() => {
              function e(e) {
                if (!n) return;
                let t = a.current.indexOf(e);
                -1 !== t && H.current !== t && ((H.current = t), N());
              }
              return {
                onFocus(t) {
                  let { currentTarget: n } = t;
                  (z.current = !0), e(n);
                },
                onClick: (e) => {
                  let { currentTarget: t } = e;
                  return t.focus({ preventScroll: !0 });
                },
                ...(E && {
                  onMouseMove(t) {
                    let { currentTarget: n } = t;
                    (z.current = !0), (V.current = !1), e(n);
                  },
                  onPointerLeave(e) {
                    let { pointerType: t } = e;
                    if (
                      B.current &&
                      "touch" !== t &&
                      ((z.current = !0), (H.current = -1), N(), !y)
                    ) {
                      var n;
                      null == (n = O.current) || n.focus({ preventScroll: !0 });
                    }
                  },
                }),
              };
            }, [n, O, E, a, N, y]),
            eu = r.useCallback(() => {
              var e;
              return null != C
                ? C
                : null == I ||
                  null == (e = I.nodesRef.current.find((e) => e.id === A)) ||
                  null == (e = e.context) ||
                  null == (e = e.dataRef)
                ? void 0
                : e.current.orientation;
            }, [A, I, C]),
            es = (0, o.useEffectEvent)((e) => {
              if (
                ((B.current = !1),
                (z.current = !0),
                229 === e.which ||
                  (!q.current && e.currentTarget === O.current))
              )
                return;
              if (v && et(e.key, R, h, S)) {
                Q(e.key, eu()) || (0, o.stopEvent)(e),
                  i(!1, e.nativeEvent, "list-navigation"),
                  (0, l.isHTMLElement)(u.domReference) &&
                    (y
                      ? null == I ||
                        I.events.emit("virtualfocus", u.domReference)
                      : u.domReference.focus());
                return;
              }
              let t = H.current,
                r = (0, o.getMinListIndex)(a, w),
                s = (0, o.getMaxListIndex)(a, w);
              if (
                (F ||
                  ("Home" === e.key &&
                    ((0, o.stopEvent)(e), (H.current = r), N()),
                  "End" === e.key &&
                    ((0, o.stopEvent)(e), (H.current = s), N())),
                S > 1)
              ) {
                let t =
                    P ||
                    Array.from({ length: a.current.length }, () => ({
                      width: 1,
                      height: 1,
                    })),
                  n = (0, o.createGridCellMap)(t, S, k),
                  i = n.findIndex(
                    (e) => null != e && !(0, o.isListIndexDisabled)(a, e, w)
                  ),
                  l = n.reduce(
                    (e, t, n) =>
                      null == t || (0, o.isListIndexDisabled)(a, t, w) ? e : n,
                    -1
                  ),
                  u =
                    n[
                      (0, o.getGridNavigatedIndex)(
                        {
                          current: n.map((e) =>
                            null != e ? a.current[e] : null
                          ),
                        },
                        {
                          event: e,
                          orientation: R,
                          loop: p,
                          rtl: h,
                          cols: S,
                          disabledIndices: (0, o.getGridCellIndices)(
                            [
                              ...(w ||
                                a.current.map((e, t) =>
                                  (0, o.isListIndexDisabled)(a, t) ? t : void 0
                                )),
                              void 0,
                            ],
                            n
                          ),
                          minIndex: i,
                          maxIndex: l,
                          prevIndex: (0, o.getGridCellIndexOfCorner)(
                            H.current > s ? r : H.current,
                            t,
                            n,
                            S,
                            e.key === ev
                              ? "bl"
                              : e.key === (h ? em : eg)
                              ? "tr"
                              : "tl"
                          ),
                          stopEvent: !0,
                        }
                      )
                    ];
                if ((null != u && ((H.current = u), N()), "both" === R)) return;
              }
              if (Q(e.key, R)) {
                if (
                  ((0, o.stopEvent)(e),
                  n &&
                    !y &&
                    (0, o.activeElement)(e.currentTarget.ownerDocument) ===
                      e.currentTarget)
                ) {
                  (H.current = Z(e.key, R, h) ? r : s), N();
                  return;
                }
                Z(e.key, R, h)
                  ? p
                    ? (H.current =
                        t >= s
                          ? g && t !== a.current.length
                            ? -1
                            : r
                          : (0, o.findNonDisabledListIndex)(a, {
                              startingIndex: t,
                              disabledIndices: w,
                            }))
                    : (H.current = Math.min(
                        s,
                        (0, o.findNonDisabledListIndex)(a, {
                          startingIndex: t,
                          disabledIndices: w,
                        })
                      ))
                  : p
                  ? (H.current =
                      t <= r
                        ? g && -1 !== t
                          ? a.current.length
                          : s
                        : (0, o.findNonDisabledListIndex)(a, {
                            startingIndex: t,
                            decrement: !0,
                            disabledIndices: w,
                          }))
                  : (H.current = Math.max(
                      r,
                      (0, o.findNonDisabledListIndex)(a, {
                        startingIndex: t,
                        decrement: !0,
                        disabledIndices: w,
                      })
                    )),
                  (0, o.isIndexOutOfListBounds)(a, H.current) &&
                    (H.current = -1),
                  N();
              }
            }),
            ea = r.useMemo(
              () => y && n && ei && { "aria-activedescendant": en || $ },
              [y, n, ei, en, $]
            ),
            ec = r.useMemo(
              () => ({
                "aria-orientation": "both" === R ? void 0 : R,
                ...(!F ? ea : {}),
                onKeyDown: es,
                onPointerMove() {
                  B.current = !0;
                },
              }),
              [ea, es, R, F]
            ),
            ef = r.useMemo(() => {
              function e(e) {
                "auto" === b &&
                  (0, o.isVirtualClick)(e.nativeEvent) &&
                  (j.current = !0);
              }
              function t(e) {
                (j.current = b),
                  "auto" === b &&
                    (0, o.isVirtualPointerEvent)(e.nativeEvent) &&
                    (j.current = !0);
              }
              return {
                ...ea,
                onKeyDown(e) {
                  B.current = !1;
                  let t = e.key.startsWith("Arrow"),
                    r = ["Home", "End"].includes(e.key),
                    l = ee(e.key, R, h),
                    u = et(e.key, R, h, S),
                    s = ee(e.key, eu(), h),
                    c = Q(e.key, R),
                    f = (v ? s : c) || "Enter" === e.key || "" === e.key.trim();
                  if (y && n) {
                    let n =
                        null == I
                          ? void 0
                          : I.nodesRef.current.find((e) => null == e.parentId),
                      i =
                        I && n
                          ? (0, o.getDeepestNode)(I.nodesRef.current, n.id)
                          : null;
                    if ((t || r) && i && L) {
                      var d, g, p;
                      let t = new KeyboardEvent("keydown", {
                        key: e.key,
                        bubbles: !0,
                      });
                      if (l || u) {
                        let n =
                            (null == (d = i.context)
                              ? void 0
                              : d.elements.domReference) === e.currentTarget,
                          r =
                            u && !n
                              ? null == (g = i.context)
                                ? void 0
                                : g.elements.domReference
                              : l
                              ? a.current.find(
                                  (e) => (null == e ? void 0 : e.id) === $
                                )
                              : null;
                        r &&
                          ((0, o.stopEvent)(e), r.dispatchEvent(t), er(void 0));
                      }
                      if (
                        (c || r) &&
                        i.context &&
                        i.context.open &&
                        i.parentId &&
                        e.currentTarget !== i.context.elements.domReference
                      ) {
                        (0, o.stopEvent)(e),
                          null == (p = i.context.elements.domReference) ||
                            p.dispatchEvent(t);
                        return;
                      }
                    }
                    return es(e);
                  }
                  if (n || x || !t) {
                    if (f) {
                      let t = Q(e.key, eu());
                      _.current = v && t ? null : e.key;
                    }
                    if (v) {
                      s &&
                        ((0, o.stopEvent)(e),
                        n
                          ? ((H.current = (0, o.getMinListIndex)(a, G.current)),
                            N())
                          : i(!0, e.nativeEvent, "list-navigation"));
                      return;
                    }
                    c &&
                      (null != m && (H.current = m),
                      (0, o.stopEvent)(e),
                      !n && x ? i(!0, e.nativeEvent, "list-navigation") : es(e),
                      n && N());
                  }
                },
                onFocus() {
                  n && !y && ((H.current = -1), N());
                },
                onPointerDown: t,
                onPointerEnter: t,
                onMouseDown: e,
                onClick: e,
              };
            }, [$, ea, S, es, G, b, a, v, N, i, n, x, R, eu, h, m, I, y, L]);
          return r.useMemo(
            () => (d ? { reference: ef, floating: ec, item: el } : {}),
            [d, ef, ec, el]
          );
        }
        let e9 = new Map([
          ["select", "listbox"],
          ["combobox", "listbox"],
          ["label", !1],
        ]);
        function er(e, t) {
          var n, i;
          void 0 === t && (t = {});
          let { open: l, elements: u, floatingId: s } = e,
            { enabled: a = !0, role: c = "dialog" } = t,
            f = eL(),
            d = (null == (n = u.domReference) ? void 0 : n.id) || f,
            m = r.useMemo(() => {
              var e;
              return (
                (null == (e = (0, o.getFloatingFocusElement)(u.floating))
                  ? void 0
                  : e.id) || s
              );
            }, [u.floating, s]),
            g = null != (i = e9.get(c)) ? i : c,
            p = null != eM(),
            v = r.useMemo(
              () =>
                "tooltip" === g || "label" === c
                  ? {
                      ["aria-" +
                      ("label" === c ? "labelledby" : "describedby")]: l
                        ? m
                        : void 0,
                    }
                  : {
                      "aria-expanded": l ? "true" : "false",
                      "aria-haspopup": "alertdialog" === g ? "dialog" : g,
                      "aria-controls": l ? m : void 0,
                      ...("listbox" === g && { role: "combobox" }),
                      ...("menu" === g && { id: d }),
                      ...("menu" === g && p && { role: "menuitem" }),
                      ...("select" === c && { "aria-autocomplete": "none" }),
                      ...("combobox" === c && { "aria-autocomplete": "list" }),
                    },
              [g, m, p, l, d, c]
            ),
            h = r.useMemo(() => {
              let e = { id: m, ...(g && { role: g }) };
              return "tooltip" === g || "label" === c
                ? e
                : { ...e, ...("menu" === g && { "aria-labelledby": d }) };
            }, [g, m, d, c]),
            y = r.useCallback(
              (e) => {
                let { active: t, selected: n } = e,
                  r = { role: "option", ...(t && { id: m + "-fui-option" }) };
                switch (c) {
                  case "select":
                    return { ...r, "aria-selected": t && n };
                  case "combobox":
                    return { ...r, "aria-selected": n };
                }
                return {};
              },
              [m, c]
            );
          return r.useMemo(
            () => (a ? { reference: v, floating: h, item: y } : {}),
            [a, v, h, y]
          );
        }
        let e6 = (e) =>
          e.replace(
            /[A-Z]+(?![a-z])|[A-Z]/g,
            (e, t) => (t ? "-" : "") + e.toLowerCase()
          );
        function eo(e, t) {
          return "function" == typeof e ? e(t) : e;
        }
        function ei(e, t) {
          void 0 === t && (t = {});
          let {
              open: n,
              elements: { floating: i },
            } = e,
            { duration: l = 250 } = t,
            u = ("number" == typeof l ? l : l.close) || 0,
            [a, c] = r.useState("unmounted"),
            f = (function (e, t) {
              let [n, o] = r.useState(e);
              return (
                e && !n && o(!0),
                r.useEffect(() => {
                  if (!e && n) {
                    let e = setTimeout(() => o(!1), t);
                    return () => clearTimeout(e);
                  }
                }, [e, n, t]),
                n
              );
            })(n, u);
          return (
            f || "close" !== a || c("unmounted"),
            (0, o.useModernLayoutEffect)(() => {
              if (i) {
                if (n) {
                  c("initial");
                  let e = requestAnimationFrame(() => {
                    (0, s.flushSync)(() => {
                      c("open");
                    });
                  });
                  return () => {
                    cancelAnimationFrame(e);
                  };
                }
                c("close");
              }
            }, [n, i]),
            { isMounted: f, status: a }
          );
        }
        function el(e, t) {
          void 0 === t && (t = {});
          let {
              initial: n = { opacity: 0 },
              open: i,
              close: l,
              common: u,
              duration: s = 250,
            } = t,
            a = e.placement,
            c = a.split("-")[0],
            f = r.useMemo(() => ({ side: c, placement: a }), [c, a]),
            d = "number" == typeof s,
            m = (d ? s : s.open) || 0,
            g = (d ? s : s.close) || 0,
            [p, v] = r.useState(() => ({ ...eo(u, f), ...eo(n, f) })),
            { isMounted: h, status: y } = ei(e, { duration: s }),
            b = (0, o.useLatestRef)(n),
            E = (0, o.useLatestRef)(i),
            x = (0, o.useLatestRef)(l),
            w = (0, o.useLatestRef)(u);
          return (
            (0, o.useModernLayoutEffect)(() => {
              let e = eo(b.current, f),
                t = eo(x.current, f),
                n = eo(w.current, f),
                r =
                  eo(E.current, f) ||
                  Object.keys(e).reduce((e, t) => ((e[t] = ""), e), {});
              if (
                ("initial" === y &&
                  v((t) => ({
                    transitionProperty: t.transitionProperty,
                    ...n,
                    ...e,
                  })),
                "open" === y &&
                  v({
                    transitionProperty: Object.keys(r).map(e6).join(","),
                    transitionDuration: m + "ms",
                    ...n,
                    ...r,
                  }),
                "close" === y)
              ) {
                let r = t || e;
                v({
                  transitionProperty: Object.keys(r).map(e6).join(","),
                  transitionDuration: g + "ms",
                  ...n,
                  ...r,
                });
              }
            }, [g, x, b, E, w, m, y, f]),
            { isMounted: h, styles: p }
          );
        }
        function eu(e, t) {
          var n;
          let { open: i, dataRef: l } = e,
            {
              listRef: u,
              activeIndex: s,
              onMatch: a,
              onTypingChange: c,
              enabled: f = !0,
              findMatch: d = null,
              resetMs: m = 750,
              ignoreKeys: g = [],
              selectedIndex: p = null,
            } = t,
            v = r.useRef(-1),
            h = r.useRef(""),
            y = r.useRef(null != (n = null != p ? p : s) ? n : -1),
            b = r.useRef(null),
            E = (0, o.useEffectEvent)(a),
            x = (0, o.useEffectEvent)(c),
            R = (0, o.useLatestRef)(d),
            C = (0, o.useLatestRef)(g);
          (0, o.useModernLayoutEffect)(() => {
            i && (w(v), (b.current = null), (h.current = ""));
          }, [i]),
            (0, o.useModernLayoutEffect)(() => {
              if (i && "" === h.current) {
                var e;
                y.current = null != (e = null != p ? p : s) ? e : -1;
              }
            }, [i, p, s]);
          let S = (0, o.useEffectEvent)((e) => {
              e
                ? l.current.typing || ((l.current.typing = e), x(e))
                : l.current.typing && ((l.current.typing = e), x(e));
            }),
            T = (0, o.useEffectEvent)((e) => {
              function t(e, t, n) {
                let r = R.current
                  ? R.current(t, n)
                  : t.find(
                      (e) =>
                        (null == e
                          ? void 0
                          : e
                              .toLocaleLowerCase()
                              .indexOf(n.toLocaleLowerCase())) === 0
                    );
                return r ? e.indexOf(r) : -1;
              }
              let n = u.current;
              if (
                (h.current.length > 0 &&
                  " " !== h.current[0] &&
                  (-1 === t(n, n, h.current)
                    ? S(!1)
                    : " " === e.key && (0, o.stopEvent)(e)),
                null == n ||
                  C.current.includes(e.key) ||
                  1 !== e.key.length ||
                  e.ctrlKey ||
                  e.metaKey ||
                  e.altKey)
              )
                return;
              i && " " !== e.key && ((0, o.stopEvent)(e), S(!0)),
                n.every((e) => {
                  var t, n;
                  return (
                    !e ||
                    (null == (t = e[0]) ? void 0 : t.toLocaleLowerCase()) !==
                      (null == (n = e[1]) ? void 0 : n.toLocaleLowerCase())
                  );
                }) &&
                  h.current === e.key &&
                  ((h.current = ""), (y.current = b.current)),
                (h.current += e.key),
                w(v),
                (v.current = window.setTimeout(() => {
                  (h.current = ""), (y.current = b.current), S(!1);
                }, m));
              let r = y.current,
                l = t(
                  n,
                  [...n.slice((r || 0) + 1), ...n.slice(0, (r || 0) + 1)],
                  h.current
                );
              -1 !== l
                ? (E(l), (b.current = l))
                : " " !== e.key && ((h.current = ""), S(!1));
            }),
            L = r.useMemo(() => ({ onKeyDown: T }), [T]),
            P = r.useMemo(
              () => ({
                onKeyDown: T,
                onKeyUp(e) {
                  " " === e.key && S(!1);
                },
              }),
              [T, S]
            );
          return r.useMemo(
            () => (f ? { reference: L, floating: P } : {}),
            [f, L, P]
          );
        }
        function es(e, t) {
          return {
            ...e,
            rects: { ...e.rects, floating: { ...e.rects.floating, height: t } },
          };
        }
        let e4 = (e) => ({
          name: "inner",
          options: e,
          async fn(t) {
            let {
                listRef: n,
                overflowRef: r,
                onFallbackChange: o,
                offset: i = 0,
                index: l = 0,
                minItemsVisible: u = 4,
                referenceOverflowThreshold: d = 0,
                scrollRef: m,
                ...g
              } = (0, f.evaluate)(e, t),
              {
                rects: p,
                elements: { floating: v },
              } = t,
              h = n.current[l],
              y = (null == m ? void 0 : m.current) || v,
              b = v.clientTop || y.clientTop,
              E = 0 !== v.clientTop,
              x = 0 !== y.clientTop,
              w = v === y;
            if (!h) return {};
            let R = {
                ...t,
                ...(await (0, a.offset)(
                  -h.offsetTop -
                    v.clientTop -
                    p.reference.height / 2 -
                    h.offsetHeight / 2 -
                    i
                ).fn(t)),
              },
              C = await (0, c.detectOverflow)(
                es(R, y.scrollHeight + b + v.clientTop),
                g
              ),
              S = await (0, c.detectOverflow)(R, {
                ...g,
                elementContext: "reference",
              }),
              T = (0, f.max)(0, C.top),
              L = R.y + T,
              P = (y.scrollHeight > y.clientHeight ? (e) => e : f.round)(
                (0, f.max)(
                  0,
                  y.scrollHeight +
                    ((E && w) || x ? 2 * b : 0) -
                    T -
                    (0, f.max)(0, C.bottom)
                )
              );
            if (((y.style.maxHeight = P + "px"), (y.scrollTop = T), o)) {
              let e =
                y.offsetHeight <
                  h.offsetHeight * (0, f.min)(u, n.current.length) - 1 ||
                S.top >= -d ||
                S.bottom >= -d;
              (0, s.flushSync)(() => o(e));
            }
            return (
              r &&
                (r.current = await (0, c.detectOverflow)(
                  es({ ...R, y: L }, y.offsetHeight + b + v.clientTop),
                  g
                )),
              { y: L }
            );
          },
        });
        function ea(e, t) {
          let { open: n, elements: i } = e,
            { enabled: l = !0, overflowRef: u, scrollRef: a, onChange: c } = t,
            f = (0, o.useEffectEvent)(c),
            d = r.useRef(!1),
            m = r.useRef(null),
            g = r.useRef(null);
          r.useEffect(() => {
            if (!l) return;
            function e(e) {
              if (e.ctrlKey || !t || null == u.current) return;
              let n = e.deltaY,
                r = u.current.top >= -0.5,
                i = u.current.bottom >= -0.5,
                l = t.scrollHeight - t.clientHeight,
                a = n < 0 ? -1 : 1,
                c = n < 0 ? "max" : "min";
              !(t.scrollHeight <= t.clientHeight) &&
                ((!r && n > 0) || (!i && n < 0)
                  ? (e.preventDefault(),
                    (0, s.flushSync)(() => {
                      f((e) => e + Math[c](n, l * a));
                    }))
                  : /firefox/i.test((0, o.getUserAgent)()) &&
                    (t.scrollTop += n));
            }
            let t = (null == a ? void 0 : a.current) || i.floating;
            if (n && t)
              return (
                t.addEventListener("wheel", e),
                requestAnimationFrame(() => {
                  (m.current = t.scrollTop),
                    null != u.current && (g.current = { ...u.current });
                }),
                () => {
                  (m.current = null),
                    (g.current = null),
                    t.removeEventListener("wheel", e);
                }
              );
          }, [l, n, i.floating, u, a, f]);
          let p = r.useMemo(
            () => ({
              onKeyDown() {
                d.current = !0;
              },
              onWheel() {
                d.current = !1;
              },
              onPointerMove() {
                d.current = !1;
              },
              onScroll() {
                let e = (null == a ? void 0 : a.current) || i.floating;
                if (u.current && e && d.current) {
                  if (null !== m.current) {
                    let t = e.scrollTop - m.current;
                    ((u.current.bottom < -0.5 && t < -1) ||
                      (u.current.top < -0.5 && t > 1)) &&
                      (0, s.flushSync)(() => f((e) => e + t));
                  }
                  requestAnimationFrame(() => {
                    m.current = e.scrollTop;
                  });
                }
              },
            }),
            [i.floating, f, u, a]
          );
          return r.useMemo(() => (l ? { floating: p } : {}), [l, p]);
        }
        function ec(e, t) {
          let [n, r] = e,
            o = !1,
            i = t.length;
          for (let e = 0, l = i - 1; e < i; l = e++) {
            let [i, u] = t[e] || [0, 0],
              [s, a] = t[l] || [0, 0];
            u >= r != a >= r &&
              n <= ((s - i) * (r - u)) / (a - u) + i &&
              (o = !o);
          }
          return o;
        }
        function ef(e) {
          let t;
          void 0 === e && (e = {});
          let {
              buffer: n = 0.5,
              blockPointerEvents: r = !1,
              requireIntent: o = !0,
            } = e,
            i = !1,
            u = null,
            s = null,
            a = performance.now(),
            c = (e) => {
              let {
                x: r,
                y: c,
                placement: f,
                elements: d,
                onClose: m,
                nodeId: g,
                tree: p,
              } = e;
              return function (e) {
                function v() {
                  clearTimeout(t), m();
                }
                if (
                  (clearTimeout(t),
                  !d.domReference ||
                    !d.floating ||
                    null == f ||
                    null == r ||
                    null == c)
                )
                  return;
                let { clientX: h, clientY: y } = e,
                  b = [h, y],
                  E = "composedPath" in e ? e.composedPath()[0] : e.target,
                  x = "mouseleave" === e.type,
                  w = M(d.floating, E),
                  R = M(d.domReference, E),
                  C = d.domReference.getBoundingClientRect(),
                  S = d.floating.getBoundingClientRect(),
                  T = f.split("-")[0],
                  L = r > S.right - S.width / 2,
                  P = c > S.bottom - S.height / 2,
                  k =
                    b[0] >= C.x &&
                    b[0] <= C.x + C.width &&
                    b[1] >= C.y &&
                    b[1] <= C.y + C.height,
                  D = S.width > C.width,
                  O = S.height > C.height,
                  A = (D ? C : S).left,
                  I = (D ? C : S).right,
                  N = (O ? C : S).top,
                  F = (O ? C : S).bottom;
                if (w && ((i = !0), !x)) return;
                if ((R && (i = !1), R && !x)) {
                  i = !0;
                  return;
                }
                if (
                  (x &&
                    (0, l.isElement)(e.relatedTarget) &&
                    M(d.floating, e.relatedTarget)) ||
                  (p &&
                    (function (e, t, n) {
                      void 0 === n && (n = !0);
                      let r = e.filter((e) => {
                          var n;
                          return (
                            e.parentId === t &&
                            (null == (n = e.context) ? void 0 : n.open)
                          );
                        }),
                        o = r;
                      for (; o.length; )
                        (o = n
                          ? e.filter((e) => {
                              var t;
                              return null == (t = o)
                                ? void 0
                                : t.some((t) => {
                                    var n;
                                    return (
                                      e.parentId === t.id &&
                                      (null == (n = e.context)
                                        ? void 0
                                        : n.open)
                                    );
                                  });
                            })
                          : e),
                          (r = r.concat(o));
                      return r;
                    })(p.nodesRef.current, g).some((e) => {
                      let { context: t } = e;
                      return null == t ? void 0 : t.open;
                    }))
                )
                  return;
                if (
                  ("top" === T && c >= C.bottom - 1) ||
                  ("bottom" === T && c <= C.top + 1) ||
                  ("left" === T && r >= C.right - 1) ||
                  ("right" === T && r <= C.left + 1)
                )
                  return v();
                let j = [];
                switch (T) {
                  case "top":
                    j = [
                      [A, C.top + 1],
                      [A, S.bottom - 1],
                      [I, S.bottom - 1],
                      [I, C.top + 1],
                    ];
                    break;
                  case "bottom":
                    j = [
                      [A, S.top + 1],
                      [A, C.bottom - 1],
                      [I, C.bottom - 1],
                      [I, S.top + 1],
                    ];
                    break;
                  case "left":
                    j = [
                      [S.right - 1, F],
                      [S.right - 1, N],
                      [C.left + 1, N],
                      [C.left + 1, F],
                    ];
                    break;
                  case "right":
                    j = [
                      [C.right - 1, F],
                      [C.right - 1, N],
                      [S.left + 1, N],
                      [S.left + 1, F],
                    ];
                }
                if (!ec([h, y], j)) {
                  if (i && !k) return v();
                  if (!x && o) {
                    let t = (function (e, t) {
                      let n = performance.now(),
                        r = n - a;
                      if (null === u || null === s || 0 === r)
                        return (u = e), (s = t), (a = n), null;
                      let o = e - u,
                        i = t - s,
                        l = Math.sqrt(o * o + i * i);
                      return (u = e), (s = t), (a = n), l / r;
                    })(e.clientX, e.clientY);
                    if (null !== t && t < 0.1) return v();
                  }
                  ec(
                    [h, y],
                    (function (e) {
                      let [t, r] = e;
                      switch (T) {
                        case "top": {
                          let e = [
                            [S.left, L || D ? S.bottom - n : S.top],
                            [
                              S.right,
                              L ? (D ? S.bottom - n : S.top) : S.bottom - n,
                            ],
                          ];
                          return [
                            [
                              D ? t + n / 2 : L ? t + 4 * n : t - 4 * n,
                              r + n + 1,
                            ],
                            [
                              D ? t - n / 2 : L ? t + 4 * n : t - 4 * n,
                              r + n + 1,
                            ],
                            ...e,
                          ];
                        }
                        case "bottom": {
                          let e = [
                            [S.left, L || D ? S.top + n : S.bottom],
                            [
                              S.right,
                              L ? (D ? S.top + n : S.bottom) : S.top + n,
                            ],
                          ];
                          return [
                            [D ? t + n / 2 : L ? t + 4 * n : t - 4 * n, r - n],
                            [D ? t - n / 2 : L ? t + 4 * n : t - 4 * n, r - n],
                            ...e,
                          ];
                        }
                        case "left":
                          return [
                            [P || O ? S.right - n : S.left, S.top],
                            [
                              P ? (O ? S.right - n : S.left) : S.right - n,
                              S.bottom,
                            ],
                            [
                              t + n + 1,
                              O ? r + n / 2 : P ? r + 4 * n : r - 4 * n,
                            ],
                            [
                              t + n + 1,
                              O ? r - n / 2 : P ? r + 4 * n : r - 4 * n,
                            ],
                          ];
                        case "right": {
                          let e = [
                            [P || O ? S.left + n : S.right, S.top],
                            [
                              P ? (O ? S.left + n : S.right) : S.left + n,
                              S.bottom,
                            ],
                          ];
                          return [
                            [t - n, O ? r + n / 2 : P ? r + 4 * n : r - 4 * n],
                            [t - n, O ? r - n / 2 : P ? r + 4 * n : r - 4 * n],
                            ...e,
                          ];
                        }
                      }
                    })([r, c])
                  )
                    ? !i && o && (t = window.setTimeout(v, 40))
                    : v();
                }
              };
            };
          return (c.__options = { blockPointerEvents: r }), c;
        }
      }
    },
    11286: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useDialogPopup: () => l });
      var r = e.i(38653),
        o = e.i(23869);
      e.i(61397);
      var i = e.i(56624);
      function l(e) {
        let {
            descriptionElementId: t,
            getPopupProps: n,
            initialFocus: l,
            modal: u,
            mounted: s,
            openMethod: a,
            ref: c,
            setPopupElement: f,
            titleElementId: d,
          } = e,
          m = (0, r.useRef)(null),
          g = (0, o.useForkRef)(c, m, f),
          p = (0, r.useCallback)((e) => ("touch" === e ? m : 0), []);
        return {
          getRootProps: (e) =>
            (0, i.mergeProps)(
              {
                "aria-labelledby": d ?? void 0,
                "aria-describedby": t ?? void 0,
                "aria-modal": (!!s && !0 === u) || void 0,
                role: "dialog",
                tabIndex: -1,
                ...n(),
                ref: g,
                hidden: !s,
              },
              e
            ),
          resolvedInitialFocus: (0, r.useMemo)(
            () =>
              null == l ? p(a ?? "") : "function" == typeof l ? l(a ?? "") : l,
            [p, l, a]
          ),
        };
      }
    },
    29981: function (e) {
      var { g: t, __dirname: n, m: r, e: o } = e;
      ("use strict");
      r.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    },
    93892: function (e) {
      var { g: t, __dirname: n, m: r, e: o } = e;
      ("use strict");
      var i = e.r(29981);
      function l() {}
      function u() {}
      (u.resetWarningCache = l),
        (r.exports = function () {
          function e(e, t, n, r, o, l) {
            if (l !== i) {
              var u = Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
              );
              throw ((u.name = "Invariant Violation"), u);
            }
          }
          function t() {
            return e;
          }
          e.isRequired = e;
          var n = {
            array: e,
            bigint: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            elementType: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t,
            checkPropTypes: u,
            resetWarningCache: l,
          };
          return (n.PropTypes = n), n;
        });
    },
    14481: function (e) {
      var { g: t, __dirname: n, m: r, e: o } = e;
      e.i(22271), (r.exports = e.r(93892)());
    },
    43193: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ HTMLElementType: () => o, exactProp: () => i, refType: () => t }),
          e.i(22271);
        var r = e.i(14481);
        let t = r.default.oneOfType([r.default.func, r.default.object]);
        function o(e, t, n, r, o) {
          return null;
        }
        function i(e) {
          return e;
        }
      }
    },
    54737: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogPopupCssVars: () => t });
        let t = (function (e) {
          return (e.nestedDialogs = "--nested-dialogs"), e;
        })({});
      }
    },
    83038: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogPopupDataAttributes: () => t });
        var r = e.i(91015);
        let t = (function (e) {
          return (
            (e[(e.open = r.CommonPopupDataAttributes.open)] = "open"),
            (e[(e.closed = r.CommonPopupDataAttributes.closed)] = "closed"),
            (e[(e.startingStyle = r.CommonPopupDataAttributes.startingStyle)] =
              "startingStyle"),
            (e[(e.endingStyle = r.CommonPopupDataAttributes.endingStyle)] =
              "endingStyle"),
            (e.nested = "data-nested"),
            (e.nestedDialogOpen = "data-nested-dialog-open"),
            e
          );
        })({});
      }
    },
    8964: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ InternalBackdrop: () => t }), e.i(22271);
        var r = e.i(38653),
          o = e.i(58064);
        let t = (0, r.forwardRef)(function (e, t) {
          return (0,
          o.jsx)("div", { ref: t, role: "presentation", "data-floating-ui-inert": !0, ...e, style: { position: "fixed", inset: 0, userSelect: "none", WebkitUserSelect: "none" } });
        });
      }
    },
    52478: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogPortalContext: () => t, useDialogPortalContext: () => o });
        var r = e.i(38653);
        let t = (0, r.createContext)(void 0);
        function o() {
          let e = (0, r.useContext)(t);
          if (void 0 === e) throw Error("Base UI: <Dialog.Portal> is missing.");
          return e;
        }
      }
    },
    84556: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useAnimationsFinished: () => l });
      var r = e.i(38653),
        o = e.i(95168),
        i = e.i(44142);
      function l(e, t = !1) {
        let n = (0, r.useRef)(-1),
          u = (0, r.useRef)(-1),
          s = (0, i.useEventCallback)(() => {
            cancelAnimationFrame(n.current), clearTimeout(u.current);
          });
        return (
          (0, r.useEffect)(() => s, [s]),
          (0, i.useEventCallback)((r, i = null) => {
            s();
            let l = e.current;
            l &&
              ("function" != typeof l.getAnimations ||
              globalThis.BASE_UI_ANIMATIONS_DISABLED
                ? r()
                : (n.current = requestAnimationFrame(() => {
                    function e() {
                      l &&
                        Promise.allSettled(
                          l.getAnimations().map((e) => e.finished)
                        ).then(() => {
                          (null != i && i.aborted) || (0, o.flushSync)(r);
                        });
                    }
                    t ? (u.current = window.setTimeout(e)) : e();
                  })));
          })
        );
      }
    },
    36957: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useLatestRef: () => i });
      var r = e.i(38653),
        o = e.i(23695);
      function i(e) {
        let t = (0, r.useRef)(e);
        return (
          (0, o.useEnhancedEffect)(() => {
            t.current = e;
          }),
          t
        );
      }
    },
    9303: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useOpenChangeComplete: () => u });
      var r = e.i(38653),
        o = e.i(84556),
        i = e.i(44142),
        l = e.i(36957);
      function u(e) {
        let { enabled: t = !0, open: n, ref: u, onComplete: s } = e,
          a = (0, l.useLatestRef)(n),
          c = (0, i.useEventCallback)(s),
          f = (0, o.useAnimationsFinished)(u, n);
        (0, r.useEffect)(() => {
          t &&
            f(() => {
              n === a.current && c();
            });
        }, [t, n, c, f, a]);
      }
    },
    37835: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ inertValue: () => o });
      var r = e.i(3855);
      function o(e) {
        return (0, r.isReactVersionAtLeast)(19) ? e : e ? "true" : void 0;
      }
    },
    71439: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogPopup: () => n }), e.i(22271);
        var r = e.i(38653),
          o = e.i(4993),
          i = e.i(11286),
          l = e.i(99714),
          u = e.i(94893);
        e.i(43193);
        var s = e.i(91015),
          a = e.i(23869),
          c = e.i(13209),
          f = e.i(54737),
          d = e.i(83038),
          m = e.i(8964),
          g = e.i(52478),
          p = e.i(9303),
          v = e.i(37835),
          h = e.i(58064);
        let t = {
            ...s.popupStateMapping,
            ...c.transitionStatusMapping,
            nestedDialogOpen: (e) =>
              e ? { [d.DialogPopupDataAttributes.nestedDialogOpen]: "" } : null,
          },
          n = (0, r.forwardRef)(function (e, n) {
            let {
                className: s,
                finalFocus: c,
                initialFocus: d,
                render: y,
                ...b
              } = e,
              {
                descriptionElementId: E,
                dismissible: x,
                floatingRootContext: w,
                getPopupProps: R,
                modal: C,
                mounted: S,
                nested: T,
                nestedOpenDialogCount: L,
                setOpen: P,
                open: k,
                openMethod: D,
                popupRef: M,
                setPopupElement: O,
                titleElementId: A,
                transitionStatus: I,
                onOpenChangeComplete: N,
                internalBackdropRef: F,
              } = (0, l.useDialogRootContext)();
            (0, g.useDialogPortalContext)(),
              (0, p.useOpenChangeComplete)({
                open: k,
                ref: M,
                onComplete() {
                  k && N?.(!0);
                },
              });
            let j = (0, a.useForkRef)(n, M),
              { getRootProps: H, resolvedInitialFocus: _ } = (0,
              i.useDialogPopup)({
                descriptionElementId: E,
                getPopupProps: R,
                initialFocus: d,
                modal: C,
                mounted: S,
                setOpen: P,
                openMethod: D,
                ref: j,
                setPopupElement: O,
                titleElementId: A,
              }),
              B = L > 0,
              W = (0, r.useMemo)(
                () => ({
                  open: k,
                  nested: T,
                  transitionStatus: I,
                  nestedDialogOpen: B,
                }),
                [k, T, I, B]
              ),
              { renderElement: U } = (0, u.useComponentRenderer)({
                render: y ?? "div",
                className: s,
                state: W,
                propGetter: H,
                extraProps: {
                  ...b,
                  style: {
                    ...b.style,
                    [f.DialogPopupCssVars.nestedDialogs]: L,
                  },
                },
                customStyleHookMapping: t,
              });
            return (0,
            h.jsxs)(r.Fragment, { children: [S && !0 === C && (0, h.jsx)(m.InternalBackdrop, { ref: F, inert: (0, v.inertValue)(!k) }), (0, h.jsx)(o.FloatingFocusManager, { context: w, disabled: !S, closeOnFocusOut: x, initialFocus: _, returnFocus: c, modal: !1 !== C, children: U() })] });
          });
      }
    },
    74457: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ DialogPortal: () => u }), e.i(22271), e.i(38653);
      var r = e.i(4993),
        o = e.i(99714),
        i = e.i(52478);
      e.i(43193);
      var l = e.i(58064);
      function u(e) {
        let { children: t, keepMounted: n = !1, container: u } = e,
          { mounted: s } = (0, o.useDialogRootContext)();
        return s || n
          ? (0, l.jsx)(i.DialogPortalContext.Provider, {
              value: n,
              children: (0, l.jsx)(r.FloatingPortal, { root: u, children: t }),
            })
          : null;
      }
    },
    81549: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useControlled: () => o }), e.i(22271);
      var r = e.i(38653);
      function o({ controlled: e, default: t, name: n, state: o = "value" }) {
        let { current: i } = (0, r.useRef)(void 0 !== e),
          [l, u] = (0, r.useState)(t),
          s = (0, r.useCallback)((e) => {
            i || u(e);
          }, []);
        return [i ? e : l, s];
      }
    },
    24153: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ useLayoutEffect: () => t });
        var r = e.i(38653);
        let t =
          "undefined" != typeof document ? r.default.useLayoutEffect : () => {};
      }
    },
    4853: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        function r(e) {
          var t;
          return (
            "undefined" != typeof window &&
            null != window.navigator &&
            ((null == (t = window.navigator.userAgentData)
              ? void 0
              : t.brands.some((t) => e.test(t.brand))) ||
              e.test(window.navigator.userAgent))
          );
        }
        function o(e) {
          var t;
          return (
            "undefined" != typeof window &&
            null != window.navigator &&
            e.test(
              (null == (t = window.navigator.userAgentData)
                ? void 0
                : t.platform) || window.navigator.platform
            )
          );
        }
        function i(e) {
          let t = null;
          return () => (null == t && (t = e()), t);
        }
        e.s({
          isAndroid: () => f,
          isAppleDevice: () => s,
          isChrome: () => c,
          isFirefox: () => d,
          isIOS: () => u,
          isIPad: () => l,
          isIPhone: () => n,
          isMac: () => t,
          isWebKit: () => a,
        }),
          e.i(22271);
        let t = i(function () {
            return o(/^Mac/i);
          }),
          n = i(function () {
            return o(/^iPhone/i);
          }),
          l = i(function () {
            return o(/^iPad/i) || (t() && navigator.maxTouchPoints > 1);
          }),
          u = i(function () {
            return n() || l();
          }),
          s = i(function () {
            return t() || u();
          }),
          a = i(function () {
            return r(/AppleWebKit/i) && !c();
          }),
          c = i(function () {
            return r(/Chrome/i);
          }),
          f = i(function () {
            return r(/Android/i);
          }),
          d = i(function () {
            return r(/Firefox/i);
          });
      }
    },
    85797: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r(...e) {
        return (...t) => {
          for (let n of e) "function" == typeof n && n(...t);
        };
      }
      e.s({ chain: () => r });
    },
    69093: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r(e, t) {
        if (!e) return !1;
        let n = window.getComputedStyle(e),
          r = /(auto|scroll)/.test(n.overflow + n.overflowX + n.overflowY);
        return (
          r &&
            t &&
            (r =
              e.scrollHeight !== e.clientHeight ||
              e.scrollWidth !== e.clientWidth),
          r
        );
      }
      e.s({ isScrollable: () => r });
    },
    76928: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ getScrollParent: () => o });
      var r = e.i(69093);
      function o(e, t) {
        let n = e;
        for (
          (0, r.isScrollable)(n, t) && (n = n.parentElement);
          n && !(0, r.isScrollable)(n, t);

        )
          n = n.parentElement;
        return n || document.scrollingElement || document.documentElement;
      }
    },
    8337: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        let t;
        e.s({ usePreventScroll: () => u });
        var r = e.i(24153),
          o = e.i(4853),
          i = e.i(85797),
          l = e.i(76928);
        let n = "undefined" != typeof document && window.visualViewport,
          f = new Set([
            "checkbox",
            "radio",
            "range",
            "color",
            "file",
            "image",
            "button",
            "submit",
            "reset",
          ]),
          d = 0;
        function u(e = {}) {
          let { isDisabled: m } = e;
          (0, r.useLayoutEffect)(() => {
            if (!m) {
              let e, r, u, m, g;
              return (
                1 == ++d &&
                  (t = (0, o.isIOS)()
                    ? ((u = null),
                      (m = () => {
                        if (u) return;
                        let e = window.pageXOffset,
                          t = window.pageYOffset;
                        (u = (0, i.chain)(
                          a(window, "scroll", () => {
                            window.scrollTo(0, 0);
                          }),
                          s(
                            document.documentElement,
                            "paddingRight",
                            `${
                              window.innerWidth -
                              document.documentElement.clientWidth
                            }px`
                          ),
                          s(document.documentElement, "overflow", "hidden"),
                          s(document.body, "marginTop", `-${t}px`),
                          () => {
                            window.scrollTo(e, t);
                          }
                        )),
                          window.scrollTo(0, 0);
                      }),
                      (g = (0, i.chain)(
                        a(
                          document,
                          "touchstart",
                          (t) => {
                            ((e = (0, l.getScrollParent)(t.target, !0)) !==
                              document.documentElement ||
                              e !== document.body) &&
                              e instanceof HTMLElement &&
                              "auto" ===
                                window.getComputedStyle(e).overscrollBehavior &&
                              (r = s(e, "overscrollBehavior", "contain"));
                          },
                          { passive: !1, capture: !0 }
                        ),
                        a(
                          document,
                          "touchmove",
                          (t) => {
                            if (
                              !e ||
                              e === document.documentElement ||
                              e === document.body
                            )
                              return void t.preventDefault();
                            e.scrollHeight === e.clientHeight &&
                              e.scrollWidth === e.clientWidth &&
                              t.preventDefault();
                          },
                          { passive: !1, capture: !0 }
                        ),
                        a(
                          document,
                          "touchend",
                          () => {
                            r && r();
                          },
                          { passive: !1, capture: !0 }
                        ),
                        a(
                          document,
                          "focus",
                          (e) => {
                            var t;
                            let r = e.target;
                            (((t = r) instanceof HTMLInputElement &&
                              !f.has(t.type)) ||
                              t instanceof HTMLTextAreaElement ||
                              (t instanceof HTMLElement &&
                                t.isContentEditable)) &&
                              (m(),
                              (r.style.transform = "translateY(-2000px)"),
                              requestAnimationFrame(() => {
                                (r.style.transform = ""),
                                  n &&
                                    (n.height < window.innerHeight
                                      ? requestAnimationFrame(() => {
                                          c(r);
                                        })
                                      : n.addEventListener(
                                          "resize",
                                          () => c(r),
                                          { once: !0 }
                                        ));
                              }));
                          },
                          !0
                        )
                      )),
                      () => {
                        null == r || r(), null == u || u(), g();
                      })
                    : (0, i.chain)(
                        s(
                          document.documentElement,
                          "paddingRight",
                          `${
                            window.innerWidth -
                            document.documentElement.clientWidth
                          }px`
                        ),
                        s(document.documentElement, "overflow", "hidden")
                      )),
                () => {
                  0 == --d && t();
                }
              );
            }
          }, [m]);
        }
        function s(e, t, n) {
          let r = e.style[t];
          return (
            (e.style[t] = n),
            () => {
              e.style[t] = r;
            }
          );
        }
        function a(e, t, n, r) {
          return (
            e.addEventListener(t, n, r),
            () => {
              e.removeEventListener(t, n, r);
            }
          );
        }
        function c(e) {
          let t = document.scrollingElement || document.documentElement,
            n = e;
          for (; n && n !== t; ) {
            let e = (0, l.getScrollParent)(n);
            if (
              e !== document.documentElement &&
              e !== document.body &&
              e !== n
            ) {
              let t = e.getBoundingClientRect().top,
                r = n.getBoundingClientRect().top;
              r > t + n.clientHeight && (e.scrollTop += r - t);
            }
            n = e.parentElement;
          }
        }
      }
    },
    92012: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({
        getNavigatorData: () => o,
        isFirefox: () => u,
        isIOS: () => l,
        isWebKit: () => i,
      });
      var r = e.i(6661);
      function o() {
        if ("undefined" == typeof navigator)
          return { platform: "", maxTouchPoints: -1 };
        let e = navigator.userAgentData;
        return e?.platform
          ? { platform: e.platform, maxTouchPoints: navigator.maxTouchPoints }
          : {
              platform: navigator.platform,
              maxTouchPoints: navigator.maxTouchPoints,
            };
      }
      function i() {
        return (
          "undefined" != typeof CSS &&
          !!CSS.supports &&
          CSS.supports("-webkit-backdrop-filter:none")
        );
      }
      function l() {
        let e = o();
        return (
          ("MacIntel" === e.platform && e.maxTouchPoints > 1) ||
          /iP(hone|ad|od)|iOS/.test(e.platform)
        );
      }
      function u() {
        return /firefox/i.test((0, r.getUserAgent)());
      }
    },
    52731: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r(e) {
        return (e && e.ownerDocument) || document;
      }
      function o(e) {
        return r(e).defaultView || window;
      }
      e.s({ ownerDocument: () => r, ownerWindow: () => o });
    },
    64726: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ getPreventScrollCount: () => s, useScrollLock: () => a });
        var r = e.i(38653),
          o = e.i(8337),
          i = e.i(92012),
          l = e.i(52731),
          u = e.i(23695);
        let t = {},
          n = {},
          c = "",
          f = 0,
          d = () => {};
        function s() {
          return f;
        }
        function a(e) {
          let { enabled: s = !0, mounted: a, open: m, referenceElement: g } = e,
            p = (0, r.useMemo)(
              () =>
                s &&
                ((0, i.isIOS)() ||
                  !(
                    "undefined" != typeof CSS &&
                    "function" == typeof CSS.supports &&
                    CSS.supports("height", "1dvh")
                  ) ||
                  ((0, i.isFirefox)() &&
                    !(function (e) {
                      if ("undefined" == typeof document) return !1;
                      let t = (0, l.ownerDocument)(e);
                      return (
                        (0, l.ownerWindow)(t).innerWidth -
                          t.documentElement.clientWidth >
                        0
                      );
                    })(g))),
              [s, g]
            );
          (0, u.useEnhancedEffect)(() => {
            if (a && !m && (0, i.isWebKit)()) {
              let e = (0, l.ownerDocument)(g),
                t = e.body.style.userSelect,
                n = e.body.style.webkitUserSelect;
              return (
                (e.body.style.userSelect = "none"),
                (e.body.style.webkitUserSelect = "none"),
                () => {
                  (e.body.style.userSelect = t),
                    (e.body.style.webkitUserSelect = n);
                }
              );
            }
          }, [a, m, g]),
            (0, o.usePreventScroll)({ isDisabled: !p }),
            (0, u.useEnhancedEffect)(() => {
              if (s && !p)
                return (
                  1 === (f += 1) &&
                    (d = (function (e) {
                      let r = (0, l.ownerDocument)(e),
                        o = r.documentElement,
                        u = r.body,
                        s = (0, l.ownerWindow)(o),
                        a = 0,
                        f = 0,
                        d = -1;
                      if (
                        (0, i.isWebKit)() &&
                        (s.visualViewport?.scale ?? 1) !== 1
                      )
                        return () => {};
                      function m() {
                        let e = s.getComputedStyle(o),
                          r = s.getComputedStyle(u);
                        (a = o.scrollTop),
                          (f = o.scrollLeft),
                          (t = {
                            overflowY: o.style.overflowY,
                            overflowX: o.style.overflowX,
                          }),
                          (c = o.style.scrollBehavior),
                          (n = {
                            position: u.style.position,
                            height: u.style.height,
                            width: u.style.width,
                            boxSizing: u.style.boxSizing,
                            overflowY: u.style.overflowY,
                            overflowX: u.style.overflowX,
                            scrollBehavior: u.style.scrollBehavior,
                          });
                        let i = e.scrollbarGutter?.includes("stable"),
                          l = o.scrollHeight > o.clientHeight,
                          d = o.scrollWidth > o.clientWidth,
                          m =
                            "scroll" === e.overflowY ||
                            "scroll" === r.overflowY,
                          g =
                            "scroll" === e.overflowX ||
                            "scroll" === r.overflowX,
                          p = Math.max(0, s.innerWidth - o.clientWidth),
                          v = Math.max(0, s.innerHeight - o.clientHeight);
                        Object.assign(o.style, {
                          overflowY: !i && (l || m) ? "scroll" : "hidden",
                          overflowX: !i && (d || g) ? "scroll" : "hidden",
                        });
                        let h =
                            parseFloat(r.marginTop) +
                            parseFloat(r.marginBottom),
                          y =
                            parseFloat(r.marginLeft) +
                            parseFloat(r.marginRight);
                        Object.assign(u.style, {
                          position: "relative",
                          height:
                            h || v ? `calc(100dvh - ${h + v}px)` : "100dvh",
                          width: y || p ? `calc(100vw - ${y + p}px)` : "100vw",
                          boxSizing: "border-box",
                          overflow: "hidden",
                          scrollBehavior: "unset",
                        }),
                          (u.scrollTop = a),
                          (u.scrollLeft = f),
                          o.setAttribute("data-base-ui-scroll-locked", ""),
                          (o.style.scrollBehavior = "unset");
                      }
                      function g() {
                        Object.assign(o.style, t),
                          Object.assign(u.style, n),
                          (o.scrollTop = a),
                          (o.scrollLeft = f),
                          o.removeAttribute("data-base-ui-scroll-locked"),
                          (o.style.scrollBehavior = c);
                      }
                      function p() {
                        g(),
                          cancelAnimationFrame(d),
                          (d = requestAnimationFrame(m));
                      }
                      return (
                        m(),
                        s.addEventListener("resize", p),
                        () => {
                          cancelAnimationFrame(d),
                            g(),
                            s.removeEventListener("resize", p);
                        }
                      );
                    })(g)),
                  () => {
                    0 == (f -= 1) && d();
                  }
                );
            }, [s, p, g]);
        }
      }
    },
    87174: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useTransitionStatus: () => i });
      var r = e.i(38653),
        o = e.i(23695);
      function i(e) {
        let [t, n] = (0, r.useState)(e ? "idle" : void 0),
          [i, l] = (0, r.useState)(e);
        return (
          e && !i && (l(!0), n("starting")),
          !e && i && "ending" !== t && n("ending"),
          e || i || "ending" !== t || n(void 0),
          (0, o.useEnhancedEffect)(() => {
            if (!e) return;
            e && i && "idle" !== t && n("starting");
            let r = requestAnimationFrame(() => {
              n("idle");
            });
            return () => {
              cancelAnimationFrame(r);
            };
          }, [e, i, n, t]),
          (0, r.useMemo)(
            () => ({ mounted: i, setMounted: l, transitionStatus: t }),
            [i, t]
          )
        );
      }
    },
    88455: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useEnhancedClickHandler: () => o });
      var r = e.i(38653);
      function o(e) {
        let t = (0, r.useRef)(""),
          n = (0, r.useCallback)((e) => {
            e.defaultPrevented || (t.current = e.pointerType);
          }, []);
        return {
          onClick: (0, r.useCallback)(
            (n) => {
              if (0 === n.detail) return void e(n, "keyboard");
              "pointerType" in n && e(n, n.pointerType),
                e(n, t.current),
                (t.current = "");
            },
            [e]
          ),
          onPointerDown: n,
        };
      }
    },
    54521: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useOpenInteractionType: () => i });
      var r = e.i(38653),
        o = e.i(88455);
      function i(e) {
        let [t, n] = (0, r.useState)(null);
        e || null === t || n(null);
        let i = (0, r.useCallback)(
            (t, r) => {
              e || n(r);
            },
            [e, n]
          ),
          { onClick: l, onPointerDown: u } = (0, o.useEnhancedClickHandler)(i);
        return (0, r.useMemo)(
          () => ({
            openMethod: t,
            triggerProps: { onClick: l, onPointerDown: u },
          }),
          [t, l, u]
        );
      }
    },
    50422: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      function r(e) {
        if (e)
          return {
            click: "click",
            hover: "hover",
            focus: "focus",
            "focus-out": "focus-out",
            "escape-key": "escape-key",
            "outside-press": "outside-press",
            "reference-press": "trigger-press",
            "safe-polygon": "hover",
            "ancestor-scroll": void 0,
            "list-navigation": void 0,
          }[e];
      }
      e.s({ translateOpenChangeReason: () => r });
    },
    18923: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useIOSKeyboardSlideFix: () => c });
      var r = e.i(38653),
        o = e.i(6661),
        i = e.i(23695),
        l = e.i(92012),
        u = e.i(52731),
        s = e.i(44142),
        a = e.i(64726);
      function c(e) {
        let { enabled: t, setLock: n, popupRef: c } = e,
          f = (0, s.useEventCallback)(n),
          d = (0, r.useRef)(t);
        (0, i.useEnhancedEffect)(() => {
          if (!(0, l.isIOS)() || (t && (d.current = !0), !d.current)) return;
          let e = (0, u.ownerDocument)(c.current).documentElement;
          if (t) {
            let t = e.scrollLeft,
              n = e.scrollTop;
            return () => {
              0 === (0, a.getPreventScrollCount)() &&
                ((e.scrollLeft = t), (e.scrollTop = n));
            };
          }
        }, [t, c]);
        let m = (0, s.useEventCallback)((e) => {
          if (!(0, l.isIOS)()) return;
          let t = (0, o.getTarget)(e.nativeEvent);
          (0, o.isTypeableElement)(t) && (f(!1), setTimeout(() => f(!0)));
        });
        return (0, r.useMemo)(
          () => ({ floating: { onFocus: m, onClick: m } }),
          [m]
        );
      }
    },
    45381: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ useDialogRoot: () => p });
      var r = e.i(38653),
        o = e.i(4993),
        i = e.i(6661),
        l = e.i(81549),
        u = e.i(44142),
        s = e.i(64726),
        a = e.i(87174),
        c = e.i(54521);
      e.i(61397);
      var f = e.i(56624),
        d = e.i(9303),
        m = e.i(50422),
        g = e.i(18923);
      function p(e) {
        let {
            defaultOpen: t,
            dismissible: n,
            modal: p,
            onNestedDialogClose: v,
            onNestedDialogOpen: h,
            onOpenChange: y,
            open: b,
            onOpenChangeComplete: E,
          } = e,
          [x, w] = (0, l.useControlled)({
            controlled: b,
            default: t,
            name: "DialogRoot",
            state: "open",
          }),
          R = (0, r.useRef)(null),
          C = (0, r.useRef)(null),
          S = (0, r.useRef)(null),
          [T, L] = (0, r.useState)(void 0),
          [P, k] = (0, r.useState)(void 0),
          [D, M] = (0, r.useState)(null),
          [O, A] = (0, r.useState)(null),
          [I, N] = (0, r.useState)(!0),
          {
            mounted: F,
            setMounted: j,
            transitionStatus: H,
          } = (0, a.useTransitionStatus)(x),
          _ = (0, u.useEventCallback)((e, t, n) => {
            y?.(e, t, n), w(e);
          }),
          B = (0, u.useEventCallback)(() => {
            j(!1), E?.(!1);
          });
        (0, d.useOpenChangeComplete)({
          enabled: !e.actionsRef,
          open: x,
          ref: R,
          onComplete() {
            x || B();
          },
        }),
          (0, r.useImperativeHandle)(e.actionsRef, () => ({ unmount: B }), [B]);
        let W = (0, o.useFloatingRootContext)({
            elements: { reference: D, floating: O },
            open: x,
            onOpenChange: (e, t, n) => {
              _(e, t, (0, m.translateOpenChangeReason)(n));
            },
          }),
          [U, K] = (0, r.useState)(0),
          z = 0 === U,
          V = (0, o.useRole)(W),
          G = (0, o.useClick)(W),
          q = (0, o.useDismiss)(W, {
            outsidePressEvent: "mousedown",
            outsidePress(e) {
              if (0 !== e.button) return !1;
              let t = (0, i.getTarget)(e);
              return (
                !!z &&
                !!n &&
                (!p || (!!t && [S.current, C.current].includes(t)))
              );
            },
            escapeKey: z,
          }),
          X = x && !0 === p,
          Y = X && I,
          $ = (0, g.useIOSKeyboardSlideFix)({
            enabled: X,
            setLock: N,
            popupRef: R,
          });
        (0, s.useScrollLock)({
          enabled: Y,
          mounted: F,
          open: x,
          referenceElement: O,
        });
        let { getReferenceProps: J, getFloatingProps: Q } = (0,
        o.useInteractions)([V, G, q, $]);
        (0, r.useEffect)(
          () => (
            h && x && h(U),
            v && !x && v(),
            () => {
              v && x && v();
            }
          ),
          [x, v, h, U]
        );
        let Z = (0, r.useCallback)((e) => {
            K(e + 1);
          }, []),
          ee = (0, r.useCallback)(() => {
            K(0);
          }, []),
          { openMethod: et, triggerProps: en } = (0, c.useOpenInteractionType)(
            x
          ),
          er = (0, r.useCallback)(
            (e = {}) => J((0, f.mergeProps)(en, e)),
            [J, en]
          );
        return (0, r.useMemo)(
          () => ({
            modal: p,
            setOpen: _,
            open: x,
            titleElementId: T,
            setTitleElementId: L,
            descriptionElementId: P,
            setDescriptionElementId: k,
            onNestedDialogOpen: Z,
            onNestedDialogClose: ee,
            nestedOpenDialogCount: U,
            openMethod: et,
            mounted: F,
            transitionStatus: H,
            getTriggerProps: er,
            getPopupProps: Q,
            setTriggerElement: M,
            setPopupElement: A,
            popupRef: R,
            backdropRef: C,
            internalBackdropRef: S,
            floatingRootContext: W,
          }),
          [p, _, x, T, P, Z, ee, U, et, F, H, er, Q, W]
        );
      }
    },
    99377: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogRoot: () => t }), e.i(22271);
        var r = e.i(38653),
          o = e.i(99714),
          i = e.i(65862),
          l = e.i(45381),
          u = e.i(58064);
        let t = function (e) {
          let {
              children: t,
              defaultOpen: n = !1,
              dismissible: s = !0,
              modal: a = !0,
              onOpenChange: c,
              open: f,
              actionsRef: d,
              onOpenChangeComplete: m,
            } = e,
            g = (0, o.useOptionalDialogRootContext)(),
            p = (0, l.useDialogRoot)({
              open: f,
              defaultOpen: n,
              onOpenChange: c,
              modal: a,
              dismissible: s,
              actionsRef: d,
              onOpenChangeComplete: m,
              onNestedDialogClose: g?.onNestedDialogClose,
              onNestedDialogOpen: g?.onNestedDialogOpen,
            }),
            v = !!g,
            h = (0, r.useMemo)(
              () => ({ ...p, nested: v, onOpenChangeComplete: m }),
              [p, v, m]
            ),
            y = (0, r.useMemo)(() => ({ dismissible: s }), [s]);
          return (0, u.jsx)(i.DialogContext.Provider, {
            value: h,
            children: (0, u.jsx)(o.DialogRootContext.Provider, {
              value: y,
              children: t,
            }),
          });
        };
      }
    },
    61746: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogTitle: () => n }), e.i(22271);
        var r = e.i(38653),
          o = e.i(99714);
        e.i(61397);
        var i = e.i(56624),
          l = e.i(94893),
          u = e.i(23695),
          s = e.i(68859);
        let t = {},
          n = (0, r.forwardRef)(function (e, n) {
            let { render: a, className: c, id: f, ...d } = e,
              { setTitleElementId: m } = (0, o.useDialogRootContext)(),
              g = (0, s.useBaseUiId)(f);
            (0, u.useEnhancedEffect)(
              () => (
                m(g),
                () => {
                  m(void 0);
                }
              ),
              [g, m]
            );
            let p = (0, r.useCallback)(
                (e = {}) => (0, i.mergeProps)({ id: g }, e),
                [g]
              ),
              { renderElement: v } = (0, l.useComponentRenderer)({
                propGetter: p,
                render: a ?? "h2",
                className: c,
                state: t,
                ref: n,
                extraProps: d,
              });
            return v();
          });
      }
    },
    89229: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ DialogTrigger: () => t }), e.i(22271);
        var r = e.i(38653),
          o = e.i(99714),
          i = e.i(7294),
          l = e.i(94893),
          u = e.i(23869),
          s = e.i(91015);
        let t = (0, r.forwardRef)(function (e, t) {
          let { render: n, className: a, disabled: c = !1, ...f } = e,
            {
              open: d,
              setTriggerElement: m,
              getTriggerProps: g,
            } = (0, o.useDialogRootContext)(),
            p = (0, r.useMemo)(() => ({ disabled: c, open: d }), [c, d]),
            v = (0, u.useForkRef)(t, m),
            { getButtonProps: h } = (0, i.useButton)({
              disabled: c,
              buttonRef: v,
            }),
            { renderElement: y } = (0, l.useComponentRenderer)({
              render: n ?? "button",
              className: a,
              state: p,
              propGetter: (e) => h(g(e)),
              extraProps: f,
              customStyleHookMapping: s.triggerOpenStateMapping,
            });
          return y();
        });
      }
    },
    93957: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({}),
        e.i(67056),
        e.i(49191),
        e.i(85944),
        e.i(71439),
        e.i(74457),
        e.i(99377),
        e.i(61746),
        e.i(89229);
    },
    50245: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({}),
        e.i(67056),
        e.i(49191),
        e.i(85944),
        e.i(71439),
        e.i(74457),
        e.i(99377),
        e.i(61746),
        e.i(89229),
        e.i(93957);
    },
    70458: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({}), e.i(50245);
    },
    58092: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({}), e.i(50245), e.i(70458);
    },
    33196: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({
        Backdrop: () => r.DialogBackdrop,
        Close: () => o.DialogClose,
        Description: () => i.DialogDescription,
        Popup: () => l.DialogPopup,
        Portal: () => u.DialogPortal,
        Root: () => s.DialogRoot,
        Title: () => a.DialogTitle,
        Trigger: () => c.DialogTrigger,
      });
      var r = e.i(67056),
        o = e.i(49191),
        i = e.i(85944),
        l = e.i(71439),
        u = e.i(74457),
        s = e.i(99377),
        a = e.i(61746),
        c = e.i(89229);
      e.i(93957);
    },
    56480: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({
        Backdrop: () => r.Backdrop,
        Close: () => r.Close,
        Description: () => r.Description,
        Popup: () => r.Popup,
        Portal: () => r.Portal,
        Root: () => r.Root,
        Title: () => r.Title,
        Trigger: () => r.Trigger,
      }),
        e.i(50245);
      var r = e.i(33196);
    },
    84678: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ Dialog: () => r });
      var r = e.i(56480);
    },
    50609: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({
          combine: () => r,
          createJSONStorage: () => o,
          devtools: () => c,
          persist: () => g,
          redux: () => n,
          subscribeWithSelector: () => d,
        });
        let t = {
            get url() {
              return `file://${e.P("node_modules/zustand/esm/middleware.mjs")}`;
            },
          },
          n = (e, t) => (n, r, o) => (
            (o.dispatch = (t) => (n((n) => e(n, t), !1, t), t)),
            (o.dispatchFromDevtools = !0),
            { dispatch: (...e) => o.dispatch(...e), ...t }
          ),
          i = new Map(),
          l = (e) => {
            let t = i.get(e);
            return t
              ? Object.fromEntries(
                  Object.entries(t.stores).map(([e, t]) => [e, t.getState()])
                )
              : {};
          },
          u = (e, t, n) => {
            if (void 0 === e)
              return { type: "untracked", connection: t.connect(n) };
            let r = i.get(n.name);
            if (r) return { type: "tracked", store: e, ...r };
            let o = { connection: t.connect(n), stores: {} };
            return i.set(n.name, o), { type: "tracked", store: e, ...o };
          },
          s = (e, t) => {
            if (void 0 === t) return;
            let n = i.get(e);
            n &&
              (delete n.stores[t],
              0 === Object.keys(n.stores).length && i.delete(e));
          },
          a = (e) => {
            var t, n;
            if (!e) return;
            let r = e.split("\n"),
              o = r.findIndex((e) => e.includes("api.setState"));
            if (o < 0) return;
            let i = (null == (t = r[o + 1]) ? void 0 : t.trim()) || "";
            return null == (n = /.+ (.+) .+/.exec(i)) ? void 0 : n[1];
          },
          c =
            (e, n = {}) =>
            (r, o, i) => {
              let c,
                { enabled: d, anonymousActionType: m, store: g, ...p } = n;
              try {
                c =
                  (null != d
                    ? d
                    : (t.env ? t.env.MODE : void 0) !== "production") &&
                  window.__REDUX_DEVTOOLS_EXTENSION__;
              } catch (e) {}
              if (!c) return e(r, o, i);
              let { connection: v, ...h } = u(g, c, p),
                y = !0;
              (i.setState = (e, t, n) => {
                let u = r(e, t);
                if (!y) return u;
                let s = a(Error().stack),
                  c =
                    void 0 === n
                      ? { type: m || s || "anonymous" }
                      : "string" == typeof n
                      ? { type: n }
                      : n;
                return (
                  void 0 === g
                    ? null == v || v.send(c, o())
                    : null == v ||
                      v.send(
                        { ...c, type: `${g}/${c.type}` },
                        { ...l(p.name), [g]: i.getState() }
                      ),
                  u
                );
              }),
                (i.devtools = {
                  cleanup: () => {
                    v && "function" == typeof v.unsubscribe && v.unsubscribe(),
                      s(p.name, g);
                  },
                });
              let b = (...e) => {
                  let t = y;
                  (y = !1), r(...e), (y = t);
                },
                E = e(i.setState, o, i);
              if (
                ("untracked" === h.type
                  ? null == v || v.init(E)
                  : ((h.stores[h.store] = i),
                    null == v ||
                      v.init(
                        Object.fromEntries(
                          Object.entries(h.stores).map(([e, t]) => [
                            e,
                            e === h.store ? E : t.getState(),
                          ])
                        )
                      )),
                i.dispatchFromDevtools && "function" == typeof i.dispatch)
              ) {
                let e = !1,
                  n = i.dispatch;
                i.dispatch = (...r) => {
                  (t.env ? t.env.MODE : void 0) === "production" ||
                    "__setState" !== r[0].type ||
                    e ||
                    (console.warn(
                      '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
                    ),
                    (e = !0)),
                    n(...r);
                };
              }
              return (
                v.subscribe((e) => {
                  var t;
                  switch (e.type) {
                    case "ACTION":
                      if ("string" != typeof e.payload)
                        return void console.error(
                          "[zustand devtools middleware] Unsupported action format"
                        );
                      return f(e.payload, (e) => {
                        if ("__setState" === e.type) {
                          if (void 0 === g) return void b(e.state);
                          1 !== Object.keys(e.state).length &&
                            console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);
                          let t = e.state[g];
                          return void (
                            null == t ||
                            (JSON.stringify(i.getState()) !==
                              JSON.stringify(t) &&
                              b(t))
                          );
                        }
                        i.dispatchFromDevtools &&
                          "function" == typeof i.dispatch &&
                          i.dispatch(e);
                      });
                    case "DISPATCH":
                      switch (e.payload.type) {
                        case "RESET":
                          if ((b(E), void 0 === g))
                            return null == v ? void 0 : v.init(i.getState());
                          return null == v ? void 0 : v.init(l(p.name));
                        case "COMMIT":
                          if (void 0 === g) {
                            null == v || v.init(i.getState());
                            break;
                          }
                          return null == v ? void 0 : v.init(l(p.name));
                        case "ROLLBACK":
                          return f(e.state, (e) => {
                            if (void 0 === g) {
                              b(e), null == v || v.init(i.getState());
                              return;
                            }
                            b(e[g]), null == v || v.init(l(p.name));
                          });
                        case "JUMP_TO_STATE":
                        case "JUMP_TO_ACTION":
                          return f(e.state, (e) => {
                            if (void 0 === g) return void b(e);
                            JSON.stringify(i.getState()) !==
                              JSON.stringify(e[g]) && b(e[g]);
                          });
                        case "IMPORT_STATE": {
                          let { nextLiftedState: n } = e.payload,
                            r =
                              null == (t = n.computedStates.slice(-1)[0])
                                ? void 0
                                : t.state;
                          if (!r) return;
                          void 0 === g ? b(r) : b(r[g]),
                            null == v || v.send(null, n);
                          break;
                        }
                        case "PAUSE_RECORDING":
                          return (y = !y);
                      }
                      return;
                  }
                }),
                E
              );
            },
          f = (e, t) => {
            let n;
            try {
              n = JSON.parse(e);
            } catch (e) {
              console.error(
                "[zustand devtools middleware] Could not parse the received json",
                e
              );
            }
            void 0 !== n && t(n);
          },
          d = (e) => (t, n, r) => {
            let o = r.subscribe;
            return (
              (r.subscribe = (e, t, n) => {
                let i = e;
                if (t) {
                  let o = (null == n ? void 0 : n.equalityFn) || Object.is,
                    l = e(r.getState());
                  (i = (n) => {
                    let r = e(n);
                    if (!o(l, r)) {
                      let e = l;
                      t((l = r), e);
                    }
                  }),
                    (null == n ? void 0 : n.fireImmediately) && t(l, l);
                }
                return o(i);
              }),
              e(t, n, r)
            );
          };
        function r(e, t) {
          return (...n) => Object.assign({}, e, t(...n));
        }
        function o(e, t) {
          let n;
          try {
            n = e();
          } catch (e) {
            return;
          }
          return {
            getItem: (e) => {
              var r;
              let o = (e) =>
                  null === e
                    ? null
                    : JSON.parse(e, null == t ? void 0 : t.reviver),
                i = null != (r = n.getItem(e)) ? r : null;
              return i instanceof Promise ? i.then(o) : o(i);
            },
            setItem: (e, r) =>
              n.setItem(e, JSON.stringify(r, null == t ? void 0 : t.replacer)),
            removeItem: (e) => n.removeItem(e),
          };
        }
        let m = (e) => (t) => {
            try {
              let n = e(t);
              if (n instanceof Promise) return n;
              return {
                then: (e) => m(e)(n),
                catch(e) {
                  return this;
                },
              };
            } catch (e) {
              return {
                then(e) {
                  return this;
                },
                catch: (t) => m(t)(e),
              };
            }
          },
          g = (e, t) => (n, r, i) => {
            let l,
              u = {
                storage: o(() => localStorage),
                partialize: (e) => e,
                version: 0,
                merge: (e, t) => ({ ...t, ...e }),
                ...t,
              },
              s = !1,
              a = new Set(),
              c = new Set(),
              f = u.storage;
            if (!f)
              return e(
                (...e) => {
                  console.warn(
                    `[zustand persist middleware] Unable to update item '${u.name}', the given storage is currently unavailable.`
                  ),
                    n(...e);
                },
                r,
                i
              );
            let d = () => {
                let e = u.partialize({ ...r() });
                return f.setItem(u.name, { state: e, version: u.version });
              },
              g = i.setState;
            i.setState = (e, t) => {
              g(e, t), d();
            };
            let p = e(
              (...e) => {
                n(...e), d();
              },
              r,
              i
            );
            i.getInitialState = () => p;
            let v = () => {
              var e, t;
              if (!f) return;
              (s = !1),
                a.forEach((e) => {
                  var t;
                  return e(null != (t = r()) ? t : p);
                });
              let o =
                (null == (t = u.onRehydrateStorage)
                  ? void 0
                  : t.call(u, null != (e = r()) ? e : p)) || void 0;
              return m(f.getItem.bind(f))(u.name)
                .then((e) => {
                  if (e)
                    if ("number" != typeof e.version || e.version === u.version)
                      return [!1, e.state];
                    else {
                      if (u.migrate) {
                        let t = u.migrate(e.state, e.version);
                        return t instanceof Promise
                          ? t.then((e) => [!0, e])
                          : [!0, t];
                      }
                      console.error(
                        "State loaded from storage couldn't be migrated since no migrate function was provided"
                      );
                    }
                  return [!1, void 0];
                })
                .then((e) => {
                  var t;
                  let [o, i] = e;
                  if ((n((l = u.merge(i, null != (t = r()) ? t : p)), !0), o))
                    return d();
                })
                .then(() => {
                  null == o || o(l, void 0),
                    (l = r()),
                    (s = !0),
                    c.forEach((e) => e(l));
                })
                .catch((e) => {
                  null == o || o(void 0, e);
                });
            };
            return (
              (i.persist = {
                setOptions: (e) => {
                  (u = { ...u, ...e }), e.storage && (f = e.storage);
                },
                clearStorage: () => {
                  null == f || f.removeItem(u.name);
                },
                getOptions: () => u,
                rehydrate: () => v(),
                hasHydrated: () => s,
                onHydrate: (e) => (
                  a.add(e),
                  () => {
                    a.delete(e);
                  }
                ),
                onFinishHydration: (e) => (
                  c.add(e),
                  () => {
                    c.delete(e);
                  }
                ),
              }),
              u.skipHydration || v(),
              l || p
            );
          };
      }
    },
    31065: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ default: () => i });
        var r = e.i(50609),
          o = e.i(42363);
        let t = "orchestra",
          n = (0, o.createStore)()(
            (0, r.persist)(
              (0, r.subscribeWithSelector)(() => ({})),
              { name: t, storage: (0, r.createJSONStorage)(() => localStorage) }
            )
          );
        window.addEventListener("storage", (e) => {
          e.key === t && n.persist.rehydrate();
        });
        let i = n;
      }
    },
    19020: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ OrchestraToggle: () => l });
      var r = e.i(58064),
        o = e.i(38653),
        i = e.i(31065);
      function l({
        id: e,
        children: t,
        buttonRef: n,
        defaultValue: l,
        className: u,
        ...s
      }) {
        (0, o.useEffect)(() => {
          i.default.setState((t) => ({ [e]: l ?? t[e] }));
        }, [l, e]);
        let [a, c] = (0, o.useState)(l ?? i.default.getState()[e]);
        return (
          (0, o.useEffect)(
            () =>
              i.default.subscribe(
                ({ [e]: t }) => t,
                (e) => {
                  c(e);
                },
                { fireImmediately: !0 }
              ),
            [e]
          ),
          (0, r.jsx)("button", {
            type: "button",
            ...s,
            onClick: () => {
              i.default.setState((t) => ({ [e]: !t[e] }));
            },
            style: { backgroundColor: a ? "rgba(0, 255, 0, 0.5)" : "" },
            className:
              "text-[64px] grid place-items-center size-20 rounded-[8px]",
            title: e,
            children: t,
          })
        );
      }
    },
    78958: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      e.s({ Cmdo: () => a });
      var r = e.i(58064),
        o = e.i(85444);
      e.i(58092);
      var i = e.i(84678),
        l = e.i(38653),
        u = e.i(31065),
        s = e.i(19020);
      function a() {
        let e,
          t,
          n,
          a,
          d,
          m = (0, o.c)(6),
          [g, p] = (0, l.useState)(!1);
        return (
          m[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = () => {
                let e = (e) => {
                  "o" === e.key &&
                    (e.metaKey || e.ctrlKey) &&
                    (e.preventDefault(), p(f)),
                    "G" === e.key &&
                      e.shiftKey &&
                      (e.preventDefault(), u.default.setState(c)),
                    "Escape" === e.key && p(!1);
                };
                return (
                  document.addEventListener("keydown", e),
                  () => document.removeEventListener("keydown", e)
                );
              }),
              (t = []),
              (m[0] = e),
              (m[1] = t))
            : ((e = m[0]), (t = m[1])),
          (0, l.useEffect)(e, t),
          m[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = (0, r.jsx)(i.Dialog.Backdrop, {
                className:
                  "fixed inset-0 bg-secondary/20 backdrop-blur-[2px] transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 z-40",
              })),
              (m[2] = n))
            : (n = m[2]),
          m[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((a = (0, r.jsxs)(i.Dialog.Portal, {
                keepMounted: !0,
                children: [
                  n,
                  (0, r.jsx)(i.Dialog.Popup, {
                    className:
                      "z-99999 fixed top-1/2 left-1/2 -translate-1/2 rounded-lg bg-primary text-gray-900 outline outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 rounded-[12px]",
                    children: (0, r.jsxs)("div", {
                      className:
                        "flex gap-4 rounded-lg [&_button]:size-full [&_button]:grid [&_button]:place-items-center p-[4px] gap-[4px]",
                      children: [
                        (0, r.jsx)(s.OrchestraToggle, {
                          id: "grid",
                          children: "🌐",
                        }),
                        (0, r.jsx)(s.OrchestraToggle, {
                          id: "studio",
                          children: "⚙️",
                        }),
                        (0, r.jsx)(s.OrchestraToggle, {
                          id: "stats",
                          children: "📈",
                        }),
                        (0, r.jsx)(s.OrchestraToggle, {
                          id: "dev",
                          children: "🚧",
                        }),
                        (0, r.jsx)(s.OrchestraToggle, {
                          id: "minimap",
                          children: "🗺️",
                        }),
                        (0, r.jsx)(s.OrchestraToggle, {
                          id: "webgl",
                          defaultValue: !0,
                          children: "🧊",
                        }),
                      ],
                    }),
                  }),
                ],
              })),
              (m[3] = a))
            : (a = m[3]),
          m[4] !== g
            ? ((d = (0, r.jsx)(i.Dialog.Root, {
                open: g,
                onOpenChange: p,
                children: a,
              })),
              (m[4] = g),
              (m[5] = d))
            : (d = m[5]),
          d
        );
      }
      function c(e) {
        return { grid: !e.grid };
      }
      function f(e) {
        return !e;
      }
    },
    87771: (e) => {
      "use strict";
      var { g: t, __dirname: n } = e;
      {
        e.s({ OrchestraTools: () => a, useOrchestra: () => c });
        var r = e.i(58064),
          o = e.i(85444),
          i = e.i(47791),
          l = e.i(38653),
          u = e.i(78958),
          s = e.i(31065);
        let t = (0, i.default)(
            () =>
              e
                .r(74362)(e.i)
                .then(({ Studio: e }) => e),
            { loadableGenerated: { modules: [91787] }, ssr: !1 }
          ),
          n = (0, i.default)(
            () =>
              e
                .r(97158)(e.i)
                .then(({ Stats: e }) => e),
            { loadableGenerated: { modules: [56372] }, ssr: !1 }
          ),
          d = (0, i.default)(
            () =>
              e
                .r(23815)(e.i)
                .then(({ GridDebugger: e }) => e),
            { loadableGenerated: { modules: [15911] }, ssr: !1 }
          ),
          m = (0, i.default)(
            () =>
              e
                .r(74558)(e.i)
                .then(({ Minimap: e }) => e),
            { loadableGenerated: { modules: [34118] }, ssr: !1 }
          );
        function a() {
          let e,
            i,
            s,
            a,
            f,
            g,
            p,
            v,
            h = (0, o.c)(17),
            { stats: y, grid: b, studio: E, dev: x, minimap: w } = c();
          return (
            h[0] !== x
              ? ((e = () => {
                  document.documentElement.classList.toggle("dev", x);
                }),
                (i = [x]),
                (h[0] = x),
                (h[1] = e),
                (h[2] = i))
              : ((e = h[1]), (i = h[2])),
            (0, l.useEffect)(e, i),
            h[3] === Symbol.for("react.memo_cache_sentinel")
              ? ((s = (0, r.jsx)(u.Cmdo, {})), (h[3] = s))
              : (s = h[3]),
            h[4] !== E
              ? ((a = E && (0, r.jsx)(t, {})), (h[4] = E), (h[5] = a))
              : (a = h[5]),
            h[6] !== y
              ? ((f = y && (0, r.jsx)(n, {})), (h[6] = y), (h[7] = f))
              : (f = h[7]),
            h[8] !== b
              ? ((g = b && (0, r.jsx)(d, {})), (h[8] = b), (h[9] = g))
              : (g = h[9]),
            h[10] !== w
              ? ((p = w && (0, r.jsx)(m, {})), (h[10] = w), (h[11] = p))
              : (p = h[11]),
            h[12] !== a || h[13] !== f || h[14] !== g || h[15] !== p
              ? ((v = (0, r.jsxs)(r.Fragment, { children: [s, a, f, g, p] })),
                (h[12] = a),
                (h[13] = f),
                (h[14] = g),
                (h[15] = p),
                (h[16] = v))
              : (v = h[16]),
            v
          );
        }
        function c() {
          let e,
            t,
            n,
            r = (0, o.c)(3);
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = {}), (r[0] = e))
            : (e = r[0]);
          let [i, u] = (0, l.useState)(e);
          return (
            r[1] === Symbol.for("react.memo_cache_sentinel")
              ? ((t = () =>
                  s.default.subscribe(f, (e) => u(e), { fireImmediately: !0 })),
                (n = []),
                (r[1] = t),
                (r[2] = n))
              : ((t = r[1]), (n = r[2])),
            (0, l.useEffect)(t, n),
            i
          );
        }
        function f(e) {
          return e;
        }
      }
    },
  },
]);

//# sourceMappingURL=ec43c617c51b971a.js.map
