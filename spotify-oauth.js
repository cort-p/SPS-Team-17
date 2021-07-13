import request from "request";
var user_id = "jazvences";
var token = "Bearer BQDYr9rzh31w6kxVOlvkKBA9zibGpMH_h7QKkzgqo1r-mQ61L76wRy_dZdi5qYzkBOcj8AUQFY8XJHLLi_ZMijpbLXwu18m4StXvMDnI2MIcoLzMZAHVAquRumxzhigON3uJ8TKOL4N2jDg";
var playlists_url="https://api.spotify.com/v1/users/"+user_id+"/playlists";

request({url:playlists_url, headers:{"Authorization":token}}, function(err, res){
  if (res){
    var playlists=JSON.parse(res.body);	
      var playlist_url = playlists.items[0].href;
        request({url:playlist_url, headers:{"Authorization":token}}, function(err, res){
          if (res){
            var playlist = JSON.parse(res.body);
              console.log("playlist: " + playlist.name);
                playlist.tracks.items.forEach(function(track){
                  console.log(track.track.name); 
									    	  });
				  }
				})		
		  }
});

