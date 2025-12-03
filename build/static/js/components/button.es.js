var Ri = Object.defineProperty;
var Ai = (e, t, o) => t in e ? Ri(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var O = (e, t, o) => Ai(e, typeof t != "symbol" ? t + "" : t, o);
import * as v from "react";
import R, { isValidElement as zi, version as Ii, useInsertionEffect as Pi, useContext as Ce, useMemo as dt, createContext as Hi, useEffect as Me, useRef as pe, useLayoutEffect as _i, forwardRef as fn, useState as vo } from "react";
import Li from "react-dom";
var dn = { exports: {} }, wt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bi = R, ki = Symbol.for("react.element"), Oi = Symbol.for("react.fragment"), ji = Object.prototype.hasOwnProperty, Ni = Bi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Fi = { key: !0, ref: !0, __self: !0, __source: !0 };
function hn(e, t, o) {
  var r, n = {}, i = null, s = null;
  o !== void 0 && (i = "" + o), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t) ji.call(t, r) && !Fi.hasOwnProperty(r) && (n[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) n[r] === void 0 && (n[r] = t[r]);
  return { $$typeof: ki, type: e, key: i, ref: s, props: n, _owner: Ni.current };
}
wt.Fragment = Oi;
wt.jsx = hn;
wt.jsxs = hn;
dn.exports = wt;
var Di = dn.exports;
function St(e) {
  const t = v.useRef(e);
  return t.current = e, v.useCallback((...r) => {
    var n;
    return (n = t.current) == null ? void 0 : n.call(t, ...r);
  }, []);
}
function we() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
const Co = we() ? v.useLayoutEffect : v.useEffect, Wi = (e, t) => {
  const o = v.useRef(!0);
  Co(() => e(o.current), t), Co(() => (o.current = !1, () => {
    o.current = !0;
  }), []);
};
function dr(e) {
  const t = v.useRef(!1), [o, r] = v.useState(e);
  v.useEffect(() => (t.current = !1, () => {
    t.current = !0;
  }), []);
  function n(i, s) {
    s && t.current || r(i);
  }
  return [o, n];
}
var gn = { exports: {} }, L = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gr = Symbol.for("react.element"), Vr = Symbol.for("react.portal"), Tt = Symbol.for("react.fragment"), Et = Symbol.for("react.strict_mode"), Mt = Symbol.for("react.profiler"), Rt = Symbol.for("react.provider"), At = Symbol.for("react.context"), Gi = Symbol.for("react.server_context"), zt = Symbol.for("react.forward_ref"), It = Symbol.for("react.suspense"), Pt = Symbol.for("react.suspense_list"), Ht = Symbol.for("react.memo"), _t = Symbol.for("react.lazy"), Vi = Symbol.for("react.offscreen"), pn;
pn = Symbol.for("react.module.reference");
function J(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Gr:
        switch (e = e.type, e) {
          case Tt:
          case Mt:
          case Et:
          case It:
          case Pt:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case Gi:
              case At:
              case zt:
              case _t:
              case Ht:
              case Rt:
                return e;
              default:
                return t;
            }
        }
      case Vr:
        return t;
    }
  }
}
L.ContextConsumer = At;
L.ContextProvider = Rt;
L.Element = Gr;
L.ForwardRef = zt;
L.Fragment = Tt;
L.Lazy = _t;
L.Memo = Ht;
L.Portal = Vr;
L.Profiler = Mt;
L.StrictMode = Et;
L.Suspense = It;
L.SuspenseList = Pt;
L.isAsyncMode = function() {
  return !1;
};
L.isConcurrentMode = function() {
  return !1;
};
L.isContextConsumer = function(e) {
  return J(e) === At;
};
L.isContextProvider = function(e) {
  return J(e) === Rt;
};
L.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Gr;
};
L.isForwardRef = function(e) {
  return J(e) === zt;
};
L.isFragment = function(e) {
  return J(e) === Tt;
};
L.isLazy = function(e) {
  return J(e) === _t;
};
L.isMemo = function(e) {
  return J(e) === Ht;
};
L.isPortal = function(e) {
  return J(e) === Vr;
};
L.isProfiler = function(e) {
  return J(e) === Mt;
};
L.isStrictMode = function(e) {
  return J(e) === Et;
};
L.isSuspense = function(e) {
  return J(e) === It;
};
L.isSuspenseList = function(e) {
  return J(e) === Pt;
};
L.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Tt || e === Mt || e === Et || e === It || e === Pt || e === Vi || typeof e == "object" && e !== null && (e.$$typeof === _t || e.$$typeof === Ht || e.$$typeof === Rt || e.$$typeof === At || e.$$typeof === zt || e.$$typeof === pn || e.getModuleId !== void 0);
};
L.typeOf = J;
gn.exports = L;
var Yt = gn.exports;
function Xi(e, t, o) {
  const r = v.useRef({});
  return (!("value" in r.current) || o(r.current.condition, t)) && (r.current.value = e(), r.current.condition = t), r.current.value;
}
const Ui = Symbol.for("react.element"), qi = Symbol.for("react.transitional.element"), Qi = Symbol.for("react.fragment");
function mn(e) {
  return (
    // Base object type
    e && typeof e == "object" && // React Element type
    (e.$$typeof === Ui || e.$$typeof === qi) && // React Fragment type
    e.type === Qi
  );
}
const Ki = Number(Ii.split(".")[0]), Yi = (e, t) => {
  typeof e == "function" ? e(t) : typeof e == "object" && e && "current" in e && (e.current = t);
}, Xr = (...e) => {
  const t = e.filter(Boolean);
  return t.length <= 1 ? t[0] : (o) => {
    e.forEach((r) => {
      Yi(r, o);
    });
  };
}, Zi = (...e) => Xi(
  () => Xr(...e),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  e,
  (t, o) => t.length !== o.length || t.every((r, n) => r !== o[n])
), bn = (e) => {
  var o, r;
  if (!e)
    return !1;
  if (yn(e) && Ki >= 19)
    return !0;
  const t = Yt.isMemo(e) ? e.type.type : e.type;
  return !(typeof t == "function" && !((o = t.prototype) != null && o.render) && t.$$typeof !== Yt.ForwardRef || typeof e == "function" && !((r = e.prototype) != null && r.render) && e.$$typeof !== Yt.ForwardRef);
};
function yn(e) {
  return /* @__PURE__ */ zi(e) && !mn(e);
}
const Sn = (e) => {
  if (e && yn(e)) {
    const t = e;
    return t.props.propertyIsEnumerable("ref") ? t.props.ref : t.ref;
  }
  return null;
};
let hr = {};
const Ji = (e) => {
};
function es(e, t) {
}
function ts(e, t) {
}
function rs() {
  hr = {};
}
function xn(e, t, o) {
  !t && !hr[o] && (e(!1, o), hr[o] = !0);
}
function Lt(e, t) {
  xn(es, e, t);
}
function os(e, t) {
  xn(ts, e, t);
}
Lt.preMessage = Ji;
Lt.resetWarned = rs;
Lt.noteOnce = os;
function ns(e, t) {
  const o = Object.assign({}, e);
  return Array.isArray(t) && t.forEach((r) => {
    delete o[r];
  }), o;
}
function gr(e, t = {}) {
  let o = [];
  return R.Children.forEach(e, (r) => {
    r == null && !t.keepEmpty || (Array.isArray(r) ? o = o.concat(gr(r)) : mn(r) && r.props ? o = o.concat(gr(r.props.children, t)) : o.push(r));
  }), o;
}
function $o(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function is(e) {
  return e && typeof e == "object" && $o(e.nativeElement) ? e.nativeElement : $o(e) ? e : null;
}
function vn(e) {
  var t, o, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (o = vn(e[t])) && (r && (r += " "), r += o);
  } else for (o in e) e[o] && (r && (r += " "), r += o);
  return r;
}
function U() {
  for (var e, t, o = 0, r = "", n = arguments.length; o < n; o++) (e = arguments[o]) && (t = vn(e)) && (r && (r += " "), r += t);
  return r;
}
function pr(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, r = Array(t); o < t; o++) r[o] = e[o];
  return r;
}
function ss(e) {
  if (Array.isArray(e)) return pr(e);
}
function as(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Cn(e, t) {
  if (e) {
    if (typeof e == "string") return pr(e, t);
    var o = {}.toString.call(e).slice(8, -1);
    return o === "Object" && e.constructor && (o = e.constructor.name), o === "Map" || o === "Set" ? Array.from(e) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? pr(e, t) : void 0;
  }
}
function cs() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mr(e) {
  return ss(e) || as(e) || Cn(e) || cs();
}
let $n = (e) => +setTimeout(e, 16), wn = (e) => clearTimeout(e);
typeof window < "u" && "requestAnimationFrame" in window && ($n = (e) => window.requestAnimationFrame(e), wn = (e) => window.cancelAnimationFrame(e));
let wo = 0;
const Ur = /* @__PURE__ */ new Map();
function Tn(e) {
  Ur.delete(e);
}
const Ae = (e, t = 1) => {
  wo += 1;
  const o = wo;
  function r(n) {
    if (n === 0)
      Tn(o), e();
    else {
      const i = $n(() => {
        r(n - 1);
      });
      Ur.set(o, i);
    }
  }
  return r(t), o;
};
Ae.cancel = (e) => {
  const t = Ur.get(e);
  return Tn(e), wn(t);
};
const br = "ant", En = "anticon", ls = (e, t) => t || (e ? `${br}-${e}` : br), $e = /* @__PURE__ */ v.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: ls,
  iconPrefixCls: En
}), {
  Consumer: Pl
} = $e, To = {};
function us(e) {
  const t = v.useContext($e), {
    getPrefixCls: o,
    direction: r,
    getPopupContainer: n,
    renderEmpty: i
  } = t, s = t[e];
  return {
    classNames: To,
    styles: To,
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
function fs(e, t) {
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
const Eo = "data-rc-order", Mo = "data-rc-priority", ds = "rc-util-key", yr = /* @__PURE__ */ new Map();
function Mn({
  mark: e
} = {}) {
  return e ? e.startsWith("data-") ? e : `data-${e}` : ds;
}
function Bt(e) {
  return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function hs(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function qr(e) {
  return Array.from((yr.get(e) || e).children).filter((t) => t.tagName === "STYLE");
}
function Rn(e, t = {}) {
  if (!we())
    return null;
  const {
    csp: o,
    prepend: r,
    priority: n = 0
  } = t, i = hs(r), s = i === "prependQueue", a = document.createElement("style");
  a.setAttribute(Eo, i), s && n && a.setAttribute(Mo, `${n}`), o != null && o.nonce && (a.nonce = o == null ? void 0 : o.nonce), a.innerHTML = e;
  const c = Bt(t), {
    firstChild: u
  } = c;
  if (r) {
    if (s) {
      const l = (t.styles || qr(c)).filter((f) => {
        if (!["prepend", "prependQueue"].includes(f.getAttribute(Eo)))
          return !1;
        const d = Number(f.getAttribute(Mo) || 0);
        return n >= d;
      });
      if (l.length)
        return c.insertBefore(a, l[l.length - 1].nextSibling), a;
    }
    c.insertBefore(a, u);
  } else
    c.appendChild(a);
  return a;
}
function An(e, t = {}) {
  let {
    styles: o
  } = t;
  return o || (o = qr(Bt(t))), o.find((r) => r.getAttribute(Mn(t)) === e);
}
function zn(e, t = {}) {
  const o = An(e, t);
  o && Bt(t).removeChild(o);
}
function gs(e, t) {
  const o = yr.get(e);
  if (!o || !fs(document, o)) {
    const r = Rn("", t), {
      parentNode: n
    } = r;
    yr.set(e, n), e.removeChild(r);
  }
}
function Ne(e, t, o = {}) {
  var c, u, l;
  const r = Bt(o), n = qr(r), i = {
    ...o,
    styles: n
  };
  gs(r, i);
  const s = An(t, i);
  if (s)
    return (c = i.csp) != null && c.nonce && s.nonce !== ((u = i.csp) == null ? void 0 : u.nonce) && (s.nonce = (l = i.csp) == null ? void 0 : l.nonce), s.innerHTML !== e && (s.innerHTML = e), s;
  const a = Rn(e, i);
  return a.setAttribute(Mn(i), t), a;
}
const ps = "%";
function Sr(e) {
  return e.join(ps);
}
let Ro = 0;
class ms {
  constructor(t) {
    O(this, "instanceId");
    /** @private Internal cache map. Do not access this directly */
    O(this, "cache", /* @__PURE__ */ new Map());
    /** @private Record update times for each key */
    O(this, "updateTimes", /* @__PURE__ */ new Map());
    O(this, "extracted", /* @__PURE__ */ new Set());
    this.instanceId = t;
  }
  get(t) {
    return this.opGet(Sr(t));
  }
  /** A fast get cache with `get` concat. */
  opGet(t) {
    return this.cache.get(t) || null;
  }
  update(t, o) {
    return this.opUpdate(Sr(t), o);
  }
  /** A fast get cache with `get` concat. */
  opUpdate(t, o) {
    const r = this.cache.get(t), n = o(r);
    n === null ? (this.cache.delete(t), this.updateTimes.delete(t)) : (this.cache.set(t, n), this.updateTimes.set(t, Ro), Ro += 1);
  }
}
const Qr = "data-token-hash", me = "data-css-hash", xe = "__cssinjs_instance__";
function bs() {
  const e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    const t = document.body.querySelectorAll(`style[${me}]`) || [], {
      firstChild: o
    } = document.head;
    Array.from(t).forEach((n) => {
      n[xe] = n[xe] || e, n[xe] === e && document.head.insertBefore(n, o);
    });
    const r = {};
    Array.from(document.querySelectorAll(`style[${me}]`)).forEach((n) => {
      var s;
      const i = n.getAttribute(me);
      r[i] ? n[xe] === e && ((s = n.parentNode) == null || s.removeChild(n)) : r[i] = !0;
    });
  }
  return new ms(e);
}
const kt = /* @__PURE__ */ v.createContext({
  hashPriority: "low",
  cache: bs(),
  defaultCache: !0,
  autoPrefix: !1
});
function ys(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let o = 0; o < e.length; o++)
    if (e[o] !== t[o])
      return !1;
  return !0;
}
const Oe = class Oe {
  constructor() {
    O(this, "cache");
    O(this, "keys");
    O(this, "cacheCallTimes");
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
      return this.keys = this.keys.filter((o) => !ys(o, t)), this.deleteByPath(this.cache, t);
  }
};
O(Oe, "MAX_CACHE_SIZE", 20), O(Oe, "MAX_CACHE_OFFSET", 5);
let xr = Oe, Ao = 0;
class In {
  constructor(t) {
    O(this, "derivatives");
    O(this, "id");
    this.derivatives = Array.isArray(t) ? t : [t], this.id = Ao, t.length === 0 && (t.length > 0, void 0), Ao += 1;
  }
  getDerivativeToken(t) {
    return this.derivatives.reduce((o, r) => r(t, o), void 0);
  }
}
const Zt = new xr();
function Ss(e) {
  const t = Array.isArray(e) ? e : [e];
  return Zt.has(t) || Zt.set(t, new In(t)), Zt.get(t);
}
const xs = /* @__PURE__ */ new WeakMap(), Jt = {};
function vs(e, t) {
  let o = xs;
  for (let r = 0; r < t.length; r += 1) {
    const n = t[r];
    o.has(n) || o.set(n, /* @__PURE__ */ new WeakMap()), o = o.get(n);
  }
  return o.has(Jt) || o.set(Jt, e()), o.get(Jt);
}
const zo = /* @__PURE__ */ new WeakMap();
function Ze(e) {
  let t = zo.get(e) || "";
  return t || (Object.keys(e).forEach((o) => {
    const r = e[o];
    t += o, r instanceof In ? t += r.id : r && typeof r == "object" ? t += Ze(r) : t += r;
  }), t = je(t), zo.set(e, t)), t;
}
function Cs(e, t) {
  return je(`${t}_${Ze(e)}`);
}
const vr = we();
function Fe(e) {
  return typeof e == "number" ? `${e}px` : e;
}
function $s(e) {
  const {
    hashCls: t,
    hashPriority: o = "low"
  } = e || {};
  if (!t)
    return "";
  const r = `.${t}`;
  return o === "low" ? `:where(${r})` : r;
}
const ht = (e, t = "") => `--${t ? `${t}-` : ""}${e}`.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase(), ws = (e, t, o) => {
  const {
    hashCls: r,
    hashPriority: n = "low"
  } = o || {};
  return Object.keys(e).length ? `${$s({
    hashCls: r,
    hashPriority: n
  })}.${t}${o != null && o.scope ? `.${o.scope}` : ""}{${Object.entries(e).map(([i, s]) => `${i}:${s};`).join("")}}` : "";
}, Pn = (e, t, o) => {
  const {
    hashCls: r,
    hashPriority: n = "low",
    prefix: i,
    unitless: s,
    ignore: a,
    preserve: c
  } = o || {}, u = {}, l = {};
  return Object.entries(e).forEach(([f, d]) => {
    if (c != null && c[f])
      l[f] = d;
    else if ((typeof d == "string" || typeof d == "number") && !(a != null && a[f])) {
      const p = ht(f, i);
      u[p] = typeof d == "number" && !(s != null && s[f]) ? `${d}px` : String(d), l[f] = `var(${p})`;
    }
  }), [l, ws(u, t, {
    scope: o == null ? void 0 : o.scope,
    hashCls: r,
    hashPriority: n
  })];
}, st = /* @__PURE__ */ new Map();
function Kr(e, t, o, r, n) {
  const {
    cache: i
  } = v.useContext(kt), s = [e, ...t], a = Sr(s), c = (f) => {
    i.opUpdate(a, (d) => {
      const [p = 0, y] = d || [void 0, void 0], $ = y || o(), m = [p, $];
      return f ? f(m) : m;
    });
  };
  v.useMemo(
    () => {
      c();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [a]
    /* eslint-enable */
  );
  const l = i.opGet(a)[1];
  return Pi(() => (c(([f, d]) => [f + 1, d]), st.has(a) || (n == null || n(l), st.set(a, !0), Promise.resolve().then(() => {
    st.delete(a);
  })), () => {
    i.opUpdate(a, (f) => {
      const [d = 0, p] = f || [];
      return d - 1 === 0 ? (r == null || r(p, !1), st.delete(a), null) : [d - 1, p];
    });
  }), [a]), l;
}
const Ts = {}, Es = "css", Ee = /* @__PURE__ */ new Map();
function Ms(e) {
  Ee.set(e, (Ee.get(e) || 0) + 1);
}
function Rs(e, t) {
  typeof document < "u" && document.querySelectorAll(`style[${Qr}="${e}"]`).forEach((r) => {
    var n;
    r[xe] === t && ((n = r.parentNode) == null || n.removeChild(r));
  });
}
const As = -1;
function zs(e, t) {
  Ee.set(e, (Ee.get(e) || 0) - 1);
  const o = /* @__PURE__ */ new Set();
  Ee.forEach((r, n) => {
    r <= 0 && o.add(n);
  }), Ee.size - o.size > As && o.forEach((r) => {
    Rs(r, t), Ee.delete(r);
  });
}
const Is = (e, t, o, r) => {
  let i = {
    ...o.getDerivativeToken(e),
    ...t
  };
  return r && (i = r(i)), i;
}, Ps = "token";
function Hs(e, t, o) {
  const {
    cache: {
      instanceId: r
    },
    container: n,
    hashPriority: i
  } = Ce(kt), {
    salt: s = "",
    override: a = Ts,
    formatToken: c,
    getComputedToken: u,
    cssVar: l
  } = o, f = vs(() => Object.assign({}, ...t), t), d = Ze(f), p = Ze(a), y = Ze(l);
  return Kr(Ps, [s, e.id, d, p, y], () => {
    const $ = u ? u(f, a, e) : Is(f, a, e, c), m = {
      ...$
    }, g = `${s}_${l.prefix}`, T = je(g), S = `${Es}-${je(g)}`;
    m._tokenKey = Cs(m, g);
    const [C, w] = Pn($, l.key, {
      prefix: l.prefix,
      ignore: l.ignore,
      unitless: l.unitless,
      preserve: l.preserve,
      hashPriority: i,
      hashCls: l.hashed ? S : void 0
    });
    return C._hashId = T, Ms(l.key), [C, S, m, w, l.key];
  }, ([, , , , $]) => {
    zs($, r);
  }, ([, , , $, m]) => {
    if (!$)
      return;
    const g = Ne($, je(`css-var-${m}`), {
      mark: me,
      prepend: "queue",
      attachTo: n,
      priority: -999
    });
    g[xe] = r, g.setAttribute(Qr, m);
  });
}
var _s = {
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
}, k = "-ms-", Je = "-moz-", P = "-webkit-", Hn = "comm", Yr = "rule", Zr = "decl", Ls = "@import", Bs = "@namespace", _n = "@keyframes", ks = "@layer", Ln = Math.abs, Jr = String.fromCharCode, Cr = Object.assign;
function Os(e, t) {
  return D(e, 0) ^ 45 ? (((t << 2 ^ D(e, 0)) << 2 ^ D(e, 1)) << 2 ^ D(e, 2)) << 2 ^ D(e, 3) : 0;
}
function Bn(e) {
  return e.trim();
}
function he(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function M(e, t, o) {
  return e.replace(t, o);
}
function gt(e, t, o) {
  return e.indexOf(t, o);
}
function D(e, t) {
  return e.charCodeAt(t) | 0;
}
function ze(e, t, o) {
  return e.slice(t, o);
}
function ne(e) {
  return e.length;
}
function kn(e) {
  return e.length;
}
function Ke(e, t) {
  return t.push(e), e;
}
function js(e, t) {
  return e.map(t).join("");
}
function Io(e, t) {
  return e.filter(function(o) {
    return !he(o, t);
  });
}
var Ot = 1, De = 1, On = 0, Z = 0, j = 0, We = "";
function jt(e, t, o, r, n, i, s, a) {
  return { value: e, root: t, parent: o, type: r, props: n, children: i, line: Ot, column: De, length: s, return: "", siblings: a };
}
function Se(e, t) {
  return Cr(jt("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function He(e) {
  for (; e.root; )
    e = Se(e.root, { children: [e] });
  Ke(e, e.siblings);
}
function Ns() {
  return j;
}
function Fs() {
  return j = Z > 0 ? D(We, --Z) : 0, De--, j === 10 && (De = 1, Ot--), j;
}
function se() {
  return j = Z < On ? D(We, Z++) : 0, De++, j === 10 && (De = 1, Ot++), j;
}
function ve() {
  return D(We, Z);
}
function pt() {
  return Z;
}
function Nt(e, t) {
  return ze(We, e, t);
}
function tt(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Ds(e) {
  return Ot = De = 1, On = ne(We = e), Z = 0, [];
}
function Ws(e) {
  return We = "", e;
}
function er(e) {
  return Bn(Nt(Z - 1, $r(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Gs(e) {
  for (; (j = ve()) && j < 33; )
    se();
  return tt(e) > 2 || tt(j) > 3 ? "" : " ";
}
function Vs(e, t) {
  for (; --t && se() && !(j < 48 || j > 102 || j > 57 && j < 65 || j > 70 && j < 97); )
    ;
  return Nt(e, pt() + (t < 6 && ve() == 32 && se() == 32));
}
function $r(e) {
  for (; se(); )
    switch (j) {
      case e:
        return Z;
      case 34:
      case 39:
        e !== 34 && e !== 39 && $r(j);
        break;
      case 40:
        e === 41 && $r(e);
        break;
      case 92:
        se();
        break;
    }
  return Z;
}
function Xs(e, t) {
  for (; se() && e + j !== 57; )
    if (e + j === 84 && ve() === 47)
      break;
  return "/*" + Nt(t, Z - 1) + "*" + Jr(e === 47 ? e : se());
}
function Us(e) {
  for (; !tt(ve()); )
    se();
  return Nt(e, Z);
}
function Po(e) {
  return Ws(mt("", null, null, null, [""], e = Ds(e), 0, [0], e));
}
function mt(e, t, o, r, n, i, s, a, c) {
  for (var u = 0, l = 0, f = s, d = 0, p = 0, y = 0, b = 1, $ = 1, m = 1, g = 0, T = "", S = n, C = i, w = r, h = T; $; )
    switch (y = g, g = se()) {
      case 40:
        if (y != 108 && D(h, f - 1) == 58) {
          gt(h += M(er(g), "&", "&\f"), "&\f", Ln(u ? a[u - 1] : 0)) != -1 && (m = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        h += er(g);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        h += Gs(y);
        break;
      case 92:
        h += Vs(pt() - 1, 7);
        continue;
      case 47:
        switch (ve()) {
          case 42:
          case 47:
            Ke(qs(Xs(se(), pt()), t, o, c), c), (tt(y || 1) == 5 || tt(ve() || 1) == 5) && ne(h) && ze(h, -1, void 0) !== " " && (h += " ");
            break;
          default:
            h += "/";
        }
        break;
      case 123 * b:
        a[u++] = ne(h) * m;
      case 125 * b:
      case 59:
      case 0:
        switch (g) {
          case 0:
          case 125:
            $ = 0;
          case 59 + l:
            m == -1 && (h = M(h, /\f/g, "")), p > 0 && (ne(h) - f || b === 0 && y === 47) && Ke(p > 32 ? _o(h + ";", r, o, f - 1, c) : _o(M(h, " ", "") + ";", r, o, f - 2, c), c);
            break;
          case 59:
            h += ";";
          default:
            if (Ke(w = Ho(h, t, o, u, l, n, a, T, S = [], C = [], f, i), i), g === 123)
              if (l === 0)
                mt(h, t, w, w, S, i, f, a, C);
              else {
                switch (d) {
                  case 99:
                    if (D(h, 3) === 110) break;
                  case 108:
                    if (D(h, 2) === 97) break;
                  default:
                    l = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                l ? mt(e, w, w, r && Ke(Ho(e, w, w, 0, 0, n, a, T, n, S = [], f, C), C), n, C, f, a, r ? S : C) : mt(h, w, w, w, [""], C, 0, a, C);
              }
        }
        u = l = p = 0, b = m = 1, T = h = "", f = s;
        break;
      case 58:
        f = 1 + ne(h), p = y;
      default:
        if (b < 1) {
          if (g == 123)
            --b;
          else if (g == 125 && b++ == 0 && Fs() == 125)
            continue;
        }
        switch (h += Jr(g), g * b) {
          case 38:
            m = l > 0 ? 1 : (h += "\f", -1);
            break;
          case 44:
            a[u++] = (ne(h) - 1) * m, m = 1;
            break;
          case 64:
            ve() === 45 && (h += er(se())), d = ve(), l = f = ne(T = h += Us(pt())), g++;
            break;
          case 45:
            y === 45 && ne(h) == 2 && (b = 0);
        }
    }
  return i;
}
function Ho(e, t, o, r, n, i, s, a, c, u, l, f) {
  for (var d = n - 1, p = n === 0 ? i : [""], y = kn(p), b = 0, $ = 0, m = 0; b < r; ++b)
    for (var g = 0, T = ze(e, d + 1, d = Ln($ = s[b])), S = e; g < y; ++g)
      (S = Bn($ > 0 ? p[g] + " " + T : M(T, /&\f/g, p[g]))) && (c[m++] = S);
  return jt(e, t, o, n === 0 ? Yr : a, c, u, l, f);
}
function qs(e, t, o, r) {
  return jt(e, t, o, Hn, Jr(Ns()), ze(e, 2, -2), 0, r);
}
function _o(e, t, o, r, n) {
  return jt(e, t, o, Zr, ze(e, 0, r), ze(e, r + 1, -1), r, n);
}
function jn(e, t, o) {
  switch (Os(e, t)) {
    case 5103:
      return P + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return P + e + e;
    case 4855:
      return P + e.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + e;
    case 4789:
      return Je + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return P + e + Je + e + k + e + e;
    case 5936:
      switch (D(e, t + 11)) {
        case 114:
          return P + e + k + M(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return P + e + k + M(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return P + e + k + M(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    case 6828:
    case 4268:
    case 2903:
      return P + e + k + e + e;
    case 6165:
      return P + e + k + "flex-" + e + e;
    case 5187:
      return P + e + M(e, /(\w+).+(:[^]+)/, P + "box-$1$2" + k + "flex-$1$2") + e;
    case 5443:
      return P + e + k + "flex-item-" + M(e, /flex-|-self/g, "") + (he(e, /flex-|baseline/) ? "" : k + "grid-row-" + M(e, /flex-|-self/g, "")) + e;
    case 4675:
      return P + e + k + "flex-line-pack" + M(e, /align-content|flex-|-self/g, "") + e;
    case 5548:
      return P + e + k + M(e, "shrink", "negative") + e;
    case 5292:
      return P + e + k + M(e, "basis", "preferred-size") + e;
    case 6060:
      return P + "box-" + M(e, "-grow", "") + P + e + k + M(e, "grow", "positive") + e;
    case 4554:
      return P + M(e, /([^-])(transform)/g, "$1" + P + "$2") + e;
    case 6187:
      return M(M(M(e, /(zoom-|grab)/, P + "$1"), /(image-set)/, P + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return M(e, /(image-set\([^]*)/, P + "$1$`$1");
    case 4968:
      return M(M(e, /(.+:)(flex-)?(.*)/, P + "box-pack:$3" + k + "flex-pack:$3"), /space-between/, "justify") + P + e + e;
    case 4200:
      if (!he(e, /flex-|baseline/)) return k + "grid-column-align" + ze(e, t) + e;
      break;
    case 2592:
    case 3360:
      return k + M(e, "template-", "") + e;
    case 4384:
    case 3616:
      return o && o.some(function(r, n) {
        return t = n, he(r.props, /grid-\w+-end/);
      }) ? ~gt(e + (o = o[t].value), "span", 0) ? e : k + M(e, "-start", "") + e + k + "grid-row-span:" + (~gt(o, "span", 0) ? he(o, /\d+/) : +he(o, /\d+/) - +he(e, /\d+/)) + ";" : k + M(e, "-start", "") + e;
    case 4896:
    case 4128:
      return o && o.some(function(r) {
        return he(r.props, /grid-\w+-start/);
      }) ? e : k + M(M(e, "-end", "-span"), "span ", "") + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return M(e, /(.+)-inline(.+)/, P + "$1$2") + e;
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
      if (ne(e) - 1 - t > 6)
        switch (D(e, t + 1)) {
          case 109:
            if (D(e, t + 4) !== 45)
              break;
          case 102:
            return M(e, /(.+:)(.+)-([^]+)/, "$1" + P + "$2-$3$1" + Je + (D(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~gt(e, "stretch", 0) ? jn(M(e, "stretch", "fill-available"), t, o) + e : e;
        }
      break;
    case 5152:
    case 5920:
      return M(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r, n, i, s, a, c, u) {
        return k + n + ":" + i + u + (s ? k + n + "-span:" + (a ? c : +c - +i) + u : "") + e;
      });
    case 4949:
      if (D(e, t + 6) === 121)
        return M(e, ":", ":" + P) + e;
      break;
    case 6444:
      switch (D(e, D(e, 14) === 45 ? 18 : 11)) {
        case 120:
          return M(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + P + (D(e, 14) === 45 ? "inline-" : "") + "box$3$1" + P + "$2$3$1" + k + "$2box$3") + e;
        case 100:
          return M(e, ":", ":" + k) + e;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return M(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function rt(e, t) {
  for (var o = "", r = 0; r < e.length; r++)
    o += t(e[r], r, e, t) || "";
  return o;
}
function Lo(e, t, o, r) {
  switch (e.type) {
    case ks:
      if (e.children.length) break;
    case Ls:
    case Bs:
    case Zr:
      return e.return = e.return || e.value;
    case Hn:
      return "";
    case _n:
      return e.return = e.value + "{" + rt(e.children, r) + "}";
    case Yr:
      if (!ne(e.value = e.props.join(","))) return "";
  }
  return ne(o = rt(e.children, r)) ? e.return = e.value + "{" + o + "}" : "";
}
function Qs(e) {
  var t = kn(e);
  return function(o, r, n, i) {
    for (var s = "", a = 0; a < t; a++)
      s += e[a](o, r, n, i) || "";
    return s;
  };
}
function Ks(e, t, o, r) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case Zr:
        e.return = jn(e.value, e.length, o);
        return;
      case _n:
        return rt([Se(e, { value: M(e.value, "@", "@" + P) })], r);
      case Yr:
        if (e.length)
          return js(o = e.props, function(n) {
            switch (he(n, r = /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                He(Se(e, { props: [M(n, /:(read-\w+)/, ":" + Je + "$1")] })), He(Se(e, { props: [n] })), Cr(e, { props: Io(o, r) });
                break;
              case "::placeholder":
                He(Se(e, { props: [M(n, /:(plac\w+)/, ":" + P + "input-$1")] })), He(Se(e, { props: [M(n, /:(plac\w+)/, ":" + Je + "$1")] })), He(Se(e, { props: [M(n, /:(plac\w+)/, k + "input-$1")] })), He(Se(e, { props: [n] })), Cr(e, { props: Io(o, r) });
                break;
            }
            return "";
          });
    }
}
const Bo = "data-ant-cssinjs-cache-path", Nn = "_FILE_STYLE__";
let Re, Fn = !0;
function Ys() {
  var e;
  if (!Re && (Re = {}, we())) {
    const t = document.createElement("div");
    t.className = Bo, t.style.position = "fixed", t.style.visibility = "hidden", t.style.top = "-9999px", document.body.appendChild(t);
    let o = getComputedStyle(t).content || "";
    o = o.replace(/^"/, "").replace(/"$/, ""), o.split(";").forEach((n) => {
      const [i, s] = n.split(":");
      Re[i] = s;
    });
    const r = document.querySelector(`style[${Bo}]`);
    r && (Fn = !1, (e = r.parentNode) == null || e.removeChild(r)), document.body.removeChild(t);
  }
}
function Zs(e) {
  return Ys(), !!Re[e];
}
function Js(e) {
  const t = Re[e];
  let o = null;
  if (t && we())
    if (Fn)
      o = Nn;
    else {
      const r = document.querySelector(`style[${me}="${Re[e]}"]`);
      r ? o = r.innerHTML : delete Re[e];
    }
  return [o, t];
}
const ea = "_skip_check_", Dn = "_multi_value_";
function tr(e, t) {
  return (t ? rt(Po(e), Qs([Ks, Lo])) : rt(Po(e), Lo)).replace(/\{%%%\:[^;];}/g, ";");
}
function ta(e) {
  return typeof e == "object" && e && (ea in e || Dn in e);
}
function ko(e, t, o) {
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
const wr = (e, t = {}, {
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
  let f = "", d = {};
  function p($) {
    const m = $.getName(i);
    if (!d[m]) {
      const [g] = wr($.style, t, {
        root: !1,
        parentSelectors: n
      });
      d[m] = `@keyframes ${$.getName(i)}${g}`;
    }
  }
  function y($, m = []) {
    return $.forEach((g) => {
      Array.isArray(g) ? y(g, m) : g && m.push(g);
    }), m;
  }
  return y(Array.isArray(e) ? e : [e]).forEach(($) => {
    const m = typeof $ == "string" && !o ? {} : $;
    if (typeof m == "string")
      f += `${m}
`;
    else if (m._keyframe)
      p(m);
    else {
      const g = u.reduce((T, S) => {
        var C;
        return ((C = S == null ? void 0 : S.visit) == null ? void 0 : C.call(S, T)) || T;
      }, m);
      Object.keys(g).forEach((T) => {
        const S = g[T];
        if (typeof S == "object" && S && (T !== "animationName" || !S._keyframe) && !ta(S)) {
          let C = !1, w = T.trim(), h = !1;
          (o || r) && i ? w.startsWith("@") ? C = !0 : w === "&" ? w = ko("", i, c) : w = ko(T, i, c) : o && !i && (w === "&" || w === "") && (w = "", h = !0);
          const [x, H] = wr(S, t, {
            root: h,
            injectHash: C,
            parentSelectors: [...n, w]
          });
          d = {
            ...d,
            ...H
          }, f += `${w}${x}`;
        } else {
          let C = function(h, x) {
            const H = h.replace(/[A-Z]/g, (I) => `-${I.toLowerCase()}`);
            let E = x;
            !_s[h] && typeof E == "number" && E !== 0 && (E = `${E}px`), h === "animationName" && (x != null && x._keyframe) && (p(x), E = x.getName(i)), f += `${H}:${E};`;
          };
          const w = (S == null ? void 0 : S.value) ?? S;
          typeof S == "object" && (S != null && S[Dn]) && Array.isArray(w) ? w.forEach((h) => {
            C(T, h);
          }) : C(T, w);
        }
      });
    }
  }), o ? s && (f && (f = `@layer ${s.name} {${f}}`), s.dependencies && (d[`@layer ${s.name}`] = s.dependencies.map(($) => `@layer ${$}, ${s.name};`).join(`
`))) : f = `{${f}}`, [f, d];
};
function Wn(e, t) {
  return je(`${e.join("%")}${t}`);
}
const ra = "style";
function Oo(e, t) {
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
    linters: d,
    cache: p,
    layer: y,
    autoPrefix: b
  } = v.useContext(kt), $ = [r || ""];
  y && $.push("layer"), $.push(...o);
  let m = vr;
  Kr(
    ra,
    $,
    // Create cache if needed
    () => {
      const g = $.join("|");
      if (Zs(g)) {
        const [x, H] = Js(g);
        if (x)
          return [x, H, {}, s, a];
      }
      const T = t(), [S, C] = wr(T, {
        hashId: r,
        hashPriority: u,
        layer: y ? n : void 0,
        path: o.join("-"),
        transformers: f,
        linters: d
      }), w = tr(S, b || !1), h = Wn($, w);
      return [w, h, C, s, a];
    },
    // Remove cache if no need
    (g, T) => {
      const [, S] = g;
      T && vr && zn(S, {
        mark: me,
        attachTo: l
      });
    },
    // Effect: Inject style here
    (g) => {
      const [T, S, C, , w] = g;
      if (m && T !== Nn) {
        const h = {
          mark: me,
          prepend: y ? !1 : "queue",
          attachTo: l,
          priority: w
        }, x = typeof i == "function" ? i() : i;
        x && (h.csp = {
          nonce: x
        });
        const H = [], E = [];
        Object.keys(C).forEach((A) => {
          A.startsWith("@layer") ? H.push(A) : E.push(A);
        }), H.forEach((A) => {
          Ne(tr(C[A], b || !1), `_layer-${A}`, {
            ...h,
            prepend: !0
          });
        });
        const I = Ne(T, S, h);
        I[xe] = p.instanceId, E.forEach((A) => {
          Ne(tr(C[A], b || !1), `_effect-${A}`, h);
        });
      }
    }
  );
}
const oa = "cssVar", na = (e, t) => {
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
  } = Ce(kt), {
    _tokenKey: d
  } = s, p = [...e.path, o, c, d];
  return Kr(oa, p, () => {
    const b = t(), [$, m] = Pn(b, o, {
      prefix: r,
      unitless: n,
      ignore: i,
      scope: c,
      hashPriority: f,
      hashCls: a
    }), g = Wn(p, m);
    return [$, m, g, o];
  }, ([, , b]) => {
    vr && zn(b, {
      mark: me,
      attachTo: l
    });
  }, ([, b, $]) => {
    if (!b)
      return;
    const m = Ne(b, $, {
      mark: me,
      prepend: "queue",
      attachTo: l,
      priority: -999
    });
    m[xe] = u, m.setAttribute(Qr, o);
  });
};
function _e(e) {
  return e.notSplit = !0, e;
}
_e(["borderTop", "borderBottom"]), _e(["borderTop"]), _e(["borderBottom"]), _e(["borderLeft", "borderRight"]), _e(["borderLeft"]), _e(["borderRight"]);
function ae(e) {
  "@babel/helpers - typeof";
  return ae = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ae(e);
}
function ia(e) {
  if (Array.isArray(e)) return e;
}
function sa(e, t) {
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
function aa() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gn(e, t) {
  return ia(e) || sa(e, t) || Cn(e, t) || aa();
}
function ca(e, t) {
  if (ae(e) != "object" || !e) return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var r = o.call(e, t);
    if (ae(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Vn(e) {
  var t = ca(e, "string");
  return ae(t) == "symbol" ? t : t + "";
}
function ue(e, t, o) {
  return (t = Vn(t)) in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}
function jo(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), o.push.apply(o, r);
  }
  return o;
}
function X(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jo(Object(o), !0).forEach(function(r) {
      ue(e, r, o[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : jo(Object(o)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(o, r));
    });
  }
  return e;
}
function Ft(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function la(e, t) {
  for (var o = 0; o < t.length; o++) {
    var r = t[o];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Vn(r.key), r);
  }
}
function Dt(e, t, o) {
  return t && la(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function bt(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Tr(e, t) {
  return Tr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, Tr(e, t);
}
function ua(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Tr(e, t);
}
function xt(e) {
  return xt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, xt(e);
}
function Xn() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Xn = function() {
    return !!e;
  })();
}
function fa(e, t) {
  if (t && (ae(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return bt(e);
}
function da(e) {
  var t = Xn();
  return function() {
    var o, r = xt(e);
    if (t) {
      var n = xt(this).constructor;
      o = Reflect.construct(r, arguments, n);
    } else o = r.apply(this, arguments);
    return fa(this, o);
  };
}
var ha = /* @__PURE__ */ Dt(function e() {
  Ft(this, e);
}), Un = "CALC_UNIT", ga = new RegExp(Un, "g");
function rr(e) {
  return typeof e == "number" ? "".concat(e).concat(Un) : e;
}
var pa = /* @__PURE__ */ function(e) {
  ua(o, e);
  var t = da(o);
  function o(r, n) {
    var i;
    Ft(this, o), i = t.call(this), ue(bt(i), "result", ""), ue(bt(i), "unitlessCssVar", void 0), ue(bt(i), "lowPriority", void 0);
    var s = ae(r);
    return i.unitlessCssVar = n, r instanceof o ? i.result = "(".concat(r.result, ")") : s === "number" ? i.result = rr(r) : s === "string" && (i.result = r), i;
  }
  return Dt(o, [{
    key: "add",
    value: function(n) {
      return n instanceof o ? this.result = "".concat(this.result, " + ").concat(n.getResult()) : (typeof n == "number" || typeof n == "string") && (this.result = "".concat(this.result, " + ").concat(rr(n))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(n) {
      return n instanceof o ? this.result = "".concat(this.result, " - ").concat(n.getResult()) : (typeof n == "number" || typeof n == "string") && (this.result = "".concat(this.result, " - ").concat(rr(n))), this.lowPriority = !0, this;
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
      }) && (c = !1), this.result = this.result.replace(ga, c ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), o;
}(ha), ma = function(t, o) {
  var r = pa;
  return function(n) {
    return new r(n, o);
  };
}, No = function(t, o) {
  return "".concat([o, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function Fo(e, t, o, r) {
  var n = X({}, t[e]);
  if (r != null && r.deprecatedTokens) {
    var i = r.deprecatedTokens;
    i.forEach(function(a) {
      var c = Gn(a, 2), u = c[0], l = c[1];
      if (n != null && n[u] || n != null && n[l]) {
        var f;
        (f = n[l]) !== null && f !== void 0 || (n[l] = n == null ? void 0 : n[u]);
      }
    });
  }
  var s = X(X({}, o), n);
  return Object.keys(s).forEach(function(a) {
    s[a] === t[a] && delete s[a];
  }), s;
}
var qn = typeof CSSINJS_STATISTIC < "u", Er = !0;
function Ge() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (!qn)
    return Object.assign.apply(Object, [{}].concat(t));
  Er = !1;
  var r = {};
  return t.forEach(function(n) {
    if (ae(n) === "object") {
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
  }), Er = !0, r;
}
var Do = {};
function ba() {
}
var ya = function(t) {
  var o, r = t, n = ba;
  return qn && typeof Proxy < "u" && (o = /* @__PURE__ */ new Set(), r = new Proxy(t, {
    get: function(s, a) {
      if (Er) {
        var c;
        (c = o) === null || c === void 0 || c.add(a);
      }
      return s[a];
    }
  }), n = function(s, a) {
    var c;
    Do[s] = {
      global: Array.from(o),
      component: X(X({}, (c = Do[s]) === null || c === void 0 ? void 0 : c.component), a)
    };
  }), {
    token: r,
    keys: o,
    flush: n
  };
};
function Wo(e, t, o) {
  if (typeof o == "function") {
    var r;
    return o(Ge(t, (r = t[e]) !== null && r !== void 0 ? r : {}));
  }
  return o ?? {};
}
function Sa(e) {
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
var xa = 1e3 * 60 * 10, va = /* @__PURE__ */ function() {
  function e() {
    Ft(this, e), ue(this, "map", /* @__PURE__ */ new Map()), ue(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), ue(this, "nextID", 0), ue(this, "lastAccessBeat", /* @__PURE__ */ new Map()), ue(this, "accessBeat", 0);
  }
  return Dt(e, [{
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
        return i && ae(i) === "object" ? "obj_".concat(r.getObjectID(i)) : "".concat(ae(i), "_").concat(i);
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
          r - n > xa && (o.map.delete(i), o.lastAccessBeat.delete(i));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
}(), Go = new va();
function Ca(e, t) {
  return R.useMemo(function() {
    var o = Go.get(t);
    if (o)
      return o;
    var r = e();
    return Go.set(t, r), r;
  }, t);
}
var $a = function() {
  return {};
};
function wa(e) {
  var t = e.useCSP, o = t === void 0 ? $a : t, r = e.useToken, n = e.usePrefix, i = e.getResetStyles, s = e.getCommonStyle, a = e.getCompUnitless;
  function c(d, p, y, b) {
    var $ = Array.isArray(d) ? d[0] : d;
    function m(x) {
      return "".concat(String($)).concat(x.slice(0, 1).toUpperCase()).concat(x.slice(1));
    }
    var g = (b == null ? void 0 : b.unitless) || {}, T = typeof a == "function" ? a(d) : {}, S = X(X({}, T), {}, ue({}, m("zIndexPopup"), !0));
    Object.keys(g).forEach(function(x) {
      S[m(x)] = g[x];
    });
    var C = X(X({}, b), {}, {
      unitless: S,
      prefixToken: m
    }), w = l(d, p, y, C), h = u($, y, C);
    return function(x) {
      var H = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x, E = w(x, H), I = h(H);
      return [E, I];
    };
  }
  function u(d, p, y) {
    var b = y.unitless, $ = y.prefixToken, m = y.ignore;
    return function(g) {
      var T = r(), S = T.cssVar, C = T.realToken;
      return na({
        path: [d],
        prefix: S.prefix,
        key: S.key,
        unitless: b,
        ignore: m,
        token: C,
        scope: g
      }, function() {
        var w = Wo(d, C, p), h = Fo(d, C, w, {
          deprecatedTokens: y == null ? void 0 : y.deprecatedTokens
        });
        return w && Object.keys(w).forEach(function(x) {
          h[$(x)] = h[x], delete h[x];
        }), h;
      }), S == null ? void 0 : S.key;
    };
  }
  function l(d, p, y) {
    var b = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, $ = Array.isArray(d) ? d : [d, d], m = Gn($, 1), g = m[0], T = $.join("-"), S = e.layer || {
      name: "antd"
    };
    return function(C) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : C, h = r(), x = h.theme, H = h.realToken, E = h.hashId, I = h.token, A = h.cssVar, _ = h.zeroRuntime, V = dt(function() {
        return _;
      }, []);
      if (V)
        return E;
      var q = n(), ee = q.rootPrefixCls, te = q.iconPrefixCls, re = o(), be = "css", oe = Ca(function() {
        var Q = /* @__PURE__ */ new Set();
        return Object.keys(b.unitless || {}).forEach(function(ce) {
          Q.add(ht(ce, A.prefix)), Q.add(ht(ce, No(g, A.prefix)));
        }), ma(be, Q);
      }, [be, g, A == null ? void 0 : A.prefix]), Ie = Sa(), K = Ie.max, Xe = Ie.min, Te = {
        theme: x,
        token: I,
        hashId: E,
        nonce: function() {
          return re.nonce;
        },
        clientOnly: b.clientOnly,
        layer: S,
        // antd is always at top of styles
        order: b.order || -999
      };
      return typeof i == "function" && Oo(X(X({}, Te), {}, {
        clientOnly: !1,
        path: ["Shared", ee]
      }), function() {
        return i(I, {
          prefix: {
            rootPrefixCls: ee,
            iconPrefixCls: te
          },
          csp: re
        });
      }), Oo(X(X({}, Te), {}, {
        path: [T, C, te]
      }), function() {
        if (b.injectStyle === !1)
          return [];
        var Q = ya(I), ce = Q.token, F = Q.flush, B = Wo(g, H, y), z = ".".concat(C), ye = Fo(g, H, B, {
          deprecatedTokens: b.deprecatedTokens
        });
        B && ae(B) === "object" && Object.keys(B).forEach(function(nt) {
          B[nt] = "var(".concat(ht(nt, No(g, A.prefix)), ")");
        });
        var fe = Ge(ce, {
          componentCls: z,
          prefixCls: C,
          iconCls: ".".concat(te),
          antCls: ".".concat(ee),
          calc: oe,
          max: K,
          min: Xe
        }, B), Wt = p(fe, {
          hashId: E,
          prefixCls: C,
          rootPrefixCls: ee,
          iconPrefixCls: te
        });
        F(g, ye);
        var le = typeof s == "function" ? s(fe, C, w, b.resetFont) : null;
        return [b.resetStyle === !1 ? null : le, Wt];
      }), E;
    };
  }
  function f(d, p, y) {
    var b = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, $ = l(d, p, y, X({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, b)), m = function(T) {
      var S = T.prefixCls, C = T.rootCls, w = C === void 0 ? S : C;
      return $(S, w), null;
    };
    return m;
  }
  return {
    genStyleHooks: c,
    genSubStyleComponent: f,
    genComponentStyleHook: l
  };
}
const eo = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
function yt(e) {
  return (e + 8) / e;
}
function Ta(e) {
  const t = Array.from({
    length: 10
  }).map((o, r) => {
    const n = r - 1, i = e * Math.E ** (n / 5), s = r > 1 ? Math.floor(i) : Math.ceil(i);
    return Math.floor(s / 2) * 2;
  });
  return t[1] = e, t.map((o) => ({
    size: o,
    lineHeight: yt(o)
  }));
}
const Ea = "6.0.0", Qn = {
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
}, vt = {
  // preset color palettes
  ...Qn,
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
}, Ma = {
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
function or(e, t) {
  const o = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], r = o.map((n) => parseFloat(n));
  for (let n = 0; n < 3; n += 1)
    r[n] = t(r[n] || 0, o[n] || "", n);
  return o[3] ? r[3] = o[3].includes("%") ? r[3] / 100 : r[3] : r[3] = 1, r;
}
const Vo = (e, t, o) => o === 0 ? e : e / 100;
function Qe(e, t) {
  const o = t || 255;
  return e > o ? o : e < 0 ? 0 : e;
}
class N {
  constructor(t) {
    /**
     * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
     */
    O(this, "isValid", !0);
    /**
     * Red, R in RGB
     */
    O(this, "r", 0);
    /**
     * Green, G in RGB
     */
    O(this, "g", 0);
    /**
     * Blue, B in RGB
     */
    O(this, "b", 0);
    /**
     * Alpha/Opacity, A in RGBA/HSLA
     */
    O(this, "a", 1);
    // HSV privates
    O(this, "_h");
    O(this, "_s");
    O(this, "_l");
    O(this, "_v");
    // intermediate variables to calculate HSL/HSV
    O(this, "_max");
    O(this, "_min");
    O(this, "_brightness");
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
        const i = Ma[r.toLowerCase()];
        i && this.fromHexString(
          // Convert 36 hex to 16 hex
          parseInt(i, 36).toString(16).padStart(6, "0")
        );
      }
    } else if (t instanceof N)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (o("rgb"))
      this.r = Qe(t.r), this.g = Qe(t.g), this.b = Qe(t.b), this.a = typeof t.a == "number" ? Qe(t.a, 1) : 1;
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
    return n[t] = Qe(o, r), n;
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
      const d = G(r * 255);
      this.r = d, this.g = d, this.b = d;
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
    const o = or(t, Vo);
    this.fromHsv({
      h: o[0],
      s: o[1],
      v: o[2],
      a: o[3]
    });
  }
  fromHslString(t) {
    const o = or(t, Vo);
    this.fromHsl({
      h: o[0],
      s: o[1],
      l: o[2],
      a: o[3]
    });
  }
  fromRgbString(t) {
    const o = or(t, (r, n) => (
      // Convert percentage to number. e.g. 50% -> 128
      n.includes("%") ? G(r / 100 * 255) : r
    ));
    this.r = o[0], this.g = o[1], this.b = o[2], this.a = o[3];
  }
}
const at = 2, Xo = 0.16, Ra = 0.05, Aa = 0.05, za = 0.15, Kn = 5, Yn = 4, Ia = [{
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
function Uo(e, t, o) {
  let r;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? r = o ? Math.round(e.h) - at * t : Math.round(e.h) + at * t : r = o ? Math.round(e.h) + at * t : Math.round(e.h) - at * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function qo(e, t, o) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  let r;
  return o ? r = e.s - Xo * t : t === Yn ? r = e.s + Xo : r = e.s + Ra * t, r > 1 && (r = 1), o && t === Kn && r > 0.1 && (r = 0.1), r < 0.06 && (r = 0.06), Math.round(r * 100) / 100;
}
function Qo(e, t, o) {
  let r;
  return o ? r = e.v + Aa * t : r = e.v - za * t, r = Math.max(0, Math.min(1, r)), Math.round(r * 100) / 100;
}
function to(e, t = {}) {
  const o = [], r = new N(e), n = r.toHsv();
  for (let i = Kn; i > 0; i -= 1) {
    const s = new N({
      h: Uo(n, i, !0),
      s: qo(n, i, !0),
      v: Qo(n, i, !0)
    });
    o.push(s);
  }
  o.push(r);
  for (let i = 1; i <= Yn; i += 1) {
    const s = new N({
      h: Uo(n, i),
      s: qo(n, i),
      v: Qo(n, i)
    });
    o.push(s);
  }
  return t.theme === "dark" ? Ia.map(({
    index: i,
    amount: s
  }) => new N(t.backgroundColor || "#141414").mix(o[i], s).toHexString()) : o.map((i) => i.toHexString());
}
const nr = {
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
}, Mr = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
Mr.primary = Mr[5];
const Rr = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
Rr.primary = Rr[5];
const Ar = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
Ar.primary = Ar[5];
const zr = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
zr.primary = zr[5];
const Ir = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
Ir.primary = Ir[5];
const Pr = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
Pr.primary = Pr[5];
const Hr = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
Hr.primary = Hr[5];
const _r = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
_r.primary = _r[5];
const Ct = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
Ct.primary = Ct[5];
const Lr = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
Lr.primary = Lr[5];
const Br = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
Br.primary = Br[5];
const kr = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
kr.primary = kr[5];
const Or = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
Or.primary = Or[5];
const ir = {
  red: Mr,
  volcano: Rr,
  orange: Ar,
  gold: zr,
  yellow: Ir,
  lime: Pr,
  green: Hr,
  cyan: _r,
  blue: Ct,
  geekblue: Lr,
  purple: Br,
  magenta: kr,
  grey: Or
};
function Pa(e, {
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
  } = e, l = t(a), f = t(r), d = t(n), p = t(i), y = t(s), b = o(c, u), $ = e.colorLink || e.colorInfo, m = t($), g = new N(p[1]).mix(new N(p[3]), 50).toHexString();
  return {
    ...b,
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
    colorErrorBg: p[1],
    colorErrorBgHover: p[2],
    colorErrorBgFilledHover: g,
    colorErrorBgActive: p[3],
    colorErrorBorder: p[3],
    colorErrorBorderHover: p[4],
    colorErrorHover: p[5],
    colorError: p[6],
    colorErrorActive: p[7],
    colorErrorTextHover: p[8],
    colorErrorText: p[9],
    colorErrorTextActive: p[10],
    colorWarningBg: d[1],
    colorWarningBgHover: d[2],
    colorWarningBorder: d[3],
    colorWarningBorderHover: d[4],
    colorWarningHover: d[4],
    colorWarning: d[6],
    colorWarningActive: d[7],
    colorWarningTextHover: d[8],
    colorWarningText: d[9],
    colorWarningTextActive: d[10],
    colorInfoBg: y[1],
    colorInfoBgHover: y[2],
    colorInfoBorder: y[3],
    colorInfoBorderHover: y[4],
    colorInfoHover: y[4],
    colorInfo: y[6],
    colorInfoActive: y[7],
    colorInfoTextHover: y[8],
    colorInfoText: y[9],
    colorInfoTextActive: y[10],
    colorLinkHover: m[4],
    colorLink: m[6],
    colorLinkActive: m[7],
    colorBgMask: new N("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  };
}
const Ha = (e) => {
  let t = e, o = e, r = e, n = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? o = 4 : e < 8 && e >= 7 ? o = 5 : e < 14 && e >= 8 ? o = 6 : e < 16 && e >= 14 ? o = 7 : e >= 16 && (o = 8), e < 6 && e >= 2 ? r = 1 : e >= 6 && (r = 2), e > 4 && e < 8 ? n = 4 : e >= 8 && (n = 6), {
    borderRadius: e,
    borderRadiusXS: r,
    borderRadiusSM: o,
    borderRadiusLG: t,
    borderRadiusOuter: n
  };
};
function _a(e) {
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
    ...Ha(r)
  };
}
const La = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
}, Ba = (e) => {
  const t = Ta(e), o = t.map((l) => l.size), r = t.map((l) => l.lineHeight), n = o[1], i = o[0], s = o[2], a = r[1], c = r[0], u = r[2];
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
function ka(e) {
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
const Y = (e, t) => new N(e).setA(t).toRgbString(), Le = (e, t) => new N(e).darken(t).toHexString(), Oa = (e) => {
  const t = to(e);
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
}, ja = (e, t) => {
  const o = e || "#fff", r = t || "#000";
  return {
    colorBgBase: o,
    colorTextBase: r,
    colorText: Y(r, 0.88),
    colorTextSecondary: Y(r, 0.65),
    colorTextTertiary: Y(r, 0.45),
    colorTextQuaternary: Y(r, 0.25),
    colorFill: Y(r, 0.15),
    colorFillSecondary: Y(r, 0.06),
    colorFillTertiary: Y(r, 0.04),
    colorFillQuaternary: Y(r, 0.02),
    colorBgSolid: Y(r, 1),
    colorBgSolidHover: Y(r, 0.75),
    colorBgSolidActive: Y(r, 0.95),
    colorBgLayout: Le(o, 4),
    colorBgContainer: Le(o, 0),
    colorBgElevated: Le(o, 0),
    colorBgSpotlight: Y(r, 0.85),
    colorBgBlur: "transparent",
    colorBorder: Le(o, 15),
    colorBorderDisabled: Le(o, 15),
    colorBorderSecondary: Le(o, 6)
  };
};
function Na(e) {
  nr.pink = nr.magenta, ir.pink = ir.magenta;
  const t = Object.keys(Qn).map((o) => {
    const r = e[o] === nr[o] ? ir[o] : to(e[o]);
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
    ...Pa(e, {
      generateColorPalettes: Oa,
      generateNeutralColorPalettes: ja
    }),
    // Font
    ...Ba(e.fontSize),
    // Size
    ...ka(e),
    // Height
    ...La(e),
    // Others
    ..._a(e)
  };
}
const Fa = Ss(Na), Da = {
  token: vt,
  override: {
    override: vt
  },
  hashed: !1
}, Wa = /* @__PURE__ */ R.createContext(Da);
function sr(e) {
  return e >= 0 && e <= 255;
}
function Ye(e, t) {
  const {
    r: o,
    g: r,
    b: n,
    a: i
  } = new N(e).toRgb();
  if (i < 1)
    return e;
  const {
    r: s,
    g: a,
    b: c
  } = new N(t).toRgb();
  for (let u = 0.01; u <= 1; u += 0.01) {
    const l = Math.round((o - s * (1 - u)) / u), f = Math.round((r - a * (1 - u)) / u), d = Math.round((n - c * (1 - u)) / u);
    if (sr(l) && sr(f) && sr(d))
      return new N({
        r: l,
        g: f,
        b: d,
        a: Math.round(u * 100) / 100
      }).toRgbString();
  }
  return new N({
    r: o,
    g: r,
    b: n,
    a: 1
  }).toRgbString();
}
function Ga(e) {
  const {
    override: t,
    ...o
  } = e, r = {
    ...t
  };
  Object.keys(vt).forEach((d) => {
    delete r[d];
  });
  const n = {
    ...o,
    ...r
  }, i = 480, s = 576, a = 768, c = 992, u = 1200, l = 1600;
  if (n.motion === !1) {
    const d = "0s";
    n.motionDurationFast = d, n.motionDurationMid = d, n.motionDurationSlow = d;
  }
  return {
    ...n,
    // ============== Background ============== //
    colorFillContent: n.colorFillSecondary,
    colorFillContentHover: n.colorFill,
    colorFillAlter: n.colorFillQuaternary,
    colorBgContainerDisabled: n.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: n.colorBgContainer,
    colorSplit: Ye(n.colorBorderSecondary, n.colorBgContainer),
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
    colorErrorOutline: Ye(n.colorErrorBg, n.colorBgContainer),
    colorWarningOutline: Ye(n.colorWarningBg, n.colorBgContainer),
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
    controlOutline: Ye(n.colorPrimaryBg, n.colorBgContainer),
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
      0 1px 2px -2px ${new N("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new N("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new N("rgba(0, 0, 0, 0.09)").toRgbString()}
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
const Zn = {
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
}, Va = {
  motionBase: !0,
  motionUnit: !0
}, Xa = {
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
}, Jn = (e, t, o) => {
  const r = o.getDerivativeToken(e), {
    override: n,
    ...i
  } = t;
  let s = {
    ...r,
    override: n
  };
  return s = Ga(s), i && Object.entries(i).forEach(([a, c]) => {
    const {
      theme: u,
      ...l
    } = c;
    let f = l;
    u && (f = Jn({
      ...s,
      ...l
    }, {
      override: l
    }, u)), s[a] = f;
  }), s;
};
function ro() {
  const {
    token: e,
    hashed: t,
    theme: o,
    override: r,
    cssVar: n,
    zeroRuntime: i
  } = R.useContext(Wa), s = {
    prefix: (n == null ? void 0 : n.prefix) || "ant",
    key: (n == null ? void 0 : n.key) || "css-var-root"
  }, a = `${Ea}-${t || ""}`, c = o || Fa, [u, l, f] = Hs(c, [vt, e], {
    salt: a,
    override: r,
    getComputedToken: Jn,
    cssVar: {
      ...s,
      unitless: Zn,
      ignore: Va,
      preserve: Xa
    }
  });
  return [c, f, t ? l : "", u, s, !!i];
}
const ei = () => ({
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
}), Ua = (e) => ({
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
}), qa = (e, t, o, r) => {
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
}, Qa = (e, t) => ({
  outline: `${Fe(e.lineWidthFocus)} solid ${e.colorPrimaryBorder}`,
  outlineOffset: 1,
  transition: "outline-offset 0s, outline 0s"
}), Ka = (e, t) => ({
  "&:focus-visible": Qa(e)
}), Ya = (e) => ({
  [`.${e}`]: {
    ...ei(),
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  }
}), {
  genStyleHooks: Za,
  genComponentStyleHook: Ja,
  genSubStyleComponent: ec
} = wa({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = Ce($e);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, o, r, n, i] = ro();
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
    } = Ce($e);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    const o = Ua(e);
    return [o, {
      "&": o
    }, Ya((t == null ? void 0 : t.prefix.iconPrefixCls) ?? En)];
  },
  getCommonStyle: qa,
  getCompUnitless: () => Zn
}), tc = (e, t) => {
  const o = `--${e.replace(".", "")}-${t}-`;
  return (r, n = !1) => {
    const i = `${o}${r}`;
    return n ? `var(${i})` : i;
  };
}, ti = /* @__PURE__ */ Hi({});
function ri(e) {
  var t;
  return (t = e == null ? void 0 : e.getRootNode) == null ? void 0 : t.call(e);
}
function rc(e) {
  return ri(e) instanceof ShadowRoot;
}
function oc(e) {
  return rc(e) ? ri(e) : null;
}
function nc(e) {
  return e.replace(/-(.)/g, (t, o) => o.toUpperCase());
}
function ic(e, t) {
  Lt(e, `[@ant-design/icons] ${t}`);
}
function Ko(e) {
  return typeof e == "object" && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function Yo(e = {}) {
  return Object.keys(e).reduce((t, o) => {
    const r = e[o];
    switch (o) {
      case "class":
        t.className = r, delete t.class;
        break;
      default:
        delete t[o], t[nc(o)] = r;
    }
    return t;
  }, {});
}
function jr(e, t, o) {
  return o ? /* @__PURE__ */ R.createElement(e.tag, {
    key: t,
    ...Yo(e.attrs),
    ...o
  }, (e.children || []).map((r, n) => jr(r, `${t}-${e.tag}-${n}`))) : /* @__PURE__ */ R.createElement(e.tag, {
    key: t,
    ...Yo(e.attrs)
  }, (e.children || []).map((r, n) => jr(r, `${t}-${e.tag}-${n}`)));
}
function oi(e) {
  return to(e)[0];
}
function ni(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
const sc = `
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
`, ac = (e) => {
  const {
    csp: t,
    prefixCls: o,
    layer: r
  } = Ce(ti);
  let n = sc;
  o && (n = n.replace(/anticon/g, o)), r && (n = `@layer ${r} {
${n}
}`), Me(() => {
    const i = e.current, s = oc(i);
    Ne(n, "@ant-design-icons", {
      prepend: !r,
      csp: t,
      attachTo: s
    });
  }, []);
}, et = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function cc({
  primaryColor: e,
  secondaryColor: t
}) {
  et.primaryColor = e, et.secondaryColor = t || oi(e), et.calculated = !!t;
}
function lc() {
  return {
    ...et
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
  } = e, c = v.useRef(null);
  let u = et;
  if (i && (u = {
    primaryColor: i,
    secondaryColor: s || oi(i)
  }), ac(c), ic(Ko(t), `icon should be icon definiton, but got ${t}`), !Ko(t))
    return null;
  let l = t;
  return l && typeof l.icon == "function" && (l = {
    ...l,
    icon: l.icon(u.primaryColor, u.secondaryColor)
  }), jr(l.icon, `svg-${l.name}`, {
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
Ve.getTwoToneColors = lc;
Ve.setTwoToneColors = cc;
function ii(e) {
  const [t, o] = ni(e);
  return Ve.setTwoToneColors({
    primaryColor: t,
    secondaryColor: o
  });
}
function uc() {
  const e = Ve.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
function Nr() {
  return Nr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var r in o)
        Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
  }, Nr.apply(this, arguments);
}
ii(Ct.primary);
const oo = /* @__PURE__ */ v.forwardRef((e, t) => {
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
  } = v.useContext(ti), d = U(f, l, {
    [`${l}-${r.name}`]: !!r.name,
    [`${l}-spin`]: !!n || r.name === "loading"
  }, o);
  let p = s;
  p === void 0 && a && (p = -1);
  const y = i ? {
    msTransform: `rotate(${i}deg)`,
    transform: `rotate(${i}deg)`
  } : void 0, [b, $] = ni(c);
  return /* @__PURE__ */ v.createElement("span", Nr({
    role: "img",
    "aria-label": r.name
  }, u, {
    ref: t,
    tabIndex: p,
    onClick: a,
    className: d
  }), /* @__PURE__ */ v.createElement(Ve, {
    icon: r,
    primaryColor: b,
    secondaryColor: $,
    style: y
  }));
});
oo.getTwoToneColor = uc;
oo.setTwoToneColor = ii;
const fc = /* @__PURE__ */ v.createContext({});
function dc(e) {
  const [, t] = v.useReducer((i) => i + 1, 0), o = v.useRef(e), r = St(() => o.current), n = St((i) => {
    o.current = typeof i == "function" ? i(o.current) : i, t();
  });
  return [r, n];
}
const ge = "none", ct = "appear", lt = "enter", ut = "leave", Zo = "none", ie = "prepare", Be = "start", ke = "active", no = "end", si = "prepared";
function Jo(e, t) {
  const o = {};
  return o[e.toLowerCase()] = t.toLowerCase(), o[`Webkit${e}`] = `webkit${t}`, o[`Moz${e}`] = `moz${t}`, o[`ms${e}`] = `MS${t}`, o[`O${e}`] = `o${t.toLowerCase()}`, o;
}
function hc(e, t) {
  const o = {
    animationend: Jo("Animation", "AnimationEnd"),
    transitionend: Jo("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete o.animationend.animation, "TransitionEvent" in t || delete o.transitionend.transition), o;
}
const gc = hc(we(), typeof window < "u" ? window : {});
let ai = {};
we() && ({
  style: ai
} = document.createElement("div"));
const ft = {};
function ci(e) {
  if (ft[e])
    return ft[e];
  const t = gc[e];
  if (t) {
    const o = Object.keys(t), r = o.length;
    for (let n = 0; n < r; n += 1) {
      const i = o[n];
      if (Object.prototype.hasOwnProperty.call(t, i) && i in ai)
        return ft[e] = t[i], ft[e];
    }
  }
  return "";
}
const li = ci("animationend"), ui = ci("transitionend"), pc = !!(li && ui), en = li || "animationend", tn = ui || "transitionend";
function rn(e, t) {
  if (!e) return null;
  if (typeof e == "object") {
    const o = t.replace(/-\w/g, (r) => r[1].toUpperCase());
    return e[o];
  }
  return `${e}-${t}`;
}
const mc = (e) => {
  const t = pe();
  function o(n) {
    n && (n.removeEventListener(tn, e), n.removeEventListener(en, e));
  }
  function r(n) {
    t.current && t.current !== n && o(t.current), n && n !== t.current && (n.addEventListener(tn, e), n.addEventListener(en, e), t.current = n);
  }
  return v.useEffect(() => () => {
    o(t.current);
  }, []), [r, o];
}, fi = we() ? _i : Me, bc = () => {
  const e = v.useRef(null);
  function t() {
    Ae.cancel(e.current);
  }
  function o(r, n = 2) {
    t();
    const i = Ae(() => {
      n <= 1 ? r({
        isCanceled: () => i !== e.current
      }) : o(r, n - 1);
    });
    e.current = i;
  }
  return v.useEffect(() => () => {
    t();
  }, []), [o, t];
}, yc = [ie, Be, ke, no], Sc = [ie, si], di = !1, xc = !0;
function hi(e) {
  return e === ke || e === no;
}
const vc = (e, t, o) => {
  const [r, n] = dr(Zo), [i, s] = bc();
  function a() {
    n(ie, !0);
  }
  const c = t ? Sc : yc;
  return fi(() => {
    if (r !== Zo && r !== no) {
      const u = c.indexOf(r), l = c[u + 1], f = o(r);
      f === di ? n(l, !0) : l && i((d) => {
        function p() {
          d.isCanceled() || n(l, !0);
        }
        f === !0 ? p() : Promise.resolve(f).then(p);
      });
    }
  }, [e, r]), v.useEffect(() => () => {
    s();
  }, []), [a, r];
};
function Cc(e, t, o, {
  motionEnter: r = !0,
  motionAppear: n = !0,
  motionLeave: i = !0,
  motionDeadline: s,
  motionLeaveImmediately: a,
  onAppearPrepare: c,
  onEnterPrepare: u,
  onLeavePrepare: l,
  onAppearStart: f,
  onEnterStart: d,
  onLeaveStart: p,
  onAppearActive: y,
  onEnterActive: b,
  onLeaveActive: $,
  onAppearEnd: m,
  onEnterEnd: g,
  onLeaveEnd: T,
  onVisibleChanged: S
}) {
  const [C, w] = dr(), [h, x] = dc(ge), [H, E] = dr(null), I = h(), A = pe(!1), _ = pe(null);
  function V() {
    return o();
  }
  const q = pe(!1);
  function ee() {
    x(ge), E(null, !0);
  }
  const te = St((F) => {
    const B = h();
    if (B === ge)
      return;
    const z = V();
    if (F && !F.deadline && F.target !== z)
      return;
    const ye = q.current;
    let fe;
    B === ct && ye ? fe = m == null ? void 0 : m(z, F) : B === lt && ye ? fe = g == null ? void 0 : g(z, F) : B === ut && ye && (fe = T == null ? void 0 : T(z, F)), ye && fe !== !1 && ee();
  }), [re] = mc(te), be = (F) => {
    switch (F) {
      case ct:
        return {
          [ie]: c,
          [Be]: f,
          [ke]: y
        };
      case lt:
        return {
          [ie]: u,
          [Be]: d,
          [ke]: b
        };
      case ut:
        return {
          [ie]: l,
          [Be]: p,
          [ke]: $
        };
      default:
        return {};
    }
  }, oe = v.useMemo(() => be(I), [I]), [Ie, K] = vc(I, !e, (F) => {
    var B;
    if (F === ie) {
      const z = oe[ie];
      return z ? z(V()) : di;
    }
    return K in oe && E(((B = oe[K]) == null ? void 0 : B.call(oe, V(), null)) || null), K === ke && I !== ge && (re(V()), s > 0 && (clearTimeout(_.current), _.current = setTimeout(() => {
      te({
        deadline: !0
      });
    }, s))), K === si && ee(), xc;
  }), Xe = hi(K);
  q.current = Xe;
  const Te = pe(null);
  fi(() => {
    if (A.current && Te.current === t)
      return;
    w(t);
    const F = A.current;
    A.current = !0;
    let B;
    !F && t && n && (B = ct), F && t && r && (B = lt), (F && !t && i || !F && a && !t && i) && (B = ut);
    const z = be(B);
    B && (e || z[ie]) ? (x(B), Ie()) : x(ge), Te.current = t;
  }, [t]), Me(() => {
    // Cancel appear
    (I === ct && !n || // Cancel enter
    I === lt && !r || // Cancel leave
    I === ut && !i) && x(ge);
  }, [n, r, i]), Me(() => () => {
    A.current = !1, clearTimeout(_.current);
  }, []);
  const Q = v.useRef(!1);
  Me(() => {
    C && (Q.current = !0), C !== void 0 && I === ge && ((Q.current || C) && (S == null || S(C)), Q.current = !0);
  }, [C, I]);
  let ce = H;
  return oe[ie] && K === Be && (ce = {
    transition: "none",
    ...ce
  }), [h, K, ce, C ?? t];
}
function $c(e) {
  let t = e;
  typeof e == "object" && ({
    transitionSupport: t
  } = e);
  function o(n, i) {
    return !!(n.motionName && t && i !== !1);
  }
  const r = /* @__PURE__ */ v.forwardRef((n, i) => {
    const {
      // Default config
      visible: s = !0,
      removeOnLeave: a = !0,
      forceRender: c,
      children: u,
      motionName: l,
      leavedClassName: f,
      eventProps: d
    } = n, {
      motion: p
    } = v.useContext(fc), y = o(n, p), b = pe();
    function $() {
      return is(b.current);
    }
    const [m, g, T, S] = Cc(y, s, $, n), C = m(), w = v.useRef(S);
    S && (w.current = !0);
    const h = v.useMemo(() => {
      const E = {};
      return Object.defineProperties(E, {
        nativeElement: {
          enumerable: !0,
          get: $
        },
        inMotion: {
          enumerable: !0,
          get: () => () => m() !== ge
        },
        enableMotion: {
          enumerable: !0,
          get: () => () => y
        }
      }), E;
    }, []);
    v.useImperativeHandle(i, () => h, []);
    let x;
    const H = {
      ...d,
      visible: s
    };
    if (!u)
      x = null;
    else if (C === ge)
      S ? x = u({
        ...H
      }, b) : !a && w.current && f ? x = u({
        ...H,
        className: f
      }, b) : c || !a && !f ? x = u({
        ...H,
        style: {
          display: "none"
        }
      }, b) : x = null;
    else {
      let E;
      g === ie ? E = "prepare" : hi(g) ? E = "active" : g === Be && (E = "start");
      const I = rn(l, `${C}-${E}`);
      x = u({
        ...H,
        className: U(rn(l, C), {
          [I]: I && E,
          [l]: typeof l == "string"
        }),
        style: T
      }, b);
    }
    return /* @__PURE__ */ v.isValidElement(x) && bn(x) && (Sn(x) || (x = /* @__PURE__ */ v.cloneElement(x, {
      ref: b
    }))), x;
  });
  return r.displayName = "CSSMotion", r;
}
const gi = $c(pc), wc = (e) => e != null, pi = (e, ...t) => {
  const o = e || {};
  return t.filter(Boolean).reduce((r, n) => (Object.keys(n || {}).forEach((i) => {
    const s = o[i], a = n[i];
    if (s && typeof s == "object")
      if (a && typeof a == "object")
        r[i] = pi(s, r[i], a);
      else {
        const {
          _default: c
        } = s;
        c && (r[i] = r[i] || {}, r[i][c] = U(r[i][c], a));
      }
    else
      r[i] = U(r[i], a);
  }), r), {});
}, Tc = (e, ...t) => v.useMemo(() => pi.apply(void 0, [e].concat(t)), [e].concat(t)), Ec = (...e) => e.filter(Boolean).reduce((t, o = {}) => (Object.keys(o).forEach((r) => {
  t[r] = {
    ...t[r],
    ...o[r]
  };
}), t), {}), Mc = (...e) => v.useMemo(() => Ec.apply(void 0, e), [].concat(e)), on = (e, t) => typeof e == "function" ? e(t) : e, Rc = (e, t, o, r) => {
  const n = e.map((c) => c ? on(c, o) : void 0), i = t.map((c) => c ? on(c, o) : void 0), s = Tc.apply(void 0, [r].concat(mr(n))), a = Mc.apply(void 0, mr(i));
  return v.useMemo(() => [s, a], [s, a, r]);
};
function Ac(e) {
  return e && /* @__PURE__ */ R.isValidElement(e) && e.type === R.Fragment;
}
const zc = (e, t, o) => /* @__PURE__ */ R.isValidElement(e) ? /* @__PURE__ */ R.cloneElement(e, typeof o == "function" ? o(e.props || {}) : o) : t;
function Fr(e, t) {
  return zc(e, e, t);
}
const Ic = (e) => {
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
}, Pc = /* @__PURE__ */ v.createContext(!1), Hc = /* @__PURE__ */ v.createContext(void 0);
var _c = { icon: { tag: "svg", attrs: { viewBox: "0 0 1024 1024", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, name: "loading", theme: "outlined" };
function Dr() {
  return Dr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var r in o)
        Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
  }, Dr.apply(this, arguments);
}
const Lc = (e, t) => /* @__PURE__ */ v.createElement(oo, Dr({}, e, {
  ref: t,
  icon: _c
})), Bc = /* @__PURE__ */ v.forwardRef(Lc);
var mi, nn = Li;
mi = nn.createRoot, nn.hydrateRoot;
const $t = "__rc_react_root__";
function kc(e, t) {
  const o = t[$t] || mi(t);
  o.render(e), t[$t] = o;
}
async function Oc(e) {
  return Promise.resolve().then(() => {
    var t;
    (t = e[$t]) == null || t.unmount(), delete e[$t];
  });
}
const jc = (e) => {
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
}, Nc = Ja("Wave", jc), bi = `${br}-wave-target`;
function sn(e) {
  return e && typeof e == "string" && e !== "#fff" && e !== "#ffffff" && e !== "rgb(255, 255, 255)" && e !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/.test(e) && // any transparent rgba color
  e !== "transparent" && e !== "canvastext";
}
function Fc(e, t = null) {
  const o = getComputedStyle(e), {
    borderTopColor: r,
    borderColor: n,
    backgroundColor: i
  } = o;
  return t && sn(o[t]) ? o[t] : [r, n, i].find(sn) ?? null;
}
function ar(e) {
  return Number.isNaN(e) ? 0 : e;
}
const Dc = (e) => {
  const {
    className: t,
    target: o,
    component: r,
    colorSource: n
  } = e, i = v.useRef(null), [s, a] = v.useState(null), [c, u] = v.useState([]), [l, f] = v.useState(0), [d, p] = v.useState(0), [y, b] = v.useState(0), [$, m] = v.useState(0), [g, T] = v.useState(!1), S = {
    left: l,
    top: d,
    width: y,
    height: $,
    borderRadius: c.map((h) => `${h}px`).join(" ")
  };
  s && (S["--wave-color"] = s);
  function C() {
    const h = getComputedStyle(o);
    a(Fc(o, n));
    const x = h.position === "static", {
      borderLeftWidth: H,
      borderTopWidth: E
    } = h;
    f(x ? o.offsetLeft : ar(-Number.parseFloat(H))), p(x ? o.offsetTop : ar(-Number.parseFloat(E))), b(o.offsetWidth), m(o.offsetHeight);
    const {
      borderTopLeftRadius: I,
      borderTopRightRadius: A,
      borderBottomLeftRadius: _,
      borderBottomRightRadius: V
    } = h;
    u([I, A, V, _].map((q) => ar(Number.parseFloat(q))));
  }
  if (v.useEffect(() => {
    if (o) {
      const h = Ae(() => {
        C(), T(!0);
      });
      let x;
      return typeof ResizeObserver < "u" && (x = new ResizeObserver(C), x.observe(o)), () => {
        Ae.cancel(h), x == null || x.disconnect();
      };
    }
  }, [o]), !g)
    return null;
  const w = (r === "Checkbox" || r === "Radio") && (o == null ? void 0 : o.classList.contains(bi));
  return /* @__PURE__ */ v.createElement(gi, {
    visible: !0,
    motionAppear: !0,
    motionName: "wave-motion",
    motionDeadline: 5e3,
    onAppearEnd: (h, x) => {
      var H;
      if (x.deadline || x.propertyName === "opacity") {
        const E = (H = i.current) == null ? void 0 : H.parentElement;
        Oc(E).then(() => {
          E == null || E.remove();
        });
      }
      return !1;
    }
  }, ({
    className: h
  }, x) => /* @__PURE__ */ v.createElement("div", {
    ref: Xr(i, x),
    className: U(t, h, {
      "wave-quick": w
    }),
    style: S
  }));
}, Wc = (e, t) => {
  var n;
  const {
    component: o
  } = t;
  if (o === "Checkbox" && !((n = e.querySelector("input")) != null && n.checked))
    return;
  const r = document.createElement("div");
  r.style.position = "absolute", r.style.left = "0px", r.style.top = "0px", e == null || e.insertBefore(r, e == null ? void 0 : e.firstChild), kc(/* @__PURE__ */ v.createElement(Dc, {
    ...t,
    target: e
  }), r);
}, Gc = (e, t, o, r) => {
  const {
    wave: n
  } = v.useContext($e), [, i, s] = ro(), a = St((l) => {
    const f = e.current;
    if (n != null && n.disabled || !f)
      return;
    const d = f.querySelector(`.${bi}`) || f, {
      showEffect: p
    } = n || {};
    (p || Wc)(d, {
      className: t,
      token: i,
      component: o,
      event: l,
      hashId: s,
      colorSource: r
    });
  }), c = v.useRef(null);
  return (l) => {
    Ae.cancel(c.current), c.current = Ae(() => {
      a(l);
    });
  };
}, Vc = (e) => {
  const {
    children: t,
    disabled: o,
    component: r,
    colorSource: n
  } = e, {
    getPrefixCls: i
  } = Ce($e), s = pe(null), a = i("wave"), [, c] = Nc(a), u = Gc(s, U(a, c), r, n);
  if (R.useEffect(() => {
    const f = s.current;
    if (!f || f.nodeType !== window.Node.ELEMENT_NODE || o)
      return;
    const d = (p) => {
      !Ic(p.target) || // No need wave
      !f.getAttribute || f.getAttribute("disabled") || f.disabled || f.className.includes("disabled") && !f.className.includes("disabled:") || f.getAttribute("aria-disabled") === "true" || f.className.includes("-leave") || u(p);
    };
    return f.addEventListener("click", d, !0), () => {
      f.removeEventListener("click", d, !0);
    };
  }, [o]), !/* @__PURE__ */ R.isValidElement(t))
    return t ?? null;
  const l = bn(t) ? Xr(Sn(t), s) : s;
  return Fr(t, {
    ref: l
  });
}, Xc = (e) => {
  const t = R.useContext(Hc);
  return R.useMemo(() => e ? typeof e == "string" ? e ?? t : typeof e == "function" ? e(t) : t : t, [e, t]);
}, Uc = /* @__PURE__ */ v.createContext(null), qc = (e, t) => {
  const o = v.useContext(Uc), r = v.useMemo(() => {
    if (!o)
      return "";
    const {
      compactDirection: n,
      isFirstItem: i,
      isLastItem: s
    } = o, a = n === "vertical" ? "-vertical-" : "-";
    return U(`${e}-compact${a}item`, {
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
}, yi = /* @__PURE__ */ v.createContext(void 0), Qc = (e) => {
  const {
    getPrefixCls: t,
    direction: o
  } = v.useContext($e), {
    prefixCls: r,
    size: n,
    className: i,
    ...s
  } = e, a = t("btn-group", r), [, , c] = ro(), u = v.useMemo(() => {
    switch (n) {
      case "large":
        return "lg";
      case "small":
        return "sm";
      default:
        return "";
    }
  }, [n]), l = U(a, {
    [`${a}-${u}`]: u,
    [`${a}-rtl`]: o === "rtl"
  }, i, c);
  return /* @__PURE__ */ v.createElement(yi.Provider, {
    value: n
  }, /* @__PURE__ */ v.createElement("div", {
    ...s,
    className: l
  }));
}, an = /^[\u4E00-\u9FA5]{2}$/, Wr = an.test.bind(an);
function cn(e) {
  return typeof e == "string";
}
function cr(e) {
  return e === "text" || e === "link";
}
function Kc(e, t, o, r) {
  if (e == null || e === "")
    return;
  const n = t ? " " : "";
  return typeof e != "string" && typeof e != "number" && cn(e.type) && Wr(e.props.children) ? Fr(e, (i) => ({
    ...i,
    children: i.children.split("").join(n),
    className: r,
    style: o
  })) : cn(e) ? /* @__PURE__ */ R.createElement("span", {
    className: r,
    style: o
  }, Wr(e) ? e.split("").join(n) : e) : Ac(e) ? /* @__PURE__ */ R.createElement("span", {
    className: r,
    style: o
  }, e) : Fr(e, (i) => ({
    ...i,
    className: U(i.className, r) || void 0,
    style: {
      ...i.style,
      ...o
    }
  }));
}
function Yc(e, t, o, r) {
  let n = !1;
  const i = [];
  return R.Children.forEach(e, (s) => {
    const a = typeof s, c = a === "string" || a === "number";
    if (n && c) {
      const u = i.length - 1, l = i[u];
      i[u] = `${l}${s}`;
    } else
      i.push(s);
    n = c;
  }), R.Children.map(i, (s) => Kc(s, t, o, r));
}
["default", "primary", "danger"].concat(mr(eo));
const Si = /* @__PURE__ */ fn((e, t) => {
  const {
    className: o,
    style: r,
    children: n,
    prefixCls: i
  } = e, s = U(`${i}-icon`, o);
  return /* @__PURE__ */ R.createElement("span", {
    ref: t,
    className: s,
    style: r
  }, n);
}), ln = /* @__PURE__ */ fn((e, t) => {
  const {
    prefixCls: o,
    className: r,
    style: n,
    iconClassName: i
  } = e, s = U(`${o}-loading-icon`, r);
  return /* @__PURE__ */ R.createElement(Si, {
    prefixCls: o,
    className: s,
    style: n,
    ref: t
  }, /* @__PURE__ */ R.createElement(Bc, {
    className: i
  }));
}), lr = () => ({
  width: 0,
  opacity: 0,
  transform: "scale(0)"
}), ur = (e) => ({
  width: e.scrollWidth,
  opacity: 1,
  transform: "scale(1)"
}), Zc = (e) => {
  const {
    prefixCls: t,
    loading: o,
    existIcon: r,
    className: n,
    style: i,
    mount: s
  } = e, a = !!o;
  return r ? /* @__PURE__ */ R.createElement(ln, {
    prefixCls: t,
    className: n,
    style: i
  }) : /* @__PURE__ */ R.createElement(gi, {
    visible: a,
    // Used for minus flex gap style only
    motionName: `${t}-loading-icon-motion`,
    motionAppear: !s,
    motionEnter: !s,
    motionLeave: !s,
    removeOnLeave: !0,
    onAppearStart: lr,
    onAppearActive: ur,
    onEnterStart: lr,
    onEnterActive: ur,
    onLeaveStart: ur,
    onLeaveActive: lr
  }, ({
    className: c,
    style: u
  }, l) => {
    const f = {
      ...i,
      ...u
    };
    return /* @__PURE__ */ R.createElement(ln, {
      prefixCls: t,
      className: U(n, c),
      style: f,
      ref: l
    });
  });
}, un = (e, t) => ({
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
}), Jc = (e) => {
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
      un(`${t}-primary`, n),
      un(`${t}-danger`, i)
    ]
  };
}, fr = (e) => Math.round(Number(e || 0)), el = (e) => {
  if (e instanceof N)
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
class ot extends N {
  constructor(t) {
    super(el(t));
  }
  toHsbString() {
    const t = this.toHsb(), o = fr(t.s * 100), r = fr(t.b * 100), n = fr(t.h), i = t.a, s = `hsb(${n}, ${o}%, ${r}%)`, a = `hsba(${n}, ${o}%, ${r}%, ${i.toFixed(i === 0 ? 0 : 2)})`;
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
const tl = (e) => e instanceof ot ? e : new ot(e);
tl("#1677ff");
const rl = (e, t) => (e == null ? void 0 : e.replace(/[^\w/]/g, "").slice(0, t ? 8 : 6)) || "", ol = (e, t) => e ? rl(e, t) : "";
let nl = /* @__PURE__ */ function() {
  function e(t) {
    var r;
    if (Ft(this, e), this.cleared = !1, t instanceof e) {
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
    })), this.metaColor = new ot(this.colors[0].color.metaColor)) : this.metaColor = new ot(o ? "" : t), (!t || o && !this.colors) && (this.metaColor = this.metaColor.setA(0), this.cleared = !0);
  }
  return Dt(e, [{
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
      return ol(this.toHexString(), this.metaColor.a < 1);
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
}();
const il = (e, t) => {
  const {
    r: o,
    g: r,
    b: n,
    a: i
  } = e.toRgb(), s = new ot(e.toRgbString()).onBackground(t).toHsv();
  return i <= 0.5 ? s.v > 0.5 : o * 0.299 + r * 0.587 + n * 0.114 > 192;
}, xi = (e) => {
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
}, vi = (e) => {
  const t = e.contentFontSize ?? e.fontSize, o = e.contentFontSizeSM ?? e.fontSize, r = e.contentFontSizeLG ?? e.fontSizeLG, n = e.contentLineHeight ?? yt(t), i = e.contentLineHeightSM ?? yt(o), s = e.contentLineHeightLG ?? yt(r), a = il(new nl(e.colorBgSolid), "#fff") ? "#000" : "#fff", c = eo.reduce((f, d) => ({
    ...f,
    [`${d}ShadowColor`]: `0 ${Fe(e.controlOutlineWidth)} 0 ${Ye(e[`${d}1`], e.colorBgContainer)}`
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
}, sl = (e) => {
  const {
    componentCls: t,
    antCls: o
  } = e, r = tc(o, "btn");
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
      eo.map((n) => {
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
}, al = (e) => {
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
      [`${t}-icon > svg`]: ei(),
      "> a": {
        color: "currentColor"
      },
      "&:not(:disabled)": Ka(e),
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
}, cl = (e) => ({
  minWidth: e.controlHeight,
  paddingInline: 0,
  borderRadius: "50%"
}), io = (e, t = "") => {
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
      [`${o}${o}-circle${t}`]: cl(e)
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
}, ll = (e) => {
  const t = Ge(e, {
    fontSize: e.contentFontSize
  });
  return io(t, e.componentCls);
}, ul = (e) => {
  const t = Ge(e, {
    controlHeight: e.controlHeightSM,
    fontSize: e.contentFontSizeSM,
    padding: e.paddingXS,
    buttonPaddingHorizontal: e.paddingInlineSM,
    buttonPaddingVertical: 0,
    borderRadius: e.borderRadiusSM,
    buttonIconOnlyFontSize: e.onlyIconSizeSM
  });
  return io(t, `${e.componentCls}-sm`);
}, fl = (e) => {
  const t = Ge(e, {
    controlHeight: e.controlHeightLG,
    fontSize: e.contentFontSizeLG,
    buttonPaddingHorizontal: e.paddingInlineLG,
    buttonPaddingVertical: 0,
    borderRadius: e.borderRadiusLG,
    buttonIconOnlyFontSize: e.onlyIconSizeLG
  });
  return io(t, `${e.componentCls}-lg`);
}, dl = (e) => {
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
}, hl = Za("Button", (e) => {
  const t = xi(e);
  return [
    // Shared
    al(t),
    // Size
    ll(t),
    ul(t),
    fl(t),
    // Block
    dl(t),
    // Variant
    sl(t),
    // Button Group
    Jc(t)
  ];
}, vi, {
  unitless: {
    fontWeight: !0,
    contentLineHeight: !0,
    contentLineHeightSM: !0,
    contentLineHeightLG: !0
  }
});
function gl(e, t, o, r) {
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
function pl(e, t, o) {
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
function ml(e, t = {
  focus: !0
}) {
  const {
    componentCls: o
  } = e, {
    componentCls: r
  } = t, n = r || o, i = `${n}-compact`;
  return {
    [i]: {
      ...gl(e, i, t, n),
      ...pl(n, i, t)
    }
  };
}
function bl(e, t, o) {
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
function yl(e, t) {
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
function Sl(e) {
  const t = `${e.componentCls}-compact-vertical`;
  return {
    [t]: {
      ...bl(e, t, e.componentCls),
      ...yl(e.componentCls, t)
    }
  };
}
const xl = (e) => {
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
}, vl = ec(["Button", "compact"], (e) => {
  const t = xi(e);
  return [
    // Space Compact
    ml(t),
    Sl(t),
    xl(t)
  ];
}, vi);
function Cl(e) {
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
const $l = {
  default: ["default", "outlined"],
  primary: ["primary", "solid"],
  dashed: ["default", "dashed"],
  // `link` is not a real color but we should compatible with it
  link: ["link", "link"],
  text: ["default", "text"]
}, wl = /* @__PURE__ */ R.forwardRef((e, t) => {
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
    className: d,
    rootClassName: p,
    children: y,
    icon: b,
    iconPosition: $,
    iconPlacement: m,
    ghost: g = !1,
    block: T = !1,
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    htmlType: S = "button",
    classNames: C,
    styles: w,
    style: h,
    autoInsertSpace: x,
    autoFocus: H,
    ...E
  } = e, I = gr(y), A = a || "default", {
    button: _
  } = R.useContext($e), V = u || (_ == null ? void 0 : _.shape) || "default", [q, ee] = dt(() => {
    if (i && s)
      return [i, s];
    if (a || c) {
      const W = $l[A] || [];
      return c ? ["danger", W[1]] : W;
    }
    return _ != null && _.color && (_ != null && _.variant) ? [_.color, _.variant] : ["default", "outlined"];
  }, [i, s, a, c, _ == null ? void 0 : _.color, _ == null ? void 0 : _.variant, A]), [te, re] = dt(() => g && ee === "solid" ? [q, "outlined"] : [q, ee], [q, ee, g]), be = te === "danger", oe = be ? "dangerous" : te, {
    getPrefixCls: Ie,
    direction: K,
    autoInsertSpace: Xe,
    className: Te,
    style: Q,
    classNames: ce,
    styles: F
  } = us("button"), B = x ?? Xe ?? !0, z = Ie("btn", n), [ye, fe] = hl(z), Wt = Ce(Pc), le = f ?? Wt, nt = Ce(yi), Pe = dt(() => Cl(r), [r]), [de, ao] = vo(Pe.loading), [Gt, co] = vo(!1), Ue = pe(null), lo = Zi(t, Ue), uo = I.length === 1 && !b && !cr(re), Vt = pe(!0);
  R.useEffect(() => (Vt.current = !1, () => {
    Vt.current = !0;
  }), []), Wi(() => {
    let W = null;
    Pe.delay > 0 ? W = setTimeout(() => {
      W = null, ao(!0);
    }, Pe.delay) : ao(Pe.loading);
    function it() {
      W && (clearTimeout(W), W = null);
    }
    return it;
  }, [Pe.delay, Pe.loading]), Me(() => {
    if (!Ue.current || !B)
      return;
    const W = Ue.current.textContent || "";
    uo && Wr(W) ? Gt || co(!0) : Gt && co(!1);
  }), Me(() => {
    H && Ue.current && Ue.current.focus();
  }, []);
  const fo = R.useCallback((W) => {
    var it;
    if (de || le) {
      W.preventDefault();
      return;
    }
    (it = e.onClick) == null || it.call(e, ("href" in e, W));
  }, [e.onClick, de, le]), {
    compactSize: $i,
    compactItemClassnames: ho
  } = qc(z, K), wi = {
    large: "lg",
    small: "sm",
    middle: void 0
  }, Xt = Xc((W) => l ?? $i ?? nt ?? W), go = Xt ? wi[Xt] ?? "" : "", Ti = de ? "loading" : b, po = m ?? $ ?? "start", Ut = ns(E, ["navigate"]), Ei = {
    ...e,
    type: A,
    color: te,
    variant: re,
    danger: be,
    shape: V,
    size: Xt,
    disabled: le,
    loading: de,
    iconPlacement: po
  }, [qt, Qt] = Rc([o ? void 0 : ce, C], [o ? void 0 : F, w], {
    props: Ei
  }), mo = U(z, ye, fe, {
    [`${z}-${V}`]: V !== "default" && V !== "square" && V,
    // Compatible with versions earlier than 5.21.0
    [`${z}-${A}`]: A,
    [`${z}-dangerous`]: c,
    [`${z}-color-${oe}`]: oe,
    [`${z}-variant-${re}`]: re,
    [`${z}-${go}`]: go,
    [`${z}-icon-only`]: !y && y !== 0 && !!Ti,
    [`${z}-background-ghost`]: g && !cr(re),
    [`${z}-loading`]: de,
    [`${z}-two-chinese-chars`]: Gt && B && !de,
    [`${z}-block`]: T,
    [`${z}-rtl`]: K === "rtl",
    [`${z}-icon-end`]: po === "end"
  }, ho, d, p, Te, qt.root), bo = {
    ...Qt.root,
    ...Q,
    ...h
  }, yo = {
    className: qt.icon,
    style: Qt.icon
  }, So = (W) => /* @__PURE__ */ R.createElement(Si, {
    prefixCls: z,
    ...yo
  }, W), Mi = /* @__PURE__ */ R.createElement(Zc, {
    existIcon: !!b,
    prefixCls: z,
    loading: de,
    mount: Vt.current,
    ...yo
  });
  let qe;
  b && !de ? qe = So(b) : r && typeof r == "object" && r.icon ? qe = So(r.icon) : qe = Mi;
  const xo = wc(y) ? Yc(y, uo && B, Qt.content, qt.content) : null;
  if (Ut.href !== void 0)
    return /* @__PURE__ */ R.createElement("a", {
      ...Ut,
      className: U(mo, {
        [`${z}-disabled`]: le
      }),
      href: le ? void 0 : Ut.href,
      style: bo,
      onClick: fo,
      ref: lo,
      tabIndex: le ? -1 : 0,
      "aria-disabled": le
    }, qe, xo);
  let Kt = /* @__PURE__ */ R.createElement("button", {
    ...E,
    type: S,
    className: mo,
    style: bo,
    onClick: fo,
    disabled: le,
    ref: lo
  }, qe, xo, ho && /* @__PURE__ */ R.createElement(vl, {
    prefixCls: z
  }));
  return cr(re) || (Kt = /* @__PURE__ */ R.createElement(Vc, {
    component: "Button",
    disabled: de
  }, Kt)), Kt;
}), so = wl;
so.Group = Qc;
so.__ANT_BUTTON = !0;
const Ci = {
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
}, Tl = {
  background_color: "primary",
  color: "text",
  border: "border"
}, El = {
  grid: {
    desktop: { width: 4, height: 4 },
    mobile: { width: 6, height: 4 }
  },
  resizable: { width: !0, height: !0 }
}, Ml = (e) => [
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
function Rl(e) {
  return {
    name: "Button",
    EditProperties: Ml(e),
    Configuration: El,
    ThemeMapping: Tl,
    defaultProps: Ci
  };
}
function Hl(e) {
  const { ElementTypes: t, executeFlow: o } = e;
  return {
    component: (n) => {
      const { id: i, _mode: s, grid: a, properties: c, meta: u, updateProperties: l, onFxChange: f, ...d } = n, p = { ...Ci, ...c }, {
        loading: y,
        text: b,
        background_color: $,
        padding: m,
        border: g,
        border_radius: T,
        color: S,
        margin: C,
        text_align: w,
        fontSize: h,
        fontWeight: x
      } = p, H = typeof y == "string" ? Number(y) : y, E = (q) => {
        console.log("Button Clicked for custom flow event", q);
      }, I = Array.isArray(C) ? C : ["0px", "0px", "0px", "0px"], A = Array.isArray(m) ? m : ["0px", "0px", "0px", "0px"], _ = Array.isArray(T) ? T : ["0px", "0px", "0px", "0px"];
      return /* @__PURE__ */ Di.jsx(
        so,
        {
          loading: !!H,
          onClick: E,
          style: {
            backgroundColor: `var(--background-color, ${$})`,
            border: g,
            borderRadius: `${_[0]} ${_[1]} ${_[2]} ${_[3]}`,
            margin: `${I[0]} ${I[1]} ${I[2]} ${I[3]}`,
            padding: `${A[0]} ${A[1]} ${A[2]} ${A[3]}`,
            color: `var(--text-color, ${S})`,
            textAlign: w,
            width: "100%",
            height: "100%",
            fontSize: h,
            fontWeight: x
          },
          children: b
        }
      );
    },
    manifest: Rl(t)
  };
}
export {
  El as Configuration,
  Tl as ThemeMapping,
  Hl as createComponent,
  Ci as defaultProps
};
