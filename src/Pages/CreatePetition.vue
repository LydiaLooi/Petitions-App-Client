<template>
    <div>
        <navigation></navigation>

        <section class="hero">

            <div class="hero-body">

                <div class="container">

                    <div class="columns is-centered">

                        <div class="column is-6-widescreen">

                            <div class="box" v-if="!createdSuccess">



                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Create a Petition</h1>
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
                                    <label class="label">Closing Date</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidClosingDate}" type="date" v-model="closingDate">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidClosingDate">Invalid closing date</p>
                                </div>


                                <div class="field">
                                    <div class="control">
                                        <a class="button is-danger" v-on:click="goBack">
                                            Cancel
                                        </a>

                                        <label class="button error-message">{{error}}</label>

                                        <a class="button is-orange float-right" v-on:click="createPetition">
                                            Create Petition
                                        </a>
                                    </div>
                                </div>


                            </div>


                            <div class="box"  v-if="createdSuccess">

                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Select Petition Photo</h1>
                                </div>

                                <div class="field">
                                    <label class="label">{{image.name}}</label>

                                    <label class="button is-orange" v-on:click="getFile()">Select new photo</label>



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

                                <div class="field">
                                    <input type="button" class="button is-danger " value="No image" v-on:click="noImage">

                                    <input type="button" class="button is-orange float-right" value="Save Image" v-on:click="submitImage()">

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
        name: "CreatePetition",
        components: {Navigation},
        async mounted(){
            if (sessionStorage.getItem("token") == null) {
                await this.$router.push({name: "Login"});
            } else {
                this.api = new ApiClient();
                await this.getAvailableCategories();
            }

        },
        data() {
            return {
                title: "",
                description: "",
                selectedCategory: -1,
                closingDate: "",
                image: "",
                imageError: "",

                availableCategories: [],
                isInvalidTitle: false,
                isInvalidDescription: false,
                isInvalidCategory: false,
                isInvalidClosingDate: false,
                petitionId: -1,

                createdSuccess: false,

                errorCount: 0,
                error: ""
            }
        },
        methods: {
            getFile() {
                document.getElementById("file").click();
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
                this.$router.push({name:"ViewPetition", params: {petitionId: String(this.petitionId)}});
            },

            async submitImage() {
                this.imageError = "";

                let response = await this.api.editPetitionImage(this.image, this.petitionId);

                if (response === 201 || response === 200) {
                    await this.$router.push({name:"ViewPetition", params: {petitionId: String(this.petitionId)}});
                } else {
                    this.imageError = "Invalid file";

                }
            },

            checkFields() {
                this.error = "";
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
                this.$router.push({name:"AllPetitions"});
            },

            async createPetition() {
                this.checkFields();

                if (this.errorCount === 0) {
                    let json = {
                        title: this.title,
                        description: this.description,
                        categoryId: this.selectedCategory
                    };

                    if (this.closingDate !== "") {
                        json["closingDate"] = this.closingDate;
                    }

                    let response = await this.api.createNewPetition(json);
                    this.petitionId = response.data.petitionId;
                    if (response.status === 201) {
                        await this.api.signPetition(this.petitionId);
                        this.createdSuccess = true;
                    } else {
                        this.error = "Invalid petition details"
                    }
                }

            }
        },
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
        color: red;
    }

    .error {
        color: red;
    }

</style>
