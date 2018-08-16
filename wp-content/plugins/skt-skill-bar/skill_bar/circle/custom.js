if( typeof pixflow_js_opt === 'undefined' ){
	var pixflow_js_opt = {"pie_chart_color":"#ccc","pie_track_color":"#333","pie_chart_size":"150"};
} 

var $ = jQuery;
(function ($) {
    var Reg_Email = /^\w+([\-\.]\w+)*@([a-z0-9]+(\-+[a-z0-9]+)?\.)+[a-z]{2,5}$/i,
        $window = $(window),
        isTouchDevice = 'ontouchstart' in window;
		hash = window.location.hash;


/*-----------------------------------------------------------------------------------*/
/*	 Resume
/*-----------------------------------------------------------------------------------*/	 
  
    function Resume(){
		 if(($(window).width()>768) && !($('.vertical-page').length)){
            $(".experiences").after('<ul id="fooX" />').next().html($(".experiences").html());
            $(".experiences li:odd").remove();
            $("#fooX li:even").remove();

            $(".experiences").carouFredSel({
                auto:false,
				align:"left",
                synchronise : "#fooX",
                circular:true,
                infinite:false,
                width:'100%',
                prev: '#resume-exp-prev',
                next: '#resume-exp-next',
                swipe: {
                    onMouse: true,
                    onTouch: true
                }

            });
            $("#fooX").carouFredSel({
                auto: false,
                circular:true,
				align:"left",
                width:'100%',
                infinite:false
            });
        }
		
        //For Responsive View
        $(window).resize(function(){
            var Width=$(window).width();
			if((Width<=768)&&(Width>480) && !($('.vertical-page').length)){
                if($('.hideme').css('opacity')==1)
                    $('.car').trigger('destroy',true);
                $(".experiences").trigger('destroy',true);
                $("#fooX").trigger('destroy',true);
				$(".portfolio").mCustomScrollbar("destroy");
            }
			else if( (Width<=480) && !($('.vertical-page').length)){

                if($('.hideme').css('opacity')==1)
                    $('.car').trigger('destroy',true);
                $(".experiences").trigger('destroy',true);
                $("#fooX").trigger('destroy',true);
				$(".portfolio").mCustomScrollbar("destroy");

            }
			else if ( (Width>768) && !($('.vertical-page').length) ){
                if($('.hideme').css('opacity')==1)
                    chart_carousel();

                $(".experiences").carouFredSel({
                    auto:false,
                    synchronise : "#fooX",
					align:"left",
                    circular:true,
                    infinite:false,
                    width:'100%',
                    prev: '#resume-exp-prev',
                    next: '#resume-exp-next',
                    swipe: {
                        onMouse: true,
                        onTouch: true
                    }

                });
                $("#fooX").carouFredSel({
                    auto: false,
					align:"left",
                    width:'100%',
                    circular:true,
                    infinite:false
                });

            }
        });
		
		var mainpartFlag= 0,$element,topFlag=0;

		//if page not load from top show UP button
		if ( ( $('.vertical-page').length ) && ( $(window).scrollTop()>= 100 ) )
		{
			topFlag=1;
			$('.go-to-top').css('opacity',1);

		}

		//Scrolling mainpart to Appear element
		if ( $('.vertical-page').length || ($(window).width()<768) )
		{
			$element=$(window);
		}
		else
		{
			$element=$('.mainpart');
		}

		$element.scroll(function(){
			var i=$(window).scrollTop();


		// show up button on scrolling
		if ( ( i > 900 ))
		{
			$('.go-to-top').css('opacity',1);

		}
		// Hide UP button when we are at top of the page 
		if ( ( i < 850 ) )
		{
			$('.go-to-top').css('opacity',0);
		}
			

            // Check the location of each desired element
            $('#resume').each( function(i){

                var left_of_object = $(this).position().left + $(this).outerWidth();	//+600
                var left_of_container= $('.mainpart').scrollLeft() + $('.mainpart').width();

                var top_of_object = $(this).position().top ;	//+300
                var top_of_container= $(window).scrollTop() + $(window).height();

				if ( ($(window).width()<768) && (mainpartFlag === 0) ) {
					  mainpartFlag=1;
					  $('.hideme').animate({'opacity':'1'},'fast',function(){
                        init_chart();
						viewP();
                    });
				} else {
				     // If the object is completely visible in the window, fade it it
					if( ((left_of_container > left_of_object ) || (top_of_container > top_of_object)) && (mainpartFlag === 0) ){
						mainpartFlag=1;
						$('.hideme').animate({'opacity':'1'},'fast',function(){
							init_chart();
							viewP();
							if( ($(window).width()>768) && !($('.vertical-page').length) )
								chart_carousel();
						});
					}
				}
            });
        });
    }

/*-----------------------------------------------------------------------------------*/
/*	Easy Pie Chart Function
/*-----------------------------------------------------------------------------------*/	 

    var init_chart=(function() {
        $('.chart').easyPieChart({
            scaleColor:false,
            barColor: pixflow_js_opt.pie_chart_color,
            lineWidth:25,
            trackColor: pixflow_js_opt.pie_track_color,
            lineCap:'butt',
            animate:1500,
            size: pixflow_js_opt.pie_chart_size
        });
    });
	
	
	var init_shortcode_chart=(function() {
		$('.shortcode_chart_skin').easyPieChart({
            scaleColor:false,
			barColor: pixflow_js_opt.pie_chart_color,
            lineWidth:5,
            trackColor: pixflow_js_opt.pie_track_color,
            lineCap:'butt',
			animate:1200,
            size: pixflow_js_opt.pie_chart_size
        });
		
		$('.shortcode_chart').easyPieChart({
            scaleColor:false,
			barColor: pixflow_js_opt.pie_chart_color,
            lineWidth:5,
            trackColor: pixflow_js_opt.pie_track_color,
            lineCap:'butt',
			animate:1200,
            size: pixflow_js_opt.pie_chart_size
        });
    });
	
/*-----------------------------------------------------------------------------------*/
/*	chart carousel
/*-----------------------------------------------------------------------------------*/	 

	var chart_carousel=(function(){
        $('.car').carouFredSel({
            auto: false,
            circular:false,
            infinite:false,
            prev: '#prev2',
            next: '#next2',
            mousewheel:false,
            swipe: {
                onMouse: true,
                onTouch: true
            }
        });
    });
	
/*-----------------------------------------------------------------------------------*/
/*	viewP
/*-----------------------------------------------------------------------------------*/	 

	var viewP=(function(){
		$('.chart span').css('visibility','visible');
		$('.chartbox p').css('visibility','visible');
	});	

	$(document).ready(function () {
		init_shortcode_chart();
		if($('#resume').length)
			Resume();
	});
	//End $(document).ready

})(jQuery);