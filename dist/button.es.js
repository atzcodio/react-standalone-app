var bi = Object.defineProperty;
var yi = (e, t, o) => t in e ? bi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var j = (e, t, o) => yi(e, typeof t != "symbol" ? t + "" : t, o);
import * as C from "react";
import A, { isValidElement as Si, version as xi, useInsertionEffect as vi, useContext as $e, useMemo as gt, createContext as Ci, useEffect as Me, useRef as be, useLayoutEffect as $i, forwardRef as nn, useState as uo } from "react";
import wi from "react-dom";
var Ft = { exports: {} }, Qe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fo;
function Ti() {
  if (fo) return Qe;
  fo = 1;
  var e = A, t = Symbol.for("react.element"), o = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(a, c, u) {
    var l, f = {}, h = null, b = null;
    u !== void 0 && (h = "" + u), c.key !== void 0 && (h = "" + c.key), c.ref !== void 0 && (b = c.ref);
    for (l in c) r.call(c, l) && !i.hasOwnProperty(l) && (f[l] = c[l]);
    if (a && a.defaultProps) for (l in c = a.defaultProps, c) f[l] === void 0 && (f[l] = c[l]);
    return { $$typeof: t, type: a, key: h, ref: b, props: f, _owner: n.current };
  }
  return Qe.Fragment = o, Qe.jsx = s, Qe.jsxs = s, Qe;
}
var ho;
function Ei() {
  return ho || (ho = 1, Ft.exports = Ti()), Ft.exports;
}
var Ri = Ei();
function vt(e) {
  const t = C.useRef(e);
  return t.current = e, C.useCallback((...r) => {
    var n;
    return (n = t.current) == null ? void 0 : n.call(t, ...r);
  }, []);
}
function Te() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
const go = Te() ? C.useLayoutEffect : C.useEffect, Mi = (e, t) => {
  const o = C.useRef(!0);
  go(() => e(o.current), t), go(() => (o.current = !1, () => {
    o.current = !0;
  }), []);
};
function nr(e) {
  const t = C.useRef(!1), [o, r] = C.useState(e);
  C.useEffect(() => (t.current = !1, () => {
    t.current = !0;
  }), []);
  function n(i, s) {
    s && t.current || r(i);
  }
  return [o, n];
}
var Dt = { exports: {} }, H = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var po;
function Ai() {
  if (po) return H;
  po = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), n = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), S;
  S = Symbol.for("react.module.reference");
  function p(d) {
    if (typeof d == "object" && d !== null) {
      var y = d.$$typeof;
      switch (y) {
        case e:
          switch (d = d.type, d) {
            case o:
            case n:
            case r:
            case u:
            case l:
              return d;
            default:
              switch (d = d && d.$$typeof, d) {
                case a:
                case s:
                case c:
                case h:
                case f:
                case i:
                  return d;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return H.ContextConsumer = s, H.ContextProvider = i, H.Element = e, H.ForwardRef = c, H.Fragment = o, H.Lazy = h, H.Memo = f, H.Portal = t, H.Profiler = n, H.StrictMode = r, H.Suspense = u, H.SuspenseList = l, H.isAsyncMode = function() {
    return !1;
  }, H.isConcurrentMode = function() {
    return !1;
  }, H.isContextConsumer = function(d) {
    return p(d) === s;
  }, H.isContextProvider = function(d) {
    return p(d) === i;
  }, H.isElement = function(d) {
    return typeof d == "object" && d !== null && d.$$typeof === e;
  }, H.isForwardRef = function(d) {
    return p(d) === c;
  }, H.isFragment = function(d) {
    return p(d) === o;
  }, H.isLazy = function(d) {
    return p(d) === h;
  }, H.isMemo = function(d) {
    return p(d) === f;
  }, H.isPortal = function(d) {
    return p(d) === t;
  }, H.isProfiler = function(d) {
    return p(d) === n;
  }, H.isStrictMode = function(d) {
    return p(d) === r;
  }, H.isSuspense = function(d) {
    return p(d) === u;
  }, H.isSuspenseList = function(d) {
    return p(d) === l;
  }, H.isValidElementType = function(d) {
    return typeof d == "string" || typeof d == "function" || d === o || d === n || d === r || d === u || d === l || d === b || typeof d == "object" && d !== null && (d.$$typeof === h || d.$$typeof === f || d.$$typeof === i || d.$$typeof === s || d.$$typeof === c || d.$$typeof === S || d.getModuleId !== void 0);
  }, H.typeOf = p, H;
}
var mo;
function Ii() {
  return mo || (mo = 1, Dt.exports = Ai()), Dt.exports;
}
var Wt = Ii();
function Pi(e, t, o) {
  const r = C.useRef({});
  return (!("value" in r.current) || o(r.current.condition, t)) && (r.current.value = e(), r.current.condition = t), r.current.value;
}
const _i = Symbol.for("react.element"), zi = Symbol.for("react.transitional.element"), Hi = Symbol.for("react.fragment");
function sn(e) {
  return (
    // Base object type
    e && typeof e == "object" && // React Element type
    (e.$$typeof === _i || e.$$typeof === zi) && // React Fragment type
    e.type === Hi
  );
}
const Li = Number(xi.split(".")[0]), Bi = (e, t) => {
  typeof e == "function" ? e(t) : typeof e == "object" && e && "current" in e && (e.current = t);
}, Br = (...e) => {
  const t = e.filter(Boolean);
  return t.length <= 1 ? t[0] : (o) => {
    e.forEach((r) => {
      Bi(r, o);
    });
  };
}, ki = (...e) => Pi(
  () => Br(...e),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  e,
  (t, o) => t.length !== o.length || t.every((r, n) => r !== o[n])
), an = (e) => {
  var o, r;
  if (!e)
    return !1;
  if (cn(e) && Li >= 19)
    return !0;
  const t = Wt.isMemo(e) ? e.type.type : e.type;
  return !(typeof t == "function" && !((o = t.prototype) != null && o.render) && t.$$typeof !== Wt.ForwardRef || typeof e == "function" && !((r = e.prototype) != null && r.render) && e.$$typeof !== Wt.ForwardRef);
};
function cn(e) {
  return /* @__PURE__ */ Si(e) && !sn(e);
}
const ln = (e) => {
  if (e && cn(e)) {
    const t = e;
    return t.props.propertyIsEnumerable("ref") ? t.props.ref : t.ref;
  }
  return null;
};
let ir = {};
const Oi = (e) => {
};
function ji(e, t) {
}
function Ni(e, t) {
}
function Fi() {
  ir = {};
}
function un(e, t, o) {
  !t && !ir[o] && (e(!1, o), ir[o] = !0);
}
function Et(e, t) {
  un(ji, e, t);
}
function Di(e, t) {
  un(Ni, e, t);
}
Et.preMessage = Oi;
Et.resetWarned = Fi;
Et.noteOnce = Di;
function Wi(e, t) {
  const o = Object.assign({}, e);
  return Array.isArray(t) && t.forEach((r) => {
    delete o[r];
  }), o;
}
function sr(e, t = {}) {
  let o = [];
  return A.Children.forEach(e, (r) => {
    r == null && !t.keepEmpty || (Array.isArray(r) ? o = o.concat(sr(r)) : sn(r) && r.props ? o = o.concat(sr(r.props.children, t)) : o.push(r));
  }), o;
}
function bo(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function Gi(e) {
  return e && typeof e == "object" && bo(e.nativeElement) ? e.nativeElement : bo(e) ? e : null;
}
function fn(e) {
  var t, o, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (o = fn(e[t])) && (r && (r += " "), r += o);
  } else for (o in e) e[o] && (r && (r += " "), r += o);
  return r;
}
function Q() {
  for (var e, t, o = 0, r = "", n = arguments.length; o < n; o++) (e = arguments[o]) && (t = fn(e)) && (r && (r += " "), r += t);
  return r;
}
function ar(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, r = Array(t); o < t; o++) r[o] = e[o];
  return r;
}
function Vi(e) {
  if (Array.isArray(e)) return ar(e);
}
function Xi(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function dn(e, t) {
  if (e) {
    if (typeof e == "string") return ar(e, t);
    var o = {}.toString.call(e).slice(8, -1);
    return o === "Object" && e.constructor && (o = e.constructor.name), o === "Map" || o === "Set" ? Array.from(e) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? ar(e, t) : void 0;
  }
}
function qi() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function cr(e) {
  return Vi(e) || Xi(e) || dn(e) || qi();
}
let hn = (e) => +setTimeout(e, 16), gn = (e) => clearTimeout(e);
typeof window < "u" && "requestAnimationFrame" in window && (hn = (e) => window.requestAnimationFrame(e), gn = (e) => window.cancelAnimationFrame(e));
let yo = 0;
const kr = /* @__PURE__ */ new Map();
function pn(e) {
  kr.delete(e);
}
const Ie = (e, t = 1) => {
  yo += 1;
  const o = yo;
  function r(n) {
    if (n === 0)
      pn(o), e();
    else {
      const i = hn(() => {
        r(n - 1);
      });
      kr.set(o, i);
    }
  }
  return r(t), o;
};
Ie.cancel = (e) => {
  const t = kr.get(e);
  return pn(e), gn(t);
};
const lr = "ant", mn = "anticon", Ui = (e, t) => t || (e ? `${lr}-${e}` : lr), we = /* @__PURE__ */ C.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: Ui,
  iconPrefixCls: mn
}), {
  Consumer: Sl
} = we, So = {};
function Qi(e) {
  const t = C.useContext(we), {
    getPrefixCls: o,
    direction: r,
    getPopupContainer: n,
    renderEmpty: i
  } = t, s = t[e];
  return {
    classNames: So,
    styles: So,
    ...s,
    getPrefixCls: o,
    direction: r,
    getPopupContainer: n,
    renderEmpty: i
  };
}
function je(e) {
  for (var t = 0, o, r = 0, n = e.length; n >= 4; ++r, n -= 4)
    o = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, o = /* Math.imul(k, m): */
    (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16), o ^= /* k >>> r: */
    o >>> 24, t = /* Math.imul(k, m): */
    (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (n) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(r) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
function Ki(e, t) {
  if (!e)
    return !1;
  if (e.contains)
    return e.contains(t);
  let o = t;
  for (; o; ) {
    if (o === e)
      return !0;
    o = o.parentNode;
  }
  return !1;
}
const xo = "data-rc-order", vo = "data-rc-priority", Yi = "rc-util-key", ur = /* @__PURE__ */ new Map();
function bn({
  mark: e
} = {}) {
  return e ? e.startsWith("data-") ? e : `data-${e}` : Yi;
}
function Rt(e) {
  return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function Zi(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Or(e) {
  return Array.from((ur.get(e) || e).children).filter((t) => t.tagName === "STYLE");
}
function yn(e, t = {}) {
  if (!Te())
    return null;
  const {
    csp: o,
    prepend: r,
    priority: n = 0
  } = t, i = Zi(r), s = i === "prependQueue", a = document.createElement("style");
  a.setAttribute(xo, i), s && n && a.setAttribute(vo, `${n}`), o != null && o.nonce && (a.nonce = o == null ? void 0 : o.nonce), a.innerHTML = e;
  const c = Rt(t), {
    firstChild: u
  } = c;
  if (r) {
    if (s) {
      const l = (t.styles || Or(c)).filter((f) => {
        if (!["prepend", "prependQueue"].includes(f.getAttribute(xo)))
          return !1;
        const h = Number(f.getAttribute(vo) || 0);
        return n >= h;
      });
      if (l.length)
        return c.insertBefore(a, l[l.length - 1].nextSibling), a;
    }
    c.insertBefore(a, u);
  } else
    c.appendChild(a);
  return a;
}
function Sn(e, t = {}) {
  let {
    styles: o
  } = t;
  return o || (o = Or(Rt(t))), o.find((r) => r.getAttribute(bn(t)) === e);
}
function xn(e, t = {}) {
  const o = Sn(e, t);
  o && Rt(t).removeChild(o);
}
function Ji(e, t) {
  const o = ur.get(e);
  if (!o || !Ki(document, o)) {
    const r = yn("", t), {
      parentNode: n
    } = r;
    ur.set(e, n), e.removeChild(r);
  }
}
function Ne(e, t, o = {}) {
  var c, u, l;
  const r = Rt(o), n = Or(r), i = {
    ...o,
    styles: n
  };
  Ji(r, i);
  const s = Sn(t, i);
  if (s)
    return (c = i.csp) != null && c.nonce && s.nonce !== ((u = i.csp) == null ? void 0 : u.nonce) && (s.nonce = (l = i.csp) == null ? void 0 : l.nonce), s.innerHTML !== e && (s.innerHTML = e), s;
  const a = yn(e, i);
  return a.setAttribute(bn(i), t), a;
}
const es = "%";
function fr(e) {
  return e.join(es);
}
let Co = 0;
class ts {
  constructor(t) {
    j(this, "instanceId");
    /** @private Internal cache map. Do not access this directly */
    j(this, "cache", /* @__PURE__ */ new Map());
    /** @private Record update times for each key */
    j(this, "updateTimes", /* @__PURE__ */ new Map());
    j(this, "extracted", /* @__PURE__ */ new Set());
    this.instanceId = t;
  }
  get(t) {
    return this.opGet(fr(t));
  }
  /** A fast get cache with `get` concat. */
  opGet(t) {
    return this.cache.get(t) || null;
  }
  update(t, o) {
    return this.opUpdate(fr(t), o);
  }
  /** A fast get cache with `get` concat. */
  opUpdate(t, o) {
    const r = this.cache.get(t), n = o(r);
    n === null ? (this.cache.delete(t), this.updateTimes.delete(t)) : (this.cache.set(t, n), this.updateTimes.set(t, Co), Co += 1);
  }
}
const jr = "data-token-hash", ye = "data-css-hash", ve = "__cssinjs_instance__";
function rs() {
  const e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    const t = document.body.querySelectorAll(`style[${ye}]`) || [], {
      firstChild: o
    } = document.head;
    Array.from(t).forEach((n) => {
      n[ve] = n[ve] || e, n[ve] === e && document.head.insertBefore(n, o);
    });
    const r = {};
    Array.from(document.querySelectorAll(`style[${ye}]`)).forEach((n) => {
      var s;
      const i = n.getAttribute(ye);
      r[i] ? n[ve] === e && ((s = n.parentNode) == null || s.removeChild(n)) : r[i] = !0;
    });
  }
  return new ts(e);
}
const Mt = /* @__PURE__ */ C.createContext({
  hashPriority: "low",
  cache: rs(),
  defaultCache: !0,
  autoPrefix: !1
});
function os(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let o = 0; o < e.length; o++)
    if (e[o] !== t[o])
      return !1;
  return !0;
}
const Oe = class Oe {
  constructor() {
    j(this, "cache");
    j(this, "keys");
    j(this, "cacheCallTimes");
    this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  size() {
    return this.keys.length;
  }
  internalGet(t, o = !1) {
    let r = {
      map: this.cache
    };
    return t.forEach((n) => {
      var i;
      r ? r = (i = r == null ? void 0 : r.map) == null ? void 0 : i.get(n) : r = void 0;
    }), r != null && r.value && o && (r.value[1] = this.cacheCallTimes++), r == null ? void 0 : r.value;
  }
  get(t) {
    var o;
    return (o = this.internalGet(t, !0)) == null ? void 0 : o[0];
  }
  has(t) {
    return !!this.internalGet(t);
  }
  set(t, o) {
    if (!this.has(t)) {
      if (this.size() + 1 > Oe.MAX_CACHE_SIZE + Oe.MAX_CACHE_OFFSET) {
        const [n] = this.keys.reduce((i, s) => {
          const [, a] = i;
          return this.internalGet(s)[1] < a ? [s, this.internalGet(s)[1]] : i;
        }, [this.keys[0], this.cacheCallTimes]);
        this.delete(n);
      }
      this.keys.push(t);
    }
    let r = this.cache;
    t.forEach((n, i) => {
      if (i === t.length - 1)
        r.set(n, {
          value: [o, this.cacheCallTimes++]
        });
      else {
        const s = r.get(n);
        s ? s.map || (s.map = /* @__PURE__ */ new Map()) : r.set(n, {
          map: /* @__PURE__ */ new Map()
        }), r = r.get(n).map;
      }
    });
  }
  deleteByPath(t, o) {
    var i;
    const r = t.get(o[0]);
    if (o.length === 1)
      return r.map ? t.set(o[0], {
        map: r.map
      }) : t.delete(o[0]), (i = r.value) == null ? void 0 : i[0];
    const n = this.deleteByPath(r.map, o.slice(1));
    return (!r.map || r.map.size === 0) && !r.value && t.delete(o[0]), n;
  }
  delete(t) {
    if (this.has(t))
      return this.keys = this.keys.filter((o) => !os(o, t)), this.deleteByPath(this.cache, t);
  }
};
j(Oe, "MAX_CACHE_SIZE", 20), j(Oe, "MAX_CACHE_OFFSET", 5);
let dr = Oe, $o = 0;
class vn {
  constructor(t) {
    j(this, "derivatives");
    j(this, "id");
    this.derivatives = Array.isArray(t) ? t : [t], this.id = $o, t.length === 0 && (t.length > 0, void 0), $o += 1;
  }
  getDerivativeToken(t) {
    return this.derivatives.reduce((o, r) => r(t, o), void 0);
  }
}
const Gt = new dr();
function ns(e) {
  const t = Array.isArray(e) ? e : [e];
  return Gt.has(t) || Gt.set(t, new vn(t)), Gt.get(t);
}
const is = /* @__PURE__ */ new WeakMap(), Vt = {};
function ss(e, t) {
  let o = is;
  for (let r = 0; r < t.length; r += 1) {
    const n = t[r];
    o.has(n) || o.set(n, /* @__PURE__ */ new WeakMap()), o = o.get(n);
  }
  return o.has(Vt) || o.set(Vt, e()), o.get(Vt);
}
const wo = /* @__PURE__ */ new WeakMap();
function Je(e) {
  let t = wo.get(e) || "";
  return t || (Object.keys(e).forEach((o) => {
    const r = e[o];
    t += o, r instanceof vn ? t += r.id : r && typeof r == "object" ? t += Je(r) : t += r;
  }), t = je(t), wo.set(e, t)), t;
}
function as(e, t) {
  return je(`${t}_${Je(e)}`);
}
const hr = Te();
function Fe(e) {
  return typeof e == "number" ? `${e}px` : e;
}
function cs(e) {
  const {
    hashCls: t,
    hashPriority: o = "low"
  } = e || {};
  if (!t)
    return "";
  const r = `.${t}`;
  return o === "low" ? `:where(${r})` : r;
}
const pt = (e, t = "") => `--${t ? `${t}-` : ""}${e}`.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase(), ls = (e, t, o) => {
  const {
    hashCls: r,
    hashPriority: n = "low"
  } = o || {};
  return Object.keys(e).length ? `${cs({
    hashCls: r,
    hashPriority: n
  })}.${t}${o != null && o.scope ? `.${o.scope}` : ""}{${Object.entries(e).map(([i, s]) => `${i}:${s};`).join("")}}` : "";
}, Cn = (e, t, o) => {
  const {
    hashCls: r,
    hashPriority: n = "low",
    prefix: i,
    unitless: s,
    ignore: a,
    preserve: c
  } = o || {}, u = {}, l = {};
  return Object.entries(e).forEach(([f, h]) => {
    if (c != null && c[f])
      l[f] = h;
    else if ((typeof h == "string" || typeof h == "number") && !(a != null && a[f])) {
      const b = pt(f, i);
      u[b] = typeof h == "number" && !(s != null && s[f]) ? `${h}px` : String(h), l[f] = `var(${b})`;
    }
  }), [l, ls(u, t, {
    scope: o == null ? void 0 : o.scope,
    hashCls: r,
    hashPriority: n
  })];
}, at = /* @__PURE__ */ new Map();
function Nr(e, t, o, r, n) {
  const {
    cache: i
  } = C.useContext(Mt), s = [e, ...t], a = fr(s), c = (f) => {
    i.opUpdate(a, (h) => {
      const [b = 0, S] = h || [void 0, void 0], d = S || o(), y = [b, d];
      return f ? f(y) : y;
    });
  };
  C.useMemo(
    () => {
      c();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [a]
    /* eslint-enable */
  );
  const l = i.opGet(a)[1];
  return vi(() => (c(([f, h]) => [f + 1, h]), at.has(a) || (n == null || n(l), at.set(a, !0), Promise.resolve().then(() => {
    at.delete(a);
  })), () => {
    i.opUpdate(a, (f) => {
      const [h = 0, b] = f || [];
      return h - 1 === 0 ? (r == null || r(b, !1), at.delete(a), null) : [h - 1, b];
    });
  }), [a]), l;
}
const us = {}, fs = "css", Re = /* @__PURE__ */ new Map();
function ds(e) {
  Re.set(e, (Re.get(e) || 0) + 1);
}
function hs(e, t) {
  typeof document < "u" && document.querySelectorAll(`style[${jr}="${e}"]`).forEach((r) => {
    var n;
    r[ve] === t && ((n = r.parentNode) == null || n.removeChild(r));
  });
}
const gs = -1;
function ps(e, t) {
  Re.set(e, (Re.get(e) || 0) - 1);
  const o = /* @__PURE__ */ new Set();
  Re.forEach((r, n) => {
    r <= 0 && o.add(n);
  }), Re.size - o.size > gs && o.forEach((r) => {
    hs(r, t), Re.delete(r);
  });
}
const ms = (e, t, o, r) => {
  let i = {
    ...o.getDerivativeToken(e),
    ...t
  };
  return r && (i = r(i)), i;
}, bs = "token";
function ys(e, t, o) {
  const {
    cache: {
      instanceId: r
    },
    container: n,
    hashPriority: i
  } = $e(Mt), {
    salt: s = "",
    override: a = us,
    formatToken: c,
    getComputedToken: u,
    cssVar: l
  } = o, f = ss(() => Object.assign({}, ...t), t), h = Je(f), b = Je(a), S = Je(l);
  return Nr(bs, [s, e.id, h, b, S], () => {
    const d = u ? u(f, a, e) : ms(f, a, e, c), y = {
      ...d
    }, m = `${s}_${l.prefix}`, T = je(m), x = `${fs}-${je(m)}`;
    y._tokenKey = as(y, m);
    const [$, w] = Cn(d, l.key, {
      prefix: l.prefix,
      ignore: l.ignore,
      unitless: l.unitless,
      preserve: l.preserve,
      hashPriority: i,
      hashCls: l.hashed ? x : void 0
    });
    return $._hashId = T, ds(l.key), [$, x, y, w, l.key];
  }, ([, , , , d]) => {
    ps(d, r);
  }, ([, , , d, y]) => {
    if (!d)
      return;
    const m = Ne(d, je(`css-var-${y}`), {
      mark: ye,
      prepend: "queue",
      attachTo: n,
      priority: -999
    });
    m[ve] = r, m.setAttribute(jr, y);
  });
}
var Ss = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, k = "-ms-", et = "-moz-", _ = "-webkit-", $n = "comm", Fr = "rule", Dr = "decl", xs = "@import", vs = "@namespace", wn = "@keyframes", Cs = "@layer", Tn = Math.abs, Wr = String.fromCharCode, gr = Object.assign;
function $s(e, t) {
  return D(e, 0) ^ 45 ? (((t << 2 ^ D(e, 0)) << 2 ^ D(e, 1)) << 2 ^ D(e, 2)) << 2 ^ D(e, 3) : 0;
}
function En(e) {
  return e.trim();
}
function pe(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function R(e, t, o) {
  return e.replace(t, o);
}
function mt(e, t, o) {
  return e.indexOf(t, o);
}
function D(e, t) {
  return e.charCodeAt(t) | 0;
}
function Pe(e, t, o) {
  return e.slice(t, o);
}
function ie(e) {
  return e.length;
}
function Rn(e) {
  return e.length;
}
function Ye(e, t) {
  return t.push(e), e;
}
function ws(e, t) {
  return e.map(t).join("");
}
function To(e, t) {
  return e.filter(function(o) {
    return !pe(o, t);
  });
}
var At = 1, De = 1, Mn = 0, oe = 0, N = 0, We = "";
function It(e, t, o, r, n, i, s, a) {
  return { value: e, root: t, parent: o, type: r, props: n, children: i, line: At, column: De, length: s, return: "", siblings: a };
}
function xe(e, t) {
  return gr(It("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function ze(e) {
  for (; e.root; )
    e = xe(e.root, { children: [e] });
  Ye(e, e.siblings);
}
function Ts() {
  return N;
}
function Es() {
  return N = oe > 0 ? D(We, --oe) : 0, De--, N === 10 && (De = 1, At--), N;
}
function ae() {
  return N = oe < Mn ? D(We, oe++) : 0, De++, N === 10 && (De = 1, At++), N;
}
function Ce() {
  return D(We, oe);
}
function bt() {
  return oe;
}
function Pt(e, t) {
  return Pe(We, e, t);
}
function rt(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Rs(e) {
  return At = De = 1, Mn = ie(We = e), oe = 0, [];
}
function Ms(e) {
  return We = "", e;
}
function Xt(e) {
  return En(Pt(oe - 1, pr(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function As(e) {
  for (; (N = Ce()) && N < 33; )
    ae();
  return rt(e) > 2 || rt(N) > 3 ? "" : " ";
}
function Is(e, t) {
  for (; --t && ae() && !(N < 48 || N > 102 || N > 57 && N < 65 || N > 70 && N < 97); )
    ;
  return Pt(e, bt() + (t < 6 && Ce() == 32 && ae() == 32));
}
function pr(e) {
  for (; ae(); )
    switch (N) {
      // ] ) " '
      case e:
        return oe;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && pr(N);
        break;
      // (
      case 40:
        e === 41 && pr(e);
        break;
      // \
      case 92:
        ae();
        break;
    }
  return oe;
}
function Ps(e, t) {
  for (; ae() && e + N !== 57; )
    if (e + N === 84 && Ce() === 47)
      break;
  return "/*" + Pt(t, oe - 1) + "*" + Wr(e === 47 ? e : ae());
}
function _s(e) {
  for (; !rt(Ce()); )
    ae();
  return Pt(e, oe);
}
function Eo(e) {
  return Ms(yt("", null, null, null, [""], e = Rs(e), 0, [0], e));
}
function yt(e, t, o, r, n, i, s, a, c) {
  for (var u = 0, l = 0, f = s, h = 0, b = 0, S = 0, p = 1, d = 1, y = 1, m = 0, T = "", x = n, $ = i, w = r, g = T; d; )
    switch (S = m, m = ae()) {
      // (
      case 40:
        if (S != 108 && D(g, f - 1) == 58) {
          mt(g += R(Xt(m), "&", "&\f"), "&\f", Tn(u ? a[u - 1] : 0)) != -1 && (y = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        g += Xt(m);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        g += As(S);
        break;
      // \
      case 92:
        g += Is(bt() - 1, 7);
        continue;
      // /
      case 47:
        switch (Ce()) {
          case 42:
          case 47:
            Ye(zs(Ps(ae(), bt()), t, o, c), c), (rt(S || 1) == 5 || rt(Ce() || 1) == 5) && ie(g) && Pe(g, -1, void 0) !== " " && (g += " ");
            break;
          default:
            g += "/";
        }
        break;
      // {
      case 123 * p:
        a[u++] = ie(g) * y;
      // } ; \0
      case 125 * p:
      case 59:
      case 0:
        switch (m) {
          // \0 }
          case 0:
          case 125:
            d = 0;
          // ;
          case 59 + l:
            y == -1 && (g = R(g, /\f/g, "")), b > 0 && (ie(g) - f || p === 0 && S === 47) && Ye(b > 32 ? Mo(g + ";", r, o, f - 1, c) : Mo(R(g, " ", "") + ";", r, o, f - 2, c), c);
            break;
          // @ ;
          case 59:
            g += ";";
          // { rule/at-rule
          default:
            if (Ye(w = Ro(g, t, o, u, l, n, a, T, x = [], $ = [], f, i), i), m === 123)
              if (l === 0)
                yt(g, t, w, w, x, i, f, a, $);
              else {
                switch (h) {
                  // c(ontainer)
                  case 99:
                    if (D(g, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (D(g, 2) === 97) break;
                  default:
                    l = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                l ? yt(e, w, w, r && Ye(Ro(e, w, w, 0, 0, n, a, T, n, x = [], f, $), $), n, $, f, a, r ? x : $) : yt(g, w, w, w, [""], $, 0, a, $);
              }
        }
        u = l = b = 0, p = y = 1, T = g = "", f = s;
        break;
      // :
      case 58:
        f = 1 + ie(g), b = S;
      default:
        if (p < 1) {
          if (m == 123)
            --p;
          else if (m == 125 && p++ == 0 && Es() == 125)
            continue;
        }
        switch (g += Wr(m), m * p) {
          // &
          case 38:
            y = l > 0 ? 1 : (g += "\f", -1);
            break;
          // ,
          case 44:
            a[u++] = (ie(g) - 1) * y, y = 1;
            break;
          // @
          case 64:
            Ce() === 45 && (g += Xt(ae())), h = Ce(), l = f = ie(T = g += _s(bt())), m++;
            break;
          // -
          case 45:
            S === 45 && ie(g) == 2 && (p = 0);
        }
    }
  return i;
}
function Ro(e, t, o, r, n, i, s, a, c, u, l, f) {
  for (var h = n - 1, b = n === 0 ? i : [""], S = Rn(b), p = 0, d = 0, y = 0; p < r; ++p)
    for (var m = 0, T = Pe(e, h + 1, h = Tn(d = s[p])), x = e; m < S; ++m)
      (x = En(d > 0 ? b[m] + " " + T : R(T, /&\f/g, b[m]))) && (c[y++] = x);
  return It(e, t, o, n === 0 ? Fr : a, c, u, l, f);
}
function zs(e, t, o, r) {
  return It(e, t, o, $n, Wr(Ts()), Pe(e, 2, -2), 0, r);
}
function Mo(e, t, o, r, n) {
  return It(e, t, o, Dr, Pe(e, 0, r), Pe(e, r + 1, -1), r, n);
}
function An(e, t, o) {
  switch ($s(e, t)) {
    // color-adjust
    case 5103:
      return _ + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return _ + e + e;
    // mask-composite
    case 4855:
      return _ + e.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + e;
    // tab-size
    case 4789:
      return et + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return _ + e + et + e + k + e + e;
    // writing-mode
    case 5936:
      switch (D(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return _ + e + k + R(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return _ + e + k + R(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return _ + e + k + R(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    // flex, flex-direction, scroll-snap-type, writing-mode
    case 6828:
    case 4268:
    case 2903:
      return _ + e + k + e + e;
    // order
    case 6165:
      return _ + e + k + "flex-" + e + e;
    // align-items
    case 5187:
      return _ + e + R(e, /(\w+).+(:[^]+)/, _ + "box-$1$2" + k + "flex-$1$2") + e;
    // align-self
    case 5443:
      return _ + e + k + "flex-item-" + R(e, /flex-|-self/g, "") + (pe(e, /flex-|baseline/) ? "" : k + "grid-row-" + R(e, /flex-|-self/g, "")) + e;
    // align-content
    case 4675:
      return _ + e + k + "flex-line-pack" + R(e, /align-content|flex-|-self/g, "") + e;
    // flex-shrink
    case 5548:
      return _ + e + k + R(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return _ + e + k + R(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return _ + "box-" + R(e, "-grow", "") + _ + e + k + R(e, "grow", "positive") + e;
    // transition
    case 4554:
      return _ + R(e, /([^-])(transform)/g, "$1" + _ + "$2") + e;
    // cursor
    case 6187:
      return R(R(R(e, /(zoom-|grab)/, _ + "$1"), /(image-set)/, _ + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return R(e, /(image-set\([^]*)/, _ + "$1$`$1");
    // justify-content
    case 4968:
      return R(R(e, /(.+:)(flex-)?(.*)/, _ + "box-pack:$3" + k + "flex-pack:$3"), /space-between/, "justify") + _ + e + e;
    // justify-self
    case 4200:
      if (!pe(e, /flex-|baseline/)) return k + "grid-column-align" + Pe(e, t) + e;
      break;
    // grid-template-(columns|rows)
    case 2592:
    case 3360:
      return k + R(e, "template-", "") + e;
    // grid-(row|column)-start
    case 4384:
    case 3616:
      return o && o.some(function(r, n) {
        return t = n, pe(r.props, /grid-\w+-end/);
      }) ? ~mt(e + (o = o[t].value), "span", 0) ? e : k + R(e, "-start", "") + e + k + "grid-row-span:" + (~mt(o, "span", 0) ? pe(o, /\d+/) : +pe(o, /\d+/) - +pe(e, /\d+/)) + ";" : k + R(e, "-start", "") + e;
    // grid-(row|column)-end
    case 4896:
    case 4128:
      return o && o.some(function(r) {
        return pe(r.props, /grid-\w+-start/);
      }) ? e : k + R(R(e, "-end", "-span"), "span ", "") + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return R(e, /(.+)-inline(.+)/, _ + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (ie(e) - 1 - t > 6)
        switch (D(e, t + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            if (D(e, t + 4) !== 45)
              break;
          // (f)ill-available, (f)it-content
          case 102:
            return R(e, /(.+:)(.+)-([^]+)/, "$1" + _ + "$2-$3$1" + et + (D(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          // (s)tretch
          case 115:
            return ~mt(e, "stretch", 0) ? An(R(e, "stretch", "fill-available"), t, o) + e : e;
        }
      break;
    // grid-(column|row)
    case 5152:
    case 5920:
      return R(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r, n, i, s, a, c, u) {
        return k + n + ":" + i + u + (s ? k + n + "-span:" + (a ? c : +c - +i) + u : "") + e;
      });
    // position: sticky
    case 4949:
      if (D(e, t + 6) === 121)
        return R(e, ":", ":" + _) + e;
      break;
    // display: (flex|inline-flex|grid|inline-grid)
    case 6444:
      switch (D(e, D(e, 14) === 45 ? 18 : 11)) {
        // (inline-)?fle(x)
        case 120:
          return R(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + _ + (D(e, 14) === 45 ? "inline-" : "") + "box$3$1" + _ + "$2$3$1" + k + "$2box$3") + e;
        // (inline-)?gri(d)
        case 100:
          return R(e, ":", ":" + k) + e;
      }
      break;
    // scroll-margin, scroll-margin-(top|right|bottom|left)
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return R(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function ot(e, t) {
  for (var o = "", r = 0; r < e.length; r++)
    o += t(e[r], r, e, t) || "";
  return o;
}
function Ao(e, t, o, r) {
  switch (e.type) {
    case Cs:
      if (e.children.length) break;
    case xs:
    case vs:
    case Dr:
      return e.return = e.return || e.value;
    case $n:
      return "";
    case wn:
      return e.return = e.value + "{" + ot(e.children, r) + "}";
    case Fr:
      if (!ie(e.value = e.props.join(","))) return "";
  }
  return ie(o = ot(e.children, r)) ? e.return = e.value + "{" + o + "}" : "";
}
function Hs(e) {
  var t = Rn(e);
  return function(o, r, n, i) {
    for (var s = "", a = 0; a < t; a++)
      s += e[a](o, r, n, i) || "";
    return s;
  };
}
function Ls(e, t, o, r) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case Dr:
        e.return = An(e.value, e.length, o);
        return;
      case wn:
        return ot([xe(e, { value: R(e.value, "@", "@" + _) })], r);
      case Fr:
        if (e.length)
          return ws(o = e.props, function(n) {
            switch (pe(n, r = /(::plac\w+|:read-\w+)/)) {
              // :read-(only|write)
              case ":read-only":
              case ":read-write":
                ze(xe(e, { props: [R(n, /:(read-\w+)/, ":" + et + "$1")] })), ze(xe(e, { props: [n] })), gr(e, { props: To(o, r) });
                break;
              // :placeholder
              case "::placeholder":
                ze(xe(e, { props: [R(n, /:(plac\w+)/, ":" + _ + "input-$1")] })), ze(xe(e, { props: [R(n, /:(plac\w+)/, ":" + et + "$1")] })), ze(xe(e, { props: [R(n, /:(plac\w+)/, k + "input-$1")] })), ze(xe(e, { props: [n] })), gr(e, { props: To(o, r) });
                break;
            }
            return "";
          });
    }
}
const Io = "data-ant-cssinjs-cache-path", In = "_FILE_STYLE__";
let Ae, Pn = !0;
function Bs() {
  var e;
  if (!Ae && (Ae = {}, Te())) {
    const t = document.createElement("div");
    t.className = Io, t.style.position = "fixed", t.style.visibility = "hidden", t.style.top = "-9999px", document.body.appendChild(t);
    let o = getComputedStyle(t).content || "";
    o = o.replace(/^"/, "").replace(/"$/, ""), o.split(";").forEach((n) => {
      const [i, s] = n.split(":");
      Ae[i] = s;
    });
    const r = document.querySelector(`style[${Io}]`);
    r && (Pn = !1, (e = r.parentNode) == null || e.removeChild(r)), document.body.removeChild(t);
  }
}
function ks(e) {
  return Bs(), !!Ae[e];
}
function Os(e) {
  const t = Ae[e];
  let o = null;
  if (t && Te())
    if (Pn)
      o = In;
    else {
      const r = document.querySelector(`style[${ye}="${Ae[e]}"]`);
      r ? o = r.innerHTML : delete Ae[e];
    }
  return [o, t];
}
const js = "_skip_check_", _n = "_multi_value_";
function qt(e, t) {
  return (t ? ot(Eo(e), Hs([Ls, Ao])) : ot(Eo(e), Ao)).replace(/\{%%%\:[^;];}/g, ";");
}
function Ns(e) {
  return typeof e == "object" && e && (js in e || _n in e);
}
function Po(e, t, o) {
  if (!t)
    return e;
  const r = `.${t}`, n = o === "low" ? `:where(${r})` : r;
  return e.split(",").map((s) => {
    var l;
    const a = s.trim().split(/\s+/);
    let c = a[0] || "";
    const u = ((l = c.match(/^\w+/)) == null ? void 0 : l[0]) || "";
    return c = `${u}${n}${c.slice(u.length)}`, [c, ...a.slice(1)].join(" ");
  }).join(",");
}
const mr = (e, t = {}, {
  root: o,
  injectHash: r,
  parentSelectors: n
} = {
  root: !0,
  parentSelectors: []
}) => {
  const {
    hashId: i,
    layer: s,
    path: a,
    hashPriority: c,
    transformers: u = [],
    linters: l = []
  } = t;
  let f = "", h = {};
  function b(d) {
    const y = d.getName(i);
    if (!h[y]) {
      const [m] = mr(d.style, t, {
        root: !1,
        parentSelectors: n
      });
      h[y] = `@keyframes ${d.getName(i)}${m}`;
    }
  }
  function S(d, y = []) {
    return d.forEach((m) => {
      Array.isArray(m) ? S(m, y) : m && y.push(m);
    }), y;
  }
  return S(Array.isArray(e) ? e : [e]).forEach((d) => {
    const y = typeof d == "string" && !o ? {} : d;
    if (typeof y == "string")
      f += `${y}
`;
    else if (y._keyframe)
      b(y);
    else {
      const m = u.reduce((T, x) => {
        var $;
        return (($ = x == null ? void 0 : x.visit) == null ? void 0 : $.call(x, T)) || T;
      }, y);
      Object.keys(m).forEach((T) => {
        const x = m[T];
        if (typeof x == "object" && x && (T !== "animationName" || !x._keyframe) && !Ns(x)) {
          let $ = !1, w = T.trim(), g = !1;
          (o || r) && i ? w.startsWith("@") ? $ = !0 : w === "&" ? w = Po("", i, c) : w = Po(T, i, c) : o && !i && (w === "&" || w === "") && (w = "", g = !0);
          const [v, I] = mr(x, t, {
            root: g,
            injectHash: $,
            parentSelectors: [...n, w]
          });
          h = {
            ...h,
            ...I
          }, f += `${w}${v}`;
        } else {
          let $ = function(g, v) {
            const I = g.replace(/[A-Z]/g, (L) => `-${L.toLowerCase()}`);
            let E = v;
            !Ss[g] && typeof E == "number" && E !== 0 && (E = `${E}px`), g === "animationName" && (v != null && v._keyframe) && (b(v), E = v.getName(i)), f += `${I}:${E};`;
          };
          const w = (x == null ? void 0 : x.value) ?? x;
          typeof x == "object" && (x != null && x[_n]) && Array.isArray(w) ? w.forEach((g) => {
            $(T, g);
          }) : $(T, w);
        }
      });
    }
  }), o ? s && (f && (f = `@layer ${s.name} {${f}}`), s.dependencies && (h[`@layer ${s.name}`] = s.dependencies.map((d) => `@layer ${d}, ${s.name};`).join(`
`))) : f = `{${f}}`, [f, h];
};
function zn(e, t) {
  return je(`${e.join("%")}${t}`);
}
const Fs = "style";
function _o(e, t) {
  const {
    path: o,
    hashId: r,
    layer: n,
    nonce: i,
    clientOnly: s,
    order: a = 0
  } = e, {
    mock: c,
    hashPriority: u,
    container: l,
    transformers: f,
    linters: h,
    cache: b,
    layer: S,
    autoPrefix: p
  } = C.useContext(Mt), d = [r || ""];
  S && d.push("layer"), d.push(...o);
  let y = hr;
  Nr(
    Fs,
    d,
    // Create cache if needed
    () => {
      const m = d.join("|");
      if (ks(m)) {
        const [v, I] = Os(m);
        if (v)
          return [v, I, {}, s, a];
      }
      const T = t(), [x, $] = mr(T, {
        hashId: r,
        hashPriority: u,
        layer: S ? n : void 0,
        path: o.join("-"),
        transformers: f,
        linters: h
      }), w = qt(x, p || !1), g = zn(d, w);
      return [w, g, $, s, a];
    },
    // Remove cache if no need
    (m, T) => {
      const [, x] = m;
      T && hr && xn(x, {
        mark: ye,
        attachTo: l
      });
    },
    // Effect: Inject style here
    (m) => {
      const [T, x, $, , w] = m;
      if (y && T !== In) {
        const g = {
          mark: ye,
          prepend: S ? !1 : "queue",
          attachTo: l,
          priority: w
        }, v = typeof i == "function" ? i() : i;
        v && (g.csp = {
          nonce: v
        });
        const I = [], E = [];
        Object.keys($).forEach((P) => {
          P.startsWith("@layer") ? I.push(P) : E.push(P);
        }), I.forEach((P) => {
          Ne(qt($[P], p || !1), `_layer-${P}`, {
            ...g,
            prepend: !0
          });
        });
        const L = Ne(T, x, g);
        L[ve] = b.instanceId, E.forEach((P) => {
          Ne(qt($[P], p || !1), `_effect-${P}`, g);
        });
      }
    }
  );
}
const Ds = "cssVar", Ws = (e, t) => {
  const {
    key: o,
    prefix: r,
    unitless: n,
    ignore: i,
    token: s,
    hashId: a,
    scope: c = ""
  } = e, {
    cache: {
      instanceId: u
    },
    container: l,
    hashPriority: f
  } = $e(Mt), {
    _tokenKey: h
  } = s, b = [...e.path, o, c, h];
  return Nr(Ds, b, () => {
    const p = t(), [d, y] = Cn(p, o, {
      prefix: r,
      unitless: n,
      ignore: i,
      scope: c,
      hashPriority: f,
      hashCls: a
    }), m = zn(b, y);
    return [d, y, m, o];
  }, ([, , p]) => {
    hr && xn(p, {
      mark: ye,
      attachTo: l
    });
  }, ([, p, d]) => {
    if (!p)
      return;
    const y = Ne(p, d, {
      mark: ye,
      prepend: "queue",
      attachTo: l,
      priority: -999
    });
    y[ve] = u, y.setAttribute(jr, o);
  });
};
function He(e) {
  return e.notSplit = !0, e;
}
He(["borderTop", "borderBottom"]), He(["borderTop"]), He(["borderBottom"]), He(["borderLeft", "borderRight"]), He(["borderLeft"]), He(["borderRight"]);
function ce(e) {
  "@babel/helpers - typeof";
  return ce = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ce(e);
}
function Gs(e) {
  if (Array.isArray(e)) return e;
}
function Vs(e, t) {
  var o = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (o != null) {
    var r, n, i, s, a = [], c = !0, u = !1;
    try {
      if (i = (o = o.call(e)).next, t === 0) {
        if (Object(o) !== o) return;
        c = !1;
      } else for (; !(c = (r = i.call(o)).done) && (a.push(r.value), a.length !== t); c = !0) ;
    } catch (l) {
      u = !0, n = l;
    } finally {
      try {
        if (!c && o.return != null && (s = o.return(), Object(s) !== s)) return;
      } finally {
        if (u) throw n;
      }
    }
    return a;
  }
}
function Xs() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Hn(e, t) {
  return Gs(e) || Vs(e, t) || dn(e, t) || Xs();
}
function qs(e, t) {
  if (ce(e) != "object" || !e) return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var r = o.call(e, t);
    if (ce(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ln(e) {
  var t = qs(e, "string");
  return ce(t) == "symbol" ? t : t + "";
}
function fe(e, t, o) {
  return (t = Ln(t)) in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}
function zo(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), o.push.apply(o, r);
  }
  return o;
}
function U(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zo(Object(o), !0).forEach(function(r) {
      fe(e, r, o[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : zo(Object(o)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(o, r));
    });
  }
  return e;
}
function _t(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Us(e, t) {
  for (var o = 0; o < t.length; o++) {
    var r = t[o];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Ln(r.key), r);
  }
}
function zt(e, t, o) {
  return t && Us(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function St(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function br(e, t) {
  return br = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, br(e, t);
}
function Qs(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && br(e, t);
}
function Ct(e) {
  return Ct = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Ct(e);
}
function Bn() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Bn = function() {
    return !!e;
  })();
}
function Ks(e, t) {
  if (t && (ce(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return St(e);
}
function Ys(e) {
  var t = Bn();
  return function() {
    var o, r = Ct(e);
    if (t) {
      var n = Ct(this).constructor;
      o = Reflect.construct(r, arguments, n);
    } else o = r.apply(this, arguments);
    return Ks(this, o);
  };
}
var Zs = /* @__PURE__ */ zt(function e() {
  _t(this, e);
}), kn = "CALC_UNIT", Js = new RegExp(kn, "g");
function Ut(e) {
  return typeof e == "number" ? "".concat(e).concat(kn) : e;
}
var ea = /* @__PURE__ */ (function(e) {
  Qs(o, e);
  var t = Ys(o);
  function o(r, n) {
    var i;
    _t(this, o), i = t.call(this), fe(St(i), "result", ""), fe(St(i), "unitlessCssVar", void 0), fe(St(i), "lowPriority", void 0);
    var s = ce(r);
    return i.unitlessCssVar = n, r instanceof o ? i.result = "(".concat(r.result, ")") : s === "number" ? i.result = Ut(r) : s === "string" && (i.result = r), i;
  }
  return zt(o, [{
    key: "add",
    value: function(n) {
      return n instanceof o ? this.result = "".concat(this.result, " + ").concat(n.getResult()) : (typeof n == "number" || typeof n == "string") && (this.result = "".concat(this.result, " + ").concat(Ut(n))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(n) {
      return n instanceof o ? this.result = "".concat(this.result, " - ").concat(n.getResult()) : (typeof n == "number" || typeof n == "string") && (this.result = "".concat(this.result, " - ").concat(Ut(n))), this.lowPriority = !0, this;
    }
  }, {
    key: "mul",
    value: function(n) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), n instanceof o ? this.result = "".concat(this.result, " * ").concat(n.getResult(!0)) : (typeof n == "number" || typeof n == "string") && (this.result = "".concat(this.result, " * ").concat(n)), this.lowPriority = !1, this;
    }
  }, {
    key: "div",
    value: function(n) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), n instanceof o ? this.result = "".concat(this.result, " / ").concat(n.getResult(!0)) : (typeof n == "number" || typeof n == "string") && (this.result = "".concat(this.result, " / ").concat(n)), this.lowPriority = !1, this;
    }
  }, {
    key: "getResult",
    value: function(n) {
      return this.lowPriority || n ? "(".concat(this.result, ")") : this.result;
    }
  }, {
    key: "equal",
    value: function(n) {
      var i = this, s = n || {}, a = s.unit, c = !0;
      return typeof a == "boolean" ? c = a : Array.from(this.unitlessCssVar).some(function(u) {
        return i.result.includes(u);
      }) && (c = !1), this.result = this.result.replace(Js, c ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), o;
})(Zs), ta = function(t, o) {
  var r = ea;
  return function(n) {
    return new r(n, o);
  };
}, Ho = function(t, o) {
  return "".concat([o, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function Lo(e, t, o, r) {
  var n = U({}, t[e]);
  if (r != null && r.deprecatedTokens) {
    var i = r.deprecatedTokens;
    i.forEach(function(a) {
      var c = Hn(a, 2), u = c[0], l = c[1];
      if (n != null && n[u] || n != null && n[l]) {
        var f;
        (f = n[l]) !== null && f !== void 0 || (n[l] = n == null ? void 0 : n[u]);
      }
    });
  }
  var s = U(U({}, o), n);
  return Object.keys(s).forEach(function(a) {
    s[a] === t[a] && delete s[a];
  }), s;
}
var On = typeof CSSINJS_STATISTIC < "u", yr = !0;
function Ge() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (!On)
    return Object.assign.apply(Object, [{}].concat(t));
  yr = !1;
  var r = {};
  return t.forEach(function(n) {
    if (ce(n) === "object") {
      var i = Object.keys(n);
      i.forEach(function(s) {
        Object.defineProperty(r, s, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return n[s];
          }
        });
      });
    }
  }), yr = !0, r;
}
var Bo = {};
function ra() {
}
var oa = function(t) {
  var o, r = t, n = ra;
  return On && typeof Proxy < "u" && (o = /* @__PURE__ */ new Set(), r = new Proxy(t, {
    get: function(s, a) {
      if (yr) {
        var c;
        (c = o) === null || c === void 0 || c.add(a);
      }
      return s[a];
    }
  }), n = function(s, a) {
    var c;
    Bo[s] = {
      global: Array.from(o),
      component: U(U({}, (c = Bo[s]) === null || c === void 0 ? void 0 : c.component), a)
    };
  }), {
    token: r,
    keys: o,
    flush: n
  };
};
function ko(e, t, o) {
  if (typeof o == "function") {
    var r;
    return o(Ge(t, (r = t[e]) !== null && r !== void 0 ? r : {}));
  }
  return o ?? {};
}
function na(e) {
  return {
    max: function() {
      for (var o = arguments.length, r = new Array(o), n = 0; n < o; n++)
        r[n] = arguments[n];
      return "max(".concat(r.map(function(i) {
        return Fe(i);
      }).join(","), ")");
    },
    min: function() {
      for (var o = arguments.length, r = new Array(o), n = 0; n < o; n++)
        r[n] = arguments[n];
      return "min(".concat(r.map(function(i) {
        return Fe(i);
      }).join(","), ")");
    }
  };
}
var ia = 1e3 * 60 * 10, sa = /* @__PURE__ */ (function() {
  function e() {
    _t(this, e), fe(this, "map", /* @__PURE__ */ new Map()), fe(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), fe(this, "nextID", 0), fe(this, "lastAccessBeat", /* @__PURE__ */ new Map()), fe(this, "accessBeat", 0);
  }
  return zt(e, [{
    key: "set",
    value: function(o, r) {
      this.clear();
      var n = this.getCompositeKey(o);
      this.map.set(n, r), this.lastAccessBeat.set(n, Date.now());
    }
  }, {
    key: "get",
    value: function(o) {
      var r = this.getCompositeKey(o), n = this.map.get(r);
      return this.lastAccessBeat.set(r, Date.now()), this.accessBeat += 1, n;
    }
  }, {
    key: "getCompositeKey",
    value: function(o) {
      var r = this, n = o.map(function(i) {
        return i && ce(i) === "object" ? "obj_".concat(r.getObjectID(i)) : "".concat(ce(i), "_").concat(i);
      });
      return n.join("|");
    }
  }, {
    key: "getObjectID",
    value: function(o) {
      if (this.objectIDMap.has(o))
        return this.objectIDMap.get(o);
      var r = this.nextID;
      return this.objectIDMap.set(o, r), this.nextID += 1, r;
    }
  }, {
    key: "clear",
    value: function() {
      var o = this;
      if (this.accessBeat > 1e4) {
        var r = Date.now();
        this.lastAccessBeat.forEach(function(n, i) {
          r - n > ia && (o.map.delete(i), o.lastAccessBeat.delete(i));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
})(), Oo = new sa();
function aa(e, t) {
  return A.useMemo(function() {
    var o = Oo.get(t);
    if (o)
      return o;
    var r = e();
    return Oo.set(t, r), r;
  }, t);
}
var ca = function() {
  return {};
};
function la(e) {
  var t = e.useCSP, o = t === void 0 ? ca : t, r = e.useToken, n = e.usePrefix, i = e.getResetStyles, s = e.getCommonStyle, a = e.getCompUnitless;
  function c(h, b, S, p) {
    var d = Array.isArray(h) ? h[0] : h;
    function y(v) {
      return "".concat(String(d)).concat(v.slice(0, 1).toUpperCase()).concat(v.slice(1));
    }
    var m = (p == null ? void 0 : p.unitless) || {}, T = typeof a == "function" ? a(h) : {}, x = U(U({}, T), {}, fe({}, y("zIndexPopup"), !0));
    Object.keys(m).forEach(function(v) {
      x[y(v)] = m[v];
    });
    var $ = U(U({}, p), {}, {
      unitless: x,
      prefixToken: y
    }), w = l(h, b, S, $), g = u(d, S, $);
    return function(v) {
      var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v, E = w(v, I), L = g(I);
      return [E, L];
    };
  }
  function u(h, b, S) {
    var p = S.unitless, d = S.prefixToken, y = S.ignore;
    return function(m) {
      var T = r(), x = T.cssVar, $ = T.realToken;
      return Ws({
        path: [h],
        prefix: x.prefix,
        key: x.key,
        unitless: p,
        ignore: y,
        token: $,
        scope: m
      }, function() {
        var w = ko(h, $, b), g = Lo(h, $, w, {
          deprecatedTokens: S == null ? void 0 : S.deprecatedTokens
        });
        return w && Object.keys(w).forEach(function(v) {
          g[d(v)] = g[v], delete g[v];
        }), g;
      }), x == null ? void 0 : x.key;
    };
  }
  function l(h, b, S) {
    var p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, d = Array.isArray(h) ? h : [h, h], y = Hn(d, 1), m = y[0], T = d.join("-"), x = e.layer || {
      name: "antd"
    };
    return function($) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $, g = r(), v = g.theme, I = g.realToken, E = g.hashId, L = g.token, P = g.cssVar, B = g.zeroRuntime, V = gt(function() {
        return B;
      }, []);
      if (V)
        return E;
      var K = n(), Y = K.rootPrefixCls, Z = K.iconPrefixCls, J = o(), le = "css", ee = aa(function() {
        var X = /* @__PURE__ */ new Set();
        return Object.keys(p.unitless || {}).forEach(function(te) {
          X.add(pt(te, P.prefix)), X.add(pt(te, Ho(m, P.prefix)));
        }), ta(le, X);
      }, [le, m, P == null ? void 0 : P.prefix]), Se = na(), q = Se.max, Ee = Se.min, de = {
        theme: v,
        token: L,
        hashId: E,
        nonce: function() {
          return J.nonce;
        },
        clientOnly: p.clientOnly,
        layer: x,
        // antd is always at top of styles
        order: p.order || -999
      };
      return typeof i == "function" && _o(U(U({}, de), {}, {
        clientOnly: !1,
        path: ["Shared", Y]
      }), function() {
        return i(L, {
          prefix: {
            rootPrefixCls: Y,
            iconPrefixCls: Z
          },
          csp: J
        });
      }), _o(U(U({}, de), {}, {
        path: [T, $, Z]
      }), function() {
        if (p.injectStyle === !1)
          return [];
        var X = oa(L), te = X.token, O = X.flush, z = ko(m, I, S), M = ".".concat($), he = Lo(m, I, z, {
          deprecatedTokens: p.deprecatedTokens
        });
        z && ce(z) === "object" && Object.keys(z).forEach(function(it) {
          z[it] = "var(".concat(pt(it, Ho(m, P.prefix)), ")");
        });
        var ne = Ge(te, {
          componentCls: M,
          prefixCls: $,
          iconCls: ".".concat(Z),
          antCls: ".".concat(Y),
          calc: ee,
          max: q,
          min: Ee
        }, z), Xe = b(ne, {
          hashId: E,
          prefixCls: $,
          rootPrefixCls: Y,
          iconPrefixCls: Z
        });
        O(m, he);
        var ue = typeof s == "function" ? s(ne, $, w, p.resetFont) : null;
        return [p.resetStyle === !1 ? null : ue, Xe];
      }), E;
    };
  }
  function f(h, b, S) {
    var p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, d = l(h, b, S, U({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, p)), y = function(T) {
      var x = T.prefixCls, $ = T.rootCls, w = $ === void 0 ? x : $;
      return d(x, w), null;
    };
    return y;
  }
  return {
    genStyleHooks: c,
    genSubStyleComponent: f,
    genComponentStyleHook: l
  };
}
const Gr = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
function xt(e) {
  return (e + 8) / e;
}
function ua(e) {
  const t = Array.from({
    length: 10
  }).map((o, r) => {
    const n = r - 1, i = e * Math.E ** (n / 5), s = r > 1 ? Math.floor(i) : Math.ceil(i);
    return Math.floor(s / 2) * 2;
  });
  return t[1] = e, t.map((o) => ({
    size: o,
    lineHeight: xt(o)
  }));
}
const fa = "6.0.0", jn = {
  blue: "#1677FF",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  /**
   * @deprecated Use magenta instead
   */
  pink: "#EB2F96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
}, $t = {
  // preset color palettes
  ...jn,
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorLink: "",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: !1,
  // Motion
  motion: !0
}, da = {
  aliceblue: "9ehhb",
  antiquewhite: "9sgk7",
  aqua: "1ekf",
  aquamarine: "4zsno",
  azure: "9eiv3",
  beige: "9lhp8",
  bisque: "9zg04",
  black: "0",
  blanchedalmond: "9zhe5",
  blue: "73",
  blueviolet: "5e31e",
  brown: "6g016",
  burlywood: "8ouiv",
  cadetblue: "3qba8",
  chartreuse: "4zshs",
  chocolate: "87k0u",
  coral: "9yvyo",
  cornflowerblue: "3xael",
  cornsilk: "9zjz0",
  crimson: "8l4xo",
  cyan: "1ekf",
  darkblue: "3v",
  darkcyan: "rkb",
  darkgoldenrod: "776yz",
  darkgray: "6mbhl",
  darkgreen: "jr4",
  darkgrey: "6mbhl",
  darkkhaki: "7ehkb",
  darkmagenta: "5f91n",
  darkolivegreen: "3bzfz",
  darkorange: "9yygw",
  darkorchid: "5z6x8",
  darkred: "5f8xs",
  darksalmon: "9441m",
  darkseagreen: "5lwgf",
  darkslateblue: "2th1n",
  darkslategray: "1ugcv",
  darkslategrey: "1ugcv",
  darkturquoise: "14up",
  darkviolet: "5rw7n",
  deeppink: "9yavn",
  deepskyblue: "11xb",
  dimgray: "442g9",
  dimgrey: "442g9",
  dodgerblue: "16xof",
  firebrick: "6y7tu",
  floralwhite: "9zkds",
  forestgreen: "1cisi",
  fuchsia: "9y70f",
  gainsboro: "8m8kc",
  ghostwhite: "9pq0v",
  goldenrod: "8j4f4",
  gold: "9zda8",
  gray: "50i2o",
  green: "pa8",
  greenyellow: "6senj",
  grey: "50i2o",
  honeydew: "9eiuo",
  hotpink: "9yrp0",
  indianred: "80gnw",
  indigo: "2xcoy",
  ivory: "9zldc",
  khaki: "9edu4",
  lavenderblush: "9ziet",
  lavender: "90c8q",
  lawngreen: "4vk74",
  lemonchiffon: "9zkct",
  lightblue: "6s73a",
  lightcoral: "9dtog",
  lightcyan: "8s1rz",
  lightgoldenrodyellow: "9sjiq",
  lightgray: "89jo3",
  lightgreen: "5nkwg",
  lightgrey: "89jo3",
  lightpink: "9z6wx",
  lightsalmon: "9z2ii",
  lightseagreen: "19xgq",
  lightskyblue: "5arju",
  lightslategray: "4nwk9",
  lightslategrey: "4nwk9",
  lightsteelblue: "6wau6",
  lightyellow: "9zlcw",
  lime: "1edc",
  limegreen: "1zcxe",
  linen: "9shk6",
  magenta: "9y70f",
  maroon: "4zsow",
  mediumaquamarine: "40eju",
  mediumblue: "5p",
  mediumorchid: "79qkz",
  mediumpurple: "5r3rv",
  mediumseagreen: "2d9ip",
  mediumslateblue: "4tcku",
  mediumspringgreen: "1di2",
  mediumturquoise: "2uabw",
  mediumvioletred: "7rn9h",
  midnightblue: "z980",
  mintcream: "9ljp6",
  mistyrose: "9zg0x",
  moccasin: "9zfzp",
  navajowhite: "9zest",
  navy: "3k",
  oldlace: "9wq92",
  olive: "50hz4",
  olivedrab: "472ub",
  orange: "9z3eo",
  orangered: "9ykg0",
  orchid: "8iu3a",
  palegoldenrod: "9bl4a",
  palegreen: "5yw0o",
  paleturquoise: "6v4ku",
  palevioletred: "8k8lv",
  papayawhip: "9zi6t",
  peachpuff: "9ze0p",
  peru: "80oqn",
  pink: "9z8wb",
  plum: "8nba5",
  powderblue: "6wgdi",
  purple: "4zssg",
  rebeccapurple: "3zk49",
  red: "9y6tc",
  rosybrown: "7cv4f",
  royalblue: "2jvtt",
  saddlebrown: "5fmkz",
  salmon: "9rvci",
  sandybrown: "9jn1c",
  seagreen: "1tdnb",
  seashell: "9zje6",
  sienna: "6973h",
  silver: "7ir40",
  skyblue: "5arjf",
  slateblue: "45e4t",
  slategray: "4e100",
  slategrey: "4e100",
  snow: "9zke2",
  springgreen: "1egv",
  steelblue: "2r1kk",
  tan: "87yx8",
  teal: "pds",
  thistle: "8ggk8",
  tomato: "9yqfb",
  turquoise: "2j4r4",
  violet: "9b10u",
  wheat: "9ld4j",
  white: "9zldr",
  whitesmoke: "9lhpx",
  yellow: "9zl6o",
  yellowgreen: "61fzm"
}, G = Math.round;
function Qt(e, t) {
  const o = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], r = o.map((n) => parseFloat(n));
  for (let n = 0; n < 3; n += 1)
    r[n] = t(r[n] || 0, o[n] || "", n);
  return o[3] ? r[3] = o[3].includes("%") ? r[3] / 100 : r[3] : r[3] = 1, r;
}
const jo = (e, t, o) => o === 0 ? e : e / 100;
function Ke(e, t) {
  const o = t || 255;
  return e > o ? o : e < 0 ? 0 : e;
}
class F {
  constructor(t) {
    /**
     * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
     */
    j(this, "isValid", !0);
    /**
     * Red, R in RGB
     */
    j(this, "r", 0);
    /**
     * Green, G in RGB
     */
    j(this, "g", 0);
    /**
     * Blue, B in RGB
     */
    j(this, "b", 0);
    /**
     * Alpha/Opacity, A in RGBA/HSLA
     */
    j(this, "a", 1);
    // HSV privates
    j(this, "_h");
    j(this, "_s");
    j(this, "_l");
    j(this, "_v");
    // intermediate variables to calculate HSL/HSV
    j(this, "_max");
    j(this, "_min");
    j(this, "_brightness");
    function o(r) {
      return r[0] in t && r[1] in t && r[2] in t;
    }
    if (t) if (typeof t == "string") {
      let n = function(i) {
        return r.startsWith(i);
      };
      const r = t.trim();
      if (/^#?[A-F\d]{3,8}$/i.test(r))
        this.fromHexString(r);
      else if (n("rgb"))
        this.fromRgbString(r);
      else if (n("hsl"))
        this.fromHslString(r);
      else if (n("hsv") || n("hsb"))
        this.fromHsvString(r);
      else {
        const i = da[r.toLowerCase()];
        i && this.fromHexString(
          // Convert 36 hex to 16 hex
          parseInt(i, 36).toString(16).padStart(6, "0")
        );
      }
    } else if (t instanceof F)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (o("rgb"))
      this.r = Ke(t.r), this.g = Ke(t.g), this.b = Ke(t.b), this.a = typeof t.a == "number" ? Ke(t.a, 1) : 1;
    else if (o("hsl"))
      this.fromHsl(t);
    else if (o("hsv"))
      this.fromHsv(t);
    else
      throw new Error("@ant-design/fast-color: unsupported input " + JSON.stringify(t));
  }
  // ======================= Setter =======================
  setR(t) {
    return this._sc("r", t);
  }
  setG(t) {
    return this._sc("g", t);
  }
  setB(t) {
    return this._sc("b", t);
  }
  setA(t) {
    return this._sc("a", t, 1);
  }
  setHue(t) {
    const o = this.toHsv();
    return o.h = t, this._c(o);
  }
  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    function t(i) {
      const s = i / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    }
    const o = t(this.r), r = t(this.g), n = t(this.b);
    return 0.2126 * o + 0.7152 * r + 0.0722 * n;
  }
  getHue() {
    if (typeof this._h > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._h = 0 : this._h = G(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
    }
    return this._h;
  }
  getSaturation() {
    if (typeof this._s > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._s = 0 : this._s = t / this.getMax();
    }
    return this._s;
  }
  getLightness() {
    return typeof this._l > "u" && (this._l = (this.getMax() + this.getMin()) / 510), this._l;
  }
  getValue() {
    return typeof this._v > "u" && (this._v = this.getMax() / 255), this._v;
  }
  /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness() {
    return typeof this._brightness > "u" && (this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3), this._brightness;
  }
  // ======================== Func ========================
  darken(t = 10) {
    const o = this.getHue(), r = this.getSaturation();
    let n = this.getLightness() - t / 100;
    return n < 0 && (n = 0), this._c({
      h: o,
      s: r,
      l: n,
      a: this.a
    });
  }
  lighten(t = 10) {
    const o = this.getHue(), r = this.getSaturation();
    let n = this.getLightness() + t / 100;
    return n > 1 && (n = 1), this._c({
      h: o,
      s: r,
      l: n,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(t, o = 50) {
    const r = this._c(t), n = o / 100, i = (a) => (r[a] - this[a]) * n + this[a], s = {
      r: G(i("r")),
      g: G(i("g")),
      b: G(i("b")),
      a: G(i("a") * 100) / 100
    };
    return this._c(s);
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(t = 10) {
    return this.mix({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }, t);
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(t = 10) {
    return this.mix({
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }, t);
  }
  onBackground(t) {
    const o = this._c(t), r = this.a + o.a * (1 - this.a), n = (i) => G((this[i] * this.a + o[i] * o.a * (1 - this.a)) / r);
    return this._c({
      r: n("r"),
      g: n("g"),
      b: n("b"),
      a: r
    });
  }
  // ======================= Status =======================
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  // ======================== MISC ========================
  equals(t) {
    return this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a;
  }
  clone() {
    return this._c(this);
  }
  // ======================= Format =======================
  toHexString() {
    let t = "#";
    const o = (this.r || 0).toString(16);
    t += o.length === 2 ? o : "0" + o;
    const r = (this.g || 0).toString(16);
    t += r.length === 2 ? r : "0" + r;
    const n = (this.b || 0).toString(16);
    if (t += n.length === 2 ? n : "0" + n, typeof this.a == "number" && this.a >= 0 && this.a < 1) {
      const i = G(this.a * 255).toString(16);
      t += i.length === 2 ? i : "0" + i;
    }
    return t;
  }
  /** CSS support color pattern */
  toHsl() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      l: this.getLightness(),
      a: this.a
    };
  }
  /** CSS support color pattern */
  toHslString() {
    const t = this.getHue(), o = G(this.getSaturation() * 100), r = G(this.getLightness() * 100);
    return this.a !== 1 ? `hsla(${t},${o}%,${r}%,${this.a})` : `hsl(${t},${o}%,${r}%)`;
  }
  /** Same as toHsb */
  toHsv() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      v: this.getValue(),
      a: this.a
    };
  }
  toRgb() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    };
  }
  toRgbString() {
    return this.a !== 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
  }
  toString() {
    return this.toRgbString();
  }
  // ====================== Privates ======================
  /** Return a new FastColor object with one channel changed */
  _sc(t, o, r) {
    const n = this.clone();
    return n[t] = Ke(o, r), n;
  }
  _c(t) {
    return new this.constructor(t);
  }
  getMax() {
    return typeof this._max > "u" && (this._max = Math.max(this.r, this.g, this.b)), this._max;
  }
  getMin() {
    return typeof this._min > "u" && (this._min = Math.min(this.r, this.g, this.b)), this._min;
  }
  fromHexString(t) {
    const o = t.replace("#", "");
    function r(n, i) {
      return parseInt(o[n] + o[i || n], 16);
    }
    o.length < 6 ? (this.r = r(0), this.g = r(1), this.b = r(2), this.a = o[3] ? r(3) / 255 : 1) : (this.r = r(0, 1), this.g = r(2, 3), this.b = r(4, 5), this.a = o[6] ? r(6, 7) / 255 : 1);
  }
  fromHsl({
    h: t,
    s: o,
    l: r,
    a: n
  }) {
    if (this._h = t % 360, this._s = o, this._l = r, this.a = typeof n == "number" ? n : 1, o <= 0) {
      const h = G(r * 255);
      this.r = h, this.g = h, this.b = h;
    }
    let i = 0, s = 0, a = 0;
    const c = t / 60, u = (1 - Math.abs(2 * r - 1)) * o, l = u * (1 - Math.abs(c % 2 - 1));
    c >= 0 && c < 1 ? (i = u, s = l) : c >= 1 && c < 2 ? (i = l, s = u) : c >= 2 && c < 3 ? (s = u, a = l) : c >= 3 && c < 4 ? (s = l, a = u) : c >= 4 && c < 5 ? (i = l, a = u) : c >= 5 && c < 6 && (i = u, a = l);
    const f = r - u / 2;
    this.r = G((i + f) * 255), this.g = G((s + f) * 255), this.b = G((a + f) * 255);
  }
  fromHsv({
    h: t,
    s: o,
    v: r,
    a: n
  }) {
    this._h = t % 360, this._s = o, this._v = r, this.a = typeof n == "number" ? n : 1;
    const i = G(r * 255);
    if (this.r = i, this.g = i, this.b = i, o <= 0)
      return;
    const s = t / 60, a = Math.floor(s), c = s - a, u = G(r * (1 - o) * 255), l = G(r * (1 - o * c) * 255), f = G(r * (1 - o * (1 - c)) * 255);
    switch (a) {
      case 0:
        this.g = f, this.b = u;
        break;
      case 1:
        this.r = l, this.b = u;
        break;
      case 2:
        this.r = u, this.b = f;
        break;
      case 3:
        this.r = u, this.g = l;
        break;
      case 4:
        this.r = f, this.g = u;
        break;
      case 5:
      default:
        this.g = u, this.b = l;
        break;
    }
  }
  fromHsvString(t) {
    const o = Qt(t, jo);
    this.fromHsv({
      h: o[0],
      s: o[1],
      v: o[2],
      a: o[3]
    });
  }
  fromHslString(t) {
    const o = Qt(t, jo);
    this.fromHsl({
      h: o[0],
      s: o[1],
      l: o[2],
      a: o[3]
    });
  }
  fromRgbString(t) {
    const o = Qt(t, (r, n) => (
      // Convert percentage to number. e.g. 50% -> 128
      n.includes("%") ? G(r / 100 * 255) : r
    ));
    this.r = o[0], this.g = o[1], this.b = o[2], this.a = o[3];
  }
}
const ct = 2, No = 0.16, ha = 0.05, ga = 0.05, pa = 0.15, Nn = 5, Fn = 4, ma = [{
  index: 7,
  amount: 15
}, {
  index: 6,
  amount: 25
}, {
  index: 5,
  amount: 30
}, {
  index: 5,
  amount: 45
}, {
  index: 5,
  amount: 65
}, {
  index: 5,
  amount: 85
}, {
  index: 4,
  amount: 90
}, {
  index: 3,
  amount: 95
}, {
  index: 2,
  amount: 97
}, {
  index: 1,
  amount: 98
}];
function Fo(e, t, o) {
  let r;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? r = o ? Math.round(e.h) - ct * t : Math.round(e.h) + ct * t : r = o ? Math.round(e.h) + ct * t : Math.round(e.h) - ct * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function Do(e, t, o) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  let r;
  return o ? r = e.s - No * t : t === Fn ? r = e.s + No : r = e.s + ha * t, r > 1 && (r = 1), o && t === Nn && r > 0.1 && (r = 0.1), r < 0.06 && (r = 0.06), Math.round(r * 100) / 100;
}
function Wo(e, t, o) {
  let r;
  return o ? r = e.v + ga * t : r = e.v - pa * t, r = Math.max(0, Math.min(1, r)), Math.round(r * 100) / 100;
}
function Vr(e, t = {}) {
  const o = [], r = new F(e), n = r.toHsv();
  for (let i = Nn; i > 0; i -= 1) {
    const s = new F({
      h: Fo(n, i, !0),
      s: Do(n, i, !0),
      v: Wo(n, i, !0)
    });
    o.push(s);
  }
  o.push(r);
  for (let i = 1; i <= Fn; i += 1) {
    const s = new F({
      h: Fo(n, i),
      s: Do(n, i),
      v: Wo(n, i)
    });
    o.push(s);
  }
  return t.theme === "dark" ? ma.map(({
    index: i,
    amount: s
  }) => new F(t.backgroundColor || "#141414").mix(o[i], s).toHexString()) : o.map((i) => i.toHexString());
}
const Kt = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1677FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
}, Sr = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
Sr.primary = Sr[5];
const xr = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
xr.primary = xr[5];
const vr = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
vr.primary = vr[5];
const Cr = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
Cr.primary = Cr[5];
const $r = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
$r.primary = $r[5];
const wr = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
wr.primary = wr[5];
const Tr = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
Tr.primary = Tr[5];
const Er = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
Er.primary = Er[5];
const wt = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
wt.primary = wt[5];
const Rr = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
Rr.primary = Rr[5];
const Mr = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
Mr.primary = Mr[5];
const Ar = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
Ar.primary = Ar[5];
const Ir = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
Ir.primary = Ir[5];
const Yt = {
  red: Sr,
  volcano: xr,
  orange: vr,
  gold: Cr,
  yellow: $r,
  lime: wr,
  green: Tr,
  cyan: Er,
  blue: wt,
  geekblue: Rr,
  purple: Mr,
  magenta: Ar,
  grey: Ir
};
function ba(e, {
  generateColorPalettes: t,
  generateNeutralColorPalettes: o
}) {
  const {
    colorSuccess: r,
    colorWarning: n,
    colorError: i,
    colorInfo: s,
    colorPrimary: a,
    colorBgBase: c,
    colorTextBase: u
  } = e, l = t(a), f = t(r), h = t(n), b = t(i), S = t(s), p = o(c, u), d = e.colorLink || e.colorInfo, y = t(d), m = new F(b[1]).mix(new F(b[3]), 50).toHexString();
  return {
    ...p,
    colorPrimaryBg: l[1],
    colorPrimaryBgHover: l[2],
    colorPrimaryBorder: l[3],
    colorPrimaryBorderHover: l[4],
    colorPrimaryHover: l[5],
    colorPrimary: l[6],
    colorPrimaryActive: l[7],
    colorPrimaryTextHover: l[8],
    colorPrimaryText: l[9],
    colorPrimaryTextActive: l[10],
    colorSuccessBg: f[1],
    colorSuccessBgHover: f[2],
    colorSuccessBorder: f[3],
    colorSuccessBorderHover: f[4],
    colorSuccessHover: f[4],
    colorSuccess: f[6],
    colorSuccessActive: f[7],
    colorSuccessTextHover: f[8],
    colorSuccessText: f[9],
    colorSuccessTextActive: f[10],
    colorErrorBg: b[1],
    colorErrorBgHover: b[2],
    colorErrorBgFilledHover: m,
    colorErrorBgActive: b[3],
    colorErrorBorder: b[3],
    colorErrorBorderHover: b[4],
    colorErrorHover: b[5],
    colorError: b[6],
    colorErrorActive: b[7],
    colorErrorTextHover: b[8],
    colorErrorText: b[9],
    colorErrorTextActive: b[10],
    colorWarningBg: h[1],
    colorWarningBgHover: h[2],
    colorWarningBorder: h[3],
    colorWarningBorderHover: h[4],
    colorWarningHover: h[4],
    colorWarning: h[6],
    colorWarningActive: h[7],
    colorWarningTextHover: h[8],
    colorWarningText: h[9],
    colorWarningTextActive: h[10],
    colorInfoBg: S[1],
    colorInfoBgHover: S[2],
    colorInfoBorder: S[3],
    colorInfoBorderHover: S[4],
    colorInfoHover: S[4],
    colorInfo: S[6],
    colorInfoActive: S[7],
    colorInfoTextHover: S[8],
    colorInfoText: S[9],
    colorInfoTextActive: S[10],
    colorLinkHover: y[4],
    colorLink: y[6],
    colorLinkActive: y[7],
    colorBgMask: new F("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  };
}
const ya = (e) => {
  let t = e, o = e, r = e, n = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? o = 4 : e < 8 && e >= 7 ? o = 5 : e < 14 && e >= 8 ? o = 6 : e < 16 && e >= 14 ? o = 7 : e >= 16 && (o = 8), e < 6 && e >= 2 ? r = 1 : e >= 6 && (r = 2), e > 4 && e < 8 ? n = 4 : e >= 8 && (n = 6), {
    borderRadius: e,
    borderRadiusXS: r,
    borderRadiusSM: o,
    borderRadiusLG: t,
    borderRadiusOuter: n
  };
};
function Sa(e) {
  const {
    motionUnit: t,
    motionBase: o,
    borderRadius: r,
    lineWidth: n
  } = e;
  return {
    // motion
    motionDurationFast: `${(o + t).toFixed(1)}s`,
    motionDurationMid: `${(o + t * 2).toFixed(1)}s`,
    motionDurationSlow: `${(o + t * 3).toFixed(1)}s`,
    // line
    lineWidthBold: n + 1,
    // radius
    ...ya(r)
  };
}
const xa = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
}, va = (e) => {
  const t = ua(e), o = t.map((l) => l.size), r = t.map((l) => l.lineHeight), n = o[1], i = o[0], s = o[2], a = r[1], c = r[0], u = r[2];
  return {
    fontSizeSM: i,
    fontSize: n,
    fontSizeLG: s,
    fontSizeXL: o[3],
    fontSizeHeading1: o[6],
    fontSizeHeading2: o[5],
    fontSizeHeading3: o[4],
    fontSizeHeading4: o[3],
    fontSizeHeading5: o[2],
    lineHeight: a,
    lineHeightLG: u,
    lineHeightSM: c,
    fontHeight: Math.round(a * n),
    fontHeightLG: Math.round(u * s),
    fontHeightSM: Math.round(c * i),
    lineHeightHeading1: r[6],
    lineHeightHeading2: r[5],
    lineHeightHeading3: r[4],
    lineHeightHeading4: r[3],
    lineHeightHeading5: r[2]
  };
};
function Ca(e) {
  const {
    sizeUnit: t,
    sizeStep: o
  } = e;
  return {
    sizeXXL: t * (o + 8),
    // 48
    sizeXL: t * (o + 4),
    // 32
    sizeLG: t * (o + 2),
    // 24
    sizeMD: t * (o + 1),
    // 20
    sizeMS: t * o,
    // 16
    size: t * o,
    // 16
    sizeSM: t * (o - 1),
    // 12
    sizeXS: t * (o - 2),
    // 8
    sizeXXS: t * (o - 3)
    // 4
  };
}
const re = (e, t) => new F(e).setA(t).toRgbString(), Le = (e, t) => new F(e).darken(t).toHexString(), $a = (e) => {
  const t = Vr(e);
  return {
    1: t[0],
    2: t[1],
    3: t[2],
    4: t[3],
    5: t[4],
    6: t[5],
    7: t[6],
    8: t[4],
    9: t[5],
    10: t[6]
  };
}, wa = (e, t) => {
  const o = e || "#fff", r = t || "#000";
  return {
    colorBgBase: o,
    colorTextBase: r,
    colorText: re(r, 0.88),
    colorTextSecondary: re(r, 0.65),
    colorTextTertiary: re(r, 0.45),
    colorTextQuaternary: re(r, 0.25),
    colorFill: re(r, 0.15),
    colorFillSecondary: re(r, 0.06),
    colorFillTertiary: re(r, 0.04),
    colorFillQuaternary: re(r, 0.02),
    colorBgSolid: re(r, 1),
    colorBgSolidHover: re(r, 0.75),
    colorBgSolidActive: re(r, 0.95),
    colorBgLayout: Le(o, 4),
    colorBgContainer: Le(o, 0),
    colorBgElevated: Le(o, 0),
    colorBgSpotlight: re(r, 0.85),
    colorBgBlur: "transparent",
    colorBorder: Le(o, 15),
    colorBorderDisabled: Le(o, 15),
    colorBorderSecondary: Le(o, 6)
  };
};
function Ta(e) {
  Kt.pink = Kt.magenta, Yt.pink = Yt.magenta;
  const t = Object.keys(jn).map((o) => {
    const r = e[o] === Kt[o] ? Yt[o] : Vr(e[o]);
    return Array.from({
      length: 10
    }, () => 1).reduce((n, i, s) => (n[`${o}-${s + 1}`] = r[s], n[`${o}${s + 1}`] = r[s], n), {});
  }).reduce((o, r) => (o = {
    ...o,
    ...r
  }, o), {});
  return {
    ...e,
    ...t,
    // Colors
    ...ba(e, {
      generateColorPalettes: $a,
      generateNeutralColorPalettes: wa
    }),
    // Font
    ...va(e.fontSize),
    // Size
    ...Ca(e),
    // Height
    ...xa(e),
    // Others
    ...Sa(e)
  };
}
const Ea = ns(Ta), Ra = {
  token: $t,
  override: {
    override: $t
  },
  hashed: !1
}, Ma = /* @__PURE__ */ A.createContext(Ra);
function Zt(e) {
  return e >= 0 && e <= 255;
}
function Ze(e, t) {
  const {
    r: o,
    g: r,
    b: n,
    a: i
  } = new F(e).toRgb();
  if (i < 1)
    return e;
  const {
    r: s,
    g: a,
    b: c
  } = new F(t).toRgb();
  for (let u = 0.01; u <= 1; u += 0.01) {
    const l = Math.round((o - s * (1 - u)) / u), f = Math.round((r - a * (1 - u)) / u), h = Math.round((n - c * (1 - u)) / u);
    if (Zt(l) && Zt(f) && Zt(h))
      return new F({
        r: l,
        g: f,
        b: h,
        a: Math.round(u * 100) / 100
      }).toRgbString();
  }
  return new F({
    r: o,
    g: r,
    b: n,
    a: 1
  }).toRgbString();
}
function Aa(e) {
  const {
    override: t,
    ...o
  } = e, r = {
    ...t
  };
  Object.keys($t).forEach((h) => {
    delete r[h];
  });
  const n = {
    ...o,
    ...r
  }, i = 480, s = 576, a = 768, c = 992, u = 1200, l = 1600;
  return n.motion === !1 && (n.motionDurationFast = "0s", n.motionDurationMid = "0s", n.motionDurationSlow = "0s"), {
    ...n,
    // ============== Background ============== //
    colorFillContent: n.colorFillSecondary,
    colorFillContentHover: n.colorFill,
    colorFillAlter: n.colorFillQuaternary,
    colorBgContainerDisabled: n.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: n.colorBgContainer,
    colorSplit: Ze(n.colorBorderSecondary, n.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: n.colorTextQuaternary,
    colorTextDisabled: n.colorTextQuaternary,
    colorTextHeading: n.colorText,
    colorTextLabel: n.colorTextSecondary,
    colorTextDescription: n.colorTextTertiary,
    colorTextLightSolid: n.colorWhite,
    colorHighlight: n.colorError,
    colorBgTextHover: n.colorFillSecondary,
    colorBgTextActive: n.colorFill,
    colorIcon: n.colorTextTertiary,
    colorIconHover: n.colorText,
    colorErrorOutline: Ze(n.colorErrorBg, n.colorBgContainer),
    colorWarningOutline: Ze(n.colorWarningBg, n.colorBgContainer),
    // Font
    fontSizeIcon: n.fontSizeSM,
    // Line
    lineWidthFocus: n.lineWidth * 3,
    // Control
    lineWidth: n.lineWidth,
    controlOutlineWidth: n.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: n.controlHeight / 2,
    controlItemBgHover: n.colorFillTertiary,
    controlItemBgActive: n.colorPrimaryBg,
    controlItemBgActiveHover: n.colorPrimaryBgHover,
    controlItemBgActiveDisabled: n.colorFill,
    controlTmpOutline: n.colorFillQuaternary,
    controlOutline: Ze(n.colorPrimaryBg, n.colorBgContainer),
    lineType: n.lineType,
    borderRadius: n.borderRadius,
    borderRadiusXS: n.borderRadiusXS,
    borderRadiusSM: n.borderRadiusSM,
    borderRadiusLG: n.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: n.sizeXXS,
    paddingXS: n.sizeXS,
    paddingSM: n.sizeSM,
    padding: n.size,
    paddingMD: n.sizeMD,
    paddingLG: n.sizeLG,
    paddingXL: n.sizeXL,
    paddingContentHorizontalLG: n.sizeLG,
    paddingContentVerticalLG: n.sizeMS,
    paddingContentHorizontal: n.sizeMS,
    paddingContentVertical: n.sizeSM,
    paddingContentHorizontalSM: n.size,
    paddingContentVerticalSM: n.sizeXS,
    marginXXS: n.sizeXXS,
    marginXS: n.sizeXS,
    marginSM: n.sizeSM,
    margin: n.size,
    marginMD: n.sizeMD,
    marginLG: n.sizeLG,
    marginXL: n.sizeXL,
    marginXXL: n.sizeXXL,
    boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    screenXS: i,
    screenXSMin: i,
    screenXSMax: s - 1,
    screenSM: s,
    screenSMMin: s,
    screenSMMax: a - 1,
    screenMD: a,
    screenMDMin: a,
    screenMDMax: c - 1,
    screenLG: c,
    screenLGMin: c,
    screenLGMax: u - 1,
    screenXL: u,
    screenXLMin: u,
    screenXLMax: l - 1,
    screenXXL: l,
    screenXXLMin: l,
    boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
    boxShadowCard: `
      0 1px 2px -2px ${new F("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new F("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new F("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)",
    // Override AliasToken
    ...r
  };
}
const Dn = {
  lineHeight: !0,
  lineHeightSM: !0,
  lineHeightLG: !0,
  lineHeightHeading1: !0,
  lineHeightHeading2: !0,
  lineHeightHeading3: !0,
  lineHeightHeading4: !0,
  lineHeightHeading5: !0,
  opacityLoading: !0,
  fontWeightStrong: !0,
  zIndexPopupBase: !0,
  zIndexBase: !0,
  opacityImage: !0
}, Ia = {
  motionBase: !0,
  motionUnit: !0
}, Pa = {
  screenXS: !0,
  screenXSMin: !0,
  screenXSMax: !0,
  screenSM: !0,
  screenSMMin: !0,
  screenSMMax: !0,
  screenMD: !0,
  screenMDMin: !0,
  screenMDMax: !0,
  screenLG: !0,
  screenLGMin: !0,
  screenLGMax: !0,
  screenXL: !0,
  screenXLMin: !0,
  screenXLMax: !0,
  screenXXL: !0,
  screenXXLMin: !0
}, Wn = (e, t, o) => {
  const r = o.getDerivativeToken(e), {
    override: n,
    ...i
  } = t;
  let s = {
    ...r,
    override: n
  };
  return s = Aa(s), i && Object.entries(i).forEach(([a, c]) => {
    const {
      theme: u,
      ...l
    } = c;
    let f = l;
    u && (f = Wn({
      ...s,
      ...l
    }, {
      override: l
    }, u)), s[a] = f;
  }), s;
};
function Xr() {
  const {
    token: e,
    hashed: t,
    theme: o,
    override: r,
    cssVar: n,
    zeroRuntime: i
  } = A.useContext(Ma), s = {
    prefix: (n == null ? void 0 : n.prefix) || "ant",
    key: (n == null ? void 0 : n.key) || "css-var-root"
  }, a = `${fa}-${t || ""}`, c = o || Ea, [u, l, f] = ys(c, [$t, e], {
    salt: a,
    override: r,
    getComputedToken: Wn,
    cssVar: {
      ...s,
      unitless: Dn,
      ignore: Ia,
      preserve: Pa
    }
  });
  return [c, f, t ? l : "", u, s, !!i];
}
const Gn = () => ({
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  fontStyle: "normal",
  lineHeight: 0,
  textAlign: "center",
  textTransform: "none",
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: "-0.125em",
  textRendering: "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "> *": {
    lineHeight: 1
  },
  svg: {
    display: "inline-block"
  }
}), _a = (e) => ({
  a: {
    color: e.colorLink,
    textDecoration: e.linkDecoration,
    backgroundColor: "transparent",
    // remove the gray background on active links in IE 10.
    outline: "none",
    cursor: "pointer",
    transition: `color ${e.motionDurationSlow}`,
    "-webkit-text-decoration-skip": "objects",
    // remove gaps in links underline in iOS 8+ and Safari 8+.
    "&:hover": {
      color: e.colorLinkHover
    },
    "&:active": {
      color: e.colorLinkActive
    },
    "&:active, &:hover": {
      textDecoration: e.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    "&:focus": {
      textDecoration: e.linkFocusDecoration,
      outline: 0
    },
    "&[disabled]": {
      color: e.colorTextDisabled,
      cursor: "not-allowed"
    }
  }
}), za = (e, t, o, r) => {
  const n = `[class^="${t}"], [class*=" ${t}"]`, i = o ? `.${o}` : n, s = {
    boxSizing: "border-box",
    "&::before, &::after": {
      boxSizing: "border-box"
    }
  };
  let a = {};
  return r !== !1 && (a = {
    fontFamily: e.fontFamily,
    fontSize: e.fontSize
  }), {
    [i]: {
      ...a,
      ...s,
      [n]: s
    }
  };
}, Ha = (e, t) => ({
  outline: `${Fe(e.lineWidthFocus)} solid ${e.colorPrimaryBorder}`,
  outlineOffset: 1,
  transition: "outline-offset 0s, outline 0s"
}), La = (e, t) => ({
  "&:focus-visible": Ha(e)
}), Ba = (e) => ({
  [`.${e}`]: {
    ...Gn(),
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  }
}), {
  genStyleHooks: ka,
  genComponentStyleHook: Oa,
  genSubStyleComponent: ja
} = la({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = $e(we);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, o, r, n, i] = Xr();
    return {
      theme: e,
      realToken: t,
      hashId: o,
      token: r,
      cssVar: n,
      zeroRuntime: i
    };
  },
  useCSP: () => {
    const {
      csp: e
    } = $e(we);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    const o = _a(e);
    return [o, {
      "&": o
    }, Ba((t == null ? void 0 : t.prefix.iconPrefixCls) ?? mn)];
  },
  getCommonStyle: za,
  getCompUnitless: () => Dn
}), Na = (e, t) => {
  const o = `--${e.replace(".", "")}-${t}-`;
  return (r, n = !1) => {
    const i = `${o}${r}`;
    return n ? `var(${i})` : i;
  };
}, Vn = /* @__PURE__ */ Ci({});
function Xn(e) {
  var t;
  return (t = e == null ? void 0 : e.getRootNode) == null ? void 0 : t.call(e);
}
function Fa(e) {
  return Xn(e) instanceof ShadowRoot;
}
function Da(e) {
  return Fa(e) ? Xn(e) : null;
}
function Wa(e) {
  return e.replace(/-(.)/g, (t, o) => o.toUpperCase());
}
function Ga(e, t) {
  Et(e, `[@ant-design/icons] ${t}`);
}
function Go(e) {
  return typeof e == "object" && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function Vo(e = {}) {
  return Object.keys(e).reduce((t, o) => {
    const r = e[o];
    switch (o) {
      case "class":
        t.className = r, delete t.class;
        break;
      default:
        delete t[o], t[Wa(o)] = r;
    }
    return t;
  }, {});
}
function Pr(e, t, o) {
  return o ? /* @__PURE__ */ A.createElement(e.tag, {
    key: t,
    ...Vo(e.attrs),
    ...o
  }, (e.children || []).map((r, n) => Pr(r, `${t}-${e.tag}-${n}`))) : /* @__PURE__ */ A.createElement(e.tag, {
    key: t,
    ...Vo(e.attrs)
  }, (e.children || []).map((r, n) => Pr(r, `${t}-${e.tag}-${n}`)));
}
function qn(e) {
  return Vr(e)[0];
}
function Un(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
const Va = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, Xa = (e) => {
  const {
    csp: t,
    prefixCls: o,
    layer: r
  } = $e(Vn);
  let n = Va;
  o && (n = n.replace(/anticon/g, o)), r && (n = `@layer ${r} {
${n}
}`), Me(() => {
    const i = e.current, s = Da(i);
    Ne(n, "@ant-design-icons", {
      prepend: !r,
      csp: t,
      attachTo: s
    });
  }, []);
}, tt = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function qa({
  primaryColor: e,
  secondaryColor: t
}) {
  tt.primaryColor = e, tt.secondaryColor = t || qn(e), tt.calculated = !!t;
}
function Ua() {
  return {
    ...tt
  };
}
const Ve = (e) => {
  const {
    icon: t,
    className: o,
    onClick: r,
    style: n,
    primaryColor: i,
    secondaryColor: s,
    ...a
  } = e, c = C.useRef(null);
  let u = tt;
  if (i && (u = {
    primaryColor: i,
    secondaryColor: s || qn(i)
  }), Xa(c), Ga(Go(t), `icon should be icon definiton, but got ${t}`), !Go(t))
    return null;
  let l = t;
  return l && typeof l.icon == "function" && (l = {
    ...l,
    icon: l.icon(u.primaryColor, u.secondaryColor)
  }), Pr(l.icon, `svg-${l.name}`, {
    className: o,
    onClick: r,
    style: n,
    "data-icon": l.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    ...a,
    ref: c
  });
};
Ve.displayName = "IconReact";
Ve.getTwoToneColors = Ua;
Ve.setTwoToneColors = qa;
function Qn(e) {
  const [t, o] = Un(e);
  return Ve.setTwoToneColors({
    primaryColor: t,
    secondaryColor: o
  });
}
function Qa() {
  const e = Ve.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
function _r() {
  return _r = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var r in o)
        Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
  }, _r.apply(this, arguments);
}
Qn(wt.primary);
const qr = /* @__PURE__ */ C.forwardRef((e, t) => {
  const {
    // affect outter <i>...</i>
    className: o,
    // affect inner <svg>...</svg>
    icon: r,
    spin: n,
    rotate: i,
    tabIndex: s,
    onClick: a,
    // other
    twoToneColor: c,
    ...u
  } = e, {
    prefixCls: l = "anticon",
    rootClassName: f
  } = C.useContext(Vn), h = Q(f, l, {
    [`${l}-${r.name}`]: !!r.name,
    [`${l}-spin`]: !!n || r.name === "loading"
  }, o);
  let b = s;
  b === void 0 && a && (b = -1);
  const S = i ? {
    msTransform: `rotate(${i}deg)`,
    transform: `rotate(${i}deg)`
  } : void 0, [p, d] = Un(c);
  return /* @__PURE__ */ C.createElement("span", _r({
    role: "img",
    "aria-label": r.name
  }, u, {
    ref: t,
    tabIndex: b,
    onClick: a,
    className: h
  }), /* @__PURE__ */ C.createElement(Ve, {
    icon: r,
    primaryColor: p,
    secondaryColor: d,
    style: S
  }));
});
qr.getTwoToneColor = Qa;
qr.setTwoToneColor = Qn;
const Ka = /* @__PURE__ */ C.createContext({});
function Ya(e) {
  const [, t] = C.useReducer((i) => i + 1, 0), o = C.useRef(e), r = vt(() => o.current), n = vt((i) => {
    o.current = typeof i == "function" ? i(o.current) : i, t();
  });
  return [r, n];
}
const me = "none", lt = "appear", ut = "enter", ft = "leave", Xo = "none", se = "prepare", Be = "start", ke = "active", Ur = "end", Kn = "prepared";
function qo(e, t) {
  const o = {};
  return o[e.toLowerCase()] = t.toLowerCase(), o[`Webkit${e}`] = `webkit${t}`, o[`Moz${e}`] = `moz${t}`, o[`ms${e}`] = `MS${t}`, o[`O${e}`] = `o${t.toLowerCase()}`, o;
}
function Za(e, t) {
  const o = {
    animationend: qo("Animation", "AnimationEnd"),
    transitionend: qo("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete o.animationend.animation, "TransitionEvent" in t || delete o.transitionend.transition), o;
}
const Ja = Za(Te(), typeof window < "u" ? window : {});
let Yn = {};
Te() && ({
  style: Yn
} = document.createElement("div"));
const dt = {};
function Zn(e) {
  if (dt[e])
    return dt[e];
  const t = Ja[e];
  if (t) {
    const o = Object.keys(t), r = o.length;
    for (let n = 0; n < r; n += 1) {
      const i = o[n];
      if (Object.prototype.hasOwnProperty.call(t, i) && i in Yn)
        return dt[e] = t[i], dt[e];
    }
  }
  return "";
}
const Jn = Zn("animationend"), ei = Zn("transitionend"), ec = !!(Jn && ei), Uo = Jn || "animationend", Qo = ei || "transitionend";
function Ko(e, t) {
  if (!e) return null;
  if (typeof e == "object") {
    const o = t.replace(/-\w/g, (r) => r[1].toUpperCase());
    return e[o];
  }
  return `${e}-${t}`;
}
const tc = ((e) => {
  const t = be();
  function o(n) {
    n && (n.removeEventListener(Qo, e), n.removeEventListener(Uo, e));
  }
  function r(n) {
    t.current && t.current !== n && o(t.current), n && n !== t.current && (n.addEventListener(Qo, e), n.addEventListener(Uo, e), t.current = n);
  }
  return C.useEffect(() => () => {
    o(t.current);
  }, []), [r, o];
}), ti = Te() ? $i : Me, rc = (() => {
  const e = C.useRef(null);
  function t() {
    Ie.cancel(e.current);
  }
  function o(r, n = 2) {
    t();
    const i = Ie(() => {
      n <= 1 ? r({
        isCanceled: () => i !== e.current
      }) : o(r, n - 1);
    });
    e.current = i;
  }
  return C.useEffect(() => () => {
    t();
  }, []), [o, t];
}), oc = [se, Be, ke, Ur], nc = [se, Kn], ri = !1, ic = !0;
function oi(e) {
  return e === ke || e === Ur;
}
const sc = ((e, t, o) => {
  const [r, n] = nr(Xo), [i, s] = rc();
  function a() {
    n(se, !0);
  }
  const c = t ? nc : oc;
  return ti(() => {
    if (r !== Xo && r !== Ur) {
      const u = c.indexOf(r), l = c[u + 1], f = o(r);
      f === ri ? n(l, !0) : l && i((h) => {
        function b() {
          h.isCanceled() || n(l, !0);
        }
        f === !0 ? b() : Promise.resolve(f).then(b);
      });
    }
  }, [e, r]), C.useEffect(() => () => {
    s();
  }, []), [a, r];
});
function ac(e, t, o, {
  motionEnter: r = !0,
  motionAppear: n = !0,
  motionLeave: i = !0,
  motionDeadline: s,
  motionLeaveImmediately: a,
  onAppearPrepare: c,
  onEnterPrepare: u,
  onLeavePrepare: l,
  onAppearStart: f,
  onEnterStart: h,
  onLeaveStart: b,
  onAppearActive: S,
  onEnterActive: p,
  onLeaveActive: d,
  onAppearEnd: y,
  onEnterEnd: m,
  onLeaveEnd: T,
  onVisibleChanged: x
}) {
  const [$, w] = nr(), [g, v] = Ya(me), [I, E] = nr(null), L = g(), P = be(!1), B = be(null);
  function V() {
    return o();
  }
  const K = be(!1);
  function Y() {
    v(me), E(null, !0);
  }
  const Z = vt((O) => {
    const z = g();
    if (z === me)
      return;
    const M = V();
    if (O && !O.deadline && O.target !== M)
      return;
    const he = K.current;
    let ne;
    z === lt && he ? ne = y == null ? void 0 : y(M, O) : z === ut && he ? ne = m == null ? void 0 : m(M, O) : z === ft && he && (ne = T == null ? void 0 : T(M, O)), he && ne !== !1 && Y();
  }), [J] = tc(Z), le = (O) => {
    switch (O) {
      case lt:
        return {
          [se]: c,
          [Be]: f,
          [ke]: S
        };
      case ut:
        return {
          [se]: u,
          [Be]: h,
          [ke]: p
        };
      case ft:
        return {
          [se]: l,
          [Be]: b,
          [ke]: d
        };
      default:
        return {};
    }
  }, ee = C.useMemo(() => le(L), [L]), [Se, q] = sc(L, !e, (O) => {
    var z;
    if (O === se) {
      const M = ee[se];
      return M ? M(V()) : ri;
    }
    return q in ee && E(((z = ee[q]) == null ? void 0 : z.call(ee, V(), null)) || null), q === ke && L !== me && (J(V()), s > 0 && (clearTimeout(B.current), B.current = setTimeout(() => {
      Z({
        deadline: !0
      });
    }, s))), q === Kn && Y(), ic;
  }), Ee = oi(q);
  K.current = Ee;
  const de = be(null);
  ti(() => {
    if (P.current && de.current === t)
      return;
    w(t);
    const O = P.current;
    P.current = !0;
    let z;
    !O && t && n && (z = lt), O && t && r && (z = ut), (O && !t && i || !O && a && !t && i) && (z = ft);
    const M = le(z);
    z && (e || M[se]) ? (v(z), Se()) : v(me), de.current = t;
  }, [t]), Me(() => {
    // Cancel appear
    (L === lt && !n || // Cancel enter
    L === ut && !r || // Cancel leave
    L === ft && !i) && v(me);
  }, [n, r, i]), Me(() => () => {
    P.current = !1, clearTimeout(B.current);
  }, []);
  const X = C.useRef(!1);
  Me(() => {
    $ && (X.current = !0), $ !== void 0 && L === me && ((X.current || $) && (x == null || x($)), X.current = !0);
  }, [$, L]);
  let te = I;
  return ee[se] && q === Be && (te = {
    transition: "none",
    ...te
  }), [g, q, te, $ ?? t];
}
function cc(e) {
  let t = e;
  typeof e == "object" && ({
    transitionSupport: t
  } = e);
  function o(n, i) {
    return !!(n.motionName && t && i !== !1);
  }
  const r = /* @__PURE__ */ C.forwardRef((n, i) => {
    const {
      // Default config
      visible: s = !0,
      removeOnLeave: a = !0,
      forceRender: c,
      children: u,
      motionName: l,
      leavedClassName: f,
      eventProps: h
    } = n, {
      motion: b
    } = C.useContext(Ka), S = o(n, b), p = be();
    function d() {
      return Gi(p.current);
    }
    const [y, m, T, x] = ac(S, s, d, n), $ = y(), w = C.useRef(x);
    x && (w.current = !0);
    const g = C.useMemo(() => {
      const E = {};
      return Object.defineProperties(E, {
        nativeElement: {
          enumerable: !0,
          get: d
        },
        inMotion: {
          enumerable: !0,
          get: () => () => y() !== me
        },
        enableMotion: {
          enumerable: !0,
          get: () => () => S
        }
      }), E;
    }, []);
    C.useImperativeHandle(i, () => g, []);
    let v;
    const I = {
      ...h,
      visible: s
    };
    if (!u)
      v = null;
    else if ($ === me)
      x ? v = u({
        ...I
      }, p) : !a && w.current && f ? v = u({
        ...I,
        className: f
      }, p) : c || !a && !f ? v = u({
        ...I,
        style: {
          display: "none"
        }
      }, p) : v = null;
    else {
      let E;
      m === se ? E = "prepare" : oi(m) ? E = "active" : m === Be && (E = "start");
      const L = Ko(l, `${$}-${E}`);
      v = u({
        ...I,
        className: Q(Ko(l, $), {
          [L]: L && E,
          [l]: typeof l == "string"
        }),
        style: T
      }, p);
    }
    return /* @__PURE__ */ C.isValidElement(v) && an(v) && (ln(v) || (v = /* @__PURE__ */ C.cloneElement(v, {
      ref: p
    }))), v;
  });
  return r.displayName = "CSSMotion", r;
}
const ni = cc(ec), lc = (e) => e != null, ii = (e, ...t) => {
  const o = e || {};
  return t.filter(Boolean).reduce((r, n) => (Object.keys(n || {}).forEach((i) => {
    const s = o[i], a = n[i];
    if (s && typeof s == "object")
      if (a && typeof a == "object")
        r[i] = ii(s, r[i], a);
      else {
        const {
          _default: c
        } = s;
        c && (r[i] = r[i] || {}, r[i][c] = Q(r[i][c], a));
      }
    else
      r[i] = Q(r[i], a);
  }), r), {});
}, uc = (e, ...t) => C.useMemo(() => ii.apply(void 0, [e].concat(t)), [e].concat(t)), fc = (...e) => e.filter(Boolean).reduce((t, o = {}) => (Object.keys(o).forEach((r) => {
  t[r] = {
    ...t[r],
    ...o[r]
  };
}), t), {}), dc = (...e) => C.useMemo(() => fc.apply(void 0, e), [].concat(e)), Yo = (e, t) => typeof e == "function" ? e(t) : e, hc = (e, t, o, r) => {
  const n = e.map((c) => c ? Yo(c, o) : void 0), i = t.map((c) => c ? Yo(c, o) : void 0), s = uc.apply(void 0, [r].concat(cr(n))), a = dc.apply(void 0, cr(i));
  return C.useMemo(() => [s, a], [s, a, r]);
};
function gc(e) {
  return e && /* @__PURE__ */ A.isValidElement(e) && e.type === A.Fragment;
}
const pc = (e, t, o) => /* @__PURE__ */ A.isValidElement(e) ? /* @__PURE__ */ A.cloneElement(e, typeof o == "function" ? o(e.props || {}) : o) : t;
function zr(e, t) {
  return pc(e, e, t);
}
const mc = ((e) => {
  if (!e)
    return !1;
  if (e instanceof Element) {
    if (e.offsetParent)
      return !0;
    if (e.getBBox) {
      const {
        width: t,
        height: o
      } = e.getBBox();
      if (t || o)
        return !0;
    }
    if (e.getBoundingClientRect) {
      const {
        width: t,
        height: o
      } = e.getBoundingClientRect();
      if (t || o)
        return !0;
    }
  }
  return !1;
}), bc = /* @__PURE__ */ C.createContext(!1), yc = /* @__PURE__ */ C.createContext(void 0);
var Sc = { icon: { tag: "svg", attrs: { viewBox: "0 0 1024 1024", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, name: "loading", theme: "outlined" };
function Hr() {
  return Hr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var r in o)
        Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
  }, Hr.apply(this, arguments);
}
const xc = (e, t) => /* @__PURE__ */ C.createElement(qr, Hr({}, e, {
  ref: t,
  icon: Sc
})), vc = /* @__PURE__ */ C.forwardRef(xc);
var ht = {}, Zo;
function Cc() {
  if (Zo) return ht;
  Zo = 1;
  var e = wi;
  return ht.createRoot = e.createRoot, ht.hydrateRoot = e.hydrateRoot, ht;
}
var $c = Cc();
const Tt = "__rc_react_root__";
function wc(e, t) {
  const o = t[Tt] || $c.createRoot(t);
  o.render(e), t[Tt] = o;
}
async function Tc(e) {
  return Promise.resolve().then(() => {
    var t;
    (t = e[Tt]) == null || t.unmount(), delete e[Tt];
  });
}
const Ec = (e) => {
  const {
    componentCls: t,
    colorPrimary: o
  } = e;
  return {
    [t]: {
      position: "absolute",
      background: "transparent",
      pointerEvents: "none",
      boxSizing: "border-box",
      color: `var(--wave-color, ${o})`,
      boxShadow: "0 0 0 0 currentcolor",
      opacity: 0.2,
      // =================== Motion ===================
      "&.wave-motion-appear": {
        transition: [`box-shadow 0.4s ${e.motionEaseOutCirc}`, `opacity 2s ${e.motionEaseOutCirc}`].join(","),
        "&-active": {
          boxShadow: "0 0 0 6px currentcolor",
          opacity: 0
        },
        "&.wave-quick": {
          transition: [`box-shadow ${e.motionDurationSlow} ${e.motionEaseInOut}`, `opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`].join(",")
        }
      }
    }
  };
}, Rc = Oa("Wave", Ec), si = `${lr}-wave-target`;
function Jo(e) {
  return e && typeof e == "string" && e !== "#fff" && e !== "#ffffff" && e !== "rgb(255, 255, 255)" && e !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/.test(e) && // any transparent rgba color
  e !== "transparent" && e !== "canvastext";
}
function Mc(e, t = null) {
  const o = getComputedStyle(e), {
    borderTopColor: r,
    borderColor: n,
    backgroundColor: i
  } = o;
  return t && Jo(o[t]) ? o[t] : [r, n, i].find(Jo) ?? null;
}
function Jt(e) {
  return Number.isNaN(e) ? 0 : e;
}
const Ac = (e) => {
  const {
    className: t,
    target: o,
    component: r,
    colorSource: n
  } = e, i = C.useRef(null), [s, a] = C.useState(null), [c, u] = C.useState([]), [l, f] = C.useState(0), [h, b] = C.useState(0), [S, p] = C.useState(0), [d, y] = C.useState(0), [m, T] = C.useState(!1), x = {
    left: l,
    top: h,
    width: S,
    height: d,
    borderRadius: c.map((g) => `${g}px`).join(" ")
  };
  s && (x["--wave-color"] = s);
  function $() {
    const g = getComputedStyle(o);
    a(Mc(o, n));
    const v = g.position === "static", {
      borderLeftWidth: I,
      borderTopWidth: E
    } = g;
    f(v ? o.offsetLeft : Jt(-Number.parseFloat(I))), b(v ? o.offsetTop : Jt(-Number.parseFloat(E))), p(o.offsetWidth), y(o.offsetHeight);
    const {
      borderTopLeftRadius: L,
      borderTopRightRadius: P,
      borderBottomLeftRadius: B,
      borderBottomRightRadius: V
    } = g;
    u([L, P, V, B].map((K) => Jt(Number.parseFloat(K))));
  }
  if (C.useEffect(() => {
    if (o) {
      const g = Ie(() => {
        $(), T(!0);
      });
      let v;
      return typeof ResizeObserver < "u" && (v = new ResizeObserver($), v.observe(o)), () => {
        Ie.cancel(g), v == null || v.disconnect();
      };
    }
  }, [o]), !m)
    return null;
  const w = (r === "Checkbox" || r === "Radio") && (o == null ? void 0 : o.classList.contains(si));
  return /* @__PURE__ */ C.createElement(ni, {
    visible: !0,
    motionAppear: !0,
    motionName: "wave-motion",
    motionDeadline: 5e3,
    onAppearEnd: (g, v) => {
      var I;
      if (v.deadline || v.propertyName === "opacity") {
        const E = (I = i.current) == null ? void 0 : I.parentElement;
        Tc(E).then(() => {
          E == null || E.remove();
        });
      }
      return !1;
    }
  }, ({
    className: g
  }, v) => /* @__PURE__ */ C.createElement("div", {
    ref: Br(i, v),
    className: Q(t, g, {
      "wave-quick": w
    }),
    style: x
  }));
}, Ic = (e, t) => {
  var n;
  const {
    component: o
  } = t;
  if (o === "Checkbox" && !((n = e.querySelector("input")) != null && n.checked))
    return;
  const r = document.createElement("div");
  r.style.position = "absolute", r.style.left = "0px", r.style.top = "0px", e == null || e.insertBefore(r, e == null ? void 0 : e.firstChild), wc(/* @__PURE__ */ C.createElement(Ac, {
    ...t,
    target: e
  }), r);
}, Pc = (e, t, o, r) => {
  const {
    wave: n
  } = C.useContext(we), [, i, s] = Xr(), a = vt((l) => {
    const f = e.current;
    if (n != null && n.disabled || !f)
      return;
    const h = f.querySelector(`.${si}`) || f, {
      showEffect: b
    } = n || {};
    (b || Ic)(h, {
      className: t,
      token: i,
      component: o,
      event: l,
      hashId: s,
      colorSource: r
    });
  }), c = C.useRef(null);
  return (l) => {
    Ie.cancel(c.current), c.current = Ie(() => {
      a(l);
    });
  };
}, _c = (e) => {
  const {
    children: t,
    disabled: o,
    component: r,
    colorSource: n
  } = e, {
    getPrefixCls: i
  } = $e(we), s = be(null), a = i("wave"), [, c] = Rc(a), u = Pc(s, Q(a, c), r, n);
  if (A.useEffect(() => {
    const f = s.current;
    if (!f || f.nodeType !== window.Node.ELEMENT_NODE || o)
      return;
    const h = (b) => {
      !mc(b.target) || // No need wave
      !f.getAttribute || f.getAttribute("disabled") || f.disabled || f.className.includes("disabled") && !f.className.includes("disabled:") || f.getAttribute("aria-disabled") === "true" || f.className.includes("-leave") || u(b);
    };
    return f.addEventListener("click", h, !0), () => {
      f.removeEventListener("click", h, !0);
    };
  }, [o]), !/* @__PURE__ */ A.isValidElement(t))
    return t ?? null;
  const l = an(t) ? Br(ln(t), s) : s;
  return zr(t, {
    ref: l
  });
}, zc = (e) => {
  const t = A.useContext(yc);
  return A.useMemo(() => e ? typeof e == "string" ? e ?? t : typeof e == "function" ? e(t) : t : t, [e, t]);
}, Hc = /* @__PURE__ */ C.createContext(null), Lc = (e, t) => {
  const o = C.useContext(Hc), r = C.useMemo(() => {
    if (!o)
      return "";
    const {
      compactDirection: n,
      isFirstItem: i,
      isLastItem: s
    } = o, a = n === "vertical" ? "-vertical-" : "-";
    return Q(`${e}-compact${a}item`, {
      [`${e}-compact${a}first-item`]: i,
      [`${e}-compact${a}last-item`]: s,
      [`${e}-compact${a}item-rtl`]: t === "rtl"
    });
  }, [e, t, o]);
  return {
    compactSize: o == null ? void 0 : o.compactSize,
    compactDirection: o == null ? void 0 : o.compactDirection,
    compactItemClassnames: r
  };
}, ai = /* @__PURE__ */ C.createContext(void 0), Bc = (e) => {
  const {
    getPrefixCls: t,
    direction: o
  } = C.useContext(we), {
    prefixCls: r,
    size: n,
    className: i,
    ...s
  } = e, a = t("btn-group", r), [, , c] = Xr(), u = C.useMemo(() => {
    switch (n) {
      case "large":
        return "lg";
      case "small":
        return "sm";
      default:
        return "";
    }
  }, [n]), l = Q(a, {
    [`${a}-${u}`]: u,
    [`${a}-rtl`]: o === "rtl"
  }, i, c);
  return /* @__PURE__ */ C.createElement(ai.Provider, {
    value: n
  }, /* @__PURE__ */ C.createElement("div", {
    ...s,
    className: l
  }));
}, en = /^[\u4E00-\u9FA5]{2}$/, Lr = en.test.bind(en);
function tn(e) {
  return typeof e == "string";
}
function er(e) {
  return e === "text" || e === "link";
}
function kc(e, t, o, r) {
  if (e == null || e === "")
    return;
  const n = t ? " " : "";
  return typeof e != "string" && typeof e != "number" && tn(e.type) && Lr(e.props.children) ? zr(e, (i) => ({
    ...i,
    children: i.children.split("").join(n),
    className: r,
    style: o
  })) : tn(e) ? /* @__PURE__ */ A.createElement("span", {
    className: r,
    style: o
  }, Lr(e) ? e.split("").join(n) : e) : gc(e) ? /* @__PURE__ */ A.createElement("span", {
    className: r,
    style: o
  }, e) : zr(e, (i) => ({
    ...i,
    className: Q(i.className, r) || void 0,
    style: {
      ...i.style,
      ...o
    }
  }));
}
function Oc(e, t, o, r) {
  let n = !1;
  const i = [];
  return A.Children.forEach(e, (s) => {
    const a = typeof s, c = a === "string" || a === "number";
    if (n && c) {
      const u = i.length - 1, l = i[u];
      i[u] = `${l}${s}`;
    } else
      i.push(s);
    n = c;
  }), A.Children.map(i, (s) => kc(s, t, o, r));
}
["default", "primary", "danger"].concat(cr(Gr));
const ci = /* @__PURE__ */ nn((e, t) => {
  const {
    className: o,
    style: r,
    children: n,
    prefixCls: i
  } = e, s = Q(`${i}-icon`, o);
  return /* @__PURE__ */ A.createElement("span", {
    ref: t,
    className: s,
    style: r
  }, n);
}), rn = /* @__PURE__ */ nn((e, t) => {
  const {
    prefixCls: o,
    className: r,
    style: n,
    iconClassName: i
  } = e, s = Q(`${o}-loading-icon`, r);
  return /* @__PURE__ */ A.createElement(ci, {
    prefixCls: o,
    className: s,
    style: n,
    ref: t
  }, /* @__PURE__ */ A.createElement(vc, {
    className: i
  }));
}), tr = () => ({
  width: 0,
  opacity: 0,
  transform: "scale(0)"
}), rr = (e) => ({
  width: e.scrollWidth,
  opacity: 1,
  transform: "scale(1)"
}), jc = (e) => {
  const {
    prefixCls: t,
    loading: o,
    existIcon: r,
    className: n,
    style: i,
    mount: s
  } = e, a = !!o;
  return r ? /* @__PURE__ */ A.createElement(rn, {
    prefixCls: t,
    className: n,
    style: i
  }) : /* @__PURE__ */ A.createElement(ni, {
    visible: a,
    // Used for minus flex gap style only
    motionName: `${t}-loading-icon-motion`,
    motionAppear: !s,
    motionEnter: !s,
    motionLeave: !s,
    removeOnLeave: !0,
    onAppearStart: tr,
    onAppearActive: rr,
    onEnterStart: tr,
    onEnterActive: rr,
    onLeaveStart: rr,
    onLeaveActive: tr
  }, ({
    className: c,
    style: u
  }, l) => {
    const f = {
      ...i,
      ...u
    };
    return /* @__PURE__ */ A.createElement(rn, {
      prefixCls: t,
      className: Q(n, c),
      style: f,
      ref: l
    });
  });
}, on = (e, t) => ({
  // Border
  [`> span, > ${e}`]: {
    "&:not(:last-child)": {
      [`&, & > ${e}`]: {
        "&:not(:disabled)": {
          borderInlineEndColor: t
        }
      }
    },
    "&:not(:first-child)": {
      [`&, & > ${e}`]: {
        "&:not(:disabled)": {
          borderInlineStartColor: t
        }
      }
    }
  }
}), Nc = (e) => {
  const {
    componentCls: t,
    fontSize: o,
    lineWidth: r,
    groupBorderColor: n,
    colorErrorHover: i
  } = e;
  return {
    [`${t}-group`]: [
      {
        position: "relative",
        display: "inline-flex",
        // Border
        [`> span, > ${t}`]: {
          "&:not(:last-child)": {
            [`&, & > ${t}`]: {
              borderStartEndRadius: 0,
              borderEndEndRadius: 0
            }
          },
          "&:not(:first-child)": {
            marginInlineStart: e.calc(r).mul(-1).equal(),
            [`&, & > ${t}`]: {
              borderStartStartRadius: 0,
              borderEndStartRadius: 0
            }
          }
        },
        [t]: {
          position: "relative",
          zIndex: 1,
          "&:hover, &:focus, &:active": {
            zIndex: 2
          },
          "&[disabled]": {
            zIndex: 0
          }
        },
        [`${t}-icon-only`]: {
          fontSize: o
        }
      },
      // Border Color
      on(`${t}-primary`, n),
      on(`${t}-danger`, i)
    ]
  };
}, or = (e) => Math.round(Number(e || 0)), Fc = (e) => {
  if (e instanceof F)
    return e;
  if (e && typeof e == "object" && "h" in e && "b" in e) {
    const {
      b: t,
      ...o
    } = e;
    return {
      ...o,
      v: t
    };
  }
  return typeof e == "string" && /hsb/.test(e) ? e.replace(/hsb/, "hsv") : e;
};
class nt extends F {
  constructor(t) {
    super(Fc(t));
  }
  toHsbString() {
    const t = this.toHsb(), o = or(t.s * 100), r = or(t.b * 100), n = or(t.h), i = t.a, s = `hsb(${n}, ${o}%, ${r}%)`, a = `hsba(${n}, ${o}%, ${r}%, ${i.toFixed(i === 0 ? 0 : 2)})`;
    return i === 1 ? s : a;
  }
  toHsb() {
    const {
      v: t,
      ...o
    } = this.toHsv();
    return {
      ...o,
      b: t,
      a: this.a
    };
  }
}
const Dc = (e) => e instanceof nt ? e : new nt(e);
Dc("#1677ff");
const Wc = (e, t) => (e == null ? void 0 : e.replace(/[^\w/]/g, "").slice(0, t ? 8 : 6)) || "", Gc = (e, t) => e ? Wc(e, t) : "";
let Vc = /* @__PURE__ */ (function() {
  function e(t) {
    var r;
    if (_t(this, e), this.cleared = !1, t instanceof e) {
      this.metaColor = t.metaColor.clone(), this.colors = (r = t.colors) == null ? void 0 : r.map((n) => ({
        color: new e(n.color),
        percent: n.percent
      })), this.cleared = t.cleared;
      return;
    }
    const o = Array.isArray(t);
    o && t.length ? (this.colors = t.map(({
      color: n,
      percent: i
    }) => ({
      color: new e(n),
      percent: i
    })), this.metaColor = new nt(this.colors[0].color.metaColor)) : this.metaColor = new nt(o ? "" : t), (!t || o && !this.colors) && (this.metaColor = this.metaColor.setA(0), this.cleared = !0);
  }
  return zt(e, [{
    key: "toHsb",
    value: function() {
      return this.metaColor.toHsb();
    }
  }, {
    key: "toHsbString",
    value: function() {
      return this.metaColor.toHsbString();
    }
  }, {
    key: "toHex",
    value: function() {
      return Gc(this.toHexString(), this.metaColor.a < 1);
    }
  }, {
    key: "toHexString",
    value: function() {
      return this.metaColor.toHexString();
    }
  }, {
    key: "toRgb",
    value: function() {
      return this.metaColor.toRgb();
    }
  }, {
    key: "toRgbString",
    value: function() {
      return this.metaColor.toRgbString();
    }
  }, {
    key: "isGradient",
    value: function() {
      return !!this.colors && !this.cleared;
    }
  }, {
    key: "getColors",
    value: function() {
      return this.colors || [{
        color: this,
        percent: 0
      }];
    }
  }, {
    key: "toCssString",
    value: function() {
      const {
        colors: o
      } = this;
      return o ? `linear-gradient(90deg, ${o.map((n) => `${n.color.toRgbString()} ${n.percent}%`).join(", ")})` : this.metaColor.toRgbString();
    }
  }, {
    key: "equals",
    value: function(o) {
      return !o || this.isGradient() !== o.isGradient() ? !1 : this.isGradient() ? this.colors.length === o.colors.length && this.colors.every((r, n) => {
        const i = o.colors[n];
        return r.percent === i.percent && r.color.equals(i.color);
      }) : this.toHexString() === o.toHexString();
    }
  }]);
})();
const Xc = (e, t) => {
  const {
    r: o,
    g: r,
    b: n,
    a: i
  } = e.toRgb(), s = new nt(e.toRgbString()).onBackground(t).toHsv();
  return i <= 0.5 ? s.v > 0.5 : o * 0.299 + r * 0.587 + n * 0.114 > 192;
}, li = (e) => {
  const {
    paddingInline: t,
    onlyIconSize: o,
    borderColorDisabled: r
  } = e;
  return Ge(e, {
    buttonPaddingHorizontal: t,
    buttonPaddingVertical: 0,
    buttonIconOnlyFontSize: o,
    colorBorderDisabled: r
  });
}, ui = (e) => {
  const t = e.contentFontSize ?? e.fontSize, o = e.contentFontSizeSM ?? e.fontSize, r = e.contentFontSizeLG ?? e.fontSizeLG, n = e.contentLineHeight ?? xt(t), i = e.contentLineHeightSM ?? xt(o), s = e.contentLineHeightLG ?? xt(r), a = Xc(new Vc(e.colorBgSolid), "#fff") ? "#000" : "#fff", c = Gr.reduce((f, h) => ({
    ...f,
    [`${h}ShadowColor`]: `0 ${Fe(e.controlOutlineWidth)} 0 ${Ze(e[`${h}1`], e.colorBgContainer)}`
  }), {}), u = e.colorBgContainerDisabled, l = e.colorBgContainerDisabled;
  return {
    ...c,
    fontWeight: 400,
    iconGap: e.marginXS,
    defaultShadow: `0 ${e.controlOutlineWidth}px 0 ${e.controlTmpOutline}`,
    primaryShadow: `0 ${e.controlOutlineWidth}px 0 ${e.controlOutline}`,
    dangerShadow: `0 ${e.controlOutlineWidth}px 0 ${e.colorErrorOutline}`,
    primaryColor: e.colorTextLightSolid,
    dangerColor: e.colorTextLightSolid,
    borderColorDisabled: e.colorBorderDisabled,
    defaultGhostColor: e.colorBgContainer,
    ghostBg: "transparent",
    defaultGhostBorderColor: e.colorBgContainer,
    paddingInline: e.paddingContentHorizontal - e.lineWidth,
    paddingInlineLG: e.paddingContentHorizontal - e.lineWidth,
    paddingInlineSM: 8 - e.lineWidth,
    onlyIconSize: "inherit",
    onlyIconSizeSM: "inherit",
    onlyIconSizeLG: "inherit",
    groupBorderColor: e.colorPrimaryHover,
    linkHoverBg: "transparent",
    textTextColor: e.colorText,
    textTextHoverColor: e.colorText,
    textTextActiveColor: e.colorText,
    textHoverBg: e.colorFillTertiary,
    defaultColor: e.colorText,
    defaultBg: e.colorBgContainer,
    defaultBorderColor: e.colorBorder,
    defaultBorderColorDisabled: e.colorBorder,
    defaultHoverBg: e.colorBgContainer,
    defaultHoverColor: e.colorPrimaryHover,
    defaultHoverBorderColor: e.colorPrimaryHover,
    defaultActiveBg: e.colorBgContainer,
    defaultActiveColor: e.colorPrimaryActive,
    defaultActiveBorderColor: e.colorPrimaryActive,
    solidTextColor: a,
    contentFontSize: t,
    contentFontSizeSM: o,
    contentFontSizeLG: r,
    contentLineHeight: n,
    contentLineHeightSM: i,
    contentLineHeightLG: s,
    paddingBlock: Math.max((e.controlHeight - t * n) / 2 - e.lineWidth, 0),
    paddingBlockSM: Math.max((e.controlHeightSM - o * i) / 2 - e.lineWidth, 0),
    paddingBlockLG: Math.max((e.controlHeightLG - r * s) / 2 - e.lineWidth, 0),
    defaultBgDisabled: u,
    dashedBgDisabled: l
  };
}, qc = (e) => {
  const {
    componentCls: t,
    antCls: o
  } = e, r = Na(o, "btn");
  return {
    [t]: [
      // ==============================================================
      // ==                         Variable                         ==
      // ==============================================================
      {
        // Border
        [r("border-width")]: "1px",
        [r("border-color")]: "#000",
        [r("border-color-hover")]: `var(${r("border-color")})`,
        [r("border-color-active")]: `var(${r("border-color")})`,
        [r("border-color-disabled")]: `var(${r("border-color")})`,
        [r("border-style")]: "solid",
        // Text
        [r("text-color")]: "#000",
        [r("text-color-hover")]: `var(${r("text-color")})`,
        [r("text-color-active")]: `var(${r("text-color")})`,
        [r("text-color-disabled")]: `var(${r("text-color")})`,
        // Background
        [r("bg-color")]: "#ddd",
        [r("bg-color-hover")]: `var(${r("bg-color")})`,
        [r("bg-color-active")]: `var(${r("bg-color")})`,
        [r("bg-color-disabled")]: e.colorBgContainerDisabled,
        [r("bg-color-container")]: e.colorBgContainer,
        // Shadow
        [r("shadow")]: "none"
      },
      // ==============================================================
      // ==                         Template                         ==
      // ==============================================================
      {
        // Basic
        border: `var(${r("border-width")}) var(${r("border-style")}) var(${r("border-color")})`,
        color: `var(${r("text-color")})`,
        backgroundColor: `var(${r("bg-color")})`,
        // Status
        [`&:not(:disabled):not(${t}-disabled)`]: {
          // Hover
          "&:hover": {
            border: `var(${r("border-width")}) var(${r("border-style")}) var(${r("border-color-hover")})`,
            color: `var(${r("text-color-hover")})`,
            backgroundColor: `var(${r("bg-color-hover")})`
          },
          // Active
          "&:active": {
            border: `var(${r("border-width")}) var(${r("border-style")}) var(${r("border-color-active")})`,
            color: `var(${r("text-color-active")})`,
            backgroundColor: `var(${r("bg-color-active")})`
          }
        }
      },
      // ==============================================================
      // ==                         Variants                         ==
      // ==============================================================
      {
        // >>>>> Solid
        [`&${t}-variant-solid`]: {
          // Solid Variables
          [r("solid-bg-color")]: `var(${r("color-base")})`,
          [r("solid-bg-color-hover")]: `var(${r("color-hover")})`,
          [r("solid-bg-color-active")]: `var(${r("color-active")})`,
          // Variables
          [r("border-color")]: "transparent",
          [r("text-color")]: e.colorTextLightSolid,
          [r("bg-color")]: `var(${r("solid-bg-color")})`,
          [r("bg-color-hover")]: `var(${r("solid-bg-color-hover")})`,
          [r("bg-color-active")]: `var(${r("solid-bg-color-active")})`,
          // Box Shadow
          boxShadow: `var(${r("shadow")})`
        },
        // >>>>> Outlined & Dashed
        [`&${t}-variant-outlined, &${t}-variant-dashed`]: {
          [r("border-color")]: `var(${r("color-base")})`,
          [r("border-color-hover")]: `var(${r("color-hover")})`,
          [r("border-color-active")]: `var(${r("color-active")})`,
          [r("bg-color")]: `var(${r("bg-color-container")})`,
          [r("text-color")]: `var(${r("color-base")})`,
          [r("text-color-hover")]: `var(${r("color-hover")})`,
          [r("text-color-active")]: `var(${r("color-active")})`,
          // Box Shadow
          boxShadow: `var(${r("shadow")})`
        },
        // >>>>> Dashed
        [`&${t}-variant-dashed`]: {
          [r("border-style")]: "dashed",
          [r("bg-color-disabled")]: e.dashedBgDisabled
        },
        // >>>>> Filled
        [`&${t}-variant-filled`]: {
          [r("border-color")]: "transparent",
          [r("text-color")]: `var(${r("color-base")})`,
          [r("bg-color")]: `var(${r("color-light")})`,
          [r("bg-color-hover")]: `var(${r("color-light-hover")})`,
          [r("bg-color-active")]: `var(${r("color-light-active")})`
        },
        // >>>>> Text & Link
        [`&${t}-variant-text, &${t}-variant-link`]: {
          [r("border-color")]: "transparent",
          [r("text-color")]: `var(${r("color-base")})`,
          [r("text-color-hover")]: `var(${r("color-hover")})`,
          [r("text-color-active")]: `var(${r("color-active")})`,
          [r("bg-color")]: "transparent",
          [r("bg-color-hover")]: "transparent",
          [r("bg-color-active")]: "transparent",
          [`&:disabled, &${e.componentCls}-disabled`]: {
            background: "transparent",
            borderColor: "transparent"
          }
        },
        // >>>>> Text
        [`&${t}-variant-text`]: {
          [r("bg-color-hover")]: `var(${r("color-light")})`,
          [r("bg-color-active")]: `var(${r("color-light-active")})`
        }
      },
      // ==============================================================
      // ==                          Colors                          ==
      // ==============================================================
      {
        // ======================== By Default ========================
        // >>>>> Link
        [`&${t}-variant-link`]: {
          [r("color-base")]: e.colorLink,
          [r("color-hover")]: e.colorLinkHover,
          [r("color-active")]: e.colorLinkActive
        },
        // ======================== Compatible ========================
        // >>>>> Primary
        [`&${t}-color-primary`]: {
          [r("color-base")]: e.colorPrimary,
          [r("color-hover")]: e.colorPrimaryHover,
          [r("color-active")]: e.colorPrimaryActive,
          [r("color-light")]: e.colorPrimaryBg,
          [r("color-light-hover")]: e.colorPrimaryBgHover,
          [r("color-light-active")]: e.colorPrimaryBorder,
          [r("shadow")]: e.primaryShadow
        },
        // >>>>> Danger
        [`&${t}-color-dangerous`]: {
          [r("color-base")]: e.colorError,
          [r("color-hover")]: e.colorErrorHover,
          [r("color-active")]: e.colorErrorActive,
          [r("color-light")]: e.colorErrorBg,
          [r("color-light-hover")]: e.colorErrorBgFilledHover,
          [r("color-light-active")]: e.colorErrorBgActive,
          [r("shadow")]: e.dangerShadow
        },
        // >>>>> Default
        [`&${t}-color-default`]: {
          [r("solid-bg-color")]: e.colorBgSolid,
          [r("solid-bg-color-hover")]: e.colorBgSolidHover,
          [r("solid-bg-color-active")]: e.colorBgSolidActive,
          [r("color-base")]: e.defaultBorderColor,
          [r("color-hover")]: e.defaultHoverBorderColor,
          [r("color-active")]: e.defaultActiveBorderColor,
          [r("color-light")]: e.colorFillTertiary,
          [r("color-light-hover")]: e.colorFillSecondary,
          [r("color-light-active")]: e.colorFill,
          [r("text-color")]: e.colorText,
          [r("text-color-hover")]: e.defaultHoverBorderColor,
          [r("text-color-active")]: e.defaultActiveBorderColor,
          [r("shadow")]: e.defaultShadow,
          [`&${t}-variant-solid`]: {
            [r("text-color")]: e.solidTextColor
          },
          [`&${t}-variant-filled, &${t}-variant-text`]: {
            [r("text-color-hover")]: `var(${r("text-color")})`,
            [r("text-color-active")]: `var(${r("text-color")})`
          },
          [`&${t}-background-ghost`]: {
            [`&${t}-variant-outlined, &${t}-variant-dashed`]: {
              [r("text-color")]: e.defaultGhostColor,
              [r("border-color")]: e.defaultGhostBorderColor
            }
          }
        }
      },
      // >>>>> Preset Colors
      Gr.map((n) => {
        const i = e[`${n}6`], s = e[`${n}1`], a = e[`${n}5`], c = e[`${n}2`], u = e[`${n}3`], l = e[`${n}7`], f = e[`${n}ShadowColor`];
        return {
          [`&${t}-color-${n}`]: {
            [r("color-base")]: i,
            [r("color-hover")]: a,
            [r("color-active")]: l,
            [r("color-light")]: s,
            [r("color-light-hover")]: c,
            [r("color-light-active")]: u,
            [r("shadow")]: f
          }
        };
      }),
      // ==============================================================
      // ==                         Disabled                         ==
      // ==============================================================
      {
        // Disabled
        [`&:disabled, &${e.componentCls}-disabled`]: {
          cursor: "not-allowed",
          borderColor: e.colorBorderDisabled,
          background: `var(${r("bg-color-disabled")})`,
          color: e.colorTextDisabled,
          boxShadow: "none"
        }
      },
      // ==============================================================
      // ==                          Ghost                           ==
      // ==============================================================
      {
        // Ghost
        [`&${t}-background-ghost`]: {
          [r("bg-color")]: "transparent",
          [r("shadow")]: "none"
        }
      }
    ]
  };
}, Uc = (e) => {
  const {
    componentCls: t,
    iconCls: o,
    fontWeight: r,
    opacityLoading: n,
    motionDurationSlow: i,
    motionEaseInOut: s,
    iconGap: a,
    calc: c
  } = e;
  return {
    [t]: {
      outline: "none",
      position: "relative",
      display: "inline-flex",
      gap: a,
      alignItems: "center",
      justifyContent: "center",
      fontWeight: r,
      whiteSpace: "nowrap",
      textAlign: "center",
      backgroundImage: "none",
      cursor: "pointer",
      transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
      userSelect: "none",
      touchAction: "manipulation",
      "&:disabled > *": {
        pointerEvents: "none"
      },
      // https://github.com/ant-design/ant-design/issues/51380
      [`${t}-icon > svg`]: Gn(),
      "> a": {
        color: "currentColor"
      },
      "&:not(:disabled)": La(e),
      [`&${t}-two-chinese-chars::first-letter`]: {
        letterSpacing: "0.34em"
      },
      [`&${t}-two-chinese-chars > *:not(${o})`]: {
        marginInlineEnd: "-0.34em",
        letterSpacing: "0.34em"
      },
      [`&${t}-icon-only`]: {
        paddingInline: 0,
        // make `btn-icon-only` not too narrow
        [`&${t}-compact-item`]: {
          flex: "none"
        }
      },
      // Loading
      [`&${t}-loading`]: {
        opacity: n,
        cursor: "default"
      },
      [`${t}-loading-icon`]: {
        transition: ["width", "opacity", "margin"].map((u) => `${u} ${i} ${s}`).join(",")
      },
      // iconPlacement
      [`&:not(${t}-icon-end)`]: {
        [`${t}-loading-icon-motion`]: {
          "&-appear-start, &-enter-start": {
            marginInlineEnd: c(a).mul(-1).equal()
          },
          "&-appear-active, &-enter-active": {
            marginInlineEnd: 0
          },
          "&-leave-start": {
            marginInlineEnd: 0
          },
          "&-leave-active": {
            marginInlineEnd: c(a).mul(-1).equal()
          }
        }
      },
      "&-icon-end": {
        flexDirection: "row-reverse",
        [`${t}-loading-icon-motion`]: {
          "&-appear-start, &-enter-start": {
            marginInlineStart: c(a).mul(-1).equal()
          },
          "&-appear-active, &-enter-active": {
            marginInlineStart: 0
          },
          "&-leave-start": {
            marginInlineStart: 0
          },
          "&-leave-active": {
            marginInlineStart: c(a).mul(-1).equal()
          }
        }
      }
    }
  };
}, Qc = (e) => ({
  minWidth: e.controlHeight,
  paddingInline: 0,
  borderRadius: "50%"
}), Qr = (e, t = "") => {
  const {
    componentCls: o,
    controlHeight: r,
    fontSize: n,
    borderRadius: i,
    buttonPaddingHorizontal: s,
    iconCls: a,
    buttonPaddingVertical: c,
    buttonIconOnlyFontSize: u
  } = e;
  return [
    {
      [t]: {
        fontSize: n,
        height: r,
        padding: `${Fe(c)} ${Fe(s)}`,
        borderRadius: i,
        [`&${o}-icon-only`]: {
          width: r,
          [a]: {
            fontSize: u
          }
        }
      }
    },
    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${o}${o}-circle${t}`]: Qc(e)
    },
    {
      [`${o}${o}-round${t}`]: {
        borderRadius: e.controlHeight,
        [`&:not(${o}-icon-only)`]: {
          paddingInline: e.buttonPaddingHorizontal
        }
      }
    }
  ];
}, Kc = (e) => {
  const t = Ge(e, {
    fontSize: e.contentFontSize
  });
  return Qr(t, e.componentCls);
}, Yc = (e) => {
  const t = Ge(e, {
    controlHeight: e.controlHeightSM,
    fontSize: e.contentFontSizeSM,
    padding: e.paddingXS,
    buttonPaddingHorizontal: e.paddingInlineSM,
    buttonPaddingVertical: 0,
    borderRadius: e.borderRadiusSM,
    buttonIconOnlyFontSize: e.onlyIconSizeSM
  });
  return Qr(t, `${e.componentCls}-sm`);
}, Zc = (e) => {
  const t = Ge(e, {
    controlHeight: e.controlHeightLG,
    fontSize: e.contentFontSizeLG,
    buttonPaddingHorizontal: e.paddingInlineLG,
    buttonPaddingVertical: 0,
    borderRadius: e.borderRadiusLG,
    buttonIconOnlyFontSize: e.onlyIconSizeLG
  });
  return Qr(t, `${e.componentCls}-lg`);
}, Jc = (e) => {
  const {
    componentCls: t
  } = e;
  return {
    [t]: {
      [`&${t}-block`]: {
        width: "100%"
      }
    }
  };
}, el = ka("Button", (e) => {
  const t = li(e);
  return [
    // Shared
    Uc(t),
    // Size
    Kc(t),
    Yc(t),
    Zc(t),
    // Block
    Jc(t),
    // Variant
    qc(t),
    // Button Group
    Nc(t)
  ];
}, ui, {
  unitless: {
    fontWeight: !0,
    contentLineHeight: !0,
    contentLineHeightSM: !0,
    contentLineHeightLG: !0
  }
});
function tl(e, t, o, r) {
  const {
    focusElCls: n,
    focus: i,
    borderElCls: s
  } = o, a = s ? "> *" : "", c = ["hover", i ? "focus" : null, "active"].filter(Boolean).map((u) => `&:${u} ${a}`).join(",");
  return {
    [`&-item:not(${t}-last-item)`]: {
      marginInlineEnd: e.calc(e.lineWidth).mul(-1).equal()
    },
    [`&-item:not(${r}-status-success)`]: {
      zIndex: 2
    },
    "&-item": {
      [c]: {
        zIndex: 3
      },
      ...n ? {
        [`&${n}`]: {
          zIndex: 3
        }
      } : {},
      [`&[disabled] ${a}`]: {
        zIndex: 0
      }
    }
  };
}
function rl(e, t, o) {
  const {
    borderElCls: r
  } = o, n = r ? `> ${r}` : "";
  return {
    [`&-item:not(${t}-first-item):not(${t}-last-item) ${n}`]: {
      borderRadius: 0
    },
    [`&-item:not(${t}-last-item)${t}-first-item`]: {
      [`& ${n}, &${e}-sm ${n}, &${e}-lg ${n}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${t}-first-item)${t}-last-item`]: {
      [`& ${n}, &${e}-sm ${n}, &${e}-lg ${n}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  };
}
function ol(e, t = {
  focus: !0
}) {
  const {
    componentCls: o
  } = e, {
    componentCls: r
  } = t, n = r || o, i = `${n}-compact`;
  return {
    [i]: {
      ...tl(e, i, t, n),
      ...rl(n, i, t)
    }
  };
}
function nl(e, t, o) {
  return {
    // border collapse
    [`&-item:not(${t}-last-item)`]: {
      marginBottom: e.calc(e.lineWidth).mul(-1).equal()
    },
    [`&-item:not(${o}-status-success)`]: {
      zIndex: 2
    },
    "&-item": {
      "&:hover,&:focus,&:active": {
        zIndex: 3
      },
      "&[disabled]": {
        zIndex: 0
      }
    }
  };
}
function il(e, t) {
  return {
    [`&-item:not(${t}-first-item):not(${t}-last-item)`]: {
      borderRadius: 0
    },
    [`&-item${t}-first-item:not(${t}-last-item)`]: {
      [`&, &${e}-sm, &${e}-lg`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&-item${t}-last-item:not(${t}-first-item)`]: {
      [`&, &${e}-sm, &${e}-lg`]: {
        borderStartStartRadius: 0,
        borderStartEndRadius: 0
      }
    }
  };
}
function sl(e) {
  const t = `${e.componentCls}-compact-vertical`;
  return {
    [t]: {
      ...nl(e, t, e.componentCls),
      ...il(e.componentCls, t)
    }
  };
}
const al = (e) => {
  const {
    componentCls: t,
    colorPrimaryHover: o,
    lineWidth: r,
    calc: n
  } = e, i = n(r).mul(-1).equal(), s = (a) => {
    const c = `${t}-compact${a ? "-vertical" : ""}-item`, u = `${c}${t}-primary:not([disabled])`;
    return {
      // TODO: Border color transition should be not cover when has color.
      [c]: {
        transition: "none"
      },
      [`${u} + ${u}::before`]: {
        position: "absolute",
        top: a ? i : 0,
        insetInlineStart: a ? 0 : i,
        backgroundColor: o,
        content: '""',
        width: a ? "100%" : r,
        height: a ? r : "100%"
      }
    };
  };
  return {
    ...s(),
    ...s(!0)
  };
}, cl = ja(["Button", "compact"], (e) => {
  const t = li(e);
  return [
    // Space Compact
    ol(t),
    sl(t),
    al(t)
  ];
}, ui);
function ll(e) {
  if (typeof e == "object" && e) {
    let t = e == null ? void 0 : e.delay;
    return t = !Number.isNaN(t) && typeof t == "number" ? t : 0, {
      loading: t <= 0,
      delay: t
    };
  }
  return {
    loading: !!e,
    delay: 0
  };
}
const ul = {
  default: ["default", "outlined"],
  primary: ["primary", "solid"],
  dashed: ["default", "dashed"],
  // `link` is not a real color but we should compatible with it
  link: ["link", "link"],
  text: ["default", "text"]
}, fl = /* @__PURE__ */ A.forwardRef((e, t) => {
  const {
    _skipSemantic: o,
    loading: r = !1,
    prefixCls: n,
    color: i,
    variant: s,
    type: a,
    danger: c = !1,
    shape: u,
    size: l,
    disabled: f,
    className: h,
    rootClassName: b,
    children: S,
    icon: p,
    iconPosition: d,
    iconPlacement: y,
    ghost: m = !1,
    block: T = !1,
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    htmlType: x = "button",
    classNames: $,
    styles: w,
    style: g,
    autoInsertSpace: v,
    autoFocus: I,
    ...E
  } = e, L = sr(S), P = a || "default", {
    button: B
  } = A.useContext(we), V = u || (B == null ? void 0 : B.shape) || "default", [K, Y] = gt(() => {
    if (i && s)
      return [i, s];
    if (a || c) {
      const W = ul[P] || [];
      return c ? ["danger", W[1]] : W;
    }
    return B != null && B.color && (B != null && B.variant) ? [B.color, B.variant] : ["default", "outlined"];
  }, [i, s, a, c, B == null ? void 0 : B.color, B == null ? void 0 : B.variant, P]), [Z, J] = gt(() => m && Y === "solid" ? [K, "outlined"] : [K, Y], [K, Y, m]), le = Z === "danger", ee = le ? "dangerous" : Z, {
    getPrefixCls: Se,
    direction: q,
    autoInsertSpace: Ee,
    className: de,
    style: X,
    classNames: te,
    styles: O
  } = Qi("button"), z = v ?? Ee ?? !0, M = Se("btn", n), [he, ne] = el(M), Xe = $e(bc), ue = f ?? Xe, it = $e(ai), _e = gt(() => ll(r), [r]), [ge, Yr] = uo(_e.loading), [Ht, Zr] = uo(!1), qe = be(null), Jr = ki(t, qe), eo = L.length === 1 && !p && !er(J), Lt = be(!0);
  A.useEffect(() => (Lt.current = !1, () => {
    Lt.current = !0;
  }), []), Mi(() => {
    let W = null;
    _e.delay > 0 ? W = setTimeout(() => {
      W = null, Yr(!0);
    }, _e.delay) : Yr(_e.loading);
    function st() {
      W && (clearTimeout(W), W = null);
    }
    return st;
  }, [_e.delay, _e.loading]), Me(() => {
    if (!qe.current || !z)
      return;
    const W = qe.current.textContent || "";
    eo && Lr(W) ? Ht || Zr(!0) : Ht && Zr(!1);
  }), Me(() => {
    I && qe.current && qe.current.focus();
  }, []);
  const to = A.useCallback((W) => {
    var st;
    if (ge || ue) {
      W.preventDefault();
      return;
    }
    (st = e.onClick) == null || st.call(e, ("href" in e, W));
  }, [e.onClick, ge, ue]), {
    compactSize: di,
    compactItemClassnames: ro
  } = Lc(M, q), hi = {
    large: "lg",
    small: "sm",
    middle: void 0
  }, Bt = zc((W) => l ?? di ?? it ?? W), oo = Bt ? hi[Bt] ?? "" : "", gi = ge ? "loading" : p, no = y ?? d ?? "start", kt = Wi(E, ["navigate"]), pi = {
    ...e,
    type: P,
    color: Z,
    variant: J,
    danger: le,
    shape: V,
    size: Bt,
    disabled: ue,
    loading: ge,
    iconPlacement: no
  }, [Ot, jt] = hc([o ? void 0 : te, $], [o ? void 0 : O, w], {
    props: pi
  }), io = Q(M, he, ne, {
    [`${M}-${V}`]: V !== "default" && V !== "square" && V,
    // Compatible with versions earlier than 5.21.0
    [`${M}-${P}`]: P,
    [`${M}-dangerous`]: c,
    [`${M}-color-${ee}`]: ee,
    [`${M}-variant-${J}`]: J,
    [`${M}-${oo}`]: oo,
    [`${M}-icon-only`]: !S && S !== 0 && !!gi,
    [`${M}-background-ghost`]: m && !er(J),
    [`${M}-loading`]: ge,
    [`${M}-two-chinese-chars`]: Ht && z && !ge,
    [`${M}-block`]: T,
    [`${M}-rtl`]: q === "rtl",
    [`${M}-icon-end`]: no === "end"
  }, ro, h, b, de, Ot.root), so = {
    ...jt.root,
    ...X,
    ...g
  }, ao = {
    className: Ot.icon,
    style: jt.icon
  }, co = (W) => /* @__PURE__ */ A.createElement(ci, {
    prefixCls: M,
    ...ao
  }, W), mi = /* @__PURE__ */ A.createElement(jc, {
    existIcon: !!p,
    prefixCls: M,
    loading: ge,
    mount: Lt.current,
    ...ao
  });
  let Ue;
  p && !ge ? Ue = co(p) : r && typeof r == "object" && r.icon ? Ue = co(r.icon) : Ue = mi;
  const lo = lc(S) ? Oc(S, eo && z, jt.content, Ot.content) : null;
  if (kt.href !== void 0)
    return /* @__PURE__ */ A.createElement("a", {
      ...kt,
      className: Q(io, {
        [`${M}-disabled`]: ue
      }),
      href: ue ? void 0 : kt.href,
      style: so,
      onClick: to,
      ref: Jr,
      tabIndex: ue ? -1 : 0,
      "aria-disabled": ue
    }, Ue, lo);
  let Nt = /* @__PURE__ */ A.createElement("button", {
    ...E,
    type: x,
    className: io,
    style: so,
    onClick: to,
    disabled: ue,
    ref: Jr
  }, Ue, lo, ro && /* @__PURE__ */ A.createElement(cl, {
    prefixCls: M
  }));
  return er(J) || (Nt = /* @__PURE__ */ A.createElement(_c, {
    component: "Button",
    disabled: ge
  }, Nt)), Nt;
}), Kr = fl;
Kr.Group = Bc;
Kr.__ANT_BUTTON = !0;
const fi = {
  text: "Click",
  background_color: "#1890ff",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "400",
  fontFamily: "inherit",
  padding: "8px 16px",
  margin: ["0px", "0px", "0px", "0px"],
  border_radius: ["4px", "4px", "4px", "4px"],
  border: "none",
  text_align: "center",
  loading: !1,
  theme: "basic",
  type: "button"
}, dl = {
  background_color: "primary",
  color: "text",
  border: "border"
}, hl = {
  grid: {
    desktop: { width: 4, height: 4 },
    mobile: { width: 6, height: 4 }
  },
  resizable: { width: !0, height: !0 }
}, gl = (e) => [
  {
    type: e.GROUP("basic"),
    width: 24,
    collaseOpen: !0,
    elements: [
      { label: "Name", name: "_name", type: e.TEXT(""), showLabel: !0, width: 24 }
    ]
  },
  {
    type: e.GROUP("text"),
    width: 24,
    collaseOpen: !0,
    elements: [
      { label: "Text", name: "text", type: e.TEXT("Click"), showLabel: !0, width: 24, showFx: !0, onlyFx: !0 },
      { label: "Text Align", name: "text_align", type: e.TEXTALIGNMENT("center"), showLabel: !0, width: 24, showFx: !0 },
      { label: "Text Color", name: "color", type: e.COLOR("#ffffff"), showLabel: !0, width: 24, showFx: !0 },
      { label: "Font Size", name: "fontSize", type: e.TEXT("12px"), showLabel: !0, width: 24, showFx: !0 },
      { label: "Font Weight", name: "fontWeight", type: e.SELECT(["100", "200", "300", "400", "500", "600", "700", "800", "900"], "500"), showLabel: !0, width: 24, showFx: !0 }
    ]
  },
  {
    type: e.GROUP("theme"),
    width: 24,
    collaseOpen: !0,
    elements: [
      { label: "Theme", name: "theme", type: e.CHANGETHEME("dark"), showLabel: !0, width: 24 }
    ]
  },
  {
    type: e.GROUP("style"),
    width: 24,
    collaseOpen: !0,
    elements: [
      { label: "Background Color", name: "background_color", type: e.COLOR("#ff0000"), showLabel: !0, width: 24, showFx: !0 },
      { label: "Border", name: "border", type: e.TEXT("1px solid #e1e1e1"), width: 24 },
      { label: "Border Radius", name: "border_radius", type: e.BORDERRADIUS(["5px", "5px", "5px", "5px"]), showLabel: !0, width: 24, showFx: !0 },
      { label: "Margin", name: "margin", type: e.SPACING(["0px", "0px", "0px", "0px"]), showLabel: !0, width: 24, showFx: !0 },
      { label: "Padding", name: "padding", type: e.SPACING(["0px", "0px", "0px", "0px"]), showLabel: !0, width: 24 }
    ]
  },
  {
    type: e.GROUP("layout"),
    width: 24,
    elements: [
      { label: "Type", name: "type", type: e.TEXT(), showLabel: !0, width: 24 },
      { label: "ID", name: "id", type: e.TEXT(), showLabel: !0, width: 24 },
      { label: "Char Limit", name: "char_limit", type: e.NUMBER(), showLabel: !0, width: 24 },
      { label: "Loading", name: "loading", type: e.NUMBER(0), showLabel: !0, width: 24 }
    ]
  },
  {
    type: e.GROUP("events"),
    width: 24,
    elements: [
      { label: "Event", name: "event", type: e.EVENTBUTTON("click", {}), showLabel: !0, width: 24 }
    ]
  }
];
function pl(e) {
  return {
    name: "Button",
    EditProperties: gl(e),
    Configuration: hl,
    ThemeMapping: dl,
    defaultProps: fi
  };
}
function xl(e) {
  const { ElementTypes: t, executeFlow: o } = e, { useComponentContext: r, useNavigate: n } = e.getPlatformHooks();
  return {
    component: (s) => {
      const a = (n == null ? void 0 : n()) || null, c = r(), { id: u, _mode: l, grid: f, properties: h, meta: b, updateProperties: S, onFxChange: p, ...d } = s, y = { ...fi, ...h }, {
        loading: m,
        text: T,
        background_color: x,
        padding: $,
        border: w,
        border_radius: g,
        color: v,
        margin: I,
        text_align: E,
        fontSize: L,
        fontWeight: P
      } = y, B = typeof m == "string" ? Number(m) : m, {
        setSidebar: V,
        setPopup: K,
        setHeader: Y,
        selectedSidebarId: Z,
        selectedPopupId: J,
        selectedHeaderId: le,
        screens: ee,
        setSelectedScreenIndex: Se,
        selectedScreenIndex: q,
        initandOpenSidebar: Ee,
        initandOpenPopup: de,
        initandOpenHeader: X
      } = c, te = (ne) => {
        if (console.log("Button Clicked for custom flow event", ne), l === "preview" && o && h.event && h.event.nodes) {
          let Xe = {
            setSidebar: V,
            setPopup: K,
            setHeader: Y,
            screens: ee,
            selectedSidebarId: Z,
            selectedPopupId: J,
            selectedHeaderId: le,
            setSelectedScreenIndex: Se,
            selectedScreenIndex: q,
            initandOpenSidebar: Ee,
            initandOpenPopup: de,
            initandOpenHeader: X,
            navigate: a
          };
          o(h.event.nodes, h.event.nodes[0].id, Xe);
        }
      }, O = Array.isArray(I) ? I : ["0px", "0px", "0px", "0px"], z = Array.isArray($) ? $ : ["0px", "0px", "0px", "0px"], M = Array.isArray(g) ? g : ["0px", "0px", "0px", "0px"];
      return /* @__PURE__ */ Ri.jsx(
        Kr,
        {
          loading: !!B,
          onClick: te,
          style: {
            backgroundColor: `var(--background-color, ${x})`,
            border: w,
            borderRadius: `${M[0]} ${M[1]} ${M[2]} ${M[3]}`,
            margin: `${O[0]} ${O[1]} ${O[2]} ${O[3]}`,
            padding: `${z[0]} ${z[1]} ${z[2]} ${z[3]}`,
            color: `var(--text-color, ${v})`,
            textAlign: E,
            width: "100%",
            height: "100%",
            fontSize: L,
            fontWeight: P
          },
          children: T
        }
      );
    },
    manifest: pl(t)
  };
}
export {
  hl as Configuration,
  dl as ThemeMapping,
  xl as createComponent,
  fi as defaultProps
};
