//img-clip
function imgClip(e,s){
    var w = $(e).width();
    var h = parseInt(w/s);
    $(e).each(function() {
        $(this).css("height",h);
        var ih = $(this).find("img").height();
        if(ih < h && s != 1){
            $(this).find("img").css({"height":"100%"})
        } else if (ih < h && s == 1){
            $(this).find("img").css({"height":"100%","width":"auto"})
        }
    });
};
$(function() {
	
	/* //banner
	banner(640,180);
	function banner(w,h){
		var bw = $(".banner img").width();
		$(".banner").each(function() {
			$(this).css("height",bw*h/w);
		});
	}; */
	
	imgClip(".hot-list .img",2);
    // imgClip(".hot-list.row2 .img", 1);
	imgClip(".product-list .item .img",1.6);
	imgClip(".product-photo .img",2.1);
	imgClip(".textbox .img",2.3);
	imgClip(".visa-link .img",1.4);
	//fold-block 控制点击下拉形式4
	$(".fold-block .fb-top").click(function(){
		var o = $(this);
		o.parent().find(".fb-cont").slideToggle("fast");

		//第一种
		var s = o.find(".arrow").html();
		if (s == "c"){
			o.find(".arrow").html("b");
		}else {
			o.find(".arrow").html("c");
		}
		//第二种
        var c = o.find('.right .iconfont');
        var cls = o.find('.right .iconfont').attr('class');
        if(cls=='iconfont icon-arrow'){
            c.attr('class','iconfont icon-enter');
        } else {
            c.attr('class','iconfont icon-arrow');
        }

		var ntr=o.parent().find(".table-list");
		if (ntr && ntr.text()==''){
			var start_date=$('#start_date').val();
			var start_area_id=$('#start_area_id').val();
			var end_area_id=$('#end_area_id').val();
			var start_place_id=o.attr('start_place_id');
			var times=o.attr('times');
			var info_id=o.attr('info_id');
			ntr.load('/m2c/2/list14.jsp?action=getseat&info_id='+info_id+'&start_date='+start_date+'&times='+times+'&start_place_id='+start_place_id+'&end_id='+end_area_id+'&start_id='+start_area_id, function(){
				o.parent().find(".fb-cont").slideToggle("fast");
 			});
		}
	});
	
	/* 分享 */
	function shareDiv(){
		$(".share-btn").click(function(){
			$(".share-div").fadeIn("fast");
			$(".mask-div").fadeIn("fast");
			$("body").css("overflow-y","hidden");
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
	
});

function listBind(){
	/* 列表页查看房型 */
	$(".room-btn").unbind('click');
	$(".room-btn").click(function(){
		var cont = $(this).parent().find(".room-cont");
		if(cont.css("display") == "block"){
			$(this).html("查看房型<b class='f-icons'>c</b>");
		}else{
			$(this).html("收起<b class='f-icons'>a</b>");
		}
		$(this).toggleClass("down");
		$.ajax({
			type:"post",
			url:"/m2c/2/list5.jsp?action=roomlist&view_id="+$(this).attr('hotel_id')+"&sdate="+$('#sdate').val()+"&edate="+$('#edate').val(),
			beforeSend:function(){
				
			},
			success:function(data){
				cont.html(data);
				cont.fadeToggle("fast");
			},
			complete:function(){
			}
		});
	});
}
function listBindTree(tree_id){
	/* 列表页查看房型 */
	$(".room-btn").unbind('click');
	$(".room-btn").click(function(){
		var cont = $(this).parent().find(".room-cont");
		if(cont.css("display") == "block"){
			$(this).html("查看产品<b class='f-icons'>c</b>");
		}else{
			$(this).html("收起<b class='f-icons'>a</b>");
		}
		$(this).toggleClass("down");
		$.ajax({
			type:"post",
			url:"/m2c/2/list"+tree_id+".jsp?action=prodlist&view_id="+$(this).attr('view_id')+"&tree_id="+tree_id+"&sdate="+$('#sdate').val(),
			beforeSend:function(){
				
			},
			success:function(data){
				cont.html(data);
				cont.fadeToggle("fast");
			},
			complete:function(){
			}
		});
	});
}
function promptBox2(str){
	$(".prompt-box .prompt-con").html('<div class="text-box">'+str+'</div>');
	var sTop = $(window).scrollTop()-30;
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

function promptBox3(str){
	$(".prompt-box .prompt-con").html('<div class="text-box"><p>'+str+'</p></div>');
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

/* 信息框 */
function promptBox1(str){
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
function promptBox(){
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
var planjson = {};//标记价格计划 优惠政策用
function countAdd(){
	//这是判断这个价格格式化函数是否存在的变量,判断这个函数是否存在然后在下面的金额展示时是否使用该函数以免报错
	isExistformatMoney = false;
	try{ 
		if((new Number()).formatMoney&&typeof((new Number()).formatMoney)=="function"){ 
			isExistformatMoney = true; 
		}
	}catch(e){ 
			
	} 
	//--------------------------
	//有计划优惠的 
	//alert("--11---"+$("#planInfojson"));
	if($("#planInfojson").length>0){
		planjson = JSON.parse($("#planInfojson").html());
		builePolicies(planjson);
	}
	var totalCount = 0;
	var place_num=0;
	var selectPlaceBucha='';//选择上车点补差
	
	$(".countPrice").each(function(){
		var unitPrice = 0;
		$(this).find(".unitPrice").each(function() {
			var a = $(this).text().replace(",","");//清除格式化后的价格中的逗号,以便后面计算
			var nobj=$(this).parents("li").find(".no");
			var b='';
			if (nobj.get(0).tagName=='input'){
				b=nobj.val();
			}else{
				b=nobj.text();
			}
			if(b != ''){
				var num = parseInt(b);
				var price = parseFloat(a);
				//优惠政策
				var policies=parseInt($(this).parents("li").find(".no").attr("policies"));
				var $policiesinput = $($(this).parents("li").find("input[name='policies']")[0]);
				if(policies>0){
					num= num-policies;
					givenum = policies;
					//优惠政策 tip
					var policiestip = $(this).parents("li").find(".policiestip")[0];
					if(policiestip){
						$(policiestip).html('').html('优惠'+policies+'间');
					}else{
						$(this).parent().append('&nbsp;<font class="policiestip" color="red">优惠'+policies+'间</font>');
					}
					$policiesinput.val(policies);
				}else if(policies==-1){
					price = 0;
					//优惠政策 tip
					var policiestip = $(this).parents("li").find(".policiestip")[0];
					if(policiestip){
						$(policiestip).html('').html('当晚优惠');
					}else{
						$(this).parent().append('&nbsp;<font class="policiestip" color="red">当晚优惠</font>');
					}
					$policiesinput.val(policies);
				}else if(policies==0){
					//优惠政策 tip
					var policiestip = $(this).parents("li").find(".policiestip")[0];
					if(policiestip){
						$(policiestip).html('');
					}
					$policiesinput.val(policies);
				}
				if($(this).parent("span").text().indexOf("单房差")<0){
					place_num+=num;
				}
				unitPrice +=  price * num;
			}else{
				if($(this).parents("li").hasClass("sel")){
					unitPrice += parseFloat(a);
				}
			}
		});
		unitPrice=Math.round(unitPrice*100)/100;
		$(this).find(".countPrice").text(isExistformatMoney ? unitPrice.formatMoney() : unitPrice);//如果这个价格格式化函数存在,则使用
		totalCount += parseFloat(unitPrice);
    });
	//需要选择上车点的情况
	  if($("#need_start_place").val()==1){
		  var tmpplace=$("#start_place").val();
		  if(tmpplace.split('_')[1]!=''&&tmpplace.split('_')[1]){
	    		selectPlaceBucha=''+tmpplace.split('_')[1]+'';
	    	}
	  }
	  if(selectPlaceBucha){
		  //alert("---"+place_num);
		  totalCount+= parseFloat(selectPlaceBucha) * place_num;
	  }
	  
	$(".totalCount").text(isExistformatMoney ? (Math.round(totalCount*100)/100).formatMoney() : (Math.round(totalCount*100)/100));//如果这个价格格式化函数存在,则使用
}
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
	$(".number a").unbind();
	$(".number a").bind("click", function(){
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
	});
	countAdd();
}

function numberA(ojb,i,minMun){
	if($(ojb).hasClass("none") && $(ojb).hasClass("add")){
		$(ojb).removeClass("none");
		$(ojb).parents("li").addClass("sel");
	}
	if($(ojb).hasClass("add")){
		i = parseInt(i) + 1;
		var max=$(ojb).attr('max');
		if(i>parseInt(max)){
			promptBox3('库存不足，数量不能超过'+max);
			return;
		}
		$(ojb).parent().parent().find(".notext").val(i);
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
			promptBox3("数量已是最少值!");
			return;
		}
	}
	countAdd();
}

function calPublic(){
	var ojb = $(".cal-public .c-day li");
	var flag = 1;
	ojb.click(function(){
		if (this.className=='no'){
			return false;
		}
		if ($('#c').val()=='1'){
			flag=2;
		}
		if( flag == 1){
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).parents("div").hasClass("double")){
				$(".calendar-box .tips .txt").text("请选择离店日期");
				$(".calendar-box .tips").delay("fast").fadeIn("fast");
				$(".calendar-box .tips").delay("1200").fadeOut("fast");
				flag = 2;
				calendarSelected(ojb.index(this),ojb);
				$('#sdate').val($(this).attr('date'));
			}
		}else if(flag == 2){
			if($(this).hasClass("on")){
				$(".calendar-box .tips .txt").text("不能选择同一天");
				$(".calendar-box .tips").delay("fast").fadeIn("fast");
				$(".calendar-box .tips").delay("800").fadeOut("fast");
			}else if($(this).hasClass("no")){
					$(".calendar-box .tips .txt").text("离店日期选择错误");
					$(".calendar-box .tips").delay("fast").fadeIn("fast");
					$(".calendar-box .tips").delay("800").fadeOut("fast");
			}else{
				$(this).addClass("leave").siblings().removeClass("leave");
				$('#edate').val($(this).attr('date'));
				location.href=$('#backurl').val()+"&sdate="+$('#sdate').val()+"&edate="+$('#edate').val();
			}
		}
	});
}
function calCarAll(){
	var ojb = $(".cal-public .c-day li");
	var flag = 1;
	ojb.click(function(){
		if (this.className=='no'){
			return false;
		}
		if ($('#e').val()=='1'){
			flag=2;
		}
		if( flag == 1){
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).parents("div").hasClass("double")){
				$(".calendar-box .tips .txt").text("请选择还车日期");
				$(".calendar-box .tips").delay("fast").fadeIn("fast");
				$(".calendar-box .tips").delay("1200").fadeOut("fast");
				flag = 2;
				calendarSelected(ojb.index(this),ojb);
				$('#sdate').val($(this).attr('date'));
			}
		}else if(flag == 2){
			if($(this).hasClass("no")){
					$(".calendar-box .tips .txt").text("还车日期选择错误");
					$(".calendar-box .tips").delay("fast").fadeIn("fast");
					$(".calendar-box .tips").delay("800").fadeOut("fast");
			}else{
				$(this).addClass("leave").siblings().removeClass("leave");
				$('#edate').val($(this).attr('date'));
				location.href=$('#backurl').val()+"&sdate="+$('#sdate').val()+"&edate="+$('#edate').val();
			}
		}
	});
}
function calProdAll(){
	var ojb = $(".cal-public .c-day li");
	ojb.click(function(){
		if (this.className=='no'){
			return false;
		}
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).parents("div").hasClass("double")){
			$('#sdate').val($(this).attr('date'));
			var url=$('#backurl').val();
			if (url.indexOf('?')==-1){
				url+='?';
			}else{
				url+='&';
			}
			location.href=url+"sdate="+$('#sdate').val()+"&tree_id="+$('#tree_id').val();
		}
	});
}

