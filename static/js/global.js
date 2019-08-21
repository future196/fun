$(function() {
	
	/* //banner
	banner(640,180);
	function banner(w,h){
		var bw = $(".banner img").width();
		$(".banner").each(function() {
			$(this).css("height",bw*h/w);
		});
	}; */
	
	imgClip(".hot-list .img",1.8);
	imgClip(".product-list .item .img",1.6);
	imgClip(".product-photo .img",2.1);
	imgClip(".ic-bottom .img",1.6);
	imgClip(".visa-link .img",1.4);
	//img-clip
	function imgClip(e,s){
		var w = $(e).width();
		var h = parseInt(w/s);
		$(e).each(function() {
			$(this).css("height",h);
			var ih = $(this).find("img").height();	
			if(ih < h){
				$(this).find("img").css("height","100%")
			}
        });		
	};
	
	/* 分享  */
	function shareDiv(){
		$(".share-btn").click(function(){
			$("body").css("overflow-y","hidden");
			$(".share-div").fadeIn("fast");
			$(".mask-div").fadeIn("fast");
		});
		$(".mask-div").click(function(){
			$(".share-div").fadeOut("fast");
			$(this).fadeOut("fast");
			$("body").css("overflow-y","auto");
		});
		$(".share-div").click(function(){
			$(".share-div").fadeOut("fast");
			$(".mask-div").fadeOut("fast");
			$("body").css("overflow-y","auto");
		});
	}shareDiv();

	

	//fold-block
	$(".fold-block .fb-top").click(function(){
		var o = $(this);
		var ntr=o.next().find(".table-list");
		if (ntr.text()==''){
			var start_date=$('#start_date').val();
			var start_area_id=$('#start_area_id').val();
			var end_area_id=$('#end_area_id').val();
			var start_place_id=o.attr('start_place_id');
			var times=o.attr('times');
			var info_id=o.attr('info_id');
			ntr.load('/m2c/2/list14.jsp?action=getseat&info_id='+info_id+'&start_date='+start_date+'&times='+times+'&start_place_id='+start_place_id+'&end_id='+end_area_id+'&start_id='+start_area_id, function(){
				//o.parent().find(".fb-cont").slideToggle("fast");
 			});
		}else{
			o.parent().find(".fb-cont").slideToggle("fast");
		}
		
		var s = o.find(".arrow").html();
		if (s == "c"){
			o.find(".arrow").html("b");
		}else {
			o.find(".arrow").html("c");
		}
		
	});
	
	
	/* city-list */
	$(".city-list .item-ti").click(function(){
		$(this).parent().find(".item-city").slideToggle("fast");
	});
	
	$(".tab-box .tab-a li").click(function(){
		var index = $(this).index()
		$(this).addClass("current").siblings().removeClass("current");
		$(this).parents(".tab-box").find(".tab-b li").siblings().fadeOut("fast");
		$(this).parents(".tab-box").find(".tab-b li").eq(index).fadeIn("fast");
	});
	$(".city-list .item-city a.on").find("b").text("r");
	$(".city-list .cl-cont a").click(function(){
		$(".city-list .cl-cont a").removeClass("on");
		$(this).addClass("on");
		$(".city-list .item-city a").each(function() {
			if($(this).hasClass("on")){
			  $(this).find("b").html("r");
			}else{
			  $(this).find("b").html("");
			}
		});
	})
	  	
	/* 置顶 & 返回顶部 */
	var wrapTopH = $(".wrap-top").height();
	$(window).scroll(function() {
		if($(window).scrollTop() >= 50){
			$('.goTop').fadeIn(300);
		}else{    
			$('.goTop').fadeOut(300);
		}
		if($(window).scrollTop() > 0){
			$(".wrap-top").css("position","fixed");
		}else {
			$(".wrap-top").css("position","static");
		}		
	});
	
	$('.goTop').click(function(){
		$('html,body').animate({scrollTop:"0px"}, 300);
	});	
	
	/* 排序 */
	$(".sb-float").click(function(){
		var index = $(this).index(".sb-float");
		$(".screenside").animate({left:"100%"})
		$(".sb-float").find(".arrow").html("b");
		sortShow(this,".sort");
	});
	
	function sortShow (ojb,div){
		$(div).css("top",wrapTopH);
		if($(div).css("display")=="none"){
			$(ojb).find(".arrow").html("c");
			$(".goTop").fadeOut("fast");
			$(".mask-div").fadeIn("fast");
		}else{
			$(ojb).find(".arrow").html("b");	
			$(".mask-div").fadeOut("fast");
		}
		$(div).fadeToggle("fast");		
		$(".mask-div").click(function(){
			$(ojb).find(".arrow").html("b");
			$(div).fadeOut("fast");
			$(".mask-div").fadeOut("fast");
		});
	}

	$(".screen-bar .more-btn").click(function(){
		$(".sort").fadeOut("fast");
		$(".screenside").css({
				height:$(window).height() - wrapTopH,
				top:wrapTopH
		})
		if($(".mask-div").css("display") == "block") {
			$(".screenside").animate({left:"100%"})
			$("body").css("overflow-y","auto");			
		}else{
			$(".screenside").animate({left:"30%"})
			$("body").css("overflow-y","hidden");
		}
		$(".mask-div").fadeToggle(200);
		$(".goTop").fadeOut(200);

		$(".mask-div").click(function(){
			$(".screenside").animate({left:"100%"})
			$(".mask-div").fadeOut(200);
			$("body").css("overflow-y","auto");			
		});
	});

	accordion(".ss-ti",".ss-cont");
	accordion(".accordion-ti",".accordion-cont");
	function accordion(ti,cont){
		$(ti).click(function(){
			$(this).parent().find(cont).slideToggle("fast");
		});
	}
	
	selRadio(".selRadio li");
	selRadio(".selRadio dd");
	function selRadio(ojb){
		$(ojb).click(function(){
			$(ojb).eq($(this).index(ojb)).addClass('sel').siblings().removeClass('sel');		
		});
	}
	
	$(".selRadio li").click(function() {
        var i = $(this).parent(".selRadio").index();
		if($(this).parents(".selRadio").hasClass("countPrice")){
			$(".selRadio").eq(i).find(".add").addClass("none");
			$(".selRadio").eq(i).find(".no").text(0);	
			$(".selRadio").eq(i).find(".minus").addClass("none");
		}
		$(this).find(".add").removeClass("none");
		$(this).find(".no").text(1);	
		$(this).find(".minus").removeClass("none");
		countAdd();
    });
	
	
	selCheckbox(".checkbox-ctrl");
	
	$(".menu-link").click(function(){
		$(".menu-div").fadeToggle("fast");
		$(".mask-div").css("top",$(".top").outerHeight()).fadeToggle("fast");
		$(".mask-div").click(function(){
			$(".menu-div").fadeOut("fast");
			$(this).fadeOut("fast");
		})
	})
	
	$(".link-box a").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	});
	
	/* 日历 */
	$(".calendar .c-month a").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
	});
	function calendarHotel(){
		var ojb = $(".cal-price .c-day li");
		var flag = 1;
		var dText;
		ojb.click(function(){
			if($(this).find(".price").text() != ""){
				if(flag == 1){
					//$(".calendar .c-day .on").find("span").text(dText);
					$(this).addClass("on").siblings().removeClass("on");
					dText = $(this).find("span").text();
					if($(this).parents("div").hasClass("double")){
						$(this).find("span").text("入住");
						$(".calendar-box .tips .txt").text("请选择离店日期");
						$(".calendar-box .tips").delay("fast").fadeIn("fast");
						$(".calendar-box .tips").delay("800").fadeOut("fast");
						flag = 2;
						calendarSelected(ojb.index(this),ojb);
					}
				}else if(flag == 2){
					if($(this).hasClass("on")){
						$(".calendar-box .tips .txt").text("不能选择同一天");
						$(".calendar-box .tips").delay("fast").fadeIn("fast");
						$(".calendar-box .tips").delay("800").fadeOut("fast");
					}else if($(this).hasClass("no")){
						$(".calendar-box .tips .txt").text("日期选择错误");
						$(".calendar-box .tips").delay("fast").fadeIn("fast");
						$(".calendar-box .tips").delay("800").fadeOut("fast");
					}else{
						$(this).addClass("leave").siblings().removeClass("leave");
						$(this).find("span").text("离店");
					}
				}
			}
		});
	}calendarHotel();
	function calendarSelected(e,ojb){
		if(ojb.parents("div").hasClass("cal-public")){
			ojb.each(function() {
				if(ojb.index(this) < e){
					$(this).addClass("no");
				}
        	});		
		}
		ojb.each(function() {
            if(ojb.index(this) < e && $(this).find(".price").text() != ""){
				$(this).addClass("no");
			}
        });
	}
	
	function calPublic(){
		var ojb = $(".cal-public .c-day li");
		var flag = 1;
		ojb.click(function(){
			if( flag == 1 && $(this).find("span").text()!= ""){
				$(this).addClass("on").siblings().removeClass("on");
				if($(this).parents("div").hasClass("double")){
					$(".calendar-box .tips .txt").text("请选择离开日期");
					$(".calendar-box .tips").delay("fast").fadeIn("fast");
					$(".calendar-box .tips").delay("800").fadeOut("fast");
					flag = 2;
					calendarSelected(ojb.index(this),ojb);

				}
			}else if(flag == 2){
				if($(this).hasClass("on")){
					$(".calendar-box .tips .txt").text("不能选择同一天");
					$(".calendar-box .tips").delay("fast").fadeIn("fast");
					$(".calendar-box .tips").delay("800").fadeOut("fast");
				}else if($(this).hasClass("no")){
						$(".calendar-box .tips .txt").text("日期选择错误");
						$(".calendar-box .tips").delay("fast").fadeIn("fast");
						$(".calendar-box .tips").delay("800").fadeOut("fast");
				}else{
					$(this).addClass("leave").siblings().removeClass("leave");
				}
			}
		})

	}calPublic()

	
	/*  搜索框 */
	$(".clearText").click(function(){
		$(this).parents().find(".inpTxt").val("");
	});
	
	$(".prompt-btn").click(function(){
		promptBox();
	})
	$(".prompt-box .close").click(function(){
		$(".mask-div").fadeOut("fast");
		$(".prompt-box").fadeOut("fast");
		$("body").css("overflow-y","auto");
	})
	
	$(".loading-wrap .close").click(function(){
	$(this).parents(".loading-wrap").fadeOut("fast");
	})
	
	/* 列表页查看房型 */
	$(".room-btn").bind('click',function(){
		var cont = $(this).parent().find(".room-cont");
		if(cont.css("display") == "block"){
			$(this).html("查看详情<b class='f-icons'>c</b>");
		}else{
			$(this).html("收起<b class='f-icons'>a</b>");
		}
		$(this).toggleClass("down");
		cont.fadeToggle("fast");
	});
});

