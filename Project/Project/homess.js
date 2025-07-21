fetch('https://reqres.in/api/users', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'user 1'
    })
})
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS');
        } else {
            console.log('NOT SUCCESSFUL');
        }
        return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR:', error));