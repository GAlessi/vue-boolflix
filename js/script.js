function init() {
    new Vue({
        el:"#app",

        data:{
            actors:[],
            movies: [],
            tvSeries: [],
            searched: ""
        },

        methods:{
            getApi: function () {
                if (this.searched) {
                    this.actors=[];
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
                        for (let i = 0; i < this.movies.length; i++) {
                            const film = this.movies[i];
                            this.getName(film.id)
                        }
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


                }else {
                    this.popular();
                }
            },

            //stampa la bandiera se la nazionalità è En o It
            showFlag: function (language) {
                if (language == "en" || language == "it" ) {
                    return '<span>Language: </span><img src="img/' + language +'.png">'
                }else {
                    return "<span> Language: " + language +"</span>"
                }
            },

            //stampa la copertina se disponibile
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
            },

            //accorcia l'overview se disponibile e troppo lungo
            slicer: function (text) {
                if (!text) {
                    return "overview non disponibile"
                }else if (text.length > 300) {
                    return text.slice(0,300) + '...';
                }else {
                    return text;
                }
            },

            //inserisce in array i file/serieTV più popolari
            popular: function () {
                axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                        'page': '1'
                    }
                })
                .then(data =>{
                    const moviesArray = data.data.results;
                    this.movies = moviesArray;
                })
                .catch(() => console.log('error'));

                axios.get('https://api.themoviedb.org/3/tv/popular', {
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                        'page': '1'
                    }
                })
                .then(data =>{
                    const moviesArray = data.data.results;
                    this.tvSeries = moviesArray;
                })
                .catch(() => console.log('error'));
            },

            //richiama l'api con il cast
            getName: function (id) {

                axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits',{
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                    }
                })
                .then(data=>{
                    const cast = data.data.cast;
                    const namesArray = [];
                    for (let i = 0; i < 5; i++) {
                        const actor = cast[i];
                        namesArray.push(actor.name)
                    }
                    this.actors.push(namesArray);

                })
                .catch(()=>this.actors.push('Cast non disponibile'));
            },

            getActors: function (ind) {
                return this.actors[ind]
            }
        },

        mounted: function () {
                this.popular();
        },

    });
}

document.addEventListener('DOMContentLoaded', init);
