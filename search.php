<?php

    if(!isset($_GET['q'])){
        header('location: home');
    }

    $query = $_GET['q'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Search</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ultra" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="./styles/reset.css">
    <link rel="stylesheet" href="./styles/style.css">
</head>
<body onload="getSearch('<?php echo strval($query)?>')">
    <div class="mainWrapper">
       <header>
            <?php include('./nav.php')?>
       </header>
       <div class="mainContainer">
            <div class="container-fluid">
                <div class="row fs-0">
                    <div class="col-xs-12  mainCenter">
                        <div class="mainContent">
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.4.0.js" integrity="sha256-DYZMCC8HTC+QDr5QNaIcfR7VSPtcISykd+6eSmBW5qo=" crossorigin="anonymous"></script> 
    <script src="./scripts/script.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script>


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
    </script>

</body>
</html> 