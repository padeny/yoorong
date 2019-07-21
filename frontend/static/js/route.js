function Router(){
    this.paths={};
    this.curPath='';
}
Router.prototype={
    path:function(str,callback){
        var func=callback||function(){};
        this.paths[str]=func;
    },
    refresh:function(){
        this.curPath=location.hash.slice(1)||'/home';
        this.paths[this.curPath]();
    },
    init:function(){
        window.addEventListener('load',this.refresh.bind(this),false)
        window.addEventListener('hashchange',this.refresh.bind(this),false)
    }
}
var r=new Router();
r.path('/article.html',function(){
    window.location.href='index.html/article.html';
})
r.path('/contact',function(){
    document.innerText='contact.html';

})
r.path('/form',function(){
    document.innerText='form.html';
})
r.path('/list',function(){
    document.innerText='list.html';
})
r.path('/form',function(){
    document.innerText='recruitment.html';
})
r.init()



function a(fn,context) {
    var args = Array.prototype.slice.call(arguments,2)
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs)
        fn.apply(context,finalArgs)
    }
}
function main() {
    console.log(this.b)
}
Function.prototype.bind = function(context) {
    var that = this;
    var args = Array.prototype.slice.call(arguments,1)
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs)
        that.apply(context,finalArgs)
    }
}