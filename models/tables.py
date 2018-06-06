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
                Field('memo', 'text', label='Description'),
                Field('updated_on', 'datetime', update=datetime.datetime.utcnow()),
                Field('local_categories', 'reference categories', label="Category")
                )

db.define_table('form',
                Field('organization', 'boolean', label='Children', default=True),
                Field('opportunity', 'boolean' ),
                Field('impact', 'boolean'),
                Field('major', 'boolean'),
                Field('link', 'boolean'),
                Field('user_email', 'boolean', default=get_user_email()),
                Field('updated_on', 'datetime')
                )
# update=datetime.datetime.utcnow()

db.form.user_email.writable = False
db.form.user_email.readable = False
db.form.updated_on.writable = db.form.updated_on.readable = False
db.form.id.writable = db.form.id.readable = False



# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)
