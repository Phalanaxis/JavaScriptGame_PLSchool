let stacking = 0;
let stackMining = 0;
let daysAmount = 30;
const config = {
    daySpeed: 0.4 * 1000,
    coefficient: {
      "30d": 20,
      "60d": 35,
      "90d": 50,
    },
};


let input = document.querySelector('input');
let button = document.querySelector('button');
let table = document.querySelector(".stacking__table");
let amount = document.querySelector(".amount");
let dropdownValue = document.getElementById("dropdown");

document.addEventListener('keyup', (event) => {
    const KeyName = event.key;
    
    if (KeyName === 'd' || KeyName === 'в') {
        amount.innerHTML = (+amount.innerHTML + 1).toFixed(4);
    } 
    else return; 
});

button.onclick = function () {
    stacking = +input.value;
    
    if( stacking > +amount.innerHTML ||  stacking == 0 || stacking < 0) {
        alert("Error!");
        return;
    }
    else {
        amount.innerHTML = (+amount.innerHTML - stacking).toFixed(4);
    }
    newRow();
}

function dropdown () {
    daysAmount = dropdownValue.options[dropdownValue.selectedIndex].value;
}

function newRow () {
    
    var newRow = table.insertRow(-1);

    let rowContent = `
    <tr>
        <td class = "stack">${stacking}</td>
        <td class = "period">${daysAmount}d</td>
        <td class = "counter">${daysAmount}d</td>
        <td class = "profit">0</td>
    </tr>`;

    newRow.innerHTML = rowContent;
}

function tableIterator() {
    for (var i = 1, row; row = table.rows[i]; i++){
        for (var j = 0, cell; cell = row.cells[j]; j++){
            if(j == 2){
                let temp = parseInt(cell.innerHTML) - 1;
                cell.innerHTML = `${temp}d`;

                if(temp == 0){
                    amount.innerHTML = ((+amount.innerHTML) + (+row.cells[0].innerHTML) + (+row.cells[3].innerHTML)).toFixed(4);


                    table.deleteRow(i);
                }
            }
            if(j == 3){
                let temp = +cell.innerHTML;
                let period = row.cells[1].innerHTML;
                let index = config.coefficient[period];
                temp = temp + (Math.log10(+row.cells[0].innerHTML) * index * (+row.cells[0].innerHTML))/100/parseInt(period);

                cell.innerHTML = temp.toFixed(4);
            }
        }
    }
}

function taxes() {
    let taxesCounter = document.querySelector(".taxes");
    taxesCounter.innerHTML = +taxesCounter.innerHTML - 1;

    if(+taxesCounter.innerHTML == 0){
        if(amount.innerHTML == 0){
            taxesCounter.innerHTML = 100;
            return;
        }
        else {
            amount.innerHTML = (amount.innerHTML * (100 - Math.abs(Math.log(amount.innerHTML))) / 100).toFixed(4);
            taxesCounter.innerHTML = 100;
        }
    }
}

setInterval(tableIterator, config.daySpeed);
setInterval(taxes, config.daySpeed);
