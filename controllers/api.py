
var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    //Grab Info all All users of site
    self.get_user = function()
    {
        $.getJSON(
            get_user_url, 
            function(data){
                self.vue.users = data.user;
                // console.log(self.vue.users);
                console.log(self.vue.users.length);
                for(var i = 0; i < self.vue.users.length; i++)
                    {      
                        console.log(self.vue.users[i].email); //self.vue.users[i].first_name
                        if(self.vue.users[i].email == self.vue.userEmail)
                            {
                                console.log("matching email at index: " + i);
                                self.vue.users.splice(i, 1); // delete element i 
                            }
                        }
                        console.log('End of getUser function');
                    }
                    );     
    };


    // Enumerates an array.
    var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});};

    self.open_uploader = function (mail) {
        self.currentEmail = mail;
        console.log('open_uploader: ' + self.currentEmail );
        $("div#uploader_div").show();
        self.vue.is_uploading = true;
    };

    self.close_uploader = function (text) {
        $("div#uploader_div").hide();
        self.vue.is_uploading = false;
        $("input#file_input").val(""); // This clears the file choice once uploaded.

    };

    self.upload_file = function (event) {
        // Reads the file.
        // jQuery.ajaxSetup({async:false}); //temp fix to force non async thus allowing document.location.reload()
        //reload after upload
        var input = event.target;
        var file = input.files[0];
        var reader = new FileReader();
        reader.addEventListener("load",function(){
            self.vue.img_url= reader.results;
        },false);