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

    self.createPost = function(){
        alert("Submitted");
    };

    // Enumerates an array.
    var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});};

    self.click_all = function () {
        checkFilters["community", "women", "foster", "homelessness", "health", "senior"];
    };

    self.open_editor = function(_idx) {
        self.vue.edit_idx = _idx;
        self.vue.images[_idx].is_editing = !self.vue.images[_idx].is_editing;
        if(self.vue.is_editing){
            self.vue.form_edit = self.vue.images[_idx].price;
        }
    }

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            companies: [],
            checkFilters: [],
            title: '',
            memo: ''
        },
        methods: {
        }

    });

    self.get_user_email = function(){
        $.getJSON(get_user_email, //this is a post method which retrieves user data such as name, email, etc.
            function(form){
                self.vue.userEmail = data.user.email;
                self.vue.userName = data.user.first_name;
                self.get_user_images(self.vue.userEmail);
                self.vue.currentEmail = self.vue.userEmail;
            }
            ); 
    };

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


