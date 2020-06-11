fetch('http://localhost:8080/errors')
    .then(resp => {
        return resp.text();
    })
    .then(errors => {
        let errArray = errors.split('}').join(' ').split('{').reverse();
        errArray.splice(0, 1);

        let ul = document.querySelector('#main_ul');
        for (err of errArray) {
            let i = err.indexOf('{');
            err[i] = '';
            let er = err.split(',');

            let timestamp = er[er.length - 1].split(`:"`)[1]


            if (timestamp) {
                let tm = timestamp.replace(`"`, '');
                // console.log(new Date(tm.trim()))
                er[er.length - 1].replace(er[er.length - 1], `"time":"${tm.trim()}"`)
                // timestamp.replace(`"`, '')
                // console.log(new Date(timestamp))
            }
            let insideUl = document.createElement('ul')
            insideUl.classList.add('.list-group');

            let li;

            for (e of er) {
                li = document.createElement('li');
                li.classList.add('list-group-item');

                li.innerHTML = e;
                insideUl.append(li);
            };

            li = document.createElement('li');
            li.classList.add('list-group-item');

            li.append(insideUl);
            ul.append(li);

        }
    })