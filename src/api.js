import axios from "axios"


const SERVER_URL = "http://localhost:4941/api/v1/";
// const SERVER_URL = "http://csse-s365.canterbury.ac.nz:4001/api/v1/";

const server = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000
});





export class ApiClient {
    constructor(urlRoot) {
        this.urlRoot = urlRoot;
    }



    async getPetitions() {

        return server.get("petitions").then(function (response) {


            return response.data;

        }).catch(function (error) {

            return error.response;

        });
    }


    async getPetitionsWithQueries(queries) {
        return server.get("petitions", {params: queries}).then(function (response) {
            return response.data;

            // eslint-disable-next-line no-unused-vars
        }).catch(function (error) {
            // Get all of them
            return server.get("petitions").then(function (response) {
                return response.data;
            }).catch(function (error) {
                return error.response;
            });
        });
    }

    async getAvailableCategories() {
        return server.get("petitions/categories").then(function (response) {
            return response.data;

        }).catch(function (error) {
            return error.response;

        });
    }

    async getPetitionInformation(petitionId) {
        return server.get(`petitions/${petitionId}`).then(function (response) {
            return response.data;

        }).catch(function (error) {
            return error.response;

        });
    }

    async getPetitionSignatures(petitionId) {
        return server.get(`petitions/${petitionId}/signatures`).then(function (response) {
            return response.data;

        }).catch(function (error) {
            return error.response;

        });

    }

    getPetitionImage(petitionId) {
        return `${SERVER_URL}petitions/${petitionId}/photo`;
    }

    getUserImage(signatoryId) {
        return `${SERVER_URL}users/${signatoryId}/photo`;
    }

    async loginUser(email, password) {
        let json = {
            email: email,
            password: password
        };
        return server.post(`users/login`, json).then(function (response) {
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("token", response.data.token);
            return response.status;

        }).catch(function (error) {
            return error.response.status;

        });

    }

    async logoutUser() {
        return server.post("users/logout", null ,{headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {
            return response.status;
        }).catch(function (error) {
            return error.response.status;
        })
    }

    async registerUser(json) {
        return server.post("users/register", json).then(function (response) {

            return response.status;
        }).catch(function (error) {
            return error.response.status;
        })

    }

    async editUser(json) {
        return server.patch("users/" + sessionStorage.getItem("userId"), json, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {

            return response.status;
        }).catch(function (error) {
            return error;
        })

    }

    async editUserImage(request) {
        return server.put(`users/${sessionStorage.getItem("userId")}/photo`, request, {
            headers: {
                'X-Authorization': sessionStorage.getItem("token"),
                'Content-Type': request.type
            }}).then(function (response) {

            return response.status;
        }).catch(function (error) {
            return error.response.status;
        })

    }

    async createNewPetition(json) {
        return server.post("petitions", json, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {

            return response;
        }).catch(function (error) {
            return error.response;
        })
    }

    async editPetition(petitionId, json) {
        return server.patch(`petitions/${petitionId}`, json, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {

            return response.status;
        }).catch(function (error) {
            return error.response.status;
        })
    }

    async editPetitionImage(image, petitionId) {
        return server.put(`petitions/${petitionId}/photo`, image, {
            headers: {
                'X-Authorization': sessionStorage.getItem("token"),
                'Content-Type': image.type
            }}).then(function (response) {

            return response.status;
        }).catch(function (error) {
            return error.response.status;
        })
    }

    async signPetition(petitionId) {
        return server.post(`petitions/${petitionId}/signatures`, null, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {
            return response.status;
        }).catch(function (error) {
            return error.response;
        })
    }

    async unsignPetition(petitionId) {
        return server.delete(`petitions/${petitionId}/signatures`, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {
            return response.status;
        }).catch(function (error) {
            return error.response;
        })
    }

    async deletePetition(petitionId) {
        return server.delete(`petitions/${petitionId}`, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {
            return response.status;
        }).catch(function (error) {
            return error.response;
        })
    }


    async getUserInfo() {
        // return server.get(`users/1`, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {

        return server.get(`users/${sessionStorage.getItem("userId")}`, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {
            return response.data;
        }).catch(function (error) {
            return error.response.status;
        })
    }

    async deleteUserPhoto() {
        return server.delete(`users/${sessionStorage.getItem("userId")}/photo`, {headers: {'X-Authorization': sessionStorage.getItem("token")}}).then(function (response) {
            return response.status;
        }).catch(function (error) {
            return error.response.status;
        })
    }
}

