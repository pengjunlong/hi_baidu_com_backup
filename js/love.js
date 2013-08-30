var $window=$(window),gardenCtx,gardenCanvas,$garden,garden;var clientWidth=$(window).width();var clientHeight=$(window).height();$(function(){$loveHeart=$("#loveHeart");var a=$loveHeart.width()/2;var b=$loveHeart.height()/2-55;$garden=$("#garden");gardenCanvas=$garden[0];gardenCanvas.width=$("#loveHeart").width();gardenCanvas.height=$("#loveHeart").height();gardenCtx=gardenCanvas.getContext("2d");gardenCtx.globalCompositeOperation="lighter";garden=new Garden(gardenCtx,gardenCanvas);$("#content").css("width",$loveHeart.width()+$("#code").width());$("#content").css("height",Math.max($loveHeart.height(),$("#code").height()));$("#content").css("margin-top",Math.max(($window.height()-$("#content").height())/2,10));$("#content").css("margin-left",Math.max(($window.width()-$("#content").width())/2,10));setInterval(function(){garden.render()},Garden.options.growSpeed)});$(window).resize(function(){var b=$(window).width();var a=$(window).height();if(b!=clientWidth&&a!=clientHeight){location.replace(location)}});function getHeartPoint(c){var b=c/Math.PI;var a=19.5*(16*Math.pow(Math.sin(b),3));var d=-20*(13*Math.cos(b)-5*Math.cos(2*b)-2*Math.cos(3*b)-Math.cos(4*b));return new Array(offsetX+a,offsetY+d)}function startHeartAnimation(){var c=50;var d=10;var b=new Array();var a=setInterval(function(){var h=getHeartPoint(d);var e=true;for(var f=0;f<b.length;f++){var g=b[f];var j=Math.sqrt(Math.pow(g[0]-h[0],2)+Math.pow(g[1]-h[1],2));if(j<Garden.options.bloomRadius.max*1.3){e=false;break}}if(e){b.push(h);garden.createRandomBloom(h[0],h[1])}if(d>=30){clearInterval(a);showMessages()}else{d+=0.2}},c)}(function(a){a.fn.typewriter=function(){this.each(function(){var d=a(this),c=d.html(),b=0;d.html("");var e=setInterval(function(){var f=c.substr(b,1);if(f=="<"){b=c.indexOf(">",b)+1}else{b++}d.html(c.substring(0,b)+(b&1?"_":""));if(b>=c.length){clearInterval(e)}},75)});return this}})(jQuery);function timeElapse(c){var e=Date();var f=(Date.parse(e)-Date.parse(c))/1000;var g=Math.floor(f/(3600*24));f=f%(3600*24);var b=Math.floor(f/3600);if(b<10){b="0"+b}f=f%3600;var d=Math.floor(f/60);if(d<10){d="0"+d}f=f%60;if(f<10){f="0"+f}var a='<span class="digit">'+g+'</span> days <span class="digit">'+b+'</span> hours <span class="digit">'+d+'</span> minutes <span class="digit">'+f+"</span> seconds";$("#elapseClock").html(a)}function showMessages(){adjustWordsPosition();$("#messages").fadeIn(5000,function(){showLoveU()})}function adjustWordsPosition(){$("#words").css("position","absolute");$("#words").css("top",$("#garden").position().top+195);$("#words").css("left",$("#garden").position().left+70)}function adjustCodePosition(){$("#code").css("margin-top",($("#garden").height()-$("#code").height())/2)}function showLoveU(){$("#loveu").fadeIn(3000)};

