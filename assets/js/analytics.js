function sendEvent(event) {
  fetch("http://lugx.service:8080/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  }).catch(console.error);
}

const getPage = (page) => {
  page
    .split("/")
    .pop()
    .replace(/\.html$/, "");
};

document.addEventListener("click", (e) => {
  const target = e.target.closest("[id], [class], button, a") || e.target;
  const id = target.id || target.className || target.tagName || "unknown";

  let event = {
    event_type: "click",
    page: getPage(window.location.pathname),
    time_spent: "",
    element_id: id.toString,
    user_info: "",
  };
  sendEvent(event);
});

window.addEventListener("load", () => {
  let event = {
    event_type: "page_view",
    page: getPage(window.location.pathname),
    time_spent: "",
    element_id: "",
    user_info: "",
  };
  sendEvent(event);
});

const startTime = Date.now();
window.addEventListener("beforeunload", () => {
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  let event = {
    event_type: "time_on_page",
    page: getPage(window.location.pathname),
    time_spent: timeSpent.toString(),
    element_id: "",
    user_info: "",
  };
  sendEvent(event);
});

sendEvent({
  event_type: "user_info",
  page: "",
  time_spent: "",
  element_id: "",
  user_info: navigator.userAgent,
});

// let previousPath = window.location.pathname;
// window.addEventListener("popstate", () => {
//   const newPath = window.location.pathname;

//   const event = {
//     event_type: "navigation",
//     from: previousPath,
//     to: newPath,
//   };

//   sendEvent(event);
//   previousPath = newPath;
// });

// let scrollTimeout;
// window.addEventListener("scroll", () => {
//   clearTimeout(scrollTimeout);
//   scrollTimeout = setTimeout(() => sendEvent("scroll", "page"), 200);
// });
