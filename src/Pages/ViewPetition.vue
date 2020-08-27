<template>
    <div>
        <navigation></navigation>
        <!--        <div class="general-wrapper">-->
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-8-widescreen">
                            <div class="box">

                                <div class="field">
                                    <div class="control">
                                        <a class="button is-orange" v-on:click="goBack">
                                            Back To Petitions
                                        </a>
                                    </div>
                                </div>


                                <div class="box min-width">


                                    <img :src="getImage" class="box main-image" onerror="this.onerror=null;this.src='https://cdn.discordapp.com/attachments/474461177309691904/711766530827878490/default.png';">


                                    <div class=" has-background-orange">
                                        <h1 class="header-content content is-large">
                                            {{title}}
                                            <span class="float-right button is-dark-orange" v-if="showEditButton" v-on:click="editPetition" v-cloak>Manage Petition</span>
                                        </h1>
                                    </div>


                                    <div class="card-content">
                                        <label class="content is-medium">Category: {{category}}</label><br>
                                        <label class="content ">Author: {{authorName}}</label><br><br>
                                        <label class="content ">{{description}}</label><br><br>
                                        <label class="content ">Created Date: {{createdDate}}</label><br>
                                        <label class="content " v-if="closingDate != null">Closing Date:
                                            {{closingDate}}</label><br>

                                    </div>
                                    <button class="button is-orange is-large float-right" v-if="showSignButton" v-on:click="signPetition">Sign Petition</button>
                                    <button class="button is-danger is-large float-right" v-if="showUnsignButton" v-on:click="unsignPetition">Unsign</button>


                                </div>
                                <share-buttons></share-buttons>

                            </div>

                        </div>

                    </div>


                    <section class="hero">
                        <div class="hero-body">
                            <div class="container">
                                <div class="columns is-centered">
                                    <div class="column is-8-widescreen">


                                        <!--            <section class="column is-5-widescreen">-->
                                        <div class="box has-background-orange">
                                            <h1 class="content is-large">Signatories: {{signatureCount}}</h1>
                                        </div>

                                        <div class="columns">
                                            <div class="column min-width">
                                                <UserPanel class=""
                                                           v-for="user in signatures2"
                                                           v-bind:key="user.signatoryId"
                                                           v-bind:signatory-id="user.signatoryId"
                                                           v-bind:name="user.name"
                                                           v-bind:city="user.city"
                                                           v-bind:country="user.country"
                                                           v-bind:signed-date="user.signedDate"></UserPanel>
                                            </div>
                                            <div class="column min-width">
                                                <UserPanel class=""
                                                           v-for="user in signatures1"
                                                           v-bind:key="user.signatoryId"
                                                           v-bind:signatory-id="user.signatoryId"
                                                           v-bind:name="user.name"
                                                           v-bind:city="user.city"
                                                           v-bind:country="user.country"
                                                           v-bind:signed-date="user.signedDate"></UserPanel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    import {ApiClient} from "@/api";
    import UserPanel from "@/Components/UserPanel";
    // import ShareButtons from "@/Components/ShareButtons";
    import Navigation from "@/Components/Navigation";
    import ShareButtons from "@/Components/ShareButtons";


    export default {
        name: "ViewPetition",
        components: {ShareButtons, Navigation, UserPanel},
        data() {
            return {
                petitionId: -1,
                title: "",
                category: "",
                authorName: "",
                signatureCount: "",
                description: "",
                authorId: "",
                authorCity: "",
                authorCountry: "",
                createdDate: "",
                closingDate: "",
                allSignatures: [],
                signatures1: [],
                signatures2: [],
                getImage: "",
                isAuthor: true,
                hasClosed: true,
                showSignButton: false,
                showEditButton: false,
                showUnsignButton: false,
                hasSigned: false,
                shareLink: "",
                isLoggedIn: false

            }
        },
        async mounted() {
            if (sessionStorage.getItem("token") != null) {
                this.isLoggedIn = true;
            }
            this.shareLink = "https://canterbury.ac.nz" + this.$route.fullPath;
            this.petitionId = this.$route.params.petitionId;
            this.api = new ApiClient();
            this.getImage = this.api.getPetitionImage((this.$route.params.petitionId));

            let data = await this.api.getPetitionInformation(this.petitionId);
            if (data.status === 404) {
                await this.$router.push({name:"PageNotFound"});
            } else {

                this.title = data.title;
                this.category = data.category;
                this.authorName = data.authorName;
                this.signatureCount = data.signatureCount;
                this.description = data.description;
                this.authorId = data.authorId;
                this.authorCity = data.authorCity;
                this.createdDate = (new Date(Date.parse(data.createdDate))).toDateString();

                if (data.closingDate != null) {
                    this.closingDate = (new Date(Date.parse(data.closingDate))).toDateString();

                    let today = new Date();

                    if (Date.parse(this.closingDate) < today) {
                        this.hasClosed = true;
                    } else {
                        this.hasClosed = false;
                    }

                } else {
                    this.closingDate = null;
                    this.hasClosed = false;
                }

                await this.reloadSignatures();

                if (sessionStorage.getItem("userId") == this.authorId) {
                    this.isAuthor = true;
                } else {
                    this.isAuthor = false;
                }

                this.hasSigned = this.hasSignedPetition();

                this.showEditButton = this.isLoggedIn && (this.isAuthor && !this.hasClosed);
                this.showSignButton = this.isLoggedIn && (!this.isAuthor && !this.hasSigned && !this.hasClosed);
                this.showUnsignButton = this.isLoggedIn && (!this.isAuthor && this.hasSigned && !this.hasClosed);



            }


        },
        methods: {
            hasSignedPetition() {
                for (let id in this.allSignatures) {
                    if(this.allSignatures[id].signatoryId == sessionStorage.getItem("userId")) {
                        return true;
                    }
                }
                return false;

            },
            goBack() {
                this.$router.push({name: "AllPetitions"});
            },
            editPetition() {
                this.$router.push({name:"ManagePetition", params: {profileId: this.$route.params.petitionId}})
            },
            async signPetition() {
                let response = await this.api.signPetition(this.$route.params.petitionId);
                if (response === 201) {
                    this.showSignButton = false;
                    this.showUnsignButton = true;

                    this.reloadSignatures();
                }
            },

            async unsignPetition() {
                let response = await this.api.unsignPetition(this.$route.params.petitionId);
                if (response === 200) {
                    this.showUnsignButton = false;
                    this.showSignButton = true;
                    this.reloadSignatures();
                }
            },

            async reloadSignatures() {
                let signatures = await this.api.getPetitionSignatures(this.petitionId);
                this.allSignatures = signatures;
                this.signatures1 = signatures.splice(0, this.signatureCount / 2);
                this.signatures2 = signatures;
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

    .box {
        border-bottom-left-radius: 2em;
        border-top-right-radius: 2em;

    }

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

    .centered {
        margin: auto;
    }
</style>
