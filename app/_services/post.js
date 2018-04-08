import {userService} from "./user";
import instance from "../config/axiosConfig";
export const postService = {
    getAll,
    add,
    addComment,
    getComments,
    deleteComment,
    getOwnerList,
    toggleLikePost
};
function getAll() {
    let post = null;
    return instance.get("/api/posts")
        .then(response => {
            console.log(response)
            post = response.data["hydra:member"];
            return response.data["hydra:member"];
        }).catch((error) => {
            console.error(error);
        });
}
function getOwnerList(id){
    let post = [];
    return instance.get("/api/posts?owner=" + id)
        .then(response => {
            post.push(response.data);
            return post;
        }).catch((error) => {
            console.error(error);
        });
}
function add(user, post){
    let postToAdd = {
        title: "",
        creationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        content: "",
        goalsNbr: 0,
        passNbr: 0,
        postType: null,
        medias: [],
        comments: [],
        owner: user,
    };
    Object.assign(postToAdd, post);
    console.log(postToAdd)
    return instance.post("/api/posts",postToAdd).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })

}

function addComment(comment) {
    return instance.post("/api/comments", comment)
        .then(response => {
            console.log(response)
            return response.data;
        }).catch((error) => {
            console.error(error);
        });
}
function deleteComment(commentID, postID) {
    /*postList[id].post_comments.splice(commentID,1);
    return Promise.resolve({
        then: function(onFulfill, onReject) {onFulfill(postList[id].post_comments);onReject('erreur')}
    })*/
    return instance.delete("/api/comments/" + commentID)
        .then(response => {
            console.log(response)
            return response.data["hydra:member"];
        }).catch((error) => {
            console.error(error);
        });
}
function getComments(id) {

   let comments = [];
    return instance.get("/api/comments?post=" + id)
        .then(response => {
            console.log(response)
            comments.push(response.data["hydra:member"]);
            /*return userService.getUser(response.data.user).then(
                user => {
                    comments[0].user = user;
                    return comments;
                }
            );*/
            return comments;

        }).catch((error) => {
            console.error(error);
        });
}
function toggleLikePost(postID, userID, liked){
    console.log(liked)
    if(!liked) {
        return instance.post("/api/user_likes_posts",{ creationDate: '2018-03-01 00:00:00',
            userLikes: userID,
            postsLiked: postID})
            .then(response => {
                console.log(response)
                return response.data;
            }).catch((error) => {
                console.error(error);
            });

    } else {
        return instance.get("/api/user_likes_posts")
            .then(response => {
                console.log(response)
                return response.data;
            }).catch((error) => {
                console.error(error);
            });
    }
}