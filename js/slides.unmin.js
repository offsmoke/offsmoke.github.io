window.pluginsAttached ? alert("Attention: plugins.js library is attached twice and needs to be removed. The slides.min.js already contains both of scripts.") : (window.pluginsAttached = 1),
    (function (e) {
        e.extend(e, {
            cacheImage: function (t, i) {
                if ("object" != typeof t) {
                    var n = new Image();
                    return (
                        (i = i || {}),
                        e.each(["load", "error", "abort"], function () {
                            var t = String(this);
                            "function" == typeof i[t] && e(n).bind(t, i[t]), "function" == typeof i.complete && e(n).bind(t, i.complete);
                        }),
                        (n.src = t),
                        n
                    );
                }
                e.each(t, function () {
                    e.cacheImage(String(this), i);
                });
            },
        }),
            e.extend(e.fn, {
                cacheImage: function (t) {
                    return this.each(function () {
                        e.cacheImage(this.src, t);
                    });
                },
            });
    })(jQuery),
    ($.fn.redraw = function () {
        $(this).each(function () {
            this.offsetHeight;
        });
    }),
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? (module.exports = e) : e(jQuery);
    })(function (e) {
        function t(t) {
            var s = t || window.event,
                r = l.call(arguments, 1),
                d = 0,
                u = 0,
                h = 0,
                p = 0,
                f = 0,
                m = 0;
            if (
                (((t = e.event.fix(s)).type = "mousewheel"),
                "detail" in s && (h = -1 * s.detail),
                "wheelDelta" in s && (h = s.wheelDelta),
                "wheelDeltaY" in s && (h = s.wheelDeltaY),
                "wheelDeltaX" in s && (u = -1 * s.wheelDeltaX),
                "axis" in s && s.axis === s.HORIZONTAL_AXIS && ((u = -1 * h), (h = 0)),
                (d = 0 === h ? u : h),
                "deltaY" in s && (d = h = -1 * s.deltaY),
                "deltaX" in s && ((u = s.deltaX), 0 === h && (d = -1 * u)),
                0 !== h || 0 !== u)
            ) {
                if (1 === s.deltaMode) {
                    var w = e.data(this, "mousewheel-line-height");
                    (d *= w), (h *= w), (u *= w);
                } else if (2 === s.deltaMode) {
                    var g = e.data(this, "mousewheel-page-height");
                    (d *= g), (h *= g), (u *= g);
                }
                if (
                    ((p = Math.max(Math.abs(h), Math.abs(u))),
                    (!a || a > p) && ((a = p), n(s, p) && (a /= 40)),
                    n(s, p) && ((d /= 40), (u /= 40), (h /= 40)),
                    (d = Math[d >= 1 ? "floor" : "ceil"](d / a)),
                    (u = Math[u >= 1 ? "floor" : "ceil"](u / a)),
                    (h = Math[h >= 1 ? "floor" : "ceil"](h / a)),
                    c.settings.normalizeOffset && this.getBoundingClientRect)
                ) {
                    var v = this.getBoundingClientRect();
                    (f = t.clientX - v.left), (m = t.clientY - v.top);
                }
                return (
                    (t.deltaX = u),
                    (t.deltaY = h),
                    (t.deltaFactor = a),
                    (t.offsetX = f),
                    (t.offsetY = m),
                    (t.deltaMode = 0),
                    r.unshift(t, d, u, h),
                    o && clearTimeout(o),
                    (o = setTimeout(i, 200)),
                    (e.event.dispatch || e.event.handle).apply(this, r)
                );
            }
        }
        function i() {
            a = null;
        }
        function n(e, t) {
            return c.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0;
        }
        var o,
            a,
            s = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            l = Array.prototype.slice;
        if (e.event.fixHooks) for (var d = s.length; d; ) e.event.fixHooks[s[--d]] = e.event.mouseHooks;
        var c = (e.event.special.mousewheel = {
            version: "3.1.12",
            setup: function () {
                if (this.addEventListener) for (var i = r.length; i; ) this.addEventListener(r[--i], t, !1);
                else this.onmousewheel = t;
                e.data(this, "mousewheel-line-height", c.getLineHeight(this)), e.data(this, "mousewheel-page-height", c.getPageHeight(this));
            },
            teardown: function () {
                if (this.removeEventListener) for (var i = r.length; i; ) this.removeEventListener(r[--i], t, !1);
                else this.onmousewheel = null;
                e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height");
            },
            getLineHeight: function (t) {
                var i = e(t),
                    n = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16;
            },
            getPageHeight: function (t) {
                return e(t).height();
            },
            settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
        });
        e.fn.extend({
            mousewheel: function (e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel");
            },
            unmousewheel: function (e) {
                return this.unbind("mousewheel", e);
            },
        });
    }),
    ($.fn.removeClassByPrefix = function (e) {
        return (
            this.each(function (t, i) {
                var n = i.className.split(" ").filter(function (t) {
                    return 0 !== t.lastIndexOf(e, 0);
                });
                i.className = $.trim(n.join(" "));
            }),
            this
        );
    }),
    (function (e, t) {
        var i = {
            eventName: "resizeEnd",
            delay: 250,
            poll: function () {
                var t = e(this),
                    n = t.data(i.eventName);
                n.timeoutId && window.clearTimeout(n.timeoutId),
                    (n.timeoutId = window.setTimeout(function () {
                        t.trigger(i.eventName);
                    }, i.delay));
            },
        };
        (e.event.special[i.eventName] = {
            setup: function () {
                var t = e(this);
                t.data(i.eventName, {}), t.on("resize", i.poll);
            },
            teardown: function () {
                var t = e(this),
                    n = t.data(i.eventName);
                n.timeoutId && window.clearTimeout(n.timeoutId), t.removeData(i.eventName), t.off("resize", i.poll);
            },
        }),
            (e.fn[i.eventName] = function (e, t) {
                return arguments.length > 0 ? this.on(i.eventName, null, e, t) : this.trigger(i.eventName);
            });
    })(jQuery),
    (function (e) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery);
    })(function (e) {
        var t = "left",
            i = "right",
            n = "up",
            o = "down",
            a = "in",
            s = "out",
            r = "none",
            l = "auto",
            d = "swipe",
            c = "pinch",
            u = "tap",
            h = "doubletap",
            p = "longtap",
            f = "horizontal",
            m = "vertical",
            w = "all",
            g = "start",
            v = "move",
            _ = "end",
            y = "cancel",
            b = "ontouchstart" in window,
            T = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
            x = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            C = "TouchSwipe";
        function S(t) {
            return (
                !t || void 0 !== t.allowPageScroll || (void 0 === t.swipe && void 0 === t.swipeStatus) || (t.allowPageScroll = r),
                void 0 !== t.click && void 0 === t.tap && (t.tap = t.click),
                t || (t = {}),
                (t = e.extend({}, e.fn.swipe.defaults, t)),
                this.each(function () {
                    var i = e(this),
                        n = i.data(C);
                    n || ((n = new $(this, t)), i.data(C, n));
                })
            );
        }
        function $(S, $) {
            var k = b || x || !$.fallbackToMouseEvents,
                P = k ? (x ? (T ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
                E = k ? (x ? (T ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
                I = k ? (x ? (T ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
                A = k ? null : "mouseleave",
                M = x ? (T ? "MSPointerCancel" : "pointercancel") : "touchcancel",
                O = 0,
                D = null,
                L = 0,
                j = 0,
                z = 0,
                R = 1,
                N = 0,
                H = 0,
                B = null,
                F = e(S),
                W = "start",
                q = 0,
                U = null,
                X = 0,
                Y = 0,
                Q = 0,
                Z = 0,
                K = 0,
                G = null,
                V = null;
            try {
                F.bind(P, J), F.bind(M, ie);
            } catch (t) {
                e.error("events not supported " + P + "," + M + " on jQuery.swipe");
            }
            function J(a) {
                if (!0 !== F.data(C + "_intouch") && !(e(a.target).closest($.excludedElements, F).length > 0)) {
                    var s,
                        r = a.originalEvent ? a.originalEvent : a,
                        l = b ? r.touches[0] : r;
                    return (
                        (W = g),
                        b ? (q = r.touches.length) : a.preventDefault(),
                        (O = 0),
                        (D = null),
                        (H = null),
                        (L = 0),
                        (j = 0),
                        (z = 0),
                        (R = 1),
                        (N = 0),
                        (U = (function () {
                            for (var e = [], t = 0; t <= 5; t++) e.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 });
                            return e;
                        })()),
                        (B = (function () {
                            var e = {};
                            return (e[t] = $e(t)), (e[i] = $e(i)), (e.up = $e(n)), (e[o] = $e(o)), e;
                        })()),
                        ye(),
                        !b || q === $.fingers || $.fingers === w || he() ? (xe(0, l), (X = Ee()), 2 == q && (xe(1, r.touches[1]), (j = z = Pe(U[0].start, U[1].start))), ($.swipeStatus || $.pinchStatus) && (s = se(r, W))) : (s = !1),
                        !1 === s
                            ? (se(r, (W = y)), s)
                            : ($.hold &&
                                  (V = setTimeout(
                                      e.proxy(function () {
                                          F.trigger("hold", [r.target]), $.hold && (s = $.hold.call(F, r, r.target));
                                      }, this),
                                      $.longTapThreshold
                                  )),
                              Te(!0),
                              null)
                    );
                }
            }
            function ee(d) {
                var c = d.originalEvent ? d.originalEvent : d;
                if (W !== _ && W !== y && !be()) {
                    var u,
                        h = Ce(b ? c.touches[0] : c);
                    if (
                        ((Y = Ee()),
                        b && (q = c.touches.length),
                        $.hold && clearTimeout(V),
                        (W = v),
                        2 == q &&
                            (0 == j ? (xe(1, c.touches[1]), (j = z = Pe(U[0].start, U[1].start))) : (Ce(c.touches[1]), (z = Pe(U[0].end, U[1].end)), U[0].end, U[1].end, (H = R < 1 ? s : a)),
                            (R = (function (e, t) {
                                return ((t / e) * 1).toFixed(2);
                            })(j, z)),
                            (N = Math.abs(j - z))),
                        q === $.fingers || $.fingers === w || !b || he())
                    ) {
                        if (
                            ((function (e, a) {
                                if ($.allowPageScroll === r || he()) e.preventDefault();
                                else {
                                    var s = $.allowPageScroll === l;
                                    switch (a) {
                                        case t:
                                            (($.swipeLeft && s) || (!s && $.allowPageScroll != f)) && e.preventDefault();
                                            break;
                                        case i:
                                            (($.swipeRight && s) || (!s && $.allowPageScroll != f)) && e.preventDefault();
                                            break;
                                        case n:
                                            (($.swipeUp && s) || (!s && $.allowPageScroll != m)) && e.preventDefault();
                                            break;
                                        case o:
                                            (($.swipeDown && s) || (!s && $.allowPageScroll != m)) && e.preventDefault();
                                    }
                                }
                            })(
                                d,
                                (D = (function (e, a) {
                                    var s = (function (e, t) {
                                        var i = e.x - t.x,
                                            n = t.y - e.y,
                                            o = Math.atan2(n, i),
                                            a = Math.round((180 * o) / Math.PI);
                                        a < 0 && (a = 360 - Math.abs(a));
                                        return a;
                                    })(e, a);
                                    return (s <= 45 && s >= 0) || (s <= 360 && s >= 315) ? t : s >= 135 && s <= 225 ? i : s > 45 && s < 135 ? o : n;
                                })(h.start, h.end))
                            ),
                            (O = (function (e, t) {
                                return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)));
                            })(h.start, h.end)),
                            (L = ke()),
                            (function (e, t) {
                                (t = Math.max(t, Se(e))), (B[e].distance = t);
                            })(D, O),
                            ($.swipeStatus || $.pinchStatus) && (u = se(c, W)),
                            !$.triggerOnTouchEnd || $.triggerOnTouchLeave)
                        ) {
                            var p = !0;
                            if ($.triggerOnTouchLeave) {
                                var g = (function (t) {
                                    var i = (t = e(t)).offset();
                                    return { left: i.left, right: i.left + t.outerWidth(), top: i.top, bottom: i.top + t.outerHeight() };
                                })(this);
                                p = (function (e, t) {
                                    return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom;
                                })(h.end, g);
                            }
                            !$.triggerOnTouchEnd && p ? (W = ae(v)) : $.triggerOnTouchLeave && !p && (W = ae(_)), (W != y && W != _) || se(c, W);
                        }
                    } else se(c, (W = y));
                    !1 === u && se(c, (W = y));
                }
            }
            function te(e) {
                var t = e.originalEvent;
                return b && t.touches.length > 0
                    ? ((Q = Ee()), (Z = event.touches.length + 1), !0)
                    : (be() && (q = Z),
                      (Y = Ee()),
                      (L = ke()),
                      de() || !le() ? se(t, (W = y)) : $.triggerOnTouchEnd || (0 == $.triggerOnTouchEnd && W === v) ? (e.preventDefault(), se(t, (W = _))) : !$.triggerOnTouchEnd && ge() ? re(t, (W = _), u) : W === v && se(t, (W = y)),
                      Te(!1),
                      null);
            }
            function ie() {
                (q = 0), (Y = 0), (X = 0), (j = 0), (z = 0), (R = 1), ye(), Te(!1);
            }
            function ne(e) {
                var t = e.originalEvent;
                $.triggerOnTouchLeave && se(t, (W = ae(_)));
            }
            function oe() {
                F.unbind(P, J), F.unbind(M, ie), F.unbind(E, ee), F.unbind(I, te), A && F.unbind(A, ne), Te(!1);
            }
            function ae(e) {
                var t = e,
                    i = ce(),
                    n = le(),
                    o = de();
                return !i || o ? (t = y) : !n || e != v || ($.triggerOnTouchEnd && !$.triggerOnTouchLeave) ? !n && e == _ && $.triggerOnTouchLeave && (t = y) : (t = _), t;
            }
            function se(e, t) {
                var i = void 0;
                return (
                    (pe() && fe()) || fe() ? (i = re(e, t, d)) : ((ue() && he()) || he()) && !1 !== i && (i = re(e, t, c)),
                    _e() && ve() && !1 !== i ? (i = re(e, t, h)) : L > $.longTapThreshold && O < 10 && $.longTap && !1 !== i ? (i = re(e, t, p)) : (1 !== q && b) || !(isNaN(O) || O < $.threshold) || !ge() || !1 === i || (i = re(e, t, u)),
                    t === y && ie(),
                    t === _ && (b ? 0 == e.touches.length && ie() : ie()),
                    i
                );
            }
            function re(r, l, f) {
                var m = void 0;
                if (f == d) {
                    if ((F.trigger("swipeStatus", [l, D || null, O || 0, L || 0, q, U]), $.swipeStatus && !1 === (m = $.swipeStatus.call(F, r, l, D || null, O || 0, L || 0, q, U)))) return !1;
                    if (l == _ && pe()) {
                        if ((F.trigger("swipe", [D, O, L, q, U]), $.swipe && !1 === (m = $.swipe.call(F, r, D, O, L, q, U)))) return !1;
                        switch (D) {
                            case t:
                                F.trigger("swipeLeft", [D, O, L, q, U]), $.swipeLeft && (m = $.swipeLeft.call(F, r, D, O, L, q, U));
                                break;
                            case i:
                                F.trigger("swipeRight", [D, O, L, q, U]), $.swipeRight && (m = $.swipeRight.call(F, r, D, O, L, q, U));
                                break;
                            case n:
                                F.trigger("swipeUp", [D, O, L, q, U]), $.swipeUp && (m = $.swipeUp.call(F, r, D, O, L, q, U));
                                break;
                            case o:
                                F.trigger("swipeDown", [D, O, L, q, U]), $.swipeDown && (m = $.swipeDown.call(F, r, D, O, L, q, U));
                        }
                    }
                }
                if (f == c) {
                    if ((F.trigger("pinchStatus", [l, H || null, N || 0, L || 0, q, R, U]), $.pinchStatus && !1 === (m = $.pinchStatus.call(F, r, l, H || null, N || 0, L || 0, q, R, U)))) return !1;
                    if (l == _ && ue())
                        switch (H) {
                            case a:
                                F.trigger("pinchIn", [H || null, N || 0, L || 0, q, R, U]), $.pinchIn && (m = $.pinchIn.call(F, r, H || null, N || 0, L || 0, q, R, U));
                                break;
                            case s:
                                F.trigger("pinchOut", [H || null, N || 0, L || 0, q, R, U]), $.pinchOut && (m = $.pinchOut.call(F, r, H || null, N || 0, L || 0, q, R, U));
                        }
                }
                return (
                    f == u
                        ? (l !== y && l !== _) ||
                          (clearTimeout(G),
                          clearTimeout(V),
                          ve() && !_e()
                              ? ((K = Ee()),
                                (G = setTimeout(
                                    e.proxy(function () {
                                        (K = null), F.trigger("tap", [r.target]), $.tap && (m = $.tap.call(F, r, r.target));
                                    }, this),
                                    $.doubleTapThreshold
                                )))
                              : ((K = null), F.trigger("tap", [r.target]), $.tap && (m = $.tap.call(F, r, r.target))))
                        : f == h
                        ? (l !== y && l !== _) || (clearTimeout(G), (K = null), F.trigger("doubletap", [r.target]), $.doubleTap && (m = $.doubleTap.call(F, r, r.target)))
                        : f == p && ((l !== y && l !== _) || (clearTimeout(G), (K = null), F.trigger("longtap", [r.target]), $.longTap && (m = $.longTap.call(F, r, r.target)))),
                    m
                );
            }
            function le() {
                var e = !0;
                return null !== $.threshold && (e = O >= $.threshold), e;
            }
            function de() {
                var e = !1;
                return null !== $.cancelThreshold && null !== D && (e = Se(D) - O >= $.cancelThreshold), e;
            }
            function ce() {
                return !$.maxTimeThreshold || !(L >= $.maxTimeThreshold);
            }
            function ue() {
                var e = me(),
                    t = we(),
                    i = null === $.pinchThreshold || N >= $.pinchThreshold;
                return e && t && i;
            }
            function he() {
                return !!($.pinchStatus || $.pinchIn || $.pinchOut);
            }
            function pe() {
                var e = ce(),
                    t = le(),
                    i = me(),
                    n = we();
                return !de() && n && i && t && e;
            }
            function fe() {
                return !!($.swipe || $.swipeStatus || $.swipeLeft || $.swipeRight || $.swipeUp || $.swipeDown);
            }
            function me() {
                return q === $.fingers || $.fingers === w || !b;
            }
            function we() {
                return 0 !== U[0].end.x;
            }
            function ge() {
                return !!$.tap;
            }
            function ve() {
                return !!$.doubleTap;
            }
            function _e() {
                if (null == K) return !1;
                var e = Ee();
                return ve() && e - K <= $.doubleTapThreshold;
            }
            function ye() {
                (Q = 0), (Z = 0);
            }
            function be() {
                var e = !1;
                Q && Ee() - Q <= $.fingerReleaseThreshold && (e = !0);
                return e;
            }
            function Te(e) {
                !0 === e ? (F.bind(E, ee), F.bind(I, te), A && F.bind(A, ne)) : (F.unbind(E, ee, !1), F.unbind(I, te, !1), A && F.unbind(A, ne, !1)), F.data(C + "_intouch", !0 === e);
            }
            function xe(e, t) {
                var i = void 0 !== t.identifier ? t.identifier : 0;
                return (U[e].identifier = i), (U[e].start.x = U[e].end.x = t.pageX || t.clientX), (U[e].start.y = U[e].end.y = t.pageY || t.clientY), U[e];
            }
            function Ce(e) {
                var t = (function (e) {
                    for (var t = 0; t < U.length; t++) if (U[t].identifier == e) return U[t];
                })(void 0 !== e.identifier ? e.identifier : 0);
                return (t.end.x = e.pageX || e.clientX), (t.end.y = e.pageY || e.clientY), t;
            }
            function Se(e) {
                if (B[e]) return B[e].distance;
            }
            function $e(e) {
                return { direction: e, distance: 0 };
            }
            function ke() {
                return Y - X;
            }
            function Pe(e, t) {
                var i = Math.abs(e.x - t.x),
                    n = Math.abs(e.y - t.y);
                return Math.round(Math.sqrt(i * i + n * n));
            }
            function Ee() {
                return new Date().getTime();
            }
            (this.enable = function () {
                return F.bind(P, J), F.bind(M, ie), F;
            }),
                (this.disable = function () {
                    return oe(), F;
                }),
                (this.destroy = function () {
                    return oe(), F.data(C, null), F;
                }),
                (this.option = function (t, i) {
                    if (void 0 !== $[t]) {
                        if (void 0 === i) return $[t];
                        $[t] = i;
                    } else e.error("Option " + t + " does not exist on jQuery.swipe.options");
                    return null;
                });
        }
        (e.fn.swipe = function (t) {
            var i = e(this),
                n = i.data(C);
            if (n && "string" == typeof t) {
                if (n[t]) return n[t].apply(this, Array.prototype.slice.call(arguments, 1));
                e.error("Method " + t + " does not exist on jQuery.swipe");
            } else if (!(n || ("object" != typeof t && t))) return S.apply(this, arguments);
            return i;
        }),
            (e.fn.swipe.defaults = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                hold: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: "label, button, input, select, textarea, a, .noSwipe",
            }),
            (e.fn.swipe.phases = { PHASE_START: g, PHASE_MOVE: v, PHASE_END: _, PHASE_CANCEL: y }),
            (e.fn.swipe.directions = { LEFT: t, RIGHT: i, UP: n, DOWN: o, IN: a, OUT: s }),
            (e.fn.swipe.pageScroll = { NONE: r, HORIZONTAL: f, VERTICAL: m, AUTO: l }),
            (e.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: w });
    }),
    (function (t, i, n, o) {
        var a = "sharrre",
            r = {
                className: "sharrre",
                share: { googlePlus: !1, facebook: !1, twitter: !1, digg: !1, delicious: !1, stumbleupon: !1, linkedin: !1, pinterest: !1 },
                shareTotal: 0,
                template: "",
                title: "",
                url: n.location.href,
                text: n.title,
                urlCurl: "sharrre.php",
                count: {},
                total: 0,
                shorterTotal: !0,
                enableHover: !0,
                enableCounter: !0,
                enableTracking: !1,
                hover: function () {},
                hide: function () {},
                click: function () {},
                render: function () {},
                buttons: {
                    googlePlus: { url: "", urlCount: !1, size: "medium", lang: "en-US", annotation: "" },
                    facebook: { url: "", urlCount: !1, action: "like", layout: "button_count", width: "", send: "false", faces: "false", colorscheme: "", font: "", lang: "en_US" },
                    twitter: { url: "", urlCount: !1, count: "horizontal", hashtags: "", via: "", related: "", lang: "en" },
                    digg: { url: "", urlCount: !1, type: "DiggCompact" },
                    delicious: { url: "", urlCount: !1, size: "medium" },
                    stumbleupon: { url: "", urlCount: !1, layout: "1" },
                    linkedin: { url: "", urlCount: !1, counter: "" },
                    pinterest: { url: "", media: "", description: "", layout: "horizontal" },
                },
            },
            l = {
                googlePlus: "",
                facebook:
                    "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
                twitter: "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
                digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
                delicious: "http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",
                stumbleupon: "",
                linkedin: "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
                pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
            },
            d = {
                googlePlus: function (e) {
                    var o = e.options.buttons.googlePlus;
                    t(e.element)
                        .find(".buttons")
                        .append('<div class="button googleplus"><div class="g-plusone" data-size="' + o.size + '" data-href="' + ("" !== o.url ? o.url : e.options.url) + '" data-annotation="' + o.annotation + '"></div></div>'),
                        (i.___gcfg = { lang: e.options.buttons.googlePlus.lang });
                    var a = 0;
                    "undefined" == typeof gapi && 0 == a
                        ? ((a = 1),
                          (function () {
                              var e = n.createElement("script");
                              (e.type = "text/javascript"), (e.async = !0), (e.src = "//apis.google.com/js/plusone.js");
                              var t = n.getElementsByTagName("script")[0];
                              t.parentNode.insertBefore(e, t);
                          })())
                        : gapi.plusone.go();
                },
                facebook: function (e) {
                    var i = e.options.buttons.facebook;
                    t(e.element)
                        .find(".buttons")
                        .append(
                            '<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="' +
                                ("" !== i.url ? i.url : e.options.url) +
                                '" data-send="' +
                                i.send +
                                '" data-layout="' +
                                i.layout +
                                '" data-width="' +
                                i.width +
                                '" data-show-faces="' +
                                i.faces +
                                '" data-action="' +
                                i.action +
                                '" data-colorscheme="' +
                                i.colorscheme +
                                '" data-font="' +
                                i.font +
                                '" data-via="' +
                                i.via +
                                '"></div></div>'
                        );
                    var o,
                        a,
                        s,
                        r,
                        l,
                        d = 0;
                    "undefined" == typeof FB && 0 == d
                        ? ((d = 1),
                          (a = "script"),
                          (s = "facebook-jssdk"),
                          (l = (o = n).getElementsByTagName(a)[0]),
                          o.getElementById(s) || (((r = o.createElement(a)).id = s), (r.src = "//connect.facebook.net/" + i.lang + "/all.js#xfbml=1"), l.parentNode.insertBefore(r, l)))
                        : FB.XFBML.parse();
                },
                twitter: function (e) {
                    var i = e.options.buttons.twitter;
                    t(e.element)
                        .find(".buttons")
                        .append(
                            '<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' +
                                ("" !== i.url ? i.url : e.options.url) +
                                '" data-count="' +
                                i.count +
                                '" data-text="' +
                                e.options.text +
                                '" data-via="' +
                                i.via +
                                '" data-hashtags="' +
                                i.hashtags +
                                '" data-related="' +
                                i.related +
                                '" data-lang="' +
                                i.lang +
                                '">Tweet</a></div>'
                        );
                    var o = 0;
                    "undefined" == typeof twttr && 0 == o
                        ? ((o = 1),
                          (function () {
                              var e = n.createElement("script");
                              (e.type = "text/javascript"), (e.async = !0), (e.src = "//platform.twitter.com/widgets.js");
                              var t = n.getElementsByTagName("script")[0];
                              t.parentNode.insertBefore(e, t);
                          })())
                        : t.ajax({ url: "//platform.twitter.com/widgets.js", dataType: "script", cache: !0 });
                },
                digg: function (e) {
                    var i = e.options.buttons.digg;
                    t(e.element)
                        .find(".buttons")
                        .append('<div class="button digg"><a class="DiggThisButton ' + i.type + '" rel="nofollow external" href="http://digg.com/submit?url=' + encodeURIComponent("" !== i.url ? i.url : e.options.url) + '"></a></div>');
                    var o,
                        a,
                        s = 0;
                    "undefined" == typeof __DBW &&
                        0 == s &&
                        ((s = 1), (o = n.createElement("SCRIPT")), (a = n.getElementsByTagName("SCRIPT")[0]), (o.type = "text/javascript"), (o.async = !0), (o.src = "//widgets.digg.com/buttons.js"), a.parentNode.insertBefore(o, a));
                },
                delicious: function (e) {
                    if ("tall" == e.options.buttons.delicious.size)
                        var i = "width:50px;",
                            n = "height:35px;width:50px;font-size:15px;line-height:35px;",
                            o = "height:18px;line-height:18px;margin-top:3px;";
                    else (i = "width:93px;"), (n = "float:right;padding:0 3px;height:20px;width:26px;line-height:20px;"), (o = "float:left;height:20px;line-height:20px;");
                    var a = e.shorterTotal(e.options.count.delicious);
                    void 0 === a && (a = 0),
                        t(e.element)
                            .find(".buttons")
                            .append(
                                '<div class="button delicious"><div style="' +
                                    i +
                                    'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="' +
                                    n +
                                    'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">' +
                                    a +
                                    '</div><div style="' +
                                    o +
                                    'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>'
                            ),
                        t(e.element)
                            .find(".delicious")
                            .on("click", function () {
                                e.openPopup("delicious");
                            });
                },
                stumbleupon: function (e) {
                    var o = e.options.buttons.stumbleupon;
                    t(e.element)
                        .find(".buttons")
                        .append('<div class="button stumbleupon"><su:badge layout="' + o.layout + '" location="' + ("" !== o.url ? o.url : e.options.url) + '"></su:badge></div>');
                    var a = 0;
                    "undefined" == typeof STMBLPN && 0 == a
                        ? ((a = 1),
                          (function () {
                              var e = n.createElement("script");
                              (e.type = "text/javascript"), (e.async = !0), (e.src = "//platform.stumbleupon.com/1/widgets.js");
                              var t = n.getElementsByTagName("script")[0];
                              t.parentNode.insertBefore(e, t);
                          })(),
                          (s = i.setTimeout(function () {
                              "undefined" != typeof STMBLPN && (STMBLPN.processWidgets(), clearInterval(s));
                          }, 500)))
                        : STMBLPN.processWidgets();
                },
                linkedin: function (e) {
                    var o = e.options.buttons.linkedin;
                    t(e.element)
                        .find(".buttons")
                        .append('<div class="button linkedin"><script type="in/share" data-url="' + ("" !== o.url ? o.url : e.options.url) + '" data-counter="' + o.counter + '"></script></div>');
                    var a = 0;
                    void 0 === i.IN && 0 == a
                        ? ((a = 1),
                          (function () {
                              var e = n.createElement("script");
                              (e.type = "text/javascript"), (e.async = !0), (e.src = "//platform.linkedin.com/in.js");
                              var t = n.getElementsByTagName("script")[0];
                              t.parentNode.insertBefore(e, t);
                          })())
                        : i.IN.init();
                },
                pinterest: function (e) {
                    var i = e.options.buttons.pinterest;
                    t(e.element)
                        .find(".buttons")
                        .append(
                            '<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url=' +
                                ("" !== i.url ? i.url : e.options.url) +
                                "&media=" +
                                i.media +
                                "&description=" +
                                i.description +
                                '" class="pin-it-button" count-layout="' +
                                i.layout +
                                '">Pin It</a></div>'
                        ),
                        (function () {
                            var e = n.createElement("script");
                            (e.type = "text/javascript"), (e.async = !0), (e.src = "//assets.pinterest.com/js/pinit.js");
                            var t = n.getElementsByTagName("script")[0];
                            t.parentNode.insertBefore(e, t);
                        })();
                },
            },
            c = {
                googlePlus: function () {},
                facebook: function () {
                    fb = i.setInterval(function () {
                        "undefined" != typeof FB &&
                            (FB.Event.subscribe("edge.create", function (e) {
                                _gaq.push(["_trackSocial", "facebook", "like", e]);
                            }),
                            FB.Event.subscribe("edge.remove", function (e) {
                                _gaq.push(["_trackSocial", "facebook", "unlike", e]);
                            }),
                            FB.Event.subscribe("message.send", function (e) {
                                _gaq.push(["_trackSocial", "facebook", "send", e]);
                            }),
                            clearInterval(fb));
                    }, 1e3);
                },
                twitter: function () {
                    tw = i.setInterval(function () {
                        "undefined" != typeof twttr &&
                            (twttr.events.bind("tweet", function (e) {
                                e && _gaq.push(["_trackSocial", "twitter", "tweet"]);
                            }),
                            clearInterval(tw));
                    }, 1e3);
                },
                digg: function () {},
                delicious: function () {},
                stumbleupon: function () {},
                linkedin: function () {},
                pinterest: function () {},
            },
            u = {
                googlePlus: function (e) {
                    i.open(
                        "https://plus.google.com/share?hl=" + e.buttons.googlePlus.lang + "&url=" + encodeURIComponent("" !== e.buttons.googlePlus.url ? e.buttons.googlePlus.url : e.url),
                        "",
                        "toolbar=0, status=0, width=900, height=500"
                    );
                },
                facebook: function (e) {
                    i.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("" !== e.buttons.facebook.url ? e.buttons.facebook.url : e.url) + "&t=" + e.text, "", "toolbar=0, status=0, width=900, height=500");
                },
                twitter: function (e) {
                    i.open(
                        "https://twitter.com/intent/tweet?text=" +
                            encodeURIComponent(e.text) +
                            "&url=" +
                            encodeURIComponent("" !== e.buttons.twitter.url ? e.buttons.twitter.url : e.url) +
                            ("" !== e.buttons.twitter.via ? "&via=" + e.buttons.twitter.via : ""),
                        "",
                        "toolbar=0, status=0, width=650, height=360"
                    );
                },
                digg: function (e) {
                    i.open(
                        "http://digg.com/tools/diggthis/submit?url=" + encodeURIComponent("" !== e.buttons.digg.url ? e.buttons.digg.url : e.url) + "&title=" + e.text + "&related=true&style=true",
                        "",
                        "toolbar=0, status=0, width=650, height=360"
                    );
                },
                delicious: function (e) {
                    i.open(
                        "http://www.delicious.com/save?v=5&noui&jump=close&url=" + encodeURIComponent("" !== e.buttons.delicious.url ? e.buttons.delicious.url : e.url) + "&title=" + e.text,
                        "delicious",
                        "toolbar=no,width=550,height=550"
                    );
                },
                stumbleupon: function (e) {
                    i.open("http://www.stumbleupon.com/badge/?url=" + encodeURIComponent("" !== e.buttons.delicious.url ? e.buttons.delicious.url : e.url), "stumbleupon", "toolbar=no,width=550,height=550");
                },
                linkedin: function (e) {
                    i.open("https://www.linkedin.com/cws/share?url=" + encodeURIComponent("" !== e.buttons.delicious.url ? e.buttons.delicious.url : e.url) + "&token=&isFramed=true", "linkedin", "toolbar=no,width=550,height=550");
                },
                pinterest: function (e) {
                    i.open(
                        "http://pinterest.com/pin/create/button/?url=" +
                            encodeURIComponent("" !== e.buttons.pinterest.url ? e.buttons.pinterest.url : e.url) +
                            "&media=" +
                            encodeURIComponent(e.buttons.pinterest.media) +
                            "&description=" +
                            e.buttons.pinterest.description,
                        "pinterest",
                        "toolbar=no,width=700,height=300"
                    );
                },
            };
        function h(e, i) {
            (this.element = e), (this.options = t.extend(!0, {}, r, i)), (this.options.share = i.share), (this._defaults = r), (this._name = a), this.init();
        }
        (h.prototype.init = function () {
            var e = this;
            "" !== this.options.urlCurl && ((l.googlePlus = this.options.urlCurl + "?url={url}&type=googlePlus"), (l.stumbleupon = this.options.urlCurl + "?url={url}&type=stumbleupon")),
                t(this.element).addClass(this.options.className),
                void 0 !== t(this.element).data("title") && (this.options.title = t(this.element).attr("data-title")),
                void 0 !== t(this.element).data("url") && (this.options.url = t(this.element).data("url")),
                void 0 !== t(this.element).data("text") && (this.options.text = t(this.element).data("text")),
                t.each(this.options.share, function (t, i) {
                    !0 === i && e.options.shareTotal++;
                }),
                !0 === e.options.enableCounter
                    ? t.each(this.options.share, function (t, i) {
                          if (!0 === i)
                              try {
                                  e.getSocialJson(t);
                              } catch (e) {}
                      })
                    : "" !== e.options.template
                    ? this.options.render(this, this.options)
                    : this.loadButtons(),
                t(this.element).hover(
                    function () {
                        0 === t(this).find(".buttons").length && !0 === e.options.enableHover && e.loadButtons(), e.options.hover(e, e.options);
                    },
                    function () {
                        e.options.hide(e, e.options);
                    }
                ),
                t(this.element).click(function () {
                    return e.options.click(e, e.options), !1;
                });
        }),
            (h.prototype.loadButtons = function () {
                var e = this;
                t(this.element).append('<div class="buttons"></div>'),
                    t.each(e.options.share, function (t, i) {
                        1 == i && (d[t](e), !0 === e.options.enableTracking && c[t]());
                    });
            }),
            (h.prototype.getSocialJson = function (e) {
                var i = this,
                    n = 0,
                    o = l[e].replace("{url}", encodeURIComponent(this.options.url));
                !0 === this.options.buttons[e].urlCount && "" !== this.options.buttons[e].url && (o = l[e].replace("{url}", this.options.buttons[e].url)),
                    "" != o && "" !== i.options.urlCurl
                        ? t
                              .getJSON(o, function (t) {
                                  if (void 0 !== t.count) {
                                      var o = t.count + "";
                                      (o = o.replace("????", "")), (n += parseInt(o, 10));
                                  } else t.data && t.data.length > 0 && void 0 !== t.data[0].total_count ? (n += parseInt(t.data[0].total_count, 10)) : void 0 !== t[0] ? (n += parseInt(t[0].total_posts, 10)) : t[0];
                                  (i.options.count[e] = n), (i.options.total += n), i.renderer(), i.rendererPerso();
                              })
                              .error(function () {
                                  (i.options.count[e] = 0), i.rendererPerso();
                              })
                        : (i.renderer(), (i.options.count[e] = 0), i.rendererPerso());
            }),
            (h.prototype.rendererPerso = function () {
                var t = 0;
                for (e in this.options.count) t++;
                t === this.options.shareTotal && this.options.render(this, this.options);
            }),
            (h.prototype.renderer = function () {
                var e = this.options.total,
                    i = this.options.template;
                !0 === this.options.shorterTotal && (e = this.shorterTotal(e)),
                    "" !== i
                        ? ((i = i.replace("{total}", e)), t(this.element).html(i))
                        : t(this.element).html('<div class="box"><a class="count" href="#">' + e + "</a>" + ("" !== this.options.title ? '<a class="share" href="#">' + this.options.title + "</a>" : "") + "</div>");
            }),
            (h.prototype.shorterTotal = function (e) {
                return e >= 1e6 ? (e = (e / 1e6).toFixed(2) + "M") : e >= 1e3 && (e = (e / 1e3).toFixed(1) + "k"), e;
            }),
            (h.prototype.openPopup = function (e) {
                if ((u[e](this.options), !0 === this.options.enableTracking)) {
                    var t = {
                        googlePlus: { site: "Google", action: "+1" },
                        facebook: { site: "facebook", action: "like" },
                        twitter: { site: "twitter", action: "tweet" },
                        digg: { site: "digg", action: "add" },
                        delicious: { site: "delicious", action: "add" },
                        stumbleupon: { site: "stumbleupon", action: "add" },
                        linkedin: { site: "linkedin", action: "share" },
                        pinterest: { site: "pinterest", action: "pin" },
                    };
                    _gaq.push(["_trackSocial", t[e].site, t[e].action]);
                }
            }),
            (h.prototype.simulateClick = function () {
                var e = t(this.element).html();
                t(this.element).html(e.replace(this.options.total, this.options.total + 1));
            }),
            (h.prototype.update = function (e, t) {
                "" !== e && (this.options.url = e), "" !== t && (this.options.text = t);
            }),
            (t.fn[a] = function (e) {
                var i = arguments;
                return e === o || "object" == typeof e
                    ? this.each(function () {
                          t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new h(this, e));
                      })
                    : "string" == typeof e && "_" !== e[0] && "init" !== e
                    ? this.each(function () {
                          var n = t.data(this, "plugin_" + a);
                          n instanceof h && "function" == typeof n[e] && n[e].apply(n, Array.prototype.slice.call(i, 1));
                      })
                    : void 0;
            });
    })(jQuery, window, document),
    ($.fn.nextOrFirst = function (e) {
        var t = this.next(e);
        return t.length ? t : this.prevAll(e).last();
    }),
    ($.fn.prevOrLast = function (e) {
        var t = this.prev(e);
        return t.length ? t : this.nextAll(e).last();
    }),
    (function (e, t, i) {
        var n,
            o = "hashchange",
            a = document,
            s = e.event.special,
            r = a.documentMode,
            l = "on" + o in t && (r === i || r > 7);
        function d(e) {
            return "#" + (e = e || location.href).replace(/^[^#]*#?(.*)$/, "$1");
        }
        (e.fn[o] = function (e) {
            return e ? this.bind(o, e) : this.trigger(o);
        }),
            (e.fn[o].delay = 50),
            (s[o] = e.extend(s[o], {
                setup: function () {
                    if (l) return !1;
                    e(n.start);
                },
                teardown: function () {
                    if (l) return !1;
                    e(n.stop);
                },
            })),
            (n = (function () {
                var n,
                    a = {},
                    s = d(),
                    r = function (e) {
                        return e;
                    },
                    l = r,
                    c = r;
                function u() {
                    var i = d(),
                        a = c(s);
                    i !== s ? (l((s = i), a), e(t).trigger(o)) : a !== s && (location.href = location.href.replace(/#.*/, "") + a), (n = setTimeout(u, e.fn[o].delay));
                }
                return (
                    (a.start = function () {
                        n || u();
                    }),
                    (a.stop = function () {
                        n && clearTimeout(n), (n = i);
                    }),
                    a
                );
            })());
    })(jQuery, this),
    (function () {
        "use strict";
        var e, t, i, n, o, a;
        function s(e) {
            var t = { top: 0, left: 0 };
            if (!e.offsetParent) return t;
            do {
                (t.left += e.offsetLeft), (t.top += e.offsetTop);
            } while ((e = e.offsetParent));
            return t;
        }
        function r() {
            (this._activeZoom = this._initialScrollPosition = this._initialTouchPosition = this._touchMoveListener = null), (this._document = document), (this._window = window), (this._body = document.body);
        }
        function l(e) {
            (this._fullHeight = this._fullWidth = this._overlay = this._targetImageWrap = null), (this._targetImage = e), (this._body = document.body);
        }
        (r.prototype.listen = function () {
            document.body.addEventListener(
                "click",
                function (e) {
                    "zoom" === e.target.getAttribute("data-action") && this._zoom(e);
                }.bind(this)
            );
        }),
            (r.prototype._zoom = function (o) {
                var a = o.target;
                if (a && "IMG" == a.tagName && !this._body.classList.contains("zoom-overlay-open")) {
                    if (o.metaKey || o.ctrlKey) return window.open(o.target.getAttribute("data-original") || o.target.currentSrc || o.target.src, "_blank");
                    this._activeZoomClose(!0),
                        (this._activeZoom = new l(a)),
                        this._activeZoom.zoomImage(),
                        (e = this._scrollHandler.bind(this)),
                        (t = this._clickHandler.bind(this)),
                        (i = this._keyHandler.bind(this)),
                        (n = this._touchStart.bind(this)),
                        this._window.addEventListener("scroll", e),
                        this._document.addEventListener("click", t),
                        this._document.addEventListener("keyup", i),
                        this._document.addEventListener("touchstart", n),
                        o.stopPropagation();
                }
            }),
            (r.prototype._activeZoomClose = function (o) {
                this._activeZoom &&
                    (o ? this._activeZoom.dispose() : this._activeZoom.close(),
                    this._window.removeEventListener("scroll", e),
                    this._document.removeEventListener("click", t),
                    this._document.removeEventListener("keyup", i),
                    this._document.removeEventListener("touchstart", n),
                    (this._activeZoom = null));
            }),
            (r.prototype._scrollHandler = function (e) {
                null === this._initialScrollPosition && (this._initialScrollPosition = window.scrollY);
                var t = this._initialScrollPosition - window.scrollY;
                Math.abs(t) >= 40 && this._activeZoomClose();
            }),
            (r.prototype._keyHandler = function (e) {
                27 == e.keyCode && this._activeZoomClose();
            }),
            (r.prototype._clickHandler = function (e) {
                e.stopPropagation(), e.preventDefault(), this._activeZoomClose();
            }),
            (r.prototype._touchStart = function (e) {
                (this._initialTouchPosition = e.touches[0].pageY), (o = this._touchMove.bind(this)), e.target.addEventListener("touchmove", o);
            }),
            (r.prototype._touchMove = function (e) {
                Math.abs(e.touches[0].pageY - this._initialTouchPosition) > 10 && (this._activeZoomClose(), e.target.removeEventListener("touchmove", o));
            }),
            (l.OFFSET = 80),
            (l._MAX_WIDTH = 2560),
            (l._MAX_HEIGHT = 4096),
            (l.prototype.zoomImage = function () {
                var e = document.createElement("img");
                (e.onload = function () {
                    (this._fullHeight = Number(e.height)), (this._fullWidth = Number(e.width)), this._zoomOriginal();
                }.bind(this)),
                    (e.src = this._targetImage.currentSrc || this._targetImage.src);
            }),
            (l.prototype._zoomOriginal = function () {
                (this._targetImageWrap = document.createElement("div")),
                    (this._targetImageWrap.className = "zoom-img-wrap"),
                    (this._targetImageWrap.style.position = "absolute"),
                    (this._targetImageWrap.style.top = s(this._targetImage).top + "px"),
                    (this._targetImageWrap.style.left = s(this._targetImage).left + "px"),
                    (this._targetImageClone = this._targetImage.cloneNode()),
                    (this._targetImageClone.style.visibility = "hidden"),
                    (this._targetImage.style.width = this._targetImage.offsetWidth + "px"),
                    this._targetImage.parentNode.replaceChild(this._targetImageClone, this._targetImage),
                    document.body.appendChild(this._targetImageWrap),
                    this._targetImageWrap.appendChild(this._targetImage),
                    this._targetImage.classList.add("zoom-img"),
                    this._targetImage.setAttribute("data-action", "zoom-out"),
                    (this._overlay = document.createElement("div")),
                    (this._overlay.className = "zoom-overlay"),
                    document.body.appendChild(this._overlay),
                    this._calculateZoom(),
                    this._triggerAnimation();
            }),
            (l.prototype._calculateZoom = function () {
                this._targetImage.offsetWidth;
                var e = this._fullWidth,
                    t = this._fullHeight,
                    i = (window.scrollY, e / this._targetImage.width),
                    n = window.innerHeight - l.OFFSET,
                    o = window.innerWidth - l.OFFSET,
                    a = e / t,
                    s = o / n;
                this._imgScaleFactor = e < o && t < n ? i : a < s ? (n / t) * i : (o / e) * i;
            }),
            (l.prototype._triggerAnimation = function () {
                this._targetImage.offsetWidth;
                var e = s(this._targetImage),
                    t = window.scrollY + window.innerHeight / 2,
                    i = window.innerWidth / 2,
                    n = e.top + this._targetImage.height / 2,
                    o = e.left + this._targetImage.width / 2;
                (this._translateY = t - n),
                    (this._translateX = i - o),
                    (this._targetImage.style.webkitTransform = "scale3d(" + this._imgScaleFactor + "," + this._imgScaleFactor + "," + this._imgScaleFactor + ")"),
                    (this._targetImageWrap.style.webkitTransform = "translate(" + this._translateX + "px, " + this._translateY + "px) translateZ(0)"),
                    (this._targetImage.style.msTransform = "scale3d(" + this._imgScaleFactor + "," + this._imgScaleFactor + "," + this._imgScaleFactor + ")"),
                    (this._targetImageWrap.style.msTransform = "translate(" + this._translateX + "px, " + this._translateY + "px) translateZ(0)"),
                    (this._targetImage.style.transform = "scale3d(" + this._imgScaleFactor + "," + this._imgScaleFactor + "," + this._imgScaleFactor + ")"),
                    (this._targetImageWrap.style.transform = "translate(" + this._translateX + "px, " + this._translateY + "px) translateZ(0)"),
                    this._body.classList.add("zoom-overlay-open");
            }),
            (l.prototype.close = function () {
                if (
                    (this._body.classList.remove("zoom-overlay-open"),
                    this._body.classList.add("zoom-overlay-transitioning"),
                    (this._targetImage.style.webkitTransform = ""),
                    (this._targetImageWrap.style.webkitTransform = ""),
                    (this._targetImage.style.msTransform = ""),
                    (this._targetImageWrap.style.msTransform = ""),
                    (this._targetImage.style.transform = ""),
                    (this._targetImageWrap.style.transform = ""),
                    !1 in document.body.style)
                )
                    return this.dispose();
                (a = this.dispose.bind(this)), this._targetImage.addEventListener("transitionend", a), this._targetImage.addEventListener("webkitTransitionEnd", a);
            }),
            (l.prototype.dispose = function () {
                this._targetImageWrap &&
                    this._targetImageWrap.parentNode &&
                    (this._targetImage.classList.remove("zoom-img"),
                    this._targetImage.setAttribute("data-action", "zoom"),
                    this._targetImageClone.parentNode.replaceChild(this._targetImage, this._targetImageClone),
                    this._targetImageWrap.parentNode.removeChild(this._targetImageWrap),
                    this._overlay.parentNode.removeChild(this._overlay),
                    this._body.classList.remove("zoom-overlay-transitioning")),
                    this._targetImage.removeEventListener("transitionend", a),
                    this._targetImage.removeEventListener("webkitTransitionEnd", a);
            }),
            $(function () {
                (window.isMobile && !window.enableMobileZoom) || new r().listen();
            });
    })();
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    var e = document.documentElement,
        t = window,
        i = function (i, n) {
            var o = "x" === n ? "Width" : "Height",
                a = "scroll" + o,
                s = "client" + o,
                r = document.body;
            return i === t || i === e || i === r ? Math.max(e[a], r[a]) - (t["inner" + o] || e[s] || r[s]) : i[a] - i["offset" + o];
        },
        n = _gsScope._gsDefine.plugin({
            propName: "scrollTo",
            API: 2,
            version: "1.7.5",
            init: function (e, n, o) {
                return (
                    (this._wdw = e === t),
                    (this._target = e),
                    (this._tween = o),
                    "object" != typeof n && (n = { y: n }),
                    (this.vars = n),
                    (this._autoKill = !1 !== n.autoKill),
                    (this.x = this.xPrev = this.getX()),
                    (this.y = this.yPrev = this.getY()),
                    null != n.x ? (this._addTween(this, "x", this.x, "max" === n.x ? i(e, "x") : n.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : (this.skipX = !0),
                    null != n.y ? (this._addTween(this, "y", this.y, "max" === n.y ? i(e, "y") : n.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : (this.skipY = !0),
                    !0
                );
            },
            set: function (e) {
                this._super.setRatio.call(this, e);
                var n = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                    o = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                    a = o - this.yPrev,
                    s = n - this.xPrev;
                this._autoKill &&
                    (!this.skipX && (s > 7 || -7 > s) && i(this._target, "x") > n && (this.skipX = !0),
                    !this.skipY && (a > 7 || -7 > a) && i(this._target, "y") > o && (this.skipY = !0),
                    this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))),
                    this._wdw ? t.scrollTo(this.skipX ? n : this.x, this.skipY ? o : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)),
                    (this.xPrev = this.x),
                    (this.yPrev = this.y);
            },
        }),
        o = n.prototype;
    (n.max = i),
        (o.getX = function () {
            return this._wdw ? (null != t.pageXOffset ? t.pageXOffset : null != e.scrollLeft ? e.scrollLeft : document.body.scrollLeft) : this._target.scrollLeft;
        }),
        (o.getY = function () {
            return this._wdw ? (null != t.pageYOffset ? t.pageYOffset : null != e.scrollTop ? e.scrollTop : document.body.scrollTop) : this._target.scrollTop;
        }),
        (o._kill = function (e) {
            return e.scrollTo_x && (this.skipX = !0), e.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, e);
        });
}),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    (function (e, t) {
        "use strict";
        var i = (e.GreenSockGlobals = e.GreenSockGlobals || e);
        if (!i.TweenLite) {
            var n,
                o,
                a,
                s,
                r,
                l = function (e) {
                    var t,
                        n = e.split("."),
                        o = i;
                    for (t = 0; n.length > t; t++) o[n[t]] = o = o[n[t]] || {};
                    return o;
                },
                d = l("com.greensock"),
                c = 1e-10,
                u = function (e) {
                    var t,
                        i = [],
                        n = e.length;
                    for (t = 0; t !== n; i.push(e[t++]));
                    return i;
                },
                h = function () {},
                p = (function () {
                    var e = Object.prototype.toString,
                        t = e.call([]);
                    return function (i) {
                        return null != i && (i instanceof Array || ("object" == typeof i && !!i.push && e.call(i) === t));
                    };
                })(),
                f = {},
                m = function (t, n, o, a) {
                    (this.sc = f[t] ? f[t].sc : []), (f[t] = this), (this.gsClass = null), (this.func = o);
                    var s = [];
                    (this.check = function (r) {
                        for (var d, c, u, h, p = n.length, w = p; --p > -1; ) (d = f[n[p]] || new m(n[p], [])).gsClass ? ((s[p] = d.gsClass), w--) : r && d.sc.push(this);
                        if (0 === w && o)
                            for (
                                u = (c = ("com.greensock." + t).split(".")).pop(),
                                    h = l(c.join("."))[u] = this.gsClass = o.apply(o, s),
                                    a &&
                                        ((i[u] = h),
                                        "function" == typeof define && define.amd
                                            ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + t.split(".").pop(), [], function () {
                                                  return h;
                                              })
                                            : "TweenLite" === t && "undefined" != typeof module && module.exports && (module.exports = h)),
                                    p = 0;
                                this.sc.length > p;
                                p++
                            )
                                this.sc[p].check();
                    }),
                        this.check(!0);
                },
                w = (e._gsDefine = function (e, t, i, n) {
                    return new m(e, t, i, n);
                }),
                g = (d._class = function (e, t, i) {
                    return (
                        (t = t || function () {}),
                        w(
                            e,
                            [],
                            function () {
                                return t;
                            },
                            i
                        ),
                        t
                    );
                });
            w.globals = i;
            var v = [0, 0, 1, 1],
                _ = [],
                y = g(
                    "easing.Ease",
                    function (e, t, i, n) {
                        (this._func = e), (this._type = i || 0), (this._power = n || 0), (this._params = t ? v.concat(t) : v);
                    },
                    !0
                ),
                b = (y.map = {}),
                T = (y.register = function (e, t, i, n) {
                    for (var o, a, s, r, l = t.split(","), c = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1; )
                        for (a = l[c], o = n ? g("easing." + a, null, !0) : d.easing[a] || {}, s = u.length; --s > -1; ) (r = u[s]), (b[a + "." + r] = b[r + a] = o[r] = e.getRatio ? e : e[r] || new e());
                });
            for (
                (a = y.prototype)._calcEnd = !1,
                    a.getRatio = function (e) {
                        if (this._func) return (this._params[0] = e), this._func.apply(null, this._params);
                        var t = this._type,
                            i = this._power,
                            n = 1 === t ? 1 - e : 2 === t ? e : 0.5 > e ? 2 * e : 2 * (1 - e);
                        return 1 === i ? (n *= n) : 2 === i ? (n *= n * n) : 3 === i ? (n *= n * n * n) : 4 === i && (n *= n * n * n * n), 1 === t ? 1 - n : 2 === t ? n : 0.5 > e ? n / 2 : 1 - n / 2;
                    },
                    o = (n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length;
                --o > -1;

            )
                (a = n[o] + ",Power" + o), T(new y(null, null, 1, o), a, "easeOut", !0), T(new y(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), T(new y(null, null, 3, o), a, "easeInOut");
            (b.linear = d.easing.Linear.easeIn), (b.swing = d.easing.Quad.easeInOut);
            var x = g("events.EventDispatcher", function (e) {
                (this._listeners = {}), (this._eventTarget = e || this);
            });
            ((a = x.prototype).addEventListener = function (e, t, i, n, o) {
                o = o || 0;
                var a,
                    l,
                    d = this._listeners[e],
                    c = 0;
                for (null == d && (this._listeners[e] = d = []), l = d.length; --l > -1; ) (a = d[l]).c === t && a.s === i ? d.splice(l, 1) : 0 === c && o > a.pr && (c = l + 1);
                d.splice(c, 0, { c: t, s: i, up: n, pr: o }), this !== s || r || s.wake();
            }),
                (a.removeEventListener = function (e, t) {
                    var i,
                        n = this._listeners[e];
                    if (n) for (i = n.length; --i > -1; ) if (n[i].c === t) return void n.splice(i, 1);
                }),
                (a.dispatchEvent = function (e) {
                    var t,
                        i,
                        n,
                        o = this._listeners[e];
                    if (o) for (t = o.length, i = this._eventTarget; --t > -1; ) (n = o[t]) && (n.up ? n.c.call(n.s || i, { type: e, target: i }) : n.c.call(n.s || i));
                });
            var C = e.requestAnimationFrame,
                S = e.cancelAnimationFrame,
                $ =
                    Date.now ||
                    function () {
                        return new Date().getTime();
                    },
                k = $();
            for (o = (n = ["ms", "moz", "webkit", "o"]).length; --o > -1 && !C; ) (C = e[n[o] + "RequestAnimationFrame"]), (S = e[n[o] + "CancelAnimationFrame"] || e[n[o] + "CancelRequestAnimationFrame"]);
            g("Ticker", function (e, t) {
                var i,
                    n,
                    o,
                    a,
                    l,
                    d = this,
                    u = $(),
                    p = !1 !== t && C,
                    f = 500,
                    m = 33,
                    w = function (e) {
                        var t,
                            s,
                            r = $() - k;
                        r > f && (u += r - m),
                            (k += r),
                            (d.time = (k - u) / 1e3),
                            (t = d.time - l),
                            (!i || t > 0 || !0 === e) && (d.frame++, (l += t + (t >= a ? 0.004 : a - t)), (s = !0)),
                            !0 !== e && (o = n(w)),
                            s && d.dispatchEvent("tick");
                    };
                x.call(d),
                    (d.time = d.frame = 0),
                    (d.tick = function () {
                        w(!0);
                    }),
                    (d.lagSmoothing = function (e, t) {
                        (f = e || 1 / c), (m = Math.min(t, f, 0));
                    }),
                    (d.sleep = function () {
                        null != o && (p && S ? S(o) : clearTimeout(o), (n = h), (o = null), d === s && (r = !1));
                    }),
                    (d.wake = function () {
                        null !== o ? d.sleep() : d.frame > 10 && (k = $() - f + 5),
                            (n =
                                0 === i
                                    ? h
                                    : p && C
                                    ? C
                                    : function (e) {
                                          return setTimeout(e, 0 | (1e3 * (l - d.time) + 1));
                                      }),
                            d === s && (r = !0),
                            w(2);
                    }),
                    (d.fps = function (e) {
                        return arguments.length ? ((a = 1 / ((i = e) || 60)), (l = this.time + a), void d.wake()) : i;
                    }),
                    (d.useRAF = function (e) {
                        return arguments.length ? (d.sleep(), (p = e), void d.fps(i)) : p;
                    }),
                    d.fps(e),
                    setTimeout(function () {
                        p && 5 > d.frame && d.useRAF(!1);
                    }, 1500);
            }),
                ((a = d.Ticker.prototype = new d.events.EventDispatcher()).constructor = d.Ticker);
            var P = g("core.Animation", function (e, t) {
                if (
                    ((this.vars = t = t || {}),
                    (this._duration = this._totalDuration = e || 0),
                    (this._delay = Number(t.delay) || 0),
                    (this._timeScale = 1),
                    (this._active = !0 === t.immediateRender),
                    (this.data = t.data),
                    (this._reversed = !0 === t.reversed),
                    F)
                ) {
                    r || s.wake();
                    var i = this.vars.useFrames ? B : F;
                    i.add(this, i._time), this.vars.paused && this.paused(!0);
                }
            });
            (s = P.ticker = new d.Ticker()),
                ((a = P.prototype)._dirty = a._gc = a._initted = a._paused = !1),
                (a._totalTime = a._time = 0),
                (a._rawPrevTime = -1),
                (a._next = a._last = a._onUpdate = a._timeline = a.timeline = null),
                (a._paused = !1);
            var E = function () {
                r && $() - k > 2e3 && s.wake(), setTimeout(E, 2e3);
            };
            E(),
                (a.play = function (e, t) {
                    return null != e && this.seek(e, t), this.reversed(!1).paused(!1);
                }),
                (a.pause = function (e, t) {
                    return null != e && this.seek(e, t), this.paused(!0);
                }),
                (a.resume = function (e, t) {
                    return null != e && this.seek(e, t), this.paused(!1);
                }),
                (a.seek = function (e, t) {
                    return this.totalTime(Number(e), !1 !== t);
                }),
                (a.restart = function (e, t) {
                    return this.reversed(!1)
                        .paused(!1)
                        .totalTime(e ? -this._delay : 0, !1 !== t, !0);
                }),
                (a.reverse = function (e, t) {
                    return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1);
                }),
                (a.render = function () {}),
                (a.invalidate = function () {
                    return (this._time = this._totalTime = 0), (this._initted = this._gc = !1), (this._rawPrevTime = -1), (this._gc || !this.timeline) && this._enabled(!0), this;
                }),
                (a.isActive = function () {
                    var e,
                        t = this._timeline,
                        i = this._startTime;
                    return !t || (!this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= i && i + this.totalDuration() / this._timeScale > e);
                }),
                (a._enabled = function (e, t) {
                    return (
                        r || s.wake(),
                        (this._gc = !e),
                        (this._active = this.isActive()),
                        !0 !== t && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)),
                        !1
                    );
                }),
                (a._kill = function () {
                    return this._enabled(!1, !1);
                }),
                (a.kill = function (e, t) {
                    return this._kill(e, t), this;
                }),
                (a._uncache = function (e) {
                    for (var t = e ? this : this.timeline; t; ) (t._dirty = !0), (t = t.timeline);
                    return this;
                }),
                (a._swapSelfInParams = function (e) {
                    for (var t = e.length, i = e.concat(); --t > -1; ) "{self}" === e[t] && (i[t] = this);
                    return i;
                }),
                (a._callback = function (e) {
                    var t = this.vars;
                    t[e].apply(t[e + "Scope"] || t.callbackScope || this, t[e + "Params"] || _);
                }),
                (a.eventCallback = function (e, t, i, n) {
                    if ("on" === (e || "").substr(0, 2)) {
                        var o = this.vars;
                        if (1 === arguments.length) return o[e];
                        null == t ? delete o[e] : ((o[e] = t), (o[e + "Params"] = p(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i), (o[e + "Scope"] = n)), "onUpdate" === e && (this._onUpdate = t);
                    }
                    return this;
                }),
                (a.delay = function (e) {
                    return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), (this._delay = e), this) : this._delay;
                }),
                (a.duration = function (e) {
                    return arguments.length
                        ? ((this._duration = this._totalDuration = e),
                          this._uncache(!0),
                          this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0),
                          this)
                        : ((this._dirty = !1), this._duration);
                }),
                (a.totalDuration = function (e) {
                    return (this._dirty = !1), arguments.length ? this.duration(e) : this._totalDuration;
                }),
                (a.time = function (e, t) {
                    return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time;
                }),
                (a.totalTime = function (e, t, i) {
                    if ((r || s.wake(), !arguments.length)) return this._totalTime;
                    if (this._timeline) {
                        if ((0 > e && !i && (e += this.totalDuration()), this._timeline.smoothChildTiming)) {
                            this._dirty && this.totalDuration();
                            var n = this._totalDuration,
                                o = this._timeline;
                            if ((e > n && !i && (e = n), (this._startTime = (this._paused ? this._pauseTime : o._time) - (this._reversed ? n - e : e) / this._timeScale), o._dirty || this._uncache(!1), o._timeline))
                                for (; o._timeline; ) o._timeline._time !== (o._startTime + o._totalTime) / o._timeScale && o.totalTime(o._totalTime, !0), (o = o._timeline);
                        }
                        this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (this.render(e, t, !1), O.length && q());
                    }
                    return this;
                }),
                (a.progress = a.totalProgress = function (e, t) {
                    return arguments.length ? this.totalTime(this.duration() * e, t) : this._time / this.duration();
                }),
                (a.startTime = function (e) {
                    return arguments.length ? (e !== this._startTime && ((this._startTime = e), this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime;
                }),
                (a.endTime = function (e) {
                    return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale;
                }),
                (a.timeScale = function (e) {
                    if (!arguments.length) return this._timeScale;
                    if (((e = e || c), this._timeline && this._timeline.smoothChildTiming)) {
                        var t = this._pauseTime,
                            i = t || 0 === t ? t : this._timeline.totalTime();
                        this._startTime = i - ((i - this._startTime) * this._timeScale) / e;
                    }
                    return (this._timeScale = e), this._uncache(!1);
                }),
                (a.reversed = function (e) {
                    return arguments.length
                        ? (e != this._reversed && ((this._reversed = e), this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this)
                        : this._reversed;
                }),
                (a.paused = function (e) {
                    if (!arguments.length) return this._paused;
                    var t,
                        i,
                        n = this._timeline;
                    return (
                        e != this._paused &&
                            n &&
                            (r || e || s.wake(),
                            (i = (t = n.rawTime()) - this._pauseTime),
                            !e && n.smoothChildTiming && ((this._startTime += i), this._uncache(!1)),
                            (this._pauseTime = e ? t : null),
                            (this._paused = e),
                            (this._active = this.isActive()),
                            !e && 0 !== i && this._initted && this.duration() && this.render(n.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, !0, !0)),
                        this._gc && !e && this._enabled(!0, !1),
                        this
                    );
                });
            var I = g("core.SimpleTimeline", function (e) {
                P.call(this, 0, e), (this.autoRemoveChildren = this.smoothChildTiming = !0);
            });
            ((a = I.prototype = new P()).constructor = I),
                (a.kill()._gc = !1),
                (a._first = a._last = a._recent = null),
                (a._sortChildren = !1),
                (a.add = a.insert = function (e, t) {
                    var i, n;
                    if (
                        ((e._startTime = Number(t || 0) + e._delay),
                        e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale),
                        e.timeline && e.timeline._remove(e, !0),
                        (e.timeline = e._timeline = this),
                        e._gc && e._enabled(!0, !0),
                        (i = this._last),
                        this._sortChildren)
                    )
                        for (n = e._startTime; i && i._startTime > n; ) i = i._prev;
                    return (
                        i ? ((e._next = i._next), (i._next = e)) : ((e._next = this._first), (this._first = e)), e._next ? (e._next._prev = e) : (this._last = e), (e._prev = i), (this._recent = e), this._timeline && this._uncache(!0), this
                    );
                }),
                (a._remove = function (e, t) {
                    return (
                        e.timeline === this &&
                            (t || e._enabled(!1, !0),
                            e._prev ? (e._prev._next = e._next) : this._first === e && (this._first = e._next),
                            e._next ? (e._next._prev = e._prev) : this._last === e && (this._last = e._prev),
                            (e._next = e._prev = e.timeline = null),
                            e === this._recent && (this._recent = this._last),
                            this._timeline && this._uncache(!0)),
                        this
                    );
                }),
                (a.render = function (e, t, i) {
                    var n,
                        o = this._first;
                    for (this._totalTime = this._time = this._rawPrevTime = e; o; )
                        (n = o._next),
                            (o._active || (e >= o._startTime && !o._paused)) &&
                                (o._reversed ? o.render((o._dirty ? o.totalDuration() : o._totalDuration) - (e - o._startTime) * o._timeScale, t, i) : o.render((e - o._startTime) * o._timeScale, t, i)),
                            (o = n);
                }),
                (a.rawTime = function () {
                    return r || s.wake(), this._totalTime;
                });
            var A = g(
                    "TweenLite",
                    function (t, i, n) {
                        if ((P.call(this, i, n), (this.render = A.prototype.render), null == t)) throw "Cannot tween a null target.";
                        this.target = t = "string" != typeof t ? t : A.selector(t) || t;
                        var o,
                            a,
                            s,
                            r = t.jquery || (t.length && t !== e && t[0] && (t[0] === e || (t[0].nodeType && t[0].style && !t.nodeType))),
                            l = this.vars.overwrite;
                        if (((this._overwrite = l = null == l ? H[A.defaultOverwrite] : "number" == typeof l ? l >> 0 : H[l]), (r || t instanceof Array || (t.push && p(t))) && "number" != typeof t[0]))
                            for (this._targets = s = u(t), this._propLookup = [], this._siblings = [], o = 0; s.length > o; o++)
                                (a = s[o])
                                    ? "string" != typeof a
                                        ? a.length && a !== e && a[0] && (a[0] === e || (a[0].nodeType && a[0].style && !a.nodeType))
                                            ? (s.splice(o--, 1), (this._targets = s = s.concat(u(a))))
                                            : ((this._siblings[o] = U(a, this, !1)), 1 === l && this._siblings[o].length > 1 && Y(a, this, null, 1, this._siblings[o]))
                                        : "string" == typeof (a = s[o--] = A.selector(a)) && s.splice(o + 1, 1)
                                    : s.splice(o--, 1);
                        else (this._propLookup = {}), (this._siblings = U(t, this, !1)), 1 === l && this._siblings.length > 1 && Y(t, this, null, 1, this._siblings);
                        (this.vars.immediateRender || (0 === i && 0 === this._delay && !1 !== this.vars.immediateRender)) && ((this._time = -c), this.render(-this._delay));
                    },
                    !0
                ),
                M = function (t) {
                    return t && t.length && t !== e && t[0] && (t[0] === e || (t[0].nodeType && t[0].style && !t.nodeType));
                };
            ((a = A.prototype = new P()).constructor = A),
                (a.kill()._gc = !1),
                (a.ratio = 0),
                (a._firstPT = a._targets = a._overwrittenProps = a._startAt = null),
                (a._notifyPluginsOfEnabled = a._lazy = !1),
                (A.version = "1.17.0"),
                (A.defaultEase = a._ease = new y(null, null, 1, 1)),
                (A.defaultOverwrite = "auto"),
                (A.ticker = s),
                (A.autoSleep = 120),
                (A.lagSmoothing = function (e, t) {
                    s.lagSmoothing(e, t);
                }),
                (A.selector =
                    e.$ ||
                    e.jQuery ||
                    function (t) {
                        var i = e.$ || e.jQuery;
                        return i ? ((A.selector = i), i(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t);
                    });
            var O = [],
                D = {},
                L = (A._internals = { isArray: p, isSelector: M, lazyTweens: O }),
                j = (A._plugins = {}),
                z = (L.tweenLookup = {}),
                R = 0,
                N = (L.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                }),
                H = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0 },
                B = (P._rootFramesTimeline = new I()),
                F = (P._rootTimeline = new I()),
                W = 30,
                q = (L.lazyRender = function () {
                    var e,
                        t = O.length;
                    for (D = {}; --t > -1; ) (e = O[t]) && !1 !== e._lazy && (e.render(e._lazy[0], e._lazy[1], !0), (e._lazy = !1));
                    O.length = 0;
                });
            (F._startTime = s.time),
                (B._startTime = s.frame),
                (F._active = B._active = !0),
                setTimeout(q, 1),
                (P._updateRoot = A.render = function () {
                    var e, t, i;
                    if ((O.length && q(), F.render((s.time - F._startTime) * F._timeScale, !1, !1), B.render((s.frame - B._startTime) * B._timeScale, !1, !1), O.length && q(), s.frame >= W)) {
                        for (i in ((W = s.frame + (parseInt(A.autoSleep, 10) || 120)), z)) {
                            for (e = (t = z[i].tweens).length; --e > -1; ) t[e]._gc && t.splice(e, 1);
                            0 === t.length && delete z[i];
                        }
                        if ((!(i = F._first) || i._paused) && A.autoSleep && !B._first && 1 === s._listeners.tick.length) {
                            for (; i && i._paused; ) i = i._next;
                            i || s.sleep();
                        }
                    }
                }),
                s.addEventListener("tick", P._updateRoot);
            var U = function (e, t, i) {
                    var n,
                        o,
                        a = e._gsTweenID;
                    if ((z[a || (e._gsTweenID = a = "t" + R++)] || (z[a] = { target: e, tweens: [] }), t && (((n = z[a].tweens)[(o = n.length)] = t), i))) for (; --o > -1; ) n[o] === t && n.splice(o, 1);
                    return z[a].tweens;
                },
                X = function (e, t, i, n) {
                    var o,
                        a,
                        s = e.vars.onOverwrite;
                    return s && (o = s(e, t, i, n)), (s = A.onOverwrite) && (a = s(e, t, i, n)), !1 !== o && !1 !== a;
                },
                Y = function (e, t, i, n, o) {
                    var a, s, r, l;
                    if (1 === n || n >= 4) {
                        for (l = o.length, a = 0; l > a; a++)
                            if ((r = o[a]) !== t) r._gc || (r._kill(null, e, t) && (s = !0));
                            else if (5 === n) break;
                        return s;
                    }
                    var d,
                        u = t._startTime + c,
                        h = [],
                        p = 0,
                        f = 0 === t._duration;
                    for (a = o.length; --a > -1; )
                        (r = o[a]) === t ||
                            r._gc ||
                            r._paused ||
                            (r._timeline !== t._timeline
                                ? ((d = d || Q(t, 0, f)), 0 === Q(r, d, f) && (h[p++] = r))
                                : u >= r._startTime && r._startTime + r.totalDuration() / r._timeScale > u && (((f || !r._initted) && 2e-10 >= u - r._startTime) || (h[p++] = r)));
                    for (a = p; --a > -1; )
                        if (((r = h[a]), 2 === n && r._kill(i, e, t) && (s = !0), 2 !== n || (!r._firstPT && r._initted))) {
                            if (2 !== n && !X(r, t)) continue;
                            r._enabled(!1, !1) && (s = !0);
                        }
                    return s;
                },
                Q = function (e, t, i) {
                    for (var n = e._timeline, o = n._timeScale, a = e._startTime; n._timeline; ) {
                        if (((a += n._startTime), (o *= n._timeScale), n._paused)) return -100;
                        n = n._timeline;
                    }
                    return (a /= o) > t ? a - t : (i && a === t) || (!e._initted && 2 * c > a - t) ? c : (a += e.totalDuration() / e._timeScale / o) > t + c ? 0 : a - t - c;
                };
            (a._init = function () {
                var e,
                    t,
                    i,
                    n,
                    o,
                    a = this.vars,
                    s = this._overwrittenProps,
                    r = this._duration,
                    l = !!a.immediateRender,
                    d = a.ease;
                if (a.startAt) {
                    for (n in (this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), (o = {}), a.startAt)) o[n] = a.startAt[n];
                    if (((o.overwrite = !1), (o.immediateRender = !0), (o.lazy = l && !1 !== a.lazy), (o.startAt = o.delay = null), (this._startAt = A.to(this.target, 0, o)), l))
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== r) return;
                } else if (a.runBackwards && 0 !== r)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), (this._startAt = null);
                    else {
                        for (n in (0 !== this._time && (l = !1), (i = {}), a)) (N[n] && "autoCSS" !== n) || (i[n] = a[n]);
                        if (((i.overwrite = 0), (i.data = "isFromStart"), (i.lazy = l && !1 !== a.lazy), (i.immediateRender = l), (this._startAt = A.to(this.target, 0, i)), l)) {
                            if (0 === this._time) return;
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null);
                    }
                if (
                    ((this._ease = d = d ? (d instanceof y ? d : "function" == typeof d ? new y(d, a.easeParams) : b[d] || A.defaultEase) : A.defaultEase),
                    a.easeParams instanceof Array && d.config && (this._ease = d.config.apply(d, a.easeParams)),
                    (this._easeType = this._ease._type),
                    (this._easePower = this._ease._power),
                    (this._firstPT = null),
                    this._targets)
                )
                    for (e = this._targets.length; --e > -1; ) this._initProps(this._targets[e], (this._propLookup[e] = {}), this._siblings[e], s ? s[e] : null) && (t = !0);
                else t = this._initProps(this.target, this._propLookup, this._siblings, s);
                if ((t && A._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || ("function" != typeof this.target && this._enabled(!1, !1))), a.runBackwards))
                    for (i = this._firstPT; i; ) (i.s += i.c), (i.c = -i.c), (i = i._next);
                (this._onUpdate = a.onUpdate), (this._initted = !0);
            }),
                (a._initProps = function (t, i, n, o) {
                    var a, s, r, l, d, c;
                    if (null == t) return !1;
                    for (a in (D[t._gsTweenID] && q(),
                    this.vars.css ||
                        (t.style &&
                            t !== e &&
                            t.nodeType &&
                            j.css &&
                            !1 !== this.vars.autoCSS &&
                            (function (e, t) {
                                var i,
                                    n = {};
                                for (i in e)
                                    N[i] ||
                                        (i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i) ||
                                        !(!j[i] || (j[i] && j[i]._autoCSS)) ||
                                        ((n[i] = e[i]), delete e[i]);
                                e.css = n;
                            })(this.vars, t)),
                    this.vars)) {
                        if (((c = this.vars[a]), N[a])) c && (c instanceof Array || (c.push && p(c))) && -1 !== c.join("").indexOf("{self}") && (this.vars[a] = c = this._swapSelfInParams(c, this));
                        else if (j[a] && (l = new j[a]())._onInitTween(t, this.vars[a], this)) {
                            for (this._firstPT = d = { _next: this._firstPT, t: l, p: "setRatio", s: 0, c: 1, f: !0, n: a, pg: !0, pr: l._priority }, s = l._overwriteProps.length; --s > -1; ) i[l._overwriteProps[s]] = this._firstPT;
                            (l._priority || l._onInitAllProps) && (r = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0);
                        } else
                            (this._firstPT = i[a] = d = { _next: this._firstPT, t: t, p: a, f: "function" == typeof t[a], n: a, pg: !1, pr: 0 }),
                                (d.s = d.f ? t[a.indexOf("set") || "function" != typeof t["get" + a.substr(3)] ? a : "get" + a.substr(3)]() : parseFloat(t[a])),
                                (d.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - d.s || 0);
                        d && d._next && (d._next._prev = d);
                    }
                    return o && this._kill(o, t)
                        ? this._initProps(t, i, n, o)
                        : this._overwrite > 1 && this._firstPT && n.length > 1 && Y(t, this, i, this._overwrite, n)
                        ? (this._kill(i, t), this._initProps(t, i, n, o))
                        : (this._firstPT && ((!1 !== this.vars.lazy && this._duration) || (this.vars.lazy && !this._duration)) && (D[t._gsTweenID] = !0), r);
                }),
                (a.render = function (e, t, i) {
                    var n,
                        o,
                        a,
                        s,
                        r = this._time,
                        l = this._duration,
                        d = this._rawPrevTime;
                    if (e >= l)
                        (this._totalTime = this._time = l),
                            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
                            this._reversed || ((n = !0), (o = "onComplete"), (i = i || this._timeline.autoRemoveChildren)),
                            0 === l &&
                                (this._initted || !this.vars.lazy || i) &&
                                (this._startTime === this._timeline._duration && (e = 0),
                                (0 === e || 0 > d || (d === c && "isPause" !== this.data)) && d !== e && ((i = !0), d > c && (o = "onReverseComplete")),
                                (this._rawPrevTime = s = !t || e || d === e ? e : c));
                    else if (1e-7 > e)
                        (this._totalTime = this._time = 0),
                            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                            (0 !== r || (0 === l && d > 0)) && ((o = "onReverseComplete"), (n = this._reversed)),
                            0 > e && ((this._active = !1), 0 === l && (this._initted || !this.vars.lazy || i) && (d >= 0 && (d !== c || "isPause" !== this.data) && (i = !0), (this._rawPrevTime = s = !t || e || d === e ? e : c))),
                            this._initted || (i = !0);
                    else if (((this._totalTime = this._time = e), this._easeType)) {
                        var u = e / l,
                            h = this._easeType,
                            p = this._easePower;
                        (1 === h || (3 === h && u >= 0.5)) && (u = 1 - u),
                            3 === h && (u *= 2),
                            1 === p ? (u *= u) : 2 === p ? (u *= u * u) : 3 === p ? (u *= u * u * u) : 4 === p && (u *= u * u * u * u),
                            (this.ratio = 1 === h ? 1 - u : 2 === h ? u : 0.5 > e / l ? u / 2 : 1 - u / 2);
                    } else this.ratio = this._ease.getRatio(e / l);
                    if (this._time !== r || i) {
                        if (!this._initted) {
                            if ((this._init(), !this._initted || this._gc)) return;
                            if (!i && this._firstPT && ((!1 !== this.vars.lazy && this._duration) || (this.vars.lazy && !this._duration)))
                                return (this._time = this._totalTime = r), (this._rawPrevTime = d), O.push(this), void (this._lazy = [e, t]);
                            this._time && !n ? (this.ratio = this._ease.getRatio(this._time / l)) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
                        }
                        for (
                            !1 !== this._lazy && (this._lazy = !1),
                                this._active || (!this._paused && this._time !== r && e >= 0 && (this._active = !0)),
                                0 === r && (this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : o || (o = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (t || this._callback("onStart"))),
                                a = this._firstPT;
                            a;

                        )
                            a.f ? a.t[a.p](a.c * this.ratio + a.s) : (a.t[a.p] = a.c * this.ratio + a.s), (a = a._next);
                        this._onUpdate && (0 > e && this._startAt && -1e-4 !== e && this._startAt.render(e, t, i), t || ((this._time !== r || n) && this._callback("onUpdate"))),
                            o &&
                                (!this._gc || i) &&
                                (0 > e && this._startAt && !this._onUpdate && -1e-4 !== e && this._startAt.render(e, t, i),
                                n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)),
                                !t && this.vars[o] && this._callback(o),
                                0 === l && this._rawPrevTime === c && s !== c && (this._rawPrevTime = 0));
                    }
                }),
                (a._kill = function (e, t, i) {
                    if (("all" === e && (e = null), null == e && (null == t || t === this.target))) return (this._lazy = !1), this._enabled(!1, !1);
                    t = "string" != typeof t ? t || this._targets || this.target : A.selector(t) || t;
                    var n,
                        o,
                        a,
                        s,
                        r,
                        l,
                        d,
                        c,
                        u,
                        h = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                    if ((p(t) || M(t)) && "number" != typeof t[0]) for (n = t.length; --n > -1; ) this._kill(e, t[n], i) && (l = !0);
                    else {
                        if (this._targets) {
                            for (n = this._targets.length; --n > -1; )
                                if (t === this._targets[n]) {
                                    (r = this._propLookup[n] || {}), (this._overwrittenProps = this._overwrittenProps || []), (o = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all");
                                    break;
                                }
                        } else {
                            if (t !== this.target) return !1;
                            (r = this._propLookup), (o = this._overwrittenProps = e ? this._overwrittenProps || {} : "all");
                        }
                        if (r) {
                            if (((d = e || r), (c = e !== o && "all" !== o && e !== r && ("object" != typeof e || !e._tempKill)), i && (A.onOverwrite || this.vars.onOverwrite))) {
                                for (a in d) r[a] && (u || (u = []), u.push(a));
                                if ((u || !e) && !X(this, i, t, u)) return !1;
                            }
                            for (a in d)
                                (s = r[a]) &&
                                    (h && (s.f ? s.t[s.p](s.s) : (s.t[s.p] = s.s), (l = !0)),
                                    s.pg && s.t._kill(d) && (l = !0),
                                    (s.pg && 0 !== s.t._overwriteProps.length) || (s._prev ? (s._prev._next = s._next) : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), (s._next = s._prev = null)),
                                    delete r[a]),
                                    c && (o[a] = 1);
                            !this._firstPT && this._initted && this._enabled(!1, !1);
                        }
                    }
                    return l;
                }),
                (a.invalidate = function () {
                    return (
                        this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this),
                        (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
                        (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
                        (this._propLookup = this._targets ? {} : []),
                        P.prototype.invalidate.call(this),
                        this.vars.immediateRender && ((this._time = -c), this.render(-this._delay)),
                        this
                    );
                }),
                (a._enabled = function (e, t) {
                    if ((r || s.wake(), e && this._gc)) {
                        var i,
                            n = this._targets;
                        if (n) for (i = n.length; --i > -1; ) this._siblings[i] = U(n[i], this, !0);
                        else this._siblings = U(this.target, this, !0);
                    }
                    return P.prototype._enabled.call(this, e, t), !(!this._notifyPluginsOfEnabled || !this._firstPT) && A._onPluginEvent(e ? "_onEnable" : "_onDisable", this);
                }),
                (A.to = function (e, t, i) {
                    return new A(e, t, i);
                }),
                (A.from = function (e, t, i) {
                    return (i.runBackwards = !0), (i.immediateRender = 0 != i.immediateRender), new A(e, t, i);
                }),
                (A.fromTo = function (e, t, i, n) {
                    return (n.startAt = i), (n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender), new A(e, t, n);
                }),
                (A.delayedCall = function (e, t, i, n, o) {
                    return new A(t, 0, { delay: e, onComplete: t, onCompleteParams: i, callbackScope: n, onReverseComplete: t, onReverseCompleteParams: i, immediateRender: !1, lazy: !1, useFrames: o, overwrite: 0 });
                }),
                (A.set = function (e, t) {
                    return new A(e, 0, t);
                }),
                (A.getTweensOf = function (e, t) {
                    if (null == e) return [];
                    var i, n, o, a;
                    if (((e = "string" != typeof e ? e : A.selector(e) || e), (p(e) || M(e)) && "number" != typeof e[0])) {
                        for (i = e.length, n = []; --i > -1; ) n = n.concat(A.getTweensOf(e[i], t));
                        for (i = n.length; --i > -1; ) for (a = n[i], o = i; --o > -1; ) a === n[o] && n.splice(i, 1);
                    } else for (i = (n = U(e).concat()).length; --i > -1; ) (n[i]._gc || (t && !n[i].isActive())) && n.splice(i, 1);
                    return n;
                }),
                (A.killTweensOf = A.killDelayedCallsTo = function (e, t, i) {
                    "object" == typeof t && ((i = t), (t = !1));
                    for (var n = A.getTweensOf(e, t), o = n.length; --o > -1; ) n[o]._kill(i, e);
                });
            var Z = g(
                "plugins.TweenPlugin",
                function (e, t) {
                    (this._overwriteProps = (e || "").split(",")), (this._propName = this._overwriteProps[0]), (this._priority = t || 0), (this._super = Z.prototype);
                },
                !0
            );
            if (
                ((a = Z.prototype),
                (Z.version = "1.10.1"),
                (Z.API = 2),
                (a._firstPT = null),
                (a._addTween = function (e, t, i, n, o, a) {
                    var s, r;
                    return null != n && (s = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - Number(i) : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)))
                        ? ((this._firstPT = r = { _next: this._firstPT, t: e, p: t, s: i, c: s, f: "function" == typeof e[t], n: o || t, r: a }), r._next && (r._next._prev = r), r)
                        : void 0;
                }),
                (a.setRatio = function (e) {
                    for (var t, i = this._firstPT, n = 1e-6; i; ) (t = i.c * e + i.s), i.r ? (t = Math.round(t)) : n > t && t > -n && (t = 0), i.f ? i.t[i.p](t) : (i.t[i.p] = t), (i = i._next);
                }),
                (a._kill = function (e) {
                    var t,
                        i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != e[this._propName]) this._overwriteProps = [];
                    else for (t = i.length; --t > -1; ) null != e[i[t]] && i.splice(t, 1);
                    for (; n; ) null != e[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? ((n._prev._next = n._next), (n._prev = null)) : this._firstPT === n && (this._firstPT = n._next)), (n = n._next);
                    return !1;
                }),
                (a._roundProps = function (e, t) {
                    for (var i = this._firstPT; i; ) (e[this._propName] || (null != i.n && e[i.n.split(this._propName + "_").join("")])) && (i.r = t), (i = i._next);
                }),
                (A._onPluginEvent = function (e, t) {
                    var i,
                        n,
                        o,
                        a,
                        s,
                        r = t._firstPT;
                    if ("_onInitAllProps" === e) {
                        for (; r; ) {
                            for (s = r._next, n = o; n && n.pr > r.pr; ) n = n._next;
                            (r._prev = n ? n._prev : a) ? (r._prev._next = r) : (o = r), (r._next = n) ? (n._prev = r) : (a = r), (r = s);
                        }
                        r = t._firstPT = o;
                    }
                    for (; r; ) r.pg && "function" == typeof r.t[e] && r.t[e]() && (i = !0), (r = r._next);
                    return i;
                }),
                (Z.activate = function (e) {
                    for (var t = e.length; --t > -1; ) e[t].API === Z.API && (j[new e[t]()._propName] = e[t]);
                    return !0;
                }),
                (w.plugin = function (e) {
                    if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
                    var t,
                        i = e.propName,
                        n = e.priority || 0,
                        o = e.overwriteProps,
                        a = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_roundProps", initAll: "_onInitAllProps" },
                        s = g(
                            "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
                            function () {
                                Z.call(this, i, n), (this._overwriteProps = o || []);
                            },
                            !0 === e.global
                        ),
                        r = (s.prototype = new Z(i));
                    for (t in ((r.constructor = s), (s.API = e.API), a)) "function" == typeof e[t] && (r[a[t]] = e[t]);
                    return (s.version = e.version), Z.activate([s]), s;
                }),
                (n = e._gsQueue))
            ) {
                for (o = 0; n.length > o; o++) n[o]();
                for (a in f) f[a].func || e.console.log("GSAP encountered missing dependency: com.greensock." + a);
            }
            r = !1;
        }
    })("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window),
    (function (e, t) {
        "use strict";
        e.addEventListener(
            "DOMContentLoaded",
            function () {
                var i = t.location.href.replace(t.location.hash, "");
                [].slice
                    .call(e.querySelectorAll("use[*|href]"))
                    .filter(function (e) {
                        return 0 === e.getAttribute("xlink:href").indexOf("#");
                    })
                    .forEach(function (e) {
                        e.setAttribute("xlink:href", i.replace("#", "") + e.getAttribute("xlink:href"));
                    });
            },
            !1
        );
    })(document, window),
    (function (e, t) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? (module.exports = t()) : (e.EvEmitter = t());
    })("undefined" != typeof window ? window : this, function () {
        function e() {}
        var t = e.prototype;
        return (
            (t.on = function (e, t) {
                if (e && t) {
                    var i = (this._events = this._events || {}),
                        n = (i[e] = i[e] || []);
                    return -1 == n.indexOf(t) && n.push(t), this;
                }
            }),
            (t.once = function (e, t) {
                if (e && t) {
                    this.on(e, t);
                    var i = (this._onceEvents = this._onceEvents || {});
                    return ((i[e] = i[e] || {})[t] = !0), this;
                }
            }),
            (t.off = function (e, t) {
                var i = this._events && this._events[e];
                if (i && i.length) {
                    var n = i.indexOf(t);
                    return -1 != n && i.splice(n, 1), this;
                }
            }),
            (t.emitEvent = function (e, t) {
                var i = this._events && this._events[e];
                if (i && i.length) {
                    (i = i.slice(0)), (t = t || []);
                    for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                        var a = i[o];
                        n && n[a] && (this.off(e, a), delete n[a]), a.apply(this, t);
                    }
                    return this;
                }
            }),
            (t.allOff = function () {
                delete this._events, delete this._onceEvents;
            }),
            e
        );
    }),
    (function (e, t) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(["ev-emitter/ev-emitter"], function (i) {
                  return t(e, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = t(e, require("ev-emitter")))
            : (e.imagesLoaded = t(e, e.EvEmitter));
    })("undefined" != typeof window ? window : this, function (e, t) {
        function i(e, t) {
            for (var i in t) e[i] = t[i];
            return e;
        }
        function n(e, t, o) {
            if (!(this instanceof n)) return new n(e, t, o);
            var a = e;
            return (
                "string" == typeof e && (a = document.querySelectorAll(e)),
                a
                    ? ((this.elements = (function (e) {
                          return Array.isArray(e) ? e : "object" == typeof e && "number" == typeof e.length ? l.call(e) : [e];
                      })(a)),
                      (this.options = i({}, this.options)),
                      "function" == typeof t ? (o = t) : i(this.options, t),
                      o && this.on("always", o),
                      this.getImages(),
                      s && (this.jqDeferred = new s.Deferred()),
                      void setTimeout(this.check.bind(this)))
                    : void r.error("Bad element for imagesLoaded " + (a || e))
            );
        }
        function o(e) {
            this.img = e;
        }
        function a(e, t) {
            (this.url = e), (this.element = t), (this.img = new Image());
        }
        var s = e.jQuery,
            r = e.console,
            l = Array.prototype.slice;
        (n.prototype = Object.create(t.prototype)),
            (n.prototype.options = {}),
            (n.prototype.getImages = function () {
                (this.images = []), this.elements.forEach(this.addElementImages, this);
            }),
            (n.prototype.addElementImages = function (e) {
                "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
                var t = e.nodeType;
                if (t && d[t]) {
                    for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var o = i[n];
                        this.addImage(o);
                    }
                    if ("string" == typeof this.options.background) {
                        var a = e.querySelectorAll(this.options.background);
                        for (n = 0; n < a.length; n++) {
                            var s = a[n];
                            this.addElementBackgroundImages(s);
                        }
                    }
                }
            });
        var d = { 1: !0, 9: !0, 11: !0 };
        return (
            (n.prototype.addElementBackgroundImages = function (e) {
                var t = getComputedStyle(e);
                if (t)
                    for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n; ) {
                        var o = n && n[2];
                        o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
                    }
            }),
            (n.prototype.addImage = function (e) {
                var t = new o(e);
                this.images.push(t);
            }),
            (n.prototype.addBackground = function (e, t) {
                var i = new a(e, t);
                this.images.push(i);
            }),
            (n.prototype.check = function () {
                function e(e, i, n) {
                    setTimeout(function () {
                        t.progress(e, i, n);
                    });
                }
                var t = this;
                return (
                    (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                        ? void this.images.forEach(function (t) {
                              t.once("progress", e), t.check();
                          })
                        : void this.complete()
                );
            }),
            (n.prototype.progress = function (e, t, i) {
                this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
                    this.emitEvent("progress", [this, e, t]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && r && r.log("progress: " + i, e, t);
            }),
            (n.prototype.complete = function () {
                var e = this.hasAnyBroken ? "fail" : "done";
                if (((this.isComplete = !0), this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred)) {
                    var t = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[t](this);
                }
            }),
            (o.prototype = Object.create(t.prototype)),
            (o.prototype.check = function () {
                return this.getIsImageComplete()
                    ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
                    : ((this.proxyImage = new Image()),
                      this.proxyImage.addEventListener("load", this),
                      this.proxyImage.addEventListener("error", this),
                      this.img.addEventListener("load", this),
                      this.img.addEventListener("error", this),
                      void (this.proxyImage.src = this.img.src));
            }),
            (o.prototype.getIsImageComplete = function () {
                return this.img.complete && this.img.naturalWidth;
            }),
            (o.prototype.confirm = function (e, t) {
                (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
            }),
            (o.prototype.handleEvent = function (e) {
                var t = "on" + e.type;
                this[t] && this[t](e);
            }),
            (o.prototype.onload = function () {
                this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (o.prototype.onerror = function () {
                this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (o.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            (a.prototype = Object.create(o.prototype)),
            (a.prototype.check = function () {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), (this.img.src = this.url), this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
            }),
            (a.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            (a.prototype.confirm = function (e, t) {
                (this.isLoaded = e), this.emitEvent("progress", [this, this.element, t]);
            }),
            (n.makeJQueryPlugin = function (t) {
                (t = t || e.jQuery) &&
                    ((s = t).fn.imagesLoaded = function (e, t) {
                        return new n(this, e, t).jqDeferred.promise(s(this));
                    });
            }),
            n.makeJQueryPlugin(),
            n
        );
    }),
    (function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto);
    })(function (e) {
        "use strict";
        function t(t) {
            var i = t.data;
            t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(i));
        }
        function i(t) {
            var i = t.target,
                n = e(i);
            if (!n.is("[type=submit],[type=image]")) {
                var o = n.closest("[type=submit]");
                if (0 === o.length) return;
                i = o[0];
            }
            var a = this;
            if (((a.clk = i), "image" == i.type))
                if (void 0 !== t.offsetX) (a.clk_x = t.offsetX), (a.clk_y = t.offsetY);
                else if ("function" == typeof e.fn.offset) {
                    var s = n.offset();
                    (a.clk_x = t.pageX - s.left), (a.clk_y = t.pageY - s.top);
                } else (a.clk_x = t.pageX - i.offsetLeft), (a.clk_y = t.pageY - i.offsetTop);
            setTimeout(function () {
                a.clk = a.clk_x = a.clk_y = null;
            }, 100);
        }
        function n() {
            if (e.fn.ajaxSubmit.debug) {
                var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t);
            }
        }
        var o = {};
        (o.fileapi = void 0 !== e("<input type='file'/>").get(0).files), (o.formdata = void 0 !== window.FormData);
        var a = !!e.fn.prop;
        (e.fn.attr2 = function () {
            if (!a) return this.attr.apply(this, arguments);
            var e = this.prop.apply(this, arguments);
            return (e && e.jquery) || "string" == typeof e ? e : this.attr.apply(this, arguments);
        }),
            (e.fn.ajaxSubmit = function (t) {
                function i(i) {
                    function o(e) {
                        var t = null;
                        try {
                            e.contentWindow && (t = e.contentWindow.document);
                        } catch (e) {
                            n("cannot get iframe.contentWindow document: " + e);
                        }
                        if (t) return t;
                        try {
                            t = e.contentDocument ? e.contentDocument : e.document;
                        } catch (i) {
                            n("cannot get iframe.contentDocument: " + i), (t = e.document);
                        }
                        return t;
                    }
                    function r() {
                        var t = d.attr2("target"),
                            i = d.attr2("action"),
                            a = d.attr("enctype") || d.attr("encoding") || "multipart/form-data";
                        x.setAttribute("target", m),
                            (!s || /post/i.test(s)) && x.setAttribute("method", "POST"),
                            i != h.url && x.setAttribute("action", h.url),
                            h.skipEncodingOverride || (s && !/post/i.test(s)) || d.attr({ encoding: "multipart/form-data", enctype: "multipart/form-data" }),
                            h.timeout &&
                                (T = setTimeout(function () {
                                    (b = !0), l(S);
                                }, h.timeout));
                        var r = [];
                        try {
                            if (h.extraData)
                                for (var c in h.extraData)
                                    h.extraData.hasOwnProperty(c) &&
                                        r.push(
                                            e.isPlainObject(h.extraData[c]) && h.extraData[c].hasOwnProperty("name") && h.extraData[c].hasOwnProperty("value")
                                                ? e('<input type="hidden" name="' + h.extraData[c].name + '">')
                                                      .val(h.extraData[c].value)
                                                      .appendTo(x)[0]
                                                : e('<input type="hidden" name="' + c + '">')
                                                      .val(h.extraData[c])
                                                      .appendTo(x)[0]
                                        );
                            h.iframeTarget || w.appendTo("body"),
                                g.attachEvent ? g.attachEvent("onload", l) : g.addEventListener("load", l, !1),
                                setTimeout(function e() {
                                    try {
                                        var t = o(g).readyState;
                                        n("state = " + t), t && "uninitialized" == t.toLowerCase() && setTimeout(e, 50);
                                    } catch (e) {
                                        n("Server abort: ", e, " (", e.name, ")"), l($), T && clearTimeout(T), (T = void 0);
                                    }
                                }, 15);
                            try {
                                x.submit();
                            } catch (e) {
                                document.createElement("form").submit.apply(x);
                            }
                        } finally {
                            x.setAttribute("action", i), x.setAttribute("enctype", a), t ? x.setAttribute("target", t) : d.removeAttr("target"), e(r).remove();
                        }
                    }
                    function l(t) {
                        if (!v.aborted && !A) {
                            if (((I = o(g)) || (n("cannot access response document"), (t = $)), t === S && v)) return v.abort("timeout"), void C.reject(v, "timeout");
                            if (t == $ && v) return v.abort("server abort"), void C.reject(v, "error", "server abort");
                            if ((I && I.location.href != h.iframeSrc) || b) {
                                g.detachEvent ? g.detachEvent("onload", l) : g.removeEventListener("load", l, !1);
                                var i,
                                    a = "success";
                                try {
                                    if (b) throw "timeout";
                                    var s = "xml" == h.dataType || I.XMLDocument || e.isXMLDoc(I);
                                    if ((n("isXml=" + s), !s && window.opera && (null === I.body || !I.body.innerHTML) && --M)) return n("requeing onLoad callback, DOM not available"), void setTimeout(l, 250);
                                    var r = I.body ? I.body : I.documentElement;
                                    (v.responseText = r ? r.innerHTML : null),
                                        (v.responseXML = I.XMLDocument ? I.XMLDocument : I),
                                        s && (h.dataType = "xml"),
                                        (v.getResponseHeader = function (e) {
                                            return { "content-type": h.dataType }[e.toLowerCase()];
                                        }),
                                        r && ((v.status = Number(r.getAttribute("status")) || v.status), (v.statusText = r.getAttribute("statusText") || v.statusText));
                                    var d = (h.dataType || "").toLowerCase(),
                                        c = /(json|script|text)/.test(d);
                                    if (c || h.textarea) {
                                        var u = I.getElementsByTagName("textarea")[0];
                                        if (u) (v.responseText = u.value), (v.status = Number(u.getAttribute("status")) || v.status), (v.statusText = u.getAttribute("statusText") || v.statusText);
                                        else if (c) {
                                            var p = I.getElementsByTagName("pre")[0],
                                                m = I.getElementsByTagName("body")[0];
                                            p ? (v.responseText = p.textContent ? p.textContent : p.innerText) : m && (v.responseText = m.textContent ? m.textContent : m.innerText);
                                        }
                                    } else "xml" == d && !v.responseXML && v.responseText && (v.responseXML = O(v.responseText));
                                    try {
                                        E = L(v, d, h);
                                    } catch (e) {
                                        (a = "parsererror"), (v.error = i = e || a);
                                    }
                                } catch (e) {
                                    n("error caught: ", e), (a = "error"), (v.error = i = e || a);
                                }
                                v.aborted && (n("upload aborted"), (a = null)),
                                    v.status && (a = (v.status >= 200 && v.status < 300) || 304 === v.status ? "success" : "error"),
                                    "success" === a
                                        ? (h.success && h.success.call(h.context, E, "success", v), C.resolve(v.responseText, "success", v), f && e.event.trigger("ajaxSuccess", [v, h]))
                                        : a && (void 0 === i && (i = v.statusText), h.error && h.error.call(h.context, v, a, i), C.reject(v, "error", i), f && e.event.trigger("ajaxError", [v, h, i])),
                                    f && e.event.trigger("ajaxComplete", [v, h]),
                                    f && !--e.active && e.event.trigger("ajaxStop"),
                                    h.complete && h.complete.call(h.context, v, a),
                                    (A = !0),
                                    h.timeout && clearTimeout(T),
                                    setTimeout(function () {
                                        h.iframeTarget ? w.attr("src", h.iframeSrc) : w.remove(), (v.responseXML = null);
                                    }, 100);
                            }
                        }
                    }
                    var c,
                        u,
                        h,
                        f,
                        m,
                        w,
                        g,
                        v,
                        _,
                        y,
                        b,
                        T,
                        x = d[0],
                        C = e.Deferred();
                    if (
                        ((C.abort = function (e) {
                            v.abort(e);
                        }),
                        i)
                    )
                        for (u = 0; u < p.length; u++) (c = e(p[u])), a ? c.prop("disabled", !1) : c.removeAttr("disabled");
                    if (
                        (((h = e.extend(!0, {}, e.ajaxSettings, t)).context = h.context || h),
                        (m = "jqFormIO" + new Date().getTime()),
                        h.iframeTarget
                            ? (y = (w = e(h.iframeTarget)).attr2("name"))
                                ? (m = y)
                                : w.attr2("name", m)
                            : (w = e('<iframe name="' + m + '" src="' + h.iframeSrc + '" />')).css({ position: "absolute", top: "-1000px", left: "-1000px" }),
                        (g = w[0]),
                        (v = {
                            aborted: 0,
                            responseText: null,
                            responseXML: null,
                            status: 0,
                            statusText: "n/a",
                            getAllResponseHeaders: function () {},
                            getResponseHeader: function () {},
                            setRequestHeader: function () {},
                            abort: function (t) {
                                var i = "timeout" === t ? "timeout" : "aborted";
                                n("aborting upload... " + i), (this.aborted = 1);
                                try {
                                    g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop");
                                } catch (e) {}
                                w.attr("src", h.iframeSrc), (v.error = i), h.error && h.error.call(h.context, v, i, t), f && e.event.trigger("ajaxError", [v, h, i]), h.complete && h.complete.call(h.context, v, i);
                            },
                        }),
                        (f = h.global) && 0 == e.active++ && e.event.trigger("ajaxStart"),
                        f && e.event.trigger("ajaxSend", [v, h]),
                        h.beforeSend && !1 === h.beforeSend.call(h.context, v, h))
                    )
                        return h.global && e.active--, C.reject(), C;
                    if (v.aborted) return C.reject(), C;
                    (_ = x.clk) && (y = _.name) && !_.disabled && ((h.extraData = h.extraData || {}), (h.extraData[y] = _.value), "image" == _.type && ((h.extraData[y + ".x"] = x.clk_x), (h.extraData[y + ".y"] = x.clk_y)));
                    var S = 1,
                        $ = 2,
                        k = e("meta[name=csrf-token]").attr("content"),
                        P = e("meta[name=csrf-param]").attr("content");
                    P && k && ((h.extraData = h.extraData || {}), (h.extraData[P] = k)), h.forceSync ? r() : setTimeout(r, 10);
                    var E,
                        I,
                        A,
                        M = 50,
                        O =
                            e.parseXML ||
                            function (e, t) {
                                return (
                                    window.ActiveXObject ? (((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false"), t.loadXML(e)) : (t = new DOMParser().parseFromString(e, "text/xml")),
                                    t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                                );
                            },
                        D =
                            e.parseJSON ||
                            function (e) {
                                return window.eval("(" + e + ")");
                            },
                        L = function (t, i, n) {
                            var o = t.getResponseHeader("content-type") || "",
                                a = "xml" === i || (!i && o.indexOf("xml") >= 0),
                                s = a ? t.responseXML : t.responseText;
                            return (
                                a && "parsererror" === s.documentElement.nodeName && e.error && e.error("parsererror"),
                                n && n.dataFilter && (s = n.dataFilter(s, i)),
                                "string" == typeof s && ("json" === i || (!i && o.indexOf("json") >= 0) ? (s = D(s)) : ("script" === i || (!i && o.indexOf("javascript") >= 0)) && e.globalEval(s)),
                                s
                            );
                        };
                    return C;
                }
                if (!this.length) return n("ajaxSubmit: skipping submit process - no element selected"), this;
                var s,
                    r,
                    l,
                    d = this;
                "function" == typeof t ? (t = { success: t }) : void 0 === t && (t = {}),
                    (s = t.type || this.attr2("method")),
                    (l = (l = "string" == typeof (r = t.url || this.attr2("action")) ? e.trim(r) : "") || window.location.href || "") && (l = (l.match(/^([^#]+)/) || [])[1]),
                    (t = e.extend(!0, { url: l, success: e.ajaxSettings.success, type: s || e.ajaxSettings.type, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank" }, t));
                var c = {};
                if ((this.trigger("form-pre-serialize", [this, t, c]), c.veto)) return n("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
                if (t.beforeSerialize && !1 === t.beforeSerialize(this, t)) return n("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
                var u = t.traditional;
                void 0 === u && (u = e.ajaxSettings.traditional);
                var h,
                    p = [],
                    f = this.formToArray(t.semantic, p);
                if ((t.data && ((t.extraData = t.data), (h = e.param(t.data, u))), t.beforeSubmit && !1 === t.beforeSubmit(f, this, t))) return n("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
                if ((this.trigger("form-submit-validate", [f, this, t, c]), c.veto)) return n("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
                var m = e.param(f, u);
                h && (m = m ? m + "&" + h : h), "GET" == t.type.toUpperCase() ? ((t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + m), (t.data = null)) : (t.data = m);
                var w = [];
                if (
                    (t.resetForm &&
                        w.push(function () {
                            d.resetForm();
                        }),
                    t.clearForm &&
                        w.push(function () {
                            d.clearForm(t.includeHidden);
                        }),
                    !t.dataType && t.target)
                ) {
                    var g = t.success || function () {};
                    w.push(function (i) {
                        var n = t.replaceTarget ? "replaceWith" : "html";
                        e(t.target)[n](i).each(g, arguments);
                    });
                } else t.success && w.push(t.success);
                if (
                    ((t.success = function (e, i, n) {
                        for (var o = t.context || this, a = 0, s = w.length; s > a; a++) w[a].apply(o, [e, i, n || d, d]);
                    }),
                    t.error)
                ) {
                    var v = t.error;
                    t.error = function (e, i, n) {
                        var o = t.context || this;
                        v.apply(o, [e, i, n, d]);
                    };
                }
                if (t.complete) {
                    var _ = t.complete;
                    t.complete = function (e, i) {
                        var n = t.context || this;
                        _.apply(n, [e, i, d]);
                    };
                }
                var y =
                        e("input[type=file]:enabled", this).filter(function () {
                            return "" !== e(this).val();
                        }).length > 0,
                    b = "multipart/form-data",
                    T = d.attr("enctype") == b || d.attr("encoding") == b,
                    x = o.fileapi && o.formdata;
                n("fileAPI :" + x);
                var C,
                    S = (y || T) && !x;
                !1 !== t.iframe && (t.iframe || S)
                    ? t.closeKeepAlive
                        ? e.get(t.closeKeepAlive, function () {
                              C = i(f);
                          })
                        : (C = i(f))
                    : (C =
                          (y || T) && x
                              ? (function (i) {
                                    for (var n = new FormData(), o = 0; o < i.length; o++) n.append(i[o].name, i[o].value);
                                    if (t.extraData) {
                                        var a = (function (i) {
                                            var n,
                                                o,
                                                a = e.param(i, t.traditional).split("&"),
                                                s = a.length,
                                                r = [];
                                            for (n = 0; s > n; n++) (a[n] = a[n].replace(/\+/g, " ")), (o = a[n].split("=")), r.push([decodeURIComponent(o[0]), decodeURIComponent(o[1])]);
                                            return r;
                                        })(t.extraData);
                                        for (o = 0; o < a.length; o++) a[o] && n.append(a[o][0], a[o][1]);
                                    }
                                    t.data = null;
                                    var r = e.extend(!0, {}, e.ajaxSettings, t, { contentType: !1, processData: !1, cache: !1, type: s || "POST" });
                                    t.uploadProgress &&
                                        (r.xhr = function () {
                                            var i = e.ajaxSettings.xhr();
                                            return (
                                                i.upload &&
                                                    i.upload.addEventListener(
                                                        "progress",
                                                        function (e) {
                                                            var i = 0,
                                                                n = e.loaded || e.position,
                                                                o = e.total;
                                                            e.lengthComputable && (i = Math.ceil((n / o) * 100)), t.uploadProgress(e, n, o, i);
                                                        },
                                                        !1
                                                    ),
                                                i
                                            );
                                        }),
                                        (r.data = null);
                                    var l = r.beforeSend;
                                    return (
                                        (r.beforeSend = function (e, i) {
                                            (i.data = t.formData ? t.formData : n), l && l.call(this, e, i);
                                        }),
                                        e.ajax(r)
                                    );
                                })(f)
                              : e.ajax(t)),
                    d.removeData("jqxhr").data("jqxhr", C);
                for (var $ = 0; $ < p.length; $++) p[$] = null;
                return this.trigger("form-submit-notify", [this, t]), this;
            }),
            (e.fn.ajaxForm = function (o) {
                if ((((o = o || {}).delegation = o.delegation && e.isFunction(e.fn.on)), !o.delegation && 0 === this.length)) {
                    var a = { s: this.selector, c: this.context };
                    return !e.isReady && a.s
                        ? (n("DOM not ready, queuing ajaxForm"),
                          e(function () {
                              e(a.s, a.c).ajaxForm(o);
                          }),
                          this)
                        : (n("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this);
                }
                return o.delegation
                    ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, o, t).on("click.form-plugin", this.selector, o, i), this)
                    : this.ajaxFormUnbind().bind("submit.form-plugin", o, t).bind("click.form-plugin", o, i);
            }),
            (e.fn.ajaxFormUnbind = function () {
                return this.unbind("submit.form-plugin click.form-plugin");
            }),
            (e.fn.formToArray = function (t, i) {
                var n = [];
                if (0 === this.length) return n;
                var a,
                    s,
                    r,
                    l,
                    d,
                    c,
                    u,
                    h,
                    p = this[0],
                    f = this.attr("id"),
                    m = t ? p.getElementsByTagName("*") : p.elements;
                if ((m && !/MSIE [678]/.test(navigator.userAgent) && (m = e(m).get()), f && (a = e(':input[form="' + f + '"]').get()).length && (m = (m || []).concat(a)), !m || !m.length)) return n;
                for (s = 0, u = m.length; u > s; s++)
                    if ((l = (c = m[s]).name) && !c.disabled)
                        if (t && p.clk && "image" == c.type) p.clk == c && (n.push({ name: l, value: e(c).val(), type: c.type }), n.push({ name: l + ".x", value: p.clk_x }, { name: l + ".y", value: p.clk_y }));
                        else if ((d = e.fieldValue(c, !0)) && d.constructor == Array) for (i && i.push(c), r = 0, h = d.length; h > r; r++) n.push({ name: l, value: d[r] });
                        else if (o.fileapi && "file" == c.type) {
                            i && i.push(c);
                            var w = c.files;
                            if (w.length) for (r = 0; r < w.length; r++) n.push({ name: l, value: w[r], type: c.type });
                            else n.push({ name: l, value: "", type: c.type });
                        } else null != d && (i && i.push(c), n.push({ name: l, value: d, type: c.type, required: c.required }));
                if (!t && p.clk) {
                    var g = e(p.clk),
                        v = g[0];
                    (l = v.name) && !v.disabled && "image" == v.type && (n.push({ name: l, value: g.val() }), n.push({ name: l + ".x", value: p.clk_x }, { name: l + ".y", value: p.clk_y }));
                }
                return n;
            }),
            (e.fn.formSerialize = function (t) {
                return e.param(this.formToArray(t));
            }),
            (e.fn.fieldSerialize = function (t) {
                var i = [];
                return (
                    this.each(function () {
                        var n = this.name;
                        if (n) {
                            var o = e.fieldValue(this, t);
                            if (o && o.constructor == Array) for (var a = 0, s = o.length; s > a; a++) i.push({ name: n, value: o[a] });
                            else null != o && i.push({ name: this.name, value: o });
                        }
                    }),
                    e.param(i)
                );
            }),
            (e.fn.fieldValue = function (t) {
                for (var i = [], n = 0, o = this.length; o > n; n++) {
                    var a = this[n],
                        s = e.fieldValue(a, t);
                    null == s || (s.constructor == Array && !s.length) || (s.constructor == Array ? e.merge(i, s) : i.push(s));
                }
                return i;
            }),
            (e.fieldValue = function (t, i) {
                var n = t.name,
                    o = t.type,
                    a = t.tagName.toLowerCase();
                if (
                    (void 0 === i && (i = !0),
                    i && (!n || t.disabled || "reset" == o || "button" == o || (("checkbox" == o || "radio" == o) && !t.checked) || (("submit" == o || "image" == o) && t.form && t.form.clk != t) || ("select" == a && -1 == t.selectedIndex)))
                )
                    return null;
                if ("select" == a) {
                    var s = t.selectedIndex;
                    if (0 > s) return null;
                    for (var r = [], l = t.options, d = "select-one" == o, c = d ? s + 1 : l.length, u = d ? s : 0; c > u; u++) {
                        var h = l[u];
                        if (h.selected) {
                            var p = h.value;
                            if ((p || (p = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text : h.value), d)) return p;
                            r.push(p);
                        }
                    }
                    return r;
                }
                return e(t).val();
            }),
            (e.fn.clearForm = function (t) {
                return this.each(function () {
                    e("input,select,textarea", this).clearFields(t);
                });
            }),
            (e.fn.clearFields = e.fn.clearInputs = function (t) {
                var i = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
                return this.each(function () {
                    var n = this.type,
                        o = this.tagName.toLowerCase();
                    i.test(n) || "textarea" == o
                        ? (this.value = "")
                        : "checkbox" == n || "radio" == n
                        ? (this.checked = !1)
                        : "select" == o
                        ? (this.selectedIndex = -1)
                        : "file" == n
                        ? /MSIE/.test(navigator.userAgent)
                            ? e(this).replaceWith(e(this).clone(!0))
                            : e(this).val("")
                        : t && ((!0 === t && /hidden/.test(n)) || ("string" == typeof t && e(this).is(t))) && (this.value = "");
                });
            }),
            (e.fn.resetForm = function () {
                return this.each(function () {
                    ("function" == typeof this.reset || ("object" == typeof this.reset && !this.reset.nodeType)) && this.reset();
                });
            }),
            (e.fn.enable = function (e) {
                return (
                    void 0 === e && (e = !0),
                    this.each(function () {
                        this.disabled = !e;
                    })
                );
            }),
            (e.fn.selected = function (t) {
                return (
                    void 0 === t && (t = !0),
                    this.each(function () {
                        var i = this.type;
                        if ("checkbox" == i || "radio" == i) this.checked = t;
                        else if ("option" == this.tagName.toLowerCase()) {
                            var n = e(this).parent("select");
                            t && n[0] && "select-one" == n[0].type && n.find("option").selected(!1), (this.selected = t);
                        }
                    })
                );
            }),
            (e.fn.ajaxSubmit.debug = !1);
    }),
    ($.cookie = function (e, t, i) {
        if (arguments.length > 1 && "[object Object]" !== String(t)) {
            if (((i = $.extend({}, i)), null == t && (i.expires = -1), "number" == typeof i.expires)) {
                var n = i.expires,
                    o = (i.expires = new Date());
                o.setDate(o.getDate() + n);
            }
            return (
                (t = String(t)),
                (document.cookie = [
                    encodeURIComponent(e),
                    "=",
                    i.raw ? t : encodeURIComponent(t),
                    i.expires ? "; expires=" + i.expires.toUTCString() : "",
                    i.path ? "; path=" + i.path : "",
                    i.domain ? "; domain=" + i.domain : "",
                    i.secure ? "; secure" : "",
                ].join(""))
            );
        }
        var a,
            s = (i = t || {}).raw
                ? function (e) {
                      return e;
                  }
                : decodeURIComponent;
        return (a = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? s(a[1]) : null;
    }),
    (function (e, t, i) {
        "use strict";
        "undefined" != typeof module && module.exports
            ? (module.exports = i())
            : "function" == typeof define && define.amd
            ? define("detect-zoom", function () {
                  return i();
              })
            : (e[t] = i());
    })(window, "detectZoom", function () {
        var e = function () {
                return window.devicePixelRatio || 1;
            },
            t = function () {
                return { zoom: 1, devicePxPerCssPx: 1 };
            },
            i = function () {
                var t = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
                return { zoom: t, devicePxPerCssPx: t * e() };
            },
            n = function () {
                var t = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
                return { zoom: t, devicePxPerCssPx: t * e() };
            },
            o = function () {
                var t = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
                return { zoom: t, devicePxPerCssPx: t * e() };
            },
            a = function () {
                var t = Math.round((document.documentElement.clientWidth / window.innerWidth) * 100) / 100;
                return { zoom: t, devicePxPerCssPx: t * e() };
            },
            s = function () {
                var t = (90 == Math.abs(window.orientation) ? screen.height : screen.width) / window.innerWidth;
                return { zoom: t, devicePxPerCssPx: t * e() };
            },
            r = function () {
                var t = function (e) {
                        return e.replace(/;/g, " !important;");
                    },
                    i = document.createElement("div");
                (i.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0"),
                    i.setAttribute("style", t("font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;"));
                var n = document.createElement("div");
                n.setAttribute("style", t("width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;")), n.appendChild(i), document.body.appendChild(n);
                var o = 1e3 / i.clientHeight;
                return (o = Math.round(100 * o) / 100), document.body.removeChild(n), { zoom: o, devicePxPerCssPx: o * e() };
            },
            l = function () {
                var e = u("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4);
                return { zoom: (e = Math.round(100 * e) / 100), devicePxPerCssPx: e };
            },
            d = function () {
                return { zoom: l().zoom, devicePxPerCssPx: e() };
            },
            c = function () {
                var t = window.top.outerWidth / window.top.innerWidth;
                return { zoom: (t = Math.round(100 * t) / 100), devicePxPerCssPx: t * e() };
            },
            u = function (e, t, i, n, o, a) {
                var s, r, l, d;
                window.matchMedia
                    ? (s = window.matchMedia)
                    : ((r = document.getElementsByTagName("head")[0]),
                      (l = document.createElement("style")),
                      r.appendChild(l),
                      ((d = document.createElement("div")).className = "mediaQueryBinarySearch"),
                      (d.style.display = "none"),
                      document.body.appendChild(d),
                      (s = function (e) {
                          l.sheet.insertRule("@media " + e + "{.mediaQueryBinarySearch {text-decoration: underline} }", 0);
                          var t = "underline" == getComputedStyle(d, null).textDecoration;
                          return l.sheet.deleteRule(0), { matches: t };
                      }));
                var c = (function i(n, o, r) {
                    var l = (n + o) / 2;
                    return 0 >= r || a > o - n ? l : s("(" + e + ":" + l + t + ")").matches ? i(l, o, r - 1) : i(n, l, r - 1);
                })(i, n, o);
                return d && (r.removeChild(l), document.body.removeChild(d)), c;
            },
            h = (function () {
                var e = t;
                return (
                    isNaN(screen.logicalXDPI) || isNaN(screen.systemXDPI)
                        ? window.navigator.msMaxTouchPoints
                            ? (e = n)
                            : window.chrome && !(window.opera || navigator.userAgent.indexOf(" Opera") >= 0)
                            ? (e = o)
                            : Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0
                            ? (e = a)
                            : "orientation" in window && "webkitRequestAnimationFrame" in window
                            ? (e = s)
                            : "webkitRequestAnimationFrame" in window
                            ? (e = r)
                            : navigator.userAgent.indexOf("Opera") >= 0
                            ? (e = c)
                            : window.devicePixelRatio
                            ? (e = d)
                            : l().zoom > 0.001 && (e = l)
                        : (e = i),
                    e
                );
            })();
        return {
            zoom: function () {
                return h().zoom;
            },
            device: function () {
                return h().devicePxPerCssPx;
            },
        };
    }),
    (window.inAction = 1),
    (window.allowSlide = 1),
    (window.blockScroll = 1),
    (window.effectOffset = 500),
    (window.effectSpeed = 1e3),
    (window.slideSpeed = 1e3),
    (window.cleanupDelay = 1400),
    (window.horizontalMode = 0),
    (window.sidebarShown = 0),
    (window.loadingProgress = 0),
    (window.smoothScroll = 0),
    (window.scrollSpeed = 0.5),
    (window.preload = 1),
    (window.setHashLink = 1),
    (window.hideSidebarOnBodyClick = 1),
    (window.collectScrolls = 0),
    (window.sliderStatus = 0),
    (window.minScrollToSlide = 100),
    (window.minSwipeToSlide = 1),
    (window.enableMobileZoom = 0),
    (window.hideOnScrollSensitivity = 100),
    (window.allowParallaxOnMobile = 1),
    (window.hidePopupOnBodyClick = 1),
    (window.disableKeyNavigation = 0);
var $html = $("html");
$(window).on("load", function () {
    window.loaded = 1;
}),
    $(document).ready(function () {
        "use strict";
        var e = $("body");
        function t() {
            var e = window.location.href.split("#")[1];
            if (e && $('.slide[data-name="' + e + '"]').length > 0) {
                var t = $('.slide[data-name="' + e + '"]');
                (window.isMobile && window.isSimplifiedMobile) || window.isScroll
                    ? t.length &&
                      (!window.preload || window.loaded
                          ? $("html,body").stop().clearQueue().animate({ scrollTop: t.position().top }, window.effectSpeed)
                          : $(window).on("load", function () {
                                $("html,body").stop().clearQueue().animate({ scrollTop: t.position().top }, window.effectSpeed);
                            }))
                    : ((window.stage = $(".slide").index(t) + 1), o(window.stage));
            }
        }
        if (
            (setTimeout(function () {
                $(window).trigger("ready");
            }, 1),
            e.hide().show(0),
            (window.isScroll = e.hasClass("scroll")),
            (window.isSimplifiedMobile = e.hasClass("simplifiedMobile")),
            (window.isScroll || (window.isSimplifiedMobile && window.isMobile)) && $html.addClass("scrollable"),
            $html.addClass("page-ready"),
            e.hasClass("fast")
                ? ((window.slideSpeed = 700), (window.cleanupDelay = 1200), (window.effectSpeed = 800), (window.scrollSpeed = 0.35), (window.effectOffset = 400))
                : e.hasClass("slow") && ((window.slideSpeed = 1400), (window.cleanupDelay = 2e3), (window.effectSpeed = 1400), (window.scrollSpeed = 0.8), (window.effectOffset = 600)),
            (window.stage = 1),
            (window.stages = $(".slide").length),
            e.hasClass("horizontal") && (window.horizontalMode = 1),
            e.hasClass("noPreload") && (window.preload = 0),
            e.hasClass("animated")
                ? (window.isAnimated = "auto")
                : e.hasClass("animateOnEvent") && ((window.isAnimated = "animateOnEvent"), window.isMobile && ((window.isAnimated = "auto"), e.removeClass("animateOnEvent").addClass("animated"))),
            window.isSimplifiedMobile && window.isMobile && ((window.isAnimated = !1), e.removeClass("animated animateOnEvent"), $("[class*='ae-']").addClass("done")),
            window.isAnimated || (window.cleanupDelay = 0),
            e.hasClass("smoothScroll") && !window.isMobile && (window.smoothScroll = 1),
            t(),
            $(window).on("popstate", function (e) {
                setTimeout(function () {
                    t();
                }, 100),
                    e.preventDefault();
            }),
            window.preload)
        ) {
            var i = [];
            function e() {
                var e = window.loadingProgress / window.images;
                window.progressBar.css("width", 100 * e + "%"), window.loadingProgress == window.images && window.progressBar.addClass("loaded");
            }
            $("*").each(function () {
                var e,
                    t = $(this);
                "none" !== t.css("background-image")
                    ? (e = t
                          .css("background-image")
                          .replace(/.*\s?url\([\'\"]?/, "")
                          .replace(/[\'\"]?\).*/, ""))
                    : t.is("img") && (e = t.attr("src")),
                    e && !/(repeating-)?(linear|radial)-gradient.+/.test(e) && i.push(e);
            }),
                (window.images = i.length),
                (window.progressBar = $(".progress-bar")),
                $.cacheImage(i, {
                    complete: function () {
                        window.loadingProgress++, e();
                    },
                }),
                e();
        }
        function n() {
            $html.addClass("page-loaded"),
                (window.inAction = 0),
                (window.blockScroll = 0),
                (window.loaded = 1),
                setTimeout(function () {
                    window.isScroll && (l(), b()), window.isMobile && window.isSimplifiedMobile ? ($(".slide").addClass("selected animate active"), l(), b()) : o(window.stage);
                }, 500);
        }
        function o(t) {
            if (((t = parseInt(t)), !((window.isMobile && window.isSimplifiedMobile) || window.isScroll))) {
                b();
                var i = $(".slide").eq(t - 1),
                    n = $(".slide.selected"),
                    o = n.index(".slide") + 1;
                M(),
                    a(),
                    T(),
                    (window.allowSlide = 1),
                    e.removeClass("sidebarShown lastSlide firstSlide hidePanel-top hidePanel-bottom"),
                    0 != window.setStageClasses &&
                        (1 === window.stage && e.addClass("firstSlide"), window.stages === window.stage && 1 !== window.stages && e.addClass("lastSlide"), e.removeClassByPrefix("stage-").addClass("stage-" + window.stage)),
                    i.hasClass("whiteSlide") ? e.addClass("whiteSlide") : e.removeClass("whiteSlide"),
                    o !== t &&
                        0 != window.setStageClasses &&
                        (n.removeClass("selected").addClass("active"),
                        i.removeClass("before after").addClass("selected active"),
                        i.prevAll(".slide").addClass("before").removeClass("after"),
                        i.nextAll(".slide").addClass("after").removeClass("before"),
                        $(window).trigger("slideChange", [parseInt(t), i])),
                    window.setHashLink &&
                        (i.attr("data-name") || i.attr("id")
                            ? (window.location.hash = i.attr("data-name") ? i.attr("data-name") : i.attr("id"))
                            : window.location.toString().indexOf("#") > 0 &&
                              "file:" !== location.protocol &&
                              location.href.split("#")[0] &&
                              (history.pushState ? window.history.pushState("", "", location.href.split("#")[0]) : (window.location.hash = ""))),
                    i.find(".content, .container").scrollTop(0),
                    window.loaded &&
                        ((window.blockScroll = 1),
                        setTimeout(function () {
                            o !== t && (0 === window.animationLoop ? n.removeClass("active") : n.removeClass("active animate")), (window.blockScroll = 0);
                        }, window.effectSpeed),
                        window.effectOffset > window.slideSpeed && (window.effectOffset = window.slideSpeed),
                        setTimeout(function () {
                            i.addClass("animate");
                        }, window.slideSpeed - window.effectOffset),
                        0 != window.animationLoop && $(".done").removeClass("done"),
                        $(".slide.selected [class*='ae-']").one("webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend", function () {
                            var e = $(this);
                            setTimeout(function () {
                                e.addClass("done");
                            }, window.effectOffset);
                        }));
            }
        }
        function a(e) {
            $(".zoom-overlay-open").length > 0 && ($(".zoom-img").click(), e && $(".zoom-img-wrap, .zoom-overlay").remove());
        }
        o(window.stage),
            (window.preload && window.images && !window.loaded) || n(),
            window.loaded ||
                $(window).on("load", function () {
                    n();
                }),
            $(".animated").on("click", "[class*='ae-']:not('.done')", function () {
                $(this).addClass("done");
            }),
            (window.changeSlide = function (e) {
                if (
                    ("increase" === e ? (e = window.stage + 1 >= window.stages ? window.stages : window.stage + 1) : "decrease" === e && (e = window.stage - 1 < 1 ? 1 : window.stage - 1),
                    (window.isMobile && window.isSimplifiedMobile) || window.isScroll)
                ) {
                    window.stage = e;
                    var t = $(".slide:eq(" + (window.stage - 1) + ")"),
                        i = $(t).offset().top;
                    $("html,body").stop().clearQueue().animate({ scrollTop: i }, window.effectSpeed);
                } else if (e !== window.stage && e <= window.stages && 1 !== window.inAction) {
                    (window.inAction = 1), (window.stage = e);
                    var n = 0;
                    $(".zoom-overlay-open").length > 0 && (a(), (n = 550)),
                        setTimeout(function () {
                            (window.stage = e),
                                o(window.stage),
                                setTimeout(function () {
                                    window.inAction = 0;
                                }, window.slideSpeed);
                        }, n);
                }
                $("iframe.autoplay").each(function () {
                    var e = $(this).attr("src").replace("?autoplay=1", "?").replace("&autoplay=1", "");
                    $(this).attr("src", e);
                }),
                    $("video.autoplay").each(function () {
                        $(this)[0].pause(), ($(this)[0].currentTime = 0);
                    });
            }),
            $(".nextSlide").on("click", function () {
                window.changeSlide("increase");
            }),
            $(".prevSlide").on("click", function () {
                window.changeSlide("decrease");
            }),
            $(".toFirstSlide").on("click", function () {
                window.changeSlide(1), history.pushState ? window.history.pushState("", "", location.href.split("#")[0]) : (window.location.hash = ""), T();
            }),
            $(".toLastSlide").on("click", function () {
                window.changeSlide(window.stages), history.pushState ? window.history.pushState("", "", location.href.split("#")[0]) : (window.location.hash = ""), T();
            }),
            $('[class*="toSlide-"]').on("click", function () {
                var e = parseInt($(this).attr("class").split("toSlide-")[1].split(" ")[0]);
                window.changeSlide(e), T();
            }),
            $(window).on("resize load ready", function () {
                $('[data-action="zoom"]').removeAttr("style"), $(".zoom-overlay").length > 0 && a("fast"), (window.windowHeight = $(window).height()), (window.windowWidth = $(window).width()), (window.documentHeight = $(document).height());
            });
        var s;
        $("body").on("touchstart", function (e) {
            s = e.touches[0].clientY;
        }),
            $("body").on("DOMMouseScroll mousewheel scroll touchend", function (t) {
                "touchend" == t.type && ((t.deltaY = t.changedTouches[0].clientY - s), (t.deltaFactor = 1));
                var i = $(".slide.selected .content"),
                    n = Math.ceil(Math.abs(t.deltaY) * t.deltaFactor),
                    o = window.isFirefox ? 2 : 1,
                    a = window.isWindows ? 2 * o : o,
                    r = (t.originalEvent.wheelDelta ? t.originalEvent.wheelDelta : t.deltaY * t.deltaFactor) * o * a,
                    l = t.deltaY >= 0 ? "up" : "down",
                    d = i.scrollTop(),
                    c = i.find(".container").outerHeight(),
                    u = detectZoom.device(),
                    h = window.isFirefox && window.isWindows ? 200 : window.minScrollToSlide;
                if (n) {
                    if (window.isScroll && !window.sidebarShown && !window.popupShown && !window.blockScroll)
                        if (window.smoothScroll && !window.isMobile) {
                            r > 1500 && (r = 1500), r < -1e3 && (r = -1500);
                            var p = $(window),
                                f = p.scrollTop() - r;
                            TweenLite.to(p, window.scrollSpeed, { scrollTo: { y: f, autoKill: !1 }, ease: Power4.easeOut, overwrite: "all" });
                        } else window.isWindows || i.scrollTop(d - r);
                    window.isScroll ||
                        (window.isMobile && window.isSimplifiedMobile) ||
                        (c > window.windowHeight &&
                            (("up" === l && 0 === i.scrollTop()) || ("down" === l && i.scrollTop() + window.windowHeight >= Math.floor(c / u)) ? (window.allowSlide = 1) : (window.allowSlide = 0),
                            window.panelsToHide &&
                                ("down" === l && i.scrollTop() > 0 ? e.addClass("hidePanel-top") : "up" === l && e.removeClass("hidePanel-top"),
                                e.addClass("hidePanel-bottom"),
                                "down" === l && i.scrollTop() + window.windowHeight >= Math.floor(c / u) ? e.removeClass("hidePanel-bottom") : "up" === l && e.addClass("hidePanel-bottom")),
                            window.sidebarShown ||
                                window.popupShown ||
                                window.blockScroll ||
                                (window.smoothScroll
                                    ? (r > 1500 && (r = 1500), r < -1e3 && (r = -1500), TweenLite.to(i, 0.5, { scrollTo: { y: d - r, autoKill: !1 }, ease: Power4.easeOut, overwrite: 5 }))
                                    : ((d = "up" === l ? d - n : d + n), i.scrollTop(d)))),
                        window.allowSlide &&
                            n &&
                            ((window.collectScrolls = "down" == l ? window.collectScrolls + n : window.collectScrolls - n),
                            setTimeout(function () {
                                window.collectScrolls = 0;
                            }, 200)),
                        Math.abs(window.collectScrolls) >= h &&
                            window.allowSlide &&
                            !window.sidebarShown &&
                            !window.popupShown &&
                            !window.disableOnScroll &&
                            ((window.collectScrolls = 0),
                            (("down" === l && window.stage !== window.stages) || ("up" === l && 1 !== window.stage)) && 1 !== window.inAction && ("down" === l ? window.changeSlide("increase") : window.changeSlide("decrease"))));
                }
            }),
            ((window.isMobile && window.isSimplifiedMobile) || window.isScroll) &&
                $(window).on("DOMMouseScroll mousewheel scroll touchmove load", function () {
                    0 != window.updateScroll && l();
                });
        var r = 0;
        function l() {
            ++r >= 2 && (M(), (r = 0)),
                $(".slide").each(function (t, i) {
                    var n = $(i),
                        o = n.index(".slide"),
                        a = $(document).scrollTop(),
                        s = n.offset().top,
                        r = n.height(),
                        l = window.windowHeight / 2 > r ? r / 2 : window.windowHeight / 2,
                        d = s < window.windowHeight + a - l && s > a - r + l,
                        c = 2 * ((a + window.windowHeight - s) / (window.windowHeight + r) - 0.5),
                        u = !0;
                    0 === a && (u = 0 === t),
                        a + window.windowHeight === window.documentHeight && (u = t === window.stages - 1),
                        0 != window.setStageClasses &&
                            (d && u
                                ? (n.prevAll(".slide").addClass("before").removeClass("after"),
                                  n.nextAll(".slide").addClass("after").removeClass("before"),
                                  n.addClass("selected animate active").removeClass("after before"),
                                  (window.stage === o + 1 && window.firstTimeTrigger) ||
                                      ((window.stage = o + 1),
                                      $(window).trigger("slideChange", [window.stage, n]),
                                      1 === window.stage ? e.addClass("firstSlide") : e.removeClass("firstSlide"),
                                      window.stages === window.stage ? e.addClass("lastSlide") : e.removeClass("lastSlide"),
                                      e.removeClassByPrefix("stage-").addClass("stage-" + window.stage),
                                      n.hasClass("whiteSlide") ? e.addClass("whiteSlide") : e.removeClass("whiteSlide"),
                                      "auto" == window.isAnimated &&
                                          (window.clearElementAnimation = setTimeout(function () {
                                              n.find("[class*='ae-']").addClass("done");
                                          }, window.effectSpeed + window.cleanupDelay))),
                                  window.firstTimeTrigger || ((window.firstTimeTrigger = 1), $(window).trigger("slideChange", [window.stage, n])))
                                : n.removeClass("selected"),
                            b()),
                        (!window.isMobile || (window.isMobile && window.allowParallaxOnMobile)) &&
                            c > -1 &&
                            c < 1 &&
                            (n.hasClass("parallax") || n.find(".parallax-element")) &&
                            n.find(".parallax-element").each(function () {
                                var e = $(this),
                                    t = parseInt(e.data("parallax-velocity")) ? parseInt(e.data("parallax-velocity")) : 50,
                                    i = c * t;
                                t > 100 && (t = 100), e.css("-webkit-transform", "translate3d(0, " + i + "%, 0)").css("transform", "translate3d(0, " + i + "%, 0)");
                            });
                }),
                "animateOnEvent" == window.isAnimated &&
                    (window.preload
                        ? window.loaded &&
                          $("[class*='ae-']").each(function (e, t) {
                              var i = $(t);
                              d(i) &&
                                  i.addClass("do").one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function () {
                                      $(this).removeClassByPrefix("ae-").removeClass("do").addClass("done");
                                  });
                          })
                        : $("[class*='ae-']:not(.done):not(.do)").each(function (e, t) {
                              var i = $(t);
                              d(i)
                                  ? i.addClass("do").one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function () {
                                        $(this).removeClass("do").addClass("done");
                                    })
                                  : 1 == window.animationLoop && (d(i) || i.removeClass("done do"));
                          }));
        }
        function d(e) {
            var t = $(window).scrollTop(),
                i = $(e),
                n = i.height(),
                o = t + window.windowHeight,
                a = i.offset().top,
                s = a + n;
            return n >= window.windowHeight / 5 ? o >= a + n / 5 : t < a && o > s;
        }
        if (
            ($(".mobile .slides:not(.scroll):not(.simplifiedMobile), .slides.desktopSwipe").swipe({
                swipeStatus: function (e, t, i, n) {
                    (window.allowSwipeUp = 1), (window.allowSwipeDown = 1);
                    var o = $(".slide.selected .content"),
                        a = Math.floor(o.find(".container").outerHeight()),
                        s = "up",
                        r = "down",
                        l = window.minSwipeToSlide,
                        d = window.innerHeight;
                    window.sidebarShown && (o = $(".sidebar .content")),
                        window.popupShown && (o = $(".popup .content")),
                        "start" === t && (window.scrollTop = o.scrollTop()),
                        window.horizontalMode && ((s = "left"), (r = "right")),
                        !window.horizontalMode && a > d && (window.scrollTop + d < a && (window.allowSwipeUp = 0), window.scrollTop > 0 && (window.allowSwipeDown = 0)),
                        window.sidebarShown ||
                            window.disableOnSwipe ||
                            (window.horizontalMode
                                ? i === s && n > l
                                    ? window.changeSlide("increase")
                                    : i === r && n > l && window.changeSlide("decrease")
                                : i === s && n > l && window.allowSwipeUp && window.allowSlide
                                ? window.changeSlide("increase")
                                : i === r && n > l && window.allowSwipeDown && window.allowSlide && window.changeSlide("decrease"));
                },
                maxTimeThreshold: 0,
                fingers: "all",
                allowPageScroll: "vertical",
            }),
            $(".slides.desktopSwipe *").on("click", function () {
                $(this).addClass("selectable");
            }),
            $(".panel .compact").length > 0 &&
                $(".panel .compact").each(function (e, t) {
                    var i = $(t).parents(".panel"),
                        n = $(i).find(".desktop"),
                        o = t,
                        a = $(i).hasClass("forceMobileView");
                    $(window).on("load resize ready", function () {
                        var e = $(document).width(),
                            t = parseInt($(i).css("padding-left").replace("px", "")) + parseInt($(i).css("padding-right").replace("px", ""));
                        if ((window.isMobile || $(document).width() < 767) && a) $(n).addClass("hidden"), $(o).removeClass("hidden");
                        else {
                            $(n).removeClass("hidden"), $(o).addClass("hidden");
                            var s = 0;
                            n.children().each(function () {
                                s += Math.round($(this).children().outerWidth());
                            }),
                                s + Math.round(t) > e + 2 || ((window.isMobile || e < 767) && a) ? ($(n).addClass("hidden"), $(o).removeClass("hidden")) : ($(n).removeClass("hidden"), $(o).addClass("hidden"));
                        }
                    });
                }),
            $(".panel.hideOnScroll").length > 0 && ((window.panelsToHide = !0), window.isScroll || window.isSimplifiedMobile))
        ) {
            var c,
                u = 0,
                h = window.hideOnScrollSensitivity ? window.hideOnScrollSensitivity : 100,
                p = $(".panel.hideOnScroll");
            $(window).on("mousewheel", function (e) {
                var t = $(this).scrollTop(),
                    i = $(p),
                    n = Math.ceil(Math.abs(e.deltaY) * e.deltaFactor);
                t > c ? (u += n) >= h && (i.addClass("hide"), (u = h)) : (u -= n) <= h / 5 && ((u = 0), i.removeClass("hide")), (c = t), (t + window.windowHeight + h >= window.documentHeight || t + h <= 0) && i.removeClass("hide");
            });
        }
        if (window.isMobile) {
            var f = window.isScroll ? $(document) : $(".slide .content"),
                m = (f.find(".container").outerHeight(), 0),
                w =
                    (Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight),
                    $(".panel.top.hideOnScroll")),
                g = $(".panel.bottom.hideOnScroll");
            f.on("scroll", function (t) {
                if (!window.inAction) {
                    var i = $(this),
                        n = $(this).scrollTop(),
                        o = n > m ? "down" : "up";
                    "down" === o && i.scrollTop() > 0 ? (w && e.addClass("hidePanel-top"), g && e.addClass("hidePanel-bottom")) : "up" === o && e.removeClass("hidePanel-top hidePanel-bottom"), (m = n);
                }
            });
        }
        $(document).on("keydown", function (e) {
            var t = $(".slide.selected .content"),
                i = t.scrollTop(),
                n = i + parseInt(125),
                o = i - parseInt(125);
            window.disableKeyNavigation ||
                "input" == e.target.nodeName.toLowerCase() ||
                "textarea" == e.target.nodeName.toLowerCase() ||
                ((37 !== e.keyCode && 33 !== e.keyCode) || (e.preventDefault(), window.horizontalMode && window.changeSlide("decrease")),
                (38 !== e.keyCode && 33 !== e.keyCode) ||
                    (window.horizontalMode ? (e.preventDefault(), TweenLite.to(t, window.scrollSpeed, { scrollTo: { y: o, autoKill: !0 }, ease: Power4.easeOut, overwrite: 5 })) : (e.preventDefault(), window.changeSlide("decrease"))),
                (39 !== e.keyCode && 34 !== e.keyCode) || (window.horizontalMode && (e.preventDefault(), window.changeSlide("increase"))),
                (40 !== e.keyCode && 34 !== e.keyCode) ||
                    (window.horizontalMode ? (e.preventDefault(), TweenLite.to(t, window.scrollSpeed, { scrollTo: { y: n, autoKill: !0 }, ease: Power4.easeOut, overwrite: 5 })) : (e.preventDefault(), window.changeSlide("increase"))),
                27 === e.keyCode && (T(), M(), x(), a()));
        });
        var v = $(".navigation"),
            _ = $(v).find("ul"),
            y = $(".slide:not(.exclude)").length;
        function b() {
            setTimeout(function () {
                $(_).length > 0 &&
                    $(_).each(function (e, t) {
                        $(t).find("li.selected").removeClass("selected");
                        var i = $(".slide.selected"),
                            n = parseInt(i.data("parent-slide-id")),
                            o = i.index(".slide:not(.exclude)");
                        -1 !== o ? $(t).find("li").eq(o).addClass("selected") : n && ((o = $('.slide[data-slide-id="' + n + '"]').index(".slide:not(.exclude)")), $(t).find("li").eq(o).addClass("selected"));
                    });
            }, 100);
        }
        function T() {
            if (window.sidebarShown) {
                $html.removeClass("sidebarShown").removeClassByPrefix("sidebar_");
                var e = $(".sidebar.visible");
                e.removeClass("visible"),
                    (window.removeAnimationTimeout = setTimeout(function () {
                        e.removeClass("animate active").find(".done").removeClass("done");
                    }, 500)),
                    (window.sidebarShown = 0),
                    (window.allowSlide = 1);
            }
        }
        function x(e) {
            if (((e = void 0 !== e && e), $.isArray(window.popupShown))) {
                var t = e || window.popupShown.slice(-1)[0],
                    i = $('.popup.visible[data-popup-id="' + t + '"]'),
                    n = i.find("iframe[src]"),
                    o = i.find("video");
                n.length > 0 &&
                    (i.hasClass("autoplay") || i.find("iframe.autoplay").length) &&
                    $(n).each(function (e, t) {
                        var i = $(t).attr("src").replace("?autoplay=1", "?").replace("&autoplay=1", "");
                        $(t).attr("src", i);
                    }),
                    o.length > 0 &&
                        $(o).each(function (e, t) {
                            $(t)[0].pause(), ($(t)[0].currentTime = 0);
                        }),
                    clearTimeout(window.clearPopupElementAnimation),
                    i.addClass("hidePopup"),
                    $(window).trigger("popupHidden"),
                    setTimeout(function () {
                        if (((window.allowSlide = 1), i.removeClass("visible animate active hidePopup").removeAttr("style").find(".done").removeClass("done"), $html.removeClass("popup_" + t), $.isArray(window.popupShown))) {
                            var e = window.popupShown.indexOf(t);
                            -1 != e && window.popupShown.splice(e, 1);
                        }
                        window.popupShown.length <= 0 && ($html.removeClass("popupShown"), (window.popupShown = !1));
                    }, 500);
            }
        }
        if (
            ($(_).length > 0 &&
                ($(_).is(":empty") &&
                    $(_).each(function (e, t) {
                        for (var i = 1; i <= y; i++) {
                            var n = $(".slide:not(.exclude):eq(" + (i - 1) + ")").data("title");
                            void 0 === n ? $(t).append("<li></li>") : $(t).append('<li data-title="' + n + '"></li>');
                        }
                    }),
                $(".navigation li").on("click touchend", function () {
                    var e = $(this).index(),
                        t = $(".slide:not(.exclude):eq(" + e + ")").index(".slide");
                    $(this).blur(), window.changeSlide(t + 1);
                }),
                $(".side").hasClass("compact") ||
                    $(window).on("load resize ready", function () {
                        var e = window.windowHeight - 140,
                            t = $(".side").removeClass("compact").find("ul"),
                            i = 0;
                        $(t)
                            .children()
                            .each(function () {
                                i += Math.round($(this).outerHeight(!0));
                            }),
                            i > e ? $(".side").addClass("compact") : $(".side").removeClass("compact");
                    })),
            $("a[href^='#'][target!='_blank']").click(function (e) {
                var t = $(this).attr("href").split("#")[1],
                    i = t ? $('.slide[id="' + t + '"], .slide[data-name="' + t + '"]') : $(".slide:eq(0)");
                if (i.length > 0) {
                    if ((e.preventDefault(), (window.isMobile && window.isSimplifiedMobile) || window.isScroll)) {
                        var n = i;
                        n.length && $("html,body").stop().clearQueue().animate({ scrollTop: n.position().top }, 1e3), window.setHashLink && (window.location.hash = t);
                    } else ($(this).hasClass("toLastSlide") && $("body").hasClass("lastSlide")) || ((window.stage = $(".slide").index(i) + 1), o(window.stage));
                    T();
                }
            }),
            $(".sidebarTrigger[data-sidebar-id]").on("click", function () {
                var e = $(this).data("sidebar-id");
                window.showSidebar(e);
            }),
            (window.showSidebar = function (e) {
                var t = e,
                    i = $('.sidebar[data-sidebar-id="' + t + '"]'),
                    n = $(i).hasClass("animated");
                window.sidebarShown
                    ? T()
                    : i.length > 0 &&
                      ((window.sidebarShown = 1),
                      (window.allowSlide = 0),
                      $(i).removeClass("animate active").addClass("visible"),
                      $html.addClass("sidebarShown sidebar_" + t),
                      $(i).find(".content").scrollTop(0),
                      n &&
                          (clearTimeout(window.removeAnimationTimeout),
                          setTimeout(function () {
                              $(i).addClass("animate active");
                          }, 100))),
                    M();
            }),
            $(document).on("mouseup touchstart", function (e) {
                var t = $(".sidebarShown .sidebar, .dropdownTrigger"),
                    i = e.target;
                !t.is(i) && 0 === t.has(i).length && window.hideSidebarOnBodyClick && !1 === $(i).hasClass("ignoreBodyClick") && T(), $(window).trigger("sidebarHidden");
            }),
            $('.sidebar .close, .sidebar [data-sidebar-action="close"]').on("click touchstart", function () {
                T();
            }),
            $(".popupTrigger[data-popup-id]").on("click", function () {
                var e = $(this).data("popup-id"),
                    t = $(this).data("popup-focus-input");
                "string" != typeof t && "" != t && (t = !1), window.showPopup(e, t);
            }),

            (window.showPopup = function (e, t) {
                var i,
                    n = e,
                    o = t,
                    a = $('.popup[data-popup-id="' + n + '"]'),
                    s = a.hasClass("animated");
                if (a.length > 0) {
                    T(),
                        $(a).addClass("visible"),
                        $(window).trigger("popupShown"),
                        $.when(
                            ((i = jQuery.Deferred()),
                            s
                                ? setTimeout(function () {
                                      $(a).addClass("animate active"),
                                          clearTimeout(window.clearPopupElementAnimation),
                                          (window.clearPopupElementAnimation = setTimeout(function () {
                                              $(a).find("[class*='ae-']").addClass("done"), i.resolve("done");
                                          }, window.effectSpeed + window.cleanupDelay));
                                  }, 100)
                                : i.resolve("done"),
                            i.promise())
                        ).then(
                            function (e) {
                                o &&
                                    $(a)
                                        .find("#" + o)
                                        .focus();
                            },
                            function (e) {},
                            function (e) {}
                        ),
                        $html.addClass("popupShown popup_" + n),
                        $(a).find(".content").scrollTop(0),
                        (window.allowSlide = 0),
                        window.popupShown || (window.popupShown = []),
                        window.popupShown.push(n);
                    var r = $(a),
                        l = r.find("iframe"),
                        d = r.find("video");
                    l.length > 0 &&
                        l.each(function () {
                            var e = $(this),
                                t = e.attr("src") ? e.attr("src") : e.data("src"),
                                i = t.indexOf("?") > -1 ? "&" : "?";
                            $(a).hasClass("autoplay") || (e.hasClass("autoplay") && e.closest(".slider li.selected").length) ? (e.attr("allow", "autoplay"), e.attr("src", t + i + "autoplay=1")) : e.attr("src") || e.attr("src", t);
                        }),
                        d.length > 0 &&
                            d.each(function () {
                                var e = $(this);
                                e.find("source[data-src]").length > 0 &&
                                    (e.find("source").each(function () {
                                        $(this).attr("src") || $(this).attr("src", $(this).data("src"));
                                    }),
                                    e[0].load()),
                                    ($(a).hasClass("autoplay") || (e.hasClass("autoplay") && e.closest(".slider li.selected").length)) && e[0].play();
                            });
                }
                M();
            }),
            window.hidePopupOnBodyClick)
        ) {
            var C = !1;
            $(document).on("mousedown", function (e) {
                C = !!$(e.target).closest(".popupShown .popup .popupContent, .popupTrigger").length;
            }),
                $(document).on("click", function (e) {
                    var t = $(".popupShown .popup .popupContent, .popupTrigger");
                    !t.is(e.target) && 0 === t.has(e.target).length && t.length > 0 && !C && !1 !== ($(e.target).closest(".dialog").length && 0 != $(e.target).closest(".popup").length) && x();
                });
        }
        $('.popup [data-popup-action="close"]').on("click", function () {
            x($(this).parents(".popup").data("popup-id"));
        }),
            window.setPopupHash &&
                ($(".popupTrigger[data-popup-id]").on("click", function () {
                    var e = $(this).attr("data-popup-id");
                    window.location.hash = "#" + e;
                }),
                (window.setPopupHash = []),
                $(".popupTrigger").each(function () {
                    var e = $(this).attr("data-popup-id");
                    -1 == $.inArray(e, window.setPopupHash) && window.setPopupHash.push(e);
                }),
                -1 !== $.inArray(window.location.hash.split("#")[1], window.setPopupHash) &&
                    setTimeout(function () {
                        $('.popupTrigger[data-popup-id="' + window.location.hash.split("#")[1] + '"]').click();
                    }, 500),
                $(window).on("popupHidden", function () {
                    history.pushState ? window.history.pushState("", "", location.href.split("#")[0]) : (window.location.hash = "");
                })),
            $(window).on("resize load ready popupShown", function () {
                setTimeout(function () {
                    var e;
                    (e = $(".grid.equal, .flex.equal")).length &&
                        $(e).each(function (e, t) {
                            var i = window.windowWidth,
                                n = $(t).hasClass("later") ? 767 : 1024,
                                o = ((n = $(t).data("equal-collapse-width") ? parseInt($(t).data("equal-collapse-width")) : n), $(t).find(".equalElement")),
                                a = $(this).hasClass("equalMobile");
                            if (i >= n || a) {
                                var s = 0;
                                $(o).each(function (e, t) {
                                    $(t).css("height", "auto"), s < $(t).outerHeight() && (s = $(t).outerHeight());
                                }),
                                    $(t)
                                        .find(".equalElement")
                                        .each(function (e, t) {
                                            $(t).css("height", s + "px");
                                        });
                            } else $(o).css("height", "auto");
                        });
                }, 1);
            }),
            $(window)
                .on("resize", function () {
                    $html.addClass("resizing");
                })
                .on("resizeEnd", function () {
                    $html.removeClass("resizing");
                });
        var S = $(".slider"),
            k = function (e, t, i) {
                e.length > 0 &&
                    e.each(function () {
                        var e = $(this);
                        e.find(".now").text(t + 1), e.find(".total").text(i.children("li").length);
                    });
            },
            P = function (e, t) {
                if (
                    (e.find(">li iframe").each(function () {
                        var e = $(this).attr("src");
                        "string" == typeof e && -1 != e.indexOf("autoplay") && ((e = e.replace("?autoplay=1", "?").replace("&autoplay=1", "")), $(this).attr("src", e)),
                            "string" == typeof (e = $(this).attr("data-src")) && -1 != e.indexOf("autoplay") && ((e = e.replace("?autoplay=1", "?").replace("&autoplay=1", "")), $(this).attr("data-src", e));
                    }),
                    e.find(">li video").each(function () {
                        $(this)[0].pause(), ($(this)[0].currentTime = 0);
                    }),
                    0 == e.closest(".popup").length || t)
                ) {
                    var i = e.find("li.selected iframe.autoplay");
                    if (i.length > 0) {
                        var n = i.attr("src") ? i.attr("src") : i.data("src"),
                            o = n.indexOf("?") > -1 ? "&" : "?";
                        -1 == n.indexOf("autoplay") && (i.attr("allow", "autoplay"), i.attr("src", n + o + "autoplay=1"));
                    }
                    var a = e.find("li.selected video.autoplay");
                    a.length > 0 &&
                        (a.find("source[data-src]").length > 0 &&
                            a.find("source").each(function () {
                                $(this).attr("src") || $(this).attr("src", $(this).data("src"));
                            }),
                        a[0].load(),
                        a[0].play());
                }
            };
        $(S).length > 0 &&
            $(S).each(function (e, t) {
                var i = $(t),
                    n = i.data("slider-id"),
                    o = i.find(".selected").index();
                if ((window.sliderStatus && $html.removeClassByPrefix("slider_" + n).addClass("slider_" + n + "_" + o), i.hasClass("autoplay"))) {
                    var a = i.data("slider-interval") ? parseInt(i.data("slider-interval")) : 5e3,
                        s = setInterval(function () {
                            i.trigger("next");
                        }, a);
                    0 != i.data("slider-stoponclick") &&
                        $('[data-slider-id="' + n + '"]').on("mousedown touchstart", function () {
                            clearInterval(s);
                        });
                }
                if (
                    ((i.hasClass("clickable") || i.hasClass("autoplay") || i.hasClass("swipeable")) &&
                        (i.on("next", function (e) {
                            var t = $(this).data("slider-id"),
                                i = $('.slider[data-slider-id="' + t + '"]'),
                                n = e.target;
                            "cancel" != $(n).data("slider-event") &&
                                (i.each(function () {
                                    var e = $(this),
                                        t = e.data("slider-id"),
                                        i = e.children(".selected"),
                                        n = i.nextOrFirst("li"),
                                        o = n.index(),
                                        a = $('.controller[data-slider-id="' + t + '"]'),
                                        s = $('.sliderCounter[data-slider-id="' + t + '"]'),
                                        r = e.is(".animated, .animateOnEvent");
                                    i
                                        .removeClass("selected")
                                        .addClass("hide")
                                        .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                                            $(this).removeClass("hide");
                                        }),
                                        n.removeClass("hide").addClass("selected"),
                                        e.find(">li iframe.autoplay, >li video.autoplay") && P(e, !0),
                                        window.sliderStatus && $html.removeClassByPrefix("slider_" + t).addClass("slider_" + t + "_" + o),
                                        r &&
                                            (e.addClass("animateOnEvent"),
                                            e.find("li").removeClassByPrefix("ae-").removeClass("do"),
                                            e.find(".selected").each(function (e) {
                                                $(this)
                                                    .removeClassByPrefix("ae-")
                                                    .removeClass("do")
                                                    .addClass("ae-" + (e + 1))
                                                    .addClass("do");
                                            }),
                                            $(window).scroll()),
                                        t &&
                                            a.length > 0 &&
                                            a.each(function () {
                                                var e = $(this);
                                                e.children(".selected").removeClass("selected"), e.children("li:eq(" + o + ")").addClass("selected");
                                            }),
                                        k(s, o, e);
                                }),
                                window.sliderStatus && $html.removeClassByPrefix("slider_" + t).addClass("slider_" + t + "_" + o));
                        }),
                        i.on("prev", function (e) {
                            var t = $(this).data("slider-id"),
                                i = $('.slider[data-slider-id="' + t + '"]'),
                                n = e.target;
                            "cancel" != $(n).data("slider-event") &&
                                (i.each(function () {
                                    var e = $(this),
                                        t = e.data("slider-id"),
                                        i = e.children(".selected"),
                                        n = i.prevOrLast("li"),
                                        o = n.index(),
                                        a = $('.controller[data-slider-id="' + t + '"]'),
                                        s = $('.sliderCounter[data-slider-id="' + t + '"]'),
                                        r = e.is(".animated, .animateOnEvent");
                                    i
                                        .removeClass("selected")
                                        .addClass("hide")
                                        .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                                            $(this).removeClass("hide");
                                        }),
                                        n.removeClass("hide").addClass("selected"),
                                        e.find(">li iframe.autoplay, >li video.autoplay") && P(e, !0),
                                        window.sliderStatus && $html.removeClassByPrefix("slider_" + t).addClass("slider_" + t + "_" + o),
                                        r &&
                                            (e.addClass("animateOnEvent"),
                                            e.find("li").removeClassByPrefix("ae-").removeClass("do"),
                                            e.find(".selected").each(function (e) {
                                                $(this)
                                                    .removeClassByPrefix("ae-")
                                                    .removeClass("do")
                                                    .addClass("ae-" + (e + 1))
                                                    .addClass("do");
                                            }),
                                            $(window).scroll()),
                                        t &&
                                            a.length > 0 &&
                                            a.each(function () {
                                                var e = $(this);
                                                e.children(".selected").removeClass("selected"), e.children("li:eq(" + o + ")").addClass("selected");
                                            }),
                                        k(s, o, e);
                                }),
                                window.sliderStatus && $html.removeClassByPrefix("slider_" + t).addClass("slider_" + t + "_" + o));
                        }),
                        (i.hasClass("clickable") || i.hasClass("autoplay")) &&
                            i.on("click", function () {
                                $(this).trigger("next");
                            })),
                    i.hasClass("swipeable"))
                ) {
                    i.swipe({
                        swipeStatus: function (e, t, n, o) {
                            "end" == t && o > 50 && ("right" == n && i.trigger("prev"), "left" == n && i.trigger("next"));
                        },
                        maxTimeThreshold: 0,
                        fingers: "all",
                    });
                }
            });
        var E = $(".controller");
        if (E.length > 0) {
            var I = E.data("controller-selector") ? E.data("controller-selector") : "li";
            E.on("click", I, function () {
                var e = $(this),
                    t = e.closest(".controller"),
                    i = $(t.find(I)).index(e),
                    n = t.data("slider-id"),
                    o = $('.slider[data-slider-id="' + n + '"]'),
                    a = $('.controller[data-slider-id="' + n + '"]'),
                    s = $('.sliderCounter[data-slider-id="' + n + '"]');
                e.hasClass("selected") ||
                    (a.each(function () {
                        var e = $(this);
                        e.children(".selected").removeClass("selected"), e.children("li:eq(" + i + ")").addClass("selected");
                    }),
                    o.each(function () {
                        var e = $(this),
                            t = e.hasClass("animated");
                        e
                            .children(".selected")
                            .removeClass("selected")
                            .addClass("hide")
                            .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                                $(this).removeClass("hide");
                            }),
                            e.children("li").eq(i).removeClass("hide").addClass("selected"),
                            e.find(">li iframe.autoplay, >li video.autoplay") && P(e, !1),
                            t &&
                                (e.addClass("animateOnEvent"),
                                e.find(">li").removeClassByPrefix("ae-").removeClass("do"),
                                e.find(".selected").each(function (e) {
                                    $(this)
                                        .removeClassByPrefix("ae-")
                                        .removeClass("do")
                                        .addClass("ae-" + (e + 1))
                                        .addClass("do");
                                }),
                                $(window).scroll()),
                            k(s, i, e);
                    }),
                    window.sliderStatus && $html.removeClassByPrefix("slider_" + sliderID).addClass("slider_" + sliderID + "_" + i));
            });
        }
        function A(e, t) {
            t = void 0 !== t && t;
            var i = e.offset(),
                n = e.position(),
                o = window.popupShown ? Math.ceil(n.top) : Math.ceil(i.top),
                a = Math.ceil(i.left),
                s = e.data("dropdown-id"),
                r = $('.dropdown[data-dropdown-id="' + s + '"]'),
                l = e.data("dropdown-position") ? e.data("dropdown-position") : r.attr("class"),
                d = 0 != r.data("dropdown-set-position"),
                c = ((l = l.split(" ")), !1);
            "number" == typeof window.dropdownInterval && clearInterval(window.dropdownInterval),
                t
                    ? ((c = !1),
                      $(document).mousemove(function (e) {
                          c = !($(e.target).attr("data-dropdown-id") != s && !$(e.target).closest(".dropdownTrigger.hover[data-dropdown-id=" + s + "]").length && !$(e.target).closest(".dropdown[data-dropdown-id=" + s + "]").length);
                      }),
                      (window.dropdownInterval = setInterval(function () {
                          c || (M(), clearInterval(window.dropdownInterval));
                      }, 300)))
                    : M(),
                -1 != l.indexOf("bottom") ? ((o -= r.outerHeight()), r.removeClass("top").addClass("bottom")) : ((o += e.outerHeight()), r.removeClass("bottom").addClass("top")),
                -1 != l.indexOf("right")
                    ? ((a = a - r.outerWidth() + e.outerWidth()), r.removeClass("left center").addClass("right"))
                    : -1 != l.indexOf("left")
                    ? r.removeClass("right center").addClass("left")
                    : -1 != l.indexOf("center") && ((a = a - r.outerWidth() / 2 + e.outerWidth() / 2), r.removeClass("right left").addClass("center")),
                r.hasClass("hide") && r.hasClass("show") && r.removeClass("hide show"),
                r.addClass("show"),
                d && r.css("top", o).css("left", a),
                $html.addClass("dropdownShown dropdown_" + s),
                (window.dropdownShown = !0);
        }
        function M() {
            window.dropdownShown &&
                ((r = 0),
                (window.dropdownShown = !1),
                $(".dropdown.show")
                    .addClass("hide")
                    .one("webkitTransitionEnd otransitionend msTransitionEnd transitionend", function () {
                        $(this).removeClass("show hide"), $html.removeClass("dropdownShown").removeClassByPrefix("dropdown_");
                    }),
                $(window).trigger("dropdownHidden"));
        }
        $(document).on("click", "[data-slider-action]", function () {
            if ($(this).data("slider-id")) {
                var e,
                    t,
                    i = $(this),
                    n = i.data("slider-id"),
                    o = i.data("slider-action"),
                    a = $('.slider[data-slider-id="' + n + '"]'),
                    s = $('.controller[data-slider-id="' + n + '"]'),
                    r = $('.sliderCounter[data-slider-id="' + n + '"]');
                window.sliderStatus && $html.removeClassByPrefix("slider_" + n).addClass("slider_" + n + "_" + t),
                    a.each(function () {
                        var i = $(this),
                            n = (s.data("controller-selector") && s.data("controller-selector"), i.find(".selected")),
                            a = i.hasClass("animated");
                        "next" === o ? (e = n.nextOrFirst("li")) : "prev" === o ? (e = n.prevOrLast("li")) : (parseInt(o) || 0 === o) && ((t = parseInt(o)), (e = i.find(">li:eq(" + t + ")"))),
                            (t = e.index()),
                            n.removeClass("selected"),
                            e.removeClass("hide").addClass("selected"),
                            i.find(">li iframe.autoplay, >li video.autoplay") && P(i, !0),
                            a &&
                                (i.addClass("animateOnEvent"),
                                i.find("li").removeClassByPrefix("ae-").removeClass("do"),
                                i.find(".selected").each(function (e) {
                                    $(this)
                                        .removeClassByPrefix("ae-")
                                        .removeClass("do")
                                        .addClass("ae-" + (e + 1))
                                        .addClass("do");
                                }),
                                $(window).scroll()),
                            k(r, t, i);
                    }),
                    s.each(function () {
                        var e = $(this);
                        n &&
                            e.length > 0 &&
                            (e
                                .find(".selected")
                                .removeClass("selected")
                                .addClass("hide")
                                .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                                    i.removeClass("hide");
                                }),
                            e.find(I).eq(t).addClass("selected"));
                    });
            }
        }),
            $("[data-slider-id].autoHeight").each(function (e, t) {
                $(window).on("click resize load ready next", function () {
                    var e = 0;
                    $(t).find(".selected");
                    $(t)
                        .find(".selected")
                        .children()
                        .each(function () {
                            e += Math.round($(this).outerHeight(!0));
                        }),
                        $(t).height(e + "px");
                });
            }),
            $(".slider.clickable[data-slider-id], .controller[data-slider-id]").on("click", function (e) {
                "cancel" != $(e.target).data("slider-event") && $(window).resize();
            }),
            (window.dropdownShown = !1),
            (window.dropdownInterval = !1),
            $("body").on("click", ".dropdownTrigger", function () {
                A($(this));
            }),
            $(".dropdownTrigger.hover").hover(function () {
                A($(this), "hover");
            }),
            $(window).on("resize", function () {
                M();
            }),
            $(document).on("mouseup touchstart", function (e) {
                var t = $(".dropdownShown .dropdown");
                !t.is(e.target) && 0 === t.has(e.target).length && window.dropdownShown && M();
            }),
            (window.shareUrl = window.location.href),
            $(".share").data("url") && (window.shareUrl = $(".dropdown").data("url")),
            (window.shareText = document.title),
            $(".share").data("text") && (window.shareText = $(".dropdown").data("url")),
            $(".share").sharrre({
                enableHover: !1,
                url: window.shareUrl,
                text: window.shareText,
                enableCounter: !1,
                share: { twitter: !0, facebook: !0, pinterest: !0, googlePlus: !0, stumbleupon: !0, linkedin: !0 },
                buttons: { pinterest: { media: $(".dropdown").data("pinterest-image"), description: $(".dropdown").data("text") + " " + $(".dropdown").data("url") } },
                template: $(".share").html(),
                render: function (e) {
                    $(e.element).on("click touchstart", ".social-twitter", function () {
                        e.openPopup("twitter");
                    }),
                        $(e.element).on("click touchstart", ".social-facebook", function () {
                            e.openPopup("facebook");
                        }),
                        $(e.element).on("click touchstart", ".social-pinterest", function () {
                            e.openPopup("pinterest");
                        }),
                        $(e.element).on("click touchstart", ".social-googlePlus", function () {
                            e.openPopup("googlePlus");
                        }),
                        $(e.element).on("click touchstart", ".social-stumbleupon", function () {
                            e.openPopup("stumbleupon");
                        }),
                        $(e.element).on("click touchstart", ".social-linkedin", function () {
                            e.openPopup("linkedin");
                        }),
                        $(e.element).on("click touchstart", ".mail", function () {
                            var e = $(this).data("subject") ? $(this).data("subject") : "",
                                t = $(this).data("body") ? $(this).data("body") : "",
                                i = $(".dropdown").data("url") ? $(".dropdown").data("url") : window.location.href;
                            window.location.href = "mailto:?subject=" + encodeURIComponent(e) + "&body=" + encodeURIComponent(t) + "%20" + i;
                        });
                },
            }),
            ($.fn.slidesDialog = function (e) {
                if (0 == $(document).find(".dialogContainer").length) return !1;
                if ("bindOpenCloseMethods" == e) return o($(this)), !1;
                var t = this;
                if (0 == t.length) {
                    if (!e.id) return alert("Error: you need to provide the 'id' property to create a dialog!"), !1;
                    t = $(document).find(".dialog[data-dialog-id=" + e.id + "]");
                }
                function i(e, t) {
                    var i = n(e);
                    if (
                        (e && e.settings && e.settings.template != i.template && ($(e).remove(), (e = !1)),
                        e || ((e = $(i.template)).attr("data-dialog-id", i.id), $(".dialogContainer").prepend(e), o(e.find("[data-dialog-action]")), (e = e[0])),
                        (e.settings = i),
                        (function (e) {
                            var t = e.settings;
                            (e.open = function (i) {
                                e.openTimeout && clearTimeout(e.openTimeout),
                                    e.closeTimeout && clearTimeout(e.closeTimeout),
                                    (e.openTimeout = setTimeout(
                                        function () {
                                            $(e).is(":visible") ||
                                                $(e)
                                                    .addClass("reveal")
                                                    .slideDown(t.speed, function () {
                                                        $(this).removeClass("reveal hidden");
                                                    });
                                        },
                                        i ? 0 : t.openAfter
                                    )),
                                    t.closeAfter + t.openAfter > t.openAfter &&
                                        !i &&
                                        (e.closeTimeout = setTimeout(function () {
                                            e.close();
                                        }, t.closeAfter + t.openAfter));
                            }),
                                (e.close = function () {
                                    e.openTimeout && clearTimeout(e.openTimeout),
                                        e.closeTimeout && clearTimeout(e.closeTimeout),
                                        $(e).is(":visible") &&
                                            $(e)
                                                .addClass("hide")
                                                .slideUp(t.speed, function () {
                                                    $(this).removeClass("hide");
                                                });
                                });
                        })(e),
                        "close" == i.action || i.closeByCookie || e.open(),
                        i.closeByCookie && e.close(),
                        $(e)
                            .find("[data-href]")
                            .on("click", function () {
                                $(this).data("target") ? window.open($(this).data("href"), "_blank") : (window.location = $(this).data("href"));
                            }),
                        $(e)
                            .find('[data-type="submit"]')
                            .click(function () {
                                $(this).parents("form").submit();
                            }),
                        null != $(e).attr("data-dialog-cookie-age") && e.settings.id)
                    ) {
                        var a = parseInt($(e).attr("data-dialog-cookie-age"));
                        $.cookie(e.settings.id, !0, { expires: a, path: "/" });
                    }
                    return !0;
                }
                function n(t) {
                    var i = {
                        template:
                            '<div class="dialog hidden"><div class="close" data-dialog-action="close"></div><div class="dialogContent"><div class="text opacity-8">This popup was created with javascript. This is the default template. You can provide HTML code in the "template" property and it will be used as a Dialog box HTML.</div></div><ul><li data-dialog-action="close" class="indigo">Nice!</li></ul></div>',
                        action: "close",
                        id: !1,
                        speed: 500,
                        openAfter: 0,
                        closeAfter: 0,
                        closeByCookie: !1,
                    };
                    if (t) {
                        t.settings && (i = t.settings);
                        var n = $(t);
                        Object.keys(n.data()).length &&
                            (n.attr("data-dialog-id") && (i.id = n.attr("data-dialog-id")),
                            n.attr("data-dialog-action") && (i.action = n.attr("data-dialog-action")),
                            n.attr("data-dialog-speed") && (i.speed = parseInt(n.attr("data-dialog-speed"))),
                            n.attr("data-dialog-open-delay") && (i.openAfter = parseInt(n.attr("data-dialog-open-delay"))),
                            n.attr("data-dialog-close-delay") && (i.closeAfter = parseInt(n.attr("data-dialog-close-delay")))),
                            $.cookie(n.attr("data-dialog-id")) && (i.closeByCookie = !0);
                    }
                    return (i = $.extend({}, i, e));
                }
                function o(e) {
                    $(e).click(function () {
                        var e = $(this).attr("data-dialog-action"),
                            t = $(this).attr("data-dialog-id");
                        ("" != t && null != t) || (t = !1),
                            "close" == e
                                ? t && 0 == $(this).closest(".dialog").length
                                    ? $(document)
                                          .find(".dialog[data-dialog-id=" + t + "]")
                                          .slidesDialog("close")
                                    : $(this).closest(".dialog").slidesDialog("close")
                                : (e = t) &&
                                  $(document)
                                      .find(".dialog[data-dialog-id=" + t + "]")
                                      .slidesDialog("open");
                    });
                }
                t.length
                    ? t.each(function (t, n) {
                          "string" != typeof e ? i(n, e) : ("open" == e && n.open(!0), "close" == e && n.close());
                      })
                    : i(!1, e);
            }),
            $(".dialog[data-dialog-id]").slidesDialog(),
            $(document).find("[data-dialog-action]:not(.dialog)").slidesDialog("bindOpenCloseMethods"),
            $("#contact-form, [data-ajax-form]").each(function (e, t) {
                $(t).ajaxForm(function () {
                    var e = $(t),
                        i = $(t).find('[type="submit"]'),
                        n = !!i.is("input"),
                        o = i.data("success-text") ? i.data("success-text") : "Done!",
                        a = i.data("success-class") ? i.data("success-class") : "green",
                        s = n ? i.val() : i.html(),
                        r = i.attr("class");
                    n ? i.val(o) : i.text(o),
                        i.addClass(a),
                        setTimeout(function () {
                            n ? i.val(s) : i.html(s), i.attr("class", r), e[0].reset();
                        }, 4e3);
                });
            }),
            $("audio[data-sound-id]").each(function (e, t) {
                var i = $(t),
                    n = i.data("sound-id"),
                    o = i[0],
                    a = $('.soundTrigger[data-sound-id="' + n + '"]');
                o.autoplay ? a.addClass("playing") : a.removeClass("playing");
            }),
            $(".soundTrigger").click(function () {
                var e = $(this).data("sound-id"),
                    t = $('audio[data-sound-id="' + e + '"]'),
                    i = t.data("sound-action") ? t.data("sound-action") : "toggle",
                    n = parseInt(t.data("sound-fade")) >= 0 || t.data("sound-fade") ? parseInt(t.data("sound-fade")) : 500;
                !t[0].paused || ("toggle" !== i && "play" !== i)
                    ? ("toggle" !== i && "pause" !== i) ||
                      (t.animate({ volume: 0 }, n, function () {
                          t[0].pause();
                      }),
                      $(this).removeClass("playing"))
                    : (t[0].play(), t.animate({ volume: 1 }, n), $(this).addClass("playing"));
            });
    }),
    (window.isMobile = !1),
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (window.isMobile = !0),
    (window.isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1),
    (window.isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent)),
    (window.isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase())),
    (window.isChromeiOS = navigator.userAgent.match("CriOS")),
    (window.isMSIE = navigator.userAgent.match("MSIE") || (navigator.userAgent.match("Windows NT") && navigator.userAgent.match("rv:11.0"))),
    (window.isEdge = navigator.userAgent.match("Edge")),
    (window.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1),
    (window.isiPad = null !== navigator.userAgent.match(/iPad/i)),
    (window.isWindows = -1 !== navigator.platform.toUpperCase().indexOf("WIN")),
    (window.isOSX = -1 !== navigator.platform.toUpperCase().indexOf("MAC")),
    (window.isLinux = -1 !== navigator.platform.toUpperCase().indexOf("LINUX")),
    window.isOSX && navigator.maxTouchPoints && (window.isMobile = !0),
    window.isSafari && $html.addClass("safari"),
    window.isFirefox && $html.addClass("firefox"),
    window.isChrome && $html.addClass("chrome"),
    window.isMSIE && $html.addClass("msie"),
    window.isEdge && $html.addClass("edge"),
    window.isAndroid && $html.addClass("android"),
    window.isWindows && $html.addClass("windows"),
    window.isOSX && $html.addClass("osx"),
    window.isLinux && $html.addClass("linux"),
    window.isMobile ? $html.addClass("mobile") : $html.addClass("desktop"),
    (window.isRetina =
        (window.matchMedia &&
            (window.matchMedia("only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)").matches ||
                window.matchMedia(
                    "only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)"
                ).matches)) ||
        (window.devicePixelRatio && window.devicePixelRatio > 1.3)),
    window.isRetina && $html.addClass("retina");
