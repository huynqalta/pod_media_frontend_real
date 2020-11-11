// import "nprogress/nprogress.css";
import "./NProgress.scss";
var NProgress = require("../../../node_modules/nprogress/nprogress.js");

NProgress.configure({
  trickle: true,
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: true,
});

export const NProgressStart = () => {
  NProgress.set(0.0);
  NProgress.set(0.2);
  NProgress.set(0.4);
  NProgress.set(0.6);
  NProgress.set(0.7);
};
export const NProgressEnd = () => {
  NProgress.set(1.0);
};
export const NProgressDone = () => {
  NProgress.done(true);
};
