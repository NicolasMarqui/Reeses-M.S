$(document).ready(function(){

    function changeInputColor(){
        $('.searchBar input').css('border-color', 'rebeccapurple');
        $('.searchBar input').attr('placeholder', 'Ex: Avengers')
    }

    $('.searchBar input').focus(changeInputColor);
    $('.searchBar input').blur(function(){ $(this).css('border-color','black'); $(this).attr('placeholder', 'Pesquisar') });

    function getRand(){
        return Math.floor(Math.random() * (550 - 500 + 1)) + 500;
    }

    function makeNavFixed(){
        if($(this).scrollTop() > 150){
            $('.topo').addClass('fixedNav');
        }else{
            $('.topo').removeClass('fixedNav');
        }
    }

    $(window).scroll(makeNavFixed);

    const ids = [299534,299536,284053];
    const imgPath = 'http://image.tmdb.org/t/p/w780/';

    $.each(ids, function(i, id){
        getDataBanner(i, id);
    })

    function getDataBanner(classNum,id){
        let i = 0;
        $.ajax({ url: `https://api.themoviedb.org/3/movie/${id}?api_key=8d39ecbb90f8779a25effbbda999db32` })
            .done(function(data){
                selectItem(classNum, data);
            })
    }

    function selectItem(i , data){
        let items = $('.item');
        items[i].style.background = `url(${imgPath}${data.poster_path})`;
    }

    function getDate(){
        let finishDate = new Date("Dec 15, 2019 15:37:25").getTime();

        let x = setInterval(function(){

            let today = new Date().getTime();

            let distancia = finishDate - today;
            let days = Math.floor(distancia / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distancia % (1000 * 60)) / 1000);

            $('#showData').html(`${days}d ${hours}h ${minutes}m ${seconds}s`);

            if(distancia < 0){
                clearInterval(x);
                $('#showData').html('Aguardando data..');
            }

        }, 1000)
    }

    getDate();

    function getGenres(){
        const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=8d39ecbb90f8779a25effbbda999db32&language=en-US';

        let ulPar = $('.catDrop ul');

        $.ajax({ url }).done(function(data){
           $.each(data, function(i, genre){
               $.each(genre, function(i, rdy){
                    $('<li><a href=#>' + rdy.name + '</a></li>').appendTo(ulPar);
               })
           });
        });
    }
    
    getGenres();

    function getTrending(dia = 'day', media = 'all'){
        let url = `https://api.themoviedb.org/3/trending/${media}/${dia}?api_key=8d39ecbb90f8779a25effbbda999db32`;

        $.ajax({ url }).done(function(data){
            $.map(data.results, function(tr, i){
                //$('.showTrending ul').append('<li><a href=#><img class=imgTrending src=' + `${imgPath}${tr.poster_path}` + '></a></li>');
                let li = document.createElement('li');
                let a = document.createElement('a');
                let img = document.createElement('img');

                img.src = `${imgPath}${tr.poster_path}`;
                a.appendChild(img);
                li.appendChild(a);
                document.querySelector('.showTrending ul').appendChild(li);

                li.addEventListener('click', function(){

                    if(tr.original_name === undefined){
                        $('.displaySelectedOne').empty();
                        let h1 = document.createElement('h1');
                        h1.textContent = tr.original_title;

                        let newImg = document.createElement('img');
                        newImg.src = `${imgPath}${tr.poster_path}`;

                        document.querySelector('.displaySelectedOne').appendChild(h1, newImg);
                        document.querySelector('.displaySelectedOne').appendChild(newImg);

                    }else{

                        $('.displaySelectedOne').empty();
                        let h1 = document.createElement('h1');
                        h1.textContent = tr.original_name;

                        let newImg = document.createElement('img');
                        newImg.src = `${imgPath}${tr.poster_path}`;

                        document.querySelector('.displaySelectedOne').appendChild(h1);
                        document.querySelector('.displaySelectedOne').appendChild(newImg);
                    }
                })
               
            })
        })
    }

    getTrending();

    function getSearch(query){
        $.ajax({ url: `https://api.themoviedb.org/3/search/multi?api_key=8d39ecbb90f8779a25effbbda999db32&language=en-US&query=${query}&page=1&include_adult=false` })
            .done(function(data){
                console.log(data)
                $.map(data.results, function(q, i){
                    console.log(q)
                    let parent = $('.mainContent');
                    let img = document.createElement('img');
                    img.src = `${imgPath}${q.poster_path}`

                    document.querySelector('.mainContent').appendChild(img);
                })
            })
    }

    function searchMovie(){

        // let value = $('.searchParam').val();

        $('.searchParam').keyup(function(e){
            

            $('#search').click(function(){
                console.log(e.target.value)
                window.location = `http://localhost/reese-movies/search?q=${e.target.value}`
                getSearch(e.target.value);
            })
        })
    }

    searchMovie();

    let queryParam = getQueryVariable("q");

    function getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
            return pair[1];
            }
        } 
    }

    function getSearch(query){
        $.ajax({ url: `https://api.themoviedb.org/3/search/multi?api_key=8d39ecbb90f8779a25effbbda999db32&language=en-US&query=${query}&page=1&include_adult=false` })
            .done(function(data){

                if(data.lenght === []){
                    alert("nada");
                }

                $.map(data.results, function(q, i){
                    let parent = document.querySelector('.mainContent');
                    let img = document.createElement('img');
                    let h1 = document.createElement('h1');
                    let p = document.createElement('p');

                    img.classList.add('imgSearchResults');                    
                    if(q.poster_path === undefined){
                        img.src = 'https://pngimage.net/wp-content/uploads/2018/06/image-not-found-png-5.png';
                    }else{
                        img.src = `http://image.tmdb.org/t/p/w780/${q.poster_path}`
                    }

                    if(q.media_type === 'movie'){
                        h1.innerHTML = q.title;
                    }else{
                        h1.innerHTML = q.name;
                    }

                    p.innerHTML = q.overview;
                    const accp = 300;

                    if(q.overview.length < 1000){
                        p.innerHTML = q.overview;
                    }else{
                        let cutted = q.overview.slice(0, accp);
                        p.innerHTML = cutted;
                        p.innerHTML.concat('Read More');

                        p.innerHTML += '...';
                    }

                    //create bootstrap divs

                    let row1 = document.createElement('div');
                    let row2 = document.createElement('div');
                    let row3 = document.createElement('div');

                    //Add classes
                    row1.classList.add('col-xs-12')
                    row1.classList.add('col-md-3')

                    row2.classList.add('col-xs-12')
                    row2.classList.add('col-md-6')

                    row3.classList.add('col-xs-12')
                    row3.classList.add('col-md-3')

                    let outerDiv = document.createElement('div');
                    outerDiv.classList.add('outerDiv')

                    let imgDiv = document.createElement('div');
                    imgDiv.classList.add('imgDiv')

                    let info = document.createElement('div');
                    info.classList.add('info')

                    let moreInfo = document.createElement('div');
                    moreInfo.classList.add('moreInfo');

                    //Create Elements for more info
                    if(q.media_type === 'movie'){
                        $('<ul class="moreInfoList"><li><span class="voteAverage">' + q.vote_average
                         + '</span></li><li><p class="releaseDate">Data de Lancamento: <br> <span>'
                         + q.release_date + '</span></p></li><li><button class="verDetalhes"><a href="info?id=' + q.id
                          + '&tipo=movie"> Ver Mais </a></button></li></ul>')
                            .appendTo(moreInfo);
                    }else{
                        $('<ul class="moreInfoList"><li><span class="voteAverageTv">' + q.vote_average
                         + '</span></li><li><p class="releaseDate">Data de Lancamento: <br> <span>'
                         + q.first_air_date + '</span></p></li><li><button class="verDetalhes"><a href="info?id=' + q.id
                          + '&tipo=tv"> Ver Mais </a></button></li></ul>')
                            .appendTo(moreInfo);
                    }

                    imgDiv.appendChild(img);
                    info.appendChild(h1);
                    info.appendChild(p);

                    row1.appendChild(imgDiv);
                    row2.appendChild(info);
                    row3.appendChild(moreInfo);

                    outerDiv.appendChild(row1);
                    outerDiv.appendChild(row2);
                    outerDiv.appendChild(row3);

                    parent.appendChild(outerDiv);
                    

                    console.log(q)

                    //document.querySelector('.mainContent ').appendChild(infoDiv);
                })
            })
    }
    
    getSearch(queryParam);

    let queryType = getQueryVariable("tipo");
    let queryId = getQueryVariable("id");

    function getDetails(type, id){
        let url = `https://api.themoviedb.org/3/${type}/${id}?api_key=8d39ecbb90f8779a25effbbda999db32&language=en-US`;
        
        $.ajax({url }).done(function(data){
            console.log(data);
        })
    }

    getDetails(queryType,queryId);

    
    
})