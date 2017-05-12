var start = new Date().getTime();

var timeRecord = new Array();			

function makeShape() {
	
	if (Math.random() > .5) {

		document.getElementById("shape").style.borderRadius = 100 + "px";				

	}

	else {

		document.getElementById("shape").style.borderRadius = 0 + "px";

	}
				
	var randColor = getRandomColor();
	var shapeSize = randomIntFromInterval(50, 300);				 
	var shapeTop = randomIntFromInterval(0, 400);
	var shapeLeft = randomIntFromInterval(0, 400);

	document.getElementById("shape").style.background = randColor;				

	document.getElementById("shape").style.width = shapeSize + "px";

	document.getElementById("shape").style.height = shapeSize + "px";
	
	document.getElementById("shape").style.top = shapeTop + "px";

	document.getElementById("shape").style.left = shapeLeft + "px";

	document.getElementById("shape").style.display = "block";

	start = new Date().getTime();

}

function respawnShape() {

	setTimeout(makeShape, randomIntFromInterval(1, 5000));

}
			
respawnShape();

var total = 0;

document.getElementById("shape").onclick = function() {
			
	document.getElementById("shape").style.display = "none";
				
	var end = new Date().getTime();
	var timeTaken = (end - start) / 1000;
				
	document.getElementById("time").innerHTML = timeTaken + " seconds";

	timeRecord.push(timeTaken);

	total += timeTaken;
		
	var avgTime = total / timeRecord.length;

	var spacedRecord = timeRecord.join(", ");

	document.getElementById("record").innerHTML = spacedRecord.toString();

	document.getElementById("average").innerHTML = avgTime;				

	respawnShape();

}


function randomIntFromInterval(min, max) {

	return Math.floor(Math.random()*(max-min+1)+min);

}

function getRandomColor() {

	var letters = "0123456789ABCDEF";
	var color = "#";
				
	for (var i = 0; i < 6; i++) {

		color += letters[Math.floor(Math.random() * 16)];

	}
				
	return color;	

}