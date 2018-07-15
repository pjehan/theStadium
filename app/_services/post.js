import instance from "../config/axiosConfig";
import axios from 'axios';
import {utils} from "../_constants/utils";

export const postService = {
    getAll,
    add,
    addComment,
    getComments,
    deleteComment,
    getOwnerList,
    toggleLikePost,
    sharePost
};

function getAll() {
    let post = null;
    return instance.get("/api/posts")
        .then(response => {
            return response.data["hydra:member"].reverse();
        }).catch((error) => {
            console.error(error);
        });
}

function getOwnerList(id) {
    return instance.get("/api/posts?owner=" + id)
        .then(response => {
            return response.data["hydra:member"].reverse();
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
    let url = utils.NODEJS;
    if (media) {
        if(media.length > 1) {
            url = url + 'media/uploads/';
            for (let i = 0; i < media.length; i++) {
                let uriParts = media[i].uri.split('.');
                let fileType = uriParts[uriParts.length - 1];
                data.append('media', {
                    uri: media[i].uri,
                    name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + `.${fileType}`,
                    type: `${media.type}/${fileType}`
                });
                data.append('width' + i, media[i].width);
                data.append('height' + i, media[i].height);
            }
        }else{

            url = url + 'media/upload/';
            let uriParts = media.uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            data.append('media',{
                uri:media.uri,
                name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + `.${fileType}`,
                type: `image/${fileType}`
            });
            data.append('width', media.width);
            data.append('height', media.height);
        }
    }

    return instance.post("/api/posts", postToAdd).then(response => {
        if (media) {
            data.append('post_id', response.data.id);
            return axios.post(url, data).then(
                resp => {
                    return response;
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

    return instance.delete("/api/comments/" + commentID)
        .then(response => {
            return response.data["hydra:member"];
        }).catch((error) => {
            console.error(error);
        });
}

function getComments(id) {
    return instance.get("/api/comments?post=" + id)
        .then(response => {
            return response.data["hydra:member"];
        }).catch((error) => {
            console.error(error);
        });
}

function toggleLikePost(postID, userID, liked) {
    if (liked === false) {
        return instance.post("/api/user_likes_posts", {
            userLikes: userID,
            postsLiked: postID
        })
            .then(response => {
                return response.data;
            }).catch((error) => {
                console.error(error);
            });

    } else {
        return instance.delete("/api/user_likes_post/"+ userID + "/" + postID)
            .then(response => {
                return response.data;
            }).catch((error) => {
                console.error(error);
            });
    }
}
function sharePost(postID, userID){
    return instance.post("/api/user_shares_posts", {
        creationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        userShares: userID,
        postsShared: postID,
    }).then(response => {
        return response.data
    }).catch((error) => {
        console.error(error);
    })
}