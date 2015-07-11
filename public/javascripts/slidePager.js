$(function() {
  var maskp,
      cp = parseInt($("#pnum").val()) - 1,    //当前选中的页码
      SlideWinSize = 5,    //滑动窗口的大小，控制分页器显示的页数
      total = parseInt($("#total").text().substr(2));   //总页数
  
  if (total <= SlideWinSize) return;
  //计算当前页的映射位置，并隐藏该位置前后的页码
  maskp = Math.floor(cp/SlideWinSize)*SlideWinSize + 1;
  $("ul.pagination li:lt(" + maskp + ")").hide();
  $("ul.pagination li:first").show();
  maskp += SlideWinSize - 1;
  $("ul.pagination li:gt(" + maskp + ")").hide();
  $("ul.pagination li:last").show();

  $("#pageOK").click(function() {
    var pn = parseInt($("#pnum").val());  //从文本框输入的页码
    if (!isNaN(pn) && pn > 0 && pn <= total) {
      window.location = location.pathname + "?s=" + pn;
    } else {
      alert("超出页范围或输入非数字！");
    }
  });
  
  $("button.delete").click(function() {
    var r = confirm('真的要删除吗？');
    if (r === true) return true;
      return false;
  });
  
});