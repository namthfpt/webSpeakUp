// ===== DATA =====
const USERS = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    school: "Sinh viên ULIS K21",
    level: "Intermediate",
    goal: "Giao tiếp hàng ngày & IELTS 6.5",
    time: "Tối",
    color: "#bae6fd",
    textColor: "#075985",
    initials: "MA",
    tag: "IELTS",
  },
  {
    id: 2,
    name: "Trần Bảo Long",
    school: "Sinh viên ĐH Ngoại Thương",
    level: "Beginner",
    goal: "Xây dựng phản xạ tiếng Anh cơ bản",
    time: "Sáng",
    color: "#fef3c7",
    textColor: "#92400e",
    initials: "BL",
    tag: "Giao tiếp",
  },
  {
    id: 3,
    name: "Phạm Thùy Linh",
    school: "Nhân viên Marketing",
    level: "Upper-Intermediate",
    goal: "Giao tiếp công việc & Thuyết trình",
    time: "Chiều",
    color: "#ede9fe",
    textColor: "#5b21b6",
    initials: "TL",
    tag: "Thuyết trình",
  },
  {
    id: 4,
    name: "Lê Hoàng Nam",
    school: "Sinh viên ULIS K22",
    level: "Intermediate",
    goal: "Luyện phát âm, tự tin nói chuyện",
    time: "Tối",
    color: "#dcfce7",
    textColor: "#166534",
    initials: "HN",
    tag: "Phát âm",
  },
  {
    id: 5,
    name: "Võ Thu Hà",
    school: "Người đi làm – IT",
    level: "Advanced",
    goal: "Giao tiếp chuyên nghiệp với đối tác nước ngoài",
    time: "Sáng",
    color: "#fce7f3",
    textColor: "#9d174d",
    initials: "TH",
    tag: "Business",
  },
  {
    id: 6,
    name: "Đinh Quang Vinh",
    school: "Sinh viên Bách Khoa",
    level: "Beginner",
    goal: "Tìm bạn học, cải thiện nghe-nói cơ bản",
    time: "Chiều",
    color: "#ffedd5",
    textColor: "#9a3412",
    initials: "QV",
    tag: "Giao tiếp",
  },
];

const LEVEL_STYLE = {
  Beginner: { bg: "#dcfce7", text: "#166534" },
  Intermediate: { bg: "#dbeafe", text: "#1e40af" },
  "Upper-Intermediate": { bg: "#ede9fe", text: "#5b21b6" },
  Advanced: { bg: "#fef3c7", text: "#92400e" },
};

// ===== SCROLL & HEADER =====
window.addEventListener("scroll", () => {
  document
    .getElementById("header")
    .classList.toggle("scrolled", window.scrollY > 40);

  // Update active nav link
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#desktop-nav .nav-link");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (current && link.getAttribute("onclick") && link.getAttribute("onclick").includes(current)) {
      link.classList.add("active");
    }
  });
});

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById("mobile-nav").classList.toggle("open");
}
function closeMenu() {
  document.getElementById("mobile-nav").classList.remove("open");
}

