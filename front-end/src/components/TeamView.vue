<template>
    <div class='wrapper'>
        <h2>Group {{group.group}}</h2>
        <div class='teams'>
            <div v-for="team in teams" :key="team.id">
                <div class='team'>
                    <h3>{{team.name}}</h3>
                    <p>Location: {{team.location}}</p>
                    <p>League: {{team.league}}</p>
                    <p>Champions League Titles: {{team.titlesWon}}</p>
                    <p v-if="team.wonBefore">Most Recent Win: {{team.mostRecentWin}}</p>
                    <p>Top Scorer: {{team.topScorer}}</p>
                    <p v-if="team.eliminated">Eliminated in group stage</p>
                    <p v-if="!team.eliminated">Advanced to Round of 16</p>
                    <div class="buttons">
                        <button type="button" class="auto" @click="editTeam(team)">Edit Team</button>
                        <button type="button" class="auto" @click="deleteTeam(team)">Delete Team</button>
                    </div>
                </div>
            </div>
        </div>
        <div class='formIF' v-if="getEdit == true">
            <div class='form'>
                <form> <fieldset>
                    <legend>Edit Team</legend>
                    <input placeholder="Team Name" v-model="name">
                    <input placeholder="Location" v-model="location">
                    <input placeholder="League" v-model="league">
                    <input type="checkbox" id="wonBefore" v-model="wonBefore">
                    <label for='wonBefore'>Won Cl before?</label>
                    <input placeholder="Titles Won" v-model="titlesWon">
                    <input placeholder="Most Recent Win" v-model="mostRecentWin">
                    <input placeholder="Top Scorer" v-model="topScorer">
                    <input type="checkbox" id="eliminated" v-model="eliminated">
                    <label for='eliminated'>Team Eliminated?</label>
                    <input placeholder="Group Letter (A-H)" v-model="teamGroup">
                    <br><br>
                    <button type="button" class="auto" @click="submitEdit()">Submit Team Edit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TeamList",
    props: {
        group: Object,
        teams: Array,
    },
    data: function() {
        return {
            editing: false,
            name: "",
            location: "",
            league: "",
            titlesWon: "",
            wonBefore: false,
            mostRecentWin: "",
            topScorer: "",
            eliminated: false,
            teamGroup: "",
            teamID: "",
        }
    },
    methods: {
        editTeam(team) {
            this.editing = !this.editing;
            this.name = team.name;
            this.location = team.location;
            this.league = team.league;
            this.titlesWon = team.titlesWon;
            this.wonBefore = team.wonBefore;
            this.mostRecentWin = team.mostRecentWin;
            this.topScorer = team.topScorer;
            this.eliminated = team.eliminated;
            this.teamGroup = this.group.group;
            this.teamID = team._id;
        },
        deleteTeam(team) {
            this.$emit('deleteTeam', team._id);
            this.editing = false;
        },
        submitEdit() {
            let team = {
                name: this.name,
                location: this.location,
                league: this.league, 
                titlesWon: this.titlesWon,
                wonBefore: this.wonBefore,
                mostRecentWin: this.mostRecentWin,
                topScorer: this.topScorer,
                eliminated: this.eliminated,
                teamGroup: this.teamGroup,
                _id: this.teamID,
            };
            this.$emit('editTeam', team);
            this.editing = false;
        },
    },
    computed: {
        getEdit() {
            return this.editing;
        }
    }
}
</script>

<style>

@media only screen and (min-width: 961px) {
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        border: solid white 1px;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 100%;
    }

    .teams {
        display: flex;
        flex-flow: row;
        justify-content: space-evenly;
        align-items: stretch;
        width: 100%;
        border: solid white 1px;
        height: 100%;
    }

    .team {
        display: flex;
        justify-content: baseline;
        align-items: center;
        flex-flow: column;
        flex: 1;
        margin: 0 5px 0 5px;
        padding: 5px;
    }

    .team p {
        margin: 0;
        padding: 0;
    }

    .formIF {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .form {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 10%;
    }
}
 
 @media only screen and (min-width: 427px) and (max-width: 960px) {
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 95%;
        border: solid white 1px;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 100%;
    }

    .teams {
        display: flex;
        flex-flow: row ;
        justify-content: space-around;
        align-items: stretch;
        width: 100%;
        border: solid white 1px;
        height: 100%;
        flex: 1;
    }

    .team {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        flex: 1;
        margin: 0 5px 0 5px;
        padding: 5px;
    }

    .team h3 {
        font-size: 1.3em;
    }

    .team p {
        margin: 0;
        padding: 0;
        font-size: 0.8em;
    }

    .formIF {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .form {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 10%;
    }
}

@media only screen and (max-width: 426px) {
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 95%;
        border: solid white 1px;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 100%;
    }

    .teams {
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        align-items: stretch;
        width: 100%;
        border: solid white 1px;
        height: 100%;
        flex: 1;
    }

    .team {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        flex: 1;
        margin: 5px 0 5px 0;
        padding: 5px;
    }

    .team p {
        margin: 0;
        padding: 0;
    }

    .formIF {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .form {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 10%;
    }
}

</style>