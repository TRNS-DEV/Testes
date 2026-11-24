/*
  CALENDÁRIO UECÍ — CONFIGURAÇÃO E DADOS
  Para editar a programação inicial, altere a lista SAMPLE_EVENTS abaixo.
  Cada evento precisa de: id, title, date (AAAA-MM-DD), time, location e type.
  Tipos aceitos: Recicláveis, Lixo comum, Eletrônicos, Entulho e Aviso.
*/

const SAMPLE_EVENTS = [
  { id: "e1", title: "Coleta de lixo comum", date: "2026-11-17", time: "08:00", location: "Boa Viagem", type: "Lixo comum", description: "Passagem do caminhão de coleta nos pontos habituais do bairro." },
  { id: "e2", title: "Coleta seletiva", date: "2026-11-19", time: "09:00", location: "Casa Amarela", type: "Recicláveis", description: "Separar papel, plástico, metal e vidro limpos." },
  { id: "e3", title: "Ponto de coleta de eletrônicos", date: "2026-11-21", time: "08:30", location: "Praça de Boa Viagem", type: "Eletrônicos", description: "Recebimento de pequenos eletrônicos para descarte adequado." },
  { id: "e4", title: "Coleta de lixo comum", date: "2026-11-24", time: "08:00", location: "Boa Viagem", type: "Lixo comum", description: "Programação fictícia de coleta." },
  { id: "e5", title: "Mutirão de recicláveis", date: "2026-11-26", time: "14:00", location: "Santo Amaro", type: "Recicláveis", description: "Ação comunitária de recolhimento de materiais recicláveis." },
  { id: "e6", title: "Alteração de horário", date: "2026-11-28", time: "10:00", location: "Dois Irmãos", type: "Aviso", description: "Aviso demonstrativo: horário sujeito à confirmação." },
  { id: "e7", title: "Coleta de entulho", date: "2026-12-01", time: "07:30", location: "Casa Forte", type: "Entulho", description: "Agendamento fictício para demonstração do calendário." }
];

const STORAGE_KEY = "ueci-calendar-events-v1";
const today = new Date();
today.setHours(0, 0, 0, 0);

let events = loadEvents();
let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = new Date(today);

const $ = (id) => document.getElementById(id);
const grid = $("calendarGrid");
const dialog = $("eventDialog");

