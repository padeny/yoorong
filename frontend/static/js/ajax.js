  var cache=new Array(); // 缓存变量，当数据被访问过之后放置在缓存中，加快访问速度
  var str='';
  var str1='';
  var str2='';
  var str3='';
  var z=0;
  var next;
  var prev;
  var lastpage;
  var category;



  // 首页产品系列
  function indexCategory(obj){
      $.ajax({
          url: "/api/v1/category/",
          type: "GET",
          // dataType: "jsonp",
          success: function(data) {
              var str='';
              for (var i = 0; i < data.objects[0].category_list.length; i++) {
                 str+='<li><a href="/list?category='+data.objects[0].category_list[i]+'">'+data.objects[0].category_list[i]+'</a></li>'
              }
              obj.append(str)
              // location.hash='#list_main';
          }
       })
  }
  function detailsCategory(obj,obj1){
      $.ajax({
          url: "/api/v1/category/",
          type: "GET",
          async: false,
          // dataType: "jsonp",
          success: function(data) {
              var str='';
              for (var i = 0; i < data.objects[0].category_list.length; i++) {
                 str+='<li><a href="/list?category='+data.objects[0].category_list[i]+'">'+data.objects[0].category_list[i]+'</a></li>'
              }
              obj.append(str);
              details(obj1)
          }
       })

  }


  // 产品详情
    function details(obj){
      var param=window.location.search;
      var id=param.substring(param.search(/id=/)+3);
      var arr=new Array();
      var str='';
      var str1='';
      var str2='';
      if (id=="undefined") {
        console.log(2)
        obj.html('暂无此产品');
        location.hash='#list_main';
      } else {
        $.ajax({  
                type: "get",    
                url: "/api/v1/product/"+id,
                async: false, 
        //         dataType: "jsonp",  
                success: function(data) { 
                    arr=data.detail.split('\r\n');
                    arr1=data.introduction.split('\r\n');
                    for (var i = 0; i < arr.length; i++) {
                        str+='<li>'+arr[i]+'</li>';
                    }
                    for (var i = 0; i < arr1.length; i++) {
                        str2+='<li>'+arr1[i]+'</li>';
                    }
                    if (data.image==null) {
                        str1='<div class="detail-top"><div class="left"><div class="img">暂无图片</div></div><div class="right word"><p>产品名称：'+data.name+'</p><p>产品系列：'+data.category+'</p></div><div class="clear"></div></div><div class="detail-bottom"><h3>产品简介：</h3><p>'+data.introduction+'</p></div><div class="detail-bottom"><h3>产品详情</h3><ol>'+str+'</ol></div>';
                    } else {
                        str1='<div class="detail-top"><div class="left"><img src="'+data.image+'"/></div><div class="right word"><p>产品名称：'+data.name+'</p><p>产品系列：'+data.category+'</p></div><div class="clear"></div></div><div class="detail-bottom"><h3>产品简介：</h3><ul>'+str2+'</ul></div><div class="detail-bottom"><h3>产品详情</h3><ol>'+str+'</ol></div>';
                    }
                    // str1='<div class="detail-top"><div><img src="http://106.15.194.162'+data.image+'"/></div><div class="word"><p>产品名称：'+data.name+'<p><p>产品系列：'+data.category+'</p></div></div><div class="detail-bottom"><h3>产品简介：</h3><p>'+data.introduction+'</p></div><div class="detail-bottom"><h3>产品详情</h3><ol>'+str+'</ol></div>';

                    obj.html(str1);
                    // location.hash='#list_main';
                }  
        })
      }
    }

  // 产品中心系列
  function category(obj){
      $.ajax({
          url: "/api/v1/category/",
          type: "GET",
          // dataType: "jsonp",
          // jsonpCallback: "receive",
          success: function(data) {
              var param=window.location.search;
              var id;
              if (param.search(/category=/)==-1) {
                categoryShow(data.objects[0].category_list[0]);    //产品中心默认
              } else {
                id=decodeURI(param.split('?')[1].split('=')[1]);    //decodeURI转码中文！！！！！！！！！！
                // id=param.substring(param.search(/category=/)+9);
                categoryShow(id);      //首页跳转
              }
              for (var i = 0; i < data.objects[0].category_list.length; i++) {
                 str3+='<li><a onclick=categoryShow("'+data.objects[0].category_list[i]+'")>'+data.objects[0].category_list[i]+'</a></li> '
              }
              obj.html(str3);
              obj.find('a').first().css({'background':'#f55959 url(../static/images/list_ico2.png) 16px 13px no-repeat','border-radius':'20px','color':'#fff'});
              obj.find('a').click(function(){
                obj.find('a').css({'background':'#fff url(../static/images/list_ico.png) 16px 13px no-repeat','color':'#404040'});
                $(this).css({'background':'#f55959 url(../static/images/list_ico2.png) 16px 13px no-repeat','border-radius':'20px','color':'#fff'});
              })
            }
       })
  }
  function categoryShow(cate){
     setPage(cate);           //分页
     changePage(cate,0)       //分页内容
  }

  function changePage(c,num) {
     if (num==null) {
        return;
     } else {
       $.ajax({
          // url: "http://106.15.194.162/api/v1/product/?offset="+num+"&limit=9&category="+c,
          // type: "GET",
          url: "/api/v1/product",
          type: "GET",
          data: {"offset":num,"limit":9,"category":c},
          cache: false,
          // dataType: "jsonp",
          // jsonpCallback: "receive",
          success: function(data) {
              page=Math.ceil(data.meta.total_count/data.meta.limit);
              if (page>=1) {
                 lastpage=(page-1)*data.meta.limit; 
              } else {
                 lastpage=null
              }
              pagenum=data.meta.offset;
              if (pagenum-9>=0) {
                 prev=pagenum-9;
              } else {
                 prev=null;
              }
              if (pagenum+9<=data.meta.total_count) {
                 next=pagenum+9;
              } else {
                 next=null;
              }
              category=data.objects[0].category;
             for (var i = 0; i < data.objects.length; i++) {
                if (data.objects[i].image==null) {
                  str2+='<li><a href="/productdetails?id='+data.objects[i].id+'#list_main"><div class="img">暂无图片</div><p>'+data.objects[i].name+'</p></a></li>'

                }else{
                  str2+='<li><a href="/productdetails?id='+data.objects[i].id+'#list_main"><img src="'+data.objects[i].image+'" alt="暂无图片" /><p>'+data.objects[i].name+'</p></a></li>'
                }
             }
             $('#mainShow').html(str2);
             str2='';
          }
       })
     }
  }


  function setPage(a){
     $.ajax({  
             type: "get",    
     //         url: "http://106.15.194.162/api/v1/product/?offset=0&limit=9&category="+a,
             url: "/api/v1/product",
             data: {"offset":0,"limit":9,"category":a},
     //         dataType: "jsonp",  
     //         jsonpCallback: "receive", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据    
             success: function(data) { 
                var str='';
                var str1='';
                 if (data.meta.total_count==0) {
                    return
                 } else {
                    page=Math.ceil(data.meta.total_count/data.meta.limit);           
                    for (var i = 1; i<=page; i++) {
                       str1+='<option value="'+i+'"">'+i+'</option>';
                    }
                    str='<span id="sy"><a onclick=changePage(category,0)>首页</a></span><span><a onclick=changePage(category,prev)>上一页</a></span><span><a onclick=changePage(category,next)>下一页</a></span><span><a onclick=changePage(category,lastpage)>尾页</a></span><span>共'+page+'页</span><span>每页显示'+data.meta.limit+'条</span><span>转到第<select name="page" onchange=changePage(category,(this.value-1)*'+data.meta.limit+')>'+str1+'</select>页</span>';
                    $('#pagination').html(str);
                    str1='';
                 }
             }                
     })
  }










