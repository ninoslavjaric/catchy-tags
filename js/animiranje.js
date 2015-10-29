$(document).ready(function(){
if(document.getElementById("slide_container")!=null){ //If page contains slider
	var slidepos=1;
	var sldr=document.getElementById("slide_container");
	var sldpic=document.getElementsByClassName("slidepic");
	var firstpicclone=sldpic[0].cloneNode(); sldr.parentNode.appendChild(firstpicclone); //clone first pic, add to end

	sldr.style.width=(document.getElementById("slider").offsetWidth*sldpic.length+500)+"px";
	for(i=0;i<sldpic.length;i++){
		sldr.appendChild(sldpic[i]);
		sldpic[i].style.display="block";
	}
	if(window.innerWidth<768){
		for(i=0;i<sldpic.length;i++){
		sldpic[i].style.width=window.innerWidth+"px";
		}
	}
		$(window).resize(function(){
		sldr.style.width=(document.getElementById("slider").offsetWidth*sldpic.length+500)+"px"; 
		if(window.innerWidth<768){
			for(i=0;i<sldpic.length;i++){
			sldpic[i].style.width=window.innerWidth+"px";
			}
		}else{
			for(i=0;i<sldpic.length;i++){
			sldpic[i].style.width="";
			}	
		}
		});
	/**/
	setInterval(function(){
		if(window.innerWidth<768){
		$("#slide_container").animate({left: ""+(-slidepos*window.innerWidth)+"px"}, 1000,"swing",function(){
		if(slidepos==document.getElementsByClassName("slidepic").length){sldr.style.left=0+"px"; slidepos=1;}	
		});
		slidepos++;	
		}
		else{
		$("#slide_container").animate({left: ""+(-slidepos*sldr.parentNode.offsetWidth)+"px"}, 1000,"swing",function(){
		if(slidepos==document.getElementsByClassName("slidepic").length){sldr.style.left=0+"px"; slidepos=1;}	
		});
		slidepos++;
		}
	},5000);
}
/////////////
$("#resp_nav_button").click(function(){
        $("#navigation>.nav_list").slideToggle();
    });
	
	$(window).resize(function(){
	if(window.innerWidth>768){
		$("#navigation>.nav_list").css("display","");
		}
	});

/*	skidanje dosadnih reklama	*/
	var dosada1=document.getElementsByClassName("bModal")[0];
	var dosada2=document.getElementById("visas_style_div");
	if(dosada1!= null && typeof dosada1!="undefined"){
	console.log("Popups removed");
	dosada1.remove();
	}
	if(dosada2!= null && typeof dosada2!="undefined"){
	dosada2.remove();
	}
	

});
$("#map_mrd").ready(function(){ 
	cac=document.getElementById("map_mrd");
	$(cac).scroll(function(){
		//////////////////////
	});
});