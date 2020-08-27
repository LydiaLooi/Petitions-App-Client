<template>
    <div>
        <navigation></navigation>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                            <div class="box">

                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidEmail}" type="email" placeholder="e.g. godgamer@gmail.com" v-model="email">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidEmail">Invalid email</p>
                                </div>

                                <div class="field">
                                    <label class="label">Password</label>
                                    <div class="control">
                                        <input class="input" :class="{'is-danger':isInvalidPassword}" type="password" placeholder="*********" v-model="password">

                                    </div>
                                    <p class="help is-danger" v-if="isInvalidPassword">Password required</p>
                                </div>

                                <div class="field">
                                    <label id="register-link" v-on:click="register">
                                        I don't have an account!
                                    </label>
                                </div>
                                <div class="field">

                                    <input type="button" class="button is-orange float-right" value="Login" v-on:click="login">
                                    <label class="error" v-if="isInvalidDetails"> Incorrect login details</label>
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
    import {ApiClient} from "@/api";
    import Navigation from "@/Components/Navigation";

    export default {
        name: "Login",
        components: {Navigation},
        data() {
            return {
                email: "",
                password: "",
                errors: [],
                isInvalidEmail: false,
                isInvalidPassword: false,
                isInvalidDetails: false

            }
        },
        mounted() {
            this.api = new ApiClient();
        },
        methods: {
            async login() {
                this.checkFields();

                if (this.errors.length === 0) {
                    let response = await this.api.loginUser(this.email, this.password);
                    if (response === 200) {
                        await this.$router.push({name: "Home"});
                    } else {
                        this.isInvalidDetails = true;
                        this.errors = "Incorrect login details"
                    }
                }


            },
            register() {
                this.$router.push({name:"Register"});
            },
            checkFields() {
                this.errors = [];
                this.isInvalidEmail = false;
                this.isInvalidPassword = false;
                this.isInvalidDetails = false;

                if (this.email.length === 0 || !this.email.includes('@')) {
                    this.errors.push("Invalid email");
                    this.isInvalidEmail = true;
                }

                if (this.password.length === 0) {
                    this.errors.push("Invalid password");
                    this.isInvalidPassword = true;
                }

            }
        },

    }
</script>

<style scoped>

    #register-link {
        font-size: small;
        color: #8e8e8e !important;
        cursor: pointer;
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
        border: none;
        cursor: auto;
        color: red;
    }

    .box {
        overflow: hidden;
    }

    .float-right {
        float: right;
    }
</style>
