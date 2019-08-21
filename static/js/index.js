var agent = '';
if (document.domain == 'www.test.com') {
	var agent = '/api'; // 用于跨域代理名称转化
	console.log('测试环境')
} else {
	console.log('线上环境')
}

new Vue({
	el: '#vue',
	data: {
		xuwei: '测试数据',
		classification: [],
		banner: [],
		hotScenery: [],
		nearbyScenery: [],
		banner_index: 0,
	},
	created: function() {
		
		
		let that = this;

		var href = window.location.href;
		var code = '';
		if (window.location.href.split('?').length > 1) {
			var parm = href.split('?')[1];
			var parms = parm.split('&');
			parms.forEach(function(item, index) {
				if (item.split('=')[0] == 'code') {
					code = item.split('=')[1];
				}
			})
		}

		// 判断是否带有code进入
		if (!code == '') {
			$.post(agent + "/lsmsManager/weChat/create", {
					code: code,
				},
				function(data, status) {

						
						var expireTimestamp = new Date().getTime()+86400000;
						
						localStorage.setItem('expire',expireTimestamp);
						localStorage.setItem('weChatCity',data[0].weChatCity);
						localStorage.setItem('weChatCountry',data[0].weChatCountry);
						localStorage.setItem('weChatHeadImg',data[0].weChatHeadImg);
						localStorage.setItem('weChatName',data[0].weChatName);
						localStorage.setItem('weChatOpenId',data[0].weChatOpenId);
						localStorage.setItem('weChatSex',data[0].weChatSex);
						
						// $.cookie('weChatCity', data[0].weChatCity,{ expires: 7, path: document.domain });
						// $.cookie('weChatCountry', data[0].weChatCountry,{ expires: 7, path: document.domain });
						// $.cookie('weChatHeadImg', data[0].weChatHeadImg,{ expires: 7, path: document.domain });
						// $.cookie('weChatName', data[0].weChatName,{ expires: 7, path: document.domain });
						// $.cookie('weChatOpenId', data[0].weChatOpenId,{ expires: 7, path: document.domain });
						// $.cookie('weChatProvince', data[0].weChatProvince,{ expires: 7, path: document.domain });
						// $.cookie('weChatSex', data[0].weChatSex,{ expires: 7, path: document.domain });
				})

	} else {
		
		var currentTimestamp = new Date().getTime();
		var expire = localStorage.getItem('expire');
		
		if(localStorage.getItem('weChatOpenId') == null) {
			var getCodeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb91238e9f2c2f688&redirect_uri=' + window.location.href + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
			window.location.href = getCodeUrl;
		}else{
			if(!expire == null){
				if(expire < currentTimestamp){
					localStorage.removeItem('weChatCity');
					localStorage.removeItem('weChatCountry');
					localStorage.removeItem('weChatHeadImg');
					localStorage.removeItem('weChatName');
					localStorage.removeItem('weChatOpenId');
					localStorage.removeItem('weChatProvince');
					localStorage.removeItem('weChatSex');
					var getCodeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb91238e9f2c2f688&redirect_uri=' + window.location.href + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
					window.location.href = getCodeUrl;
				}
			}
		}
	}
	



	// 查询分类类型
	$.post(agent + "/lsmsManager/classification/queryForPage", {},
		function(data, status) {
			var data = data.filter(function(val, index) {
				val.classification_picture = agent + '/imgaes/' + val.classification_picture.substring(0, val.classification_picture.length - 1);
				return index < 4;
			})
			that.classification = data;

		});

	// 查询轮播图数据
	$.post(agent + "/lsmsManager/productPlayPicture/queryProductPlayPictureShowHome", {},
		function(data, status) {
			that.banner = data.map(function(value, index) {
				value.picture = agent + '/imgaes/' + value.picture.substring(0, value.picture.length - 1);
				console.log(value.picture)
				return value;
			});
		}

	);

	// 查询推荐/如:周边热点 - 超值热销 
	$.post(agent + "/lsmsManager/product/queryProductInfoByPiPushStatus", {
			pi_push_status: 1, // 1为超值热销，2为热点周边景点， 0为未推荐
			start: 0,
			limit: 5,
		},
		function(data, status) {
			that.hotScenery = data.map(function(value, index) {
				value.pi_picture = agent + '/imgaes/' + value.pi_picture.substring(0, value.pi_picture.length - 1);
				return value;
			});
		}
	);

	// 查询推荐/如:周边热点 - 热点周边景点
	$.post(agent + "/lsmsManager/product/queryProductInfoByPiPushStatus", {
			pi_push_status: 2, // 1为超值热销，2为热点周边景点， 0为未推荐
			start: 0,
			limit: 5,
		},
		function(data, status) {
			that.nearbyScenery = data.map(function(value, index) {
				value.pi_picture = agent + '/imgaes/' + value.pi_picture.substring(0, value.pi_picture.length - 1);
				return value;
			});
		}
	);

},
methods: {
	searchProduce: function() {
		var key = $('#key').val();
		if (key == '') {
			alert('请输入关键字');
			return false;
		}
		location.href = 'category.html?key=' + key;
	}
},
mounted: function() {
	let that = this;
	setTimeout(function() {
		$.getScript("static/js/siema.min.js", function() { //加载test.js,成功后，并执行回调函数  
			var mySiema = new Siema({ //下面要用到Siema，就要声明为全局变量
				loop: true,
			});
			setInterval(function() {
				mySiema.next();
				that.banner_index = mySiema.currentSlide;
			}, 3000);

			setInterval(function() {
				that.banner_index = mySiema.currentSlide;
			}, 100);


			$('.banner-spot span').click(function(e) {
				var index = $(".banner-spot span").index($(this))
				mySiema.goTo(index);
				that.banner_index = index;
			})
		});

	}, 200)



}
});

