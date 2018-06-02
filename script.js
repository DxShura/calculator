const display = document.getElementById('display');
const display1 = document.getElementById('display1');
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
	});
}
numbers.forEach(upDisplay);
operators.forEach(upDisplay);

clear.addEventListener('click', clearAll);
function clearAll(){
		calArray = [];
		display.value = "";
		display1.value = "";
}

dot.addEventListener('click', oneDot);
function oneDot(){
			calArray.push(dot.innerHTML);
			display.value = calArray.join('');
}

del.addEventListener('click', removeLast);
function removeLast(){
		removeItems(calArray, 1);
		display.value = calArray.join('');
		display1.value = "";
}

equals.addEventListener('click', operate);
function operate(){
	let dotTest = display.value;
	let removeDecimal;
	let removeZero;

	if(dotTest.includes('..') == true){
		calArray = [];
		display.value= "";
		display1.value = "error";
	}else{
		removeDecimal = '' +  eval(display.value).toFixed(2);
		removeZero = removeDecimal.slice(-1);
	}

	if(dotTest.includes('..') == true){
		calArray = [];
		display.value= "";
		display1.value = "error";
	}else if(removeDecimal.includes('.00') == true){
		display1.value = removeDecimal.slice(0, -3);
		display1.classList.remove('smallFontSize');
	}else if(removeZero == "0"){
		display1.value = removeDecimal.slice(0, -1);
		display1.classList.remove('smallFontSize');
	}else{
		display1.value = removeDecimal;
		display1.classList.remove('smallFontSize');
	}

	if(display1.value == "Infinity" || display1.value == "-Infinity"){
		display1.classList.add('smallFontSize');
		display1.value = "To infinity and beyond!";
	}	
}

function removeItems(rem, item){
	for (let i = 0; i < item; i++){
		rem.pop();
	}
}

window.addEventListener('keydown', function(e){
	const keyPress = document.querySelector(`button[data-key="${e.keyCode}"]`);
	calArray.push(keyPress.innerHTML);
	display.value = calArray.join('');
	keyPress.classList.add('activeButton');
	
	if(e.keyCode == 13){
		removeItems(calArray, 1);
		display.value = calArray.join('');
		operate();
	} else if (e.keyCode == 46){
		clearAll();
	} else if (e.keyCode == 8){
		removeItems(calArray, 2);
		display.value = calArray.join('');
		display1.value = "";
	} else if(display1.value == "undefined"){
		display1.value = "error";
	}

});


numbers.forEach(key => key.addEventListener('transitionend', removeTransition));
operators.forEach(key => key.addEventListener('transitionend', removeTransition));

clear.addEventListener('transitionend', removeTransition);
dot.addEventListener('transitionend', removeTransition);
del.addEventListener('transitionend', removeTransition);
equals.addEventListener('transitionend', removeTransition);

function removeTransition (e){
    if(e.propertyName !== 'background-color') return;
    this.classList.remove('activeButton');
  }
