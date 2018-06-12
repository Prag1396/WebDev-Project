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

    self.create_post = function() {
        self.vue.errors = [];
        if(!this.name) self.vue.errors.push("Name required.");
        if(!this.title) self.vue.errors.push("Title required.");
        if(!this.description) self.vue.errors.push("Description required.");
        if(!this.link) self.vue.errors.push("Link required.");
        if(!this.contact_email) self.vue.errors.push("Email required.");
        if(self.vue.checkedFilters.length == 0) self.vue.errors.push("Category Required.")

        if(self.vue.errors.length == 0)
        {$.post(input_posts_url,
            {
                name: self.vue.name,
                title: self.vue.title,
                description: self.vue.description,
                link: self.vue.link,
                contact_email: self.vue.contact_email,
                filter: JSON.stringify(self.vue.checkedFilters),
            }, function() {
                self.vue.name = "";
                self.vue.title = "";
                self.vue.description = "";
                self.vue.link = "";
                self.vue.contact_email = "";
                self.vue.checkedFilters = [];
                self.vue.form_success = true;
            }
        
        )}
    };

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            name: "",
            title: "",
            description: "",
            link: "",
            contact_email: "",
            is_post: true,
            checkedFilters: [],
            errors: [],
            form_success: false,
        },
        methods: {
            createPost: self.create_post,
        },

    });

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