// 产品搜索
function search(obj1, obj2,obj3,obj4){
    $.ajax({
        url: "/api/v1/product_name/",
        type: "get",
        // dataType: "jsonp",
        success: function(data){
          var str='';
          var arr=[];
          var arr1=[];
          var id;
          var lasttime;
          obj1.bind('input propertychange',function(event){      //按键
            if (obj1.val()==''||obj1.val()==null||obj1.val()==undefined||obj1.val()==" ") {
              obj2.hide(1000);
            } else {
              for (var i = 0; i < data.objects[0].name_list.length; i++) {
               if (data.objects[0].name_list[i].product_name.search(obj1.val())!=-1&&obj1.val()!=" ") {
                  str+='<li>'+data.objects[0].name_list[i].product_name+'</li>';
                  arr.push(data.objects[0].name_list[i].id);
               }
              }
              obj2.html(str);
              if (obj2.children().length==0) {
                obj2.hide(1000);
              }else{
                obj2.show(1000)
              }
              str='';
              arr1=arr;
              arr=[];
              obj2.children().click(function(){
                obj1.val(this.innerHTML);
                id=arr1[$(this).index()];        //取对应ID
                location.href="/productdetails?id="+id;
              });
            }
          })
          obj3.hover(function(){
            if (obj2.children().length>0) {
              obj2.show(1000)
            }
          },function(){
            obj2.hide(1000)
          })
          obj4.click(function(){
            location.href="/productdetails?id="+id;
          })
        }
    })
}





//招聘
function recruitment(obj){
  var arr=new Array();
  var arr1=new Array();
  $.ajax({
     type: "get",    
     url: "/api/v1/position/", 
  //    dataType: "jsonp",  
     success: function(data) {
      if (data.objects.length==0) {
        obj.html('暂无招聘信息')
      } else {
        var str='';
        var str1='<strong>职位描述：</strong><ol>';
        var str2='<strong>任职要求：</strong><ol>';
        var str3='<strong>公司福利；</strong><ol>';
        var arr=[];
        var arr1=[];
        var arr2=[];
        for (var i = 0; i < data.objects.length; i++) {
          str+='<div><strong>招聘：</strong><p>'+data.objects[i].name+'</p>';
          arr=data.objects[i].duty.split('\r\n');
          arr1=data.objects[i].requirements.split('\r\n');
          arr2=data.objects[i].welfare.split('\r\n');
          for (var j = 0; j < arr.length; j++) {
            str1+='<li>'+arr[j]+'</li>';
          }
          str1+='</ol>';
          for (var j = 0; j < arr1.length; j++) {
            str2+='<li>'+arr1[j]+'</li>';
          }
          str2+='</ol>';
          for (var j = 0; j < arr2.length; j++) {
            str3+='<li>'+arr2[j]+'</li>';
          }
          str3+='</ol>';
          str+=str1+str2+str3;
          str+='</div>';
          str1='<strong>职位描述：</strong><ol>';
          str2='<strong>任职要求：</strong><ol>';
          str3='<strong>公司福利；</strong><ol>';
        }
        obj.html(str);
      }

     }
  })
}

















