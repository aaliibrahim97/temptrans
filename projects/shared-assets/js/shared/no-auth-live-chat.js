function loadLiveChatWidget() {
  var script = document.createElement("script");
  script.async = true;
  script.type = "module";
  script.crossOrigin = "anonymous";
  script.src =
    "https://cdn.jsdelivr.net/gh/shakeel0581/onmnichennalCdnv2@main/index-5fbe1d76.js";
  document.body.appendChild(script);
}

loadLiveChatWidget();

const global = globalThis;

const intrv = setInterval(() => {
  if (document.querySelectorAll("#crmroot > *")[0]) {
    if (document.querySelectorAll("#crmroot > *")[0].style.right) {
      document.querySelectorAll("#crmroot > *")[0].style.right = "100px";
    }
    if (document.querySelectorAll("#crmroot > *")[0].style.left) {
      document.querySelectorAll("#crmroot > *")[0].style.left = "100px";
    }
    clearInterval(intrv);
  }
}, 200);
