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

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
        },
        methods: {
        }

    });


    return self;

     self.get_user = function(){
        $.getJSON(get_user_url, 
            function(data){
                self.vue.users = data.user;
                for(var i = 0; i < self.vue.users.length; i++){      
                    if(self.vue.users[i].email == self.vue.userEmail){
                        self.vue.users.splice(i, 1); //i is deleted
                    }
                }
            }
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


