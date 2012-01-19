// JavaScript Document

/*quicksort */
function apar(a, b, e, p)
{
	var piv=a[p].data.display_name.toLowerCase();
	a=aswap(a, p, e-1);
	var st=b;
	var i;
	for(i=b; i<e-1; ++i) {
		if(a[i].data.display_name.toLowerCase()<=piv) {
			a=aswap(a,st, i);
			++st;
		}
	}
	a=aswap(a,e-1, st);
	return st;
}
aswap=function(arr, a, b)
{
	var tmp=arr[a];
	arr[a]=arr[b];
	arr[b]=tmp;
	return arr;
}
function aqsr(a, b, e)
{
	if(e-1>b) {
		var p=b+Math.floor(Math.random()*(e-b));

		p=apar(a, b, e, p);

		aqsr(a, b, p);
		aqsr(a, p+1, e);
	}
}
function subreddit_quick_sort(a)
{
	aqsr(a, 0, a.length);
}

//* fix HTML *//

function fixHtml(inStr){
	inStr = inStr.replace(/\&gt;/g,">");
	inStr = inStr.replace(/\&lt;/g,"<");
	inStr = inStr.replace(/\&amp;/g,"&");
	inStr = inStr.replace(/\&amp;/g,"&");
	return inStr;
	
}

function formatDateTime(inDate){
	var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var d=new Date(inDate*1000);
	dateString = d.getHours()+":"+d.getMinutes()+" "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
	return dateString;
}

function formatTimeSince(inDate){
		var SECS_IN_YEAR  = (365.25*24*60*60);
		var SECS_IN_MONTH = (30.1*24*60*60);
		var SECS_IN_WEEK = (7*24*60*60);
		var SECS_IN_DAY = (24*60*60);
		var SECS_IN_HOUR = (60*60);
		var SECS_IN_MIN = 60;
		
		var years=0;
		var months=0;
		var weeks=0;
		var days=0;
		var hours=0;
		var mins=0;
		var secs=0;
		var remainder=0;
		
		var d=new Date();
		
		var df=((d.valueOf()/1000)-inDate);
		
		if(df < SECS_IN_MIN){
			secs = df % 60;
		}
		else if(df < SECS_IN_HOUR){
			mins = Math.floor(df / SECS_IN_MIN);
			secs = df % 60;
		}
		else if(df < SECS_IN_DAY){
			
			hours = Math.floor(df / SECS_IN_HOUR);
			remainder =  (df % SECS_IN_HOUR);
			
			mins= Math.floor(remainder / SECS_IN_MIN);
			secs = df % 60;
		}
		
		else if(df < SECS_IN_WEEK){
			
			days= Math.floor(df / SECS_IN_DAY);
			remainder =  (df % SECS_IN_DAY);

			hours= Math.floor(remainder / SECS_IN_HOUR);
			remainder =  (remainder % SECS_IN_HOUR);
			
			mins= Math.floor(remainder / SECS_IN_MIN);
			secs = df % 60;
		}
		else if(df < SECS_IN_MONTH){
			
			weeks= Math.floor(df / SECS_IN_WEEK);
			remainder =  (df % SECS_IN_WEEK);

			days= Math.floor(remainder / SECS_IN_DAY);
			remainder =  (remainder % SECS_IN_DAY);

			hours= Math.floor(remainder / SECS_IN_HOUR);
			remainder =  (remainder % SECS_IN_HOUR);
			
			mins= Math.floor(remainder / SECS_IN_MIN);
			secs = df % 60;
		}
		else if(df < SECS_IN_YEAR){
			
			months= Math.floor(df / SECS_IN_MONTH);
			remainder =  (df % SECS_IN_MONTH);
			
			days= Math.floor(remainder / SECS_IN_DAY);
			remainder =  (remainder % SECS_IN_DAY);

			hours= Math.floor(remainder / SECS_IN_HOUR);
			remainder =  (remainder % SECS_IN_HOUR);
			
			mins= Math.floor(remainder / SECS_IN_MIN);
			secs = df % 60;
		}
		else
		{
			years= Math.floor(df / SECS_IN_YEAR);
			remainder =  (df % SECS_IN_YEAR);
			
			months= Math.floor(remainder / SECS_IN_MONTH);
			remainder =  (remainder % SECS_IN_MONTH);
			

		}
		
		if(secs>59)
		{
			secs=0;
			mins++;
		}
		if(mins>59)
		{
			mins=0;
			hours++;
		}
		if(hours>23)
		{
			hours=0;
			days++;	
		}
		if(months>11)
		{
			months=0;
			years++;
		}
		var timeString="";
		
		secs=Math.floor(secs);
		mins=Math.floor(mins);
		hours=Math.floor(hours)
		weeks=Math.floor(weeks);
		days=Math.floor(days);
		months=Math.floor(months);
		years=Math.floor(years);

		if(years==0 && months==0 && weeks==0 && days==0 && hours==0 && mins==0)
			timeString=secs+" secs";
		else if(years==0 && months==0 && weeks==0 && days==0 && hours==0)
			timeString=mins+" mins "+secs+" secs";
		else if(years==0 && months==0 && weeks==0 && days==0)
			timeString=hours+" hours "+mins+" mins ";
		else if(years==0 && months==0 && weeks==0)
			timeString=days+" days "+hours+" hours ";
		else if(years==0 && months==0)
			timeString=weeks+" weeks "+days+" days "+hours+" hours";
		else if(years==0)
			timeString=months +" months "+days+" days ";
		else
			timeString=years + " years " + months +" months ";
			
		if(df>0)
			timeString=timeString+" ago";
		else
			timeString=timeString+" in the future";
		return timeString;

}