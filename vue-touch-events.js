let TouchEvents = ['tap', 'longtap', 'swipeup', 'swipedown', 'swipeleft', 'swiperight', 'swipe', 'drag']
//注册触摸事件
//register the touch event
TouchEvents = TouchEvents.map((evt) => {
	return {
		name: evt, 
		evt: new Event(evt) 
	}
})

let touch = {
	install(Vue) {
		Vue.directive('touch', {
			inserted: (dom, conf) => touchRegist(dom, conf.modifiers)
		});
		//触摸开始时间
		//start time when touch the screen
		let startTime, touches = {},
			ismoved = !1;
		//原生触摸事件监听
		//touch events listener
		let touchRegist = (dom, cfg) => {
			//禁止浏览器事件 默认关闭
			//prohibit browser swipe events ,default is allow
			//当前对象是否能拖拽 默认关闭
			//this dom can be dragged ,default is can't
			let pD = cfg.preventdefault || !1,  
				_dg = cfg.drag || !1;
			dom.addEventListener('touchstart', (e) => {
				e.stopPropagation()
				pD && e.preventDefault();
				startTime = (new Date()).getTime();
				touches.start = e.changedTouches[0]
			}, false);

			dom.addEventListener('touchmove', (e) => {
				e.stopPropagation()
				touches.move = e.changedTouches[0]
				moveCheck(_dg, dom)
			}, false);

			dom.addEventListener('touchend', (e) => {
				e.stopPropagation()
				let endTime = (new Date()).getTime();
				touches.end = e.changedTouches[0];
				let n = _dg ? 7 : typeCheck(endTime - startTime);
				dom.dispatchEvent(TouchEvents[n].evt);
				ismoved = !1;
			}, false);
		}

		let typeCheck = (d) => {
			switch (touchCheck()) {
				case -2:
					/*右滑  swipe right*/
					return (d > 5e2) ? 6 : 5;
				case -1:
					/*下滑 swipe down*/
					return (d > 5e2) ? 6 : 3;
				case 0:
					/*轻触 tap *长按 long tap*/
					var n = (d < 5e2) ? 0 : 1;
					return ismoved ? 6 : n
				case 1:
					/*上滑 swipe up*/
					return (d > 5e2) ? 6 : 2;
				case 2:
					/*左滑 swipe left*/
					return (d > 5e2) ? 6 : 4;
				default:
					/*触摸 swipe*/
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
			//0 tap  1 上 -1下  2 左 -2 右  3 触摸
			//0 tap  1 up -1 down  2 left -2 right  3 swipe
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

        //判断用户是否仅仅是滑动屏幕
        //check user just swipe screen
		let moveCheck = (_dg, dom) => {
			let s = touches.start,
				m = touches.move,
				x = s.clientX - m.clientX,
				y = s.clientY - m.clientY;
			if (_dg) {
				let h = m.clientY - dom.offsetHeight * 0.5,
					w = m.clientX - dom.offsetWidth * 0.5;
				dom.style.top = h + "px";
				dom.style.left = w + "px";
			} else {
				if (Math.abs(x) > 50 || Math.abs(y) > 50) ismoved = !0;
			}
		}
	}
}

if (typeof exports == "object") module.exports = touch
else if (typeof define == "function" && define.amd) {
	define([], function () {
		return touch
	})
} else if (window.Vue) Vue.use(touch)
