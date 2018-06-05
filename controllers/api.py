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
