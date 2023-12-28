function animation(params) {
  const { update, render } = params;
  let pTimestamp = 0;
  //  let requestId = requestAnimationFrame(tick);
  requestAnimationFrame(tick);

  function tick(timestamp) {
    requestAnimationFrame(tick);

    const diff = timestamp - pTimestamp;
    const fps = 1000 / diff;
    const secondPart = diff / 1000;
    pTimestamp = timestamp;

    const params = {
      diff,
      timestamp,
      pTimestamp,
      fps,
      secondPart,
    };

    update(params);
    //clear();
    render(params);
  }
}
let x = 168;
let y = 205;
let endX = 200;
let endY = 230;
let pTimestamp = 0;

//function line(params) {
//  const { update, render } = params;
//  requestAnimationFrame(tick);

//  function tick(timestamp) {
//    requestAnimationFrame(tick);

//    const diff = timestamp - pTimestamp;
//    const fps = 1000 / diff;
//    const secondPart = diff / 1000;
//    pTimestamp = timestamp;

//    const params = {
//      diff,
//      timestamp,
//      pTimestamp,
//      fps,
//      secondPart,
//    };
//update(){
//   x = x + 1;
//   y = y + 1;
//},
//render(){
//   ctx.fillStyle = "#000";
//   ctx.strokeStyle = "#000";
//   ctx.beginPath();
//   ctx.arc(x, y, 5, 0, Math.PI * 2);
//   ctx.closePath();
//   ctx.fill();
//   ctx.stroke();
//   if (y < endY) {
//     requestAnimationFrame(tick);
//   }
// }

//  //  let pTimestamp = 0;
////  console.log("3333333");
////  let requestId = requestAnimationFrame(tick);

////  function tick(timestamp) {

////  cancelAnimationFrame(requestId);
//}
//};
//line();
let requestId = requestAnimationFrame(tick);
animation({
  update() {
    x = x + 1;
    y = y + 1;
  },
  render() {
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (y < endY) {
      requestAnimationFrame(requestId);
    }
  },
});