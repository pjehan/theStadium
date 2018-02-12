export const postService = {
    getAll,
};
let postList = [
    {
        id:1,
        owner: {
            lastName: 'Maradou',
            firstName: 'Pierre',
            profilePic: '',
            sex: 'male',
            team: ''
        },
        type:'simple',
        media:[{url:'https://fthmb.tqn.com/2fD48rBEXUFqoGZd4NIXYzRXcdQ=/768x0/filters:no_upscale()/Mario_Luigi_Wallpaper_screenshot-59b77f1b396e5a00103bdd39.jpg'}],
        content: 'Bonjour je suis zinedine zidanisme',
        postDate: new Date(),
        post_likes: 42,
        post_comments: 10,
        post_shares: 1
    },
    {
        id:2,
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: ''
        },
        type:'goals',
        goals: 5,
        postDate: new Date(2017, 11, 9, 10, 2, 5),
        post_likes: 40,
        post_comments: 20,
        post_shares: 5
    },
    {
        id:3,
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: ''
        },
        type:'assists',
        assist: 1,
        postDate: new Date(2017, 11, 9, 8, 2, 5),
        post_likes: 1,
        post_comments: 202,
        post_shares: 5
    },
    {
        id:4,
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: 'Senior FD3'
        },
        type:'simple',
        content:'Jaime la teub très très fort',
        media:[{url:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'},{url:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}],
        postDate: new Date(2017, 11, 8, 10, 2, 5),
        post_likes: 4,
        post_comments: 220,
        post_shares: 5
    },
];
function getAll() {
    return Promise.resolve({
        then: function(onFulfill, onReject) { onFulfill(postList);onReject('erreur') }
    });

    /*const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);*/
    //return handleResponse(true, postList);
}
function handleResponse(test, response) {
    if (!test) {
        return Promise.reject(response.statusText);
    }

    return response;
}
