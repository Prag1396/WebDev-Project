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
    };# Here go your api methods.
