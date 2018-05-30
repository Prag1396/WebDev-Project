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

# Hello Geo

db.define_table('categories',
                Field('children', 'boolean', label='Children', default=True),
                Field('community', 'boolean', default=False),
                Field('education', 'boolean'),
                Field('environment', 'boolean'),
                Field('senior', 'boolean')
                )

db.define_table('opportunities',
                Field('title', label='Company Name'),
                # Field('author', 'reference companies'),
                Field('memo', 'text', label='Description'),
                Field('updated_on', 'datetime', update=datetime.datetime.utcnow()),
                Field('local_categories', 'reference categories', label="Category")
                )

db.define_table('main',
                Field('title', label='Company Name'),
                Field('memo', 'text', label='Description'),
                Field('updated_on', 'datetime', update=datetime.datetime.utcnow()),
                Field('local_categories', 'reference categories', label="Category")
                )

db.opportunities.updated_on.writable = db.opportunities.updated_on.readable = False
db.opportunities.id.writable = db.opportunities.id.readable = False



# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)
