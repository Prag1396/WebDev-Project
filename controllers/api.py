# Here go your api methods.
import json

def get_posts():
    data = json.loads(request.vars.filter)

    dbPosts = db(db.form).select()
    posts = []


    for i in dbPosts.sort(lambda i: i.updated_on):
        t = dict(
            id=i.id,
            email=i.contact_email,
            title=i.organization,
            memo=i.opportunity,
            time=i.updated_on,
        )
        posts.append(t)

    return response.json(dict(posts=posts))

def user():
    if request.args(0) == 'profile':
        for field in auth.settings.extra_fields['auth_user']:
            field.readable = field.writable = True
    return dict(form=auth())
