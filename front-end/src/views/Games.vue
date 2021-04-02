<template>
    <div class='games'>
        <div class="QF">
            <GameView :rounds="gamesOld"/>
        </div>
        <div class="QF">
          <h1>Quarter-Final Matchup Creater</h1>
            <form> <fieldset>
                <legend>Create your matchup for the Quarter-Finals! Enter home team, away team, and date.</legend>
                <input placeholder="Home Team" v-model="home">
                <input placeholder="Away Team" v-model="away">
                <input placeholder="Date" v-model="date">
                <br><br>
                <button type="button" class="auto" @click="createMatchup()">Create Matchup</button>
                </fieldset>
            </form>
            <div class='qfTitle'>
              <h1>Quarter-Finals</h1>
            </div>
            <div class='matchupWrapper' v-for='matchup in this.qfMatchups' :key="matchup._id">
              <QFView :games="filteredGames(matchup)" @editMatchup="editMatchup($event)" @deleteMatchup="deleteMatchup($event)"/>
            </div>
        </div>
    </div>

</template>

<script>
import GameView from "../components/GameView.vue"
import QFView from '../components/QFView.vue'
import axios from 'axios';
export default {
  name: 'GamesView',
  components: {
    GameView,
    QFView
  },
  data: function() {
    return {
      gameCount: 0,
      home: "",
      away: "",
      date: "",
      qfGames: [],
      qfMatchups: [],
    }
  },
  created() {
    this.getMatchups();
    this.getGames();
  },
  computed: {
    gamesOld() {
      return this.$root.$data.games;
    },
    qfGamesOld() {
      return this.$root.$data.quarterFinals;
    },
  },
  methods: {
    filteredGames(matchup) {
      return this.qfGames.filter(game => {
          return matchup._id == game.matchup;
      });
    },
    async createMatchup() {
      try {
        await axios.post('/api/matchup', {
          home: this.home,
          away: this.away,
          date: this.date,
        });
        this.home = "";
        this.away = "";
        this.date = "";
        this.getMatchups();
        this.getGames();
      } catch (error) {
        console.error(error);
      }
    },
    async getGames() {
      try {
        const response = await axios.get('/api/games');
        this.qfGames = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getMatchups() {
      try {
        const response = await axios.get('/api/matchups');
        this.qfMatchups = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async editMatchup($event) {
      try {
        console.log("made it to edit matchup function");
        console.log($event);
        await axios.put(`/api/${$event.matchupID}`, {
          home: $event.home,
          away: $event.away,
          date: $event.date,
        });
        this.getMatchups();
        this.getGames();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMatchup(matchupID) {
      try {
        await axios.delete(`/api/matchups/${matchupID}`);
        this.getMatchups();
        this.getGames();
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>  
  .games {
    width: 100%;
    background-image: url("../images/clb.jpg");
    background-size: auto;
    height: auto;
    color:white;
  }

  form input {
    margin: 0 10px 0 10px;
  }

  .matchupWrapper {
    margin-bottom: 25px;
  }
</style>