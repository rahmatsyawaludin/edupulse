/* ── Shorthand ───────────────────────────────────────────────────── */
const { useState, useEffect, useMemo } = React;
const h = React.createElement;

/* ── Data ────────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1, emoji: "🎨",
    bg: "linear-gradient(135deg,#1a3a4a,#0d2535)",
    tag: "design", tagLabel: "Design",
    title: "Instructional Design Fundamentals",
    desc: "ADDIE, SAM, Backward Design — build learning experiences that stick.",
    lessons: 12, duration: "6h 30m", level: "Beginner",
    progress: 75, enrolled: true, xp: 120,
  },
  {
    id: 2, emoji: "🤖",
    bg: "linear-gradient(135deg,#1a2a1a,#0d1f0d)",
    tag: "tech", tagLabel: "Technology",
    title: "AR & Immersive Learning Media",
    desc: "Design marker-based AR modules for offline-first learning environments.",
    lessons: 8, duration: "4h 15m", level: "Intermediate",
    progress: 40, enrolled: true, xp: 90,
  },
  {
    id: 3, emoji: "📊",
    bg: "linear-gradient(135deg,#2a1a0d,#1a0d00)",
    tag: "data", tagLabel: "Data",
    title: "Digital Data in Education",
    desc: "Leverage learning analytics and dashboards to drive instructional decisions.",
    lessons: 10, duration: "5h 00m", level: "Intermediate",
    progress: 20, enrolled: true, xp: 60,
  },
  {
    id: 4, emoji: "🧭",
    bg: "linear-gradient(135deg,#1a0d2a,#0d0017)",
    tag: "lead", tagLabel: "Leadership",
    title: "Leading Educational Technology Change",
    desc: "Navigate organisational change and champion digital transformation in education.",
    lessons: 9, duration: "4h 45m", level: "Advanced",
    progress: 0, enrolled: false, xp: 110,
  },
  {
    id: 5, emoji: "💡",
    bg: "linear-gradient(135deg,#0d1a2a,#061020)",
    tag: "design", tagLabel: "Design",
    title: "Design Thinking for L&D",
    desc: "Apply Stanford D.school & Double Diamond frameworks to solve learning problems.",
    lessons: 11, duration: "5h 30m", level: "Intermediate",
    progress: 100, enrolled: true, xp: 130,
  },
  {
    id: 6, emoji: "☁️",
    bg: "linear-gradient(135deg,#0a1a1a,#041010)",
    tag: "tech", tagLabel: "Technology",
    title: "LMS Administration & Analytics",
    desc: "Set up, manage and optimise Canvas & Google Classroom for real outcomes.",
    lessons: 7, duration: "3h 20m", level: "Beginner",
    progress: 0, enrolled: false, xp: 70,
  },
];

const QUESTIONS = [
  {
    topic: "Instructional Design",
    q: "Which ADDIE phase involves identifying the gap between current and desired performance?",
    opts: ["Design", "Analysis", "Development", "Evaluation"],
    correct: 1,
    explain: "The Analysis phase is where you conduct a Training Needs Analysis (TNA) to identify performance gaps, learner characteristics, and context before any design begins."
  },
  {
    topic: "Learning Science",
    q: "What principle does the 'desirable difficulty' concept refer to?",
    opts: [
      "Making content visually complex",
      "Introducing productive struggle to deepen retention",
      "Increasing quiz frequency to reduce anxiety",
      "Simplifying navigation to reduce cognitive load"
    ],
    correct: 1,
    explain: "Desirable difficulties (Bjork, 1994) are conditions that slow initial acquisition but significantly enhance long-term retention — e.g. spaced practice, interleaving, and retrieval practice."
  },
  {
    topic: "Digital Learning",
    q: "In Backward Design (Wiggins & McTighe), what is the correct sequence?",
    opts: [
      "Content → Activities → Assessment",
      "Objectives → Content → Activities",
      "Desired Results → Evidence → Learning Plan",
      "Needs Analysis → Design → Deployment"
    ],
    correct: 2,
    explain: "Backward Design starts with desired outcomes, then identifies acceptable evidence, and finally plans learning experiences — the opposite of traditional coverage-first design."
  },
  {
    topic: "Computational Thinking",
    q: "Which CT skill involves identifying similarities and patterns across different problems?",
    opts: ["Decomposition", "Abstraction", "Pattern Recognition", "Algorithm Design"],
    correct: 2,
    explain: "Pattern Recognition is the CT skill of finding similarities and trends across problems — allowing us to apply known solutions to new, similar challenges."
  },
  {
    topic: "Instructional Design",
    q: "What does 'fidelity' refer to in prototype testing?",
    opts: [
      "Accuracy of colour choices",
      "The degree of completeness and realism of a prototype",
      "Number of user testers involved",
      "Alignment with brand guidelines"
    ],
    correct: 1,
    explain: "Fidelity describes how closely a prototype represents the final product — low-fi (sketches) for early ideation, high-fi (interactive mockups) for detailed validation."
  },
];

const BADGES = [
  { emoji: "🏅", label: "First Lesson",   unlocked: true },
  { emoji: "🔥", label: "3-Day Streak",   unlocked: true },
  { emoji: "🎓", label: "Course Complete",unlocked: true },
  { emoji: "⚡", label: "Quiz Master",    unlocked: false },
  { emoji: "🌟", label: "Top Scorer",     unlocked: false },
  { emoji: "🚀", label: "All Enrolled",   unlocked: false },
];

const ACTIVITY = [
  { color: "#52c99b", strong: "Completed", text: " Design Thinking for L&D — 100% ✓", time: "2h ago" },
  { color: "#f5a623", strong: "Scored 4/5", text: " on Instructional Design Quiz", time: "Yesterday" },
  { color: "#38bfbf", strong: "Started",   text: " AR & Immersive Learning Media",  time: "2 days ago" },
  { color: "#e06c75", strong: "Earned badge", text: " 🔥 3-Day Streak",             time: "3 days ago" },
  { color: "#52c99b", strong: "Enrolled in",  text: " Digital Data in Education",   time: "4 days ago" },
];

/* ── Helpers ─────────────────────────────────────────────────────── */
function ProgressBar({ pct, color, height = 5 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 80); return () => clearTimeout(t); }, [pct]);
  return h('div', { className: 'bar-track', style: { height } },
    h('div', { className: 'bar-fill', style: { width: w + '%', background: color } })
  );
}

