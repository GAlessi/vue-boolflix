function init() {
    new Vue({
        el:"#app",

        data:{
            movieGenres: "",
            tvGenres: "",
            api: "",
            actors:[],
            actorsTV: [],
            movies: [],
            tvSeries: [],
            searched: "",
            flags:{
                it:'it.png',
                en:'en.png',
            }
        },

        methods:{

            //funzione generica per ottenimento API
            getApi: function (media) {

                    this.actors=[];
                    this.actorsTV=[];

            //verifica se è stata effettuata una ricerca e richiama l'API corrispondente al caso
                    if (this.searched) {
                        this.api = 'https://api.themoviedb.org/3/search/' + media
                    }else {
                        this.api = 'https://api.themoviedb.org/3/'+ media +'/popular/'
                    }
                    axios.get(this.api, {
                        params: {
                            'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                            'query': this.searched,
                            'page': 1
                        }
                    })


                    .then(data =>{
                        if (media == 'movie') {
                            const moviesArray = data.data.results;
                            this.movies = moviesArray;

                            for (let i = 0; i < this.movies.length; i++) {
                                const film = this.movies[i];
                                this.getFilmName(film.id, media)
                            }
                        }else {
                            const seriesArray = data.data.results;
                            this.tvSeries = seriesArray;
                            for (let i = 0; i < this.tvSeries.length; i++) {
                                const film = this.tvSeries[i];
                                this.getFilmName(film.id, media)
                            }
                        }
                    })
                    .catch(() => console.log('error'));
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

            //richiama l'api con il cast dei Films/serieTV
            getFilmName: function (id, media) {

                axios.get('https://api.themoviedb.org/3/' + media + '/' + id + '/credits',{
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                    }
                })
                .then(data=>{
                    const cast = data.data.cast;
                    const namesArray = [];
                    for (let i = 0; i < 5; i++) {
                        const actor = cast[i];

                        if (i == 4) {
                            namesArray.push(actor.name)
                        }else {
                            namesArray.push(actor.name + ",")
                        }
                    }

                    if (media == 'movie') {
                        this.actors.push(namesArray);
                    }else {
                        this.actorsTV.push(namesArray);
                    }

                })
                .catch(data=>{
                    if (media == 'movie') {
                        this.actors.push(['cast non disponibile'])
                    }else {
                        this.actorsTV.push(['cast non disponibile'])
                    }
                })
            },

            //scarica gli array necessari a convertire l'id di un genere
            getGenreList: function () {
                axios.get('https://api.themoviedb.org/3/genre/movie/list',{
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                    }
                })
                .then(data=>{
                    const genres = data.data.genres
                    this.movieGenres=genres
                })
                .catch(() => console.log('error'));

                axios.get('https://api.themoviedb.org/3/genre/tv/list',{
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                    }
                })
                .then(data=>{
                    const genres = data.data.genres
                    this.tvGenres=genres
                })
                .catch(() => console.log('error'));
            },

            convertID: function (genres) {
                console.log(genres);
                const generi = [];
                for (let x = 0; x < genres.length; x++) {
                    const genreID = genres[x]
                    for (let i = 0; i < this.movieGenres.length; i++) {
                        const genreConverter = this.movieGenres[i]
                        if (genreID == genreConverter.id) {
                            generi.push(genreConverter.name);
                            return
                        }
                    }
                    console.log(generi);
                    return generi
                }
                return generi
            }

        },


        mounted: function () {
            this.getApi('movie');
            this.getApi('tv');
            this.getGenreList();
        },

    });
}

document.addEventListener('DOMContentLoaded', init);
