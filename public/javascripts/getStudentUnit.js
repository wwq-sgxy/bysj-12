//学院（四级）
/*
var colleges = [
  { code: '01', name: '英东生命科学学院' },
  { code: '02', name: '英东农业科学与工程学院' },
  { code: '03', name: '英东食品科学与工程学院' },
  { code: '04', name: '物理与机电工程学院' },
  { code: '05', name: '信息科学与工程学院' },
];
//年级（五级）
var grades = [
  { code: '2012', name: '2012级'},
  { code: '2013', name: '2013级'},
  { code: '2014', name: '2014级'},
  { code: '2015', name: '2015级'}
];
//专业（六级）
var majors = [
  { pcode: '05', code: '01', name: '计算机科学技术'},
  { pcode: '05', code: '02', name: '通信工程'},
  { pcode: '05', code: '03', name: '信息管理'}
];
//班级（七级）
var stuclass = [
  { code: '01', name: '1班'},
  { code: '02', name: '2班'},
  { code: '03', name: '3班'},
  { code: '04', name: '4班'},
  { code: '05', name: 'A班'},
  { code: '06', name: 'B班'},
];
*/
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

