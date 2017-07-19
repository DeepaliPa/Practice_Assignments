var Calendar = function() {

   var layOutDay = function(events) {
     var eventsLength = events.length;
     var timeslots = [];
     var event, i, j;
     
     events = events.sort(function(a, b){return a.id - b.id;});
     
     for (i=0; i<720; i++) {
       timeslots[i] = [];
     }
     
     for (i = 0; i < eventsLength; i++) {
       event = events[i];
       
       if (event.start > event.end) {
         var temp = event.start;
         event.start = event.end;
         event.end = temp;
       }
       
       for (j=event.start; j<event.end; j++) {
         timeslots[j].push(event.id);
       }
     }
     
     for (i=0; i<720; i++) {
       var next_hindex = 0;
       var timeslotLength = timeslots[i].length;
       
        if (timeslotLength > 0) {
         
         for (j=0; j<timeslotLength; j++) {
           event = events[timeslots[i][j]-1];
           
           if (!event.cevc || event.cevc < timeslotLength) {
             event.cevc = timeslotLength;
             
               event.hindex = next_hindex;
               
               next_hindex++;
             }
           }
         }
       }
     }
     
     for (i=0; i<events.length; i++) {
       event = events[i];
       
       event.pxh = event.end - event.start;
       event.pxy = event.start;
       
       event.pxw = 600 / event.cevc;
       
       event.pxx = event.hindex * event.pxw;
       
       var div = document.createElement("div");
       div.style.width = event.pxw + "px";
       div.style.height = event.pxh + "px";
       div.style.top = event.pxy + "px";
       div.style.left = event.pxx + "px";
       div.style.position = "absolute";
       div.style.background = "#"+Math.floor(Math.random()*16777215).toString(16);
       
       console.log(document);
       document.getElementById("calander").appendChild(div);
     }
   };

  
    return {
        layOutDay : layOutDay
    };

}();

var events = [
 {id : 1, start : 30, end : 150},  {id : 2, start : 540, end : 600}, {id : 3, start : 560, end : 620}, {id : 4, start : 610, end : 670}];

Calendar.layOutDay(events);