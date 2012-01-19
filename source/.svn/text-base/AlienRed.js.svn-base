/* (c) 2011 Gavin Chapman - All rights reserved */

enyo.kind({
	name: "MyApps.AlienRed",
	kind: enyo.VFlexBox,
	components: [
	
	{kind: "AppMenu", components: [
		  {caption: "About", onclick: "openAboutPage"},
		  {caption: "Donate", onclick: "donateClick"}, 
	]},

	
	/* get currently susbscribed subreddits */
	{	
		name: "getReddits",
		kind: "MyWebService",
		url: "http://www.reddit.com/reddits/.json",
		onSuccess: "gotReddits",
		onFailure: "gotRedditsFail"
	},

	/* get front page */
	{	name: "getListingCount",
		kind: "MyWebService",
		url: "http://www.reddit.com/.json?limit=25",
		onSuccess: "gotListingCount",
		onFailure: "gotListingFail",
		
	},
	
	/* set my up or down vote */
	{	name: "setVote",
		kind: "MyWebService",
		url: "http://www.reddit.com/api/vote",
		onSuccess: "voteSuccess",
		onFailure: "voteFail",
		method: "POST"
		
	},
	/* set my up or down vote */
	{	name: "savePost",
		kind: "MyWebService",
		url: "http://www.reddit.com/api/save",
		onSuccess: "saveSuccess",
		onFailure: "saveFail",
		method: "POST"
		
	},
	
	/* send a comment to reddit */
	{	name: "setComment",
		kind: "MyWebService",
		url: "http://www.reddit.com/api/comment",
		onSuccess: "commentSuccess",
		onFailure: "commentFail",
		method: "POST"
		
	},
	
	/* login */
	{	name: "getLogin",
		kind: "MyWebService",
		method: "POST",
		url: "",
		onSuccess: "loginSuccess",
		onFailure: "loginFail"
	},

	/* userInfo */
	{	name: "getUser",
		kind: "MyWebService",
		method: "GET",
		url: "http://www.reddit.com/message/unread/.json",
		onSuccess: "gotUserSuccess",
		onFailure: "gotUserFail"
	},
	
	/* browser launcher */
	{name: "AppManService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "open"},

	/* our main views */	
	{kind: "SlidingPane", flex: 1, dismissDistance: 0, name: "feedSlidingPane", components: [
	
		/* The subreddit listing */
		{flex: 1,  layoutKind: "VFlexLayout", style: "background-color: white;", components: [
			{layoutKind: "HFlexLayout", style: "margin: 0px; padding: 5px; background-color: white;", components:[
				{kind: "Button", flex: 1, caption: "Login", onclick: "openLoginPrompt", name:"loginButton", className: "enyo-button-affirmative"},
				{kind: "Button", flex: 1, caption: "Logout", onclick: "clearLogin", name: "logoutButton", className: "enyo-button-negative"},
			]},
			{layoutKind: "HFlexLayout", style: "margin: 0px; padding: 5px; padding-top: 0px; background-color: white;", components:[
				{kind: "Button", flex: 1, caption: "Inbox", onclick: "inboxPressed", name: "inboxButton", style:"background-color: #999999; color: white;"},
			]},
			{kind: "Divider", className: "alienRed-divider", caption: "Subreddits"},
			{name: "subredditListing", onSubredditClick: "subredditClick", kind: "MyApps.AlienRedSubredditListing", flex: 1},
		]},
		
		/* main links listing */
		{name: "listing", onChangeSort: "changeListingSort", onRefreshListing: "cleanListing", onListingPage: "listingPage", onListingClick: "listingClick", kind: "MyApps.AlienRedListing", flex: 3, peekWidth: 0},
		
		/* story pane, consists of two panes */
		{name: "storyPanel", showing: false, kind: enyo.SlidingView, onResize: "resizeStoryPane", dismissible: true, flex: 2, peekWidth: 0,
			components: [
				{kind: enyo.Pane,  name: "contentPane", flex: 1, components: [
				
					/* web view, with web buttons in toolbar */
					{layoutKind: "VFlexLayout", flex: 1, style: "background-color: white", name:"storyWebPane", components: [
						{kind: enyo.Toolbar, className: "alienRed_ToolBar", components:[
							{kind: "ToolButtonGroup", name: "browserPaneToolbar", components: [
								{name:"webviewBackButton", kind: "IconButton", icon: "images/backIcon.png", onclick:"webviewBack"},
								{name:"webviewFwdButton",kind: "IconButton", icon: "images/forwardIcon.png", onclick:"webviewFwd"},
								{kind: "IconButton", icon: "images/refreshIcon.png", onclick:"webviewRefresh"},

							]},
							{name: "browserIcon",kind: "IconButton", icon: "images/browserIcon.png", onclick:"openInBrowser"},
							{name: "webPaneTitle", flex: 1, kind:"HtmlContent", content: "", style:"text-align: right; height: 18px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; font-weight: bold; font-size: 14px; padding-left: 1em; padding-right: 1em; color: white"},
						]},
						{kind: "ProgressBar", animationPosition: false, name: "webviewProgressBar"},
						{name: "storyPane", 
							url:"blank.html",
							flex: 1,
							autoHorizontal: false,
							onPageTitleChanged:"webviewTitleChanged", 
							style: "overflow: show",
							onLoadComplete: "webviewStop", 
							onLoadProgress: "webviewProgress", 
							onLoadStarted: "webviewLoad",
							enableJavascript: true,
							acceptCookies: true,
							minFontSize: 12,
							kind: "WebView",
							url: "about:blank"
						},
					]},
					
					/* comments listing (imported from other file) */
					{name: "commentsPane", layoutKind: enyo.VFlexLayout, enableJavascript: true, acceptCookies: true,minFontSize: 12, flex: 1, style:"padding: 0em; background-color: white", components:[
							{name: "commentsListing",  flex: 1, kind: "MyApps.AlienRedCommentsListing"},						
					]},
				]},
											
				/* bottom toolbar */
				{kind: enyo.Toolbar, className: "alienRed_ToolBar", components: [
					{kind: enyo.GrabButton},
					//{kind: "Spacer"},
					
					{kind: "RadioToolButtonGroup", name: "storyPaneToolbar", components: [
						{icon: "images/storyIcon.png",  onclick: "showStory", name: "showStoryButton"},
						{icon: "images/commentsIcon.png", onclick: "showComments", name: "showCommentsButton"},						
					]},
					{
					  kind: "Picker",
					  value: "0",
					  style: "color: white",
					  onChange: "changeCommentSort",
					  items: [
						{caption:"Hot",value: "0"},
						{caption:"New",value: "1"},
						{caption:"Controversial",value: "2"},
						{caption:"Top",value: "3"},
						{caption:"Old",value: "4"},
						{caption:"Best",value: "5"},
					  ],
					},
					{kind: enyo.Spinner, align: "center", pack: "center", name: "storySpinner"},
					{kind: "Spacer"},
					{kind: "ToolButtonGroup", components: [
						//{kind: "IconButton", icon: "images/shareIcon.png", onclick: "sharePressed"},
						{kind: "IconButton", icon: "images/upvoteIcon.png", onclick: "upvotePressed"},
						{kind: "IconButton", icon: "images/downvoteIcon.png", onclick: "downvotePressed"},
						{kind: "IconButton", icon: "images/saveIcon.png", onclick: "savePressed"},
						{kind: "IconButton", icon: "images/addCommentIcon.png", onclick: "commentPressed"},							
						{kind: "IconButton", icon: "images/commentsRefreshIcon.png", onclick: "commentRefresh"},							
					]},
					
				]},
			],
		},
	]},

	/* inbox toaster */
	{kind: "MyApps.AlienRedInbox", name: "inboxToaster", onLoadCommentsContext: "loadCommentsContext", layoutKind: enyo.VFlexLayout, flyInFrom: "right", style: "top: 0px; bottom: 0px; width: 70%", lazy: false},

	/* login dialogue box */	
	{name: "loginPopup", kind: "Popup", scrim:true, components: [
		{kind: "RowGroup", caption: "Log in to Reddit", components:[
			{kind: "Input", hint: "Username", name: "loginUser"},
			{kind: "PasswordInput", hint: "Password", name: "loginPass"},
		]},		
		{kind: "Button", caption: "  OK  ", onclick: "loginOK", className: "enyo-button-affirmative"},
		{kind: "Button", caption: "Cancel", onclick: "loginCancel", className: "enyo-button-negative"}
	]},
	
	/* about popup */
	{name: "aboutPopup", kind: "Popup", scrim:true, scrim:true, components: [
		{kind: "HtmlContent", style: "line-height: 1.5em;", content: "<strong>AlienRed 1.1.0</strong><br>&copy; 2011 Subether Studios<br>All Rights Reserved"},
		{kind: "Button", caption: "OK", onclick: "aboutOK", className: "enyo-button-affirmative"},
		
	]},
	/* comment dialog box */
	{name: "commentPopup", lazy: false, modal:true, scrim:true, onClose:"commentCancel", kind: "Popup", style: "width: 50%;", components: [
		{content: "Comment on link", style: "padding-left: 10px"},
		{layoutKind: "VFlexLayout", pack: "center", components: [
			{kind: "Scroller", style:"height: 200px", components: [
				{kind: "RichText", name: "commentText", richContent: false,alwaysLooksFocused:true},
			]},
			{layoutKind: "HFlexLayout", components: [
				{kind: "Spacer"},
				{kind: "Button", caption: "OK", onclick: "commentOK", className: "enyo-button-affirmative"},
				{kind: "Button", caption: "Cancel", onclick: "commentCancel", className: "enyo-button-negative"},
			]},
			{kind: "Spinner", name: "commentPopupSpinner", align: "center"}
		]}
	]},
	
	/* error panel, used if recieve invalid logins */
	{name: "errorBox", kind: "ModalDialog", layoutKind: "VFlexLayout", caption: "Dialog Title", components: [
		{kind: "Button", onclick: "dismissError", caption: "OK"}
	]},
	
	],
	
	openAboutPage: function(){
		this.$.aboutPopup.openAtCenter();	
	},	
	
	aboutOK: function(){
		this.$.aboutPopup.close();	
	},
	
	donateClick: function(){
		this.$.AppManService.call({target: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2HTMWUPN4QQDN"});	
	},
	
	openInBrowser: function(){
		enyo.log(this.currentListingView);
		this.$.AppManService.call({target: this.currentListingView.url});	
	},
	
	/* inbox functions */
	inboxPressed: function(){
		this.$.inboxToaster.open();
		this.$.inboxToaster.loadInbox();
	},
	
	/* comments loading from inbox */
	loadCommentsContext: function(inSender, inUrl){
		this.$.storyPaneToolbar.hide();
		this.$.browserPaneToolbar.hide();
		this.$.storyPane.setUrl("about:blank");
		this.$.storyPanel.show();
		this.$.commentsListing.loadUrl("http://www.reddit.com"+inUrl);
		this.$.inboxToaster.hide();
		this.$.contentPane.selectView(this.$.commentsPane);
	},
	
	/* sorting */
	changeListingSort: function(inSender, inIndex){
		//enyo.log(inIndex);
		this.listingSort=this.listingSortArray[inIndex];
		//enyo.log("Sorting: "+this.listingSort);
		this.cleanListing();
	},

	changeCommentSort: function(inSender){
		this.commentSort=this.commentSortArray[inSender.getValue()];
		this.$.commentsListing.loadUrl("http://www.reddit.com"+this.listing[this.currentLinkIndex].data.permalink+".json?sort="+this.commentSort+"&limit=500",this.selftext);
		//enyo.log(this.commentSort);
	},
	
	/* save button pressed */
	savePressed: function(){
		this.$.savePost.call({"id": this.currentID,"uh":this.modHash});
	},
	
	/* save callbacks */
	saveSuccess: function(inSender, inResponse, inRequest){
		enyo.windows.addBannerMessage("Saved to your save list", "{}");
	},
	
	saveFail: function(inSender){
		//enyo.log(inSender);
		enyo.windows.addBannerMessage("Save may not have worked, could not contact reddit.com", "{}");
	},
	
	/* homepage comments functions */
	commentPressed: function(){
		this.$.commentPopup.openAtCenter();	
	},
	commentCancel: function(){
		this.$.commentPopup.close();	
	},
	
	commentRefresh: function(){
		this.$.commentsListing.loadUrl();
	},
	
	commentOK: function(){
		this.$.commentPopupSpinner.show();
		this.$.setComment.call({"parent": this.currentID, "text":this.$.commentText.getValue(), "uh": this.modHash});
	},
	
	/* comment callbacks */
	commentSuccess: function(){
		this.$.commentPopup.close();
		this.$.commentPopupSpinner.hide();	
		this.$.commentsListing.loadUrl(null,this.selftext);
		this.$.getComments.call();
		this.$.commentText.setValue("");
		enyo.windows.addBannerMessage("Comment added", "{}");
	},
	commentFail: function(){
		this.$.commentPopup.close();	
		this.$.commentPopupSpinner.hide();	
		enyo.windows.addBannerMessage("Comment failure, could not contact reddit.com", "{}");
	},
	
	/* voting functions */	
	upvotePressed: function(){
		//enyo.log(this.currentListingView);
		if(this.currentListingView.likes==false)
		{
			this.$.setVote.call({"id": this.currentID,"dir":"0","uh":this.modHash});
			if(this.currentLinkIndex>=0)
				this.listing[this.currentLinkIndex].data.likes=null;
		}else{
			this.$.setVote.call({"id": this.currentID,"dir":"1","uh":this.modHash});
			if(this.currentLinkIndex>=0)
				this.listing[this.currentLinkIndex].data.likes=true;
		}
		//enyo.log("UV:"+this.listing[this.currentLinkIndex].data.likes);
	},
	downvotePressed: function(){
		if(this.currentListingView.likes==true)
		{
			this.$.setVote.call({"id": this.currentID,"dir":"0","uh":this.modHash});
			if(this.currentLinkIndex>=0)
				this.listing[this.currentLinkIndex].data.likes=null;
		}else{
			this.$.setVote.call({"id": this.currentID,"dir":"-1","uh":this.modHash});
			if(this.currentLinkIndex>=0)
				this.listing[this.currentLinkIndex].data.likes=false;
		}
			
		//enyo.log("DV:"+this.listing[this.currentLinkIndex].data.likes);
	
	},
	
	/* vote callbacks */
	voteSuccess: function(inSender, inResponse, inRequest){
		enyo.windows.addBannerMessage("Vote registered", "{}");
		this.$.listing.$.list.refresh();
		//this.cleanListing();
	},
	
	voteFail: function(){
		enyo.log("Vote failed");			
		enyo.windows.addBannerMessage("Vote did not register, could not contact reddit.com", "{}");
	},

	/* webview functions */
	webviewLoad: function(){
		this.$.webviewProgressBar.show();
	},
	
	webviewRefresh: function(){
		this.$.storyPane.reloadPage();
	},
	
	webviewTitleChanged: function(inView, inTitle, inUrl, goBack, goForwards){
		/*enyo.log(">>>>>>>>>> PAGE TITLE CHANGED <<<<<<<<<<<<");
		enyo.log(inUrl);
		enyo.log(inTitle);
		enyo.log("back: "+goBack);
		enyo.log("fwd: "+goForwards);
		enyo.log(">>>>>>>>>> Title end <<<<<<<<<<");
		*/
		this.$.webviewBackButton.hide();
		this.$.webviewFwdButton.hide()
		if(goBack)
			this.$.webviewBackButton.show();
		if(goForwards)
			this.$.webviewFwdButton.show();
			
		this.$.webPaneTitle.setContent(inTitle);
	},
		
	webviewStop: function(){

		this.$.webviewProgressBar.hide();
	},
	webviewProgress: function(inProgress, inPer){
		this.$.webviewProgressBar.setPositionImmediate(inPer);
	},
	
	webviewBack: function(){
		this.$.storyPane.goBack();	
	},
	webviewFwd: function(){
		this.$.storyPane.goForward();	
	},
	
	/* main listing	list callback */
	listingPage: function(inSender, inPage){
		index=inSender.$.list.pageSize*inPage;
		//this.$.tingText.setContent(this.currentReddit);
		if(index>=0 && !this.listing[index])
		{
			
			this.$.listing.$.spinner.show();
			this.$.getListingCount.setUrl("http://www.reddit.com/"+this.currentReddit+this.listingSort+".json?limit=25&count="+index+"&after="+this.after);
			this.$.getListingCount.call();
			
		}
	},
	
	
	showStory: function(){
		this.$.contentPane.selectView(this.$.storyWebPane);	
	},
	showComments: function(){
		this.$.contentPane.selectView(this.$.commentsPane);	
	},

	/* login functions */
	setLoginButtons: function(){
		if(enyo.getCookie("reddit_session")==null)
		{
			this.$.loginButton.show();
			this.$.logoutButton.hide();
			this.$.inboxButton.hide();
		}
		else
		{
			this.$.loginButton.hide();
			this.$.logoutButton.show();
			this.$.inboxButton.show();
		}
	},
	
	loginOK: function(){
		user=this.$.loginUser.getValue();
		pass=this.$.loginPass.getValue();
		
		//this.$.subredditListing.$.scroller.scrollIntoView(0,0);
		this.$.getLogin.setUrl("http://www.reddit.com/api/login/"+user);
		this.$.getLogin.call({"user":user,"passwd":pass,"api_type":"json"});
	
		this.$.loginPopup.close();	
	},
	
	loginCancel: function(){
		this.$.loginPopup.close();	
	},
	
	/* user info */
	gotUserSuccess: function(inSender, inResponse, inRequest){
		//enyo.log(inResponse);
		//enyo.log("Mail items:"+inResponse.data.children.length);
		if(inResponse.data.children.length>0)
		{
			//enyo.windows.addBannerMessage("You have mail", "{}");
			this.$.inboxButton.applyStyle("background-color","orangered");
		}
		else
			this.$.inboxButton.applyStyle("background-color","#999999");
			
		this.$.inboxButton.setCaption("Inbox ("+inResponse.data.children.length+")");
	},
	
	gotUserFail: function(){
		enyo.windows.addBannerMessage("Could not contact Reddit.com", "{}");
	},
	
	/* login callbacks */
	clearLogin: function(){
		enyo.setCookie("reddit_session",null,{ "Max-Age": 0 });
		this.modHash="";
		//this.$.subredditListing.$.scroller.scrollIntoView(0,0);
		this.$.subredditListing.showSelected(-1);

		this.callSubreddits();
		this.cleanListing();
		this.setLoginButtons();
		enyo.windows.addBannerMessage("Logged out OK", "{}");
	},

	loginSuccess: function(inSender, inResponse, inRequest){	
		enyo.log(inRequest);
		this.$.subredditListing.showSelected(-1);
		if(inResponse.json.errors.length>0)
		{
			this.$.errorBox.openAtCenter();
			this.$.errorBox.setCaption(inResponse.json.errors[0][1]);
		}
		else
		{
			
			enyo.setCookie("reddit_session",inResponse.json.data.cookie);
			this.modHash=inResponse.json.data.modhash;
			this.loggedinUser=inRequest.params.user;
			enyo.setCookie("modhash",this.modHash);
			enyo.setCookie("loggedinUser",inRequest.params.user);
			enyo.log("Modhash: "+this.modHash);
			enyo.log("Logged in as: "+this.loggedinUser);
			this.callSubreddits();
			this.cleanListing();		
			enyo.windows.addBannerMessage("Logged in OK", "{}");
			this.$.getUser.call();
	
		}
		this.setLoginButtons();

	},
	
	loginFail: function(inSender, inResponse, inRequest){
		enyo.windows.addBannerMessage("Could not contact reddit.com", "{}");
	},

	/* errorBox button click*/
	dismissError: function(){
		this.$.errorBox.close();
	},
	
	
	/* main listing callbacks */
	gotListing: function(inSender, inResponse, inRequest){
		this.listing = [];
		this.listing = inResponse.data.children;
		this.after=inResponse.data.after;
		this.$.subredditText.setContent(this.currentReddit);
		this.cleanListing();
		this.$.listing.hideScrim();
	},
	
	gotListingFail: function(){
		//enyo.log("got failure from getFeed");
		enyo.windows.addBannerMessage("Listing failure, could not contact reddit.com", "{}");
	},

	gotListingCount: function(inSender, inResponse, inRequest){
		this.listing = this.listing.concat(inResponse.data.children);
		this.$.listing.$.list.refresh();
		this.after=inResponse.data.after;
		this.$.listing.$.spinner.hide();

	},

	/* get subreddits */
	callSubreddits: function(){
		this.$.subredditListing.showScrim();
		this.subreddits=[];
			
		if(enyo.getCookie("reddit_session")==null)
		{
			//enyo.log("No cookie");
			this.$.getReddits.setUrl("http://www.reddit.com/reddits/.json");
		}
		else
		{
			//enyo.log("Cookies!");
			this.$.getReddits.setUrl("http://www.reddit.com/reddits/mine.json");
		}
		this.$.getReddits.call();
	
	},
	
	/* subreddits callbacks */
	gotReddits: function(inSender, inResponse, inRequest){
			//enyo.log(inSender);
			if(inResponse.data.children)
			{
				for(x in inResponse.data.children)
					this.subreddits.push(inResponse.data.children[x]);
			}
			if(inResponse.data.after && enyo.getCookie("reddit_session")!=null)
			{
				//enyo.log(inResponse.data.after);
				//enyo.log("Called");
				
				this.$.getReddits.setUrl("http://www.reddit.com/reddits/mine.json?after="+inResponse.data.after);
				this.$.getReddits.call();
				
			}
			else
			{
				subreddit_quick_sort(this.subreddits);	
				if(enyo.getCookie("reddit_session")!=null)
				{
					this.subreddits=[{
						"kind": "t5",
							"data": {
								"display_name": "* All",
								"name": "",
								"title": "All",
								"url": "/r/all/",
							}
						},
						{
						"kind": "t5",
							"data": {
								"display_name": "* Front page",
								"name": "",
								"title": "Front page",
								"url": "/",
							}
						},
						{
						"kind": "t5",
							"data": {
								"display_name": "* Saved",
								"name": "",
								"title": "Saved",
								"url": "/saved/",
							}
						},
						{
						"kind": "t5",
							"data": {
								"display_name": "* Submitted",
								"name": "",
								"title": "Saved",
								"url": "/user/"+this.loggedinUser+"/submitted/",
							}
						}
					].concat(this.subreddits);
				}
				else
				{
					this.subreddits=[{
						"kind": "t5",
							"data": {
								"display_name": "* All",
								"name": "",
								"title": "All",
								"url": "/r/all/",
							}
						},
						{
						"kind": "t5",
							"data": {
								"display_name": "* Front page",
								"name": "",
								"title": "Front page",
								"url": "/",
							}
						}
					].concat(this.subreddits);			}
				//enyo.log(this.subreddits);	
				this.$.subredditListing.$.list.punt();
				this.$.subredditListing.hideScrim();	
			}
	},
	
	gotRedditsFail: function(){
		enyo.windows.addBannerMessage("Could not contact reddit.com", "{}");
	},
	
	/* go to the main front page and refresh */
	gotoFrontPage: function(){
		this.$.subredditListing.showSelected(-1);
		//this.$.subredditListing.$.scroller.scrollIntoView(0,0);
        this.currentReddit="/";
		this.callSubreddits();
		this.cleanListing();
	},
	
	/* clean the listing */
	cleanListing: function(){
		this.listing=[];
		this.after="";
		this.$.listing.$.list.punt();
	},
	
	/* show login window */	
	openLoginPrompt: function(){
		enyo.scrim.show();
		this.$.loginPopup.openAtCenter();	
	},
	
	/* on clicking a subreddit load links */
	subredditClick: function(inSender, inEvent){
		url = this.subreddits[inEvent.rowIndex].data.url;
		this.$.subredditListing.showSelected(inEvent.rowIndex);
        this.currentReddit=url;
		this.cleanListing();
		this.$.getUser.call();
		this.currentLinkIndex=-1;
	},
	
	/* on clicking a main listing item load in window */
	listingClick: function(inSender, inEvent){
		this.$.getUser.call();
		this.$.storyPanel.show();
		if(this.listing[inEvent.rowIndex].data.is_self)
		{
			this.$.storyPaneToolbar.hide();
			this.$.browserPaneToolbar.hide();
			this.selftext=this.listing[inEvent.rowIndex].data.selftext_html;
			this.$.storyPane.setUrl("about:blank");
			this.$.commentsListing.loadUrl("http://www.reddit.com"+this.listing[inEvent.rowIndex].data.permalink+".json?sort="+this.commentSort+"&limit=500",this.selftext);
			this.$.contentPane.selectView(this.$.commentsPane);

		}
		else
		{
			this.selftext="";
			this.$.storyPaneToolbar.setValue(0);
			this.$.contentPane.selectView(this.$.storyWebPane);
			this.$.storyPane.setUrl(this.listing[inEvent.rowIndex].data.url);
			this.$.commentsListing.loadUrl("http://www.reddit.com"+this.listing[inEvent.rowIndex].data.permalink+".json?sort="+this.commentSort+"&limit=500",this.selftext);

			this.$.browserPaneToolbar.show();
			this.$.storyPaneToolbar.show();
		}
		this.currentLinkIndex=inEvent.rowIndex;
		this.currentListingView=this.listing[inEvent.rowIndex].data;
		this.currentID=this.listing[inEvent.rowIndex].data.name;
		this.$.listing.$.list.refresh();
	},

	/* initialisation functions */
	create: function() {
	  this.listingSort="";
	  this.listingSortArray=["","/new/","/controversial/","/top/"];
	  this.commentSortArray=["hot","new","controversial","top","old","confidence"];
	  this.commentSort="hot";
	  this.inherited(arguments);
	  this.subreddits = [];
	  this.selectedSubreddit=-1;
	  this.listing = [];
	  this.comments=[];
	  this.requestQueue = [];
	  this.selftext="";
	  this.after = "";
	  this.before = "";
	  this.currentPage = 0;
	  this.currentReddit="/";
	  this.currentID="";
	  this.modHash="";
	  this.loggedinUser="";
	  this.currentLinkIndex=-1;
	  this.currentListingView=[];
	},
	
	
	ready: function() {	
		this.callSubreddits();
		this.setLoginButtons();
		this.$.webviewProgressBar.hide();
		this.modHash=enyo.getCookie("modhash");
		this.loggedinUser=enyo.getCookie("loggedinUser");
		this.$.storyPane.setUrl(enyo.fetchAppRootPath() + "/blank.html");
		//this.$.storyPane.
		if(this.modHash)
			this.$.getUser.call();
		
	},	
});


