const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");

// Tap feedback for touch devices (show logo briefly on tap, not on long press)
if (window.matchMedia("(pointer: coarse)").matches) {
  const tapLogo = document.createElement("div");
  tapLogo.className = "tap-feedback";
  tapLogo.innerHTML = '<img src="./images/Realistic.Favicon48.png.png" alt="" aria-hidden="true">';
  document.body.appendChild(tapLogo);

  let longPressTimer = null;
  let longPressTriggered = false;
  let hideTimer = null;
  let touchMoved = false;

  document.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) return;
      touchMoved = false;
      longPressTriggered = false;
      clearTimeout(longPressTimer);
      longPressTimer = setTimeout(() => {
        longPressTriggered = true;
      }, 450);
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    () => {
      touchMoved = true;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (event) => {
      clearTimeout(longPressTimer);
      if (longPressTriggered || touchMoved) return;
      const touch = event.changedTouches[0];
      if (!touch) return;

      tapLogo.style.left = `${touch.clientX}px`;
      tapLogo.style.top = `${touch.clientY}px`;
      tapLogo.classList.add("show");

      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        tapLogo.classList.remove("show");
      }, 260);
    },
    { passive: true }
  );
}

if (hamburgerMenu && navLinks) {
  hamburgerMenu.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburgerMenu.classList.toggle("active", isOpen);
    hamburgerMenu.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburgerMenu.classList.remove("active");
      hamburgerMenu.setAttribute("aria-expanded", "false");
    });
  });
}

// Package enquiry buttons
const packageButtons = document.querySelectorAll(".package-btn");
const packageField = document.getElementById("package");
const subjectField = document.getElementById("subject");
const messageField = document.getElementById("message");

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.package;
    if (!selected) return;

    if (packageField) {
      packageField.value = selected;
    }

    if (subjectField && !subjectField.value) {
      subjectField.value = `Package enquiry: ${selected}`;
    }

    if (messageField) {
      const prefix = `Package selected: ${selected}`;
      if (!messageField.value.includes(prefix)) {
        messageField.value = messageField.value.trim()
          ? `${prefix}

${messageField.value}`
          : `${prefix}

`;
      }
    }
  });
});

// Smooth scrolling with nav offset
const navHeight = document.querySelector(".navbar")?.offsetHeight ?? 0;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 6;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Active nav link tracking
const sectionLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sectionTargets = document.querySelectorAll("section[id]");

if (sectionLinks.length && sectionTargets.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        sectionLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    }
  );

  sectionTargets.forEach((section) => sectionObserver.observe(section));
}

// Reveal on scroll
const revealElements = document.querySelectorAll("[data-reveal]");

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index * 0.05, 0.3)}s`;
    revealObserver.observe(el);
  });
}

// Hero phone tilt
const phoneTilts = document.querySelectorAll(".hero-phone-tilt");

if (
  phoneTilts.length &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
  document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * -10;

    phoneTilts.forEach((phone) => {
      phone.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
  });

  document.addEventListener("mouseleave", () => {
    phoneTilts.forEach((phone) => {
      phone.style.transform = "";
    });
  });
}

// Modal handling
const modals = document.querySelectorAll(".modal");

const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".modal.active")) {
    document.body.classList.remove("modal-open");
  }
};

const openPortfolioModal = (item) => {
  const modalId = item?.getAttribute("data-modal");
  if (modalId) {
    openModal(modalId);
  }
};

let lastTouchTime = 0;

document.addEventListener("pointerup", (event) => {
  if (event.pointerType !== "touch") return;
  const item = event.target.closest(".portfolio-item");
  if (!item) return;
  lastTouchTime = Date.now();
  openPortfolioModal(item);
});

document.addEventListener("click", (event) => {
  if (Date.now() - lastTouchTime < 600) return;
  const item = event.target.closest(".portfolio-item");
  if (!item) return;
  openPortfolioModal(item);
});

document.querySelectorAll(".close").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const modalId = closeButton.getAttribute("data-modal");
    if (modalId) {
      closeModal(document.getElementById(modalId));
    }
  });
});

document.addEventListener("click", (event) => {
  const nextButton = event.target.closest(".next");
  if (!nextButton) return;
  event.preventDefault();
  event.stopPropagation();

  const currentModal = nextButton.closest(".modal");
  const nextModalId = nextButton.getAttribute("data-next");

  const modalList = Array.from(document.querySelectorAll(".modal"));
  const modalMap = new Map(modalList.map((modal) => [modal.id, modal]));

  let nextModal = null;
  if (nextModalId && modalMap.has(nextModalId)) {
    nextModal = modalMap.get(nextModalId);
  } else if (currentModal) {
    const currentIndex = modalList.indexOf(currentModal);
    if (currentIndex !== -1) {
      nextModal = modalList[(currentIndex + 1) % modalList.length];
    }
  }

  if (currentModal) {
    closeModal(currentModal);
  }
  if (nextModal) {
    openModal(nextModal.id);
  }
});

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => closeModal(modal));
  }
});

// Contact form handling
const contactForm = document.getElementById("contact-form");
const responseMessage = document.getElementById("form-response");

if (contactForm && responseMessage) {
  contactForm.addEventListener("submit", (event) => {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      responseMessage.textContent = "Please fill in all fields before submitting.";
      return;
    }

    const action = contactForm.getAttribute("action") || "";
    if (action.startsWith("mailto:")) {
      event.preventDefault();
      responseMessage.textContent = "Thanks! Your email client should open shortly.";
      setTimeout(() => {
        contactForm.submit();
      }, 150);
      return;
    }

    event.preventDefault();
    const formData = new FormData(contactForm);

    fetch(action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type") || "";
        let data = {};

        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          data = { message: text };
        }

        const isSuccess = data?.success ?? data?.ok ?? response.ok;
        if (isSuccess) {
          responseMessage.textContent = "Message sent successfully. We'll be in touch soon.";
          contactForm.reset();
        } else {
          const errorMessage =
            data?.message ||
            data?.error ||
            (Array.isArray(data?.errors) && data.errors[0]?.message) ||
            "Something went wrong. Please try again.";
          responseMessage.textContent = errorMessage;
        }
      })
      .catch(() => {
        responseMessage.textContent = "Something went wrong. Please try again.";
      });
  });
}
