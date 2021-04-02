<template>
  <div class="teamsView">
    <div class='groups' v-for="group in this.groups" :key="group._id">
      <div class='group'>
        <TeamView :group="group" :teams="filteredTeams(group)" @editTeam="editTeam($event)" @deleteTeam="deleteTeam($event)"/>
      </div>
      <button type="button" class="auto" @click="deleteGroup(group)">Delete Group</button>
      <p>Deleting a group will also delete all teams inside the group</p>
    </div>
    <div class='creator'>
      <h1>Group Creator</h1>
      <div class='form'>
        <legend>Create Group</legend>
        <input placeholder="Group Name" v-model="groupName">
        <br>
        <button type="button" class="auto" @click="createGroup()">Create Group</button>
      </div>
    </div>
    <div class="creator">
      <h1>Team Creator</h1>
      <div class='form'>
          <form> <fieldset>
            <legend>Create Team</legend>
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
            <button type="button" class="auto" @click="createTeam()">Create Team</button>
            </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TeamView from "../components/TeamView.vue"
import axios from 'axios';
export default {
  name: 'TeamsView',
  components: {
    TeamView
  },
  data: function() {
    return {
      name: "",
      location: "",
      league: "",
      titlesWon: "",
      wonBefore: false,
      mostRecentWin: "",
      topScorer: "",
      eliminated: false,
      groups: [],
      group: "",
      teamGroup: "",
      groupName: "",
      teams: [],
    }
  },
  created() {
    this.getGroups();
    this.getTeams();
  },
  methods: {
    filteredTeams(group) {
      return this.teams.filter(team => {
          return group._id == team.group;
      });
    },
    async createGroup() {
      try {
        if (this.groupName == "") {
          return;
        }
        await axios.post('/api/group', {
          name: this.groupName.toUpperCase(),
        });
        this.groupName = "";
        await this.getGroups();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGroup(group) {
      try {
        await axios.delete(`/api/group/${group._id}`);
        this.getGroups();
        this.getTeams();
      } catch(error) {
        console.log(error);
      }
    },
    async getGroups() {
      try {
        const response = await axios.get("/api/groups");
        this.groups = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createTeam() { 
      try {
        if (!this.wonBefore) {
          this.mostRecentWin = "";
          this.titlesWon = 0;
        } 
        this.group = this.groups.filter(group => group.group == this.teamGroup.toUpperCase())[0];
        if (this.group == undefined) {
          console.error("Group does not exist. Please place in a group A-H.");
          return;
        }
        await axios.post(`/api/${this.group._id}/team`, {
          name: this.name,
          location: this.location,
          league: this.league,
          titlesWon: this.titlesWon,
          wonBefore: this.wonBefore,
          mostRecentWin: this.mostRecentWin,
          topScorer: this.topScorer,
          eliminated: this.eliminated
        });
        this.getTeams();
        this.name = "";
        this.location = "";
        this.league = "";
        this.titlesWon = "";
        this.wonBefore = false;
        this.mostRecentWin = "";
        this.topScorer = "";
        this.eliminated = false;
        this.teamGroup = "";
      } catch (error) {
        console.log(error);
      }
    },
    async editTeam($event) {
      try {
        if (!$event.wonBefore) {
          $event.mostRecentWin = "";
          $event.titlesWon = 0;
        } 
        let tempGroup = this.groups.filter(group => group.group == $event.teamGroup.toUpperCase())[0]; 
        await axios.put(`/api/${tempGroup._id}/${$event._id}`, {
          name: $event.name,
          location: $event.location,
          league: $event.league,
          titlesWon: $event.titlesWon,
          wonBefore: $event.wonBefore,
          mostRecentWin: $event.mostRecentWin,
          topScorer: $event.topScorer,
          eliminated: $event.eliminated
        });
        this.getTeams();
      } catch (error) {
        console.log(error);
      }
    },
    async getTeams() {
      try {
        const response = await axios.get("/api/teams");
        this.teams = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTeam($event) {

      try {
        await axios.delete(`/api/${$event}`);
        this.getTeams();
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');

  .teamsView {
    width: 100%;
    background-image: url("../images/clb.jpg");
    background-size: auto;
    height: auto;
    color:white;
  }

  .groups {
    color: white;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .group {
    color: white;
    width: 95%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .creator {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .form {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 10%;
  }

  .auto {
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
    color: white;
    background: rgb(3, 15, 66);
    border: solid white 1px;
  }
</style>