/* 信息框 */
function promptBox(str){
	$(".prompt-box p").html(str);
	var sTop = $(window).scrollTop();
	$(".prompt-box").css("top",sTop);
	$(".mask-div").css("top",sTop);
	$(".mask-div").fadeIn("fast");
	$(".prompt-box").fadeIn("fast");
	$("body").css("overflow-y","hidden");
	$(".mask-div").click(function(){
		$(".mask-div").fadeOut("fast");
		$(".prompt-box").fadeOut("fast");
		$("body").css("overflow-y","auto");
	})
}
function selCheckbox(ojb){
	$(ojb).click(function(){
		$(this).parent().toggleClass("sel");
	});
}


function countAdd(){
	var totalCount = 0;
	$(".countPrice").each(function(){
		var unitPrice = 0;
		$(this).find(".unitPrice").each(function() {
			var a = $(this).text();
			var b = $(this).parents("li").find(".no").text();
			if(b != ''){
				unitPrice += parseInt(a) * parseInt(b);
			}else{
				if($(this).parents("li").hasClass("sel")){
					unitPrice += parseInt(a);
				}
			}
		});
		$(this).find(".countPrice").text(unitPrice);
		totalCount += parseInt(unitPrice);
    });
	$(".totalCount").text(totalCount)
}countAdd();	

