'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'philosophy', title: 'Design Philosophy', icon: '💡' },
    { id: 'visual', title: 'Visual Learning', icon: '🎨' },
    { id: 'audio', title: 'Audio & Speech', icon: '🔊' },
    { id: 'interaction', title: 'Interaction & Motion', icon: '✨' },
    { id: 'language', title: 'Language & Tone', icon: '💬' },
    { id: 'cognitive', title: 'Cognitive Load', icon: '🧠' },
    { id: 'accessibility', title: 'Accessibility', icon: '♿' },
    { id: 'emotional', title: 'Emotional Safety', icon: '🛡️' },
    { id: 'cultural', title: 'Cultural Localization', icon: '🌏' },
    { id: 'privacy', title: 'Child Safety & Privacy', icon: '🔒' },
    { id: 'performance', title: 'Performance', icon: '⚡' },
    { id: 'measurement', title: 'Measurement', icon: '📊' },
    { id: 'components', title: 'Components', icon: '🧩' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Vocab Ahmedabad Design System
              </h1>
              <p className="text-gray-600 mt-1">
                A children's ESL vocabulary learning app • Ages 8-10 • Ahmedabad, India
              </p>
            </div>
            <a
              href="/"
              className="text-accent-500 hover:text-accent-600 font-medium transition-colors"
            >
              ← Back to App
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0 sticky top-32 h-fit">
            <nav className="bg-white rounded-child shadow-md p-4 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl font-medium transition-all
                    flex items-center gap-3
                    ${
                      activeSection === section.id
                        ? 'bg-accent-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span className="text-sm">{section.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-child shadow-md p-8"
            >
              {activeSection === 'overview' && <OverviewSection />}
              {activeSection === 'philosophy' && <PhilosophySection />}
              {activeSection === 'visual' && <VisualSection />}
              {activeSection === 'audio' && <AudioSection />}
              {activeSection === 'interaction' && <InteractionSection />}
              {activeSection === 'language' && <LanguageSection />}
              {activeSection === 'cognitive' && <CognitiveSection />}
              {activeSection === 'accessibility' && <AccessibilitySection />}
              {activeSection === 'emotional' && <EmotionalSection />}
              {activeSection === 'cultural' && <CulturalSection />}
              {activeSection === 'privacy' && <PrivacySection />}
              {activeSection === 'performance' && <PerformanceSection />}
              {activeSection === 'measurement' && <MeasurementSection />}
              {activeSection === 'components' && <ComponentsSection />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Overview</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        This design system is built on 11 foundational layers that work together to create an
        effective, safe, and culturally appropriate learning experience for ESL students.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-primary-700 mb-3">Target Audience</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Ages 8-10</li>
            <li>• ESL learners</li>
            <li>• Ahmedabad, India</li>
            <li>• Low-spec tablets</li>
          </ul>
        </div>

        <div className="bg-secondary-50 border-2 border-secondary-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-secondary-700 mb-3">Core Principles</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Clarity over decoration</li>
            <li>• Low cognitive load</li>
            <li>• Emotional safety</li>
            <li>• Privacy by design</li>
          </ul>
        </div>
      </div>

      <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-accent-700 mb-3">11 Design Layers</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="text-gray-700">1. Visual Learning</div>
          <div className="text-gray-700">2. Audio & Speech</div>
          <div className="text-gray-700">3. Interaction & Motion</div>
          <div className="text-gray-700">4. Language & Tone</div>
          <div className="text-gray-700">5. Cognitive Load</div>
          <div className="text-gray-700">6. Accessibility</div>
          <div className="text-gray-700">7. Emotional Safety</div>
          <div className="text-gray-700">8. Cultural Localization</div>
          <div className="text-gray-700">9. Child Safety & Privacy</div>
          <div className="text-gray-700">10. Performance & Reliability</div>
          <div className="text-gray-700">11. Measurement & Iteration</div>
        </div>
      </div>
    </div>
  )
}

function PhilosophySection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Design Philosophy</h2>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Clarity over Decoration</h3>
          <p className="text-gray-700">
            Remove visual noise and focus on learning. Every element serves a purpose.
            No decorative imagery or unnecessary effects.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Low Cognitive Load</h3>
          <p className="text-gray-700">
            One concept, one decision at a time. Maximum 1 instruction per screen.
            Clear visual hierarchy guides attention naturally.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Emotional Safety</h3>
          <p className="text-gray-700">
            No fear of failure. Unlimited retries with neutral, supportive feedback.
            No penalties, timers, or competitive elements.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Relevance</h3>
          <p className="text-gray-700">
            Localized for Ahmedabad context with Indian English TTS voice.
            Use familiar objects, scenarios, and culturally appropriate content.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Performance First</h3>
          <p className="text-gray-700">
            Optimized for low-spec devices and low-bandwidth connections.
            Cache aggressively, fail gracefully offline.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy by Design</h3>
          <p className="text-gray-700">
            No tracking, no login, no personal data collection.
            All progress stored locally. Zero third-party analytics.
          </p>
        </div>
      </div>
    </div>
  )
}

function VisualSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Visual Learning Layer</h2>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Color System</h3>
        <p className="text-gray-600 mb-6">Based on Children Mobile App Design System - Optimized for ages 8-10</p>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-3">Primary Colors (Green)</h4>
            <div className="grid grid-cols-5 gap-2">
              <ColorSwatch color="primary-50" hex="#F6FEF7" />
              <ColorSwatch color="primary-100" hex="#CEF8D5" />
              <ColorSwatch color="primary-200" hex="#86E99F" />
              <ColorSwatch color="primary-300" hex="#36CE7C" />
              <ColorSwatch color="primary-400" hex="#24C26D" />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              <ColorSwatch color="primary-500" hex="#02A959" label="Main" />
              <ColorSwatch color="primary-600" hex="#028E4B" />
              <ColorSwatch color="primary-700" hex="#02743D" />
              <ColorSwatch color="primary-800" hex="#025A2F" />
              <ColorSwatch color="primary-900" hex="#01321A" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-3">Secondary Colors (Yellow)</h4>
            <div className="grid grid-cols-5 gap-2">
              <ColorSwatch color="secondary-50" hex="#FFFBF5" />
              <ColorSwatch color="secondary-100" hex="#FEF3E2" />
              <ColorSwatch color="secondary-200" hex="#FDE7C4" />
              <ColorSwatch color="secondary-300" hex="#FBD698" />
              <ColorSwatch color="secondary-400" hex="#F8BF5D" />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              <ColorSwatch color="secondary-500" hex="#F59E0B" label="Secondary" />
              <ColorSwatch color="secondary-600" hex="#D88B09" />
              <ColorSwatch color="secondary-700" hex="#BA7808" />
              <ColorSwatch color="secondary-800" hex="#895806" />
              <ColorSwatch color="secondary-900" hex="#583904" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-3">Tertiary Colors (Blue)</h4>
            <div className="grid grid-cols-5 gap-2">
              <ColorSwatch color="tertiary-50" hex="#F5FAFE" />
              <ColorSwatch color="tertiary-100" hex="#CFE7FC" />
              <ColorSwatch color="tertiary-200" hex="#B7DBFA" />
              <ColorSwatch color="tertiary-300" hex="#8CC4F7" />
              <ColorSwatch color="tertiary-400" hex="#61AEF4" />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              <ColorSwatch color="tertiary-500" hex="#2E94F1" label="Informational" />
              <ColorSwatch color="tertiary-600" hex="#478CAE" />
              <ColorSwatch color="tertiary-700" hex="#0C65B6" />
              <ColorSwatch color="tertiary-800" hex="#094A86" />
              <ColorSwatch color="tertiary-900" hex="#06325B" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-3">Error Colors (Red)</h4>
            <div className="grid grid-cols-5 gap-2">
              <ColorSwatch color="error-50" hex="#FFFAFA" />
              <ColorSwatch color="error-100" hex="#FFE5E5" />
              <ColorSwatch color="error-200" hex="#FFC2C2" />
              <ColorSwatch color="error-300" hex="#FF9494" />
              <ColorSwatch color="error-400" hex="#F76969" />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              <ColorSwatch color="error-500" hex="#EF4444" label="Error" />
              <ColorSwatch color="error-600" hex="#CF2A2A" />
              <ColorSwatch color="error-700" hex="#AE2424" />
              <ColorSwatch color="error-800" hex="#861919" />
              <ColorSwatch color="error-900" hex="#490E0E" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-3">Neutral Colors (Gray + Black/White)</h4>
            <div className="grid grid-cols-5 gap-2">
              <ColorSwatch color="neutral-50" hex="#F9F9FA" />
              <ColorSwatch color="neutral-100" hex="#F4F5F5" />
              <ColorSwatch color="neutral-200" hex="#ECEEF0" />
              <ColorSwatch color="neutral-300" hex="#DEE1E5" />
              <ColorSwatch color="neutral-400" hex="#CFD3DA" />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              <ColorSwatch color="neutral-500" hex="#B7BDC7" label="Neutral" />
              <ColorSwatch color="neutral-600" hex="#969DAC" />
              <ColorSwatch color="neutral-700" hex="#737E91" />
              <ColorSwatch color="neutral-800" hex="#515967" />
              <ColorSwatch color="neutral-900" hex="#414853" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Typography</h3>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="font-display text-4xl mb-2">Bubblegum Sans</p>
            <p className="text-gray-600">Used for headings, titles, and emphasis - Playful and child-friendly</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <p className="font-sans text-3xl mb-2">Andika</p>
            <p className="text-gray-600">Used for body text, descriptions, and smaller fonts - Clear and readable for learning</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-child-xl font-bold mb-2">child-xl (36px)</p>
            <p className="text-gray-600">Main headings</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-child-lg font-bold mb-2">child-lg (30px)</p>
            <p className="text-gray-600">Subheadings</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-child-base font-bold mb-2">child-base (24px)</p>
            <p className="text-gray-600">Body text</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-child-sm font-bold mb-2">child-sm (20px)</p>
            <p className="text-gray-600">Instructions</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-3">Layout Rules</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• One learning concept per screen</li>
          <li>• Maximum 2 primary visual elements</li>
          <li>• Vertical stacking only</li>
          <li>• Touch targets ≥ 48px</li>
          <li>• High contrast (WCAG AA minimum)</li>
        </ul>
      </div>
    </div>
  )
}