/* ── Dashboard ───────────────────────────────────────────────────── */
function Dashboard({ courses, totalXp, quizResults }) {
  const enrolled  = courses.filter(c => c.enrolled).length;
  const completed = courses.filter(c => c.progress === 100).length;
  const avgProg   = enrolled
    ? Math.round(courses.filter(c => c.enrolled).reduce((s, c) => s + c.progress, 0) / enrolled)
    : 0;

  const stats = [
    { icon: "⚡", val: totalXp,         key: "Total XP",    color: "#f5a623" },
    { icon: "📚", val: enrolled,        key: "Enrolled",    color: "#38bfbf" },
    { icon: "✅", val: completed,       key: "Completed",   color: "#52c99b" },
    { icon: "📈", val: avgProg + "%",   key: "Avg Progress",color: "#e06c75" },
  ];

  return h('div', null,
    h('div', { className: 'page-title' }, "My Dashboard"),
    h('div', { className: 'page-sub'  }, "Your learning journey at a glance"),

    h('div', { className: 'dash-grid' },
      stats.map((s, i) =>
        h('div', { key: i, className: 'stat-card', style: { animationDelay: i * 0.07 + 's' } },
          h('div', { className: 'sc-icon' }, s.icon),
          h('div', { className: 'sc-val',  style: { color: s.color } }, s.val),
          h('div', { className: 'sc-key'  }, s.key),
        )
      )
    ),

    h('div', { className: 'activity-card' },
      h('div', { className: 'card-title' }, "Recent Activity"),
      ACTIVITY.map((a, i) =>
        h('div', { key: i, className: 'feed-item' },
          h('div', { className: 'feed-dot', style: { background: a.color } }),
          h('div', null,
            h('div', { className: 'feed-text' },
              h('strong', null, a.strong), a.text
            ),
            h('div', { className: 'feed-time' }, a.time)
          )
        )
      )
    ),

    quizResults && h('div', { className: 'activity-card' },
      h('div', { className: 'card-title' }, "Last Quiz Results"),
      h('div', { className: 'quiz-review' },
        QUESTIONS.map((q, i) => {
          const ans = quizResults.answers[i];
          const correct = ans && ans.correct;
          return h('div', {
            key: i,
            className: 'qr-chip',
            style: {
              background: correct ? 'rgba(82,201,155,0.1)' : 'rgba(224,108,117,0.1)',
              border: `1px solid ${correct ? 'rgba(82,201,155,0.2)' : 'rgba(224,108,117,0.2)'}`,
            }
          },
            h('div', { className: 'qr-q' }, "Q" + (i + 1)),
            h('div', { className: 'qr-res', style: { color: correct ? '#52c99b' : '#e06c75' } },
              correct ? "✓" : "✗"
            )
          );
        })
      )
    )
  );
}

