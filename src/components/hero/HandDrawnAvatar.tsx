import { useId, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

export interface MagicSealColors {
  gold: string
  cyan: string
  violet: string
  white: string
  ember: string
}

export interface MagicSealAvatarProps {
  src: string
  alt: string
  colors?: Partial<MagicSealColors>
  speed?: number
  ringCount?: number
  particleCount?: number
  emberCount?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  radius: number
  colorIndex: number
  delay: number
}

interface EmberParticle {
  x: number
  y: number
  driftX: number
  driftY: number
  radius: number
  delay: number
  duration: number
}

const DEFAULT_COLORS: MagicSealColors = {
  gold: '#e8c77b',
  cyan: '#69dce8',
  violet: '#a78bfa',
  white: '#f8fafc',
  ember: '#ff8248',
}

const CONNECTION_PATHS = [
  'M18 72 L130 147 L200 91',
  'M382 72 L270 147 L200 91',
  'M24 326 L140 255 L200 314',
  'M376 326 L260 255 L200 314',
  'M200 91 L292 148 L285 255 L200 314 L115 255 L108 148 Z',
  'M108 148 L285 255 M292 148 L115 255',
]

const ORBIT_MARKERS = Array.from({ length: 12 }, (_, index) => index * 30)
const BURST_RAYS = Array.from({ length: 16 }, (_, index) => index * 22.5)
const ALTAR_AXES = Array.from({ length: 8 }, (_, index) => index * 45)
const GATE_ANGLES = [0, 90, 180, 270]
const COMET_SPARKS = Array.from({ length: 12 }, (_, index) => index)

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = ((index * 137.5 + 18) * Math.PI) / 180
    const distance = 126 + (index % 6) * 13

    return {
      x: 200 + Math.cos(angle) * distance,
      y: 200 + Math.sin(angle) * distance,
      radius: 0.9 + (index % 3) * 0.45,
      colorIndex: index % 4,
      delay: (index % 8) * 0.07,
    }
  })
}

function createEmberParticles(count: number): EmberParticle[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = ((index * 137.5 + 9) * Math.PI) / 180
    const distance = 132 + (index % 9) * 7.5
    const x = 200 + Math.cos(angle) * distance
    const y = 200 + Math.sin(angle) * distance
    const outwardX = Math.cos(angle) * (22 + (index % 6) * 5)
    const outwardY = Math.sin(angle) * (22 + (index % 6) * 5)
    const tangent = (index % 2 === 0 ? 1 : -1) * (5 + (index % 4) * 2)

    return {
      x,
      y,
      driftX: outwardX - Math.sin(angle) * tangent,
      driftY: outwardY + Math.cos(angle) * tangent - 8,
      radius: 0.65 + (index % 4) * 0.38,
      delay: (index % 24) * 0.13 + Math.floor(index / 24) * 0.19,
      duration: 2.1 + (index % 7) * 0.23,
    }
  })
}

