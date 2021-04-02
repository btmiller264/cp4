<template>
    <div class='gameWrapper'>
        <div class="R16">
            <h1>Round of 16 Results</h1>
            <div class="r16Games" v-for="round in rounds" :key="round.id">
                <div class='matchup'>
                    <div class='title'>
                        <h2>First Round</h2>
                    </div>
                    <div class='round'>
                        <div class='first'>
                            <h3>{{round.first.home}} - {{round.first.homeScore}}</h3>
                            <h3>{{round.first.away}} - {{round.first.awayScore}}</h3>
                        </div>
                    </div>
                    <div class='title'>
                        <h2>Second Round</h2>
                    </div>
                    <div class='round'>
                        <div class='first'>
                            <h3>{{round.second.home}} - {{round.second.homeScore}}</h3>
                            <h3>{{round.second.away}} - {{round.second.awayScore}}</h3>
                        </div>
                    </div>
                </div>
                <div class='message'>
                    <p>{{round.message}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "GameList",
    props: {
        rounds: Array
    },
}
</script>

<style>
@media only screen and (min-width: 961px) {
    .gameWrapper {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        height: auto;
        flex: 1;
        border: none;
    }

    .R16 {
        width: 85%;
        margin: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .r16Games {
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
}

 @media only screen and (min-width: 427px) and (max-width: 960px) { 
    .gameWrapper {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        height: auto;
        flex: 1;
    }

    .R16 {
        width: 85%;
        margin: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .r16Games {
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
 }

 @media only screen and (max-width: 426px) {
     .gameWrapper {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        height: auto;
        flex: 1;
    }

    .R16 {
        width: 85%;
        margin: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .r16Games {
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
 }

</style>