var flag = 1;
function calendarHotel(){
		var ojb = $(".cal-price .c-day li");
		var dText;
		ojb.click(function(){
			if($(this).find(".price").text() != ""){
				if(flag == 1){
					//原有选择的处理
					var o=$(".calendar .c-day .on").find("span");
					o.text(o.attr('d'));
					$(".calendar .c-day .on").removeClass("on");
					
					o=$(".calendar .c-day .leave").find("span");
					o.text(o.attr('d'));
					$(".calendar .c-day .leave").removeClass("leave");
					$('#sdate').val('');
					$('#edate').val('');
					
					$(".calendar .c-day .no").removeClass("no");
					
					//新数据处理
					$(this).addClass("on").siblings().removeClass("on");
					dText = $(this).find("span").text();
					if($(this).parents("div").hasClass("double")){
						$(this).find("span").text("入住");
						$(".calendar-box .tips .txt").text("请选择离店日期");
						$(".calendar-box .tips").delay("fast").fadeIn("fast");
						$(".calendar-box .tips").delay("800").fadeOut("fast");
						flag = 2;
						calendarSelected(ojb.index(this),ojb);
						$('#sdate').val($(this).attr('date'));
						
						$('#cust_id_price').val($(this).attr('cust_id'));
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
						$('#edate').val($(this).attr('date'));
					}
					flag=1;
				}
			}
		});
}
function calendarCar(){
	var ojb = $(".cal-price .c-day li");
	var flag = 1;
	ojb.click(function(){
		if (this.className=='no'){
			return false;
		}
		if ($('#e').val()=='1'){
			flag=2;
		}
		if( flag == 1){
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).parents("div").hasClass("double")){
				$(".calendar-box .tips .txt").text("请选择还车日期");
				$(".calendar-box .tips").delay("fast").fadeIn("fast");
				$(".calendar-box .tips").delay("1200").fadeOut("fast");
				flag = 2;
				calendarSelected(ojb.index(this),ojb);
				$('#sdate').val($(this).attr('date'));
			}
		}else if(flag == 2){
			if($(this).hasClass("no")){
					$(".calendar-box .tips .txt").text("还车日期选择错误");
					$(".calendar-box .tips").delay("fast").fadeIn("fast");
					$(".calendar-box .tips").delay("800").fadeOut("fast");
			}else{
				$(this).addClass("leave").siblings().removeClass("leave");
				$('#edate').val($(this).attr('date'));
			}
		}
	});
}
function calendarProd(){
	var ojb = $(".cal-price .c-day li");
	var dText;
	ojb.click(function(){
		if($(this).find(".price").text() != ""){
				//原有选择的处理
				var o=$(".calendar .c-day .on").find("span");
				o.text(o.attr('d'));
				$(".calendar .c-day .on").removeClass("on");
				$('#sdate').val('');
				$(".calendar .c-day .no").removeClass("no");
				
				//新数据处理
				$(this).addClass("on").siblings().removeClass("on");
				dText = $(this).find("span").text();
				if($(this).parents("div").hasClass("double")){
					$(this).find("span").text("出发");
					//calendarSelected(ojb.index(this),ojb);
					$('#sdate').val($(this).attr('date'));
				}
		}
	});
}

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