/* ── Course Library ──────────────────────────────────────────────── */
function CourseLibrary({ courses, setCourses, setTotalXp }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => courses.filter(c => {
    const s = search.toLowerCase();
    const matchSearch = c.title.toLowerCase().includes(s) || c.desc.toLowerCase().includes(s);
    const matchFilter =
      filter === 'all'       ? true :
      filter === 'enrolled'  ? c.enrolled :
      filter === 'completed' ? c.progress === 100 :
      c.tag === filter;
    return matchSearch && matchFilter;
  }), [courses, search, filter]);

  function handleEnroll(id) {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, enrolled: true } : c));
    setTotalXp(prev => prev + 15);
  }

  const chips = [
    { id: 'all',       label: 'All Courses' },
    { id: 'enrolled',  label: 'Enrolled'    },
    { id: 'completed', label: 'Completed'   },
    { id: 'design',    label: 'Design'      },
    { id: 'tech',      label: 'Technology'  },
    { id: 'data',      label: 'Data'        },
  ];

  return h('div', null,
    h('div', { className: 'page-title' }, "Course Library"),
    h('div', { className: 'page-sub'   },
      courses.filter(c => c.enrolled).length + " enrolled · " +
      courses.filter(c => c.progress === 100).length + " completed"
    ),

    h('div', { className: 'filter-bar' },
      h('div', { className: 'search-wrap' },
        h('span', { className: 'search-icon' }, "🔍"),
        h('input', {
          className: 'search-input',
          placeholder: 'Search courses…',
          value: search,
          onInput: e => setSearch(e.target.value),
        })
      ),
      chips.map(c =>
        h('button', {
          key: c.id,
          className: 'chip' + (filter === c.id ? ' active' : ''),
          onClick: () => setFilter(c.id),
        }, c.label)
      )
    ),

    filtered.length === 0
      ? h('div', { className: 'empty-state' },
          h('div', { className: 'empty-icon' }, "🔎"),
          h('div', { className: 'empty-text' }, "No courses match your search.")
        )
      : h('div', { className: 'course-grid' },
          filtered.map((c, i) => CourseCard({ course: c, onEnroll: handleEnroll, delay: i }))
        )
  );
}

function CourseCard({ course: c, onEnroll, delay }) {
  const btnClass = 'enroll-btn ' + (c.enrolled ? 'btn-enrolled' : 'btn-enroll');
  const btnLabel = c.enrolled
    ? (c.progress === 100 ? '✓ Completed' : '▶ Continue')
    : '+ Enroll Now';

  return h('div', {
    key: c.id,
    className: 'course-card',
    style: { animationDelay: delay * 0.05 + 's' },
  },
    h('div', { className: 'course-banner', style: { background: c.bg } },
      h('span', { style: { position: 'relative', zIndex: 1 } }, c.emoji)
    ),
    h('div', { className: 'course-body' },
      h('span', { className: 'course-tag tag-' + c.tag }, c.tagLabel),
      h('div', { className: 'course-title' }, c.title),
      h('div', { className: 'course-desc'  }, c.desc),
      h('div', { className: 'course-meta'  },
        h('span', { className: 'meta-item' }, "📚 " + c.lessons + " lessons"),
        h('span', { className: 'meta-item' }, "⏱ " + c.duration),
        h('span', { className: 'meta-item' }, "📈 " + c.level),
      ),
      c.enrolled && h('div', null,
        ProgressBar({
          pct: c.progress,
          color: c.progress === 100 ? 'var(--green)' : 'var(--amber)',
        }),
        h('div', { className: 'progress-label' },
          h('span', { className: 'progress-pct' }, c.progress + "% complete"),
          h('span', { className: 'progress-xp'  }, "+" + c.xp + " XP"),
        )
      ),
      h('button', {
        className: btnClass,
        onClick: () => !c.enrolled && onEnroll(c.id),
      }, btnLabel)
    )
  );
}