function ColorSwatch({ color, hex, label }: { color: string; hex: string; label?: string }) {
  return (
    <div className="space-y-1">
      <div className={`bg-${color} h-16 rounded-lg border border-gray-300 shadow-sm`} style={{ backgroundColor: hex }} />
      <div className="text-xs text-center">
        <div className="font-medium text-gray-700">{label || color}</div>
        <div className="text-gray-500">{hex}</div>
      </div>
    </div>
  )
}

function AudioSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Audio & Speech Layer</h2>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-blue-800 mb-3">Google TTS Configuration</h3>
        <p className="text-gray-700">
          <strong>Voice:</strong> English (Indian) - Female<br />
          <strong>Implementation:</strong> Cache locally after first fetch<br />
          <strong>Behavior:</strong> Non-blocking, user-controlled playback
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">1. Word Pronunciation</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Plays ONLY on user tap</li>
            <li>• Never autoplay</li>
            <li>• Cache after first fetch</li>
            <li>• Visual speaker icon required</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">2. Instruction Narration</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Auto-plays ONCE when screen loads</li>
            <li>• Cache for repeated access</li>
            <li>• User can replay via icon</li>
            <li>• Non-blocking UI</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">3. Feedback Sounds</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Correct: Subtle positive chime</li>
            <li>• Retry: Neutral sound</li>
            <li>• Level complete: Success sound</li>
            <li>• UI tap: Light tap feedback</li>
          </ul>
        </div>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-red-800 mb-3">Audio Restrictions</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Never overlap audio sources</li>
          <li>• No background music</li>
          <li>• Never block UI during playback</li>
          <li>• No mixing of accents or voice types</li>
        </ul>
      </div>
    </div>
  )
}

function InteractionSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
        Interaction & Motion Layer
      </h2>

      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-purple-800 mb-3">Animation Constraints</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Duration: 150-250ms only</li>
          <li>• Easing: ease-out only</li>
          <li>• Max 1 animation at a time</li>
          <li>• Respect reduced motion preferences</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Required Component States</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">⚪</div>
            <div className="font-bold">Default</div>
          </div>
          <div className="bg-gray-100 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🔘</div>
            <div className="font-bold">Hover</div>
          </div>
          <div className="bg-accent-100 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🟠</div>
            <div className="font-bold">Pressed</div>
          </div>
          <div className="bg-gray-200 rounded-xl p-4 text-center opacity-50">
            <div className="text-3xl mb-2">⚫</div>
            <div className="font-bold">Disabled</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Touch Feedback</h4>
          <button className="bg-accent-500 text-white px-8 py-4 rounded-child active:scale-95 transition-transform duration-75 font-medium">
            Tap Me (scales to 95%)
          </button>
          <p className="text-gray-600 mt-3">
            Every tap gives immediate visual feedback using <code>active:scale-95</code>
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Loading States</h4>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="animate-spin h-5 w-5 border-2 border-accent-500 border-t-transparent rounded-full" />
            <span>Loading lesson...</span>
          </div>
          <p className="text-gray-600 mt-3">Always show text + spinner, never spinner alone</p>
        </div>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-red-800 mb-3">Motion Restrictions</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Never chain animations</li>
          <li>• Never animate entire screens</li>
          <li>• No parallax effects</li>
          <li>• No complex gestures (swipe, pinch)</li>
        </ul>
      </div>
    </div>
  )
}

function LanguageSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Language & Tone Layer</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">😌</div>
          <div className="font-bold text-blue-800">Calm</div>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🤔</div>
          <div className="font-bold text-purple-800">Curious</div>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🤝</div>
          <div className="font-bold text-green-800">Respectful</div>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="font-bold text-yellow-800">Non-judgmental</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Sentence Rules</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Maximum 12 words per sentence</li>
          <li>• Simple present tense preferred</li>
          <li>• Concrete vocabulary only</li>
          <li>• Active voice when possible</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-800 mb-3">✓ Success Feedback</h4>
          <div className="space-y-2 text-gray-700">
            <p>"You answered correctly."</p>
            <p>"You matched the word."</p>
            <p>"You finished this block."</p>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h4 className="text-lg font-bold text-blue-800 mb-3">↻ Retry Feedback</h4>
          <div className="space-y-2 text-gray-700">
            <p>"Keep practicing."</p>
            <p>"Try listening again."</p>
            <p>"You can try again later."</p>
          </div>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
          <h4 className="text-lg font-bold text-purple-800 mb-3">→ Instructions</h4>
          <div className="space-y-2 text-gray-700">
            <p>"Tap the word to hear it."</p>
            <p>"Ready for the next block?"</p>
            <p>"Put these words in order."</p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-red-800 mb-3">Language Restrictions</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• No idioms or colloquialisms</li>
          <li>• No exclamation marks</li>
          <li>• No praise labels (smart, genius, excellent)</li>
          <li>• No competitive language (fastest, best)</li>
          <li>• No failure language (wrong, incorrect, mistake)</li>
        </ul>
      </div>
    </div>
  )
}

function CognitiveSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Cognitive Load Layer</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-accent-600 mb-2">1</div>
          <div className="font-bold text-gray-800">Instruction per screen</div>
        </div>
        <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-accent-600 mb-2">1</div>
          <div className="font-bold text-gray-800">Decision per screen</div>
        </div>
        <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-accent-600 mb-2">2</div>
          <div className="font-bold text-gray-800">UI actions visible</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Sequencing Pattern</h3>
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-2">
              1
            </div>
            <div className="font-bold">Explain</div>
            <div className="text-sm text-gray-600">Show instruction</div>
          </div>
          <div className="text-3xl text-gray-400">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-2">
              2
            </div>
            <div className="font-bold">Interact</div>
            <div className="text-sm text-gray-600">User acts</div>
          </div>
          <div className="text-3xl text-gray-400">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-2">
              3
            </div>
            <div className="font-bold">Feedback</div>
            <div className="text-sm text-gray-600">Show result</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-3">Key Rule</h3>
        <p className="text-lg text-gray-800">
          <strong>Never explain during tests.</strong> Instructions before, feedback after.
        </p>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-red-800 mb-3">Cognitive Load Restrictions</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Never introduce new controls mid-task</li>
          <li>• Never combine audio + text + animation simultaneously</li>
          <li>• Never show multiple concepts at once</li>
        </ul>
      </div>
    </div>
  )
}

