<template>
    <div>
        <navigation></navigation>

        <section class="hero">

            <div class="hero-body">

                <div class="container">

                    <div class="columns is-centered">

                        <div class="column is-6-widescreen">
                            <div class="field">
                                <a class="button is-orange" v-on:click="goBack">
                                    Back to petition
                                </a>
                            </div>

                            <div class="box">



                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Manage Petition</h1>
                                </div>
                                <div class="field">
                                    <label class="label required">Title</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidTitle}" type="text" placeholder="Petition title" v-model="title">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidTitle">Invalid title</p>
                                </div>

                                <div class="field">
                                    <label class="label required">Description</label>
                                    <div class="control">
                                        <textarea class="textarea" :class="{'is-danger':isInvalidDescription}" type="text" placeholder="Petition description" v-model="description"></textarea>

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidDescription">Invalid description</p>
                                </div>

                                <div class="field">

                                    <div class="field">

                                        <div class="control">
                                            <label class="label required">Category</label>

                                            <div class="control is-expanded">
                                                <div class="select is-fullwidth" :class="{'is-danger':isInvalidCategory}">
                                                    <select name="category" v-model="selectedCategory">
                                                        <option v-for="category in availableCategories"
                                                                v-bind:key="category.categoryId"
                                                                v-bind:value="category.categoryId">{{category.name}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <p class="help is-danger" v-if="isInvalidCategory">Category required</p>


                                        </div>
                                    </div>



                                </div>

                                <div class="field">
                                    <label class="label">Closing Date  <span class="content is-small">(Can't be removed once added)</span></label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidClosingDate}" type="date" v-model="closingDate">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidClosingDate">Invalid closing date</p>
                                </div>


                                <div class="field">
                                    <div class="control">

                                        <label class="success">{{savedMessage}}</label>
                                        <label class="error">{{savedError}}</label>



                                        <a class="button is-orange float-right" v-on:click="savePetition">
                                            Save Petition
                                        </a>
                                    </div>
                                </div>


                            </div>


                            <div class="box">

                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Change Petition Photo</h1>
                                </div>
                                <div class="">
<!--                                    <img :src="getImage" class="box main-image" onerror="this.onerror=null;this.src='https://cdn.discordapp.com/attachments/474461177309691904/711766530827878490/default.png';">-->

                                </div>

                                <div class="field">
                                    <label class="button is-orange" v-on:click="getFile()">Select new photo</label>
<!--                                    <input type="button" class="button is-danger " value="Clear image" v-on:click="noImage">-->
                                    <input type="button" class="button is-orange float-right" value="Save Image" v-on:click="submitImage()">

                                    <label class="label">{{image.name}}</label>


<!--                                    <input type="file" id="file" ref="file" v-on:change="saveImage()"/>-->
                                </div>

                                <div class="field">


<!--                                    <div id="yourBtn" style="height: 50px; width: 100px;border: 1px dashed #BBB; cursor:pointer;" >Click to upload!</div>-->
                                    <div style='height: 0px;width:0px; overflow:hidden;'>
                                        <input id="file" type="file" ref="file" value="upload" v-on:change="saveImage()"/>
                                    </div>




                                    <label class="error">{{imageError}}</label>
                                    <label class="success float-right">{{imageSuccess}}</label>
                                </div>

                            </div>

                                <div class="field">

                                    <a class="button is-orange" v-on:click="goBack">
                                        Back to petition
                                    </a>

                                    <button class="button is-danger float-right" v-on:click="deletePetition">Delete Petition</button>
                                    <label class="button error-message">{{deleteError}}</label>

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
        name: "EditPetition",
        components: {Navigation},
        async mounted(){
            this.api = new ApiClient();
            await this.getAvailableCategories();
            let petitionInfo = await this.api.getPetitionInformation(this.$route.params.petitionId);


            if (petitionInfo.authorId != sessionStorage.getItem("userId")) {

                await this.$router.push({name:"ViewPetition", params: {petitionId: this.$route.params.petitionId}});
            } else {
                if (petitionInfo.closingDate != null) {
                    this.closingDate = (new Date(Date.parse(petitionInfo.closingDate))).toDateString();

                    let today = new Date();


                    if (Date.parse(this.closingDate) < today) {
                        await this.$router.push({name:"ViewPetition", params: {petitionId: this.$route.params.petitionId}});
                    }
                    else {
                        this.updateInfo(petitionInfo);
                        this.getImage = this.api.getPetitionImage((this.$route.params.petitionId));
                    }
                } else {
                    this.updateInfo(petitionInfo);
                    this.getImage = this.api.getPetitionImage((this.$route.params.petitionId));
                }

            }


        },
        data() {
            return {
                title: "",
                description: "",
                selectedCategory: -1,
                closingDate: "",
                image: {name:"No Image selected"},
                imageError: "",
                imageSuccess: "",
                savedMessage: "",
                savedError: "",

                deleteError: "",

                availableCategories: [],
                isInvalidTitle: false,
                isInvalidDescription: false,
                isInvalidCategory: false,
                isInvalidClosingDate: false,
                petitionId: -1,


                errorCount: 0,
                error: "",

                getImage: ""
            }
        },
        methods: {
            getFile() {
                document.getElementById("file").click();
            },
            updateInfo(petitionInfo) {

                this.title = petitionInfo.title;
                this.description = petitionInfo.description;
                for (let id in this.availableCategories) {
                    if (this.availableCategories[id].name === petitionInfo.category) {

                        this.selectedCategory = parseInt(id) + 1;

                        break;
                    }
                }

                if (petitionInfo.closingDate != null) {

                    let date = new Date(Date.parse(petitionInfo.closingDate))
                    this.closingDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                }


            },

            async getAvailableCategories() {
                let categories = await this.api.getAvailableCategories()
                for (let id in categories) {
                    this.availableCategories.push(categories[id]);
                }
            },
            saveImage() {

                this.image = this.$refs.file.files[0];

            },
            noImage() {
                this.image = {name:"No Image selected"};
                // this.$router.push({name: "ViewPetition", params: {petitionId: String(this.petitionId)}});
            },

            async submitImage() {
                this.imageError = "";

                if (this.image.name === "No Image selected") {
                    this.imageError = "An image must be selected to save"
                } else {
                    let response = await this.api.editPetitionImage(this.image, this.$route.params.petitionId);

                    if (response === 201 || response === 200) {
                        this.imageSuccess = "Image successfully saved";
                        // await this.$router.push({name: "ViewPetition", params: {petitionId: String(this.petitionId)}});
                    } else {
                        this.imageError = "Invalid file";

                    }
                }



            },

            checkFields() {
                this.error = "";
                this.savedError = "";
                this.errorCount = 0;
                this.isInvalidTitle = false;
                this.isInvalidDescription = false;
                this.isInvalidCategory = false;
                this.isInvalidClosingDate = false;

                if (this.title.length === 0 || this.title.length > 256) {
                    this.isInvalidTitle = true;
                    this.errorCount++;
                }

                if (this.description.length === 0 || this.description.length > 2048) {
                    this.isInvalidDescription = true;
                    this.errorCount++;
                }

                if (this.selectedCategory < 0) {
                    this.isInvalidCategory = true;
                    this.errorCount++;
                }

                let today = new Date();

                if (this.closingDate !== "") {
                    let closingDate = new Date(this.closingDate);

                    if (closingDate <= today) {
                        this.isInvalidClosingDate = true;
                        this.errorCount++;

                    }


                }

            },

            goBack() {
                this.$router.push({name: "ViewPetition", params: {petitionId: this.$route.params.petitionId}});
            },

            async deletePetition() {
                let response = await this.api.deletePetition(this.$route.params.petitionId);
                if (response === 200) {
                    await this.$router.push({name:"AllPetitions"});
                } else {
                    this.deleteError = "Could not delete petition"
                }
            },

            async savePetition() {
                this.checkFields();
                this.savedMessage = "";

                if (this.errorCount === 0) {
                    let json = {
                        title: this.title,
                        description: this.description,
                        categoryId: this.selectedCategory
                    };

                    if (this.closingDate !== "") {
                        json["closingDate"] = this.closingDate;
                    }

                    let response = await this.api.editPetition(this.$route.params.petitionId, json);
                    if (response === 200) {
                        // await this.$router.push({name:"ViewPetition", params: {petitionId: this.$route.params.petitionId}});
                        this.savedMessage = "Successfully saved details";
                    } else {
                        this.savedError = "Invalid petition details"
                    }
                }

            }
        }
    }
</script>

<style scoped>
    .box {
        overflow: hidden;
    }

    .has-background-orange {
        background-color: #fea94f !important;
        border-bottom-left-radius: 2em;
        border-top-right-radius: 2em;
    }

    .required:after {
        content:" *";
        color: red;
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

    .float-right {
        float: right;
    }

    .error-message {
        border: none;
        cursor: auto;
        color: #ff8c82;
        background: transparent;
    }

    .success {
        color: #00a91d;
    }

    .error {
        color: red;
    }

    .main-image {
        margin: auto;
        max-height: 30em;
    }

    #select-photo-button {
        margin: auto;
    }

    input[type="file"] {
        display: none;
    }

    .centered {
        margin: auto !important;
    }

    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
</style>
