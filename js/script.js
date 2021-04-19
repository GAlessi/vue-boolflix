function init() {
    new Vue({
        el:"#app",

        data:{
            tvSeries:[],
            movies: [],
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
            },

            poster: function (img) {
                if (!img) {
                    return '<img src=img/unknown.jpg>'
                }else {
                    return '<img src="https://image.tmdb.org/t/p/w342' + img +'">'
                }
            },

            //converte il voto in un intero compreso tra 1 e 5 e aggiorna il data
            convertVote: function (voteDecimal) {
                return parseInt(Math.round(voteDecimal/2));
            }
        },
    });
}

document.addEventListener('DOMContentLoaded', init);
