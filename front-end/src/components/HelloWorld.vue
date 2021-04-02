<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class='intro'>
      <p>
      Every year, the very best clubs of Europe come together to compete in one epic 32 team tournament.
      This tournament sees some of the best football of the year played, and has produced some of the most
      spectacular and legendary moments ever seen in the game. This site contains info on all 32 teams that
      qualified for the 2020-2021 tournament, as well as results on the knouckout games. 
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media only screen and (min-width: 961px) {
    .hello {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin: 100px;
  }

  h1 {
    text-align: center;
    color: white;
    font-size: 5em;
  }

  .intro {
    max-width: 750px;
    margin: 100px;
  }

  p {
    color: white;
    font-size: 1.5em;
  }
}

@media only screen and (min-width: 427px) and (max-width: 960px) { 
  .hello {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin: 50px;
  }

  h1 {
    text-align: center;
    color: white;
    font-size: 4em;
  }

  .intro {
    max-width: 750px;
    margin: 100px;
  }

  p {
    color: white;
    font-size: 1.5em;
  }
}

@media only screen and (max-width: 426px) { 
    .hello {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin: 50px;
  }

  h1 {
    text-align: center;
    color: white;
    font-size: 3em;
  }

  .intro {
    max-width: 750px;
    margin: 15px;
  }

  p {
    color: white;
    font-size: 1.1em;
  }
}



</style>