function bindOrder(){
	/* 订单金额 */
	$(".selCheckbox .sel-c").click(function(){
		$(this).parents("li").toggleClass("sel");
		if($(this).parents("li").hasClass("sel")){
			$(this).parents("li").find(".add").removeClass("none");
			$(this).parents("li").find(".no").text(1);	
			$(this).parents("li").find(".minus").removeClass("none");
		}else{
			$(this).parents("li").find(".add").addClass("none");		
			$(this).parents("li").find(".minus").addClass("none");	
			$(this).parents("li").find(".no").text(0);	
		}
		countAdd();
	});
	
	$(".number a").click(function(){
		var i = $(this).parent().find(".no").text();
		var minMun = 0;
		if($(this).parents("ul").hasClass("addPrice")){
			numberA(this,i,minMun)
		}else if($(this).parents("ul").hasClass("productPrice")){
			minMun = 1;
			numberA(this,i,minMun)
		}else {
			alert("other");
			numberA(this,i,minMun)
		}
	})
}


function numberA(ojb,i,minMun){
	if($(ojb).hasClass("none") && $(ojb).hasClass("add")){
		$(ojb).removeClass("none");
		$(ojb).parents("li").addClass("sel");
	}
	if($(ojb).hasClass("add")){
		i = parseInt(i) + 1;
		$(ojb).parent().parent().find(".notext").val(i);
		var max=$(ojb).attr('max');
		if(i>parseInt(max)){
			promptBox('预订数量不能超过'+max);
			return;
		}
		$(ojb).parent().find(".no").text(i);
		if (i > minMun){
			$(ojb).parent().find(".minus").removeClass("none");
		}
	}
	if($(ojb).hasClass("minus")){
		var min=$(ojb).attr('min');
		if(parseInt(i)> parseInt(min)){
			i = parseInt(i) - 1;
			$(ojb).parent().find(".no").text(i);
			$(ojb).parent().parent().find(".notext").val(i);
			if (i < minMun + 1){
				$(ojb).addClass("none");
				if($(ojb).parents("li").hasClass("sel")){
					$(ojb).parents("li").removeClass("sel");
					$(ojb).parent().find(".add").addClass("none");						
				}
			}
		}else {
			promptBox("数量已是最少值!");
			return;
		}
	}
	countAdd();
}



