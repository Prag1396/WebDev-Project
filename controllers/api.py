# Here go your api methods.
def get_posts():
    dbPosts = db(db.volunteer_post).select()
    posts = []

    for i in dbPosts.sort(lambda i: i.updated_on):
        t = dict(
            id=i.id,
            email=i.user_email,
            title=i.title,
            memo=i.memo,
            time=i.updated_on,
        )
        posts.append(t)

    return response.json(dict(posts=posts))

def user():
    if request.args(0) == 'profile':
        for field in auth.settings.extra_fields['auth_user']:
            field.readable = field.writable = True
    return dict(form=auth())

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