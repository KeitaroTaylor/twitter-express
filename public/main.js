const arrow = document.getElementsByClassName("fa-arrow-up");
const trash = document.getElementsByClassName("fa-trash");


//heart 
Array.from(arrow).forEach(function (element) {
    element.addEventListener('click', function () {
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

//retweet
// Array.from(retweet).forEach(function (element) {
//     element.addEventListener('click', function () {
//         const tweet = this.parentNode.parentNode.childNodes[1].innerText
//         const retweet = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
//         fetch('retweets', {
//             method: 'put',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 'tweet': tweet,
//                 'retweet': retweet
//             })
//         })
//             .then(response => {
//                 if (response.ok) return response.json()
//             })
//             .then(data => {
//                 window.location.reload(true)
//             })
//     });
// });


// // event listener for deleting when clicking trash can
// Array.from(trash).forEach(function (element) {
//     element.addEventListener('click', function () {
//         const tweet = this.parentNode.parentNode.childNodes[1].innerText 
//         fetch('tweets', {
//             method: 'delete',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 'tweet': tweet,
//             })
//         }).then(function (response) {
//             window.location.reload()
//         })
//     });
// });