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
