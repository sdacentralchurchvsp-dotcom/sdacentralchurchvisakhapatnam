/* SDA Central Church, Visakhapatnam - main.js */
(function () {
  "use strict";

  var OPEN_ICON = "\u2630";  // hamburger
  var CLOSE_ICON = "\u2715"; // X

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
      toggle.innerHTML = expanded ? CLOSE_ICON : OPEN_ICON;
    });
    // Close menu when a link is clicked (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = OPEN_ICON;
      });
    });
  }

  // Typing effect for the hero eyebrow
  var typed = document.getElementById("typed-title");
  if (typed) {
    var fullText = typed.getAttribute("data-text") || typed.textContent;
    var reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      typed.textContent = fullText;
    } else {
      typed.textContent = "";
      var i = 0;
      var speed = 65; // ms per character
      var typeNext = function () {
        if (i <= fullText.length) {
          typed.textContent = fullText.slice(0, i);
          i++;
          setTimeout(typeNext, speed);
        }
      };
      setTimeout(typeNext, 400);
    }
  }

  // Rotating Bible verses with typing effect (English + Telugu)
  var verseEl = document.getElementById("verse-text");
  if (verseEl) {
    var verses = [
      "\u201CFor God so loved the world that he gave his one and only Son.\u201D \u2014 John 3:16",
      "\u201C\u0C26\u0C47\u0C35\u0C41\u0C21\u0C41 \u0C32\u0C4B\u0C15\u0C2E\u0C41\u0C28\u0C41 ఎం\u0C24\u0C97\u0C3E \u0C2A\u0C4D\u0C30\u0C47\u0C2E\u0C3F\u0C02\u0C1A\u0C46\u0C28\u0C41.\u201D \u2014 \u0C2F\u0C4B\u0C39\u0C3E\u0C28\u0C41 3:16",
      "\u201CThe Lord is my shepherd; I shall not want.\u201D \u2014 Psalm 23:1",
      "\u201C\u0C2F\u0C46\u0C39\u0C4B\u0C35\u0C3E \u0C28\u0C3E \u0C15\u0C3E\u0C2A\u0C30\u0C3F; \u0C28\u0C3E\u0C15\u0C41 \u0C15\u0C4A\u0C31\u0C24 \u0C15\u0C32\u0C41\u0C17\u0C26\u0C41.\u201D \u2014 \u0C15\u0C40\u0C30\u0C4D\u0C24\u0C28 23:1",
      "\u201CCome to me, all you who are weary, and I will give you rest.\u201D \u2014 Matthew 11:28",
      "\u201C\u0C15\u0C37\u0C4D\u0C1F\u0C2A\u0C21\u0C41\u0C1A\u0C41\u0C28\u0C4D\u0C28 \u0C35\u0C3E\u0C30\u0C32\u0C3E\u0C30\u0C3E, \u0C28\u0C3E \u0C2F\u0C4A\u0C26\u0C4D\u0C26\u0C15\u0C41 \u0C30\u0C02\u0C21\u0C3F; \u0C28\u0C47\u0C28\u0C41 \u0C2E\u0C40\u0C15\u0C41 \u0C35\u0C3F\u0C36\u0C4D\u0C30\u0C3E\u0C02\u0C24\u0C3F \u0C15\u0C32\u0C3F\u0C17\u0C3F\u0C02\u0C24\u0C41\u0C28\u0C41.\u201D \u2014 \u0C2E\u0C24\u0C4D\u0C24\u0C2F\u0C3F 11:28",
      "\u201CI can do all things through Christ who strengthens me.\u201D \u2014 Philippians 4:13",
      "\u201C\u0C28\u0C28\u0C4D\u0C28\u0C41 \u0C2C\u0C32\u0C2A\u0C30\u0C1A\u0C41 \u0C15\u0C4D\u0C30\u0C40\u0C38\u0C4D\u0C24\u0C41\u0C28\u0C02\u0C26\u0C41 \u0C28\u0C47\u0C28\u0C41 \u0C38\u0C2E\u0C38\u0C4D\u0C24\u0C2E\u0C41 \u0C1A\u0C47\u0C2F\u0C17\u0C32\u0C28\u0C41.\u201D \u2014 \u0C2B\u0C3F\u0C32\u0C3F\u0C2A\u0C4D\u0C2A\u0C40\u0C2F\u0C41\u0C32\u0C41 4:13",
      "\u201CTrust in the Lord with all your heart.\u201D \u2014 Proverbs 3:5",
      "\u201C\u0C28\u0C40 \u0C2A\u0C42\u0C30\u0C4D\u0C23 \u0C39\u0C43\u0C26\u0C2F\u0C2E\u0C41\u0C24\u0C4B \u0C2F\u0C46\u0C39\u0C4B\u0C35\u0C3E\u0C28\u0C41 \u0C28\u0C2E\u0C4D\u0C2E\u0C41\u0C2E\u0C41.\u201D \u2014 \u0C38\u0C3E\u0C2E\u0C46\u0C24\u0C32\u0C41 3:5",
      "\u201CBe strong and courageous. Do not be afraid; the Lord your God is with you.\u201D \u2014 Joshua 1:9",
      "\u201CThe joy of the Lord is your strength.\u201D \u2014 Nehemiah 8:10"
    ];

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // shuffle order for randomness
    for (var s = verses.length - 1; s > 0; s--) {
      var r = Math.floor(Math.random() * (s + 1));
      var tmp = verses[s]; verses[s] = verses[r]; verses[r] = tmp;
    }

    if (reduce) {
      verseEl.textContent = verses[0];
    } else {
      var vIndex = 0, cIndex = 0, deleting = false;
      var typeSpeed = 45, eraseSpeed = 22, holdTime = 2600, gapTime = 500;

      var tick = function () {
        var current = verses[vIndex];
        if (!deleting) {
          cIndex++;
          verseEl.textContent = current.slice(0, cIndex);
          if (cIndex >= current.length) {
            deleting = true;
            setTimeout(tick, holdTime);
            return;
          }
          setTimeout(tick, typeSpeed);
        } else {
          cIndex--;
          verseEl.textContent = current.slice(0, cIndex);
          if (cIndex <= 0) {
            deleting = false;
            vIndex = (vIndex + 1) % verses.length;
            setTimeout(tick, gapTime);
            return;
          }
          setTimeout(tick, eraseSpeed);
        }
      };
      setTimeout(tick, 800);
    }
  }

  // Hero image slider (fades between the right-side images)
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    var slideIdx = 0;
    setInterval(function () {
      slides[slideIdx].classList.remove("is-active");
      slideIdx = (slideIdx + 1) % slides.length;
      slides[slideIdx].classList.add("is-active");
    }, 4000);
  }

  // Add shadow to header on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 10) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Highlight active nav link based on current page
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Set current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Auto-tag common blocks for scroll reveal (so every page gets the effect
  // without editing each element by hand). Existing .reveal markup is kept.
  var autoSelectors = [".section-head", ".card", ".event", ".split > div", ".beliefs li"];
  autoSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.classList.contains("reveal")) el.classList.add("reveal", "auto-reveal");
    });
  });
  // Stagger auto-tagged siblings within the same grid/row
  document.querySelectorAll(".grid, .beliefs").forEach(function (group) {
    var items = group.querySelectorAll(":scope > .auto-reveal");
    items.forEach(function (el, idx) {
      var d = (idx % 4) + 1;
      el.classList.add("delay-" + d);
    });
  });

  // Scroll-reveal animations (fade/slide in on scroll)
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  // Animated count-up numbers (e.g. "75+ Years")
  var counters = document.querySelectorAll(".count-up");
  if (counters.length) {
    var animateCount = function (el) {
      var target = parseInt(el.getAttribute("data-target"), 10) || 0;
      if (reduceMotion) { el.textContent = target; return; }
      var duration = 1400;
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        // easeOutCubic for a smooth finish
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var countObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countObserver.observe(el); });
    }
  }

  // Contact form (client-side demo handler)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("form-note");
      if (note) {
        note.classList.add("success");
        note.textContent =
          "Thank you! Your message has been received. We will get back to you soon. (Note: connect this form to a mail service to enable delivery.)";
      }
      form.reset();
    });
  }

  // ---- Album card auto-slider (cross-fade through photos) ----
  var reduceSlides = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".album-slides").forEach(function (wrap) {
    var slides = wrap.querySelectorAll(".album-slide");
    if (slides.length < 2 || reduceSlides) return;
    var idx = 0;
    setInterval(function () {
      slides[idx].classList.remove("is-active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("is-active");
    }, 3000);
  });

  // ---- Lightbox / Image viewer (with zoom + album support) ----
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = document.getElementById("lb-img");
    var lbCaption = document.getElementById("lb-caption");
    var lbClose = lightbox.querySelector(".lb-close");
    var lbPrev = lightbox.querySelector(".lb-prev");
    var lbNext = lightbox.querySelector(".lb-next");

    var currentList = [];   // [{src, caption}]
    var currentIndex = 0;

    // Zoom / pan state
    var scale = 1, panX = 0, panY = 0;
    var dragging = false, startX = 0, startY = 0, startPanX = 0, startPanY = 0;

    function applyTransform() {
      lbImg.style.transform =
        "translate(" + panX + "px," + panY + "px) scale(" + scale + ")";
    }
    function resetZoom() {
      scale = 1; panX = 0; panY = 0;
      lbImg.classList.remove("zoomed", "dragging");
      lbImg.style.transform = "";
    }

    function showIndex(i) {
      if (!currentList.length) return;
      currentIndex = (i + currentList.length) % currentList.length;
      var item = currentList[currentIndex];
      resetZoom();
      lbImg.src = item.src;
      lbImg.alt = item.caption || "";
      var showCount = currentList.length > 1
        ? " (" + (currentIndex + 1) + " / " + currentList.length + ")"
        : "";
      lbCaption.textContent = (item.caption || "") + showCount;
      var multiple = currentList.length > 1;
      lbPrev.style.display = multiple ? "" : "none";
      lbNext.style.display = multiple ? "" : "none";
    }

    function openLightbox(list, index) {
      currentList = list;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lb-lock");
      showIndex(index || 0);
    }
    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lb-lock");
      resetZoom();
      lbImg.src = "";
    }

    // Wire up gallery items
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      if (item.classList.contains("is-empty")) return;
      item.addEventListener("click", function () {
        var list, startAt = 0;
        var albumData = item.getAttribute("data-images");
        if (albumData) {
          var title = item.getAttribute("data-album") || "";
          list = albumData.split(",").map(function (src) {
            return { src: src.trim(), caption: title };
          });
        } else {
          var img = item.querySelector("img");
          if (!img) return;
          list = [{ src: img.getAttribute("src"), caption: img.getAttribute("alt") || "" }];
        }
        openLightbox(list, startAt);
      });
    });

    // Toggle zoom on image click
    lbImg.addEventListener("click", function (e) {
      e.stopPropagation();
      if (scale === 1) {
        scale = 2.2;
        lbImg.classList.add("zoomed");
      } else {
        resetZoom();
      }
      applyTransform();
    });

    // Drag to pan when zoomed (mouse)
    lbImg.addEventListener("mousedown", function (e) {
      if (scale === 1) return;
      e.preventDefault();
      dragging = true;
      lbImg.classList.add("dragging");
      startX = e.clientX; startY = e.clientY;
      startPanX = panX; startPanY = panY;
    });
    window.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      panX = startPanX + (e.clientX - startX);
      panY = startPanY + (e.clientY - startY);
      applyTransform();
    });
    window.addEventListener("mouseup", function () {
      if (!dragging) return;
      dragging = false;
      lbImg.classList.remove("dragging");
    });

    // Wheel to zoom
    lbImg.addEventListener("wheel", function (e) {
      e.preventDefault();
      var delta = e.deltaY < 0 ? 0.2 : -0.2;
      scale = Math.min(4, Math.max(1, scale + delta));
      if (scale === 1) { panX = 0; panY = 0; lbImg.classList.remove("zoomed"); }
      else { lbImg.classList.add("zoomed"); }
      applyTransform();
    }, { passive: false });

    // Controls
    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function (e) { e.stopPropagation(); showIndex(currentIndex - 1); });
    lbNext.addEventListener("click", function (e) { e.stopPropagation(); showIndex(currentIndex + 1); });

    // Click backdrop to close
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lb-stage")) closeLightbox();
    });

    // Keyboard
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showIndex(currentIndex - 1);
      else if (e.key === "ArrowRight") showIndex(currentIndex + 1);
    });

    // Basic touch swipe (when not zoomed)
    var touchStartX = 0, touchStartY = 0;
    lbImg.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    lbImg.addEventListener("touchend", function (e) {
      if (scale !== 1) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        showIndex(currentIndex + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
  }
})();
