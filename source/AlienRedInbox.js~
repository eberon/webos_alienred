/* (c) 2011 Gavin Chapman - All rights reserved */

enyo.kind({
	name: "MyApps.AlienRedInbox",
	kind: enyo.Toaster,
	events: {
//			"onListingClick": "",
//			"onListingPage": "",
//			"onRefreshListing": ""
			onLoadCommentsContext: "",
	},
	style: "",
	components: [
		{	
			/* load inbox */
			name: "getInbox",
			kind: "MyWebService",
			url: "http://www.reddit.com/message/inbox/.json",
			onSuccess: "gotInbox",
			onFailure: "gotInboxFail",
			method: "GET"
		},
		{	
			/* load inbox */
			name: "markReadUnread",
			kind: "MyWebService",
			//onSuccess: "gotInbox",
			//onFailure: "gotInboxFail",
			method: "POST"
		},
	
	
		{className: "enyo-sliding-view-shadow"},
			{name: "list", kind: "VirtualList", style: "background-color: white; -webkit-transform:translate3d(0,0,0)", flex: 1, onSetupRow: "getListItem",lazy: false, components: [
				{kind: "Item", lazy: false, onclick: "itemClick", layoutKind: "VFlexLayout", flex: 1, tapHighlight: true, style: "background-color: white; font-size: 0.7em;", components:[
					{name: "subject", style:"color: #0033ff", kind: "HtmlContent"},
					{name: "body", kind: "HtmlContent"},
					{name: "itemButtons", layoutKind: enyo.HFlexLayout, showing:false, style: "margin-top: 10px", components:[
						{kind: "Button", caption: "Mark Read", name: "markRead", className: "alienRed_smallButton", onclick: "readPressed"},
						{kind: "Button", caption: "Mark Unread", name: "markUnread", className: "alienRed_smallButton", onclick: "readPressed"},
						//{kind: "Button", caption: "Reply", className: "alienRed_smallButton", onclick: "replyPressed"},
						{kind: "Button", caption: "Context", name:"contextButton", className: "alienRed_smallButton", onclick: "contextPressed"}
					]},
				]},
			]},
		{kind: enyo.Toolbar, className: "alienRed_ToolBar", pack: "center",  align: "center", components: [  
			{kind: enyo.GrabButton, slidingHandler: true}, 
			{kind: enyo.Spinner},
			{kind: enyo.Spacer},
			{kind: "IconButton", icon: "images/refreshIcon.png", onclick:"loadInbox"},
	
		]},   

	],

	readPressed: function(){
		//enyo.log(event.rowIndex);
		if(this.inboxListing[event.rowIndex].data.new)
		{
			this.$.markReadUnread.setUrl("http://www.reddit.com/api/read_message");
			//enyo.log({"id":this.inboxListing[event.rowIndex].data.name,"uh":this.owner.modhash});
			this.$.markReadUnread.call({"id":this.inboxListing[event.rowIndex].data.name,"uh":this.owner.modHash});
		}
		else
		{
			this.$.markReadUnread.setUrl("http://www.reddit.com/api/unread_message");
			//enyo.log({"id":this.inboxListing[event.rowIndex].data.name,"uh":this.owner.modhash});
			this.$.markReadUnread.call({"id":this.inboxListing[event.rowIndex].data.name,"uh":this.owner.modHash});
		}
		this.inboxListing[event.rowIndex].data.new=!this.inboxListing[event.rowIndex].data.new;
		this.$.list.refresh();
		this.owner.$.getUser.call();
		//event.stopPropagation();
	},
	replyPressed: function(e){

		event.stopPropagation()
	},
	
	contextPressed: function(){
			this.doLoadCommentsContext(this.inboxListing[event.rowIndex].data.context.replace("?",".json?"));
	},

	loadInbox: function(){
		this.inboxListing=[];
		this.$.spinner.show();
		this.$.getInbox.call();
		this.owner.$.getUser.call();
	},
	
	itemClick: function(inSender,inRequest){
		if(this.$.itemButtons.showing)
			this.$.itemButtons.hide();	
		else
			this.$.itemButtons.show();
		
	},
	
	gotInbox: function(inSender, inResponse, inRequest){
		for(x in inResponse.data.children){
			this.inboxListing.push(inResponse.data.children[x])	
		}
		this.$.spinner.hide();
		this.$.list.punt();
		
	},
	
	gotInboxFail: function(){
		//enyo.log("Failed to get Inbox");	
		enyo.windows.addBannerMessage("Could not contact Reddit.com", "{}");
	},
	
	ready: function(){
		this.inboxListing=[];
		
		//this.dateFmt=new enyo.g11n.DateFmt();
		
	},

	getListItem: function(inSender, inIndex) {
			

		if(this.inboxListing[inIndex])
		{
			var dateString = formatTimeSince(this.inboxListing[inIndex].data.created_utc);
			
				
			if(this.inboxListing[inIndex].data.new)
			{
				this.$.subject.applyStyle("color","orangered");
				this.$.markRead.show();
				this.$.markUnread.hide();
			}
			else
			{
				this.$.subject.applyStyle("color","#0033ff");
				this.$.markRead.hide();
				this.$.markUnread.show();
			}
			
			if(this.inboxListing[inIndex].data.context!="")
				this.$.contextButton.show();
			else
				this.$.contextButton.hide();
				
			this.$.subject.setContent("<strong>"+this.inboxListing[inIndex].data.subject+"</strong> from <strong>"+this.inboxListing[inIndex].data.author+"</strong> in <strong>"+this.inboxListing[inIndex].data.subreddit+"</strong> - "+dateString);
			this.$.body.setContent(fixHtml(this.inboxListing[inIndex].data.body_html));
			return true;	
		}
	},	
});


