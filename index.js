import Touch from './vue-touch-events'

Vue.use(Touch)

new Vue({
	el: "#app",
	data: {
		msg: "",
		msg2: ""
	},
	methods: {
		tapCb: function (e) {
			this.msg = "Tap"
		},
		longTapCb: function () {
			this.msg = "Longtap"
		},
		swipeupCb: function () {
			this.msg = "Up"
		},
		swipedownCb: function () {
			this.msg = "Down"
		},
		swipeleftCb: function () {
			this.msg = "Left"
		},
		swiperightCb: function () {
			this.msg = "Right"
		},
		swipeCb: function () {
			this.msg = "Swipe"
		},
		dragCb: function () {
			this.msg2 = "Moving"
		}
	}
})