function AccessibilitySection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
        Accessibility & Inclusion Layer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-3">Touch Rules</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-accent-500 rounded-lg" />
                <span className="text-gray-700">≥ 48px target size</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-12 bg-accent-500 rounded-lg" />
                <div className="w-2 bg-gray-300" />
                <div className="w-12 h-12 bg-accent-500 rounded-lg" />
              </div>
              <span className="text-gray-700">≥ 8px spacing</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-800 mb-3">Visual Rules</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Contrast ≥ WCAG AA (4.5:1)</li>
            <li>• Never rely on color alone</li>
            <li>• Text size ≥ 16px minimum</li>
            <li>• Clear visual hierarchy</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-purple-800 mb-3">Audio Rules</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• All audio has visual cue (speaker icon)</li>
          <li>• All instructions available as text</li>
          <li>• User-controlled playback</li>
          <li>• No audio-only instructions</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Motion Preferences</h3>
        <p className="text-gray-700 mb-4">
          Always respect <code>prefers-reduced-motion</code> setting:
        </p>
        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`const shouldReduceMotion = useReducedMotion()

// Disable animations if user prefers
transition={{
  duration: shouldReduceMotion ? 0 : 0.2
}}`}
        </pre>
      </div>
    </div>
  )
}

function EmotionalSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Emotional Safety Layer</h2>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-green-800 mb-3">Core Principle</h3>
        <p className="text-lg text-gray-800">
          <strong>Prevent fear of failure.</strong> Create a supportive learning environment where
          mistakes are part of learning.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">✓ Unlimited Retries</h4>
          <p className="text-gray-700">Never lock users out. Allow infinite attempts.</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">✓ No Failure Screens</h4>
          <p className="text-gray-700">Only show "Keep practicing" messages, never "You failed."</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">✓ Neutral Language</h4>
          <p className="text-gray-700">Avoid words like "wrong," "incorrect," or "mistake."</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">✓ No Penalties</h4>
          <p className="text-gray-700">No score reduction, time loss, or locked content.</p>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">Retry Pattern</h3>
        <ol className="space-y-3 text-gray-700">
          <li>1. Show gentle message: "Keep practicing."</li>
          <li>2. Provide replay audio option</li>
          <li>3. Allow immediate retry (same question)</li>
        </ol>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Mistake Representation</h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-400 shadow-md" />
          <div className="w-12 h-12 rounded-full bg-gray-400 shadow-md" />
          <div className="w-12 h-12 rounded-full bg-gray-100 border-4 border-gray-300 shadow-md" />
        </div>
        <p className="text-gray-700 mt-4">
          Use neutral gray circles. No red X marks or dramatic animations.
        </p>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-red-800 mb-3">Never Include</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Timers or countdown clocks</li>
          <li>• Streak loss notifications</li>
          <li>• Comparison to other users</li>
          <li>• Leaderboards or rankings</li>
          <li>• Locked content after mistakes</li>
        </ul>
      </div>
    </div>
  )
}

function CulturalSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
        Cultural Localization Layer
      </h2>

      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-orange-800 mb-3">Target Context</h3>
        <p className="text-lg text-gray-800">
          <strong>Location:</strong> Ahmedabad, India<br />
          <strong>Audience:</strong> ESL learners, ages 8-10<br />
          <strong>Voice:</strong> Google TTS English (Indian accent, female)
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Content Rules</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Use neutral Indian contexts</li>
            <li>• Reference familiar places (school, home, neighborhood)</li>
            <li>• Use consistent English-Indian pronunciation</li>
            <li>• Avoid foreign cultural references</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Names & Objects</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Use common Indian names in examples</li>
            <li>• Reference familiar objects from daily life</li>
            <li>• Use local scenarios students recognize</li>
            <li>• Respect local customs and values</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Language Approach</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Primary language: English (ESL learning)</li>
            <li>• Vocabulary: Grade-appropriate, culturally neutral</li>
            <li>• Examples use local context when possible</li>
            <li>• Avoid unexplained idioms or metaphors</li>
          </ul>
        </div>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-red-800 mb-3">Cultural Restrictions</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Never mix accents or voice types</li>
          <li>• No Western-specific holidays or customs</li>
          <li>• No culturally inappropriate imagery</li>
          <li>• No foreign cultural knowledge assumptions</li>
        </ul>
      </div>
    </div>
  )
}

function PrivacySection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
        Child Safety & Privacy Layer
      </h2>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-green-800 mb-3">Privacy-by-Design</h3>
        <p className="text-lg text-gray-800">
          Zero tracking, zero data collection. Everything stays on device.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Data Rules</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• No login required</li>
            <li>• No ads or trackers</li>
            <li>• Store progress locally only</li>
            <li>• No personal data collection</li>
            <li>• No behavioral tracking</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Permissions</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-600">
              <span className="text-xl">✗</span>
              <span>No microphone access</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <span className="text-xl">✗</span>
              <span>No camera access</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <span className="text-xl">✗</span>
              <span>No location access</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <span className="text-xl">✗</span>
              <span>No contacts access</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-blue-800 mb-3">Local Storage Only</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Lesson progress stored locally</li>
          <li>• Audio cache on device</li>
          <li>• No cloud sync</li>
          <li>• User can clear all data anytime</li>
        </ul>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-red-800 mb-3">Prohibited</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Third-party analytics SDKs</li>
          <li>• Personal identifiers storage</li>
          <li>• Cross-session tracking</li>
          <li>• Social features</li>
          <li>• External advertisements</li>
        </ul>
      </div>
    </div>
  )
}

function PerformanceSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
        Performance & Reliability Layer
      </h2>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-3">Target Environment</h3>
        <p className="text-lg text-gray-800">
          <strong>Devices:</strong> Low-spec tablets<br />
          <strong>Connection:</strong> Low-bandwidth, unreliable<br />
          <strong>Strategy:</strong> Cache aggressively, fail gracefully
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Performance Rules</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Preload next screen assets</li>
            <li>• Cache audio and images locally</li>
            <li>• Fail gracefully when offline</li>
            <li>• Optimize asset sizes (compress, use SVG)</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Loading States</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Always show text + spinner</li>
            <li>• Never block whole app</li>
            <li>• Provide context ("Loading lesson...")</li>
            <li>• Allow cancellation when appropriate</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Caching Strategy</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Audio: Cache TTS responses locally</li>
            <li>• Images: Cache after first load</li>
            <li>• Lesson data: Local storage with versioning</li>
            <li>• Sound effects: Bundle in app</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-blue-800 mb-3">Performance Targets</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">&lt; 3s</div>
            <div className="text-gray-700">Initial load (slow 3G)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">&lt; 100ms</div>
            <div className="text-gray-700">Interaction response</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">60fps</div>
            <div className="text-gray-700">Animation frame rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">Min</div>
            <div className="text-gray-700">Bundle size</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MeasurementSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
        Measurement & Iteration Layer
      </h2>

      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-purple-800 mb-3">Core Principle</h3>
        <p className="text-lg text-gray-800">
          Instrument learning quality signals only. No identity tracking, no behavioral profiling.
        </p>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">Allowed Metrics (Local Only)</h3>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Audio replays:</strong> Count per question (indicates unclear audio/instruction)
          </li>
          <li>
            <strong>Retry counts:</strong> Attempts per question (identifies difficult content)
          </li>
          <li>
            <strong>Screen completion:</strong> Boolean per lesson (tracks progress)
          </li>
          <li>
            <strong>Time spent:</strong> Per lesson/question (optional, helps pace content)
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Storage Rules</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Local only (IndexedDB or localStorage)</li>
            <li>• Resettable by user</li>
            <li>• No user identifiers</li>
            <li>• Aggregated data only</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Usage of Metrics</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Improve lesson difficulty calibration</li>
            <li>• Identify confusing content</li>
            <li>• Optimize user flow</li>
            <li>• Local A/B testing variations</li>
          </ul>
        </div>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-red-800 mb-3">Prohibited</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Track identity or personal information</li>
          <li>• Track location or device IDs</li>
          <li>• Track behavior across sessions</li>
          <li>• Send data to external servers</li>
          <li>• Use third-party analytics</li>
          <li>• Create user profiles</li>
        </ul>
      </div>
    </div>
  )
}

