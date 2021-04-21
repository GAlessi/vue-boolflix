function init() {
    new Vue({
        el:"#app",

        data:{
            api: "",
            actors:[],
            actorsTV: [],
            movies: [],
            tvSeries: [],
            searched: ""
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
                        this.actors.push('Cast non disponibile')
                    }else {
                        this.actorsTV.push('Cast non disponibile')
                    }
                })
            },

            //dato un indice restituisce gli attori(films)
            getActors: function (ind, media) {
                if (media == 'movie') {
                    return this.actors[ind]
                }else {
                    return this.actorsTV[ind]
                }
            }
        },

        mounted: function () {
            this.getApi('movie');
            this.getApi('tv');
        },

    });
}

document.addEventListener('DOMContentLoaded', init);
