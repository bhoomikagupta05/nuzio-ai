import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Mail,
  Lock,
  ArrowRight,
  Radio,
  Sliders,
  Bell,
  Trash2,
  Layers,
  Zap,
  Globe,
  Headphones,
  Check,
  Info,
  AlertTriangle,
  Play,
} from 'lucide-react';
import {
  Button,
  Card,
  IconButton,
  Avatar,
  Badge,
  Chip,
  Input,
  SearchInput,
  Toggle,
  Divider,
  ProgressBar,
  Skeleton,
  Modal,
} from '../components/common/index.js';
import {
  Container,
  Stack,
  Grid,
  PageHeader,
  Section,
} from '../components/layout/index.js';
import AppLayout from '../layouts/AppLayout.jsx';
import { colors } from '../theme/colors.js';

export const DesignSystemPage = () => {
  // Interactive state demos
  const [modalOpen, setModalOpen] = useState(false);
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedChips, setSelectedChips] = useState(['ai', 'tech', 'science']);
  const [progressVal, setProgressVal] = useState(65);
  const [activeNavTab, setActiveNavTab] = useState('home');

  const toggleChip = (id) => {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <AppLayout
      activeNavId={activeNavTab}
      onSelectNav={setActiveNavTab}
      topBarTitle="Design System & Component Library"
    >
      <PageHeader
        title="Nuzio AI Design System"
        subtitle="Visual language, reusable component primitives, design tokens, and responsive shell."
        badge={
          <Badge variant="purple" dot size="small">
            Phase 2 Verified
          </Badge>
        }
        actions={
          <Stack direction="row" gap={2}>
            <Button
              variant="secondary"
              size="small"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </Button>
            <Button
              variant="primary"
              size="small"
              leftIcon={<Sparkles size={16} />}
              onClick={() => setModalOpen(true)}
            >
              Preview Modal
            </Button>
          </Stack>
        }
      />

      <Stack gap={10} className="ds-page-content">
        {/* ================================================================= */}
        {/* 1. COLOR PALETTE */}
        {/* ================================================================= */}
        <Section
          title="1. Color Palette & Tokens"
          subtitle="Strict centralized palette with dark surfaces, purple glows, and mint highlights"
        >
          <Grid cols="auto-fit" minWidth={180} gap={4}>
            {[
              { label: 'Background', hex: '#08090B', token: 'var(--bg-main)', desc: 'Near-black base' },
              { label: 'Primary Surface', hex: '#101116', token: 'var(--bg-surface-primary)', desc: 'Base surface' },
              { label: 'Secondary Surface', hex: '#15161C', token: 'var(--bg-surface-secondary)', desc: 'Elevated layers' },
              { label: 'Card Default', hex: '#17171D', token: 'var(--bg-card)', desc: 'Card containers' },
              { label: 'Primary Purple', hex: '#7657FF', token: 'var(--color-primary)', desc: 'Brand accent' },
              { label: 'Primary Light', hex: '#8B6CFF', token: 'var(--color-primary-light)', desc: 'Hover & Highlights' },
              { label: 'Success Mint', hex: '#3DDC97', token: 'var(--color-success)', desc: 'Success indicators' },
              { label: 'Warning Gold', hex: '#FDB022', token: 'var(--color-warning)', desc: 'Alerts & cautions' },
              { label: 'Danger Red', hex: '#F04438', token: 'var(--color-danger)', desc: 'Errors & destructive' },
              { label: 'Text Primary', hex: '#F5F5F7', token: 'var(--text-primary)', desc: 'High contrast text' },
              { label: 'Text Secondary', hex: '#92929D', token: 'var(--text-secondary)', desc: 'Muted descriptions' },
              { label: 'Text Muted', hex: '#686873', token: 'var(--text-muted)', desc: 'Subtle captions' },
            ].map((color) => (
              <Card key={color.label} padding="small" className="ds-color-card">
                <div
                  className="ds-color-swatch"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="ds-color-meta">
                  <span className="ds-color-name">{color.label}</span>
                  <code className="ds-color-hex">{color.hex}</code>
                  <span className="ds-color-desc">{color.desc}</span>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* ================================================================= */}
        {/* 2. TYPOGRAPHY */}
        {/* ================================================================= */}
        <Section
          title="2. Typography Scale"
          subtitle="Clean modern sans-serif typography with generous headings and compact labels"
        >
          <Card padding="medium">
            <Stack gap={6}>
              <div className="ds-type-row">
                <span className="ds-type-label">Display (40px / 800)</span>
                <div className="typo-display">Personalized Daily Briefing</div>
              </div>

              <Divider />

              <div className="ds-type-row">
                <span className="ds-type-label">H1 Heading (32px / 700)</span>
                <div className="typo-h1">AI-Powered Executive Intelligence</div>
              </div>

              <Divider />

              <div className="ds-type-row">
                <span className="ds-type-label">H2 Heading (24px / 700)</span>
                <div className="typo-h2">Global Markets & Technology Pulse</div>
              </div>

              <Divider />

              <div className="ds-type-row">
                <span className="ds-type-label">H3 Heading (20px / 600)</span>
                <div className="typo-h3">Curated Topics for Shiva</div>
              </div>

              <Divider />

              <div className="ds-type-row">
                <span className="ds-type-label">Body Regular (16px / 400)</span>
                <p className="typo-body">
                  Nuzio AI synthesizes hundreds of real-time verified sources into concise, high-impact audio and text summaries calibrated to your career interests.
                </p>
              </div>

              <Divider />

              <div className="ds-type-row">
                <span className="ds-type-label">Body Small (14px / 400)</span>
                <p className="typo-body-small">
                  Updated 4 minutes ago • Synthesized from Bloomberg, TechCrunch, and Reuters.
                </p>
              </div>

              <Divider />

              <div className="ds-type-row">
                <span className="ds-type-label">Caption & Overline</span>
                <Stack direction="row" gap={4} align="center">
                  <span className="typo-overline">BREAKING NEWS</span>
                  <span className="typo-caption">Read time: 2 min • 420 words</span>
                  <span className="typo-label">Technology • AI Systems</span>
                </Stack>
              </div>
            </Stack>
          </Card>
        </Section>

        {/* ================================================================= */}
        {/* 3. BUTTONS */}
        {/* ================================================================= */}
        <Section
          title="3. Buttons & Interactive Controls"
          subtitle="44px touch targets, accessible focus rings, and smooth micro-interactions"
        >
          <Stack gap={6}>
            <Card padding="medium">
              <span className="ds-subsection-title">Button Variants</span>
              <Stack direction="row" wrap gap={3} align="center" style={{ marginTop: 12 }}>
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="ghost">Ghost Action</Button>
                <Button variant="danger">Danger Action</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </Stack>
            </Card>

            <Card padding="medium">
              <span className="ds-subsection-title">Button Sizes & Icons</span>
              <Stack direction="row" wrap gap={3} align="center" style={{ marginTop: 12 }}>
                <Button size="small" leftIcon={<Sparkles size={14} />}>Small Button</Button>
                <Button size="medium" leftIcon={<Play size={16} />} rightIcon={<ArrowRight size={16} />}>
                  Medium with Icons
                </Button>
                <Button size="large" variant="primary" rightIcon={<ArrowRight size={18} />}>
                  Large Call-to-Action
                </Button>
                <Button variant="primary" loading>Loading Button</Button>
              </Stack>
            </Card>

            <Card padding="medium">
              <span className="ds-subsection-title">Icon Buttons</span>
              <Stack direction="row" wrap gap={3} align="center" style={{ marginTop: 12 }}>
                <IconButton ariaLabel="Bell" variant="ghost" tooltip="Notifications">
                  <Bell size={18} />
                </IconButton>
                <IconButton ariaLabel="Sparkles" variant="filled" tooltip="AI Assist">
                  <Sparkles size={18} />
                </IconButton>
                <IconButton ariaLabel="Play" variant="primary" tooltip="Play Briefing">
                  <Play size={18} />
                </IconButton>
                <IconButton ariaLabel="Trash" variant="ghost" tooltip="Delete">
                  <Trash2 size={18} />
                </IconButton>
              </Stack>
            </Card>
          </Stack>
        </Section>

        {/* ================================================================= */}
        {/* 4. CARDS */}
        {/* ================================================================= */}
        <Section
          title="4. Cards & Surfaces"
          subtitle="Rounded 18px corners, dark backgrounds, soft shadows, and subtle purple glow highlights"
        >
          <Grid cols="auto-fit" minWidth={260} gap={4}>
            <Card variant="default">
              <div className="ds-card-demo">
                <span className="typo-overline">Default Card</span>
                <h4 className="typo-h3" style={{ margin: '8px 0' }}>Standard Surface</h4>
                <p className="typo-body-small">
                  Dark <code>#17171D</code> background with subtle <code>rgba(255,255,255,0.1)</code> border.
                </p>
              </div>
            </Card>

            <Card variant="elevated">
              <div className="ds-card-demo">
                <span className="typo-overline">Elevated Card</span>
                <h4 className="typo-h3" style={{ margin: '8px 0' }}>Elevated Depth</h4>
                <p className="typo-body-small">
                  Higher elevation surface <code>#1A1B22</code> with deeper soft shadow.
                </p>
              </div>
            </Card>

            <Card variant="highlighted" glow>
              <div className="ds-card-demo">
                <span className="typo-overline" style={{ color: 'var(--color-primary-light)' }}>
                  Highlighted Card
                </span>
                <h4 className="typo-h3" style={{ margin: '8px 0' }}>Purple Glow Accent</h4>
                <p className="typo-body-small">
                  Violet outline and ambient purple glow for featured intelligence items.
                </p>
              </div>
            </Card>

            <Card interactive selected>
              <div className="ds-card-demo">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="typo-overline">Interactive Card</span>
                  <CheckCircle2 size={16} color="var(--color-primary-light)" />
                </div>
                <h4 className="typo-h3" style={{ margin: '8px 0' }}>Selected Active State</h4>
                <p className="typo-body-small">
                  Hover transition `translateY(-1px)` and active purple border.
                </p>
              </div>
            </Card>
          </Grid>
        </Section>

        {/* ================================================================= */}
        {/* 5. CHIPS & TAGS */}
        {/* ================================================================= */}
        <Section
          title="5. Chips & Category Selectors"
          subtitle="Reusable filter chips for interests, onboarding topics, and status tags"
        >
          <Card padding="medium">
            <Stack gap={4}>
              <span className="ds-subsection-title">Interactive Filter Chips (Click to Toggle)</span>
              <Stack direction="row" wrap gap={2} align="center">
                {[
                  { id: 'ai', label: 'Artificial Intelligence', icon: <Sparkles size={14} /> },
                  { id: 'tech', label: 'Technology', icon: <Zap size={14} /> },
                  { id: 'markets', label: 'Global Markets', icon: <Globe size={14} /> },
                  { id: 'science', label: 'Space & Science', icon: <Radio size={14} /> },
                  { id: 'audio', label: 'Audio Briefing', icon: <Headphones size={14} /> },
                ].map((chip) => {
                  const isSelected = selectedChips.includes(chip.id);
                  return (
                    <Chip
                      key={chip.id}
                      icon={chip.icon}
                      selected={isSelected}
                      showCheck
                      onClick={() => toggleChip(chip.id)}
                    >
                      {chip.label}
                    </Chip>
                  );
                })}
              </Stack>

              <Divider />

              <span className="ds-subsection-title">Chip Variants & Badges</span>
              <Stack direction="row" wrap gap={2} align="center">
                <Chip variant="default" count={12}>Default Tag</Chip>
                <Chip variant="selected" showCheck>Selected Filter</Chip>
                <Chip variant="success" count="New">Live Feed</Chip>
                <Chip variant="default" onRemove={() => alert('Remove tag clicked')}>
                  Removable Tag
                </Chip>
                <Chip variant="default" size="small">Small Tag</Chip>
                <Chip variant="default" size="large">Large Tag</Chip>
              </Stack>
            </Stack>
          </Card>
        </Section>

        {/* ================================================================= */}
        {/* 6. INPUTS & SEARCH */}
        {/* ================================================================= */}
        <Section
          title="6. Inputs & Search Fields"
          subtitle="Accessible input groups, focus rings, prefix/suffix icons, and password toggles"
        >
          <Grid cols="auto-fit" minWidth={280} gap={4}>
            <Card padding="medium">
              <Input
                label="Full Name"
                placeholder="e.g. Shiva Kumar"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Enter your preferred name for personalized greetings."
              />
            </Card>

            <Card padding="medium">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                leftIcon={<Mail size={16} />}
                required
              />
            </Card>

            <Card padding="medium">
              <Input
                label="Password"
                type="password"
                placeholder="Enter password..."
                leftIcon={<Lock size={16} />}
                helperText="Must be at least 8 characters."
              />
            </Card>

            <Card padding="medium">
              <Input
                label="Error Validation Demo"
                defaultValue="invalid_email@"
                error="Please enter a valid email address."
                leftIcon={<Mail size={16} />}
              />
            </Card>
          </Grid>

          <Card padding="medium" style={{ marginTop: 16 }}>
            <span className="ds-subsection-title">Search Input Primitive</span>
            <div style={{ maxWidth: 480, marginTop: 12 }}>
              <SearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue('')}
                placeholder="Type to search design system tokens..."
                shortcutKey="⌘K"
              />
            </div>
          </Card>
        </Section>

        {/* ================================================================= */}
        {/* 7. TOGGLES & SWITCHES */}
        {/* ================================================================= */}
        <Section
          title="7. Accessible Toggles"
          subtitle="Custom switches with purple active tracks and smooth sliding knobs"
        >
          <Grid cols="auto-fit" minWidth={280} gap={4}>
            <Card padding="medium">
              <Toggle
                checked={toggle1}
                onChange={setToggle1}
                label="Morning Audio Briefing"
                description="Automatically generate 7:00 AM synthesized audio summary"
              />
            </Card>

            <Card padding="medium">
              <Toggle
                checked={toggle2}
                onChange={setToggle2}
                label="Breaking News Alerts"
                description="High priority notifications for critical events"
              />
            </Card>

            <Card padding="medium">
              <Toggle
                checked={false}
                disabled
                label="Disabled Toggle State"
                description="Feature unavailable on current plan"
              />
            </Card>
          </Grid>
        </Section>

        {/* ================================================================= */}
        {/* 8. AVATARS & BADGES */}
        {/* ================================================================= */}
        <Section
          title="8. Avatars & Status Badges"
          subtitle="Multi-size user and AI avatar avatars with status indicators"
        >
          <Grid cols="auto-fit" minWidth={280} gap={4}>
            <Card padding="medium">
              <span className="ds-subsection-title">Avatar Sizes & Statuses</span>
              <Stack direction="row" gap={3} align="center" wrap style={{ marginTop: 14 }}>
                <Avatar name="Shiva Kumar" size="xl" status="online" />
                <Avatar name="Alex Morgan" size="large" status="ai" />
                <Avatar name="Nova AI" size="medium" status="online" />
                <Avatar name="Sarah Chen" size="small" status="offline" />
                <Avatar name="User" size="xs" />
              </Stack>
            </Card>

            <Card padding="medium">
              <span className="ds-subsection-title">Status Badge Variants</span>
              <Stack direction="row" gap={2} wrap style={{ marginTop: 14 }}>
                <Badge variant="purple" dot>AI Active</Badge>
                <Badge variant="success" dot>Operational</Badge>
                <Badge variant="warning" dot>Syncing</Badge>
                <Badge variant="danger" dot>Disconnected</Badge>
                <Badge variant="muted">v1.0.0</Badge>
                <Badge variant="outline">PRO TIER</Badge>
              </Stack>
            </Card>
          </Grid>
        </Section>

        {/* ================================================================= */}
        {/* 9. PROGRESS BARS & SKELETONS */}
        {/* ================================================================= */}
        <Section
          title="9. Progress Bars & Loading Skeletons"
          subtitle="Shimmer animations and progress indicators for loading states"
        >
          <Grid cols="auto-fit" minWidth={280} gap={4}>
            <Card padding="medium">
              <span className="ds-subsection-title">Progress Bar Modes</span>
              <Stack gap={4} style={{ marginTop: 12 }}>
                <ProgressBar
                  value={progressVal}
                  label="Daily Brief Audio Generation"
                  showValue
                />
                <ProgressBar
                  value={90}
                  variant="success"
                  label="Source Ingestion Complete"
                  showValue
                />
                <ProgressBar
                  indeterminate
                  label="Streaming AI Synthesis..."
                />
              </Stack>
            </Card>

            <Card padding="medium">
              <span className="ds-subsection-title">Skeleton Shimmers</span>
              <Stack gap={3} style={{ marginTop: 12 }}>
                <Stack direction="row" gap={3} align="center">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Stack gap={2} style={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={16} />
                    <Skeleton variant="text" width="40%" height={12} />
                  </Stack>
                </Stack>
                <Skeleton variant="rectangular" height={48} radius={12} />
              </Stack>
            </Card>
          </Grid>
        </Section>

        {/* ================================================================= */}
        {/* 10. MODAL / DIALOG */}
        {/* ================================================================= */}
        <Section
          title="10. Modal & Overlay Component"
          subtitle="Accessible backdrop blur, focus trap, and keyboard escape handling"
        >
          <Card padding="medium">
            <Stack direction="row" justify="between" align="center" wrap gap={3}>
              <div>
                <h4 className="typo-h3">Interactive Dialog Demo</h4>
                <p className="typo-body-small">
                  Test the responsive modal with keyboard `ESC` key, backdrop click, or action buttons.
                </p>
              </div>
              <Button
                variant="primary"
                leftIcon={<Sparkles size={16} />}
                onClick={() => setModalOpen(true)}
              >
                Open Test Modal
              </Button>
            </Stack>
          </Card>
        </Section>

        {/* ================================================================= */}
        {/* 11. RESPONSIVE CONTAINER & GRID PREVIEW */}
        {/* ================================================================= */}
        <Section
          title="11. Responsive System & Layout Primitives"
          subtitle="Containers enforce bounded max-width (1280px) on large screens without infinite stretching"
        >
          <Grid cols="auto-fit" minWidth={240} gap={3}>
            <Card padding="small" className="ds-viewport-demo-card">
              <span className="typo-overline">Mobile (320px–430px)</span>
              <p className="typo-body-small" style={{ marginTop: 4 }}>
                Single column layout, bottom navigation bar, 44px touch targets.
              </p>
            </Card>

            <Card padding="small" className="ds-viewport-demo-card">
              <span className="typo-overline">Tablet (768px–834px)</span>
              <p className="typo-body-small" style={{ marginTop: 4 }}>
                Adaptive 2-column grid, compact navigation, constrained padding.
              </p>
            </Card>

            <Card padding="small" className="ds-viewport-demo-card">
              <span className="typo-overline">Desktop (1024px–1440px)</span>
              <p className="typo-body-small" style={{ marginTop: 4 }}>
                Full left sidebar, sticky top bar, multi-column dashboard grid.
              </p>
            </Card>

            <Card padding="small" className="ds-viewport-demo-card">
              <span className="typo-overline">Large Desktop (1920px)</span>
              <p className="typo-body-small" style={{ marginTop: 4 }}>
                Centered max-width 1280px container preventing stretched layouts.
              </p>
            </Card>
          </Grid>
        </Section>
      </Stack>

      {/* Interactive Modal Instance */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="AI Intelligence Briefing Setup"
        subtitle="Configure real-time news sources and personalization preferences."
        size="medium"
        footer={
          <Stack direction="row" justify="end" gap={2}>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Preferences saved successfully!');
                setModalOpen(false);
              }}
            >
              Save Preferences
            </Button>
          </Stack>
        }
      >
        <Stack gap={4}>
          <Input
            label="Preferred Briefing Topic"
            placeholder="e.g., Quantum Computing, Global Venture Capital"
            defaultValue="Generative AI & Semiconductor Industry"
          />
          <Toggle
            checked={toggle1}
            onChange={setToggle1}
            label="Enable Neural Audio Voice"
            description="Use realistic generative speech synthesis"
          />
        </Stack>
      </Modal>
    </AppLayout>
  );
};

export default DesignSystemPage;