/* ── Quiz Engine ─────────────────────────────────────────────────── */
function QuizEngine({ setTotalXp, quizResults, setQuizResults }) {
  const [qi,       setQi]       = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers,  setAnswers]  = useState([]);
  const [done,     setDone]     = useState(false);

  function restart() {
    setQi(0); setSelected(null); setAnswers([]); setDone(false);
  }

  function handleSelect(i) {
    if (selected !== null) return;
    setSelected(i);
  }

  function handleNext() {
    const correct = selected === QUESTIONS[qi].correct;
    const next = [...answers, { correct }];
    setAnswers(next);
    if (qi < QUESTIONS.length - 1) {
      setQi(qi + 1);
      setSelected(null);
    } else {
      const score = next.filter(a => a.correct).length;
      setQuizResults({ score, total: QUESTIONS.length, answers: next });
      setTotalXp(prev => prev + score * 20);
      setDone(true);
    }
  }

  if (done && quizResults) {
    const pct = Math.round((quizResults.score / quizResults.total) * 100);
    const grade =
      pct >= 80 ? { label: "Excellent!",       color: "#52c99b" } :
      pct >= 60 ? { label: "Good Work",         color: "#f5a623" } :
                  { label: "Keep Practicing",   color: "#e06c75" };

    return h('div', { className: 'quiz-wrap' },
      h('div', { className: 'page-title' }, "Quiz Results"),
      h('div', { className: 'page-sub',   style: { marginBottom: 20 } }, "Knowledge Check Complete"),
      h('div', { className: 'results-screen' },
        h('div', { className: 'score-ring', style: { borderColor: grade.color } },
          h('span', { className: 'score-num', style: { color: grade.color } }, pct + "%"),
          h('span', { className: 'score-lbl' }, "SCORE")
        ),
        h('div', { className: 'res-title' }, grade.label),
        h('div', { className: 'res-sub' },
          "You answered " + quizResults.score + " out of " + quizResults.total + " questions correctly"
        ),
        h('div', { className: 'res-breakdown' },
          h('div', { className: 'rb-box' },
            h('div', { className: 'rb-val', style: { color: '#52c99b' } }, quizResults.score),
            h('div', { className: 'rb-key' }, "Correct")
          ),
          h('div', { className: 'rb-box' },
            h('div', { className: 'rb-val', style: { color: '#e06c75' } }, quizResults.total - quizResults.score),
            h('div', { className: 'rb-key' }, "Incorrect")
          ),
          h('div', { className: 'rb-box' },
            h('div', { className: 'rb-val', style: { color: '#f5a623' } }, "+" + quizResults.score * 20 + " XP"),
            h('div', { className: 'rb-key' }, "Earned")
          ),
        ),
        h('button', { className: 'next-btn', onClick: restart }, "Retake Quiz")
      )
    );
  }

  const q        = QUESTIONS[qi];
  const answered = selected !== null;
  const isRight  = selected === q.correct;

  return h('div', { className: 'quiz-wrap' },
    h('div', { className: 'page-title' }, "Knowledge Quiz"),
    h('div', { className: 'page-sub',   style: { marginBottom: 0 } }, "Instructional Design & Learning Science"),

    h('div', { className: 'quiz-header-card' },
      h('div', { className: 'quiz-meta' },
        h('span', { className: 'quiz-topic'   }, q.topic),
        h('span', { className: 'quiz-counter' }, (qi + 1) + " / " + QUESTIONS.length)
      ),
      ProgressBar({ pct: (qi / QUESTIONS.length) * 100, color: 'var(--teal)', height: 4 })
    ),

    h('div', { className: 'question-card' },
      h('div', { className: 'question-text' }, q.q),
      h('div', { className: 'option-list' },
        q.opts.map((opt, i) => {
          let cls = 'option-btn';
          if (answered) {
            if (i === q.correct)               cls += ' opt-show-correct';
            if (i === selected && isRight)     cls += ' opt-correct';
            if (i === selected && !isRight)    cls += ' opt-wrong';
          }
          return h('button', {
            key: i,
            className: cls,
            disabled: answered,
            onClick: () => handleSelect(i),
          },
            h('span', { className: 'opt-letter' }, String.fromCharCode(65 + i)),
            opt
          );
        })
      )
    ),

    answered && h('div', { className: 'feedback-box ' + (isRight ? 'fb-correct' : 'fb-wrong') },
      (isRight ? "✓ Correct! " : "✗ Not quite. ") + q.explain
    ),

    answered && h('button', { className: 'next-btn', onClick: handleNext },
      qi < QUESTIONS.length - 1 ? "Next Question →" : "See Results"
    )
  );
}

