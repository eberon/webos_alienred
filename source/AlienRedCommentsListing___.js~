enyo.kind({
	name: "MyApps.AlienRedCommentsListing",
	kind: enyo.Pane,
	layoutKind: enyo.VFlexLayout,
	events: {
			"onLoadedComments": ""
	},
	components: 
	[

			{kind: "VirtualList", name: "commentList",onSetupRow: "setupRow", flex: 1,  components: [
				 {kind: "Item", name: "item", flex: 1, layoutKind: "VFlexLayout" ,style: "border: none; padding: 5px; ", components: [
				 {kind: "Control", name: "bgLayer", layoutKind: "VFlexLayout", style: "background-color: #f5f5ff; padding: 0.5em; border-radius: 1em; font-size: 0.8em", components: [
						{kind: "Control", pack: "center", layoutKind: "HFlexLayout", components: [
							{name: "author",  style: "font-weight: bold; color: #6666ff; font-size: 0.8em", flex: 1},
							{name: "score",  style: "font-weight: bold; color: #6666ff; font-size: 0.8em",},
						]},
						{name: "comment", kind: "HtmlContent", onLinkClick: "htmlContentLinkClick"},
					]},
				]}
			]},
			{name: "AppManService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "open"},
	],
	
	ready: function(){
		this.level=0;
		this.comments=[];
		this.selftext="";
	},
	
	htmlContentLinkClick: function(inSender, inUrl) {
	  document.location.href=inUrl;
	},
	
	setupRow: function(inSender,inIndex){
		cr=inIndex;
		if(inIndex==0 && this.selftext)
		{
			this.$.comment.setContent(this.selftext.replace(/\&gt;/g,">").replace(/\&lt;/g,"<"));
			//this.$.bgLayer.applyStyle("background-color", "");
			this.$.bgLayer.applyStyle("border", "1px solid #ccccff");
			
			return true;	
		}
		if(this.selftext)
			cr-=1;
		if(this.comments[cr])
		{
			this.$.item.applyStyle("margin-left",((this.comments[cr].level-1)*20)+"px");
			this.$.comment.setContent(this.comments[cr].body);
			this.$.author.setContent(this.comments[cr].author);
			this.$.score.setContent(this.comments[cr].score+" points");
			
			return true;
		}
	},
	
	loadComments: function(data,selftext){
		this.selftext=selftext;
		this.loadCommentsData(data);
		this.$.commentList.punt();
	
		//enyo.log(this.comments);
	},

	cleanList: function(){
		this.comments=[];
		this.level=0;
		this.selftext="";
		this.$.commentList.reset();
		
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
					if(r[x].data && r[x].data.body)
					{
						var body=r[x].data.body_html;
						body=body.replace(/\&gt;/g,">").replace(/\&lt;/g,"<");
						this.comments.push({"body": body,"level":this.level,"author":r[x].data.author,"score": r[x].data.ups-r[x].data.downs});
						if(r[x].data.replies)
						{
							this.loadCommentsData(r[x].data.replies.data.children);
							
						}
					}
				}
				
			}
		}
		this.level--;		
	}

	/*getListItem: function(inSender, inIndex) 
	{
	  var r = this.owner.comments[inIndex];
	  if (r) {
			this.$.comment.setContent(inIndex);
			return true;
	  }
	},*/	
});


