/*
* Author: Ninoslav Jaric
*/
$(document).ready(function(){  
	var trsstr=[[],[],[]];
	$.fn.transform=function(str){  
		str=typeof str=="undefined"?"":str;
		$(this).css({
			transform: 'matrix3d('+str+')',
			MozTransform: 'matrix3d('+str+')',
			WebkitTransform: 'matrix3d('+str+')',
			msTransform: 'matrix3d('+str+')'
		});
	};
    $.fn.zoom=function(params,self){
			var _default={
				speed: 'normal',
				time: 3,
				current: 1,
				fdist: 1.5,
				bdist: 0.7,
				forward: true,
				phase: 1,
				step: 0.02
				};
			params=$.extend(_default,params);
			switch(params.speed){
				case 'normal':
					params.time=7;
					params.step=0.02;
					break;
				case 'slow':
					params.time=2;
					params.step=0.01;
					break;
				case 'fast':
					params.time=1;
					params.step=0.02;
					break;
				default:
					params.time=1;
			}
			
			var index=trsstr[0].indexOf(self);
			trsstr[2][index]=trsstr[2][index].split(', ');
			trsstr[2][index][15]=params.current;
			trsstr[2][index]=trsstr[2][index].join(', ');

			
			$(this).transform(trsstr[2][index]);
			var thiss=this;
			
			if(params.current>=params.fdist && params.phase==1){
				params.forward=false;
				params.phase= 2;
			}
			if(params.current<=params.bdist && params.phase==2){
				params.forward=true;
				params.phase= 3;
			}
			if(params.current==1 && params.phase==3){
				trsstr[1][trsstr[0].indexOf(self)]=false;
				return false;
			}
			
			if(params.forward){
				setTimeout(
					function(){
						params.current+=params.step;
						$(thiss).zoom({
							  current: params.current,
							  forward: params.forward,
							  phase: params.phase,
							  speed: params.speed
							 },self);
					},
					params.time
			);
			}else{
				setTimeout(
					function(){
						params.current-=params.step;
						$(thiss).zoom({current: params.current, 
							  forward: params.forward,
							  phase: params.phase,
							  speed: params.speed
							 },self);
					},
					params.time
				);
			}
	};
    $.fn.skoli=function(p){
    	$($(this).selector).each(function(){
    		trsstr[0].push(this);
    		trsstr[1].push(false);
    		trsstr[2].push("");
    	});
		var _default={
			clickable: true,
			withoutX: false,
			withoutY: false
		};
		p=$.extend(_default,p);
		$(this).mousemove(function(e){
			l=this.getClientRects()[0];
			var x=e.clientX-l.left-l.width/2;
			var y=e.clientY-l.top-l.height/2;
			var Xunit=0.0012/l.width;
			var Yunit=0.0012/l.height;
			var Xmunit=-3/l.width;
			var Ymunit=-3/l.height;
			var index=trsstr[0].indexOf(this);
			var dist=trsstr[2][index].split(', ')[15];
			var str="";
			for(var i=1;i<17;i++){
				switch(i){
					case 1:
					case 6:
					case 11:
						str+="1, ";
						break;
					case 16:
						str+=typeof dist=="undefined"?"1":dist;
						break;
					case 4:
						str+=p.withoutX?"0, ":(Xunit*x)+", ";
						break;
					case 8:
						str+=p.withoutY?"0, ":(Yunit*y)+", ";
						break;
					case 13:
						str+=p.withoutX?"0, ":(Xmunit*x)+", ";
						break;
					case 14:
						str+=p.withoutY?"0, ":(Ymunit*y)+", ";
						break;
					default:
						str+="0, ";
				} 
		   }
		   trsstr[2][index]=str;
		   $(this).transform(trsstr[2][index]);
		});
		$(this).click(function(){
			trsstr[1][trsstr[0].indexOf(this)]=true;
			if(!p.clickable){return false;}
			$(this).zoom(p,this);
		});
	}
});