/* ── App Shell ───────────────────────────────────────────────────── */
function App() {
  const [page,        setPage]        = useState('dashboard');
  const [courses,     setCourses]     = useState(COURSES);
  const [totalXp,     setTotalXp]     = useState(540);
  const [quizResults, setQuizResults] = useState(null);

  const enrolled    = courses.filter(c => c.enrolled).length;
  const avgProgress = enrolled
    ? Math.round(courses.filter(c => c.enrolled).reduce((s, c) => s + c.progress, 0) / enrolled)
    : 0;
  const quizXp      = (quizResults?.score || 0) * 20;

  const navItems = [
    { id: 'dashboard', icon: "🏠", label: "Dashboard" },
    { id: 'courses',   icon: "📚", label: "Courses",
      badge: courses.filter(c => !c.enrolled).length },
    { id: 'quiz',      icon: "⚡", label: "Knowledge Quiz" },
  ];

  const sidebarStats = [
    { label: "Courses",   val: enrolled + "/" + courses.length, pct: (enrolled / courses.length) * 100, color: 'var(--teal)'  },
    { label: "Avg Score", val: avgProgress + "%",               pct: avgProgress,                        color: 'var(--amber)' },
    { label: "Quiz XP",   val: String(quizXp),                  pct: (quizXp / 100) * 100,               color: 'var(--green)' },
  ];

  return h('div', { className: 'app-shell' },

    /* Topbar */
    h('header', { className: 'topbar' },
      h('div', { className: 'brand' },
        h('div', { className: 'brand-icon' }, "📡"),
        h('div', { className: 'brand-name' }, "Edu",
          h('span', null, "Pulse")
        )
      ),
      h('div', { className: 'topbar-right' },
        h('div', { className: 'xp-pill' }, "⚡ " + totalXp + " XP"),
        h('div', { className: 'avatar'  }, "RS")
      )
    ),

    /* Sidebar */
    h('nav', { className: 'sidebar' },
      h('div', { className: 'nav-section-label' }, "Navigation"),
      navItems.map(item =>
        h('button', {
          key: item.id,
          className: 'nav-btn' + (page === item.id ? ' active' : ''),
          onClick: () => setPage(item.id),
        },
          h('span', { className: 'nav-icon' }, item.icon),
          item.label,
          item.badge > 0 && h('span', { className: 'nav-badge' }, item.badge)
        )
      ),

      h('div', { className: 'sidebar-progress' },
        h('div', { className: 'sp-title' }, "Your Progress"),
        sidebarStats.map(s =>
          h('div', { key: s.label },
            h('div', { className: 'sp-row' },
              h('span', { className: 'sp-label' }, s.label),
              h('span', { className: 'sp-val'   }, s.val)
            ),
            ProgressBar({ pct: Math.min(s.pct, 100), color: s.color }),
            h('div', { style: { marginBottom: 10 } })
          )
        ),
        h('div', { style: { fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 } }, "Badges"),
        h('div', { className: 'badge-row' },
          BADGES.map((b, i) =>
            h('span', {
              key: i,
              className: 'badge-item' + (b.unlocked ? '' : ' locked'),
              title: b.label,
            }, b.emoji)
          )
        )
      )
    ),

    /* Main content */
    h('main', { className: 'main' },
      page === 'dashboard' && h(Dashboard,     { courses, totalXp, quizResults }),
      page === 'courses'   && h(CourseLibrary, { courses, setCourses, setTotalXp }),
      page === 'quiz'      && h(QuizEngine,    { setTotalXp, quizResults, setQuizResults }),
    )
  );
}

/* ── Mount ───────────────────────────────────────────────────────── */
ReactDOM.createRoot(document.getElementById('root')).render(h(App, null));
