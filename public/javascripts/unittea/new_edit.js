/****** ============教师下拉框============ ******/
$(function() {
  //$(".alert","form#addUnitForm").hide();
  
  $('#institutions').append('<option value="">---- 请选择机构部门 ----</option>');
  //填充机构部门下拉列表
  $.each(institutions, function(n, institution) {
    $('#institutions').append('<option value=' + institution.code + '>' + institution.name+'</option>');    
  });
  //对创建表单做预处理
  if ($(".container").attr("id") == "units_new") {
    $('#departments').append('<option value="">---- 请选择机构附属 ----</option>');
    $('#divsion').append('<option value="">---- 请选择院系附属 ----</option>');  
  }
  
  //对new表单和编辑表单做预选处理
  //codes[0]: 机构码；codes[1]: 部门码；codes[2]: 附属部门码
  var codes = $("#unit-code").val().split("-");
  if (codes[0] != "xx") {
    $('#institutions option[value="'+ codes[0] + '"]').prop("selected", true);
    initDepartment(codes[0]);
    $('#departments option[value="'+ codes[1] + '"]').prop("selected", true);
    initDivsion(codes[0] + '-' + codes[1], codes[2]);
    $('#divsion option[value="'+ codes[2] + '"]').prop("selected", true);
  }
  //捕捉机构部门下拉列表的change事件，并根据其值填充关联的院系下拉列表
  $('#institutions').change(function(){
    $('#departments').empty();
    $('#departments').html('<option value="">---- 请选择院系 ----</option>');
    var code = $(':selected',this).val(),
        temp = $("#unit-code").val().split('-');
    temp[0] = code;
    $("#unit-code").val(temp.join('-'));
    
    $.each(departments, function(n, department) {
      if(department.pcode === code){
        $('#departments').append('<option value=' + department.code + '>' + department.name + '</option>');
      }
    });
    $('option[value=""]',this).remove();
  })
  //捕捉院系下拉列表的change事件，并根据其值填充关联的院级系部下拉列表
  $('#departments').change(function(){
    $('#divsion').empty();
    $('#divsion').html('<option value="">---- 请选择院级系部 ----</option>');
    var institution_code = $("#institutions option:selected").val(),
        department_code = $(':selected',this).val(),
        temp = $("#unit-code").val().split('-');
    temp[1] = department_code;
    $("#unit-code").val(temp.join('-'));
    
    $.each(divsion, function (n, divsion_item) {
      if (divsion_item.pcode === (institution_code + '-' + department_code)) {
        $('#divsion').append('<option value=' + divsion_item.code + '>' + divsion_item.name + '</option>');
      }
    });
    $('option[value=""]',this).remove();
  })
  //捕捉院级系部下拉列表的change事件
  $('#divsion').change(function(){
    var divsion_code = $(':selected',this).val(),
        temp = $("#unit-code").val().split('-');
    temp[2] = divsion_code;
    $("#unit-code").val(temp.join('-'));
    
    $('option[value=""]',this).remove();
  });
  
  //以AJAX异步方式创建教职工单元
  $('#addUnitTeaForm').submit(function(){
    var htcode = $('#unit-code').val(),
        name = $('#departments option:selected').text() + '-' +
               $('#divsion option:selected').text(),
        status = ($("#astatus option:selected").val() == '01')? true : false;
    
    var send_data = {
      'htcode' : htcode,
      'name' : name,
      'status' : status
    };
    
    if (htcode.match("x")) {
      alert("输入不完整！");
      return false;
    }
    
    $.post('/unitteas/', send_data, function (res) {
      $('.alert').addClass(res.dStyle).html(res.msg).show(1000);
    },"json");
    
    return false;
  });
  
  //以表单方式更新教职工单元
  $('#editUnitTeaForm').submit(function() {
    var htcode = $('#unit-code').val(),
        name = $('#departments option:selected').text() + '-' +
               $('#divsion option:selected').text();
               
    if (htcode.match("x")) {
      alert("输入不完整！");
      return false;
    }
    
    $("input#htcode").val(htcode);
    $("input#name").val(name);
    
    return true;
  });
  
});

function initDepartment(code) {
  $('#departments').empty();
  $('#departments').append('<option value="">---- 请选择院系 ----</option>');
  $.each(departments, function(n, department) {
    if (department.pcode == code) {
      $('#departments').append('<option value=' + department.code + '>' + department.name + '</option>');    
    } 
  });
}

function initDivsion(code) {
  $('#divsion').empty();
  $('#divsion').append('<option value="">---- 请选择院级系部 ----</option>');
  $.each(divsion, function(n, divsion_item) {
    if (divsion_item.pcode == code) {
      $('#divsion').append('<option value=' + divsion_item.code + '>' + divsion_item.name + '</option>');    
    } 
  });
}

/****** ============教师下拉框结束============ ******/
