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

    self.open_uploader = function () {
        $("div#uploader_div").show();
        self.vue.is_uploading = true;
    };

    self.click_all = function () {
        checkFilters["community", "women", "foster", "homelessness", "health", "senior"];
    };

    self.close_uploader = function () {
        $("div#uploader_div").hide();
        self.vue.is_uploading = false;
        $("input#file_input").val(""); // This clears the file choice once uploaded.
    };

    self.edit_price = function(image_idx) {
        $.post(edit_price_url,
            {
                id: self.vue.images[image_idx].id,
                price: self.vue.form_edit,
            },
            function () {
                self.vue.images[image_idx].is_editing = false;
                self.vue.images[image_idx].price = self.vue.form_edit;
            })
    }

    self.open_editor = function(_idx) {
        self.vue.edit_idx = _idx;
        self.vue.images[_idx].is_editing = !self.vue.images[_idx].is_editing;
        if(self.vue.is_editing){
            self.vue.form_edit = self.vue.images[_idx].price;
        }
    }



        // self.edit_price = function(_idx){
    
    //     self.vue.edit_idx = _idx;
    //     self.vue.is_editing = !self.vue.is_editing;
    //     if(self.vue.is_editing){
    //         self.vue.image_price = self.vue.images[_idx].price;
    //     }
    // };

    self.upload_file = function (event) {
        
        var input = $("input#file_input")[0];
        var file = input.files[0];
        
        if (file) {
            // First, gets an upload URL.
            console.log("Trying to get the upload url");
            $.getJSON('https://upload-dot-luca-teaching.appspot.com/start/uploader/get_upload_url',
                function (data) {
                    // We now have upload (and download) URLs.
                    var put_url = data['signed_url'];
                    var get_url = data['access_url'];
                    console.log("Received upload url: " + put_url);
                    // Uploads the file, using the low-level interface.
                    var req = new XMLHttpRequest();
                    req.addEventListener("load", self.upload_complete(get_url));
                    // TODO: if you like, add a listener for "error" to detect failure.
                    req.open("PUT", put_url, true);
                    req.send(file);
                });
        }
    };

    self.get_images = function () {
        $.getJSON(image_url(0,50), function(data){  
            self.vue.images = data.image;
            self.vue.show_email = data.logged_in;
            self.vue.current_email = data.logged_in;
            enumerate(self.vue.images);
        })    
    };

    function image_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx,
        };
        return get_images + "?" + $.param(pp); 
    };

    self.upload_complete = function(get_url) {
        self.close_uploader();
        console.log('The file was uploaded; it is now available at ' + get_url);
        $.post(add_image_url,
          {
            image_url: get_url,
            current_email: self.vue.show_email,
            price: self.vue.image_price,
          },    
        function(data){
            setTimeout(function(){
                self.get_images();
            },2000);
        });
        //self.vue.images.unshift(data.user_images);
    };

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            is_uploading: false,
            companies: [],
            checkFilters: [],
            title: '',
            memo: ''
        },
        methods: {
            createPost: self.createPost
            open_uploader: self.open_uploader,
            close_uploader: self.close_uploader,
            upload_file: self.upload_file,
            open_editor: self.open_editor,
            click_all: self.click_all
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


