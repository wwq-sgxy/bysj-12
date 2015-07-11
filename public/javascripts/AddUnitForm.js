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
      
//异步提交表单
  $('#UnitForm').submit(function(){

    if($('#institutions').val() == ''){
      $('div.tipsClass').remove();
      showTips('请选择机构部门');
      return false;
    }
    if($('#departments').val() == ''){
      $('div.tipsClass').remove();
      showTips('请选择院系');
      return false;
    }
    if($('#divsion').val() == ''){
      $('div.tipsClass').remove();
      showTips('请选择院级系部');
      return false;
    }
    
    var name = '韶关学院-' + $(':selected','#institutions').text() + '-' 
      +$(':selected','#departments').text() + '-' + $(':selected','#divsion').text();
    var send_data = {
      'htcode' : $('p#htcode').text(),
      'name' : name,
      'role' : $('p#role').text(),
      'status' : false
    };
    $.post('/units/', send_data, function (back_data){
      //如果成功的话
      //alert(back_data);
      switch (back_data ) {
        case 'ok':
          //将数据还原为最初状态
          $('p#htcode').text('10576-02');
          $('#institutions').val('');
          $('#departments').html('<option value="">---- 请选择院系 ----</option>');
          $('#divsion').html('<option value="">---- 请选择院级系部 ----</option>');
          $('div.tipsClass').remove();
          showTips('恭喜您，添加新单元成功');
          break;
        case 'exists':
          //添加的行政单元已经存在
          $('div.tipsClass').remove();
          showTips('您添加的行政单元已经存在！！');
          break;
        case 'false' :
          $('div.tipsClass').remove();
          showTips('对不起,由于系统出错，导致添加行政单元失败');
          break;
         default:
          break;
       }
    });
    return false;
  });
});