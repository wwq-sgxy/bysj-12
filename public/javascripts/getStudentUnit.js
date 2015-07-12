/****** ============学生下拉框============ ******/
$(function() {
  $('#college').append('<option value="">--- 请选择所属二级学院 ---</option>');
  //填充学院下拉列表
  $.each(colleges, function(n, college) {
    $('#college').append('<option value=' + college.code + '>' + college.name+'</option>');    
  });
  //填充年级下拉列表
  $('#grade').append('<option value="">--- 请选择所属年级 ---</option>');
  $.each(grades, function(n, grade) {
    $('#grade').append('<option value=' + grade.code + '>' + grade.name + '</option>');    
  });
  
  $('#major').append('<option value="">--- 请选择所属专业 ---</option>');
  //填充班级下拉列表
  $('#stuclass').append('<option value="">--- 请选择所属班级 ---</option>');
  $.each(stuclass, function(n, group) {
    $('#stuclass').append('<option value=' + group.code + '>' + group.name + '</option>');    
  });

  //对编辑表单做预选处理
  if ($(".container").attr("id") == "units_edit") {
    var codes = $("#unit-code").val().split("-"),
        collegeCode = codes[3],
        gradeCode = codes[4],
        majorCode = codes[5],
        groupCode = codes[6];
    $('#college option[value="'+ collegeCode + '"]').prop("selected", true);
    initMajor(collegeCode);
    $('#grade option[value="'+ gradeCode + '"]').prop("selected", true);
    $('#major option[value="'+ majorCode + '"]').prop("selected", true);
    $('#stuclass option[value="'+ groupCode + '"]').prop("selected", true);
    //alert(majorCode);
  }
  //捕捉学院下拉列表的change事件，并根据其值填充关联的专业下拉列表
  $('#college').change(function(){
    var code = $(':selected',this).val(),
        temp = $("#unit-code").val().split('-');
    $('#major').empty();
    $('#major').append('<option value="">--- 请选择所属专业 ---</option>');
    temp[3] = code;
    $("#unit-code").val(temp.join('-'));

    $.each(majors, function(n, major) {
      if (major.pcode == code) {
        $('#major').append('<option value=' + major.code + '>' + major.name + '</option>');    
      } 
    });
    $('option[value=""]',this).remove();
  });
  //捕捉年级下拉列表的change事件
  $('#grade').change(function() {
    var code = $(':selected', this).val(),
        temp = $("#unit-code").val().split('-');
    temp[4] = code;
    $("#unit-code").val(temp.join('-'));
    $('option[value=""]',this).remove();
  });
  //捕捉专业下拉列表的change事件
  $('#major').change(function() {
    var code = $(':selected',this).val(),
        temp = $("#unit-code").val().split('-');
    temp[5] = code;
    $("#unit-code").val(temp.join('-'));
    $('option[value=""]',this).remove();
  });
  //捕捉班级下拉列表的change事件
  $('#stuclass').change(function() {
    var code = $(':selected', this).val(),
        temp = $("#unit-code").val().split('-');
    temp[6] = code;
    $("#unit-code").val(temp.join('-'));
    $('option[value=""]',this).remove();
  });

  $('#UnitForm').submit(function(){
    var htcode = $('#unit-code').val(),
        name = $('#college option:selected').text() + '-' +
               $('#grade option:selected').text() + '-' +
               $('#major option:selected').text() + '-' +
               $('#stuclass option:selected').text();
    if (htcode.match("x")) {
      alert("输入不完整！");
      return false;
    }
    $('input#htcode').val(htcode);
    $('input#name').val(name);
    return true;
  });

});

function initMajor(code) {
  $('#major').empty();
  $('#major').append('<option value="">--- 请选择专业 ---</option>');
  $.each(majors, function(n, major) {
    if (major.pcode == code) {
      $('#major').append('<option value=' + major.code + '>' + major.name + '</option>');    
    } 
  });
}

/****** ============学生下拉框结束============ ******/