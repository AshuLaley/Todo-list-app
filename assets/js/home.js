var displayCategory = document.getElementById("display-category");
let del_btn = document.getElementById('delete');

// if(i.category=="PERSONAL")
// {document.getElementById("display-category").style.backgroundColor = "#279f12" ; }



del_btn.addEventListener('click',function(){
    //get the array of checkbox elements that are checked
    let checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    //get the array of task IDs from the value attribute of the checked checkboxes
    let taskIdArray = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);

    //create the URL for the GET request
    let url = '/delete-tasks?id_array[]=' + taskIdArray.join('&id_array[]=');

    console.log(url);
    //send the GET request to the server
    window.location.href = url;
});

