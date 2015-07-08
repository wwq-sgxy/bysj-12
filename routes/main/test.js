var express = require('express');
//var User = require('../models/user');   //加载User模型
var router = express.Router();
var tables = require('../../models/tabled.js');
//var Unitinfo = require('../config/units_metadata.js');
//var unitinfo = new Unitinfo();

var Unit = tables.Unit;
//var count = 0;  // 总条数
var currentPage = 2; // 当前页，默认为1
var pageSize = 2;  //每页显示条数
//var pageCount = 0;  //总页数
Unit.count().then(function(c){
  //console.log(c);
  // count = c;
  //var pages = Math.floor(c/pageSize -1) * pageSize +1;
  var pages = Math.ceil(c/pageSize);
  //console.log(pages);
  //判断是否需要制作页码标签(即页数>1)
  if(pages > 1){
    var pagesHTML = '<nav><ul class="pagination">';
    //判断是否不为首页，则添加上一页标签
    if(currentPage > 1){
      pagesHTML += '<li><a aria-label="Previous" href="?currentPage='+(currentPage-1)+'"><span aria-hidden="true">«上一页</span></a></li>';
    }
    //加入数字页码链接
    for(var i = 1; i <= pageSize; i++){ 
      var pageNum = (pageSize * (currentPage - 1) + i);
      pagesHTML += '<li><a href="?currentPage='+ pageNum +'">'+ pageNum +'</a></li>';
    }
    
    //判断当前页码是否不为末页，则添加下一页标签
    if(currentPage < pages){
      pagesHTML += '<a aria-label="Next" href="?currentPage='+(currentPage+1)+'"><span aria-hidden="true">下一页»</span></a>';
    }
    
    
    pagesHTML += '<li><label class="radio-inline sr-only">页码</label><input type="text" name="num">页';
    pagesHTML += '<button class="btn btn-primary" type="submit">确定</button></li></ul></nav>';
    console.log(pagesHTML);
  }
    
})