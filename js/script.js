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
                })
                .catch(() => console.log('error'));
            },
            showFlag: function (language) {
                if (language == "en" || language == "it" ) {
                    return '<div class="row"><h3>Language: </h3><img src="img/' + language +'.png"></div>'
                }else {
                    return "<h3> Language: " + language +"</h3>"
                }
            }
        },
    });
}

$(init);
