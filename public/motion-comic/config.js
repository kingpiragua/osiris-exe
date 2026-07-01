/* ============================================================
   OSIRIS.EXE #1 — MOTION COMIC CONFIG
   Edit this file to change page order, captions, motion, and
   signal color. The player (index.html) reads this at load.
   signal: "neutral" | "green" | "green-red" | "red"
   pan:    starting focal point for the Ken Burns move
   ============================================================ */
window.OSIRIS_ISSUE = {
  title: "OSIRIS.EXE",
  issue: "ARCHIVE 01",
  tagline: "MEMORY IS THE OLDEST FORM OF RESISTANCE",
  assetDir: "pages/",
  ext: "webp",              // swap to "png" for full-res
  pages: [
    { file:"00_cover",        signal:"neutral",   pan:"center", hold:true,
      label:"COVER" },
    { file:"01_cold_open",    signal:"green",     pan:"top",
      label:"CHICAGO. YEAR UNKNOWN." },
    { file:"02_room",         signal:"neutral",   pan:"center",
      label:"2:47 AM" },
    { file:"03_static",       signal:"green",     pan:"bottom",
      label:"THE STATIC WASN'T RANDOM." },
    { file:"04_dead_devices", signal:"green-red", pan:"center",
      label:"DEAD. NO BATTERY. IMPOSSIBLE." },
    { file:"05_reception",    signal:"green-red", pan:"center",
      label:"I HEAR YOU." },
    { file:"06_seen",         signal:"red",       pan:"top", finale:true,
      label:"WE SEE YOU, SKYE." }
  ]
};
