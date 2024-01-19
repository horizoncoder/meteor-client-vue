<template>
  <div class="container">
    <div class="row">
      <div id="room" class="col-md-12 mt-3 ml-3">
        <vue-webrtc ref="webrtc"
                    socketURL="http://localhost:3000"
                    width="100%"
                    :roomId="$route.params.id"
                    :enableLogs="true"
                    v-on:joined-room="logEvent"
                    v-on:left-room="logEvent"
                    v-on:opened-room="logEvent"
                    v-on:share-started="logEvent"
                    v-on:share-stopped="logEvent"
                    @error="onError" />

      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="padding-top: 5px;">
        <h2>Captured Image</h2>
        <figure class="figure">
          <img :src="img" class="img-responsive" />
        </figure>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <button type="button" class="btn btn-primary text-white" @click="onJoin">Join</button>
    <button type="button" class="btn btn-primary text-white" @click="onLeave">Leave</button>
    <button type="button" class="btn btn-primary text-white" @click="onCapture">Capture Photo</button>
    <button type="button" class="btn btn-primary text-white" @click="onShareScreen">Share Screen</button>
  </div>
</template>

<script>
import { VueWebRTC } from 'vue-webrtc';

export default {
  name: 'room-component',
  components: {
    'vue-webrtc': VueWebRTC
  },
  data() {
    return {
      img: null,
      roomId: "public-room-v3"
    };
  },
  mounted: function () {
    this.$refs.webrtc.join();
  },
  computed: {
  },
  watch: {
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webrtc.capture();
    },
    onLeave() {
      this.$refs.webrtc.leave();
    },
    onShareScreen() {
      this.img = this.$refs.webrtc.shareScreen();
    },
    onError(error, stream) {
      console.log('On Error Event', error, stream);
    },
    logEvent(event) {
      console.log('Event : ', event);
    },
  }
};
</script>

<style>
.btn {
  margin-right: 8px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 8%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.video-list {
  background: white !important;
}
.video-item video {
  width: auto;
  height: 50vh;

  margin: 5px;
}
.video-item {
  background: white !important;
}
</style>