var CheckIdCard={  
       //Wi 加权因子 Xi 余数0~10对应的校验码 Pi省份代码  
       Wi:[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],  
       Xi:[1,0,"X",9,8,7,6,5,4,3,2],  
       Pi:[11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91],  
  
       //检验18位身份证号码出生日期是否有效  
       //parseFloat过滤前导零，年份必需大于等于1900且小于等于当前年份，用Date()对象判断日期是否有效。  
       brithday18:function(sIdCard){  
           var year=parseFloat(sIdCard.substr(6,4));  
           var month=parseFloat(sIdCard.substr(10,2));  
           var day=parseFloat(sIdCard.substr(12,2));  
           var checkDay=new Date(year,month-1,day);  
           var nowDay=new Date();  
           if (1900<=year && year<=nowDay.getFullYear() && month==(checkDay.getMonth()+1) && day==checkDay.getDate()) {  
               return true;  
           };  
       },  
  
       //检验15位身份证号码出生日期是否有效  
       brithday15:function(sIdCard){  
           var year=parseFloat(sIdCard.substr(6,2));  
           var month=parseFloat(sIdCard.substr(8,2));  
           var day=parseFloat(sIdCard.substr(10,2));  
           var checkDay=new Date(year,month-1,day);  
           if (month==(checkDay.getMonth()+1) && day==checkDay.getDate()) {  
               return true;  
           };  
       },  
  
       //检验校验码是否有效  
       validate:function(sIdCard){  
           var aIdCard=sIdCard.split("");  
           var sum=0;  
           for (var i = 0; i < CheckIdCard.Wi.length; i++) {  
               sum+=CheckIdCard.Wi[i]*aIdCard[i]; //线性加权求和  
           };  
           var index=sum%11;//求模，可能为0~10,可求对应的校验码是否于身份证的校验码匹配  
           if (CheckIdCard.Xi[index]==aIdCard[17].toUpperCase()) {  
               return true;  
           };  
       },  
  
       //检验输入的省份编码是否有效  
       province:function(sIdCard){  
           var p2=sIdCard.substr(0,2);  
           for (var i = 0; i < CheckIdCard.Pi.length; i++) {  
               if(CheckIdCard.Pi[i]==p2){  
                   return true;  
               };  
           };  
       }  
};  

