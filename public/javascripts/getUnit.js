/****** ============学生下拉框============ ******/
$(function() {
  $('#college').append('<option value="">---- 请选择 ----</option>');
  $.each(colleges, function(n, college) {
    $('#college').append('<option value=' + college.code + '>' + college.name+'</option>');    
  });
  
  $('#grade').append('<option value="">--请选择--</option>');
  $.each(grades, function(n, grade) {
    $('#grade').append('<option value=' + grade.code + '>' + grade.name + '</option>');    
  });
  
  //$('#grade').width(40);
  //$('#stuclass').width(20);
  $('#major').append('<option value="">--- 请选择 ---</option>');
  $('#stuclass').append('<option value="">-请选择-</option>');
  $.each(stuclass, function(n, group) {
    $('#stuclass').append('<option value=' + group.code + '>' + group.name + '</option>');    
  });
  
  $('#college').change(function(){
    $('#major').empty();
    $('#major').append('<option value="">--- 请选择 ---</option>');
    var code = $(':selected',this).val();
    $('span.college').html('-'+ code);
    $.each(majors, function(n, major) {
      if (major.pcode == code) {
        $('#major').append('<option value=' + major.code + '>' + major.name + '</option>');    
      } 
    });
    $('option[value=""]',this).remove();
  });
  
  $('#grade').change(function() {
    var code = $(':selected', this).val();
    $('span.grade').html('-'+ code);
    $('option[value=""]',this).remove();
  });
  
  $('#major').change(function() {
    var code = $(':selected',this).val();
    $('span.major').html('-'+ code);
    $('option[value=""]',this).remove();
  });
  
  $('#stuclass').change(function() {
    var code = $(':selected', this).val();
    $('span.stuclass').html('-'+ code);
    $('option[value=""]',this).remove();
  });
  
});

/****** ============学生下拉框结束============ ******/


/****** ============教师下拉框============ ******/
$(function() {
  $('#institutions').append('<option value="">---- 请选择 ----</option>');
  $.each(institutions, function(n, institution) {
    $('#institutions').append('<option value=' + institution.code + '>' + institution.name+'</option>');    
  });
  
  $('#departments').append('<option value="">--请选择--</option>');
  /*$.each(departments, function(n, department) {
    $('#departments').append('<option value=' + department.code + '>' + department.name + '</option>');    
  });*/
  
  $('#divsion').append('<option value="">-请选择-</option>');
 /* $.each(divsion, function(n, divsion_item) {
    $('#divsion').append('<option value=' + divsion_item.code + '>' + divsion_item.name + '</option>');    
  });*/
  
  
  $('#institutions').change(function(){
    /*$('#departments').empty();
    $('#divsion').empty();
    $('#departments').append('<option value="">--- 请选择 ---</option>');
    $('#divsion').append('<option value="">--- 请选择 ---</option>');*/
    $('#departments').html('<option value="">--- 请选择 ---</option>');
    $('#divsion').html('<option value="">--- 请选择 ---</option>');
    $('span.department').empty();
    $('span.divsion').empty();
    var code = $(':selected',this).val();
    $('span.institution').html('-'+ code);
    $.each(departments, function(n, department) {
      if(department.pcode === code){
        $('#departments').append('<option value=' + department.code + '>' + department.name + '</option>');
      }
    })
  })
  
  $('#departments').change(function(){
    $('#divsion').html('<option value="">--- 请选择 ---</option>');
    $('span.divsion').empty();
    var department_code = $(':selected',this).val();
    $('span.department').html('-'+ department_code);
    //alert(($('span.institution').text() + '-' + department_code).substr(1));
    $.each(divsion, function (n, divsion_item) {
      if(divsion_item.pcode === ($('span.institution').text() + '-' + department_code).substr(1)){
        $('#divsion').append('<option value=' + divsion_item.code + '>' + divsion_item.name + '</option>');
      }
    })
  })
  
  $('#divsion').change(function(){
    var divsion_code = $(':selected',this).val();
    $('span.divsion').html('-'+ divsion_code);
  })
  
});

/****** ============教师下拉框结束============ ******/
