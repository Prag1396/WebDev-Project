# Define your tables below (or better in another model file) for example
#
# >>> db.define_table('mytable', Field('myfield', 'string'))
#
# Fields can be 'string','text','password','integer','double','boolean'
#       'date','time','datetime','blob','upload', 'reference TABLENAME'
# There is an implicit 'id integer autoincrement' field
# Consult manual for more options, validators, etc.
import datetime

def get_user_email():
    return auth.user.email if auth.user is not None else None

def user():
    if request.args(0) == 'profile':
        for field in auth.settings.extra_fields['auth_user']:
            field.readable = field.writable = True
    return dict(form=auth())

# Hello Geo

db.define_table('categories',
                Field('children', 'boolean', label='Children', default=True),
                Field('community', 'boolean', default=False),
                Field('education', 'boolean'),
                Field('environment', 'boolean'),
                Field('senior', 'boolean')
                )

db.define_table('volunteer_post',
                Field('user_email', default=get_user_email()),
                Field('title', label='Company Name'),
                # Field('author', 'reference companies'),
                Field('memo', 'text', label='Description'),
                Field('memo', 'text', label='Position'),
                Field('memo', 'text', label='Responsibility'),
                Field('memo', 'text', label='Qualification'),
                Field('memo', 'text', label='Time'),
                Field('updated_on', 'datetime', update=datetime.datetime.utcnow()),
                Field('local_categories', 'reference categories', label="Category")
                )


db.volunteer_post.user_email.writable = False
db.volunteer_post.user_email.readable = False
db.volunteer_post.updated_on.writable = db.volunteer_post.updated_on.readable = False
db.volunteer_post.id.writable = db.volunteer_post.id.readable = False



# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)
