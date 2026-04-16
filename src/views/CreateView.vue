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
import BaseForm from '../components/base/BaseForm.vue';

export default {
  name: 'SnapshootView',
  components: {
    BaseForm,
  },
  data() {
    return {
      video: undefined,
      videostream: undefined,
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
      this.video = this.$refs.webcamhandeler;
      this.videostream = await this.getWebcamPermission();
      this.video.srcObject = this.videostream;
    },

    getWebcamPermission() {
      return new Promise((resolve, reject) => {
        if ('mediaDevices' in navigator) {
          navigator.mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then((navigatorStreamSuccess) => {
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

    onSubmit(event) {
      if (this.$route.name === 'CreateSnapshoot') {
        event.author = this.$store.getters.userinfo.id;
        const albums = this.$store.getters.albumlist;

        albums.forEach((album) => {
          if (album.id == this.$route.params.id) {
            event.albumID = album.id;
            album.snapshoots = event;
          }
        });

        this.$store.dispatch('pushSnapshootOperation', event);
      } else if (this.$route.name === 'CreateAlbum') {
        // Add user id
        event.author = this.$store.getters.userinfo.id;

        this.$store.dispatch('saveAlbumOperation', event);
      }
    },
  },

  mounted() {
    if (this.$route.name === 'CreateSnapshoot') {
      this.initVideo();
    }
  },
};
</script>

<style scoped>
.snapshoot-view-component {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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
