'use client';

import { FormEvent, useMemo, useState } from 'react';
import { AgentInput, AgentOutput, runAgent } from '@/lib/agent';

const defaultInput: AgentInput = {
  topic: 'AI productivity hacks',
  persona: 'solo creator',
  desiredEmotion: 'wow',
  energy: 'high',
  callToAction: 'Drop a ⚡️ if you deploy this today.',
  offerType: 'content',
  editingStyle: 'fast-cuts'
};

export default function Home() {
  const [form, setForm] = useState<AgentInput>(defaultInput);
  const [output, setOutput] = useState<AgentOutput | null>(() => runAgent(defaultInput));
  const [isGenerating, setIsGenerating] = useState(false);

  const energyCopy = useMemo<Record<AgentInput['energy'], string>>(
    () => ({
      high: 'High voltage, flash-frame chaos',
      moderate: 'Balanced, confident pacing',
      chill: 'Laid back, intimate pacing'
    }),
    []
  );

  const desiredEmotionCopy = useMemo<
    Record<AgentInput['desiredEmotion'], string>
  >(
    () => ({
      wow: 'Shock and awe reveal',
      inspired: 'Make them believe they can do it too',
      laugh: 'Lean into humor and self-awareness',
      curious: 'Intrigue that pulls them down the rabbit hole'
    }),
    []
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsGenerating(true);
    const next = runAgent(form);
    setOutput(next);
    setTimeout(() => setIsGenerating(false), 250);
  }

  return (
    <main className="app-shell grid two-column">
      <section className="neon-card" style={{ padding: '32px 36px' }}>
        <header style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          <span className="badge">
            Viral Shorts Agent
          </span>
          <div style={{ display: 'grid', gap: 8 }}>
            <h1 style={{ fontSize: 40, margin: 0, lineHeight: 1.1 }}>
              Engineer a YouTube Shorts breakout in 60 seconds.
            </h1>
            <p style={{ margin: 0, opacity: 0.75, lineHeight: 1.5 }}>
              Feed it your topic, energy and CTA. It reverse engineers the hook, beat map,
              edits and packaging designed to trigger scroll-stopping virality.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="input-group">
          <div className="input-field">
            <label htmlFor="topic">Topic focus</label>
            <input
              id="topic"
              name="topic"
              value={form.topic}
              onChange={(event) => setForm((prev) => ({ ...prev, topic: event.target.value }))}
              placeholder="Ex: zero to one creator monetization"
            />
          </div>

          <div className="input-field">
            <label htmlFor="persona">Persona you are speaking to</label>
            <input
              id="persona"
              name="persona"
              value={form.persona}
              onChange={(event) => setForm((prev) => ({ ...prev, persona: event.target.value }))}
              placeholder="Ex: bootstrapped SaaS founder"
            />
          </div>

          <div className="grid" style={{ gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <div className="input-field">
              <label htmlFor="desiredEmotion">Emotion to trigger</label>
              <select
                id="desiredEmotion"
                name="desiredEmotion"
                value={form.desiredEmotion}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  desiredEmotion: event.target.value as AgentInput['desiredEmotion']
                }))}
              >
                <option value="wow">{desiredEmotionCopy.wow}</option>
                <option value="inspired">{desiredEmotionCopy.inspired}</option>
                <option value="laugh">{desiredEmotionCopy.laugh}</option>
                <option value="curious">{desiredEmotionCopy.curious}</option>
              </select>
            </div>

            <div className="input-field">
              <label htmlFor="energy">Energy level</label>
              <select
                id="energy"
                name="energy"
                value={form.energy}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    energy: event.target.value as AgentInput['energy']
                  }))
                }
              >
                <option value="high">{energyCopy.high}</option>
                <option value="moderate">{energyCopy.moderate}</option>
                <option value="chill">{energyCopy.chill}</option>
              </select>
            </div>
          </div>

          <div className="grid" style={{ gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <div className="input-field">
              <label htmlFor="offerType">Offer type</label>
              <select
                id="offerType"
                name="offerType"
                value={form.offerType}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    offerType: event.target.value as AgentInput['offerType']
                  }))
                }
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
                <option value="community">Community</option>
                <option value="content">Content</option>
              </select>
            </div>

            <div className="input-field">
              <label htmlFor="editingStyle">Editing style</label>
              <select
                id="editingStyle"
                name="editingStyle"
                value={form.editingStyle}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    editingStyle: event.target.value as AgentInput['editingStyle']
                  }))
                }
              >
                <option value="fast-cuts">Fast cuts / kinetic</option>
                <option value="cinematic">Cinematic micro-doc</option>
                <option value="meme">Meme & punch-in</option>
                <option value="talking-head">Talking head authority</option>
              </select>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="callToAction">Custom CTA line</label>
            <textarea
              id="callToAction"
              name="callToAction"
              value={form.callToAction}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  callToAction: event.target.value
                }))
              }
              placeholder="Ex: Comment “blueprint” to get the notion doc template."
            />
          </div>

          <button className="button-primary" type="submit" disabled={isGenerating}>
            {isGenerating ? 'Mapping sequences…' : 'Generate viral game plan'}
          </button>
        </form>
      </section>

      <section className="neon-card" style={{ padding: '32px 32px 40px', display: 'grid', gap: 28 }}>
        {output ? (
          <>
            <header className="output-header">
              <div>
                <h2>Launch-ready deliverable</h2>
                <p style={{ margin: '6px 0 0', opacity: 0.7 }}>
                  Plug this into your production stack, batch shoot, and ride the velocity.
                </p>
              </div>
              <div className="metrics-grid">
                <div className="metric-card">
                  <strong>{output.metrics.viralityScore}</strong>
                  <span>Virality</span>
                </div>
                <div className="metric-card">
                  <strong>{output.metrics.retentionScore}</strong>
                  <span>Retention</span>
                </div>
                <div className="metric-card">
                  <strong>{output.metrics.commentBaitScore}</strong>
                  <span>Comments</span>
                </div>
                <div className="metric-card">
                  <strong>{output.metrics.shareabilityScore}</strong>
                  <span>Shares</span>
                </div>
              </div>
            </header>

            <div className="output-content">
              <article className="output-section">
                <h3>Hook & opener</h3>
                <p style={{ fontWeight: 600 }}>{output.hook}</p>
                <p>{output.opener}</p>
                <div className="pill-group" style={{ marginTop: 12 }}>
                  <span className="pill">{form.desiredEmotion.toUpperCase()}</span>
                  <span className="pill">{form.energy.toUpperCase()}</span>
                  <span className="pill">{form.editingStyle}</span>
                </div>
              </article>

              <article className="output-section">
                <h3>Beat-by-beat script</h3>
                <ul>
                  {output.scriptBeats.map((item) => (
                    <li key={item.beat}>
                      <strong>{item.beat}:</strong> {item.line}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="output-section">
                <h3>Pattern interrupts & edits</h3>
                <ul>
                  {output.patternInterrupts.map((hint) => (
                    <li key={hint}>{hint}</li>
                  ))}
                </ul>
              </article>

              <article className="output-section">
                <h3>Visual direction</h3>
                <ul>
                  {output.visualDirections.map((direction) => (
                    <li key={direction}>{direction}</li>
                  ))}
                </ul>
              </article>

              <article className="output-section">
                <h3>B-roll & texture ideas</h3>
                <ul>
                  {output.brollIdeas.map((idea) => (
                    <li key={idea}>{idea}</li>
                  ))}
                </ul>
              </article>

              <article className="output-section">
                <h3>Publishing package</h3>
                <p><strong>Caption:</strong> {output.caption}</p>
                <p><strong>Hashtags:</strong> {output.hashtags.join(' ')}</p>
                <p><strong>CTA:</strong> {output.cta}</p>
              </article>

              <article className="output-section">
                <h3>Timeline map</h3>
                <div className="timeline-grid">
                  {output.timeline.map((row) => (
                    <div key={row.cue} className="timeline-step">
                      <header>{row.cue}</header>
                      <span style={{ opacity: 0.8 }}>{row.purpose}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="output-section">
                <h3>Remix runway</h3>
                <ul>
                  {output.remixIdeas.map((idea) => (
                    <li key={idea}>{idea}</li>
                  ))}
                </ul>
              </article>

              <article className="output-section">
                <h3>Packaging lab</h3>
                <p><strong>Thumbnail headline:</strong> {output.packaging.headline}</p>
                <p><strong>Thumbnail emoji stack:</strong> {output.packaging.emojiStack}</p>
                <p><strong>Thumbnail prompt:</strong> {output.packaging.thumbnailPrompt}</p>
              </article>
            </div>
          </>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            <h2>Ready when you are</h2>
            <p style={{ margin: 0, opacity: 0.7 }}>
              Dial in your topic and trigger the agent. It will architect hooks, scripts, edits, B-roll and CTA sequencing instantly.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
