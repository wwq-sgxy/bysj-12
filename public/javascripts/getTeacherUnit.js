/****** ============教师下拉框============ ******/
$(function() {
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
  var codes = $("#unit-code").val().split("-");
  if (codes[2] != "xx") {
    var institutionCode = codes[2],
        departmentCode = codes[3],
        divsionCode = codes[4];
    
    $('#institutions option[value="'+ institutionCode + '"]').prop("selected", true);
    initDepartment(institutionCode);
    $('#departments option[value="'+ departmentCode + '"]').prop("selected", true);
    initDivsion(institutionCode + '-' + departmentCode, divsionCode);
    $('#divsion option[value="'+ divsionCode + '"]').prop("selected", true);
  }
  //捕捉机构部门下拉列表的change事件，并根据其值填充关联的院系下拉列表
  $('#institutions').change(function(){
    $('#departments').empty();
    $('#departments').html('<option value="">---- 请选择院系 ----</option>');
    var code = $(':selected',this).val(),
        temp = $("#unit-code").val().split('-');
    temp[2] = code;
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
    temp[3] = department_code;
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
    temp[4] = divsion_code;
    $("#unit-code").val(temp.join('-'));
    
    $('option[value=""]',this).remove();
  });
  //提交创建新教职工单元
  $('#UnitForm').submit(function(){
    var htcode = $('#unit-code').val(),
        name = "韶关学院" + '-' + $('#departments option:selected').text() + '-' +
               $('#divsion option:selected').text();
    
    if (htcode.match("x")) {
      alert("输入不完整！");
      return false;
    }
    $('input#htcode').val(htcode);
    $('input#name').val(name);
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
