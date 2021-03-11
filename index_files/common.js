function LoginSign(url){
	$.layer({
		type : 2,
		title: '用户登陆',
		shadeClose: false,
		maxmin: false,
		fix : true,
		fadeIn: 500,
		area: ['414px', '350px'], 
		iframe: {
			src : url
		}
	});
	$('.xubox_title,.xubox_border').hide();
	$('#xubox_layer1,.xubox_main').css({'overflow':'hidden','border-radius':'5px'});
	$('.xulayer_png32').css({'background':'url(/static/img/off.png)','background-size':'contain','right':'10px','top':'4px'});
}
$(document).ready(function(){
	/* 设为首页*/
	$('#set_startpage').click(function(){
		var url = window.location;
		try{ 
			this.style.behavior='url(#default#homepage)';
			this.setHomePage(url); 
		}catch(e){ 
			if(window.netscape) { 
				try { 
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
				}catch (e) { 
					$.layer({
						title: '信息',
						btn: ['确定'],
						shadeClose: false,
						maxmin: false,
						fix : true,
						fadeIn: 500,
						//area: ['400px', '240px'],
	          dialog: {
	              type: 8,
	              msg: "此操作被浏览器拒绝！<br />请在浏览器地址栏输入“about:config”并回车<br />然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。"+url
	          }
					});
					//layer.alert("此操作被浏览器拒绝！<br />请在浏览器地址栏输入“about:config”并回车<br />然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。", 8);
				}
				var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
				prefs.setCharPref('browser.startup.homepage',url); 
			}else{
				$.layer({
					title: '信息',
					btn: ['确定'],
					shadeClose: false,
					maxmin: false,
					fix : true,
					fadeIn: 500,
					//area: ['400px', '240px'],
          dialog: {
              type: 8,
              msg: "您的浏览器不支持，请按照下面步骤操作：<br /> 1.打开浏览器设置。<br />2.点击设置网页。<br />3.输入："+url
          }
				});
			}
		}
	});

	/* 收藏本站 */
	$('#set_favorite').click(function(){
		if(document.all){
			window.external.addFavorite(window.location, $(document).attr("title"));
		}else if(window.sidebar){
			window.sidebar.addPanel($(document).attr("title"),window.location, "");
		}else{
			layer.alert("很抱歉，您的浏览器不支持此操作。<br />请使用按键Ctrl+D收藏本站。", 8);
		}
	});

	/* 简繁转换 */
	$('#set_translation').click(function(){
		$.post("/ajax/common.php", 
			{action : "locale"},
			function(data){
				if(data=='1'){
					location.reload();        
				}
			}
		);
	});

	/* 用户登陆 */
	$('#set_login,#set_login_fx,.set_login_dl,#set_trigger_login').click(function(){
		LoginSign("/account/logined.php");
		return false;
	});

	/* 用户注册 */
	$('#set_register,#set_register2').click(function(){
		$.layer({
				type : 2,
				title: '用户注册',
				shadeClose: false,
				maxmin: false,
				fix : true,
				fadeIn: 500,
				area: ['600px', '580px'], 
				iframe: {
					src : '/account/signupes.php'
				} 
			});
			return false;
	});

	/* 添加新地址 */
	$('a.LogLink').click(function(){
		$.layer({
				type : 2,
				title: '添加新地址',
				shadeClose: false,
				maxmin: false,
				fix : true,
				fadeIn: 500,
				area: ['600px', '350px'], 
				iframe: {
					src : '/account/ajax.php?action=shopinsertes'
				} 
			});
			return false;
	});
	/* 搜索 */

	//文本框原始颜色
	$('#set_search .u-search-key').css({'color':'#999'});
	//给文本框添加失去焦点事件，检索用户是否输入了数据
	$('#set_search .u-search-key').blur(function(){
		var wordText = $(this).val();
		if('' == wordText){
			wordText = '请输入搜索内容';
			$(this).val(wordText);
			$(this).css({'color':'#999'});
		}
	});
	//给文本框添加获取焦点事件
	$('#set_search .u-search-key').focus(function(){
		var wordText = $(this).val();
		if('请输入搜索内容' == wordText){
			wordText = '';
			$(this).val(wordText);
		}
		$(this).css({'color':'#333'});
	});
	
	//过滤文本的特殊字符
	function stripscript(s){ 
		var pattern = new RegExp("[`.~!@#$^/]"); 
		var rs = ""; 
		for (var i = 0; i < s.length; i++) { 
			rs = rs+s.substr(i, 1).replace(pattern, ''); 
		} 
		return rs; 
	};

	//给按钮“查询”添加事件，表示文本框的内容被提交
	$('#set_search .u-search-btn').click(function(){
		var search_text = stripscript($("#set_search .u-search-key").val());
		window.location.href = '/search.php?s='+encodeURI(search_text);
	});
});