/* (c) 2011 Gavin Chapman - All rights reserved */

enyo.kind({
	name: "MyApps.AlienRedListing",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
			"onListingClick": "",
			"onListingPage": "",
			"onRefreshListing": "",
			"onChangeSort": ""
	},
	components: [
		{kind: "Scrim", align: "center", pack: "center",layoutKind: "VFlexLayout", components: [
			{kind: "SpinnerLarge"}
		]},
		{name: "list", kind: "VirtualList",  flex: 1,  lookAhead: 0, pageSize: 25, onAcquirePage: "doListingPage", onSetupRow: "getListItem", components: [
			{kind: "Item", tapHighlight: true, confirmCaption: enyo._$L("Up Vote"),cancelCaption: enyo._$L("Down Vote"), onConfirm: "deleteItem", onclick: "doListingClick", layoutKind: "HFlexLayout", style: "color: black", components: [
				{layoutKind: enyo.VFlexLayout, align: "center", pack: "center", style: "width: 60px;",
				components: [
					{name: "score", style: "background-color: #9999ff; color: white; border-radius: 5px; padding: 5px; font-size: 0.75em; width: 50px; text-align: center"}
				]},
				{kind: "Image", name: "thumb", style: "margin-left: 10px;"},					  
				{kind: "Control", layoutKind: "VFlexLayout", flex: 1, style: "margin-left: 10px;", components: [
					{name: "title", style: "color: blue"},
					{kind: "Control", layoutKind: "VFlexLayout",   style: "font-size: 0.65em; color: #666666", components: [
					  {name: "author", kind: "HtmlContent"},
					  {name: "comments", kind: "HtmlContent", style: "color: #6666ff"},
					 
					]},
				]}, 
			]}
		]},
		{kind: enyo.Toolbar,  className: "alienRed_ToolBar", components: [
			{kind: enyo.GrabButton},
			/*{kind: "RadioToolButtonGroup", onChange: "changeSort", components: [
				{caption: "Hot", style: "width: auto"},
				{caption: "New", style: "width: auto"},
				{caption: "Controversial", style: "width: auto"},
				{caption: "Top", style: "width: auto"},
			]}*/
			{
			  kind: "Picker",
			  value: "0",
			  style: "color: white",
			  onChange: "changeSort",
			  items: [
			  	{caption:"Hot",value: "0"},
			  	{caption:"New",value: "1"},
			  	{caption:"Controversial",value: "2"},
			  	{caption:"Top",value: "3"},
			  ],
			},
			{kind: enyo.Spacer},	
			{kind: enyo.Spinner},
			{kind: enyo.Spacer},
			{kind: "ToolButtonGroup", name: "browserPaneToolbar", components: [
				//{kind: "IconButton", icon: "images/addCommentIcon.png", onclick: "openSubmitPopup", style: "color: white;"},
				{kind: "IconButton", icon: "images/refreshIcon.png", onclick:"doRefreshListing"},
			]},
		
					
		]},
		
		{
		kind: "Popup",
		name: "submitPopup",
		scrim: true,
		style: "width: 50%",
		components: [
			
			{kind: "RowGroup", caption: "Add Link/URL", components:[
				{kind: "Input", hint: "Title", name: "loginUser",}, 
				{kind: "RichText", maxTextHeight: "200px"},
			]},
		]}
	],
	
	openSubmitPopup: function(){
		this.$.submitPopup.openAtCenter();
	},
	
	changeSort: function(inSender){
		//enyo.log("Changed");
		this.doChangeSort(this.$.picker.getValue());	
	},
	

	showScrim: function(){
		this.$.scrim.show();	
		this.$.spinnerLarge.show();	
	},
	hideScrim: function(){
		this.$.scrim.hide();	
		this.$.spinnerLarge.hide();	
	},

	getListItem: function(inSender, inIndex) {
	var r = this.owner.listing[inIndex];
	if (r) {
		this.$.title.setContent(fixHtml(enyo.string.removeHtml(r.data.title)));
			enyo.log(r.data.thumbnail);

			this.$.thumb.setSrc(r.data.thumbnail);
			if(r.data.thumbnail=="self")
				this.$.thumb.setSrc("http://www.reddit.com/static/self_default2.png");
			if(r.data.thumbnail=="default")
				this.$.thumb.setSrc("http://www.reddit.com/static/noimage.png");
			if(r.data.thumbnail=="nsfw")
				this.$.thumb.setSrc("http://www.reddit.com/static/nsfw2.png");
				
		
			//if(r.data.thumbnail.indexOf("/")<=0) 
			//	this.$.thumb.setSrc("http://www.reddit.com/"+r.data.thumbnail);

				
				
			if(r.data.likes==true)
				this.$.score.applyStyle("background-color","#ff6600");
			else if (r.data.likes==false)
				this.$.score.applyStyle("background-color","#ddddFF");
			else
				this.$.score.applyStyle("background-color","#9999ff");
				
			
			this.$.item.removeClass("alienRed_selected");
			this.$.item.removeClass("alienRed_unselected");
			
			if(inIndex==this.owner.currentLinkIndex){
				this.$.item.addClass("alienRed_selected");
			} else {
				this.$.item.addClass("alienRed_unselected");
			}
				
			var subreddit=r.data.permalink.substr(0,r.data.permalink.indexOf("/",3));
			
			this.$.author.setContent("(+"+r.data.ups+"/-"+r.data.downs+") Submitted by <em>"+r.data.author+"</em> to <em>"+subreddit+"</em> via <em>"+r.data.domain+"</em>");
			enyo.log(r.data.over_18);
			if(!r.data.over_18)
				this.$.comments.setContent(r.data.num_comments+" comments - submitted "+formatTimeSince(r.data.created_utc));
			else
				this.$.comments.setContent(r.data.num_comments+" comments - <span style='color: red'>NSFW</span> - submitted "+formatTimeSince(r.data.created_utc));
			
			this.$.score.setContent(r.data.score);

			return true;
	  }
	},	
});