// ===== PROFILES =====
function renderProfiles() {
  const level = document.getElementById("f-level").value;
  const time = document.getElementById("f-time").value;
  const grid = document.getElementById("profiles-grid");

  const filtered = USERS.filter((u) => {
    if (level && u.level !== level) return false;
    if (time && u.time !== time) return false;
    return true;
  });

  if (!filtered.length) {
    grid.innerHTML = `<div class="no-results"><div class="no-results-icon">🔍</div><p style="font-size:16px;font-weight:600;color:#94a3b8">Không tìm thấy kết quả phù hợp</p><p style="font-size:14px;color:#cbd5e1;margin-top:4px">Hãy thử thay đổi bộ lọc</p></div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((u) => {
      const ls = LEVEL_STYLE[u.level] || {
        bg: "#e0f2fe",
        text: "#0369a1",
      };
      return `
      <div class="profile-card">
        <div class="profile-top">
          <div class="profile-avatar" style="background:${u.color};color:${u.textColor}">${u.initials}</div>
          <div style="flex:1">
            <div class="profile-name">${u.name}</div>
            <div class="profile-school">${u.school}</div>
          </div>
        </div>
        <div class="profile-tags">
          <span class="badge" style="background:${ls.bg};color:${ls.text}">${u.level}</span>
          <span class="badge badge-slate">⏰ ${u.time}</span>
          <span class="badge badge-amber">${u.tag}</span>
        </div>
        <div class="profile-goal">🎯 ${u.goal}</div>
        <button class="btn btn-primary btn-full btn-sm" onclick="openRegister()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Kết nối
        </button>
      </div>`;
    })
    .join("");
}
renderProfiles();

// ===== MODAL HELPERS =====
function openRegister() {
  document.getElementById("reg-form-view").style.display = "block";
  document.getElementById("reg-success-view").style.display = "none";
  document.getElementById("register-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeRegister() {
  document.getElementById("register-modal").classList.remove("open");
  document.body.style.overflow = "";
}
function openFeedback() {
  document.getElementById("feedback-form-view").classList.remove("hide");
  document.getElementById("feedback-success").classList.remove("show");
  document.getElementById("feedback-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeFeedback() {
  document.getElementById("feedback-modal").classList.remove("open");
  document.body.style.overflow = "";
}
function closeOnOverlay(e, id) {
  if (e.target === document.getElementById(id)) {
    document.getElementById(id).classList.remove("open");
    document.body.style.overflow = "";
  }
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeRegister();
    closeFeedback();
  }
});

// ===== TOGGLE BUTTONS =====
function toggleCheck(btn) {
  btn.classList.toggle("active");
}
function selectRadio(groupId, btn) {
  document
    .querySelectorAll(`#${groupId} .toggle-btn`)
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

// ===== FORM VALIDATION =====
function clearErr(id) {
  const input = document.getElementById(id);
  const errId = "err-" + id.replace("r-", "");
  input.classList.remove("error");
  const errEl = document.getElementById(errId);
  if (errEl) errEl.classList.remove("show");
}

async function submitRegister() {
  const name = document.getElementById("r-name").value.trim();
  const email = document.getElementById("r-email").value.trim();
  const phone = document.getElementById("r-phone") ? document.getElementById("r-phone").value.trim() : "";
  const link = document.getElementById("r-link") ? document.getElementById("r-link").value.trim() : "";
  const level = document.getElementById("r-level") ? document.getElementById("r-level").value : "";

  let valid = true;

  if (!name) {
    document.getElementById("r-name").classList.add("error");
    document.getElementById("err-name").classList.add("show");
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("r-email").classList.add("error");
    document.getElementById("err-email").classList.add("show");
    valid = false;
  }
  if (!valid) return;

  // Thay URL Web App của Google Apps Script vào đây!
  const scriptURL = "https://script.google.com/macros/s/AKfycbzDajwAAbuSxbw8d5JUqWwJV0W2mfuPRzN523Q1kPODOUd_0aft55EPO8oboKyaBR770A/exec";

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("link", link);
  formData.append("level", level);

  // Đổi trạng thái nút thành Đang gửi
  const btn = document.querySelector("#reg-form-view .btn-primary");
  const originalText = btn.innerHTML;
  btn.innerHTML = "Đang gửi...";
  btn.disabled = true;

  try {
    if (scriptURL === "YOUR_GOOGLE_SCRIPT_WEB_APP_URL") {
      // Nếu chưa có link thật thì giả lập gửi thành công sau 1 giây
      setTimeout(() => {
        document.getElementById("reg-form-view").style.display = "none";
        document.getElementById("reg-success-view").style.display = "block";
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1000);
      return;
    }

    const response = await fetch(scriptURL, { method: "POST", body: formData });
    if (response.ok) {
      document.getElementById("reg-form-view").style.display = "none";
      document.getElementById("reg-success-view").style.display = "block";
    } else {
      alert("Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại!");
    }
  } catch (error) {
    console.error("Error!", error.message);
    alert("Không thể kết nối. Vui lòng thử lại!");
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// ===== STARS =====
let currentRating = 0;
const STAR_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#0ea5e9",
];
const STAR_LABELS = [
  "Rất tệ",
  "Không tốt",
  "Bình thường",
  "Tốt",
  "Tuyệt vời!",
];

function paintStars(upTo, colors) {
  document.querySelectorAll("#stars .star-btn").forEach((btn, i) => {
    const svg = btn.querySelector("svg");
    const c = upTo && i < upTo ? colors[upTo - 1] : "#cbd5e1";
    svg.style.fill = upTo && i < upTo ? c : "none";
    svg.style.stroke = c;
  });
}
function hoverStar(val) {
  paintStars(val, STAR_COLORS);
  document.getElementById("star-label").textContent =
    STAR_LABELS[val - 1];
  document.getElementById("star-label").style.color =
    STAR_COLORS[val - 1];
}
function unhoverStar() {
  paintStars(currentRating, STAR_COLORS);
  document.getElementById("star-label").textContent = currentRating
    ? STAR_LABELS[currentRating - 1]
    : "";
}
function rateStar(val) {
  currentRating = val;
  paintStars(val, STAR_COLORS);
  document.getElementById("star-label").textContent =
    STAR_LABELS[val - 1];
  document.getElementById("star-label").style.color =
    STAR_COLORS[val - 1];
  const btn = document.getElementById("submit-feedback");
  btn.disabled = false;
  btn.style.opacity = "1";
  btn.style.cursor = "pointer";
}
function submitFeedback() {
  if (!currentRating) return;
  document.getElementById("feedback-form-view").classList.add("hide");
  document.getElementById("feedback-success").classList.add("show");
}

// ===== CONTACT FORM =====
function sendContact() {
  const name = document.getElementById("c-name").value.trim();
  const email = document.getElementById("c-email").value.trim();
  if (!name || !email) return;
  document.getElementById("contact-form").classList.add("hide");
  document.getElementById("contact-success").classList.add("show");
}
