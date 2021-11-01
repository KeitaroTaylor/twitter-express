const arrow = document.getElementsByClassName("fa-arrow-up");
const trash = document.getElementsByClassName("fa-trash");



Array.from(arrow).forEach(function (element) {
    element.addEventListener('click', function () {
    console.log(this.parentNode.parentNode.childNodes)
        const count = parseInt(this.parentNode.parentNode.childNodes[1].innerText)
        const species = this.parentNode.parentNode.childNodes[3].innerText
        fetch('birds', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'count': count,
                'species': species,
            })
        })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                window.location.reload(true)
            })
    });
});



Array.from(trash).forEach(function (element) {
    element.addEventListener('click', function () {
    console.log(this.parentNode.parentNode.childNodes)
        const count = parseInt(this.parentNode.parentNode.childNodes[1].innerText)
        const species = this.parentNode.parentNode.childNodes[3].innerText
        fetch('birds', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'count': count,
                'species': species,
            })
        })
            .then(response => {
                window.location.reload()
            })
    });
});
