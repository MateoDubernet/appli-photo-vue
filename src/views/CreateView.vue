<template>
  <section class="snapshoot-view-component section">
    <div v-if="$route.name === 'CreateSnapshoot'">
      <!-- Display video stream -->
      <video
        ref="webcamhandeler"
        playsinline
        autoplay
      />

      <article class="box">
        <BaseForm
          class="mb-4"
          :formvalue="cmpSnapshootForm"
          @onSubmit="onSubmit($event)"
        />
      </article>
    </div>

    <div v-if="$route.name === 'CreateAlbum'">
      <article class="box">
        <BaseForm
          class="mb-4"
          :formvalue="cmpAlbumForm"
          @onSubmit="onSubmit($event)"
        />
      </article>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */

/*
  [IMPORT] Modules/components
*/
import BaseForm from '../components/base/BaseForm.vue';

/*
  [CTRL] App.vue
  Define component controller
*/
export default {
  name: 'SnapshootView',

  /*
    [VUE] Components
    Used to inject child components
  */
  components: {
    BaseForm,
  },

  /*
    [VUE] Data
    Local component state
  */
  data() {
    return {
      video: undefined,
      videostream: undefined,

      // Form values
      cmpSnapshootForm: {
        title: 'Add new snapshoot',
        submit: 'Save',
        fieldsets: [
          {
            label: 'Title',
            type: 'text',
            name: 'title',
            required: true,
            min: 5,
            value: null,
          },
          {
            label: 'Caption',
            type: 'text',
            name: 'caption',
            required: false,
            min: false,
            value: null,
          },
        ],
      },

      cmpAlbumForm: {
        title: 'Add new album',
        submit: 'Save',
        fieldsets: [
          {
            label: 'Title',
            type: 'text',
            name: 'title',
            required: true,
            min: 5,
            value: null,
          },
        ],
      },
    };
  },

  methods: {
    async initVideo() {
      // Bind video HTML tag
      this.video = this.$refs.webcamhandeler;

      // Bind webcam stream
      this.videostream = await this.getWebcamPermission();

      // Add stream in video tag
      this.video.srcObject = this.videostream;
    },

    getWebcamPermission() {
      return new Promise((resolve, reject) => {
        // Check if navigator has mediaDevices
        if ('mediaDevices' in navigator) {
          navigator.mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then((navigatorStreamSuccess) => {
              // Save stream in the store for security
              resolve(navigatorStreamSuccess);
            })
            .catch((navigatorStreamError) => {
              console.error(navigatorStreamError);
            });
        } else {
          reject('Impossible to take snapshoot with your navigator.');
        }
      });
    },

    // Define method to bind form 'submit' event
    onSubmit(event) {
      if (this.$route.name === 'CreateSnapshoot') {
        // TODO: find a way to add 'author' ID in snapshoot
        event.author = this.$store.getters.userinfo.id;

        const albums = this.$store.getters.albumlist;

        // Add 'album' ID in snapshoot
        albums.forEach((album) => {
          if (album.id == this.$route.params.id) {
            event.albumID = album.id;
            album.snapshoots = event;
          }
        });

        // Dispatch store action
        this.$store.dispatch('pushSnapshootOperation', event);
      } else if (this.$route.name === 'CreateAlbum') {
        // Add user id
        event.author = this.$store.getters.userinfo.id;

        // Dispatch store action
        this.$store.dispatch('saveAlbumOperation', event);
      }
    },
  },

  mounted() {
    // Check route to init webcam
    if (this.$route.name === 'CreateSnapshoot') {
      this.initVideo();
    }
  },
};
</script>

<style scoped>
.snapshoot-view-component {
  display: flex;
  justify-content: center;  /* centre horizontalement */
  align-items: center;      /* centre verticalement */
  flex: 1;                  /* prend l'espace restant du main */
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.box {
  width: 100%;
  max-width: 600px;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

video {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background-color: #ffffff;
}
</style>