$(function() {
	$('.tab-classify-ctrl li').click(function() {
		var i = $(this).index();
		$(this).addClass('sel').siblings().removeClass('sel');
		$(this).parents('.tab-classify').find('.tab-classify-item').hide();
		$(this).parents('.tab-classify').find('.tab-classify-item').eq(i).show();
	});
	imgClip(".hot-list .img", 2);
	imgClip(".hot-list.single .img", 2);
	imgClip(".banner .sw-item", 2);

	//img-clip
	function imgClip(e, s) {
		var w = $(e).width();
		var h = parseInt(w / s);
		$(e).each(function() {
			$(this).css("height", h);
			var ih = $(this).find("img").height();
			if (ih < h) {
				$(this).find("img").css("height", "100%")
			}
		});
	};

	$('.menu-bar .more-ctrl').click(function() {
		menuBarShow();
	});
	$('.menu-bar-more .more-hide').click(function() {
		menuBarHide();
	});
	$('.menu-bar-more .menu-bar-mask').click(function() {
		menuBarHide();
	});

	function menuBarShow() {
		$('.menu-bar-mask').fadeIn('fast');
		$('.menu-bar-more').addClass('in');
		$('body').addClass('disable');
	}

	function menuBarHide() {
		$('.menu-bar-mask').fadeOut('fast');
		$('.menu-bar-more').removeClass('in');
		$('body').removeClass('disable');
	}

	$('.infomation-history-ctrl').click(function() {
		popupWrapShow('.infomation-history-wrap');
	});
	$('.popup-wrap .btn-close').click(function() {
		popupWrapHide();
	});

	function popupWrapShow(ojb) {
		$(ojb).fadeIn('fast');
		$('body').addClass('disable');
	}

	function popupWrapHide() {
		$('.popup-wrap').fadeOut('fast');
		$('body').removeClass('disable');
	}

});


// 			[{weChatCity: "茂名", weChatCountry: "中国",…}]
// 0: {weChatCity: "茂名", weChatCountry: "中国",…}
// weChatCity: "茂名"
// weChatCountry: "中国"
// weChatHeadImg: "http://thirdwx.qlogo.cn/mmopen/vi_32/bObjvNjLKzwKYPoEpmCMCH4dOGP37mo3HRZDuugsSYdDAbVN0bICROGPmpT63B9NFwNf2I3GicIZnL9C52P7AiaA/132"
// weChatName: "想着想着就忘了"
// weChatOpenId: "ooJCF52C6pBCHo4nLjdZhhK50dbA"
// weChatProvince: "广东"
// weChatSex: 1
