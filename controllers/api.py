<<<<<<< HEAD

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
=======
# Here go your api methods.

def get_posts():
    post_db = db(db.form).select()
    posts = []

    print(post_db)

    for post in post_db:
        t = dict(
            id=post.id,
            organization=post.organization,
            opportunity=post.opportunity,
            impact=post.impact,
            major=post.major,
            link=post.link
        )
        posts.append(t)

    return response.json(dict(posts=posts))

>>>>>>> 325ce16a6a8a2a3d2d136a42664ab33ba41040fa