function ComponentsSection() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Component Library</h2>

      <div className="space-y-8">
        {/* Button Pattern */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Standard Button</h3>
          <button className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-6 px-8 rounded-child shadow-lg active:scale-95 transition-all min-h-[3rem]">
            Primary Action Button
          </button>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mt-4">
{`className="
  bg-accent-500 hover:bg-accent-600
  text-white font-medium
  py-6 px-8 rounded-child shadow-lg
  active:scale-95 transition-all
  min-h-[3rem]
"`}
          </pre>
        </div>

        {/* Card Pattern */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Standard Card</h3>
          <div className="bg-white rounded-child shadow-xl p-8 max-w-md">
            <h4 className="text-2xl font-bold mb-3">Card Title</h4>
            <p className="text-gray-700">Card content goes here with proper spacing and typography.</p>
          </div>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mt-4">
{`className="
  bg-white rounded-child shadow-xl p-8
"`}
          </pre>
        </div>

        {/* Modal Pattern */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Modal Overlay</h3>
          <div className="relative bg-gray-200 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
            <div className="bg-white rounded-child shadow-2xl p-8 max-w-md">
              <h4 className="text-2xl font-bold mb-3 text-gray-800">Modal Content</h4>
              <p className="text-gray-700 mb-4">Centered modal with overlay background.</p>
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-4 px-6 rounded-child">
                Close
              </button>
            </div>
          </div>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mt-4">
{`{/* Overlay */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
  {/* Modal */}
  <div className="bg-white rounded-child shadow-2xl p-8 max-w-lg">
    {/* Content */}
  </div>
</div>`}
          </pre>
        </div>

        {/* Animation Pattern */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Standard Animation</h3>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  {/* Content */}
</motion.div>`}
          </pre>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Bar</h3>
          <div className="bg-white rounded-child shadow-md p-4 max-w-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-base font-medium text-gray-700">Question 3 of 10</span>
              <span className="text-base font-medium text-gray-700">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-accent-500 h-4 rounded-full transition-all duration-500"
                style={{ width: '30%' }}
              />
            </div>
          </div>
        </div>

        {/* Mistake Counter */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Mistake Counter (Neutral)</h3>
          <div className="flex justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-400 shadow-md" />
            <div className="w-12 h-12 rounded-full bg-gray-400 shadow-md" />
            <div className="w-12 h-12 rounded-full bg-gray-100 border-4 border-gray-300 shadow-md" />
            <div className="w-12 h-12 rounded-full bg-gray-100 border-4 border-gray-300 shadow-md" />
          </div>
          <p className="text-gray-600 text-center mt-3">2 of 4 attempts used</p>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-blue-800 mb-3">Design Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
          <div>✓ Touch targets ≥ 48px</div>
          <div>✓ Contrast ratio ≥ 4.5:1</div>
          <div>✓ Child-appropriate font sizes</div>
          <div>✓ One concept per screen</div>
          <div>✓ Clear visual hierarchy</div>
          <div>✓ Animations 150-250ms</div>
          <div>✓ Neutral, supportive language</div>
          <div>✓ No fear of failure</div>
          <div>✓ Audio has visual cue</div>
          <div>✓ Cached assets</div>
          <div>✓ Local-only storage</div>
          <div>✓ Culturally appropriate</div>
        </div>
      </div>
    </div>
  )
}
