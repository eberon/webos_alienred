/* (c) 2011 Gavin Chapman  
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

enyo.kind({
	name: "MyApps.AlienRedCommentsListing",
	kind: enyo.Pane,
	layoutKind: enyo.VFlexLayout,
	events: {
			"onLoadedComments": ""
	},
	components: 
	[
		{	
			/* get comments */
			name: "getComments",
			kind: "MyWebService",
			onSuccess: "gotComments",
			onFailure: "gotCommentsFail"
		},
		{	
			/* load more comments if needed */
			name: "getMoreComments",
			kind: "MyWebService",
			url: "http://www.reddit.com/api/morechildren",
			onSuccess: "gotMoreComments",
			onFailure: "gotMoreCommentsFail",
			method: "POST"
		},
		{	
			/* add new comment on reddit */
			name: "setComment",
			kind: "MyWebService",
			url: "http://www.reddit.com/api/comment",
			onSuccess: "commentSuccess",
			onFailure: "commentFail",
			method: "POST"
			
		},
		{	
			/* up or downvote */
			name: "setVote",
			kind: "MyWebService",
			url: "http://www.reddit.com/api/vote",
			onSuccess: "voteSuccess",
			onFailure: "voteFail",
			method: "POST"
			
		},
		
		/* comment listing */
		{layoutKind: enyo.VFlexLayout, flex: 1, components:[
			{kind: "Toolbar",className: "alienRed_ToolBar", components: [
				{name: "originalTitle",  kind:"HtmlContent", flex: 1, content: "", style:"text-align: left; height: 18px; font-weight: bold; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; font-size: 14px; padding-left: 1em; padding-right: 1em; color: white"},
			]},
			{kind: "VirtualList", name: "commentList",  onSetupRow: "setupRow", flex: 1,  components: [
				{kind: "Item", name: "item", flex: 1, onclick: "commentClick",  layoutKind: "HFlexLayout" ,style: "border: none; padding: 5px; ", components: [
					{kind: "Control", name: "bgLayer", flex: 1, layoutKind: "VFlexLayout", style: "background-color: #f5f5ff; padding: 0.5em; border-radius: 1em; font-size: 0.8em", components: [
						{kind: "Control", pack: "center", align: "center", layoutKind: "HFlexLayout", components: [
							{name: "author",  style: "font-weight: normal; color: #6666ff; font-size: 0.8em", flex: 1},
							{name: "score",  style: "font-weight: normal; color: #6666ff; font-size: 0.8em",},
						]},
						{kind: "Control", pack: "center", layoutKind: "HFlexLayout", components: [
							{kind: "Spinner", name: "moreCommentSpinner"},
							{name: "comment", kind: "HtmlContent", onLinkClick: "htmlContentLinkClick", flex: 1},
						]},
						
					]},
				]},
			]},
		]},
		
		/* comment popup */
		{kind: "Popup",lazy: false, scrim:true, modal:true, onClose:"commentCancel", name: "commentsReplyPopup", layoutKind: enyo.VFlexLayout, style: "width: 50%; font-size: 0.7em", components:[
			{content: "Reply to comment", style: "font-weight: bold"},
				{kind: "Scroller", style:"height: 200px", components: [
					{kind: "RichText", name: "commentText", richContent: false, alwaysLooksFocused:true},
				]},
				{layoutKind: "HFlexLayout", components: [
					{kind: "IconButton", icon: "images/upvoteIcon.png", onclick: "upvotePressed"},
					{kind: "IconButton", icon: "images/downvoteIcon.png", onclick: "downvotePressed"},
					
					{kind: "Spacer"},
					{kind: "Spinner", name: "commentBusySpinner"},
					{kind: "Button", caption: " Reply ", onclick: "commentOK", className: "enyo-button-affirmative"},
					{kind: "Button", caption: "Cancel", onclick: "commentCancel", className: "enyo-button-negative"},
				]},	
			]},
		/* service for launching links */
		{name: "AppManService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "open"},
	],
	
	collapseLevels: function(inSender, inEvent){
		//enyo.log(this.comments[inEvent.rowIndex]);
		
		
		var l = this.comments[inEvent.rowIndex].level;
		var sc = !this.comments[inEvent.rowIndex].showChildren;
		this.comments[inEvent.rowIndex].showChildren=sc;
		
		//enyo.log(sc);
		
		var x = inEvent.rowIndex;
		do
		{
			
			if(this.comments[x])
			{	
				x++
				if(this.comments[x].level>l)
				{
					this.comments[x].showChildren=true;
					this.comments[x].show=sc;
				}
				
			}
			else
				break;
			//enyo.log(this.comments[x]);
		}
		while(this.comments[x].level>l);
		
		this.$.commentList.refresh();
		event.stopPropagation();
		
	},
	
	/* vote buttons (up) */
	upvotePressed: function(){
		sr=this.selectedRow;
		if(this.comments[sr].likes==false)
		{
			this.comments[sr].score+=1;
			this.comments[sr].likes=null;
			this.$.commentBusySpinner.show();
			this.$.setVote.call({"id": this.comments[sr].id,"dir":"0","uh":this.owner.modHash});
		}
		else if(this.comments[sr].likes==null)
		{
			this.comments[sr].score+=1;
			this.comments[sr].likes=true;
			this.$.commentBusySpinner.show();
			this.$.setVote.call({"id": this.comments[sr].id,"dir":"1","uh":this.owner.modHash});

		}
		else
		{
			this.$.commentBusySpinner.hide();
			this.$.commentsReplyPopup.close();	
			
		}
		

	},
	/* vote buttons (down) */
	downvotePressed: function(){
		sr=this.selectedRow;
		if(this.comments[sr].likes==true)
		{
			this.comments[sr].score-=1;
			this.comments[sr].likes=null;
			this.$.commentBusySpinner.show();
			this.$.setVote.call({"id": this.comments[sr].id,"dir":"0","uh":this.owner.modHash});
		}
		else if(this.comments[sr].likes==null)
		{	
			this.comments[sr].score-=1;
			this.comments[sr].likes=false;
			this.$.commentBusySpinner.show();
			this.$.setVote.call({"id": this.comments[sr].id,"dir":"-1","uh":this.owner.modHash});
		}
		else
		{
			this.$.commentBusySpinner.hide();
			this.$.commentsReplyPopup.close();	
			
		}
		this.$.commentList.refresh();
	},

	/* vote callback */
	voteSuccess: function(inSender, inResponse, inRequest){
		this.$.commentBusySpinner.hide();
		this.$.commentsReplyPopup.close();	
		enyo.windows.addBannerMessage("Vote registered", "{}");
	},
	
	voteFail: function(){
		this.$.commentBusySpinner.hide();
		enyo.windows.addBannerMessage("Vote did not register, could not contact reddit.com", "{}");
	},
	
	/* more comments callbacks */
	gotMoreComments: function(inSender, inResponse, inRequest){
		this.loadExtraCommentsData(inResponse.jquery[inResponse.jquery.length-1][3][0][0]);
		//enyo.log(this.extraComments);
		var tmp=[];
		for(i in this.comments)
		{
			if(i==this.selectedRow && this.extraComments.length>0)
			{
				//enyo.log("Loading new comments at "+i);
				for(j in this.extraComments)	
					tmp.push(this.extraComments[j]);
			}
			else
			{
				tmp.push(this.comments[i]);	
			}
			
		}
		this.comments=tmp;
		//enyo.log(this.comments[this.selectedRow]);
		this.selectedRow=-1;
		this.$.commentList.refresh();
	},

	gotMoreCommentsFail: function(inSender, inResponse, inRequest){
		enyo.windows.addBannerMessage("Could not contact reddit.com", "{}");
		//enyo.log(inResponse);	
	},

	/* main comments callbacks */
	gotComments: function(inSender, inResponse, inRequest){
		this.originalPost=inResponse[0].data.children[0];
		this.originalAuthor=this.originalPost.data.author;
		this.$.originalTitle.setContent(this.originalPost.data.title);
		//enyo.log(this.originalPost);
		if(this.originalPost.data.selftext_html)
			this.comments.push({"created_utc":this.originalPost.created_utc,"show": true, "hasChildren":false, "more":false,"more_id":"","name":"","is_self":true,"id":this.originalPost.name, "body": this.originalPost.selftext_html,"level":0,"author":this.originalPost.author,"score":this.originalPost.ups-this.originalPost.data.downs});
		this.loadComments(inResponse[1].data.children,this.originalPost.data.selftext_html);
		
		
		this.owner.$.storySpinner.hide();
	},
	
	gotCommentsFail: function(){
		enyo.windows.addBannerMessage("Could not contact reddit.com", "{}");
		this.owner.$.storySpinner.hide();
	},
	
	/* create comment callback */
	commentSuccess: function(){
		this.comments=[];
		this.level=0;
		this.$.commentList.reset();
		this.$.getComments.call();
		this.$.commentsReplyPopup.close();	
		this.$.commentBusySpinner.hide();
		enyo.windows.addBannerMessage("Comment added", "{}");
	},
	
	commentFail: function(){
		enyo.windows.addBannerMessage("Comment not added, couldn't contact reddit.com", "{}");
	},
	
	/* comment button links */
	commentCancel: function(){
		this.selectedRow=-1;
		this.$.commentList.refresh();
		this.$.commentsReplyPopup.close();	
	},
	
	commentOK: function(){
		sr=this.selectedRow;
		this.$.commentBusySpinner.show();
		this.$.setComment.call({"parent": this.comments[sr].id, "text":this.$.commentText.getValue(), "uh": this.owner.modHash});
		this.$.commentList.refresh();
		this.$.commentText.setValue("");
	},
	
	/* comment functions */
	commentClick: function(inSender,inRequest){
		//if(this.$.commentList.isScrolling)
		if(this.$.commentList.$.scroller.$.scroll.dragging)
			return false;
			
		var index=inRequest.rowIndex;
		var cr=index;
		
		if ( this.selectedRow != index ) {
			this.selectedRow = index;
			this.$.commentList.refresh();
			return false;
		}
		
		if(enyo.getCookie("reddit_session")==null) {
			enyo.windows.addBannerMessage("You must be logged in.", "{}");
			return false;
		}
		
		if(this.comments[cr].more)
		{
			this.$.moreCommentSpinner.show();
			this.level=this.comments[cr].level;
			this.extraComments=[];
			this.$.getMoreComments.call({"depth":this.comments[cr].level,"id":this.comments[cr].name,"pv_hex":null,"renderstyle":"","link_id":this.originalPost.data.name,"children":this.comments[cr].more_id});
			return false;	
		}
		if(this.originalPost.data.is_self && this.originalPost.data.selftext!="" && this.comments[cr].more!=true)
		{		
			if(index>0)
			{
				
				this.$.commentsReplyPopup.openAtCenter();
				this.$.commentList.refresh();
			}
			else
			{
				this.selectedRow=-1;
			}
		}
		else
		{
			this.$.commentsReplyPopup.openAtCenter();
			this.$.commentList.refresh();
		}
	},
	
	/* callback for links in comment html */
	htmlContentLinkClick: function(inSender, inUrl) {
	 //document.location.href=inUrl;
	 this.$.AppManService.call({target: inUrl});
	},

	/* initialize functions */
	ready: function(){
		this.level=0;
		this.comments=[];
		this.originalPost=[];
	},
	
	
	setupRow: function(inSender,inIndex){
		//enyo.log("Comments length"+this.comments.length);
		if(this.comments.length>0)
		{
			this.$.moreCommentSpinner.hide();
			cr=inIndex;
			if (this.selectedRow==inIndex)
				this.$.bgLayer.applyStyle("background-color", "#ffe0cc");
			else
				this.$.bgLayer.applyStyle("background-color", "#f5f5ff");
					
			if(this.comments[cr])
			{
				if(this.comments[cr].is_self)
				{
					this.$.comment.setContent(fixHtml(this.originalPost.data.selftext_html));
					//this.$.bgLayer.applyStyle("background-color", "");
					this.$.bgLayer.applyStyle("border", "1px solid #ccccff");
					//enyo.log("Showing self-post");
					return true;	
				}

				this.$.item.applyStyle("margin-left",((this.comments[cr].level-1)*20)+"px");
				this.$.comment.setContent(this.comments[cr].body);
				this.$.author.setContent(this.comments[cr].author+" - "+formatTimeSince(this.comments[cr].created_utc));
				this.$.score.setContent(this.comments[cr].score+" points");
				if(this.comments[cr].likes)
					this.$.score.applyStyle("color","#ff6600");
				else if(this.comments[cr].likes==false)
					this.$.score.applyStyle("color","#AAAAff");
				else
					this.$.score.applyStyle("color","#6666ff");
					
				if(this.comments[cr].author==this.originalAuthor)
				{
					this.$.author.setContent(this.comments[cr].author+" [s]"+" - "+formatTimeSince(this.comments[cr].created_utc));
					this.$.author.applyStyle("color","#0000ff");
				}

				if(this.comments[cr].showChildren==false)
				{
					this.$.comment.applyStyle("color","#999999");
					this.$.comment.setContent(this.comments[cr].body.substr(0,100)+"...");
				}
				else
					this.$.comment.applyStyle("color","#000000");
					
				if(this.comments[cr].more)
				{
					this.$.comment.setContent("<em>Load more comments...</em>");
					this.$.author.hide();
					this.$.score.hide();
					this.$.comment.applyStyle("color","#6666ff");
				}
				else
				{
					this.$.author.show();
					this.$.score.show();
					//this.$.comment.applyStyle("color","#000000");
				}

				return true;	
			}
		}
	},
	
	loadComments: function(data,selftext){
		this.loadCommentsData(data);
		this.$.commentList.punt();
		this.extraComments=[];
	},
	
	loadUrl: function(url,self){
		this.comments=[];
		this.level=0;
		this.$.commentList.reset();
		this.selectedRow=-1;
		if(url)
			this.$.getComments.setUrl(url);
		this.$.getComments.call();
		this.owner.$.storySpinner.show();
	
	},

	cleanList: function(){
		this.comments=[];
		this.level=0;
		this.originalPost=[];
		this.selectedRow=-1;
		this.$.commentList.reset();
		this.originalAuthor="";
		
	},
	
	loadExtraCommentsData: function(data)
	{	
		var r=data;
		if(r)
		{
				if(r.data)
				{
					if(r.data.body)
					{
						var body=r.data.body_html;
						//enyo.log(">>>> MORE COMMENT >>>>");
						//enyo.log(r.data);
						body=fixHtml(body);
						this.extraComments.push({"created_utc":r.data.created_utc, show: true,"extra":true,"more":false,"is_self":r.data.is_self,"id":r.data.name,"likes": r.data.likes, "body": body, "level":this.level,"author":r.data.author,"score": r.data.ups-r.data.downs});
					}
				}	
		}
	},
	
		
	loadCommentsData: function(data)
	{	
		this.level++;
		var r=data;
		if(r)
		{
			for(x in r)
			{
				if(r[x])
				{
					
					if(r[x].data.body)
					{
						var body=r[x].data.body_html;
						body=fixHtml(body);
						if(r[x].data.replies)
							var hasChildren=true;
						else
							var hasChildren=false;
						//enyo.log(r);
							
						this.comments.push({"created_utc":r[x].data.created_utc,showChildren: true, show: true, "more":false,"hasChildren":hasChildren,"is_self":r[x].data.is_self,"id":r[x].data.name,"likes": r[x].data.likes, "body": body,"level":this.level,"author":r[x].data.author,"score": r[x].data.ups-r[x].data.downs});
						if(r[x].data.replies)
						{
							this.loadCommentsData(r[x].data.replies.data.children);
						}
					}
					else if(r[x].kind)
					{
						
						if(r[x].kind=="more")
						{
						
							this.comments.push({"created_utc":r[x].data.created_utc,"show": true, "hasChildren":false, "more":true,"more_id":r[x].data.id,"name":r[x].data.name,"is_self":false,"id":r[x].data.name,"likes": r[x].data.likes, "body": body,"level":this.level,"author":r[x].data.author,"score": r[x].data.ups-r[x].data.downs});
						}
					}
				}
				
			}
		}
		this.level--;		
	}
});


