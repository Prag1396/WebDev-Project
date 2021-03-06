# Here go your api methods.
import json

def go_contact():
    print(request.args)
    session.data = 'yes'
    redirect(URL('default', 'contact')) 

def get_posts():

    if request.vars.filter is None:
        return get_all()

    # List of strings of search request
    search = request.vars.search.split()
    # Create a T/F list of the filters to determine which items we will send back
    data_bool = dataToBoolean(json.loads(request.vars.filter))              

    dbPosts = db((db.form.community == True) |
                 (db.form.women == True) |
                 (db.form.fostercare == True) |
                 (db.form.homeless == True) |
                 (db.form.handm == True) |
                 (db.form.senior == True)
                 ).select()
            
    posts = []

    for i in dbPosts.sort(lambda i: i.updated_on):
        if(shouldSendBack(i, data_bool) == True and containsSearch(i, search)):
            t = dict(
                id=i.id,
                name=i.organization,
                title=i.job_title,
                description=i.opportunity,
                link=i.link,
                contact_email=i.contact_email,
            )
            posts.append(t)
    return response.json(dict(posts=posts))

def input_posts():
    data_bool = dataToBoolean(json.loads(request.vars.filter))  
    db.form.insert( organization=request.vars.name,
                    job_title=request.vars.title,
                    opportunity=request.vars.description,
                    link=request.vars.link,
                    contact_email=request.vars.contact_email,
                    community=data_bool[0],
                    women=data_bool[1],
                    fostercare=data_bool[2],
                    homeless=data_bool[3],
                    handm=data_bool[4],
                    senior=data_bool[5],
                    )

    return dict()                
        

def dataToBoolean(data):
    data_bool = [False,False,False,False,False,False]
    for i in data:
        if i == "community":
            data_bool[0] = True
        elif i == "women":
            data_bool[1] = True
        elif i == "foster":
            data_bool[2] = True
        elif i == "homelessness":
            data_bool[3] = True
        elif i == "health":
            data_bool[4] = True
        elif i == "senior":
            data_bool[5] = True  
    return data_bool

def shouldSendBack(item, data_bool):
    if item.community == data_bool[0] == True:
        return True
    if item.women == data_bool[1] == True:
        return True
    if item.fostercare == data_bool[2] == True:
        return True
    if item.homeless == data_bool[3] == True:
        return True
    if item.handm == data_bool[4] == True:
        return True
    if item.senior == data_bool[5] == True:
        return True 
    return False

def containsSearch(item, search):
    if not search:
        return True
    for word in search:
        if word.lower() in item.job_title.lower():
            return True
    return False

def get_all():
    dbPosts = db().select(db.form.ALL)
            
    posts = []

    for i in dbPosts.sort(lambda i: i.updated_on):
        t = dict(
            id=i.id,
            name=i.organization,
            title=i.job_title,
            description=i.opportunity,
            link=i.link,
            contact_email=i.contact_email,
        )
        posts.append(t)
    return response.json(dict(posts=posts))
        
def user():
    if request.args(0) == 'profile':
        for field in auth.settings.extra_fields['auth_user']:
            field.readable = field.writable = True
    return dict(form=auth())
