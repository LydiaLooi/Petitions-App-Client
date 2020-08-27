<template>
    <div>
        <navigation></navigation>

        <section class="hero">

            <div class="hero-body">

                <div class="container">

                    <div class="columns is-centered">

                        <div class="column is-6-widescreen">
                            <div class="box">
<!--                                <img :src="getImage" alt="Avatar" onerror="this.onerror=null;this.src='https://cdn.discordapp.com/attachments/474461177309691904/711913897820422195/defaultUser.png';">-->

                                <img :src="getImage" class="box main-image" alt="Avatar" onerror="this.onerror=null;this.src='https://cdn.discordapp.com/attachments/474461177309691904/711913897820422195/defaultUser.png';">
                                <div class=" has-background-orange">
                                    <h1 class="header-content content is-large">
                                        {{name}}
                                        <span class="float-right button is-dark-orange" v-on:click="editProfile" v-cloak>Edit Profile</span>
                                    </h1>
                                </div>

                                <div class="card-content">
                                    <div class="columns">
                                        <div class="column">
                                            <label class="label">
                                                Email:
                                            </label>
                                            <p>{{email}}</p><br>
                                        </div>

                                        <div class="column">
                                            <label class="label" v-if="country !== null">
                                                Country:
                                            </label>
                                            <p>{{country}}</p><br>

                                            <label class="label" v-if="city !== null">
                                                City:
                                            </label>
                                            <p>{{city}}</p><br>
                                        </div>
                                    </div>





                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    import Navigation from "@/Components/Navigation";
    import {ApiClient} from "@/api";

    export default {
        name: "ViewProfile",
        components: {Navigation},
        async mounted() {

            if (sessionStorage.getItem("token") == null) {
                await this.$router.push({name:"Login"});
            } else {
                this.api = new ApiClient();
                this.getImage = this.api.getUserImage(sessionStorage.getItem("userId"));

                let info = await this.api.getUserInfo();
                if (info.email == null) {
                    sessionStorage.clear();
                    await this.$router.push({name:"Login"});
                } else {
                    this.updateInfo(info);
                }
            }





        },
        data() {
            return {
                name: "",
                email: "",
                country: "",
                city: "",
                getImage: ""
            }
        },
        methods: {
            updateInfo(info) {
                this.name = info.name;
                this.email = info.email;
                this.country = info.country;
                this.city = info.city;
            },
            editProfile() {
                this.$router.push({name:"EditProfile"});
            }
        },

    }
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }

    .general-wrapper {
        margin: 4em auto auto;
        max-width: 60%;
    }


    .cover-image {

        /*background-image: url("https://media.discordapp.net/attachments/590189070156693505/704481012918255626/image0.jpg?width=507&height=676");*/
        background-size: cover;
        border-bottom-left-radius: 2em;
        min-height: 200px;
        min-width: 100px;
        border-top-right-radius: 2em;
        overflow: auto;

    }

    .object-fit-image {
        display: block;
        /*width: 100vw;*/
        /*min-width: 12em;*/
        width: 100%;
        max-height: 20em;
        /*max-width: 25em;*/
        /*height: 100vh;*/
        height: 100%;
        /*object-fit: cover;*/
        object-fit: cover;
        /*overflow: hidden;*/
        border-bottom-left-radius: 2em;
        border-top-right-radius: 2em;

    }

    .card-header {
        border-top-right-radius: 2em;
        border-bottom-left-radius: 2em;

    }


    .button.is-orange {
        background-color: #fea94f;
        border-color: transparent;
    }

    .button.is-orange:hover, .button.is-orange.is-hovered {
        background-color: #fe8a3f;
        border-color: transparent;
    }

    .button.is-orange:focus, .button.is-orange.is-focused {
        border-color: transparent;
    }

    .button.is-orange:focus:not(:active), .button.is-orange.is-focused:not(:active) {
        box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
    }

    .button.is-orange, .button.is-orange.is-active {
        background-color: #fea94f;
        border-color: transparent;
    }


    .button.is-dark-orange {
        background-color: #ef8446;
        border-color: transparent;
    }

    .button.is-dark-orange:hover, .button.is-dark-orange.is-hovered {
        background-color: #e06c32;
        border-color: transparent;
    }

    .button.is-dark-orange:focus, .button.is-dark-orange.is-focused {
        border-color: transparent;
    }

    .button.is-dark-orange:focus:not(:active), .button.is-dark-orange.is-focused:not(:active) {
        box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
    }

    .button.is-dark-orange, .button.is-dark-orange.is-active {
        background-color: #ef8446;
        border-color: transparent;
    }

    /*.box {*/
    /*    border-bottom-left-radius: 2em;*/
    /*    border-top-right-radius: 2em;*/

    /*}*/

    .column {
        overflow: hidden;
    }

    .has-background-orange {
        background-color: #fea94f !important;
        border-bottom-left-radius: 2em;
        border-top-right-radius: 2em;
        overflow: hidden;
    }

    .box {
        overflow: hidden;
    }

    /*.box:hover .card-header.has-background-orange {*/
    /*    background-color: #fe8a3f !important;*/
    /*    cursor: pointer;*/
    /*}*/

    .float-right {
        float: right;
    }

    .header-content {
        background-color: transparent;
        padding: 1.5rem;
        width: 100%;
    }

    .min-width {
        min-width: 300px;
    }

    .main-image {
        margin: auto;
        max-height: 30em;
    }
</style>
