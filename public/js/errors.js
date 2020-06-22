
function appendError(errors) {
    let i = 0;
    let accordion = document.querySelector('.accordion');
    accordion.innerHTML = '';
    for (err of errors) {
        let card = document.createElement('div');
        card.classList.add('card', 'mt-2');
        let cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.classList.add('card-header');
        cardHeader.id = 'heading';

        let h2 = document.createElement('h2');
        h2.classList.add('mb-0');

        let button = document.createElement('button');
        button.classList.add('btn', 'btn-link', 'collapsed');
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', `#id${i}`);

        let keys = Object.keys(err);

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = ``
        for (let i = 0; i < keys.length; i++) {
            if (i === 0) {
                let color = '';
                if (err.level === 'warning') {
                    color = 'warning';
                } else if (err.level === 'info') {
                    color = 'info';
                } else {
                    color = 'danger'
                }

                button.innerHTML = `<span class='alert alert-${color}'>level:${err.level}</span>  &nbsp; &nbsp; < time: ${err.timestamp} > &nbsp; &nbsp; < request-from: ${err.requestIP} >`;
            } else {
                if (keys[i] != 'level' && keys[i] != 'timestamp' && keys[i] != 'requestIP') {
                    cardBody.innerHTML += `
                    <span><h5 style='display: inline-block'>${keys[i]}: </h5> ${err[keys[i]]}</span><br>`
                }
            }
        }



        h2.append(button);
        cardHeader.append(h2);
        card.append(cardHeader);
        accordion.append(card);


        let collapseDiv = document.createElement('div');
        collapseDiv.classList.add('collapse');
        collapseDiv.id = `id${i}`;

        collapseDiv.append(cardBody);
        accordion.append(collapseDiv)
        i++;
    }
}


let reservedErrors = [];

fetch('http://localhost:8080/errors')
    .then(resp => {
        return resp.text();
    })
    .then(errors => {
        let errArray = errors.split(', ').reverse();
        errArray.shift();
        let errorObject = [];
        for (let er of errArray) {
            errorObject.push(JSON.parse(atob(er)));
            reservedErrors.push(atob(er));
        }
        appendError(errorObject);
    });

// FILTER
document.querySelector('form').addEventListener('submit', e => {

    e.preventDefault();
    let text = document.querySelector('#search_text').value;
    document.querySelector('#search_text').value = '';
    let errors = [];
    // console.log(reservedErrors)
    for (err of reservedErrors) {
        if (err.toLowerCase().includes(text.toLowerCase().trim()) || err.includes(text.trim())) {
            errors.push(JSON.parse(err))
        };
    }
    // let errors = reservedErrors.filter(err => err.toLowerCase().includes(text.toLowerCase().trim()) || err.includes(text.trim()));

    console.log(errors)
    appendError(errors);
})