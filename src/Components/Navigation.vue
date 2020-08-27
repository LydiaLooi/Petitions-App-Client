<template>
    <div id="navigation">
        <div class="nav-bar">

<!--            -->
<!--            <div>-->
<!--                <ul class="left-nav-item" v-on:click="navClick(routes.page)" v-for="routes in linksLeft" v-bind:key="routes.id">{{routes.name}}</ul>-->
<!--            </div>-->
            <div>
                <ul class="left-nav-item" v-on:click="navClick(routes.page)" v-for="routes in linksLeft" v-bind:key="routes.id" :class="{'is-hidden':checkLoggedIn(routes.mustBeLoggedIn)}">{{routes.name}}</ul>
            </div>




            <div class="float-right" v-if="!isLoggedIn">
                <ul class="left-nav-item" v-on:click="navClick('Login')">Login</ul>
            </div>

            <div class="float-right" v-if="!isLoggedIn">
                <ul class="left-nav-item" v-on:click="navClick('Register')">Register</ul>
            </div>

            <div class="float-right" v-if="isLoggedIn">
                <ul class="left-nav-item" v-on:click="logout">Logout</ul>
            </div>


            <div class="float-right" v-if="isLoggedIn">
                <ul class="left-nav-item" v-on:click="navClick('ViewProfile')">My Profile</ul>
            </div>

        </div>
    </div>
</template>

<script>

    import {ApiClient} from "@/api";

    export default {
        name: "Navigation",

        created: async function () {
            this.api = new ApiClient();


            if (sessionStorage.getItem("token") !== null) {
                this.isLoggedIn = true;
            }

        },

        data() {
            return {
                linksLeft: [
                    {
                        id: 0,
                        name: "Home",
                        page: "Home",
                        mustBeLoggedIn: false
                    },
                    {
                        id: 1,
                        name: "View Petitions",
                        page: "AllPetitions",
                        mustBeLoggedIn: false
                    },
                    {
                        id: 2,
                        name: "Create Petition",
                        page: "CreatePetition",
                        mustBeLoggedIn: true
                    },
                ],
                isLoggedIn: false
            }
        },
        methods: {
            navClick(page) {
                if (this.$route.name !== page) {
                    this.$router.push({name:page, params: {profileId: this.$route.params.profileId}});
                }
            },

            async logout() {
                await this.api.logoutUser();
                sessionStorage.clear();
                this.isLoggedIn = false;
                this.navClick("Login");

            },

            checkLoggedIn(mustBeLoggedIn) {
                if (mustBeLoggedIn) {
                    if (sessionStorage.getItem("token") !== null) {
                        return false;
                    } else {
                        return true;
                    }
                }
                return false;
            }
        },
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #111111;
    }

    li {
        float: left;
    }

    .nav-bar {
        background-color: #fea94f;
        overflow: hidden;
        color: #1d0900 ;
    }

    .float-right {
        float: right;
    }

    .right-nav-item {
        float: right;
        background-color: inherit;
        /*display: inline-block;*/
        color: #1d0900;
        text-align: center;
        text-decoration: none;
        padding: 1em 2em;
        /*box-shadow: inherit;*/
    }

    .left-nav-item {
        float: left;
        background-color: inherit;
        /*display: inline-block;*/
        /*color: white;*/
        text-align: center;
        text-decoration: none;
        padding: 1em 2em;
        /*box-shadow: inherit;*/
    }

    .left-nav-item:hover, .dropdown:hover .dropdown-root{
        background-color: #fe8a3f;
        /*-moz-box-shadow:    inset 1px 10px 15px -6px #272727;*/
        /*-webkit-box-shadow: inset 1px 10px 15px -6px #272727;*/
        /*box-shadow: inset 1px 10px 15px -6px #272727;*/

    }

    .dropdown {
        float: left;
        overflow: hidden;
    }

    .dropdown-root {
        background-color: inherit;

    }

    .dropdown .dropdown-root {
        text-decoration: none;
        display: block;
        float: none;
        border: none;
        outline: none;
        color: #1d0900;
        padding: 1em 2.2em;
        background-color: inherit;
        font-family: inherit;
        margin: 0;


    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: inherit;
        min-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown:hover .dropdown-content {
        display: block;

    }


    .dropdown-content-link {
        float: none;
        color: white;
        padding: 1em 2em;
        text-decoration: none;
        display: block;
        background-color: #3c3c3c;
    }

    .dropdown-content-link:hover {
        background-color: #005631;

    }
</style>