export function MagicSealAvatar({
  src,
  alt,
  colors,
  speed = 1,
  ringCount = 5,
  particleCount = 34,
  emberCount = 96,
  className,
}: MagicSealAvatarProps) {
  const shouldReduceMotion = useReducedMotion()
  const [animationCycle, setAnimationCycle] = useState(0)
  const rawId = useId()
  const id = rawId.replace(/:/g, '')
  const safeSpeed = clamp(speed, 0.9, 1.1)
  const totalDuration = 6.8 / safeSpeed
  const safeRingCount = Math.round(clamp(ringCount, 2, 5))
  const safeParticleCount = Math.round(clamp(particleCount, 12, 44))
  const safeEmberCount = Math.round(clamp(emberCount, 32, 128))
  const palette: MagicSealColors = {
    gold: colors?.gold ?? DEFAULT_COLORS.gold,
    cyan: colors?.cyan ?? DEFAULT_COLORS.cyan,
    violet: colors?.violet ?? DEFAULT_COLORS.violet,
    white: colors?.white ?? DEFAULT_COLORS.white,
    ember: colors?.ember ?? DEFAULT_COLORS.ember,
  }
  const colorList = [palette.gold, palette.cyan, palette.violet, palette.white]
  const particles = useMemo(() => createParticles(safeParticleCount), [safeParticleCount])
  const emberParticles = useMemo(() => createEmberParticles(safeEmberCount), [safeEmberCount])

  if (shouldReduceMotion) {
    return (
      <button
        type="button"
        className={clsx(
          'group relative flex size-[320px] sm:size-[400px] cursor-pointer items-center justify-center border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:size-[540px]',
          className,
        )}
        aria-label="重新播放头像解封动画"
        title="restart"
        onClick={() => setAnimationCycle((cycle) => cycle + 1)}
      >
        <motion.div
          key={animationCycle}
          className="size-[200px] overflow-hidden rounded-full border border-primary bg-zinc-100 shadow-xl dark:bg-zinc-800 lg:size-[300px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <img
            className="size-full object-cover"
            src={src}
            alt={alt}
            loading="eager"
            decoding="async"
          />
        </motion.div>
        <svg
          className="pointer-events-none absolute size-[218px] overflow-visible lg:size-[322px]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke={palette.white}
            strokeWidth="0.55"
            opacity="0.52"
          />
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke={palette.cyan}
            strokeWidth="0.8"
            strokeDasharray="1 5 18 7"
            opacity="0.78"
          />
          {GATE_ANGLES.map((angle) => (
            <path
              key={angle}
              d="M100 0 L104 6 L100 12 L96 6 Z"
              fill="#080b16"
              stroke={palette.gold}
              strokeWidth="0.8"
              transform={'rotate(' + angle + ' 100 100)'}
            />
          ))}
        </svg>
      </button>
    )
  }

  return (
    <button
      type="button"
      className={clsx(
        'group relative flex size-[320px] sm:size-[400px] cursor-pointer items-center justify-center overflow-visible border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:size-[540px]',
        className,
      )}
      style={{ isolation: 'isolate' }}
      aria-label="重新播放头像解封动画"
      title="restart"
      onClick={() => setAnimationCycle((cycle) => cycle + 1)}
    >
      <div key={animationCycle} className="contents">
        <svg
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`${id}-field`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#080b16" stopOpacity="0.82" />
              <stop offset="55%" stopColor="#10152a" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#080b16" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${id}-pulse`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={palette.white} stopOpacity="0.72" />
              <stop offset="34%" stopColor={palette.cyan} stopOpacity="0.24" />
              <stop offset="100%" stopColor={palette.violet} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={id + '-comet-gold'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.gold} stopOpacity="0" />
              <stop offset="38%" stopColor={palette.gold} stopOpacity="0.24" />
              <stop offset="76%" stopColor={palette.gold} stopOpacity="0.92" />
              <stop offset="100%" stopColor={palette.white} stopOpacity="1" />
            </linearGradient>
            <linearGradient id={id + '-comet-cyan'} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={palette.violet} stopOpacity="0" />
              <stop offset="38%" stopColor={palette.violet} stopOpacity="0.28" />
              <stop offset="76%" stopColor={palette.cyan} stopOpacity="0.94" />
              <stop offset="100%" stopColor={palette.white} stopOpacity="1" />
            </linearGradient>
            <filter id={id + '-soft-glow'} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`${id}-wide-glow`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          <motion.circle
            cx="200"
            cy="200"
            r="188"
            fill={`url(#${id}-field)`}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: [0, 0.78, 0.34], scale: [0.82, 1.02, 1] }}
            transition={{
              duration: totalDuration,
              times: [0, 0.32, 1],
              ease: 'easeOut',
            }}
            style={{ transformOrigin: '200px 200px' }}
          />

          <motion.circle
            cx="200"
            cy="200"
            r="130"
            fill={`url(#${id}-pulse)`}
            filter={`url(#${id}-wide-glow)`}
            initial={{ opacity: 0, scale: 0.45 }}
            animate={{
              opacity: [0, 0.12, 0.84, 0.18],
              scale: [0.45, 0.7, 1.28, 0.96],
            }}
            transition={{
              duration: totalDuration,
              times: [0, 0.32, 0.68, 1],
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '200px 200px' }}
          />

          {particles.map((particle, index) => (
            <motion.circle
              key={`${particle.x}-${particle.y}`}
              cx={particle.x}
              cy={particle.y}
              r={particle.radius}
              fill={colorList[particle.colorIndex]}
              filter={`url(#${id}-soft-glow)`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.08, 0.72, 0.16, 0.5, index < 14 ? 0.08 : 0],
                scale: [0.6, 1.35, 0.8, 1.05, 0.6],
              }}
              transition={{
                duration:
                  index < 14 ? (6.2 + (index % 4) * 0.65) / safeSpeed : totalDuration * 0.84,
                delay: 0.08 / safeSpeed + particle.delay,
                repeat: index < 14 ? Infinity : 0,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: `${particle.x}px ${particle.y}px` }}
            />
          ))}

          {CONNECTION_PATHS.slice(0, 4).map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke={colorList[index % colorList.length]}
              strokeWidth="0.8"
              strokeLinecap="round"
              filter={`url(#${id}-soft-glow)`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0.58, 1],
                opacity: [0, 0.88, 0.44, 0],
              }}
              transition={{
                duration: totalDuration * 0.5,
                delay: totalDuration * (0.1 + index * 0.025),
                times: [0, 0.42, 0.68, 1],
                ease: 'easeInOut',
              }}
            />
          ))}

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.74, 0.42, 0.08] }}
            transition={{
              duration: totalDuration * 0.56,
              delay: totalDuration * 0.14,
              times: [0, 0.3, 0.72, 1],
            }}
          >
            {CONNECTION_PATHS.slice(4).map((path, index) => (
              <motion.path
                key={path}
                d={path}
                fill="none"
                stroke={index === 0 ? palette.gold : palette.cyan}
                strokeWidth="0.7"
                strokeDasharray={index === 0 ? '5 7' : '3 9'}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0.7, 1] }}
                transition={{
                  duration: totalDuration * 0.34,
                  delay: totalDuration * index * 0.025,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.g>

          <motion.g
            filter={'url(#' + id + '-soft-glow)'}
            initial={{ opacity: 0, scale: 0.58, rotate: -32 }}
            animate={{
              opacity: [0, 0.28, 0.92, 0.92, 0.78, 0.46, 0.22],
              scale: [0.58, 0.76, 1.04, 1.02, 1, 0.99, 1],
              rotate: [-32, -18, 4, 2, 0, 0, 0],
            }}
            transition={{
              duration: totalDuration * 0.94,
              times: [0, 0.15, 0.38, 0.58, 0.74, 0.88, 1],
              ease: [0.22, 0.8, 0.32, 1],
            }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <rect
              x="37"
              y="37"
              width="326"
              height="326"
              rx="22"
              fill="none"
              stroke={palette.gold}
              strokeWidth="0.65"
              strokeDasharray="16 8 2 8"
              transform="rotate(45 200 200)"
            />
            <rect
              x="54"
              y="54"
              width="292"
              height="292"
              rx="12"
              fill="none"
              stroke={palette.violet}
              strokeWidth="0.55"
              strokeDasharray="5 10"
              transform="rotate(45 200 200)"
            />
            <circle
              cx="200"
              cy="200"
              r="188"
              fill="none"
              stroke={palette.white}
              strokeWidth="1.8"
              strokeDasharray="2 14 24 10"
            />
          </motion.g>

          {ALTAR_AXES.map((angle, index) => (
            <g key={angle} transform={'rotate(' + angle + ' 200 200)'}>
              <motion.path
                d="M200 -18 L200 42 L190 54 L190 78 L200 90 L210 78 L210 54 L200 42"
                fill="none"
                stroke={index % 2 === 0 ? palette.gold : palette.cyan}
                strokeWidth={index % 2 === 0 ? 1.35 : 0.8}
                strokeLinejoin="round"
                filter={'url(#' + id + '-soft-glow)'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 0.3, 1, 1, 0.84, 1],
                  opacity: [0, 0.35, 1, 0.95, 0.72, 0.2],
                }}
                transition={{
                  duration: totalDuration * 0.78,
                  delay: totalDuration * (0.06 + index * 0.018),
                  times: [0, 0.18, 0.42, 0.68, 0.84, 1],
                  ease: 'easeInOut',
                }}
              />
              <motion.circle
                cx="200"
                cy="58"
                r={index % 2 === 0 ? 4.5 : 3}
                fill="#070a13"
                stroke={index % 2 === 0 ? palette.white : palette.violet}
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0.65, 0.35],
                  scale: [0, 1.45, 1.12, 1.04, 1],
                }}
                transition={{
                  duration: totalDuration * 0.66,
                  delay: totalDuration * (0.16 + index * 0.014),
                  times: [0, 0.34, 0.58, 0.8, 1],
                }}
                style={{ transformOrigin: '200px 58px' }}
              />
            </g>
          ))}

          {GATE_ANGLES.map((angle, index) => (
            <g key={angle} transform={'rotate(' + angle + ' 200 200)'}>
              <motion.g
                initial={{ opacity: 0, y: -28 }}
                animate={{
                  opacity: [0, 0.96, 0.96, 0.72, 0.24],
                  y: [-28, 4, 0, 0, 0],
                }}
                transition={{
                  duration: totalDuration * 0.64,
                  delay: totalDuration * (0.14 + index * 0.045),
                  times: [0, 0.35, 0.62, 0.8, 1],
                  ease: [0.22, 0.8, 0.32, 1],
                }}
              >
                <path
                  d="M164 18 L176 6 H224 L236 18 L228 31 H212 L207 42 H193 L188 31 H172 Z"
                  fill="#080b16"
                  fillOpacity="0.82"
                  stroke={index % 2 === 0 ? palette.gold : palette.cyan}
                  strokeWidth="1.1"
                />
                <path
                  d="M180 17 H220 M188 25 H212 M196 11 H204"
                  fill="none"
                  stroke={palette.white}
                  strokeWidth="0.65"
                  strokeDasharray="3 3"
                />
              </motion.g>
            </g>
          ))}

          <motion.g
            filter={'url(#' + id + '-soft-glow)'}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{
              opacity: [0, 0, 0.96, 0.18, 0.82, 0],
              scale: [0.2, 0.55, 1, 1.08, 1.22, 1.48],
            }}
            transition={{
              duration: totalDuration * 0.54,
              delay: totalDuration * 0.38,
              times: [0, 0.2, 0.42, 0.62, 0.78, 1],
              ease: 'easeOut',
            }}
            style={{ transformOrigin: '200px 200px' }}
          >
            {BURST_RAYS.map((angle, index) => (
              <line
                key={angle}
                x1="200"
                y1={index % 2 === 0 ? 124 : 142}
                x2="200"
                y2={index % 4 === 0 ? -24 : index % 2 === 0 ? 6 : 38}
                stroke={
                  index % 3 === 0 ? palette.white : index % 2 === 0 ? palette.gold : palette.cyan
                }
                strokeWidth={index % 4 === 0 ? 1.8 : 0.85}
                strokeLinecap="round"
                transform={'rotate(' + angle + ' 200 200)'}
              />
            ))}
          </motion.g>

          <motion.circle
            cx="200"
            cy="200"
            r="176"
            fill="none"
            stroke={palette.gold}
            strokeWidth="2.4"
            strokeDasharray="28 7 3 7"
            filter={'url(#' + id + '-soft-glow)'}
            initial={{ opacity: 0, rotate: -80, scale: 0.64 }}
            animate={{
              opacity: [0, 0.92, 0.92, 0.68, 0.22],
              rotate: 240,
              scale: [0.64, 1.04, 1.02, 1, 1],
            }}
            transition={{
              duration: totalDuration * 0.88,
              delay: totalDuration * 0.08,
              times: [0, 0.38, 0.66, 0.84, 1],
              ease: [0.22, 0.8, 0.32, 1],
            }}
            style={{ transformOrigin: '200px 200px' }}
          />

          {Array.from({ length: safeRingCount }, (_, index) => {
            const radius = 168 - index * 17
            const clockwise = index % 2 === 0

            return (
              <motion.circle
                key={radius}
                cx="200"
                cy="200"
                r={radius}
                fill="none"
                stroke={colorList[index % colorList.length]}
                strokeWidth={index === safeRingCount - 1 ? 1.15 : 0.75}
                strokeDasharray={index % 2 === 0 ? `${3 + index} ${9 - index}` : '1 7 12 6'}
                filter={`url(#${id}-soft-glow)`}
                initial={{ opacity: 0, pathLength: 0, rotate: clockwise ? -35 : 35 }}
                animate={{
                  opacity: [0, 0.82, 0.82, 0.58, 0.2],
                  pathLength: [0, 1, 1, 0.9, 1],
                  rotate: clockwise ? 205 + index * 24 : -205 - index * 24,
                }}
                transition={{
                  duration: totalDuration * (0.68 + index * 0.02),
                  delay: totalDuration * (0.1 + index * 0.015),
                  times: [0, 0.3, 0.62, 0.84, 1],
                  ease: [0.22, 0.8, 0.32, 1],
                }}
                style={{ transformOrigin: '200px 200px' }}
              />
            )
          })}

          <motion.g
            filter={`url(#${id}-soft-glow)`}
            initial={{ opacity: 0, rotate: -22 }}
            animate={{ opacity: [0, 0.9, 0.9, 0.62, 0.28], rotate: 210 }}
            transition={{
              duration: totalDuration * 0.78,
              delay: totalDuration * 0.12,
              times: [0, 0.34, 0.62, 0.82, 1],
              ease: 'easeOut',
            }}
            style={{ transformOrigin: '200px 200px' }}
          >
            {ORBIT_MARKERS.map((angle, index) => (
              <g key={angle} transform={`rotate(${angle} 200 200)`}>
                <path
                  d={
                    index % 3 === 0
                      ? 'M200 24 L203 29 L200 34 L197 29 Z'
                      : 'M199 25 L201 25 L201 33 L199 33 Z'
                  }
                  fill={index % 2 === 0 ? palette.gold : palette.white}
                  opacity={index % 3 === 0 ? 0.9 : 0.56}
                />
              </g>
            ))}
          </motion.g>

          <motion.g
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0, 0.9, 0], scale: [0.4, 0.7, 1.18, 1.5] }}
            transition={{
              duration: totalDuration * 0.28,
              delay: totalDuration * 0.48,
              times: [0, 0.18, 0.46, 1],
              ease: 'easeOut',
            }}
            style={{ transformOrigin: '200px 200px' }}
            filter={`url(#${id}-soft-glow)`}
          >
            {BURST_RAYS.map((angle, index) => (
              <line
                key={angle}
                x1="200"
                y1={index % 2 === 0 ? 112 : 128}
                x2="200"
                y2={index % 2 === 0 ? 72 : 91}
                stroke={index % 2 === 0 ? palette.white : palette.cyan}
                strokeWidth={index % 2 === 0 ? 1.1 : 0.7}
                transform={`rotate(${angle} 200 200)`}
              />
            ))}
          </motion.g>

          <motion.circle
            cx="200"
            cy="200"
            r="154"
            fill="none"
            stroke={palette.cyan}
            strokeWidth="0.8"
            filter={`url(#${id}-soft-glow)`}
            animate={{ opacity: [0.12, 0.34, 0.12], scale: [0.99, 1.015, 0.99] }}
            transition={{
              duration: totalDuration,
              delay: totalDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '200px 200px' }}
          />
          <motion.g
            data-effect="idle-beam-cage"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.62, rotate: 360 }}
            transition={{
              opacity: { duration: 0.9, delay: totalDuration },
              rotate: {
                duration: 16 / safeSpeed,
                delay: totalDuration,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{ transformOrigin: '200px 200px' }}
            filter={'url(#' + id + '-soft-glow)'}
          >
            {BURST_RAYS.map((angle, index) => (
              <g key={angle} transform={'rotate(' + angle + ' 200 200)'}>
                <line
                  x1="200"
                  y1={index % 2 === 0 ? 8 : 24}
                  x2="200"
                  y2={index % 2 === 0 ? 72 : 92}
                  stroke={
                    index % 3 === 0 ? palette.gold : index % 2 === 0 ? palette.cyan : palette.violet
                  }
                  strokeWidth={index % 4 === 0 ? 1.45 : 0.65}
                  strokeLinecap="round"
                  opacity={index % 2 === 0 ? 0.9 : 0.46}
                />
                <circle
                  cx="200"
                  cy={index % 2 === 0 ? 8 : 24}
                  r={index % 4 === 0 ? 2.4 : 1.25}
                  fill={index % 3 === 0 ? palette.white : palette.cyan}
                />
              </g>
            ))}
          </motion.g>

          <motion.g
            initial={{ opacity: 0, rotate: 360 }}
            animate={{ opacity: 0.28, rotate: 0 }}
            transition={{
              opacity: { duration: 1.2, delay: totalDuration },
              rotate: {
                duration: 24 / safeSpeed,
                delay: totalDuration,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <rect
              x="20"
              y="20"
              width="360"
              height="360"
              rx="28"
              fill="none"
              stroke={palette.violet}
              strokeWidth="0.55"
              strokeDasharray="2 12 18 9"
              transform="rotate(45 200 200)"
            />
            <circle
              cx="200"
              cy="200"
              r="194"
              fill="none"
              stroke={palette.white}
              strokeWidth="0.5"
              strokeDasharray="1 17"
            />
          </motion.g>

          <motion.g
            data-effect="dragon-comet-gold"
            initial={{ opacity: 0, rotate: -40 }}
            animate={{ opacity: 1, rotate: 320 }}
            transition={{
              opacity: { duration: 0.8, delay: totalDuration },
              rotate: {
                duration: 8.5 / safeSpeed,
                delay: totalDuration,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{ transformOrigin: '200px 200px' }}
            filter={'url(#' + id + '-soft-glow)'}
          >
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="none"
              stroke={palette.gold}
              strokeWidth="0.8"
              strokeDasharray="7 13"
              opacity="0.32"
            />
            <path
              d="M390 210 C399 208 403 202 401 193 C397 171 390 142 382 112 C377 142 377 173 381 198 C382 206 385 209 390 210 Z"
              fill={'url(#' + id + '-comet-gold)'}
              stroke={palette.gold}
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <path
              d="M390 207 C394 205 396 201 395 195 C392 176 387 151 383 127"
              fill="none"
              stroke={palette.white}
              strokeWidth="1.15"
              strokeLinecap="round"
              opacity="0.88"
            />
            <circle cx="390" cy="200" r="10" fill={palette.gold} opacity="0.18" />
            <circle cx="390" cy="200" r="5.2" fill={palette.white} />
            {COMET_SPARKS.map((spark, index) => {
              const sparkX = 390 + ((index % 3) - 1) * 2.4
              const sparkY = 188 - index * 5.4
              const scatterX = ((index % 5) - 2) * 4.2
              const scatterY = -12 - (index % 4) * 5

              return (
                <circle
                  key={'gold-comet-spark-' + spark}
                  data-effect="comet-spark"
                  cx={sparkX}
                  cy={sparkY}
                  r={0.7 + (index % 3) * 0.35}
                  fill={index % 3 === 0 ? palette.white : palette.gold}
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;0.55;0"
                    keyTimes="0;0.16;0.55;1"
                    begin={totalDuration + index * 0.11 + 's'}
                    dur={(1.5 + (index % 4) * 0.22) / safeSpeed + 's'}
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={
                      '0 0;' +
                      scatterX * 0.35 +
                      ' ' +
                      scatterY * 0.35 +
                      ';' +
                      scatterX +
                      ' ' +
                      scatterY
                    }
                    keyTimes="0;0.45;1"
                    begin={totalDuration + index * 0.11 + 's'}
                    dur={(1.5 + (index % 4) * 0.22) / safeSpeed + 's'}
                    repeatCount="indefinite"
                  />
                </circle>
              )
            })}
          </motion.g>

          <motion.g
            data-effect="dragon-comet-cyan"
            initial={{ opacity: 0, rotate: 170 }}
            animate={{ opacity: 1, rotate: -190 }}
            transition={{
              opacity: { duration: 0.8, delay: totalDuration + 0.25 },
              rotate: {
                duration: 10.5 / safeSpeed,
                delay: totalDuration + 0.25,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{ transformOrigin: '200px 200px' }}
            filter={'url(#' + id + '-soft-glow)'}
          >
            <circle
              cx="200"
              cy="200"
              r="178"
              fill="none"
              stroke={palette.cyan}
              strokeWidth="0.75"
              strokeDasharray="5 12"
              opacity="0.34"
            />
            <path
              d="M378 190 C369 192 366 198 369 207 C375 230 382 258 387 288 C393 258 393 228 388 204 C386 196 383 191 378 190 Z"
              fill={'url(#' + id + '-comet-cyan)'}
              stroke={palette.cyan}
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <path
              d="M378 193 C374 195 373 199 374 205 C378 225 383 250 386 274"
              fill="none"
              stroke={palette.white}
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.88"
            />
            <circle cx="378" cy="200" r="9.5" fill={palette.cyan} opacity="0.2" />
            <circle cx="378" cy="200" r="4.9" fill={palette.white} />
            {COMET_SPARKS.map((spark, index) => {
              const sparkX = 378 + ((index % 3) - 1) * 2.2
              const sparkY = 212 + index * 5.1
              const scatterX = ((index % 5) - 2) * 4
              const scatterY = 12 + (index % 4) * 5

              return (
                <circle
                  key={'cyan-comet-spark-' + spark}
                  data-effect="comet-spark"
                  cx={sparkX}
                  cy={sparkY}
                  r={0.7 + (index % 3) * 0.34}
                  fill={
                    index % 3 === 0
                      ? palette.white
                      : index % 2 === 0
                        ? palette.cyan
                        : palette.violet
                  }
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;0.58;0"
                    keyTimes="0;0.16;0.55;1"
                    begin={totalDuration + 0.25 + index * 0.11 + 's'}
                    dur={(1.55 + (index % 4) * 0.2) / safeSpeed + 's'}
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={
                      '0 0;' +
                      scatterX * 0.35 +
                      ' ' +
                      scatterY * 0.35 +
                      ';' +
                      scatterX +
                      ' ' +
                      scatterY
                    }
                    keyTimes="0;0.45;1"
                    begin={totalDuration + 0.25 + index * 0.11 + 's'}
                    dur={(1.55 + (index % 4) * 0.2) / safeSpeed + 's'}
                    repeatCount="indefinite"
                  />
                </circle>
              )
            })}
          </motion.g>

          {GATE_ANGLES.map((angle, index) => (
            <g
              key={'idle-lock-' + angle}
              data-effect="idle-lock"
              transform={'rotate(' + angle + ' 200 200)'}
            >
              <motion.g
                initial={{ opacity: 0.12, scale: 0.96 }}
                animate={{
                  opacity: [0.12, 0.22, 1, 0.38, 0.12],
                  scale: [0.96, 1, 1.1, 1.02, 0.96],
                }}
                transition={{
                  duration: 3.2 / safeSpeed,
                  delay: totalDuration + index * (0.8 / safeSpeed),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.15, 0.32, 0.52, 1],
                }}
                style={{ transformOrigin: '200px 24px' }}
                filter={'url(#' + id + '-soft-glow)'}
              >
                <path
                  d="M162 18 L175 4 H225 L238 18 L229 34 H214 L208 46 H192 L186 34 H171 Z"
                  fill="#080b16"
                  fillOpacity="0.7"
                  stroke={index % 2 === 0 ? palette.gold : palette.cyan}
                  strokeWidth="2"
                />
                <path
                  d="M178 17 H222 M187 26 H213 M195 10 H205"
                  fill="none"
                  stroke={palette.white}
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
                <circle cx="200" cy="24" r="4.5" fill={palette.white} />
              </motion.g>
            </g>
          ))}

          <g data-effect="ember-field" filter={'url(#' + id + '-soft-glow)'}>
            {emberParticles.map((particle, index) => {
              const begin = totalDuration + particle.delay
              const duration = particle.duration / safeSpeed
              const midX = particle.driftX * 0.38
              const midY = particle.driftY * 0.38 - 3
              const emberColor =
                index % 7 === 0 ? palette.white : index % 3 === 0 ? palette.gold : palette.ember

              return (
                <circle
                  key={'ember-' + index}
                  data-effect="ember-particle"
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.radius}
                  fill={emberColor}
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;0.72;0.28;0"
                    keyTimes="0;0.14;0.4;0.72;1"
                    begin={begin + 's'}
                    dur={duration + 's'}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values={
                      particle.radius * 0.45 +
                      ';' +
                      particle.radius * 1.65 +
                      ';' +
                      particle.radius * 0.9 +
                      ';0.12'
                    }
                    keyTimes="0;0.22;0.62;1"
                    begin={begin + 's'}
                    dur={duration + 's'}
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={
                      '0 0;' + midX + ' ' + midY + ';' + particle.driftX + ' ' + particle.driftY
                    }
                    keyTimes="0;0.44;1"
                    begin={begin + 's'}
                    dur={duration + 's'}
                    repeatCount="indefinite"
                  />
                </circle>
              )
            })}
          </g>
        </svg>

        <motion.div
          className="relative size-[200px] overflow-hidden rounded-full bg-zinc-950 shadow-2xl lg:size-[300px]"
          initial={{
            opacity: 0,
            scale: 0.9,
            filter: 'blur(18px) brightness(0.18) saturate(0.4)',
          }}
          animate={{
            opacity: [0, 0.015, 0.08, 0.32, 0.76, 1],
            scale: [0.9, 0.92, 0.95, 0.98, 1.012, 1],
            filter: [
              'blur(18px) brightness(0.18) saturate(0.4)',
              'blur(16px) brightness(0.24) saturate(0.48)',
              'blur(11px) brightness(0.38) saturate(0.62)',
              'blur(6px) brightness(0.62) saturate(0.78)',
              'blur(2px) brightness(1.12) saturate(1.04)',
              'blur(0px) brightness(1) saturate(1)',
            ],
          }}
          transition={{
            duration: totalDuration,
            times: [0, 0.18, 0.38, 0.62, 0.84, 1],
            ease: [0.22, 0.8, 0.32, 1],
          }}
          style={{
            boxShadow: `0 0 0 1px ${palette.white}30, 0 0 30px ${palette.cyan}28, 0 18px 46px rgba(0, 0, 0, 0.24)`,
          }}
        >
          <img
            className="size-full object-cover"
            src={src}
            alt={alt}
            loading="eager"
            decoding="async"
          />
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full"
            initial={{ opacity: 0.92 }}
            animate={{ opacity: [0.92, 0.72, 0] }}
            transition={{
              duration: totalDuration * 0.6,
              delay: totalDuration * 0.14,
              times: [0, 0.42, 1],
              ease: 'easeOut',
            }}
            style={{
              background: `radial-gradient(circle at 50% 46%, ${palette.white}18 0%, ${palette.violet}26 42%, #050713 82%)`,
            }}
          />
        </motion.div>

        <motion.svg
          data-effect="avatar-magic-frame"
          className="pointer-events-none absolute z-10 size-[218px] overflow-visible lg:size-[322px]"
          viewBox="0 0 200 200"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: [0, 0, 0.96], scale: [0.88, 0.96, 1] }}
          transition={{
            duration: totalDuration,
            times: [0, 0.62, 1],
            ease: 'easeOut',
          }}
          filter={'url(#' + id + '-soft-glow)'}
        >
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke={palette.white}
            strokeWidth="0.55"
            opacity="0.54"
          />
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke={palette.cyan}
            strokeWidth="0.8"
            strokeDasharray="1 5 18 7"
            opacity="0.82"
          />
          <g data-effect="avatar-frame-rotor">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              begin={totalDuration + 's'}
              dur={18 / safeSpeed + 's'}
              repeatCount="indefinite"
            />
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke={palette.gold}
              strokeWidth="0.9"
              strokeDasharray="3 12 24 9"
              opacity="0.74"
            />
            {ORBIT_MARKERS.filter((angle) => angle % 90 === 0).map((angle) => (
              <g key={angle} transform={'rotate(' + angle + ' 100 100)'}>
                <path
                  d="M100 0 L104 6 L100 12 L96 6 Z"
                  fill="#080b16"
                  stroke={palette.white}
                  strokeWidth="0.8"
                />
                <circle cx="100" cy="6" r="1.25" fill={palette.gold} />
              </g>
            ))}
          </g>
          <motion.circle
            cx="100"
            cy="100"
            r="91"
            fill="none"
            stroke={palette.violet}
            strokeWidth="1.1"
            animate={{ opacity: [0.24, 0.72, 0.24] }}
            transition={{
              duration: 3.8 / safeSpeed,
              delay: totalDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.svg>

        <motion.span
          className="pointer-events-none absolute bottom-3 rounded-full border border-white/10 bg-zinc-950/60 px-3 py-1 text-[10px] tracking-[0.24em] text-white/70 shadow-lg backdrop-blur-sm transition-colors group-hover:border-white/25 group-hover:text-white lg:bottom-7"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, 0, 0.72], y: [8, 8, 0] }}
          transition={{ duration: totalDuration, times: [0, 0.88, 1] }}
          aria-hidden="true"
        >
          restart
        </motion.span>
      </div>
    </button>
  )
}

export const HandDrawnAvatar = MagicSealAvatar
export type HandDrawnAvatarProps = MagicSealAvatarProps