function Vector(a,b){this.x=a;this.y=b}Vector.prototype={rotate:function(b){var a=this.x;var c=this.y;this.x=Math.cos(b)*a-Math.sin(b)*c;this.y=Math.sin(b)*a+Math.cos(b)*c;return this},mult:function(a){this.x*=a;this.y*=a;return this},clone:function(){return new Vector(this.x,this.y)},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},subtract:function(a){this.x-=a.x;this.y-=a.y;return this},set:function(a,b){this.x=a;this.y=b;return this}};function Petal(a,f,b,e,c,d){this.stretchA=a;this.stretchB=f;this.startAngle=b;this.angle=e;this.bloom=d;this.growFactor=c;this.r=1;this.isfinished=false}Petal.prototype={draw:function(){var a=this.bloom.garden.ctx;var e,d,c,b;e=new Vector(0,this.r).rotate(Garden.degrad(this.startAngle));d=e.clone().rotate(Garden.degrad(this.angle));c=e.clone().mult(this.stretchA);b=d.clone().mult(this.stretchB);a.strokeStyle=this.bloom.c;a.beginPath();a.moveTo(e.x,e.y);a.bezierCurveTo(c.x,c.y,b.x,b.y,d.x,d.y);a.stroke()},render:function(){if(this.r<=this.bloom.r){this.r+=this.growFactor;this.draw()}else{this.isfinished=true}}};function Bloom(e,d,f,a,b){this.p=e;this.r=d;this.c=f;this.pc=a;this.petals=[];this.garden=b;this.init();this.garden.addBloom(this)}Bloom.prototype={draw:function(){var c,b=true;this.garden.ctx.save();this.garden.ctx.translate(this.p.x,this.p.y);for(var a=0;a<this.petals.length;a++){c=this.petals[a];c.render();b*=c.isfinished}this.garden.ctx.restore();if(b==true){this.garden.removeBloom(this)}},init:function(){var c=360/this.pc;var b=Garden.randomInt(0,90);for(var a=0;a<this.pc;a++){this.petals.push(new Petal(Garden.random(Garden.options.petalStretch.min,Garden.options.petalStretch.max),Garden.random(Garden.options.petalStretch.min,Garden.options.petalStretch.max),b+a*c,c,Garden.random(Garden.options.growFactor.min,Garden.options.growFactor.max),this))}}};function Garden(a,b){this.blooms=[];this.element=b;this.ctx=a}Garden.prototype={render:function(){for(var a=0;a<this.blooms.length;a++){this.blooms[a].draw()}},addBloom:function(a){this.blooms.push(a)},removeBloom:function(a){var d;for(var c=0;c<this.blooms.length;c++){d=this.blooms[c];if(d===a){this.blooms.splice(c,1);return this}}},createRandomBloom:function(a,b){this.createBloom(a,b,Garden.randomInt(Garden.options.bloomRadius.min,Garden.options.bloomRadius.max),Garden.randomrgba(Garden.options.color.rmin,Garden.options.color.rmax,Garden.options.color.gmin,Garden.options.color.gmax,Garden.options.color.bmin,Garden.options.color.bmax,Garden.options.color.opacity),Garden.randomInt(Garden.options.petalCount.min,Garden.options.petalCount.max))},createBloom:function(a,f,d,e,b){new Bloom(new Vector(a,f),d,e,b,this)},clear:function(){this.blooms=[];this.ctx.clearRect(0,0,this.element.width,this.element.height)}};Garden.options={petalCount:{min:8,max:15},petalStretch:{min:0.1,max:3},growFactor:{min:0.1,max:1},bloomRadius:{min:8,max:10},density:10,growSpeed:1000/60,color:{rmin:128,rmax:255,gmin:0,gmax:128,bmin:0,bmax:128,opacity:0.1},tanAngle:60};Garden.random=function(b,a){return Math.random()*(a-b)+b};Garden.randomInt=function(b,a){return Math.floor(Math.random()*(a-b+1))+b};Garden.circle=2*Math.PI;Garden.degrad=function(a){return Garden.circle/360*a};Garden.raddeg=function(a){return a/Garden.circle*360};Garden.rgba=function(f,e,c,d){return"rgba("+f+","+e+","+c+","+d+")"};Garden.randomrgba=function(i,n,h,m,l,d,k){var c=Math.round(Garden.random(i,n));var f=Math.round(Garden.random(h,m));var j=Math.round(Garden.random(l,d));var e=5;if(Math.abs(c-f)<=e&&Math.abs(f-j)<=e&&Math.abs(j-c)<=e){return Garden.rgba(i,n,h,m,l,d,k)}else{return Garden.rgba(c,f,j,k)}};
var now = new Date();
var exitTime = now.getTime() + 6000;
var b = document.body;
var c = document.getElementsByTagName('canvas')[0];
var a = c.getContext('2d');
document.body.clientWidth; // fix bug in webkit: http://qfox.nl/weblog/218

c.width = 1200;
c.height = 768;

a.font = "bold 200pt Arial";
a.fillStyle = "rgb(255,255,255)";
a.fillText("九头鸟龙", 50, 300);          

var px = [];

var imgData=a.getImageData(0,0,c.width,c.height);

for(x=0; x<imgData.width; x++)
{
    for(y=0 ; y<imgData.height; y++)
    {
        if(getPixel(imgData,x,y)[3] > 0)
        {
            px.push( [x,y] );
        }
    }
}


var int = setInterval(draw, 6);

var max = 40;

var tt = new Array();

//thanks to Tom De Smedt, based on the "Tendrils" algorithm by ART+COM
//http://nodebox.net/code/index.php/Tendrils

function tendril()
{
    this.init = function(x, y, width)
    {   
        this.x = x;
        this.y = y;
        this.width = width;
        this.angle = Math.random()*2*Math.PI - Math.PI;
        this.v = 0;
        this.length = 0;
    };
    this.grow = function(distance, curl, step)  //distance=3.0, curl=1.0, step=0.02
    {
        if(this.length < max)
        {
            this.x += Math.cos(this.angle) * distance;
            this.y += Math.sin(this.angle) * distance;
            this.v += Math.random() * step - step/2;
            this.v *= 0.9 + curl*0.1;
            this.angle += this.v;   
            if(this._x != undefined)
            {
                aa = this.length/max;

                r = 8;
                g = parseInt(aa * 255);
                b = 32;

                a.beginPath();
                a.strokeStyle="rgba("+r+","+g+","+b+","+(1-aa)+")";
                a.moveTo(this._x,this._y);
                a.lineTo(this.x,this.y);
                a.closePath();
                a.stroke();

            }
            this._x = this.x;
            this._y = this.y;
            this.length++;

        }
    };
};

function draw()
{    
    var now = new Date();
    if(now.getTime() > exitTime)
    {
        int = window.clearInterval(int);
        $("#c").slideUp(1500);
        return;
    }

    // add new tendrils

    for(p in px)
    {
        if(Math.random() > 0.9999)
        { 
            var t = new tendril();
            t.init(px[p][0],px[p][1],15);  
            tt.push ( t );
        }
    }

    // grow actuals tendrils

    if(tt.length > 0)
    {
        for(t in tt)
        {
            tt[t].grow(1.0, 1.0, 0.02);    
        }
    }

}


function getPixel(imgData, x, y) {
    var offset = (x + y * imgData.width) * 4;
    var r = imgData.data[offset+0];
    var g = imgData.data[offset+1];
    var b = imgData.data[offset+2];
    var a = imgData.data[offset+3];

    return [r,g,b,a];
}  
