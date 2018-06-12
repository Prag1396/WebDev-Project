// This is the js for the default/index.html view.

var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

        self.click_all = function () {
            self.vue.clicked = !self.vue.clicked;
            if(self.vue.clicked){
                self.vue.checkedFilters=["community", "women", "foster", "homelessness", "health", "senior"];
            }
            if(!self.vue.clicked){
                self.vue.checkedFilters=[];
            }
        };

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    self.get_posts = function() {
        $.getJSON(get_posts_url,
            {
                filter: JSON.stringify(self.vue.checkedFilters),
                search: self.vue.searchbar
            },
            function(data) {
                t = [];
                for(i in data.posts) {
                    t.push(data.posts[i]);
                }
                self.vue.posts = t
                console.log(self.vue.posts)
            })
    };


    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            is_post: true,
            checkedFilters: [],
            posts: [],
            clicked: false,
            searchbar: ""
        },
        methods: {
            get_posts: self.get_posts,
            click_all: self.click_all,
        }

    });

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


