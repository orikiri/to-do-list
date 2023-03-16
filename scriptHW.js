// ------ V A R I A B L E S ------ //
const inp = document.querySelector('.inp');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.ul');
const inpSearch = document.querySelector('.inpSearch');
const progressBar = document.querySelector('progress');


// ------ F U N C T I O N S ------ //
const allTasks = [];
const createTask = (task) => {
    allTasks.push(task);
}

inpSearch.addEventListener('keyup', () => {
    renderTaskList();
})


const renderTaskList = () => {
    ul.innerHTML = '';

    const query = inpSearch.value||'';
    const filterTasks = allTasks.filter((task) => {
        if (query=='') {
            return true;
        } else {
            return task.text.toLowerCase().includes(query.toLowerCase());
        }
    })
    let countDone = 0;

    filterTasks.forEach(task => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const deleteBtn = document.createElement('button');
        const checkbox = document.createElement('input');
        checkbox.classList.add('checkbox');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;

        deleteBtn.innerHTML = '✘';
        deleteBtn.classList.add('deleteBtn');
        
        div.innerHTML = task.text;
        div.classList.add('taskName');

        li.append(checkbox, div, deleteBtn);
        ul.append(li);

        
        if (task.done == true) {
            countDone++
            div.style = 'transition: .3s; text-decoration: line-through; opacity: .5;';

        }
        checkbox.addEventListener('click', () => {
            markedTask(task, checkbox.checked); 
            renderTaskList();
        })
        

        deleteBtn.addEventListener('click', () => {
            removeTask(task);
            renderTaskList();
        })
        progressBar.max = filterTasks.length;
        progressBar.value = countDone;
        
})   
    const removeTask = (task) => {
        const index = allTasks.findIndex((t) => {
            return t.id === task.id;
        })
        allTasks.splice(index, 1);
}   
    const markedTask = (task, mark) => {
    const index = filterTasks.findIndex((t) => {
        return t.id === task.id;
    })
    filterTasks[index].done = !!mark;
}
}



// ------ E V E N T S ------ //
btn.addEventListener('click', () => {
    const task = {};
    task.text = inp.value;
    task.id = new Date().getTime();
    task.done = false;
    createTask(task);
    inp.value = '';
    inpSearch.value = '';
    renderTaskList();
})
