const display = document.getElementById('display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const dot = document.getElementById('point');
let calArray = [];

function upDisplay(num){
	num.addEventListener('click', function(){
		calArray.push(num.innerHTML);
		display.value = calArray.join('');
		displayValue = display.value;
	});
}
numbers.forEach(upDisplay);
operators.forEach(upDisplay);

function clearAll(){
	clear.addEventListener('click', function(){
		calArray = [];
		display.value = "";
		display1.value = "";
	});
}
clearAll();

function oneDot(){
	dot.addEventListener('click', function(){
		
			calArray.push(dot.innerHTML);
			display.value = calArray.join('');
	});
}
oneDot();

function removeLast(){
	del.addEventListener('click', function(){
		calArray.pop();
		display.value = calArray.join('');
	});
}
removeLast();

function operate(){
	equals.addEventListener('click', function(){
		display1.value = '' +  eval(display.value);
	});
}
operate();