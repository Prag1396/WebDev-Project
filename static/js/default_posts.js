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

    // self.getPosts = function() {
    //     $.getJSON(get_user_url,
    //         function(data){
    //             self.vue.users = data.user;
    //             console.log(self.vue.users.length);
    //             for(var i = 0; i < self.vue.users.length; i++)
    //             {
    //                 console.log(self.vue.users[i].email); //self.vue.users[i].first_name
    //                 if(self.vue.users[i].email == self.vue.userEmail)
    //                 {
    //                     console.log("matching email at index: " + i);
    //                     self.vue.users.splice(i, 1); // delete element i
    //                 }
    //             }
    //             console.log('End of getUser function');
    //             }
    //         );
    // };

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            is_post: true
        },
        methods: {
        }

    });


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


