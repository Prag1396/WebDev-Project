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

