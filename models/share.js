/*
  * 将数据库时间（UTC）转换成本地时间
  * @param：options 一个对象。
  * options的属性：
  *   dbtime：来自数据库的日期时间
  *   tz: 时区，设置为8代表中国时区
*/
exports.dbTimeToLocaltime = function (options) {
  var localTime = new Date();
  localTime.setTime(options['dbtime'].getTime() + options.tz*3600*1000);
  var ret = localTime.getFullYear() + "年";
  ret += (localTime.getMonth() + 1) + "月";
  ret += localTime.getDate() + "日 ";
  ret += localTime.getHours() + ":";
  ret += localTime.getMinutes();
  return ret;
};

/*
  * 生成一个通用的分页器Html
  * @param：total int 欲显示的总记录数
  * @param：curPage int 当前要显示的页码
  * @param：pageSize int 每页的大小
*/
exports.makePager = function (total, curPage, pageSize) {
	var pagerHtml = '';
	var pages = (total > pageSize) ? Math.ceil(total/pageSize) : 1;
	//要排除不在有效范围的curPage
	var cPage = (curPage <= 0 || curPage > pages) ? 1 : curPage;
	
	if (pages > 1) {
		pagerHtml += '<nav class="pagination form-group"><ul class="pagination">'; 
		if (cPage != 1) {
			pagerHtml += '<li class="prev previous_page ">';
			pagerHtml += '<a rel="prev start" href="?s=' + (cPage - 1) + '">&#8592; 前一页 </a></li>';
		} else {
			pagerHtml += '<li class="prev previous_page disabled"><a href="#">&#8592; 前一页</a></li>';
		}
		for(var i = 1; i <= pages; i++) {
			if (i != cPage) {
				pagerHtml += '<li><a href="?s=' + i + '"> ' + i + ' </a></li>';
			} else {
				pagerHtml += '<li class="active"><a rel="start" href="#">' + i + '</a></li>';
			}
		}
		if (cPage != pages) {
			pagerHtml += '<li class="next next_page ">';
			pagerHtml += '<a rel="next" href="?s=' + (cPage + 1) + '">下一页 &#8594;</a></li>';
		} else {
			pagerHtml += '<li class="next next_page disabled"><a href="#">下一页 &#8594;</a></li>';
		}
		pagerHtml += "</ul></nav>"; 
	}
	return pagerHtml;
};


/**
 * 制作一个分页栏
 * @param  int    total       总条数
 * @param  int    currentPage 当前页码
 * @param  int    pageSize    每页显示的条数(之后可以不传，直接从配置文件获取)
 * @param  int    rollPage    分页栏显示的页数(之后可以不传，直接从配置文件获取)
 * @return string pagesHTML   分页栏的HTML代码字符串
 */

exports.makePager2 = function (total, currentPage, pageSize, rollPage){
  var pagesHTML = '';
  //得总页数
  var pages = (total > pageSize) ? Math.ceil(total/pageSize) : 1;
  //判断是否需要制作页码标签(即页数>1)
  if(pages > 1){
    pagesHTML = '<nav><ul class="pagination">';
    //判断是否不为首页，则添加上一页标签
    if(currentPage > 1){
      //var num = currentPage - 1;
      pagesHTML += '<li><a aria-label="Previous" href="?currentPage='+(currentPage - 1)+'"><span aria-hidden="true">«上一页</span></a></li>';
    }
    
    //总页数小于分页栏页数
    if(pages < rollPage){
      rollPage = pages;
    }
    //加入数字页码链接
    for(var i = 1; i <= rollPage; i++){
      var pageNum;
      //处理首页极端情况
      if((currentPage - rollPage/2) <= 0){
        pageNum = i;
      }
      //处理末页极端情况   
      else if((currentPage + rollPage/2 -1) >= pages){
        pageNum =  pages - rollPage + i;
      }
      else{
        pageNum = currentPage - Math.ceil(rollPage/2) + i;
      }
      //如果页码大于总页数，跳出循环
      if(pageNum > pages){
        break;
      }
      //判断是否为当前页
      if(pageNum == currentPage){
        pagesHTML += '<li class="active"><span>'+ currentPage +'<span class="sr-only">(current)</span></span></li>';
      }else{
        pagesHTML += '<li><a href="?currentPage='+ pageNum +'">'+ pageNum +'</a></li>';
      }
    }
      
    //判断当前页码是否不为末页，则添加下一页标签
    if(currentPage < pages){
      //var num = currentPage + 1;
      pagesHTML += '<li><a aria-label="Next" href="?currentPage='+(currentPage + 1)+'"><span aria-hidden="true">下一页»</span></a></li>';
    }
    if(pages > rollPage){
      pagesHTML += '<li><label class="radio-inline sr-only">页码</label><input type="text" name="num">页';
      pagesHTML += '<button class="btn btn-primary" type="submit">确定</button></li>';
      
    }
    pagesHTML += '</ul></nav>';
  }
  return pagesHTML;
};
