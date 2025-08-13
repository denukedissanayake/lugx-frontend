function sendEvent(event) {
  fetch("http://lugx.service:8080/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  }).catch(console.error);
}

document.addEventListener("click", (e) => {
  const id = e.target.id || e.target.className || e.target.tagName || "unknown";
  let event = {
    event_type: "click",
    element_id: id,
  };
  sendEvent(event);
});

window.addEventListener("load", () => {
  let event = {
    event_type: "page_view",
    element_id: window.location.pathname,
  };
  sendEvent(event);
});

const startTime = Date.now();
window.addEventListener("beforeunload", () => {
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  let event = {
    event_type: "time_on_page",
    element_id: timeSpent.toString(),
  };
  sendEvent(event);
});

sendEvent({
  event_type: "user_info",
  element_id: navigator.userAgent,
});

window.addEventListener("popstate", () => {
  let event = {
    event_type: "navigation",
    element_id: window.location.pathname,
  };
  sendEvent(event);
});

// let scrollTimeout;
// window.addEventListener("scroll", () => {
//   clearTimeout(scrollTimeout);
//   scrollTimeout = setTimeout(() => sendEvent("scroll", "page"), 200);
// });
