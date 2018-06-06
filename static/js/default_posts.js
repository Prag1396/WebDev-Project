// This is the js for the default/index.html view.

var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    self.get_posts = function() {
        $.getJSON(get_posts_url,
            {
                community: self.vue.community,
                women: self.vue.women,
                fostercare: self.vue.fostercare,
                homeless: self.vue.homeless,
                handm: self.vue.handm,
                senior: self.vue.senior
            },
            function(data) {
                t = [];
                for(i in data.posts) {
                    t.push(data.posts[i]);
                    if(t != self.vue.posts)
                        self.vue.posts = t;
                }
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
            community: true,
            women: true,
            fostercare: true,
            homeless: true,
            handm: true,
            senior: true,
        },
        methods: {
            get_posts: self.get_posts
        }

    });

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


