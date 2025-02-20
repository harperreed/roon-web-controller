<template lang="html">
  <div data-name="Controller">
    <BackgroundCoverArt
      v-if="
        show_cover_background === true &&
        current_zone &&
        current_zone.now_playing &&
        current_zone.now_playing.image_key
      "
      v-bind:image_key="current_zone.now_playing.image_key"
    />
    <OverlayVolume v-if="ui.show_volume === true" />
    <OverlayZoneSelect
      v-if="ui.show_zone_select === true || current_zone_id === ''"
    />
    <OverlaySettings v-if="ui.show_settings === true" />
    <template v-if="this.$route.name === 'Controller'">
      <div class="Controller_view_controls">
        <ControlsViews />
        <ControlsOverlays />
      </div>
    </template>
    <template v-else>
      <transition v-bind:name="transition_name">
        <router-view id="Controller_content" />
      </transition>
    </template>
  </div>
</template>

<script>
import BackgroundCoverArt from "@/components/BackgroundCoverArt.vue";
import OverlayVolume from "@/components/OverlayVolume.vue";
import OverlayZoneSelect from "@/components/OverlayZoneSelect.vue";
import OverlaySettings from "@/components/OverlaySettings.vue";
import ControlsViews from "@/components/ControlsViews.vue";
import ControlsOverlays from "@/components/ControlsOverlays.vue";

export default {
  name: "Controller",
  data: function () {
    return {
      transition_name: "",
    };
  },
  components: {
    BackgroundCoverArt,
    OverlayVolume,
    OverlayZoneSelect,
    OverlaySettings,
    ControlsViews,
    ControlsOverlays,
  },
  computed: {
    ui: {
      get() {
        return this.$store.state.ui;
      },
    },
    show_cover_background: {
      get() {
        return this.$store.state.settings.general.show_cover_background;
      },
    },
    current_zone: {
      get() {
        return this.$store.state.roon.zone_list[
          this.$store.state.settings.current_zone_id
        ];
      },
    },
    current_zone_id: {
      get() {
        return this.$store.state.settings.current_zone_id;
      },
    },
  },
  watch: {
    $route(to, from) {
      if (
        (from.name === "ControllerLibrary" &&
          to.name === "ControllerNowPlaying") ||
        (from.name === "ControllerNowPlaying" && to.name === "ControllerQueue")
      ) {
        this.transition_name = "slide-down";
      } else if (
        (from.name === "ControllerNowPlaying" &&
          to.name === "ControllerLibrary") ||
        (from.name === "ControllerQueue" && to.name === "ControllerNowPlaying")
      ) {
        this.transition_name = "slide-up";
      } else {
        this.transition_name = "";
      }
    },
  },
};
</script>

<style lang="css">
#Controller_content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.Controller_view_controls {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-leave-to {
  transform: translateY(100vh);
}
.slide-up-enter {
  transform: translateY(-100vh);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}
.slide-down-leave-to {
  transform: translateY(-100vh);
}
.slide-down-enter {
  transform: translateY(100vh);
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--TransparentColor);
}
.overlay_content {
  background: var(--BaseColor);
  padding: 1vh 1vw;
  border-radius: 0 0 1vh 1vh;
  filter: drop-shadow(1vh 1vh 1vh black);
  text-align: center;
  width: 90vw;
}
.overlay_close_button {
  position: absolute;
  top: 1vh;
  right: 1vw;
  background: none;
  color: var(--AvailableColor);
  fill: currentColor;
  border: none;
  outline: none;

  cursor: pointer;
  filter: drop-shadow(1vh 1vh 1vh black);
}
.overlay_close_button:active {
  color: var(--ActiveColor);
  fill: currentColor;
  filter: none;
}
.view_button {
  background: none;
  color: var(--DisabledColor);
  fill: currentColor;
  border: none;
  outline: none;
  width: 100%;
  height: 7.5vh;
  cursor: pointer;
}
.control_button {
  background: none;
  color: var(--AvailableColor);
  fill: currentColor;
  border-radius: 1vh;
  height: 10vh;
  width: 10vw;
  border: none;
  outline: none;
  cursor: pointer;
}
.control_button:disabled {
  color: var(--DisabledColor);
  cursor: not-allowed;
}
.control_button:active {
  color: var(--ActiveColor);
}

.list_item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1vh 1vw;
  background: var(--TransparentColor);
}

.list_item_image {
  height: 10vh;
  width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list_item_image img {
  max-height: 10vh;
  max-width: 10vw;
}

.list_item_info {
  margin-left: 1vw;
  width: 80%;
}

.list_item_control {
  height: 10vh;
  width: 10vw;
  fill: currentColor;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list_item_button {
  background: none;
  color: var(--AvailableColor);
  fill: currentColor;
  border: none;
  border-radius: 1vh;
  height: 7.5vh;
  width: 7.5vw;
  outline: none;
  cursor: pointer;
}
.list_item_button:active {
  background: var(--ActiveColor);
  color: var(--AvailableColor);
}

.ui_button {
  color: var(--BaseColor);
  background-color: var(--AvailableColor);
  text-decoration: none;
  display: inline-block;
  margin: 1vh 1vw;
  padding: 1vh 1vw;
  border-radius: 1vh;
  border: none;
  outline: none;
  cursor: pointer;
  filter: drop-shadow(1vh 1vh 1vh black);
}
.text_bold {
  font-weight: bold;
  font-size: 125%;
}
a {
  color: var(--AvailableColor);
}
svg {
  height: 100%;
  width: 100%;
}
h1 {
  font-size: 200%;
}
input[type="radio"] {
  display: none;
}
input[type="radio"] + label {
  color: var(--BaseColor);
  background-color: var(--AvailableColor);
  text-decoration: none;
  display: inline-block;
  margin: 1vh 1vw;
  padding: 1vh 1vw;
  border-radius: 1vh;
  border: none;
  outline: none;
  cursor: pointer;
  filter: drop-shadow(1vh 1vh 1vh black);
}
input[type="radio"]:checked + label {
  background-color: var(--ActiveColor);
  color: var(--AvailableColor);
  filter: none;
}

input[type="range"] {
  appearance: none;
  outline: none;
  background: var(--ActiveColor);
  border-radius: 1vh;
  height: 1vh;
  margin-bottom: 1vh;
}

/* Thumb styling for WebKit/Blink/Chrome/Safari */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 2.5vh;
  width: 2.5vh;
  border-radius: 50%;
  background: var(--AvailableColor);
  cursor: pointer;
}

/* Thumb styling for Firefox */
input[type="range"]::-moz-range-thumb {
  height: 2.5vh;
  width: 2.5vh;
  border-radius: 50%;
  background: var(--AvailableColor);
  cursor: pointer;
}

/* Thumb styling for IE */
input[type="range"]::-ms-thumb {
  height: 2.5vh;
  width: 2.5vh;
  border-radius: 50%;
  background: var(--AvailableColor);
  cursor: pointer;
}

@media screen and (orientation: landscape) {
  .overlay_close_button {
    height: 7.5vh;
    width: 7.5vh;
  }
}
@media screen and (orientation: portrait) {
  .overlay_close_button {
    height: 5vh;
    width: 5vh;
  }
}
</style>
