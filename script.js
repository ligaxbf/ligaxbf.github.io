$(document).ready(function () {
    window.scrollTo(0,1);
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $('.dropdown-toggle').on('click', function() {
        $(this).parent().toggleClass('active');
    });

    // Scroll to top button appear
    $(document).on('scroll', function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    $(document).on('click', '.goTo[href*="#"]:not([href="#"])', function(){
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            amount = ($(this).data('margin')?$(this).data('margin'):30)
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top-amount
                }, 1000);
                return false;
            }
        }
    });

    $( '.input-range').each(function(){
        var value = $(this).attr('data-slider-value');
        var separator = value.indexOf(',');
        if( separator !== -1 ){
            value = value.split(',');
            value.forEach(function(item, i, arr) {
                arr[ i ] = parseFloat( item );
            });
        } else {
            value = parseFloat( value );
        }
        $( this ).slider({
            formatter: function(value) {
                return value;
            },
            min: parseFloat( $( this ).attr('data-slider-min') ),
            max: parseFloat( $( this ).attr('data-slider-max') ), 
            range: $( this ).attr('data-slider-range'),
            value: value,
            tooltip_split: $( this ).attr('data-slider-tooltip_split'),
            tooltip: $( this ).attr('data-slider-tooltip')
        });
        $( this ).on('slide', function(slideEvt) {
            $('.number').text(slideEvt.value);
        });
    });

    $.fn.shuffle = function() {
        return this.each(function(){
            let items = $(this).children();
            return (items.length) ? $(this).html($.shuffle(items)) : this;
        });
    }
    $.shuffle = function(arr) {
        for(let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }
    
    let maps = ["Arras", "Roterdã", "Hamada", "Fjell 652", "Al Sundan", "Devastação", "Narvik", "Mercúrio", "Marita", "Lofoten", "Provença", "Op. Subterrânea"],
        mapsdisabled = ["Iwo Jima", "Tormenta do Pacífico", "Wake Island"],
        qntMaps = maps.length;
    
    
    for(x = 0; x < qntMaps;x++){
        $('.list-maps').children('.custom-checkbox:first').clone().each(function() {
            let selected = maps[x];
            $(this).removeClass('d-none').find('input').attr('id', 'map_'+x).attr('name', 'map_'+x ).attr('data-label',selected);
            $(this).find('label').attr('for', 'map_'+x );
            $(this).find('.label').text(selected);
            value = this;
        }).end().parent().append(value);
    }


    $('body').on('click', '.shuffle', function(){
        let listMaps = [],
            qntShort = $('.input-range').attr('data-value');
        $('.custom-checkbox input:checked').each(function() {
            listMaps.push($(this).attr('data-label'));
        });
        maps = $.shuffle(listMaps);
        $('#mapsModal .name').html('');
        if($('.input-range').attr('data-value') < listMaps.length) {
            for(x = 0; x < parseInt(qntShort);x++){
                let selected = maps[x];
                $('#mapsModal .spinner-grow').removeClass('d-none').show();
                setTimeout(function(){
                    $('#mapsModal .spinner-grow').hide().addClass('d-none');
                    $('#mapsModal .name').append(selected+'<br>').show().removeClass('d-none');
                }, 2000);
            }
        } else {
            $('#mapsModal .alert').removeClass('d-none').show().find('p').text('Selecione pelo menos '+(parseInt(qntShort)+1)+' opções!');
            setTimeout(function(){
                $('#mapsModal .alert').fadeOut( "slow", function() { $(this).addClass('d-none'); });
            }, 3000);
        }
    });
    
    $('.app').each(function() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) {
            $(this).attr('href','httpss://www.microsoft.com/pt-br/store/apps/client-for-hangouts/9nblggh6ghbm');
        }
        if (/android/i.test(userAgent)) {
            $(this).attr('href','https://play.google.com/store/apps/details?id=com.google.android.talk');
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            $(this).attr('href','https://apps.apple.com/br/app/hangouts/id643496868');
        } else {
            $(this).attr('href','https://hangouts.google.com/');
        }
    });

});