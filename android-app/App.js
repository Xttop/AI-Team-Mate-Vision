import React, { useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Switch,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#030611',
  panel: '#081329',
  panel2: '#0D1C3B',
  text: '#F6FAFF',
  muted: '#9DAACB',
  cyan: '#22D3EE',
  blue: '#5A78FF',
  purple: '#A855F7',
  pink: '#D946EF',
  green: '#58F2C4',
  line: 'rgba(122,166,255,0.18)',
  danger: '#FF6482',
};

const workouts = [
  { id: 'strength', title: 'Strength', subtitle: 'Full Body Basics', duration: '35 min', icon: '◆' },
  { id: 'fitness', title: 'Fitness', subtitle: 'Functional Flow', duration: '28 min', icon: '◎' },
  { id: 'running', title: 'Running', subtitle: 'Adaptive Run', duration: '30 min', icon: '↗' },
  { id: 'yoga', title: 'Yoga', subtitle: 'Mobility & Balance', duration: '22 min', icon: '◌' },
];

const exercises = [
  { name: 'Barbell Squat', target: 12, tip: 'Keep your knees aligned with your toes and maintain a neutral back.' },
  { name: 'Shoulder Press', target: 10, tip: 'Keep your core stable and move the weight under control.' },
  { name: 'Walking Lunges', target: 10, tip: 'Control your stride and keep the front knee aligned with the foot.' },
];

