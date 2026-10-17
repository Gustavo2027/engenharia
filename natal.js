// EFEITOS DE NATAL - neve, pisca-pisca e capa natalina
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- NEVE (canvas, leve e responsiva) ---------- */
  function startSnow() {
    var canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var w = 0, h = 0, flakes = [];

    function targetCount() {
      // proporcional ao tamanho da tela, com limites para não pesar no celular
      return Math.max(35, Math.min(110, Math.round((w * h) / 14000)));
    }

    function makeFlake(randomY) {
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : -10,
        r: 1 + Math.random() * 2.6,
        v: 0.4 + Math.random() * 1.1,
        ph: Math.random() * Math.PI * 2,
        a: 0.5 + Math.random() * 0.5
      };
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var n = targetCount();
      while (flakes.length < n) flakes.push(makeFlake(true));
      if (flakes.length > n) flakes.length = n;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,' + f.a + ')';
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step() {
      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        f.ph += 0.015;
        f.y += f.v;
        f.x += Math.sin(f.ph) * 0.5;
        if (f.y > h + 10) { flakes[i] = makeFlake(false); }
        if (f.x > w + 10) f.x = -10;
        if (f.x < -10) f.x = w + 10;
      }
      draw();
      requestAnimationFrame(step);
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    });

    resize();
   requestAnimationFrame(step);
  }

  /* ---------- PISCA-PISCA (SVG recalculado conforme a largura) ---------- */
  function startLights() {
    var anchor = document.querySelector('.title-bar') || document.querySelector('.top-bar');
    if (!anchor) return;

    var wrap = document.createElement('div');
    wrap.className = 'xmas-lights';
    wrap.setAttribute('aria-hidden', 'true');
    anchor.insertAdjacentElement('afterend', wrap);

    var colors = ['#e24b4a', '#ffd34d', '#3fbf6a', '#4a9be8'];
    var lastW = 0;

    function build() {
      var w = Math.max(wrap.clientWidth, 280);
      if (w === lastW) return;
      lastW = w;

      var seg = w < 480 ? 40 : 52;
      var n = Math.ceil(w / seg);
      var d = 'M0 6';
      var bulbs = '';
      var k = 0;

      for (var i = 0; i < n; i++) {
        var x0 = i * seg;
        d += ' Q' + (x0 + seg / 2) + ' 26 ' + (x0 + seg) + ' 6';

        [0.28, 0.72].forEach(function (t) {
          var x = x0 + seg * t;
          var y = (1 - t) * (1 - t) * 6 + 2 * t * (1 - t) * 26 + t * t * 6;
          var c = colors[k % colors.length];
          var cls = k % 2 ? 'xl-a' : 'xl-b';
          k++;
          bulbs +=
            '<g class="' + cls + '">' +
            '<circle cx="' + x.toFixed(1) + '" cy="' + (y + 8).toFixed(1) + '" r="8" fill="' + c + '" opacity="0.22"/>' +
            '<rect x="' + (x - 2).toFixed(1) + '" y="' + y.toFixed(1) + '" width="4" height="4" fill="#666"/>' +
            '<ellipse cx="' + x.toFixed(1) + '" cy="' + (y + 9).toFixed(1) + '" rx="3.6" ry="5" fill="' + c + '"/>' +
            '</g>';
        });
      }

      wrap.innerHTML =
        '<svg viewBox="0 0 ' + w + ' 34" preserveAspectRatio="xMinYMin slice" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="' + d + '" fill="none" stroke="#3a3a3a" stroke-width="1.5"/>' +
        bulbs + '</svg>';
    }

    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(build, 120);
    });
    build();
  }

  /* ---------- CAPA NATALINA ---------- */
  var HAT =
    '<svg class="natal-hat" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M14 48 Q16 14 48 12 Q42 28 57 48 Z" fill="#c62828"/>' +
    '<rect x="9" y="45" width="52" height="11" rx="5.5" fill="#ffffff"/>' +
    '<circle cx="49" cy="12" r="6.5" fill="#ffffff"/></svg>';

  function holly(side) {
    return '<svg class="natal-holly ' + side + '" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">' +
      '<g transform="translate(18 26) rotate(-28)"><ellipse rx="16" ry="6" fill="#2e7d32"/></g>' +
      '<g transform="translate(34 26) rotate(28)"><ellipse rx="16" ry="6" fill="#388e3c"/></g>' +
      '<circle cx="24" cy="26" r="4.5" fill="#e53935"/>' +
      '<circle cx="31" cy="24" r="4.5" fill="#e53935"/>' +
      '<circle cx="28" cy="31" r="4.5" fill="#c62828"/></svg>';
  }

  function decorateCovers() {
    var covers = document.querySelectorAll('.cover-content');
    if (!covers.length) return false;

    covers.forEach(function (cover, index) {
      if (cover.dataset.natal) return;
      cover.dataset.natal = '1';

      if (index === 0) {
        var icon = cover.firstElementChild;
        if (icon) icon.innerHTML = HAT;
      }

      var sub = cover.querySelector('p');
      var msg = document.createElement('p');
      msg.className = 'natal-greeting';
      msg.textContent = index === 0 ? 'FELIZ NATAL' : 'BOAS FESTAS';
      if (sub) sub.insertAdjacentElement('afterend', msg);

      cover.insertAdjacentHTML('beforeend', holly('left') + holly('right'));
    });
    return true;
  }

  function init() {
    startSnow();
    startLights();
    // o livro é montado pelo script.js; tenta de novo se ainda não estiver pronto
    if (!decorateCovers()) {
      setTimeout(decorateCovers, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
