<template>
    <div class='qfWrapper'>
        <div class="QFGames">
            <h2>{{this.games[0].home}} v {{this.games[0].away}}</h2>
            <div class="QFGame" v-for="game in this.games" :key="game.id">
                <div class='matchup'>
                    <div class='title'>
                        <div v-if="game.leg == 1">
                            <h2>First Round</h2>
                        </div>
                        <div v-if="game.leg == 2">
                            <h2>Second Round</h2>
                        </div>
                    </div>
                    <div class='round'>
                        <div class='first'>
                            <h3>{{game.home}} - {{game.homeScore}}</h3>
                            <h3>{{game.away}} - {{game.awayScore}}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class='message'>
                <p>First Leg to be played on {{this.games[0].date}}</p>
            </div>
            <div class="buttons">
                <button type="button" class="auto" @click="edit()">Edit Game</button>
                <button type="button" class="auto" @click="deleteGame()">Delete Matchup</button>
            </div>
            <div v-if="getEdit !== false">
                <form> <fieldset>
                    <legend>Game Editor</legend>
                    <input placeholder="Home Team" v-model="home">
                    <input placeholder="Away Team" v-model="away">
                    <input placeholder="Date" v-model="date">
                    <br><br>
                    <button type="button" class="auto" @click="submitEdit()">Submit Edit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "QFGameList",
    props: {
        games: Array
    },
    data: function() {
        return {
            editGame: false,
            home: "",
            away: "",
            date: "",
        }
    },
    methods: {
        edit() {
            this.editGame = !this.editGame;
            this.home = this.games[0].home;
            this.away = this.games[0].away;
            this.date = this.games[0].date;
        },
        async submitEdit() {
            let matchup = {
                home: this.home,
                away: this.away,
                date: this.date,
                matchupID: this.games[0].matchup,
            };
            this.$emit('editMatchup', matchup);
            this.editGame = false;
        },
        deleteGame() {
            this.$emit('deleteMatchup', this.games[0].matchup);
            this.editGame = false;
        }
    },
    computed: {
        getEdit() {
            return this.editGame;
        }
    }
}
</script>

<style>
@media only screen and (min-width: 961px) {
    .qfWrapper {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        height: auto;
        flex: 1;
    }

    .QFGames {
        width: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        border: solid white 1px;
        padding: 10px;
    }

    .QFGame {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .matchup {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        flex: 1;
        margin: 10px;
    }

    .title {
        width: 75%;
        border: solid 1px white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .round {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-flow: column;
        width: 100%;
    }

    .first {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-flow: column;
        width: 50%;
    }

    .buttons button {
        margin: 0 10px 0 10px;
    }
}

@media only screen and (min-width: 427px) and (max-width: 960px) { 
    .qfWrapper {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        height: auto;
        flex: 1;
    }

    .QFGames {
        width: 85%;
        margin: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .QFGame {
        width: 100%;
        border: solid white 1px;
        margin: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .matchup {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        flex: 1;
        padding: 5px;
        margin: 10px;
    }

    .title {
        width: 75%;
        border: solid 1px white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title h2 {
        font-size: 1.5em;
    }

    .round {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-flow: column;
        width: 100%;
    }

    .first {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-flow: column;
        width: 50%;
    }

    .first h3 {
        font-size: 1em;
    }

    .buttons button {
        margin: 0 10px 0 10px;
    }
 }

 @media only screen and (max-width: 426px) {
     .qfWrapper {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        height: auto;
        flex: 1;
    }

    .QFGames {
        width: 85%;
        margin: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .QFGame {
        width: 100%;
        border: solid white 1px;
        margin: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .matchup {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        flex: 1;
        padding: 5px;
        margin: 10px;
    }

    .title {
        width: 75%;
        border: solid 1px white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title h2 {
        font-size: 1.5em;
    }

    .round {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-flow: column;
        width: 100%;
    }

    .first {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-flow: column;
        width: 75%;
    }

    .first h3 {
        font-size: 1em;
    }

    .buttons button {
        margin: 0 10px 0 10px;
    }
 }
</style>