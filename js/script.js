function init() {
    new Vue({
        el:"#app",

        data:{
            movies: [],
            tvSeries:[],
            searched: ""
        },

        methods:{
            getApi: function () {

                //film
                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                        'query': this.searched
                    }
                })
                .then(data =>{
                    const moviesArray = data.data.results;
                    this.movies = moviesArray;
                })
                .catch(() => console.log('error'));


                //serieTV
                axios.get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                        'query': this.searched
                    }
                })
                .then(data =>{
                    const seriesArray = data.data.results;
                    this.tvSeries = seriesArray;
                })
                .catch(() => console.log('error'));
            },

            //mostra la bandiera se la nazionalità è En o It
            showFlag: function (language) {
                if (language == "en" || language == "it" ) {
                    return '<h3>Language: </h3><img src="img/' + language +'.png">'
                }else {
                    return "<h3> Language: " + language +"</h3>"
                }
            }
        },
    });
}

$(init);
