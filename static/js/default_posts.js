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
                var prefix = 'http://';
                for(i in data.posts) {
                    if(data.posts[i].link.substr(0,4) != "http"){
                        data.posts[i].link = prefix + data.posts[i].link;
                    }
                    t.push(data.posts[i]);
                }
                self.vue.posts = t
                console.log(self.vue.posts)
            })
    };

    self.get_all = function() {
        $.getJSON(get_posts_url,
            function(data) {
                t = [];
                var prefix = 'http://';
                for(i in data.posts) {
                    if(data.posts[i].link.substr(0,4) != "http"){
                        data.posts[i].link = prefix + data.posts[i].link;
                    }
                    t.push(data.posts[i]);
                }
                self.vue.posts = t;
                console.log(self.vue.posts);
            });
    };

    self.set_mail_post = function(item){
        if(self.vue.mail_post != item) self.vue.mail_post = item;
        else if(self.vue.mail_post = item) self.vue.mail_post = null;
    };

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            is_post: true,
            checkedFilters: ["community", "women", "foster", "homelessness", "health", "senior"],
            posts: [],
            clicked: true,
            searchbar: "",
            mail_post: null
        },
        methods: {
            get_posts: self.get_posts,
            get_all: self.get_all,
            click_all: self.click_all,
            go_to_contact: self.go_to_contact,
            set_mail_post: self.set_mail_post,            
        },
        beforeMount(){
            this.get_all()
        }

    });

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