function GradientButton({ title, onPress, small = false }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={[COLORS.cyan, COLORS.blue, COLORS.purple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientButton, small && styles.gradientButtonSmall]}
      >
        <Text style={styles.gradientButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function GlassCard({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function Pill({ children, active = false }) {
  return (
    <View style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{children}</Text>
    </View>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <View style={styles.sectionTitleWrap}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function HomeScreen({ onStartWorkout, onOpenGlasses, onOpenVision, profile }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['rgba(34,211,238,0.16)', 'rgba(90,120,255,0.08)', 'rgba(168,85,247,0.16)']}
        style={styles.heroCard}
      >
        <Text style={styles.eyebrow}>ALTIMA ML VISION</Text>
        <Text style={styles.heroTitle}>Your Personal{'
'}AI Sports Assistant.</Text>
        <Text style={styles.heroSubtitle}>
          The full experience is built around AR/VR glasses, camera-based technique analysis and sports wearables.
        </Text>

        <View style={styles.heroMetrics}>
          <View>
            <Text style={styles.metricNumber}>128</Text>
            <Text style={styles.metricLabel}>BPM</Text>
          </View>
          <View>
            <Text style={styles.metricNumber}>92%</Text>
            <Text style={styles.metricLabel}>FORM</Text>
          </View>
          <View>
            <Text style={styles.metricNumber}>4/4</Text>
            <Text style={styles.metricLabel}>WEEK</Text>
          </View>
        </View>

        <GradientButton title="Start immersive workout" onPress={onOpenGlasses} />
      </LinearGradient>

      <SectionTitle
        eyebrow="TODAY"
        title={'Good morning, ' + profile.name}
        subtitle="Your AI assistant has prepared a session based on your profile and recent training."
      />

      <GlassCard style={styles.aiCoachCard}>
        <View style={styles.aiOrb}><Text style={styles.aiOrbText}>AI</Text></View>
        <View style={styles.flexOne}>
          <Text style={styles.cardKicker}>AI SPORTS ASSISTANT</Text>
          <Text style={styles.cardTitle}>Ready for a balanced strength session?</Text>
          <Text style={styles.cardText}>
            Based on your current energy level, I suggest 35 minutes with moderate intensity and longer rest between heavy sets.
          </Text>
        </View>
      </GlassCard>

      <View style={styles.quickGrid}>
        <TouchableOpacity style={styles.quickCard} onPress={onOpenGlasses}>
          <Text style={styles.quickIcon}>⌁</Text>
          <Text style={styles.quickTitle}>AR/VR Glasses</Text>
          <Text style={styles.quickText}>Core immersive mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={onOpenVision}>
          <Text style={styles.quickIcon}>◎</Text>
          <Text style={styles.quickTitle}>Camera Analysis</Text>
          <Text style={styles.quickText}>Test movement tracking</Text>
        </TouchableOpacity>
      </View>

      <SectionTitle eyebrow="WORKOUTS" title="Choose today's activity" />

      {workouts.map((item) => (
        <TouchableOpacity key={item.id} style={styles.workoutRow} onPress={() => onStartWorkout(item)}>
          <View style={styles.workoutIcon}><Text style={styles.workoutIconText}>{item.icon}</Text></View>
          <View style={styles.flexOne}>
            <Text style={styles.workoutName}>{item.title}</Text>
            <Text style={styles.workoutMeta}>{item.subtitle} • {item.duration}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}

      <SectionTitle eyebrow="CONNECTED SYSTEM" title="Your training ecosystem" />
      <View style={styles.deviceGrid}>
        {[
          ['⌁', 'Glasses', 'Core interface'],
          ['♥', 'Wearable', '128 BPM'],
          ['◎', 'Camera', 'Ready'],
          ['AI', 'Assistant', 'Online'],
        ].map(([icon, title, status]) => (
          <GlassCard key={title} style={styles.deviceCard}>
            <Text style={styles.deviceIcon}>{icon}</Text>
            <Text style={styles.deviceTitle}>{title}</Text>
            <Text style={styles.deviceStatus}>{status}</Text>
          </GlassCard>
        ))}
      </View>
    </ScrollView>
  );
}

function WorkoutScreen({ selectedWorkout }) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [reps, setReps] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const timerRef = useRef(null);

  const exercise = exercises[exerciseIndex];

  const startRest = () => {
    if (timerRef.current) return;
    setSeconds(30);
    timerRef.current = setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 30;
        }
        return value - 1;
      });
    }, 1000);
  };

  const nextExercise = () => {
    setExerciseIndex((exerciseIndex + 1) % exercises.length);
    setReps(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSeconds(30);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <SectionTitle
        eyebrow="LIVE WORKOUT"
        title={selectedWorkout?.subtitle || 'Full Body Basics'}
        subtitle="AI guidance, repetitions, rest and technique feedback in one session."
      />

      <View style={styles.liveStats}>
        <GlassCard style={styles.liveStat}><Text style={styles.liveStatLabel}>HEART RATE</Text><Text style={styles.liveStatValue}>128</Text><Text style={styles.liveStatUnit}>BPM</Text></GlassCard>
        <GlassCard style={styles.liveStat}><Text style={styles.liveStatLabel}>FORM</Text><Text style={[styles.liveStatValue, { color: COLORS.green }]}>92</Text><Text style={styles.liveStatUnit}>%</Text></GlassCard>
        <GlassCard style={styles.liveStat}><Text style={styles.liveStatLabel}>REST</Text><Text style={styles.liveStatValue}>{seconds}</Text><Text style={styles.liveStatUnit}>SEC</Text></GlassCard>
      </View>

      <LinearGradient
        colors={['rgba(34,211,238,0.12)', 'rgba(90,120,255,0.08)', 'rgba(168,85,247,0.13)']}
        style={styles.exerciseHero}
      >
        <Text style={styles.cardKicker}>CURRENT EXERCISE</Text>
        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
        <Text style={styles.exerciseTip}>{exercise.tip}</Text>

        <View style={styles.repCircle}>
          <Text style={styles.repCount}>{reps}</Text>
          <Text style={styles.repTarget}>/ {exercise.target} reps</Text>
        </View>

        <GradientButton
          title={reps >= exercise.target ? 'Set complete' : '+ Count repetition'}
          onPress={() => setReps(Math.min(exercise.target, reps + 1))}
        />
      </LinearGradient>

      <GlassCard style={styles.feedbackCard}>
        <Text style={styles.cardKicker}>REAL-TIME FEEDBACK</Text>
        <View style={styles.feedbackRow}><Text style={styles.feedbackGood}>✓</Text><Text style={styles.feedbackText}>Back posture: good</Text></View>
        <View style={styles.feedbackRow}><Text style={styles.feedbackGood}>✓</Text><Text style={styles.feedbackText}>Tempo: controlled</Text></View>
        <View style={styles.feedbackRow}><Text style={styles.feedbackWarn}>!</Text><Text style={styles.feedbackText}>Keep knees aligned with toes</Text></View>
      </GlassCard>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={startRest}>
          <Text style={styles.secondaryButtonText}>Start 30s rest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={nextExercise}>
          <Text style={styles.secondaryButtonText}>Next exercise</Text>
        </TouchableOpacity>
      </View>

      <SectionTitle eyebrow="SESSION PLAN" title="Exercises" />
      {exercises.map((item, index) => (
        <TouchableOpacity
          key={item.name}
          style={[styles.exerciseRow, index === exerciseIndex && styles.exerciseRowActive]}
          onPress={() => { setExerciseIndex(index); setReps(0); }}
        >
          <Text style={styles.exerciseIndex}>{String(index + 1).padStart(2, '0')}</Text>
          <View style={styles.flexOne}>
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text style={styles.workoutMeta}>{item.target} target repetitions</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function VisionScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('front');
  const [tracking, setTracking] = useState(true);

  if (!permission) {
    return <View style={styles.center}><Text style={styles.cardText}>Loading camera permission…</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionWrap}>
        <Text style={styles.eyebrow}>CAMERA ANALYSIS</Text>
        <Text style={styles.permissionTitle}>Allow camera access</Text>
        <Text style={styles.sectionSubtitle}>
          The camera is used to test movement analysis and technique feedback. Video is not uploaded by this MVP.
        </Text>
        <GradientButton title="Allow camera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.cameraRoot}>
      <CameraView style={StyleSheet.absoluteFill} facing={facing} />
      <LinearGradient
        colors={['rgba(3,6,17,0.78)', 'transparent', 'rgba(3,6,17,0.82)']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.cameraOverlay}>
        <View style={styles.cameraHeader}>
          <View>
            <Text style={styles.eyebrow}>AI VISION</Text>
            <Text style={styles.cameraTitle}>Technique analysis</Text>
          </View>
          <TouchableOpacity style={styles.hudButton} onPress={() => setFacing(facing === 'front' ? 'back' : 'front')}>
            <Text style={styles.hudButtonText}>Flip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bodyFrame}>
          <View style={[styles.joint, { top: '12%', left: '47%' }]} />
          <View style={[styles.joint, { top: '30%', left: '34%' }]} />
          <View style={[styles.joint, { top: '30%', left: '60%' }]} />
          <View style={[styles.joint, { top: '56%', left: '39%' }]} />
          <View style={[styles.joint, { top: '56%', left: '57%' }]} />
          <View style={[styles.joint, { top: '83%', left: '33%' }]} />
          <View style={[styles.joint, { top: '83%', left: '63%' }]} />
          <Text style={styles.scanLabel}>{tracking ? 'BODY TRACKING • DEMO' : 'TRACKING PAUSED'}</Text>
        </View>

        <View style={styles.cameraBottom}>
          <GlassCard style={styles.cameraFeedback}>
            <View style={styles.cameraFeedbackTop}>
              <Text style={styles.cardKicker}>BARBELL SQUAT</Text>
              <Text style={styles.formScore}>92%</Text>
            </View>
            <Text style={styles.feedbackText}>Keep your knees in line with your toes.</Text>
            <View style={styles.cameraMetricRow}>
              <Pill active>Knee 92°</Pill>
              <Pill>Back neutral</Pill>
              <Pill>Tempo 3.1s</Pill>
            </View>
          </GlassCard>

          <TouchableOpacity style={styles.trackButton} onPress={() => setTracking(!tracking)}>
            <Text style={styles.trackButtonText}>{tracking ? 'Pause tracking' : 'Resume tracking'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

function GlassesScreen() {
  const [connected, setConnected] = useState(false);
  const [hudMode, setHudMode] = useState('Coach');

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <SectionTitle
        eyebrow="CORE EXPERIENCE"
        title="AR / VR Glasses"
        subtitle="The virtual AI trainer appears directly in the user's field of view."
      />

      <LinearGradient
        colors={['rgba(34,211,238,0.15)', 'rgba(90,120,255,0.08)', 'rgba(168,85,247,0.18)']}
        style={styles.glassesHero}
      >
        <View style={styles.glassesSymbol}>
          <View style={styles.lens}><Text style={styles.lensText}>AI</Text></View>
          <View style={styles.bridge} />
          <View style={styles.lens}><Text style={styles.lensText}>92%</Text></View>
        </View>

        <Text style={styles.glassesTitle}>{connected ? 'Glasses connected' : 'Connect training glasses'}</Text>
        <Text style={styles.glassesText}>
          {connected
            ? 'Altima ML Vision is ready to send the virtual trainer, exercise cues and live metrics to the immersive display.'
            : 'Connect the target AR/VR device to start the full Altima ML Vision experience.'}
        </Text>

        <GradientButton
          title={connected ? 'Disconnect glasses' : 'Connect glasses'}
          onPress={() => setConnected(!connected)}
        />
      </LinearGradient>

      <SectionTitle eyebrow="HUD PREVIEW" title="What the athlete sees" />
      <GlassCard style={styles.hudPreview}>
        <View style={styles.hudPreviewTop}>
          <Pill active>LIVE AI COACH</Pill>
          <Pill>128 BPM</Pill>
        </View>

        <View style={styles.virtualCoach}>
          <View style={styles.coachHead} />
          <View style={styles.coachBody} />
          <View style={styles.coachArmLeft} />
          <View style={styles.coachArmRight} />
          <Text style={styles.virtualCoachLabel}>VIRTUAL TRAINER</Text>
        </View>

        <View style={styles.glassesFeedback}>
          <Text style={styles.glassesFeedbackTitle}>Barbell Squat • 8 / 12</Text>
          <Text style={styles.glassesFeedbackText}>Keep knees aligned with toes</Text>
        </View>
      </GlassCard>

      <SectionTitle eyebrow="DISPLAY MODE" title="Choose glasses interface" />
      <View style={styles.modeRow}>
        {['Coach', 'Minimal', 'Analytics'].map((mode) => (
          <TouchableOpacity key={mode} onPress={() => setHudMode(mode)}>
            <Pill active={hudMode === mode}>{mode}</Pill>
          </TouchableOpacity>
        ))}
      </View>

      <GlassCard style={styles.hardwareNote}>
        <Text style={styles.cardKicker}>HARDWARE INTEGRATION</Text>
        <Text style={styles.cardTitle}>Next: connect a real glasses SDK</Text>
        <Text style={styles.cardText}>
          This Android MVP defines the Altima glasses experience and connection flow. The production connector will be implemented for the first selected headset SDK and tested on real hardware.
        </Text>
      </GlassCard>
    </ScrollView>
  );
}

function ProfileScreen({ profile, setProfile }) {
  const [medicalNotesEnabled, setMedicalNotesEnabled] = useState(true);

  const field = (label, key, placeholder) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={profile[key]}
        onChangeText={(value) => setProfile({ ...profile, [key]: value })}
        placeholder={placeholder}
        placeholderTextColor="#647396"
        style={styles.input}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <SectionTitle
        eyebrow="PERSONALIZATION"
        title="Your training profile"
        subtitle="The workout adapts to the person — not the person to the workout."
      />

      <GlassCard style={styles.profileCard}>
        {field('Name', 'name', 'Your name')}
        <View style={styles.twoFields}>
          <View style={styles.flexOne}>{field('Age', 'age', 'Age')}</View>
          <View style={styles.flexOne}>{field('Weight', 'weight', 'kg')}</View>
        </View>
        <View style={styles.twoFields}>
          <View style={styles.flexOne}>{field('Height', 'height', 'cm')}</View>
          <View style={styles.flexOne}>{field('Fitness level', 'fitness', 'Beginner / Intermediate')}</View>
        </View>
        {field('Primary goal', 'goal', 'Strength, fitness, mobility…')}
        {field('Favorite training music', 'music', 'Music preference')}
      </GlassCard>

      <GlassCard style={styles.settingsCard}>
        <View style={styles.settingRow}>
          <View style={styles.flexOne}>
            <Text style={styles.cardTitle}>Use my training limitations</Text>
            <Text style={styles.cardText}>Allow user-provided limitations to affect exercise selection and intensity.</Text>
          </View>
          <Switch
            value={medicalNotesEnabled}
            onValueChange={setMedicalNotesEnabled}
            trackColor={{ false: '#273352', true: COLORS.blue }}
            thumbColor={medicalNotesEnabled ? COLORS.cyan : '#94A3B8'}
          />
        </View>
      </GlassCard>

      <SectionTitle eyebrow="CONNECTED DATA" title="Sensors & wearables" />
      <GlassCard style={styles.connectionRow}>
        <Text style={styles.deviceIcon}>♥</Text>
        <View style={styles.flexOne}>
          <Text style={styles.cardTitle}>Sports smartwatch</Text>
          <Text style={styles.cardText}>Heart rate, activity, load and recovery data.</Text>
        </View>
        <Pill>Pair</Pill>
      </GlassCard>

      <GlassCard style={styles.connectionRow}>
        <Text style={styles.deviceIcon}>⌁</Text>
        <View style={styles.flexOne}>
          <Text style={styles.cardTitle}>AR / VR glasses</Text>
          <Text style={styles.cardText}>Core immersive trainer interface.</Text>
        </View>
        <Pill active>Core</Pill>
      </GlassCard>
    </ScrollView>
  );
}

function BottomNav({ active, onChange }) {
  const items = [
    ['home', '⌂', 'Home'],
    ['workout', '◆', 'Workout'],
    ['vision', '◎', 'Vision'],
    ['glasses', '⌁', 'Glasses'],
    ['profile', '◉', 'Profile'],
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map(([id, icon, label]) => (
        <TouchableOpacity key={id} style={styles.navItem} onPress={() => onChange(id)}>
          <Text style={[styles.navIcon, active === id && styles.navActive]}>{icon}</Text>
          <Text style={[styles.navLabel, active === id && styles.navActive]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  const [active, setActive] = useState('home');
  const [selectedWorkout, setSelectedWorkout] = useState(workouts[0]);
  const [profile, setProfile] = useState({
    name: 'Mikalai',
    age: '35',
    height: '180',
    weight: '80',
    fitness: 'Intermediate',
    goal: 'Strength + mobility',
    music: 'Electronic / motivational',
  });

  const screen = useMemo(() => {
    if (active === 'workout') return <WorkoutScreen selectedWorkout={selectedWorkout} />;
    if (active === 'vision') return <VisionScreen />;
    if (active === 'glasses') return <GlassesScreen />;
    if (active === 'profile') return <ProfileScreen profile={profile} setProfile={setProfile} />;

    return (
      <HomeScreen
        profile={profile}
        onStartWorkout={(workout) => { setSelectedWorkout(workout); setActive('workout'); }}
        onOpenGlasses={() => setActive('glasses')}
        onOpenVision={() => setActive('vision')}
      />
    );
  }, [active, selectedWorkout, profile]);

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {active === 'vision' ? (
        <View style={styles.screen}>{screen}</View>
      ) : (
        <SafeAreaView style={styles.screen}>{screen}</SafeAreaView>
      )}
      <BottomNav active={active} onChange={setActive} />
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: COLORS.bg },
  screen: { flex: 1 },
  flexOne: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.bg },
  scrollContent: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 120 },

  card: {
    backgroundColor: 'rgba(8,19,41,0.92)',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 22,
  },

  eyebrow: {
    color: COLORS.cyan,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.7,
  },

  sectionTitleWrap: { marginTop: 28, marginBottom: 16 },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.8,
    marginTop: 7,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  heroCard: {
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.22)',
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1.5,
    lineHeight: 39,
    marginTop: 12,
  },
  heroSubtitle: {
    color: '#B8C5E4',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
  },
  heroMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  metricNumber: { color: COLORS.text, fontSize: 22, fontWeight: '900' },
  metricLabel: { color: COLORS.muted, fontSize: 10, marginTop: 2, letterSpacing: 1 },

  gradientButton: {
    minHeight: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  gradientButtonSmall: { minHeight: 42 },
  gradientButtonText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  aiCoachCard: { padding: 18, flexDirection: 'row', gap: 14 },
  aiOrb: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    borderWidth: 1,
    borderColor: COLORS.cyan,
  },
  aiOrbText: { color: '#fff', fontSize: 17, fontWeight: '900' },
  cardKicker: { color: '#80DFFF', fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  cardTitle: { color: COLORS.text, fontSize: 16, fontWeight: '800', marginTop: 5 },
  cardText: { color: COLORS.muted, fontSize: 13, lineHeight: 19, marginTop: 6 },

  quickGrid: { flexDirection: 'row', gap: 12, marginTop: 12 },
  quickCard: {
    flex: 1,
    minHeight: 132,
    padding: 16,
    borderRadius: 20,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  quickIcon: { color: COLORS.cyan, fontSize: 28, fontWeight: '700' },
  quickTitle: { color: COLORS.text, fontWeight: '800', marginTop: 14 },
  quickText: { color: COLORS.muted, fontSize: 12, marginTop: 4 },

  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 78,
    padding: 14,
    marginBottom: 10,
    borderRadius: 19,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  workoutIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(34,211,238,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.20)',
    marginRight: 13,
  },
  workoutIconText: { color: COLORS.cyan, fontSize: 20 },
  workoutName: { color: COLORS.text, fontWeight: '800', fontSize: 15 },
  workoutMeta: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  chevron: { color: COLORS.cyan, fontSize: 28, paddingHorizontal: 4 },

  deviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  deviceCard: { width: (width - 46) / 2, padding: 16 },
  deviceIcon: { color: COLORS.cyan, fontSize: 23, fontWeight: '800' },
  deviceTitle: { color: COLORS.text, fontWeight: '800', marginTop: 10 },
  deviceStatus: { color: COLORS.muted, fontSize: 12, marginTop: 4 },

  liveStats: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  liveStat: { flex: 1, padding: 13, alignItems: 'center' },
  liveStatLabel: { color: COLORS.muted, fontSize: 9, letterSpacing: 1 },
  liveStatValue: { color: COLORS.text, fontWeight: '900', fontSize: 26, marginTop: 6 },
  liveStatUnit: { color: COLORS.muted, fontSize: 9 },

  exerciseHero: {
    borderRadius: 26,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.20)',
  },
  exerciseTitle: { color: COLORS.text, fontSize: 28, fontWeight: '900', marginTop: 8 },
  exerciseTip: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginTop: 8 },
  repCircle: {
    width: 142,
    height: 142,
    borderRadius: 71,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    borderWidth: 2,
    borderColor: COLORS.cyan,
    backgroundColor: 'rgba(34,211,238,0.06)',
  },
  repCount: { color: COLORS.text, fontSize: 50, fontWeight: '900' },
  repTarget: { color: COLORS.muted, fontSize: 12 },

  feedbackCard: { padding: 18, marginTop: 12 },
  feedbackRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  feedbackGood: { color: COLORS.green, fontSize: 16, fontWeight: '900' },
  feedbackWarn: { color: '#FFD166', fontSize: 16, fontWeight: '900' },
  feedbackText: { color: COLORS.text, fontSize: 13, flex: 1 },

  actionRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panel,
  },
  secondaryButtonText: { color: '#DDE8FF', fontSize: 12, fontWeight: '800' },

  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 66,
    padding: 14,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  exerciseRowActive: { borderColor: COLORS.cyan, backgroundColor: 'rgba(34,211,238,0.08)' },
  exerciseIndex: { color: COLORS.cyan, fontWeight: '900', width: 38 },

  permissionWrap: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    padding: 24,
  },
  permissionTitle: { color: COLORS.text, fontSize: 32, fontWeight: '900', marginTop: 10, marginBottom: 4 },

  cameraRoot: { flex: 1, backgroundColor: '#000' },
  cameraOverlay: { flex: 1, paddingHorizontal: 16, paddingBottom: 94 },
  cameraHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 },
  cameraTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 3 },
  hudButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 13,
    backgroundColor: 'rgba(4,10,30,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.30)',
  },
  hudButtonText: { color: '#fff', fontWeight: '800' },

  bodyFrame: {
    flex: 1,
    marginVertical: 24,
    marginHorizontal: 20,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.68)',
    position: 'relative',
  },
  joint: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: COLORS.cyan,
    shadowColor: COLORS.cyan,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  scanLabel: {
    position: 'absolute',
    top: -26,
    left: 0,
    color: COLORS.cyan,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  cameraBottom: { gap: 10 },
  cameraFeedback: { padding: 15, backgroundColor: 'rgba(4,10,30,0.78)' },
  cameraFeedbackTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  formScore: { color: COLORS.green, fontSize: 21, fontWeight: '900' },
  cameraMetricRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 12 },
  trackButton: {
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: 'rgba(4,10,30,0.80)',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.30)',
  },
  trackButtonText: { color: '#fff', fontWeight: '800' },

  pill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  pillActive: { borderColor: COLORS.cyan, backgroundColor: 'rgba(34,211,238,0.10)' },
  pillText: { color: COLORS.muted, fontSize: 10, fontWeight: '800' },
  pillTextActive: { color: '#DDFBFF' },

  glassesHero: {
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.20)',
  },
  glassesSymbol: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  lens: {
    width: 110,
    height: 76,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.cyan,
    backgroundColor: 'rgba(34,211,238,0.05)',
  },
  bridge: { width: 26, height: 2, backgroundColor: COLORS.cyan },
  lensText: { color: '#E9FCFF', fontWeight: '900', fontSize: 18 },
  glassesTitle: { color: COLORS.text, fontSize: 25, fontWeight: '900', textAlign: 'center' },
  glassesText: { color: COLORS.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginVertical: 12 },

  hudPreview: { minHeight: 390, padding: 18, position: 'relative', overflow: 'hidden' },
  hudPreviewTop: { flexDirection: 'row', justifyContent: 'space-between' },
  virtualCoach: { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  coachHead: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: COLORS.cyan,
    marginTop: 30,
  },
  coachBody: {
    width: 66,
    height: 100,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.blue,
    marginTop: 8,
  },
  coachArmLeft: {
    position: 'absolute',
    width: 4,
    height: 82,
    backgroundColor: COLORS.cyan,
    top: 100,
    left: '37%',
    transform: [{ rotate: '36deg' }],
  },
  coachArmRight: {
    position: 'absolute',
    width: 4,
    height: 82,
    backgroundColor: COLORS.cyan,
    top: 100,
    right: '37%',
    transform: [{ rotate: '-36deg' }],
  },
  virtualCoachLabel: { color: COLORS.cyan, fontSize: 9, letterSpacing: 1.4, fontWeight: '900', marginTop: 14 },
  glassesFeedback: {
    borderTopWidth: 1,
    borderColor: COLORS.line,
    paddingTop: 14,
  },
  glassesFeedbackTitle: { color: COLORS.text, fontWeight: '900' },
  glassesFeedbackText: { color: COLORS.cyan, fontSize: 12, marginTop: 4 },

  modeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  hardwareNote: { padding: 20, marginTop: 22 },

  profileCard: { padding: 18 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { color: '#BCC8E4', fontSize: 11, fontWeight: '800', marginBottom: 7 },
  input: {
    minHeight: 48,
    color: COLORS.text,
    borderRadius: 13,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: 'rgba(255,255,255,0.025)',
  },
  twoFields: { flexDirection: 'row', gap: 10 },
  settingsCard: { padding: 18, marginTop: 12 },
  settingRow: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  connectionRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 17, marginBottom: 10 },

  bottomNav: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    height: 72,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(5,12,29,0.97)',
    borderWidth: 1,
    borderColor: 'rgba(114,159,255,0.20)',
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navIcon: { color: '#7181A8', fontSize: 19, fontWeight: '800' },
  navLabel: { color: '#7181A8', fontSize: 9, fontWeight: '700', marginTop: 4 },
  navActive: { color: COLORS.cyan },
});

