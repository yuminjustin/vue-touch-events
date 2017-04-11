import Touch from './vue-touch-events'

Vue.use(Touch)

new Vue({
	el: "#app",
	data: {
		msg: ""
	},
	methods: {
		tapCb: function (e) {
			this.msg = "轻触"
		},
		longTapCb: function () {
			this.msg = "长按"
		},
		swipeupCb: function () {
			this.msg = "上滑"
		},
		swipedownCb: function () {
			this.msg = "下滑"
		},
		swipeleftCb: function () {
			this.msg = "左滑"
		},
		swiperightCb: function () {
			this.msg = "右滑"
		},
		swipeCb: function () {
			this.msg = "滑动"
		},
		dragCb: function () {
			this.msg = "拖拽"
		}
	}
}) 
