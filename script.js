

// --------------------------------------------------------------------------------

//  Code for Pagination =========

const all_records_tr = document.querySelectorAll('#allData tr');
let records_per_page = 5;
let page_number = 1;
const total_records = all_records_tr.length;
let total_page = Math.ceil(total_records / records_per_page);
let recordsDisplay = document.getElementById("allData");
let show_entries = document.getElementById('show_entries');

generatePage();
DisplayRecords();

function DisplayRecords() {
    let startIndex = (page_number - 1) * records_per_page;
    let endIndex = startIndex + (records_per_page - 1);
    if (endIndex >= total_records) {
        endIndex = total_records - 1;
    }

    let statement = '';
    for (let i = startIndex; i <= endIndex; i++) {
        statement += `<tr>${all_records_tr[i].innerHTML}</tr>`;
    }

    recordsDisplay.innerHTML = statement;

    document.querySelectorAll(".dynamic-page").forEach(item => {
        item.classList.remove('active');
    });

    document.getElementById(`page${page_number}`).classList.add('active');
    if (page_number == 1) {
        document.getElementById("prevBtn").parentElement.classList.add('disabled');
    } else {
        document.getElementById("prevBtn").parentElement.classList.remove('disabled');
    }

    if (page_number >= total_page) {
        document.getElementById("nextBtn").parentElement.classList.add('disabled');
    } else {
        document.getElementById("nextBtn").parentElement.classList.remove('disabled');
    }

    document.getElementById('no_of_show_page').innerHTML = `Showing ${startIndex + 1} to ${endIndex + 1} of ${total_records}`;
}

function generatePage() {
    let prevBtn = `<li class="page-item" ><a id="prevBtn" onclick="prevBtn()" class="page-link" href="javascript:void(0)">Previous</a></li>`;

    let nextBtn = `<li class="page-item" ><a id="nextBtn" onclick="nextBtn()" class="page-link" href="javascript:void(0)">Next</a></li>`;

    let allBtns = '';
    let activeClass = '';

    for (let i = 1; i <= total_page; i++) {
        if (i == 1) {
            activeClass = 'active';
        } else {
            activeClass = '';
        }
        allBtns += `<li class="dynamic-page page-item ${activeClass}" id="page${i}"><a onclick="pageClick(${i})" class="page-link" href="javascript:void(0)">${i}</a></li>`;
    }
    document.getElementById("pagination").innerHTML = `${prevBtn} ${allBtns} ${nextBtn}`;
}

function nextBtn() {
    page_number++;
    DisplayRecords();
}

function prevBtn() {
    page_number--;
    DisplayRecords();
}

function pageClick(index) {
    page_number = parseInt(index);
    DisplayRecords();
}

// Show Entries Code

show_entries.addEventListener('change', function (e) {
    records_per_page = parseInt(show_entries.value);
    total_page = Math.ceil(total_records / records_per_page);
    page_number = 1;
    generatePage();
    DisplayRecords();
});

// Search Box code

const allData = document.querySelectorAll('#allData tr');
const searchBox = document.querySelector('#searchBox');

searchBox.addEventListener('input', function (e) {
    const showSearch = e.target.value.toLowerCase();
    // console.log(showSearch);
    recordsDisplay.innerHTML = '';

    allData.forEach(tr => {
        const getTdFromTr = tr.querySelectorAll('td');
        
        // Check if the current element is a table row with td elements
        if (getTdFromTr.length > 0) {
            const innerText = Array.from(getTdFromTr).map(td => td.innerText.toLowerCase());
            
            if (innerText.some(text => text.includes(showSearch))) {
                recordsDisplay.appendChild(tr);
            }
        }
    });

    if (recordsDisplay.innerHTML === '') {
        let noData = document.createElement("span");
        noData.classList.add("no-data");
        recordsDisplay.appendChild(noData).innerHTML = 'No Records Found';
    }
});