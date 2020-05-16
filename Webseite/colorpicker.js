/*!
 * ==============================================================
 *  COLOR PICKER 2.0.3
 * ==============================================================
 * Author: Taufik Nurrohman <https://github.com/taufik-nurrohman>
 * License: MIT
 * --------------------------------------------------------------
 */
!(function (n, t, e) {
	function r(n) {
		var t,
			e,
			r,
			i,
			o,
			u,
			c,
			f,
			a = +n[0],
			s = +n[1],
			l = +n[2];
		switch (((i = Math.floor(6 * a)), (o = 6 * a - i), (u = l * (1 - s)), (c = l * (1 - o * s)), (f = l * (1 - (1 - o) * s)), (i = i || 0), (c = c || 0), (f = f || 0), i % 6)) {
			case 0:
				(t = l), (e = f), (r = u);
				break;
			case 1:
				(t = c), (e = l), (r = u);
				break;
			case 2:
				(t = u), (e = l), (r = f);
				break;
			case 3:
				(t = u), (e = c), (r = l);
				break;
			case 4:
				(t = f), (e = u), (r = l);
				break;
			case 5:
				(t = l), (e = u), (r = c);
		}
		return [b(255 * t), b(255 * e), b(255 * r), p(v(n[3]) ? +n[3] : 1, 2)];
	}
	function i(n) {
		var t,
			e,
			r = +n[0] / 255,
			i = +n[1] / 255,
			o = +n[2] / 255,
			u = Math.max(r, i, o),
			c = Math.min(r, i, o),
			f = u,
			a = u - c,
			e = 0 === u ? 0 : a / u;
		if (u === c) t = 0;
		else {
			switch (u) {
				case r:
					t = (i - o) / a + (o > i ? 6 : 0);
					break;
				case i:
					t = (o - r) / a + 2;
					break;
				case o:
					t = (r - i) / a + 4;
			}
			t /= 6;
		}
		return [t, e, f, v(n[3]) ? +n[3] : 1];
	}
	function o(n, t) {
		var e = "touches",
			r = "clientX",
			i = "clientY",
			o = t[e] ? t[e][0][r] : t[r],
			u = t[e] ? t[e][0][i] : t[i],
			f = c(n);
		return [o - f[0], u - f[1]];
	}
	function u(n, t) {
		if (n === t) return n;
		for (; (n = n.parentElement) && n !== t; );
		return n;
	}
	function c(t) {
		var e, r, i;
		return t === n ? ((e = n.pageXOffset || x.scrollLeft), (r = n.pageYOffset || x.scrollTop)) : ((i = t.getBoundingClientRect()), (e = i.left), (r = i.top)), [e, r];
	}
	function f(t) {
		return t === n ? [n.innerWidth, n.innerHeight] : [t.offsetWidth, t.offsetHeight];
	}
	function a(n) {
		n && n.preventDefault();
	}
	function s(n) {
		return "function" == typeof n;
	}
	function l(n) {
		return "object" == typeof n;
	}
	function v(n) {
		return void 0 !== n || null === n;
	}
	function d(n) {
		return "string" == typeof n;
	}
	function h(n, t) {
		return n < t[0] ? t[0] : n > t[1] ? t[1] : n;
	}
	function p(n, t) {
		return +n.toFixed(t);
	}
	function g(n, t) {
		return parseInt(n, t || 10);
	}
	function b(n) {
		return Math.round(n);
	}
	function m(n, t) {
		return n.toString(t);
	}
	function k(n, t, e) {
		for (var r = 0, i = t.length; i > r; ++r) n.removeEventListener(t[r], e, !1);
	}
	function y(n, t, e) {
		for (var r = 0, i = t.length; i > r; ++r) n.addEventListener(t[r], e, !1);
	}
	function C(n, t, e) {
		n.style[t] = e;
	}
	var x = t.documentElement,
		E = "HEX",
		H = "children",
		M = "top",
		w = "right",
		L = "left",
		O = "px",
		j = n.setTimeout,
		z = "instances",
		T = ["touchstart", "mousedown"],
		X = ["touchmove", "mousemove"],
		I = ["orientationchange", "resize"],
		N = ["touchend", "mouseup"];
	!(function (n) {
		(n.version = "2.0.3"),
			(n.state = { class: "color-picker", color: E, e: T, parent: null }),
			(n[z] = {}),
			(n[E] = function (n) {
				if (d(n)) {
					var t = (n = n.trim()).length;
					if ((4 !== t && 7 !== t) || "#" !== n[0]) {
						if ((5 === t || 9 === t) && "#" === n[0] && /^#([a-z\d]{1,2}){4}$/i.test(n))
							return 5 === t ? [g(n[1] + n[1], 16), g(n[2] + n[2], 16), g(n[3] + n[3], 16), p(g(n[4] + n[4], 16) / 255, 2)] : [g(n[1] + n[2], 16), g(n[3] + n[4], 16), g(n[5] + n[6], 16), p(g(n[7] + n[8], 16) / 255, 2)];
					} else if (/^#([a-z\d]{1,2}){3}$/i.test(n)) return 4 === t ? [g(n[1] + n[1], 16), g(n[2] + n[2], 16), g(n[3] + n[3], 16), 1] : [g(n[1] + n[2], 16), g(n[3] + n[4], 16), g(n[5] + n[6], 16), 1];
					return [0, 0, 0, 1];
				}
				return "#" + ("000000" + m(+n[2] | (+n[1] << 8) | (+n[0] << 16), 16)).slice(-6) + (v(n[3]) && n[3] < 1 ? m(b(255 * n[3]) + 65536, 16).substr(-2) : "");
			}),
			(n._ = n.prototype);
	})(
		(n[e] = function (d, p) {
			function g(n) {
				var t,
					e = D[s(D[R.color]) ? R.color : E];
				if ((t = d.dataset.color)) return v(n) ? (d.dataset.color = e(t)) : e(t);
				if ((t = d.value)) return v(n) ? (d.value = e(t)) : e(t);
				if ((t = d.textContent)) return v(n) ? (d.textContent = e(t)) : e(t);
				if (!v(n)) return [0, 0, 0, 1];
			}
			function b(n, t) {
				if (!v(n)) return (F = {}), B;
				if (v(F[n]))
					if (v(t)) for (var e = 0, r = F[n].length; r > e; ++e) t === F[n][e] && F[n].splice(e, 1);
					else delete F[n];
				return B;
			}
			function m(n, t) {
				return v(F[n]) || (F[n] = []), v(t) && F[n].push(t), B;
			}
			function W(n, t) {
				if (!v(F[n])) return B;
				for (var e = 0, r = F[n].length; r > e; ++e) F[n][e].apply(B, t);
				return B;
			}
			function Y() {
				return P.parentNode;
			}
			function $(n) {
				var t = n.target,
					e = d === u(t, d);
				e ? !Y() && _(R.parent) : q();
			}
			function A(e, s) {
				function p(n) {
					lt && D(n), vt && F(n), dt && S(n), (Q = r(U)), (lt || vt || dt) && (W(ft || at || st ? "start" : "drag", Q), W("change", Q)), (ft = at = st = 0);
				}
				function b(n) {
					Q = r(U);
					var t = n.target,
						e = d === u(t, d),
						i = P === u(t, P);
					(B.current = null), e || i ? i && (lt || vt || dt) && W("stop", Q) : Y() && !1 !== V && q(), (lt = vt = dt = 0);
				}
				function m(n) {
					(B.current = nt), (ft = lt = 1), p(n), a(n);
				}
				function E(n) {
					(B.current = tt), (at = vt = 1), p(n), a(n);
				}
				function H(n) {
					(B.current = et), (st = dt = 1), p(n), a(n);
				}
				function z(n) {
					v(n[1]) && C(it, w, pt - mt / 2 - pt * +n[1] + O), v(n[2]) && C(it, M, gt - kt / 2 - gt * +n[2] + O), v(n[0]) && C(ot, M, yt - Ct / 2 - yt * +n[0] + O), v(n[3]) && C(ct, M, xt - Et / 2 - xt * +n[3] + O);
				}
				function D(n) {
					var t = o(nt, n),
						e = h(t[0], [0, pt]),
						r = h(t[1], [0, gt]);
					(U[1] = 1 - (pt - e) / pt), (U[2] = (gt - r) / gt), Z();
				}
				function F(n) {
					(U[0] = (yt - h(o(tt, n)[1], [0, yt])) / yt), Z();
				}
				function S(n) {
					(U[3] = (xt - h(o(et, n)[1], [0, xt])) / xt), Z();
				}
				function Z() {
					z(U);
					var n = r(U),
						t = r([U[0], 1, 1]);
					C(rt, "backgroundColor", "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"), C(ut, "backgroundImage", "linear-gradient(rgb(" + n[0] + "," + n[1] + "," + n[2] + "),transparent)");
				}
				(U = i((Q = g()))),
					(V = R.e),
					e || ((s || R.parent || K).appendChild(P), (B.visible = !0)),
					(_ = function (n) {
						return A(0, n), W("enter", Q), B;
					}),
					(q = function () {
						var e = Y();
						return e && (e.removeChild(P), (B.current = null), (B.visible = !1)), k(nt, T, m), k(tt, T, E), k(et, T, H), k(t, X, p), k(t, N, b), k(n, I, J), W("exit", Q), B;
					}),
					(G = function (t) {
						var e = f(n),
							r = f(x),
							i = e[0] - r[0],
							o = e[1] - x.clientHeight,
							u = c(n),
							a = c(d),
							s = f(P),
							p = s[0],
							g = s[1],
							b = a[0] + u[0],
							m = a[1] + u[1] + f(d)[1];
						if (l(t)) v(t[0]) && (b = t[0]), v(t[1]) && (m = t[1]);
						else {
							var k = u[0],
								y = u[1],
								E = u[0] + e[0] - p - i,
								H = u[1] + e[1] - g - o;
							(b = h(b, [k, E]) >> 0), (m = h(m, [y, H]) >> 0);
						}
						return C(P, L, b + O), C(P, M, m + O), W("fit", Q), B;
					}),
					(J = function () {
						return G();
					});
				var ht = f(nt),
					pt = ht[0],
					gt = ht[1],
					bt = f(it),
					mt = bt[0],
					kt = bt[1],
					yt = f(tt)[1],
					Ct = f(ot)[1],
					xt = f(et)[1],
					Et = f(ct)[1];
				e
					? (!1 !== V && y(d, V, $),
					  j(function () {
							W("change", Q);
					  }, 1))
					: (y(nt, T, m), y(tt, T, E), y(et, T, H), y(t, X, p), y(t, N, b), y(n, I, J), G()),
					(B.get = function () {
						return g();
					}),
					(B.set = function (n, t, e, r) {
						return (U = i([n, t, e, r])), Z(), B;
					}),
					Z();
			}
			if (d) {
				var B = this,
					D = n[e],
					F = {},
					P = t.createElement("div"),
					R = Object.assign({}, D.state, !1 === p || p instanceof Array ? { e: p } : p || {}),
					S = R["class"];
				if (d[e]) return B;
				if (!(B instanceof D)) return new D(d, p);
				(D[z][d.id || d.name || Object.keys(D[z]).length] = B),
					(d[e] = 1),
					(B.visible = !1),
					(P.className = S),
					(P.innerHTML = '<div><div class="' + S + ':sv"><div></div><div></div><div></div><i></i></div><div class="' + S + ':h"><div></div><i></i></div><div class="' + S + ':a"><div></div><div></div><i></i></div></div>');
				var _,
					q,
					G,
					J,
					K = t.body,
					Q = g(),
					U = i(Q),
					V = R.e,
					Z = P.firstChild,
					nt = Z[H][0],
					tt = Z[H][1],
					et = Z[H][2],
					rt = nt[H][0],
					it = nt[H][3],
					ot = (tt[H][0], tt[H][1]),
					ut = et[H][0],
					ct = et[H][2],
					ft = 0,
					at = 0,
					st = 0,
					lt = 0,
					vt = 0,
					dt = 0;
				A(1),
					(B.color = function (n, t, e, r) {
						return D[s(D[R.color]) ? R.color : E]([n, t, e, r]);
					}),
					(B.current = null),
					(B.enter = _),
					(B.exit = q),
					(B.fire = W),
					(B.fit = G),
					(B.hooks = F),
					(B.off = b),
					(B.on = m),
					(B.pop = function () {
						return d[e] ? (delete d[e], !1 !== V && k(d, V, $), q(), W("pop", Q)) : B;
					}),
					(B.value = function (n, t, e, r) {
						return B.set(n, t, e, r), W("change", [n, t, e, r]);
					}),
					(B.self = P),
					(B.source = d),
					(B.state = R);
			}
		})
	);
})(this, this.document, "CP");

var p = document.querySelectorAll("p")[1], // Put color picker panel to the second `<p>` element
	picker = new CP(document.querySelector("input"), {
		e: false,
		parent: p,
	});

picker.on("change", function (r, g, b, a) {
	if (elemSelected != null) {
		this.source.value = this.color(r, g, b, a);
		elemSelected.setAttribute("fill", "rgba(" + r + ", " + g + ", " + b + ", " + a + ")");
	}
});

// ...
picker.fit = function () {
	// Do nothing
	this.self.style.left = this.self.style.top = "";
};

// Add a `is-static` class to the color picker panel
picker.self.classList.add("is-static");

// Force to show the color picker panel
picker.enter();
