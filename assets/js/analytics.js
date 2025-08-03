function sendEvent(eventType, elementId) {
  console.log("event captured", eventType, elementId);
  fetch("http://lugx.service/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: eventType,
      element_id: elementId,
    }),
  }).catch(console.error);
}

document.addEventListener("click", (e) => {
  const id = e.target.id || e.target.className || "unknown";
  sendEvent("click", id);
});

let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => sendEvent("scroll", "page"), 200);
});

window.addEventListener("load", () =>
  sendEvent("page_view", window.location.pathname)
);

const startTime = Date.now();
window.addEventListener("beforeunload", () => {
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  sendEvent("time_on_page", timeSpent.toString());
});

sendEvent("user_info", navigator.userAgent);

window.addEventListener("popstate", () => {
  sendEvent("navigation", window.location.pathname);
});
