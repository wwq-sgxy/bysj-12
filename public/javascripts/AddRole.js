function showTips(tips,time,height){
	var windowWidth = $(window).width();height=height?height:$(window).height();
	time = time ? time : 1;
	var tipsDiv = '<div class="tipsClass">' + tips + '</div>';
	$( 'body' ).append( tipsDiv );
	$( 'div.tipsClass' ).css({
		'top' : height/2 + 'px',
		'left' : ( windowWidth / 2 ) - 100 + 'px',
		'position' : 'absolute',
		'padding' : '3px 5px',
		'background': '#670768',
		'font-size' : '14px',
		'text-align': 'center',
		'width' : '300px',
		'height' : '40px',
		'line-height' : '40px',
		'color' : '#fff',
		'font-weight' : 'bold',
		'opacity' : '0.8',
	}).show();
	setTimeout( function(){
		$( 'div.tipsClass' ).animate({
			top: height/2-50+'px'
		}, "slow").fadeOut();
	}, time * 1000);
}



$(function(){
  
  $(".alert","form#addRoleForm").hide();
  //以AJAX异步方式创建新角色
  $('#addRoleForm').submit(function(){
   
    $(".alert","form#addRoleForm").hide();
    if(!$('#rolename').val()){
      $('div.tipsClass').remove();
      showTips('请填写角色名称');
      return false;
    }
     
    if(!$('#roletype').val()){
      $('div.tipsClass').remove();
      showTips('请选择角色类型');
      return false;
    }
    $.post('/roles/', $('#addRoleForm').serialize(), function (res) {
     $('.alert').addClass(res.dStyle).html(res.msg).show(1000);
    },"json");
    return false;
  });
});