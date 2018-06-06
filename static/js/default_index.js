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

    self.get_user_info = function(){
        $.getJSON(get_userInfo, //this is a post method which retrieves user data such as name, email, etc.
            function(data){
                self.vue.userEmail = data.user.email;
                self.vue.userName = data.user.first_name;
                self.get_user_images(self.vue.userEmail);
                self.vue.currentEmail = self.vue.userEmail;
            }
            ); 
    };
    self.get_user_info = function(){
        $.getJSON(get_userInfo, //this is a post method which retrieves user data such as name, email, etc.
            function(data){
                self.vue.userEmail = data.user.email;
                self.vue.userName = data.user.first_name;
                self.get_user_images(self.vue.userEmail);
                self.vue.currentEmail = self.vue.userEmail;
            }
            ); 
    };
    self.get_user_info = function(){
        $.getJSON(get_userInfo, //this is a post method which retrieves user data such as name, email, etc.
            function(data){
                self.vue.userEmail = data.user.email;
                self.vue.userName = data.user.first_name;
                self.get_user_images(self.vue.userEmail);
                self.vue.currentEmail = self.vue.userEmail;
            }
            ); 
    };
    self.get_user_info = function(){
        $.getJSON(get_userInfo, //this is a post method which retrieves user data such as name, email, etc.
            function(data){
                self.vue.userEmail = data.user.email;
                self.vue.userName = data.user.first_name;
                self.get_user_images(self.vue.userEmail);
                self.vue.currentEmail = self.vue.userEmail;
            }
            ); 
    };


    return self;

    new Vue({
      el: '#app',
      data: {
        form : {
          name: ''
      }
  }
});
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


