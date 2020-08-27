<template>
    <div>
        <navigation></navigation>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-6-widescreen">
                            <div class="box" v-if="!registerSuccess">
                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Create an Account</h1>
                                </div>

                                <div class="field">
                                    <label class="label required">Name</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidName}" type="text" placeholder="e.g. John Smith" v-model="name">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidName">Name required</p>
                                </div>

                                <div class="field">
                                    <label class="label required">Email</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidEmail}" type="email" placeholder="e.g. godgamer@gmail.com" v-model="email">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidEmail">{{invalidEmailMessage}}</p>
                                </div>

                                <div class="field">
                                    <label class="label required">Password</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidPassword}" type="password" placeholder="*********" v-model="password">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidPassword">Password required</p>
                                </div>

                                <div class="field">
                                    <div class="columns">
                                        <div class="column">
                                            <label class="label">Country</label>
                                             <div class="control">
                                               <input class="input" :class="{'is-danger':isInvalidCountry}" type="text" placeholder="e.g. New Zealand" v-model="country">

                                            </div>
                                             <p class="help is-danger" v-if="isInvalidCountry">Invalid country</p>
                                        </div>
                                        <div class="column">
                                            <label class="label">City</label>
                                            <div class="control">
                                                <input class="input" :class="{'is-danger':isInvalidCity}" type="text" placeholder="e.g. Christchurch" v-model="city">

                                            </div>
                                            <p class="help is-danger" v-if="isInvalidCity">Invalid city</p>
                                        </div>

                                    </div>

                                </div>




                                <div class="field">
                                    <label id="login-link" v-on:click="login">
                                        I have an account!
                                    </label>
                                </div>
                                <div class="field">

                                    <input type="button" class="button is-orange" value="Register" v-on:click="register">
                                    <label class="error" v-if="isInvalidDetails"> Incorrect details</label>
                                </div>
                            </div>
<!--                            <div class="box" v-if="registerSuccess">-->
<!--                                <div class="field" >-->
<!--                                    <label class="label">Select your profile picture</label>-->

<!--                                    <input type="file" id="file" ref="file" v-on:change="saveImage()"/>-->


<!--                                </div>-->

<!--                                <div class="field">-->
<!--                                    <input type="button" class="button is-danger " value="No Image" v-on:click="noImage">-->

<!--                                    <input type="button" class="button is-orange float-right" value="Submit Image" v-on:click="submitImage()">-->

<!--                                    <label class="error">{{imageError}}</label>-->

<!--                                </div>-->
<!--                            </div>-->

                            <div class="box" v-if="registerSuccess">

                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Select Profile Picture</h1>
                                </div>
                                <div class="">
                                    <!--                                    <img :src="getImage" class="box main-image" onerror="this.onerror=null;this.src='https://cdn.discordapp.com/attachments/474461177309691904/711766530827878490/default.png';">-->

                                </div>

                                <div class="field">
                                    <label class="label">{{image.name}}</label>

                                    <label class="button is-orange" v-on:click="getFile()">Select new photo</label>
                                    <input type="button" class="button is-orange float-right" value="Save Image" v-on:click="submitImage()">
                                    <input type="button" class="button is-danger float-right" value="I don't want a photo" v-on:click="noImage">



                                    <!--                                    <input type="file" id="file" ref="file" v-on:change="saveImage()"/>-->
                                </div>

                                <div class="field">


                                    <!--                                    <div id="yourBtn" style="height: 50px; width: 100px;border: 1px dashed #BBB; cursor:pointer;" >Click to upload!</div>-->
                                    <div style='height: 0px;width:0px; overflow:hidden;'>
                                        <input id="file" type="file" ref="file" value="upload" v-on:change="saveImage()"/>
                                    </div>




                                    <label class="error">{{imageError}}</label>
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
        name: "Register",
        components: {Navigation},
        mounted() {
            this.api = new ApiClient();

        },
        data() {
            return {
                errorCount: 0,

                email: "",
                password: "",
                name: "",
                city: "",
                country: "",
                image: "",

                registerSuccess: false,

                isInvalidPassword: false,
                isInvalidEmail: false,
                isInvalidName: false,
                isInvalidDetails: false,
                isInvalidCountry: false,
                isInvalidCity: false,
                invalidEmailMessage: "",
                imageError: ""
            }
        },
        methods: {

            getFile() {
                document.getElementById("file").click();
            },
            login() {
                this.$router.push({name:"Login"});
            },
            async register() {
                this.checkFields();

                if (this.errorCount === 0) {

                    let json = {
                        email: this.email,
                        name: this.name,
                        password: this.password
                    };

                    if (this.city.length !== 0) {
                        json["city"] = this.city;
                    }

                    if (this.country.length !== 0) {
                        json["country"] = this.country;
                    }

                    let response = await this.api.registerUser(json);
                    if (response === 201) {
                        let loginResponse = await this.api.loginUser(this.email, this.password);
                        if (loginResponse === 200) {
                            this.registerSuccess = true;
                        } else {
                            await this.$router.push("Login");
                        }
                    } else {
                        this.isInvalidEmail = true;
                        this.invalidEmailMessage = "Primary email taken";
                    }
                }
            },

            saveImage() {

                this.image = this.$refs.file.files[0];

            },

            async submitImage() {
                this.imageError = "";

                let response = await this.api.editUserImage(this.image);

                if (response === 201 || response === 200) {
                    await this.$router.push({name:"Home"});
                } else {
                    this.imageError = "Invalid file";

                }
            },

            noImage() {
                this.$router.push({name:"Home"});
            },

            checkFields() {
                this.errorCount = 0;

                this.isInvalidEmail = false;
                this.isInvalidPassword = false;
                this.isInvalidDetails = false;
                this.isInvalidName = false;
                this.isInvalidCountry = false;
                this.isInvalidCity = false;

                if (this.email.length === 0 || !(/^[\w!#$%&'+/=?`{|}~^-]+(?:\.[\w!#$%&'+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/.test(this.email)) || this.email.length > 128) {
                    this.invalidEmailMessage = "Invalid email";
                    this.errorCount++;
                    this.isInvalidEmail = true;
                }

                if (this.password.length === 0 || this.password.length > 128) {
                    this.errorCount++;
                    this.isInvalidPassword = true;
                }

                if (this.name.length === 0 || this.name.length > 128) {
                    this.errorCount++;
                    this.isInvalidName = true;
                }

                if (this.country.length > 64) {
                    this.errorCount++;
                    this.isInvalidCountry = true;
                }

                if (this.city.length > 125) {
                    this.errorCount++;
                    this.isInvalidCity = true;
                }
            }
        },
    }
</script>

<style scoped>
    #login-link {
        font-size: small;
        color: #8e8e8e !important;
        cursor: pointer;
    }

    .has-background-orange {
        background-color: #fea94f !important;
        border-bottom-left-radius: 2em;
        border-top-right-radius: 2em;
    }

    .hero-body {
        margin-top: 4em;
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

    .error {
        padding: 1em;
        color: red;
    }


    .required:after {
        content:" *";
        color: red;
    }

    .float-right {
        float: right;
    }

    .box {
        overflow: hidden;
    }

    input[type="file"] {
        display: none;
    }

</style>
