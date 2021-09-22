import gsap from "gsap";

export const wait = (timeout) => new Promise((res) => setTimeout(res, timeout));

export const moveTo = (element, options) =>
  new Promise((res) => {
    gsap.to(element, {
      ...options,
      onComplete: options.onComplete
        ? async () => {
            const optResp = options.onComplete();
            if (optResp instanceof Promise) await optResp;
            res();
          }
        : res,
    });
  });

export const copyToClipboard = async (value) => {
  if (window.navigator?.clipboard) {
    await window.navigator.clipboard.writeText(value);
  } else {
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";
    const fakeElement = document.createElement("textarea");
    // Prevent zooming on iOS
    fakeElement.style.fontSize = "12pt";
    // Reset box model
    fakeElement.style.border = "0";
    fakeElement.style.padding = "0";
    fakeElement.style.margin = "0";
    // Move element out of screen horizontally
    fakeElement.style.position = "absolute";
    fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
    // Move element to the same position vertically
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElement.style.top = `${yPosition}px`;

    fakeElement.setAttribute("readonly", "");
    fakeElement.value = value;

    document.body.appendChild(fakeElement);

    fakeElement.select();
    fakeElement.setSelectionRange(0, fakeElement.value.length);

    document.execCommand("copy");
    fakeElement.remove();
  }
};
