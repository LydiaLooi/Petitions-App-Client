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
                                    Back to profile
                                </a>
                            </div>

                            <div class="box">
                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Edit Account Details</h1>
                                </div>

                                <div class="field">
                                    <label class="label">Name</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidName}" type="text" placeholder="e.g. John Smith" v-model="name">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidName">Name required</p>
                                </div>

                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidEmail}" type="email" placeholder="e.g. godgamer@gmail.com" v-model="email">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidEmail">{{invalidEmailMessage}}</p>
                                </div>

                                <div class="field">
                                    <div class="columns">
                                        <div class="column">
                                            <label class="label">Country <span class="content is-small">(Can't be removed once added)</span></label>
                                            <div class="control">
                                                <input class="input" :class="{'is-danger':isInvalidCountry}" type="text" placeholder="e.g. New Zealand" v-model="country">

                                            </div>
                                            <p class="help is-danger" v-if="isInvalidCountry">Invalid country</p>
                                        </div>
                                        <div class="column">
                                            <label class="label">City  <span class="content is-small">(Can't be removed once added)</span></label>
                                            <div class="control">
                                                <input class="input" :class="{'is-danger':isInvalidCity}" type="text" placeholder="e.g. Christchurch" v-model="city">

                                            </div>
                                            <p class="help is-danger" v-if="isInvalidCity">Invalid city</p>
                                        </div>

                                    </div>

                                </div>







                                <div class="field">

                                    <input type="button" class="button is-orange float-right" value="Save Changes" v-on:click="saveProfile">
                                    <label class="error">{{serverErrorMessage}}</label>
                                    <label class="success">{{savedSuccessMessage}}</label>

                                </div>
                            </div>

                            <div class="box">

                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Edit Password</h1>
                                </div>
                                <div class="field">
                                    <div class="columns">
                                        <div class="column">
                                            <label class="label">New Password</label>
                                            <div class="control">
                                                <input class="input" :class="{'is-danger':isInvalidPassword}" type="password" placeholder="*********" v-model="password">

                                            </div>
                                            <p class="help is-danger" v-if="isInvalidPassword">Password required</p>
                                        </div>

                                        <div class="column">
                                            <label class="label">Current Password</label>
                                            <div class="control">
                                                <input class="input" :class="{'is-danger':isInvalidCurrentPassword}" type="password" placeholder="*********" v-model="currentPassword">

                                            </div>
                                            <p class="help is-danger" v-if="isInvalidCurrentPassword">Current password required</p>

                                        </div>
                                    </div>

                                    <div class="field">

                                        <input type="button" class="button is-orange float-right" value="Update Password" v-on:click="updatePassword">
                                        <label class="error">{{passwordErrorMessage}}</label>
                                        <label class="success">{{passwordSuccessMessage}}</label>
                                    </div>

                                </div>
                            </div>

                            <div class="box">

                                <div class="box has-background-orange">
                                    <h1 class="content is-large">Update Profile Photo</h1>
                                </div>

                                <div class="field" >
                                    <label class="label">Update your profile picture</label>

                                    <div style='height: 0px;width:0px; overflow:hidden;'>
                                        <input id="file" type="file" ref="file" value="upload" v-on:change="saveImage()"/>
                                    </div>


                                </div>
                                <div class="field">
                                    <label class="label">{{image.name}}</label>

                                    <label class="button is-orange" v-on:click="getFile()">Select new photo</label>
                                    <input type="button" class="button is-orange float-right" value="Save Image" v-on:click="submitImage()">
                                    <input type="button" class="button is-danger float-right" value="I don't want a photo" v-on:click="noImage">



                                </div>
                                <label class="error float-right">{{imageError}}</label>  <label class="success float-right">{{imageSuccessMessage}}</label>



                            </div>
                            <div class="field">
                                <a class="button is-orange" v-on:click="goBack">
                                    Back to profile
                                </a>
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
        name: "EditProfile",
        components: {Navigation},
        async mounted() {

            if (sessionStorage.getItem("token") == null) {
                await this.$router.push({name:"Login"});
            } else {
                this.api = new ApiClient();
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
                errorCount: 0,

                email: "",
                password: "",
                name: "",
                city: "",
                country: "",
                image: "",
                currentPassword: "",

                hasCountry: false,
                hasCity: false,

                registerSuccess: false,
                savedSuccessMessage: "",

                isInvalidPassword: false,
                isInvalidCurrentPassword: false,
                isInvalidEmail: false,
                isInvalidName: false,
                isInvalidDetails: false,
                isInvalidCountry: false,
                isInvalidCity: false,
                invalidEmailMessage: "",
                imageError: "",
                imageSuccessMessage: "",
                serverErrorMessage: "",
                passwordErrorMessage: "",
                passwordSuccessMessage: ""

            }
        },
        methods: {
            getFile() {
                document.getElementById("file").click();
            },

            updateInfo(info) {
                this.name = info.name;
                this.email = info.email;
                this.country = info.country;
                this.city = info.city;

                if (this.country !== null) {
                    this.hasCountry = true;
                }

                if (this.city !== null) {
                    this.hasCity = true;
                }



            },
            login() {
                this.$router.push({name:"Login"});
            },

            goBack() {
                this.$router.push({name:"ViewProfile"});
            },

            async updatePassword() {
                this.checkPasswordFields();

                if (this.errorCount === 0) {

                    let json = {
                        password: this.password,
                        currentPassword: this.currentPassword
                    };
                    let response = await this.api.editUser(json);

                    if (response !== 200) {
                        this.passwordErrorMessage = response.response.statusText;
                    } else {
                        this.passwordSuccessMessage = "Password successfully edited";
                        this.password = "";
                        this.currentPassword = "";
                    }
                }

            },

            checkPasswordFields() {
                this.isInvalidPassword = false;
                this.isInvalidCurrentPassword = false;
                this.passwordErrorMessage = "";
                this.passwordSuccessMessage = "";
                this.errorCount = 0;

                if (this.password.length === 0) {
                    this.errorCount++;
                    this.isInvalidPassword = true;
                }

                if (this.currentPassword.length === 0) {
                    this.errorCount++;

                    this.isInvalidCurrentPassword = true;
                }

                // if (this.password !== this.currentPassword) {
                //     // this.isInvalidPassword = true;
                //     // this.isInvalidCurrentPassword = true;
                //     this.errorCount++;
                //
                //     this.passwordErrorMessage = "Passwords must match"
                // }

            },

            async saveProfile() {
                this.checkFields();

                if (this.errorCount === 0) {

                    let json = {
                        email: this.email,
                        name: this.name,
                    };


                    if (this.hasCity) {
                        if (this.city.length !== 0) {
                                json["city"] = this.city;
                        }
                    } else {
                        if (this.city != null) {
                            if (this.city.length !== 0) {
                                json["city"] = this.city;
                            }
                        }
                    }

                    if (this.hasCountry) {
                        if (this.country.length !== 0) {
                            json["country"] = this.country;
                        }
                    } else {
                        if (this.country != null) {
                            if (this.country.length !== 0) {
                                json["country"] = this.country;

                            }
                        }
                    }


                    let response = await this.api.editUser(json);
                    if (response === 200) {
                        this.savedSuccessMessage = "Saved successfully";
                        if (this.country != null) {
                            if (this.country.length > 0) {
                                this.hasCountry = true;
                            }
                        }

                        if (this.city != null) {
                            if (this.city.length > 0) {
                                this.hasCity = true;
                            }
                        }

                        this.registerSuccess = true;

                    } else {
                        this.serverErrorMessage = response.response.statusText;
                        this.isInvalidDetails = true;
                        // this.isInvalidEmail = true;
                        // this.invalidEmailMessage = "Primary email taken";
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
                    this.imageSuccessMessage = "Image saved successfully";
                    // await this.$router.push({name:"Home"});
                } else {
                    this.imageError = "Invalid file";

                }
            },

            async noImage() {
                this.imageSuccessMessage = "";
                this.imageError = "";
                let response = await this.api.deleteUserPhoto();
                if (response === 200) {
                    this.imageSuccessMessage = "Successfully deleted profile photo";
                } else if (response === 404) {
                    this.imageError = "No photo to delete";
                } else {
                    this.imageError = "Error deleting photo";
                }

                // this.$router.push({name:"Home"});
            },

            checkFields() {
                this.errorCount = 0;
                this.savedSuccessMessage = "";
                this.serverErrorMessage = "";

                this.isInvalidEmail = false;
                // this.isInvalidPassword = false;
                this.isInvalidDetails = false;
                this.isInvalidName = false;
                this.isInvalidCountry = false;
                this.isInvalidCity = false;

                if (this.email.length === 0 || !(/^[\w!#$%&'+/=?`{|}~^-]+(?:\.[\w!#$%&'+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/.test(this.email)) || this.email.length > 128) {
                    this.invalidEmailMessage = "Invalid email";
                    this.errorCount++;
                    this.isInvalidEmail = true;
                }

                // if (this.password.length === 0 || this.password.length > 128) {
                //     this.errorCount++;
                //     this.isInvalidPassword = true;
                // }

                if (this.name.length === 0 || this.name.length > 128) {
                    this.errorCount++;
                    this.isInvalidName = true;
                }

                if (this.hasCountry) {
                    if (this.country.length === 0 || this.country.length > 64) {
                        this.errorCount++;
                        this.isInvalidCountry = true;
                    }
                } else {
                    if (this.country != null) {

                        if (this.country.length > 64) {
                            this.errorCount++;
                            this.isInvalidCountry = true;
                        }
                    }
                }



                if (this.hasCity) {
                    if (this.city.length === 0 || this.city.length > 64) {
                        this.errorCount++;
                        this.isInvalidCity = true;
                    }
                } else {
                    if (this.city != null) {
                        if (this.city.length > 64) {
                            this.errorCount++;
                            this.isInvalidCountry = true;
                        }
                    }

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

    .success {
        color: #00a91d;
    }

</style>