function chkidcard(obj){
	var cardno=$('#'+obj).val();
	var sIdCard=cardno.replace(/^\s+|\s+$/g,"");//去除字符串的前后空格，允许用户不小心输入前后空格  
	$('#'+obj).val(sIdCard);
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
    if (!reg.test(sIdCard)) {//判断是否全为18或15位数字，最后一位可以是大小写字母X  
        alert("身份证号码须为18位或15位数字");      //允许用户输入大小写X代替罗马数字的Ⅹ  
        return false;
    }else if (sIdCard.length==18) {  
        if (CheckIdCard.province(sIdCard)&&CheckIdCard.brithday18(sIdCard)&&CheckIdCard.validate(sIdCard)) {  
        }else{  
            alert("请输入有效的身份证号码，不合法的证件号为："+sIdCard);
            return false;
        };  
    }else if (sIdCard.length==15) {  
        if (CheckIdCard.province(sIdCard)&&CheckIdCard.brithday15(sIdCard)) {  
        }else{  
            alert("请输入有效的身份证号码，不合法的证件号为："+sIdCard);
            return false;
        };  
    };  
    return true;
}



// var alertSelf = function(content = '警告'){
// 	$('.alertSelf').removeClass('hidden');
// 	$('.contentSelf').html(content);
// 	$('#alertConfirm').click(function(){
// 		$('.alertSelf').attr('hidden', 'hidden');
// 	})
// }

