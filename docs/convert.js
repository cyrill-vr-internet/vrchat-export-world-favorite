function onClickConvert(srcTextAreaId, destTextAreaId, logId = null) {
    /*
    document.getElementById(destTextAreaId).innerText = JSON.parse(document.getElementById(srcTextAreaId).value).map(
        (w) => [
            w["favoriteId"],
            w["id"],
            w["name"],
            w["unityPackages"].map((w) => w["platform"]).includes("android") ? "android" : "pc"
        ].concat(w["tags"]).map((x) => `"${x}"`).join("\t")).join("\n");
        */
    try {
        document.getElementById(destTextAreaId).value = JSON.parse(document.getElementById(srcTextAreaId).value).map(
            (w) => 
                w["tags"].map(
                    (t) => [
                        `"${w["favoriteId"]}"`,
                        `"${w["id"]}"`,
                        `"${w["name"]}"`,
                        `"${w["unityPackages"].map((w) => w["platform"]).includes("android") ? "android" : "pc"}"`,
                        `"${t}"`
                    ].join("\t")
                ).join("\n")
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