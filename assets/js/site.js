/* Shared behaviour: analytics, theme, nav, scroll animation, video.
   No dependencies. Everything degrades to a readable page if it fails. */
(function () {
  'use strict';

  /* ============================================================
     CONFIG
     Your GoatCounter code, without the rest of the URL.
     Your account is https://gunathiagarajan.goatcounter.com
     Empty this string and no analytics load at all.
     ============================================================ */
  var GOATCOUNTER_CODE = 'gunathiagarajan';

  var root = document.documentElement;
  root.classList.add('js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------- analytics */
  // GoatCounter sets no cookies and keeps no personal data, so this needs no
  // consent banner under GDPR. It reports visits, which pages, where people
  // came from and which country. The buckets below are the closest you get to
  // "how long did they stay" without tracking anyone as an individual.
  if (GOATCOUNTER_CODE) {
    var s = document.createElement('script');
    s.async = true;
    s.src = '//gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count');
    document.head.appendChild(s);

    var landed = Date.now();
    var reported = false;

    var bucketFor = function (seconds) {
      if (seconds < 10) return 'under-10s';
      if (seconds < 30) return '10-30s';
      if (seconds < 60) return '30-60s';
      if (seconds < 120) return '1-2min';
      if (seconds < 300) return '2-5min';
      return 'over-5min';
    };

    var reportDwell = function () {
      if (reported) return;
      reported = true;
      var seconds = Math.round((Date.now() - landed) / 1000);
      var page = location.pathname.split('/').pop().replace('.html', '') || 'home';
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({
          path: 'dwell/' + page + '/' + bucketFor(seconds),
          title: 'Time on page',
          event: true,
        });
      }
    };

    // visibilitychange fires reliably on mobile, where unload often does not
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') reportDwell();
    });
    window.addEventListener('pagehide', reportDwell);

    // Worth knowing separately: someone opened the CV.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href$=".pdf"]');
      if (!a || !window.goatcounter || !window.goatcounter.count) return;
      window.goatcounter.count({ path: 'cv-download', title: 'CV downloaded', event: true });
    });
  }

  /* -------------------------------------------------------------- theme */
  var KEY = 'gt-theme';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) {
    /* private window or blocked site data: fall through to the OS setting */
  }

  function currentTheme() {
    return root.getAttribute('data-theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.theme-btn');
    if (!btn) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (err) { /* nothing to do */ }
  });

  /* ---------------------------------------------------------------- nav */
  var nav = document.querySelector('.nav');
  var bar = document.querySelector('.scroll-bar');

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------------------------------------------------------- reveals */
  // Four different entrances rather than one fade on everything. Uniform
  // motion is itself a tell that nobody chose it.
  //   rise    text blocks
  //   wipe    media, revealed from the bottom edge
  //   scale   cards
  //   seq     children arrive one after another
  var animated = document.querySelectorAll('[data-anim]');

  if (reduced.matches || !('IntersectionObserver' in window)) {
    animated.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    animated.forEach(function (el) {
      // Children of a [data-anim="seq"] get their own increasing delay, so the
      // group lands as a sequence instead of all at once.
      if (el.dataset.anim === 'seq') {
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.style.transitionDelay = Math.min(i, 9) * 60 + 'ms';
        });
      }
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------ counters */
  // Counts up to a real number that is written in the HTML, so if the script
  // never runs the correct figure is still on the page.
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduced.matches && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        cio.unobserve(el);
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.countSuffix || '';
        var started = null;
        var step = function (now) {
          if (started === null) started = now;
          var t = Math.min((now - started) / 900, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ------------------------------------------------------------ jump index */
  // On the Work page, the pill for the project you are looking at lights up.
  var jumpLinks = document.querySelectorAll('.jump a');
  if (jumpLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    jumpLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (link) link.classList.toggle('here', entry.isIntersecting);
      });
    }, { rootMargin: '-30% 0px -55% 0px' });

    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sio.observe(el);
    });
  }

  /* ------------------------------------------------------------- videos */
  var players = document.querySelectorAll('.player video');

  players.forEach(function (v) {
    v.addEventListener('loadedmetadata', function () {
      if (v.videoHeight > v.videoWidth) v.closest('.player').classList.add('portrait');
    });
    // Playing one pauses the rest, so the page never talks over itself.
    v.addEventListener('play', function () {
      players.forEach(function (other) { if (other !== v) other.pause(); });
    });
  });

  // The dashboard clip is the single strongest thing on the site, so it plays
  // itself, silently and on a loop, the moment it is actually on screen. It
  // pauses when it is not, which keeps a phone on mobile data out of trouble.
  var showreel = document.querySelector('video[data-autoplay]');
  if (showreel && !reduced.matches && 'IntersectionObserver' in window) {
    showreel.muted = true;
    showreel.loop = true;
    showreel.playsInline = true;
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var p = showreel.play();
          if (p && p.catch) p.catch(function () { /* autoplay blocked: controls are there */ });
        } else {
          showreel.pause();
        }
      });
    }, { threshold: 0.35 });
    vio.observe(showreel);
  }
})();
