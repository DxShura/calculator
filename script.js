const display = document.querySelector('#display');
const display1 = document.querySelector('#display1');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const del = document.querySelector('#delete');
const dot = document.querySelector('#point');
let calArray = [];

function upDisplay(num){
	num.addEventListener('click', function(){
		calArray.push(num.innerHTML);
		display.value = calArray.join('');
	});
}

for(let i = 0; i<numbers.length; i++){
	upDisplay(numbers[i]);
}

for(let i = 0; i<operators.length; i++){
	upDisplay(operators[i]);
}

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
	let errorTest = display.value;
	let resultTest;
	let removeDecimal;
	let removeZero;
	let includeTest = ['..','++','--','**','//','+.','-.','*.','/.','.+','.-','.*','./','+-','+*','+/','-+','*+','/+','-*','-/','*-','/-','*/','/*'];
	let lastCharTest = ['.','+','-','*','/'];

	for(let i = 0; i< includeTest.length; i++){
		if(errorTest.includes(includeTest[i]) === true){
			resultTest = true;
		}  
	}
	for(let i = 0; i<lastCharTest.length;i++){
		if(errorTest.slice(-1)==lastCharTest[i]){
			resultTest = true;
		}
	}
	if(errorTest !== ''){
		if(resultTest === true ){
			calArray = [];
			display.value= "";
			display1.value = "error";
		}else{
			if(errorTest.length > 1 && errorTest.charAt(1) !== '.' && errorTest.charAt(0) === "0"){
				while(errorTest.charAt(0) === '0'){
					errorTest = errorTest.substr(1);
				}
				display.value= errorTest;
			}else{
				removeDecimal = '' +  eval(display.value).toFixed(2);
				removeZero = removeDecimal.slice(-1);
				if(removeDecimal.includes('.00') == true){
					display1.value = removeDecimal.slice(0, -3);
					display1.classList.remove('smallFontSize');
				}else if(removeZero == "0"){
					display1.value = removeDecimal.slice(0, -1);
					display1.classList.remove('smallFontSize');
				}else{
					display1.value = removeDecimal;
					display1.classList.remove('smallFontSize');
				}
			}
		}

		if(display1.value == "Infinity" || display1.value == "-Infinity"){
			display1.classList.add('smallFontSize');
			display1.value = "To infinity and beyond!";
		}	
	}
}

function removeItems(rem, item){
	for (let i = 0; i < item; i++){
		rem.pop();
	}
}

window.addEventListener('keydown', function(e){
	const keyPress = document.querySelector(`button[data-key="${e.keyCode}"]`);
	if(keyPress){
		calArray.push(keyPress.innerHTML);
		keyPress.focus();
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
	}
});


for(let i = 0; i< numbers.length; i++){
	numbers[i].addEventListener('transitionend', removeTransition);
}
for(let i = 0; i< operators.length; i++){
	operators[i].addEventListener('transitionend', removeTransition);
}

clear.addEventListener('transitionend', removeTransition);
dot.addEventListener('transitionend', removeTransition);
del.addEventListener('transitionend', removeTransition);
equals.addEventListener('transitionend', removeTransition);

function removeTransition (e){
	if(e.propertyName !== 'background-color') return;
	this.classList.remove('activeButton');
}