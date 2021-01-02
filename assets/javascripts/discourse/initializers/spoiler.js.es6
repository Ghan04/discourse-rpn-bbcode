/**
 * @file Initializes any spoiler tag with proper js/event handling
 */
import loadScript from "discourse/lib/load-script";
import { withPluginApi } from "discourse/lib/plugin-api";

/**
 * Adds the inline js for spoilers inside a given post
 * @param {HTMLElement} post the post itself
 */
async function addSpoilerCode(post) {
  /** all of the elements that contain the class `.bbcode-spoiler-button` */
  const spoilers = post.querySelectorAll(".bbcode-spoiler-button");
  // if no spoilers found, end function
  if (!spoilers.length) return;

  console.log("Loading spoiler code");
  const startAt = performance.now();
  // lazy load in the spoiler.js
  await loadScript("/plugins/discourse-rpn-bbcode/javascripts/spoiler.js");
  const endAt = performance.now();
  console.log("Loaded or has already been loaded");
  console.log(`${endAt - startAt} ms`);
  spoilers.forEach((spoiler) => {
    applySpoiler(spoiler);
  });
}

/**
 * The initial called function.
 * Any calls to the PluginAPI should be done in here
 * @param api
 */
function initializeSpoiler(api) {
  api.decorateCookedElement(addSpoilerCode, { id: "add spoilers" });
}

export default {
  name: "spoiler",
  initialize() {
    withPluginApi("0.1", initializeSpoiler);
  },
};
