<template>
  <v-card flat tile class="flex mx-0 white--text">
    <v-card-text class="green lighten-3">
      <v-layout row text-xs-center>
        <!-- <v-flex xs3>
          <span class="body-2"></span>
          <div>
            Saker
          </div>
        </v-flex>
        <v-flex xs3>
          <span class="body-2"></span>
          <div>
            Saker
          </div>
        </v-flex>
        <v-flex xs3>
          <span class="body-2">Hej</span>
          <div>
            Saker
          </div>
        </v-flex> -->
        <v-flex xs12 layout column>
          <span class="body-2">Kontakt</span>
          <!-- <div>
            <v-icon size="18px" class="mr-3 white--text">mdi-home</v-icon>
            New York, NY 10012, US
          </div> -->
          <div>
            <v-icon size="18px" class="mr-3 white--text">mdi-email</v-icon>
            gabriel.wallen@taby.se
          </div>
          <div>
            <v-icon size="18px" class="mr-3 white--text">mdi-phone</v-icon>
            0766 43 98 54
          </div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="green lighten-2 justify-center">
      &copy;2018 — <strong>Gabriel Wallén</strong>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'footer-content',
  }
</script>
