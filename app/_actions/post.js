import {postConstants} from '../_constants';
import {postService} from '../_services';
import {alertActions} from './alert'
export const postActions = {
    getAll,
};
let postList = [
    {
        owner: {
            lastName: 'Maradou',
            firstName: 'Pierre',
            profilePic: '',
            sex: 'male',
            team: ''
        },
        type:'simple',
        media:[{url:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}],
        content: 'Bonjour je suis zinedine zidanisme',
        postDate: new Date(),
        post_likes: 42,
        post_comments: 10,
        post_shares: 1
    },
    {
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

    return (dispatch) => {
        dispatch(request());
        postService.getAll()
            .then(
                posts => dispatch(success({posts})),
                error => {
                    console.log(error)
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() {return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, payload: error} }
}