import {userService} from "./user";
import instance from "../config/axiosConfig";
import axios from 'axios';

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
            post = response.data["hydra:member"];
            return response.data["hydra:member"];
        }).catch((error) => {
            console.error(error);
        });
}

function getOwnerList(id) {
    let post = [];
    return instance.get("/api/posts?owner=" + id)
        .then(response => {
            return response.data["hydra:member"]
        }).catch((error) => {
            console.error(error);
        });
}

function add(user, post, media) {
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

    let data = new FormData();
    if (media) {
        for(let i = 0; i < media.length; i++) {
            let uriParts = media[i].uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            data.append('media', {
                uri: media[i].uri,
                name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + `.${fileType}`,
                type: `image/${fileType}`
            });
            data.append('width'+i, media[i].width);
            data.append('height'+i, media[i].height);
        }
    }

    return instance.post("/api/posts", postToAdd).then(response => {
        if (media) {
            data.append('post_id', response.data.id);
            return axios.post("http://192.168.43.103:3000/media/upload/", data).then(
                response => {
                })
        }

    }).catch(err => {
        console.log(err)
    })


}

function addComment(comment) {
    return instance.post("/api/comments", comment)
        .then(response => {
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

function toggleLikePost(postID, userID, liked) {
    if (!liked) {
        return instance.post("/api/user_likes_posts", {
            creationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
            userLikes: userID,
            postsLiked: postID
        })
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