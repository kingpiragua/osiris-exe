/**
 * Procedural CRT sound for OSIRIS.EXE — no audio assets, fully offline.
 *
 * A low tube hum + faint electronic noise during boot narration; a clean cut to
 * silence when the Archive finishes speaking; then a single crisp phosphor flick
 * as the prompt appears. Everything is synthesized with the Web Audio API.
 *
 * Browser autoplay policy: audio cannot start until the visitor interacts. We
 * create the context lazily and resume it on the first gesture, so the hum
 * begins as soon as the page is touched/typed/clicked. Everything no-ops safely
 * on the server or where Web Audio is unavailable.
 */

type AudioWindow = Window &
  typeof globalThis & { webkitAudioContext?: typeof AudioContext };

class ArchiveSound {
  private ctx: AudioContext | null = null;
  private hum: GainNode | null = null;
  private humSources: AudioScheduledSourceNode[] = [];
  private gestureBound = false;
  private enabled = true;

  setEnabled(value: boolean) {
    this.enabled = value;
    if (!value) this.silence(0.1);
  }

  /** Lazily create the AudioContext and bind a gesture-based resume. */
  private context(): AudioContext | null {
    if (typeof window === "undefined" || !this.enabled) return null;
    if (this.ctx) return this.ctx;

    const w = window as AudioWindow;
    const Ctor = w.AudioContext ?? w.webkitAudioContext;
    if (!Ctor) return null;

    this.ctx = new Ctor();
    this.bindGesture();
    return this.ctx;
  }

  private bindGesture() {
    if (this.gestureBound || typeof window === "undefined") return;
    this.gestureBound = true;
    const resume = () => void this.ctx?.resume?.();
    (["pointerdown", "keydown", "touchstart"] as const).forEach((event) =>
      window.addEventListener(event, resume, { passive: true }),
    );
  }

  /** Start the low CRT hum + faint noise, ramped in gently. */
  startHum(level = 0.04) {
    const ctx = this.context();
    if (!ctx || this.hum) return;
    void ctx.resume?.();

    const hum = ctx.createGain();
    hum.gain.value = 0;
    hum.connect(ctx.destination);

    // Low tube hum: a fundamental plus an octave.
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.6;
    oscGain.connect(hum);
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 55;
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 110;
    osc1.connect(oscGain);
    osc2.connect(oscGain);

    // Faint electronic noise through a narrow band-pass.
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1200;
    noiseFilter.Q.value = 0.7;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.015;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(hum);

    osc1.start();
    osc2.start();
    noise.start();

    const now = ctx.currentTime;
    hum.gain.setValueAtTime(0, now);
    hum.gain.linearRampToValueAtTime(level, now + 1.5);

    this.hum = hum;
    this.humSources = [osc1, osc2, noise];
  }

  /** Cut the hum to silence over `fade` seconds — the Archive stops speaking. */
  silence(fade = 0.4) {
    const ctx = this.ctx;
    if (!ctx || !this.hum) return;

    const now = ctx.currentTime;
    this.hum.gain.cancelScheduledValues(now);
    this.hum.gain.setValueAtTime(this.hum.gain.value, now);
    this.hum.gain.linearRampToValueAtTime(0, now + fade);

    const sources = this.humSources;
    window.setTimeout(
      () =>
        sources.forEach((source) => {
          try {
            source.stop();
          } catch {
            /* already stopped */
          }
        }),
      (fade + 0.1) * 1000,
    );

    this.hum = null;
    this.humSources = [];
  }

  /** A single crisp phosphor flick — the prompt coming alive. */
  flick() {
    const ctx = this.context();
    if (!ctx) return;
    void ctx.resume?.();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.06);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

/** Shared instance — the archive has one voice. */
export const archiveSound = new ArchiveSound();
