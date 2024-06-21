function onClickConvert(srcTextAreaId, destTextAreaId, checkBoxId, logId = null) {
  try {
    document.getElementById(destTextAreaId).value = JSON.parse(document.getElementById(srcTextAreaId).value).map(
      (w) => {
        if (document.getElementById(checkBoxId).checked) {
          return [
            `"${w["favoriteId"]}"`,
            `"${w["id"]}"`,
            `"${w["name"]}"`,
            `"${(w["unityPackages"] ?? []).map((w) => w["platform"]).includes("android") ? "android" : "pc"}"`
          ].join("\t");
        } else {
          return (w["tags"] ?? []).map(
            (t) => [
              `"${w["favoriteId"]}"`,
              `"${w["id"]}"`,
              `"${w["name"]}"`,
              `"${(w["unityPackages"] ?? []).map((w) => w["platform"]).includes("android") ? "android" : "pc"}"`,
              `"${t}"`
            ].join("\t")).join("\n");
        }
      }
    ).join("\n");
  } catch (e) {
    if (logId != null) {
      document.getElementById(destTextAreaId).innerText = `エラーが発生しました: ${e}`
    }
  }
}

function onClickCopy(srcTextAreaId, logId) {
  navigator.clipboard.writeText(document.getElementById(srcTextAreaId).value);
  document.getElementById(logId).innerText = "コピーしました";
  setTimeout(() => {
    document.getElementById(logId).innerText = "";
  }, "3000");
}