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
	name: "MyApps.AlienRedSubredditListing",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
			"onSubredditClick": ""
	},
	
	components: [
		//{kind: "PageHeader", content: "AlienRed"},

		{kind: "Scrim", align: "center", pack: "center",layoutKind: "VFlexLayout", components: [
			{kind: "SpinnerLarge"}
		]},
		//{kind: "Scroller", name:"scroller", flex: 1,  layoutKind: "VFlexLayout", components: [
		  	{name: "list", kind: "VirtualList", flex: 1, onSetupRow: "getListItem", components: [
		  		{kind: "Item",  tapHighlight: true,  onclick: "doSubredditClick", layoutKind: "HFlexLayout", style: "color: black", components: [
					{kind: "Control", layoutKind: "VFlexLayout", components: [
						{name: "title", style: "font-size: 0.7em"},
						{name: "subreddit", style: "font-size: 0.7em"}
					 ]},
				 ]},
			 ]},
		//]},

	],

	getListItem: function(inSender, inIndex) {
	  //enyo.log(this.owner.subreddits);
	  var r = this.owner.subreddits[inIndex];
	  if (r) {
			this.$.item.removeClass("alienRed_selected");
			this.$.item.removeClass("alienRed_unselected");
		 	if(this.selectedIndex==inIndex)
				this.$.item.addClass("alienRed_selected");
			else
				this.$.item.addClass("alienRed_unselected");
				
			this.$.title.setContent(r.data.display_name.charAt(0).toUpperCase()+r.data.display_name.substr(1));
			//this.$.subreddit.setContent(r.data.title.charAt(0).toUpperCase()+r.data.title.substr(1).toLowerCase());
			return true;
	  }
	},	
	
	showSelected: function(index){
		this.selectedIndex=index;
		this.$.list.refresh();	
	},
	
	showScrim: function(){
		this.$.scrim.show();	
		this.$.spinnerLarge.show();	
	},
	hideScrim: function(){
		this.$.scrim.hide();	
		this.$.spinnerLarge.hide();	
	},
	
	ready: function(){
		this.selectedIndex=-1;		
	}
});


