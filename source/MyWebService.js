/* (c) 2011 Gavin Chapman - All rights reserved */

enyo.kind(
		{	
		name: "MyWebService",
		kind: "WebService",
		call: function(){
			this.cancel();
			this.setHeaders({"Cookie":"reddit_session="+enyo.getCookie("reddit_session")});
			this.setHeaders({"Origin":"http://www.reddit.com"});
			this.inherited(arguments);	
		}

});