function loadEvents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [...SAMPLE_EVENTS];
  } catch (error) {
    console.warn("Não foi possível carregar os eventos salvos.", error);
    return [...SAMPLE_EVENTS];
  }
}
function saveEvents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}
function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function parseDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function sameDay(a, b) { return dateKey(a) === dateKey(b); }
function monthName(date) {
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(date);
}
function longDate(date) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long" }).format(date);
}
function weekday(date) {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);
}
function eventsOn(date) {
  return events.filter(event => event.date === dateKey(date)).sort((a, b) => a.time.localeCompare(b.time));
}
function renderCalendar() {
  $("monthTitle").textContent = monthName(viewDate);
  grid.innerHTML = "";
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const start = new Date(firstDay);
  start.setDate(1 - firstDay.getDay());

  for (let i = 0; i < 42; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const dayEvents = eventsOn(date);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "calendar-day";
    if (date.getMonth() !== viewDate.getMonth()) cell.classList.add("outside");
    if (sameDay(date, today)) cell.classList.add("today");
    if (sameDay(date, selectedDate)) cell.classList.add("selected");
    cell.setAttribute("aria-label", `${longDate(date)}, ${dayEvents.length} evento(s)`);
    const number = document.createElement("span");
    number.className = "day-number";
    number.textContent = date.getDate();
    cell.append(number);

    dayEvents.slice(0, 2).forEach(event => {
      const pill = document.createElement("span");
      pill.className = "event-pill" + (event.type === "Aviso" ? " notice" : "");
      pill.textContent = event.title;
      cell.append(pill);
    });
    if (dayEvents.length > 2) {
      const more = document.createElement("span");
      more.className = "more-events";
      more.textContent = `+${dayEvents.length - 2} eventos`;
      cell.append(more);
    }
    cell.addEventListener("click", () => {
      selectedDate = new Date(date);
      if (date.getMonth() !== viewDate.getMonth()) viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      renderAll();
    });
    grid.append(cell);
  }
}
function renderDayEvents() {
  $("selectedDateTitle").textContent = longDate(selectedDate);
  $("selectedWeekday").textContent = weekday(selectedDate);
  const container = $("dayEvents");
  container.innerHTML = "";
  const list = eventsOn(selectedDate);
  if (!list.length) {
    container.innerHTML = '<div class="empty-state">Nenhuma coleta cadastrada para este dia.<br>Use o botão abaixo para adicionar um evento.</div>';
    return;
  }
  list.forEach(event => {
    const card = document.createElement("article");
    card.className = "event-card" + (event.type === "Aviso" ? " notice" : "");
    const title = document.createElement("h3");
    title.textContent = event.title;
    const meta = document.createElement("div");
    meta.className = "event-meta";
    meta.textContent = `${event.time || "Horário não definido"} · ${event.location} · ${event.type}`;
    card.append(title, meta);
    if (event.description) {
      const description = document.createElement("p");
      description.textContent = event.description;
      card.append(description);
    }
    const actions = document.createElement("div");
    actions.className = "event-card-actions";
    const edit = document.createElement("button");
    edit.className = "text-btn";
    edit.textContent = "Editar";
    edit.addEventListener("click", () => openEditor(event));
    const remove = document.createElement("button");
    remove.className = "text-btn delete";
    remove.textContent = "Excluir";
    remove.addEventListener("click", () => deleteEvent(event.id));
    actions.append(edit, remove);
    card.append(actions);
    container.append(card);
  });
}
function renderUpcoming() {
  const container = $("upcomingList");
  container.innerHTML = "";
  const next = [...events]
    .filter(event => parseDate(event.date) >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 6);
  if (!next.length) {
    container.innerHTML = '<div class="empty-state">Não há próximas coletas cadastradas.</div>';
    return;
  }
  next.forEach(event => {
    const date = parseDate(event.date);
    const item = document.createElement("div");
    item.className = "upcoming-item";
    const dateBox = document.createElement("div");
    dateBox.className = "upcoming-date";
    dateBox.innerHTML = `<strong>${date.getDate()}</strong><span>${new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(date).replace(".", "")}</span>`;
    const info = document.createElement("div");
    info.className = "upcoming-info";
    const title = document.createElement("strong");
    title.textContent = event.title;
    const detail = document.createElement("span");
    detail.textContent = `${event.time} · ${event.location}`;
    info.append(title, detail);
    item.append(dateBox, info);
    item.addEventListener("click", () => {
      selectedDate = date;
      viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    item.style.cursor = "pointer";
    container.append(item);
  });
}
function renderAll() {
  renderCalendar();
  renderDayEvents();
  renderUpcoming();
}
function openEditor(event = null) {
  $("eventForm").reset();
  $("eventId").value = event?.id || "";
  $("dialogTitle").textContent = event ? "Editar coleta" : "Adicionar coleta";
  $("eventName").value = event?.title || "";
  $("eventDate").value = event?.date || dateKey(selectedDate);
  $("eventTime").value = event?.time || "08:00";
  $("eventLocation").value = event?.location || "";
  $("eventType").value = event?.type || "Recicláveis";
  $("eventDescription").value = event?.description || "";
  dialog.showModal();
}
function deleteEvent(id) {
  const event = events.find(item => item.id === id);
  if (!event || !confirm(`Excluir "${event.title}"?`)) return;
  events = events.filter(item => item.id !== id);
  saveEvents();
  renderAll();
}
$("eventForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = $("eventId").value || `event-${Date.now()}`;
  const event = {
    id,
    title: $("eventName").value.trim(),
    date: $("eventDate").value,
    time: $("eventTime").value,
    location: $("eventLocation").value.trim(),
    type: $("eventType").value,
    description: $("eventDescription").value.trim()
  };
  if (!event.title || !event.date || !event.location) return;
  const existingIndex = events.findIndex(item => item.id === id);
  if (existingIndex >= 0) events[existingIndex] = event;
  else events.push(event);
  saveEvents();
  selectedDate = parseDate(event.date);
  viewDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  dialog.close();
  renderAll();
});
$("prevMonth").addEventListener("click", () => {
  viewDate.setMonth(viewDate.getMonth() - 1);
  renderCalendar();
});
$("nextMonth").addEventListener("click", () => {
  viewDate.setMonth(viewDate.getMonth() + 1);
  renderCalendar();
});
$("todayBtn").addEventListener("click", () => {
  selectedDate = new Date(today);
  viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
  renderAll();
});
$("addEventTop").addEventListener("click", () => openEditor());
$("addEventSide").addEventListener("click", () => openEditor());
$("closeDialog").addEventListener("click", () => dialog.close());
$("cancelDialog").addEventListener("click", () => dialog.close());

renderAll();
