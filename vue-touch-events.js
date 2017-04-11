//触摸事件
let TouchEvents = ['tap', 'longtap', 'swipeup', 'swipedown', 'swipeleft', 'swiperight', 'swipe', 'drag']
//注册上述事件

TouchEvents = TouchEvents.map((evt) => {
	return {
		name: evt, //名称
		evt: new Event(evt) //自定义事件
	}
})

let touch = {
	install(Vue) {
		Vue.directive('touch', {
			inserted: (dom, conf) => touchRegist(dom, conf.modifiers)
		});
		//触摸开始时间
		let startTime, touches = {},
			ismoved = !1;
		//触摸监听
		let touchRegist = (dom, pD) => {
			dom.addEventListener('touchstart', (e) => {
				e.stopPropagation()
				pD && e.preventDefault();
				startTime = (new Date()).getTime();
				touches.start = e.changedTouches[0]
			}, false);

			dom.addEventListener('touchmove', (e) => {
				e.stopPropagation()
				touches.move = e.changedTouches[0]
				moveCheck()
			}, false);

			dom.addEventListener('touchend', (e) => {
				e.stopPropagation()
				let endTime = (new Date()).getTime();
				touches.end = e.changedTouches[0];
				dom.dispatchEvent(TouchEvents[typeCheck(endTime - startTime)].evt);
				ismoved = !1;
			}, false);


		}

		let typeCheck = (d) => {
			switch (touchCheck()) {
				case -2:
					/*右滑**/
					return (d > 5e2) ? 6 : 5;
				case -1:
					/*下滑**/
					return (d > 5e2) ? 6 : 3;
				case 0:
					/*轻触* *长按*/
					var n = (d < 5e2) ? 0 : 1;
					return ismoved ? 6 : n
				case 1:
					/*上滑*/
					return (d > 5e2) ? 6 : 2;
				case 2:
					/*左滑*/
					return (d > 5e2) ? 6 : 4;
				default:
					/*触摸*/
					return 6
			}
		}

		let touchCheck = () => {
			let s = touches.start,
				e = touches.end,
				x = s.clientX - e.clientX,
				y = s.clientY - e.clientY,
				X = Math.abs(x),
				Y = Math.abs(y);
			//0tap  1上 -1下  2左 -2右  3触摸  4拖拽
			if (X < 10 && Y < 10) return 0
			else {
				if (X > Y) {
					if (Y > 50) return 3
					else return x > 0 ? 2 : -2
				} else {
					if (X > 50) return 3
					else return y > 0 ? 1 : -1
				}
			}
		}

		let moveCheck = () => {
			let s = touches.start,
				m = touches.move,
				x = s.clientX - m.clientX,
				y = s.clientY - m.clientY;
			if (Math.abs(x) > 50 || Math.abs(y) > 50) ismoved = !0;
		}
	}
}

if (typeof exports == "object") module.exports = touch
else if (typeof define == "function" && define.amd) {
	define([], function () {
		return touch
	})
} else if (window.Vue) Vue.use(touch)
