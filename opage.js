/**
 * 원페이지 영역 : opage
 * 1. 드래그 방향 체크
 * 1. 현재 스크롤이 위치한 범위가 원페이지스크롤인지 체크
 * 2. IF 원페이지 스크롤 = 스크롤을 막고 다음 영역으로 이동
 * 3. ELSE 스크롤을 풀것
 * 
**/


let winHeight = 0; // 브라우저 창 높이
let oPage = []; // 원페이지 시작 위치 배열
let oIdx = 0; // 현재 원페이지 인덱스
let isScroll = false; // 현재 스크롤 여부
let isOpage = true; // 현재 원페이지 여부
let isNone = false;
var posScroll = 0; // 현재 스크롤 위치


$(function(){
	winHeight = document.body.clientHeight;
	posScroll = window.scrollY;
	
	// opage 높이 설정
	$("[opage]").height(winHeight);
	$("[opage]").each(function(index){
		// Each starting position y	
		oPage.push( $(this).position().top ); 
	});
	
	$("[opage]").each(function(index){
		// Each starting position y	
		if( ( oPage[index] <= posScroll ) && ( ( oPage[index] + winHeight ) > posScroll ) ){
			oIdx = index;
		}
	});


	$('#onepage').on('scroll touchmove mousewheel', function(event) {

		var direct = event.originalEvent.wheelDelta; // scroll direction
		posScroll = window.scrollY;
		
		// 일반 스크롤 도중 원페이지를 만났을 경우
		if( ( direct > 0 ) && isNone ){ // && ( oPage[oIdx-1] > posScroll )
			console.log(( oPage[oIdx] + winHeight + 100) + " / " + posScroll);
			return; 
		}
		
		if( ( direct > 0 ) && !isOpage && ( oPage[oIdx] + winHeight + 100 > posScroll ) ) { 
			// up
			isOpage = true;
			isScroll = true;
			$('body').animate({ scrollTop: oPage[oIdx]}, 500, function(){ isScroll = false; });
			return;
		}
		else if( ( direct <= 0 ) && !isOpage && ( ( oPage[oIdx+1] - 1000 <= posScroll ) && ( ( oPage[oIdx+1] - 1000 + winHeight ) > posScroll ) ) ) {			
			isOpage = true;
			isScroll = true;
			oIdx++;
			$('body').animate({ scrollTop: oPage[oIdx]}, 500, function(){ isScroll = false; });
			return;
		}		
		
		if( !isOpage ){
			// 원페이지가 아니라면 일반 스크롤
			return;
		}
		else{
			event.preventDefault();
			event.stopPropagation();
		}	
	
			
		if( isScroll ){
			// 현재 스크롤이 동작중이면 종료
			return;
		}
		
				
		if(direct > 0){	
			// scroll up
			if( ( oPage[oIdx] <= posScroll ) && ( ( oPage[oIdx] + winHeight ) > posScroll ) ){
				//console.log("onpage section move on prev");
				isOpage = true;
				isScroll = true;
				oIdx--;
				if( oIdx <= 0 ){
					oIdx = 0;
				}
				
				if( oPage[oIdx] >= ( oPage[oIdx-1] + winHeight ) ){
					// none opage
					isOpage = false;
				}
				else{				
					$('body').animate({ scrollTop: oPage[oIdx]}, 500, function(){ isScroll = false; });
				}						
			}
			else{		
				isOpage = false;
			}
		}
		else{
			// scroll down
			if( ( oPage[oIdx] <= posScroll ) && ( ( oPage[oIdx] + winHeight ) > posScroll ) ){
				//console.log("onpage section move on next");
				
				isOpage = true;
				isScroll = true;
								
				if( oPage[oIdx+1] > ( oPage[oIdx] + winHeight ) && (oIdx != oPage.length - 1) ){
					// none opage
					isOpage = false;
					$('body').animate({ scrollTop: oPage[oIdx] + winHeight}, 500, function(){ isScroll = false; });
				}
				else{
					oIdx++;
					$('body').animate({ scrollTop: oPage[oIdx ]}, 500, function(){ isScroll = false; });
				}
				
								
				if( oIdx >= oPage.length ){
					oIdx = oPage.length - 1;
					isOpage = false;
				}
			}
			else{
				isOpage = false;								
			}
		}
	});
});
