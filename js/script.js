function init() {
    new Vue({
        el:"#app",

        data:{
            movies: [],
            searched: ""
        },

        methods:{
            getApi: function () {
                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        'api_key': 'f1abffa0ec85176757c58a0ff27fccba',
                        'query': this.searched
                    }
                })
                .then(data =>{
                    const moviesArray = data.data.results;
                    this.movies = moviesArray;
                    console.log(this.movies);
                })
            },

        },
    });
}

$(init);
