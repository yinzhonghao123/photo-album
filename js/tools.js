(function(w){
	w.damu={};
	
	//用来模拟ios中的多指事件（双指）
	damu.gesTure=function (node,callBack){
		var startS = 0;
		var startR = 0;
		//判断是否已经执行过gesturestart
		var flag = false;
		//gesturestart 手指触碰当前元素，屏幕上有两个或者两个以上的手指
		node.addEventListener("touchstart",function(ev){
			/*	
				changedTouches:触发事件的手指列表
				targetTouches:元素身上的手指列表
				touches:屏幕上的手指列表
			*/
			var touch = ev.touches;
			if(touch.length>=2){
				startS =  damu.getC(touch[0],touch[1]);
				startR =  damu.getAngel(touch[0],touch[1]);
				flag=true;
				if(callBack&&callBack["start"]){
					callBack["start"].call(node);
				}
			}
		})
		
		

		node.addEventListener("touchmove",function(ev){
			var touch = ev.touches;
			if(touch.length>=2){
				
				//给ev绑定两个属性 scale rotation
				var scale = damu.getC(touch[0],touch[1]);
				var rotate = damu.getAngel(touch[0],touch[1]);
				ev.scale =scale/startS;
				ev.rotation=rotate - startR;
				
				if(flag){
					if(callBack&&callBack["change"]){
						callBack["change"].call(node,ev);
					}
				}
			}
		})
		
		//在此之前应该屏幕上有两根手指,必须已经发生过gesturestart
		node.addEventListener("touchend",function(ev){
			if(flag){
				if(callBack&&callBack["end"]){
					callBack["end"].call(node);;
				}
			}
			flag=false;
		})
		
		
	}


	//	
//		正切：
//		在直角三角形中 对边和临边比值
//
//		Math.atan2();	
//			对于任意不同时等于0的实参数x和y，atan2(y,x)所表达的意思是坐标原点为起点，
//			指向(x,y)的射线在坐标平面上与x轴正方向之间的角的角度。
//			当y>0时，射线与x轴正方向的所得的角的角度指的是x轴正方向绕逆时针方向到达射线旋转的角的角度；
//			而当y<0时，射线与x轴正方向所得的角的角度指的是x轴正方向绕顺时针方向达到射线旋转的角的角度
			
	//根据两点求得两点间的距离（求一个线段的距离）
	damu.getC = function(p1,p2){
		var a= p2.clientX - p1.clientX;
		var b = p2.clientY - p1.clientY;
		var c = Math.sqrt(a*a+b*b);
		return c;
	}
	
	damu.getAngel=function (p1,p2){
		var x= p2.clientX - p1.clientX;
		var y= p2.clientY - p1.clientY;
		var angel = Math.atan2(y,x)*180/Math.PI;
		return angel;
	}
})(window)
